'use client'

import React, { useMemo, useEffect } from 'react'
import { APIProvider, Map, Marker, InfoWindow, useMap } from '@vis.gl/react-google-maps'

import { center, mainLocation, categories } from '@/config/neighborhood'
import { MAP_CONFIG, MARKER_Z_INDEX } from '../constants'
import InfoWindowContent from './InfoWindowContent'
import styles from './NeighborhoodMap.module.css'

const API_KEY = 'AIzaSyBtm-9zAS4AWUo7iwqUVi6IHUgJo8UpOOo'

/**
 * 地图副作用处理组件
 * 用于处理地图的编程式控制（如平移），而不破坏 Map 的非受控状态
 */
const MapEffect = ({ selectedLocation }) => {
  const map = useMap()

  useEffect(() => {
    if (!map || !selectedLocation) return

    map.panTo({ lat: selectedLocation.lat, lng: selectedLocation.lng })
  }, [ map, selectedLocation ])

  return null
}

/**
 * 带有自定义图标的 Marker 组件
 * 确保只能在 google.maps API 加载完成后渲染
 */
const MarkerWithIcon = ({ item, selectedLocation, onClick }) => {
  // 如果 API 尚未加载，不渲染 Marker
  if (!window.google || !window.google.maps) return null

  const isSelected = selectedLocation && (
    (selectedLocation.id === 'main' && item.uid === 'main') ||
    (selectedLocation.name === item.uid)
  )

  const zIndex = isSelected
    ? MARKER_Z_INDEX.selected
    : (item.type === 'main' ? MARKER_Z_INDEX.main : MARKER_Z_INDEX.default)

  const icon = {
    url: item.iconUrl,
    scaledSize: new window.google.maps.Size(30, 30),
    anchor: new window.google.maps.Point(15, 15)
  }

  return (
    <Marker
      position = { { lat: item.lat, lng: item.lng } }
      icon = { icon }
      title = { item.name }
      zIndex = { zIndex }
      onClick = { onClick }
    />
  )
}

/**
 * 街区地图组件
 * 使用 @vis.gl/react-google-maps 官方库
 */
export default function NeighborhoodMap({
  selectedLocation,
  onLocationSelect
}) {
  // 扁平化所有地点数据
  const allLocations = useMemo(() => {
    const locations = []

    // 主地点
    if (mainLocation) {
      locations.push({
        ...mainLocation,
        type: 'main',
        iconUrl: mainLocation.iconUrl,
        uid: 'main'
      })
    }

    // 分类地点
    categories.forEach(category => {
      category.items.forEach(item => {
        locations.push({
          ...item,
          type: category.key,
          iconUrl: item.iconUrl || category.iconUrl,
          uid: item.name
        })
      })
    })

    return locations
  }, [])

  return (
    <div className = { styles.mapArea }>
      <APIProvider apiKey = { API_KEY }>
        <Map
          defaultCenter = { center }
          defaultZoom = { MAP_CONFIG.defaultZoom }
          disableDefaultUI = { false }
          zoomControl = { true }
          streetViewControl = { true }
          mapTypeControl = { false }
          fullscreenControl = { false }
          mapId = { null }
          style = { { width: '100%', height: '100%' } }
          gestureHandling = { 'greedy' }
          onClick = { () => onLocationSelect?.(null) }
        >
          <MapEffect selectedLocation = { selectedLocation } />

          {allLocations.map(item => (
            <MarkerWithIcon
              key = { item.uid }
              item = { item }
              selectedLocation = { selectedLocation }
              onClick = { () => onLocationSelect?.(item) }
            />
          ))}

          {selectedLocation && window.google && (
            <InfoWindow
              position = { { lat: selectedLocation.lat, lng: selectedLocation.lng } }
              pixelOffset = { [
                MAP_CONFIG.infoWindow.pixelOffset.x,
                MAP_CONFIG.infoWindow.pixelOffset.y
              ] }
              minWidth = { MAP_CONFIG.infoWindow.minWidth }
              onCloseClick = { () => onLocationSelect?.(null) }
            >
              <InfoWindowContent location = { selectedLocation } />
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  )
}
