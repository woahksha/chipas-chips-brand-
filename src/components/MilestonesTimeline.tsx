import React, { useState } from 'react';
import { Sparkles, Award, Rocket, Heart, Shield, CheckCircle2, ChevronRight } from 'lucide-react';

interface Milestone {
  year: string;
  quarter?: string;
  title: string;
  tagline: string;
  description: string;
  badge: string;
  stat: string;
  statLabel: string;
  storyDetails: string[];
}

const MILESTONES: Milestone[] = [
  {
    year: '2024',
    quarter: 'Q1',
    title: 'The Sticky Keyboard Epiphany',
    tagline: 'Born in a hostel room during semester exam week',
    description: 'Frustrated by greasy phone screens and oily laptop keyboards while crunching through all-night study sessions, our student founders began prototyping the pull-out corner grabber using origami folds.',
    badge: 'Inception',
    stat: '42',
    statLabel: 'Origami Grabber Prototypes',
    storyDetails: [
      'Started in Hostel Room #304 with four student founders',
      'Refused standard industrial bag templates',
      'First hand-sliced potato batch tested in campus pantry'
    ]
  },
  {
    year: '2024',
    quarter: 'Q3',
    title: 'The Zero Palm Oil Non-Negotiable',
    tagline: 'Rejecting cheap industrial fats for heart-healthy sunflower oil',
    description: 'Every major contract manufacturer urged us to use palm oil to cut costs by 45%. We flatly refused, partnering with a clean kettle-cooking facility using pure high-oleic sunflower oil and stone-ground spices.',
    badge: 'Pledge',
    stat: '0%',
    statLabel: 'Palm Oil Tolerated',
    storyDetails: [
      'Audited 12 regional frying units across Northern India',
      'Locked in high-oleic sunflower oil with natural antioxidants',
      'Formulated authentic regional masala profiles without maltodextrin filler'
    ]
  },
  {
    year: '2025',
    quarter: 'Q1',
    title: 'Campus Tuck Shop Frenzy',
    tagline: '10,000 packs sold out in first 48 hours across North Campus',
    description: 'We dropped our first commercial run of Classic Salted and Gujarat Khatta Meetha at college canteens. Word of mouth exploded as students loved the clean grabber and authentic Desi crunch.',
    badge: 'Breakthrough',
    stat: '10,000+',
    statLabel: 'Packs Sold in 48 Hours',
    storyDetails: [
      'Placed in 8 university canteens and sports complexes',
      'Ranked #1 requested afternoon snack by student council',
      'Patented corner pull-and-pinch mechanism registered'
    ]
  },
  {
    year: '2025',
    quarter: 'Q4',
    title: 'Quick Commerce Nationwide Expansion',
    tagline: 'From campus tuck shops to 10-minute delivery in all metros',
    description: 'Partnered with Blinkit, Zepto, and Instamart dark stores to bring 6 signature flavours to millions of snackers across Delhi NCR, Mumbai, Bengaluru, and Kolkata within 10 minutes.',
    badge: 'Scale',
    stat: '120,000+',
    statLabel: 'Active Monthly Snackers',
    storyDetails: [
      'Expanded portfolio to 6 signature regional recipes',
      'Over 250+ quick commerce micro-warehouses stocked',
      'Maintained 4.9/5 consumer satisfaction across platforms'
    ]
  },
  {
    year: '2026',
    quarter: 'Today',
    title: 'The Modern FMCG Challenger',
    tagline: 'Proving that honest labels and superior crunch win every time',
    description: 'With grams up front, transparent nutrition, authentic Indian culinary heritage, and zero compromises, Chippas continues to set the new benchmark for modern snacking.',
    badge: 'Present Day',
    stat: '6',
    statLabel: 'Crafted Regional Recipes',
    storyDetails: [
      'Student-founded, mission-driven snack company',
      'Continuous regional culinary research in Gujarat, Maharashtra & Bengal',
      'Committed to plastic-neutral packaging recycling by end of 2026'
    ]
  }
];

export const MilestonesTimeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(MILESTONES.length - 1);

  const activeMilestone = MILESTONES[activeIndex];

  return (
    <div className="space-y-10">
      {/* Interactive Year Selector Tabs */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto p-1.5 bg-[#FAF7F0] rounded-2xl border border-[#E7DECB]">
        {MILESTONES.map((m, idx) => {
          const isSelected = activeIndex === idx;

          return (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-center transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-[#8B1E29] text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-white/70'
              }`}
            >
              <div className="text-[10px] font-black uppercase tracking-wider opacity-80">
                {m.quarter} · {m.badge}
              </div>
              <div className="text-lg font-black font-display tracking-tight">
                {m.year}
              </div>
            </button>
          );
        })}
      </div>

      {/* Featured Milestone Card */}
      <div className="bg-white rounded-3xl border-2 border-[#E7DECB] p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Milestone Narrative */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#FBBF24] text-slate-950 font-black text-xs uppercase px-3 py-1 rounded-full">
                {activeMilestone.year} · {activeMilestone.badge}
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {activeMilestone.tagline}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              {activeMilestone.title}
            </h3>

            <p className="text-sm text-slate-700 leading-relaxed font-body">
              {activeMilestone.description}
            </p>

            {/* Bullet points */}
            <div className="pt-2 space-y-2 border-t border-slate-100">
              {activeMilestone.storyDetails.map((detail, dIdx) => (
                <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#8B1E29] shrink-0" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Key Stat Callout */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#8B1E29] to-[#5C0D15] text-white p-6 sm:p-8 rounded-2xl border-2 border-[#FBBF24] text-center shadow-md flex flex-col justify-center items-center space-y-2">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#FBBF24]">
              Milestone Metric
            </span>
            <div className="text-4xl sm:text-5xl font-black font-display text-white tracking-tight">
              {activeMilestone.stat}
            </div>
            <div className="text-xs font-bold text-amber-100">
              {activeMilestone.statLabel}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
