
import { Database } from '@/integrations/supabase/types';

type DbFish = Database['public']['Tables']['fish']['Row'];

export const transformDbFishToFish = (dbFish: DbFish): import('@/types/fish').Fish => {
  return {
    id: dbFish.id,
    code: dbFish.code,
    name: dbFish.name,
    type: dbFish.type,
    tail_type: dbFish.tail_type,
    color: dbFish.color,
    gender: dbFish.gender,
    age: dbFish.age,
    price: Number(dbFish.price),
    images: dbFish.images,
    video: dbFish.video || undefined,
    description: dbFish.description || '',
    is_sold: dbFish.is_sold,
    is_new_arrival: dbFish.is_new_arrival,
    is_best_seller: dbFish.is_best_seller,
    is_giant_betta: dbFish.is_giant_betta,
    is_samurai: dbFish.is_samurai,
    shipping_info: dbFish.shipping_info || '',
    acclimatization_guide: dbFish.acclimatization_guide || '',
    created_at: dbFish.created_at,
    updated_at: dbFish.updated_at,
    
    // Legacy properties for backward compatibility
    tailType: dbFish.tail_type,
    isSold: dbFish.is_sold,
    isNewArrival: dbFish.is_new_arrival,
    isBestSeller: dbFish.is_best_seller,
    isGiantBetta: dbFish.is_giant_betta,
    isSamurai: dbFish.is_samurai,
    shippingInfo: dbFish.shipping_info || '',
    acclimatizationGuide: dbFish.acclimatization_guide || '',
  };
};
