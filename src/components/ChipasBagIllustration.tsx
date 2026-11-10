import React from 'react';
import { Product } from '../types';

interface ChipasBagProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showPullTab?: boolean;
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
}

export const ChipasBagIllustration: React.FC<ChipasBagProps> = ({
  product,
  size = 'md',
  showPullTab = true,
  interactive = true,
  className = '',
  onClick
}) => {
  // Dimensions per size
  const sizeMap = {
    sm: 'w-[140px] h-[210px]',
    md: 'w-[200px] h-[290px]',
    lg: 'w-[260px] h-[380px]',
    xl: 'w-[320px] h-[460px]'
  };

  return (
    <div
      onClick={onClick}
      className={`relative select-none ${sizeMap[size]} ${
        interactive ? 'group cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1' : ''
      } ${className}`}
      style={{ perspective: '1000px' }}
    >
      {/* Realistic Ground Shadow */}
      <div className="absolute -bottom-3 inset-x-4 h-6 bg-black/30 blur-md rounded-full transform transition-all group-hover:scale-95 group-hover:bg-black/40" />

      {/* The Actual Foil Chips Packet */}
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between p-4 border border-white/20 transition-all duration-300"
        style={{
          background: `linear-gradient(155deg, ${product.packagingColor.secondary} 0%, ${product.packagingColor.primary} 65%, #180507 100%)`
        }}
      >
        {/* Photorealistic foil sheen & light sweep */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/15 to-transparent pointer-events-none" />
        <div className="absolute top-0 bottom-0 left-1/4 w-12 bg-white/10 skew-x-12 blur-sm pointer-events-none" />

        {/* Top crimped foil seal */}
        <div className="absolute top-0 inset-x-0 h-3 flex items-center justify-between px-1 opacity-70 bg-black/20">
          <div className="w-full h-full flex justify-between overflow-hidden">
            {[...Array(28)].map((_, i) => (
              <span key={i} className="inline-block w-1.5 h-full border-r border-black/30" />
            ))}
          </div>
        </div>

        {/* The Clever Corner / Perforated Pull Tab */}
        {showPullTab && (
          <div className="absolute top-0 right-0 z-20 pointer-events-none">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="drop-shadow-sm">
              <path
                d="M 60 0 L 22 0 C 32 16 46 28 60 38 Z"
                fill="#FBBF24"
              />
              <path
                d="M 60 38 C 46 28 32 16 22 0"
                stroke="#B45309"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
              <text
                x="45"
                y="14"
                fill="#1E1B18"
                fontSize="8.5"
                fontWeight="900"
                textAnchor="middle"
                transform="rotate(22 45 14)"
                className="font-sans font-black tracking-widest"
              >
                PULL
              </text>
            </svg>
          </div>
        )}

        {/* Top Header on Bag */}
        <div className="relative z-10 pt-2 flex items-start justify-between">
          <div className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-black/30 text-white/95 backdrop-blur-xs">
            {product.collection}
          </div>
          {product.hasNoPalmOil && (
            <div className="bg-[#FBBF24] text-slate-950 text-[8px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
              NO PALM OIL
            </div>
          )}
        </div>

        {/* Central Brand Wordmark & Flavour Box */}
        <div className="relative z-10 flex flex-col items-center text-center my-auto">
          {/* Chipas Wordmark in signature bright yellow */}
          <h2
            className="text-4xl md:text-5xl font-black tracking-tight text-[#FBBF24] font-display"
            style={{
              textShadow: '0 2px 10px rgba(0,0,0,0.5), 0 0 2px rgba(255,255,255,0.2)'
            }}
          >
            Chipas
          </h2>

          {/* Flavour Name Banner */}
          <div className="mt-1 px-3 py-1 rounded-full bg-black/65 backdrop-blur-xs border border-white/15 text-white max-w-[92%] shadow-md">
            <span className="text-xs md:text-sm font-bold tracking-wide line-clamp-1">
              {product.name}
            </span>
          </div>

          {/* Crisp Real-Looking Golden Potato Chips */}
          <div className="relative w-28 h-20 md:w-36 md:h-24 my-2">
            {/* Back golden chip */}
            <div
              className="absolute left-1/2 top-2 -translate-x-1/2 w-16 h-12 md:w-20 md:h-16 rounded-[45%_55%_60%_40%/50%_60%_40%_50%] bg-gradient-to-br from-[#FEEF85] via-[#FBBF24] to-[#D97706] shadow-md transform -rotate-12 border border-white/20"
              style={{
                backgroundImage: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.4) 0%, transparent 60%)'
              }}
            >
              <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-[radial-gradient(#92400e_1px,transparent_1px)] [background-size:6px_6px]" />
            </div>

            {/* Front chip left */}
            <div
              className="absolute left-2 top-4 w-18 h-14 md:w-22 md:h-18 rounded-[55%_45%_40%_60%/45%_55%_50%_50%] bg-gradient-to-tr from-[#F59E0B] via-[#FDE68A] to-[#FEF3C7] shadow-lg transform -rotate-6 border border-white/30"
            >
              <div className="absolute inset-0 opacity-45 mix-blend-multiply bg-[radial-gradient(#b45309_1px,transparent_1px)] [background-size:5px_5px]" />
              <div className="absolute top-1.5 right-2 w-1.5 h-1.5 bg-red-600 rounded-full opacity-60" />
              <div className="absolute bottom-2 left-3 w-1 h-1 bg-emerald-700 rounded-full opacity-60" />
            </div>

            {/* Front chip right */}
            <div
              className="absolute right-2 top-3 w-16 h-13 md:w-20 md:h-16 rounded-[40%_60%_55%_45%/60%_40%_50%_50%] bg-gradient-to-tl from-[#D97706] via-[#FBBF24] to-[#FFFBEB] shadow-xl transform rotate-12 border border-white/30"
            >
              <div className="absolute inset-0 opacity-45 mix-blend-multiply bg-[radial-gradient(#92400e_1px,transparent_1px)] [background-size:4px_4px]" />
            </div>

            {/* Protein badge if applicable */}
            {product.hasProteinBadge && (
              <div className="absolute -right-2 top-1 w-9 h-9 rounded-full bg-blue-600 text-white text-[7px] font-black uppercase flex flex-col items-center justify-center border-2 border-white shadow-md transform rotate-12">
                <span>PROTEIN</span>
                <span className="text-[6px] opacity-80">forward</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Banner on Pack */}
        <div className="relative z-10 pb-1">
          <div className="bg-white rounded-lg py-1 px-2.5 flex items-center justify-between shadow-md text-slate-900 border border-black/10">
            <span className="text-[8.5px] font-black tracking-wider uppercase text-slate-800">
              GRAMS UP FRONT
            </span>
            <span className="text-[10px] font-extrabold text-[#8B1E29]">
              {product.sizes[1]?.weight || '60g'}
            </span>
          </div>
        </div>

        {/* Bottom crimped foil seal */}
        <div className="absolute bottom-0 inset-x-0 h-3 flex items-center justify-between px-1 opacity-70 bg-black/20">
          <div className="w-full h-full flex justify-between overflow-hidden">
            {[...Array(28)].map((_, i) => (
              <span key={i} className="inline-block w-1.5 h-full border-r border-black/30" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
