import React from 'react';
import { ArrowLeft, FileCheck, Briefcase, Rocket } from 'lucide-react';

interface ResourcesPageProps {
  onBackToHome: () => void;
  onRegisterClick: () => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onBackToHome, onRegisterClick }) => {
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
          PRIZES & BENEFITS
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-8 bg-white rounded-2xl border border-slate-200 space-y-3">
            <FileCheck className="w-6 h-6 text-[#1D4ED8]" />
            <h3 className="font-space font-black text-xl text-[#0B192C]">CERTIFICATES</h3>
            <p className="text-xs text-slate-600">Official national certificates issued by Sanjivani University.</p>
          </div>
          <div className="p-8 bg-white rounded-2xl border border-slate-200 space-y-3">
            <Briefcase className="w-6 h-6 text-[#1D4ED8]" />
            <h3 className="font-space font-black text-xl text-[#0B192C]">INTERNSHIP OPPORTUNITIES</h3>
            <p className="text-xs text-slate-600">Direct internship offers and fast-track interviews with partners.</p>
          </div>
          <div className="p-8 bg-white rounded-2xl border border-slate-200 space-y-3">
            <Rocket className="w-6 h-6 text-[#1D4ED8]" />
            <h3 className="font-space font-black text-xl text-[#0B192C]">INCUBATION SUPPORT</h3>
            <p className="text-xs text-slate-600">Startup incubation and mentorship via ED Cell.</p>
          </div>
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
