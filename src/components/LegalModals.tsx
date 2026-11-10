import React from 'react';
import { X, FileText, Eye, AlertCircle, HelpCircle } from 'lucide-react';
import { FAQ_LIST } from '../data/products';

export type LegalModalType = 'terms' | 'accessibility' | 'ads' | 'faq' | null;

interface LegalModalProps {
  type: LegalModalType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-200 z-10 flex flex-col justify-between overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-[#8B1E29]">
            {type === 'terms' && <FileText className="w-5 h-5" />}
            {type === 'accessibility' && <Eye className="w-5 h-5" />}
            {type === 'ads' && <AlertCircle className="w-5 h-5" />}
            {type === 'faq' && <HelpCircle className="w-5 h-5" />}
            <h3 className="font-bold text-xl text-slate-900 font-display">
              {type === 'terms' && 'Terms of Use (Draft Preview)'}
              {type === 'accessibility' && 'Accessibility Statement'}
              {type === 'ads' && 'About Our Ads & Marketing'}
              {type === 'faq' && 'Frequently Asked Questions'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs text-slate-600 leading-relaxed pr-2">
          
          {type === 'terms' && (
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 font-medium">
                Note: This is clearly labelled draft demonstration content for the CHIPAS digital experience.
              </div>
              <h4 className="font-bold text-sm text-slate-900">1. Acceptance of Terms</h4>
              <p>
                By visiting or ordering through the CHIPAS platform, you agree to abide by these terms. CHIPAS is a contemporary snack brand committed to transparent snacking, regional recipe inspiration, and honest food labelling.
              </p>
              <h4 className="font-bold text-sm text-slate-900">2. Product Presentation & Availability</h4>
              <p>
                While we strive to display packaging visuals and spice metrics as accurately as possible, seasonal harvesting of regional potatoes and spices may cause natural batch variations in colour and crunch.
              </p>
              <h4 className="font-bold text-sm text-slate-900">3. The Clever Corner™ Grabber</h4>
              <p>
                The integrated pack grabber is made of food-grade, recyclable flexible materials intended exclusively for grabbing potato chips and keeping fingers grease-free.
              </p>
              <h4 className="font-bold text-sm text-slate-900">4. Orders & Deliveries</h4>
              <p>
                Campus deliveries and online orders are fulfilled through verified retail partners. Prices are inclusive of all applicable taxes.
              </p>
            </div>
          )}

          {type === 'accessibility' && (
            <div className="space-y-3">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 font-medium">
                CHIPAS is committed to digital inclusivity and accessible web experiences for all snack lovers.
              </div>
              <h4 className="font-bold text-sm text-slate-900">Our Accessibility Standards</h4>
              <p>
                We conform to the Web Content Accessibility Guidelines (WCAG 2.1) Level AA. This includes:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>High-contrast text ratios for effortless readability.</li>
                <li>Full keyboard navigation for all interactive controls, bag modals, and filters.</li>
                <li>Descriptive alternative text for product illustrations and regional maps.</li>
                <li>Visible focus rings and respect for reduced-motion browser preferences.</li>
              </ul>
              <h4 className="font-bold text-sm text-slate-900">Need Assistance?</h4>
              <p>
                If you encounter any difficulty navigating our site or reading nutritional cards, please reach out to our team at accessibility@chipas.in.
              </p>
            </div>
          )}

          {type === 'ads' && (
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-900">Honest Advertising Policy</h4>
              <p>
                At CHIPAS, our motto is "Love the crunch. Read the label." We refuse to use misleading food claims or hidden fine print:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>No Palm Oil:</strong> When we say No Palm Oil, we mean 100% zero palm oil in our cooking and frying oils.</li>
                <li><strong>Grams Up Front:</strong> Net weight is shown visibly on the front panel, not tucked away in microscopic font.</li>
                <li><strong>Regional Authenticity:</strong> Our spice profiles are inspired by genuine culinary practices from Kerala, West Bengal, and Gujarat.</li>
              </ul>
            </div>
          )}

          {type === 'faq' && (
            <div className="space-y-3">
              {FAQ_LIST.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-xs text-[#8B1E29] mb-1">
                    {item.question}
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#8B1E29] hover:bg-[#A51C28] transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
