import React from 'react';
import { Wallet, BarChart2, Truck, Briefcase, ArrowUpRight } from 'lucide-react';
import { HACKATHON_TRACKS, type Track } from '../../data/challenges';

interface FeaturedChallengesProps {
  onRegisterClick?: () => void;
  onOpenFullChallenges?: () => void;
  onSelectChallenge?: (trackId?: string) => void;
}

export const FeaturedChallenges: React.FC<FeaturedChallengesProps> = ({ onRegisterClick, onOpenFullChallenges, onSelectChallenge }) => {
  const iconMap: Record<string, React.ElementType> = {
    Wallet,
    BarChart2,
    Truck,
    Briefcase,
  };

  return (
    <section id="tracks" className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-white text-[#0B192C] text-left border-b border-slate-200">
      <div className="max-w-[1500px] mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-300 pb-6 gap-4">
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold text-[#1D4ED8] uppercase tracking-wider bg-[#1D4ED8]/10 px-3 py-1 rounded-full">
              OFFICIAL HACKATHON TRACKS
            </span>
            <h2 className="font-space font-black text-4xl sm:text-6xl text-[#0B192C] uppercase tracking-tight">
              HACKATHON TRACKS
            </h2>
            <p className="font-mono text-xs sm:text-sm font-bold text-[#D97706] uppercase tracking-wider">
              CHOOSE YOUR PATH, CREATE REAL IMPACT.
            </p>
          </div>
          <div className="font-mono text-xs font-bold text-slate-500 uppercase">
            4 COMPETITIVE DOMAINS
          </div>
        </div>

        {/* 4 Track Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {HACKATHON_TRACKS.map((t: Track) => {
            const IconComp = iconMap[t.iconName] || Briefcase;

            return (
              <div
                key={t.id}
                onClick={() => {
                  if (onSelectChallenge) onSelectChallenge(t.id);
                  if (onOpenFullChallenges) onOpenFullChallenges();
                }}
                className="card-premium p-8 flex flex-col justify-between space-y-6 bg-gradient-to-br from-white via-[#F0F4FA]/50 to-white group border border-slate-200 hover:border-[#1D4ED8]/40 cursor-pointer"
              >
                <div className="space-y-4">
                  {/* Track Badge & Icon */}
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <span className="font-mono font-black text-xs px-3.5 py-1.5 rounded-lg bg-[#0B192C] text-[#FACC15] uppercase tracking-wider">
                      {t.number}
                    </span>
                    <div className="p-3 rounded-xl bg-[#1D4ED8]/10 text-[#1D4ED8] group-hover:bg-[#1D4ED8] group-hover:text-white transition-colors">
                      <IconComp className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Short Visual Description */}
                  <div className="space-y-2">
                    <h3 className="font-space font-black text-2xl sm:text-3xl text-[#0B192C] uppercase leading-tight group-hover:text-[#1D4ED8] transition-colors">
                      {t.title}
                    </h3>
                    <p className="text-sm text-slate-600 font-sans leading-relaxed">
                      {t.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-mono font-bold text-[#1D4ED8]">
                  <span>SDG GOAL 2030 TRACK</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {onRegisterClick && (
          <div className="pt-4 flex justify-center">
            <button onClick={onRegisterClick} className="btn-primary-blue text-sm uppercase px-8 py-4">
              <span>REGISTER FOR YOUR CHOSEN TRACK</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
