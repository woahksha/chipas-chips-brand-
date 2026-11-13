import React from 'react';
import { LegalModalType } from './LegalModals';
import { Instagram, Youtube, Facebook, Linkedin, ArrowUp, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: 'home' | 'products' | 'about' | 'where-to-buy') => void;
  onOpenLegal: (type: LegalModalType) => void;
  onOpenCookies: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenLegal,
  onOpenCookies,
  onOpenContact
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#420B12] text-[#FBF6EE] pt-16 pb-12 border-t-4 border-[#FBBF24]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1 & 2: Brand Lockup & Story */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate('home')}>
              <div className="w-9 h-9 rounded-full bg-[#FBBF24] flex items-center justify-center text-[#420B12] font-black text-lg font-display shadow-md group-hover:rotate-12 transition-transform">
                C
              </div>
              <span className="text-3xl font-black tracking-tight text-[#FBBF24] font-display">
                Chipas
              </span>
            </div>

            <p className="text-xs text-amber-100/80 leading-relaxed max-w-sm">
              Contemporary potato chips bringing together exciting flavours, regional Indian inspiration, and the joy of everyday snacking. Zero palm oil. Built-in clean finger grabber.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#FBBF24]">
                Follow the Crunch:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FBBF24] hover:text-[#420B12] flex items-center justify-center text-amber-200 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FBBF24] hover:text-[#420B12] flex items-center justify-center text-amber-200 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FBBF24] hover:text-[#420B12] flex items-center justify-center text-amber-200 transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FBBF24] hover:text-[#420B12] flex items-center justify-center text-amber-200 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Main Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#FBBF24]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-amber-100/90 font-medium">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#FBBF24] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-[#FBBF24] transition-colors cursor-pointer"
                >
                  Our Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#FBBF24] transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('where-to-buy')}
                  className="hover:text-[#FBBF24] transition-colors cursor-pointer"
                >
                  Where to Buy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#FBBF24]">
              Customer & Legal
            </h4>
            <ul className="space-y-2 text-xs text-amber-100/90 font-medium">
              <li>
                <button
                  onClick={() => onOpenLegal('faq')}
                  className="hover:text-[#FBBF24] transition-colors text-left cursor-pointer"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-[#FBBF24] transition-colors text-left cursor-pointer"
                >
                  Terms of Use (Draft)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('accessibility')}
                  className="hover:text-[#FBBF24] transition-colors text-left cursor-pointer"
                >
                  Accessibility Statement
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('ads')}
                  className="hover:text-[#FBBF24] transition-colors text-left cursor-pointer"
                >
                  About Our Ads
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-amber-200 transition-colors text-left text-[#FBBF24] font-bold cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCookies}
                  className="hover:text-[#FBBF24] transition-colors text-left cursor-pointer"
                >
                  Cookie Preferences
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Promise Badge & Back to Top */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#FBBF24]">
              Our Promise
            </h4>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs text-amber-100/80">
              <p className="font-bold text-white">
                "Good times. Great flavours. Endless crunch."
              </p>
              <p className="text-[11px] leading-relaxed text-[#FBBF24]">
                NO PALM OIL · GRAMS UP FRONT · CLEAN GRABBER
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-xs font-bold text-[#FBBF24] hover:text-white transition-colors pt-2 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Student Creator & Roll Numbers Credit Bar */}
        <div className="py-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]" />
            <span className="font-bold text-[#FBBF24] uppercase tracking-wider text-[11px]">
              Student Creators & Section Leads:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="bg-white/10 px-3 py-1 rounded-full text-amber-100">
              Home: <strong className="text-white">25BA131</strong>
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-amber-100">
              Our Products: <strong className="text-white">25BA136</strong>
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-amber-100">
              About Us: <strong className="text-white">25BA108</strong>
            </span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-amber-100">
              Where to Buy: <strong className="text-white">25BA104</strong>
            </span>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-amber-200/60 gap-4">
          <div>
            © 2026 CHIPAS. All rights reserved · Shri Ram College of Commerce (SRCC) Student FMCG Venture.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>for authentic crunch lovers everywhere.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
