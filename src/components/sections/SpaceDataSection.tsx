import React from 'react';

export const SdgDataSection: React.FC = () => {
  return (
    <section className="w-full py-20 lg:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#050505] text-white text-left border-b-3 border-white">
      <div className="max-w-[1600px] mx-auto w-full space-y-8">
        
        <div className="flex items-center justify-between border-b-2 border-white/20 pb-4 font-mono text-xs font-black uppercase">
          <span className="text-[#FFD600]">SDG GOAL 2030 FRAMEWORK</span>
          <span>SANJIVANI UNIVERSITY</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-space font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              DESIGNED FOR REAL SYSTEMIC IMPACT
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-sans font-medium leading-relaxed">
              Every track parameter in Pragyan 2K26 is aligned with the 17 United Nations Sustainable Development Goals. Delegates are challenged to combine data, technology, and business modeling to create deployable solutions.
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#111111] border-2 border-white p-6 shadow-brutal-yellow space-y-3">
            <div className="font-mono text-xs font-black text-[#FFD600] uppercase">
              SUSTAINABLE DEVELOPMENT GOALS
            </div>
            <div className="font-space font-black text-xl text-white uppercase">
              GLOBAL STANDARDS FOR 2030
            </div>
            <p className="text-xs font-mono text-slate-300">
              Focusing on SDG 8 (Decent Work), SDG 9 (Industry & Innovation), SDG 11 (Sustainable Cities), SDG 12 (Responsible Consumption), & SDG 13 (Climate Action).
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export const SpaceDataSection = SdgDataSection;
