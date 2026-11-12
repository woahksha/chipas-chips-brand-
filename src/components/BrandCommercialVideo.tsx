import React from 'react';
import { Film, ShoppingBag, ArrowRight } from 'lucide-react';

interface BrandCommercialVideoProps {
  badgeText?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  description?: string;
  quote?: string;
  credits?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

export const BrandCommercialVideo: React.FC<BrandCommercialVideoProps> = ({
  badgeText = 'Official Brand Commercial · Campus Edition',
  titlePrefix = 'Snack Smarter. ',
  titleHighlight = 'Crunch Louder.',
  description = "Watch our official commercial shot right on campus — where the question isn't whether to give up chips, but how to upgrade them with honest labels, real crunch, and zero palm oil.",
  quote = '"Enjoying food isn\'t illegal. We\'re not banning chips, we\'re upgrading them!"',
  credits = 'Starring: Saurav · Pradyumna · Pratibha · Samiksha · Shri Ram College of Commerce',
  buttonText,
  onButtonClick,
  className = ''
}) => {
  return (
    <section className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="bg-gradient-to-br from-[#4A0E17] via-[#2F060C] to-[#1A0307] text-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl border-4 border-[#FBBF24] relative overflow-hidden space-y-8">
        
        {/* Subtle Ambient Backlight */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#FBBF24]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-black tracking-wider text-[#FBBF24] uppercase">
            <Film className="w-3.5 h-3.5 text-[#FBBF24]" />
            <span>{badgeText}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white text-balance">
            {titlePrefix}
            <span className="text-[#FBBF24]">{titleHighlight}</span>
          </h2>

          <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed font-body">
            {description}
          </p>
        </div>

        {/* Video Player Theater Showcase */}
        <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden bg-black shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-2 border-white/10 group">
          <video
            src="/assets/aistudio/video_advertisement_c037a883.mp4"
            controls
            playsInline
            preload="metadata"
            className="w-full h-auto max-h-[580px] object-contain rounded-2xl mx-auto"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Commercial Quotes & Credits Strip */}
        <div className="pt-4 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left relative z-10">
          <div className="space-y-1">
            <div className="text-xs font-black text-[#FBBF24] uppercase tracking-wider">
              {quote}
            </div>
            <div className="text-xs text-amber-100/70">
              {credits}
            </div>
          </div>

          {buttonText && onButtonClick && (
            <button
              onClick={onButtonClick}
              className="px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider text-slate-950 bg-[#FBBF24] hover:bg-[#F59E0B] transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer whitespace-nowrap border border-amber-300 flex items-center gap-2"
            >
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
