import React from 'react';
import { SkillsOrbital } from '../3d/SkillsOrbital';

export const TracksSkills: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center border-t border-slate-900 overflow-hidden">
      <div className="space-y-4 mb-8">
        <div className="inline-block px-3 py-1 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 font-mono text-xs tracking-widest uppercase">
          TELEMETRY & CAPABILITIES
        </div>
        <h2 className="font-orbitron font-extrabold text-3xl sm:text-5xl text-slate-100 uppercase tracking-tight">
          ORBITAL SKILL TRACKS.
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-sans">
          Click any orbiting discipline to inspect how your technical expertise aligns with open space data.
        </p>
      </div>

      <SkillsOrbital />
    </section>
  );
};
