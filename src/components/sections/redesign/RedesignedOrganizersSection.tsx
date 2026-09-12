import React from 'react';
import { Building2, ShieldCheck } from 'lucide-react';
import { ScrollReveal } from '../../transitions/ScrollReveal';

export const RedesignedOrganizersSection: React.FC = () => {
  return (
    <section id="organizers" className="w-full py-20 lg:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#F9F4EA] text-[#050C0C] text-left border-b border-[#D2CAB6]">
      <div className="max-w-[1500px] mx-auto w-full space-y-12">
        
        {/* Header */}
        <ScrollReveal delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D2CAB6] pb-6 gap-4">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-[#A77A1C] uppercase tracking-widest bg-[#E9E1D2] px-3.5 py-1.5 rounded-full border border-[#A77A1C]/30">
                INSTITUTIONAL LEADERSHIP & HOSTS
              </span>
              <h2 className="font-serif font-black text-3xl sm:text-5xl text-[#162E28] uppercase tracking-tight">
                EVENT <span className="italic font-normal text-[#A77A1C]">ORGANIZERS</span>
              </h2>
            </div>
            <div className="font-mono text-xs font-bold text-[#A77A1C] uppercase tracking-widest">
              OFFICIAL HOSTING & INNOVATION BODIES
            </div>
          </div>
        </ScrollReveal>

        {/* Hierarchy Layout */}
        <div className="space-y-8">
          
          {/* Primary Host Banner: SANJIVANI UNIVERSITY */}
          <ScrollReveal delay={150} duration={650}>
            <div className="p-8 sm:p-12 rounded-3xl bg-[#162E28] text-[#F9F4EA] border-2 border-[#A77A1C] relative overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2B3E35] border border-[#A77A1C]/40 text-[#E5BE61] text-xs font-mono font-bold uppercase">
                    <Building2 className="w-4 h-4 text-[#E5BE61]" />
                    <span>HOST INSTITUTION</span>
                  </div>
                  <h3 className="font-serif font-black text-3xl sm:text-5xl text-[#F9F4EA] uppercase tracking-tight leading-tight">
                    SANJIVANI UNIVERSITY
                  </h3>
                  <p className="text-[#F3EDE0]/90 font-sans text-sm sm:text-base max-w-3xl leading-relaxed">
                    Host of PRAGYAN 2K26 — Premier National Level Hackathon driving innovation, entrepreneurship, and sustainable growth aligned with SDG Goal 2030.
                  </p>
                </div>

                <div className="lg:col-span-4 flex items-center justify-start lg:justify-end">
                  <div className="p-6 rounded-2xl bg-[#2B3E35] border border-[#A77A1C]/40 text-left w-full space-y-2">
                    <div className="flex items-center gap-2 text-[#E5BE61] font-mono text-xs font-bold uppercase">
                      <ShieldCheck className="w-4 h-4" />
                      <span>NATIONAL LEVEL EVENT</span>
                    </div>
                    <div className="font-serif font-extrabold text-xl text-[#F9F4EA]">
                      PRAGYAN 2K26
                    </div>
                    <p className="text-xs text-[#F3EDE0]/80">
                      Commerce & Management Innovation Sprint
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </ScrollReveal>

          {/* Institutional Co-Organizers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. PRAGYAN 2K26 */}
            <ScrollReveal delay={250} duration={600}>
              <div className="p-8 rounded-2xl bg-[#F3EDE0] border border-[#D2CAB6] text-[#162E28] space-y-4 hover:border-[#A77A1C] transition-all duration-300 flex flex-col justify-between h-full shadow-sm">
                <div className="space-y-4">
                  <div className="p-2 bg-[#F9F4EA] rounded-xl border border-[#D2CAB6] shadow-sm inline-block">
                    <img
                      src="/pragyan-logo.png"
                      alt="PRAGYAN 2K26 Logo"
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-bold text-[#A77A1C] uppercase tracking-wider">
                      FLAGSHIP HACKATHON
                    </span>
                    <h4 className="font-serif font-extrabold text-xl text-[#162E28] uppercase">
                      PRAGYAN 2K26
                    </h4>
                  </div>
                  <p className="text-xs text-[#7B8379] font-sans leading-relaxed">
                    National Level Hackathon platform bringing together India's brightest commerce and management minds for a 24-hour innovation sprint.
                  </p>
                </div>
                <div className="w-6 h-0.5 bg-[#A77A1C]/40 rounded-full mt-4" />
              </div>
            </ScrollReveal>

            {/* 2. INSTITUTION'S INNOVATION COUNCIL */}
            <ScrollReveal delay={350} duration={600}>
              <div className="p-8 rounded-2xl bg-[#F3EDE0] border border-[#D2CAB6] text-[#162E28] space-y-4 hover:border-[#A77A1C] transition-all duration-300 flex flex-col justify-between h-full shadow-sm">
                <div className="space-y-4">
                  <div className="p-2 bg-[#F9F4EA] rounded-xl border border-[#D2CAB6] shadow-sm inline-block">
                    <img
                      src="/iic-logo.png"
                      alt="Institution's Innovation Council Logo"
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-bold text-[#A77A1C] uppercase tracking-wider">
                      INNOVATION ECOSYSTEM
                    </span>
                    <h4 className="font-serif font-extrabold text-xl text-[#162E28] uppercase">
                      INSTITUTION'S INNOVATION COUNCIL
                    </h4>
                  </div>
                  <p className="text-xs text-[#7B8379] font-sans leading-relaxed">
                    Fostering systematic innovation culture, startup mentorship, and research ideation across <a href="https://sanjivani.edu.in" target="_blank" rel="noopener noreferrer" className="text-[#A77A1C] hover:underline font-semibold">Sanjivani University</a>.
                  </p>
                </div>
                <div className="w-6 h-0.5 bg-[#A77A1C]/40 rounded-full mt-4" />
              </div>
            </ScrollReveal>

            {/* 3. EDC */}
            <ScrollReveal delay={450} duration={600}>
              <div className="p-8 rounded-2xl bg-[#F3EDE0] border border-[#D2CAB6] text-[#162E28] space-y-4 hover:border-[#A77A1C] transition-all duration-300 flex flex-col justify-between h-full shadow-sm">
                <div className="space-y-4">
                  <div className="p-2 bg-[#F9F4EA] rounded-xl border border-[#D2CAB6] shadow-sm inline-block">
                    <img
                      src="/edc-logo.png"
                      alt="Entrepreneurship Development Cell Logo"
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-bold text-[#A77A1C] uppercase tracking-wider">
                      STARTUP INCUBATION
                    </span>
                    <h4 className="font-serif font-extrabold text-xl text-[#162E28] uppercase">
                      ENTREPRENEURSHIP DEVELOPMENT CELL
                    </h4>
                  </div>
                  <p className="text-xs text-[#7B8379] font-sans leading-relaxed">
                    Empowering student founders, providing business model refinement, seed funding connections, and venture incubation.
                  </p>
                </div>
                <div className="w-6 h-0.5 bg-[#A77A1C]/40 rounded-full mt-4" />
              </div>
            </ScrollReveal>

          </div>

        </div>

      </div>
    </section>
  );
};
