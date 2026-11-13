import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS, BRAND_HIGHLIGHTS, BRAND_STATS, FAQ_LIST } from '../data/products';
import { ChipasBagIllustration } from '../components/ChipasBagIllustration';
import { ProductCard } from '../components/ProductCard';
import { GrabberDemo } from '../components/GrabberDemo';
import { BrandCommercialVideo } from '../components/BrandCommercialVideo';
import { BestsellersCarousel } from '../components/BestsellersCarousel';
import { LifestyleCarousel } from '../components/LifestyleCarousel';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { SocialCommunityFeed } from '../components/SocialCommunityFeed';
import { NewsletterSection } from '../components/NewsletterSection';
import { BrandDivider } from '../components/BrandDivider';
import { Accordion, AccordionItemData } from '../components/Accordion';
import { SpiceMeter } from '../components/SpiceMeter';
import { ArrowRight, ShoppingBag, CheckCircle2, Flame, Sparkles, Play, Film, Award, Maximize2, X, ChevronLeft, ChevronRight, FileText, ExternalLink, Eye, Clock, ShieldCheck, Zap, MapPin, HelpCircle, Check, Minus } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HomePageProps {
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onNavigate: (page: 'home' | 'products' | 'about' | 'where-to-buy') => void;
}

interface CampaignPamphlet {
  id: string;
  badge: string;
  title: string;
  headline: string;
  subtitle: string;
  image: string;
  madeBy: string;
  keyPoints: string[];
}

const OFFICIAL_PAMPHLETS: CampaignPamphlet[] = [
  {
    id: 'pamphlet-1',
    badge: 'Pamphlet 01',
    title: 'Old chip habits. New reasons.',
    headline: 'Pull. Unfold. Pinch.',
    subtitle: 'Everyday crunch with a better way to grab. Grams up front & clean fingers innovation.',
    image: '/assets/aistudio/pamphlet_01_with_roll_no_6c1cf0fe.png',
    madeBy: '25BA131',
    keyPoints: [
      'Giving the chip a second look: honest label & protein upfront',
      'The corner tear: pull, unfold, pinch mechanism',
      'Handy study snack guide & zero messy fingers'
    ]
  },
  {
    id: 'pamphlet-2',
    badge: 'Pamphlet 02',
    title: 'The Crunch Club · Three things we refuse to skip.',
    headline: 'Greasy fingers? Not today.',
    subtitle: 'Taste that shows off, regional flavour menu with Spice-O-Meter, and zero greasy screens.',
    image: '/assets/aistudio/pamphlet_2_with_roll_no_25a96612.png',
    madeBy: '25BA131',
    keyPoints: [
      'Three non-negotiables: taste, protein, and readable ingredients',
      'Spice-O-Meter rating for every single recipe',
      'Keeps phone screen, keyboard, and study notes pristine'
    ]
  },
  {
    id: 'pamphlet-3',
    badge: 'Pamphlet 03',
    title: 'Crunch Field Guide · Read the bag before you open it.',
    headline: 'Crunch smart. Snack sharp.',
    subtitle: 'Anatomy of a pack, full 8-flavour line-up, and daily crunch schedules for campus life.',
    image: '/assets/aistudio/pamphlet_3_with_roll_no_23f489bb.png',
    madeBy: '25BA131',
    keyPoints: [
      'Pack anatomy: front grams, corner grabber, plain-words back',
      'Daily crunch schedule: Study break, Squad hangout, Movie night',
      'Instant Quick-Commerce scan & Blinkit integration'
    ]
  }
];

