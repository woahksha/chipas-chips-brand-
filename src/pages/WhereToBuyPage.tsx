import React, { useState } from 'react';
import { SAMPLE_STORES, ONLINE_PARTNERS, CAMPUS_HUBS } from '../data/stores';
import { PRODUCTS } from '../data/products';
import { StoreLocation, Product } from '../types';
import { ChipasBagIllustration } from '../components/ChipasBagIllustration';
import { BrandCommercialVideo } from '../components/BrandCommercialVideo';
import { InteractiveStoreMap } from '../components/InteractiveStoreMap';
import { EventsCalendar } from '../components/EventsCalendar';
import { Accordion, AccordionItemData } from '../components/Accordion';
import { BrandDivider } from '../components/BrandDivider';
import { Search, MapPin, Navigation, Phone, Clock, AlertCircle, ArrowUpRight, GraduationCap, Zap, CheckCircle2, ShoppingBag, Store, FileText, Maximize2, Eye, X, ChevronLeft, ChevronRight, ExternalLink, Send, HelpCircle, Truck, Package, Building2, Sparkles, ShieldCheck, Check } from 'lucide-react';

interface WhereToBuyPamphlet {
  id: string;
  badge: string;
  title: string;
  headline: string;
  subtitle: string;
  image: string;
  madeBy: string;
  keyPoints: string[];
}

const WHERE_TO_BUY_PAMPHLETS: WhereToBuyPamphlet[] = [
  {
    id: 'buy-pamphlet-1',
    badge: 'Campus Poster 01',
    title: 'Snack Smarter. Crunch Louder.',
    headline: 'Your Favourite Chip, Upgraded.',
    subtitle: 'Official product retail showcase featuring Classic Salted, Gujarat Khatta Meetha, and Tangy Tomato Masala.',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_9.31.07_PM_41d84a3c.jpeg',
    madeBy: '25BA104',
    keyPoints: [
      'Protein-Forward Snacking on every campus shelf & retail outlet',
      'Clear portion sizes that make sense for daily study sessions',
      'Transparent nutrition with honest front-of-pack grams',
      'Great taste with authentic regional seasonings and zero palm oil'
    ]
  },
  {
    id: 'buy-pamphlet-2',
    badge: 'Campus Poster 02',
    title: 'The Perfect Campus Snack',
    headline: 'From Class To Canteen, Chipas Goes With You.',
    subtitle: 'Crafted for study breaks, late-night cravings, and everything in between with real snacking integrity.',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-10_at_9.31.08_PM_a0bb2b68.jpeg',
    madeBy: '25BA104',
    keyPoints: [
      'Campus checklist: Crunchy, Satisfying, Protein-forward, Made for real snacking',
      'No unnecessary additives, zero palm oil, pure high-oleic sunflower oil',
      'Bold desi flavours ready at college tuck shops and 10-min delivery',
      'From lecture hall study breaks to hostel dorm movie nights'
    ]
  }
];

const RETAILER_FAQS: AccordionItemData[] = [
  {
    id: 'faq-dispatch',
    badge: 'Quick Commerce',
    badgeColor: 'bg-emerald-700 text-white',
    title: 'How fast is quick commerce delivery in major cities?',
    content: (
      <p>Through our direct dark store integrations with Blinkit, Zepto, and Swiggy Instamart, average delivery times are between 8 to 14 minutes across Delhi NCR, Mumbai, Bengaluru, Kolkata, Pune, and Ahmedabad.</p>
    )
  },
  {
    id: 'faq-distributor',
    badge: 'B2B Wholesale',
    badgeColor: 'bg-[#8B1E29] text-[#FBBF24]',
    title: 'How can supermarkets, canteen contractors, and kiranas stock Chippas?',
    content: (
      <p>We provide retail cartons of 24, 48, and 96 units with attractive retailer margins (28–35%), branded corrugated floor displays, and guaranteed replacement of unsold packs within 90 days. Reach out via our distributor enquiry form below or email retail@chipas.in.</p>
    )
  },
  {
    id: 'faq-campus-tuck',
    badge: 'Campus Program',
    badgeColor: 'bg-amber-600 text-white',
    title: 'How does the Campus Tuck Shop direct supply program work?',
    content: (
      <p>Student councils and hostel tuck shop managers can order directly at institutional rates with zero shipping fees. We also provide free branded dispensers and sticker sets for campus events.</p>
    )
  }
];

interface WhereToBuyPageProps {
  onOpenContact: () => void;
  onSelectProduct?: (product: Product) => void;
}

