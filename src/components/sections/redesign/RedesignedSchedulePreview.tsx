import React from 'react';
import { Trophy, MapPin, CheckCircle2, Flame } from 'lucide-react';
import { FLYER_TIMELINE } from '../../../data/schedule';
import { ScrollReveal } from '../../transitions/ScrollReveal';

export const RedesignedSchedulePreview: React.FC = () => {
  return (
    <section id="timeline" className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#F3EDE0] text-[#050C0C] text-left border-b border-[#D2CAB6]">
      <div className="max-w-[1500px] mx-auto w-full space-y-12">

        <ScrollReveal delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D2CAB6] pb-6 gap-4">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-[#A77A1C] uppercase tracking-widest bg-[#E9E1D2] px-3.5 py-1.5 rounded-full border border-[#A77A1C]/30">
                HACKATHON SCHEDULE
              </span>
              <h2 className="font-serif font-black text-4xl sm:text-6xl text-[#162E28] uppercase tracking-tight">
                EVENT <span className="italic font-normal text-[#A77A1C]">TIMELINE</span>
              </h2>
            </div>
            <div className="font-mono text-xs font-bold text-[#A77A1C] uppercase tracking-widest flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5BE61] animate-pulse" />
              <span>ROUND 1 OVER • ROUND 2 COMMENCING</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          {FLYER_TIMELINE.map((phaseData, idx) => {
            const isRound2 = phaseData.phase.includes('2');

            return (
              <ScrollReveal key={idx} delay={150 + idx * 200} duration={700}>
                <div className={`bg-[#F9F4EA] text-[#050C0C] border rounded-3xl p-7 sm:p-9 space-y-6 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 h-full ${
                  isRound2 ? 'border-2 border-[#A77A1C]' : 'border-[#D2CAB6]'
                }`}>
                  <div className="space-y-6">

                    <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#D2CAB6]">
                      <span className={`font-mono text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm border flex items-center gap-1.5 ${
                        isRound2
                          ? 'bg-[#162E28] text-[#E5BE61] border-[#A77A1C]/40'
                          : 'bg-[#E9E1D2] text-[#162E28] border-[#A77A1C]/30'
                      }`}>
                        {isRound2 ? (
                          <Flame className="w-3.5 h-3.5 text-[#E5BE61]" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                        )}
                        <span>{phaseData.badge}</span>
                      </span>

                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#A77A1C] flex items-center gap-1.5">
                        {isRound2 ? (
                          <>
                            <MapPin className="w-3.5 h-3.5 text-[#A77A1C]" />
                            <span>SANJIVANI CAMPUS • ON-GROUND</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                            <span>ONLINE SELECTION (OVER)</span>
                          </>
                        )}
                      </span>
                    </div>

                    <h3 className="font-serif font-black text-2xl sm:text-4xl text-[#162E28] uppercase leading-tight">
                      {phaseData.title}
                    </h3>

                    <div className="space-y-4">
                      {phaseData.events.map((evt, eIdx) => (
                        <ScrollReveal key={eIdx} delay={250 + idx * 150 + eIdx * 100} duration={500}>
                          <div className="p-5 sm:p-6 rounded-2xl bg-[#F3EDE0] border border-[#D2CAB6] space-y-2.5 hover:border-[#A77A1C] transition-colors">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <span className="font-serif font-black text-lg sm:text-xl text-[#162E28] uppercase">
                                {evt.name}
                              </span>
                              <span className={`font-mono font-extrabold text-xs px-3.5 py-1.5 rounded-lg shadow-sm border ${
                                evt.status.includes('OVER') || evt.status.includes('COMPLETED')
                                  ? 'bg-[#E9E1D2] text-[#7B8379] border-[#D2CAB6]'
                                  : 'bg-[#162E28] text-[#E5BE61] border-[#A77A1C]/40 animate-pulse'
                              }`}>
                                {evt.status}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm font-sans text-[#7B8379] leading-relaxed">
                              {evt.description}
                            </p>
                          </div>
                        </ScrollReveal>
                      ))}
                    </div>
                  </div>

                  {phaseData.footerNotice && (
                    <ScrollReveal delay={450 + idx * 150}>
                      <div className={`mt-6 p-4 rounded-2xl border text-xs font-mono font-bold uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 text-center ${
                        isRound2
                          ? 'bg-[#162E28] text-[#E5BE61] border-[#A77A1C]/60'
                          : 'bg-[#E9E1D2] text-[#162E28] border-[#A77A1C]/50'
                      }`}>
                        <Trophy className={`w-4 h-4 flex-none ${isRound2 ? 'text-[#E5BE61]' : 'text-[#A77A1C]'}`} />
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
