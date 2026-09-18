import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import loadingVideoSrc from '../../assets/loading video.mp4';

interface DailyIntroLoaderProps {
  onFinish?: () => void;
  /** Force show regardless of daily storage check (useful for previewing/debugging) */
  forceShow?: boolean;
}

const STORAGE_KEY = 'pragyan_2k26_daily_intro_date';

export const DailyIntroLoader: React.FC<DailyIntroLoaderProps> = ({ onFinish, forceShow = false }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    try {
      const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
      const lastSeenDate = localStorage.getItem(STORAGE_KEY);

      if (forceShow || lastSeenDate !== today) {
        setIsVisible(true);
        // Lock body scroll while video is playing
        document.body.style.overflow = 'hidden';
      }
    } catch {
      // If localStorage is unavailable, fail gracefully
      setIsVisible(false);
    }
  }, [forceShow]);

  const handleComplete = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);

    try {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem(STORAGE_KEY, today);
    } catch {
      // Ignore storage errors
    }

    // Unlock body scroll
    document.body.style.overflow = '';

    setTimeout(() => {
      setIsVisible(false);
      onFinish?.();
    }, 500);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(pct);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  useEffect(() => {
    if (!isVisible) return;

    // Fallback timer: if video doesn't end within 15 seconds or gets blocked, automatically dismiss
    const fallbackTimer = setTimeout(() => {
      handleComplete();
    }, 15000);

    return () => clearTimeout(fallbackTimer);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#0A1613] flex flex-col items-center justify-center transition-all duration-500 ease-out select-none ${
        isFadingOut ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-modal="true"
      role="dialog"
      aria-label="Welcome Loading Video"
    >
      {/* Top Utility Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <img
            src="/pragyan-logo.png"
            alt="PRAGYAN 2K26"
            className="h-8 sm:h-9 w-auto object-contain bg-[#F9F4EA] px-2 py-0.5 rounded-md shadow-sm border border-[#A77A1C]/50"
          />
          <span className="font-mono text-xs tracking-widest text-[#E5BE61] font-bold uppercase hidden sm:inline">
            PRAGYAN 2K26 // LOADING
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            className="w-9 h-9 rounded-full bg-[#162E28]/80 border border-[#A77A1C]/40 text-[#E5BE61] flex items-center justify-center hover:bg-[#162E28] hover:border-[#E5BE61] transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={handleComplete}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#162E28]/90 border border-[#E5BE61]/50 hover:bg-[#A77A1C] hover:text-[#0A1613] text-[#F9F4EA] font-mono text-xs font-bold transition-all shadow-md group"
          >
            <span>Skip</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Main Video Presentation Container */}
      <div className="relative w-full h-full max-w-5xl max-h-[85vh] p-4 sm:p-8 flex items-center justify-center">
        <div className="relative w-full h-full max-w-4xl flex items-center justify-center rounded-2xl overflow-hidden border border-[#A77A1C]/30 shadow-2xl bg-black">
          <video
            ref={videoRef}
            src={loadingVideoSrc}
            autoPlay
            muted={isMuted}
            playsInline
            preload="auto"
            onEnded={handleComplete}
            onError={handleComplete}
            onTimeUpdate={handleTimeUpdate}
            className="w-full h-full object-contain"
          >
            <source src="/loading-video.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>
      </div>

      {/* Bottom Progress & Branding */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-col items-center gap-3 z-20 bg-gradient-to-t from-[#0A1613] via-[#0A1613]/80 to-transparent">
        <div className="w-full max-w-md bg-[#162E28] h-1 rounded-full overflow-hidden border border-[#A77A1C]/20">
          <div
            className="h-full bg-gradient-to-r from-[#A77A1C] to-[#E5BE61] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="font-mono text-[11px] text-[#F3EDE0]/70 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#E5BE61] animate-pulse" />
          <span>INITIALIZING HACKATHON ENVIRONMENT</span>
        </div>
      </div>
    </div>
  );
};
