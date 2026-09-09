import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../../data/faq';
import { ScrollReveal } from '../transitions/ScrollReveal';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <section id="faq" className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#F3F1EC] text-[#050505] text-left border-b-3 border-[#050505]">
      <div className="max-w-[1600px] mx-auto w-full space-y-12">
        
        {/* Header */}
        <ScrollReveal delay={0}>
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
        </ScrollReveal>

        {/* Accordions */}
        <div className="space-y-4 max-w-4xl mx-auto w-full">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openId === item.id;

            return (
              <ScrollReveal key={item.id} delay={100 + idx * 80} duration={500}>
                <div
                  className="bg-white border-3 border-[#050505] shadow-brutal transition-all duration-300 overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full p-6 flex items-center justify-between text-left focus:outline-none hover:bg-[#FFD600] transition-colors duration-200"
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
                      className={`w-6 h-6 text-[#050505] shrink-0 transform transition-transform duration-300 ease-out ${
                        isOpen ? 'rotate-180 text-[#FC3D21]' : ''
                      }`}
                    />
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-6 bg-[#F3F1EC] border-t-2 border-[#050505] font-sans text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
