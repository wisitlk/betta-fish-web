import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Betta Fish Image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-ocean-gradient opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop')`
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 animate-fade-in">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="block">Authentic Bettas</span>
          <span className="block text-gold-300">From Thailand</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-slate-100 max-w-2xl mx-auto">
          Global Shipping with Live Arrival Guarantee
        </p>
        
        <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
          <button className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
            Shop Our Collection
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-ocean-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300">
            Learn More
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">✓</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Live Arrival Guarantee</h3>
            <p className="text-slate-200">Your fish arrives healthy or we replace them</p>
          </div>
          
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🛡️</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Secure Payments</h3>
            <p className="text-slate-200">Safe and encrypted checkout process</p>
          </div>
          
          <div className="text-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🏆</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Expert Breeders</h3>
            <p className="text-slate-200">Sourced from Thailand's finest farms</p>
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
