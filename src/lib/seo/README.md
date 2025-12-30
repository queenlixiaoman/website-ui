# SEO 模块使用指南

这是一个可复用的 SEO 模块，可以在不同的 Next.js 项目中轻松集成和使用。

## 📦 安装

将以下目录复制到你的项目中：
- `src/lib/seo/` - SEO 核心模块
- `src/components/SEO/` - SEO 组件

## ⚙️ 配置

### 1. 修改配置文件

编辑 `src/lib/seo/config.js`，根据你的项目需求修改以下配置：

```javascript
export const siteConfig = {
  url: 'https://yourdomain.com',           // 网站 URL
  name: 'Your Site Name',                   // 网站名称
  alternateName: 'Your Site',               // 网站别名
  description: 'Your site description',      // 网站描述
  keywords: ['keyword1', 'keyword2'],      // 关键词
  logo: 'https://yourdomain.com/logo.png', // Logo URL
  locale: 'en_US',                          // 语言设置
  titleSeparator: '-',                     // 标题分隔符
}

export const contactConfig = {
  email: 'contact@yourdomain.com',
  phone: '+1-234-567-8900',
  address: {
    streetAddress: '123 Main St',
    addressLocality: 'City',
    addressRegion: 'State',
    postalCode: '12345',
    addressCountry: 'US',
  },
  geo: {
    latitude: 40.7128,
    longitude: -74.0060,
  },
}

export const verificationConfig = {
  google: 'your-google-verification-code',
  // bing: 'your-bing-verification-code',
}
```

## 🚀 使用方法

### 1. 在根 Layout 中使用

在 `src/app/layout.js` 中：

```javascript
import { generateGlobalMetadata, generateOrganizationSchema } from '@/lib/seo'
import StructuredData from '@c//SEO/StructuredData'

// 导出全局 Metadata
export const metadata = generateGlobalMetadata()

export default function RootLayout({ children }) {
  // 生成 Organization Schema
  const organizationSchema = generateOrganizationSchema()

  return (
    <html lang="en">
      <body>
        <StructuredData data={organizationSchema} />
        {children}
      </body>
    </html>
  )
}
```

### 2. 在页面中使用 Metadata

#### 方式一：静态 Metadata

```javascript
import { generatePageMetadata } from '@/lib/seo'

export const metadata = generatePageMetadata({
  title: 'About Us',
  description: 'Learn more about our company',
  url: '/about',
})
```

#### 方式二：动态 Metadata（推荐）

```javascript
import { createGenerateMetadata } from '@/lib/seo'

export const generateMetadata = createGenerateMetadata({
  title: 'About Us',
  description: 'Learn more about our company',
  url: '/about',
})
```

### 3. 生成结构化数据

#### Organization Schema（知识图谱）

```javascript
import { generateOrganizationSchema } from '@/lib/seo'

const orgSchema = generateOrganizationSchema({
  legalName: 'Your Company Legal Name', // 可选
  additionalInfo: [                     // 可选
    { type: 'legalName', value: 'Legal Name' },
  ],
})
```

#### ApartmentComplex Schema（公寓综合体）

```javascript
import { generateApartmentComplexSchema } from '@/lib/seo'

const apartmentSchema = generateApartmentComplexSchema({
  name: 'Your Apartment Complex Name',  // 可选
  alternateName: 'Alternate Name',     // 可选
  description: 'Description',           // 可选
  numberOfUnits: 100,                   // 可选
  floorPlans: [                         // 可选
    {
      name: 'Studio A',
      type: 'Studio',
      bath: '1 Bath',
      sqft: 500,
      image: '/images/studio.jpg',
    },
  ],
  amenityFeatures: [                    // 可选
    { name: 'Luxury Apartments', value: true },
    { name: 'Downtown Location', value: true },
  ],
})
```

### 4. 在页面中使用结构化数据

```javascript
import StructuredData from '@c//SEO/StructuredData'
import { generateApartmentComplexSchema } from '@/lib/seo'

export default function HomePage() {
  const apartmentSchema = generateApartmentComplexSchema({
    floorPlans: plans, // 你的户型数据
    amenityFeatures: [
      { name: 'Luxury Apartments', value: true },
    ],
  })

  return (
    <main>
      <StructuredData data={apartmentSchema} />
      {/* 页面内容 */}
    </main>
  )
}
```

