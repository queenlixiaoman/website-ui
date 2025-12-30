/** @type {import('next').NextConfig} */

const buildMode = process.env.BUILD_MODE === 'static'
const isDev = process.env.NODE_ENV === 'development'

const nextConfig = buildMode
  ?
  // 静态导出配置
  {
    // 隐藏map文件
    productionBrowserSourceMaps: false,
    output: 'export',
    trailingSlash: true, // 静态导出时在路径后添加斜杠
    images: {
      unoptimized: true, // 禁用图片优化
    },
    experimental: {
    // 可选：进一步加强压缩（对体积影响 5~15MB）
      optimizePackageImports: [
      // 项目里的大包都写上
        'lodash', 'antd', 'echarts', '@ant-design/icons', 'dayjs', 'axios'
      ],
    },
  }
  :
  // 服务器运行配置
  {
    // 隐藏map文件
    productionBrowserSourceMaps: false,
    output: 'standalone',
    async rewrites() {
    // 实际运行可根据情况去掉/
      const destination = isDev
        ? 'http://192.168.29.2:7020/api/:path*' + '/'
        : 'http://192.168.29.2:7020/api/:path*' + '/'

      return [
        // Instagram 代理规则：优先匹配
        {
          source: '/api/instagram/:path*',
          destination: 'https://my-app.lixiaoman941210.workers.dev/api/instagram/:path*',
        },
        // 代理到外部API
        {
          source: '/api/:path*',
          destination,
          has: [
            {
              type: 'header',
              key: 'Content-Type',
              value: 'application/json',
            },
          ],
        },
      ]
    },
    async headers() {
      return [
        {
          source: '/api/:path*',
          headers: [
            { key: 'Access-Control-Allow-Credentials', value: 'true' },
            { key: 'Access-Control-Allow-Origin', value: '*' },
            { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
            { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
          ],
        },
      ]
    },

    // Next.js 16 默认使用 swc，无需配置 swcMinify
    // 可选：进一步加强压缩（对体积影响 5~15MB）
    experimental: {
      optimizePackageImports: [
      // 项目里的大包都写上
        'lodash', 'antd', 'echarts', '@ant-design/icons', 'dayjs', 'axios'
      ],
      // 缩减 standalone 复制的 node_modules 体积：排除无运行时意义的内容
      outputFileTracingExcludes: {
        '*': [
          './node_modules/webpack/**',
          './node_modules/terser/**',
          './node_modules/esbuild/**',
        ],
      },
    },
  }

export default nextConfig