export const WhereToBuyPage: React.FC<WhereToBuyPageProps> = ({ onOpenContact, onSelectProduct }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedStore, setSelectedStore] = useState<StoreLocation | null>(SAMPLE_STORES[0]);
  const [selectedPamphletIndex, setSelectedPamphletIndex] = useState<number | null>(null);
  const [cityVotes, setCityVotes] = useState<Record<string, boolean>>({});
  const [partnerForm, setPartnerForm] = useState({
    outletName: '',
    city: '',
    outletType: 'Campus Tuck Shop',
    monthlyVolume: '2–5 Cartons (48–120 packs)',
    contactEmail: '',
    phone: ''
  });
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);
  const [partnerError, setPartnerError] = useState('');

  const handleToggleCityVote = (cityName: string) => {
    setCityVotes((prev) => ({ ...prev, [cityName]: !prev[cityName] }));
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerForm.outletName.trim() || !partnerForm.city.trim() || !partnerForm.contactEmail.includes('@')) {
      setPartnerError('Please fill in your store/campus name, city, and a valid contact email.');
      return;
    }
    setPartnerError('');
    setPartnerSubmitted(true);
  };

  const quickCities = ['All', 'Delhi NCR', 'Mumbai', 'Bengaluru', 'Kolkata', 'Ahmedabad', 'Kochi'];

  const filteredStores = SAMPLE_STORES.filter((store) => {
    const matchesCity = selectedCity === 'All' || store.city === selectedCity;
    const matchesSearch =
      searchQuery.trim() === '' ||
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.pincode.includes(searchQuery.trim());
    return matchesCity && matchesSearch;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredStores.length > 0) {
      setSelectedStore(filteredStores[0]);
    }
  };

  // Find product object by flavour name snippet
  const getProductForFlavour = (flavourName: string): Product | undefined => {
    return PRODUCTS.find((p) => 
      p.name.toLowerCase().includes(flavourName.toLowerCase()) ||
      flavourName.toLowerCase().includes(p.name.split(' ')[0].toLowerCase())
    );
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16 space-y-16">
      
      {/* ---------------- 1. RICH BURGUNDY & YELLOW HERO BANNER ---------------- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#7A141D] via-[#8B1E29] to-[#4A0E17] text-white pt-8 pb-16 md:py-16 rounded-b-[40px] md:rounded-b-[50px] shadow-2xl border-b-4 border-[#FBBF24]">
        
        {/* Ambient Warm Backlight */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#FBBF24]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Hero Text & Search */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-black tracking-wider text-[#FBBF24] uppercase">
                <Store className="w-3.5 h-3.5" />
                <span>Store Radar & Quick Commerce Hub</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white leading-tight">
                Find your <span className="text-[#FBBF24] underline decoration-amber-400 decoration-wavy decoration-2">crunch.</span>
              </h1>

              <p className="text-base text-amber-100/90 max-w-2xl leading-relaxed font-body">
                Whether you're looking for physical retail shelves across campuses and gourmet marts, or want a fresh bag dispatched to your doorstep in 10 minutes via Blinkit, we've got you covered.
              </p>

              {/* Integrated High-Contrast Hero Search Bar */}
              <form onSubmit={handleSearchSubmit} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-xl">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search campus, area, or 6-digit PIN code..."
                    className="w-full text-xs sm:text-sm pl-11 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 shadow-lg focus:outline-none focus:ring-4 focus:ring-[#FBBF24]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider text-slate-950 bg-[#FBBF24] hover:bg-[#F59E0B] transition-all shadow-lg active:scale-95 cursor-pointer border border-amber-300 whitespace-nowrap"
                >
                  Locate Shelves
                </button>
              </form>

              {/* Quick City Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                <span className="font-bold text-amber-200">Popular Metros:</span>
                {quickCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setSearchQuery('');
                    }}
                    className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                      selectedCity === city
                        ? 'bg-[#FBBF24] text-slate-950 shadow-md scale-105'
                        : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>

            </div>

            {/* Right Hero Mini Showcase: Two Colourful Packets */}
            <div className="lg:col-span-4 hidden lg:flex justify-center items-center relative">
              <div className="relative flex items-center justify-center">
                {/* Back packet tilted */}
                <div className="transform -rotate-12 translate-x-4 opacity-90 scale-90">
                  <ChipasBagIllustration product={PRODUCTS[0]} size="sm" interactive={false} />
                </div>
                {/* Front packet */}
                <div className="transform rotate-6 -translate-x-4 z-10 shadow-2xl">
                  <ChipasBagIllustration product={PRODUCTS[5]} size="md" interactive={false} />
                </div>
              </div>
            </div>

          </div>

          {/* Highlights Metrics Ticker Strip */}
          <div className="pt-6 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-0.5">
              <div className="text-2xl font-black text-[#FBBF24] font-display">85+ Outlets</div>
              <div className="text-[11px] text-amber-100/70 font-semibold">Campus & Gourmet Shelves</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-2xl font-black text-[#FBBF24] font-display">10-Min Express</div>
              <div className="text-[11px] text-amber-100/70 font-semibold">Blinkit & Zepto Delivery</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-2xl font-black text-[#FBBF24] font-display">6 Flavours</div>
              <div className="text-[11px] text-amber-100/70 font-semibold">Authentic Regional Lineup</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-2xl font-black text-[#FBBF24] font-display">Zero Palm Oil</div>
              <div className="text-[11px] text-amber-100/70 font-semibold">Clean High-Oleic Sunflower</div>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------- 2. CAMPUS TUCK SHOPS & STUDENT HUBS (Rich Color Section) ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#8B1E29]">
              <GraduationCap className="w-4 h-4 text-[#8B1E29]" />
              <span>Campus Canteen Drops</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display mt-1">
              Popular College & University Hubs
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Find fresh CHIPAS packets stocked directly at your campus tuck shop, co-op canteens, and student lounges.
            </p>
          </div>

          <button
            onClick={onOpenContact}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#8B1E29] bg-amber-100/70 hover:bg-amber-200/80 transition-colors border border-amber-300 shrink-0 self-start sm:self-auto cursor-pointer"
          >
            + Request Your College Campus
          </button>
        </div>

        {/* 6 Campus Hub Cards with Distinct Color Borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAMPUS_HUBS.map((hub, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border-2 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-3"
              style={{ borderColor: `${hub.color}40` }}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded text-white"
                    style={{ backgroundColor: hub.color }}
                  >
                    {hub.stockTag}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">
                    {hub.city}
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-900 font-display mt-2.5">
                  {hub.campus}
                </h3>
                <p className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#8B1E29] shrink-0" />
                  <span>{hub.spot}</span>
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Top Seller:</span>
                  <strong className="text-slate-800 text-[11px]">{hub.topFlavour}</strong>
                </div>
                <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Ready on Campus
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- 3. STORE RADAR & LISTING SPLIT (Vibrant & High-Contrast) ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#8B1E29]">
              Verified Physical Shelves
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              Store Directory & Shelf Inventory
            </h2>
          </div>
          <div className="text-xs font-bold text-slate-500">
            Showing <strong className="text-slate-900 tabular-nums">{filteredStores.length}</strong> Outlets
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Interactive Store Cards */}
          <div className="lg:col-span-5 space-y-3 max-h-[660px] overflow-y-auto pr-1">
            {filteredStores.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-3xl border border-dashed border-slate-300 space-y-3">
                <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900">No stores found in this area yet</h4>
                <p className="text-xs text-slate-500">
                  Try another city or request a stock drop at your campus!
                </p>
                <button
                  onClick={onOpenContact}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-[#FBBF24] hover:bg-[#F59E0B] transition-colors cursor-pointer"
                >
                  Request Stocking Here
                </button>
              </div>
            ) : (
              filteredStores.map((store) => {
                const isSelected = selectedStore?.id === store.id;
                return (
                  <div
                    key={store.id}
                    onClick={() => setSelectedStore(store)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#8B1E29] bg-white ring-4 ring-[#8B1E29]/15 shadow-xl scale-[1.01]'
                        : 'border-slate-200 bg-white hover:border-amber-400 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-950 bg-[#FBBF24] px-2.5 py-0.5 rounded shadow-xs">
                          {store.chain}
                        </span>
                        <h4 className="text-base font-black text-slate-900 font-display mt-1.5">
                          {store.name}
                        </h4>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
                        {store.stockStatus}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-2 flex items-start gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#8B1E29] shrink-0 mt-0.5" />
                      <span>{store.address}, PIN {store.pincode}</span>
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-amber-700" />
                        <span>{store.hours}</span>
                      </span>

                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(store.name + ' ' + store.address)}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="font-black text-[#8B1E29] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Directions</span>
                        <Navigation className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: High-Contrast Illuminated Digital Store Radar */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#1E0B10] via-[#2A0E15] to-[#140508] text-white rounded-3xl border-2 border-[#8B1E29] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl min-h-[500px]">
            
            {/* Top Bar on Radar */}
            <div className="relative z-10 flex items-center justify-between bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FBBF24] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FBBF24]"></span>
                </span>
                <span className="text-xs font-black uppercase tracking-wider text-[#FBBF24]">
                  Live Store Radar
                </span>
              </div>
              <span className="text-xs text-amber-100/80 font-bold truncate max-w-[200px]">
                {selectedStore?.name || 'Tap a store'}
              </span>
            </div>

            {/* Radar Center with glowing animated rings */}
            <div className="relative z-10 my-6 flex items-center justify-center">
              <div className="relative w-full max-w-sm aspect-[4/3] rounded-2xl border border-[#FBBF24]/30 bg-black/30 p-6 flex flex-col items-center justify-center">
                
                {/* Glowing Concentric Distance Circles */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-64 rounded-full border border-[#FBBF24]/20 animate-pulse" />
                  <div className="w-48 h-48 rounded-full border border-red-500/25" />
                  <div className="w-32 h-32 rounded-full border border-amber-400/40" />
                  <div className="w-16 h-16 rounded-full border border-[#FBBF24]/60" />
                </div>

                {/* Selected Active Store Pin */}
                {selectedStore && (
                  <div className="relative z-20 flex flex-col items-center text-center animate-bounce">
                    <div className="w-11 h-11 rounded-full bg-[#FBBF24] text-slate-950 flex items-center justify-center shadow-xl border-2 border-white font-black">
                      <MapPin className="w-6 h-6 text-slate-950" />
                    </div>
                    <div className="mt-2.5 bg-white text-slate-950 px-3.5 py-1.5 rounded-xl shadow-2xl border border-slate-200 text-xs font-black whitespace-nowrap">
                      {selectedStore.name}
                      <span className="block text-[10px] text-[#8B1E29] font-bold">{selectedStore.city}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Active Store Shelf Flavour Preview Bar */}
            {selectedStore && (
              <div className="relative z-10 bg-white text-slate-900 p-4 sm:p-5 rounded-2xl border border-white/20 shadow-2xl space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <div>
                    <h4 className="text-sm font-black text-slate-900 font-display">
                      {selectedStore.name}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {selectedStore.address} · <span className="text-emerald-700 font-bold">{selectedStore.stockStatus}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${selectedStore.phone}`}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center gap-1 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#8B1E29]" />
                      <span>Call</span>
                    </a>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(selectedStore.name + ' ' + selectedStore.address)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-1.5 rounded-xl text-xs font-black uppercase text-slate-950 bg-[#FBBF24] hover:bg-[#F59E0B] flex items-center gap-1 transition-colors shadow-sm"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Directions</span>
                    </a>
                  </div>
                </div>

                {/* Available Flavours Chips Pills with Pack Colors */}
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                    Flavours Confirmed In Stock on Shelf:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedStore.flavorsAvailable.map((flavour, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-50 text-[#8B1E29] border border-amber-200 flex items-center gap-1"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#8B1E29]" />
                        <span>{flavour}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </section>

      {/* ---------------- 2. INTERACTIVE METRO DISTRIBUTION MAP ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <InteractiveStoreMap />
      </section>

      <BrandDivider variant="wave" color="#E7DECB" />

      {/* ---------------- SECTION: OFFICIAL RETAIL & CAMPUS PAMPHLETS (MADE BY 25BA104) ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 md:p-12 border-2 border-[#E7DECB] shadow-xl space-y-10">
          
          {/* Header with prominent Made by 25BA104 designation */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8DEC8]">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-[#8B1E29] text-[#FBBF24] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-xs">
                  <FileText className="w-3.5 h-3.5" />
                  Campus Canteen & Retail Posters
                </span>
                <span className="inline-flex items-center gap-1 bg-[#FBBF24] text-slate-950 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-xs border border-amber-300">
                  Made by 25BA104
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-display tracking-tight text-balance">
                Official Retail & Campus Posters
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-body">
                Official retail promotional artwork, campus canteen posters, and snacking guides displayed across stores and college tuck shops. Authored and designed by roll number <strong className="text-[#8B1E29] font-black underline decoration-[#FBBF24] decoration-2">25BA104</strong>. Click any poster below to inspect the artwork in high resolution.
              </p>
            </div>

            {/* Author Credit Badge */}
            <div className="bg-gradient-to-br from-[#8B1E29] to-[#5C0D15] text-white p-5 rounded-2xl border-2 border-[#FBBF24] shrink-0 text-center md:text-right shadow-lg flex flex-col justify-center">
              <div className="text-[11px] uppercase tracking-wider text-[#FBBF24] font-black">
                Where to Buy Page Curator & Designer
              </div>
              <div className="text-3xl font-black font-display text-white mt-0.5 tracking-tight">
                Made by 25BA104
              </div>
              <div className="text-xs text-amber-100/80 font-semibold mt-1">
                Roll No. 25BA104 · CHIPAS Retail Edition
              </div>
            </div>
          </div>

          {/* 2 Posters Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {WHERE_TO_BUY_PAMPHLETS.map((pamphlet, index) => (
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
                        Click to view full poster
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
                      Author: <span className="text-[#8B1E29] font-bold">25BA104</span>
                    </span>

                    <button
                      onClick={() => setSelectedPamphletIndex(index)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#FAF7F0] hover:bg-[#FBBF24] text-slate-900 hover:text-slate-950 text-xs font-black uppercase tracking-wider transition-all border border-[#E0D4BD] hover:border-amber-400 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Inspect Poster</span>
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
                Official Campus Print & Retail Posters · Created by <strong className="text-[#8B1E29]">Roll No. 25BA104</strong>
              </span>
            </div>
            <div className="text-xs font-bold text-slate-600">
              High-resolution digital campaign assets embedded directly on Where to Buy
            </div>
          </div>

        </div>
      </section>

      {/* ---------------- OFFICIAL ADVERTISEMENT VIDEO: CAMPUS COMMUTE & TUCK SHOPS ---------------- */}
      <BrandCommercialVideo
        badgeText="Official Commercial · Campus Canteen & Retail Edition"
        titlePrefix="From Class to Canteen: "
        titleHighlight="Snack Smarter."
        description="Watch our official commercial filmed right across college corridors and campus spots where CHIPAS is stocked daily — zero palm oil, real crunch, and no messy fingers during study sessions."
        buttonText={onSelectProduct ? "Shop Classic Salted Featured In Video" : undefined}
        onButtonClick={onSelectProduct ? () => onSelectProduct(PRODUCTS[5]) : undefined}
      />

      {/* ---------------- 4. ONLINE QUICK COMMERCE PARTNERS (Rich Colored Tiles) ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#8B1E29]">
            <Zap className="w-4 h-4 text-[#8B1E29]" />
            <span>10-Minute Doorstep Dispatch</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            Order Online via Quick Commerce
          </h2>
          <p className="text-xs text-slate-600">
            Cravings strike at any hour. Tap our authorized quick commerce partners for express delivery right to your door.
          </p>
        </div>

        {/* 4 Rich Colorful Brand Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ONLINE_PARTNERS.map((partner, idx) => (
            <div
              key={idx}
              className="rounded-3xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-5 border-2 text-white"
              style={{
                backgroundColor: partner.name === 'Blinkit' ? '#F4C430' : partner.color,
                borderColor: partner.name === 'Blinkit' ? '#B45309' : partner.color,
                color: partner.name === 'Blinkit' ? '#1E1B18' : '#FFFFFF'
              }}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs ${
                      partner.name === 'Blinkit'
                        ? 'bg-black text-[#F4C430]'
                        : 'bg-white/20 text-white'
                    }`}
                  >
                    {partner.badge}
                  </span>
                  <span
                    className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
                      partner.name === 'Blinkit'
                        ? 'bg-amber-100 text-amber-950'
                        : 'bg-white/20 text-white'
                    }`}
                  >
                    {partner.deliveryTime}
                  </span>
                </div>

                <h3 className="text-2xl font-black font-display mt-4">
                  {partner.name}
                </h3>
                <p
                  className={`text-xs mt-1 font-medium ${
                    partner.name === 'Blinkit' ? 'text-slate-800' : 'text-white/80'
                  }`}
                >
                  {partner.tagline}
                </p>
              </div>

              <div
                className={`pt-4 border-t flex items-center justify-between ${
                  partner.name === 'Blinkit' ? 'border-black/10' : 'border-white/20'
                }`}
              >
                <span
                  className={`text-[10px] font-semibold ${
                    partner.name === 'Blinkit' ? 'text-slate-700' : 'text-white/70'
                  }`}
                >
                  {partner.popularIn}
                </span>
                
                {/* Order Button */}
                <a
                  href={partner.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`px-4 py-2 rounded-xl font-black text-xs uppercase flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                    partner.name === 'Blinkit'
                      ? 'bg-[#8B1E29] text-white hover:bg-[#5C0D15]'
                      : 'bg-[#FBBF24] text-slate-950 hover:bg-[#F59E0B]'
                  }`}
                >
                  <span>Order Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <BrandDivider variant="zigzag" color="#FBBF24" />

      {/* ---------------- 5. REGIONAL METRO COVERAGE & CITY EXPANSION ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#8B1E29]">
              <Truck className="w-4 h-4 text-[#8B1E29]" />
              <span>National Distribution Footprint</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display mt-1">
              Active Cities & Expansion Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Fresh kettle batches dispatch every 48 hours from our regional distribution hubs to over 250+ quick commerce dark stores and retail shelves.
            </p>
          </div>
          <span className="text-xs font-black bg-[#8B1E29] text-[#FBBF24] px-3.5 py-1.5 rounded-xl">
            6 Active Metros · 4 Launching Soon
          </span>
        </div>

        {/* Active Metro Coverage Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              city: 'Delhi NCR',
              hubs: '38+ Stores & Campus Tucks',
              areas: 'North Campus, Connaught Place, Cyber Hub, GK-1, Hauz Khas',
              delivery: 'Blinkit & Zepto in 8–10 mins',
              accent: 'border-[#8B1E29] bg-gradient-to-br from-rose-50 to-white',
              pill: 'bg-[#8B1E29] text-[#FBBF24]'
            },
            {
              city: 'Mumbai',
              hubs: '22+ Gourmet Marts & Hostels',
              areas: 'Bandra West, Powai (IIT-B), Lower Parel, Fort, Juhu',
              delivery: 'Zepto, Blinkit & Instamart',
              accent: 'border-amber-400 bg-gradient-to-br from-amber-50 to-white',
              pill: 'bg-amber-600 text-white'
            },
            {
              city: 'Bengaluru',
              hubs: '19+ Tech Parks & Campuses',
              areas: 'Indiranagar, Koramangala, Hosur Rd, Bannerghatta Rd',
              delivery: '24/7 Dark Store Express',
              accent: 'border-emerald-400 bg-gradient-to-br from-emerald-50 to-white',
              pill: 'bg-emerald-700 text-white'
            },
            {
              city: 'Kolkata',
              hubs: '12+ Retail & Street Hubs',
              areas: 'Park Street, Salt Lake, Ballygunge, Jadavpur',
              delivery: 'Blinkit & Spencer’s Retail',
              accent: 'border-orange-400 bg-gradient-to-br from-orange-50 to-white',
              pill: 'bg-orange-600 text-white'
            },
            {
              city: 'Ahmedabad',
              hubs: '9+ Farsan Marts & Campuses',
              areas: 'Vastrapur, SG Highway, Navrangpura',
              delivery: 'Instamart & Campus Marts',
              accent: 'border-sky-400 bg-gradient-to-br from-sky-50 to-white',
              pill: 'bg-sky-700 text-white'
            },
            {
              city: 'Kochi',
              hubs: '8+ Coastal Outlets',
              areas: 'Panampilly Nagar, Edappally, Kakkanad',
              delivery: 'Lulu Express & Instamart',
              accent: 'border-teal-400 bg-gradient-to-br from-teal-50 to-white',
              pill: 'bg-teal-700 text-white'
            }
          ].map((zone) => (
            <div
              key={zone.city}
              onClick={() => {
                setSelectedCity(zone.city);
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
              className={`rounded-2xl border-2 p-5 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3 ${zone.accent}`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-black text-slate-900 font-display">{zone.city}</h3>
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${zone.pill}`}>
                  Live Now
                </span>
              </div>
              <div className="text-xs font-bold text-[#8B1E29]">{zone.hubs}</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Key Areas:</strong> {zone.areas}
              </p>
              <div className="pt-2 border-t border-black/5 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>⚡ {zone.delivery}</span>
                <span className="text-[#8B1E29] hover:underline">Filter Stores →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming City Expansion Voting Strip */}
        <div className="bg-[#5C0D15] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#FBBF24] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-[#FBBF24]">
                Next City Rollout · Vote to Prioritize
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-display text-white">
                Where Should Chippas Land Next?
              </h3>
            </div>
            <span className="text-xs text-amber-100/80">
              Cities with the most campus votes launch first in Q1 2027
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Pune', eta: 'Launching Dec 2026', baseVotes: 2410 },
              { name: 'Hyderabad', eta: 'Launching Jan 2027', baseVotes: 2180 },
              { name: 'Chandigarh', eta: 'Launching Jan 2027', baseVotes: 1640 },
              { name: 'Jaipur', eta: 'Launching Feb 2027', baseVotes: 1395 }
            ].map((city) => {
              const hasVoted = !!cityVotes[city.name];
              return (
                <div
                  key={city.name}
                  className="bg-black/30 rounded-2xl p-4 border border-white/15 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="text-base font-black text-white font-display">{city.name}</div>
                    <div className="text-[11px] text-[#FBBF24] font-semibold">{city.eta}</div>
                  </div>
                  <button
                    onClick={() => handleToggleCityVote(city.name)}
                    className={`w-full py-2 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
                      hasVoted
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950'
                    }`}
                  >
                    {hasVoted ? <Check className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                    <span>{hasVoted ? 'Voted!' : 'Vote'} ({(city.baseVotes + (hasVoted ? 1 : 0)).toLocaleString()})</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- 6. BULK ORDERS, HOSTEL CRATES & EVENT STALLS ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#8B1E29]">
            <Package className="w-4 h-4 text-[#8B1E29]" />
            <span>Direct From Kettle · Bulk & Event Supply</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display mt-1">
            Hostel Crates, College Fests & Office Pantries
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Stocking up for an entire hostel floor, annual cultural fest, or startup snack shelf? Order factory-fresh cartons directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Hostel Floor Crate',
              packs: '24 × 60g Packs (Mix Any Flavour)',
              price: '₹420 (Save 12%)',
              perks: ['Free campus corridor delivery', 'Custom flavour assortment', 'Fresh 48-hour kettle batch'],
              badge: 'Student Special',
              color: 'from-[#8B1E29] to-[#5C0D15]'
            },
            {
              title: 'College Fest Tasting Stall',
              packs: '120+ Packs + Branded Booth',
              price: 'Custom Campus Grant',
              perks: ['Free Chippas grabber dispensers', 'On-ground event sponsorship kit', 'Dedicated student coordinator'],
              badge: 'Fests & Clubs',
              color: 'from-[#1A4329] to-[#112A1A]'
            },
            {
              title: 'Office & Startup Pantry Box',
              packs: '48 × 60g Packs / Bi-Weekly',
              price: '₹840 / Box (GST Invoice)',
              perks: ['Zero palm oil wellness upgrade', 'Keeps coding keyboards clean', 'Monthly auto-replenish option'],
              badge: 'B2B Office Supply',
              color: 'from-[#1E3A8A] to-[#172554]'
            }
          ].map((pkg) => (
            <div
              key={pkg.title}
              className={`bg-gradient-to-br ${pkg.color} text-white rounded-3xl p-6 sm:p-7 border-2 border-[#FBBF24]/50 shadow-lg flex flex-col justify-between space-y-5`}
            >
              <div className="space-y-3">
                <span className="inline-block bg-[#FBBF24] text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  {pkg.badge}
                </span>
                <h3 className="text-xl font-black font-display text-white">{pkg.title}</h3>
                <div className="text-xs font-bold text-amber-200">{pkg.packs}</div>
                <ul className="space-y-1.5 pt-2 border-t border-white/15 text-xs text-amber-50/90">
                  {pkg.perks.map((perk, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FBBF24] shrink-0" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-3">
                <span className="text-sm font-black text-[#FBBF24]">{pkg.price}</span>
                <a
                  href="#stockist-form"
                  className="px-4 py-2 rounded-xl bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950 font-black text-xs uppercase tracking-wider shadow-sm transition-colors"
                >
                  Request Crate
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- 7. CAMPUS LAUNCHES & RESTOCK CALENDAR ---------------- */}
      <EventsCalendar />

      <BrandDivider variant="dots" color="#8B1E29" />

      {/* ---------------- 8. INTERACTIVE STOCKIST & CAMPUS TUCK SHOP ENQUIRY FORM ---------------- */}
      <section id="stockist-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#FFFDF9] to-[#FAF3E3] rounded-3xl p-6 sm:p-10 md:p-12 border-2 border-[#8B1E29] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side Pitch */}
          <div className="lg:col-span-5 space-y-5">
            <span className="inline-flex items-center gap-1.5 bg-[#8B1E29] text-[#FBBF24] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>Retail & Campus Partnership</span>
            </span>

            <h3 className="text-2xl sm:text-4xl font-black font-display text-slate-900 leading-tight">
              Stock CHIPAS on Your Shelves or Canteen
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-body">
              Whether you manage a college tuck shop, gourmet supermarket, local kirana, or corporate cafeteria, we offer high retail margins, free counter display racks, and zero-risk stock rotation.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-800 font-semibold">
              <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-[#E7DECB]">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>28%–35% Retail Margin + Zero Unsold Risk</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-[#E7DECB]">
                <Truck className="w-4 h-4 text-[#8B1E29] shrink-0" />
                <span>48-Hour Direct Dispatch from Regional Hubs</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-[#E7DECB]">
                <GraduationCap className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Campus Representative Program for Students</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenContact}
              className="text-xs font-black text-[#8B1E29] underline hover:text-[#5C0D15] cursor-pointer"
            >
              Or open quick message modal →
            </button>
          </div>

          {/* Right Side Interactive Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#E7DECB] shadow-md">
            {partnerSubmitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto font-black text-2xl">
                  ✓
                </div>
                <h4 className="text-2xl font-black font-display text-slate-900">
                  Partnership Request Received!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you! Our distribution lead (<strong>25BA104</strong>) will reach out to{' '}
                  <strong className="text-[#8B1E29]">{partnerForm.contactEmail}</strong> within 24 hours for{' '}
                  <strong>{partnerForm.outletName}</strong> ({partnerForm.city}).
                </p>
                <div className="inline-block bg-[#FAF7F0] border border-[#E0D4BD] px-4 py-1.5 rounded-lg text-xs font-mono font-bold text-slate-800">
                  Ref ID: CHP-RTL-{Math.floor(1000 + Math.random() * 9000)}
                </div>
                <div>
                  <button
                    onClick={() => {
                      setPartnerSubmitted(false);
                      setPartnerForm({
                        outletName: '',
                        city: '',
                        outletType: 'Campus Tuck Shop',
                        monthlyVolume: '2–5 Cartons (48–120 packs)',
                        contactEmail: '',
                        phone: ''
                      });
                    }}
                    className="mt-2 px-5 py-2 rounded-xl bg-[#8B1E29] text-white text-xs font-bold cursor-pointer"
                  >
                    Submit Another Outlet
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePartnerSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1">
                      Store / Campus Name *
                    </label>
                    <input
                      type="text"
                      value={partnerForm.outletName}
                      onChange={(e) => setPartnerForm({ ...partnerForm, outletName: e.target.value })}
                      placeholder="e.g. Hansraj Co-op Tuck Shop"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-[#8B1E29]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1">
                      City & PIN Code *
                    </label>
                    <input
                      type="text"
                      value={partnerForm.city}
                      onChange={(e) => setPartnerForm({ ...partnerForm, city: e.target.value })}
                      placeholder="e.g. Pune · 411004"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-[#8B1E29]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1">
                      Outlet Category
                    </label>
                    <select
                      value={partnerForm.outletType}
                      onChange={(e) => setPartnerForm({ ...partnerForm, outletType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 bg-white focus:outline-hidden focus:border-[#8B1E29]"
                    >
                      <option>Campus Tuck Shop</option>
                      <option>Supermarket / Gourmet Mart</option>
                      <option>Hostel Floor / Student Fest</option>
                      <option>Corporate Office Pantry</option>
                      <option>Kirana / General Store</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1">
                      Estimated Order Size
                    </label>
                    <select
                      value={partnerForm.monthlyVolume}
                      onChange={(e) => setPartnerForm({ ...partnerForm, monthlyVolume: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 bg-white focus:outline-hidden focus:border-[#8B1E29]"
                    >
                      <option>1 Hostel Crate (24 packs)</option>
                      <option>2–5 Cartons (48–120 packs)</option>
                      <option>5–20 Cartons (Retail Outlet)</option>
                      <option>20+ Cartons (Distributor / Fest)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      value={partnerForm.contactEmail}
                      onChange={(e) => setPartnerForm({ ...partnerForm, contactEmail: e.target.value })}
                      placeholder="buyer@campus.edu.in"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-[#8B1E29]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={partnerForm.phone}
                      onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                      placeholder="+91 98XXX XXXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-[#8B1E29]"
                    />
                  </div>
                </div>

                {partnerError && (
                  <p className="text-xs font-bold text-rose-600">{partnerError}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all border border-amber-300"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Retail / Campus Request</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      <BrandDivider variant="wave" color="#E7DECB" />

      {/* ---------------- 7. RETAIL & DISTRIBUTION FAQS ACCORDION ---------------- */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#8B1E29]">
            Retailer & Partner Help
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            Distribution & Logistics FAQs
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Everything you need to know about Quick Commerce fulfillment, shelf stocking, and campus partnerships.
          </p>
        </div>

        <Accordion
          items={RETAILER_FAQS}
          defaultOpenIds={['faq-dispatch']}
          allowMultiple={true}
        />
      </section>

      {/* ---------------- LIGHTBOX MODAL FOR PAMPHLETS (MADE BY 25BA104) ---------------- */}
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
                  {WHERE_TO_BUY_PAMPHLETS[selectedPamphletIndex].badge}
                </span>
                <span className="text-white font-bold text-sm sm:text-base truncate font-display">
                  {WHERE_TO_BUY_PAMPHLETS[selectedPamphletIndex].title}
                </span>
                <span className="hidden sm:inline-block bg-black/40 text-[#FBBF24] border border-[#FBBF24]/40 font-black text-xs px-2.5 py-0.5 rounded-md shrink-0">
                  Made by 25BA104
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={WHERE_TO_BUY_PAMPHLETS[selectedPamphletIndex].image}
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
                src={WHERE_TO_BUY_PAMPHLETS[selectedPamphletIndex].image}
                alt={`${WHERE_TO_BUY_PAMPHLETS[selectedPamphletIndex].title} - Made by 25BA104`}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl mx-auto"
              />

              {/* Prev / Next Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPamphletIndex((prev) =>
                    prev !== null ? (prev - 1 + WHERE_TO_BUY_PAMPHLETS.length) % WHERE_TO_BUY_PAMPHLETS.length : 0
                  );
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-[#FBBF24] text-white hover:text-slate-950 transition-all border border-white/20 shadow-lg cursor-pointer"
                title="Previous Poster"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPamphletIndex((prev) =>
                    prev !== null ? (prev + 1) % WHERE_TO_BUY_PAMPHLETS.length : 0
                  );
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-[#FBBF24] text-white hover:text-slate-950 transition-all border border-white/20 shadow-lg cursor-pointer"
                title="Next Poster"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#1C1917] px-4 sm:px-6 py-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-black text-[#FBBF24] uppercase tracking-wider">
                  Official Collateral · Made by 25BA104
                </span>
                <span className="text-slate-400 hidden sm:inline">
                  {WHERE_TO_BUY_PAMPHLETS[selectedPamphletIndex].headline}
                </span>
              </div>

              {/* Quick switcher dots */}
              <div className="flex items-center gap-1.5">
                {WHERE_TO_BUY_PAMPHLETS.map((p, idx) => (
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
