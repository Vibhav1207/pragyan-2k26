import React, { useState, useEffect, useCallback } from 'react';
import { Trophy, ArrowRight, X } from 'lucide-react';

/**
 * Post-hackathon thank-you overlay for the homepage.
 *
 * Shown every time the homepage loads (after a short delay so it never races
 * the daily intro loader). It stays on screen — no fade, no auto-dismiss —
 * until the visitor closes it with the ✕ button, the Continue button, or the
 * Escape key. Page scroll is locked while it is open.
 */
export const HackathonThankYouOverlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    }, 1500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  const dismiss = useCallback(() => {
    document.body.style.overflow = '';
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isVisible, dismiss]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-[#050C0C]/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Hackathon concluded thank you message"
      onClick={dismiss}
    >
      <div
        className="w-full max-w-2xl bg-[#F9F4EA] border-2 border-[#A77A1C]/60 rounded-3xl shadow-2xl overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header band */}
        <div className="bg-[#162E28] px-5 sm:px-7 py-4 flex items-center justify-between gap-4">
          <span className="font-mono text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#E5BE61] flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#E5BE61] shrink-0" />
            <span>PRAGYAN 2K26 &bull; 24-HOUR HACKATHON</span>
          </span>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close thank you message"
            className="w-8 h-8 rounded-full bg-[#2B3E35] text-[#E5BE61] flex items-center justify-center border border-[#A77A1C]/40 hover:bg-[#A77A1C] hover:text-[#162E28] transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-5">
          <h2 className="font-serif font-black text-3xl sm:text-5xl text-[#162E28] uppercase tracking-tight leading-none">
            THANK <span className="italic font-normal text-[#A77A1C]">YOU</span>
          </h2>

          <p className="text-sm sm:text-base text-[#7B8379] leading-relaxed">
            The 24-hour innovation sprint at Sanjivani University has officially concluded.
            Thank you to every team, mentor, judge, organizer and volunteer who built through
            the night on innovation and entrepreneurship for the UN SDG 2030 goals —
            PRAGYAN 2K26 happened because of you.
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="font-mono text-[10px] font-black uppercase tracking-wider bg-[#E9E1D2] text-[#162E28] border border-[#D2CAB6] px-3 py-1 rounded-full">
              24-HOUR SPRINT COMPLETE
            </span>
            <span className="font-mono text-[10px] font-black uppercase tracking-wider bg-[#E9E1D2] text-[#162E28] border border-[#D2CAB6] px-3 py-1 rounded-full">
              4 INNOVATION TRACKS
            </span>
            <span className="font-mono text-[10px] font-black uppercase tracking-wider bg-[#E9E1D2] text-[#162E28] border border-[#D2CAB6] px-3 py-1 rounded-full">
              FINAL RESULTS TO FOLLOW
            </span>
          </div>

          <button
            type="button"
            onClick={dismiss}
            className="inline-flex items-center gap-2 bg-[#162E28] text-[#E5BE61] font-mono text-xs font-black uppercase tracking-widest px-6 py-3.5 rounded-xl border-2 border-[#A77A1C] hover:bg-[#A77A1C] hover:text-[#162E28] transition-colors"
          >
            CONTINUE
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HackathonThankYouOverlay;
