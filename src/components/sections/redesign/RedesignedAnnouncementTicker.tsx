import React, { useState } from 'react';
import { X, Megaphone } from 'lucide-react';
import { apiService } from '../../../services/api';
import type { Announcement } from '../../../types/admin';

export const RedesignedAnnouncementTicker: React.FC = () => {
  const [visible, setVisible] = useState(true);

  const announcements: Announcement[] = apiService
    .getAnnouncements()
    .filter(a => a.status === 'PUBLISHED' && a.title && !a.title.includes('ADFF'));

  if (!visible || announcements.length === 0) return null;

  const tickerItems = [...announcements, ...announcements, ...announcements];

  return (
    <div className="bg-[#0D1A16] text-[#F9F4EA] border-t border-[#A77A1C]/30 relative z-40 overflow-hidden shadow-md select-none">
      <div className="max-w-[1700px] mx-auto flex items-center h-8 sm:h-9 px-3 sm:px-6">
        <div className="flex items-center gap-1.5 bg-[#162E28] text-[#E5BE61] font-mono text-[10px] sm:text-xs font-extrabold uppercase px-2.5 py-0.5 sm:py-1 rounded-md shrink-0 z-10 mr-3 border border-[#A77A1C]/40">
          <Megaphone className="w-3.5 h-3.5 text-[#E5BE61] animate-pulse" />
          <span className="hidden sm:inline tracking-wider">LATEST UPDATES</span>
        </div>

        <div className="flex-1 overflow-hidden relative h-full flex items-center">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0D1A16] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0D1A16] to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee items-center gap-8 cursor-default">
            {tickerItems.map((ann, idx) => (
              <div
                key={`${ann.id}-${idx}`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-medium text-[#F9F4EA] shrink-0"
              >
                <span className="font-extrabold text-[#E5BE61] font-mono tracking-wide uppercase">
                  [{ann.title}]
                </span>
                <span className="text-[#F3EDE0]">
                  {ann.content}
                </span>
                <span className="text-[#A77A1C] font-bold ml-4">—</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setVisible(false)}
          className="ml-2 p-1 rounded text-[#D2CAB6]/80 hover:text-white hover:bg-white/10 transition shrink-0 z-10"
          title="Dismiss Announcements"
        >
          <X className="w-4 h-4 text-[#E5BE61]" />
        </button>
      </div>
    </div>
  );
};

export default RedesignedAnnouncementTicker;