### 5. 生成 Sitemap

在 `src/app/sitemap.ts` 中：

```javascript
import { MetadataRoute } from 'next'
import { generateSitemapEntries } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/contact',
    // 更多路由...
  ]

  return generateSitemapEntries(routes)
}
```

### 6. 生成 Robots.txt

在 `src/app/robots.ts` 中：

```javascript
import { MetadataRoute } from 'next'
import { generateRobotsRules } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return generateRobotsRules({
    allow: ['/'],
    disallow: ['/api/', '/_next/', '/admin/'],
    sitemap: '/sitemap.xml',
  })
}
```

## 📝 完整示例

### 首页示例

```javascript
// src/app/page.jsx
import { createGenerateMetadata, generateApartmentComplexSchema } from '@/lib/seo'
import StructuredData from '@c//SEO/StructuredData'
import { plans } from '@/config/home'

// 生成 Metadata
export const generateMetadata = createGenerateMetadata({
  title: 'Home',
  description: 'Welcome to our apartment complex',
})

export default function HomePage() {
  // 生成结构化数据
  const apartmentSchema = generateApartmentComplexSchema({
    floorPlans: plans,
    numberOfUnits: plans.length,
    amenityFeatures: [
      { name: 'Luxury Apartments', value: true },
      { name: 'Downtown Location', value: true },
    ],
  })

  return (
    <main>
      <StructuredData data={apartmentSchema} />
      {/* 页面内容 */}
    </main>
  )
}
```

### 子页面示例

```javascript
// src/app/about/layout.js
import { createGenerateMetadata } from '@/lib/seo'

export const generateMetadata = createGenerateMetadata({
  title: 'About Us',
  description: 'Learn more about our company and mission',
  url: '/about',
})
```

## 🔧 工具函数

### 生成完整 URL

```javascript
import { getFullUrl } from '@/lib/seo'

const fullUrl = getFullUrl('/about') // https://yourdomain.com/about
```

### 生成页面标题

```javascript
import { generatePageTitle } from '@/lib/seo'

const title = generatePageTitle('About Us') // About Us - Your Site Name
```

## 📚 API 参考

### Metadata 函数

- `generateGlobalMetadata()` - 生成全局 Metadata
- `generatePageMetadata(options)` - 生成页面 Metadata
- `createGenerateMetadata(options)` - 创建 generateMetadata 函数

### Schema 函数

- `generateOrganizationSchema(options)` - 生成 Organization Schema
- `generateApartmentComplexSchema(options)` - 生成 ApartmentComplex Schema
- `generateLocalBusinessSchema(options)` - 生成 LocalBusiness Schema

### 工具函数

- `normalizeUrl(path, trailingSlash)` - 规范化 URL
- `getFullUrl(path)` - 获取完整 URL
- `generatePageTitle(pageTitle)` - 生成页面标题
- `generateSitemapEntries(routes, options)` - 生成 Sitemap 条目
- `generateRobotsRules(options)` - 生成 Robots 规则

## 🎯 最佳实践

1. **统一配置**：所有 SEO 配置集中在 `config.js` 中管理
2. **使用动态 Metadata**：优先使用 `createGenerateMetadata()` 而不是静态 `metadata`
3. **结构化数据**：在相关页面添加合适的 Schema 标记
4. **环境变量**：使用 `NEXT_PUBLIC_SITE_URL` 环境变量设置网站 URL
5. **验证**：使用 Google Search Console 验证网站

## 🔄 迁移现有项目

如果你已经有 SEO 代码，可以按以下步骤迁移：

1. 复制 SEO 模块到项目中
2. 修改 `config.js` 中的配置
3. 替换现有的 metadata 导出为 `generateGlobalMetadata()`
4. 替换页面 metadata 为 `generatePageMetadata()` 或 `createGenerateMetadata()`
5. 替换结构化数据生成为对应的 Schema 函数
6. 更新 sitemap.ts 和 robots.ts 使用工具函数

## 📞 支持

如有问题或建议，请查看代码注释或联系开发团队。

