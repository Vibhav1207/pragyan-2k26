import React from 'react';
import { Award, FileCheck, Briefcase, Rocket, Compass, MapPin } from 'lucide-react';
import { ScrollReveal } from '../transitions/ScrollReveal';

interface PrizesSectionProps {
  onRegisterClick?: () => void;
}

export const WhyParticipate: React.FC<PrizesSectionProps> = ({ onRegisterClick }) => {
  const prizes = [
    {
      icon: Award,
      badge: 'GRAND REWARD',
      title: 'EXCITING CASH PRIZES',
      desc: 'Attractive cash rewards awarded to top performing teams across innovation tracks at the national grand finale.',
    },
    {
      icon: FileCheck,
      badge: 'OFFICIAL CREDENTIALS',
      title: 'CERTIFICATES',
      desc: 'National certificates of merit, achievement, and participation issued by Sanjivani University.',
    },
    {
      icon: Briefcase,
      badge: 'CAREER ADVANCEMENT',
      title: 'INTERNSHIP OPPORTUNITIES',
      desc: 'Direct internship pathways, industry networking, and corporate talent connections for standout innovators.',
    },
    {
      icon: Rocket,
      badge: 'VENTURE ECOSYSTEM',
      title: 'INCUBATION SUPPORT',
      desc: "Mentorship, startup guidance, and incubation ecosystem access via Sanjivani University's Innovation Center & ED Cell.",
    },
  ];

  return (
    <section id="prizes" className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#F0F4FA] text-[#0B192C] text-left border-b border-slate-200">
      <div className="max-w-[1500px] mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <ScrollReveal delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-6 gap-4">
            <div className="space-y-2">
              <div className="inline-block bg-[#1D4ED8] text-white font-mono text-xs font-bold uppercase px-3 py-1 rounded-md">
                REWARDS & RECOGNITION
              </div>
              <h2 className="font-space font-extrabold text-3xl sm:text-5xl text-[#0B192C] uppercase tracking-tight">
                PRIZES & OPPORTUNITIES
              </h2>
            </div>
            <div className="font-mono text-xs font-bold text-[#1D4ED8] uppercase tracking-widest">
              SANJIVANI UNIVERSITY NATIONAL HACKATHON
            </div>
          </div>
        </ScrollReveal>

        {/* 4 Main Prize Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {prizes.map((p, idx) => {
            const IconComp = p.icon;
            return (
              <ScrollReveal key={idx} delay={120 + idx * 100} duration={600}>
                <div className="card-premium p-8 rounded-3xl border border-slate-200 bg-white text-[#0B192C] space-y-5 group hover:border-[#1D4ED8] hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between">
                  <div className="space-y-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#1D4ED8]/10 text-[#1D4ED8] flex items-center justify-center font-bold group-hover:bg-[#1D4ED8] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                      <IconComp className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" />
                    </div>
                    <div className="space-y-2">
                      <span className="text-[11px] font-mono font-bold text-[#1D4ED8] uppercase tracking-wider">
                        {p.badge}
                      </span>
                      <h3 className="font-space font-extrabold text-xl text-[#0B192C] uppercase leading-snug group-hover:text-[#1D4ED8] transition-colors">
                        {p.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* SHIRDI TOURISM COMPLEMENTARY BANNER */}
        <ScrollReveal delay={550} duration={700}>
          <div className="card-navy p-8 sm:p-12 rounded-3xl border border-white/10 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#1D4ED8]/30 rounded-full filter blur-3xl pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FACC15]/20 border border-[#FACC15]/40 text-[#FACC15] text-xs font-mono font-bold uppercase">
                  <Compass className="w-3.5 h-3.5" />
                  <span>SPECIAL INCLUSION FOR PARTICIPANTS</span>
                </div>

                <h3 className="font-space font-black text-2xl sm:text-4xl text-white uppercase tracking-tight leading-tight">
                  SHIRDI TOURISM COMPLEMENTARY
                </h3>

                <div className="font-mono text-xs sm:text-sm font-bold text-[#FACC15] uppercase tracking-wider">
                  EXPLORE • EXPERIENCE • BE INSPIRED
                </div>

                <p className="text-slate-300 text-sm max-w-2xl font-sans leading-relaxed">
                  EXPLORE SHIRDI WITH YOUR JOURNEY — Top teams visiting <a href="https://sanjivani.edu.in" target="_blank" rel="noopener noreferrer" className="text-[#FACC15] hover:underline font-semibold">Sanjivani University, Kopargaon</a> will get a complimentary opportunity to visit and explore the holy city of Shirdi.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-4">
                <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-left w-full space-y-2">
                  <div className="flex items-center gap-2 text-[#FACC15]">
                    <MapPin className="w-5 h-5" />
                    <span className="font-space font-extrabold text-sm uppercase">KOPARGAON & SHIRDI</span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans">
                    <a href="https://sanjivani.edu.in" target="_blank" rel="noopener noreferrer" className="text-[#FACC15] hover:underline font-semibold">Sanjivani University</a> campus is situated near Shirdi, Maharashtra.
                  </p>
                </div>

                {onRegisterClick && (
                  <button
                    onClick={onRegisterClick}
                    className="btn-secondary-gold w-full sm:w-auto text-xs uppercase"
                  >
                    <span>REGISTER FOR PRAGYAN 2K26</span>
                  </button>
                )}
              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
