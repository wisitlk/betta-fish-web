
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCategories />
        
        {/* New Arrivals Carousel */}
        <FishCarousel
          title="New Arrivals"
          subtitle="Fresh imports from Thailand's premier breeders"
          fish={newArrivals}
          onFishClick={handleFishClick}
        />

        {/* Best Sellers Carousel */}
        <FishCarousel
          title="Best Sellers"
          subtitle="Our most popular and beloved specimens"
          fish={bestSellers}
          onFishClick={handleFishClick}
        />

        {/* Newsletter Section */}
        <section className="py-16 lg:py-20 bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Stay in the Loop
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get notified about new arrivals, exclusive offers, and care tips
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
              />
              <button className="bg-white text-black px-8 py-3 font-semibold hover:bg-gray-100 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 text-black">Thailand Betta Fish</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Premium Betta fish from Thailand's finest breeders, shipped worldwide with live arrival guarantee.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-black">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-black transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Giant Bettas</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-black">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Care Guide</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Returns</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-black">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-black transition-colors">YouTube</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Email</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-600">&copy; 2024 Thailand Betta Fish. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ShoppingCart />
    </div>
  );
};

export default Index;
