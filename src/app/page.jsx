import { createGenerateMetadata } from '@/lib/seo'
import HomeClient from './page-client'

// 使用 SEO 模块生成页面 Metadata
export const generateMetadata = createGenerateMetadata({
  title: 'The Haven | New Haven, Connecticut',
  description: 'The Haven is a premier residential community in downtown New Haven, ideally located near Yale University, Yale New Haven Hospital, major businesses, and shopping.',
  url: '/',
})

export default function HomePage() {
  return <HomeClient />
}
