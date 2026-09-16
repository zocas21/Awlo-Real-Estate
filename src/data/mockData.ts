import { Property, FAQItem } from '../types';

export const SAMPLE_PROPERTIES: Property[] = [
  {
    id: 'ethiobest-bole-horizon',
    title: 'EthioBest Bole Horizon Tower',
    neighborhood: 'Bole',
    address: 'Near Atlas Traffic Light, Bole Road, Addis Ababa',
    priceETB: 28500000,
    priceUSD: 220000,
    beds: 3,
    baths: 3,
    sqft: 1990,
    sqm: 185,
    propertyType: 'Apartment',
    status: 'Ready',
    tag: 'Just Listed',
    description: 'Ultra-luxurious 3-bedroom apartment in the heart of Bole diplomatic district with panoramic city views.',
    detailedDescription: 'EthioBest Bole Horizon Tower offers an exceptional living experience in Addis Ababa’s premier business and diplomatic hub. This flagship residential unit features expansive open-plan living, Italian-imported ceramic flooring, custom kitchen cabinetry, master bedroom suite with walk-in closet, private balcony facing the Bole skyline, 24/7 security with smart access, dedicated underground parking, high-speed Otis elevators, and full backup generator power.',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      '24/7 Standby Generator',
      'Water Reserve Tank (50,000L)',
      'High-Speed Elevators',
      'Underground Parking',
      'CCTV & Smart Access Control',
      'Private Balcony',
      'Fitness Gym & Sauna',
      'Garbage Chute',
      'Intercom System'
    ],
    completionDate: 'Ready for Move-In',
    floor: '7th Floor',
    mapCoordinates: { lat: 8.9984, lng: 38.7845 }
  },
  {
    id: 'ethiobest-cmc-grand-estate',
    title: 'EthioBest Grand Garden Estate',
    neighborhood: 'CMC',
    address: 'Opposite St. Michael Church, CMC Road, Addis Ababa',
    priceETB: 38000000,
    priceUSD: 295000,
    beds: 4,
    baths: 4,
    sqft: 2798,
    sqm: 260,
    propertyType: 'Penthouse',
    status: 'Ready',
    tag: 'Penthouse',
    description: 'Spacious 4-bedroom executive penthouse featuring a private rooftop terrace, lush green landscaping, and family amenities.',
    detailedDescription: 'Situated in the quiet, prestigious CMC area, EthioBest Grand Garden Estate combines urban luxury with suburban tranquility. The penthouse residence features floor-to-ceiling double-glazed windows, a state-of-the-art chef’s kitchen, maid quarters with private bathroom, solar water heating systems, and direct elevator keycard entry. Residents enjoy access to landscaped gardens, a children’s playground, and 24-hour estate management.',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Rooftop Terrace',
      'Solar Water Heater',
      'Landscaped Garden & Park',
      'Children Play Area',
      '24/7 Generator',
      'Dual Elevator System',
      'Maid Room with Bath',
      'Basement Storage Units',
      '2 Designated Parking Spots'
    ],
    completionDate: 'Ready for Move-In',
    floor: '12th Floor (Penthouse)',
    mapCoordinates: { lat: 9.0215, lng: 38.8340 }
  },
  {
    id: 'ethiobest-sarbet-royal-heights',
    title: 'EthioBest Sarbet Royal Heights',
    neighborhood: 'Sarbet',
    address: 'Near African Union Headquarters & Old Airport, Sarbet, Addis Ababa',
    priceETB: 19800000,
    priceUSD: 153000,
    beds: 2,
    baths: 2,
    sqft: 1345,
    sqm: 125,
    propertyType: 'Apartment',
    status: 'Ready',
    tag: 'Featured',
    description: 'Modern 2-bedroom luxury residence located in the high-demand Sarbet diplomatic corridor.',
    detailedDescription: 'EthioBest Sarbet Royal Heights offers premium city living just minutes from the African Union Headquarters, ICS Addis, and Old Airport commercial hubs. Designed with eco-conscious materials and high architectural standards, this 2-bedroom home includes an ensuite master bedroom, open-concept dining area, modern bathroom fixtures, secure basement parking, and complete backup power and water infrastructure.',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Diplomatic Security Level',
      '24/7 Standby Generator',
      'High-Speed Fiber Internet',
      'Covered Parking',
      'Water Reservoir System',
      'Balcony with City View',
      '24-Hour Guard Post'
    ],
    completionDate: 'Ready for Move-In',
    floor: '4th Floor',
    mapCoordinates: { lat: 8.9912, lng: 38.7390 }
  },
  {
    id: 'ethiobest-summit-pinnacle',
    title: 'EthioBest Summit Pinnacle Plaza',
    neighborhood: 'Summit',
    address: 'Near Pepsi Factory & Safari Link, Summit, Addis Ababa',
    priceETB: 16500000,
    priceUSD: 128000,
    beds: 3,
    baths: 2.5,
    sqft: 1722,
    sqm: 160,
    propertyType: 'Apartment',
    status: 'Under Construction',
    tag: 'Hot Deal',
    description: 'Contemporary 3-bedroom residence under construction with flexible milestone payment options.',
    detailedDescription: 'EthioBest Summit Pinnacle Plaza is an upcoming landmark residential project in Summit, one of Addis Ababa’s fastest growing real estate hubs. Buyers benefit from early-bird investment pricing with a 20% initial deposit and balanced installment plans spread over 24 months. Expected handover in December 2026 with guaranteed title deeds and premium finishing choices.',
    images: [
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      '20% Deposit Payment Plan',
      'Custom Interior Finishes',
      'Backup Generator',
      'Water Tank Storage',
      'Commercial Retail Ground Floor',
      'Underground Parking',
      '24/7 Security Patrol'
    ],
    completionDate: 'December 2026',
    floor: '5th Floor',
    mapCoordinates: { lat: 9.0320, lng: 38.8650 }
  },
  {
    id: 'ethiobest-ayat-harmony',
    title: 'EthioBest Ayat Harmony Residences',
    neighborhood: 'Ayat',
    address: 'Near Zone 2 Light Rail Terminal, Ayat, Addis Ababa',
    priceETB: 13900000,
    priceUSD: 108000,
    beds: 2,
    baths: 2,
    sqft: 1184,
    sqm: 110,
    propertyType: 'Apartment',
    status: 'Ready',
    tag: 'New Release',
    description: 'Charming 2-bedroom home in Ayat with direct access to the Light Rail transit network.',
    detailedDescription: 'Perfect for families and urban commuters, EthioBest Ayat Harmony Residences offers comfortable and affordable apartment living. Located near the Ayat Light Rail terminal, the building features bright, well-ventilated rooms, built-in wardrobes, granite kitchen countertops, robust security, and dedicated maintenance staff.',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Light Rail Proximity',
      'Granite Kitchen Counters',
      '24/7 Water Reservoir',
      'Generator for Common Areas',
      'Secured Parking',
      'On-site Mini Supermarket'
    ],
    completionDate: 'Ready for Move-In',
    floor: '3rd Floor',
    mapCoordinates: { lat: 9.0410, lng: 38.8820 }
  },
  {
    id: 'ethiobest-bole-arabsa-flats',
    title: 'EthioBest Bole Arabsa Eco-Flats',
    neighborhood: 'Bole Arabsa',
    address: 'Ring Road Extension Corridor, Bole Arabsa, Addis Ababa',
    priceETB: 11500000,
    priceUSD: 89000,
    beds: 3,
    baths: 2,
    sqft: 1560,
    sqm: 145,
    propertyType: 'Apartment',
    status: 'Ready',
    tag: 'Hot Deal',
    description: 'Value-packed 3-bedroom apartment with high rental yield potential and clean green surrounds.',
    detailedDescription: 'EthioBest Bole Arabsa Eco-Flats offers unmatched affordability for a spacious 3-bedroom apartment in Addis Ababa. Featuring modern architectural design, large window openings, separate laundry space, secure parking, and clean mountain breeze environment.',
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'High Rental Yield',
      'Spacious Laundry Room',
      '24/7 Perimeter Security',
      'Water Reserve Tank',
      'Children Green Park',
      'Ample Visitor Parking'
    ],
    completionDate: 'Ready for Move-In',
    floor: '2nd Floor',
    mapCoordinates: { lat: 8.9750, lng: 38.8450 }
  },
  {
    id: 'ethiobest-gerji-business-hub',
    title: 'EthioBest Gerji Business & Commercial Hub',
    neighborhood: 'Gerji',
    address: 'Near Imperial Roundabout & Jackros Road, Gerji, Addis Ababa',
    priceETB: 34000000,
    priceUSD: 263000,
    beds: 0,
    baths: 2,
    sqft: 2260,
    sqm: 210,
    propertyType: 'Commercial',
    status: 'Ready',
    tag: 'Commercial',
    description: 'Prime ground & first floor commercial space ideal for corporate offices, bank branches, or retail showrooms.',
    detailedDescription: 'Positioned on a high-traffic arterial road in Gerji, this prime commercial unit boasts double-height glass display facades, heavy-duty electrical infrastructure for server rooms and heavy equipment, emergency fire suppression systems, high-capacity Otis elevators, and full power redundancy.',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'High-Traffic Road Frontage',
      'Double-Height Glass Façade',
      'Heavy-Duty Standby Generator',
      'Fiber Optic Internet Ready',
      'Dedicated Basement Parking (6 Spots)',
      '24/7 Commercial Security Guard',
      'Fire Sprinkler & Alarm System'
    ],
    completionDate: 'Ready for Occupancy',
    floor: 'Ground & Mezzanine',
    mapCoordinates: { lat: 9.0060, lng: 38.8020 }
  },
  {
    id: 'ethiobest-lebu-heights-vista',
    title: 'EthioBest Lebu Heights Vista',
    neighborhood: 'Lebu',
    address: 'Near Varnero / Music Sefer Junction, Lebu, Addis Ababa',
    priceETB: 24200000,
    priceUSD: 187000,
    beds: 4,
    baths: 3.5,
    sqft: 2583,
    sqm: 240,
    propertyType: 'Mixed-use',
    status: 'Under Construction',
    tag: 'New Release',
    description: 'Elevated 4-bedroom duplex apartment offering sweeping sunset views over the Entoto mountain ridge and southern Addis.',
    detailedDescription: 'EthioBest Lebu Heights Vista combines luxurious residential living with integrated ground-level retail conveniences. Featuring 4 generous bedrooms, a modern open kitchen, high-grade acoustic insulation, private balcony off the master bedroom, and flexible milestone payments over 18 months.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ],
    amenities: [
      'Panoramic Mountain & City Views',
      'Duplex Multi-level Layout',
      'Ground Floor Convenience Retail',
      '24/7 Generator & Water Reserve',
      'Smart Intercom System',
      'Milestone Payment Options'
    ],
    completionDate: 'October 2026',
    floor: '8th & 9th Floor Duplex',
    mapCoordinates: { lat: 8.9550, lng: 38.7210 }
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Where are your properties located in Addis Ababa?',
    answer: 'Our current developments are strategically located across Addis Ababa’s prime residential and commercial corridors including Bole (Atlas & Road to Airport), CMC, Sarbet (near AU Headquarters), Summit, Ayat, Bole Arabsa, Gerji, and Lebu.',
    category: 'location'
  },
  {
    id: 'faq-2',
    question: 'Are your apartments ready for move-in?',
    answer: 'We offer both ready-for-move-in completed luxury units (with instant key handover and completed title transfer) as well as under-construction projects with flexible 18-36 month milestone-based payment plans.',
    category: 'pricing'
  },
  {
    id: 'faq-3',
    question: 'Do you sell both residential and commercial properties?',
    answer: 'Yes! EthioBest Real Estate specializes in high-end residential apartments, luxury penthouses, mixed-use commercial showrooms, and corporate office spaces designed to international safety and quality standards.',
    category: 'process'
  },
  {
    id: 'faq-4',
    question: 'Do listings come with legal ownership documents?',
    answer: 'Absolutely. Every EthioBest property purchase includes full authentic legal documentation: title deeds (Sertifikat/Karta), municipality site plans, sales contracts notarized by the Addis Ababa Document Authentication Office, and clear ownership transfers.',
    category: 'legal'
  },
  {
    id: 'faq-5',
    question: 'Can I get construction progress updates after purchase?',
    answer: 'Yes! EthioBest clients receive access to regular construction progress updates with HD photo and video walkthroughs, site inspection appointments, and dedicated personal project manager consultations.',
    category: 'process'
  },
  {
    id: 'faq-6',
    question: 'Where is your office located?',
    answer: 'Our main office is located in Bole Sub-city, in front of Bole Medhanialem Church, next to Kenenisa Hotel, Addis Ababa, Ethiopia.',
    category: 'location'
  },
  {
    id: 'faq-7',
    question: 'What are your working hours?',
    answer: 'Our office hours are Monday through Saturday 09:30–20:00, and Sunday 14:00–20:00 (East Africa Time). Our website and AI assistant "EthioBest" are available 24/7.',
    category: 'process'
  },
  {
    id: 'faq-8',
    question: 'Can I visit a site before buying?',
    answer: 'Yes! We welcome all prospective buyers to tour our developments. You can book a free guided VIP site tour directly on our website, through our AI assistant "EthioBest", or by contacting our team at +251 92 941 9130 or ethiobestestate@gmail.com.',
    category: 'process'
  }
];

