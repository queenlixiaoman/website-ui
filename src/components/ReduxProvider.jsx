'use client'

import { Provider } from 'react-redux'
import store from '@/store'
import { useDeviceDetection } from '@/hooks/useDeviceDetection'

function DeviceDetectionProvider({ children }) {
  // 全局设备检测 - 确保所有页面都能响应窗口大小变化
  useDeviceDetection()
  return children
}

export default function ReduxProvider({ children }) {
  return (
    <Provider store = { store }>
      <DeviceDetectionProvider>
        {children}
      </DeviceDetectionProvider>
    </Provider>
  )
}

