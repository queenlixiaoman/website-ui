'use client'

import { useState, useMemo } from 'react'
import { Input, Collapse, ConfigProvider } from 'antd'
import { Search, Down, Up } from '@icon-park/react'

import { mainLocation, categories } from '@/config/neighborhood'
import styles from './NeighborhoodSidebar.module.css'

const { Panel } = Collapse
export default function NeighborhoodSidebar({
  selectedLocation,
  onLocationClick,
  className,
  visible = true
}) {
  const [ searchValue, setSearchValue ] = useState('')
  const [ expandedPanels, setExpandedPanels ] = useState(categories.map(d => d.key))

  // Filter
  const filteredData = useMemo(() => {
    if (!searchValue) return categories

    return categories.map(group => {
      if (group.items) {
        const filteredItems = group.items.filter(item =>
          item.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        return { ...group, items: filteredItems }
      }
      return group
    }).filter(group => group.items && group.items.length > 0)
  }, [ searchValue ])

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className = { `${styles.sidebar} ${!visible ? styles.hidden : ''} ${className || ''}` }>
      {/* Search */}
      <div className = { styles.searchContainer }>
        <Input
          prefix = { <Search theme = "outline" size = { 16 } fill = "#999" /> }
          placeholder = "Search..."
          value = { searchValue }
          onChange = { handleSearch }
          allowClear
          className = { styles.searchInput }
          variant = "filled"
        />
      </div>

      <div className = { styles.scrollArea }>
        {mainLocation && (
          <div
            className = { `${styles.item} ${styles.mainLocation} ${selectedLocation?.id === 'main' ? styles.selected : ''}` }
            onClick = { () => onLocationClick(mainLocation, 'main') }
          >
            <div className = { styles.itemIcon }>
              <img
                src = { mainLocation.iconUrl }
                alt = { mainLocation.name }
                width = { 20 }
                height = { 20 }
              />
            </div>
            <span style = { { fontWeight: 600 } }>{mainLocation.name}</span>
          </div>
        )}

        <ConfigProvider theme = { {
          components: {
            Collapse: {
              headerPadding: '12px 16px',
              contentPadding: '0'
            }
          }
        } }>
          <Collapse
            activeKey = { expandedPanels }
            onChange = { setExpandedPanels }
            ghost
            expandIconPosition = "end"
            className = { styles.collapse }
            expandIcon = { ({ isActive }) => (
              isActive ? <Up size = { 12 } fill = "#666" /> : <Down size = { 12 } fill = "#666" />
            ) }
          >
            {filteredData.map(group => (
              <Panel
                key = { group.key }
                header = { <span>{group.title}</span> }
              >
                {group.items.map((item, idx) => {
                  // 优先使用 item 自身的 iconUrl，如果没有则使用 category 的
                  const iconUrl = item.iconUrl || group.iconUrl
                  return (
                    <div
                      key = { idx }
                      className = { `${styles.item} ${selectedLocation?.name === item.name ? styles.selected : ''}` }
                      onClick = { () => onLocationClick(item, group.key) }
                    >
                      <div className = { styles.itemIcon }>
                        <img
                          src = { iconUrl }
                          alt = { item.name }
                          width = { 16 }
                          height = { 16 }
                        />
                      </div>
                      <span>{item.name}</span>
                    </div>
                  )
                })}
              </Panel>
            ))}
          </Collapse>
        </ConfigProvider>
      </div>
    </div>
  )
}
