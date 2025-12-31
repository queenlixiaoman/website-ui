import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import ReduxProvider from '@c/ReduxProvider'
import StructuredData from '@c/StructuredData'
import { generateGlobalMetadata, generateOrganizationSchema } from '@/lib/seo'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: [ 'latin' ],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: [ 'latin' ],
  display: 'swap',
})

export const metadata = {
  ...generateGlobalMetadata(),
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

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
