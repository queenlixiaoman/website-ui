# SEO 模块快速集成指南

## 📦 复制文件

将以下目录复制到你的项目中：

```
src/
├── lib/
│   └── seo/              # SEO 核心模块
│       ├── config.js     # 配置文件（需要修改）
│       ├── metadata.js   # Metadata 生成函数
│       ├── schema.js     # 结构化数据生成函数
│       ├── utils.js      # 工具函数
│       ├── index.js      # 统一导出
│       └── README.md     # 详细文档
└── components/
    └── SEO/
        └── StructuredData.jsx  # 结构化数据组件
```

## ⚙️ 快速配置（3 步）

### 1. 修改配置文件

编辑 `src/lib/seo/config.js`，修改以下配置：

```javascript
export const siteConfig = {
  url: 'https://yourdomain.com',        // ← 修改这里
  name: 'Your Site Name',                // ← 修改这里
  alternateName: 'Your Site',            // ← 修改这里
  description: 'Your description',        // ← 修改这里
  // ... 其他配置
}

export const contactConfig = {
  email: 'your@email.com',               // ← 修改这里
  phone: '+1-234-567-8900',              // ← 修改这里
  address: { /* ... */ },                 // ← 修改这里
}
```

### 2. 在 Layout 中使用

在 `src/app/layout.js` 中：

```javascript
import { generateGlobalMetadata, generateOrganizationSchema } from '@/lib/seo'
import StructuredData from '@c//SEO/StructuredData'

export const metadata = generateGlobalMetadata()

export default function RootLayout({ children }) {
  const orgSchema = generateOrganizationSchema()
  
  return (
    <html lang="en">
      <body>
        <StructuredData data={orgSchema} />
        {children}
      </body>
    </html>
  )
}
```

### 3. 在页面中使用

在页面文件（如 `src/app/page.jsx`）中：

```javascript
import { createGenerateMetadata } from '@/lib/seo'

export const generateMetadata = createGenerateMetadata({
  title: 'Home',
  description: 'Welcome to our site',
})
```

## ✅ 完成！

现在你的项目已经集成了 SEO 功能。

## 📚 更多用法

查看 `README.md` 了解：
- 生成结构化数据
- 配置 Sitemap
- 配置 Robots.txt
- 高级用法和最佳实践

## 🔄 从旧代码迁移

如果你已经有 SEO 代码，可以：

1. **替换 metadata 导出**：
   ```javascript
   // 旧代码
   export const metadata = { /* ... */ }
   
   // 新代码
   import { generateGlobalMetadata } from '@/lib/seo'
   export const metadata = generateGlobalMetadata()
   ```

2. **替换 generateMetadata**：
   ```javascript
   // 旧代码
   export function generateMetadata() {
     return { /* ... */ }
   }
   
   // 新代码
   import { createGenerateMetadata } from '@/lib/seo'
   export const generateMetadata = createGenerateMetadata({
     title: 'Page Title',
     description: 'Page description',
   })
   ```

3. **替换结构化数据**：
   ```javascript
   // 旧代码
   const schema = { '@context': '...', /* ... */ }
   
   // 新代码
   import { generateApartmentComplexSchema } from '@/lib/seo'
   const schema = generateApartmentComplexSchema({ /* ... */ })
   ```

## 🎯 核心优势

- ✅ **统一配置**：所有 SEO 配置集中管理
- ✅ **类型安全**：完整的 TypeScript 支持
- ✅ **易于维护**：清晰的代码结构和注释
- ✅ **可复用**：可在多个项目中轻松复用
- ✅ **符合标准**：遵循 Next.js 和 Schema.org 最佳实践

