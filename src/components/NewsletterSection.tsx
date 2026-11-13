import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle2, ShieldCheck, Gift, Bell, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';

interface NewsletterSectionProps {
  className?: string;
  sourcePage?: string;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({
  className = '',
  sourcePage = 'Home'
}) => {
  const [email, setEmail] = useState('');
  const [perks, setPerks] = useState<string[]>([
    'Drop alerts for limited batches',
    'Secret canteen discount codes'
  ]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const togglePerk = (perk: string) => {
    setPerks((prev) =>
      prev.includes(perk) ? prev.filter((p) => p !== perk) : [...prev, perk]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }

    setError('');
    setSubmitted(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#FBBF24', '#8B1E29', '#10B981']
      });
    } catch {
      // ignore
    }
  };

  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="bg-gradient-to-br from-[#8B1E29] via-[#70141D] to-[#4A0A10] text-white rounded-3xl p-8 sm:p-12 border-2 border-[#FBBF24]/40 shadow-2xl relative overflow-hidden">
        {/* Glow accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FBBF24]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-black/30 border border-[#FBBF24]/40 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-[#FBBF24]">
            <Gift className="w-3.5 h-3.5 text-[#FBBF24]" />
            <span>Join The Chippas Crunch Club</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white text-balance">
            Never miss a secret flavour drop.
          </h2>

          <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed font-body max-w-xl mx-auto">
            Get exclusive campus tuck shop restocking alerts, 15% off coupon codes for your first order, and first dibs on limited regional batches.
          </p>

          {submitted ? (
            <div className="bg-black/40 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-emerald-400/40 text-center space-y-3 animate-in fade-in duration-300">
              <div className="w-12 h-12 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center mx-auto font-black text-xl">
                ✓
              </div>
              <h3 className="text-xl font-black font-display text-white">
                You're officially on the VIP Crunch List!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200">
                Check your inbox at <span className="font-bold underline text-white">{email}</span> for your instant welcome voucher <strong className="text-[#FBBF24] font-black">CRUNCHCLUB15</strong> (15% off).
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setEmail('');
                }}
                className="mt-2 text-xs font-bold text-amber-300 hover:text-white underline cursor-pointer"
              >
                Subscribe another email address
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter your university or personal email..."
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 text-sm font-semibold border-2 border-white/20 focus:border-[#FBBF24] focus:outline-hidden transition-all shadow-inner"
                  />
                </div>

                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-xl bg-[#FBBF24] hover:bg-[#F59E0B] text-slate-950 font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 cursor-pointer border border-amber-300 shrink-0"
                >
                  Join Club
                </button>
              </div>

              {error && (
                <p className="text-xs text-rose-300 font-bold animate-in fade-in">
                  {error}
                </p>
              )}

              {/* Perks check row */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-amber-100">
                {[
                  'Drop alerts for limited batches',
                  'Secret canteen discount codes',
                  'Free tasting sample boxes'
                ].map((perk) => {
                  const isChecked = perks.includes(perk);
                  return (
                    <button
                      type="button"
                      key={perk}
                      onClick={() => togglePerk(perk)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-white/20 border-[#FBBF24] text-white'
                          : 'bg-black/20 border-white/10 text-amber-100/60 hover:text-white'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          isChecked ? 'text-[#FBBF24]' : 'text-white/40'
                        }`}
                      />
                      <span>{perk}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-amber-100/70">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FBBF24]" />
                  Zero spam · Unsubscribe anytime
                </span>
                <span>•</span>
                <span>Exclusive student community perks</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
