import React, { useEffect, useState } from 'react';

interface CinematicLoadingProps {
  onComplete: () => void;
}

export const CinematicLoading: React.FC<CinematicLoadingProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('pragyan_2k26_loaded');
    if (hasSeen === 'true') {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          sessionStorage.setItem('pragyan_2k26_loaded', 'true');
          onComplete();
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] text-white flex flex-col justify-between p-6 sm:p-10 font-mono">
      <div className="flex items-center justify-between text-xs border-b border-white/20 pb-4">
        <span className="font-space font-black text-sm text-[#FFD600]">SANJIVANI UNIVERSITY</span>
        <span className="text-white font-bold">PRAGYAN 2K26</span>
      </div>

      <div className="my-auto max-w-xl mx-auto w-full text-center space-y-4">
        <h2 className="font-space font-black text-4xl sm:text-5xl text-white uppercase">
          PRAGYAN <span className="text-[#FC3D21]">2K26</span>
        </h2>
        <p className="font-mono text-xs text-[#FFD600] font-bold uppercase">
          INNOVATION & ENTREPRENEURSHIP ON SDG GOAL 2030
        </p>

        <div className="w-full h-3 bg-white/10 border border-white/30 p-0.5 mt-6">
          <div className="h-full bg-[#FC3D21] transition-all duration-75" style={{ width: `${progress}%` }} />
        </div>
        <div className="text-xs text-slate-300 font-bold">{progress}% READY</div>
      </div>

      <div className="text-center text-[11px] text-slate-400">
        SANJIVANI CAMPUS • KOPARGAON, MAHARASHTRA
      </div>
    </div>
  );
};
