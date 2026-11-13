import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ChipasBagIllustration } from '../components/ChipasBagIllustration';
import { GrabberDemo } from '../components/GrabberDemo';
import { BrandCommercialVideo } from '../components/BrandCommercialVideo';
import { MilestonesTimeline } from '../components/MilestonesTimeline';
import { Accordion, AccordionItemData } from '../components/Accordion';
import { BrandDivider } from '../components/BrandDivider';
import { Product } from '../types';
import { ArrowRight, MapPin, BookOpen, Sparkles, CheckCircle2, FileText, Maximize2, Eye, X, ChevronLeft, ChevronRight, ExternalLink, Users, Target, ShieldCheck, Leaf, Factory, Scale, Award, Heart } from 'lucide-react';

interface AboutPamphlet {
  id: string;
  badge: string;
  hindiTitle: string;
  title: string;
  headline: string;
  subtitle: string;
  image: string;
  madeBy: string;
  authorName: string;
  keyPoints: string[];
}

const ABOUT_PAMPHLETS: AboutPamphlet[] = [
  {
    id: 'about-pamphlet-1',
    badge: 'Brand Manifesto 01',
    hindiTitle: 'क्रंच ईमानदारी से।',
    title: 'Crunch, Honestly.',
    headline: 'Bold flavour. Clear label. Right-sized packs. No fine print.',
    subtitle: 'The iconic "Crunch OK Please" truck-art sunburst campaign celebrating zero palm oil, authentic potato slices, and honest snacking.',
    image: '/assets/aistudio/Screenshot_2026-11-10_220540_bc3b517e.png',
    madeBy: '25BA108',
    authorName: 'Pratibha Biswal',
    keyPoints: [
      'Hindi typography: "क्रंच ईमानदारी से" (Crunch, Honestly)',
      '"CRUNCH OK PLEASE" vibrant Indian truck-art inspired visual identity',
      'Bold red sunburst framing the OG Classic Salted pack',
      '100% Zero Palm Oil certification stamp & direct quick commerce badge'
    ]
  },
  {
    id: 'about-pamphlet-2',
    badge: 'Brand Manifesto 02',
    hindiTitle: 'मिलिए चिपास से',
    title: 'Meet Chipas.',
    headline: 'The chip that doesn\'t hide anything.',
    subtitle: 'Full brand manifesto detailing regional flavour line-ups, 3 honest pack sizes, nutrition breakdown, and launch promo coupon.',
    image: '/assets/aistudio/Screenshot_2026-11-10_220600_d5e1bfc9.png',
    madeBy: '25BA108',
    authorName: 'Pratibha Biswal',
    keyPoints: [
      'Hindi title: "मिलिए चिपास से" (Meet Chipas) introduction',
      'Flavour launch roadmap: Classic Salted, Chilli-Lime, Achari Tadka & more',
      'Pack guide: 30g Quick Bite, 80g Sharing For Two, 150g Party Pack',
      'Transparent nutrition table & "Try The Crunch" promotional voucher'
    ]
  }
];

interface StudentFounder {
  name: string;
  rollNo: string;
  role: string;
  pageFocus: string;
  bio: string;
  favoriteFlavour: string;
}

const STUDENT_FOUNDERS: StudentFounder[] = [
  {
    name: 'Saurav',
    rollNo: '25BA131',
    role: 'Co-Founder & Brand Architect',
    pageFocus: 'Curator & Designer · Home Experience',
    bio: 'Lead strategist behind the Chippas brand identity, clean-finger grabber origami patent, and high-impact campus campaigns.',
    favoriteFlavour: 'Classic Salted'
  },
  {
    name: 'Pratibha Biswal',
    rollNo: '25BA108',
    role: 'Co-Founder & Creative Director',
    pageFocus: 'Curator & Designer · About Us & Heritage',
    bio: 'Champion of Hindi typographic heritage and the "क्रंच ईमानदारी से" manifesto, connecting truck-art aesthetics to modern snacking.',
    favoriteFlavour: 'Bengal Kasundi Mustard'
  },
  {
    name: 'Samiksha',
    rollNo: '25BA136',
    role: 'Co-Founder & Product Lead',
    pageFocus: 'Curator & Designer · Product Formulations',
    bio: 'Food scientist & palate curator behind our authentic regional spice ratios, zero palm oil testing, and nutritional transparency.',
    favoriteFlavour: 'Sour Cream & Onion'
  },
  {
    name: 'Pradyumna',
    rollNo: '25BA104',
    role: 'Co-Founder & Distribution Lead',
    pageFocus: 'Curator & Designer · Where to Buy & Logistics',
    bio: 'Spearheaded 10-minute Quick Commerce integration with Blinkit & Zepto and campus tuck shop network across top universities.',
    favoriteFlavour: 'Gujarat Khatta Meetha'
  }
];

