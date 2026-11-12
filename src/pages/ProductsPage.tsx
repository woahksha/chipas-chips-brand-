import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { SpiceMeter } from '../components/SpiceMeter';
import { BrandCommercialVideo } from '../components/BrandCommercialVideo';
import { Search, Flame, Filter, ShoppingBag, ArrowRight, FileText, Maximize2, Eye, X, ChevronLeft, ChevronRight, ExternalLink, CheckCircle2 } from 'lucide-react';

interface ProductPamphlet {
  id: string;
  badge: string;
  title: string;
  headline: string;
  subtitle: string;
  image: string;
  madeBy: string;
  nutritionTag: string;
  keyPoints: string[];
}

const PRODUCTS_PAMPHLETS: ProductPamphlet[] = [
  {
    id: 'prod-pamphlet-1',
    badge: 'Flavour Pamphlet 01',
    title: 'Sour Cream & Onion Potato Chips',
    headline: 'Discover the zesty crunch!',
    subtitle: 'Zesty sour cream, fresh chives, 100% real potatoes, and natural seasonings for a crispy, light and flavorful bite.',
    image: '/assets/aistudio/Screenshot_2026-11-10_220405_14f798cc.png',
    madeBy: '25BA136',
    nutritionTag: 'Per 30g Serving: 152 kcal | 2g Protein | 8.5g Total Fat',
    keyPoints: [
      '100% Real Potatoes sliced thin & cooked to golden perfection',
      'Zesty Sour Cream & Chives with natural flavoring stamp',
      'No artificial flavors or synthetic colors, zero palm oil',
      'Per 30g serving: 152 kcal · 2g protein · 8.5g fat'
    ]
  },
  {
    id: 'prod-pamphlet-2',
    badge: 'Flavour Pamphlet 02',
    title: 'Spicy Chili & Lime Potato Chips',
    headline: 'Crunch into the spicy kick!',
    subtitle: 'Fiery red chilies, freshly squeezed zesty lime, spiced to perfection with big crunch and bold flavor.',
    image: '/assets/aistudio/Screenshot_2026-11-10_220425_51fc3276.png',
    madeBy: '25BA136',
    nutritionTag: 'Per 30g Serving: 155 kcal | 2g Protein | 9g Total Fat',
    keyPoints: [
      'Crunch into the spicy kick with vibrant red chilies & lime wedges',
      'Spiced to perfection with no artificial colors or additives',
      'Big crunch, bold flavor engineered for study and party snacking',
      'Per 30g serving: 155 kcal · 2g protein · 9g fat'
    ]
  }
];

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
  const [selectedPamphletIndex, setSelectedPamphletIndex] = useState<number | null>(null);

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

        {/* ---------------- SECTION: OFFICIAL PRODUCT FLAVOUR PAMPHLETS (MADE BY 25BA136) ---------------- */}
        <section className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 md:p-12 border-2 border-[#E7DECB] shadow-xl space-y-10">
          
          {/* Header with prominent Made by 25BA136 designation */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8DEC8]">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-[#8B1E29] text-[#FBBF24] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-xs">
                  <FileText className="w-3.5 h-3.5" />
                  Official Product Flavour Pamphlets
                </span>
                <span className="inline-flex items-center gap-1 bg-[#FBBF24] text-slate-950 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-xs border border-amber-300">
                  Made by 25BA136
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-display tracking-tight text-balance">
                Official Flavour Launch Pamphlets
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-body">
                Official flavour spotlight brochures, ingredient highlights, and per-30g nutrition facts created for CHIPAS Our Products catalogue. Authored and designed by roll number <strong className="text-[#8B1E29] font-black underline decoration-[#FBBF24] decoration-2">25BA136</strong>. Click any pamphlet below to inspect the design in high resolution.
              </p>
            </div>

            {/* Author Credit Badge */}
            <div className="bg-gradient-to-br from-[#8B1E29] to-[#5C0D15] text-white p-5 rounded-2xl border-2 border-[#FBBF24] shrink-0 text-center md:text-right shadow-lg flex flex-col justify-center">
              <div className="text-[11px] uppercase tracking-wider text-[#FBBF24] font-black">
                Products Page Curator & Designer
              </div>
              <div className="text-3xl font-black font-display text-white mt-0.5 tracking-tight">
                Made by 25BA136
              </div>
              <div className="text-xs text-amber-100/80 font-semibold mt-1">
                Roll No. 25BA136 · CHIPAS Flavour Edition
              </div>
            </div>
          </div>

          {/* 2 Posters Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {PRODUCTS_PAMPHLETS.map((pamphlet, index) => (
              <div
                key={pamphlet.id}
                className="bg-white rounded-2xl border-2 border-[#EADFCB] hover:border-[#8B1E29] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Card Top Pill Bar */}
                <div className="bg-[#FAF7F0] px-4 py-2.5 border-b border-[#EADFCB] flex items-center justify-between">
                  <span className="text-xs font-black text-[#8B1E29] uppercase tracking-wider font-display">
                    {pamphlet.badge}
                  </span>
                  <span className="text-[11px] font-black bg-[#FBBF24] text-slate-950 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Made by {pamphlet.madeBy}
                  </span>
                </div>

                {/* Poster Visual Image Showcase with Hover Zoom */}
                <div
                  onClick={() => setSelectedPamphletIndex(index)}
                  className="relative aspect-3/4 bg-slate-900 overflow-hidden cursor-pointer group/img"
                  title={`Click to view ${pamphlet.title} in full resolution (Made by ${pamphlet.madeBy})`}
                >
                  <img
                    src={pamphlet.image}
                    alt={`${pamphlet.title} - Made by ${pamphlet.madeBy}`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                    loading="lazy"
                  />

                  {/* Gradient & Hover prompt */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#FBBF24] flex items-center gap-1.5">
                        <Eye className="w-4 h-4" />
                        Click to view full pamphlet
                      </span>
                      <span className="w-8 h-8 rounded-full bg-[#FBBF24] text-slate-950 flex items-center justify-center font-bold">
                        <Maximize2 className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Author Watermark Tag */}
                  <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-xs text-[#FBBF24] text-[10px] font-black uppercase px-2 py-0.5 rounded-md border border-white/20">
                    Made by {pamphlet.madeBy}
                  </div>
                </div>

                {/* Card Text & Information */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-slate-900 font-display leading-snug group-hover:text-[#8B1E29] transition-colors">
                      {pamphlet.title}
                    </h3>
                    <div className="text-xs font-bold text-[#8B1E29]">
                      "{pamphlet.headline}"
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-body">
                      {pamphlet.subtitle}
                    </p>

                    {/* Nutrition strip */}
                    <div className="py-2 px-3 bg-amber-50 rounded-xl border border-amber-200 text-slate-800 text-[11px] font-bold">
                      {pamphlet.nutritionTag}
                    </div>

                    {/* Key Highlights */}
                    <ul className="pt-2 space-y-1.5 border-t border-slate-100 text-[11px] text-slate-600">
                      {pamphlet.keyPoints.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8B1E29] shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action & Author Badge Button */}
                  <div className="pt-3 border-t border-[#EADFCB] flex items-center justify-between gap-2">
                    <span className="text-[11px] font-black text-slate-500 tracking-wider uppercase">
                      Author: <span className="text-[#8B1E29] font-bold">25BA136</span>
                    </span>

                    <button
                      onClick={() => setSelectedPamphletIndex(index)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#FAF7F0] hover:bg-[#FBBF24] text-slate-900 hover:text-slate-950 text-xs font-black uppercase tracking-wider transition-all border border-[#E0D4BD] hover:border-amber-400 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Inspect Pamphlet</span>
                      <Maximize2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Bottom Attribution Bar */}
          <div className="bg-[#FAF7F0] p-4 rounded-2xl border border-[#EADFCB] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B1E29] animate-pulse" />
              <span className="text-xs font-bold text-slate-800">
                Official Flavour Collateral · Created by <strong className="text-[#8B1E29]">Roll No. 25BA136</strong>
              </span>
            </div>
            <div className="text-xs font-bold text-slate-600">
              High-resolution digital flavour posters embedded directly on Our Products
            </div>
          </div>

        </section>

        {/* ---------------- SECTION: OFFICIAL ADVERTISEMENT VIDEO ---------------- */}
        <BrandCommercialVideo
          badgeText="Official Commercial · Product & Flavour Showcase"
          titlePrefix="Taste That Never Quits. "
          titleHighlight="Crunch Louder."
          description="Watch our official commercial shot on campus at SRCC — featuring the Classic Salted benchmark pack, crisp golden potato slices, and our patented clean-finger grabber."
          buttonText="Shop Classic Salted Featured In Video"
          onButtonClick={() => {
            const classic = PRODUCTS.find((p) => p.id === 'classic-salted') || PRODUCTS[5];
            onSelectProduct(classic);
          }}
        />

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

      {/* ---------------- LIGHTBOX MODAL FOR PAMPHLETS (MADE BY 25BA136) ---------------- */}
      {selectedPamphletIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
          onClick={() => setSelectedPamphletIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#18181B] rounded-2xl sm:rounded-3xl border-2 border-[#FBBF24] overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#5C0D15] px-4 sm:px-6 py-3.5 border-b border-[#FBBF24]/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="bg-[#FBBF24] text-slate-950 font-black text-xs uppercase px-2.5 py-0.5 rounded-full shrink-0">
                  {PRODUCTS_PAMPHLETS[selectedPamphletIndex].badge}
                </span>
                <span className="text-white font-bold text-sm sm:text-base truncate font-display">
                  {PRODUCTS_PAMPHLETS[selectedPamphletIndex].title}
                </span>
                <span className="hidden sm:inline-block bg-black/40 text-[#FBBF24] border border-[#FBBF24]/40 font-black text-xs px-2.5 py-0.5 rounded-md shrink-0">
                  Made by 25BA136
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={PRODUCTS_PAMPHLETS[selectedPamphletIndex].image}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden md:flex items-center gap-1 text-xs text-[#FBBF24] hover:text-white px-2.5 py-1 rounded bg-black/30 border border-white/10"
                  title="Open original resolution"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Original</span>
                </a>

                <button
                  onClick={() => setSelectedPamphletIndex(null)}
                  className="p-1.5 rounded-full bg-black/50 hover:bg-[#8B1E29] text-white hover:text-[#FBBF24] transition-colors cursor-pointer"
                  aria-label="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Body with navigation arrows */}
            <div className="relative flex-1 overflow-auto bg-black/95 flex items-center justify-center p-2 sm:p-4 min-h-[350px]">
              <img
                src={PRODUCTS_PAMPHLETS[selectedPamphletIndex].image}
                alt={`${PRODUCTS_PAMPHLETS[selectedPamphletIndex].title} - Made by 25BA136`}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl mx-auto"
              />

              {/* Prev / Next Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPamphletIndex((prev) =>
                    prev !== null ? (prev - 1 + PRODUCTS_PAMPHLETS.length) % PRODUCTS_PAMPHLETS.length : 0
                  );
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-[#FBBF24] text-white hover:text-slate-950 transition-all border border-white/20 shadow-lg cursor-pointer"
                title="Previous Pamphlet"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPamphletIndex((prev) =>
                    prev !== null ? (prev + 1) % PRODUCTS_PAMPHLETS.length : 0
                  );
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-[#FBBF24] text-white hover:text-slate-950 transition-all border border-white/20 shadow-lg cursor-pointer"
                title="Next Pamphlet"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#1C1917] px-4 sm:px-6 py-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-black text-[#FBBF24] uppercase tracking-wider">
                  Official Collateral · Made by 25BA136
                </span>
                <span className="text-slate-400 hidden sm:inline">
                  {PRODUCTS_PAMPHLETS[selectedPamphletIndex].nutritionTag}
                </span>
              </div>

              {/* Quick switcher dots */}
              <div className="flex items-center gap-1.5">
                {PRODUCTS_PAMPHLETS.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPamphletIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      selectedPamphletIndex === idx
                        ? 'w-6 bg-[#FBBF24]'
                        : 'w-2 bg-slate-600 hover:bg-slate-400'
                    }`}
                    title={p.badge}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
