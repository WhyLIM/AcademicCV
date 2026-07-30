// src/services/githubService.js
import axios from 'axios';

const GITHUB_API = 'https://api.github.com';

// 缓存配置
const repoCache = new Map();
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24小时缓存
const MAX_CACHE_SIZE = 100; // 最大缓存数量
const ERROR_CACHE_EXPIRY = 5 * 60 * 1000; // 错误缓存5分钟

// 持久化缓存（localStorage，跨页面刷新保留）
const STORAGE_KEY = 'github_repo_cache_v1';
const PERSISTENT_TTL = 5 * 60 * 60 * 1000; // 5 小时（持久化默认 TTL）

// 安全读取 localStorage（避免 SSR / 隐私模式抛错）
function readStorage() {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch (_) {
    return {};
  }
}

function writeStorage(obj) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  } catch (_) {
    // 配额超出等异常忽略
  }
}

// 创建带配置的axios实例
const githubClient = axios.create({
  baseURL: GITHUB_API,
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
});

// 请求队列和间隔控制
const requestQueue = [];
let REQUEST_INTERVAL = 1000; // 默认1秒间隔
let isProcessing = false;

// 定期清理过期缓存
setInterval(() => {
  const now = Date.now();
  for (const [key, { timestamp }] of repoCache.entries()) {
    if (now - timestamp > CACHE_EXPIRY) {
      repoCache.delete(key);
    }
  }
  // 同步清理持久化缓存中过期的项
  const all = readStorage();
  let dirty = false;
  for (const [k, v] of Object.entries(all)) {
    if (!v || now - v.timestamp > PERSISTENT_TTL) {
      delete all[k];
      dirty = true;
    }
  }
  if (dirty) writeStorage(all);
}, 60 * 60 * 1000); // 每小时清理一次

// 安全获取环境变量
const getGitHubToken = () => {
  // 1) Vite 构建期环境变量（部署时注入）
  if (import.meta.env?.VITE_GITHUB_TOKEN) {
    return import.meta.env.VITE_GITHUB_TOKEN;
  }

  // 2) 浏览器环境：URL 参数 (?gh_token=xxx) 便于临时传 token
  if (typeof window !== 'undefined') {
    try {
      const params = new URLSearchParams(window.location.search);
      const fromQuery = params.get('gh_token');
      if (fromQuery) {
        sessionStorage.setItem('GITHUB_TOKEN', fromQuery);
        return fromQuery;
      }
    } catch (_) { /* ignore */ }

    return localStorage?.getItem('GITHUB_TOKEN') ||
      sessionStorage?.getItem('GITHUB_TOKEN');
  }

  return null;
};

// 初始化时自动设置token
const token = getGitHubToken();
if (token) {
  githubClient.defaults.headers.common['Authorization'] = `token ${token}`;
}

// 添加缓存项（带大小限制）
function addToCache(key, value, isError = false) {
  if (repoCache.size >= MAX_CACHE_SIZE) {
    // 删除最旧的缓存
    const oldestKey = [...repoCache.keys()][0];
    repoCache.delete(oldestKey);
  }

  repoCache.set(key, {
    data: value,
    timestamp: Date.now(),
    isError,
    expiry: isError ? ERROR_CACHE_EXPIRY : CACHE_EXPIRY
  });
}

// 处理请求队列
async function processQueue() {
  if (isProcessing || requestQueue.length === 0) return;

  isProcessing = true;
  const { config, resolve, reject } = requestQueue.shift();

  try {
    const response = await githubClient(config);

    // 动态调整请求间隔
    const remaining = response.headers['x-ratelimit-remaining'];
    if (remaining && parseInt(remaining) < 100) {
      REQUEST_INTERVAL = 2000; // 当剩余请求少时增加间隔
    }

    resolve(response);
  } catch (error) {
    if (error.response?.status === 403) {
      REQUEST_INTERVAL = 5000; // 被限速时增加间隔
      // 给错误附加可读提示（区分速率限制 vs 二级限制）
      const remaining = error.response.headers?.['x-ratelimit-remaining'];
      const reset = error.response.headers?.['x-ratelimit-reset'];
      const isRateLimit = remaining === '0';
      error.friendlyMessage = isRateLimit
        ? `GitHub API 速率限制已达上限（匿名 60次/小时），将于 ${reset ? new Date(parseInt(reset) * 1000).toLocaleTimeString() : '稍后'} 重置。可通过 ?gh_token=xxx 或 localStorage 设置 GITHUB_TOKEN 提升到 5000次/小时。`
        : `GitHub API 拒绝访问（403）。仓库可能为私有，或需要配置 GITHUB_TOKEN（通过 ?gh_token=xxx 或 localStorage）。`;
    }
    reject(error);
  } finally {
    setTimeout(() => {
      isProcessing = false;
      processQueue();
    }, REQUEST_INTERVAL);
  }
}

