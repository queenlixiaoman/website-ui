'use client'

import { useEffect } from 'react'

import LayoutShell from '@c/LayoutShell'
import HomeFloorPlans from '@c/HomeFloorPlans'
import InstagramFeed from '@c/InstagramFeed'
import StructuredData from '@c/StructuredData'
import { generateApartmentComplexSchema } from '@/lib/seo'
import { headerColor, plans } from '@/config/home'
import { header } from '@/config/common'

import style from './page.module.css'

export default function HomeClient() {
  // 获取构建信息 上线时候去掉
  useEffect(() => {
    fetch('/build-info.json')
      .then((res) => res.json())
      .then((data) => {
        console.log(
          `%cLhy 构建时间: ${data.buildTime}`,
          'color: #1890ff; font-size: 14px; font-weight: bold;'
        )
      })
      .catch((err) => {
        console.error('Failed to fetch build info:', err)
      })
  }, [])

  // 使用 SEO 模块生成 ApartmentComplex Schema
  const apartmentSchema = generateApartmentComplexSchema({
    alternateName: header.formerName,
    numberOfUnits: plans.length,
    floorPlans: plans,
    amenityFeatures: [
      { name: 'Luxury Apartments', value: true },
      { name: 'Downtown Location', value: true },
      { name: 'Near Yale University', value: true },
    ],
  })

  return (
    <main>
      <StructuredData data = { apartmentSchema } />
      <LayoutShell headerColor = { headerColor }>
        <main className = { style.mainContent }>
          <HomeFloorPlans />
          <InstagramFeed />
        </main>
      </LayoutShell>
    </main>
  )
}

