import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../../../data/faq';
import { ScrollReveal } from '../../transitions/ScrollReveal';

export const RedesignedFAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <section id="faq" className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#F9F4EA] text-[#050C0C] text-left border-b border-[#D2CAB6]">
      <div className="max-w-[1500px] mx-auto w-full space-y-12">
        
        {/* Header */}
        <ScrollReveal delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D2CAB6] pb-6 gap-4">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-[#A77A1C] uppercase tracking-widest bg-[#E9E1D2] px-3.5 py-1.5 rounded-full border border-[#A77A1C]/30 inline-flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-[#A77A1C]" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </span>
              <h2 className="font-serif font-black text-4xl sm:text-6xl text-[#162E28] uppercase tracking-tight">
                DELEGATE <span className="italic font-normal text-[#A77A1C]">FAQ</span>
              </h2>
            </div>
            <div className="font-mono text-xs font-bold text-[#A77A1C] uppercase tracking-widest">
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
                <div className="bg-[#F3EDE0] border border-[#D2CAB6] rounded-2xl transition-all duration-300 overflow-hidden shadow-sm hover:border-[#A77A1C]">
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full p-6 flex items-center justify-between text-left focus:outline-none hover:bg-[#E9E1D2] transition-colors duration-200"
                  >
                    <div className="flex items-center gap-4 pr-4">
                      <span className="font-mono text-xs font-black bg-[#162E28] text-[#E5BE61] w-8 h-8 flex items-center justify-center rounded-lg border border-[#A77A1C]/40 shrink-0">
                        0{idx + 1}
                      </span>
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-[#162E28] uppercase">
                        {item.question}
                      </h3>
                    </div>

                    <ChevronDown
                      className={`w-6 h-6 text-[#A77A1C] shrink-0 transform transition-transform duration-300 ease-out ${
                        isOpen ? 'rotate-180 text-[#162E28]' : ''
                      }`}
                    />
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-6 bg-[#F9F4EA] border-t border-[#D2CAB6] font-sans text-sm sm:text-base font-normal text-[#7B8379] leading-relaxed">
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
