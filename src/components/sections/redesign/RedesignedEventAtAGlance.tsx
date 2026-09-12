import React from 'react';
import { Users, Clock, MapPin, ArrowRight, TrendingUp } from 'lucide-react';
import { AnimatedCounter } from '../../ui/AnimatedCounter';

interface RedesignedEventAtAGlanceProps {
  className?: string;
}

export const RedesignedEventAtAGlance: React.FC<RedesignedEventAtAGlanceProps> = ({ className = '' }) => {
  return (
    <div className={`w-full rounded-3xl bg-[#F3EDE0] border border-[#D2CAB6] p-6 sm:p-7 xl:p-8 shadow-xl relative overflow-hidden text-left ${className}`}>
      
      {/* Subtle Background Watermark Graphic */}
      <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 pointer-events-none opacity-5 font-serif font-black text-9xl text-[#162E28] select-none">
        2K26
      </div>

      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 relative z-10 border-b border-[#D2CAB6]/80 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#162E28]/10 border border-[#162E28]/20 text-[#162E28] text-[11px] font-mono font-extrabold uppercase tracking-widest mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-[#A77A1C]" />
            <span>KEY EXECUTIVE SUMMARY</span>
          </div>
          
          <h2 className="font-serif font-black text-2xl sm:text-3xl xl:text-4xl text-[#162E28] tracking-tight uppercase leading-none">
            EVENT <span className="italic font-normal text-[#A77A1C]">AT A GLANCE</span>
          </h2>
          
          <p className="font-sans text-xs sm:text-sm text-[#7B8379] font-medium mt-1">
            Essential operational details for national delegates.
          </p>
        </div>

        {/* Decorative Editorial Tag */}
        <div className="hidden sm:flex items-center gap-3 shrink-0 select-none">
          <div className="font-mono text-[9px] text-[#A77A1C] font-extrabold tracking-widest uppercase text-right leading-snug border-r border-[#D2CAB6] pr-3">
            <div>BBA INNOVATION</div>
            <div>SDG GOAL 2030</div>
            <div>SANJIVANI UNIV</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#162E28] text-[#E5BE61] font-serif font-bold text-xs flex items-center justify-center border border-[#A77A1C]/40">
            24h
          </div>
        </div>
      </div>

      {/* 3 Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 relative z-10">
        
        {/* Card 1: TEAM COMPOSITION */}
        <div className="bg-[#F9F4EA] border border-[#D2CAB6] rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden hover:border-[#A77A1C] transition-all duration-300 group shadow-sm">
          <div>
            <div className="w-11 h-11 rounded-xl bg-[#E9E1D2] border border-[#A77A1C]/30 flex items-center justify-center mb-4 group-hover:bg-[#162E28] group-hover:text-[#F9F4EA] transition-colors duration-300">
              <Users className="w-5 h-5 text-[#A77A1C] group-hover:text-[#E5BE61] transition-colors" />
            </div>

            <div className="font-mono text-[10px] font-bold text-[#7B8379] tracking-widest uppercase mb-1">
              TEAM COMPOSITION
            </div>

            <div className="font-serif font-black text-2xl xl:text-3xl text-[#162E28] tracking-tight flex items-baseline gap-1.5 mb-0.5">
              <AnimatedCounter value={4} /> MEMBERS
            </div>

            <div className="font-sans text-[11px] font-semibold text-[#A77A1C] uppercase tracking-wider">
              PER DELEGATE TEAM
            </div>
          </div>

          <div className="w-8 h-0.5 bg-[#A77A1C] rounded-full mt-4" />
        </div>

        {/* Card 2: FIRST ROUND FEE (Highlighted Dark Forest Green + Gold Card) */}
        <div className="bg-[#162E28] border border-[#A77A1C] rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div>
            <div className="w-11 h-11 rounded-xl bg-[#2B3E35] border border-[#E5BE61]/40 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
              <svg className="w-5 h-5 text-[#E5BE61]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="14" cy="7" rx="6" ry="3.5" fill="#162E28" />
                <path d="M8 7v4c0 1.93 2.69 3.5 6 3.5s6-1.57 6-3.5V7" />
                <path d="M8 11v4c0 1.93 2.69 3.5 6 3.5s6-1.57 6-3.5v-4" />
                <circle cx="9" cy="14" r="5.5" fill="#2B3E35" stroke="currentColor" strokeWidth="1.8" />
                <text x="6.8" y="16.5" fill="#E5BE61" stroke="none" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">₹</text>
              </svg>
            </div>

            <div className="font-mono text-[10px] font-bold text-[#E5BE61]/80 tracking-widest uppercase mb-1">
              FIRST ROUND FEE
            </div>

            <div className="font-serif font-black text-2xl xl:text-3xl text-[#E5BE61] tracking-tight flex items-baseline gap-0.5 mb-0.5">
              <AnimatedCounter value={500} prefix="₹" />
            </div>

            <div className="font-sans text-[11px] font-semibold text-[#F9F4EA]/90 uppercase tracking-wider">
              REGISTRATION PER TEAM
            </div>
          </div>

          <div className="w-8 h-0.5 bg-[#E5BE61] rounded-full mt-4" />
        </div>

        {/* Card 3: SPRINT DURATION */}
        <div className="bg-[#F9F4EA] border border-[#D2CAB6] rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden hover:border-[#A77A1C] transition-all duration-300 group shadow-sm">
          <div>
            <div className="w-11 h-11 rounded-xl bg-[#E9E1D2] border border-[#A77A1C]/30 flex items-center justify-center mb-4 group-hover:bg-[#162E28] group-hover:text-[#F9F4EA] transition-colors duration-300">
              <Clock className="w-5 h-5 text-[#A77A1C] group-hover:text-[#E5BE61] transition-colors" />
            </div>

            <div className="font-mono text-[10px] font-bold text-[#7B8379] tracking-widest uppercase mb-1">
              SPRINT DURATION
            </div>

            <div className="font-serif font-black text-2xl xl:text-3xl text-[#162E28] tracking-tight flex items-baseline gap-1.5 mb-0.5">
              <AnimatedCounter value={24} suffix=" HRS" />
            </div>

            <div className="font-sans text-[11px] font-semibold text-[#A77A1C] uppercase tracking-wider">
              NON-STOP INNOVATION
            </div>
          </div>

          <div className="w-8 h-0.5 bg-[#A77A1C] rounded-full mt-4" />
        </div>

      </div>

      {/* Bottom Location Pill */}
      <a
        href="https://sanjivani.edu.in"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full rounded-2xl bg-[#162E28] border border-[#A77A1C]/40 p-3.5 sm:px-5 sm:py-4 flex items-center justify-between group hover:bg-[#2B3E35] transition-all duration-300 relative z-10 shadow-md"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#A77A1C] flex items-center justify-center text-[#F9F4EA] shrink-0 group-hover:bg-[#E5BE61] group-hover:text-[#162E28] transition-colors">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="font-serif font-extrabold text-xs sm:text-sm text-[#F9F4EA] tracking-wider uppercase group-hover:text-[#E5BE61] transition-colors">
            SANJIVANI UNIVERSITY • KOPARGAON
          </span>
        </div>
        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5BE61] group-hover:translate-x-1 transition-transform" />
      </a>

    </div>
  );
};
