const headerColor = {
  '--color-header-bg': 'rgba(255, 255, 255, 0.5)',
  '--color-header-text': '#1f4b99',
}
const title = 'Floor Plans'
const subtitle = 'Our Apartments'
const description = 'You\'re going to love stylish, luxury studios, 1 bedroom, 2 bedrooms, and loft style apartment homes at The Haven. Check out what we have available below!'
const categories = [ 'Studio', '1 Bedroom', '2 Bedroom' ]
const plans = [
  // Studios
  { id: 's1', name: '0X1-S1', type: 'Studio', bath: '1 Bath', sqft: 503, image: '/assets/imgs/room1.png' },
  { id: 's2', name: '0X1-S2', type: 'Studio', bath: '1 Bath', sqft: 648, image: '/assets/imgs/room1.png' },
  { id: 's3', name: '0X1-S3', type: 'Studio', bath: '1 Bath', sqft: 662, image: '/assets/imgs/room1.png' },
  { id: 's4', name: '0X1-S4', type: 'Studio', bath: '1 Bath', sqft: 617, image: '/assets/imgs/room1.png' },
  // 1 Bedroom
  { id: 'a1', name: '1BX1B-A1', type: '1 Bedroom', bath: '1 Bath', sqft: 595, image: '/assets/imgs/room1.png' },
  { id: 'a2', name: '1BX1B-A2', type: '1 Bedroom', bath: '1 Bath', sqft: 639, image: '/assets/imgs/room1.png' },
  { id: 'a3', name: '1BX1B-A3', type: '1 Bedroom', bath: '1 Bath', sqft: 647, image: '/assets/imgs/room1.png' },
  // 2 Bedrooms
  { id: 'b1', name: '2BX2B-B1', type: '2 Bedroom', bath: '2 Bath', sqft: 1136, image: '/assets/imgs/room1.png' },
  { id: 'b2', name: '2BX2B-B2', type: '2 Bedroom', bath: '1 Bath', sqft: 972, image: '/assets/imgs/room1.png' },
]

export {
  title,
  subtitle,
  description,
  categories,
  plans,
  headerColor
}