import React from 'react';
import { Users, CreditCard, AlertCircle, ArrowUpRight, GraduationCap } from 'lucide-react';
import { EVENT_DATA } from '../../../data/event';
import { ScrollReveal } from '../../transitions/ScrollReveal';
import { AnimatedCounter } from '../../ui/AnimatedCounter';

interface RedesignedRegistrationSectionProps {
  onRegisterClick: () => void;
}

export const RedesignedRegistrationSection: React.FC<RedesignedRegistrationSectionProps> = ({ onRegisterClick }) => {
  return (
    <section id="registration" className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#F9F4EA] text-[#050C0C] text-left border-b border-[#D2CAB6]">
      <div className="max-w-[1500px] mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <ScrollReveal delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D2CAB6] pb-6 gap-4">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-[#A77A1C] uppercase tracking-widest bg-[#E9E1D2] px-3.5 py-1.5 rounded-full border border-[#A77A1C]/30">
                DELEGATE PARTICIPATION
              </span>
              <h2 className="font-serif font-black text-4xl sm:text-6xl text-[#162E28] uppercase tracking-tight">
                REGISTRATION <span className="italic font-normal text-[#A77A1C]">INFORMATION</span>
              </h2>
            </div>
            <div className="font-mono text-xs font-bold text-[#A77A1C] uppercase tracking-widest">
              NATIONAL DELEGATE GUIDELINES
            </div>
          </div>
        </ScrollReveal>

        {/* Primary Banner: OPEN FOR ALL DOMAIN STUDENTS */}
        <ScrollReveal delay={150} duration={650}>
          <div className="p-8 sm:p-12 space-y-6 text-left rounded-3xl bg-[#162E28] text-[#F9F4EA] border-2 border-[#A77A1C] shadow-2xl relative overflow-hidden">
            
            <div className="inline-flex items-center gap-2 font-mono text-xs font-extrabold bg-[#A77A1C] text-[#F9F4EA] px-4 py-1.5 rounded-full uppercase border border-[#E5BE61]/50">
              <GraduationCap className="w-4 h-4 text-[#E5BE61]" />
              <span>INCLUSIVE ELIGIBILITY</span>
            </div>

            <h3 className="font-serif font-black text-3xl sm:text-5xl text-[#F9F4EA] uppercase leading-tight">
              {EVENT_DATA.eligibility}
            </h3>

            <p className="text-sm sm:text-base font-sans text-[#F3EDE0]/90 max-w-3xl leading-relaxed">
              Students pursuing Commerce, Management, Technology, Engineering, Data Science, Arts, Design, Architecture, or Law across India are invited to participate.
            </p>
          </div>
        </ScrollReveal>

        {/* Key Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: TEAM SIZE */}
          <ScrollReveal delay={250} duration={600}>
            <div className="p-8 space-y-4 text-left rounded-2xl bg-[#F3EDE0] border border-[#D2CAB6] hover:border-[#A77A1C] transition-all duration-300 shadow-sm hover:shadow-md h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-[#E9E1D2] border border-[#A77A1C]/30 text-[#A77A1C] w-fit">
                  <Users className="w-6 h-6" />
                </div>
                <div className="font-mono text-xs font-bold text-[#7B8379] uppercase tracking-wider">
                  TEAM COMPOSITION
                </div>
                <h4 className="font-serif font-black text-2xl text-[#162E28] uppercase flex items-center gap-1.5">
                  <AnimatedCounter value={4} /> MEMBERS PER TEAM
                </h4>
                <p className="text-xs sm:text-sm text-[#7B8379] font-sans leading-relaxed">
                  Every registered delegate team must have exactly 4 members. Inter-disciplinary teams are strongly encouraged.
                </p>
              </div>
              <div className="w-8 h-0.5 bg-[#A77A1C] rounded-full mt-4" />
            </div>
          </ScrollReveal>

          {/* Card 2: FIRST ROUND REGISTRATION FEE */}
          <ScrollReveal delay={350} duration={600}>
            <div className="p-8 space-y-4 text-left rounded-2xl bg-[#E9E1D2] border border-[#A77A1C]/60 hover:border-[#A77A1C] transition-all duration-300 shadow-md h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-[#162E28] text-[#E5BE61] w-fit">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div className="font-mono text-xs font-bold text-[#A77A1C] uppercase tracking-wider">
                  FIRST ROUND FEE
                </div>
                <h4 className="font-serif font-black text-2xl text-[#162E28] uppercase">
                  <AnimatedCounter value={500} prefix="₹" /> for First Round (PER TEAM)
                </h4>
                <p className="text-xs sm:text-sm text-[#7B8379] font-sans leading-relaxed">
                  One-time first round registration fee covering Phase 1 online evaluation and submission access for all 4 team members.
                </p>
              </div>
              <div className="w-8 h-0.5 bg-[#A77A1C] rounded-full mt-4" />
            </div>
          </ScrollReveal>

          {/* Card 3: SECOND ROUND FEE NOTICE */}
          <ScrollReveal delay={450} duration={600}>
            <div className="p-8 space-y-4 text-left rounded-2xl bg-[#F3EDE0] border border-[#D2CAB6] hover:border-[#A77A1C] transition-all duration-300 shadow-sm hover:shadow-md h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-[#E9E1D2] border border-[#A77A1C]/30 text-[#A77A1C] w-fit">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div className="font-mono text-xs font-bold text-[#7B8379] uppercase tracking-wider">
                  PHASE 2 NOTICE
                </div>
                <h4 className="font-serif font-black text-xl text-[#162E28] uppercase leading-tight">
                  {EVENT_DATA.secondRoundFeeNotice}
                </h4>
                <p className="text-xs sm:text-sm text-[#7B8379] font-sans leading-relaxed">
                  Top teams selected for Phase 2 On-Ground Grand Finale will receive instructions regarding second round details.
                </p>
              </div>
              <div className="w-8 h-0.5 bg-[#A77A1C] rounded-full mt-4" />
            </div>
          </ScrollReveal>

        </div>

        {/* Main CTA */}
        <ScrollReveal delay={550}>
          <div className="pt-4 flex justify-center">
            <button
              onClick={onRegisterClick}
              className="px-10 py-5 rounded-xl font-mono font-black text-base uppercase text-[#F9F4EA] bg-[#162E28] hover:bg-[#2B3E35] border border-[#A77A1C]/60 flex items-center gap-2 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
            >
              <span>REGISTER NOW FOR PRAGYAN 2K26</span>
              <ArrowUpRight className="w-6 h-6 text-[#E5BE61]" />
            </button>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
