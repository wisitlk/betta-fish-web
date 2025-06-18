
import React from 'react';
import { Fish } from '../types/fish';
import { useCartStore } from '../stores/cartStore';

interface FishCardProps {
  fish: Fish;
  onClick?: () => void;
}

const FishCard: React.FC<FishCardProps> = ({ fish, onClick }) => {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!fish.isSold) {
      addItem(fish);
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer ${
        fish.isSold ? 'opacity-75' : ''
      }`}
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={fish.images[0]}
          alt={fish.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        
        {/* Sold Overlay */}
        {fish.isSold && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white text-2xl font-bold bg-red-600 px-6 py-2 rounded-lg">
              SOLD
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 space-y-2">
          {fish.isNewArrival && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
              NEW
            </span>
          )}
          {fish.isBestSeller && (
            <span className="bg-gold-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
              BEST SELLER
            </span>
          )}
          {fish.isGiantBetta && (
            <span className="bg-purple-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
              GIANT
            </span>
          )}
          {fish.isSamurai && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
              SAMURAI
            </span>
          )}
        </div>

        {/* Quick Add Button */}
        {!fish.isSold && (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 bg-ocean-600 text-white p-2 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 hover:bg-ocean-700"
          >
            <span className="text-sm">+</span>
          </button>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm text-slate-500 font-medium">{fish.code}</span>
          <span className="text-lg font-bold text-ocean-600">${fish.price.toFixed(2)}</span>
        </div>
        
        <h3 className="font-semibold text-slate-900 mb-1 line-clamp-2">{fish.name}</h3>
        
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>{fish.tailType}</span>
          <span>{fish.gender}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {fish.color.slice(0, 3).map((color) => (
            <span
              key={color}
              className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs"
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
