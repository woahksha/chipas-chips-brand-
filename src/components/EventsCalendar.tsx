import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Sparkles, Bell, Check, Tag, ChevronRight } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  dayNumber: string;
  month: string;
  time: string;
  location: string;
  category: 'Campus Pop-up' | 'Flavour Drop' | 'Tasting Booth' | 'Restock';
  badge: string;
  badgeColor: string;
  description: string;
  featuredFlavour: string;
}

const EVENTS: CalendarEvent[] = [
  {
    id: 'evt-1',
    title: 'North Campus Snack Sprint & Free Grabber Demos',
    date: 'Saturday, Nov 15',
    dayNumber: '15',
    month: 'NOV',
    time: '11:00 AM – 4:00 PM',
    location: 'SRCC & Hansraj Central Canteen Lawn, Delhi',
    category: 'Campus Pop-up',
    badge: 'Campus Event',
    badgeColor: 'bg-emerald-600 text-white',
    description: 'Exclusive on-ground tasting booth! Try our new zero-palm oil batch and grab custom holographic sticker packs and free Chippas grabbers.',
    featuredFlavour: 'Gujarat Khatta Meetha'
  },
  {
    id: 'evt-2',
    title: 'Limited Edition Drop: Malabar Pepper & Curry Leaf',
    date: 'Wednesday, Nov 19',
    dayNumber: '19',
    month: 'NOV',
    time: '12:00 PM Sharp',
    location: 'Online Quick Commerce & Select Mumbai Stores',
    category: 'Flavour Drop',
    badge: 'Limited Batch',
    badgeColor: 'bg-[#8B1E29] text-[#FBBF24]',
    description: 'First 2,000 packs of our heritage Kerala black pepper and tempered curry leaf chips. Once sold out, unavailable until next harvest.',
    featuredFlavour: 'Malabar Pepper'
  },
  {
    id: 'evt-3',
    title: 'Hostel Night Restock & FIFA Tournament Booth',
    date: 'Friday, Nov 21',
    dayNumber: '21',
    month: 'NOV',
    time: '7:00 PM – 11:30 PM',
    location: 'IIT Bombay Hostels 12–15 Quad, Powai',
    category: 'Campus Pop-up',
    badge: 'Hostel Special',
    badgeColor: 'bg-purple-600 text-white',
    description: 'Fueling late-night hostel LAN gaming. Exclusive 150g party-size packs at flat campus discount with clean-grabber demo stations.',
    featuredFlavour: 'Tangy Tomato Masala'
  },
  {
    id: 'evt-4',
    title: 'Bangalore Tech Park Mega Tasting & Tuck Shop Launch',
    date: 'Tuesday, Nov 25',
    dayNumber: '25',
    month: 'NOV',
    time: '1:00 PM – 5:00 PM',
    location: 'Manyata Tech Park, Nagavara, Bengaluru',
    category: 'Tasting Booth',
    badge: 'Corporate & Tech',
    badgeColor: 'bg-amber-600 text-white',
    description: 'Corporate snack counter launch across 14 cafeteria vending kiosks. Savor Bengal Kasundi Mustard and Classic Salted.',
    featuredFlavour: 'Bengal Kasundi Mustard'
  },
  {
    id: 'evt-5',
    title: 'Fresh Harvest Kettle Batch Restock Run',
    date: 'Monday, Dec 01',
    dayNumber: '01',
    month: 'DEC',
    time: '10:00 AM',
    location: 'Blinkit, Zepto, and Instamart Hubs (All Metros)',
    category: 'Restock',
    badge: 'Fresh Harvest',
    badgeColor: 'bg-sky-700 text-white',
    description: 'Direct dispatch of freshly fried Grade-A potato crisps kettle-cooked in high-oleic sunflower oil with updated lot numbers.',
    featuredFlavour: 'All 6 Signature Packs'
  }
];

export const EventsCalendar: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All Events');
  const [reminders, setReminders] = useState<Record<string, boolean>>({});

  const filterCategories = ['All Events', 'Campus Pop-up', 'Flavour Drop', 'Tasting Booth', 'Restock'];

  const filteredEvents = EVENTS.filter(
    (e) => selectedFilter === 'All Events' || e.category === selectedFilter
  );

  const toggleReminder = (id: string) => {
    setReminders((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header and Filter */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#E8DEC8]">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#8B1E29] mb-1">
            <CalendarIcon className="w-4 h-4 text-[#8B1E29]" />
            <span>Campus Drops & Brand Schedule</span>
            <span aria-hidden="true">·</span>
            <span>2026 Calendar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
            Upcoming Drops & Pop-up Booths
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-xl">
            Catch us live at university festivals, hostel tuck shops, and limited batch drop events across Delhi NCR, Mumbai, Bengaluru, and Kolkata.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FAF7F0] rounded-xl border border-[#E7DECB]">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedFilter === cat
                  ? 'bg-[#8B1E29] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => {
          const isReminded = !!reminders[evt.id];

          return (
            <div
              key={evt.id}
              className="bg-white rounded-2xl border-2 border-[#EADFCB] hover:border-[#8B1E29] p-5 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Date & Category row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-[#8B1E29] to-[#5C0D15] text-white flex flex-col items-center justify-center font-display shrink-0 shadow-sm border border-[#FBBF24]/40">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#FBBF24]">
                        {evt.month}
                      </span>
                      <span className="text-xl font-black leading-none mt-0.5">
                        {evt.dayNumber}
                      </span>
                    </div>

                    <div>
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${evt.badgeColor}`}>
                        {evt.badge}
                      </span>
                      <div className="text-xs font-bold text-slate-800 mt-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{evt.time}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-base font-black text-slate-900 font-display leading-snug group-hover:text-[#8B1E29] transition-colors">
                  {evt.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-body">
                  {evt.description}
                </p>

                {/* Location pin */}
                <div className="flex items-start gap-1.5 text-xs text-slate-700 bg-[#FAF7F0] p-2.5 rounded-xl border border-[#EBE3D3]">
                  <MapPin className="w-4 h-4 text-[#8B1E29] shrink-0 mt-0.5" />
                  <span className="font-semibold">{evt.location}</span>
                </div>
              </div>

              {/* Bottom Action bar */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] font-black text-amber-800 bg-amber-50 px-2 py-1 rounded-md border border-amber-200 truncate">
                  Spotlight: {evt.featuredFlavour}
                </span>

                <button
                  onClick={() => toggleReminder(evt.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    isReminded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#FAF7F0] hover:bg-[#FBBF24] text-slate-900 border border-[#E0D4BD]'
                  }`}
                >
                  {isReminded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <>
                      <Bell className="w-3.5 h-3.5 text-[#8B1E29]" />
                      <span>Remind Me</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Suggest an event box */}
      <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#E7DECB] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FBBF24] text-slate-950 flex items-center justify-center font-black">
            📍
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 font-display">
              Want Chippas at your campus fest or sports tournament?
            </h4>
            <p className="text-xs text-slate-600">
              We sponsor student clubs, LAN tournaments, and cultural fests with tasting stalls and free grabbers.
            </p>
          </div>
        </div>

        <a
          href="mailto:campus@chipas.in?subject=Campus%20Event%20Partnership"
          className="px-5 py-2.5 rounded-xl bg-[#8B1E29] hover:bg-[#A51C28] text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0 shadow-sm"
        >
          Invite Chipas to Campus
        </a>
      </div>
    </section>
  );
};
