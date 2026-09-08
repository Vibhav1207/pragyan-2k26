import React from 'react';
import { PREVIOUS_PROJECTS } from '../../data/projects';
import { Trophy, ExternalLink, Info } from 'lucide-react';
import { GithubIcon } from '../ui/SocialIcons';

export const PreviousMissions: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#F4F4F1] border-t border-[#C9CDD2]/60 text-left">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#C9CDD2]/60 pb-4 mb-10 font-mono text-xs text-[#050505]/70">
        <span className="font-bold text-[#0B3D91]">07 / PROJECT ARCHIVE</span>
        <span>EXEMPLARY SOLUTIONS</span>
      </div>

      <div className="space-y-4 mb-10">
        <h2 className="font-space font-black text-4xl sm:text-6xl text-[#050505] uppercase tracking-tight">
          PREVIOUS <span className="text-[#FC3D21]">MISSIONS.</span>
        </h2>
        <p className="text-sm sm:text-base text-[#050505]/80 max-w-2xl font-sans">
          Explore exemplary solutions, award-winning project prototypes, and code repositories created during past Space Apps hackathons.
        </p>
      </div>

      {/* Note Banner */}
      <div className="max-w-xl mb-10 p-3.5 rounded-xl bg-white border border-[#C9CDD2] text-[#050505] font-mono text-xs flex items-center gap-2 shadow-sm">
        <Info className="w-4 h-4 text-[#0B3D91] flex-none" />
        <span>Demonstrating showcase architecture ready for 2025/2026 Kopargaon winning solution updates.</span>
      </div>

      {/* Grid of Large Editorial Project Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PREVIOUS_PROJECTS.map((proj) => (
          <div
            key={proj.id}
            className="group rounded-[24px] bg-white border border-[#C9CDD2] overflow-hidden flex flex-col justify-between shadow-lg hover:border-[#050505] transition-all duration-300"
          >
            {/* Image */}
            <div className="relative w-full h-60 overflow-hidden bg-slate-900">
              <img
                src={proj.image}
                alt={proj.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />

              {/* Award Badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#FC3D21] text-white font-mono text-xs font-bold shadow-md">
                <Trophy className="w-3.5 h-3.5" />
                <span>{proj.award}</span>
              </div>

              {/* Year */}
              <div className="absolute top-4 right-4 font-space font-extrabold text-xs text-white bg-[#050505]/80 px-3 py-1 rounded-xl">
                {proj.year}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <div className="font-mono text-xs text-[#0B3D91] font-bold mb-1">
                  TEAM: {proj.teamName}
                </div>
                <h3 className="font-space font-extrabold text-2xl text-[#050505] group-hover:text-[#FC3D21] transition-colors">
                  {proj.title}
                </h3>
              </div>

              <div className="font-mono text-xs text-[#050505]/70">
                TRACK: {proj.challengeTitle}
              </div>

              <p className="text-xs sm:text-sm text-[#050505]/80 leading-relaxed font-sans">
                {proj.summary}
              </p>

              {/* Footer Links */}
              <div className="pt-4 border-t border-[#C9CDD2]/60 flex items-center justify-between font-mono text-xs text-[#050505]/80">
                <div className="flex items-center gap-4">
                  {proj.githubUrl && (
                    <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#FC3D21] flex items-center gap-1 font-bold">
                      <GithubIcon className="w-4 h-4" />
                      <span>CODE REPO</span>
                    </a>
                  )}
                  {proj.demoUrl && (
                    <a href={proj.demoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#FC3D21] flex items-center gap-1 font-bold">
                      <ExternalLink className="w-4 h-4" />
                      <span>GLOBAL PORTAL</span>
                    </a>
                  )}
                </div>
                <span className="font-bold text-[#0B3D91]">KOPARGAON</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
