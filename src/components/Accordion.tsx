import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

export interface AccordionItemData {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  category?: string;
  badge?: string;
  badgeColor?: string;
}

interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
  className?: string;
  variant?: 'card' | 'bordered' | 'minimal';
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
  className = '',
  variant = 'card'
}) => {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenIds);

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return allowMultiple ? [...prev, id] : [id];
      }
    });
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div
            key={item.id}
            className={`transition-all duration-200 overflow-hidden ${
              variant === 'card'
                ? `rounded-2xl border-2 ${
                    isOpen
                      ? 'border-[#8B1E29] bg-white shadow-md ring-4 ring-[#8B1E29]/10'
                      : 'border-[#EAE1D2] bg-[#FFFDF9] hover:border-amber-300 hover:shadow-xs'
                  }`
                : variant === 'bordered'
                ? 'border-b border-[#E8DEC8] py-2'
                : 'bg-white/80 rounded-xl p-2'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 cursor-pointer select-none group"
              aria-expanded={isOpen}
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  {item.badge && (
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        item.badgeColor || 'bg-[#FBBF24] text-slate-950'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.category && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {item.category}
                    </span>
                  )}
                </div>
                <h4
                  className={`text-base font-bold font-display transition-colors ${
                    isOpen ? 'text-[#8B1E29]' : 'text-slate-900 group-hover:text-[#8B1E29]'
                  }`}
                >
                  {item.title}
                </h4>
                {item.subtitle && (
                  <p className="text-xs text-slate-500 mt-0.5">{item.subtitle}</p>
                )}
              </div>

              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                  isOpen
                    ? 'rotate-180 bg-[#8B1E29] text-[#FBBF24]'
                    : 'bg-[#FAF7F0] text-slate-500 group-hover:bg-[#FBBF24] group-hover:text-slate-950'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-slate-600 text-xs sm:text-sm leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