const ABOUT_STORY_ACCORDIONS: AccordionItemData[] = [
  {
    id: 'story-origin',
    badge: 'Campus Roots',
    badgeColor: 'bg-[#8B1E29] text-[#FBBF24]',
    title: 'How did four university students build Chippas from scratch?',
    subtitle: 'From late-night study frustration to a recognized FMCG challenger',
    content: (
      <p>Between marathon exam preps at SRCC, we realized that commercial chips were fundamentally broken — oily hands spoiled laptops, packets were 70% air with microscopic 15g serving claims, and palm oil dominated the frying vats. We pooled our savings, formulated real spice blends in campus kitchens, and registered our patented corner grabber to build the snack brand we always wished existed.</p>
    )
  },
  {
    id: 'story-potatoes',
    badge: 'Farm Sourcing',
    badgeColor: 'bg-emerald-700 text-white',
    title: 'Where do the potatoes and spices actually come from?',
    subtitle: '100% farm contract relationships in Gujarat, West Bengal, and Andhra Pradesh',
    content: (
      <p>We source high-starch Chipsona potatoes directly from contracted agricultural cooperatives in Deesa, Gujarat and Hooghly, West Bengal. They are washed, skin-sliced with precision blades, and kettle-fried within 24 hours of arrival to maintain natural sugars and crispness.</p>
    )
  },
  {
    id: 'story-sustainability',
    badge: 'Eco & Sustainability',
    badgeColor: 'bg-sky-700 text-white',
    title: 'What is Chippas doing about plastic recycling and sustainability?',
    subtitle: '100% plastic-neutral certification and compostable origami grabbers',
    content: (
      <p>We collect and recycle 100% of our multi-layer packaging through verified EPR (Extended Producer Responsibility) waste management partners in India. Our pull-out corner grabber is manufactured from certified food-grade, biodegradable pulp paper with zero chemical coatings.</p>
    )
  }
];

