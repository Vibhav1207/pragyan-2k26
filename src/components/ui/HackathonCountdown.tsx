import React, { useState, useEffect } from 'react';
import { MapPin, ArrowRight, CheckCircle2, Trophy, Clock } from 'lucide-react';

import { FINAL_HACKATHON_TARGET_ISO } from '../../data/event';

// Storage key used only for optional runtime developer preview overrides
const STORAGE_KEY = 'pragyan_hackathon_target_time';

/**
 * Returns the hackathon commencement timestamp, or null if TBD.
 * 
 * DESIGNED TO NEVER RESET ON DEPLOYMENTS:
 * 1. If FINAL_HACKATHON_TARGET_ISO is null, it permanently stays TBD. Pushing updates will never restart a timer.
 * 2. When FINAL_HACKATHON_TARGET_ISO is set to an ISO datetime (e.g. '2026-03-25T09:00:00+05:30'),
 *    all participants count down to that exact, unchanging moment in time.
 *    Pushing code or reloading never resets the timer because the target date is fixed and absolute.
 */
export function getHackathonTargetTime(): number | null {
  // If schedule is TBD in official event configuration, strictly enforce TBD and clear stale browser cache
  if (!FINAL_HACKATHON_TARGET_ISO) {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) { }
    }
    return null;
  }

  // If a fixed ISO date is configured, use it as the definitive absolute target
  const configuredTime = new Date(FINAL_HACKATHON_TARGET_ISO).getTime();
  if (!isNaN(configuredTime)) {
    return configuredTime;
  }

  // Fallback to local storage only if developer explicitly tested in console
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && saved !== 'TBD' && saved !== 'tbd') {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed > Date.now()) {
          return parsed;
        }
      }
    } catch (e) { }
  }

  return null;
}

export function setCustomHackathonTargetTime(timestampOrIsoOrTbd: number | string | null) {
  if (timestampOrIsoOrTbd === null || timestampOrIsoOrTbd === 'TBD' || timestampOrIsoOrTbd === 'tbd') {
    try {
      localStorage.setItem(STORAGE_KEY, 'TBD');
      window.dispatchEvent(new Event('pragyan_target_time_changed'));
    } catch (e) {
      // ignore
    }
    return;
  }

  const target = typeof timestampOrIsoOrTbd === 'string' ? new Date(timestampOrIsoOrTbd).getTime() : timestampOrIsoOrTbd;
  if (!isNaN(target)) {
    try {
      localStorage.setItem(STORAGE_KEY, target.toString());
      window.dispatchEvent(new Event('pragyan_target_time_changed'));
    } catch (e) {
      // ignore
    }
  }
}

// Expose on window for easy developer/admin console access
if (typeof window !== 'undefined') {
  (window as unknown as { setHackathonTargetTime: typeof setCustomHackathonTargetTime }).setHackathonTargetTime = setCustomHackathonTargetTime;
}

