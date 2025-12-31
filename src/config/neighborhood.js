const headerColor = {
  '--color-header-bg': 'rgba(255, 255, 255, 0.5)',
  '--color-header-text': '#1f4b99',
}

const center = { lat: 41.3083, lng: -72.9223 } // Center of New Haven
const mainLocation = {
  id: 'main',
  name: 'The Haven On College',
  address: '200 College St, New Haven CT 06510',
  lat: 41.3043,
  lng: -72.9293,
  image: '/assets/imgs/havoclogo.png', // Example image
  description: 'A premier residential development in downtown New Haven.',
  iconUrl: '/assets/imgs/mainMarker.svg',
}
const categories = [
  {
    key: 'poi',
    title: 'Points of Interest',
    iconUrl: '/assets/imgs/poiMarker.svg',
    items: [
      { name: 'Yale University', address: 'New Haven, CT', lat: 41.3112, lng: -72.9267 },
      { name: 'Yale New Haven Hospital', address: '20 York St, New Haven, CT', lat: 41.2993, lng: -72.9312 },
      { name: 'Yale University Art Gallery', address: '1111 Chapel St, New Haven, CT', lat: 41.3082, lng: -72.9288 },
      { name: 'Shubert Theatre', address: '247 College St, New Haven, CT', lat: 41.3048, lng: -72.9296 },
      { name: 'New Haven Green', address: '250 Temple St, New Haven, CT', lat: 41.3069, lng: -72.9252 }
    ]
  },
  {
    key: 'restaurants',
    title: 'Restaurants',
    iconUrl: '/assets/imgs/restaurantMarker.svg',
    items: [
      { name: 'Frank Pepe Pizzeria Napoletana', address: '157 Wooster St, New Haven, CT', lat: 41.3033, lng: -72.9172 },
      { name: 'Louis\' Lunch', address: '263 Crown St, New Haven, CT', lat: 41.3053, lng: -72.9286 },
      { name: 'Modern Apizza', address: '874 State St, New Haven, CT', lat: 41.3143, lng: -72.9188 },
      { name: 'Shell & Bones Oyster Bar and Grill', address: '100 S Water St, New Haven, CT', lat: 41.2899, lng: -72.9201 }
    ]
  },
  {
    key: 'cafe',
    title: 'Cafes',
    iconUrl: '/assets/imgs/coffeeMarker.svg',
    items: [
      { name: 'Blue State Coffee', address: '84 Wall St, New Haven, CT', lat: 41.3102, lng: -72.9255 },
      { name: 'Atticus Bookstore Cafe', address: '1082 Chapel St, New Haven, CT', lat: 41.3085, lng: -72.9291 }
    ]
  },
  {
    key: 'transportation',
    title: 'Transportation',
    iconUrl: '/assets/imgs/airportMarker.svg',
    items: [
      { name: 'Union Station', address: '50 Union Ave, New Haven, CT', lat: 41.2974, lng: -72.9265, iconUrl: '/assets/imgs/busMarker.svg', },
      { name: 'Tweed New Haven Airport', address: '155 Burr St, New Haven, CT', lat: 41.2638, lng: -72.8868 }
    ]
  }
]

export {
  headerColor,
  center,
  mainLocation,
  categories
}