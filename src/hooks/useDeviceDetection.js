import { Grid } from 'antd'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { changeDevice } from '@/store/device'

const { useBreakpoint } = Grid

/**
 * 全局设备检测 Hook
 * 监听窗口大小变化，自动更新 Redux store 中的设备类型
 * 应在 LayoutShell 等全局组件中使用，确保所有页面都能响应窗口变化
 */
export function useDeviceDetection() {
  const dispatch = useDispatch()
  const screens = useBreakpoint()

  useEffect(() => {
    dispatch(changeDevice(screens.lg ?? false))
  }, [ screens.lg ])
}

