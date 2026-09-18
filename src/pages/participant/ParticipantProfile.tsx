import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  ShieldCheck, 
  ArrowLeft, 
  LogOut,
  ExternalLink,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { RedesignedNavbar } from '../../components/sections/redesign/RedesignedNavbar';

export const ParticipantProfile: React.FC = () => {
  const { participant, logoutParticipant } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutParticipant();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F9F4EA] text-[#050C0C] font-sans selection:bg-[#162E28] selection:text-[#E5BE61] pt-32 pb-16">
      <RedesignedNavbar />

      <main className="max-w-4xl mx-auto p-4 sm:p-8 space-y-8 text-left">

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F3EDE0] border border-[#D2CAB6] text-xs font-mono font-bold text-[#162E28] hover:border-[#A77A1C] shadow-sm transition"
          >
            <ArrowLeft className="w-4 h-4 text-[#A77A1C]" /> ← Back to Home
          </Link>

          <a
            href="https://ums.sanjivani.edu.in//EventRegistration/4DE84D28-1D8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#A77A1C] hover:bg-[#8F6716] text-[#F9F4EA] text-xs font-mono font-extrabold uppercase shadow-md hover:shadow-lg transition"
          >
            <span>REGISTER ON SANJIVANI UMS</span>
            <ExternalLink className="w-4 h-4" />
          </a>
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

            <div className="bg-[#162E28] text-[#F9F4EA] p-4 rounded-2xl border border-[#A77A1C]/50 space-y-1 text-center shrink-0">
              <div className="text-[10px] font-mono font-bold text-[#E5BE61] uppercase">ACCOUNT STATUS</div>
              <div className="font-mono font-bold text-xs text-[#F9F4EA] flex items-center gap-1.5 justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>ACTIVE DELEGATE</span>
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

          <div className="p-5 sm:p-6 rounded-2xl bg-[#E9E1D2] border border-[#A77A1C]/50 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#A77A1C]/30 pb-3">
              <div className="space-y-0.5">
                <div className="text-xs font-mono font-extrabold text-[#162E28] uppercase tracking-wider flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#A77A1C]" />
                  <span>SANJIVANI UNIVERSITY OFFICIAL EVENT REGISTRATION</span>
                </div>
                <p className="text-xs text-[#7B8379]">
                  Official event registrations and delegate passes are processed through Sanjivani UMS Portal.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
              <p className="text-xs text-[#162E28] font-sans">
                If you haven't completed your event registration, please complete it on the official University portal.
              </p>
              <a
                href="https://ums.sanjivani.edu.in//EventRegistration/4DE84D28-1D8"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] font-mono font-bold text-xs uppercase border border-[#A77A1C] transition shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2 shrink-0"
              >
                <span>OPEN REGISTRATION</span>
                <ExternalLink className="w-4 h-4" />
              </a>
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
      </main>

    </div>
  );
};

export default ParticipantProfile;
