export async function onRequest(context) {
  const backendUrl = 'https://my-app.lixiaoman941210.workers.dev/api/instagram/info' // 替换为后端实际路径

  // 转发请求，包括方法、头和 body
  const response = await fetch(backendUrl, {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.body,
    redirect: 'follow' // 如果需要跟随重定向
  })

  // 返回后端响应（可选：添加 CORS 头，如果跨域问题）
  const proxiedResponse = new Response(response.body, response)
  proxiedResponse.headers.set('Access-Control-Allow-Origin', '*') // 根据需要调整

  return proxiedResponse
}