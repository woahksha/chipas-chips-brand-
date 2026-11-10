import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Smartphone, Keyboard, Gamepad2, BookOpen, Check, RefreshCw } from 'lucide-react';

export const GrabberDemo: React.FC = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [grabCount, setGrabCount] = useState(0);

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      // Pick chip!
      setGrabCount((prev) => prev + 1);
      try {
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { y: 0.7 },
          colors: ['#FBBF24', '#E63946', '#22C55E']
        });
      } catch (e) {
        // ignore
      }
    }
  };

  const handleReset = () => {
    setStep(1);
    setGrabCount(0);
  };

  return (
    <div className="bg-[#FAF6EC] border border-[#E8DEC8] rounded-3xl p-6 md:p-8 shadow-sm">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        
        {/* Left Interactive Visual Stage */}
        <div className="relative w-full max-w-[340px] aspect-square bg-[#FFFDF9] rounded-2xl border-2 border-dashed border-[#DFD5BE] flex flex-col items-center justify-center p-6 overflow-hidden">
          
          {/* Status badge */}
          <div className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
            Interactive Innovation Lab
          </div>

          {/* Reset button */}
          {step > 1 && (
            <button
              onClick={handleReset}
              className="absolute top-3 right-3 text-xs flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors bg-white px-2 py-1 rounded-md border border-slate-200"
              title="Reset demo"
            >
              <RefreshCw className="w-3 h-3" />
              Reset
            </button>
          )}

          {/* Step 1: Pack with Perforated Corner */}
          {step === 1 && (
            <div className="relative flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="relative w-36 h-48 bg-gradient-to-b from-[#E63946] to-[#991B1B] rounded-xl shadow-md p-3 flex flex-col justify-between text-white border border-white/20">
                {/* Perforated corner */}
                <div
                  onClick={handleNextStep}
                  className="absolute -top-1 -right-1 w-14 h-14 bg-amber-400 rounded-tr-xl cursor-pointer hover:bg-amber-300 transition-all shadow-sm flex flex-col items-center justify-center text-[#1E1B18] group"
                >
                  <span className="text-[10px] font-black tracking-widest group-hover:scale-110 transition-transform">
                    PULL
                  </span>
                  <span className="text-[8px] font-bold text-amber-900">▼</span>
                </div>
                
                <span className="text-[9px] font-bold tracking-widest opacity-80 uppercase">CHIPAS</span>
                <div className="my-auto">
                  <span className="text-xl font-black text-amber-300 font-display">Chipas</span>
                  <p className="text-[9px] text-amber-100">Perforated Corner Ready</p>
                </div>
                <div className="bg-white/20 rounded py-0.5 text-[8px] font-bold">1 TUG · ZERO MESS</div>
              </div>
              <p className="mt-4 text-xs font-semibold text-slate-600">
                Click the yellow <span className="text-red-600 font-bold">PULL</span> tab on the pack corner!
              </p>
            </div>
          )}

          {/* Step 2: Unfolding Grabber Strip */}
          {step === 2 && (
            <div className="relative flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="w-40 h-28 flex items-center justify-center">
                {/* Visual curved grabber */}
                <svg width="140" height="90" viewBox="0 0 140 90" fill="none">
                  {/* Bend line */}
                  <path
                    d="M 20 65 C 20 15, 120 15, 120 65"
                    stroke="#F59E0B"
                    strokeWidth="12"
                    strokeLinecap="round"
                    className="drop-shadow-md"
                  />
                  <path
                    d="M 20 65 C 20 15, 120 15, 120 65"
                    stroke="#FDE68A"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Grip pads */}
                  <circle cx="20" cy="65" r="8" fill="#B45309" />
                  <circle cx="120" cy="65" r="8" fill="#B45309" />
                </svg>
              </div>
              <div className="mt-2 text-center">
                <span className="inline-block text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full mb-1">
                  Flexible Grabber Ready
                </span>
                <p className="text-xs text-slate-600">
                  It transforms into durable food-safe pinchers!
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Clean Pinch In Action */}
          {step === 3 && (
            <div className="relative flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="relative w-44 h-36 flex items-center justify-center">
                {/* Pinch tongs holding chip */}
                <div className="relative flex items-center justify-center">
                  {/* Grabber Arms */}
                  <div className="absolute -left-6 top-0 w-8 h-20 border-r-4 border-amber-500 rounded-r-2xl transform rotate-12" />
                  <div className="absolute -right-6 top-0 w-8 h-20 border-l-4 border-amber-500 rounded-l-2xl transform -rotate-12" />
                  
                  {/* Crispy Chip */}
                  <div className="w-20 h-16 rounded-[45%_55%_60%_40%/50%_60%_40%_50%] bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 shadow-xl border-2 border-amber-200 flex items-center justify-center transform hover:rotate-6 transition-transform">
                    <span className="text-[10px] font-black text-amber-950/70">CRUNCH!</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <span className="text-xs font-bold text-slate-800">
                  Clean Chips Grabbed: <strong className="text-red-600 text-sm">{grabCount}</strong>
                </span>
                <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
                  ✓ 100% Grease-Free Fingers Guaranteed
                </p>
              </div>
            </div>
          )}

          {/* Action trigger button */}
          <button
            onClick={handleNextStep}
            className="mt-4 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#8B1E29] hover:bg-[#A51C28] transition-all shadow hover:shadow-md active:scale-95"
          >
            {step === 1 && '1. Pull Perforated Corner'}
            {step === 2 && '2. Unfold into Grabber'}
            {step === 3 && '3. Pinch & Crunch Clean!'}
          </button>
        </div>

        {/* Right Explanatory Innovation Narrative */}
        <div className="flex-1 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-black tracking-widest uppercase text-[#8B1E29]">
              The Clever Corner™ Innovation
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-display">
              Greasy fingers? <span className="text-[#8B1E29] italic">Not today.</span>
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every CHIPAS pack integrates our signature pull-out corner grabber. Tear the corner, unfold the durable flexible tongs, and snack while you work, game, or study without oily residue.
            </p>
          </div>

          {/* 3 Step Sequence Cards */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div
              onClick={() => setStep(1)}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                step === 1
                  ? 'bg-amber-50 border-amber-400 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-xs font-extrabold text-[#8B1E29]">01. Pull</div>
              <p className="text-[11px] text-slate-600 mt-0.5">Tear the perforated tab</p>
            </div>

            <div
              onClick={() => setStep(2)}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                step === 2
                  ? 'bg-amber-50 border-amber-400 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-xs font-extrabold text-[#8B1E29]">02. Unfold</div>
              <p className="text-[11px] text-slate-600 mt-0.5">Becomes flexible tongs</p>
            </div>

            <div
              onClick={() => setStep(3)}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                step === 3
                  ? 'bg-amber-50 border-amber-400 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-xs font-extrabold text-[#8B1E29]">03. Pinch</div>
              <p className="text-[11px] text-slate-600 mt-0.5">Zero oil on your fingers</p>
            </div>
          </div>

          {/* Keeps Clean Benefit Strip */}
          <div className="pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Keeps all your essentials spotless:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="flex items-center gap-1.5 p-2 bg-white rounded-lg border border-slate-200 text-xs font-medium text-slate-700">
                <Smartphone className="w-3.5 h-3.5 text-amber-600" />
                <span>Phone Screen</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 bg-white rounded-lg border border-slate-200 text-xs font-medium text-slate-700">
                <Keyboard className="w-3.5 h-3.5 text-blue-600" />
                <span>Keyboard</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 bg-white rounded-lg border border-slate-200 text-xs font-medium text-slate-700">
                <Gamepad2 className="w-3.5 h-3.5 text-purple-600" />
                <span>Controller</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 bg-white rounded-lg border border-slate-200 text-xs font-medium text-slate-700">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>Study Notes</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
