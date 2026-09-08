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
    <header className="sticky top-0 z-30 bg-[#0B192C] border-b border-slate-800 px-4 sm:px-8 py-4 flex items-center justify-between text-white shadow-md">
      <div className="flex items-center gap-4">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div>
          <h1 className="font-space font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-white flex items-center gap-2">
            <span>{title}</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono bg-blue-600/30 border border-blue-500/50 text-blue-300 px-2.5 py-0.5 rounded-full">
              <ShieldCheck className="w-3 h-3 text-[#FACC15]" /> ADMIN SECURE
            </span>
          </h1>
          {subtitle && (
            <p className="text-xs text-slate-400 font-sans mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-400 w-48 lg:w-64 focus-within:border-blue-500 transition">
          <Search className="w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Quick search teams, files..."
            className="bg-transparent text-white focus:outline-none w-full placeholder-slate-500 text-xs"
          />
        </div>

        {/* Live Public Site Button */}
        <Link
          to="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 text-xs font-mono font-bold hover:bg-blue-600 hover:text-white transition"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>VIEW SITE</span>
        </Link>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
        </button>

        {/* Admin Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <img
            src={admin?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'}
            alt={admin?.name || 'Admin'}
            className="w-8 h-8 rounded-full border border-blue-500/50 object-cover"
          />
          <div className="hidden xl:block text-left">
            <div className="text-xs font-bold text-white leading-tight">{admin?.name || 'Admin'}</div>
            <div className="text-[10px] font-mono text-blue-400">SUPER ADMIN</div>
          </div>
        </div>
      </div>
    </header>
  );
};
