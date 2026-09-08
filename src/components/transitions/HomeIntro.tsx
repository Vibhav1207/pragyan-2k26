import React, { useEffect, useState } from 'react';

interface HomeIntroProps {
  onComplete: () => void;
  forcePlay?: boolean;
}

export const HomeIntro: React.FC<HomeIntroProps> = ({ onComplete, forcePlay = false }) => {
  const [step, setStep] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const hasSeen = !forcePlay && sessionStorage.getItem('pragyan2k26IntroSeen') === 'true';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeen || prefersReducedMotion) {
      onComplete();
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2.5;
      });
    }, 40);

    const t1 = setTimeout(() => setStep(1), 600);
    const t2 = setTimeout(() => setStep(2), 1200);
    const t3 = setTimeout(() => setStep(3), 1800);
    const tFinish = setTimeout(() => {
      sessionStorage.setItem('pragyan2k26IntroSeen', 'true');
      onComplete();
    }, 2400);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tFinish);
    };
  }, [onComplete, forcePlay]);

  const stepLabels = [
    'INITIALIZING PRAGYAN 2K26 ENGINE...',
    'ALIGNING SDG GOAL 2030 FRAMEWORK...',
    'SANJIVANI UNIVERSITY, KOPARGAON LOCKED',
    'NATIONAL LEVEL HACKATHON READY'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] text-white flex flex-col justify-between p-6 sm:p-12 overflow-hidden text-left font-mono">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b-2 border-white/20 pb-4 text-xs z-20">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-[#FC3D21] border border-white" />
          <span className="font-space font-black text-sm text-white uppercase tracking-wider">
            SANJIVANI UNIVERSITY
          </span>
        </div>
        <div className="font-mono text-xs font-bold text-[#FFD600] px-2.5 py-1 bg-white/10 border border-white/20">
          PRAGYAN 2K26
        </div>
      </div>

      {/* Center Editorial Card */}
      <div className="my-auto max-w-4xl mx-auto w-full border-3 border-white p-8 sm:p-12 bg-[#050505] shadow-brutal-yellow space-y-6 text-left">
        <div className="inline-block px-3 py-1 bg-[#FC3D21] text-white font-mono text-xs font-extrabold tracking-widest uppercase">
          NATIONAL LEVEL HACKATHON
        </div>

        <div className="space-y-2">
          <h1 className="font-space font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-none uppercase">
            PRAGYAN <span className="text-[#FFD600]">2K26</span>
          </h1>
          <p className="font-mono text-sm sm:text-base text-slate-300 font-bold uppercase tracking-wider">
            INNOVATION & ENTREPRENEURSHIP ON SDG GOAL 2030
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/20 text-xs font-mono">
          <div className="p-3 border border-white/20 bg-white/5">
            <span className="block text-slate-400 text-[10px]">SPRINT</span>
            <span className="font-extrabold text-white">24 HOURS</span>
          </div>
          <div className="p-3 border border-white/20 bg-white/5">
            <span className="block text-slate-400 text-[10px]">TEAM</span>
            <span className="font-extrabold text-[#FFD600]">4 MEMBERS</span>
          </div>
          <div className="p-3 border border-white/20 bg-white/5">
            <span className="block text-slate-400 text-[10px]">TRACKS</span>
            <span className="font-extrabold text-[#FC3D21]">4 TRACKS</span>
          </div>
          <div className="p-3 border border-white/20 bg-white/5">
            <span className="block text-slate-400 text-[10px]">DOMAINS</span>
            <span className="font-extrabold text-white">UG • PG • PhD</span>
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="space-y-3 z-20 max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-[#FFD600] font-mono">{stepLabels[step]}</span>
          <span className="text-white font-mono">{Math.min(100, Math.round(progress))}%</span>
        </div>

        <div className="w-full h-3 bg-white/10 border border-white/30 p-0.5">
          <div
            className="h-full bg-[#FC3D21] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
