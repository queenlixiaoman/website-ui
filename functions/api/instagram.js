export async function onRequest(context) {
  const request = context.request
  const url = new URL(request.url)

  // 提取 /api/instagram 之后的相对路径（支持空路径）
  let relativePath = url.pathname.replace(/^\/api\/instagram\/?/, '')

  // 后端目标基址
  const backendBase = 'https://my-app.lixiaoman941210.workers.dev/api/instagram'

  const backendUrl = new URL(backendBase)
  if (relativePath) {
    // 清理多余斜杠并拼接
    backendUrl.pathname += '/' + relativePath.replace(/\/+$/, '')
  }
  backendUrl.search = url.search // 保留查询参数

  // 调试日志（强烈推荐，部署后看实时日志确认转发）
  console.log('Frontend request:', url.pathname + url.search)
  console.log('Proxying to:', backendUrl.toString())

  const response = await fetch(backendUrl.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'follow',
  })

  const proxiedResponse = new Response(response.body, response)
  proxiedResponse.headers.set('Access-Control-Allow-Origin', '*')
  proxiedResponse.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  proxiedResponse.headers.set('Access-Control-Allow-Headers', '*')

  // 处理预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: proxiedResponse.headers })
  }

  return proxiedResponse
}