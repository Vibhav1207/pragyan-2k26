import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../../data/faq';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <section id="faq" className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#F3F1EC] text-[#050505] text-left border-b-3 border-[#050505]">
      <div className="max-w-[1600px] mx-auto w-full space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-3 border-[#050505] pb-6 gap-4">
          <div className="space-y-2">
            <div className="inline-block bg-[#FFD600] text-[#050505] font-mono text-xs font-black uppercase px-3 py-1 border border-[#050505]">
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="font-space font-black text-4xl sm:text-6xl text-[#050505] uppercase tracking-tight">
              DELEGATE FAQ
            </h2>
          </div>
          <div className="font-mono text-xs font-black text-[#FC3D21] uppercase tracking-widest">
            PRAGYAN 2K26 SUPPORT
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-4 max-w-4xl mx-auto w-full">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white border-3 border-[#050505] shadow-brutal transition-all"
              >
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full p-6 flex items-center justify-between text-left focus:outline-none hover:bg-[#FFD600] transition-colors"
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

      </div>
    </section>
  );
};
