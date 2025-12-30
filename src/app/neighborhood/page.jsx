'use client'

import { useState, useCallback } from 'react'
import { MenuFold, MenuUnfold } from '@icon-park/react'

import { headerColor } from '@/config/neighborhood'
import LayoutShell from '@c//LayoutShell'
import NeighborhoodMap from './components/NeighborhoodMap'
import NeighborhoodSidebar from './components/NeighborhoodSidebar'

import styles from './page.module.css'

export default function Neighborhood() {
  const [ selectedLocation, setSelectedLocation ] = useState(null)
  const [ sidebarVisible, setSidebarVisible ] = useState(true)

  /**
   * 处理位置选择事件的回调函数
   * @param {Object} location - 被选择的位置对象
   * @returns {void}
   */
  const handleLocationSelect = useCallback((location) => {
    setSelectedLocation(location)
  }, [])

  /**
 * 处理侧边栏位置点击事件的回调函数
 * @param {Object} location - 被点击的位置对象
 * @param {string} type - 位置类型
 * @returns {void}
 */
  const handleSidebarLocationClick = useCallback((location, type) => {
    setSelectedLocation({ ...location, type })
  }, [])

  return (
    <main>
      <LayoutShell headerColor = { headerColor } isFullWidth = { true }>
        <div className = { styles.container }>

          <NeighborhoodSidebar
            selectedLocation = { selectedLocation }
            onLocationClick = { handleSidebarLocationClick }
            visible = { sidebarVisible }
          />

          <div className = { styles.mapWrapper }>
            <div
              className = { styles.toggleSidebarBtn }
              onClick = { () => setSidebarVisible(!sidebarVisible) }
            >
              {sidebarVisible ? <MenuFold size = { 20 } /> : <MenuUnfold size = { 20 } />}
            </div>

            <NeighborhoodMap
              selectedLocation = { selectedLocation }
              onLocationSelect = { handleLocationSelect }
            />
          </div>

        </div>
      </LayoutShell>
    </main>
  )
}
