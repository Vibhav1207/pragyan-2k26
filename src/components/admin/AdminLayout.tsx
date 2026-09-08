import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  UserCheck, 
  FileText, 
  Layers, 
  Globe, 
  Megaphone, 
  FolderArchive, 
  Download, 
  Activity, 
  Settings, 
  LogOut, 
  X,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AdminHeader } from './AdminHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, subtitle }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, logoutAdmin } = useAuth();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Teams', path: '/admin/teams', icon: Users },
    { label: 'Registrations', path: '/admin/registrations', icon: ClipboardList },
    { label: 'Participants', path: '/admin/participants', icon: UserCheck },
    { label: 'Submissions', path: '/admin/submissions', icon: FileText },
    { label: 'Tracks', path: '/admin/tracks', icon: Layers },
    { label: 'Homepage', path: '/admin/homepage', icon: Globe },
    { label: 'Announcements', path: '/admin/announcements', icon: Megaphone },
    { label: 'Files', path: '/admin/files', icon: FolderArchive },
    { label: 'Exports', path: '/admin/exports', icon: Download },
    { label: 'Activity Logs', path: '/admin/activity', icon: Activity },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F0F4FA] text-[#0B192C] font-sans flex flex-col lg:flex-row overflow-x-hidden selection:bg-[#1D4ED8] selection:text-white">
      
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR NAVIGATION (PUBLIC SITE BRANDING: #0B192C NAVY SIDEBAR) */}
      <aside
        className={`fixed top-0 left-0 h-screen w-72 bg-[#0B192C] text-white border-r border-white/10 flex flex-col justify-between z-50 transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header / Branding */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center gap-3 group">
            <div className="p-2 bg-white rounded-xl shadow-md group-hover:scale-105 transition">
              <img src="/pragyan-logo.png" alt="PRAGYAN Logo" className="h-8 w-auto object-contain" />
            </div>
            <div className="text-left">
              <div className="font-space font-extrabold text-lg text-white uppercase tracking-tight leading-none">
                PRAGYAN <span className="text-[#FACC15]">2K26</span>
              </div>
              <div className="font-mono text-[10px] text-blue-300 font-bold uppercase tracking-widest mt-1">
                ADMINISTRATION
              </div>
            </div>
          </Link>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-slate-300 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Navigation Links */}
        <div className="px-3 py-4 flex-1 overflow-y-auto space-y-1 custom-scrollbar text-left">
          <div className="px-3 py-1 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            MANAGEMENT MODULES
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#1D4ED8] text-white shadow-lg shadow-blue-600/30 font-bold'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#FACC15]' : 'text-blue-300'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-80" />}
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer / Admin Profile */}
        <div className="p-4 border-t border-white/10 bg-black/20 space-y-3">
          <div className="flex items-center gap-3 px-2.5 py-2 rounded-xl bg-white/10 border border-white/10 text-left">
            <img
              src={admin?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'}
              alt={admin?.name || 'Admin'}
              className="w-9 h-9 rounded-full object-cover border border-[#FACC15]"
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">{admin?.name || 'PRAGYAN Admin'}</div>
              <div className="text-[10px] font-mono text-slate-300 truncate">{admin?.email || 'admin@sanjivani.edu.in'}</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-600 hover:text-white text-xs font-bold font-mono transition"
          >
            <LogOut className="w-4 h-4" />
            <span>LOGOUT ADMIN</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA (#F0F4FA BACKDROP) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        <AdminHeader
          title={title}
          subtitle={subtitle}
          onToggleSidebar={() => setMobileOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1700px] w-full mx-auto space-y-8 text-left">
          {children}
        </main>
      </div>

    </div>
  );
};
