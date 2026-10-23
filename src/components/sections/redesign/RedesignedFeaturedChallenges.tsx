import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, BarChart2, Truck, Briefcase, ArrowRight, FileText, Sparkles } from 'lucide-react';
import { HACKATHON_TRACKS, type Track } from '../../../data/challenges';
import { ScrollReveal } from '../../transitions/ScrollReveal';

interface RedesignedFeaturedChallengesProps {
  onRegisterClick?: () => void;
  onOpenFullChallenges?: () => void;
  onSelectChallenge?: (trackId?: string) => void;
}

export const RedesignedFeaturedChallenges: React.FC<RedesignedFeaturedChallengesProps> = ({
  onSelectChallenge,
}) => {
  const navigate = useNavigate();

  const iconMap: Record<string, React.ElementType> = {
    Wallet,
    BarChart2,
    Truck,
    Briefcase,
  };

  const handleOpenTrackPS = (trackId: string) => {
    if (onSelectChallenge) onSelectChallenge(trackId);
    navigate(`/problem-statements?track=${trackId}`);
  };

  return (
    <section id="tracks" className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#F9F4EA] text-[#050C0C] text-left border-b border-[#D2CAB6]">
      <div className="max-w-[1500px] mx-auto w-full space-y-12">

        <ScrollReveal delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D2CAB6] pb-6 gap-4">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-[#A77A1C] uppercase tracking-widest bg-[#E9E1D2] px-3.5 py-1.5 rounded-full border border-[#A77A1C]/30 flex items-center gap-1.5 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-[#A77A1C]" />
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
              4 COMPETITIVE DOMAINS &bull; 5 PROBLEM STATEMENTS EACH
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {HACKATHON_TRACKS.map((t: Track, idx: number) => {
            const IconComp = iconMap[t.iconName] || Briefcase;

            return (
              <ScrollReveal key={t.id} delay={150 + idx * 120} duration={650}>
                <div
                  onClick={() => handleOpenTrackPS(t.id)}
                  className="p-8 rounded-2xl bg-[#F3EDE0] border border-[#D2CAB6] hover:border-[#A77A1C] hover:bg-[#E9E1D2] group cursor-pointer h-full flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-lg"
                >
                  <div className="space-y-5">

                    <div className="flex items-center justify-between border-b border-[#D2CAB6] pb-4">
                      <span className="font-mono font-black text-xs px-4 py-1.5 rounded-lg bg-[#162E28] text-[#E5BE61] uppercase tracking-wider shadow-sm border border-[#A77A1C]/40">
                        {t.number}
                      </span>
                      <div className="p-3.5 rounded-xl bg-[#E9E1D2] border border-[#A77A1C]/30 text-[#A77A1C] group-hover:bg-[#162E28] group-hover:text-[#E5BE61] transition-all duration-300 group-hover:scale-110">
                        <IconComp className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#162E28] uppercase leading-tight group-hover:text-[#A77A1C] transition-colors">
                        {t.title}
                      </h3>
                      <p className="text-sm text-[#7B8379] font-sans leading-relaxed">
                        {t.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-[#D2CAB6]">
                    <div className="flex items-center justify-between text-xs font-mono font-extrabold text-[#A77A1C]">
                      <span>SDG GOAL 2030 DOMAIN</span>
                      <span className="text-[11px] text-[#7B8379]">5 Challenge Blueprints</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenTrackPS(t.id);
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-[#162E28] group-hover:bg-[#2B3E35] text-[#E5BE61] font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 border border-[#A77A1C]/50 transition-all shadow-sm hover:shadow-md cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-[#E5BE61]" />
                      <span>SHOW PROBLEM STATEMENTS (PS)</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={550}>
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/problem-statements')}
              className="px-8 py-4 rounded-xl font-mono font-black text-xs sm:text-sm uppercase text-[#162E28] bg-[#E5BE61] hover:bg-[#d4ad51] border-2 border-[#162E28] flex items-center gap-2.5 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              <FileText className="w-4.5 h-4.5" />
              <span>EXPLORE ALL PROBLEM STATEMENTS REPOSITORY</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
