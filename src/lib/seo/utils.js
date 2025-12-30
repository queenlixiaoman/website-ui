/**
 * SEO 工具函数
 *
 * 提供常用的 SEO 相关工具函数
 */

import { siteConfig } from './config'

/**
 * 规范化 URL
 *
 * @param {string} path - 路径
 * @param {boolean} trailingSlash - 是否添加尾部斜杠
 * @returns {string} 规范化后的 URL
 */
export function normalizeUrl(path, trailingSlash = true) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  if (trailingSlash && !cleanPath.endsWith('/') && cleanPath !== '/') {
    return `${cleanPath}/`
  }
  return cleanPath
}

/**
 * 生成完整的 URL
 *
 * @param {string} path - 路径
 * @returns {string} 完整的 URL
 */
export function getFullUrl(path = '') {
  const normalizedPath = normalizeUrl(path, false)
  return `${siteConfig.url}${normalizedPath}`
}

/**
 * 生成页面标题
 *
 * @param {string} pageTitle - 页面标题
 * @returns {string} 完整的页面标题
 */
export function generatePageTitle(pageTitle) {
  return `${pageTitle} ${siteConfig.titleSeparator} ${siteConfig.name}`
}

/**
 * 生成 Sitemap 条目
 *
 * @param {Array} routes - 路由列表
 * @param {Object} options - 配置选项
 * @param {string} options.baseUrl - 基础 URL（可选）
 * @returns {Array} Sitemap 条目数组
 */
export function generateSitemapEntries(routes = [], { baseUrl = siteConfig.url } = {}) {
  return routes.map((route) => {
    const url = typeof route === 'string' ? route : route.url
    const normalizedUrl = normalizeUrl(url, true)

    return {
      url: `${baseUrl}${normalizedUrl}`,
      lastModified: route.lastModified || new Date(),
      changeFrequency: route.changeFrequency || (url === '' ? 'weekly' : 'monthly'),
      priority: route.priority !== undefined ? route.priority : (url === '' ? 1.0 : 0.8),
    }
  })
}

/**
 * 生成 Robots.txt 规则
 *
 * @param {Object} options - 配置选项
 * @param {Array} options.allow - 允许的路径（默认 ['/']）
 * @param {Array} options.disallow - 禁止的路径（默认 ['/api/', '/_next/']）
 * @param {string} options.sitemap - Sitemap URL（可选）
 * @returns {Object} Robots 配置对象
 */
export function generateRobotsRules({
  allow = [ '/' ],
  disallow = [ '/api/', '/_next/' ],
  sitemap,
} = {}) {
  return {
    rules: [
      {
        userAgent: '*',
        allow,
        disallow,
      },
    ],
    ...(sitemap && { sitemap: `${siteConfig.url}${sitemap.startsWith('/') ? sitemap : `/${sitemap}`}` }),
  }
}