export const DELIVERED_PROJECTS = [
  {
    id: 'del-1',
    name: 'EthioBest Bole Pearl Tower',
    location: 'Bole, Addis Ababa',
    units: 48,
    deliveredYear: '2023',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    description: '14-story luxury residential tower with 100% occupancy delivered ahead of schedule.'
  },
  {
    id: 'del-2',
    name: 'EthioBest Kazanchis Business Center',
    location: 'Kazanchis, Addis Ababa',
    units: 32,
    deliveredYear: '2024',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    description: 'Commercial high-rise hosting international corporate headquarters and bank hubs.'
  },
  {
    id: 'del-3',
    name: 'EthioBest Old Airport Villa Park',
    location: 'Sarbet / Old Airport, Addis Ababa',
    units: 24,
    deliveredYear: '2022',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    description: 'Gated community of luxury duplex villas featuring lush private gardens.'
  },
  {
    id: 'del-4',
    name: 'EthioBest CMC Sunridge Heights',
    location: 'CMC, Addis Ababa',
    units: 64,
    deliveredYear: '2025',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    description: 'Family-centered eco residential estate with integrated retail arcade.'
  }
];

export const COMPANY_STATS = [
  { label: 'Satisfied Customers', count: 1250, suffix: '+' },
  { label: 'Years of Experience', count: 14, suffix: '+' },
  { label: 'Dedicated Employees', count: 180, suffix: '+' },
  { label: 'Delivered Projects', count: 22, suffix: '+' }
];

export const WHY_CHOOSE_US = [
  {
    iconName: 'MapPin',
    title: 'Prime Locations',
    description: 'Situated in Addis Ababa’s highest appreciating districts including Bole, Sarbet, CMC, and Summit.'
  },
  {
    iconName: 'DollarSign',
    title: 'Affordable Luxury',
    description: 'Competitive square-meter pricing with flexible 18-36 month milestone deposit options.'
  },
  {
    iconName: 'ShieldCheck',
    title: 'European Quality',
    description: 'Built with heavy reinforced concrete, imported ceramic finishes, and strict engineering supervision.'
  },
  {
    iconName: 'Lock',
    title: 'Safety & Security',
    description: '24/7 guarded security gates, CCTV monitoring, biometric access control, and fire detection systems.'
  },
  {
    iconName: 'TrendingUp',
    title: 'High ROI Investment',
    description: 'Consistent 18% to 25% annual capital appreciation and strong rental yields from expat tenants.'
  },
  {
    iconName: 'Sparkles',
    title: 'Premium Amenities',
    description: 'High-speed elevators, heavy-duty backup generators, 50,000L water tanks, and fitness clubs.'
  }
];
