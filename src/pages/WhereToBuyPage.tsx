import React, { useState } from 'react';
import { SAMPLE_STORES, ONLINE_PARTNERS, CAMPUS_HUBS } from '../data/stores';
import { PRODUCTS } from '../data/products';
import { StoreLocation, Product } from '../types';
import { ChipasBagIllustration } from '../components/ChipasBagIllustration';
import { Search, MapPin, Navigation, Phone, Clock, AlertCircle, ArrowUpRight, GraduationCap, Zap, CheckCircle2, ShoppingBag, Store } from 'lucide-react';

interface WhereToBuyPageProps {
  onOpenContact: () => void;
  onSelectProduct?: (product: Product) => void;
}

export const WhereToBuyPage: React.FC<WhereToBuyPageProps> = ({ onOpenContact, onSelectProduct }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedStore, setSelectedStore] = useState<StoreLocation | null>(SAMPLE_STORES[0]);

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

      {/* ---------------- 5. VIBRANT RED & YELLOW PARTNERSHIP BANNER ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#5C0D15] via-[#8B1E29] to-[#6B111A] text-white rounded-3xl p-8 sm:p-12 border-4 border-[#FBBF24] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-black uppercase tracking-widest text-[#FBBF24]">
              Campus Ambassadors & Retail Outlets
            </span>
            <h3 className="text-2xl sm:text-4xl font-black font-display text-white">
              Want CHIPAS stocked at your college or store?
            </h3>
            <p className="text-xs sm:text-sm text-amber-100/90 max-w-xl leading-relaxed">
              We partner directly with university tuck shops, college student councils, supermarket buyers, and local grocers. Let's get the crunch on your shelves!
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onOpenContact}
              className="px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-wider text-slate-950 bg-[#FBBF24] hover:bg-[#F59E0B] shadow-xl hover:shadow-2xl transition-all active:scale-95 cursor-pointer border border-amber-300"
            >
              Get In Touch With Team
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
