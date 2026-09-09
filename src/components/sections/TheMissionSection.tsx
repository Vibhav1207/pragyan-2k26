import React from 'react';
import { Lightbulb, Rocket, Users, Target } from 'lucide-react';
import { FOUR_CONCEPTS } from '../../data/event';
import { ScrollReveal } from '../transitions/ScrollReveal';

export const TheMissionSection: React.FC = () => {
  const conceptIcons = [Lightbulb, Rocket, Users, Target];

  return (
    <section id="about" className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#F0F4FA] text-[#0B192C] text-left border-b border-slate-200">
      <div className="max-w-[1500px] mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <ScrollReveal delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-300 pb-6 gap-4">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-[#1D4ED8] uppercase tracking-wider bg-[#1D4ED8]/10 px-3 py-1 rounded-full">
                ABOUT THE HACKATHON
              </span>
              <h2 className="font-space font-black text-4xl sm:text-6xl text-[#0B192C] uppercase tracking-tight">
                PRAGYAN 2K26
              </h2>
            </div>
            <div className="font-mono text-xs font-bold text-[#D97706] uppercase tracking-widest">
              SANJIVANI UNIVERSITY // KOPARGAON
            </div>
          </div>
        </ScrollReveal>

        {/* Narrative Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6">
            <ScrollReveal delay={100}>
              <h3 className="font-space font-black text-2xl sm:text-4xl text-[#0B192C] leading-snug">
                INNOVATION & ENTREPRENEURSHIP ON SDG GOAL 2030
              </h3>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <p className="text-base sm:text-lg text-slate-700 font-sans leading-relaxed font-medium">
                <strong className="text-[#0B192C]">PRAGYAN 2K26</strong> is a national-level hackathon hosted by <a href="https://sanjivani.edu.in" target="_blank" rel="noopener noreferrer" className="text-[#1D4ED8] hover:underline font-bold transition-colors">Sanjivani University</a> designed as a <strong className="text-[#0B192C] bg-[#FACC15]/30 px-1">24 HRS Innovation Sprint for India's Brightest Commerce and Management Minds</strong>.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
                Grounding every track in United Nations Sustainable Development Goals (SDG Goal 2030), Pragyan 2K26 empowers multi-disciplinary student teams to turn creative concepts into viable, deployable business and technological solutions.
              </p>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-4">
            <ScrollReveal delay={250}>
              <div className="card-navy p-6 sm:p-8 space-y-4 text-left">
                <div className="font-mono text-xs text-[#FACC15] font-bold uppercase">EVENT HIGHLIGHTS</div>
                <div className="font-space font-black text-2xl uppercase text-white">24 HRS HACKATHON</div>
                <div className="space-y-2 font-mono text-xs text-slate-300 font-semibold">
                  <div className="flex justify-between border-b border-white/10 py-1.5">
                    <span>INSTITUTION</span>
                    <a href="https://sanjivani.edu.in" target="_blank" rel="noopener noreferrer" className="text-[#FACC15] hover:underline">SANJIVANI UNIVERSITY</a>
                  </div>
                  <div className="flex justify-between border-b border-white/10 py-1.5">
                    <span>LOCATION</span>
                    <span>KOPARGAON, NEAR SHIRDI</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span>ELIGIBILITY</span>
                    <span className="text-white">UG • PG • PhD</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* 4 Concept Cards (Ideate, Innovate, Collaborate, Create Impact) */}
        <div className="space-y-6 pt-4">
          <ScrollReveal delay={300}>
            <h3 className="font-space font-black text-2xl text-[#0B192C] uppercase tracking-tight">
              FOUR CORE PILLARS OF INNOVATION
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FOUR_CONCEPTS.map((concept, idx) => {
              const IconComp = conceptIcons[idx % conceptIcons.length];
              return (
                <ScrollReveal key={idx} delay={350 + idx * 100} duration={600}>
                  <div className="card-premium p-6 sm:p-8 space-y-4 bg-white text-[#0B192C] text-left group h-full flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="p-3.5 rounded-xl bg-[#1D4ED8]/10 text-[#1D4ED8] group-hover:bg-[#1D4ED8] group-hover:text-white transition-all duration-300 group-hover:scale-105">
                          <IconComp className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" />
                        </div>
                        <span className="font-mono text-xs font-bold text-slate-400">
                          0{idx + 1}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-space font-black text-2xl text-[#0B192C] uppercase group-hover:text-[#1D4ED8] transition-colors">
                          {concept.title}
                        </h4>
                        <div className="font-mono text-xs font-extrabold text-[#1D4ED8] uppercase">
                          {concept.subtitle}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                        {concept.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
