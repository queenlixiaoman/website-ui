'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { Row, Col, Typography, Button } from 'antd'
import { plans as floorPlans, categories as homeCategories } from '@/config/home'
import styles from './HomeFloorPlans.module.css'

const { Title, Paragraph } = Typography

const HomeFloorPlans = () => {
  const [ activeCategory, setActiveCategory ] = useState('All')

  const filteredPlans = useMemo(() => {
    if (activeCategory === 'All') return floorPlans
    return floorPlans.filter((plan) =>
      plan.type
        .toLowerCase()
        .includes(activeCategory.toLowerCase().replace(' apartments', ''))
    )
  }, [ activeCategory, floorPlans ])

  const categories = [ 'All', ...homeCategories ]

  return (
    <div className = { styles.container }>
      {/* Header Section */}
      <div className = { styles.headerSection }>
        <Title level = { 1 } className = { styles.title }>
          {floorPlans.title}
        </Title>
        <Title level = { 3 } className = { styles.subtitle }>
          {floorPlans.subtitle}
        </Title>
        <Paragraph className = { styles.description }>
          {floorPlans.description}
        </Paragraph>
      </div>

      {/* Filter Buttons */}
      <div className = { styles.filterContainer }>
        {categories.map((cat) => (
          <Button
            key = { cat }
            type = { activeCategory === cat ? 'primary' : 'default' }
            onClick = { () => setActiveCategory(cat) }
            className = { styles.filterButton }
            size = "large"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Floor Plans Grid */}
      <Row gutter = { [ 32, 32 ] }>
        {filteredPlans.map((plan) => (
          <Col xs = { 24 } sm = { 12 } lg = { 8 } xl = { 6 } key = { plan.id }>
            <div className = { styles.card }>
              <div className = { styles.cardImageWrapper }>
                <Image
                  src = { plan.image }
                  alt = { plan.name }
                  width = { 300 }
                  height = { 200 }
                  className = { styles.cardImage }
                  unoptimized
                />
              </div>
              <div className = { styles.cardContent }>
                <div className = { styles.planName }>{plan.name}</div>
                <div className = { styles.planDetails }>
                  <span className = { styles.detailItem }>{plan.type}</span>
                  <span className = { styles.detailItem }>{plan.bath}</span>
                  <span>{plan.sqft} Sq. Ft.</span>
                </div>
                <Button type = "primary" className = { styles.actionButton }>
                  Check Availability
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default HomeFloorPlans
