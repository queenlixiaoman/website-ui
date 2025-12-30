/**
 * 结构化数据（Schema.org）生成工具
 *
 * 提供生成 JSON-LD 结构化数据的工具函数
 */

import { siteConfig, contactConfig, socialConfig } from './config'

/**
 * 生成 Organization Schema（知识图谱）
 *
 * @param {Object} options - 配置选项
 * @param {string} options.legalName - 法定名称（可选）
 * @param {Array} options.additionalInfo - 附加信息（可选）
 * @returns {Object} Organization Schema 对象
 *
 * @example
 * // 在 layout.js 中使用
 * import { generateOrganizationSchema } from '@/lib/seo'
 * const orgSchema = generateOrganizationSchema()
 */
export function generateOrganizationSchema({
  legalName,
  additionalInfo = [],
} = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.alternateName,
    url: siteConfig.url,
    logo: siteConfig.logo,
    description: siteConfig.description,
    email: contactConfig.email,
    telephone: contactConfig.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contactConfig.address.streetAddress,
      addressLocality: contactConfig.address.addressLocality,
      addressRegion: contactConfig.address.addressRegion,
      postalCode: contactConfig.address.postalCode,
      addressCountry: contactConfig.address.addressCountry,
    },
    ...(legalName && { legalName }),
    ...(socialConfig.sameAs.length > 0 && { sameAs: socialConfig.sameAs }),
    ...(additionalInfo.length > 0 && {
      additionalProperty: additionalInfo.map((info) => ({
        '@type': 'PropertyValue',
        name: info.type,
        value: info.value,
      })),
    }),
  }
}

/**
 * 生成 ApartmentComplex Schema（公寓综合体）
 *
 * @param {Object} options - 配置选项
 * @param {string} options.name - 公寓名称（可选，默认使用网站名称）
 * @param {string} options.alternateName - 别名（可选）
 * @param {string} options.description - 描述（可选，默认使用网站描述）
 * @param {Array} options.floorPlans - 户型列表（可选）
 * @param {Array} options.amenityFeatures - 设施特性列表（可选）
 * @param {number} options.numberOfUnits - 单元数量（可选）
 * @returns {Object} ApartmentComplex Schema 对象
 *
 * @example
 * // 在首页中使用
 * import { generateApartmentComplexSchema } from '@/lib/seo'
 * const apartmentSchema = generateApartmentComplexSchema({
 *   floorPlans: [
 *     { name: 'Studio A', type: 'Studio', bath: '1 Bath', sqft: 500 },
 *   ],
 *   amenityFeatures: [
 *     { name: 'Luxury Apartments', value: true },
 *   ],
 * })
 */
export function generateApartmentComplexSchema({
  name = siteConfig.name,
  alternateName,
  description = siteConfig.description,
  floorPlans = [],
  amenityFeatures = [],
  numberOfUnits,
} = {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ApartmentComplex',
    name,
    ...(alternateName && { alternateName }),
    description,
    url: siteConfig.url,
    image: siteConfig.logo,
    telephone: contactConfig.phone,
    email: contactConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contactConfig.address.streetAddress,
      addressLocality: contactConfig.address.addressLocality,
      addressRegion: contactConfig.address.addressRegion,
      postalCode: contactConfig.address.postalCode,
      addressCountry: contactConfig.address.addressCountry,
    },
  }

  // 添加地理坐标（如果配置了）
  if (contactConfig.geo) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: contactConfig.geo.latitude,
      longitude: contactConfig.geo.longitude,
    }
  }

  // 添加单元数量
  if (numberOfUnits !== undefined) {
    schema.numberOfUnits = numberOfUnits
  }

  // 添加设施特性
  if (amenityFeatures.length > 0) {
    schema.amenityFeature = amenityFeatures.map((amenity) => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity.name,
      value: amenity.value,
    }))
  }

  // 添加户型信息
  if (floorPlans.length > 0) {
    schema.floorPlan = floorPlans.map((plan) => {
      const floorPlan = {
        '@type': 'FloorPlan',
        name: plan.name,
      }

      // 处理卧室数量
      if (plan.type) {
        const bedrooms = plan.type === 'Studio' ? 0 : parseInt(plan.type)
        if (!isNaN(bedrooms)) {
          floorPlan.numberOfBedroomsTotal = bedrooms
        }
      }

      // 处理浴室数量
      if (plan.bath) {
        const bathrooms = parseInt(plan.bath)
        if (!isNaN(bathrooms)) {
          floorPlan.numberOfBathroomsTotal = bathrooms
        }
      }

      // 处理面积
      if (plan.sqft) {
        floorPlan.floorSize = {
          '@type': 'QuantitativeValue',
          value: plan.sqft,
          unitText: 'sqft',
        }
      }

      // 处理图片
      if (plan.image) {
        const imageUrl = plan.image.startsWith('http')
          ? plan.image
          : `${siteConfig.url}${plan.image}`
        floorPlan.image = imageUrl
      }

      return floorPlan
    })
  }

  return schema
}

/**
 * 生成 LocalBusiness Schema（本地商家，可选）
 *
 * @param {Object} options - 配置选项
 * @param {string} options.businessType - 商家类型（如 'ApartmentComplex'）
 * @param {Array} options.openingHours - 营业时间（可选）
 * @returns {Object} LocalBusiness Schema 对象
 */
export function generateLocalBusinessSchema({
  businessType = 'ApartmentComplex',
  openingHours = [],
} = {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': businessType,
    name: siteConfig.name,
    image: siteConfig.logo,
    telephone: contactConfig.phone,
    email: contactConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contactConfig.address.streetAddress,
      addressLocality: contactConfig.address.addressLocality,
      addressRegion: contactConfig.address.addressRegion,
      postalCode: contactConfig.address.postalCode,
      addressCountry: contactConfig.address.addressCountry,
    },
  }

  if (openingHours.length > 0) {
    schema.openingHoursSpecification = openingHours.map((hours) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.day,
      opens: hours.time.split('-')[0] || '',
      closes: hours.time.split('-')[1] || '',
    }))
  }

  return schema
}

