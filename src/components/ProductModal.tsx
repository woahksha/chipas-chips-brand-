import React, { useState } from 'react';
import { Product } from '../types';
import { ChipasBagIllustration } from './ChipasBagIllustration';
import { SpiceMeter } from './SpiceMeter';
import { X, Check, ShoppingBag, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, price: number, quantity: number) => void;
  onNavigateToWhereToBuy?: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onNavigateToWhereToBuy
}) => {
  if (!product) return null;

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(1); // default 60g
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  const selectedSize = product.sizes[selectedSizeIndex] || product.sizes[0];
  const totalPrice = selectedSize.price * quantity;

  const handleAdd = () => {
    onAddToCart(product, selectedSize.weight, selectedSize.price, quantity);
    setAddedNotice(true);
    try {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FBBF24', '#8B1E29', '#1E4D2B']
      });
    } catch (e) {
      // ignore
    }
    setTimeout(() => {
      setAddedNotice(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[#E8DEC8] z-10 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/10 hover:bg-black/20 text-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Real Packet Spotlight */}
        <div className="w-full md:w-5/12 bg-[#FAF7F2] p-8 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-[#E8DEC8] relative overflow-hidden">
          <div className="w-full flex items-center justify-between z-10">
            <span className="text-xs uppercase font-black tracking-widest text-[#8B1E29] bg-white px-3 py-1 rounded-full shadow-xs border border-slate-200">
              {product.collection}
            </span>
            {product.hasNoPalmOil && (
              <span className="text-[10px] font-black uppercase text-slate-950 bg-[#FBBF24] px-2.5 py-1 rounded-full shadow-xs">
                No Palm Oil
              </span>
            )}
          </div>

          {/* Large Bag Illustration */}
          <div className="my-6 transform hover:scale-105 transition-transform duration-300">
            <ChipasBagIllustration product={product} size="lg" />
          </div>

          {/* Calorie & Crunch Specs */}
          <div className="w-full grid grid-cols-2 gap-2 text-center text-xs font-bold text-slate-700 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-bold">Calories</span>
              <strong className="text-slate-900 text-sm tabular-nums">{product.caloriesPerServing} kcal</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-bold">Crunch Rating</span>
              <strong className="text-[#8B1E29] text-sm tabular-nums">{product.crunchRating}/5 Snap</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative, Specs & Purchase Actions */}
        <div className="w-full md:w-7/12 p-6 md:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div>
            {product.regionalOrigin && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md w-fit mb-2 border border-emerald-200">
                <MapPin className="w-3.5 h-3.5" />
                <span>{product.regionalOrigin}</span>
              </div>
            )}

            <h2 className="text-3xl font-black text-slate-900 font-display tracking-tight">
              {product.name}
            </h2>
            <p className="text-sm font-bold text-[#8B1E29] mt-1">
              "{product.tagline}"
            </p>

            <p className="text-xs md:text-sm text-slate-600 mt-3 leading-relaxed">
              {product.longStory}
            </p>

            {/* Heat Meter */}
            <div className="mt-4 p-3 rounded-2xl bg-[#FAF8F5] border border-[#EFE8D8] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Heat Profile</span>
                <span className="text-[11px] text-slate-500">{product.heatDescriptor}</span>
              </div>
              <SpiceMeter level={product.spiceLevel} size="md" />
            </div>

            {/* Highlights */}
            <div className="mt-4">
              <span className="text-xs font-black text-slate-800 uppercase tracking-wider block mb-2">
                Packet Highlights:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {product.keyHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                    <Check className="w-3.5 h-3.5 text-[#8B1E29] mt-0.5 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Plain-Words Ingredients */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Ingredients in plain words:
              </span>
              <p className="text-xs text-slate-600 leading-normal">
                {product.ingredients.join(', ')}.
              </p>
            </div>
          </div>

          {/* Size & Buy Controller */}
          <div className="pt-4 border-t border-slate-200 space-y-4">
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-2">
                Choose Pack Size:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((sz, index) => {
                  const isSelected = index === selectedSizeIndex;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedSizeIndex(index)}
                      className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#8B1E29] bg-amber-50/70 ring-2 ring-[#8B1E29]'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-slate-800">{sz.size}</div>
                      <div className="text-xs font-black text-[#8B1E29] tabular-nums">
                        ₹{sz.price} <span className="text-[10px] text-slate-500 font-normal">({sz.weight})</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stepper & Signature Yellow Buy Button */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center border border-slate-300 rounded-xl bg-white p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-100 font-bold"
                >
                  -
                </button>
                <span className="w-10 text-center font-black text-sm text-slate-900 font-display tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-100 font-bold"
                >
                  +
                </button>
              </div>

              {/* Signature Yellow Primary CTA */}
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 w-full py-3.5 px-6 rounded-xl font-black text-xs uppercase tracking-wider text-slate-950 bg-[#FBBF24] hover:bg-[#F59E0B] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-95 cursor-pointer border border-amber-300"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-800" />
                    <span>Added to Crunch Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-slate-950" />
                    <span>Add to Bag · ₹{totalPrice}</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>Want instant 10-minute delivery?</span>
              {onNavigateToWhereToBuy && (
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToWhereToBuy();
                  }}
                  className="font-bold text-[#8B1E29] hover:underline cursor-pointer"
                >
                  Order on Blinkit / Find Stores →
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
