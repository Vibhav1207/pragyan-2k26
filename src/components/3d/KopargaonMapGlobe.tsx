import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Calendar, ExternalLink, MapPin } from 'lucide-react';

interface KopargaonMapGlobeProps {
  onJoinClick?: () => void;
}

export const KopargaonMapGlobe: React.FC<KopargaonMapGlobeProps> = ({ onJoinClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapImageRef = useRef<HTMLImageElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          gsap.fromTo(
            mapImageRef.current,
            { scale: 1.2, opacity: 0.7 },
            { scale: 1.0, opacity: 1, duration: 1.4, ease: 'power2.out' }
          );

          gsap.fromTo(
            markerRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, delay: 0.5, ease: 'back.out(1.7)' }
          );

          gsap.fromTo(
            cardRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, delay: 0.8, ease: 'power2.out' }
          );
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[420px] sm:h-[500px] lg:h-[560px] overflow-hidden border-3 border-[#050505] shadow-brutal-lg bg-[#050505]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={mapImageRef}
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80"
          alt="Satellite Map View over Maharashtra Kopargaon India"
          className="w-full h-full object-cover transform origin-center transition-transform duration-1000 grayscale brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-60" viewBox="0 0 600 600" fill="none">
        <path d="M 50 100 Q 250 250 420 350" stroke="#FFD600" strokeWidth="2" strokeDasharray="6 6" />
      </svg>

      <div
        ref={markerRef}
        className="absolute top-[55%] left-[65%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group cursor-pointer"
        onClick={onJoinClick}
      >
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-[#FFD600] animate-ping absolute" />
          <div className="w-10 h-10 border-2 border-[#050505] bg-[#FC3D21] flex items-center justify-center shadow-brutal">
            <MapPin className="w-6 h-6 text-white fill-white" />
          </div>
        </div>
      </div>

      {/* Sanjivani University Venue Card */}
      <div
        ref={cardRef}
        className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-xs z-30 bg-white border-2 border-[#050505] shadow-brutal p-5 space-y-3 text-left"
      >
        <div className="relative w-full h-28 border border-[#050505] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80"
            alt="Sanjivani University Campus Venue"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-[#FC3D21] text-white font-mono text-[9px] font-extrabold px-2 py-0.5 border border-[#050505]">
            HACKATHON VENUE
          </div>
        </div>

        <div className="space-y-1">
          <h4 className="font-space font-black text-base text-[#050505] uppercase leading-tight">
            SANJIVANI UNIVERSITY
          </h4>
          <p className="font-mono text-xs text-[#FC3D21] font-bold">
            Kopargaon, Maharashtra, India
          </p>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#050505] font-extrabold pt-1">
            <Calendar className="w-3.5 h-3.5 text-[#FC3D21]" />
            <span>24–25 OCTOBER 2026</span>
          </div>
        </div>

        <button
          onClick={onJoinClick}
          className="w-full py-2.5 px-3 bg-[#FFD600] text-[#050505] font-space font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#FC3D21] hover:text-white transition-colors border-2 border-[#050505] shadow-brutal-sm"
        >
          <span>REGISTER FOR FINALE</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
