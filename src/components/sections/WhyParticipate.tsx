import React from 'react';
import { Award, FileCheck, Briefcase, Rocket, Compass, MapPin } from 'lucide-react';

interface PrizesSectionProps {
  onRegisterClick?: () => void;
}

export const WhyParticipate: React.FC<PrizesSectionProps> = ({ onRegisterClick }) => {
  return (
    <section id="prizes" className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#F0F4FA] text-[#0B192C] text-left border-b border-slate-200">
      <div className="max-w-[1500px] mx-auto w-full space-y-12">
        
        {/* Section Header */}
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

        {/* 4 Main Prize Cards Grid (Unified Matching White & Blue Palette) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Prize 1: EXCITING CASH PRIZES */}
          <div className="card-premium p-8 rounded-3xl border border-slate-200 bg-white text-[#0B192C] space-y-5 hover:border-[#1D4ED8]/40 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#1D4ED8]/10 text-[#1D4ED8] flex items-center justify-center font-bold">
              <Award className="w-6 h-6 text-[#1D4ED8]" />
            </div>
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold text-[#1D4ED8] uppercase tracking-wider">
                GRAND REWARD
              </span>
              <h3 className="font-space font-extrabold text-xl text-[#0B192C] uppercase leading-snug">
                EXCITING CASH PRIZES
              </h3>
            </div>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Attractive cash rewards awarded to top performing teams across innovation tracks at the national grand finale.
            </p>
          </div>

          {/* Prize 2: CERTIFICATES */}
          <div className="card-premium p-8 rounded-3xl border border-slate-200 bg-white text-[#0B192C] space-y-5 hover:border-[#1D4ED8]/40 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#1D4ED8]/10 text-[#1D4ED8] flex items-center justify-center font-bold">
              <FileCheck className="w-6 h-6 text-[#1D4ED8]" />
            </div>
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold text-[#1D4ED8] uppercase tracking-wider">
                OFFICIAL CREDENTIALS
              </span>
              <h3 className="font-space font-extrabold text-xl text-[#0B192C] uppercase leading-snug">
                CERTIFICATES
              </h3>
            </div>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              National certificates of merit, achievement, and participation issued by Sanjivani University.
            </p>
          </div>

          {/* Prize 3: INTERNSHIP OPPORTUNITIES */}
          <div className="card-premium p-8 rounded-3xl border border-slate-200 bg-white text-[#0B192C] space-y-5 hover:border-[#1D4ED8]/40 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#1D4ED8]/10 text-[#1D4ED8] flex items-center justify-center font-bold">
              <Briefcase className="w-6 h-6 text-[#1D4ED8]" />
            </div>
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold text-[#1D4ED8] uppercase tracking-wider">
                CAREER ADVANCEMENT
              </span>
              <h3 className="font-space font-extrabold text-xl text-[#0B192C] uppercase leading-snug">
                INTERNSHIP OPPORTUNITIES
              </h3>
            </div>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Direct internship pathways, industry networking, and corporate talent connections for standout innovators.
            </p>
          </div>

          {/* Prize 4: INCUBATION SUPPORT */}
          <div className="card-premium p-8 rounded-3xl border border-slate-200 bg-white text-[#0B192C] space-y-5 hover:border-[#1D4ED8]/40 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#1D4ED8]/10 text-[#1D4ED8] flex items-center justify-center font-bold">
              <Rocket className="w-6 h-6 text-[#1D4ED8]" />
            </div>
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold text-[#1D4ED8] uppercase tracking-wider">
                VENTURE ECOSYSTEM
              </span>
              <h3 className="font-space font-extrabold text-xl text-[#0B192C] uppercase leading-snug">
                INCUBATION SUPPORT
              </h3>
            </div>
            <p className="text-xs text-slate-600 font-sans leading-relaxed">
              Mentorship, startup guidance, and incubation ecosystem access via Sanjivani University's Innovation Center & ED Cell.
            </p>
          </div>

        </div>

        {/* SHIRDI TOURISM COMPLEMENTARY BANNER */}
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
                EXPLORE SHIRDI WITH YOUR JOURNEY — Top teams visiting Sanjivani University, Kopargaon will get a complimentary opportunity to visit and explore the holy city of Shirdi.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-4">
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-left w-full space-y-2">
                <div className="flex items-center gap-2 text-[#FACC15]">
                  <MapPin className="w-5 h-5" />
                  <span className="font-space font-extrabold text-sm uppercase">KOPARGAON & SHIRDI</span>
                </div>
                <p className="text-xs text-slate-300 font-sans">
                  Sanjivani University campus is situated near Shirdi, Maharashtra.
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

      </div>
    </section>
  );
};
