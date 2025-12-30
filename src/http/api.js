
const API_BASE_URL = 'http://192.168.29.2:7020'
// 全局 fetch 包装函数，添加默认 headers
const apiFetch = async (path, options = {}) => {
  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`
  const defaultHeaders = {
    'Content-Type': 'application/json',
    // 在这里添加其他全局 headers，例如：
    // 'Authorization': 'Bearer your-token',
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  })

  return response
}

export default apiFetch