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
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import type { Team } from '../../types/admin';

import { RedesignedNavbar } from '../../components/sections/redesign/RedesignedNavbar';

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
    <div className="min-h-screen bg-[#F9F4EA] text-[#050C0C] font-sans selection:bg-[#162E28] selection:text-[#E5BE61] pt-32 pb-16">
      <RedesignedNavbar />

      {/* PROFILE CONTENT */}
      <main className="max-w-4xl mx-auto p-4 sm:p-8 space-y-8 text-left">
        
        {/* Back Link */}
        <div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F3EDE0] border border-[#D2CAB6] text-xs font-mono font-bold text-[#162E28] hover:border-[#A77A1C] shadow-sm transition"
          >
            <ArrowLeft className="w-4 h-4 text-[#A77A1C]" /> ← Back to Participant Dashboard
          </Link>
        </div>

        {/* HEADER HERO CARD */}
        <div className="bg-[#F3EDE0] border border-[#D2CAB6] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#D2CAB6]">
            <div className="flex items-center gap-4">
              <img
                src={participant?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt={participant?.name || 'User'}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-[#A77A1C] object-cover shadow-md"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-serif font-black text-2xl sm:text-3xl text-[#162E28]">
                    {participant?.name || currentMember?.fullName || 'Participant'}
                  </h1>
                  <span className="bg-[#E9E1D2] text-[#A77A1C] border border-[#A77A1C]/40 px-3 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#A77A1C]" /> GOOGLE AUTH VERIFIED
                  </span>
                </div>
                <p className="text-xs font-mono text-[#A77A1C] font-bold">{participant?.email}</p>
                <div className="text-[11px] text-[#7B8379] font-mono">
                  Participant Account ID: <span className="font-bold text-[#162E28]">{participant?.id || 'PARTICIPANT-MEMBER'}</span>
                </div>
              </div>
            </div>

            {userTeam && (
              <div className="bg-[#F9F4EA] p-4 rounded-2xl border border-[#D2CAB6] space-y-1 text-center shrink-0">
                <div className="text-[10px] font-mono font-bold text-[#7B8379] uppercase">TEAM CODE</div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-extrabold text-base text-[#162E28] bg-[#E9E1D2] px-3 py-1 rounded-xl border border-[#A77A1C]/40">
                    {userTeam.teamCode || 'PRG-7X9K2'}
                  </span>
                  <button
                    onClick={() => handleCopyCode(userTeam.teamCode || 'PRG-7X9K2')}
                    className="p-2 rounded-xl bg-[#162E28] text-[#E5BE61] border border-[#A77A1C]/40 hover:bg-[#2B3E35] shadow-sm transition"
                    title="Copy Code"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#E5BE61]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* USER & ACADEMIC DETAILS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-extrabold text-[#A77A1C] uppercase tracking-widest flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#A77A1C]" /> PERSONAL INFORMATION
              </h3>
              
              <div className="bg-[#F9F4EA] p-5 rounded-2xl border border-[#D2CAB6] space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#7B8379] flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-[#A77A1C]" /> Full Name:</span>
                  <span className="font-serif font-bold text-[#162E28]">{currentMember?.fullName || participant?.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#7B8379] flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#A77A1C]" /> Email Address:</span>
                  <span className="font-mono font-bold text-[#A77A1C]">{participant?.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#7B8379] flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#A77A1C]" /> Phone Number:</span>
                  <span className="font-mono font-bold text-[#162E28]">{currentMember?.phone || '+91 98765 43210'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-mono font-extrabold text-[#A77A1C] uppercase tracking-widest flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#A77A1C]" /> ACADEMIC & INSTITUTION
              </h3>
              
              <div className="bg-[#F9F4EA] p-5 rounded-2xl border border-[#D2CAB6] space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#7B8379] flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-[#A77A1C]" /> University / College:</span>
                  <span className="font-serif font-bold text-[#162E28] truncate max-w-[200px]">{currentMember?.college || 'Sanjivani University'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#7B8379] flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-[#A77A1C]" /> Degree & Branch:</span>
                  <span className="font-serif font-bold text-[#162E28]">{currentMember?.course || 'B.Tech Computer Science'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#7B8379] flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-[#A77A1C]" /> Year of Study:</span>
                  <span className="font-mono font-bold text-[#162E28]">{currentMember?.year || 'Final Year'}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* TEAM & REGISTRATION PROFILE CARD */}
        {userTeam && (
          <div className="bg-[#F3EDE0] border border-[#D2CAB6] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#D2CAB6] pb-4">
              <h2 className="font-serif font-black text-xl text-[#162E28] uppercase flex items-center gap-2">
                <Users className="w-6 h-6 text-[#A77A1C]" />
                <span>MY HACKATHON TEAM DETAILS</span>
              </h2>

              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase ${
                userTeam.status === 'APPROVED' ? 'bg-[#162E28] text-[#E5BE61] border border-[#A77A1C]' :
                userTeam.status === 'REJECTED' ? 'bg-red-100 text-red-800 border border-red-300' :
                'bg-[#E9E1D2] text-[#A77A1C] border border-[#A77A1C]/50'
              }`}>
                REGISTRATION: {userTeam.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="bg-[#F9F4EA] p-4 rounded-2xl border border-[#D2CAB6] space-y-1">
                <div className="text-[#7B8379] font-bold uppercase text-[10px]">TEAM NAME</div>
                <div className="font-serif font-extrabold text-base text-[#162E28]">{userTeam.teamName}</div>
              </div>

              <div className="bg-[#F9F4EA] p-4 rounded-2xl border border-[#D2CAB6] space-y-1">
                <div className="text-[#7B8379] font-bold uppercase text-[10px]">REGISTERED TRACK</div>
                <div className="font-serif font-bold text-[#A77A1C] truncate">{userTeam.trackTitle}</div>
              </div>

              <div className="bg-[#F9F4EA] p-4 rounded-2xl border border-[#D2CAB6] space-y-1">
                <div className="text-[#7B8379] font-bold uppercase text-[10px]">SUBMISSION STATUS</div>
                <div className={`font-bold ${
                  userTeam.submission?.status === 'SHORTLISTED' ? 'text-[#162E28]' :
                  userTeam.submission?.status === 'REVIEWED' ? 'text-[#A77A1C]' :
                  userTeam.submission ? 'text-[#162E28]' : 'text-[#7B8379]'
                }`}>
                  {userTeam.submission ? userTeam.submission.status.replace('_', ' ') : 'PENDING UPLOAD'}
                </div>
              </div>
            </div>

            {/* JUDGING EVALUATION REMARKS */}
            {userTeam.submission?.adminNotes && (
              <div className="bg-[#E9E1D2] border border-[#A77A1C]/50 p-4 rounded-2xl space-y-2 text-left">
                <div className="text-xs font-mono font-bold text-[#162E28] uppercase">
                  OFFICIAL JUDGING REMARKS & FEEDBACK
                </div>
                <p className="text-xs text-[#7B8379] bg-[#F9F4EA] p-3 rounded-xl border border-[#D2CAB6] font-medium">
                  "{userTeam.submission.adminNotes}"
                </p>
              </div>
            )}

            {/* TEAM ROSTER */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono font-extrabold text-[#A77A1C] uppercase tracking-widest">
                TEAM ROSTER ({userTeam.members.length} MEMBERS)
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userTeam.members.map((mem, idx) => (
                  <div key={mem.id} className="p-4 rounded-2xl bg-[#F9F4EA] border border-[#D2CAB6] flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-[#162E28] text-sm">{mem.fullName}</span>
                        {mem.isLeader && (
                          <span className="bg-[#E9E1D2] text-[#A77A1C] border border-[#A77A1C]/40 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold flex items-center gap-0.5">
                            <Crown className="w-3 h-3 text-[#A77A1C]" /> LEADER
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#A77A1C] font-mono">{mem.email}</div>
                      <div className="text-[10px] text-[#7B8379]">{mem.course} • {mem.college}</div>
                    </div>
                    <div className="text-[10px] font-mono text-[#A77A1C]/60 font-bold">MEM {idx + 1}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        <div className="pt-4 border-t border-[#D2CAB6] flex justify-end">
          <button
            onClick={handleLogout}
            className="px-6 py-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 hover:bg-red-700 hover:text-white font-mono font-bold text-xs flex items-center gap-2 transition shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>SIGN OUT ACCOUNT</span>
          </button>
        </div>
      </main>

    </div>
  );
};

export default ParticipantProfile;
