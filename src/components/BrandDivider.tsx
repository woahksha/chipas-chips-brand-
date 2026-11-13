import React from 'react';

interface BrandDividerProps {
  variant?: 'wave' | 'dots' | 'curved' | 'zigzag';
  fillColor?: string;
  color?: string;
  bgColor?: string;
  height?: number;
  className?: string;
}

export const BrandDivider: React.FC<BrandDividerProps> = ({
  variant = 'wave',
  fillColor = '#8B1E29',
  color,
  bgColor = 'transparent',
  height = 40,
  className = ''
}) => {
  const activeColor = color || fillColor;
  if (variant === 'dots') {
    return (
      <div className={`py-6 flex items-center justify-center gap-2 ${className}`}>
        <span className="w-2 h-2 rounded-full bg-[#8B1E29]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]" />
        <span className="w-3 h-3 rounded-full bg-[#8B1E29]" />
        <span className="w-16 h-0.5 bg-[#EAE1D2]" />
        <span className="w-3 h-3 rounded-full bg-[#FBBF24]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#8B1E29]" />
        <span className="w-2 h-2 rounded-full bg-[#FBBF24]" />
      </div>
    );
  }

  if (variant === 'zigzag') {
    return (
      <div className={`w-full overflow-hidden leading-none ${className}`} style={{ backgroundColor: bgColor }}>
        <svg
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-10 fill-current"
          style={{ color: activeColor }}
        >
          <path d="M0,0 L25,20 L50,0 L75,20 L100,0 L125,20 L150,0 L175,20 L200,0 L225,20 L250,0 L275,20 L300,0 L325,20 L350,0 L375,20 L400,0 L425,20 L450,0 L475,20 L500,0 L525,20 L550,0 L575,20 L600,0 L625,20 L650,0 L675,20 L700,0 L725,20 L750,0 L775,20 L800,0 L825,20 L850,0 L875,20 L900,0 L925,20 L950,0 L975,20 L1000,0 L1025,20 L1050,0 L1075,20 L1100,0 L1125,20 L1150,0 L1175,20 L1200,0 L1200,40 L0,40 Z" />
        </svg>
      </div>
    );
  }

  // default 'wave'
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`} style={{ backgroundColor: bgColor }}>
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="w-full h-8 sm:h-12"
        style={{ color: activeColor }}
        fill="currentColor"
      >
        <path d="M0,0 C150,45 350,-20 500,25 C650,70 900,10 1200,35 L1200,60 L0,60 Z" />
      </svg>
    </div>
  );
};
