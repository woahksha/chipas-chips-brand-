import React, { useState } from 'react';
import { MapPin, Navigation, Phone, Clock, CheckCircle2, AlertCircle, Search, Compass, Store, ShoppingCart, ExternalLink } from 'lucide-react';

interface StoreLocation {
  id: string;
  name: string;
  city: 'Delhi NCR' | 'Mumbai' | 'Bengaluru' | 'Kolkata' | 'Ahmedabad' | 'Pune';
  type: 'Campus Tuck Shop' | 'Supermarket' | 'Quick Commerce Hub' | 'Heritage Kirana';
  address: string;
  pincode: string;
  phone: string;
  hours: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Restocking Today';
  stockMessage: string;
  flavoursAvailable: string[];
  coordinates: { x: number; y: number }; // Percentage for interactive map illustration
}

const STORES: StoreLocation[] = [
  // Delhi NCR
  {
    id: 'store-del-1',
    name: 'SRCC Central Student Mart & Tuck Shop',
    city: 'Delhi NCR',
    type: 'Campus Tuck Shop',
    address: 'University Enclave, North Campus, Delhi',
    pincode: '110007',
    phone: '+91 98110 24890',
    hours: '8:30 AM – 8:00 PM',
    stockStatus: 'In Stock',
    stockMessage: 'Fresh morning delivery · All 6 flavours available',
    flavoursAvailable: ['Classic Salted', 'Gujarat Khatta Meetha', 'Tangy Tomato Masala', 'Bengal Kasundi'],
    coordinates: { x: 38, y: 28 }
  },
  {
    id: 'store-del-2',
    name: 'Nature’s Basket Premium Retail',
    city: 'Delhi NCR',
    type: 'Supermarket',
    address: 'DLF Promenade Mall, Vasant Kunj, New Delhi',
    pincode: '110070',
    phone: '+91 11 4056 7890',
    hours: '10:00 AM – 10:00 PM',
    stockStatus: 'In Stock',
    stockMessage: 'Full shelf stock · 60g & 150g party packs',
    flavoursAvailable: ['All 6 Signature Packs'],
    coordinates: { x: 40, y: 31 }
  },
  {
    id: 'store-del-3',
    name: 'Blinkit Dark Store Hub #104',
    city: 'Delhi NCR',
    type: 'Quick Commerce Hub',
    address: 'Sector 29, Gurugram, Haryana',
    pincode: '122002',
    phone: '+91 98712 34567',
    hours: '6:00 AM – 2:00 AM',
    stockStatus: 'In Stock',
    stockMessage: 'Average delivery: 9 minutes to Cyber City',
    flavoursAvailable: ['All Flavours', 'Combo Bundles'],
    coordinates: { x: 37, y: 33 }
  },

  // Mumbai
  {
    id: 'store-bom-1',
    name: 'IIT Bombay Canteen & Stationery Store',
    city: 'Mumbai',
    type: 'Campus Tuck Shop',
    address: 'Gymkhana Grounds, Powai, Mumbai',
    pincode: '400076',
    phone: '+91 22 2576 4000',
    hours: '8:00 AM – 11:30 PM',
    stockStatus: 'In Stock',
    stockMessage: 'Official campus vendor · Student discount active',
    flavoursAvailable: ['Gujarat Khatta Meetha', 'Tangy Tomato Masala', 'Classic Salted'],
    coordinates: { x: 26, y: 58 }
  },
  {
    id: 'store-bom-2',
    name: 'Foodhall Gourmet Supermarket',
    city: 'Mumbai',
    type: 'Supermarket',
    address: 'Palladium Mall, High Street Phoenix, Lower Parel',
    pincode: '400013',
    phone: '+91 22 4333 9999',
    hours: '10:30 AM – 10:30 PM',
    stockStatus: 'In Stock',
    stockMessage: 'Featured in artisanal chips aisle',
    flavoursAvailable: ['All 6 Signature Packs'],
    coordinates: { x: 25, y: 62 }
  },

  // Bengaluru
  {
    id: 'store-blr-1',
    name: 'Zepto Instant Delivery Hub Indiranagar',
    city: 'Bengaluru',
    type: 'Quick Commerce Hub',
    address: '100ft Road, HAL 2nd Stage, Indiranagar',
    pincode: '560038',
    phone: '+91 80 4123 4567',
    hours: '24 Hours',
    stockStatus: 'In Stock',
    stockMessage: '8-minute instant drop across East Bengaluru',
    flavoursAvailable: ['All Flavours in stock'],
    coordinates: { x: 39, y: 78 }
  },
  {
    id: 'store-blr-2',
    name: 'IIM Bangalore Tuck & Refreshments Shop',
    city: 'Bengaluru',
    type: 'Campus Tuck Shop',
    address: 'Bannerghatta Road, Bilekahalli, Bengaluru',
    pincode: '560076',
    phone: '+91 80 2699 3000',
    hours: '9:00 AM – 10:00 PM',
    stockStatus: 'Restocking Today',
    stockMessage: 'Afternoon replenishment arriving at 3 PM',
    flavoursAvailable: ['Classic Salted', 'Protein+ Tomato'],
    coordinates: { x: 41, y: 80 }
  },

  // Kolkata
  {
    id: 'store-ccu-1',
    name: 'Spencers Hypermarket Park Street',
    city: 'Kolkata',
    type: 'Supermarket',
    address: 'Park Centre, Park Street, Kolkata',
    pincode: '700016',
    phone: '+91 33 2229 8888',
    hours: '9:30 AM – 9:30 PM',
    stockStatus: 'In Stock',
    stockMessage: 'Top seller: Bengal Kasundi Mustard',
    flavoursAvailable: ['Bengal Kasundi Mustard', 'Classic Salted', 'Tomato Masala'],
    coordinates: { x: 74, y: 46 }
  },

  // Ahmedabad
  {
    id: 'store-amd-1',
    name: 'IIM Ahmedabad Campus Store',
    city: 'Ahmedabad',
    type: 'Campus Tuck Shop',
    address: 'Vastrapur, Ahmedabad, Gujarat',
    pincode: '380015',
    phone: '+91 79 6632 3456',
    hours: '8:30 AM – 11:00 PM',
    stockStatus: 'In Stock',
    stockMessage: 'Gujarat Khatta Meetha #1 popular snack',
    flavoursAvailable: ['Gujarat Khatta Meetha', 'Classic Salted'],
    coordinates: { x: 24, y: 44 }
  }
];

