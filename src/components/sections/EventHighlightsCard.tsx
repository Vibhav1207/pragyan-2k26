import React from 'react';
import { Landmark, MapPin, GraduationCap } from 'lucide-react';

interface EventHighlightsCardProps {
  className?: string;
}

export const EventHighlightsCard: React.FC<EventHighlightsCardProps> = ({ className = '' }) => {
  return (
    <div className={`w-full rounded-3xl sm:rounded-[32px] bg-[#060D1E]/95 border border-[#1E3A70]/70 p-6 sm:p-8 md:p-9 shadow-2xl relative backdrop-blur-xl overflow-hidden text-left ${className}`}>
      
      {/* Background Campus Image Overlay */}
      <div className="absolute right-0 top-0 h-full w-2/3 overflow-hidden pointer-events-none select-none">
        <img
          src="/sanjivani-building.jpg"
          alt="Sanjivani Campus Building"
          className="w-full h-full object-cover object-center opacity-20 filter contrast-125 brightness-90 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060D1E] via-[#060D1E]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060D1E] via-transparent to-[#060D1E]/50" />
      </div>

      {/* Bottom Right Glowing Golden Slash Accent */}
      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-gradient-to-tl from-[#FFD600]/20 via-[#EAB308]/5 to-transparent transform rotate-45 pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-4 relative z-10 pb-6">
        <div>
          {/* Top Yellow Bar */}
          <div className="w-10 h-1 bg-[#FFD600] rounded-full mb-3 shadow-[0_0_8px_#FFD600]" />
          
          {/* Subheader */}
          <div className="font-mono font-bold text-xs sm:text-sm text-[#FFD600] tracking-[0.2em] uppercase mb-1.5">
            EVENT HIGHLIGHTS
          </div>

          {/* Main Title */}
          <h3 className="font-space font-black text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase leading-none text-white">
            <span className="text-[#FFD600] drop-shadow-[0_0_12px_rgba(255,214,0,0.3)]">24 HRS</span> HACKATHON
          </h3>

          {/* Subtitle */}
          <p className="font-mono text-xs sm:text-sm text-[#8AA4CB] tracking-wide mt-2">
            Code &bull; Collaborate &bull; Create &bull; Beyond
          </p>
        </div>

        {/* Top Right Slogan */}
        <div className="hidden sm:block text-right shrink-0 select-none pt-1">
          <div className="font-mono text-[10px] text-slate-400 font-extrabold tracking-widest uppercase leading-tight">
            <div>IDEAS</div>
            <div>BUILD</div>
            <div>TOMORROW</div>
          </div>
          <div className="w-6 h-0.5 bg-[#FFD600] ml-auto mt-1 rounded-full shadow-[0_0_6px_#FFD600]" />
        </div>
      </div>

      {/* Stacked Rows Section */}
      <div className="relative z-10 space-y-1">
        
        {/* Row 1: INSTITUTION */}
        <div className="flex items-center gap-4 sm:gap-5 py-4 border-b border-[#1E3A70]/50 group">
          <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-[#102444] border border-[#2563EB]/40 flex items-center justify-center text-white shrink-0 shadow-inner group-hover:scale-105 group-hover:border-[#FFD600]/60 transition-all duration-300">
            <Landmark className="w-6 h-6 text-[#60A5FA] group-hover:text-[#FFD600] transition-colors stroke-[2]" />
          </div>
          <div>
            <div className="font-mono text-[11px] font-semibold text-[#7E99C2] tracking-wider uppercase mb-0.5">
              INSTITUTION
            </div>
            <a
              href="https://sanjivani.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-space font-extrabold text-base sm:text-lg md:text-xl text-white tracking-wide uppercase hover:text-[#FFD600] transition-colors"
            >
              SANJIVANI UNIVERSITY
            </a>
          </div>
        </div>

        {/* Row 2: LOCATION */}
        <div className="flex items-center gap-4 sm:gap-5 py-4 border-b border-[#1E3A70]/50 group">
          <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-[#102444] border border-[#2563EB]/40 flex items-center justify-center text-white shrink-0 shadow-inner group-hover:scale-105 group-hover:border-[#FFD600]/60 transition-all duration-300">
            <MapPin className="w-6 h-6 text-[#60A5FA] group-hover:text-[#FFD600] transition-colors stroke-[2]" />
          </div>
          <div>
            <div className="font-mono text-[11px] font-semibold text-[#7E99C2] tracking-wider uppercase mb-0.5">
              LOCATION
            </div>
            <div className="font-space font-extrabold text-base sm:text-lg md:text-xl text-white tracking-wide uppercase">
              KOPARGAON, NEAR SHIRDI
            </div>
          </div>
        </div>

        {/* Row 3: ELIGIBILITY */}
        <div className="flex items-center gap-4 sm:gap-5 py-4 group">
          <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-[#102444] border border-[#2563EB]/40 flex items-center justify-center text-white shrink-0 shadow-inner group-hover:scale-105 group-hover:border-[#FFD600]/60 transition-all duration-300">
            <GraduationCap className="w-6 h-6 text-[#60A5FA] group-hover:text-[#FFD600] transition-colors stroke-[2]" />
          </div>
          <div>
            <div className="font-mono text-[11px] font-semibold text-[#7E99C2] tracking-wider uppercase mb-0.5">
              ELIGIBILITY
            </div>
            <div className="font-space font-extrabold text-base sm:text-lg md:text-xl text-white tracking-wide uppercase">
              UG &bull; PG &bull; PhD
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Right Slogan */}
      <div className="absolute bottom-5 right-6 text-right z-10 hidden sm:block select-none">
        <div className="w-6 h-0.5 bg-[#FFD600] ml-auto mb-1 rounded-full shadow-[0_0_6px_#FFD600]" />
        <div className="font-mono text-[10px] font-extrabold text-slate-400 tracking-widest uppercase leading-tight">
          <div>INNOVATION</div>
          <div>LIVES HERE</div>
        </div>
      </div>

    </div>
  );
};
