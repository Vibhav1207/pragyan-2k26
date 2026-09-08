import React, { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { FAQ_ITEMS, type FAQItem } from '../../data/faq';
import { PragyanButton } from '../ui/PragyanButton';

interface FAQPageProps {
  onBackToHome: () => void;
  onRegisterClick: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onBackToHome, onRegisterClick }) => {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);

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

        <span className="text-[#FC3D21] uppercase">DELEGATE SUPPORT</span>
      </div>

      {/* Main Title */}
      <div className="space-y-4 mb-12">
        <div className="inline-block bg-[#FC3D21] text-white px-3.5 py-1 border border-[#050505] font-mono text-xs font-black uppercase">
          PRAGYAN 2K26 FAQ
        </div>
        <h1 className="font-space font-black text-5xl sm:text-7xl text-[#050505] uppercase tracking-tight leading-none">
          FREQUENTLY ASKED <span className="text-[#FC3D21]">QUESTIONS</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-800 max-w-4xl font-sans font-medium leading-relaxed">
          Clear answers regarding eligibility, team size, registration fees, hackathon tracks, timeline, and final round logistics for Sanjivani University's national hackathon.
        </p>
      </div>

      {/* Accordions */}
      <div className="space-y-4 max-w-4xl mx-auto w-full mb-16">
        {FAQ_ITEMS.map((item: FAQItem, idx: number) => {
          const isOpen = openId === item.id;

          return (
            <div key={item.id} className="bg-white border-3 border-[#050505] shadow-brutal">
              <button
                onClick={() => setOpenId(isOpen ? '' : item.id)}
                className="w-full p-6 text-left flex items-center justify-between focus:outline-none hover:bg-[#FFD600] transition-colors"
              >
                <div className="flex items-center gap-3 pr-4">
                  <span className="font-mono text-xs font-black bg-[#FC3D21] text-white w-7 h-7 flex items-center justify-center border border-[#050505] shrink-0">
                    {idx + 1}
                  </span>
                  <h3 className="font-space font-black text-lg sm:text-xl text-[#050505] uppercase">
                    {item.question}
                  </h3>
                </div>

                <ChevronDown
                  className={`w-6 h-6 text-[#050505] shrink-0 transform transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#FC3D21]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="p-6 bg-[#F3F1EC] border-t-2 border-[#050505] font-sans text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
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
          REGISTER YOUR TEAM NOW
        </PragyanButton>
      </div>
    </div>
  );
};
