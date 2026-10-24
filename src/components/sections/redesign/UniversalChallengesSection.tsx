import React, { useState, useMemo } from 'react';
import {
  Award,
  Lock,
  Clock,
  Download,
  CheckCircle2,
  Filter
} from 'lucide-react';
import type { HackathonChallenge } from '../../../types/admin';

interface UniversalChallengesSectionProps {
  challenges: HackathonChallenge[];
  selectedTrack?: string;
  selectedPsId?: string;
}

export const UniversalChallengesSection: React.FC<UniversalChallengesSectionProps> = ({
  challenges,
  selectedTrack = 'all',
  selectedPsId
}) => {
  const [internalPsFilter, setInternalPsFilter] = useState<string>('all');
  const effectivePsId = selectedPsId || (internalPsFilter === 'all' ? undefined : internalPsFilter);

  // Available Problem Statements in the currently selected track
  const availablePsList = useMemo(() => {
    const psSet = new Set<string>();
    challenges.forEach(c => {
      if (c.psId && (selectedTrack === 'all' || c.trackId === selectedTrack)) {
        psSet.add(c.psId);
      }
    });
    return Array.from(psSet).sort();
  }, [challenges, selectedTrack]);

  // Filter challenges:
  // 1. Must be enabled by Admin (c.isEnabled === true)
  // 2. Match trackId (if not 'all')
  // 3. Match effectivePsId (if selected)
  const filteredChallenges = challenges.filter(c => {
    if (!c.isEnabled) return false;
    if (effectivePsId && c.psId && c.psId !== effectivePsId) {
      return false;
    }
    if (c.trackId && c.trackId !== 'all' && selectedTrack !== 'all' && c.trackId !== selectedTrack) {
      return false;
    }
    return true;
  });

  const liveChallenges = filteredChallenges;

  // Compute which of the 5 milestone phases have live challenges
  const activeMilestones = [1, 2, 3, 4, 5].map(num => {
    const matching = challenges.filter(c => c.challengeNumber === num && (
      selectedTrack === 'all' || !c.trackId || c.trackId === 'all' || c.trackId === selectedTrack
    ));
    const isLive = matching.some(c => c.isEnabled);
    return { num, isLive };
  });

  const livePhasesCount = activeMilestones.filter(m => m.isLive).length;

  return (
    <div className="w-full bg-[#E9E1D2]/80 border-2 border-[#A77A1C]/40 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#D2CAB6] pb-5 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-black uppercase tracking-wider bg-[#162E28] text-[#E5BE61] px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <Award className="w-3.5 h-3.5 text-[#E5BE61]" />
              <span>HACKATHON MILESTONE CHALLENGES</span>
            </span>
            <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase ${livePhasesCount > 0
                ? 'bg-emerald-900/20 text-emerald-900 border border-emerald-600/40'
                : 'bg-amber-900/20 text-amber-900 border border-amber-600/40'
              }`}>
              {livePhasesCount > 0 ? `${livePhasesCount} of 5 MILESTONES LIVE` : 'ALL LOCKED'}
            </span>
          </div>

          <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#162E28] uppercase tracking-tight">
            5 MILESTONE <span className="italic font-normal text-[#A77A1C]">CHALLENGES</span>
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#7B8379] max-w-2xl">
            Each track and problem statement features 5 progressive milestone challenges unlocked by the evaluation committee as the hackathon unfolds.
          </p>
        </div>

        {/* Status progress dots */}
        <div className="flex items-center gap-2 bg-[#F9F4EA] px-4 py-2.5 rounded-2xl border border-[#D2CAB6] shadow-inner shrink-0">
          <span className="text-[11px] font-mono font-bold text-[#162E28] uppercase">ROADMAP:</span>
          <div className="flex gap-1.5">
            {activeMilestones.map(({ num, isLive }) => (
              <div
                key={num}
                className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-black transition-all ${isLive
                    ? 'bg-[#162E28] text-[#E5BE61] shadow-sm border border-[#A77A1C]'
                    : 'bg-[#D2CAB6]/60 text-[#7B8379] border border-[#D2CAB6]'
                  }`}
                title={`Milestone Challenge ${num}: ${isLive ? 'Live & Unlocked' : 'Pending Release'}`}
              >
                {isLive ? `#${num}` : <Lock className="w-3 h-3 text-[#7B8379]" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter by Problem Statement Pill Row (when viewing a track or all) */}
      {!selectedPsId && availablePsList.length > 0 && (
        <div className="space-y-2 pt-1 border-b border-[#D2CAB6]/60 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#A77A1C]">
            <Filter className="w-3.5 h-3.5" />
            <span>FILTER CHALLENGES BY PROBLEM STATEMENT:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-nowrap sm:flex-wrap">
            <button
              type="button"
              onClick={() => setInternalPsFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer shrink-0 ${internalPsFilter === 'all'
                  ? 'bg-[#162E28] text-[#E5BE61] shadow-sm border border-[#A77A1C]'
                  : 'bg-[#F9F4EA] text-[#7B8379] hover:text-[#162E28] border border-[#D2CAB6]'
                }`}
            >
              ALL STATEMENTS ({liveChallenges.length})
            </button>
            {availablePsList.map(ps => {
              const psCount = challenges.filter(c => c.psId === ps && c.isEnabled).length;
              const isSelected = internalPsFilter === ps;
              return (
                <button
                  key={ps}
                  type="button"
                  onClick={() => setInternalPsFilter(ps)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer shrink-0 ${isSelected
                      ? 'bg-[#162E28] text-[#E5BE61] shadow-sm border border-[#A77A1C]'
                      : 'bg-[#F9F4EA] text-[#7B8379] hover:text-[#162E28] border border-[#D2CAB6]'
                    }`}
                >
                  {ps} ({psCount})
                </button>
              );
            })}
          </div>
        </div>
      )}

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
            Challenge 1 & 2 will be released live by the organizing team when the hackathon officially commences. Keep this page open to receive live updates.
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
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="w-8 h-8 rounded-lg bg-[#162E28] text-[#E5BE61] font-serif font-black text-sm flex items-center justify-center shadow-inner">
                      0{chal.challengeNumber}
                    </span>
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider text-emerald-800 bg-emerald-900/10 px-2 py-0.5 rounded-md border border-emerald-600/30">
                      LIVE CHALLENGE
                    </span>
                    {chal.psId && (
                      <span className="text-[10px] font-mono font-black uppercase tracking-wider bg-[#162E28] text-[#E5BE61] px-2 py-0.5 rounded-md">
                        {chal.psId}
                      </span>
                    )}
                  </div>
                  {chal.timeframe && (
                    <span className="text-[11px] font-mono text-[#A77A1C] font-bold flex items-center gap-1 shrink-0">
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
                  <div className="space-y-1.5 pt-2 border-t border-[#D2CAB6]/40">
                    <span className="text-[10px] font-mono font-bold text-[#A77A1C] uppercase tracking-wider">
                      KEY DELIVERABLES:
                    </span>
                    <ul className="space-y-1">
                      {chal.deliverables.map((d, dIdx) => (
                        <li key={dIdx} className="text-xs text-[#162E28] flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{d}</span>
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
          {livePhasesCount < 5 && (
            <div className="bg-[#E9E1D2]/40 border-2 border-dashed border-[#D2CAB6] rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-3 min-h-[220px]">
              <div className="w-10 h-10 rounded-full bg-[#D2CAB6] text-[#7B8379] flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="font-serif font-bold text-sm text-[#162E28] uppercase">
                  Challenge 0{livePhasesCount + 1} Pending Release
                </div>
                <p className="text-[11px] font-sans text-[#7B8379] max-w-xs">
                  {livePhasesCount === 4
                    ? 'Final milestone challenge 5 will be unlocked by the evaluation committee as the final phase commences.'
                    : `Milestone challenges ${livePhasesCount + 1} to 5 will be unlocked by the evaluation committee as each phase progresses.`}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
