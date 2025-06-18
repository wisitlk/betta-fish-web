
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Fish } from '../types/fish';
import FishCard from './FishCard';

interface FishCarouselProps {
  title: string;
  subtitle?: string;
  fish: Fish[];
  onFishClick?: (fish: Fish) => void;
}

const FishCarousel: React.FC<FishCarouselProps> = ({ title, subtitle, fish, onFishClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = { mobile: 1, tablet: 2, desktop: 4 };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, fish.length - itemsPerView.desktop + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, fish.length - itemsPerView.desktop) : prev - 1
    );
  };

  if (fish.length === 0) return null;

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="text-center w-full lg:text-left lg:w-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-600">{subtitle}</p>
            )}
          </div>
          
          <div className="hidden lg:flex space-x-2">
            <button
              onClick={prevSlide}
              className="p-2 border border-gray-300 hover:border-gray-400 transition-colors duration-200"
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 border border-gray-300 hover:border-gray-400 transition-colors duration-200"
              disabled={currentIndex >= fish.length - itemsPerView.desktop}
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView.desktop)}%)`,
            }}
          >
            {fish.map((fishItem) => (
              <div
                key={fishItem.id}
                className="w-full md:w-1/2 lg:w-1/4 flex-shrink-0 px-2"
              >
                <FishCard
                  fish={fishItem}
                  onClick={() => onFishClick?.(fishItem)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile navigation dots */}
        <div className="flex justify-center mt-6 space-x-2 lg:hidden">
          {Array.from({ length: Math.ceil(fish.length / itemsPerView.mobile) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentIndex ? 'bg-black' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FishCarousel;
