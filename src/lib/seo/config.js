/**
 * SEO 配置模块
 *
 * 使用说明：
 * 1. 根据项目需求修改以下配置
 * 2. 在 layout.js 中使用 generateGlobalMetadata()
 * 3. 在页面中使用 generatePageMetadata() 或 generateMetadata()
 * 4. 使用 generateOrganizationSchema() 和 generateApartmentComplexSchema() 生成结构化数据
 */

/**
 * 网站基础信息配置
 */
export const siteConfig = {
  // 网站 URL（可通过环境变量覆盖）
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://thehavenoncollege.com',

  // 网站名称
  name: 'The Haven | New Haven, Connecticut',

  // 网站别名
  alternateName: 'The Haven',

  // 网站描述
  description: 'The Haven is a premier residential community in downtown New Haven, ideally located near Yale University, Yale New Haven Hospital, major businesses, and shopping. The residences combine modern style, luxurious amenities, and unmatched convenience for a sophisticated, amenity-rich lifestyle.',

  // 网站关键词
  keywords: [
    'apartments',
    'New Haven',
    'luxury apartments',
    'Yale University',
    'downtown New Haven',
    'student housing',
    'The Haven',
    'New Haven apartments',
    'Yale University housing',
    'downtown New Haven apartments',
  ],

  // Logo URL
  logo: 'https://thehavenoncollege.com/wp-content/uploads/havoclogo.png',

  // 语言设置
  locale: 'en_US',

  // 标题分隔符
  titleSeparator: '-',
}

/**
 * 联系信息配置
 */
export const contactConfig = {
  // 邮箱
  email: 'thehaven@hhredstone.com',

  // 电话
  phone: '(203) 745-4764',

  // 地址信息
  address: {
    streetAddress: '200 College St',
    addressLocality: 'New haven',
    addressRegion: 'CT',
    postalCode: '06510',
    addressCountry: 'US',
  },

  // 地理坐标（可选）
  geo: {
    latitude: 41.3043,
    longitude: -72.9293,
  },
}

/**
 * SEO 验证配置
 */
export const verificationConfig = {
  // Google Search Console 验证码
  google: 'LNT7OZ_4UVjVF0UXP_XjImsvfaTdaq61Vvv8rg_JZNQ',

  // Bing 验证码（可选）
  // bing: 'your-bing-verification-code',
}

/**
 * Robots 配置
 */
export const robotsConfig = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}

/**
 * 社交媒体配置（可选）
 */
export const socialConfig = {
  // Twitter 配置
  twitter: {
    card: 'summary_large_image',
    // site: '@your_twitter_handle', // 可选
  },

  // Facebook App ID（可选）
  // facebookAppId: 'your-facebook-app-id',

  // 社交媒体链接（用于结构化数据）
  sameAs: [
    // 'https://www.facebook.com/yourpage',
    // 'https://twitter.com/yourhandle',
    // 'https://www.instagram.com/yourhandle',
  ],
}

