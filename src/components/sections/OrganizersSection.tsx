import React from 'react';
import { Building2, ShieldCheck } from 'lucide-react';

export const OrganizersSection: React.FC = () => {
  return (
    <section id="organizers" className="w-full py-20 lg:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 bg-white text-[#0B192C] text-left border-b border-slate-200">
      <div className="max-w-[1500px] mx-auto w-full space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-6 gap-4">
          <div className="space-y-2">
            <div className="inline-block bg-[#1D4ED8] text-white font-mono text-xs font-bold uppercase px-3 py-1 rounded-md">
              INSTITUTIONAL LEADERSHIP & HOSTS
            </div>
            <h2 className="font-space font-extrabold text-3xl sm:text-5xl text-[#0B192C] uppercase tracking-tight">
              EVENT ORGANIZERS
            </h2>
          </div>
          <div className="font-mono text-xs font-bold text-[#1D4ED8] uppercase tracking-widest">
            OFFICIAL HOSTING & INNOVATION BODIES
          </div>
        </div>

        {/* Hierarchy Layout */}
        <div className="space-y-8">
          
          {/* Primary Host Banner: SANJIVANI UNIVERSITY */}
          <div className="card-navy p-8 sm:p-12 rounded-3xl border border-white/10 text-white relative overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D4ED8]/40 border border-[#1D4ED8] text-blue-200 text-xs font-mono font-bold uppercase">
                  <Building2 className="w-4 h-4 text-[#FACC15]" />
                  <span>HOST INSTITUTION</span>
                </div>
                <h3 className="font-space font-black text-3xl sm:text-5xl text-white uppercase tracking-tight leading-tight">
                  SANJIVANI UNIVERSITY
                </h3>
                <p className="text-slate-300 font-sans text-sm sm:text-base max-w-3xl leading-relaxed">
                  Host of PRAGYAN 2K26 — Premier National Level Hackathon driving innovation, entrepreneurship, and sustainable growth aligned with SDG Goal 2030.
                </p>
              </div>

              <div className="lg:col-span-4 flex items-center justify-start lg:justify-end">
                <div className="p-6 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md text-left w-full space-y-2">
                  <div className="flex items-center gap-2 text-[#FACC15] font-mono text-xs font-bold uppercase">
                    <ShieldCheck className="w-4 h-4" />
                    <span>NATIONAL LEVEL EVENT</span>
                  </div>
                  <div className="font-space font-extrabold text-xl text-white">
                    PRAGYAN 2K26
                  </div>
                  <p className="text-xs text-slate-300">
                    Commerce & Management Innovation Sprint
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Institutional Co-Organizers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. PRAGYAN 2K26 */}
            <div className="card-premium p-8 rounded-2xl border border-slate-200 text-[#0B192C] space-y-4 hover:border-[#1D4ED8] transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-sm inline-block">
                  <img
                    src="/pragyan-logo.png"
                    alt="PRAGYAN 2K26 Logo"
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold text-[#1D4ED8] uppercase tracking-wider">
                    FLAGSHIP HACKATHON
                  </span>
                  <h4 className="font-space font-extrabold text-xl text-[#0B192C] uppercase">
                    PRAGYAN 2K26
                  </h4>
                </div>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  National Level Hackathon platform bringing together India's brightest commerce and management minds for a 24-hour innovation sprint.
                </p>
              </div>
            </div>

            {/* 2. INSTITUTION'S INNOVATION COUNCIL */}
            <div className="card-premium p-8 rounded-2xl border border-slate-200 text-[#0B192C] space-y-4 hover:border-[#1D4ED8] transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-sm inline-block">
                  <img
                    src="/iic-logo.png"
                    alt="Institution's Innovation Council Logo"
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold text-[#1D4ED8] uppercase tracking-wider">
                    INNOVATION ECOSYSTEM
                  </span>
                  <h4 className="font-space font-extrabold text-xl text-[#0B192C] uppercase">
                    INSTITUTION'S INNOVATION COUNCIL
                  </h4>
                </div>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  Fostering systematic innovation culture, startup mentorship, and research ideation across Sanjivani University.
                </p>
              </div>
            </div>

            {/* 3. ENTREPRENEURSHIP DEVELOPMENT CELL */}
            <div className="card-premium p-8 rounded-2xl border border-slate-200 text-[#0B192C] space-y-4 hover:border-[#1D4ED8] transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-sm inline-block">
                  <img
                    src="/edc-logo.png"
                    alt="Entrepreneurship Development Cell Logo"
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold text-[#1D4ED8] uppercase tracking-wider">
                    STARTUP INCUBATION
                  </span>
                  <h4 className="font-space font-extrabold text-xl text-[#0B192C] uppercase">
                    ENTREPRENEURSHIP DEVELOPMENT CELL
                  </h4>
                </div>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  Empowering student founders, providing business model refinement, seed funding connections, and venture incubation.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
