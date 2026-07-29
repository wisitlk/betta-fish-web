
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Fish } from '../types/fish';

interface WishlistStore {
  items: Fish[];
  toggleItem: (fish: Fish) => 'added' | 'removed';
  removeItem: (fishId: string) => void;
  isWishlisted: (fishId: string) => boolean;
  clearWishlist: () => void;
  getTotalItems: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggleItem: (fish: Fish) => {
        const exists = get().items.some(item => item.id === fish.id);
        if (exists) {
          set((state) => ({ items: state.items.filter(item => item.id !== fish.id) }));
          return 'removed';
        }
        set((state) => ({ items: [...state.items, fish] }));
        return 'added';
      },

      removeItem: (fishId: string) => {
        set((state) => ({ items: state.items.filter(item => item.id !== fishId) }));
      },

      isWishlisted: (fishId: string) => {
        return get().items.some(item => item.id === fishId);
      },

      clearWishlist: () => set({ items: [] }),

      getTotalItems: () => get().items.length,
    }),
    {
      name: 'betta-wishlist',
    }
  )
);
