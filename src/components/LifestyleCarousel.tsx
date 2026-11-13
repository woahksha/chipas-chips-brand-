import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Heart, Users, Gamepad2, BookOpen, Film, Compass, Dumbbell } from 'lucide-react';

interface LifestyleMoment {
  id: string;
  tag: string;
  title: string;
  setting: string;
  description: string;
  packPaired: string;
  accentColor: string;
  icon: React.ReactNode;
  quote: string;
  author: string;
  imagePlaceholderGradient: string;
}

const LIFESTYLE_MOMENTS: LifestyleMoment[] = [
  {
    id: 'moment-study',
    tag: 'Campus Life · 4:00 PM',
    title: 'The Exam Crunch & Library Sprint',
    setting: 'SRCC Central Library & Study Desks',
    description: 'Cracking past-year papers with highlighter in one hand and clean chips in the other. With our patented grabber, textbook pages and class notes stay 100% grease-free.',
    packPaired: 'Classic Salted (Solo Crunch 60g)',
    accentColor: '#8B1E29',
    icon: <BookOpen className="w-5 h-5 text-[#FBBF24]" />,
    quote: '"No greasy fingerprints on my iPad screen while highlighting case studies. Lifesaver."',
    author: 'Aarav M. · 2nd Year B.Com',
    imagePlaceholderGradient: 'from-[#6E141E] via-[#8B1E29] to-[#450A10]'
  },
  {
    id: 'moment-gaming',
    tag: 'Hostel Grind · 1:30 AM',
    title: 'Late-Night Multiplayer Battle',
    setting: 'Dorm Room LAN & Gaming Setup',
    description: 'Intense clutch rounds require uninterrupted grip. The pull-out corner grabber lets you snack between respawns without slick thumbsticks or dirty controllers.',
    packPaired: 'Tangy Tomato Masala (Protein+ 60g)',
    accentColor: '#1E3A8A',
    icon: <Gamepad2 className="w-5 h-5 text-[#60A5FA]" />,
    quote: '"Finally a snack where my controller sticks don’t end up slippery in the final circle."',
    author: 'Kunal S. · Hostel Room 214',
    imagePlaceholderGradient: 'from-[#172554] via-[#1E3A8A] to-[#0F172A]'
  },
  {
    id: 'moment-movie',
    tag: 'Squad Hangout · 9:00 PM',
    title: 'Weekend Projector & Movie Night',
    setting: 'Common Room Lounge',
    description: 'Pass the 150g Party Pack around without fighting over greasy napkins. Balanced regional spices that everyone can agree on.',
    packPaired: 'Bengal Kasundi Mustard (Party Share 150g)',
    accentColor: '#B45309',
    icon: <Film className="w-5 h-5 text-[#FDE047]" />,
    quote: '"That Kasundi kick hits different with a thriller film. The bag disappeared in 5 minutes."',
    author: 'Rhea & Squad · Delhi University',
    imagePlaceholderGradient: 'from-[#78350F] via-[#B45309] to-[#451A03]'
  },
  {
    id: 'moment-roadtrip',
    tag: 'Weekend Escape · 6:00 AM',
    title: 'The Highway Sunset & Hill Drive',
    setting: 'Delhi to Himachal Highway Run',
    description: 'Crisp morning air, scenic mountain turns, and zero greasy steering wheel. High-oleic sunflower oil means no heavy feeling on long drives.',
    packPaired: 'Kerala Pepper & Curry Leaf (60g)',
    accentColor: '#1A4329',
    icon: <Compass className="w-5 h-5 text-[#4ADE80]" />,
    quote: '"Curry leaf and black pepper warmth with hot dhaba chai is the ultimate road-trip combo."',
    author: 'Vikram T. · Weekend Wanderer',
    imagePlaceholderGradient: 'from-[#143520] via-[#1A4329] to-[#052E16]'
  },
  {
    id: 'moment-canteen',
    tag: 'After Lecture · 1:00 PM',
    title: 'Canteen Steps & Society Gossip',
    setting: 'SRCC Front Lawns & Canteen Tables',
    description: 'Trading flavours across the circle — sweet jaggery tang against sharp kasundi punch. The staple of spontaneous campus debriefs.',
    packPaired: 'Gujarat Khatta Meetha (60g)',
    accentColor: '#C2410C',
    icon: <Users className="w-5 h-5 text-[#FDBA74]" />,
    quote: '"We literally buy three different flavours and do tasting battles between lectures."',
    author: 'Samiksha P. · College Ambassador',
    imagePlaceholderGradient: 'from-[#7C2D12] via-[#C2410C] to-[#431407]'
  },
  {
    id: 'moment-gym',
    tag: 'Evening Refuel · 6:30 PM',
    title: 'Post-Workout Court Snacking',
    setting: 'Sports Complex & Badminton Courts',
    description: 'Light, crunchy satiety with 8g of plant-forward protein per pack. Crafted with cold-pressed oils and genuine nutrition upfront.',
    packPaired: 'Olive Oil & Sea Salt (60g)',
    accentColor: '#4D6B2B',
    icon: <Dumbbell className="w-5 h-5 text-[#A3E635]" />,
    quote: '"Clean ingredients, real olive oil, and no bloated feeling before evening team practice."',
    author: 'Aditya V. · University Team',
    imagePlaceholderGradient: 'from-[#2E401A] via-[#4D6B2B] to-[#1A260E]'
  }
];

