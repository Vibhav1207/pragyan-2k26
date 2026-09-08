import React from 'react';
import { ArrowLeft, UserCheck, Award } from 'lucide-react';
import { MENTORS_DATA, type ProfilePerson } from '../../data/mentors';
import { ORGANIZERS_DATA } from '../../data/organizers';
import { PragyanButton } from '../ui/PragyanButton';

interface PeoplePageProps {
  onBackToHome: () => void;
  onRegisterClick: () => void;
}

export const PeoplePage: React.FC<PeoplePageProps> = ({ onBackToHome, onRegisterClick }) => {
  return (
    <div className="min-h-screen bg-[#F3F1EC] text-[#050505] pt-28 pb-20 px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto text-left">
      
      {/* Header Breadcrumb */}
      <div className="flex items-center justify-between border-b-3 border-[#050505] pb-4 mb-10 font-mono text-xs font-black">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-[#050505] hover:text-[#FC3D21] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← BACK TO HOMEPAGE</span>
        </button>

        <span className="text-[#FC3D21] uppercase">PEOPLE & LEADERSHIP</span>
      </div>

      {/* Main Title */}
      <div className="space-y-4 mb-12">
        <div className="inline-block bg-[#FC3D21] text-white px-3.5 py-1 border border-[#050505] font-mono text-xs font-black uppercase">
          SANJIVANI UNIVERSITY SECRETARIAT
        </div>
        <h1 className="font-space font-black text-5xl sm:text-7xl text-[#050505] uppercase tracking-tight leading-none">
          ORGANIZERS & <span className="text-[#FC3D21]">MENTORS</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-800 max-w-4xl font-sans font-medium leading-relaxed">
          Faculty leaders, industry advisors, and student coordinators supporting Pragyan 2K26 delegates throughout the 24-hour innovation sprint.
        </p>
      </div>

      {/* Organizers */}
      <div className="space-y-6 mb-16">
        <div className="flex items-center justify-between border-b-3 border-[#050505] pb-3">
          <h2 className="font-space font-black text-2xl uppercase text-[#050505] flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#FC3D21]" />
            <span>ORGANIZING COMMITTEE</span>
          </h2>
          <span className="font-mono text-xs font-black text-[#FC3D21]">SANJIVANI UNIVERSITY</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ORGANIZERS_DATA.map((o: ProfilePerson) => (
            <div key={o.id} className="neo-card p-6 border-3 border-[#050505] shadow-brutal space-y-3">
              <div className="font-mono text-xs font-black text-[#FC3D21] uppercase">
                {o.role}
              </div>
              <h3 className="font-space font-black text-xl text-[#050505] uppercase">
                {o.name}
              </h3>
              <p className="text-xs font-mono font-bold text-slate-700">
                {o.organization}
              </p>
              <p className="text-xs text-slate-600 font-sans font-medium leading-relaxed">
                {o.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mentors */}
      <div className="space-y-6 mb-16">
        <div className="flex items-center justify-between border-b-3 border-[#050505] pb-3">
          <h2 className="font-space font-black text-2xl uppercase text-[#050505] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#FC3D21]" />
            <span>FACULTY & INDUSTRY MENTORS</span>
          </h2>
          <span className="font-mono text-xs font-black text-[#050505]">DOMAIN ADVISORS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MENTORS_DATA.map((m: ProfilePerson) => (
            <div key={m.id} className="neo-card p-6 border-3 border-[#050505] shadow-brutal space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black text-[#FC3D21] uppercase">
                  {m.role}
                </span>
                <span className="font-mono text-[10px] font-black bg-[#FFD600] px-2 py-0.5 border border-[#050505]">
                  MENTOR
                </span>
              </div>
              <h3 className="font-space font-black text-xl text-[#050505] uppercase">
                {m.name}
              </h3>
              <p className="text-xs font-mono font-bold text-slate-700">
                {m.organization}
              </p>
              <p className="text-xs text-slate-600 font-sans font-medium leading-relaxed">
                {m.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Nav */}
      <div className="pt-8 border-t-3 border-[#050505] flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBackToHome}
          className="font-mono text-xs font-black text-[#050505] hover:text-[#FC3D21] uppercase"
        >
          ← RETURN TO HOMEPAGE
        </button>

        <PragyanButton onClick={onRegisterClick} variant="red">
          REGISTER FOR PRAGYAN 2K26
        </PragyanButton>
      </div>
    </div>
  );
};
