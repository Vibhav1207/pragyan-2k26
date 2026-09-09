import React from 'react';
import { MapPin, Navigation, Building2 } from 'lucide-react';
import { ScrollReveal } from '../transitions/ScrollReveal';

interface KopargaonSectionProps {
  onRegisterClick?: () => void;
}

export const KopargaonSection: React.FC<KopargaonSectionProps> = ({ onRegisterClick }) => {
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

        {/* Location Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Address Details */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal delay={150} duration={650}>
              <div className="card-premium p-8 sm:p-10 rounded-3xl border border-slate-200 space-y-6 shadow-md">
                
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
                  <p className="font-space font-extrabold text-lg text-[#1D4ED8] uppercase">
                    Kopargaon, near Shirdi, Ahilyanagar, Maharashtra 423601
                  </p>
                </div>

                <p className="text-sm text-slate-600 font-sans leading-relaxed">
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

          {/* Clean Location Visual / Map Card */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={300} duration={650}>
              <div className="card-navy p-8 sm:p-10 rounded-3xl border border-white/10 text-white space-y-6 relative overflow-hidden shadow-xl">
                <div className="w-12 h-12 rounded-xl bg-[#FACC15]/20 text-[#FACC15] flex items-center justify-center font-bold">
                  <Navigation className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-xs font-bold text-[#FACC15] uppercase tracking-wider">
                    ACCESSIBILITY & TRAVEL
                  </span>
                  <h4 className="font-space font-extrabold text-2xl text-white uppercase leading-snug">
                    WELL CONNECTED HUB
                  </h4>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  Located near Shirdi, Kopargaon is seamlessly connected via rail and road networks across Maharashtra and India.
                </p>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-[#FACC15] font-mono text-xs font-bold uppercase">
                    <Building2 className="w-4 h-4" />
                    <span>CAMPUS FACILITY</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Fully equipped auditorium, breakout zones, and presentation halls for national final teams.
                  </p>
                </div>

                {onRegisterClick && (
                  <button
                    onClick={onRegisterClick}
                    className="btn-primary-blue w-full justify-center text-xs uppercase"
                  >
                    REGISTER NOW FOR PRAGYAN 2K26
                  </button>
                )}
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
};
