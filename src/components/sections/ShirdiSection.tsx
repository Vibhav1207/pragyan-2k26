import React from 'react';
import { Compass, Bus, Landmark, HeartHandshake, Sparkles, MapPin } from 'lucide-react';
import { SHIRDI_TOURISM_DATA } from '../../data/shirdi';

export const ShirdiSection: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    Compass,
    Bus,
    Landmark,
    HeartHandshake,
  };

  return (
    <section id="shirdi" className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#F3F1EC] text-[#050505] text-left border-b-3 border-[#050505]">
      <div className="max-w-[1600px] mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-3 border-[#050505] pb-6 gap-4">
          <div className="space-y-2">
            <div className="inline-block bg-[#FFD600] text-[#050505] font-mono text-xs font-black uppercase px-3 py-1 border border-[#050505]">
              EXCLUSIVE DELEGATE HOSPITALITY
            </div>
            <h2 className="font-space font-black text-4xl sm:text-6xl text-[#050505] uppercase tracking-tight">
              SHIRDI TOURISM
            </h2>
          </div>
          <div className="font-mono text-xs font-black text-[#FC3D21] uppercase tracking-widest">
            COMPLIMENTARY HERITAGE TOUR
          </div>
        </div>

        {/* Hero Card */}
        <div className="p-8 sm:p-12 bg-white border-3 border-[#050505] shadow-brutal-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-black bg-[#FC3D21] text-white px-3.5 py-1 uppercase border border-[#050505]">
              <Sparkles className="w-4 h-4 text-white" />
              {SHIRDI_TOURISM_DATA.title}
            </div>

            <h3 className="font-space font-black text-3xl sm:text-5xl text-[#050505] uppercase leading-tight">
              SPIRITUAL & CULTURAL EXPERIENCE IN SHIRDI
            </h3>

            <p className="text-base sm:text-lg text-slate-800 font-sans font-medium leading-relaxed">
              {SHIRDI_TOURISM_DATA.description}
            </p>

            <div className="flex items-center gap-2 font-mono text-xs font-extrabold text-[#FC3D21] bg-[#FFD600] p-3 border border-[#050505] inline-block">
              <MapPin className="w-4 h-4 inline mr-1 text-[#050505]" />
              <span>{SHIRDI_TOURISM_DATA.distance}</span>
            </div>
          </div>

          {/* Visual Panel */}
          <div className="lg:col-span-5 relative h-[300px] sm:h-[360px] border-3 border-[#050505] shadow-brutal overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1609946727492-c5892217236b?auto=format&fit=crop&w=1000&q=80"
              alt="Cultural and temple heritage in Maharashtra"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-[#050505] text-[#FFD600] font-mono text-xs font-black px-3 py-1 border border-white">
              MAHARASHTRA HERITAGE
            </div>
          </div>

        </div>

        {/* 4 Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SHIRDI_TOURISM_DATA.highlights.map((item, idx) => {
            const IconComp = iconMap[item.iconName] || Compass;

            return (
              <div
                key={idx}
                className="bg-white border-2 border-[#050505] p-6 shadow-brutal space-y-3 text-left hover:bg-[#FFD600] transition-colors"
              >
                <div className="w-10 h-10 bg-[#FC3D21] text-white border border-[#050505] flex items-center justify-center">
                  <IconComp className="w-5 h-5" />
                </div>

                <h4 className="font-space font-black text-lg text-[#050505] uppercase leading-tight">
                  {item.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-700 font-sans font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
