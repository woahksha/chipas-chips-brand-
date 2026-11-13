import React, { useRef } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ChipasBagIllustration } from './ChipasBagIllustration';
import { ChevronLeft, ChevronRight, ShoppingBag, Star, Flame, Sparkles } from 'lucide-react';

interface BestsellersCarouselProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  className?: string;
}

export const BestsellersCarousel: React.FC<BestsellersCarouselProps> = ({
  title = 'Bestsellers & Fan Favorites',
  subtitle = 'The crunch that started a revolution across campuses. Hand-cooked with zero palm oil.',
  badge = 'Top Ranked',
  onSelectProduct,
  onQuickAdd,
  className = ''
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 ${className}`}>
      {/* Header with Navigation Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#8B1E29] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#8B1E29]" />
            <span>{badge}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight mt-1">
            {title}
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-3 rounded-full bg-white hover:bg-[#FBBF24] border border-slate-200 text-slate-800 transition-all hover:scale-105 cursor-pointer shadow-xs"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-3 rounded-full bg-white hover:bg-[#FBBF24] border border-slate-200 text-slate-800 transition-all hover:scale-105 cursor-pointer shadow-xs"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x scroll-smooth no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {PRODUCTS.map((product, idx) => {
          const defaultSize = product.sizes[1] || product.sizes[0];
          return (
            <div
              key={product.id}
              className="min-w-[280px] sm:min-w-[320px] max-w-[320px] bg-white rounded-3xl border-2 border-[#E8DEC8] hover:border-[#8B1E29] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-6 snap-start group relative overflow-hidden"
            >
              {/* Top Tag & Spice Indicator */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-100 text-[#8B1E29] border border-amber-300/60">
                  {product.collection}
                </span>

                <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 text-[11px] font-bold text-amber-900">
                  <Star className="w-3 h-3 fill-[#FBBF24] text-amber-500" />
                  <span>4.9</span>
                </div>
              </div>

              {/* Product Illustration */}
              <div
                onClick={() => onSelectProduct(product)}
                className="py-4 flex justify-center cursor-pointer transform group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
              >
                <ChipasBagIllustration product={product} size="md" />
              </div>

              {/* Text Info */}
              <div className="space-y-2 mt-2">
                <h3
                  onClick={() => onSelectProduct(product)}
                  className="text-lg font-black font-display text-slate-900 group-hover:text-[#8B1E29] transition-colors cursor-pointer leading-snug line-clamp-1"
                >
                  {product.name}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {product.tagline}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Starting from</span>
                    <strong className="text-base font-black text-slate-900 font-display">
                      ₹{product.sizes[0].price}
                    </strong>
                    <span className="text-[10px] text-slate-500 ml-1">({product.sizes[0].weight})</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onQuickAdd(product)}
                      className="px-3.5 py-2 rounded-xl bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
                      title="Quick Add to Bag"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};
