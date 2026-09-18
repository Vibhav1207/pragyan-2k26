import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import loadingVideoSrc from '../../assets/loading video.mp4';

interface DailyIntroLoaderProps {
  onFinish?: () => void;
  forceShow?: boolean;
}

const STORAGE_KEY = 'pragyan_2k26_daily_intro_date';
const COOKIE_NAME = 'pragyan_intro_seen';

const checkHasSeenToday = (): boolean => {
  const today = new Date().toISOString().split('T')[0];

  try {
    const localDate = localStorage.getItem(STORAGE_KEY);
    if (localDate === today) return true;
  } catch {
  }

  try {
    if (typeof document !== 'undefined' && document.cookie) {
      const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
      if (match && decodeURIComponent(match[1]) === today) {
        return true;
      }
    }
  } catch {
  }

  return false;
};

const markAsSeenToday = () => {
  const today = new Date().toISOString().split('T')[0];

  try {
    localStorage.setItem(STORAGE_KEY, today);
  } catch {
  }

  try {
    if (typeof document !== 'undefined') {
      document.cookie = `${COOKIE_NAME}=${encodeURIComponent(today)}; max-age=86400; path=/; SameSite=Lax`;
    }
  } catch {
  }
};

export const DailyIntroLoader: React.FC<DailyIntroLoaderProps> = ({ onFinish, forceShow = false }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const hasSeenToday = checkHasSeenToday();

    if (forceShow || !hasSeenToday) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    }
  }, [forceShow]);

  const handleComplete = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);

    markAsSeenToday();

    document.body.style.overflow = '';

    setTimeout(() => {
      setIsVisible(false);
      onFinish?.();
    }, 600);
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

    const fallbackTimer = setTimeout(() => {
      handleComplete();
    }, 15000);

    return () => clearTimeout(fallbackTimer);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-black overflow-hidden select-none transition-opacity duration-600 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-modal="true"
      role="dialog"
      aria-label="Welcome Loading Video"
    >
      <div className="absolute inset-0 w-full h-full bg-black">
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
          className="w-full h-full object-cover object-center"
        >
          <source src="/loading-video.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </div>

      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        <div className="flex items-center gap-3">
          <img
            src="/pragyan-logo.png"
            alt="PRAGYAN 2K26"
            className="h-8 sm:h-9 w-auto object-contain bg-white/90 px-2 py-0.5 rounded-md shadow-md border border-[#A77A1C]/50"
          />
          <span className="font-mono text-xs tracking-widest text-[#E5BE61] font-bold uppercase hidden sm:inline drop-shadow">
            PRAGYAN 2K26 
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#E5BE61] flex items-center justify-center hover:bg-black/80 hover:border-[#E5BE61] transition-all shadow-lg"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={handleComplete}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#E5BE61]/60 hover:bg-[#E5BE61] hover:text-black text-white font-mono text-xs font-bold transition-all shadow-lg group"
          >
            <span>Skip</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-col items-center gap-3 z-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
        <div className="w-full max-w-md bg-white/20 backdrop-blur-sm h-1 sm:h-1.5 rounded-full overflow-hidden border border-white/10 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#A77A1C] to-[#E5BE61] transition-all duration-150 ease-out shadow-[0_0_8px_rgba(229,190,97,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="font-mono text-[11px] text-white/80 flex items-center gap-2 drop-shadow">
          <span className="inline-block w-2 h-2 rounded-full bg-[#E5BE61] animate-pulse shadow-[0_0_6px_#E5BE61]" />
          <span>INITIALIZING HACKATHON ENVIRONMENT</span>
        </div>
      </div>
    </div>
  );
};
