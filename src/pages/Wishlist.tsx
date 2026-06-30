import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import FishCard from '@/components/FishCard';
import ProductQuickView from '@/components/ProductQuickView';
import ShoppingCart from '@/components/ShoppingCart';
import { Button } from '@/components/ui/button';
import { useWishlistStore } from '@/stores/wishlistStore';
import { Fish } from '@/types/fish';
import { Heart, ArrowLeft } from 'lucide-react';

const Wishlist = () => {
  const { items, clearWishlist } = useWishlistStore();
  const [selectedFish, setSelectedFish] = useState<Fish | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const handleFishClick = (fish: Fish) => {
    setSelectedFish(fish);
    setQuickViewOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Heart className="h-7 w-7 text-red-500" />
            Wishlist
          </h1>
          {items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-sm text-gray-500 hover:text-red-600 transition-colors duration-200"
            >
              Clear Wishlist
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <Heart className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6">
              Tap the heart on any fish to save it here for later.
            </p>
            <Link to="/shop">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Browse the Shop
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((fish) => (
              <FishCard key={fish.id} fish={fish} onClick={() => handleFishClick(fish)} />
            ))}
          </div>
        )}
      </main>

      <ProductQuickView
        fish={selectedFish}
        open={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
      <ShoppingCart />
    </div>
  );
};

export default Wishlist;