export default {
  /**
   * 设置GitHub Token
   * @param {string} token GitHub个人访问令牌
   * @param {boolean} [persist=false] 是否持久化存储
   * @throws {Error} 当token无效时抛出错误
   */
  setToken(token, persist = false) {
    if (typeof token !== 'string' || !token.trim()) {
      throw new Error('Invalid GitHub token');
    }

    githubClient.defaults.headers.common['Authorization'] = `token ${token}`;

    if (typeof window !== 'undefined') {
      if (persist) {
        localStorage?.setItem('GITHUB_TOKEN', token);
      } else {
        sessionStorage?.setItem('GITHUB_TOKEN', token);
      }
    }
  },

  /**
   * 清除已存储的Token
   */
  clearToken() {
    delete githubClient.defaults.headers.common['Authorization'];

    if (typeof window !== 'undefined') {
      localStorage?.removeItem('GITHUB_TOKEN');
      sessionStorage?.removeItem('GITHUB_TOKEN');
    }
  },

  /**
   * 获取仓库信息（带队列控制和缓存）
   * @param {string} owner 仓库所有者用户名
   * @param {string} repo 仓库名称
   * @returns {Promise<Object>} 包含仓库信息的Promise
   * @throws {Error} 当请求失败或参数无效时抛出错误
   */
  async getRepoInfo(owner, repo) {
    if (!owner || !repo) {
      throw new Error('Owner and repo parameters are required');
    }

    const cacheKey = `${owner}/${repo}`;

    // 1) 内存缓存
    if (repoCache.has(cacheKey)) {
      const cached = repoCache.get(cacheKey);
      if (Date.now() - cached.timestamp < cached.expiry) {
        if (cached.isError) {
          throw cached.data;
        }
        return cached.data;
      }
    }

    // 2) 持久化缓存（localStorage），避免刷新页面再次请求
    const persist = readStorage();
    if (persist[cacheKey]) {
      const { data, timestamp, isError } = persist[cacheKey];
      if (Date.now() - timestamp < PERSISTENT_TTL) {
        // 命中后回填内存缓存
        addToCache(cacheKey, data, !!isError);
        if (isError) {
          throw data;
        }
        return data;
      }
      // 过期则清理
      delete persist[cacheKey];
      writeStorage(persist);
    }

    return new Promise((resolve, reject) => {
      requestQueue.push({
        config: {
          method: 'get',
          url: `/repos/${owner}/${repo}`,
          cancelToken: axios.CancelToken.source().token
        },
        resolve: (response) => {
          addToCache(cacheKey, response);
          // 写入持久化缓存
          const all = readStorage();
          all[cacheKey] = { data: response, timestamp: Date.now(), isError: false };
          writeStorage(all);
          resolve(response);
        },
        reject: (error) => {
          if (!axios.isCancel(error)) {
            addToCache(cacheKey, error, true);
            // 错误也缓存（短 TTL），但避免污染持久化层
          }
          reject(error);
        }
      });
      processQueue();
    });
  },

  /**
   * 批量获取多个仓库信息（带速率限制）
   * @param {Array} repos 仓库数组，格式: [{owner: '', repo: ''}, ...]
   * @param {number} [delay=1000] 请求间隔(ms)
   * @returns {Promise<Array>} 包含所有仓库信息的Promise数组
   */
  async getMultipleReposInfo(repos, delay = 1000) {
    if (!Array.isArray(repos)) {
      throw new Error('Repos must be an array');
    }

    const results = [];
    const errors = [];

    for (const [index, { owner, repo }] of repos.entries()) {
      try {
        const repoInfo = await this.getRepoInfo(owner, repo);
        results.push({ owner, repo, data: repoInfo.data });

        // 最后一个请求不需要等待
        if (index < repos.length - 1) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      } catch (error) {
        console.error(`获取 ${owner}/${repo} 信息失败:`, error);
        if (error.friendlyMessage) {
          console.warn('[GitHub Service]', error.friendlyMessage);
        }
        errors.push({ owner, repo, error });
        results.push({ owner, repo, data: null, failed: true });
      }
    }

    return {
      successes: results.filter(r => r && !r.failed),
      failures: results.filter(r => r && r.failed),
      errors
    };
  },

  /**
   * 获取当前速率限制状态
   * @returns {Promise<Object>} 包含速率限制信息的Promise
   */
  async getRateLimit() {
    try {
      const response = await githubClient.get('/rate_limit');
      return response.data;
    } catch (error) {
      console.error('获取速率限制信息失败:', error);
      throw error;
    }
  },

  /**
   * 创建取消令牌
   * @returns {Object} 包含token和cancel方法的对象
   */
  createCancelToken() {
    return axios.CancelToken.source();
  },

  /**
   * 清空缓存（仅内存）
   */
  clearCache() {
    repoCache.clear();
  },

  /**
   * 清空持久化缓存（localStorage）
   */
  clearPersistentCache() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_) { /* ignore */ }
  },

  /**
   * 获取持久化缓存状态（调试用）
   */
  getPersistentCacheInfo() {
    const all = readStorage();
    const now = Date.now();
    const entries = Object.entries(all).map(([k, v]) => ({
      key: k,
      ageMs: now - v.timestamp,
      expired: now - v.timestamp > PERSISTENT_TTL,
      isError: !!v.isError
    }));
    return { count: entries.length, entries };
  }
};
