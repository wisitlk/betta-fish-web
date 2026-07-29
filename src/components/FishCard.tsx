
import React from 'react';
import { Fish } from '../types/fish';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { toast } from 'sonner';
import { Check, Heart, ShoppingCart } from 'lucide-react';

interface FishCardProps {
  fish: Fish;
  onClick?: () => void;
}

const FishCard: React.FC<FishCardProps> = ({ fish, onClick }) => {
  const { addItem, isInCart, openCart } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();

  const inCart = isInCart(fish.id);
  const wishlisted = isWishlisted(fish.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fish.isSold) return;
    const result = addItem(fish);
    if (result === 'added') {
      toast.success(`${fish.name} added to cart`);
      openCart();
    } else {
      toast.info('This fish is already in your cart');
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    const result = toggleItem(fish);
    toast[result === 'added' ? 'success' : 'info'](
      result === 'added' ? `${fish.name} saved to wishlist` : `${fish.name} removed from wishlist`
    );
  };

  return (
    <div
      className={`group bg-white border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer ${
        fish.isSold ? 'opacity-75' : ''
      }`}
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={fish.images[0]}
          alt={fish.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Sold Overlay */}
        {fish.isSold && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-xl font-bold bg-red-600 px-4 py-2 rounded">
              SOLD OUT
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 space-y-1">
          {fish.isNewArrival && (
            <span className="new-badge text-white px-2 py-1 text-xs font-semibold rounded">
              NEW
            </span>
          )}
          {fish.isBestSeller && (
            <span className="sale-badge text-white px-2 py-1 text-xs font-semibold rounded">
              BESTSELLER
            </span>
          )}
          {fish.isGiantBetta && (
            <span className="bg-purple-600 text-white px-2 py-1 text-xs font-semibold rounded">
              GIANT
            </span>
          )}
          {fish.isSamurai && (
            <span className="bg-yellow-600 text-white px-2 py-1 text-xs font-semibold rounded">
              SAMURAI
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur shadow-sm transition-colors ${
            wishlisted ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
          }`}
          aria-label="Toggle wishlist"
        >
          <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick Add Button */}
        {!fish.isSold && (
          <button
            onClick={handleAddToCart}
            className={`absolute bottom-3 right-3 px-3 py-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center ${
              inCart ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {inCart ? (
              <>
                <Check size={16} className="mr-1" /> In Cart
              </>
            ) : (
              <>
                <ShoppingCart size={16} className="mr-1" /> Add to Cart
              </>
            )}
          </button>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm text-gray-500 font-medium">{fish.code}</span>
          <span className="text-lg font-bold text-black">${fish.price.toFixed(2)}</span>
        </div>

        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 leading-tight">{fish.name}</h3>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>{fish.tailType}</span>
          <span>{fish.gender}</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {fish.color.slice(0, 3).map((color) => (
            <span
              key={color}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
            >
              {color}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FishCard;
