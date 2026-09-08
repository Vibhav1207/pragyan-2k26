import React from 'react';
import { UserPlus, Layers, Code, Award } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: "01",
      title: "FORM A TEAM",
      desc: "Assemble your team of 4 members across UG, PG, or PhD disciplines.",
      icon: UserPlus
    },
    {
      step: "02",
      title: "SELECT TRACK",
      desc: "Choose from 4 specialized SDG 2030 tracks in FinTech, Marketing, Operations, or Management.",
      icon: Layers
    },
    {
      step: "03",
      title: "24-HOUR SPRINT",
      desc: "Rapid prototype your solution at Sanjivani University, Kopargaon with live mentor feedback.",
      icon: Code
    },
    {
      step: "04",
      title: "PITCH & WIN",
      desc: "Present live to expert judges to compete for cash prizes, certificates, & incubation.",
      icon: Award
    }
  ];

  return (
    <section className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-white text-[#050505] text-left border-b-3 border-[#050505]">
      <div className="max-w-[1600px] mx-auto w-full space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-3 border-[#050505] pb-6 gap-4">
          <div className="space-y-2">
            <div className="inline-block bg-[#FC3D21] text-white font-mono text-xs font-black uppercase px-3 py-1 border border-[#050505]">
              STEP-BY-STEP PROCESS
            </div>
            <h2 className="font-space font-black text-4xl sm:text-6xl text-[#050505] uppercase tracking-tight">
              HOW IT WORKS
            </h2>
          </div>
          <div className="font-mono text-xs font-black text-[#FC3D21] uppercase tracking-widest">
            4 SIMPLE STEPS TO VICTORY
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#F3F1EC] border-3 border-[#050505] p-6 shadow-brutal space-y-4 hover:bg-[#FFD600] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-xl bg-[#050505] text-white px-3 py-0.5">
                    {item.step}
                  </span>
                  <IconComp className="w-6 h-6 text-[#FC3D21]" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-space font-black text-xl text-[#050505] uppercase">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 font-sans font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
