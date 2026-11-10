import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS, BRAND_HIGHLIGHTS, BRAND_STATS } from '../data/products';
import { ChipasBagIllustration } from '../components/ChipasBagIllustration';
import { ProductCard } from '../components/ProductCard';
import { GrabberDemo } from '../components/GrabberDemo';
import { ArrowRight, ShoppingBag, CheckCircle2, Flame, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HomePageProps {
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onNavigate: (page: 'home' | 'products' | 'about' | 'where-to-buy') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectProduct,
  onQuickAdd,
  onNavigate
}) => {
  const [activeHeroFlavour, setActiveHeroFlavour] = useState<Product>(
    PRODUCTS.find((p) => p.id === 'classic-salted') || PRODUCTS[5]
  );

  const handleConfettiCTA = () => {
    try {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#FBBF24', '#DC2626', '#1E4D2B']
      });
    } catch (e) {
      // ignore
    }
    onNavigate('products');
  };

  return (
    <div className="space-y-20 md:space-y-28">
      
      {/* ---------------- SECTION 2: ENERGETIC HERO SECTION ---------------- */}
      {/* Inspired by the Lay's crimson curve and Haldiram's packet focus */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#8B1E29] via-[#A51C28] to-[#5C0D15] text-white pt-10 pb-20 md:pt-14 md:pb-28 rounded-b-[40px] md:rounded-b-[60px] shadow-2xl">
        
        {/* Subtle radial warmth behind packet */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#FBBF24]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Hero: Bold Energetic Copy */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 bg-black/25 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/10 text-xs font-black tracking-wider text-[#FBBF24] uppercase">
                <span>The Contemporary Crunch</span>
                <span aria-hidden="true">·</span>
                <span>Zero Palm Oil</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] font-display text-white text-balance">
                Crunch that <br />
                <span className="text-[#FBBF24] inline-block drop-shadow-md">
                  never quits.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-amber-100/90 max-w-xl leading-relaxed font-body">
                Big flavours. Bold crunch. A little something for every craving. Crisp golden potato slices with honest grams up front, zero palm oil, and our patented clean-finger grabber.
              </p>

              {/* Action Buttons: Signature Yellow CTA */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onSelectProduct(activeHeroFlavour)}
                  className="px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-wider text-slate-950 bg-[#FBBF24] hover:bg-[#F59E0B] shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center gap-2 active:scale-95 cursor-pointer border border-amber-300"
                >
                  <ShoppingBag className="w-4 h-4 text-slate-950" />
                  <span>Shop Now</span>
                </button>

                <button
                  onClick={() => onNavigate('products')}
                  className="px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-wider text-white bg-white/15 hover:bg-white/25 border border-white/20 transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-xs"
                >
                  Explore Flavours
                </button>
              </div>

              {/* Quick Feature Badges */}
              <div className="pt-6 flex flex-wrap items-center gap-6 border-t border-white/15 text-xs text-amber-100 font-bold">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FBBF24] text-slate-950 flex items-center justify-center font-black text-[11px]">
                    ✓
                  </span>
                  <span>NO PALM OIL Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-white text-[#8B1E29] flex items-center justify-center font-black text-[11px]">
                    ✦
                  </span>
                  <span>Grams Up Front</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FBBF24] text-slate-950 flex items-center justify-center font-black text-[11px]">
                    ✌
                  </span>
                  <span>Clean Fingers Grabber</span>
                </div>
              </div>

            </div>

            {/* Right Hero: Real Packet Taking Center Stage */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              
              <div className="relative">
                {/* Floating NO PALM OIL Stamp */}
                <div className="absolute -top-3 -left-3 z-30 bg-[#FBBF24] text-slate-950 font-black text-xs uppercase px-3 py-1.5 rounded-full shadow-xl border-2 border-slate-950 transform -rotate-12">
                  NO PALM OIL
                </div>

                {/* The Packet Visual */}
                <div
                  onClick={() => onSelectProduct(activeHeroFlavour)}
                  className="cursor-pointer transform hover:scale-105 transition-all duration-300 drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)]"
                >
                  <ChipasBagIllustration product={activeHeroFlavour} size="xl" />
                </div>
              </div>

              {/* Pack Switcher Row (Haldiram's Inspiration: Click to switch displayed pack!) */}
              <div className="mt-6 flex items-center gap-2 bg-black/40 backdrop-blur-sm p-1.5 rounded-2xl border border-white/15 max-w-full overflow-x-auto">
                {PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => setActiveHeroFlavour(prod)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      activeHeroFlavour.id === prod.id
                        ? 'bg-[#FBBF24] text-slate-950 shadow-md scale-105'
                        : 'text-amber-100 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {prod.name.split(' ')[0]}
                  </button>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ---------------- SECTION 3: DISCOVER OUR FLAVOURS ---------------- */}
      {/* Catalogue-lead where actual colourful packets do the talking */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#8B1E29] block mb-1">
              Curated Collections
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight text-balance">
              A flavour for every mood.
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              Six distinctive, colourful recipes crafted with stone-ground seasonings, pure vegetable oil, and the cleanest crunch in the game.
            </p>
          </div>

          <button
            onClick={() => onNavigate('products')}
            className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#8B1E29] hover:text-[#A51C28] group shrink-0 cursor-pointer"
          >
            <span>View Full Catalogue</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      </section>

      {/* ---------------- SECTION 4: BRAND EXPERIENCE (Burgundy Brand Moment) ---------------- */}
      <section className="bg-[#5C0D15] text-[#FFFDF9] py-20 px-4 sm:px-6 lg:px-8 border-y-4 border-[#FBBF24]">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#FBBF24]">
              The CHIPAS Revolution
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white text-balance">
              Not just chips. <span className="text-[#FBBF24] italic">It's a whole mood.</span>
            </h2>
            <p className="text-sm sm:text-base text-amber-100/80 leading-relaxed font-body">
              Bringing exciting regional Indian tastes, everyday snacking, and packaging innovation together. Every pack features our patented pull-out corner grabber so you can snack while you study, code, or game.
            </p>
          </div>

          {/* Interactive Grabber Innovation Lab */}
          <div className="max-w-4xl mx-auto text-slate-900">
            <GrabberDemo />
          </div>

          {/* Real Consumer Survey Proof (from Pamphlet) */}
          <div className="pt-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center border-t border-white/10">
            {BRAND_STATS.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-[#FBBF24] font-display tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs text-amber-100/70 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ---------------- SECTION 5: WHY CHIPAS? ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[#8B1E29] block mb-1">
            Built Different
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight text-balance">
            Why CHIPAS?
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            No empty claims. Just honest ingredients, audible crunch, and clean snacking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRAND_HIGHLIGHTS.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-[#EBE3D3] shadow-sm hover:shadow-md transition-shadow space-y-3"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#8B1E29] text-[#FBBF24] flex items-center justify-center font-black text-base font-display">
                0{idx + 1}
              </div>
              <h3 className="text-lg font-black text-slate-900 font-display">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- SECTION 6: FEATURED PRODUCT (Classic Salted) ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] rounded-3xl p-8 md:p-12 border border-[#E8DEC8] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Packet visual */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div
                onClick={() => onSelectProduct(PRODUCTS[5])}
                className="cursor-pointer transform hover:scale-105 transition-transform drop-shadow-xl"
              >
                <ChipasBagIllustration product={PRODUCTS[5]} size="lg" />
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-widest text-[#8B1E29] bg-white px-3 py-1 rounded-full border border-slate-200">
                  Featured Product
                </span>
                <span className="text-xs font-black uppercase tracking-widest text-slate-950 bg-[#FBBF24] px-3 py-1 rounded-full">
                  100% Zero Palm Oil
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight text-balance">
                Simple. Salty. <br />
                <span className="text-[#8B1E29]">Seriously Crunchy.</span>
              </h2>

              <p className="text-sm text-slate-700 leading-relaxed font-body">
                The benchmark of every chips brand, perfected. Whisper-thin golden potatoes kettle-cooked in heart-healthy high-oleic sunflower oil and lightly sprinkled with pure rock salt. No palm oil. Just 3 honest ingredients.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Oil Used</span>
                  <span className="text-xs font-black text-slate-900">High-Oleic Sunflower</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Palm Oil</span>
                  <span className="text-xs font-black text-red-600">0% (Never)</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Label</span>
                  <span className="text-xs font-black text-slate-900">Grams Up Front</span>
                </div>
              </div>

              {/* Signature Yellow Primary CTA */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onSelectProduct(PRODUCTS[5])}
                  className="px-7 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider text-slate-950 bg-[#FBBF24] hover:bg-[#F59E0B] shadow-md hover:shadow-lg transition-all cursor-pointer border border-amber-300"
                >
                  Shop Classic Salted Now
                </button>
                <button
                  onClick={() => onQuickAdd(PRODUCTS[5])}
                  className="px-6 py-3.5 rounded-xl font-bold text-xs text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 transition-colors cursor-pointer"
                >
                  Quick Add to Bag · ₹20
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------- SECTION 7: FINAL CTA ---------------- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 text-center">
        <div className="bg-gradient-to-br from-[#8B1E29] to-[#5C0D15] text-white rounded-3xl p-10 md:p-14 shadow-2xl space-y-6 relative overflow-hidden">
          <span className="text-xs font-black uppercase tracking-widest text-[#FBBF24]">
            Ready for a Real Crunch?
          </span>

          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white text-balance">
            Your next favourite crunch is waiting.
          </h2>

          <p className="text-sm sm:text-base text-amber-100/90 max-w-lg mx-auto leading-relaxed">
            Experience all six curated flavours with transparent ingredients and our clean grabber.
          </p>

          <div className="pt-2">
            <button
              onClick={handleConfettiCTA}
              className="px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-wider text-slate-950 bg-[#FBBF24] hover:bg-[#F59E0B] shadow-xl hover:shadow-2xl transition-all active:scale-95 cursor-pointer inline-flex items-center gap-2 border border-amber-300"
            >
              <span>Explore All Flavours</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
