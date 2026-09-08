import React, { useRef } from 'react';
import { SpacecraftCanvas } from '../3d/SpacecraftCanvas';

export const SpacecraftScrollBridge: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="w-full py-24 sm:py-32 px-4 sm:px-8 lg:px-16 xl:px-20 bg-[#050505] text-white relative overflow-hidden border-b-2 border-white/10 text-left">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-16 font-mono text-xs sm:text-sm text-slate-300">
        <span className="font-bold text-[#FC3D21]">● 48-HOUR SPRINT CYCLE</span>
        <span>ORBITAL SATELLITE TRANSLATION</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side Large Kinetic Words */}
        <div className="lg:col-span-6 space-y-2 z-10">
          <div className="font-space font-black text-6xl sm:text-8xl lg:text-9xl xl:text-[10rem] tracking-tight text-white uppercase leading-[0.85]">
            BUILD.
          </div>
          <div className="font-space font-black text-6xl sm:text-8xl lg:text-9xl xl:text-[10rem] tracking-tight text-[#FC3D21] uppercase leading-[0.85]">
            TEST.
          </div>
          <div className="font-space font-black text-6xl sm:text-8xl lg:text-9xl xl:text-[10rem] tracking-tight text-white uppercase leading-[0.85]">
            SOLVE.
          </div>
          <div className="font-space font-black text-6xl sm:text-8xl lg:text-9xl xl:text-[10rem] tracking-tight text-[#0B3D91] uppercase leading-[0.85]">
            SUBMIT.
          </div>
        </div>

        {/* Right Side 3D Spacecraft Canvas */}
        <div className="lg:col-span-6 relative h-[360px] sm:h-[500px] lg:h-[600px]">
          <div className="w-full h-full">
            <SpacecraftCanvas className="w-full h-full" />
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs text-slate-300 border-t border-white/10 pt-3">
            <span className="text-[#FC3D21] font-bold">ORBITAL VEHICLE:</span>
            <span>ISS & LANDSAT TELEMETRY</span>
          </div>
        </div>

      </div>
    </section>
  );
};
