import React from 'react';
import { PRODUCTS } from '../data/products';
import { ChipasBagIllustration } from '../components/ChipasBagIllustration';
import { GrabberDemo } from '../components/GrabberDemo';
import { Product } from '../types';
import { ArrowRight, MapPin, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  onSelectProduct: (product: Product) => void;
  onNavigateToProducts: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onSelectProduct,
  onNavigateToProducts
}) => {
  const keralaProduct = PRODUCTS.find((p) => p.id === 'kerala-pepper-curry-leaf')!;
  const bengalProduct = PRODUCTS.find((p) => p.id === 'bengal-kasundi-mustard')!;
  const gujaratProduct = PRODUCTS.find((p) => p.id === 'gujarat-khatta-meetha')!;

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 space-y-24">
      
      {/* ---------------- CHAPTER 1: HERO STORYTELLING ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#8B1E29]">
              <BookOpen className="w-4 h-4 text-[#8B1E29]" />
              <span>Chapter 01 · Our Story</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 font-display tracking-tight text-balance leading-[1.1]">
              Life's better with <br />
              <span className="text-[#8B1E29]">a little crunch.</span>
            </h1>

            <div className="space-y-4 text-base text-slate-700 leading-relaxed font-body">
              <p>
                CHIPAS was born from a frustration shared by millions of everyday snackers. We reach for chips to de-stress, hang out with friends, or fuel late-night work sessions. Yet for decades, commercial chip brands have offered the same tired trade-off: cheap saturated palm oil, masked artificial flavors, and greasy fingers all over our phone screens and keyboards.
              </p>
              <p>
                As students at Shri Ram College of Commerce (SRCC), we set out to build something better: a potato chip crafted with genuine culinary pride, honest ingredients, zero palm oil, and a patented packaging innovation that keeps your hands completely clean.
              </p>
            </div>

            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Origin</span>
                <strong className="text-slate-900 text-sm">North Campus, Delhi</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Cooking Oil</span>
                <strong className="text-emerald-700 text-sm">0% Palm Oil</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Innovation</span>
                <strong className="text-[#8B1E29] text-sm">The Clean Grabber</strong>
              </div>
            </div>
          </div>

          {/* Real Pack Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl flex flex-col items-center text-center">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#8B1E29] mb-4">
                The OG Benchmark Pack
              </span>
              <div className="my-2 transform hover:scale-105 transition-transform duration-300">
                <ChipasBagIllustration product={PRODUCTS[5]} size="lg" />
              </div>
              <p className="text-xs text-slate-600 mt-4 max-w-xs font-medium">
                "Same crunch. Better grab. Love the crunch, read the label."
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------- CHAPTER 2: OUR PHILOSOPHY ---------------- */}
      <section className="bg-[#5C0D15] text-white py-20 border-y-4 border-[#FBBF24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#FBBF24]">
              Chapter 02 · Core Convictions
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white text-balance">
              Our Philosophy
            </h2>
            <p className="text-sm text-amber-100/80">
              Four non-negotiable standards that define every batch of CHIPAS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-black/25 backdrop-blur-xs p-6 rounded-3xl border border-white/10 space-y-3">
              <span className="text-xs font-black text-[#FBBF24] uppercase tracking-wider block">01 / TASTE</span>
              <h3 className="text-lg font-bold text-white font-display">
                Flavour Exploration
              </h3>
              <p className="text-xs text-amber-100/70 leading-relaxed">
                We believe snacking should be exciting. Rather than duplicating generic red chili powder, we explore nuanced regional spice profiles with depth.
              </p>
            </div>

            <div className="bg-black/25 backdrop-blur-xs p-6 rounded-3xl border border-white/10 space-y-3">
              <span className="text-xs font-black text-[#FBBF24] uppercase tracking-wider block">02 / HERITAGE</span>
              <h3 className="text-lg font-bold text-white font-display">
                Regional Indian Roots
              </h3>
              <p className="text-xs text-amber-100/70 leading-relaxed">
                India has one of the world's most vibrant culinary tapestries. Bringing regional tastes like Kasundi and Malabar Pepper to potato chips honors that heritage.
              </p>
            </div>

            <div className="bg-black/25 backdrop-blur-xs p-6 rounded-3xl border border-white/10 space-y-3">
              <span className="text-xs font-black text-[#FBBF24] uppercase tracking-wider block">03 / MOMENTS</span>
              <h3 className="text-lg font-bold text-white font-display">
                Everyday Connection
              </h3>
              <p className="text-xs text-amber-100/70 leading-relaxed">
                From study breaks to road trips, chips are the social snack of choice. We design every crunch to make ordinary snack moments feel special.
              </p>
            </div>

            <div className="bg-black/25 backdrop-blur-xs p-6 rounded-3xl border border-white/10 space-y-3">
              <span className="text-xs font-black text-[#FBBF24] uppercase tracking-wider block">04 / INTEGRITY</span>
              <h3 className="text-lg font-bold text-white font-display">
                Honest Labeling
              </h3>
              <p className="text-xs text-amber-100/70 leading-relaxed">
                Zero palm oil. Grams visible on the front of the pack. Simple ingredients in plain words without deceptive fine print.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------- CHAPTER 3: OUR FLAVOURS, OUR INDIA ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-[#8B1E29]">
            Chapter 03 · Regional Rasa
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight text-balance">
            Our Flavours, Our India.
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Three distinct culinary corners of India, celebrated through the actual packaging design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Kerala */}
          <div
            onClick={() => onSelectProduct(keralaProduct)}
            className="group bg-[#153B22] text-[#F3FDF5] rounded-3xl p-7 flex flex-col justify-between cursor-pointer border border-emerald-900/60 shadow-xl hover:-translate-y-1 transition-all"
          >
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-emerald-300 mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Malabar Coast, Kerala</span>
              </div>
              <h3 className="text-2xl font-black font-display tracking-tight">
                Kerala Pepper & Curry Leaf
              </h3>
              <p className="text-xs text-emerald-100/80 mt-2 leading-relaxed">
                The spice mountains of Wayanad produce India's finest Tellicherry peppercorns. We roast them with fragrant sun-dried curry leaves for a lingering, aromatic coastal warmth.
              </p>
            </div>

            <div className="my-6 flex justify-center transform group-hover:scale-105 transition-transform">
              <ChipasBagIllustration product={keralaProduct} size="md" />
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-emerald-200 font-medium">Heat: 3/5 · Tellicherry</span>
              <span className="font-black text-[#FBBF24] group-hover:underline">View Pack →</span>
            </div>
          </div>

          {/* Bengal */}
          <div
            onClick={() => onSelectProduct(bengalProduct)}
            className="group bg-[#8E4407] text-[#FFFBEB] rounded-3xl p-7 flex flex-col justify-between cursor-pointer border border-amber-900/60 shadow-xl hover:-translate-y-1 transition-all"
          >
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-amber-200 mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Kolkata, West Bengal</span>
              </div>
              <h3 className="text-2xl font-black font-display tracking-tight">
                Bengal Kasundi Mustard
              </h3>
              <p className="text-xs text-amber-100/80 mt-2 leading-relaxed">
                Bengal's regal fermented mustard relish. Ground black & yellow mustard seeds balanced with sour raw mango powder for an unmistakable pungent kick.
              </p>
            </div>

            <div className="my-6 flex justify-center transform group-hover:scale-105 transition-transform">
              <ChipasBagIllustration product={bengalProduct} size="md" />
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-amber-200 font-medium">Heat: 4/5 · Pungent Zing</span>
              <span className="font-black text-[#FBBF24] group-hover:underline">View Pack →</span>
            </div>
          </div>

          {/* Gujarat */}
          <div
            onClick={() => onSelectProduct(gujaratProduct)}
            className="group bg-[#A5340B] text-[#FFF7ED] rounded-3xl p-7 flex flex-col justify-between cursor-pointer border border-orange-950/60 shadow-xl hover:-translate-y-1 transition-all"
          >
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-orange-200 mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Ahmedabad, Gujarat</span>
              </div>
              <h3 className="text-2xl font-black font-display tracking-tight">
                Gujarat Khatta Meetha
              </h3>
              <p className="text-xs text-orange-100/80 mt-2 leading-relaxed">
                Inspired by the iconic street farsan of Gujarat. Caramelized organic jaggery powder meets tart aamchur, roasted jeera, and crisp potato crunch.
              </p>
            </div>

            <div className="my-6 flex justify-center transform group-hover:scale-105 transition-transform">
              <ChipasBagIllustration product={gujaratProduct} size="md" />
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-orange-200 font-medium">Heat: 2/5 · Sweet & Sour</span>
              <span className="font-black text-[#FBBF24] group-hover:underline">View Pack →</span>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------- CHAPTER 4: THE PACKAGING INNOVATION ---------------- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#8B1E29]">
            Chapter 04 · The Clever Corner™
          </span>
          <h2 className="text-3xl font-black text-slate-900 font-display">
            Clean Fingers. Zero Grease.
          </h2>
        </div>
        <GrabberDemo />
      </section>

      {/* ---------------- CHAPTER 5: OUR PROMISE & SIGNATURE YELLOW CTA ---------------- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 text-center">
        <div className="bg-white border-2 border-[#8B1E29] rounded-3xl p-10 md:p-14 shadow-lg space-y-6">
          <span className="text-xs font-black uppercase tracking-widest text-[#8B1E29]">
            Chapter 05 · Our Promise
          </span>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight text-balance">
            "Good times. Great flavours. <br />
            <span className="text-[#8B1E29]">Endless crunch."</span>
          </h2>

          <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            We promise never to compromise on authentic taste, honest labeling, or clean-finger snacking fun.
          </p>

          <div className="pt-2">
            {/* Signature Yellow CTA */}
            <button
              onClick={onNavigateToProducts}
              className="px-8 py-4 rounded-xl font-black text-xs uppercase tracking-wider text-slate-950 bg-[#FBBF24] hover:bg-[#F59E0B] shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer inline-flex items-center gap-2 border border-amber-300"
            >
              <span>Explore Our Products</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
