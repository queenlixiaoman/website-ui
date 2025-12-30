export async function onRequest(context) {
  const backendBase = 'https://my-app.lixiaoman941210.workers.dev'

  const pathSegments = context.params.slug || []
  const relativePath = pathSegments.length > 0 ? pathSegments.join('/') : ''

  const backendUrl = new URL(backendBase)
  backendUrl.pathname = `/api/instagram/${relativePath}`
  backendUrl.search = new URL(context.request.url).search // 更准确保留查询参数

  const response = await fetch(backendUrl.toString(), {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.body,
  })

  const proxiedResponse = new Response(response.body, response)
  proxiedResponse.headers.set('Access-Control-Allow-Origin', '*')
  proxiedResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  proxiedResponse.headers.set('Access-Control-Allow-Headers', '*')

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: proxiedResponse.headers })
  }

  return proxiedResponse
}