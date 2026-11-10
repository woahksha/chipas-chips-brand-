import React, { useState, useEffect } from 'react';
import { X, Cookie, Shield, Check } from 'lucide-react';

interface CookieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CookieModal: React.FC<CookieModalProps> = ({ isOpen, onClose }) => {
  const [essential] = useState(true); // Locked on
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedPrefs = localStorage.getItem('chipas_cookie_preferences');
    if (savedPrefs) {
      try {
        const parsed = JSON.parse(savedPrefs);
        setAnalytics(parsed.analytics ?? true);
        setMarketing(parsed.marketing ?? false);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  if (!isOpen) return null;

  const handleSave = () => {
    localStorage.setItem(
      'chipas_cookie_preferences',
      JSON.stringify({ essential: true, analytics, marketing, timestamp: Date.now() })
    );
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  const handleAcceptAll = () => {
    setAnalytics(true);
    setMarketing(true);
    localStorage.setItem(
      'chipas_cookie_preferences',
      JSON.stringify({ essential: true, analytics: true, marketing: true, timestamp: Date.now() })
    );
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 z-10 space-y-5 animate-in zoom-in-95">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#8B1E29]">
            <Cookie className="w-5 h-5" />
            <h3 className="font-bold text-lg text-slate-900 font-display">
              Cookie & Privacy Preferences
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          We use cookies and similar technologies to enhance your snacking journey, remember your bag contents, and improve website speed. You can manage your preferences below.
        </p>

        {/* Toggles */}
        <div className="space-y-3">
          {/* Essential */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="pr-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">Essential Snack Cookies</span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                  Required
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Necessary for core store functions, crunch bag persistence, and security. Cannot be switched off.
              </p>
            </div>
            <input
              type="checkbox"
              checked={essential}
              disabled
              className="w-4 h-4 text-[#8B1E29] rounded cursor-not-allowed opacity-75"
            />
          </div>

          {/* Analytics */}
          <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
            <div className="pr-4">
              <span className="text-xs font-bold text-slate-900">Performance & Analytics</span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Helps us measure which flavour pages are loved most so we can stock the right chips.
              </p>
            </div>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="w-4 h-4 text-[#8B1E29] accent-[#8B1E29] rounded cursor-pointer"
            />
          </div>

          {/* Marketing */}
          <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-between">
            <div className="pr-4">
              <span className="text-xs font-bold text-slate-900">Marketing & Tailored Crunches</span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Allows us to share regional drop announcements and exclusive student campus offers.
              </p>
            </div>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="w-4 h-4 text-[#8B1E29] accent-[#8B1E29] rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleAcceptAll}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#8B1E29] hover:bg-[#A51C28] transition-colors flex items-center justify-center gap-1.5"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save Preferences</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
