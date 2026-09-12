import React from 'react';
import { Wallet, BarChart2, Truck, Briefcase, ArrowUpRight } from 'lucide-react';
import { HACKATHON_TRACKS, type Track } from '../../../data/challenges';
import { ScrollReveal } from '../../transitions/ScrollReveal';

interface RedesignedFeaturedChallengesProps {
  onRegisterClick?: () => void;
  onOpenFullChallenges?: () => void;
  onSelectChallenge?: (trackId?: string) => void;
}

export const RedesignedFeaturedChallenges: React.FC<RedesignedFeaturedChallengesProps> = ({
  onRegisterClick,
  onOpenFullChallenges,
  onSelectChallenge,
}) => {
  const iconMap: Record<string, React.ElementType> = {
    Wallet,
    BarChart2,
    Truck,
    Briefcase,
  };

  return (
    <section id="tracks" className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#F9F4EA] text-[#050C0C] text-left border-b border-[#D2CAB6]">
      <div className="max-w-[1500px] mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <ScrollReveal delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D2CAB6] pb-6 gap-4">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-[#A77A1C] uppercase tracking-widest bg-[#E9E1D2] px-3.5 py-1.5 rounded-full border border-[#A77A1C]/30">
                OFFICIAL HACKATHON TRACKS
              </span>
              <h2 className="font-serif font-black text-4xl sm:text-6xl text-[#162E28] uppercase tracking-tight">
                HACKATHON <span className="italic font-normal text-[#A77A1C]">TRACKS</span>
              </h2>
              <p className="font-mono text-xs sm:text-sm font-bold text-[#A77A1C] uppercase tracking-wider">
                CHOOSE YOUR PATH, CREATE REAL IMPACT.
              </p>
            </div>
            <div className="font-mono text-xs font-bold text-[#7B8379] uppercase">
              4 COMPETITIVE DOMAINS
            </div>
          </div>
        </ScrollReveal>

        {/* 4 Track Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {HACKATHON_TRACKS.map((t: Track, idx: number) => {
            const IconComp = iconMap[t.iconName] || Briefcase;

            return (
              <ScrollReveal key={t.id} delay={150 + idx * 120} duration={650}>
                <div
                  onClick={() => {
                    if (onSelectChallenge) onSelectChallenge(t.id);
                    if (onOpenFullChallenges) onOpenFullChallenges();
                  }}
                  className="p-8 rounded-2xl bg-[#F3EDE0] border border-[#D2CAB6] hover:border-[#A77A1C] hover:bg-[#E9E1D2] group cursor-pointer h-full flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-lg"
                >
                  <div className="space-y-4">
                    {/* Track Badge & Icon */}
                    <div className="flex items-center justify-between border-b border-[#D2CAB6] pb-4">
                      <span className="font-mono font-black text-xs px-4 py-1.5 rounded-lg bg-[#162E28] text-[#E5BE61] uppercase tracking-wider shadow-sm border border-[#A77A1C]/40">
                        {t.number}
                      </span>
                      <div className="p-3.5 rounded-xl bg-[#E9E1D2] border border-[#A77A1C]/30 text-[#A77A1C] group-hover:bg-[#162E28] group-hover:text-[#E5BE61] transition-all duration-300 group-hover:scale-110">
                        <IconComp className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2">
                      <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#162E28] uppercase leading-tight group-hover:text-[#A77A1C] transition-colors">
                        {t.title}
                      </h3>
                      <p className="text-sm text-[#7B8379] font-sans leading-relaxed">
                        {t.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="pt-4 border-t border-[#D2CAB6] flex items-center justify-between text-xs font-mono font-extrabold text-[#A77A1C]">
                    <span>SDG GOAL 2030 TRACK</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-[#162E28]" />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {onRegisterClick && (
          <ScrollReveal delay={550}>
            <div className="pt-4 flex justify-center">
              <button
                onClick={onRegisterClick}
                className="px-8 py-4 rounded-xl font-mono font-black text-sm uppercase text-[#F9F4EA] bg-[#162E28] hover:bg-[#2B3E35] border border-[#A77A1C]/60 flex items-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>REGISTER FOR YOUR CHOSEN TRACK</span>
                <ArrowUpRight className="w-5 h-5 text-[#E5BE61]" />
              </button>
            </div>
          </ScrollReveal>
        )}

      </div>
    </section>
  );
};
