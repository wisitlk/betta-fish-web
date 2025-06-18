
import { create } from 'zustand';
import { Fish, CartItem } from '../types/fish';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (fish: Fish) => void;
  removeItem: (fishId: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  
  addItem: (fish: Fish) => {
    set((state) => {
      const existingItem = state.items.find(item => item.fish.id === fish.id);
      if (existingItem) {
        return state; // Fish already in cart (each fish is unique)
      }
      return {
        items: [...state.items, { fish, quantity: 1 }]
      };
    });
  },
  
  removeItem: (fishId: string) => {
    set((state) => ({
      items: state.items.filter(item => item.fish.id !== fishId)
    }));
  },
  
  clearCart: () => {
    set({ items: [] });
  },
  
  toggleCart: () => {
    set((state) => ({ isOpen: !state.isOpen }));
  },
  
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
  
  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + (item.fish.price * item.quantity), 0);
  }
}));
