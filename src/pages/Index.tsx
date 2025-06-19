
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturedCategories from '../components/FeaturedCategories';
import FishCarousel from '../components/FishCarousel';
import ShoppingCart from '../components/ShoppingCart';
import { Fish } from '../types/fish';
import { transformDbFishToFish } from '@/utils/fishTransform';
import { Link } from 'react-router-dom';

const Index = () => {
  const [newArrivals, setNewArrivals] = useState<Fish[]>([]);
  const [bestSellers, setBestSellers] = useState<Fish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFish();
  }, []);

  const fetchFish = async () => {
    try {
      // Fetch new arrivals
      const { data: newArrivalsData } = await supabase
        .from('fish')
        .select('*')
        .eq('is_new_arrival', true)
        .limit(8);

      // Fetch best sellers
      const { data: bestSellersData } = await supabase
        .from('fish')
        .select('*')
        .eq('is_best_seller', true)
        .limit(8);

      const transformedNewArrivals = (newArrivalsData || []).map(transformDbFishToFish);
      const transformedBestSellers = (bestSellersData || []).map(transformDbFishToFish);
      
      setNewArrivals(transformedNewArrivals);
      setBestSellers(transformedBestSellers);
    } catch (error) {
      console.error('Error fetching fish:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFishClick = (fish: Fish) => {
    console.log('Fish clicked:', fish);
    // Navigate to product detail page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCategories />
        
        {!loading && (
          <>
            {/* New Arrivals Carousel */}
            {newArrivals.length > 0 && (
              <FishCarousel
                title="New Arrivals"
                subtitle="Fresh imports from Thailand's premier breeders"
                fish={newArrivals}
                onFishClick={handleFishClick}
              />
            )}

            {/* Best Sellers Carousel */}
            {bestSellers.length > 0 && (
              <FishCarousel
                title="Best Sellers"
                subtitle="Our most popular and beloved specimens"
                fish={bestSellers}
                onFishClick={handleFishClick}
              />
            )}
          </>
        )}

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
                  <li><Link to="/shop" className="hover:text-black transition-colors">All Products</Link></li>
                  <li><Link to="/shop?filter=new" className="hover:text-black transition-colors">New Arrivals</Link></li>
                  <li><Link to="/shop?filter=bestsellers" className="hover:text-black transition-colors">Best Sellers</Link></li>
                  <li><Link to="/shop?filter=giant" className="hover:text-black transition-colors">Giant Bettas</Link></li>
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
                  <li><Link to="/auth" className="hover:text-black transition-colors">Sign In</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-200 mt-8 pt-8 text-center">
              <p className="text-sm text-gray-600">&copy; 2024 Thailand Betta Fish. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>

      <ShoppingCart />
    </div>
  );
};

export default Index;
