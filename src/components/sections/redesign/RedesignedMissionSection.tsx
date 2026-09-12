import React from 'react';
import { Lightbulb, Rocket, Users, Target } from 'lucide-react';
import { FOUR_CONCEPTS } from '../../../data/event';
import { ScrollReveal } from '../../transitions/ScrollReveal';
import { RedesignedEventHighlightsCard } from './RedesignedEventHighlightsCard';

export const RedesignedMissionSection: React.FC = () => {
  const conceptIcons = [Lightbulb, Rocket, Users, Target];

  return (
    <section id="about" className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#F3EDE0] text-[#050C0C] text-left border-b border-[#D2CAB6]">
      <div className="max-w-[1500px] mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <ScrollReveal delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D2CAB6] pb-6 gap-4">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-[#A77A1C] uppercase tracking-widest bg-[#E9E1D2] px-3.5 py-1.5 rounded-full border border-[#A77A1C]/30">
                ABOUT THE HACKATHON
              </span>
              <h2 className="font-serif font-black text-4xl sm:text-6xl text-[#162E28] uppercase tracking-tight">
                PRAGYAN <span className="italic font-normal text-[#A77A1C]">2K26</span>
              </h2>
            </div>
            <div className="font-mono text-xs font-extrabold text-[#A77A1C] uppercase tracking-widest">
              SANJIVANI UNIVERSITY // KOPARGAON
            </div>
          </div>
        </ScrollReveal>

        {/* Narrative Box + Redesigned Event Highlights Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-6 xl:col-span-7 space-y-6">
            <ScrollReveal delay={100}>
              <h3 className="font-serif font-black text-2xl sm:text-4xl text-[#162E28] leading-snug uppercase">
                INNOVATION & ENTREPRENEURSHIP ON <span className="text-[#A77A1C]">SDG GOAL 2030</span>
              </h3>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <p className="text-base sm:text-lg text-[#050C0C] font-sans leading-relaxed font-normal">
                <strong className="text-[#162E28] font-serif font-extrabold">PRAGYAN 2K26</strong> is a national-level hackathon hosted by <a href="https://sanjivani.edu.in" target="_blank" rel="noopener noreferrer" className="text-[#A77A1C] hover:underline font-bold transition-colors">Sanjivani University</a> designed as a <strong className="text-[#162E28] bg-[#E5BE61]/30 px-1.5 py-0.5 rounded border border-[#A77A1C]/30">24 HRS Innovation Sprint for India's Brightest Commerce and Management Minds</strong>.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-sm sm:text-base text-[#7B8379] font-sans leading-relaxed">
                Grounding every track in United Nations Sustainable Development Goals (SDG Goal 2030), Pragyan 2K26 empowers multi-disciplinary student teams to turn creative concepts into viable, deployable business and technological solutions.
              </p>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-6 xl:col-span-5">
            <ScrollReveal delay={250}>
              <RedesignedEventHighlightsCard />
            </ScrollReveal>
          </div>
        </div>

        {/* 4 Core Pillars of Innovation */}
        <div className="space-y-6 pt-6 border-t border-[#D2CAB6]">
          <ScrollReveal delay={300}>
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#162E28] uppercase tracking-tight">
                FOUR CORE PILLARS OF <span className="text-[#A77A1C] italic font-normal">INNOVATION</span>
              </h3>
              <span className="hidden sm:inline-block font-mono text-xs text-[#7B8379] font-bold uppercase tracking-widest">
                NATIONAL DELEGATE FRAMEWORK
              </span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FOUR_CONCEPTS.map((concept, idx) => {
              const IconComp = conceptIcons[idx % conceptIcons.length];
              return (
                <ScrollReveal key={idx} delay={350 + idx * 100} duration={600}>
                  <div className="p-6 sm:p-7 space-y-4 bg-[#F9F4EA] border border-[#D2CAB6] rounded-2xl text-[#162E28] text-left group h-full flex flex-col justify-between hover:border-[#A77A1C] hover:shadow-lg transition-all duration-300">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="p-3.5 rounded-xl bg-[#E9E1D2] border border-[#A77A1C]/30 text-[#A77A1C] group-hover:bg-[#162E28] group-hover:text-[#E5BE61] transition-all duration-300 group-hover:scale-105">
                          <IconComp className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" />
                        </div>
                        <span className="font-mono text-xs font-black text-[#A77A1C]/60 border border-[#A77A1C]/20 px-2.5 py-1 rounded-md">
                          0{idx + 1}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-serif font-black text-2xl text-[#162E28] uppercase group-hover:text-[#A77A1C] transition-colors">
                          {concept.title}
                        </h4>
                        <div className="font-mono text-xs font-bold text-[#A77A1C] uppercase tracking-wider">
                          {concept.subtitle}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-[#7B8379] font-sans leading-relaxed">
                        {concept.description}
                      </p>
                    </div>

                    <div className="w-6 h-0.5 bg-[#A77A1C]/40 rounded-full mt-4 group-hover:w-12 group-hover:bg-[#A77A1C] transition-all" />
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
