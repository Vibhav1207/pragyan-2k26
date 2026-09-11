import React from 'react';
import { ArrowUpRight, ArrowDown, Sparkles } from 'lucide-react';
import { EVENT_DATA } from '../../data/event';
import { ScrollReveal } from '../transitions/ScrollReveal';
import { EventAtAGlance } from './EventAtAGlance';

interface HeroProps {
  onRegisterClick: () => void;
  onExploreChallenges?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRegisterClick, onExploreChallenges }) => {
  return (
    <section id="home" className="w-full pt-32 pb-20 lg:pt-40 lg:pb-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#0B192C] text-white relative overflow-hidden text-left">
      
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/sanjivani-building.jpg"
          alt="Sanjivani Campus Building"
          className="w-full h-full object-cover object-center scale-100 opacity-65 filter brightness-100 contrast-110 animate-ambient-bg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-[#0B192C]" />
      </div>

      <div className="max-w-[1500px] mx-auto w-full space-y-12 sm:space-y-16 relative z-10">
        <ScrollReveal delay={0} duration={500}>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FACC15] animate-pulse" />
              <a href="https://sanjivani.edu.in" target="_blank" rel="noopener noreferrer" className="font-space font-extrabold text-xs sm:text-sm text-white uppercase tracking-wider hover:text-[#FACC15] transition-colors">
                {EVENT_DATA.institution}
              </a>
            </div>

            <div className="font-mono text-xs text-[#FACC15] font-bold uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              OFFICIAL NATIONAL HACKATHON
            </div>
          </div>
        </ScrollReveal>

        {/* Hero Banner Section */}
        <div className="max-w-4xl space-y-8">
          <div className="space-y-4">
            <ScrollReveal delay={100} duration={600}>
              <div className="inline-block p-3.5 bg-white/10 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-md">
                <img
                  src="/pragyan-logo.png"
                  alt="PRAGYAN 2K26 Official Logo"
                  className="h-16 sm:h-24 w-auto object-contain"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150} duration={600}>
              <div className="font-space font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-none">
                PRAGYAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FACC15] to-[#F59E0B]">2K26</span>
              </div>
              
              <h1 className="font-space font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[#E6EEF8] uppercase leading-tight mt-2">
                NATIONAL LEVEL HACKATHON
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={250} duration={600}>
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-3 shadow-2xl">
                <div className="flex items-center gap-2 font-mono text-xs text-[#FACC15] font-extrabold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#FACC15]" />
                  <span>OFFICIAL THEME</span>
                </div>
                <h2 className="font-space font-extrabold text-xl sm:text-3xl text-white uppercase leading-snug">
                  {EVENT_DATA.theme}
                </h2>
                <p className="font-sans font-medium text-sm sm:text-base text-slate-200 leading-relaxed pt-1 border-t border-white/10">
                  {EVENT_DATA.supportingLine}
                </p>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={350} duration={600}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onRegisterClick}
                className="btn-primary-blue text-sm px-8 py-4 uppercase"
              >
                <span>REGISTER NOW</span>
                <ArrowUpRight className="w-5 h-5" />
              </button>

              <a
                href="#tracks"
                onClick={onExploreChallenges}
                className="btn-secondary-gold text-sm px-8 py-4 uppercase"
              >
                <span>EXPLORE TRACKS</span>
                <ArrowDown className="w-5 h-5" />
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Redesigned Event At A Glance Card Component */}
        <ScrollReveal delay={450} duration={700}>
          <EventAtAGlance />
        </ScrollReveal>

      </div>
    </section>
  );
};

