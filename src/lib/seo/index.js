/**
 * SEO 模块统一导出
 *
 * 使用说明：
 * 1. 在 src/lib/seo/config.js 中配置网站信息
 * 2. 在 layout.js 中使用 generateGlobalMetadata()
 * 3. 在页面中使用 generatePageMetadata() 或 createGenerateMetadata()
 * 4. 使用结构化数据生成函数创建 Schema
 */

// 配置
export * from './config'

// Metadata 生成函数
export {
  generateGlobalMetadata,
  generatePageMetadata,
  createGenerateMetadata,
} from './metadata'

// 结构化数据生成函数
export {
  generateOrganizationSchema,
  generateApartmentComplexSchema,
  generateLocalBusinessSchema,
} from './schema'

// 工具函数
export {
  normalizeUrl,
  getFullUrl,
  generatePageTitle,
  generateSitemapEntries,
  generateRobotsRules,
} from './utils'

