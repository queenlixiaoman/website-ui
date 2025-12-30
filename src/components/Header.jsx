'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Layout, Flex, Button, Drawer } from 'antd'
import { ArrowRight, HamburgerButton } from '@icon-park/react'
import { useSelector } from 'react-redux'

import styles from './Header.module.css'
import { header, navLinks, logo } from '@/config/common'

const { Header } = Layout

const SiteHeader = () => {
  const isDesktop = useSelector((state) => state.deviceStore.isDesktop)
  const [ isScrolled, setIsScrolled ] = useState(false)
  const [ drawerOpen, setDrawerOpen ] = useState(false)
  const { formerName, phone } = header

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const renderNavLinks = () => (
    navLinks.map((link) => (
      <Link
        key = { link.href }
        href = { link.href }
        className = { isDesktop ? styles.navLink : styles.mobileLink }
        onClick = { () => !isDesktop && setDrawerOpen(false) }
      >
        {link.label}
      </Link>
    ))
  )

  return (
    <Header
      className = { `${styles.headerWrapper} ${isScrolled ? styles.scrolled : ''}` }
    >
      <div className = { styles.headerContent }>
        <Flex align = "center" justify = "space-between">
          {/* Left: Logo Section */}
          <Link href = "/" className = { styles.logoSection }>
            <Flex vertical align = "start">
              <img
                src = { logo }
                alt = "The Haven on College"
                className = { styles.logoImg }
              />
              <div className = { styles.formerNameContainer }>
                <span className = { styles.formerLabel }>Formerly known as</span>
                <span className = { styles.formerNameValue }>{formerName}</span>
              </div>
            </Flex>
          </Link>

          {isDesktop
            ?
            (
              <>
                <nav className = { styles.navSection }>
                  <Flex gap = "32px" justify = "center" align = "center">
                    {renderNavLinks()}
                  </Flex>
                </nav>
                <div className = { styles.actionSection }>
                  <Flex vertical align = "end" gap = "4px">
                    <Button
                      type = "primary"
                      className = { styles.portalButton }
                      href = "#" // Replace with actual portal link if available
                    >
                  Resident Portal <ArrowRight theme = "outline" size = "20" fill = "#fff" />
                    </Button>
                    <a href = { `tel:${phone}` } className = { styles.phoneNumber }>
                      {phone}
                    </a>
                  </Flex>
                </div>
              </>
            )
            :
            <Button
              type = "text"
              icon = { <HamburgerButton theme = "outline" size = "24" fill = "#333" /> }
              onClick = { () => setDrawerOpen(true) }
              className = { styles.mobileMenuButton }
            />
          }
        </Flex>
      </div>

      {/* Mobile Drawer */}
      {
        !isDesktop && (
          <Drawer
            title = "Menu"
            placement = "right"
            onClose = { () => setDrawerOpen(false) }
            open = { drawerOpen }
            className = { styles.drawer }
          >
            <div className = { styles.drawerBody }>
              <Flex vertical gap = "large">
                {renderNavLinks(true)}
                <div className = { styles.drawerActionContainer }>
                  <Button
                    type = "primary"
                    block
                    className = { `${styles.portalButton} ${styles.portalButtonMobile}` }
                  >
                Resident Portal <ArrowRight theme = "outline" size = "20" fill = "#fff" />
                  </Button>
                  <a
                    href = { `tel:${phone}` }
                    className = { `${styles.phoneNumber} ${styles.phoneNumberMobile}` }
                  >
                    {phone}
                  </a>
                </div>
              </Flex>
            </div>
          </Drawer>
        )
      }
    </Header>
  )
}

export default SiteHeader
