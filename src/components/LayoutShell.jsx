'use client'

import { Layout, ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US'

import styles from './LayoutShell.module.css'
import Header from './Header'
import Footer from './Footer'
import ChatWidget from './ChatWidget'
import AccessibilityWidget from './AccessibilityWidget'
import { colorPrimary, themeColor } from '@/config/common'

export default function LayoutShell({ children, headerColor = {} }) {

  return (
    <ConfigProvider
      locale = { enUS }
      theme = { { token: { colorPrimary } } }
    >
      <div style = { { ...themeColor, ...headerColor } }>
        {/* 布局 */}
        <Layout className = { styles.shell }>
          <Header />
          <Layout.Content
            className = { styles.content }
          >
            {children}
          </Layout.Content>
          <Footer />
        </Layout>
        {/* 页面底部右侧聊天插件 */}
        <ChatWidget />
        {/* 页面底部左侧插件 */}
        <AccessibilityWidget />
      </div>
    </ConfigProvider>
  )
}
