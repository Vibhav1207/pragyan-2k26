import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { FLYER_TIMELINE } from '../../data/schedule';

interface SchedulePageProps {
  onBackToHome: () => void;
  onRegisterClick: () => void;
}

export const SchedulePage: React.FC<SchedulePageProps> = ({ onBackToHome, onRegisterClick }) => {
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
          EVENT TIMELINE
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {FLYER_TIMELINE.map((phaseData, idx) => (
            <div key={idx} className="p-8 bg-white rounded-2xl border border-slate-200 space-y-4">
              <span className="font-mono text-xs font-bold text-[#1D4ED8]">{phaseData.badge}</span>
              <h3 className="font-space font-black text-2xl text-[#0B192C]">{phaseData.title}</h3>
              {phaseData.events.map((evt, eIdx) => (
                <div key={eIdx} className="p-4 bg-[#F0F4FA] rounded-xl space-y-1">
                  <div className="flex justify-between font-mono text-xs font-bold text-[#0B192C]">
                    <span>{evt.name}</span>
                    <span className="text-[#1D4ED8]">{evt.dates}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-sans">{evt.description}</p>
                </div>
              ))}
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
