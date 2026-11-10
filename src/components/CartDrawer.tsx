import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
  onExploreFlavours: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onExploreFlavours
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPincode, setCustomerPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi'>('upi');
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 199;
  const isFreeShipping = subtotal >= freeShippingThreshold || items.length === 0;
  const shippingFee = isFreeShipping ? 0 : 30;
  const finalTotal = subtotal + shippingFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) return;

    const generatedId = `CHP-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setCheckoutStep('confirmed');
    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#FBBF24', '#8B1E29', '#1E4D2B']
      });
    } catch (err) {
      // ignore
    }
  };

  const handleFinish = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200">
          
          {/* Header */}
          <div className="p-5 border-b border-[#E8DEC8] flex items-center justify-between bg-[#5C0D15] text-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#FBBF24]" />
              <h3 className="font-bold text-lg font-display text-white">
                {checkoutStep === 'cart' && 'Your Crunch Bag'}
                {checkoutStep === 'checkout' && 'Quick Delivery Checkout'}
                {checkoutStep === 'confirmed' && 'Crunch Confirmed!'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {checkoutStep === 'cart' && (
              <>
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center text-[#8B1E29]">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 font-display">
                        Your bag is empty!
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Pick your favourite flavour from the authentic 6-pack lineup.
                      </p>
                    </div>
                    {/* Yellow CTA Button */}
                    <button
                      onClick={() => {
                        onClose();
                        onExploreFlavours();
                      }}
                      className="px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider text-slate-950 bg-[#FBBF24] hover:bg-[#F59E0B] shadow-sm hover:shadow transition-colors"
                    >
                      Explore All Flavours
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Free shipping bar */}
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                      {isFreeShipping ? (
                        <div className="flex items-center gap-1.5 font-bold text-amber-950">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Unlocked Free Express Shipping!</span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-slate-700">
                            Add <strong className="text-[#8B1E29]">₹{freeShippingThreshold - subtotal}</strong> more for Free Shipping!
                          </span>
                          <div className="w-full bg-amber-200 rounded-full h-1.5 mt-2 overflow-hidden">
                            <div
                              className="bg-[#8B1E29] h-full rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Items List */}
                    <div className="divide-y divide-slate-100">
                      {items.map((item) => (
                        <div key={`${item.product.id}-${item.selectedSize}`} className="py-3.5 flex items-center justify-between gap-3">
                          <div className="flex-1">
                            <h5 className="text-sm font-bold text-slate-900 font-display">
                              {item.product.name}
                            </h5>
                            <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                              <span>Pack: {item.selectedSize}</span>
                              <span>·</span>
                              <span className="font-black text-[#8B1E29] tabular-nums">₹{item.price} each</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                                className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-l font-bold text-xs"
                              >
                                -
                              </button>
                              <span className="w-6 text-center text-xs font-bold text-slate-900 tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                                className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-200 rounded-r font-bold text-xs"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                              className="p-1.5 text-slate-400 hover:text-red-600 rounded transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {checkoutStep === 'checkout' && (
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="bg-[#FAF7F0] p-3 rounded-xl border border-[#E8DEC8] text-xs text-slate-700 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>Direct Campus & Metro Delivery · Dispatched within 24 hours</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Samiksha Sharma"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E29]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E29]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">PIN Code</label>
                    <input
                      type="text"
                      required
                      value={customerPincode}
                      onChange={(e) => setCustomerPincode(e.target.value)}
                      placeholder="e.g. 110007"
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E29]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Address</label>
                  <textarea
                    rows={2}
                    required
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Hostel, Flat, Building, Street..."
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E29]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Payment Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        paymentMethod === 'upi'
                          ? 'border-[#8B1E29] bg-amber-50 font-bold text-slate-900 ring-1 ring-[#8B1E29]'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      Instant UPI / QR
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-[#8B1E29] bg-amber-50 font-bold text-slate-900 ring-1 ring-[#8B1E29]'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      Cash on Delivery
                    </button>
                  </div>
                </div>
              </form>
            )}

            {checkoutStep === 'confirmed' && (
              <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
                    Order Successful
                  </span>
                  <h4 className="text-xl font-black text-slate-900 font-display mt-1">
                    Order #{orderId}
                  </h4>
                  <p className="text-xs text-slate-600 mt-2">
                    Thank you, <strong>{customerName}</strong>! Your fresh CHIPAS crunch pack is being packed with zero palm oil.
                  </p>
                </div>

                <div className="w-full bg-[#FAF7F0] p-3.5 rounded-2xl border border-[#E8DEC8] text-xs text-left space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Shipping to:</span>
                    <span className="font-semibold text-slate-800 truncate max-w-[200px]">{customerAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimated Delivery:</span>
                    <span className="font-bold text-emerald-700">Tomorrow by 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Paid:</span>
                    <span className="font-black text-[#8B1E29]">₹{finalTotal}</span>
                  </div>
                </div>

                <button
                  onClick={handleFinish}
                  className="w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider text-slate-950 bg-[#FBBF24] hover:bg-[#F59E0B] transition-colors"
                >
                  Done & Back to Store
                </button>
              </div>
            )}
          </div>

          {/* Footer Checkout Actions with Signature Yellow CTA */}
          {checkoutStep !== 'confirmed' && items.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-[#FFFDF9] space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900 tabular-nums">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="font-semibold text-slate-900">
                    {shippingFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-1 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-[#8B1E29] font-black text-lg font-display tabular-nums">₹{finalTotal}</span>
                </div>
              </div>

              {checkoutStep === 'cart' ? (
                <button
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider text-slate-950 bg-[#FBBF24] hover:bg-[#F59E0B] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 cursor-pointer border border-amber-300"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="py-3 px-4 rounded-xl font-bold text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    form="checkout-form"
                    className="flex-1 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider text-slate-950 bg-[#FBBF24] hover:bg-[#F59E0B] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 cursor-pointer border border-amber-300"
                  >
                    <span>Confirm Order · ₹{finalTotal}</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
