/**
 * InfoWindow 内容组件
 * 用于在地图上显示地点详细信息
 */
'use client'

import { Image } from 'antd'
import styles from './NeighborhoodMap.module.css'

/**
 * InfoWindow 内容组件
 * @param {Object} props - 组件属性
 * @param {Object} props.location - 地点信息对象
 * @returns {ReactElement|null} InfoWindow 内容
 */
export default function InfoWindowContent({ location }) {
  if (!location) return null

  const isMainLocation = location.type === 'main'
  const containerClass = isMainLocation ? styles.infoWindowMain : styles.infoWindow

  return (
    <div className = { containerClass }>
      {/* 主地点显示图片 */}
      {isMainLocation && location.image && (
        <div className = { styles.infoImageWrapper }>
          <Image
            src = { location.image }
            alt = { location.name }
            className = { styles.infoImage }
            preview = { {
              mask: <div style = { { fontSize: 14 } }>Preview</div>,
              getContainer: 'body'
            } }
          />
        </div>
      )}

      {/* 地点信息 */}
      <div className = { styles.infoContent }>
        <div className = { styles.infoTitle }>{location.name}</div>
        <div className = { styles.infoAddress }>{location.address}</div>
      </div>
    </div>
  )
}

