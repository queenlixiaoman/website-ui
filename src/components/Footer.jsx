'use client'

import React from 'react'
import { Layout, Row, Col, Typography, Space, Flex, Divider } from 'antd'
import { Car, Forbid } from '@icon-park/react'
import styles from './Footer.module.css'

const { Footer } = Layout
const { Text, Link } = Typography

const SiteFooter = () => {

  const colSpan = { xs: 24, md: 8 }

  return (
    <Footer className = { styles.footerContainer }>
      <div className = { styles.topBar }>Leasing Office</div>
      <div className = { styles.mainContent }>
        <Row gutter = { 32 } align = "middle" justify = "space-between">
          <Col { ...colSpan } className = { styles.centerAlign }>
            <Flex vertical gap = "middle" align = "center">
              <div className = { styles.logoContainer }>
                <img
                  src = "https://thehavenoncollege.com/wp-content/uploads/havoclogo.png"
                  alt = "The Haven on College"
                  className = { styles.havenLogo }
                />
              </div>

              <Space orientation = "vertical" size = "small">
                <Text className = { styles.contactPhone }>(203) 745-4764</Text>
                <Text className = { styles.contactEmail }>
                  THEHAVEN@HHREDSTONE.COM
                </Text>
              </Space>
            </Flex>
          </Col>

          <Col { ...colSpan } className = { styles.centerAlign }>
            <Flex vertical gap = "small" align = "center">
              <Text strong className = { styles.addressText }>
                200 College St, New Haven CT 06510
              </Text>

              <div className = { styles.hoursContainer }>
                <Text strong className = { styles.hoursText }>
                  Monday to Friday: 9:00 am - 6:00 pm
                </Text>
                <Text strong className = { styles.hoursText }>
                  Saturday: 10:00 am - 5:00 pm
                </Text>
                <Text strong className = { styles.hoursText }>
                  Sunday: Closed
                </Text>
              </div>

              <Text strong className = { styles.walkInText }>
                Walk-ins Welcome!
              </Text>
            </Flex>
          </Col>

          <Col { ...colSpan } className = { styles.centerAlign }>
            <Flex vertical gap = "middle" align = "center">
              <div className = { styles.logoContainer }>
                <img
                  src = "https://thehavenoncollege.com/wp-content/uploads/brizy/imgs/Redstone-Logo-164x151x2x0x161x151x1645129713-105x98x1x0x102x98x1717443364.png"
                  alt = "HH Red Stone"
                  className = { styles.managementLogo }
                />
                <div className = { styles.managementLabel }>HH RED STONE</div>
              </div>

              <Flex gap = "large" className = { styles.iconsRow }>
                <span role = "img" aria-label = "pet friendly">
                  🐾
                </span>
                <Car theme = "outline" size = "20" fill = "#333" />
                <span role = "img" aria-label = "accessible">
                  ♿
                </span>
                <Forbid theme = "outline" size = "20" fill = "#333" />
              </Flex>

              <Space
                separator = {
                  <Divider orientation = "vertical" className = { styles.linkDivider } />
                }
              >
                <Link href = "#" className = { styles.footerLink }>
                  Terms and Conditions
                </Link>
                <Link href = "#" className = { styles.footerLink }>
                  Privacy Policy
                </Link>
              </Space>
            </Flex>
          </Col>
        </Row>
      </div>

      <div className = { styles.bottomBar }>
        © 2025 HH Red Stone Properties. All rights reserved.
      </div>
    </Footer>
  )
}

export default SiteFooter
