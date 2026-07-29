
import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';

const ShoppingCart = () => {
  const { items, isOpen, toggleCart, closeCart, removeItem, getTotalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const goTo = (path: string) => {
    closeCart();
    navigate(path);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
        onClick={toggleCart}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 transform transition-transform duration-300 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 flex items-center">
            <ShoppingBag className="mr-2" size={20} />
            Shopping Cart ({items.length})
          </h2>
          <button
            onClick={toggleCart}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
          >
            <X size={20} className="text-slate-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 text-lg">Your cart is empty</p>
              <p className="text-slate-400 text-sm mt-2">Add some beautiful fish to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.fish.id} className="flex items-center space-x-4 bg-slate-50 rounded-lg p-4">
                  <img
                    src={item.fish.images[0]}
                    alt={item.fish.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-slate-900 truncate">{item.fish.name}</h3>
                    <p className="text-sm text-slate-500">{item.fish.code}</p>
                    <p className="text-lg font-semibold text-ocean-600">${item.fish.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Qty: {item.quantity}</span>
                    <button
                      onClick={() => removeItem(item.fish.id)}
                      className="p-1 hover:bg-red-100 rounded text-red-500 transition-colors duration-200"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-slate-200 p-6 space-y-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span className="text-ocean-600">${getTotalPrice().toFixed(2)}</span>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => goTo('/checkout')}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={() => goTo('/cart')}
                className="w-full border border-slate-300 text-slate-700 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors duration-200"
              >
                View Cart
              </button>
              <button
                onClick={clearCart}
                className="w-full text-slate-500 py-1 text-sm font-medium hover:text-red-600 transition-colors duration-200"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;
