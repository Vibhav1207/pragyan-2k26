import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  ShieldCheck, 
  ArrowLeft, 
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { RedesignedNavbar } from '../../components/sections/redesign/RedesignedNavbar';

export const ParticipantProfile: React.FC = () => {
  const { participant, logoutParticipant } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutParticipant();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F9F4EA] text-[#050C0C] font-sans">
      <RedesignedNavbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-36 sm:pt-44 pb-20 space-y-8 text-left">
        
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F3EDE0] border border-[#D2CAB6] text-xs font-mono font-bold text-[#162E28] hover:border-[#A77A1C] shadow-sm transition"
          >
            <ArrowLeft className="w-4 h-4 text-[#A77A1C]" />
            <span>BACK TO HOME</span>
          </Link>
        </div>

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
                    {participant?.name || 'Participant Delegate'}
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
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-mono font-extrabold text-[#A77A1C] uppercase tracking-widest flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#A77A1C]" /> PERSONAL INFORMATION
            </h3>

            <div className="bg-[#F9F4EA] p-5 rounded-2xl border border-[#D2CAB6] space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#7B8379] flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-[#A77A1C]" /> Full Name:</span>
                <span className="font-serif font-bold text-[#162E28]">{participant?.name || 'Participant'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#7B8379] flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#A77A1C]" /> Email Address:</span>
                <span className="font-mono font-bold text-[#A77A1C]">{participant?.email}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-[#D2CAB6]/60">
                <span className="text-[#7B8379] flex items-center gap-1.5 font-bold"><ShieldCheck className="w-3.5 h-3.5 text-[#A77A1C]" /> Role:</span>
                <span className="font-mono font-bold text-[#162E28] bg-[#E9E1D2] px-2.5 py-0.5 rounded-lg border border-[#A77A1C]/40">
                  {participant?.role || 'PARTICIPANT'}
                </span>
              </div>
            </div>
          </div>

          {/* Hackathon Problem Statements Launch Card */}
          <div className="bg-gradient-to-br from-[#162E28] to-[#0A1613] text-[#F9F4EA] p-6 sm:p-7 rounded-2xl border-2 border-[#A77A1C]/50 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] font-bold text-[#E5BE61] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-[#E5BE61]/30">
                  NATIONAL HACKATHON LAUNCH
                </span>
                <h3 className="font-serif font-black text-xl sm:text-2xl text-[#E5BE61]">
                  Official Problem Statements
                </h3>
                <p className="text-xs text-[#D2CAB6] font-sans max-w-xl">
                  20 problem statements across 4 tracks are scheduled to unlock tomorrow at 12:00 PM IST (Oct 24, 2026) for all participating teams.
                </p>
              </div>

              <Link
                to="/problem-statements"
                className="px-5 py-2.5 rounded-xl bg-[#E5BE61] hover:bg-[#FACC15] text-[#162E28] font-mono text-xs font-black uppercase tracking-wider transition-transform hover:scale-105 shrink-0 shadow-lg text-center"
              >
                View Problem Statements →
              </Link>
            </div>
          </div>

        </div>

        <div className="pt-4 border-t border-[#D2CAB6] flex justify-end">
          <button
            onClick={handleLogout}
            className="px-6 py-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 hover:bg-red-700 hover:text-white font-mono font-bold text-xs flex items-center gap-2 transition shadow-sm cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>SIGN OUT ACCOUNT</span>
          </button>
        </div>

      </div>
    </div>
  );
};
