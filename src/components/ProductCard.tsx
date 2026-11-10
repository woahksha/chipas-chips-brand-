import React from 'react';
import { Product } from '../types';
import { ChipasBagIllustration } from './ChipasBagIllustration';
import { SpiceMeter } from './SpiceMeter';
import { ArrowUpRight, Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickAdd
}) => {
  return (
    <div
      onClick={() => onSelect(product)}
      className="group relative bg-white rounded-3xl p-6 border border-[#ECE5D8] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Card Metadata */}
      <div>
        <div className="flex items-center justify-between gap-2 text-xs font-bold text-slate-500 mb-2">
          <span className="uppercase tracking-wider text-[11px] font-black text-[#8B1E29]">
            {product.collection}
          </span>
          {product.hasNoPalmOil && (
            <span className="text-[10px] font-black uppercase text-slate-950 bg-[#FBBF24] px-2 py-0.5 rounded shadow-xs">
              No Palm Oil
            </span>
          )}
        </div>

        {/* Clean, Uncluttered Stage for the Packet */}
        <div className="h-60 flex items-center justify-center my-3 relative overflow-hidden rounded-2xl bg-[#FAF8F5] border border-[#F2ECE1]">
          <div className="transform transition-transform duration-400 group-hover:scale-110 group-hover:-rotate-1">
            <ChipasBagIllustration product={product} size="md" />
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-3">
          <h3 className="text-xl font-black text-slate-900 tracking-tight font-display group-hover:text-[#8B1E29] transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Bottom Pricing & Actions */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col gap-3">
        {/* Spice meter row */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">Heat:</span>
          <SpiceMeter
            level={product.spiceLevel}
            descriptor={product.spiceLevel === 0 ? 'Mild' : `${product.spiceLevel}/5`}
          />
        </div>

        {/* Price & Action Buttons */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-[11px] text-slate-400 font-medium">From</span>
            <div className="text-lg font-black text-slate-900 font-display tabular-nums">
              ₹{product.sizes[0]?.price} <span className="text-xs font-normal text-slate-500">/ {product.sizes[0]?.weight}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Signature Yellow Quick-Add Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickAdd(product);
              }}
              className="px-3.5 py-2 rounded-xl bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950 font-black text-xs flex items-center gap-1 transition-all active:scale-95 shadow-sm hover:shadow"
              title="Quick Add to Bag"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>

            {/* View Details Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(product);
              }}
              className="p-2 rounded-xl bg-slate-900 hover:bg-[#8B1E29] text-white transition-colors"
              title="View Details"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
