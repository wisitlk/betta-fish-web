
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
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-slate-600">{subtitle}</p>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors duration-200"
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={20} className="text-slate-600" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors duration-200"
              disabled={currentIndex >= fish.length - itemsPerView.desktop}
            >
              <ChevronRight size={20} className="text-slate-600" />
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
                className="w-full md:w-1/2 lg:w-1/4 flex-shrink-0 px-3"
              >
                <FishCard
                  fish={fishItem}
                  onClick={() => onFishClick?.(fishItem)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(fish.length / itemsPerView.desktop) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === Math.floor(currentIndex / itemsPerView.desktop)
                  ? 'bg-ocean-600'
                  : 'bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FishCarousel;
