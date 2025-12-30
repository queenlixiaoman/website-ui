export async function onRequest(context) {
  const request = context.request
  const url = new URL(request.url)

  // 提取 /instagram 之后的路径（支持 /instagram/info 和 /instagram）
  let relativePath = url.pathname.replace(/^\/instagram\/?/, '')

  const backendBase = 'https://my-app.lixiaoman941210.workers.dev/api/instagram'

  const backendUrl = new URL(backendBase)
  if (relativePath) {
    backendUrl.pathname += '/' + relativePath
  }
  backendUrl.search = url.search

  // 加日志调试（部署后看实时日志）
  console.log('Incoming path:', url.pathname)
  console.log('Relative path:', relativePath)
  console.log('Proxy to:', backendUrl.toString())

  const response = await fetch(backendUrl.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'follow',
  })

  const proxiedResponse = new Response(response.body, response)
  proxiedResponse.headers.set('Access-Control-Allow-Origin', '*')
  // ... 其他 CORS

  return proxiedResponse
}