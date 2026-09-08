import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { EVENT_DATA, FOUR_CONCEPTS } from '../../data/event';

interface AboutPageProps {
  onBackToHome: () => void;
  onRegisterClick: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBackToHome, onRegisterClick }) => {
  return (
    <div className="min-h-screen bg-[#F0F4FA] text-[#0B192C] pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto text-left">
      <button
        onClick={onBackToHome}
        className="inline-flex items-center gap-2 mb-8 font-mono text-xs text-[#1D4ED8] font-bold hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO HOME</span>
      </button>

      <div className="space-y-6">
        <h1 className="font-space font-black text-4xl sm:text-6xl text-[#0B192C] uppercase">
          ABOUT PRAGYAN 2K26
        </h1>
        <p className="text-lg text-slate-700 font-sans leading-relaxed">
          {EVENT_DATA.supportingLine}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {FOUR_CONCEPTS.map((c, idx) => (
            <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-200 space-y-2">
              <span className="font-mono text-xs font-bold text-[#1D4ED8]">{c.subtitle}</span>
              <h3 className="font-space font-black text-2xl text-[#0B192C]">{c.title}</h3>
              <p className="text-xs text-slate-600 font-sans">{c.description}</p>
            </div>
          ))}
        </div>

        <div className="pt-8">
          <button onClick={onRegisterClick} className="btn-primary-blue text-xs uppercase">
            REGISTER NOW
          </button>
        </div>
      </div>
    </div>
  );
};
