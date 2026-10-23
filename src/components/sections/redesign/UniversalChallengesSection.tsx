import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  Lock, 
  Clock, 
  Download
} from 'lucide-react';
import type { HackathonChallenge } from '../../../types/admin';

interface UniversalChallengesSectionProps {
  challenges: HackathonChallenge[];
}

export const UniversalChallengesSection: React.FC<UniversalChallengesSectionProps> = ({ challenges }) => {
  const liveChallenges = challenges.filter(c => c.isEnabled);
  const totalChallenges = 5;

  return (
    <div className="w-full bg-[#E9E1D2]/80 border-2 border-[#A77A1C]/40 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#D2CAB6] pb-5 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-black uppercase tracking-wider bg-[#162E28] text-[#E5BE61] px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <Award className="w-3.5 h-3.5 text-[#E5BE61]" />
              <span>UNIVERSAL CHALLENGES &bull; ALL TRACKS</span>
            </span>
            <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase ${
              liveChallenges.length > 0 
                ? 'bg-emerald-900/20 text-emerald-900 border border-emerald-600/40' 
                : 'bg-amber-900/20 text-amber-900 border border-amber-600/40'
            }`}>
              {liveChallenges.length > 0 ? `${liveChallenges.length} of ${totalChallenges} LIVE` : 'ALL LOCKED'}
            </span>
          </div>

          <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#162E28] uppercase tracking-tight">
            5 MILESTONE <span className="italic font-normal text-[#A77A1C]">CHALLENGES</span>
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#7B8379] max-w-2xl">
            These 5 milestone challenges are identical and mandatory across all 4 tracks. Organizers release them sequentially one by one during the 24-hour hackathon.
          </p>
        </div>

        {/* Status progress dots */}
        <div className="flex items-center gap-2 bg-[#F9F4EA] px-4 py-2.5 rounded-2xl border border-[#D2CAB6] shadow-inner shrink-0">
          <span className="text-[11px] font-mono font-bold text-[#162E28] uppercase">ROADMAP:</span>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((num) => {
              const matching = challenges.find(c => c.challengeNumber === num);
              const isLive = matching ? matching.isEnabled : false;
              return (
                <div
                  key={num}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-black transition-all ${
                    isLive 
                      ? 'bg-[#162E28] text-[#E5BE61] shadow-sm border border-[#A77A1C]' 
                      : 'bg-[#D2CAB6]/60 text-[#7B8379] border border-[#D2CAB6]'
                  }`}
                  title={`Challenge ${num}: ${isLive ? 'Live & Unlocked' : 'Locked'}`}
                >
                  {isLive ? `#${num}` : <Lock className="w-3 h-3 text-[#7B8379]" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* When no challenges are live yet */}
      {liveChallenges.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-[#F9F4EA] border border-[#D2CAB6] space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#162E28] text-[#E5BE61] flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-5 h-5" />
          </div>
          <h4 className="font-serif font-black text-lg text-[#162E28] uppercase">
            Milestone Challenges Sealed
          </h4>
          <p className="font-sans text-xs text-[#7B8379] max-w-md mx-auto">
            Challenge 1 will be released live by the organizing team when the hackathon officially commences. Keep this page open to receive live updates.
          </p>
        </div>
      ) : (
        /* Live Challenges Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {liveChallenges.map((chal) => (
            <div
              key={chal.challengeId}
              className="bg-[#F9F4EA] border border-[#A77A1C]/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-[#D2CAB6]/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-[#162E28] text-[#E5BE61] font-serif font-black text-sm flex items-center justify-center shadow-inner">
                      0{chal.challengeNumber}
                    </span>
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider text-emerald-800 bg-emerald-900/10 px-2 py-0.5 rounded-md border border-emerald-600/30">
                      LIVE CHALLENGE
                    </span>
                  </div>
                  {chal.timeframe && (
                    <span className="text-[11px] font-mono text-[#A77A1C] font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#A77A1C]" />
                      <span>{chal.timeframe}</span>
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-lg text-[#162E28] leading-snug">
                    {chal.title}
                  </h4>
                  {chal.subtitle && (
                    <p className="text-xs font-semibold text-[#A77A1C]">
                      {chal.subtitle}
                    </p>
                  )}
                </div>

                <p className="text-xs text-[#7B8379] leading-relaxed">
                  {chal.description}
                </p>

                {chal.deliverables && chal.deliverables.length > 0 && (
                  <div className="pt-2 bg-[#E9E1D2]/50 p-3 rounded-xl border border-[#D2CAB6]/80 space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#162E28] uppercase tracking-wider block">
                      Required Deliverables:
                    </span>
                    <ul className="space-y-1">
                      {chal.deliverables.map((deliv, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#162E28]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#A77A1C] shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {chal.documentUrl && (
                <div className="pt-2">
                  <a
                    href={chal.documentUrl}
                    download={chal.documentName || `Challenge_${chal.challengeNumber}_Brief.docx`}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] text-xs font-mono font-bold transition shadow-sm w-full justify-center"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Challenge Brief ({chal.documentName || '.docx'})</span>
                  </a>
                </div>
              )}
            </div>
          ))}

          {/* Locked Next Challenge Placeholder */}
          {liveChallenges.length < totalChallenges && (
            <div className="bg-[#E9E1D2]/40 border-2 border-dashed border-[#D2CAB6] rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3 min-h-[220px]">
              <div className="w-10 h-10 rounded-full bg-[#D2CAB6] text-[#7B8379] flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="font-serif font-bold text-sm text-[#162E28] uppercase">
                  Challenge 0{liveChallenges.length + 1} Pending Release
                </div>
                <p className="text-[11px] font-sans text-[#7B8379] max-w-xs">
                  This milestone will be unlocked by the evaluation committee when the prior phase finishes.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
