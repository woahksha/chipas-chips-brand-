import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquareQuote, ThumbsUp } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  collegeOrCity: string;
  rating: number;
  favouriteFlavour: string;
  quote: string;
  verifiedSnacker: boolean;
  date: string;
}

const REVIEWS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Prisha Deshmukh',
    collegeOrCity: 'SRCC, Delhi University',
    rating: 5,
    favouriteFlavour: 'Bengal Kasundi Mustard',
    quote: 'The mustard kick is completely authentic! Commercial chips always water down Indian flavours, but Chippas actually committed to real fermented Kasundi pungency. Best snack in North Campus.',
    verifiedSnacker: true,
    date: '3 days ago'
  },
  {
    id: 'rev-2',
    name: 'Rohan Mehra',
    collegeOrCity: 'IIT Bombay, Powai',
    rating: 5,
    favouriteFlavour: 'Classic Salted',
    quote: 'The pull-out corner grabber is genuinely brilliant engineering. I can code for 6 hours straight with mechanical keyboard keys remaining squeaky clean. And zero palm oil makes a huge difference.',
    verifiedSnacker: true,
    date: '1 week ago'
  },
  {
    id: 'rev-3',
    name: 'Ananya Roy',
    collegeOrCity: 'St. Xavier’s College, Kolkata',
    rating: 5,
    favouriteFlavour: 'Kerala Pepper & Curry Leaf',
    quote: 'You can see actual fried curry leaf flakes right on the potato ridges! Tellicherry pepper warmth lingers without burning your throat. My hostel room stays permanently stocked.',
    verifiedSnacker: true,
    date: '2 weeks ago'
  },
  {
    id: 'rev-4',
    name: 'Devansh Patel',
    collegeOrCity: 'IIM Ahmedabad',
    rating: 5,
    favouriteFlavour: 'Gujarat Khatta Meetha',
    quote: 'Sweet jaggery tang balanced against roasted jeera. Perfect tea-time companion. Also love that they print the actual grams prominently on the front rather than sneaky air-filled bags.',
    verifiedSnacker: true,
    date: 'Last month'
  },
  {
    id: 'rev-5',
    name: 'Tanvi Nair',
    collegeOrCity: 'Christ University, Bengaluru',
    rating: 5,
    favouriteFlavour: 'Tangy Tomato Masala (Protein+)',
    quote: '8 grams of plant protein per pack with real tomato zing. It is my go-to snack after evening badminton practice. Doesn’t leave that heavy greasy film in your mouth.',
    verifiedSnacker: true,
    date: 'Last month'
  },
  {
    id: 'rev-6',
    name: 'Kabir Verma',
    collegeOrCity: 'Cyber City, Gurugram',
    rating: 5,
    favouriteFlavour: 'Olive Oil & Sea Salt',
    quote: 'Subtle, golden, and kettle-cooked cleanly in Spanish olive oil. Pairs so well with sparkling water during long client pitch desk hours.',
    verifiedSnacker: true,
    date: '2 weeks ago'
  }
];

export const TestimonialsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const flavourFilters = ['All', 'Classic Salted', 'Bengal Kasundi Mustard', 'Kerala Pepper & Curry Leaf', 'Gujarat Khatta Meetha'];

  const filteredReviews = activeFilter === 'All'
    ? REVIEWS
    : REVIEWS.filter((r) => r.favouriteFlavour.includes(activeFilter));

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#8B1E29] flex items-center gap-1.5">
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#8B1E29]" />
            <span>Community Verified</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight mt-1">
            Loved by 50,000+ campus snackers.
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Real feedback from students, gamers, coders, and snack purists who refused to settle for palm oil.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#F6EFE3] p-1 rounded-2xl border border-[#E7DECB]">
          {flavourFilters.map((flavour) => (
            <button
              key={flavour}
              onClick={() => setActiveFilter(flavour)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === flavour
                  ? 'bg-[#8B1E29] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-white/60'
              }`}
            >
              {flavour}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-3xl p-6 border-2 border-[#E8DEC8] hover:border-amber-400 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Star Rating & Verified */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FBBF24] text-amber-500" />
                  ))}
                </div>

                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  <span>Verified Snacker</span>
                </span>
              </div>

              {/* Review Quote */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-body italic">
                "{rev.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-black text-slate-900 font-display">
                  {rev.name}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">
                  {rev.collegeOrCity}
                </p>
              </div>

              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg bg-amber-100 text-[#8B1E29] border border-amber-300/60 max-w-[130px] truncate">
                {rev.favouriteFlavour.split(' ')[0]} {rev.favouriteFlavour.split(' ')[1] || ''}
              </span>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};
