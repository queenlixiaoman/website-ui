import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import ReduxProvider from '@c/ReduxProvider'
import StructuredData from '@c/StructuredData'
import { generateGlobalMetadata, generateOrganizationSchema } from '@/lib/seo'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: [ 'latin' ],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: [ 'latin' ],
})

// 使用 SEO 模块生成全局 Metadata
export const metadata = generateGlobalMetadata()

export default function RootLayout({ children }) {
  // 使用 SEO 模块生成 Organization Schema（知识图谱）
  const organizationSchema = generateOrganizationSchema()

  return (
    <html lang = "en">
      <body className = { `${geistSans.variable} ${geistMono.variable}` }>
        <StructuredData data = { organizationSchema } />
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
