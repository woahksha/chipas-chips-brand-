import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ChipasBagIllustration } from './ChipasBagIllustration';
import { Sparkles, ArrowRight, ShoppingBag, RotateCcw, Check } from 'lucide-react';

interface FlavourDiscoveryQuizProps {
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const FlavourDiscoveryQuiz: React.FC<FlavourDiscoveryQuizProps> = ({
  onSelectProduct,
  onQuickAdd
}) => {
  const [spicePreference, setSpicePreference] = useState<string>('tangy');
  const [snackVibe, setSnackVibe] = useState<string>('study');

  // Match recommendation logic
  const getRecommendation = (): { product: Product; matchReason: string } => {
    if (spicePreference === 'mild') {
      return {
        product: PRODUCTS.find((p) => p.id === 'classic-salted') || PRODUCTS[5],
        matchReason: 'Pure crisp potato perfection with sea salt. Zero heat, maximum crunch for uninterrupted focus!'
      };
    }
    if (spicePreference === 'hot') {
      return {
        product: PRODUCTS.find((p) => p.id === 'bengal-kasundi') || PRODUCTS[4],
        matchReason: 'Bold, pungent mustard seed kick that delivers an authentic fiery rush for true spice seekers!'
      };
    }
    if (snackVibe === 'sweet-tangy') {
      return {
        product: PRODUCTS.find((p) => p.id === 'gujarat-khatta-meetha') || PRODUCTS[0],
        matchReason: 'Classic Gujarati sweet jaggery meets tangy amchur — the ultimate comfort companion for movie nights!'
      };
    }
    // Default / Tangy
    return {
      product: PRODUCTS.find((p) => p.id === 'tangy-tomato') || PRODUCTS[2],
      matchReason: 'Sun-ripened tomatoes dusted with chatpata masala and extra protein to keep your hunger at bay!'
    };
  };

  const { product, matchReason } = getRecommendation();

  return (
    <div className="bg-[#FAF7F0] rounded-3xl p-6 sm:p-10 border-2 border-[#E7DECB] shadow-md space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E7DECB] pb-6">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#8B1E29] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#8B1E29]" />
            <span>Interactive Flavour Matcher</span>
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight mt-1">
            Find Your Signature Crunch
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-lg">
            Answer two quick questions to discover which Chippas recipe matches your palate and craving right now.
          </p>
        </div>

        <button
          onClick={() => {
            setSpicePreference('tangy');
            setSnackVibe('study');
          }}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#8B1E29] cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Quiz</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Quiz Selectors */}
        <div className="lg:col-span-7 space-y-6">
          {/* Question 1: Spice level */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
              1. What's your spice tolerance today?
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'mild', label: 'Mild & Salty', hint: 'Pure Potato Crunch' },
                { id: 'tangy', label: 'Zesty & Tangy', hint: 'Chatpata Balance' },
                { id: 'hot', label: 'Spicy Fire', hint: 'Authentic Heat' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSpicePreference(opt.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    spicePreference === opt.id
                      ? 'bg-[#8B1E29] text-white border-[#8B1E29] shadow-sm'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-amber-400'
                  }`}
                >
                  <div className="text-xs font-black">{opt.label}</div>
                  <div className={`text-[10px] mt-0.5 ${spicePreference === opt.id ? 'text-amber-200' : 'text-slate-500'}`}>
                    {opt.hint}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Snacking occasion */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
              2. What's the snacking occasion?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'study', label: 'Exam Grind', hint: 'Clean grabber' },
                { id: 'sweet-tangy', label: 'Movie Binge', hint: 'Comfort flavour' },
                { id: 'party', label: 'Squad Hangout', hint: 'Crowd pleaser' },
                { id: 'workout', label: 'Gym & Protein', hint: 'Nutritious bite' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSnackVibe(opt.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    snackVibe === opt.id
                      ? 'bg-[#FBBF24] text-slate-950 border-[#F59E0B] font-black shadow-sm'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-amber-400'
                  }`}
                >
                  <div className="text-xs font-bold">{opt.label}</div>
                  <div className={`text-[10px] mt-0.5 ${snackVibe === opt.id ? 'text-slate-900' : 'text-slate-500'}`}>
                    {opt.hint}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Result Card */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border-2 border-[#8B1E29] shadow-lg flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-[#8B1E29] text-[#FBBF24] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <Check className="w-3.5 h-3.5" />
            <span>98% Flavour Match For You</span>
          </div>

          <div
            onClick={() => onSelectProduct(product)}
            className="cursor-pointer transform hover:scale-105 transition-transform drop-shadow-md my-2"
          >
            <ChipasBagIllustration product={product} size="md" />
          </div>

          <div>
            <h4 className="text-lg font-black text-slate-900 font-display">
              {product.name}
            </h4>
            <p className="text-xs text-slate-600 mt-1 italic">
              "{matchReason}"
            </p>
          </div>

          <div className="flex items-center gap-2 w-full pt-2">
            <button
              onClick={() => onSelectProduct(product)}
              className="flex-1 py-2.5 rounded-xl bg-[#8B1E29] hover:bg-[#A51C28] text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              Explore Recipe
            </button>
            <button
              onClick={() => onQuickAdd(product)}
              className="px-4 py-2.5 rounded-xl bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>₹{product.sizes[0]?.price ?? 20}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
