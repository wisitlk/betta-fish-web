
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="w-full h-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600"></div>
        
        {/* Animated fish elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Fish 1 - Swimming left to right */}
          <div className="absolute top-1/4 left-0 w-16 h-8 opacity-20 animate-[swim1_15s_linear_infinite]">
            <div className="w-full h-full bg-gradient-to-r from-red-400 to-pink-400 rounded-full transform rotate-12"></div>
          </div>
          
          {/* Fish 2 - Swimming right to left */}
          <div className="absolute top-1/3 right-0 w-12 h-6 opacity-25 animate-[swim2_12s_linear_infinite]">
            <div className="w-full h-full bg-gradient-to-l from-yellow-400 to-orange-400 rounded-full transform -rotate-12"></div>
          </div>
          
          {/* Fish 3 - Swimming diagonally */}
          <div className="absolute top-1/2 left-1/4 w-20 h-10 opacity-15 animate-[swim3_18s_linear_infinite]">
            <div className="w-full h-full bg-gradient-to-r from-purple-400 to-blue-300 rounded-full transform rotate-45"></div>
          </div>
          
          {/* Fish 4 - Small fish school */}
          <div className="absolute top-3/4 right-1/3 w-8 h-4 opacity-30 animate-[swim4_10s_linear_infinite]">
            <div className="w-full h-full bg-gradient-to-r from-green-400 to-teal-400 rounded-full"></div>
          </div>
          
          {/* Fish 5 - Large fish */}
          <div className="absolute top-1/6 left-1/2 w-24 h-12 opacity-20 animate-[swim5_20s_linear_infinite]">
            <div className="w-full h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full transform -rotate-30"></div>
          </div>
          
          {/* Bubbles */}
          <div className="absolute bottom-0 left-1/4 w-2 h-2 bg-white rounded-full opacity-40 animate-[bubble_8s_linear_infinite]"></div>
          <div className="absolute bottom-0 right-1/3 w-3 h-3 bg-white rounded-full opacity-30 animate-[bubble_6s_linear_infinite_2s]"></div>
          <div className="absolute bottom-0 left-2/3 w-1 h-1 bg-white rounded-full opacity-50 animate-[bubble_10s_linear_infinite_4s]"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 animate-fade-in max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="block drop-shadow-lg">Authentic Bettas</span>
          <span className="block text-yellow-300 drop-shadow-lg">From Thailand</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto drop-shadow">
          Global Shipping with Live Arrival Guarantee
        </p>
        
        <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
          <Link to="/shop">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Shop Our Collection
            </button>
          </Link>
          <Link to="/shop?filter=new">
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300">
              New Arrivals
            </button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-blue-900 text-2xl font-bold">✓</span>
            </div>
            <h3 className="font-semibold text-lg mb-2 drop-shadow">Live Arrival Guarantee</h3>
            <p className="text-blue-100 drop-shadow">Your fish arrives healthy or we replace them</p>
          </div>
          
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-blue-900 text-2xl">🛡️</span>
            </div>
            <h3 className="font-semibold text-lg mb-2 drop-shadow">Secure Payments</h3>
            <p className="text-blue-100 drop-shadow">Safe and encrypted checkout process</p>
          </div>
          
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-blue-900 text-2xl">🏆</span>
            </div>
            <h3 className="font-semibold text-lg mb-2 drop-shadow">Expert Breeders</h3>
            <p className="text-blue-100 drop-shadow">Sourced from Thailand's finest farms</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
