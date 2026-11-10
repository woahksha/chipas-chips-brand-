import React, { useState } from 'react';
import { SAMPLE_STORES, ONLINE_PARTNERS } from '../data/stores';
import { StoreLocation } from '../types';
import { Search, MapPin, Navigation, Phone, Clock, AlertCircle, ArrowUpRight } from 'lucide-react';

interface WhereToBuyPageProps {
  onOpenContact: () => void;
}

export const WhereToBuyPage: React.FC<WhereToBuyPageProps> = ({ onOpenContact }) => {
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

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-10 space-y-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* ---------------- 1. FUNCTIONAL HEADER ---------------- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#8B1E29] mb-1">
              <span>Retail Availability & Quick Commerce</span>
              <span aria-hidden="true">·</span>
              <span>Store Finder</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight">
              Find your <span className="text-[#8B1E29]">crunch.</span>
            </h1>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              Your favourite CHIPAS flavour might be closer than you think. Locate physical store shelves or get 10-minute instant delivery.
            </p>
          </div>

          <div className="px-3 py-1.5 bg-amber-50 rounded-xl border border-amber-200 text-xs font-bold text-amber-900 shrink-0">
            📍 Clearly Labelled Sample Store Directory
          </div>
        </div>

        {/* ---------------- 2. SEARCH UTILITY BAR ---------------- */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter area, university campus, or 6-digit PIN code (e.g. 110007, Bandra, Koramangala)..."
                className="w-full text-xs sm:text-sm pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B1E29]"
              />
            </div>
            
            {/* Signature Yellow Search CTA */}
            <button
              type="submit"
              className="px-7 py-3 rounded-xl font-black text-xs uppercase tracking-wider text-slate-950 bg-[#FBBF24] hover:bg-[#F59E0B] transition-all shadow-sm active:scale-95 cursor-pointer border border-amber-300"
            >
              Search Shelves
            </button>
          </form>

          {/* Quick city pill tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
            <span className="font-bold text-slate-500 mr-1">Filter by City:</span>
            {quickCities.map((city) => (
              <button
                key={city}
                onClick={() => {
                  setSelectedCity(city);
                  setSearchQuery('');
                }}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  selectedCity === city
                    ? 'bg-[#8B1E29] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* ---------------- 3. STORE RADAR & LISTING SPLIT ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Functional Store Cards */}
          <div className="lg:col-span-5 space-y-3 max-h-[620px] overflow-y-auto pr-1">
            <div className="text-xs font-bold text-slate-500 flex items-center justify-between pb-1">
              <span>{filteredStores.length} Verified Retail Stockists</span>
              <span>Live Inventory</span>
            </div>

            {filteredStores.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300 space-y-3">
                <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900">No stores found in this area yet</h4>
                <p className="text-xs text-slate-500">
                  We are expanding rapidly across campuses and metros!
                </p>
                <button
                  onClick={onOpenContact}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-[#FBBF24] hover:bg-[#F59E0B] transition-colors"
                >
                  Request Stocking at Your Campus
                </button>
              </div>
            ) : (
              filteredStores.map((store) => {
                const isSelected = selectedStore?.id === store.id;
                return (
                  <div
                    key={store.id}
                    onClick={() => setSelectedStore(store)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#8B1E29] bg-white ring-2 ring-[#8B1E29]/20 shadow-md'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#8B1E29] bg-amber-50 px-2 py-0.5 rounded">
                          {store.chain}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 font-display mt-1">
                          {store.name}
                        </h4>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                        {store.stockStatus}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-2 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#8B1E29] shrink-0 mt-0.5" />
                      <span>{store.address}, PIN {store.pincode}</span>
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{store.hours}</span>
                      </span>

                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(store.name + ' ' + store.address)}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="font-bold text-[#8B1E29] hover:underline flex items-center gap-0.5"
                      >
                        <span>Directions</span>
                        <Navigation className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Clean Map Radar Interface */}
          <div className="lg:col-span-7 bg-[#EFEADB] rounded-3xl border border-[#DFD5C0] p-6 flex flex-col justify-between relative overflow-hidden min-h-[460px]">
            <div className="relative z-10 flex items-center justify-between bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-900">
                  Interactive Store Radar
                </span>
              </div>
              <span className="text-[11px] text-slate-500">
                Selected: {selectedStore?.name || 'Tap a store'}
              </span>
            </div>

            {/* Radar Center */}
            <div className="relative z-10 my-8 flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-[4/3] bg-gradient-to-b from-[#FAF7F0] to-[#EAE3D2] rounded-2xl border border-[#D5C9AF] shadow-inner p-6 flex flex-col items-center justify-center">
                
                {/* Concentric distance circles */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-64 rounded-full border border-amber-300/60" />
                  <div className="w-48 h-48 rounded-full border border-amber-400/40" />
                  <div className="w-32 h-32 rounded-full border border-red-300/30" />
                </div>

                {selectedStore && (
                  <div className="relative z-20 flex flex-col items-center text-center animate-bounce">
                    <div className="w-10 h-10 rounded-full bg-[#8B1E29] text-[#FBBF24] flex items-center justify-center shadow-lg border-2 border-white">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="mt-2 bg-white px-3 py-1.5 rounded-xl shadow-lg border border-slate-200 text-xs font-bold text-slate-900 whitespace-nowrap">
                      {selectedStore.name}
                      <span className="block text-[10px] text-[#8B1E29] font-semibold">{selectedStore.city}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom active store details bar */}
            {selectedStore && (
              <div className="relative z-10 bg-white p-4 rounded-2xl border border-slate-200 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-slate-900">{selectedStore.name}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{selectedStore.address}</div>
                  <div className="text-[10px] text-emerald-800 font-semibold mt-1">
                    ✓ Available: {selectedStore.flavorsAvailable.join(', ')}
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href={`tel:${selectedStore.phone}`}
                    className="flex-1 sm:flex-none px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center justify-center gap-1 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(selectedStore.name + ' ' + selectedStore.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-black uppercase text-slate-950 bg-[#FBBF24] hover:bg-[#F59E0B] flex items-center justify-center gap-1 transition-colors shadow-xs"
                  >
                    <Navigation className="w-3.5 h-3.5 text-slate-950" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* ---------------- 4. ONLINE QUICK COMMERCE PARTNERS ---------------- */}
        <section className="space-y-6 pt-6">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-[#8B1E29]">
              10-Minute Instant Dispatch
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              Order Online via Quick Commerce
            </h2>
            <p className="text-xs text-slate-600">
              Get CHIPAS delivered right to your dorm, office, or home in under 15 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ONLINE_PARTNERS.map((partner, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-black px-2.5 py-1 rounded-md"
                      style={{ backgroundColor: `${partner.color}20`, color: partner.color }}
                    >
                      {partner.badge}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {partner.deliveryTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 font-display mt-3">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {partner.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    {partner.popularIn}
                  </span>
                  
                  {/* Signature Yellow Order Button */}
                  <a
                    href={partner.link}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-xl font-black text-xs uppercase text-slate-950 bg-[#FBBF24] hover:bg-[#F59E0B] flex items-center gap-1 transition-colors shadow-xs"
                  >
                    <span>Order</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- 5. FINAL INQUIRY BANNER ---------------- */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 text-center space-y-4">
          <h3 className="text-2xl font-black text-slate-900 font-display">
            Can't find CHIPAS near you?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Tell us your campus, hostel, or neighborhood supermarket. We onboard retail partners directly based on snack cravings!
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenContact}
              className="px-7 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider text-slate-950 bg-[#FBBF24] hover:bg-[#F59E0B] shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer border border-amber-300"
            >
              Get In Touch With Us
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
