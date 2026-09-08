import React, { useState } from 'react';
import { MENTORS_DATA } from '../../data/mentors';
import { ORGANIZERS_DATA } from '../../data/organizers';
import type { ProfilePerson } from '../../data/mentors';
import { Info } from 'lucide-react';
import { LinkedinIcon, TwitterIcon, InstagramIcon, GithubIcon } from '../ui/SocialIcons';

export const MentorsOrganizers: React.FC = () => {
  const [tab, setTab] = useState<'MENTORS' | 'ORGANIZERS'>('MENTORS');

  const currentList: ProfilePerson[] = tab === 'MENTORS' ? MENTORS_DATA : ORGANIZERS_DATA;

  return (
    <section id="mentors" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#F4F4F1] border-t border-[#C9CDD2]/60 text-left">
      
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-[#C9CDD2]/60 pb-4 mb-10 font-mono text-xs text-[#050505]/70">
        <span className="font-bold text-[#FC3D21]">06 / PEOPLE & COMMAND</span>
        <span>MENTORS & ORGANIZERS</span>
      </div>

      <div className="space-y-4 mb-10">
        <h2 className="font-space font-black text-4xl sm:text-6xl text-[#050505] uppercase tracking-tight">
          MISSION <span className="text-[#0B3D91]">COMMAND.</span>
        </h2>
        <p className="text-sm sm:text-base text-[#050505]/80 max-w-2xl font-sans">
          Subject matter mentors, university research leads, and local organizers empowering Kopargaon hackathon teams.
        </p>
      </div>

      {/* Note Banner */}
      <div className="max-w-xl mb-8 p-3 rounded-xl bg-white border border-[#C9CDD2] text-[#050505] font-mono text-xs flex items-center gap-2 shadow-sm">
        <Info className="w-4 h-4 text-[#FC3D21] flex-none" />
        <span>NOTE: Displaying editable data placeholders. Official 2026 local profiles will update prior to launch.</span>
      </div>

      {/* Tab Selector */}
      <div className="flex gap-3 mb-12 font-mono text-xs">
        <button
          onClick={() => setTab('MENTORS')}
          className={`px-5 py-2.5 rounded-xl tracking-wider uppercase transition-all duration-200 border ${
            tab === 'MENTORS'
              ? 'bg-[#050505] text-white border-[#050505] font-bold shadow-md'
              : 'bg-white text-[#050505]/70 border-[#C9CDD2]/60 hover:text-[#050505]'
          }`}
        >
          MENTORS & JUDGES ({MENTORS_DATA.length})
        </button>

        <button
          onClick={() => setTab('ORGANIZERS')}
          className={`px-5 py-2.5 rounded-xl tracking-wider uppercase transition-all duration-200 border ${
            tab === 'ORGANIZERS'
              ? 'bg-[#050505] text-white border-[#050505] font-bold shadow-md'
              : 'bg-white text-[#050505]/70 border-[#C9CDD2]/60 hover:text-[#050505]'
          }`}
        >
          ORGANIZING TEAM ({ORGANIZERS_DATA.length})
        </button>
      </div>

      {/* Large Portrait Compositions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {currentList.map((person) => (
          <div
            key={person.id}
            className="galaxy-card p-6 space-y-4 flex flex-col justify-between"
          >
            {/* Uiverse.io Inspired Galaxy Card Decorators */}
            <div className="star-field" />
            <div className="shooting-line" />

            {/* Content Container */}
            <div className="relative z-10 space-y-4">
              {/* Large Portrait Image Container with Orbital Ring Decorator */}
              <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-slate-900 border border-[#050505]">
              <img
                src={person.avatar}
                alt={person.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent opacity-80" />

              {/* Orbital Ring Decorator Overlay */}
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full border border-[#FC3D21] opacity-60 pointer-events-none" />

              <div className="absolute bottom-3 left-3 font-mono text-[10px] text-white bg-[#050505]/80 px-2.5 py-0.5 rounded border border-white/20">
                {person.organization}
              </div>
            </div>

            {/* Content Info */}
            <div className="space-y-1">
              <h3 className="font-space font-extrabold text-xl text-[#050505] group-hover:text-[#FC3D21] transition-colors">
                {person.name}
              </h3>
              <p className="font-mono text-xs text-[#0B3D91] font-bold">
                {person.role}
              </p>
            </div>

            <p className="text-xs text-[#050505]/80 leading-relaxed font-sans line-clamp-2">
              {person.bio}
            </p>

            {/* Expertise Pills */}
            <div className="flex flex-wrap gap-1 pt-1">
              {person.expertise.map(exp => (
                <span key={exp} className="font-mono text-[9px] bg-[#F4F4F1] text-[#050505] px-2 py-0.5 rounded font-medium border border-[#C9CDD2]/60">
                  {exp}
                </span>
              ))}
            </div>

            {/* Social Icons */}
            <div className="pt-3 border-t border-[#C9CDD2]/60 flex items-center gap-3 text-[#050505]/60">
              {person.linkedin && (
                <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#FC3D21] transition-colors">
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {person.twitter && (
                <a href={person.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-[#FC3D21] transition-colors">
                  <TwitterIcon className="w-4 h-4" />
                </a>
              )}
              {person.instagram && (
                <a href={person.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#FC3D21] transition-colors">
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
              {person.github && (
                <a href={person.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#FC3D21] transition-colors">
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
            </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
