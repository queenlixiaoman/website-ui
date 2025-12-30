import { generateSitemapEntries } from '@/lib/seo'

// 静态导出配置
export const dynamic = 'force-static'

export default function sitemap() {
  // 主要页面路由
  const routes = [
    '',
    '/neighborhood',
    // 可以根据需要添加更多路由
    // '/floorPlans',
    // '/amenities',
    // '/apply',
  ]

  // 使用 SEO 模块生成 Sitemap 条目
  return generateSitemapEntries(routes)
}

