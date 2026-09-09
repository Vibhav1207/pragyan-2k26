import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Building2, 
  Phone, 
  GraduationCap, 
  Users, 
  ShieldCheck, 
  Crown, 
  Copy, 
  Check, 
  ArrowLeft, 
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import type { Team } from '../../types/admin';

export const ParticipantProfile: React.FC = () => {
  const { participant, logoutParticipant } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = React.useState(false);

  const teams = apiService.getTeams();
  const userTeam: Team | undefined = teams.find(t => t.teamId === participant?.teamId);

  const handleLogout = () => {
    logoutParticipant();
    navigate('/login');
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentMember = userTeam?.members.find(
    m => m.email.toLowerCase() === participant?.email?.toLowerCase()
  ) || userTeam?.leader;

  return (
    <div className="min-h-screen bg-[#F0F4FA] text-[#0B192C] font-sans selection:bg-[#1D4ED8] selection:text-white">
      
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="p-1.5 bg-[#0B192C] rounded-xl shadow-md group-hover:scale-105 transition">
                <img src="/pragyan-logo.png" alt="PRAGYAN Logo" className="h-7 w-auto object-contain" />
              </div>
              <div className="text-left">
                <div className="font-space font-extrabold text-base text-[#0B192C] uppercase tracking-tight">
                  PRAGYAN <span className="text-[#1D4ED8]">2K26</span>
                </div>
                <div className="font-mono text-[9px] text-blue-600 font-bold uppercase tracking-widest">
                  PARTICIPANT HUB
                </div>
              </div>
            </Link>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-2">
              <Link
                to="/dashboard"
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-[#1D4ED8] hover:bg-blue-50 transition flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-4 h-4 text-blue-600" /> Dashboard
              </Link>
              <Link
                to="/profile"
                className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold text-white bg-[#1D4ED8] shadow-md shadow-blue-600/20 flex items-center gap-1.5"
              >
                <User className="w-4 h-4 text-yellow-300" /> My Profile
              </Link>
              <Link
                to="/"
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-[#1D4ED8] hover:bg-blue-50 transition"
              >
                Public Website ↗
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2.5 bg-slate-100 px-3 py-1.5 rounded-2xl border border-slate-200">
              <img
                src={participant?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt={participant?.name || 'User'}
                className="w-7 h-7 rounded-full border border-blue-600 object-cover"
              />
              <div className="text-left leading-tight">
                <div className="text-xs font-bold text-[#0B192C]">{participant?.name || 'Participant'}</div>
                <div className="text-[10px] font-mono text-slate-500">{participant?.email}</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-red-50 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>

        </div>
      </header>

      {/* PROFILE CONTENT */}
      <main className="max-w-4xl mx-auto p-4 sm:p-8 space-y-8 text-left">
        
        {/* Back Link */}
        <div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-[#1D4ED8] hover:border-blue-300 shadow-sm transition"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600" /> ← Back to Participant Dashboard
          </Link>
        </div>

        {/* HEADER HERO CARD */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <img
                src={participant?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt={participant?.name || 'User'}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-blue-600 object-cover shadow-md"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="font-space font-extrabold text-2xl sm:text-3xl text-[#0B192C]">
                    {participant?.name || currentMember?.fullName || 'Participant'}
                  </h1>
                  <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> GOOGLE AUTH VERIFIED
                  </span>
                </div>
                <p className="text-xs font-mono text-[#1D4ED8] font-bold">{participant?.email}</p>
                <div className="text-[11px] text-slate-500 font-mono">
                  Participant Account ID: <span className="font-bold text-slate-800">{participant?.id || 'PARTICIPANT-MEMBER'}</span>
                </div>
              </div>
            </div>

            {userTeam && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1 text-center shrink-0">
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">TEAM CODE</div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-extrabold text-base text-[#1D4ED8] bg-blue-100 px-3 py-1 rounded-xl border border-blue-300">
                    {userTeam.teamCode || 'PRG-7X9K2'}
                  </span>
                  <button
                    onClick={() => handleCopyCode(userTeam.teamCode || 'PRG-7X9K2')}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 shadow-sm transition"
                    title="Copy Code"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* USER & ACADEMIC DETAILS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <User className="w-4 h-4 text-blue-600" /> PERSONAL INFORMATION
              </h3>
              
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-blue-600" /> Full Name:</span>
                  <span className="font-bold text-[#0B192C]">{currentMember?.fullName || participant?.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-blue-600" /> Email Address:</span>
                  <span className="font-mono font-bold text-[#1D4ED8]">{participant?.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-blue-600" /> Phone Number:</span>
                  <span className="font-mono font-bold text-[#0B192C]">{currentMember?.phone || '+91 98765 43210'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-mono font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-blue-600" /> ACADEMIC & INSTITUTION
              </h3>
              
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-blue-600" /> University / College:</span>
                  <span className="font-bold text-[#0B192C] truncate max-w-[200px]">{currentMember?.college || 'Sanjivani University'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-blue-600" /> Degree & Branch:</span>
                  <span className="font-bold text-[#0B192C]">{currentMember?.course || 'B.Tech Computer Science'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-blue-600" /> Year of Study:</span>
                  <span className="font-mono font-bold text-[#0B192C]">{currentMember?.year || 'Final Year'}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* TEAM & REGISTRATION PROFILE CARD */}
        {userTeam && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="font-space font-extrabold text-xl text-[#0B192C] uppercase flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-600" />
                <span>MY HACKATHON TEAM DETAILS</span>
              </h2>

              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase ${
                userTeam.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                userTeam.status === 'REJECTED' ? 'bg-red-100 text-red-800 border border-red-300' :
                'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                REGISTRATION: {userTeam.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                <div className="text-slate-400 font-bold uppercase text-[10px]">TEAM NAME</div>
                <div className="font-space font-extrabold text-base text-[#0B192C]">{userTeam.teamName}</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                <div className="text-slate-400 font-bold uppercase text-[10px]">REGISTERED TRACK</div>
                <div className="font-bold text-[#1D4ED8] truncate">{userTeam.trackTitle}</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                <div className="text-slate-400 font-bold uppercase text-[10px]">PROJECT SUBMISSION</div>
                <div className={`font-bold ${userTeam.submission ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {userTeam.submission ? '✓ SUBMITTED' : 'PENDING UPLOAD'}
                </div>
              </div>
            </div>

            {/* TEAM ROSTER */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono font-extrabold text-slate-400 uppercase tracking-widest">
                TEAM ROSTER ({userTeam.members.length} MEMBERS)
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userTeam.members.map((mem, idx) => (
                  <div key={mem.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-space font-bold text-[#0B192C] text-sm">{mem.fullName}</span>
                        {mem.isLeader && (
                          <span className="bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold flex items-center gap-0.5">
                            <Crown className="w-3 h-3 text-amber-600" /> LEADER
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-blue-600 font-mono">{mem.email}</div>
                      <div className="text-[10px] text-slate-500">{mem.course} • {mem.college}</div>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">MEM {idx + 1}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

    </div>
  );
};

export default ParticipantProfile;
