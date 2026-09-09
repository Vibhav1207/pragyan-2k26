import React from 'react';
import { MapPin } from 'lucide-react';
import { ScrollReveal } from '../transitions/ScrollReveal';

interface KopargaonSectionProps {
  onRegisterClick?: () => void;
}

export const KopargaonSection: React.FC<KopargaonSectionProps> = () => {
  return (
    <section id="location" className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#F0F4FA] text-[#0B192C] text-left border-b border-slate-200">
      <div className="max-w-[1500px] mx-auto w-full space-y-12">
        
        {/* Header */}
        <ScrollReveal delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-6 gap-4">
            <div className="space-y-2">
              <div className="inline-block bg-[#1D4ED8] text-white font-mono text-xs font-bold uppercase px-3 py-1 rounded-md">
                EVENT LOCATION & VENUE
              </div>
              <h2 className="font-space font-extrabold text-3xl sm:text-5xl text-[#0B192C] uppercase tracking-tight">
                VENUE & LOCATION
              </h2>
            </div>
            <div className="font-mono text-xs font-bold text-[#1D4ED8] uppercase tracking-widest">
              SANJIVANI UNIVERSITY CAMPUS
            </div>
          </div>
        </ScrollReveal>

        {/* Location Details Container */}
        <div className="max-w-4xl mx-auto w-full">
          <ScrollReveal delay={150} duration={650}>
            <div className="card-premium p-8 sm:p-12 rounded-3xl border border-slate-200 space-y-6 shadow-md">
              
              <div className="flex items-center gap-3 text-[#1D4ED8]">
                <div className="w-10 h-10 rounded-xl bg-[#1D4ED8]/10 flex items-center justify-center font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  OFFICIAL VENUE ADDRESS
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-space font-black text-2xl sm:text-4xl text-[#0B192C] uppercase tracking-tight leading-tight">
                  SANJIVANI UNIVERSITY
                </h3>
                <p className="font-space font-extrabold text-lg sm:text-xl text-[#1D4ED8] uppercase">
                  Kopargaon, near Shirdi, Ahilyanagar, Maharashtra 423601
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
                The grand finale of PRAGYAN 2K26 will take place at the state-of-the-art Sanjivani University campus, equipped with 24-hour innovation facilities, mentor lounges, high-speed Wi-Fi, and hospitality for national participants.
              </p>

              <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F0F4FA] border border-slate-200 space-y-1">
                  <span className="font-mono text-[11px] font-bold text-[#1D4ED8] uppercase">REGION</span>
                  <p className="font-space font-bold text-sm text-[#0B192C]">Ahilyanagar District</p>
                </div>
                <div className="p-4 rounded-xl bg-[#F0F4FA] border border-slate-200 space-y-1">
                  <span className="font-mono text-[11px] font-bold text-[#1D4ED8] uppercase">PINCODE</span>
                  <p className="font-space font-bold text-sm text-[#0B192C]">423601</p>
                </div>
              </div>

            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};