const UPCOMING_LAUNCHES = [
  {
    id: 'guntur-mirchi',
    name: 'Guntur Mirchi Fire',
    origin: 'Andhra Pradesh',
    badge: 'Limited Batch · Dropping Next Month',
    spiceLevel: 5 as const,
    accent: '#DC2626',
    notes: 'Sun-dried Guntur chilli heat balanced with roasted garlic & crisp rock salt.'
  },
  {
    id: 'kolhapuri-tadka',
    name: 'Kolhapuri Thecha Tadka',
    origin: 'Maharashtra',
    badge: 'Kettle Test Winner · Campus Poll #1',
    spiceLevel: 4 as const,
    accent: '#EA580C',
    notes: 'Coarsely crushed green chilli, toasted peanut aroma, and smoky cumin tempering.'
  },
  {
    id: 'mumbai-pav-bhaji',
    name: 'Mumbai Pav Bhaji',
    origin: 'Chowpatty Street',
    badge: 'Seasonal Drop · Monsoon Special',
    spiceLevel: 3 as const,
    accent: '#D97706',
    notes: 'Buttery spiced tomato medley, charred bell pepper, and fresh coriander zest.'
  },
  {
    id: 'old-delhi-dahi-puri',
    name: 'Old Delhi Dahi Puri',
    origin: 'Chandni Chowk',
    badge: 'Sweet & Tangy Vault Reserve',
    spiceLevel: 2 as const,
    accent: '#15803D',
    notes: 'Cool yoghurt tang, tamarind chutney sweetness, mint, and black salt chaat snap.'
  }
];

const DAILY_CRUNCH_MOMENTS = [
  {
    id: 'study-break',
    time: '02:00 PM',
    label: 'Between-Classes Study Break',
    mood: 'Sharp focus, zero keyboard grease',
    story: 'Stuck in a 3-hour lecture marathon or prepping assignments in the library? Tear the Clean Grabber corner and pinch crispy olive oil chips while keeping your laptop trackpad spotless.',
    productId: 'olive-oil-sea-salt',
    highlightTag: 'Clean Keyboard Approved'
  },
  {
    id: 'squad-hangout',
    time: '05:30 PM',
    label: 'After-Hours Squad Hangout',
    mood: 'Big bowl energy & loud flavours',
    story: 'Stairs outside the canteen, cold nimbu sodas, and everyone arguing over which chip wins. Bold, pungent Bengal mustard heat wakes up the entire group.',
    productId: 'bengal-kasundi-mustard',
    highlightTag: 'Campus Crowd Favourite'
  },
  {
    id: 'late-night',
    time: '11:00 PM',
    label: 'Late-Night Fuel & Coding',
    mood: 'High-protein chatpata crunch',
    story: 'Skip soggy midnight delivery. Our Protein+ Tangy Tomato Masala pack delivers 8g of golden plant protein with an electrifying anardana zing to power past midnight.',
    productId: 'tangy-tomato-masala',
    highlightTag: '8g Plant Protein Boost'
  },
  {
    id: 'movie-night',
    time: '09:00 PM',
    label: 'Weekend Hostel Movie Night',
    mood: 'Non-stop classic potato crunch',
    story: 'Double features require a reliable staple. Thin, bubbling golden slices in pure sunflower oil with rock salt that never overpower the movie — just effortless crunch.',
    productId: 'classic-salted',
    highlightTag: 'Just 3 Honest Ingredients'
  }
];

const STANDARD_COMPARISON = [
  {
    criteria: 'Cooking Oil',
    chippas: '100% High-Oleic Sunflower & Cold-Pressed Olive Oil',
    ordinary: 'Heavy Refined Palm Oil Blends'
  },
  {
    criteria: 'Pack Transparency',
    chippas: 'Grams Up Front + Plain-Words Ingredient Back',
    ordinary: 'Fine-print servings & inflated air pockets'
  },
  {
    criteria: 'Mess-Free Eating',
    chippas: 'Patented Pull-Unfold-Pinch Corner Grabber',
    ordinary: 'Greasy fingertips on phones & notes'
  },
  {
    criteria: 'Seasoning Craft',
    chippas: 'Stone-ground regional Indian spices (Kasundi, Malabar, Aamchur)',
    ordinary: 'Generic artificial flavour dust'
  }
];

