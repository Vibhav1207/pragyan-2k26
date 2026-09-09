import React, { useState } from 'react';
import { X, Megaphone } from 'lucide-react';
import { apiService } from '../../services/api';
import type { Announcement } from '../../types/admin';

export const AnnouncementTicker: React.FC = () => {
  const [visible, setVisible] = useState(true);

  const announcements: Announcement[] = apiService
    .getAnnouncements()
    .filter(a => a.status === 'PUBLISHED' && a.title && !a.title.includes('ADFF'));

  if (!visible || announcements.length === 0) return null;

  // Duplicate items cleanly for smooth infinite marquee
  const tickerItems = [...announcements, ...announcements, ...announcements];

  return (
    <div className="bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#1D4ED8] text-white border-t border-blue-400/30 relative z-40 overflow-hidden shadow-md select-none">
      <div className="max-w-[1700px] mx-auto flex items-center h-9 px-3 sm:px-6">
        
        {/* Left Fixed Badge / Icon */}
        <div className="flex items-center gap-1.5 bg-blue-900/40 text-white font-mono text-[10px] sm:text-xs font-extrabold uppercase px-2.5 py-1 rounded-md shrink-0 z-10 mr-3 border border-white/20 backdrop-blur-xs">
          <Megaphone className="w-3.5 h-3.5 text-[#FACC15] animate-pulse" />
          <span className="hidden sm:inline tracking-wider">ANNOUNCEMENTS</span>
        </div>

        {/* Marquee Container (Right to Left Slider) */}
        <div className="flex-1 overflow-hidden relative h-full flex items-center">
          
          {/* Gradient masks matching the blue background */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#1D4ED8] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#1D4ED8] to-transparent z-10 pointer-events-none" />

          {/* Sliding Content */}
          <div className="animate-marquee items-center gap-8 cursor-default">
            {tickerItems.map((ann, idx) => (
              <div
                key={`${ann.id}-${idx}`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-medium text-white shrink-0"
              >
                <span className="font-extrabold text-[#FACC15] font-mono tracking-wide uppercase">
                  [{ann.title}]
                </span>
                <span className="text-white">
                  {ann.content}
                </span>
                <span className="text-blue-200/80 font-bold ml-4">—</span>
              </div>
            ))}
          </div>

        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => setVisible(false)}
          className="ml-2 p-1 rounded text-white/80 hover:text-white hover:bg-white/20 transition shrink-0 z-10"
          title="Dismiss Announcements"
        >
          <X className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};

export default AnnouncementTicker;
