
import { Fish } from '../types/fish';

export const mockFish: Fish[] = [
  {
    id: '1',
    code: 'HM-001',
    name: 'Blue Rim Halfmoon',
    type: 'Halfmoon',
    tailType: 'Halfmoon',
    color: ['Blue', 'White'],
    gender: 'Male',
    age: '4-5 months',
    price: 45.00,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571752726703-5e7d1f9a3c86?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=400&fit=crop'
    ],
    description: 'Beautiful blue rim halfmoon male with perfect form and vibrant coloration. Excellent swimming behavior and healthy appetite.',
    isSold: false,
    isNewArrival: true,
    isBestSeller: false,
    shippingInfo: 'Ships within 2-3 business days with live arrival guarantee.',
    acclimatizationGuide: 'Float bag for 15 minutes, then slowly add tank water over 30 minutes.'
  },
  {
    id: '2',
    code: 'PK-112',
    name: 'Red Dragon Plakat',
    type: 'Plakat',
    tailType: 'Plakat',
    color: ['Red', 'Black'],
    gender: 'Male',
    age: '5-6 months',
    price: 65.00,
    images: [
      'https://images.unsplash.com/photo-1571752726703-5e7d1f9a3c86?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop'
    ],
    description: 'Stunning red dragon plakat with intense coloration and excellent form. Very active and healthy specimen.',
    isSold: false,
    isNewArrival: false,
    isBestSeller: true,
    shippingInfo: 'Ships within 2-3 business days with live arrival guarantee.',
    acclimatizationGuide: 'Float bag for 15 minutes, then slowly add tank water over 30 minutes.'
  },
  {
    id: '3',
    code: 'CT-089',
    name: 'Purple Crowntail',
    type: 'Crowntail',
    tailType: 'Crowntail',
    color: ['Purple', 'Blue'],
    gender: 'Male',
    age: '4 months',
    price: 35.00,
    images: [
      'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=400&fit=crop'
    ],
    description: 'Beautiful purple crowntail with excellent ray extension and vibrant colors.',
    isSold: true,
    isNewArrival: false,
    isBestSeller: false,
    shippingInfo: 'Ships within 2-3 business days with live arrival guarantee.',
    acclimatizationGuide: 'Float bag for 15 minutes, then slowly add tank water over 30 minutes.'
  },
  {
    id: '4',
    code: 'DE-045',
    name: 'Marble Dumbo Ear',
    type: 'Dumbo Ear',
    tailType: 'Dumbo Ear',
    color: ['White', 'Blue', 'Red'],
    gender: 'Female',
    age: '3-4 months',
    price: 55.00,
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571752726703-5e7d1f9a3c86?w=400&h=400&fit=crop'
    ],
    description: 'Gorgeous marble dumbo ear female with large pectoral fins and beautiful pattern.',
    isSold: false,
    isNewArrival: true,
    isBestSeller: true,
    shippingInfo: 'Ships within 2-3 business days with live arrival guarantee.',
    acclimatizationGuide: 'Float bag for 15 minutes, then slowly add tank water over 30 minutes.'
  },
  {
    id: '5',
    code: 'GB-201',
    name: 'Giant Blue Halfmoon',
    type: 'Giant Halfmoon',
    tailType: 'Halfmoon',
    color: ['Blue', 'Steel'],
    gender: 'Male',
    age: '6-7 months',
    price: 120.00,
    images: [
      'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=400&fit=crop'
    ],
    description: 'Impressive giant blue halfmoon male with exceptional size and perfect form.',
    isSold: false,
    isNewArrival: false,
    isBestSeller: true,
    isGiantBetta: true,
    shippingInfo: 'Ships within 2-3 business days with live arrival guarantee.',
    acclimatizationGuide: 'Float bag for 15 minutes, then slowly add tank water over 30 minutes.'
  },
  {
    id: '6',
    code: 'SM-156',
    name: 'Samurai Red Plakat',
    type: 'Samurai Plakat',
    tailType: 'Plakat',
    color: ['Red', 'Gold'],
    gender: 'Male',
    age: '5 months',
    price: 95.00,
    images: [
      'https://images.unsplash.com/photo-1571752726703-5e7d1f9a3c86?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop'
    ],
    description: 'Premium samurai red plakat with exceptional breeding lines and stunning coloration.',
    isSold: false,
    isNewArrival: true,
    isBestSeller: false,
    isSamurai: true,
    shippingInfo: 'Ships within 2-3 business days with live arrival guarantee.',
    acclimatizationGuide: 'Float bag for 15 minutes, then slowly add tank water over 30 minutes.'
  }
];
