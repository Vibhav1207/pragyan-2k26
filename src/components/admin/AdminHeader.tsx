import React from 'react';
import { Bell, Search, ShieldCheck, ExternalLink, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onToggleSidebar?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle, onToggleSidebar }) => {
  const { admin } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-[#162E28] border-b border-[#A77A1C]/40 px-4 sm:px-8 py-4 flex items-center justify-between text-[#F9F4EA] shadow-md">
      <div className="flex items-center gap-4">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg bg-[#2B3E35] text-[#F9F4EA] hover:text-[#E5BE61] border border-[#A77A1C]/30 transition"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div>
          <h1 className="font-serif font-black text-xl sm:text-2xl uppercase tracking-tight text-[#F9F4EA] flex items-center gap-2">
            <span>{title}</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono bg-[#A77A1C]/30 border border-[#E5BE61]/50 text-[#E5BE61] px-2.5 py-0.5 rounded-full">
              <ShieldCheck className="w-3 h-3 text-[#E5BE61]" /> ADMIN SECURE
            </span>
          </h1>
          {subtitle && (
            <p className="text-xs text-[#F3EDE0]/80 font-sans mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-[#2B3E35] border border-[#A77A1C]/30 rounded-xl px-3 py-1.5 text-xs text-[#F3EDE0] w-48 lg:w-64 focus-within:border-[#E5BE61] transition">
          <Search className="w-4 h-4 text-[#A77A1C]" />
          <input
            type="text"
            placeholder="Quick search teams, files..."
            className="bg-transparent text-[#F9F4EA] focus:outline-none w-full placeholder-[#F3EDE0]/60 text-xs"
          />
        </div>

        {/* Live Public Site Button */}
        <Link
          to="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#A77A1C] border border-[#E5BE61]/60 text-[#F9F4EA] text-xs font-mono font-bold hover:bg-[#8F6716] transition shadow-sm"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>VIEW SITE</span>
        </Link>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl bg-[#2B3E35] border border-[#A77A1C]/30 text-[#F9F4EA] hover:text-[#E5BE61] transition">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E5BE61] animate-pulse"></span>
        </button>

        {/* Admin Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#A77A1C]/30">
          <img
            src={admin?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'}
            alt={admin?.name || 'Admin'}
            className="w-8 h-8 rounded-full border border-[#E5BE61] object-cover"
          />
          <div className="hidden xl:block text-left">
            <div className="text-xs font-bold text-[#F9F4EA] leading-tight">{admin?.name || 'Admin'}</div>
            <div className="text-[10px] font-mono text-[#E5BE61]">SUPER ADMIN</div>
          </div>
        </div>
      </div>
    </header>
  );
};
