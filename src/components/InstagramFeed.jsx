'use client'

import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Avatar, Spin, message } from 'antd'
import { Instagram, User, PlayOne, Copy, Camera } from '@icon-park/react'
import { getInstagramUser, getInstagramPosts } from '@/lib/instagram'
import styles from './InstagramFeed.module.css'

const InstagramFeed = () => {
  const [ posts, setPosts ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const [ loadingMore, setLoadingMore ] = useState(false)
  const [ nextCursor, setNextCursor ] = useState(null)
  const [ userInfo, setUserInfo ] = useState(null)

  useEffect(() => {
    loadInitialData()
  }, [])

  /**
   * 加载初始数据
   */
  const loadInitialData = async () => {
    try {
      await Promise.allSettled([ fetchUserData(), fetchPosts() ])
    } catch (error) {
      console.error('Failed to load initial data:', error)
    }
  }

  /**
   * 获取用户信息
   */
  const fetchUserData = async () => {
    const result = await getInstagramUser()
    // console.log('result', result)
    if (result.success && result.data.username) {
      setUserInfo(result.data)
    } else {
      // Silently fail or log to error reporting service
      console.warn('Failed to load Instagram user info')
    }
  }

  /**
   * 获取帖子列表
   * @param {string} after - 分页游标
   */
  const fetchPosts = async (after = null) => {
    try {
      const isInitial = !after
      if (!isInitial) {
        setLoadingMore(true)
      }

      const result = await getInstagramPosts(after)

      if (result.success) {
        setPosts((prev) => (isInitial ? result.data.posts : [ ...prev, ...result.data.posts ]))
        setNextCursor(result.data.nextCursor)
      } else {
        message.error(result.error || 'Failed to load Instagram posts')
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      message.error('Failed to load Instagram posts')
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  /**
   * 加载更多
   */
  const handleLoadMore = () => {
    if (nextCursor) {
      fetchPosts(nextCursor)
    }
  }

  /**
   * 跳转到 Instagram 主页
   */
  const handleFollow = () => {
    const username = userInfo?.username || 'hh_ithaca'
    window.open(`https://www.instagram.com/${username}`, '_blank')
  }

  if (loading && posts.length === 0) {
    return (
      <div className = { styles.loadingContainer }>
        <Spin size = "large" />
      </div>
    )
  }

  return (
    <div className = { styles.container }>
      {/* User */}
      <div className = { styles.header }>
        <div className = { styles.userInfo }>
          <div className = { styles.userAvatar } onClick = { handleFollow }>
            <Avatar
              size = { 50 }
              icon = { <User theme = "outline" size = { 24 } fill = "#fff" /> }
              src = { userInfo?.profile_picture_url || null }
              className = { styles.avatar }
              alt = { userInfo?.username ? `${userInfo.username} Instagram profile` : 'Instagram user profile' }
            >
              {userInfo?.username && (
                <span className="visually-hidden">{userInfo.username}</span>
              )}
            </Avatar>
            <div className = { styles.avatarOverlay }>
              <Camera theme = "outline" size = "24" fill = "#fff" />
            </div>
          </div>
          <div>
            <div className = { styles.userName }>
              {userInfo?.username}
            </div>
            <div className = { styles.instagramLabel }>on Instagram</div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className = { styles.grid }>
        <Row gutter = { [ 16, 16 ] }>
          {posts.map((post) => {
            const imageUrl =
              post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url
            const isVideo = post.media_type === 'VIDEO'
            const isAlbum = post.media_type === 'CAROUSEL_ALBUM'

            return (
              <Col xs = { 12 } sm = { 12 } md = { 8 } lg = { 6 } key = { post.id }>
                <a
                  href = { post.permalink }
                  target = "_blank"
                  rel = "noopener noreferrer"
                  className = { styles.imageLink }
                >
                  <div className = { styles.imageWrapper }>
                    {imageUrl ? (
                      <img
                        src = { imageUrl }
                        alt = { post.caption ? `Instagram post: ${post.caption.slice(0, 50)}...` : 'The Haven on Instagram' }
                        className = { styles.image }
                        loading = "lazy"
                        width = "300"
                        height = "300"
                      />
                    ) : (
                      <div className = { styles.placeholder }>No Image</div>
                    )}

                    {/* Video Indicator */}
                    {isVideo && (
                      <div className = { styles.videoOverlay }>
                        <PlayOne theme = "filled" size = "80" fill = "#ffffff" />
                      </div>
                    )}

                    {/* Album/Carousel Indicator 相册类型 */}
                    {isAlbum && (
                      <div className = { styles.iconOverlay }>
                        <Copy
                          theme = "outline"
                          size = { 24 }
                          fill = "#fff"
                          strokeWidth = { 3 }
                        />
                      </div>
                    )}
                  </div>
                </a>
              </Col>
            )
          })}
        </Row>
      </div>

      {/* Footer */}
      <div className = { styles.footer }>
        <Button
          className = { styles.loadMoreBtn }
          onClick = { handleLoadMore }
          loading = { loadingMore }
        >
            Load More...
        </Button>

        <Button
          className = { styles.followBtn }
          onClick = { handleFollow }
          icon = { <Instagram theme = "outline" size = { 18 } fill = "#fff" /> }
        >
          Follow on Instagram
        </Button>
      </div>
    </div>
  )
}

export default InstagramFeed
