import React, { useState } from 'react';
import { X, Send, CheckCircle2, Mail, MessageSquare, Instagram } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Stocking in My Campus/City');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitted(true);
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-200 z-10 animate-in zoom-in-95">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B1E29] bg-amber-50 px-2 py-0.5 rounded">
                Get In Touch
              </span>
              <h3 className="text-2xl font-black text-slate-900 font-display mt-1">
                Say hello to team CHIPAS!
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Want to stock CHIPAS in your university campus, collaborate on regional flavour drops, or share feedback? Drop us a note!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Samiksha"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E29]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="samiksha@example.com"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E29]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">What can we help you with?</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E29] bg-white"
                >
                  <option value="Stocking in My Campus/City">Stocking in My Campus / City Hub</option>
                  <option value="Retail Partnership & Quick Commerce">Retail Partnership & Quick Commerce</option>
                  <option value="Flavour Feedback & Spice Suggestions">Flavour Feedback & Spice Suggestions</option>
                  <option value="Press & Student Venture Story">Press & Student Venture Story</option>
                  <option value="Other">Other Inquiries</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Message</label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what's on your mind..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E29]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#8B1E29] hover:bg-[#A51C28] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#8B1E29]" />
                <span>hello@chipas.in</span>
              </span>
              <span className="flex items-center gap-1">
                <Instagram className="w-3.5 h-3.5 text-pink-600" />
                <span>@chipas.in</span>
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 font-display">
                Message Received!
              </h3>
              <p className="text-xs text-slate-600 mt-2 max-w-xs mx-auto">
                Thank you, <strong>{name}</strong>! We've received your note regarding <em>"{category}"</em>. Our founding team will reach back within 24 hours.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="py-2.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#8B1E29] hover:bg-[#A51C28] transition-colors"
            >
              Back to Browsing
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
