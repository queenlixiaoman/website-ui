// logo
const logo = '/assets/imgs/havoclogo.png'
// 主题
const colorPrimary = '#1f4b99'
const themeColor = {
  '--color-primary': colorPrimary,
  // 这个保留 如果每个站点的header颜色不一致 就在这里配置，页面配置的颜色会覆盖掉这里的颜色
  '--color-header-bg': 'rgba(255, 255, 255, 0.5)',
  '--color-header-text': '#1f4b99',
}
// header-文本
const header = {
  title: 'The Haven',
  subtitle: 'On College',
  formerName: 'College&Crown',
  phone: '(203) 745-4764',
}

const navLinks = [
  { href: '/floorPlans', label: 'FLOOR PLANS' },
  { href: '/amenities', label: 'AMENITIES' },
  { href: '/neighborhood', label: 'NEIGHBORHOOD' },
  { href: '/apply', label: 'APPLY TODAY' },
]

const contact = {
  address: '200 College St, New Haven CT 06510'
}

export {
  logo,
  colorPrimary,
  themeColor,
  header,
  navLinks,
  contact,
}