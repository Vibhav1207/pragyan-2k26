import React from 'react';
import { Users, Clock, MapPin, ArrowRight } from 'lucide-react';
import { AnimatedCounter } from '../ui/AnimatedCounter';

interface EventAtAGlanceProps {
  className?: string;
}

export const EventAtAGlance: React.FC<EventAtAGlanceProps> = ({ className = '' }) => {
  return (
    <div className={`w-full max-w-6xl mx-auto rounded-3xl sm:rounded-[32px] bg-[#050C1B]/95 border border-[#1E3A70]/70 p-6 sm:p-8 md:p-10 shadow-2xl relative backdrop-blur-xl overflow-hidden text-left ${className}`}>
      
      {/* Background glow accents */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#1D4ED8]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#FFD600]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
        <div>
          {/* Top Yellow Bar */}
          <div className="w-12 h-1 bg-[#FFD600] rounded-full mb-3.5 shadow-[0_0_10px_#FFD600]" />
          
          <h2 className="font-space font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase leading-none">
            EVENT <span className="text-[#FFD600]">AT A GLANCE</span>
          </h2>
          
          <p className="font-sans text-sm sm:text-base text-slate-300 font-medium mt-2">
            All the key details you need, at a glance.
          </p>
        </div>

        {/* Decorative Artwork Top Right */}
        <div className="hidden md:flex items-center gap-5 shrink-0 opacity-90 select-none">
          {/* Diagonal slash lines */}
          <div className="flex gap-1.5 transform -skew-x-12">
            <div className="w-2.5 h-12 bg-gradient-to-b from-[#FFD600] via-[#FFD600]/40 to-transparent rounded-full shadow-[0_0_8px_rgba(255,214,0,0.5)]" />
            <div className="w-2.5 h-12 bg-gradient-to-b from-[#FFD600]/60 via-[#FFD600]/20 to-transparent rounded-full" />
          </div>

          {/* 3x3 Dot Matrix */}
          <div className="grid grid-cols-3 gap-1.5 opacity-40">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#FFD600]" />
            ))}
          </div>

          {/* Vertical slogan list */}
          <div className="font-mono text-[10px] text-slate-400 font-extrabold tracking-widest uppercase text-right leading-snug pl-2">
            <div>CODE</div>
            <div>COLLABORATE</div>
            <div>CREATE</div>
            <div>BEYOND</div>
          </div>
        </div>
      </div>

      {/* 3 Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 my-8 sm:my-10 relative z-10">
        
        {/* Card 1: TEAM COMPOSITION */}
        <div className="bg-[#09152A]/90 border border-[#1E3A70]/60 rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm hover:border-[#2563EB]/70 transition-all duration-300 group">
          <div>
            {/* Icon Box */}
            <div className="w-14 h-14 rounded-2xl bg-[#12274B] border border-[#2563EB]/40 flex items-center justify-center mb-6 shadow-inner group-hover:scale-105 transition-transform duration-300">
              <Users className="w-7 h-7 text-white stroke-[2.2]" />
            </div>

            {/* Label */}
            <div className="font-mono text-xs font-semibold text-[#8AA4CB] tracking-wider uppercase mb-2">
              TEAM COMPOSITION
            </div>

            {/* Value */}
            <div className="font-space font-black text-3xl sm:text-4xl text-white tracking-tight flex items-baseline gap-2 mb-1">
              <AnimatedCounter value={4} /> MEMBERS
            </div>

            {/* Subtext */}
            <div className="font-mono text-xs font-semibold text-[#8AA4CB]/80 tracking-[0.2em] uppercase">
              PER TEAM
            </div>
          </div>

          {/* Accent Line */}
          <div className="w-8 h-0.5 bg-[#2563EB] rounded-full mt-6" />
        </div>

        {/* Card 2: FIRST ROUND FEE (Highlighted Amber Glow) */}
        <div className="bg-gradient-to-b from-[#19191D] to-[#0D0F16] border border-[#EAB308]/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm shadow-[0_0_25px_rgba(234,179,8,0.12)] hover:border-[#FFD600] hover:shadow-[0_0_35px_rgba(234,179,8,0.2)] transition-all duration-300 group">
          <div>
            {/* Icon Box (Golden Stacked Coins with Rupee) */}
            <div className="w-14 h-14 rounded-2xl bg-[#2B2313] border border-[#EAB308]/40 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(234,179,8,0.15)] group-hover:scale-105 transition-transform duration-300">
              <svg className="w-7 h-7 text-[#FFD600]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* Back coin */}
                <ellipse cx="14" cy="7" rx="6" ry="3.5" fill="#2B2313" />
                <path d="M8 7v4c0 1.93 2.69 3.5 6 3.5s6-1.57 6-3.5V7" />
                {/* Middle coin */}
                <path d="M8 11v4c0 1.93 2.69 3.5 6 3.5s6-1.57 6-3.5v-4" />
                {/* Front main coin */}
                <circle cx="9" cy="14" r="5.5" fill="#3D3013" stroke="currentColor" strokeWidth="1.8" />
                <text x="6.8" y="16.5" fill="#FFD600" stroke="none" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">₹</text>
              </svg>
            </div>

            {/* Label */}
            <div className="font-mono text-xs font-semibold text-[#8AA4CB] tracking-wider uppercase mb-2">
              FIRST ROUND FEE
            </div>

            {/* Value */}
            <div className="font-space font-black text-3xl sm:text-4xl text-[#FFD600] tracking-tight flex items-baseline gap-1 mb-1 drop-shadow-[0_0_10px_rgba(255,214,0,0.3)]">
              <AnimatedCounter value={500} prefix="₹" />
            </div>

            {/* Subtext */}
            <div className="font-mono text-xs font-semibold text-[#8AA4CB]/80 tracking-[0.2em] uppercase">
              REGISTRATION FEE
            </div>
          </div>

          {/* Accent Line */}
          <div className="w-8 h-0.5 bg-[#FFD600] rounded-full mt-6 shadow-[0_0_8px_#FFD600]" />
        </div>

        {/* Card 3: SPRINT DURATION */}
        <div className="bg-[#09152A]/90 border border-[#1E3A70]/60 rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm hover:border-[#2563EB]/70 transition-all duration-300 group">
          <div>
            {/* Icon Box */}
            <div className="w-14 h-14 rounded-2xl bg-[#12274B] border border-[#2563EB]/40 flex items-center justify-center mb-6 shadow-inner group-hover:scale-105 transition-transform duration-300">
              <Clock className="w-7 h-7 text-white stroke-[2.2]" />
            </div>

            {/* Label */}
            <div className="font-mono text-xs font-semibold text-[#8AA4CB] tracking-wider uppercase mb-2">
              SPRINT DURATION
            </div>

            {/* Value */}
            <div className="font-space font-black text-3xl sm:text-4xl text-white tracking-tight flex items-baseline gap-2 mb-1">
              <AnimatedCounter value={24} suffix=" HRS" />
            </div>

            {/* Subtext */}
            <div className="font-mono text-xs font-semibold text-[#8AA4CB]/80 tracking-[0.2em] uppercase">
              HACKATHON
            </div>
          </div>

          {/* Accent Line */}
          <div className="w-8 h-0.5 bg-[#2563EB] rounded-full mt-6" />
        </div>

      </div>

      {/* Bottom Location Pill / Capsule */}
      <a
        href="https://sanjivani.edu.in"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full rounded-2xl bg-[#081224]/80 border border-[#1E3A70]/60 p-4 sm:px-6 sm:py-4.5 flex items-center justify-between group hover:border-[#FFD600]/60 hover:bg-[#0A1832] transition-all duration-300 relative z-10"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FFD600] flex items-center justify-center text-[#050C1B] shrink-0 shadow-[0_0_12px_rgba(255,214,0,0.4)] group-hover:scale-105 transition-transform">
            <MapPin className="w-5 h-5 fill-[#050C1B] stroke-none" />
          </div>
          <span className="font-mono font-extrabold text-xs sm:text-sm md:text-base text-white tracking-[0.15em] sm:tracking-[0.25em] uppercase group-hover:text-[#FFD600] transition-colors">
            SANJIVANI UNIVERSITY, KOPARGAON
          </span>
        </div>
        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#8AA4CB] group-hover:text-white group-hover:translate-x-1.5 transition-all" />
      </a>

    </div>
  );
};
