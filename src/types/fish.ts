
export interface Fish {
  id: string;
  code: string;
  name: string;
  type: string;
  tail_type: 'Halfmoon' | 'Plakat' | 'Crowntail' | 'Dumbo Ear' | 'Rosetail' | 'Spade Tail';
  color: string[];
  gender: 'Male' | 'Female';
  age: string;
  price: number;
  images: string[];
  video?: string;
  description: string;
  is_sold: boolean;
  is_new_arrival: boolean;
  is_best_seller: boolean;
  is_giant_betta?: boolean;
  is_samurai?: boolean;
  shipping_info: string;
  acclimatization_guide: string;
  created_at: string;
  updated_at: string;
  
  // Legacy properties for backward compatibility
  tailType: 'Halfmoon' | 'Plakat' | 'Crowntail' | 'Dumbo Ear' | 'Rosetail' | 'Spade Tail';
  isSold: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isGiantBetta?: boolean;
  isSamurai?: boolean;
  shippingInfo: string;
  acclimatizationGuide: string;
}

export interface CartItem {
  fish: Fish;
  quantity: number;
}
