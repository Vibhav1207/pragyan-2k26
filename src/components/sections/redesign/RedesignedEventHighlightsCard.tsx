import React from 'react';
import { Landmark, MapPin, GraduationCap } from 'lucide-react';

interface RedesignedEventHighlightsCardProps {
  className?: string;
}

export const RedesignedEventHighlightsCard: React.FC<RedesignedEventHighlightsCardProps> = ({ className = '' }) => {
  return (
    <div className={`w-full rounded-3xl bg-[#162E28] border border-[#A77A1C]/60 p-6 sm:p-8 shadow-2xl relative overflow-hidden text-left ${className}`}>
      
      {/* Background Subtle Watermark Overlay */}
      <div className="absolute right-0 top-0 h-full w-2/3 overflow-hidden pointer-events-none select-none">
        <img
          src="/sanjivani-building.jpg"
          alt="Sanjivani Campus Building"
          className="w-full h-full object-cover opacity-15 filter grayscale mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#162E28] via-[#162E28]/90 to-transparent" />
      </div>

      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-4 relative z-10 pb-6 border-b border-[#D2CAB6]/20">
        <div>
          <div className="w-10 h-1 bg-[#E5BE61] rounded-full mb-3 shadow-sm" />
          
          <div className="font-mono font-bold text-xs sm:text-sm text-[#E5BE61] tracking-[0.2em] uppercase mb-1.5">
            EVENT HIGHLIGHTS
          </div>

          <h3 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl tracking-tight uppercase leading-none text-[#F9F4EA]">
            <span className="text-[#E5BE61]">24 HRS</span> HACKATHON
          </h3>

          <p className="font-sans text-xs sm:text-sm text-[#F3EDE0]/80 tracking-wide mt-2">
            Ideate &bull; Innovate &bull; Collaborate &bull; Create Impact
          </p>
        </div>

        <div className="hidden sm:block text-right shrink-0 select-none pt-1">
          <div className="font-mono text-[10px] text-[#E5BE61]/80 font-extrabold tracking-widest uppercase leading-tight">
            <div>IDEAS</div>
            <div>BUILD</div>
            <div>TOMORROW</div>
          </div>
          <div className="w-6 h-0.5 bg-[#E5BE61] ml-auto mt-1 rounded-full" />
        </div>
      </div>

      {/* Stacked Rows Section */}
      <div className="relative z-10 space-y-1">
        
        {/* Row 1: INSTITUTION */}
        <div className="flex items-center gap-4 sm:gap-5 py-4 border-b border-[#D2CAB6]/20 group">
          <div className="w-12 h-12 rounded-2xl bg-[#2B3E35] border border-[#E5BE61]/40 flex items-center justify-center text-[#F9F4EA] shrink-0 group-hover:bg-[#A77A1C] transition-colors duration-300">
            <Landmark className="w-6 h-6 text-[#E5BE61] group-hover:text-[#F9F4EA] transition-colors stroke-[2]" />
          </div>
          <div>
            <div className="font-mono text-[11px] font-semibold text-[#E5BE61]/80 tracking-wider uppercase mb-0.5">
              INSTITUTION
            </div>
            <a
              href="https://sanjivani.edu.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif font-extrabold text-base sm:text-lg md:text-xl text-[#F9F4EA] tracking-wide uppercase hover:text-[#E5BE61] transition-colors"
            >
              SANJIVANI UNIVERSITY
            </a>
          </div>
        </div>

        {/* Row 2: LOCATION */}
        <div className="flex items-center gap-4 sm:gap-5 py-4 border-b border-[#D2CAB6]/20 group">
          <div className="w-12 h-12 rounded-2xl bg-[#2B3E35] border border-[#E5BE61]/40 flex items-center justify-center text-[#F9F4EA] shrink-0 group-hover:bg-[#A77A1C] transition-colors duration-300">
            <MapPin className="w-6 h-6 text-[#E5BE61] group-hover:text-[#F9F4EA] transition-colors stroke-[2]" />
          </div>
          <div>
            <div className="font-mono text-[11px] font-semibold text-[#E5BE61]/80 tracking-wider uppercase mb-0.5">
              LOCATION
            </div>
            <div className="font-serif font-extrabold text-base sm:text-lg md:text-xl text-[#F9F4EA] tracking-wide uppercase">
              KOPARGAON, NEAR SHIRDI
            </div>
          </div>
        </div>

        {/* Row 3: ELIGIBILITY */}
        <div className="flex items-center gap-4 sm:gap-5 py-4 group">
          <div className="w-12 h-12 rounded-2xl bg-[#2B3E35] border border-[#E5BE61]/40 flex items-center justify-center text-[#F9F4EA] shrink-0 group-hover:bg-[#A77A1C] transition-colors duration-300">
            <GraduationCap className="w-6 h-6 text-[#E5BE61] group-hover:text-[#F9F4EA] transition-colors stroke-[2]" />
          </div>
          <div>
            <div className="font-mono text-[11px] font-semibold text-[#E5BE61]/80 tracking-wider uppercase mb-0.5">
              ELIGIBILITY
            </div>
            <div className="font-serif font-extrabold text-base sm:text-lg md:text-xl text-[#F9F4EA] tracking-wide uppercase">
              UG &bull; PG &bull; PhD
            </div>
          </div>
        </div>

      </div>

      <div className="absolute bottom-5 right-6 text-right z-10 hidden sm:block select-none">
        <div className="w-6 h-0.5 bg-[#E5BE61] ml-auto mb-1 rounded-full" />
        <div className="font-mono text-[10px] font-extrabold text-[#F3EDE0]/60 tracking-widest uppercase leading-tight">
          <div>INNOVATION</div>
          <div>LIVES HERE</div>
        </div>
      </div>

    </div>
  );
};
