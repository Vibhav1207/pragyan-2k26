import React from 'react';
import { ArrowUpRight, ArrowDown, Sparkles, Award } from 'lucide-react';
import { EVENT_DATA } from '../../../data/event';
import { ScrollReveal } from '../../transitions/ScrollReveal';
import { RedesignedEventAtAGlance } from './RedesignedEventAtAGlance';

interface RedesignedHeroProps {
  onRegisterClick: () => void;
  onExploreChallenges?: () => void;
}

export const RedesignedHero: React.FC<RedesignedHeroProps> = ({ onRegisterClick, onExploreChallenges }) => {
  return (
    <section id="home" className="w-full pt-32 pb-20 lg:pt-40 lg:pb-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#F9F4EA] text-[#050C0C] relative overflow-hidden text-left border-b border-[#D2CAB6]">
      
      {/* Faint Background Business/Campus Visuals */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.08]">
        <img
          src="/sanjivani-building.jpg"
          alt="Sanjivani Campus Architecture"
          className="w-full h-full object-cover object-center filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F9F4EA]/40 via-transparent to-[#F9F4EA]" />
      </div>

      {/* Decorative Oversized Watermark Typography */}
      <div className="absolute top-16 right-10 z-0 pointer-events-none opacity-[0.04] font-serif font-black text-[12rem] xl:text-[16rem] text-[#162E28] leading-none select-none">
        BBA
      </div>

      <div className="max-w-[1500px] mx-auto w-full space-y-10 sm:space-y-14 relative z-10">
        
        {/* Top Eyebrow Header Bar */}
        <ScrollReveal delay={0} duration={500}>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D2CAB6] pb-5">
            <div className="inline-flex items-center gap-3 bg-[#E9E1D2] px-4 py-1.5 rounded-full border border-[#A77A1C]/30 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A77A1C] animate-pulse" />
              <a
                href="https://sanjivani.edu.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif font-extrabold text-xs sm:text-sm text-[#162E28] uppercase tracking-wider hover:text-[#A77A1C] transition-colors"
              >
                {EVENT_DATA.institution}
              </a>
            </div>

            <div className="font-mono text-xs text-[#162E28] font-bold uppercase tracking-widest bg-[#E9E1D2]/80 px-3.5 py-1.5 rounded-lg border border-[#D2CAB6] flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#A77A1C]" />
              <span>OFFICIAL NATIONAL LEVEL HACKATHON</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Hero 2-Column Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          
          {/* Left Column: Brand Logo, Titles, Theme Card & Action CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6 sm:space-y-8">
            
            <div className="space-y-4">
              <ScrollReveal delay={100} duration={600}>
                <div className="inline-block p-3.5 bg-[#E9E1D2] rounded-2xl border border-[#A77A1C]/40 shadow-md">
                  <img
                    src="/pragyan-logo.png"
                    alt="PRAGYAN 2K26 Official Logo"
                    className="h-16 sm:h-20 xl:h-22 w-auto object-contain"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={150} duration={600}>
                <div className="font-serif font-black text-4xl sm:text-6xl xl:text-7xl tracking-tight text-[#162E28] leading-none">
                  PRAGYAN <span className="italic font-normal text-[#A77A1C]">2K26</span>
                </div>
                
                <h1 className="font-serif font-bold text-xl sm:text-3xl xl:text-4xl tracking-tight text-[#2B3E35] uppercase leading-tight mt-2">
                  NATIONAL LEVEL BBA HACKATHON
                </h1>
              </ScrollReveal>

              {/* Official Theme Card */}
              <ScrollReveal delay={250} duration={600}>
                <div className="p-5 sm:p-6.5 rounded-2xl bg-[#E9E1D2] border border-[#A77A1C]/40 space-y-3 shadow-md relative overflow-hidden">
                  <div className="w-1 bg-[#A77A1C] absolute top-0 bottom-0 left-0" />
                  
                  <div className="flex items-center gap-2 font-mono text-xs text-[#A77A1C] font-black uppercase tracking-widest pl-1">
                    <Sparkles className="w-4 h-4 text-[#A77A1C]" />
                    <span>OFFICIAL HACKATHON THEME</span>
                  </div>

                  <h2 className="font-serif font-extrabold text-lg sm:text-2xl xl:text-3xl text-[#162E28] uppercase leading-snug pl-1">
                    {EVENT_DATA.theme}
                  </h2>

                  <p className="font-sans font-medium text-xs sm:text-sm xl:text-base text-[#7B8379] leading-relaxed pt-2 border-t border-[#D2CAB6] pl-1">
                    {EVENT_DATA.supportingLine}
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Action Buttons */}
            <ScrollReveal delay={350} duration={600}>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  onClick={onRegisterClick}
                  className="px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl font-mono font-black text-xs sm:text-sm uppercase text-[#F9F4EA] bg-[#162E28] hover:bg-[#2B3E35] border border-[#A77A1C]/60 flex items-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <span>REGISTER NOW</span>
                  <ArrowUpRight className="w-5 h-5 text-[#E5BE61]" />
                </button>

                <a
                  href="#tracks"
                  onClick={onExploreChallenges}
                  className="px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl font-mono font-bold text-xs sm:text-sm uppercase text-[#162E28] bg-[#F3EDE0] hover:bg-[#E9E1D2] border border-[#D2CAB6] hover:border-[#A77A1C] flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
                >
                  <span>EXPLORE TRACKS</span>
                  <ArrowDown className="w-5 h-5 text-[#A77A1C]" />
                </a>
              </div>
            </ScrollReveal>

          </div>

          {/* Right Column: Redesigned Event At A Glance Component */}
          <div className="lg:col-span-6 xl:col-span-6">
            <ScrollReveal delay={450} duration={700}>
              <RedesignedEventAtAGlance />
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
};
