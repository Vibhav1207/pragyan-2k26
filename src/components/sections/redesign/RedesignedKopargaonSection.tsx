import React from 'react';
import { MapPin } from 'lucide-react';
import { ScrollReveal } from '../../transitions/ScrollReveal';

interface RedesignedKopargaonSectionProps {
  onRegisterClick?: () => void;
}

export const RedesignedKopargaonSection: React.FC<RedesignedKopargaonSectionProps> = () => {
  return (
    <section id="location" className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#F3EDE0] text-[#050C0C] text-left border-b border-[#D2CAB6]">
      <div className="max-w-[1500px] mx-auto w-full space-y-12">
        
        {/* Header */}
        <ScrollReveal delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D2CAB6] pb-6 gap-4">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-[#A77A1C] uppercase tracking-widest bg-[#E9E1D2] px-3.5 py-1.5 rounded-full border border-[#A77A1C]/30">
                EVENT LOCATION & VENUE
              </span>
              <h2 className="font-serif font-black text-3xl sm:text-5xl text-[#162E28] uppercase tracking-tight">
                VENUE & <span className="italic font-normal text-[#A77A1C]">LOCATION</span>
              </h2>
            </div>
            <div className="font-mono text-xs font-bold text-[#A77A1C] uppercase tracking-widest">
              SANJIVANI UNIVERSITY CAMPUS
            </div>
          </div>
        </ScrollReveal>

        {/* Location Details Container */}
        <div className="max-w-4xl mx-auto w-full">
          <ScrollReveal delay={150} duration={650}>
            <div className="p-8 sm:p-12 rounded-3xl bg-[#F9F4EA] border border-[#D2CAB6] space-y-6 shadow-md hover:shadow-lg hover:border-[#A77A1C] transition-all">
              
              <div className="flex items-center gap-3 text-[#A77A1C]">
                <div className="w-11 h-11 rounded-xl bg-[#E9E1D2] border border-[#A77A1C]/30 flex items-center justify-center font-bold text-[#162E28]">
                  <MapPin className="w-5 h-5 text-[#A77A1C]" />
                </div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest">
                  OFFICIAL VENUE ADDRESS
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif font-black text-2xl sm:text-4xl text-[#162E28] uppercase tracking-tight leading-tight">
                  <a href="https://sanjivani.edu.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#A77A1C] transition-colors">
                    SANJIVANI UNIVERSITY
                  </a>
                </h3>
                <p className="font-serif font-bold text-lg sm:text-xl text-[#A77A1C] uppercase">
                  Kopargaon, near Shirdi, Ahilyanagar, Maharashtra 423601
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#7B8379] font-sans leading-relaxed">
                The grand finale of PRAGYAN 2K26 will take place at the state-of-the-art <a href="https://sanjivani.edu.in" target="_blank" rel="noopener noreferrer" className="text-[#A77A1C] hover:underline font-semibold">Sanjivani University</a> campus, equipped with 24-hour innovation facilities, mentor lounges, high-speed Wi-Fi, and hospitality for national participants.
              </p>

              <div className="pt-4 border-t border-[#D2CAB6] grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F3EDE0] border border-[#D2CAB6] space-y-1">
                  <span className="font-mono text-[11px] font-bold text-[#A77A1C] uppercase">REGION</span>
                  <p className="font-serif font-bold text-sm text-[#162E28]">Ahilyanagar District</p>
                </div>
                <div className="p-4 rounded-xl bg-[#F3EDE0] border border-[#D2CAB6] space-y-1">
                  <span className="font-mono text-[11px] font-bold text-[#A77A1C] uppercase">PINCODE</span>
                  <p className="font-serif font-bold text-sm text-[#162E28]">423601</p>
                </div>
              </div>

            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};
