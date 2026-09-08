import React, { useState } from 'react';
import { X, BellRing } from 'lucide-react';
import { apiService } from '../../services/api';
import type { Announcement } from '../../types/admin';

export const AnnouncementTicker: React.FC = () => {
  const [visible, setVisible] = useState(true);

  const announcements: Announcement[] = apiService
    .getAnnouncements()
    .filter(a => a.status === 'PUBLISHED');

  if (!visible || announcements.length === 0) return null;

  // Duplicate items to ensure smooth continuous marquee loop without gaps
  const tickerItems = [...announcements, ...announcements, ...announcements];

  return (
    <div className="bg-[#0B192C] text-white border-b border-white/10 relative z-40 overflow-hidden shadow-lg select-none">
      <div className="max-w-[1700px] mx-auto flex items-center h-10 px-3 sm:px-6">
        
        {/* Left Fixed Badge */}
        <div className="flex items-center gap-2 bg-[#1D4ED8] text-white font-mono text-[11px] font-extrabold uppercase px-3 py-1 rounded-lg shrink-0 shadow-md z-10 mr-3 border border-blue-400/30">
          <BellRing className="w-3.5 h-3.5 text-[#FACC15] animate-pulse" />
          <span>ANNOUNCEMENTS</span>
        </div>

        {/* Marquee Container (Right to Left Slider) */}
        <div className="flex-1 overflow-hidden relative h-full flex items-center">
          
          {/* Subtle gradient masks for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0B192C] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0B192C] to-transparent z-10 pointer-events-none" />

          {/* Sliding Content */}
          <div className="animate-marquee items-center gap-8 py-1 cursor-default">
            {tickerItems.map((ann, idx) => (
              <div
                key={`${ann.id}-${idx}`}
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-200 shrink-0 hover:text-white transition"
              >
                <span className="font-extrabold text-[#FACC15] uppercase tracking-wide">
                  [{ann.title}]
                </span>
                <span className="text-slate-300 font-sans">
                  {ann.content}
                </span>
                <span className="text-slate-500 font-bold ml-4">•</span>
              </div>
            ))}
          </div>

        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => setVisible(false)}
          className="ml-3 p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition shrink-0 z-10"
          title="Dismiss Announcements"
        >
          <X className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};

export default AnnouncementTicker;
