import React from 'react';
import { Users, Clock, MapPin, ArrowRight } from 'lucide-react';
import { AnimatedCounter } from '../ui/AnimatedCounter';

interface EventAtAGlanceProps {
  className?: string;
}

export const EventAtAGlance: React.FC<EventAtAGlanceProps> = ({ className = '' }) => {
  return (
    <div className={`w-full rounded-3xl bg-[#050C1B]/95 border border-[#1E3A70]/70 p-5 sm:p-6 md:p-7 xl:p-8 shadow-2xl relative backdrop-blur-xl overflow-hidden text-left ${className}`}>
      
      {/* Background glow accents */}
      <div className="absolute -top-28 -left-28 w-64 h-64 bg-[#1D4ED8]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -right-28 w-64 h-64 bg-[#FFD600]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
        <div>
          {/* Top Yellow Bar */}
          <div className="w-10 h-1 bg-[#FFD600] rounded-full mb-2.5 shadow-[0_0_8px_#FFD600]" />
          
          <h2 className="font-space font-black text-2xl sm:text-3xl xl:text-4xl text-white tracking-tight uppercase leading-none">
            EVENT <span className="text-[#FFD600]">AT A GLANCE</span>
          </h2>
          
          <p className="font-sans text-xs sm:text-sm text-slate-300 font-medium mt-1.5">
            All the key details you need, at a glance.
          </p>
        </div>

        {/* Decorative Artwork Top Right */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0 opacity-90 select-none">
          {/* Diagonal slash lines */}
          <div className="flex gap-1 transform -skew-x-12">
            <div className="w-2 h-9 bg-gradient-to-b from-[#FFD600] via-[#FFD600]/40 to-transparent rounded-full shadow-[0_0_8px_rgba(255,214,0,0.5)]" />
            <div className="w-2 h-9 bg-gradient-to-b from-[#FFD600]/60 via-[#FFD600]/20 to-transparent rounded-full" />
          </div>

          {/* 3x3 Dot Matrix */}
          <div className="grid grid-cols-3 gap-1 opacity-40">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-1.2 h-1.2 rounded-full bg-[#FFD600]" />
            ))}
          </div>

          {/* Vertical slogan list */}
          <div className="font-mono text-[9px] text-slate-400 font-extrabold tracking-widest uppercase text-right leading-tight pl-1">
            <div>CODE</div>
            <div>COLLABORATE</div>
            <div>CREATE</div>
            <div>BEYOND</div>
          </div>
        </div>
      </div>

      {/* 3 Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 xl:gap-4 my-5 xl:my-6 relative z-10">
        
        {/* Card 1: TEAM COMPOSITION */}
        <div className="bg-[#09152A]/90 border border-[#1E3A70]/60 rounded-2xl p-4 sm:p-4.5 xl:p-5 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm hover:border-[#2563EB]/70 transition-all duration-300 group">
          <div>
            {/* Icon Box */}
            <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-xl xl:rounded-2xl bg-[#12274B] border border-[#2563EB]/40 flex items-center justify-center mb-3.5 xl:mb-4 shadow-inner group-hover:scale-105 transition-transform duration-300">
              <Users className="w-5 h-5 xl:w-6 xl:h-6 text-white stroke-[2.2]" />
            </div>

            {/* Label */}
            <div className="font-mono text-[10px] xl:text-xs font-semibold text-[#8AA4CB] tracking-wider uppercase mb-1">
              TEAM COMPOSITION
            </div>

            {/* Value */}
            <div className="font-space font-black text-xl sm:text-2xl xl:text-3xl text-white tracking-tight flex items-baseline gap-1.5 mb-0.5">
              <AnimatedCounter value={4} /> MEMBERS
            </div>

            {/* Subtext */}
            <div className="font-mono text-[10px] xl:text-xs font-semibold text-[#8AA4CB]/80 tracking-widest uppercase">
              PER TEAM
            </div>
          </div>

          {/* Accent Line */}
          <div className="w-6 h-0.5 bg-[#2563EB] rounded-full mt-3.5" />
        </div>

        {/* Card 2: FIRST ROUND FEE (Highlighted Amber Glow) */}
        <div className="bg-gradient-to-b from-[#19191D] to-[#0D0F16] border border-[#EAB308]/50 rounded-2xl p-4 sm:p-4.5 xl:p-5 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm shadow-[0_0_20px_rgba(234,179,8,0.12)] hover:border-[#FFD600] hover:shadow-[0_0_30px_rgba(234,179,8,0.2)] transition-all duration-300 group">
          <div>
            {/* Icon Box (Golden Stacked Coins with Rupee) */}
            <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-xl xl:rounded-2xl bg-[#2B2313] border border-[#EAB308]/40 flex items-center justify-center mb-3.5 xl:mb-4 shadow-[0_0_15px_rgba(234,179,8,0.15)] group-hover:scale-105 transition-transform duration-300">
              <svg className="w-5 h-5 xl:w-6 xl:h-6 text-[#FFD600]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="14" cy="7" rx="6" ry="3.5" fill="#2B2313" />
                <path d="M8 7v4c0 1.93 2.69 3.5 6 3.5s6-1.57 6-3.5V7" />
                <path d="M8 11v4c0 1.93 2.69 3.5 6 3.5s6-1.57 6-3.5v-4" />
                <circle cx="9" cy="14" r="5.5" fill="#3D3013" stroke="currentColor" strokeWidth="1.8" />
                <text x="6.8" y="16.5" fill="#FFD600" stroke="none" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">₹</text>
              </svg>
            </div>

            {/* Label */}
            <div className="font-mono text-[10px] xl:text-xs font-semibold text-[#8AA4CB] tracking-wider uppercase mb-1">
              FIRST ROUND FEE
            </div>

            {/* Value */}
            <div className="font-space font-black text-xl sm:text-2xl xl:text-3xl text-[#FFD600] tracking-tight flex items-baseline gap-0.5 mb-0.5 drop-shadow-[0_0_10px_rgba(255,214,0,0.3)]">
              <AnimatedCounter value={500} prefix="₹" />
            </div>

            {/* Subtext */}
            <div className="font-mono text-[10px] xl:text-xs font-semibold text-[#8AA4CB]/80 tracking-widest uppercase">
              REGISTRATION FEE
            </div>
          </div>

          {/* Accent Line */}
          <div className="w-6 h-0.5 bg-[#FFD600] rounded-full mt-3.5 shadow-[0_0_8px_#FFD600]" />
        </div>

        {/* Card 3: SPRINT DURATION */}
        <div className="bg-[#09152A]/90 border border-[#1E3A70]/60 rounded-2xl p-4 sm:p-4.5 xl:p-5 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm hover:border-[#2563EB]/70 transition-all duration-300 group">
          <div>
            {/* Icon Box */}
            <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-xl xl:rounded-2xl bg-[#12274B] border border-[#2563EB]/40 flex items-center justify-center mb-3.5 xl:mb-4 shadow-inner group-hover:scale-105 transition-transform duration-300">
              <Clock className="w-5 h-5 xl:w-6 xl:h-6 text-white stroke-[2.2]" />
            </div>

            {/* Label */}
            <div className="font-mono text-[10px] xl:text-xs font-semibold text-[#8AA4CB] tracking-wider uppercase mb-1">
              SPRINT DURATION
            </div>

            {/* Value */}
            <div className="font-space font-black text-xl sm:text-2xl xl:text-3xl text-white tracking-tight flex items-baseline gap-1.5 mb-0.5">
              <AnimatedCounter value={24} suffix=" HRS" />
            </div>

            {/* Subtext */}
            <div className="font-mono text-[10px] xl:text-xs font-semibold text-[#8AA4CB]/80 tracking-widest uppercase">
              HACKATHON
            </div>
          </div>

          {/* Accent Line */}
          <div className="w-6 h-0.5 bg-[#2563EB] rounded-full mt-3.5" />
        </div>

      </div>

      {/* Bottom Location Pill / Capsule */}
      <a
        href="https://sanjivani.edu.in"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full rounded-2xl bg-[#081224]/80 border border-[#1E3A70]/60 p-3 sm:px-4.5 sm:py-3.5 flex items-center justify-between group hover:border-[#FFD600]/60 hover:bg-[#0A1832] transition-all duration-300 relative z-10"
      >
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FFD600] flex items-center justify-center text-[#050C1B] shrink-0 shadow-[0_0_10px_rgba(255,214,0,0.4)] group-hover:scale-105 transition-transform">
            <MapPin className="w-4 h-4 fill-[#050C1B] stroke-none" />
          </div>
          <span className="font-mono font-extrabold text-[11px] sm:text-xs xl:text-sm text-white tracking-wider sm:tracking-widest uppercase group-hover:text-[#FFD600] transition-colors">
            SANJIVANI UNIVERSITY, KOPARGAON
          </span>
        </div>
        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#8AA4CB] group-hover:text-white group-hover:translate-x-1 transition-all" />
      </a>

    </div>
  );
};
