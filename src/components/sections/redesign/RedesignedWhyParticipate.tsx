import React from 'react';
import { Award, FileCheck, Briefcase, Rocket, Compass, MapPin } from 'lucide-react';
import { ScrollReveal } from '../../transitions/ScrollReveal';

interface PrizesSectionProps {
  onRegisterClick?: () => void;
}

export const RedesignedWhyParticipate: React.FC<PrizesSectionProps> = ({ onRegisterClick }) => {
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
    <section id="prizes" className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#F3EDE0] text-[#050C0C] text-left border-b border-[#D2CAB6]">
      <div className="max-w-[1500px] mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <ScrollReveal delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D2CAB6] pb-6 gap-4">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-[#A77A1C] uppercase tracking-widest bg-[#E9E1D2] px-3.5 py-1.5 rounded-full border border-[#A77A1C]/30">
                REWARDS & RECOGNITION
              </span>
              <h2 className="font-serif font-black text-3xl sm:text-5xl text-[#162E28] uppercase tracking-tight">
                PRIZES & <span className="italic font-normal text-[#A77A1C]">OPPORTUNITIES</span>
              </h2>
            </div>
            <div className="font-mono text-xs font-bold text-[#A77A1C] uppercase tracking-widest">
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
                <div className="p-8 rounded-3xl border border-[#D2CAB6] bg-[#F9F4EA] text-[#162E28] space-y-5 group hover:border-[#A77A1C] hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between">
                  <div className="space-y-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#E9E1D2] border border-[#A77A1C]/30 text-[#A77A1C] flex items-center justify-center font-bold group-hover:bg-[#162E28] group-hover:text-[#E5BE61] transition-all duration-300 group-hover:scale-105">
                      <IconComp className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" />
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-mono font-bold text-[#A77A1C] uppercase tracking-wider">
                        {p.badge}
                      </span>
                      <h3 className="font-serif font-black text-xl text-[#162E28] uppercase leading-snug group-hover:text-[#A77A1C] transition-colors">
                        {p.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[#7B8379] font-sans leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                  <div className="w-8 h-0.5 bg-[#A77A1C]/40 rounded-full mt-4 group-hover:w-12 group-hover:bg-[#A77A1C] transition-all" />
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* SHIRDI TOURISM COMPLEMENTARY BANNER */}
        <ScrollReveal delay={550} duration={700}>
          <div className="p-8 sm:p-12 rounded-3xl bg-[#162E28] text-[#F9F4EA] border-2 border-[#A77A1C] relative overflow-hidden shadow-2xl">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A77A1C]/40 border border-[#E5BE61]/50 text-[#E5BE61] text-xs font-mono font-extrabold uppercase">
                  <Compass className="w-4 h-4 text-[#E5BE61]" />
                  <span>SPECIAL INCLUSION FOR PARTICIPANTS</span>
                </div>

                <h3 className="font-serif font-black text-2xl sm:text-4xl text-[#F9F4EA] uppercase tracking-tight leading-tight">
                  SHIRDI TOURISM <span className="italic font-normal text-[#E5BE61]">COMPLEMENTARY</span>
                </h3>

                <div className="font-mono text-xs sm:text-sm font-bold text-[#E5BE61] uppercase tracking-wider">
                  EXPLORE • EXPERIENCE • BE INSPIRED
                </div>

                <p className="text-[#F3EDE0]/90 text-sm max-w-2xl font-sans leading-relaxed">
                  EXPLORE SHIRDI WITH YOUR JOURNEY — Top teams visiting <a href="https://sanjivani.edu.in" target="_blank" rel="noopener noreferrer" className="text-[#E5BE61] hover:underline font-semibold">Sanjivani University, Kopargaon</a> will get a complimentary opportunity to visit and explore the holy city of Shirdi.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-4">
                <div className="p-5 rounded-2xl bg-[#2B3E35] border border-[#A77A1C]/40 text-left w-full space-y-2">
                  <div className="flex items-center gap-2 text-[#E5BE61]">
                    <MapPin className="w-5 h-5" />
                    <span className="font-serif font-extrabold text-sm uppercase">KOPARGAON & SHIRDI</span>
                  </div>
                  <p className="text-xs text-[#F3EDE0]/80 font-sans">
                    <a href="https://sanjivani.edu.in" target="_blank" rel="noopener noreferrer" className="text-[#E5BE61] hover:underline font-semibold">Sanjivani University</a> campus is situated near Shirdi, Maharashtra.
                  </p>
                </div>

                {onRegisterClick && (
                  <button
                    onClick={onRegisterClick}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-mono font-black text-xs uppercase text-[#F9F4EA] bg-[#A77A1C] hover:bg-[#8F6716] border border-[#E5BE61]/60 transition-all shadow-md"
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
