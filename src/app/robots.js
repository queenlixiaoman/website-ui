import { generateRobotsRules } from '@/lib/seo'

// 静态导出配置
export const dynamic = 'force-static'

export default function robots() {
  // 使用 SEO 模块生成 Robots 规则
  return generateRobotsRules({
    allow: [ '/' ],
    disallow: [ '/api/', '/_next/' ],
    sitemap: '/sitemap.xml',
  })
}

