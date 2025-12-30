/**
 * Google Maps API 配置
 */
export const MAP_CONFIG = {
  defaultZoom: 15,
  selectedZoom: 16,

  // InfoWindow 配置
  infoWindow: {
    pixelOffset: { x: 0, y: -20 },
    minWidth: 240
  }
}

/**
 * Marker Z-Index 层级配置
 */
export const MARKER_Z_INDEX = {
  default: 1,
  main: 999,
  selected: 1000
}
