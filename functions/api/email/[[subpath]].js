export async function onRequest(context) {
  const request = context.request
  const url = new URL(request.url)

  // subpath 是数组，包含所有子路径段
  const pathSegments = context.params.subpath || []

  // 拼接相对路径
  const relativePath = pathSegments.join('/')

  // 假设后端服务地址，这里可以根据实际情况修改
  // 参考 instagram 的配置: 'https://my-app.lixiaoman941210.workers.dev/api/email'
  const backendBase = 'https://my-app.lixiaoman941210.workers.dev/api/email'

  const backendUrl = new URL(backendBase)
  if (relativePath) {
    backendUrl.pathname += '/' + relativePath
  }
  backendUrl.search = url.search

  console.log('Frontend email request:', url.pathname + url.search)
  console.log('Proxying to:', backendUrl.toString())

  try {
    const response = await fetch(backendUrl.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'follow',
    })

    const proxiedResponse = new Response(response.body, response)
    
    // 设置 CORS 头
    proxiedResponse.headers.set('Access-Control-Allow-Origin', '*')
    proxiedResponse.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    proxiedResponse.headers.set('Access-Control-Allow-Headers', '*')

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: proxiedResponse.headers })
    }

    return proxiedResponse
  } catch (err) {
    console.error('Proxy error:', err)
    return new Response(JSON.stringify({ error: 'Proxy failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

