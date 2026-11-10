import { StoreLocation } from '../types';

export const SAMPLE_STORES: StoreLocation[] = [
  {
    id: 'delhi-srcc-campus',
    name: 'Campus Co-op & Tuck Hub',
    chain: 'SRCC North Campus',
    address: 'Maurice Nagar, University Enclave, North Campus',
    city: 'Delhi NCR',
    area: 'North Campus',
    pincode: '110007',
    lat: 28.6925,
    lng: 77.2081,
    phone: '+91 11 2766 7905',
    hours: '8:00 AM – 9:00 PM',
    stockStatus: 'Full Range In Stock',
    flavorsAvailable: ['Classic Salted', 'Kerala Pepper & Curry Leaf', 'Bengal Kasundi Mustard', 'Gujarat Khatta Meetha', 'Tangy Tomato Masala', 'Olive Oil & Sea Salt']
  },
  {
    id: 'delhi-cp-lemarche',
    name: 'Le Marché Gourmet Market',
    chain: 'Le Marché',
    address: 'Block E, Inner Circle, Connaught Place',
    city: 'Delhi NCR',
    area: 'Connaught Place',
    pincode: '110001',
    lat: 28.6328,
    lng: 77.2197,
    phone: '+91 11 4151 3290',
    hours: '9:00 AM – 10:00 PM',
    stockStatus: 'Full Range In Stock',
    flavorsAvailable: ['Classic Salted', 'Kerala Pepper & Curry Leaf', 'Bengal Kasundi Mustard', 'Olive Oil & Sea Salt']
  },
  {
    id: 'delhi-gurgaon-cybercity',
    name: 'Nature’s Basket Gourmet',
    chain: 'Nature’s Basket',
    address: 'Ground Floor, Cyber Hub, DLF Phase 2',
    city: 'Delhi NCR',
    area: 'Cyber Hub, Gurugram',
    pincode: '122002',
    lat: 28.4950,
    lng: 77.0895,
    phone: '+91 124 492 8800',
    hours: '8:30 AM – 11:00 PM',
    stockStatus: 'Full Range In Stock',
    flavorsAvailable: ['Classic Salted', 'Bengal Kasundi Mustard', 'Tangy Tomato Masala', 'Olive Oil & Sea Salt']
  },
  {
    id: 'delhi-south-gk',
    name: '24SEVEN Convenience Store',
    chain: '24SEVEN',
    address: 'M-Block Market, Greater Kailash I',
    city: 'Delhi NCR',
    area: 'GK-1',
    pincode: '110048',
    lat: 28.5539,
    lng: 77.2384,
    phone: '+91 11 4658 2407',
    hours: '24 Hours Open',
    stockStatus: 'Limited Stock',
    flavorsAvailable: ['Classic Salted', 'Tangy Tomato Masala']
  },
  {
    id: 'mumbai-bandra-foodhall',
    name: 'Artisanal Pantry & Snack Bar',
    chain: 'Foodhall',
    address: 'Linking Road, Near Khar Telephone Exchange, Bandra West',
    city: 'Mumbai',
    area: 'Bandra West',
    pincode: '400050',
    lat: 19.0607,
    lng: 72.8362,
    phone: '+91 22 2605 5511',
    hours: '10:00 AM – 10:30 PM',
    stockStatus: 'Full Range In Stock',
    flavorsAvailable: ['Classic Salted', 'Kerala Pepper & Curry Leaf', 'Bengal Kasundi Mustard', 'Gujarat Khatta Meetha', 'Tangy Tomato Masala', 'Olive Oil & Sea Salt']
  },
  {
    id: 'mumbai-powai-campus',
    name: 'Hiranandani High Street Mart',
    chain: 'Daily Mart',
    address: 'Central Avenue, Hiranandani Gardens, Powai',
    city: 'Mumbai',
    area: 'Powai',
    pincode: '400076',
    lat: 19.1197,
    lng: 72.9051,
    phone: '+91 22 2570 9944',
    hours: '8:00 AM – 10:00 PM',
    stockStatus: 'Classic & Regional Only',
    flavorsAvailable: ['Classic Salted', 'Gujarat Khatta Meetha', 'Kerala Pepper & Curry Leaf']
  },
  {
    id: 'bangalore-indiranagar',
    name: 'Organic Roots & Gourmet Snacks',
    chain: 'Nature’s Basket',
    address: '100 Feet Road, HAL 2nd Stage, Indiranagar',
    city: 'Bengaluru',
    area: 'Indiranagar',
    pincode: '560038',
    lat: 12.9719,
    lng: 77.6412,
    phone: '+91 80 4125 7800',
    hours: '8:00 AM – 10:00 PM',
    stockStatus: 'Full Range In Stock',
    flavorsAvailable: ['Classic Salted', 'Kerala Pepper & Curry Leaf', 'Bengal Kasundi Mustard', 'Olive Oil & Sea Salt']
  },
  {
    id: 'bangalore-koramangala',
    name: 'Smart Snacker Hub',
    chain: 'Star Market',
    address: '80 Feet Road, 4th Block, Koramangala',
    city: 'Bengaluru',
    area: 'Koramangala',
    pincode: '560034',
    lat: 12.9352,
    lng: 77.6245,
    phone: '+91 80 2553 1122',
    hours: '7:30 AM – 10:30 PM',
    stockStatus: 'Full Range In Stock',
    flavorsAvailable: ['Kerala Pepper & Curry Leaf', 'Tangy Tomato Masala', 'Classic Salted']
  },
  {
    id: 'kolkata-park-street',
    name: 'Spencer’s Gourmet Corner',
    chain: 'Spencer’s',
    address: 'Park Center, 24 Park Street',
    city: 'Kolkata',
    area: 'Park Street',
    pincode: '700016',
    lat: 22.5510,
    lng: 88.3526,
    phone: '+91 33 2229 8811',
    hours: '9:00 AM – 9:30 PM',
    stockStatus: 'Full Range In Stock',
    flavorsAvailable: ['Bengal Kasundi Mustard', 'Classic Salted', 'Kerala Pepper & Curry Leaf', 'Gujarat Khatta Meetha']
  },
  {
    id: 'ahmedabad-vastrapur',
    name: 'Farsan & Gourmet Grocers',
    chain: 'Gourmet Central',
    address: 'Near IIM New Campus, Vastrapur',
    city: 'Ahmedabad',
    area: 'Vastrapur',
    pincode: '380015',
    lat: 23.0338,
    lng: 72.5298,
    phone: '+91 79 2630 4500',
    hours: '8:30 AM – 10:00 PM',
    stockStatus: 'Full Range In Stock',
    flavorsAvailable: ['Gujarat Khatta Meetha', 'Classic Salted', 'Kerala Pepper & Curry Leaf']
  },
  {
    id: 'kochi-panampilly',
    name: 'Malabar Spice Mart',
    chain: 'Lulu Express',
    address: 'Main Avenue, Panampilly Nagar',
    city: 'Kochi',
    area: 'Panampilly Nagar',
    pincode: '682036',
    lat: 9.9610,
    lng: 76.2974,
    phone: '+91 484 231 6620',
    hours: '8:00 AM – 10:00 PM',
    stockStatus: 'Full Range In Stock',
    flavorsAvailable: ['Kerala Pepper & Curry Leaf', 'Classic Salted', 'Tangy Tomato Masala']
  }
];

