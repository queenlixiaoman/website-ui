# HH-website


**环境需求**

- Node.js (recommended: 18+)
- Yarn 1.22.22

**项目概览**

- **名称**: `hh-website`
- **说明**: 基于 Next.js（App Router）的简单网站模板，包含最少的配置，用于本地开发与生产部署。

**快速开始**

- **安装依赖**: 使用 `yarn` 安装项目依赖。
- **开发（热重载）**: 使用 `yarn dev` 启动开发服务器。
- **生产构建**: 使用 `yarn build` 生成生产构建，之后用 `yarn start` 启动。

**目录结构与文件说明**

- **`package.json`**: 项目元信息与脚本。常用脚本：`dev`、`build`、`start`、`lint`。
- **`next.config.mjs`**: Next.js 配置文件，用于自定义构建/运行时行为。
- **`eslint.config.mjs`**: ESLint 配置。
- **`jsconfig.json`**: 编辑器路径与别名设置（可改善自动补全与跳转）。
- **`public/`**: 静态资源目录，放置图片、favicon 等，构建后可通过 `/文件名` 访问。
- **`src/`**: 源码目录（主要开发在此）。
  - **`src/app/`**: 使用 App Router 的页面与布局。
    - `layout.js`: 根布局（RootLayout），所有页面都会套的根布局放导航栏、footer,在其中引入全局字体与 `globals.css`，并定义站点元数据（`metadata`）。
    - `page.jsx`: 根路由首页组件，示例包含图片、CTA 链接等，作为开始编辑的入口。
    - `page.module.css`: `page.jsx` 对应的 CSS module（局部样式）。
    - `globals.css`: 全局样式（颜色变量、暗色模式、基础重置等）。
    - `app/not-found.jsx` 404 页面任意 404 自动跳这里
    - `app/loading.jsx` 加载中骨架屏数据加载时自动显示
    - `app/error.jsx` 错误页面页面报错时显示

**技术栈 / 依赖**

- **Next.js**: `16.0.6`（App Router 项目结构）。
- **React / React DOM**: `19.2.0`。
- **ESLint**: 项目包含 `eslint` 与 `eslint-config-next`，用于保持代码质量。
- **Next 字体工具**: 从 `src/app/layout.js` 可以看到使用 `next/font/google`（项目使用 `Geist` 与 `Geist_Mono` 字体作为示例）。

（详见 `package.json` 中的 `dependencies` 与 `devDependencies`）

**在本地运行**

1. 安装依赖（macOS / zsh 示例）：

```zsh
# 或使用 yarn
yarn
```

2. 启动开发服务器（热重载）:

```zsh
yarn dev
```

3. 访问站点：在浏览器打开 `http://localhost:3000`。

4. 生产构建与运行：

```zsh
yarn build
yarn start
```

5. 若需更改端口（开发时）：

```zsh
PORT=4000 yarn dev
```

6. 环境变量：使用 `.env.local` 存放本地私密变量（已在gitignore中忽略）。

**开发说明 / 常用修改点**

- **修改首页内容**: 编辑 `src/app/page.jsx` 与 `src/app/page.module.css`。
- **修改全局样式**: 编辑 `src/app/globals.css`（定义颜色变量、暗黑模式等）。
- **修改布局/元数据**: 编辑 `src/app/layout.js`（这里还示例了如何通过 `next/font/google` 引入字体，并将字体变量应用到 `<body>`）。
- **添加静态资源**: 将资源放进 `public/`，在代码中通过 `/资源名` 访问。
- **代码检查**: 使用 `yarn lint`（项目已配置 `eslint`）。

**部署及开发建议**

- 在支持 Node 的主机上启动  先运行 `yarn build`，再用 `yarn start`
- 使用 Docker 容器化部署 参照dockerImage文件夹中的README.md
- 开发编译指定(一般不需要指定)
```bash
// app/about/page.jsx
export const dynamic = 'force-static'    // → SSG 静态生成
export const dynamic = 'force-dynamic'   // → SSR 服务端渲染，完全动态，每次请求都跑服务器代码
export const revalidate = 60             // → ISR 增量静态再生（每60秒后台自动更新一次）
```

7. 命令介绍

```bash
yarn build:docker # 本地构建镜像并部署至本地

yarn build:deploy # 本地打包部署至工作站
```


**路由操作方法**

场景推荐写法

| 场景 | 写法 | 示例 |
|------|------|------|
| 1. 普通跳转（最常用） | useRouter() + push | jsx |
| 2. 不刷新页面、保留状态（SPA 感觉） | 同上 | router.push自动不刷新，速度飞快 |
| 3. 刷新当前页面（强制重新加载）| router.refresh() | jsx<br><button onClick={() => router.refresh()}>刷新页面</button> |
| 4. 返回上一页 | router.back() | jsx<br><button onClick={() => router.back()}>返回</button> |
| 5. 跳转到动态路由（比如 /blog/123） | router.push('/blog/123') | 支持参数 |
| 6. 带参数跳转（推荐） | router.push('/search?q=nextjs') | 查询参数直接写在路径里 |
| 7. 标签式跳转（像 a 标签） | <Link href="/about">（推荐用于导航菜单） | jsx<br>import Link from 'next/link'<br><Link href="/about">关于我们</Link> |
| 8. 编程式跳转 + 带 state（传数据） | router.push('/login', { shallow: true }) 或用 context | 复杂场景用全局状态管理（zustand、context） |

图标建议

```bash
yarn add @icon-park/react
```

参考网址: https://iconpark.oceanengine.com/

## 文档索引 (Docs Index)

统一列出项目中的主要说明文档，便于快速定位：

| 文件 | 说明 |
|------|------|
| `readme.md` | 项目总体介绍与结构 |
| `dockerImage/README.md` | Docker镜像构建脚本 |


### 参考文档

模版： https://vercel.com/templates

学习参考： https://nextjs.org/learn