export const InteractiveStoreMap: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [selectedStoreType, setSelectedStoreType] = useState<string>('All Types');
  const [searchPincode, setSearchPincode] = useState<string>('');
  const [activeStoreId, setActiveStoreId] = useState<string>(STORES[0].id);

  const cities = ['All Cities', 'Delhi NCR', 'Mumbai', 'Bengaluru', 'Kolkata', 'Ahmedabad'];
  const storeTypes = ['All Types', 'Campus Tuck Shop', 'Supermarket', 'Quick Commerce Hub'];

  const filteredStores = STORES.filter((store) => {
    const matchesCity = selectedCity === 'All Cities' || store.city === selectedCity;
    const matchesType = selectedStoreType === 'All Types' || store.type === selectedStoreType;
    const matchesSearch =
      searchPincode.trim() === '' ||
      store.pincode.includes(searchPincode.trim()) ||
      store.name.toLowerCase().includes(searchPincode.toLowerCase()) ||
      store.address.toLowerCase().includes(searchPincode.toLowerCase());
    return matchesCity && matchesType && matchesSearch;
  });

  const activeStore = STORES.find((s) => s.id === activeStoreId) || filteredStores[0] || STORES[0];

  return (
    <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#E7DECB] shadow-xl overflow-hidden">
      {/* Top Controls Bar */}
      <div className="bg-[#FAF7F0] p-5 sm:p-6 border-b border-[#E7DECB] space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#8B1E29] mb-0.5">
              <MapPin className="w-4 h-4 text-[#8B1E29]" />
              <span>Nationwide Availability</span>
              <span aria-hidden="true">·</span>
              <span>Metro Distribution Map</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              Find Chippas Near You
            </h3>
          </div>

          {/* Quick search input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchPincode}
              onChange={(e) => setSearchPincode(e.target.value)}
              placeholder="Search pincode or area..."
              className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-[#DCD0BB] text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-[#8B1E29]"
            />
          </div>
        </div>

        {/* City and Category filter tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#EAE0CD]">
          {/* City tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedCity === city
                    ? 'bg-[#8B1E29] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:text-slate-950 border border-slate-200'
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          {/* Type filter */}
          <div className="flex items-center gap-1.5">
            {storeTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedStoreType(type)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  selectedStoreType === type
                    ? 'bg-[#FBBF24] text-slate-950'
                    : 'text-slate-600 hover:bg-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Map & Detail Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        {/* Left Side: Interactive Styled Vector Map (Indian Territory Distribution) */}
        <div className="lg:col-span-7 bg-[#F4EFE6] relative overflow-hidden p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E7DECB]">
          {/* Stylized background topography contour & grid */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#8B1E29_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

          {/* Map Compass rose */}
          <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-xs p-2 rounded-xl border border-[#DCD0BA] shadow-xs flex items-center gap-1.5 text-[11px] font-black text-slate-700">
            <Compass className="w-4 h-4 text-[#8B1E29]" />
            <span>METRO LOGISTICS HUB</span>
          </div>

          {/* Visual Metro Node Connectors */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            {/* Curved dashed logistics lines connecting hub nodes */}
            <path
              d="M 240 120 Q 300 180 200 280 T 260 380"
              fill="none"
              stroke="#8B1E29"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M 240 120 Q 360 160 420 220"
              fill="none"
              stroke="#8B1E29"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Interactive City Pins placed across map canvas */}
          <div className="relative w-full h-[320px] sm:h-[380px] my-auto">
            {filteredStores.map((store) => {
              const isActive = store.id === activeStore.id;

              return (
                <div
                  key={store.id}
                  style={{
                    left: `${store.coordinates.x}%`,
                    top: `${store.coordinates.y}%`
                  }}
                  onClick={() => setActiveStoreId(store.id)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-200 z-20 group ${
                    isActive ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                  title={`${store.name} (${store.city})`}
                >
                  {/* Ripple pulse on active */}
                  {isActive && (
                    <span className="absolute -inset-2 rounded-full bg-[#8B1E29]/30 animate-ping pointer-events-none" />
                  )}

                  <div
                    className={`p-2 rounded-full shadow-lg flex items-center justify-center border-2 ${
                      isActive
                        ? 'bg-[#8B1E29] border-[#FBBF24] text-[#FBBF24] ring-4 ring-[#8B1E29]/20'
                        : 'bg-white border-[#8B1E29] text-[#8B1E29] hover:bg-[#FBBF24] hover:text-slate-950'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>

                  {/* Tooltip badge */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 whitespace-nowrap bg-black/85 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    {store.name.split(' ')[0]} ({store.city})
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Footer legend */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-600 bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-[#DCD0BA]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B1E29]" />
              <span>Active Retail Partner</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Instant Quick Commerce</span>
            </span>
            <span className="text-[11px] text-slate-500">
              Showing {filteredStores.length} Verified Outlets
            </span>
          </div>
        </div>

        {/* Right Side: Selected Outlet Info & Directions Card */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#8B1E29] bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                {activeStore.type}
              </span>
              <span
                className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                  activeStore.stockStatus === 'In Stock'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-900'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{activeStore.stockStatus}</span>
              </span>
            </div>

            <div>
              <h4 className="text-xl sm:text-2xl font-black text-slate-900 font-display leading-snug">
                {activeStore.name}
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                {activeStore.city} · PIN Code: {activeStore.pincode}
              </p>
            </div>

            {/* Info details */}
            <div className="space-y-2.5 pt-2 text-xs text-slate-700">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#FAF8F5] border border-slate-100">
                <Store className="w-4 h-4 text-[#8B1E29] shrink-0 mt-0.5" />
                <span>{activeStore.address}</span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FAF8F5] border border-slate-100">
                <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Operating Hours: <strong>{activeStore.hours}</strong></span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FAF8F5] border border-slate-100">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <a href={`tel:${activeStore.phone}`} className="hover:text-[#8B1E29] font-bold">
                  {activeStore.phone}
                </a>
              </div>
            </div>

            {/* Live Stock Notification */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Inventory Status:</span>
              </div>
              <p className="text-[11px] text-amber-800">
                {activeStore.stockMessage}
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {activeStore.flavoursAvailable.map((f, i) => (
                  <span key={i} className="text-[10px] font-bold bg-white px-2 py-0.5 rounded border border-amber-200">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(`${activeStore.name} ${activeStore.address}`)}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 px-4 py-3 rounded-xl bg-[#8B1E29] hover:bg-[#A51C28] text-white font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={`tel:${activeStore.phone}`}
              className="px-4 py-3 rounded-xl bg-[#FAF7F0] hover:bg-[#FBBF24] border border-[#E0D4BD] text-slate-900 font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-colors"
            >
              <Phone className="w-4 h-4 text-slate-700" />
              <span>Call Store</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
