// src/services/githubService.js
import axios from 'axios';

const GITHUB_API = 'https://api.github.com';

// 创建带配置的axios实例
const githubClient = axios.create({
  baseURL: GITHUB_API,
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
});

// 新增：从环境变量获取token
const getGitHubToken = () => {
  // 优先级1：直接从import.meta.env读取（Vite）
  if (import.meta.env.VITE_GITHUB_TOKEN) {
    return import.meta.env.VITE_GITHUB_TOKEN;
  }

  // 优先级2：检查本地存储
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('GITHUB_TOKEN');
  }

  return null;
};

// 初始化时自动设置token
const token = getGitHubToken();
if (token) {
  githubClient.defaults.headers.common['Authorization'] = `token ${token}`;
}

// 请求队列和间隔控制
const requestQueue = [];
const REQUEST_INTERVAL = 1000; // 1秒间隔
let isProcessing = false;

async function processQueue() {
  if (isProcessing || requestQueue.length === 0) return;

  isProcessing = true;
  const { config, resolve, reject } = requestQueue.shift();

  try {
    const response = await githubClient(config);
    resolve(response);
  } catch (error) {
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
   */
  setToken(token, persist = false) {
    githubClient.defaults.headers.common['Authorization'] = `token ${token}`;
    if (typeof localStorage !== 'undefined' && persist) {
      localStorage.setItem('GITHUB_TOKEN', token);
    } else if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('GITHUB_TOKEN', token);
    }
  },

  /**
   * 清除已存储的Token
   */
  clearToken() {
    delete githubClient.defaults.headers.common['Authorization'];
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('GITHUB_TOKEN');
    }
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('GITHUB_TOKEN');
    }
  },

  /**
   * 获取仓库信息（带队列控制）
   * @param {string} owner 仓库所有者
   * @param {string} repo 仓库名称
   * @returns {Promise} 包含仓库信息的Promise
   */
  async getRepoInfo(owner, repo) {
    return new Promise((resolve, reject) => {
      requestQueue.push({
        config: { method: 'get', url: `/repos/${owner}/${repo}` },
        resolve,
        reject
      });
      processQueue();
    });
  },

  /**
   * 批量获取多个仓库信息（带速率限制）
   * @param {Array} repos 仓库数组，格式: [{owner: '', repo: ''}, ...]
   * @param {number} [delay=1000] 请求间隔(ms)
   * @returns {Promise} 包含所有仓库信息的Promise
   */
  async getMultipleReposInfo(repos, delay = 1000) {
    const results = [];

    for (const { owner, repo } of repos) {
      try {
        const repoInfo = await this.getRepoInfo(owner, repo);
        results.push(repoInfo);
        await new Promise(resolve => setTimeout(resolve, delay));
      } catch (error) {
        console.error(`获取 ${owner}/${repo} 信息失败:`, error);
        results.push(null);
      }
    }

    return results.filter(repo => repo !== null);
  },

  /**
   * 获取当前速率限制状态
   * @returns {Promise} 包含速率限制信息的Promise
   */
  async getRateLimit() {
    const response = await githubClient.get('/rate_limit');
    return response.data;
  }
};
