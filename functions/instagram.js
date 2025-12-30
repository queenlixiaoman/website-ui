export async function onRequest(context) {
  const request = context.request
  const url = new URL(request.url)

  // 提取 /api/instagram 之后的相对路径（包括子路径）
  let relativePath = url.pathname.replace(/^\/instagram/, '') || ''
  if (relativePath.startsWith('/')) relativePath = relativePath.slice(1)

  // 后端基础 URL
  const backendBase = 'https://my-app.lixiaoman941210.workers.dev/api/instagram'

  // 构建目标 URL（保留查询参数）
  const backendUrl = new URL(backendBase)
  if (relativePath) backendUrl.pathname += '/' + relativePath
  backendUrl.search = url.search

  // 转发请求
  const response = await fetch(backendUrl.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'follow',
  })

  // 复制响应并添加 CORS
  const proxiedResponse = new Response(response.body, response)
  proxiedResponse.headers.set('Access-Control-Allow-Origin', '*')
  proxiedResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  proxiedResponse.headers.set('Access-Control-Allow-Headers', '*')

  // 处理 OPTIONS 预检
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: proxiedResponse.headers })
  }

  return proxiedResponse
}