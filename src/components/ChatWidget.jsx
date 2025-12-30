'use client'

import { useEffect } from 'react'

import {
  knockScriptId,
  knockScriptSrc,
  knockCommunityId,
  knockPropertyId
} from '@/config/plugin'

export default function ChatWidget() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const initDoorway = () => {
      if (!window.knockDoorway || window.knockDoorway.__initialized) return
      window.knockDoorway.init(knockCommunityId, 'community', knockPropertyId)
      // 标记避免重复初始化
      window.knockDoorway.__initialized = true
      // 如果脚本是在 window load 之后插入的，需手动触发注入
      if (
        !window.knockDoorway.isInjected &&
        typeof window.knockDoorway.inject === 'function'
      ) {
        window.knockDoorway.inject()
      }
    }

    // 检查页面中是否已存在指定ID的脚本元素
    const existingScript = document.getElementById(knockScriptId)
    if (existingScript) {
      // 如果脚本已存在，检查全局变量是否已定义
      if (window.knockDoorway) {
        // 全局变量已存在，直接初始化 doorway
        initDoorway()
      } else {
        // 全局变量不存在，等待脚本加载完成后初始化
        existingScript.addEventListener('load', initDoorway, { once: true })
      }
      // 处理完现有脚本逻辑后直接返回
      return
    }

    // 创建并加载 Knock 脚本文件
    // 该代码块负责动态创建 script 标签，加载 Knock 库并初始化门道功能
    const script = document.createElement('script')
    script.id = knockScriptId
    script.src = knockScriptSrc
    script.async = true
    script.onload = initDoorway
    document.body.appendChild(script)

    return () => {
      script.onload = null
      script.removeEventListener?.('load', initDoorway)
    }
  }, [])

  // 插件会自行渲染悬浮按钮，这里无需额外 DOM。
  return null
}
