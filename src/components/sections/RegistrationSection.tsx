import React from 'react';
import { Users, CreditCard, AlertCircle, ArrowUpRight, GraduationCap } from 'lucide-react';
import { EVENT_DATA } from '../../data/event';

interface RegistrationSectionProps {
  onRegisterClick: () => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({ onRegisterClick }) => {
  return (
    <section id="registration" className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-white text-[#0B192C] text-left border-b border-slate-200">
      <div className="max-w-[1500px] mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-300 pb-6 gap-4">
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold text-[#1D4ED8] uppercase tracking-wider bg-[#1D4ED8]/10 px-3 py-1 rounded-full">
              DELEGATE PARTICIPATION
            </span>
            <h2 className="font-space font-black text-4xl sm:text-6xl text-[#0B192C] uppercase tracking-tight">
              REGISTRATION INFORMATION
            </h2>
          </div>
          <div className="font-mono text-xs font-bold text-[#D97706] uppercase tracking-widest">
            NATIONAL DELEGATE GUIDELINES
          </div>
        </div>

        {/* Primary Banner: OPEN FOR ALL DOMAIN STUDENTS */}
        <div className="card-navy p-8 sm:p-12 space-y-6 text-left border-2 border-[#1D4ED8]/40 shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold bg-[#FACC15] text-[#0B192C] px-3.5 py-1 rounded-full uppercase">
            <GraduationCap className="w-4 h-4 text-[#0B192C]" />
            <span>INCLUSIVE ELIGIBILITY</span>
          </div>

          <h3 className="font-space font-black text-3xl sm:text-5xl text-white uppercase leading-tight">
            {EVENT_DATA.eligibility}
          </h3>

          <p className="text-sm sm:text-base font-sans text-slate-300 max-w-3xl leading-relaxed">
            Students pursuing Commerce, Management, Technology, Engineering, Data Science, Arts, Commerce, Design, Architecture, or Law across India are invited to participate.
          </p>
        </div>

        {/* Key Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: TEAM SIZE */}
          <div className="card-premium p-8 space-y-4 text-left">
            <div className="p-3.5 rounded-xl bg-[#1D4ED8]/10 text-[#1D4ED8] w-fit">
              <Users className="w-6 h-6" />
            </div>
            <div className="font-mono text-xs font-bold text-slate-500 uppercase">
              TEAM COMPOSITION
            </div>
            <h4 className="font-space font-black text-2xl text-[#0B192C] uppercase">
              {EVENT_DATA.teamSize}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
              Every registered delegate team must have exactly 4 members. Inter-disciplinary teams are strongly encouraged.
            </p>
          </div>

          {/* Card 2: FIRST ROUND REGISTRATION FEE */}
          <div className="card-premium p-8 space-y-4 text-left bg-gradient-to-br from-white via-[#FACC15]/10 to-white">
            <div className="p-3.5 rounded-xl bg-[#F59E0B]/20 text-[#D97706] w-fit">
              <CreditCard className="w-6 h-6" />
            </div>
            <div className="font-mono text-xs font-bold text-[#D97706] uppercase">
              FIRST ROUND FEE
            </div>
            <h4 className="font-space font-black text-2xl text-[#0B192C] uppercase">
              ₹500 for First Round (PER TEAM)
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
              One-time first round registration fee covering Phase 1 online evaluation and submission access for all 4 team members.
            </p>
          </div>

          {/* Card 3: SECOND ROUND FEE NOTICE */}
          <div className="card-premium p-8 space-y-4 text-left border-amber-300">
            <div className="p-3.5 rounded-xl bg-[#F59E0B]/10 text-[#D97706] w-fit">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="font-mono text-xs font-bold text-slate-500 uppercase">
              PHASE 2 NOTICE
            </div>
            <h4 className="font-space font-black text-xl text-[#0B192C] uppercase leading-tight">
              {EVENT_DATA.secondRoundFeeNotice}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
              Top teams selected for Phase 2 On-Ground Grand Finale will receive instructions regarding second round details.
            </p>
          </div>

        </div>

        {/* Main CTA */}
        <div className="pt-4 flex justify-center">
          <button
            onClick={onRegisterClick}
            className="btn-primary-blue text-base px-10 py-5 uppercase shadow-xl"
          >
            <span>REGISTER NOW FOR PRAGYAN 2K26</span>
            <ArrowUpRight className="w-6 h-6" />
          </button>
        </div>

      </div>
    </section>
  );
};

export const RegistrationCTA = RegistrationSection;