interface AboutPageProps {
  onSelectProduct: (product: Product) => void;
  onNavigateToProducts: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onSelectProduct,
  onNavigateToProducts
}) => {
  const [selectedPamphletIndex, setSelectedPamphletIndex] = useState<number | null>(null);
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

      {/* ---------------- SECTION: OFFICIAL BRAND MANIFESTOS & PAMPHLETS (MADE BY 25BA108) ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 md:p-12 border-2 border-[#E7DECB] shadow-xl space-y-10">
          
          {/* Header with prominent Made by 25BA108 designation */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8DEC8]">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-[#8B1E29] text-[#FBBF24] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-xs">
                  <FileText className="w-3.5 h-3.5" />
                  Official Brand Manifestos & Pamphlets
                </span>
                <span className="inline-flex items-center gap-1 bg-[#FBBF24] text-slate-950 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-xs border border-amber-300">
                  Made by 25BA108
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-display tracking-tight text-balance">
                Official Brand Story Pamphlets
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-body">
                Official brand literature, cultural manifesto posters, and honest nutrition guides created for CHIPAS About Us. Authored and designed by <strong className="text-slate-900 font-bold">Pratibha Biswal</strong> (roll number <strong className="text-[#8B1E29] font-black underline decoration-[#FBBF24] decoration-2">25BA108</strong>). Click any pamphlet below to inspect the artwork in high resolution.
              </p>
            </div>

            {/* Author Credit Badge */}
            <div className="bg-gradient-to-br from-[#8B1E29] to-[#5C0D15] text-white p-5 rounded-2xl border-2 border-[#FBBF24] shrink-0 text-center md:text-right shadow-lg flex flex-col justify-center">
              <div className="text-[11px] uppercase tracking-wider text-[#FBBF24] font-black">
                About Us Page Curator & Designer
              </div>
              <div className="text-3xl font-black font-display text-white mt-0.5 tracking-tight">
                Made by 25BA108
              </div>
              <div className="text-xs text-amber-100/80 font-semibold mt-1">
                Pratibha Biswal · Roll No. 25BA108
              </div>
            </div>
          </div>

          {/* 2 Posters Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {ABOUT_PAMPHLETS.map((pamphlet, index) => (
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
                    <div className="text-xl font-black text-[#8B1E29] font-display">
                      {pamphlet.hindiTitle}
                    </div>
                    <h3 className="text-base font-black text-slate-900 font-display leading-snug group-hover:text-[#8B1E29] transition-colors">
                      {pamphlet.title}
                    </h3>
                    <div className="text-xs font-bold text-amber-800">
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
                      Author: <span className="text-[#8B1E29] font-bold">25BA108 (Pratibha Biswal)</span>
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
                Official Brand Print & Cultural Collateral · Created by <strong className="text-[#8B1E29]">Pratibha Biswal (Roll No. 25BA108)</strong>
              </span>
            </div>
            <div className="text-xs font-bold text-slate-600">
              High-resolution digital campaign assets embedded directly on About Us
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

      {/* ---------------- OFFICIAL ADVERTISEMENT VIDEO: THE CAMPUS STORY IN ACTION ---------------- */}
      <BrandCommercialVideo
        badgeText="Official Commercial · The Campus Story in Action"
        titlePrefix="The Story in Action: "
        titleHighlight="Snack Smarter."
        description="Watch our founding story brought to life on campus by SRCC students Saurav, Pradyumna, Pratibha, and Samiksha — capturing why snacking should be upgraded with honest ingredients and real crunch."
        buttonText="Explore All 6 Products"
        onButtonClick={onNavigateToProducts}
      />

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

      <BrandDivider variant="wave" color="#E7DECB" />

      {/* ---------------- SECTION: BRAND VALUES & MISSION ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#8B1E29]">
            Our Guiding Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
            Mission, Vision & Core Values
          </h2>
          <p className="text-sm text-slate-600">
            How we're redefining the Indian snacking experience with honesty and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#E7DECB] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#8B1E29] flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900 font-display">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
              To deliver unapologetically authentic Indian flavours crafted from real potatoes, cooked in clean heart-healthy oil, and served with packaging that respects everyday life.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#E7DECB] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900 font-display">Our Vision</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
              To be India’s benchmark student-first FMCG snack brand — proving that transparency, zero palm oil, and thoughtful packaging design can conquer mainstream shelves.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#E7DECB] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-slate-900 font-display">Sustainability Pledge</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
              100% plastic neutral collection through verified Indian recycling bodies. Biodegradable, compostable paper pull-out grabbers on every single pouch.
            </p>
          </div>
        </div>
      </section>

      <BrandDivider variant="dots" color="#8B1E29" />

      {/* ---------------- SECTION: MILESTONES TIMELINE ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#8B1E29]">
            The Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
            Milestones & Brand Evolution
          </h2>
          <p className="text-sm text-slate-600">
            From hostel origami prototypes to thousands of bags crunched daily across India.
          </p>
        </div>

        <MilestonesTimeline />
      </section>

      <BrandDivider variant="zigzag" color="#FBBF24" />

      {/* ---------------- SECTION: BEHIND THE SCENES & SOURCING ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F0] rounded-3xl p-6 sm:p-10 md:p-12 border-2 border-[#E7DECB] shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#8B1E29] flex items-center gap-1.5">
                <Factory className="w-4 h-4 text-[#8B1E29]" />
                <span>Behind the Scenes</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight mt-1">
                Farm to Bag: How Chippas is Made
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-[#DCD0BA]">
              3-Stage Quality Process
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-[#E7DECB] space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#8B1E29] text-[#FBBF24] flex items-center justify-center font-bold text-xs">
                01
              </span>
              <h4 className="text-base font-bold text-slate-900 font-display">Contract Farming & Harvest</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-body">
                We contract high-solids Chipsona potatoes from Deesa, Gujarat and Hooghly, West Bengal. Every potato is checked for low sugar content to avoid burning.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E7DECB] space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#8B1E29] text-[#FBBF24] flex items-center justify-center font-bold text-xs">
                02
              </span>
              <h4 className="text-base font-bold text-slate-900 font-display">Kettle Frying & Zero Palm Oil</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-body">
                Thickly cut slices are flash-cooked in pure high-oleic sunflower oil. Never recycled palm oil, giving a pristine clean crunch with no throat-burning grease.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E7DECB] space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#8B1E29] text-[#FBBF24] flex items-center justify-center font-bold text-xs">
                03
              </span>
              <h4 className="text-base font-bold text-slate-900 font-display">Stone-Ground Desi Dusting</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-body">
                Tumbled in natural spice powders ground from Guntur chillies, Tellicherry black pepper, and Bengali mustard. Nitrogen sealed with clean grabber insertion.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BrandDivider variant="wave" color="#E7DECB" />

      {/* ---------------- SECTION: MEET THE STUDENT FOUNDERS (WITH ROLL NUMBERS) ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-[#8B1E29] text-[#FBBF24] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>The Student Founders & Designers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
            Meet the Team Behind Chippas
          </h2>
          <p className="text-sm text-slate-600">
            Four SRCC student entrepreneurs combining packaging innovation, culinary passion, and modern FMCG execution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STUDENT_FOUNDERS.map((founder) => (
            <div
              key={founder.rollNo}
              className="bg-white rounded-2xl border-2 border-[#E7DECB] hover:border-[#8B1E29] p-5 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Roll number pill */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-[#8B1E29] text-[#FBBF24] px-2.5 py-0.5 rounded-full">
                    Roll No. {founder.rollNo}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-900 font-display group-hover:text-[#8B1E29] transition-colors">
                    {founder.name}
                  </h3>
                  <div className="text-xs font-bold text-[#8B1E29] mt-0.5">
                    {founder.role}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
                    {founder.pageFocus}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-body">
                  {founder.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Favorite:</span>
                <span className="font-bold text-slate-900 bg-[#FAF7F0] px-2 py-0.5 rounded border border-[#E7DECB]">
                  {founder.favoriteFlavour}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <BrandDivider variant="dots" color="#8B1E29" />

      {/* ---------------- SECTION: BRAND STORY FAQS ACCORDION ---------------- */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#8B1E29]">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            The Chippas Brand FAQ
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Learn more about our university origins, potato farming ethics, and sustainability roadmap.
          </p>
        </div>

        <Accordion
          items={ABOUT_STORY_ACCORDIONS}
          defaultOpenIds={['story-origin']}
          allowMultiple={true}
        />
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

      {/* ---------------- LIGHTBOX MODAL FOR PAMPHLETS (MADE BY 25BA108) ---------------- */}
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
                  {ABOUT_PAMPHLETS[selectedPamphletIndex].badge}
                </span>
                <span className="text-white font-bold text-sm sm:text-base truncate font-display">
                  {ABOUT_PAMPHLETS[selectedPamphletIndex].hindiTitle} · {ABOUT_PAMPHLETS[selectedPamphletIndex].title}
                </span>
                <span className="hidden sm:inline-block bg-black/40 text-[#FBBF24] border border-[#FBBF24]/40 font-black text-xs px-2.5 py-0.5 rounded-md shrink-0">
                  Made by 25BA108
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={ABOUT_PAMPHLETS[selectedPamphletIndex].image}
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
                src={ABOUT_PAMPHLETS[selectedPamphletIndex].image}
                alt={`${ABOUT_PAMPHLETS[selectedPamphletIndex].title} - Made by 25BA108`}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl mx-auto"
              />

              {/* Prev / Next Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPamphletIndex((prev) =>
                    prev !== null ? (prev - 1 + ABOUT_PAMPHLETS.length) % ABOUT_PAMPHLETS.length : 0
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
                    prev !== null ? (prev + 1) % ABOUT_PAMPHLETS.length : 0
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
                  Official Brand Collateral · Made by 25BA108 (Pratibha Biswal)
                </span>
                <span className="text-slate-400 hidden sm:inline">
                  {ABOUT_PAMPHLETS[selectedPamphletIndex].headline}
                </span>
              </div>

              {/* Quick switcher dots */}
              <div className="flex items-center gap-1.5">
                {ABOUT_PAMPHLETS.map((p, idx) => (
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
