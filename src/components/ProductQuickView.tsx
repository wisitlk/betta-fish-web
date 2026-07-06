
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Fish } from '../types/fish';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { toast } from 'sonner';
import { ShoppingCart, Heart, Check, Truck, ShieldCheck, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductQuickViewProps {
  fish: Fish | null;
  open: boolean;
  onClose: () => void;
}

const ProductQuickView: React.FC<ProductQuickViewProps> = ({ fish, open, onClose }) => {
  const navigate = useNavigate();
  const { addItem, isInCart, openCart } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
  }, [fish?.id]);

  if (!fish) return null;

  const inCart = isInCart(fish.id);
  const wishlisted = isWishlisted(fish.id);
  const images = fish.images?.length ? fish.images : [`${import.meta.env.BASE_URL}placeholder.svg`];

  const handleAddToCart = () => {
    if (fish.isSold) return;
    const result = addItem(fish);
    if (result === 'added') {
      toast.success(`${fish.name} added to cart`);
      openCart();
    } else {
      toast.info('This fish is already in your cart');
    }
  };

  const handleBuyNow = () => {
    if (fish.isSold) return;
    addItem(fish);
    onClose();
    navigate('/checkout');
  };

  const handleWishlist = () => {
    const result = toggleItem(fish);
    toast[result === 'added' ? 'success' : 'info'](
      result === 'added' ? `${fish.name} saved to wishlist` : `${fish.name} removed from wishlist`
    );
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden gap-0 max-h-[90vh] overflow-y-auto bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image gallery */}
          <div className="bg-gray-50 p-6">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
              <img
                src={images[activeImage]}
                alt={fish.name}
                className="w-full h-full object-cover"
              />
              {fish.isSold && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-xl font-bold bg-red-600 px-4 py-2 rounded">
                    SOLD OUT
                  </span>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 mt-4 flex-wrap">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                      i === activeImage ? 'border-black' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`${fish.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500 font-medium">{fish.code}</p>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">{fish.name}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-gray-700 transition-colors shrink-0"
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-3">
              {fish.isNewArrival && (
                <span className="new-badge text-white px-2 py-1 text-xs font-semibold rounded">NEW</span>
              )}
              {fish.isBestSeller && (
                <span className="sale-badge text-white px-2 py-1 text-xs font-semibold rounded">BESTSELLER</span>
              )}
              {fish.isGiantBetta && (
                <span className="bg-purple-600 text-white px-2 py-1 text-xs font-semibold rounded">GIANT</span>
              )}
              {fish.isSamurai && (
                <span className="bg-yellow-600 text-white px-2 py-1 text-xs font-semibold rounded">SAMURAI</span>
              )}
            </div>

            <p className="text-3xl font-bold text-black mt-4">${fish.price.toFixed(2)}</p>

            {/* Spec grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-5 text-sm">
              <div>
                <p className="text-gray-500">Tail Type</p>
                <p className="font-medium text-gray-900">{fish.tailType}</p>
              </div>
              <div>
                <p className="text-gray-500">Gender</p>
                <p className="font-medium text-gray-900">{fish.gender}</p>
              </div>
              <div>
                <p className="text-gray-500">Age</p>
                <p className="font-medium text-gray-900">{fish.age || '—'}</p>
              </div>
              <div>
                <p className="text-gray-500">Type</p>
                <p className="font-medium text-gray-900">{fish.type || '—'}</p>
              </div>
            </div>

            {/* Colors */}
            {fish.color?.length > 0 && (
              <div className="mt-4">
                <p className="text-gray-500 text-sm mb-1">Colors</p>
                <div className="flex flex-wrap gap-1">
                  {fish.color.map((color) => (
                    <span key={color} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {fish.description && (
              <p className="text-sm text-gray-600 mt-4 leading-relaxed line-clamp-4">{fish.description}</p>
            )}

            {/* Actions */}
            <div className="mt-auto pt-6 space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={fish.isSold}
                  className="flex-1 bg-black text-white py-3 px-4 font-medium rounded-md hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {inCart ? (
                    <>
                      <Check size={18} className="mr-2" /> In Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} className="mr-2" /> Add to Cart
                    </>
                  )}
                </button>
                <button
                  onClick={handleWishlist}
                  className={`p-3 border rounded-md transition-colors ${
                    wishlisted
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>
              <button
                onClick={handleBuyNow}
                disabled={fish.isSold}
                className="w-full border border-gray-900 text-gray-900 py-3 px-4 font-medium rounded-md hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>

              {/* Trust signals */}
              <div className="flex items-center gap-4 pt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} /> Live arrival guarantee
                </span>
                <span className="flex items-center gap-1">
                  <Truck size={14} /> Worldwide shipping
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;