export const HomePage: React.FC<HomePageProps> = ({
  onSelectProduct,
  onQuickAdd,
  onNavigate
}) => {
  const [activeHeroFlavour, setActiveHeroFlavour] = useState<Product>(
    PRODUCTS.find((p) => p.id === 'classic-salted') || PRODUCTS[5]
  );
  const [selectedPamphletIndex, setSelectedPamphletIndex] = useState<number | null>(null);
  const [activeMomentIndex, setActiveMomentIndex] = useState<number>(0);

  const activeMoment = DAILY_CRUNCH_MOMENTS[activeMomentIndex];
  const activeMomentProduct =
    PRODUCTS.find((p) => p.id === activeMoment.productId) || PRODUCTS[0];

  const homeFaqItems: AccordionItemData[] = FAQ_LIST.slice(0, 4).map((faq, idx) => ({
    id: `home-faq-${idx}`,
    title: faq.question,
    subtitle: faq.category,
    content: faq.answer
  }));

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

      {/* ---------------- SECTION: BESTSELLERS CAROUSEL ---------------- */}
      <BestsellersCarousel
        title="Bestsellers & Fan Favourites"
        subtitle="The crunch that started a revolution across campuses. Hand-cooked in sunflower oil with zero palm oil."
        badge="Top Ranked on Campus"
        onSelectProduct={onSelectProduct}
        onQuickAdd={onQuickAdd}
      />

      <BrandDivider variant="wave" color="#EADFCB" />

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

      {/* ---------------- SECTION: OFFICIAL ADVERTISEMENT VIDEO ---------------- */}
      <BrandCommercialVideo
        badgeText="Official Brand Commercial · Campus Edition"
        titlePrefix="Snack Smarter. "
        titleHighlight="Crunch Louder."
        description="Watch our official commercial shot right on campus — where the question isn't whether to give up chips, but how to upgrade them with honest labels, real crunch, and zero palm oil."
        buttonText="Shop Classic Salted Pack Featured In Video"
        onButtonClick={() => onSelectProduct(PRODUCTS[5])}
      />

      {/* ---------------- SECTION: OFFICIAL CAMPAIGN PAMPHLETS (MADE BY 25BA131) ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 md:p-12 border-2 border-[#E7DECB] shadow-xl space-y-10">
          
          {/* Header with prominent Made by 25BA131 designation */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8DEC8]">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-[#8B1E29] text-[#FBBF24] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-xs">
                  <FileText className="w-3.5 h-3.5" />
                  Official Campaign Collateral
                </span>
                <span className="inline-flex items-center gap-1 bg-[#FBBF24] text-slate-950 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-xs border border-amber-300">
                  Made by 25BA131
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-display tracking-tight text-balance">
                Official Brand Pamphlets
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-body">
                Explore the official brand literature, pack anatomy diagrams, spice index, and snacking field guides created for CHIPAS. Authored and designed by <strong className="text-slate-900 font-bold">Samiksha</strong> (roll number <strong className="text-[#8B1E29] font-black underline decoration-[#FBBF24] decoration-2">25BA131</strong>). Click any pamphlet below to view in high resolution.
              </p>
            </div>

            {/* Author Credit Badge */}
            <div className="bg-gradient-to-br from-[#8B1E29] to-[#5C0D15] text-white p-5 rounded-2xl border-2 border-[#FBBF24] shrink-0 text-center md:text-right shadow-lg flex flex-col justify-center">
              <div className="text-[11px] uppercase tracking-wider text-[#FBBF24] font-black">
                Campaign Creator & Designer
              </div>
              <div className="text-3xl font-black font-display text-white mt-0.5 tracking-tight">
                Made by 25BA131
              </div>
              <div className="text-xs text-amber-100/80 font-semibold mt-1">
                Samiksha · Roll No. 25BA131
              </div>
            </div>
          </div>

          {/* 3 Pamphlet Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {OFFICIAL_PAMPHLETS.map((pamphlet, index) => (
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

                {/* Pamphlet Visual Image Showcase with Hover Zoom */}
                <div
                  onClick={() => setSelectedPamphletIndex(index)}
                  className="relative aspect-4/3 sm:aspect-16/11 bg-slate-900 overflow-hidden cursor-pointer group/img"
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
                    <h3 className="text-lg font-black text-slate-900 font-display leading-snug group-hover:text-[#8B1E29] transition-colors">
                      {pamphlet.title}
                    </h3>
                    <div className="text-xs font-bold text-[#8B1E29]">
                      "{pamphlet.headline}"
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-body">
                      {pamphlet.subtitle}
                    </p>

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
                      Author: <span className="text-[#8B1E29] font-bold">25BA131</span>
                    </span>

                    <button
                      onClick={() => setSelectedPamphletIndex(index)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#FAF7F0] hover:bg-[#FBBF24] text-slate-900 hover:text-slate-950 text-xs font-black uppercase tracking-wider transition-all border border-[#E0D4BD] hover:border-amber-400 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Inspect Artwork</span>
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
                Official Campus Print Collateral · All 3 pamphlets created by <strong className="text-[#8B1E29]">Roll No. 25BA131</strong>
              </span>
            </div>
            <div className="text-xs font-bold text-slate-600">
              High-resolution digital campaign assets embedded directly on Home
            </div>
          </div>

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

        {/* Side-by-Side Comparison: Chippas vs Ordinary Chips */}
        <div className="mt-12 bg-white rounded-3xl border-2 border-[#EADFCB] shadow-lg overflow-hidden">
          <div className="bg-[#FAF7F0] px-6 sm:px-8 py-5 border-b border-[#EADFCB] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-[#8B1E29]">
                Honest Snack Audit
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                The CHIPAS Standard vs. Ordinary Chips
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 bg-[#8B1E29] text-[#FBBF24] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              0% Palm Oil Promise
            </span>
          </div>

          <div className="divide-y divide-[#F0E8D8]">
            <div className="grid grid-cols-12 px-6 sm:px-8 py-3 bg-[#FFFDF9] text-[11px] font-black uppercase tracking-wider text-slate-500">
              <div className="col-span-12 sm:col-span-3">Standard Check</div>
              <div className="col-span-6 sm:col-span-5 text-[#8B1E29]">CHIPAS Way</div>
              <div className="col-span-6 sm:col-span-4 text-slate-400">Ordinary Brands</div>
            </div>
            {STANDARD_COMPARISON.map((row, idx) => (
              <div key={idx} className="grid grid-cols-12 px-6 sm:px-8 py-4 items-center gap-y-2 hover:bg-[#FAF8F5] transition-colors">
                <div className="col-span-12 sm:col-span-3 font-black text-sm text-slate-900 font-display">
                  {row.criteria}
                </div>
                <div className="col-span-12 sm:col-span-5 flex items-start gap-2 text-xs sm:text-sm font-bold text-emerald-900 pr-4">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>{row.chippas}</span>
                </div>
                <div className="col-span-12 sm:col-span-4 flex items-start gap-2 text-xs text-slate-500">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Minus className="w-3 h-3" />
                  </span>
                  <span>{row.ordinary}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION: NEW LAUNCHES & LIMITED-EDITION DROPS ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#2B090D] via-[#5C0D15] to-[#8B1E29] text-white rounded-3xl p-6 sm:p-10 md:p-12 border-2 border-[#FBBF24]/50 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#FBBF24]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 bg-[#FBBF24] text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Coming Soon to The Kettle
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">
                New Launches &amp; Limited-Edition Vault
              </h2>
              <p className="text-sm text-amber-100/85 font-body">
                Small-batch regional experiments tested across college taste labs before hitting shelves nationwide. Preview our upcoming drops and vote for the next release in our Products catalogue.
              </p>
            </div>

            <button
              onClick={() => onNavigate('products')}
              className="px-6 py-3.5 rounded-xl bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 shrink-0 cursor-pointer border border-amber-300"
            >
              <span>Vote in Flavour Vault</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
            {UPCOMING_LAUNCHES.map((drop) => (
              <div
                key={drop.id}
                className="bg-black/30 backdrop-blur-xs rounded-2xl p-5 border border-white/15 hover:border-[#FBBF24]/70 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: drop.accent }}
                    >
                      {drop.origin}
                    </span>
                    <Flame className="w-4 h-4 text-[#FBBF24] shrink-0" />
                  </div>

                  <h3 className="text-lg font-black font-display text-white group-hover:text-[#FBBF24] transition-colors">
                    {drop.name}
                  </h3>

                  <p className="text-xs text-amber-100/80 leading-relaxed font-body">
                    {drop.notes}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-amber-200/75">
                      Spice Level
                    </span>
                    <SpiceMeter level={drop.spiceLevel} size="sm" />
                  </div>
                  <div className="text-[11px] font-bold text-[#FBBF24]">
                    {drop.badge}
                  </div>
                </div>
              </div>
            ))}
          </div>
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

      {/* ---------------- SECTION: A DAY IN CRUNCH (INTERACTIVE CAMPUS SCHEDULE) ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#8B1E29]">
            <Clock className="w-3.5 h-3.5" />
            Featured in Pamphlet 03 · Daily Crunch Guide
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight text-balance">
            Your Day in Crunch
          </h2>
          <p className="text-sm text-slate-600 font-body">
            Pick your time of day to see which CHIPAS pack matches your study desk, squad hangout, or midnight marathon.
          </p>
        </div>

        {/* Interactive Schedule Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {DAILY_CRUNCH_MOMENTS.map((moment, idx) => {
            const isSelected = idx === activeMomentIndex;
            return (
              <button
                key={moment.id}
                onClick={() => setActiveMomentIndex(idx)}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#8B1E29] border-[#FBBF24] text-white shadow-lg scale-[1.02]'
                    : 'bg-white border-[#EADFCB] hover:border-[#8B1E29]/50 text-slate-800'
                }`}
              >
                <div
                  className={`text-[11px] font-black uppercase tracking-wider ${
                    isSelected ? 'text-[#FBBF24]' : 'text-[#8B1E29]'
                  }`}
                >
                  {moment.time}
                </div>
                <div className="text-sm font-black font-display mt-0.5 leading-snug">
                  {moment.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Moment Showcase Card */}
        <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 border-2 border-[#EADFCB] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div
                onClick={() => onSelectProduct(activeMomentProduct)}
                className="cursor-pointer transform hover:scale-105 transition-transform drop-shadow-xl"
              >
                <ChipasBagIllustration product={activeMomentProduct} size="lg" />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#FBBF24] text-slate-950 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
                  {activeMoment.time} Pick
                </span>
                <span className="bg-[#FAF7F0] text-[#8B1E29] border border-[#EADFCB] text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
                  {activeMoment.highlightTag}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                  {activeMomentProduct.name}
                </h3>
                <p className="text-xs font-bold text-[#8B1E29] mt-1">
                  {activeMoment.mood} · {activeMomentProduct.collection} Collection
                </p>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed font-body">
                {activeMoment.story}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-[#FAF7F0] p-3.5 rounded-xl border border-[#EADFCB]">
                  <span className="text-[10px] uppercase tracking-wider font-black text-slate-500 block mb-1">
                    Spice-O-Meter
                  </span>
                  <SpiceMeter level={activeMomentProduct.spiceLevel} size="sm" />
                </div>
                <div className="bg-[#FAF7F0] p-3.5 rounded-xl border border-[#EADFCB]">
                  <span className="text-[10px] uppercase tracking-wider font-black text-slate-500 block mb-1">
                    Ideal Campus Pairing
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    {activeMomentProduct.idealPairing}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onSelectProduct(activeMomentProduct)}
                  className="px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider text-slate-950 bg-[#FBBF24] hover:bg-[#F59E0B] shadow-md transition-all cursor-pointer border border-amber-300"
                >
                  Inspect Pack Details
                </button>
                <button
                  onClick={() => onQuickAdd(activeMomentProduct)}
                  className="px-6 py-3 rounded-xl font-bold text-xs text-slate-900 bg-white hover:bg-slate-50 border border-[#DFD2BA] transition-colors cursor-pointer"
                >
                  Quick Add · ₹{activeMomentProduct.sizes[1]?.price || 20}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION: LIFESTYLE MOMENTS CAROUSEL ---------------- */}
      <LifestyleCarousel />

      <BrandDivider variant="dots" color="#8B1E29" />

      {/* ---------------- SECTION: TESTIMONIALS & REVIEWS ---------------- */}
      <TestimonialsSection />

      <BrandDivider variant="zigzag" color="#FBBF24" />

      {/* ---------------- SECTION: SOCIAL & COMMUNITY FEED ---------------- */}
      <SocialCommunityFeed />

      <BrandDivider variant="wave" color="#EADFCB" />

      {/* ---------------- SECTION: QUICK-COMMERCE & CAMPUS FINDER TEASER ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F0] rounded-3xl p-6 sm:p-10 border-2 border-[#EADFCB] flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#8B1E29]">
              <Zap className="w-3.5 h-3.5" />
              10-Minute Campus &amp; Metro Drops
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              Craving crisp crunch right now? Find CHIPAS near you.
            </h2>
            <p className="text-sm text-slate-600 font-body leading-relaxed">
              Stocked at demo quick-commerce hubs (Blinkit &amp; Zepto), campus night canteens, and select supermarkets across Bengaluru, Mumbai, Delhi NCR, Pune, and Hyderabad.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('where-to-buy')}
              className="px-7 py-4 rounded-2xl font-black text-xs uppercase tracking-wider bg-[#8B1E29] hover:bg-[#5C0D15] text-[#FBBF24] shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              <span>Open Store Locator</span>
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-wider bg-white hover:bg-slate-50 text-slate-900 border border-[#DFD2BA] transition-all cursor-pointer"
            >
              Read Our Story
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION: TOP HOME FAQS ---------------- */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#8B1E29]">
            <HelpCircle className="w-3.5 h-3.5" />
            Quick Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            Curious about the Crunch?
          </h2>
          <p className="text-sm text-slate-600">
            Everything first-time crunchers ask about our oil, grams-up-front promise, and Clean Grabber.
          </p>
        </div>

        <Accordion items={homeFaqItems} allowMultiple={false} />
      </section>

      {/* ---------------- SECTION: NEWSLETTER SUBSCRIPTION ---------------- */}
      <NewsletterSection sourcePage="Home" />

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

      {/* ---------------- LIGHTBOX MODAL FOR PAMPHLETS (MADE BY 25BA131) ---------------- */}
      {selectedPamphletIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
          onClick={() => setSelectedPamphletIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#18181B] rounded-2xl sm:rounded-3xl border-2 border-[#FBBF24] overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#5C0D15] px-4 sm:px-6 py-3.5 border-b border-[#FBBF24]/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="bg-[#FBBF24] text-slate-950 font-black text-xs uppercase px-2.5 py-0.5 rounded-full shrink-0">
                  {OFFICIAL_PAMPHLETS[selectedPamphletIndex].badge}
                </span>
                <span className="text-white font-bold text-sm sm:text-base truncate font-display">
                  {OFFICIAL_PAMPHLETS[selectedPamphletIndex].title}
                </span>
                <span className="hidden sm:inline-block bg-black/40 text-[#FBBF24] border border-[#FBBF24]/40 font-black text-xs px-2.5 py-0.5 rounded-md shrink-0">
                  Made by 25BA131
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={OFFICIAL_PAMPHLETS[selectedPamphletIndex].image}
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
                src={OFFICIAL_PAMPHLETS[selectedPamphletIndex].image}
                alt={`${OFFICIAL_PAMPHLETS[selectedPamphletIndex].title} - Made by 25BA131`}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl mx-auto"
              />

              {/* Prev / Next Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPamphletIndex((prev) =>
                    prev !== null ? (prev - 1 + OFFICIAL_PAMPHLETS.length) % OFFICIAL_PAMPHLETS.length : 0
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
                    prev !== null ? (prev + 1) % OFFICIAL_PAMPHLETS.length : 0
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
                  Official Collateral · Made by 25BA131
                </span>
                <span className="text-slate-400 hidden sm:inline">
                  {OFFICIAL_PAMPHLETS[selectedPamphletIndex].headline}
                </span>
              </div>

              {/* Quick switcher dots */}
              <div className="flex items-center gap-1.5">
                {OFFICIAL_PAMPHLETS.map((p, idx) => (
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
