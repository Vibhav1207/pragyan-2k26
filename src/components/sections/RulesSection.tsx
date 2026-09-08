import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { RULES_AND_GUIDELINES } from '../../data/rules';

export const RulesSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>(RULES_AND_GUIDELINES[0].id);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <section id="rules" className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-white text-[#050505] text-left border-b-3 border-[#050505]">
      <div className="max-w-[1600px] mx-auto w-full space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-3 border-[#050505] pb-6 gap-4">
          <div className="space-y-2">
            <div className="inline-block bg-[#FC3D21] text-white font-mono text-xs font-black uppercase px-3 py-1 border border-[#050505]">
              OFFICIAL CODE & REGULATIONS
            </div>
            <h2 className="font-space font-black text-4xl sm:text-6xl text-[#050505] uppercase tracking-tight">
              RULES & GUIDELINES
            </h2>
          </div>
          <div className="font-mono text-xs font-black text-[#FC3D21] uppercase tracking-widest">
            SANJIVANI UNIVERSITY ACADEMIC INTEGRITY
          </div>
        </div>

        {/* Accordions Container */}
        <div className="space-y-4 max-w-5xl mx-auto w-full">
          {RULES_AND_GUIDELINES.map((cat) => {
            const isOpen = openId === cat.id;

            return (
              <div
                key={cat.id}
                className="bg-[#F3F1EC] border-3 border-[#050505] shadow-brutal transition-all"
              >
                <button
                  onClick={() => toggleAccordion(cat.id)}
                  className="w-full p-6 flex items-center justify-between text-left focus:outline-none bg-white hover:bg-[#FFD600] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-black bg-[#FC3D21] text-white px-2.5 py-1 border border-[#050505] uppercase">
                      {cat.badge}
                    </span>
                    <h3 className="font-space font-black text-xl sm:text-2xl text-[#050505] uppercase">
                      {cat.title}
                    </h3>
                  </div>

                  <ChevronDown
                    className={`w-6 h-6 text-[#050505] transform transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#FC3D21]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-6 sm:p-8 space-y-3 bg-[#F3F1EC] border-t-2 border-[#050505]">
                    {cat.rules.map((rule, rIdx) => (
                      <div
                        key={rIdx}
                        className="p-4 bg-white border-2 border-[#050505] flex items-start gap-3 text-sm font-sans font-medium text-slate-800"
                      >
                        <Check className="w-5 h-5 text-[#FC3D21] shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
