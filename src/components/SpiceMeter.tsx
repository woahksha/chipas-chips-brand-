import React from 'react';
import { Flame } from 'lucide-react';

interface SpiceMeterProps {
  level: number; // 0 to 5
  descriptor?: string;
  size?: 'sm' | 'md';
}

export const SpiceMeter: React.FC<SpiceMeterProps> = ({ level, descriptor, size = 'sm' }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((idx) => {
          const isActive = idx <= level;
          return (
            <span
              key={idx}
              className={`inline-block rounded-full transition-all ${
                size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5'
              } ${
                isActive
                  ? level >= 4
                    ? 'bg-red-600 shadow-sm'
                    : level >= 2
                    ? 'bg-orange-500'
                    : 'bg-amber-400'
                  : 'bg-slate-200'
              }`}
            />
          );
        })}
      </div>
      {descriptor && (
        <span className="text-xs text-slate-600 font-medium truncate">
          {descriptor}
        </span>
      )}
    </div>
  );
};
