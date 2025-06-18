
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturedCategories from '../components/FeaturedCategories';
import FishCarousel from '../components/FishCarousel';
import ShoppingCart from '../components/ShoppingCart';
import { mockFish } from '../data/mockFish';

const Index = () => {
  const newArrivals = mockFish.filter(fish => fish.isNewArrival);
  const bestSellers = mockFish.filter(fish => fish.isBestSeller);

  const handleFishClick = (fish: any) => {
    console.log('Fish clicked:', fish);
    // Navigate to product detail page
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCategories />
        
        {/* New Arrivals Carousel */}
        <div className="bg-white">
          <FishCarousel
            title="New Arrivals"
            subtitle="Fresh imports from Thailand's premier breeders"
            fish={newArrivals}
            onFishClick={handleFishClick}
          />
        </div>

        {/* Best Sellers Carousel */}
        <div className="bg-slate-50">
          <FishCarousel
            title="Best Sellers"
            subtitle="Our most popular and beloved specimens"
            fish={bestSellers}
            onFishClick={handleFishClick}
          />
        </div>

        {/* Newsletter Section */}
        <section className="py-16 lg:py-24 bg-ocean-gradient">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Stay Updated
              </h2>
              <p className="text-xl text-slate-100 mb-8">
                Get notified about new arrivals and exclusive offers
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                <button className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-gold-300">Thailand Betta Fish</h3>
              <p className="text-slate-300">
                Premium Betta fish from Thailand's finest breeders, shipped worldwide with live arrival guarantee.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-gold-300 transition-colors">Shop All</a></li>
                <li><a href="#" className="hover:text-gold-300 transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-gold-300 transition-colors">Care Guide</a></li>
                <li><a href="#" className="hover:text-gold-300 transition-colors">Shipping Info</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-gold-300 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-gold-300 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-gold-300 transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-gold-300 transition-colors">Track Order</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-gold-300 transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-gold-300 transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-gold-300 transition-colors">YouTube</a></li>
                <li><a href="#" className="hover:text-gold-300 transition-colors">Newsletter</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Thailand Betta Fish. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ShoppingCart />
    </div>
  );
};

export default Index;
