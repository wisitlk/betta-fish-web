import React from 'react';

const FeaturedCategories = () => {
  const categories = [
    {
      name: 'Halfmoon',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      description: 'Perfect 180° tail spread'
    },
    {
      name: 'Plakat',
      image: 'https://images.unsplash.com/photo-1571752726703-5e7d1f9a3c86?w=400&h=300&fit=crop',
      description: 'Short-finned fighters'
    },
    {
      name: 'Dumbo Ear',
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
      description: 'Large pectoral fins'
    },
    {
      name: 'Crowntail',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      description: 'Spiky fin extensions'
    },
    {
      name: 'Giant Bettas',
      image: 'https://images.unsplash.com/photo-1571752726703-5e7d1f9a3c86?w=400&h=300&fit=crop',
      description: 'Impressive size specimens'
    },
    {
      name: 'Samurai',
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
      description: 'Premium breeding lines'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Featured Categories
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover our curated selection of premium Betta fish from Thailand's finest breeders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="group cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-slate-200 text-sm">{category.description}</p>
                </div>

                <div className="absolute inset-0 bg-ocean-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white text-ocean-600 px-6 py-2 rounded-lg font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View Collection
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