export const LifestyleCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % LIFESTYLE_MOMENTS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + LIFESTYLE_MOMENTS.length) % LIFESTYLE_MOMENTS.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % LIFESTYLE_MOMENTS.length);
  };

  const activeMoment = LIFESTYLE_MOMENTS[currentIndex];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#8B1E29] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lifestyle & Moments</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight mt-1">
            Where Chippas belongs.
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            From intense library grinds to midnight gaming battles, here is how our community crunches every single day.
          </p>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAutoPlaying((prev) => !prev)}
            className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
          >
            {isAutoPlaying ? 'Pause Autoplay' : 'Resume Autoplay'}
          </button>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-white hover:bg-[#FBBF24] border border-slate-200 text-slate-800 transition-all hover:scale-105 cursor-pointer shadow-xs"
              aria-label="Previous moment"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-white hover:bg-[#FBBF24] border border-slate-200 text-slate-800 transition-all hover:scale-105 cursor-pointer shadow-xs"
              aria-label="Next moment"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Large Moment Display Card */}
      <div className="bg-white rounded-3xl border-2 border-[#E8DEC8] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all">
        
        {/* Visual Showcase Block */}
        <div
          className={`lg:col-span-5 p-8 sm:p-10 text-white bg-gradient-to-br ${activeMoment.imagePlaceholderGradient} flex flex-col justify-between relative overflow-hidden min-h-[320px]`}
        >
          {/* Decorative Pattern Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#FBBF24_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-black tracking-wider text-[#FBBF24] uppercase">
              {activeMoment.icon}
              <span>{activeMoment.tag}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
              {activeMoment.title}
            </h3>

            <p className="text-xs text-amber-100/80 font-medium">
              📍 {activeMoment.setting}
            </p>
          </div>

          <div className="relative z-10 pt-6 mt-6 border-t border-white/20">
            <span className="text-[10px] font-bold text-amber-200 uppercase tracking-wider block">
              Official Pack Pairing:
            </span>
            <strong className="text-sm font-bold text-white font-display">
              {activeMoment.packPaired}
            </strong>
          </div>
        </div>

        {/* Narrative & Quote Details Block */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6 bg-[#FFFDF9]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-[#8B1E29] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Moment {currentIndex + 1} of {LIFESTYLE_MOMENTS.length}
              </span>
              <span className="text-xs font-bold text-slate-400">
                Patented Clean Grabber Compatible ✓
              </span>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-body">
              {activeMoment.description}
            </p>

            {/* Verified Student Quote Card */}
            <div className="bg-amber-50/70 rounded-2xl p-4 sm:p-5 border border-amber-200/80 space-y-2">
              <p className="text-xs sm:text-sm italic font-medium text-slate-800 leading-relaxed font-body">
                {activeMoment.quote}
              </p>
              <div className="text-[11px] font-bold text-[#8B1E29]">
                — {activeMoment.author}
              </div>
            </div>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 overflow-x-auto">
            <div className="flex items-center gap-2">
              {LIFESTYLE_MOMENTS.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx
                      ? 'w-8 bg-[#8B1E29]'
                      : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                  title={m.title}
                />
              ))}
            </div>

            <div className="text-xs font-bold text-slate-500 whitespace-nowrap">
              Snack Smarter · Clean Hands Guaranteed
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
