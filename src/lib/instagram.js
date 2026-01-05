
/**
 * 获取用户信息（服务端函数）
 */
export async function getInstagramUser() {
  try {
    // 改为相对路径，通过 next.config.mjs 的 rewrite 代理到 localhost:3001，解决跨域问题
    const url = '/api/instagram/user'
    const res = await fetch(url)
    const data = await res.json()
    // console.log('[Instagram] User data:', data)

    if (data.error) {
      throw new Error(data.error.message || 'Failed to fetch user data')
    }

    return { success: true, data: data.data }
  } catch (error) {
    console.error('[Instagram] User request failed:', error)
    return { success: false, error: error.message }
  }
}

/**
 * 获取帖子列表（服务端函数）
 * @param {string} after - 分页游标
 */
export async function getInstagramPosts(after = null) {
  try {
    // 使用相对路径，通过 next.config.mjs 代理到后端服务
    let url = '/api/instagram/images'
    if (after) {
      url += `?after=${after}`
    }

    const res = await fetch(url)
    const data = await res.json()

    if (data.error) {
      throw new Error(data.error.message || 'Failed to fetch posts')
    }

    const nextCursor = data.paging?.cursors?.after
    return {
      success: true,
      data: {
        posts: data.data || [],
        nextCursor: nextCursor || null,
      },
    }
  } catch (error) {
    console.error('[Instagram] Posts request failed:', error)
    return { success: false, error: error.message }
  }
}

