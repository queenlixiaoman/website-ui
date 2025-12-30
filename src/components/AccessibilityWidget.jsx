'use client'

import { useEffect } from 'react'
import {
  userwayCount,
  userwayPosition,
  userwayScriptId,
  userwaySrc,
} from '@/config/plugin'

export default function AccessibilityWidget() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const existing = document.getElementById(userwayScriptId)
    if (existing) return

    const script = document.createElement('script')
    script.id = userwayScriptId
    script.src = userwaySrc
    script.async = true
    script.setAttribute('data-account', userwayCount)
    script.setAttribute('data-position', userwayPosition)
    document.body.appendChild(script)

    return () => {
      // 不移除脚本，保持全局挂载；仅清理事件引用
      script.onload = null
    }
  }, [])

  return null
}


