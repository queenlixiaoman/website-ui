export async function onRequest(context) {
  const request = context.request
  const url = new URL(request.url)

  // subpath 是数组，包含所有子路径段（如 ['info'] 或 ['reels', 'abc', 'def']）
  const pathSegments = context.params.subpath || []

  // 拼接相对路径
  const relativePath = pathSegments.join('/')

  const backendBase = 'https://my-app.lixiaoman941210.workers.dev/api/instagram'

  const backendUrl = new URL(backendBase)
  if (relativePath) {
    backendUrl.pathname += '/' + relativePath
  }
  backendUrl.search = url.search

  // 调试日志（超级有用！）
  console.log('Frontend request:', url.pathname + url.search)
  console.log('Proxying to:', backendUrl.toString())
  console.log('Params:', context.params)

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

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: proxiedResponse.headers })
  }

  return proxiedResponse
}