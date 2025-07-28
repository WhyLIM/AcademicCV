// src/services/githubService.js
import axios from 'axios';

const GITHUB_API = 'https://api.github.com';

// 缓存配置
const repoCache = new Map();
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24小时缓存
const MAX_CACHE_SIZE = 100; // 最大缓存数量
const ERROR_CACHE_EXPIRY = 5 * 60 * 1000; // 错误缓存5分钟

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
}, 60 * 60 * 1000); // 每小时清理一次

// 安全获取环境变量
const getGitHubToken = () => {
  // Vite环境
  if (import.meta.env?.VITE_GITHUB_TOKEN) {
    return import.meta.env.VITE_GITHUB_TOKEN;
  }

  // 浏览器环境
  if (typeof window !== 'undefined') {
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

    // 检查缓存
    if (repoCache.has(cacheKey)) {
      const cached = repoCache.get(cacheKey);
      if (Date.now() - cached.timestamp < cached.expiry) {
        if (cached.isError) {
          throw cached.data;
        }
        return cached.data;
      }
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
          resolve(response);
        },
        reject: (error) => {
          if (!axios.isCancel(error)) {
            addToCache(cacheKey, error, true);
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
        results.push(repoInfo);

        // 最后一个请求不需要等待
        if (index < repos.length - 1) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      } catch (error) {
        console.error(`获取 ${owner}/${repo} 信息失败:`, error);
        errors.push(error);
        results.push(null);
      }
    }

    return {
      successes: results.filter(repo => repo !== null),
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
   * 清空缓存
   */
  clearCache() {
    repoCache.clear();
  }
};
