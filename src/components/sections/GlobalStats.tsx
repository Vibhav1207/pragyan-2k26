import React from 'react';

export const GlobalStats: React.FC = () => {
  const stats = [
    { label: "SPRINT DURATION", count: "24", suffix: " HOURS", desc: "Non-stop innovation sprint" },
    { label: "TEAM CAPACITY", count: "4", suffix: " MEMBERS", desc: "Per registered delegate team" },
    { label: "SPECIALIZED TRACKS", count: "4", suffix: " TRACKS", desc: "FinTech, Marketing, Operations & Mgmt" },
    { label: "ELIGIBLE LEVELS", count: "3", suffix: " DOMAINS", desc: "UG, PG, and PhD students" }
  ];

  return (
    <section className="w-full py-16 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#050505] text-white text-left border-b-3 border-white">
      <div className="max-w-[1600px] mx-auto w-full space-y-8">
        
        <div className="flex items-center justify-between border-b-2 border-white/20 pb-4 font-mono text-xs font-black uppercase">
          <span className="text-[#FFD600]">PRAGYAN 2K26 AT A GLANCE</span>
          <span>SANJIVANI UNIVERSITY</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-white/5 border-2 border-white space-y-2 shadow-brutal-yellow"
            >
              <div className="font-space font-black text-4xl sm:text-5xl text-[#FFD600] uppercase">
                {item.count}{item.suffix}
              </div>
              <div className="font-mono text-xs font-black text-white uppercase">
                {item.label}
              </div>
              <div className="text-[11px] font-sans text-slate-300">
                {item.desc}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
