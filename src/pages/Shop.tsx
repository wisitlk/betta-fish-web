import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import FishCard from '@/components/FishCard';
import { Fish } from '@/types/fish';
import { transformDbFishToFish } from '@/utils/fishTransform';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Shop = () => {
  const [fish, setFish] = useState<Fish[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const { toast } = useToast();

  useEffect(() => {
    fetchFish();
  }, [filter, sortBy]);

  const fetchFish = async () => {
    setLoading(true);
    try {
      let query = supabase.from('fish').select('*');

      // Apply filters
      if (filter === 'new') {
        query = query.eq('is_new_arrival', true);
      } else if (filter === 'bestsellers') {
        query = query.eq('is_best_seller', true);
      } else if (filter === 'giant') {
        query = query.eq('is_giant_betta', true);
      } else if (filter === 'samurai') {
        query = query.eq('is_samurai', true);
      } else if (filter === 'available') {
        query = query.eq('is_sold', false);
      }

      // Apply sorting
      if (sortBy === 'price_low') {
        query = query.order('price', { ascending: true });
      } else if (sortBy === 'price_high') {
        query = query.order('price', { ascending: false });
      } else if (sortBy === 'newest') {
        query = query.order('created_at', { ascending: false });
      } else {
        query = query.order('name', { ascending: true });
      }

      const { data, error } = await query;

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load fish data",
          variant: "destructive",
        });
        console.error('Error fetching fish:', error);
      } else {
        const transformedFish = (data || []).map(transformDbFishToFish);
        setFish(transformedFish);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleFishClick = (fish: Fish) => {
    console.log('Fish clicked:', fish);
    // TODO: Navigate to product detail page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {filter === 'all' ? 'All Products' : 
             filter === 'new' ? 'New Arrivals' :
             filter === 'bestsellers' ? 'Best Sellers' :
             filter === 'giant' ? 'Giant Bettas' :
             filter === 'samurai' ? 'Samurai Bettas' :
             filter === 'available' ? 'Available Fish' : 'Shop'}
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
              >
                All Products
              </Button>
              <Button
                variant={filter === 'available' ? 'default' : 'outline'}
                onClick={() => setFilter('available')}
              >
                Available
              </Button>
              <Button
                variant={filter === 'new' ? 'default' : 'outline'}
                onClick={() => setFilter('new')}
              >
                New Arrivals
              </Button>
              <Button
                variant={filter === 'bestsellers' ? 'default' : 'outline'}
                onClick={() => setFilter('bestsellers')}
              >
                Best Sellers
              </Button>
              <Button
                variant={filter === 'giant' ? 'default' : 'outline'}
                onClick={() => setFilter('giant')}
              >
                Giant Bettas
              </Button>
              <Button
                variant={filter === 'samurai' ? 'default' : 'outline'}
                onClick={() => setFilter('samurai')}
              >
                Samurai
              </Button>
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Loading fish...</div>
          </div>
        ) : fish.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No fish found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later for new arrivals.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {fish.map((fishItem) => (
              <FishCard
                key={fishItem.id}
                fish={fishItem}
                onClick={() => handleFishClick(fishItem)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Shop;
