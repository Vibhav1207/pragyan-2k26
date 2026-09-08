import React from 'react';
import { MapPin, Clock, Presentation, Users, Sparkles, Trophy } from 'lucide-react';
import { PragyanButton } from '../ui/PragyanButton';

interface FinalRoundSectionProps {
  onRegisterClick?: () => void;
}

export const FinalRoundSection: React.FC<FinalRoundSectionProps> = ({ onRegisterClick }) => {
  return (
    <section id="final-round" className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#050505] text-white text-left border-b-3 border-white">
      <div className="max-w-[1600px] mx-auto w-full space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-white/20 pb-6 gap-4">
          <div className="space-y-2">
            <div className="inline-block bg-[#FC3D21] text-white font-mono text-xs font-black uppercase px-3 py-1 border border-white">
              PHASE 02 ON-GROUND FINALE
            </div>
            <h2 className="font-space font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
              FINAL ROUND
            </h2>
          </div>
          <div className="font-mono text-xs font-black text-[#FFD600] uppercase tracking-widest">
            SANJIVANI UNIVERSITY CAMPUS
          </div>
        </div>

        {/* Banner Box */}
        <div className="bg-[#111111] border-3 border-white p-8 sm:p-12 shadow-brutal-yellow grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-black bg-[#FFD600] text-[#050505] px-3.5 py-1 uppercase">
              <Clock className="w-4 h-4 text-[#050505]" />
              24-HOUR HACKATHON SPRINT
            </div>

            <h3 className="font-space font-black text-3xl sm:text-5xl text-white uppercase leading-tight">
              24-HOUR INNOVATION SPRINT AT SANJIVANI UNIVERSITY
            </h3>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-extrabold text-[#FFD600]">
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 border border-white/20">
                <MapPin className="w-4 h-4 text-[#FC3D21]" />
                <span>VENUE: SANJIVANI UNIVERSITY, KOPARGAON</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 border border-white/20 text-white">
                <Trophy className="w-4 h-4 text-[#FFD600]" />
                <span>DATES: 24–25 OCTOBER 2026</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              Top shortlisted teams from Phase 01 will be invited to the on-ground Final Round at Sanjivani University, Kopargaon for the immersive 24-hour sprint, live mentorship, and grand pitching.
            </p>
          </div>

          <div className="lg:col-span-4 bg-[#FC3D21] border-2 border-white p-6 space-y-4 text-white shadow-brutal">
            <div className="font-mono text-xs font-black uppercase text-[#FFD600]">
              ON-GROUND EXPERIENCE
            </div>
            <div className="font-space font-black text-2xl uppercase">
              OFFLINE FINALE
            </div>
            <ul className="space-y-2 font-mono text-xs font-bold text-white/90">
              <li className="flex items-center gap-2">
                <span>✓</span> 24-Hour Non-Stop Hacking Arena
              </li>
              <li className="flex items-center gap-2">
                <span>✓</span> Dedicated Mentor Tables
              </li>
              <li className="flex items-center gap-2">
                <span>✓</span> High-Speed WiFi & Power Stations
              </li>
              <li className="flex items-center gap-2">
                <span>✓</span> Food, Refreshments & Rest Zones
              </li>
            </ul>
          </div>

        </div>

        {/* 3 Core Experience Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-[#111111] border-2 border-white p-6 space-y-3 text-left">
            <div className="w-10 h-10 bg-[#FFD600] text-[#050505] border border-white flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-space font-black text-xl text-white uppercase">
              MENTORING
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              Continuous 1-on-1 guidance from industry leaders, startup founders, and Sanjivani faculty mentors throughout the 24-hour sprint.
            </p>
          </div>

          <div className="bg-[#111111] border-2 border-white p-6 space-y-3 text-left">
            <div className="w-10 h-10 bg-[#FC3D21] text-white border border-white flex items-center justify-center">
              <Presentation className="w-5 h-5" />
            </div>
            <h4 className="font-space font-black text-xl text-white uppercase">
              FINAL PRESENTATION
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              Live pitch presentation before an expert jury panel evaluated on innovation, SDG 2030 alignment, feasibility, and business potential.
            </p>
          </div>

          <div className="bg-[#111111] border-2 border-white p-6 space-y-3 text-left">
            <div className="w-10 h-10 bg-white text-[#050505] border border-white flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-space font-black text-xl text-white uppercase">
              ON-GROUND EXPERIENCE
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              Immersive hackathon atmosphere at Sanjivani University, networking with national delegates, and grand valedictory awards ceremony.
            </p>
          </div>

        </div>

        {onRegisterClick && (
          <div className="flex justify-center pt-2">
            <PragyanButton
              onClick={onRegisterClick}
              variant="yellow"
              size="lg"
            >
              REGISTER FOR PHASE 01 ONLINE SELECTION
            </PragyanButton>
          </div>
        )}

      </div>
    </section>
  );
};
