import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import FishCard from '@/components/FishCard';
import ProductQuickView from '@/components/ProductQuickView';
import ShoppingCart from '@/components/ShoppingCart';
import { Fish } from '@/types/fish';
import { transformDbFishToFish } from '@/utils/fishTransform';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const Shop = () => {
  const [fish, setFish] = useState<Fish[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState<string>(searchParams.get('filter') || 'all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [search, setSearch] = useState<string>('');
  const [selectedFish, setSelectedFish] = useState<Fish | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchFish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, sortBy]);

  // Keep the URL query string in sync so filters are shareable.
  useEffect(() => {
    if (filter === 'all') {
      searchParams.delete('filter');
    } else {
      searchParams.set('filter', filter);
    }
    setSearchParams(searchParams, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

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

  // Client-side search across name, code and colors.
  const visibleFish = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return fish;
    return fish.filter((f) =>
      f.name.toLowerCase().includes(term) ||
      f.code.toLowerCase().includes(term) ||
      f.tailType.toLowerCase().includes(term) ||
      f.color.some((c) => c.toLowerCase().includes(term))
    );
  }, [fish, search]);

  const handleFishClick = (fishItem: Fish) => {
    setSelectedFish(fishItem);
    setQuickViewOpen(true);
  };

  const filters: { key: string; label: string }[] = [
    { key: 'all', label: 'All Products' },
    { key: 'available', label: 'Available' },
    { key: 'new', label: 'New Arrivals' },
    { key: 'bestsellers', label: 'Best Sellers' },
    { key: 'giant', label: 'Giant Bettas' },
    { key: 'samurai', label: 'Samurai' },
  ];

  const heading =
    filter === 'all' ? 'All Products' :
    filter === 'new' ? 'New Arrivals' :
    filter === 'bestsellers' ? 'Best Sellers' :
    filter === 'giant' ? 'Giant Bettas' :
    filter === 'samurai' ? 'Samurai Bettas' :
    filter === 'available' ? 'Available Fish' : 'Shop';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">{heading}</h1>
          <p className="text-sm text-gray-500 mb-4">
            {loading ? 'Loading…' : `${visibleFish.length} ${visibleFish.length === 1 ? 'fish' : 'fish'} available`}
          </p>

          {/* Search */}
          <div className="relative mb-4 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, code, color, tail type…"
              className="pl-9 pr-9"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex gap-2 flex-wrap">
              {filters.map((f) => (
                <Button
                  key={f.key}
                  variant={filter === f.key ? 'default' : 'outline'}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                </Button>
              ))}
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48 sm:ml-auto">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 overflow-hidden">
                <Skeleton className="aspect-square w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : visibleFish.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No fish found</h3>
            <p className="text-gray-600 mb-4">
              {search
                ? `No results for "${search}". Try a different search.`
                : 'Try adjusting your filters or check back later for new arrivals.'}
            </p>
            {search && (
              <Button variant="outline" onClick={() => setSearch('')}>
                Clear search
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleFish.map((fishItem) => (
              <FishCard
                key={fishItem.id}
                fish={fishItem}
                onClick={() => handleFishClick(fishItem)}
              />
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

export default Shop;
