import { createGenerateMetadata } from '@/lib/seo'

// 使用 SEO 模块生成页面 Metadata
export const generateMetadata = createGenerateMetadata({
  title: 'Neighborhood',
  description: 'Explore the vibrant neighborhood around The Haven | New Haven, Connecticut. Discover nearby restaurants, cafes, points of interest, and transportation options in downtown New Haven, CT.',
  url: '/neighborhood',
})

export default function NeighborhoodLayout({ children }) {
  return children
}

