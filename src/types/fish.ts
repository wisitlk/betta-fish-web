
export interface Fish {
  id: string;
  code: string;
  name: string;
  type: string;
  tailType: 'Halfmoon' | 'Plakat' | 'Crowntail' | 'Dumbo Ear' | 'Rosetail' | 'Spade Tail';
  color: string[];
  gender: 'Male' | 'Female';
  age: string;
  price: number;
  images: string[];
  video?: string;
  description: string;
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
