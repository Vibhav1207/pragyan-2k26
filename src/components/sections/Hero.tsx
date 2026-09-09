import React from 'react';
import { ArrowUpRight, ArrowDown, Users, CreditCard, Clock, Award, Sparkles, MapPin } from 'lucide-react';
import { EVENT_DATA } from '../../data/event';
import { ScrollReveal } from '../transitions/ScrollReveal';
import { AnimatedCounter } from '../ui/AnimatedCounter';

interface HeroProps {
  onRegisterClick: () => void;
  onExploreChallenges?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRegisterClick, onExploreChallenges }) => {
  return (
    <section id="home" className="w-full pt-32 pb-20 lg:pt-40 lg:pb-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#0B192C] text-white relative overflow-hidden text-left">
      
      {/* Sanjivani Building Campus Background Image - High Visibility with Low Amplitude Slow Motion */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/sanjivani-building.jpg"
          alt="Sanjivani Campus Building"
          className="w-full h-full object-cover object-center scale-100 opacity-65 filter brightness-100 contrast-110 animate-ambient-bg"
        />
        {/* Dark Transparent Black Screen Overlay to make text 100% crisp while keeping building photo clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-[#0B192C]" />
      </div>

      <div className="max-w-[1500px] mx-auto w-full space-y-12 relative z-10">
        
        {/* Top Institution Banner */}
        <ScrollReveal delay={0} duration={500}>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FACC15] animate-pulse" />
              <span className="font-space font-extrabold text-xs sm:text-sm text-white uppercase tracking-wider">
                {EVENT_DATA.institution}
              </span>
            </div>

            <div className="font-mono text-xs text-[#FACC15] font-bold uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              OFFICIAL NATIONAL HACKATHON
            </div>
          </div>
        </ScrollReveal>

        {/* Hero Editorial Headlines */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-8">
            
            <div className="space-y-4">
              {/* Official Pragyan 2K26 Logo Display */}
              <ScrollReveal delay={100} duration={600}>
                <div className="inline-block p-3.5 bg-white/95 rounded-2xl border border-white/30 shadow-2xl backdrop-blur-md">
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

            {/* CTAs */}
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

          {/* Right Visual Card */}
          <div className="lg:col-span-4">
            <ScrollReveal delay={450} duration={700}>
              <div className="card-navy p-8 space-y-6 text-left border-2 border-[#1D4ED8]/40 bg-gradient-to-b from-[#0B192C] to-[#071324] shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="font-mono text-xs font-bold text-[#FACC15]">EVENT AT A GLANCE</span>
                  <Award className="w-5 h-5 text-[#1D4ED8]" />
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="font-mono text-[10px] text-slate-400 font-bold uppercase">TEAM COMPOSITION</div>
                    <div className="font-space font-black text-lg text-white flex items-center gap-1">
                      <AnimatedCounter value={4} /> MEMBERS PER TEAM
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="font-mono text-[10px] text-slate-400 font-bold uppercase">FIRST ROUND FEE</div>
                    <div className="font-space font-black text-lg text-[#FACC15] flex items-center gap-1">
                      <AnimatedCounter value={500} prefix="₹" /> REGISTRATION FEE
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="font-mono text-[10px] text-slate-400 font-bold uppercase">SPRINT DURATION</div>
                    <div className="font-space font-black text-lg text-white flex items-center gap-1">
                      <AnimatedCounter value={24} suffix=" HRS" /> HACKATHON
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-[11px] font-mono text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FACC15]" />
                  <span>SANJIVANI UNIVERSITY, KOPARGAON</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* Compact Badges Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <ScrollReveal delay={550} duration={600}>
            <div className="card-premium p-6 flex items-center gap-4 bg-white text-[#0B192C]">
              <div className="p-3.5 rounded-xl bg-[#1D4ED8]/10 text-[#1D4ED8]">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="font-mono text-xs text-slate-500 font-bold">TEAM FORMATION</div>
                <div className="font-space font-black text-lg text-[#0B192C]">4 MEMBERS PER TEAM</div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={650} duration={600}>
            <div className="card-premium p-6 flex items-center gap-4 bg-white text-[#0B192C]">
              <div className="p-3.5 rounded-xl bg-[#F59E0B]/10 text-[#D97706]">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <div className="font-mono text-xs text-slate-500 font-bold">FIRST ROUND FEE</div>
                <div className="font-space font-black text-lg text-[#0B192C]">₹500 REGISTRATION FEE</div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={750} duration={600}>
            <div className="card-premium p-6 flex items-center gap-4 bg-white text-[#0B192C]">
              <div className="p-3.5 rounded-xl bg-[#1D4ED8]/10 text-[#1D4ED8]">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="font-mono text-xs text-slate-500 font-bold">SPRINT FORMAT</div>
                <div className="font-space font-black text-lg text-[#0B192C]">24 HRS HACKATHON</div>
              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};
