import StructuredData from '@c/StructuredData'
import { createGenerateMetadata, generateApartmentComplexSchema } from '@/lib/seo'
import HomeClient from './page-client'

// 使用 SEO 模块生成页面 Metadata
export const generateMetadata = createGenerateMetadata({
  title: 'The Haven | New Haven, Connecticut',
  description: 'The Haven is a premier residential community in downtown New Haven, ideally located near Yale University, Yale New Haven Hospital, major businesses, and shopping.',
  url: '/',
  absoluteTitle: true,
})

export default function HomePage() {
  // 生成公寓综合体结构化数据
  const apartmentSchema = generateApartmentComplexSchema({
    name: 'The Haven',
    amenityFeatures: [
      { name: 'Pet Friendly', value: true },
      { name: 'Wheelchair Accessible', value: true },
      { name: 'Studio Apartments', value: true },
      { name: '1 Bedroom Apartments', value: true },
      { name: '2 Bedroom Apartments', value: true },
      { name: 'Near Yale University', value: true },
    ],
    // 简单的户型示例，实际应从数据源获取
    floorPlans: [
      { name: 'Studio', type: 'Studio', bath: '1' },
      { name: '1 Bedroom', type: '1', bath: '1' },
      { name: '2 Bedroom', type: '2', bath: '2' },
    ],
  })

  return (
    <>
      <StructuredData data={apartmentSchema} />
      <HomeClient />
    </>
  )
}