export function useHackathonCountdown() {
  const [targetTime, setTargetTime] = useState<number | null>(() => getHackathonTargetTime());
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    isTbd: boolean;
  }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    isTbd: true,
  });

  useEffect(() => {
    const handleTargetChange = () => {
      setTargetTime(getHackathonTargetTime());
    };
    window.addEventListener('pragyan_target_time_changed', handleTargetChange);
    return () => window.removeEventListener('pragyan_target_time_changed', handleTargetChange);
  }, []);

  useEffect(() => {
    if (targetTime === null) {
      setTimeLeft({
        hours: 0,
        minutes: 0,
        seconds: 0,
        isTbd: true,
      });
      return;
    }

    const calculateTime = () => {
      const diff = targetTime - Date.now();
      if (diff <= 0) {
        setTimeLeft({
          hours: 0,
          minutes: 0,
          seconds: 0,
          isTbd: false,
        });
        return;
      }

      const totalSec = Math.floor(diff / 1000);
      const hours = Math.floor(totalSec / 3600);
      const minutes = Math.floor((totalSec % 3600) / 60);
      const seconds = totalSec % 60;

      setTimeLeft({
        hours,
        minutes,
        seconds,
        isTbd: false,
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetTime]);

  return timeLeft;
}

/**
 * Top Countdown Ribbon placed at the very top of the header / page
 */
export const HackathonTopCountdownBar: React.FC = () => {
  const { hours, minutes, seconds, isTbd } = useHackathonCountdown();

  const pad = (n: number) => String(n).padStart(2, '0');

  const scrollToTimeline = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById('timeline');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#10221E] text-[#F9F4EA] border-b border-[#A77A1C]/35 relative z-50 select-none overflow-hidden text-xs">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 py-2 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">

        {/* Left Status: Official Hackathon Finale */}
        <div className="flex items-center gap-2 font-mono flex-wrap">
          <span className="text-[#E5BE61] font-extrabold text-[11px] sm:text-xs tracking-wider uppercase flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-[#E5BE61]" />
            PRAGYAN 2K26 GRAND FINALE
          </span>
          <span className="hidden sm:inline text-[#D2CAB6]/60 text-[11px]">|</span>
          <span className="text-[#D2CAB6] text-[11px] font-sans">
            Sanjivani University Campus
          </span>
        </div>

        {/* Center: Countdown or TBD Display */}
        <div className="flex items-center gap-3">
          <span className="font-serif uppercase tracking-wider text-[#F3EDE0] text-xs font-bold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#E5BE61] animate-pulse" />
            5TH CHALLENGE GOES LIVE IN:
          </span>

          {isTbd ? (
            <div className="flex items-center gap-2 font-mono">
              <div className="bg-[#162E28] border border-[#A77A1C]/60 text-[#E5BE61] font-black text-xs sm:text-sm px-3.5 py-0.5 rounded shadow-inner text-center tracking-widest">
                TBD
              </div>
              <span className="hidden md:inline text-[10px] font-mono text-[#D2CAB6]/80 tracking-widest uppercase">
                (TO BE DECLARED)
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 font-mono">
              <div className="bg-[#162E28] border border-[#A77A1C]/60 text-[#E5BE61] font-black text-xs sm:text-sm px-2 py-0.5 rounded shadow-inner min-w-[28px] text-center">
                {pad(hours)}
              </div>
              <span className="text-[#A77A1C] font-black text-xs sm:text-sm">:</span>
              <div className="bg-[#162E28] border border-[#A77A1C]/60 text-[#E5BE61] font-black text-xs sm:text-sm px-2 py-0.5 rounded shadow-inner min-w-[28px] text-center">
                {pad(minutes)}
              </div>
              <span className="text-[#A77A1C] font-black text-xs sm:text-sm">:</span>
              <div className="bg-[#162E28] border border-[#A77A1C]/60 text-[#E5BE61] font-black text-xs sm:text-sm px-2 py-0.5 rounded shadow-inner min-w-[28px] text-center">
                {pad(seconds)}
              </div>
              <div className="hidden lg:flex items-center gap-1 text-[10px] font-mono text-[#D2CAB6]/80 tracking-widest uppercase ml-1">
                <span>(HRS : MIN : SEC)</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Action */}
        <a
          href="#timeline"
          onClick={scrollToTimeline}
          className="hidden sm:inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#E5BE61] hover:text-white uppercase tracking-wider transition hover:underline"
        >
          <span>VIEW SCHEDULE</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>

      </div>
    </div>
  );
};

/**
 * Large Hero Countdown Card showcasing Final Hackathon TBD timer with Round 1 & Round 2 status
 */
export const HackathonHeroCountdown: React.FC = () => {
  const { hours, minutes, seconds, isTbd } = useHackathonCountdown();
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="w-full bg-[#E9E1D2] border-2 border-[#A77A1C]/50 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-lg relative overflow-hidden text-left">
      {/* Decorative background watermark */}
      <div className="absolute right-0 bottom-0 translate-x-8 translate-y-4 pointer-events-none opacity-[0.04] font-serif font-black text-8xl sm:text-9xl text-[#162E28] select-none">
        24H
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">

        {/* Left Info: Status & Round Details */}
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <span className="inline-flex items-center gap-1.5 bg-[#162E28] text-[#E5BE61] text-[10px] sm:text-xs font-mono font-black uppercase px-3.5 py-1 rounded-full border border-[#A77A1C]/50 shadow-sm">
              <Trophy className="w-3.5 h-3.5 text-[#E5BE61]" />
              FINAL HACKATHON GRAND FINALE
            </span>

            <span className="inline-flex items-center gap-1 bg-[#F9F4EA] text-[#162E28] border border-[#D2CAB6] text-[10px] sm:text-xs font-mono font-bold uppercase px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>CHALLENGES 1-4 LIVE</span>
            </span>

            <span className="inline-flex items-center gap-1 text-[#A77A1C] text-[10px] sm:text-xs font-mono font-bold uppercase">
              <MapPin className="w-3.5 h-3.5" />
              <span>SANJIVANI CAMPUS, KOPARGAON</span>
            </span>
          </div>

          <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#162E28] uppercase tracking-tight">
            5TH MILESTONE CHALLENGE <span className="italic font-normal text-[#A77A1C]">{isTbd ? 'UNLOCK SCHEDULE' : 'GOES LIVE IN'}</span>
          </h3>

          <p className="text-xs sm:text-sm font-sans text-[#7B8379] max-w-xl">
            Selected national finalist teams assemble for an intensive 24-hour on-ground innovation sprint driving solutions for UN Sustainable Development Goals 2030 at Sanjivani University.
          </p>
        </div>

        {/* Right: TBD display or Digits Display */}
        {isTbd ? (
          <div className="flex flex-col items-center justify-center px-8 sm:px-12 py-3.5 sm:py-5 bg-[#162E28] rounded-2xl border-2 border-[#A77A1C] shadow-md shrink-0">
            <span className="font-mono font-black text-3xl sm:text-5xl text-[#E5BE61] tracking-widest leading-none">
              TBD
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] font-extrabold uppercase text-[#D2CAB6] tracking-widest mt-2 flex items-center gap-1 text-center">
              <Clock className="w-3 h-3 text-[#A77A1C]" />
              SCHEDULE TO BE DECLARED
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#162E28] rounded-xl sm:rounded-2xl border-2 border-[#A77A1C] flex items-center justify-center shadow-md">
                <span className="font-mono font-black text-2xl sm:text-4xl text-[#E5BE61]">
                  {pad(hours)}
                </span>
              </div>
              <span className="font-mono text-[9px] sm:text-[10px] font-extrabold uppercase text-[#162E28] tracking-widest mt-1.5">
                HOURS
              </span>
            </div>

            <span className="font-mono font-black text-2xl sm:text-3xl text-[#A77A1C] -mt-5">:</span>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#162E28] rounded-xl sm:rounded-2xl border-2 border-[#A77A1C] flex items-center justify-center shadow-md">
                <span className="font-mono font-black text-2xl sm:text-4xl text-[#E5BE61]">
                  {pad(minutes)}
                </span>
              </div>
              <span className="font-mono text-[9px] sm:text-[10px] font-extrabold uppercase text-[#162E28] tracking-widest mt-1.5">
                MINUTES
              </span>
            </div>

            <span className="font-mono font-black text-2xl sm:text-3xl text-[#A77A1C] -mt-5">:</span>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#162E28] rounded-xl sm:rounded-2xl border-2 border-[#A77A1C] flex items-center justify-center shadow-md">
                <span className="font-mono font-black text-2xl sm:text-4xl text-[#E5BE61]">
                  {pad(seconds)}
                </span>
              </div>
              <span className="font-mono text-[9px] sm:text-[10px] font-extrabold uppercase text-[#162E28] tracking-widest mt-1.5">
                SECONDS
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
