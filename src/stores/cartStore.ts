
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Fish, CartItem } from '../types/fish';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (fish: Fish) => 'added' | 'exists';
  removeItem: (fishId: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  isInCart: (fishId: string) => boolean;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (fish: Fish) => {
        const existingItem = get().items.find(item => item.fish.id === fish.id);
        if (existingItem) {
          return 'exists'; // Fish already in cart (each fish is unique)
        }
        set((state) => ({
          items: [...state.items, { fish, quantity: 1 }],
        }));
        return 'added';
      },

      removeItem: (fishId: string) => {
        set((state) => ({
          items: state.items.filter(item => item.fish.id !== fishId),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openCart: () => set({ isOpen: true }),

      closeCart: () => set({ isOpen: false }),

      isInCart: (fishId: string) => {
        return get().items.some(item => item.fish.id === fishId);
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.fish.price * item.quantity), 0);
      },
    }),
    {
      name: 'betta-cart',
      // Only persist the items, not the open/closed UI state.
      partialize: (state) => ({ items: state.items }),
    }
  )
);
