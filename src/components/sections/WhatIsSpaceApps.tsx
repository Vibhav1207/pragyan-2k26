import React from 'react';
import { Users, GraduationCap, CheckCircle2, UserCheck, ShieldCheck } from 'lucide-react';
import { PragyanButton } from '../ui/PragyanButton';

interface EligibilitySectionProps {
  onRegisterClick?: () => void;
}

export const WhatIsSpaceApps: React.FC<EligibilitySectionProps> = ({ onRegisterClick }) => {
  return (
    <section id="eligibility" className="w-full py-20 lg:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#F3F1EC] text-[#050505] text-left border-b-3 border-[#050505]">
      <div className="max-w-[1600px] mx-auto w-full space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-3 border-[#050505] pb-6 gap-4">
          <div className="space-y-2">
            <div className="inline-block bg-[#FFD600] text-[#050505] font-mono text-xs font-black uppercase px-3 py-1 border border-[#050505]">
              PARTICIPATION CRITERIA
            </div>
            <h2 className="font-space font-black text-4xl sm:text-6xl text-[#050505] uppercase tracking-tight">
              ELIGIBILITY
            </h2>
          </div>
          <div className="font-mono text-xs font-black text-[#FC3D21] uppercase tracking-widest">
            NATIONAL DELEGATE STANDARDS
          </div>
        </div>

        {/* Primary Banner: OPEN FOR ALL DOMAIN STUDENTS */}
        <div className="p-8 sm:p-12 bg-[#FC3D21] text-white border-3 border-[#050505] shadow-brutal-lg space-y-4 text-left">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-black bg-[#050505] text-[#FFD600] px-3 py-1 uppercase border border-white">
            <UserCheck className="w-4 h-4 text-[#FFD600]" />
            INCLUSIVE NATIONAL INVITATION
          </div>
          <h3 className="font-space font-black text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-tight">
            OPEN FOR ALL DOMAIN STUDENTS
          </h3>
          <p className="text-base sm:text-xl font-sans font-medium text-white/95 max-w-3xl leading-relaxed">
            Whether you study Management, Technology, Engineering, Data Science, Arts, Commerce, Design, Architecture, or Law — Pragyan 2K26 welcomes your unique perspective!
          </p>
        </div>

        {/* 3 Core Eligibility Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Eligible Levels */}
          <div className="bg-white border-3 border-[#050505] p-8 shadow-brutal space-y-4 text-left hover:translate-y-[-4px] transition-transform">
            <div className="w-12 h-12 bg-[#FFD600] border-2 border-[#050505] flex items-center justify-center text-[#050505]">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h4 className="font-space font-black text-2xl text-[#050505] uppercase">
              ELIGIBLE DELEGATES
            </h4>
            <div className="space-y-3 font-mono text-sm font-extrabold text-[#050505]">
              <div className="p-3 bg-[#F3F1EC] border-2 border-[#050505] flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#FC3D21] shrink-0" />
                <span>UG STUDENTS</span>
              </div>
              <div className="p-3 bg-[#F3F1EC] border-2 border-[#050505] flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#FC3D21] shrink-0" />
                <span>PG STUDENTS</span>
              </div>
              <div className="p-3 bg-[#F3F1EC] border-2 border-[#050505] flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#FC3D21] shrink-0" />
                <span>PhD STUDENTS</span>
              </div>
            </div>
          </div>

          {/* Card 2: Team Requirement */}
          <div className="bg-white border-3 border-[#050505] p-8 shadow-brutal space-y-4 text-left hover:translate-y-[-4px] transition-transform">
            <div className="w-12 h-12 bg-[#FC3D21] border-2 border-[#050505] flex items-center justify-center text-white">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="font-space font-black text-2xl text-[#050505] uppercase">
              TEAM SIZE
            </h4>
            <div className="p-4 bg-[#FFD600] border-2 border-[#050505] text-[#050505] font-space font-black text-2xl uppercase">
              4 MEMBERS PER TEAM
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-sans font-medium leading-relaxed">
              Every team must comprise exactly 4 members. Inter-disciplinary teams combining technical, management, and design expertise are strongly encouraged for maximum scoring impact.
            </p>
          </div>

          {/* Card 3: Institution & Registration Fee */}
          <div className="bg-white border-3 border-[#050505] p-8 shadow-brutal space-y-4 text-left hover:translate-y-[-4px] transition-transform">
            <div className="w-12 h-12 bg-[#050505] border-2 border-[#050505] flex items-center justify-center text-[#FFD600]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-space font-black text-2xl text-[#050505] uppercase">
              REGISTRATION FEE
            </h4>
            <div className="p-4 bg-[#F3F1EC] border-2 border-[#050505] text-[#FC3D21] font-mono font-black text-xl uppercase">
              ₹500 / TEAM
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-sans font-medium leading-relaxed">
              First round registration fee per team. Covers Phase 01 online screening, portal evaluation, and workshop access for all 4 team members.
            </p>
          </div>

        </div>

        {/* CTA Strip */}
        <div className="pt-4 flex justify-center">
          <PragyanButton
            onClick={onRegisterClick}
            variant="red"
            size="lg"
          >
            REGISTER YOUR TEAM OF 4 NOW
          </PragyanButton>
        </div>

      </div>
    </section>
  );
};