export const CAMPUS_HUBS = [
  {
    campus: 'Shri Ram College of Commerce (SRCC)',
    city: 'North Campus, Delhi',
    spot: 'Tuck Shop & Co-op Canteen',
    topFlavour: 'Masala & Kasundi Mustard',
    stockTag: 'Restocked Daily',
    color: '#8B1E29'
  },
  {
    campus: 'St. Stephen’s & Hindu College',
    city: 'University Enclave, Delhi',
    spot: 'Main Cafe & Student Activity Centre',
    topFlavour: 'Classic Salted & Kerala Pepper',
    stockTag: 'Popular Late Night',
    color: '#B45309'
  },
  {
    campus: 'IIT Bombay Tech Hub',
    city: 'Powai, Mumbai',
    spot: 'Hostel 12 Tuck & Gymkhana Kiosk',
    topFlavour: 'Gujarat Khatta Meetha & Protein+',
    stockTag: 'In High Demand',
    color: '#1E3A8A'
  },
  {
    campus: 'Christ University',
    city: 'Hosur Road, Bengaluru',
    spot: 'Block 2 Gourmet Snack Bar',
    topFlavour: 'Kerala Pepper & Curry Leaf',
    stockTag: 'Campus Bestseller',
    color: '#1A4329'
  },
  {
    campus: 'St. Xavier’s College',
    city: 'Fort, South Mumbai',
    spot: 'The Foyer Tuck Shop',
    topFlavour: 'Olive Oil & Sea Salt',
    stockTag: 'Restocked Daily',
    color: '#4D6B2B'
  },
  {
    campus: 'IIM Ahmedabad',
    city: 'Vastrapur, Ahmedabad',
    spot: 'K dorm Tuck & Nescafe Point',
    topFlavour: 'Gujarat Khatta Meetha & Kasundi',
    stockTag: 'All Flavours Active',
    color: '#C2410C'
  }
];

export const ONLINE_PARTNERS = [
  {
    name: 'Blinkit',
    tagline: 'Delivered in 10 minutes',
    badge: 'Quickest Delivery',
    color: '#F4C430',
    accentColor: '#1E1B18',
    deliveryTime: '8–12 mins',
    popularIn: 'Delhi NCR, Mumbai, Bengaluru, Kolkata',
    link: 'https://blinkit.com'
  },
  {
    name: 'Zepto',
    tagline: '10-min grocery delivery',
    badge: 'Campus Favourite',
    color: '#8224E3',
    accentColor: '#FFFFFF',
    deliveryTime: '10 mins',
    popularIn: 'All Major Metros',
    link: 'https://zeptonow.com'
  },
  {
    name: 'Swiggy Instamart',
    tagline: 'Snacks & cravings on demand',
    badge: 'Night Delivery',
    color: '#FC8019',
    accentColor: '#FFFFFF',
    deliveryTime: '15 mins',
    popularIn: 'Pan-India',
    link: 'https://swiggy.com'
  },
  {
    name: 'Amazon Fresh',
    tagline: 'Multi-pack boxes & party bundles',
    badge: 'Bulk Savings',
    color: '#232F3E',
    accentColor: '#FFFFFF',
    deliveryTime: 'Same Day / Next Day',
    popularIn: 'Nationwide Delivery',
    link: 'https://amazon.in'
  }
];
