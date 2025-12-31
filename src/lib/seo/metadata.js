/**
 * Metadata 生成工具
 *
 * 提供生成 Next.js Metadata 对象的工具函数
 */

import { siteConfig, verificationConfig, robotsConfig, socialConfig } from './config'

/**
 * 生成全局 Metadata（用于根 layout.js）
 *
 * @returns {Object} Next.js Metadata 对象
 *
 * @example
 * // 在 app/layout.js 中使用
 * import { generateGlobalMetadata } from '@/lib/seo'
 * export const metadata = generateGlobalMetadata()
 */
export function generateGlobalMetadata() {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name,
      template: `%s ${siteConfig.titleSeparator} ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [ { name: siteConfig.alternateName } ],
    creator: siteConfig.alternateName,
    publisher: siteConfig.alternateName,
    alternates: {
      canonical: '/',
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url: '/',
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: siteConfig.description,
      images: [
        {
          url: siteConfig.logo,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: socialConfig.twitter.card,
      title: siteConfig.name,
      description: siteConfig.description,
      images: [ siteConfig.logo ],
      ...(socialConfig.twitter.site && { site: socialConfig.twitter.site }),
    },
    robots: robotsConfig,
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
    },
    verification: {
      ...(verificationConfig.google && { google: verificationConfig.google }),
      ...(verificationConfig.bing && { bing: verificationConfig.bing }),
    },
    // 添加 Apple Web App 配置
    appleWebApp: {
      capable: true,
      title: siteConfig.name,
      statusBarStyle: 'default',
    },
  }
}

/**
 * 生成页面 Metadata（用于页面或 layout.js）
 *
 * @param {Object} options - 页面配置选项
 * @param {string} options.title - 页面标题（必填）
 * @param {string} options.description - 页面描述（可选，默认使用全局描述）
 * @param {string} options.url - 页面 URL（可选，默认使用 title）
 * @param {string} options.image - 页面图片（可选，默认使用全局 logo）
 * @param {string} options.type - OpenGraph 类型（可选，默认 'website'）
 * @returns {Object} Next.js Metadata 对象
 *
 * @example
 * // 在页面中使用
 * import { generatePageMetadata } from '@/lib/seo'
 * export const metadata = generatePageMetadata({
 *   title: 'About Us',
 *   description: 'Learn more about our company',
 *   url: '/about',
 * })
 */
export function generatePageMetadata({
  title,
  description = siteConfig.description,
  url,
  image = siteConfig.logo,
  type = 'website',
  absoluteTitle = false, // 是否使用绝对标题（不添加后缀）
}) {
  const pageUrl = url || `/${title.toLowerCase().replace(/\s+/g, '-')}`
  const fullUrl = `${siteConfig.url}${pageUrl}`

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: absoluteTitle ? title : `${title} ${siteConfig.titleSeparator} ${siteConfig.name}`,
      description,
      url: fullUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: siteConfig.locale,
      type,
    },
    twitter: {
      card: socialConfig.twitter.card,
      title: absoluteTitle ? title : `${title} ${siteConfig.titleSeparator} ${siteConfig.name}`,
      description,
      images: [ image ],
      ...(socialConfig.twitter.site && { site: socialConfig.twitter.site }),
    },
  }
}

/**
 * 生成动态 Metadata（用于 generateMetadata 函数）
 *
 * @param {Object} options - 页面配置选项（同 generatePageMetadata）
 * @returns {Function} generateMetadata 函数
 *
 * @example
 * // 在页面中使用
 * import { createGenerateMetadata } from '@/lib/seo'
 * export const generateMetadata = createGenerateMetadata({
 *   title: 'About Us',
 *   description: 'Learn more about our company',
 * })
 */
export function createGenerateMetadata(options) {
  return function generateMetadata() {
    return generatePageMetadata(options)
  }
}

