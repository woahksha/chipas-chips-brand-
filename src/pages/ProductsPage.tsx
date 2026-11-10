import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { SpiceMeter } from '../components/SpiceMeter';
import { Search, Flame, Filter, ShoppingBag, ArrowRight } from 'lucide-react';

interface ProductsPageProps {
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onNavigateToWhereToBuy: () => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onSelectProduct,
  onQuickAdd,
  onNavigateToWhereToBuy
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [spiceFilter, setSpiceFilter] = useState<number | null>(null);

  const categories: string[] = [
    'All Products',
    'Regional Rasa',
    'Classic',
    'Olive Oil',
    'Protein+'
  ];

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All Products' || product.collection === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.collection.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpice =
      spiceFilter === null || product.spiceLevel === spiceFilter;

    return matchesCategory && matchesSearch && matchesSpice;
  });

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Catalogue Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#8B1E29] mb-1">
              <span>Product Catalogue</span>
              <span aria-hidden="true">·</span>
              <span>Six Signature Packs</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight">
              Meet your new favourite crunch.
            </h1>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              Authentic flavours, honest ingredients, zero palm oil, and our patented clean-finger grabber on every pack.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500">
              Showing <strong className="text-slate-900 tabular-nums">{filteredProducts.length}</strong> of 6 Varieties
            </span>
          </div>
        </div>

        {/* Clean Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 w-full md:w-auto">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#8B1E29] text-white shadow-xs'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-white'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Keyword Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by flavour name or spice..."
                className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1E29]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-800"
                >
                  ✕
                </button>
              )}
            </div>

          </div>

          {/* Spice Filter Quick Row */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
            <span className="font-bold text-slate-700 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-[#8B1E29]" />
              Spice Level:
            </span>
            <button
              onClick={() => setSpiceFilter(null)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer ${
                spiceFilter === null
                  ? 'bg-[#8B1E29] text-white font-bold'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              All Levels
            </button>
            {[0, 1, 2, 3, 4].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSpiceFilter(lvl === spiceFilter ? null : lvl)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer ${
                  spiceFilter === lvl
                    ? 'bg-[#8B1E29] text-white font-bold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {lvl === 0 ? 'Mild (0)' : `Heat ${lvl}`}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Product Cards Grid (Clean, Pack-First Presentation) */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-white rounded-3xl border border-dashed border-slate-300">
            <p className="text-sm font-bold text-slate-800">No chips match this specific filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('All Products');
                setSearchQuery('');
                setSpiceFilter(null);
              }}
              className="text-xs font-bold text-[#8B1E29] underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        )}

        {/* Spice-O-Meter Reference Table */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#8B1E29] block">
                Heat Guide
              </span>
              <h3 className="text-2xl font-black text-slate-900 font-display">
                Pick your heat.
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Spice ratings based on actual consumer tasting trials.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                onClick={() => onSelectProduct(prod)}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50 p-2 rounded-xl transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3.5 h-3.5 rounded-full shrink-0"
                    style={{ backgroundColor: prod.packagingColor.primary }}
                  />
                  <div>
                    <span className="text-sm font-bold text-slate-900 font-display">
                      {prod.name}
                    </span>
                    <span className="text-xs text-slate-400 ml-2">
                      ({prod.collection})
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6">
                  <span className="text-xs text-slate-600 font-medium">
                    {prod.heatDescriptor}
                  </span>
                  <SpiceMeter level={prod.spiceLevel} size="md" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Where to Buy banner */}
        <div className="bg-[#5C0D15] text-white p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 border-2 border-[#FBBF24]">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-black font-display text-white">
              Want 10-Minute Doorstep Delivery?
            </h4>
            <p className="text-xs text-amber-100/80">
              Find physical store shelves or order directly via Blinkit and Zepto.
            </p>
          </div>
          <button
            onClick={onNavigateToWhereToBuy}
            className="px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider text-slate-950 bg-[#FBBF24] hover:bg-[#F59E0B] transition-all whitespace-nowrap cursor-pointer shadow-md"
          >
            Open Store Locator
          </button>
        </div>

      </div>
    </div>
  );
};
