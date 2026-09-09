import React from 'react';
import { Trophy, Calendar, MapPin } from 'lucide-react';
import { FLYER_TIMELINE } from '../../data/schedule';
import { ScrollReveal } from '../transitions/ScrollReveal';

export const SchedulePreview: React.FC = () => {
  return (
    <section id="timeline" className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#F0F4FA] text-[#0B192C] text-left border-b border-slate-200">
      <div className="max-w-[1500px] mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <ScrollReveal delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-300 pb-6 gap-4">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-[#1D4ED8] uppercase tracking-wider bg-[#1D4ED8]/10 px-3 py-1 rounded-full">
                HACKATHON SCHEDULE
              </span>
              <h2 className="font-space font-black text-4xl sm:text-6xl text-[#0B192C] uppercase tracking-tight">
                EVENT TIMELINE
              </h2>
            </div>
            <div className="font-mono text-xs font-bold text-[#D97706] uppercase tracking-widest">
              TWO-PHASE EVALUATION
            </div>
          </div>
        </ScrollReveal>

        {/* Timeline Grid with Connecting Progress Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          {FLYER_TIMELINE.map((phaseData, idx) => {
            const isPhase2 = phaseData.phase === 'PHASE 2';

            return (
              <ScrollReveal key={idx} delay={150 + idx * 200} duration={700}>
                <div className="bg-white text-[#0B192C] border border-slate-200 rounded-3xl p-8 space-y-6 flex flex-col justify-between shadow-lg hover:shadow-xl hover:border-[#1D4ED8]/30 transition-all duration-300 h-full">
                  <div className="space-y-6">
                    
                    {/* Phase Badge Header */}
                    <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-200">
                      <span className="bg-[#1D4ED8] text-white font-mono text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                        {phaseData.badge}
                      </span>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D4ED8] flex items-center gap-1.5">
                        {isPhase2 ? (
                          <>
                            <MapPin className="w-3.5 h-3.5 text-[#1D4ED8]" />
                            <span>SANJIVANI CAMPUS</span>
                          </>
                        ) : (
                          <>
                            <Calendar className="w-3.5 h-3.5 text-[#1D4ED8]" />
                            <span>ONLINE SELECTION</span>
                          </>
                        )}
                      </span>
                    </div>

                    <h3 className="font-space font-black text-2xl sm:text-4xl text-[#0B192C] uppercase leading-tight">
                      {phaseData.title}
                    </h3>

                    {/* Events list */}
                    <div className="space-y-4">
                      {phaseData.events.map((evt, eIdx) => (
                        <ScrollReveal key={eIdx} delay={250 + idx * 150 + eIdx * 100} duration={500}>
                          <div className="p-6 rounded-2xl bg-[#F0F4FA] border border-slate-200 space-y-3 hover:border-[#1D4ED8]/40 transition-colors">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <span className="font-space font-black text-xl text-[#0B192C] uppercase">
                                {evt.name}
                              </span>
                              <span className="bg-[#1D4ED8] text-white font-mono font-extrabold text-xs px-3.5 py-1.5 rounded-lg shadow-sm">
                                {evt.dates}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                              {evt.description}
                            </p>
                          </div>
                        </ScrollReveal>
                      ))}
                    </div>
                  </div>

                  {phaseData.footerNotice && (
                    <ScrollReveal delay={450 + idx * 150}>
                      <div className="mt-6 p-4 rounded-2xl bg-[#FEF3C7] border border-[#F59E0B]/30 text-[#D97706] font-mono text-xs font-extrabold uppercase tracking-wider shadow-sm flex items-center justify-center gap-2">
                        <Trophy className="w-4 h-4 text-[#D97706] flex-none" />
                        <span>{phaseData.footerNotice}</span>
                      </div>
                    </ScrollReveal>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
