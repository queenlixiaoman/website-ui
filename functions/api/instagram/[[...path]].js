export async function onRequest(context) {
  // 基础后端 URL
  const backendBase = 'https://my-app.lixiaoman941210.workers.dev'

  // 获取匹配的子路径（可能是空数组）
  const pathSegments = context.params.path || []
  // 拼接成 /api/instagram/xxx/yyy
  const relativePath = pathSegments.length > 0 ? pathSegments.join('/') : ''

  // 完整的后端目标 URL
  const backendUrl = new URL(backendBase)
  backendUrl.pathname = `/api/instagram/${relativePath}`
  // 保留客户端原始查询参数（如 ?username=xxx）
  backendUrl.search = context.request.url.split('?')[1] || ''

  // 转发请求（保留方法、headers、body）
  const response = await fetch(backendUrl.toString(), {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.body,
    redirect: 'follow',
  })

  // 创建新响应，复制状态码、headers、body
  const proxiedResponse = new Response(response.body, response)

  // 添加 CORS（前端调用时必需，否则浏览器会跨域阻塞）
  proxiedResponse.headers.set('Access-Control-Allow-Origin', '*')
  proxiedResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  proxiedResponse.headers.set('Access-Control-Allow-Headers', '*')

  // 处理预检请求（OPTIONS）
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: proxiedResponse.headers,
    })
  }

  return proxiedResponse
}