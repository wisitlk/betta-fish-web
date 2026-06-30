
import React from 'react';
import { useCartStore } from '../stores/cartStore';
import { X, ArrowLeft, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const Cart = () => {
  const { items, removeItem, clearCart, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
            <div className="bg-white rounded-lg p-12">
              <div className="text-gray-500 text-xl mb-6">Your cart is empty</div>
              <Link 
                to="/" 
                className="inline-flex items-center bg-black text-white px-6 py-3 font-medium hover:bg-gray-800 transition-colors duration-200"
              >
                <ArrowLeft size={20} className="mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Cart ({items.length} items)</h1>
          <button
            onClick={clearCart}
            className="text-sm text-gray-500 hover:text-red-600 transition-colors duration-200"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {items.map((item, index) => (
                <div key={item.fish.id} className={`p-6 ${index !== items.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <div className="flex items-start space-x-4">
                    <img
                      src={item.fish.images[0]}
                      alt={item.fish.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{item.fish.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{item.fish.code}</p>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <span className="mr-4">{item.fish.tailType}</span>
                        <span className="mr-4">{item.fish.gender}</span>
                        <span>{item.fish.age}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {item.fish.color.slice(0, 3).map((color) => (
                          <span
                            key={color}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900 mb-4">${item.fish.price.toFixed(2)}</p>
                      <button
                        onClick={() => removeItem(item.fish.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">Calculated at checkout</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link 
                to="/checkout" 
                className="w-full bg-black text-white py-3 px-4 font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center mb-4"
              >
                <CreditCard size={20} className="mr-2" />
                Proceed to Checkout
              </Link>

              <Link 
                to="/" 
                className="w-full border border-gray-300 text-gray-700 py-3 px-4 font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
              >
                <ArrowLeft size={20} className="mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
