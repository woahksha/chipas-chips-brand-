import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentPage: 'home' | 'products' | 'about' | 'where-to-buy';
  onNavigate: (page: 'home' | 'products' | 'about' | 'where-to-buy') => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  onOpenCart
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; id: 'home' | 'products' | 'about' | 'where-to-buy'; rollNumber: string }[] = [
    { label: 'Home', id: 'home', rollNumber: '25BA131' },
    { label: 'Our Products', id: 'products', rollNumber: '25BA136' },
    { label: 'About Us', id: 'about', rollNumber: '25BA108' },
    { label: 'Where to Buy', id: 'where-to-buy', rollNumber: '25BA104' },
  ];

  const handleLinkClick = (pageId: 'home' | 'products' | 'about' | 'where-to-buy') => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      
      {/* Top Brand Notification Banner (Burgundy & Yellow) */}
      <div className="bg-[#5C0D15] text-[#FFFDF9] text-[11px] font-bold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2 border-b border-[#7A141D]">
        <span className="text-[#FBBF24] font-black uppercase text-[10px] tracking-wider px-1.5 py-0.5 rounded bg-black/30">
          PROMO
        </span>
        <span>NO PALM OIL · GRAMS UP FRONT · CLEAN-FINGER GRABBER ON EVERY PACK</span>
        <button
          onClick={() => handleLinkClick('products')}
          className="underline text-[#FBBF24] hover:text-amber-200 ml-1 cursor-pointer"
        >
          Explore All 6 Flavours →
        </button>
      </div>

      {/* Main Navbar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFFDF9]/95 backdrop-blur-md shadow-md border-b border-[#E8DEC8] py-2'
            : 'bg-[#FFFDF9] border-b border-[#EFE5D3] py-2.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            
            {/* Zone 1: Single Brand Wordmark in signature Red with yellow dot */}
            <div
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-2 cursor-pointer select-none group shrink-0"
            >
              <div className="w-8 h-8 rounded-full bg-[#8B1E29] flex items-center justify-center text-[#FBBF24] font-black text-base font-display shadow-sm group-hover:rotate-12 transition-transform">
                C
              </div>
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#8B1E29] font-display whitespace-nowrap">
                Chipas
              </span>
            </div>

            {/* Zone 2: Navigation Links with Roll Numbers beneath each tab label */}
            <nav className="hidden md:flex items-center gap-8 text-slate-700">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`relative flex flex-col items-center py-1 transition-colors whitespace-nowrap shrink-0 group cursor-pointer ${
                      isActive
                        ? 'text-[#8B1E29]'
                        : 'hover:text-[#8B1E29] text-slate-700'
                    }`}
                  >
                    <span className="text-sm font-bold leading-tight">{link.label}</span>
                    <span
                      className={`text-[10px] font-mono tracking-wider font-semibold leading-tight mt-0.5 transition-colors ${
                        isActive ? 'text-[#8B1E29] font-bold' : 'text-slate-500 group-hover:text-[#8B1E29]'
                      }`}
                    >
                      {link.rollNumber}
                    </span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#8B1E29] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Primary Action (Vibrant Yellow CTA) & Bag Trigger */}
            <div className="flex items-center gap-3 shrink-0">
              
              {/* Bag Trigger with Yellow Badge */}
              <button
                onClick={onOpenCart}
                className="relative p-2.5 rounded-full text-slate-800 hover:text-slate-950 hover:bg-amber-100/60 transition-colors cursor-pointer"
                title="View Crunch Bag"
                aria-label="View Crunch Bag"
              >
                <ShoppingBag className="w-5 h-5 text-[#8B1E29]" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#FBBF24] text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center shadow-md border border-[#8B1E29]">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Signature Yellow CTA Button */}
              <button
                onClick={() => handleLinkClick('products')}
                className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-slate-950 bg-[#FBBF24] hover:bg-[#F59E0B] rounded-xl shadow-sm hover:shadow-md transition-all whitespace-nowrap active:scale-95 cursor-pointer border border-amber-300"
              >
                <span>Explore Flavours</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-slate-800 hover:bg-slate-100"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>

          {/* Mobile Menu Dropdown with Roll Numbers */}
          {mobileMenuOpen && (
            <div className="md:hidden pt-4 pb-3 border-t border-slate-200 mt-3 space-y-2 animate-in fade-in slide-in-from-top-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center justify-between w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold ${
                    currentPage === link.id
                      ? 'bg-[#8B1E29] text-white'
                      : 'text-slate-800 hover:bg-amber-50'
                  }`}
                >
                  <span>{link.label}</span>
                  <span
                    className={`text-xs font-mono font-semibold ${
                      currentPage === link.id ? 'text-amber-200' : 'text-slate-500'
                    }`}
                  >
                    {link.rollNumber}
                  </span>
                </button>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => handleLinkClick('products')}
                  className="w-full py-3 text-center rounded-xl font-black text-xs uppercase tracking-wider text-slate-950 bg-[#FBBF24] hover:bg-[#F59E0B]"
                >
                  Explore Flavours
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
