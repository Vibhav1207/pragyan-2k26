import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Crown, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle, 
  UserPlus, 
  CreditCard,
  Copy,
  Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import type { TeamMember } from '../../types/admin';

import { RedesignedNavbar } from '../../components/sections/redesign/RedesignedNavbar';

export const TeamRegistration: React.FC = () => {
  const { participant, updateParticipantTeam } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const syncAndCheck = async () => {
      const teams = await apiService.fetchTeamsAsync();
      if (isMounted && participant) {
        const existingTeam = teams.find(t => 
          (participant.teamId && t.teamId === participant.teamId) ||
          t.leader?.email?.toLowerCase() === participant.email?.toLowerCase() ||
          t.members?.some(m => m.email?.toLowerCase() === participant.email?.toLowerCase())
        );
        if (existingTeam) {
          navigate('/dashboard');
        }
      }
    };
    syncAndCheck();
    return () => { isMounted = false; };
  }, [participant, navigate]);
  
  const tracks = apiService.getTracks().filter(t => t.isActive);
  const systemSettings = apiService.getSettings();

  const [regMode, setRegMode] = useState<'CREATE' | 'JOIN'>('CREATE');
  const [createSubMode, setCreateSubMode] = useState<'LEADER_ONLY' | 'FULL_ROSTER'>('LEADER_ONLY');
  const [step, setStep] = useState<1 | 2>(1);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Payment Modal State
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [pendingTeamCode, setPendingTeamCode] = useState<string | null>(null);

  // Copy State
  const [copied, setCopied] = useState(false);

  // Join Form State
  const [joinTeamCode, setJoinTeamCode] = useState('');
  const [joinMember, setJoinMember] = useState<TeamMember>({
    id: `MEM-${Date.now()}`,
    fullName: participant?.name || '',
    email: participant?.email || '',
    phone: '',
    college: 'Sanjivani University',
    course: 'B.Tech Computer Science',
    year: '3rd Year',
    isLeader: false
  });

  // Create Form State
  const [teamName, setTeamName] = useState('');
  const [trackId, setTrackId] = useState(tracks[0]?.id || 'TRK-01');
  const [college, setCollege] = useState('Sanjivani University');

  // Member 1 (Leader)
  const [leader, setLeader] = useState<TeamMember>({
    id: 'MEM-LDR',
    fullName: participant?.name || '',
    email: participant?.email || '',
    phone: '',
    college: 'Sanjivani University',
    course: 'B.Tech Computer Science',
    year: 'Final Year',
    isLeader: true
  });

  // Member 2
  const [m2, setM2] = useState<TeamMember>({
    id: 'MEM-02',
    fullName: '',
    email: '',
    phone: '',
    college: 'Sanjivani University',
    course: 'MBA Financial Management',
    year: 'Final Year',
    isLeader: false
  });

  // Member 3
  const [m3, setM3] = useState<TeamMember>({
    id: 'MEM-03',
    fullName: '',
    email: '',
    phone: '',
    college: 'Sanjivani University',
    course: 'B.Com Accounting',
    year: '3rd Year',
    isLeader: false
  });

  // Member 4
  const [m4, setM4] = useState<TeamMember>({
    id: 'MEM-04',
    fullName: '',
    email: '',
    phone: '',
    college: 'Sanjivani University',
    course: 'BBA Finance',
    year: '2nd Year',
    isLeader: false
  });

  const selectedTrackObj = tracks.find(t => t.id === trackId) || tracks[0];

  // Handle Join Team by Code
  const handleJoinTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!joinTeamCode.trim()) {
      setErrorMsg('Please enter a valid Team Code (e.g. PRG-7X9K2).');
      return;
    }

    const res = await apiService.joinTeamByCode(joinTeamCode, joinMember);
    if (!res.success) {
      setErrorMsg(res.error || 'Failed to join team.');
      return;
    }

    if (res.team) {
      updateParticipantTeam(res.team.teamId);
    }

    alert(`🎉 Successfully joined Team "${res.team?.teamName}"! Welcome aboard.`);
    navigate('/dashboard');
  };

  // Handle Create Team Submission
  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!systemSettings.registrationOpen) {
      setErrorMsg('Registration is currently closed by administration.');
      return;
    }

    if (!teamName.trim()) {
      setErrorMsg('Please enter your Team Name.');
      return;
    }

    const membersList = createSubMode === 'FULL_ROSTER'
      ? [leader, m2, m3, m4]
      : [leader];

    const created = await apiService.createTeam({
      teamName,
      trackId,
      trackTitle: selectedTrackObj.title,
      college,
      leader,
      members: membersList
    });

    updateParticipantTeam(created.teamId);

    setPendingTeamCode(created.teamCode || created.teamId);
    setPaymentModalOpen(true);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F9F4EA] text-[#050C0C] pt-32 pb-16 px-4 sm:px-8 font-sans selection:bg-[#162E28] selection:text-[#E5BE61]">
      <RedesignedNavbar />
      
      <div className="max-w-4xl mx-auto space-y-8 text-left">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-block p-3.5 bg-[#F9F4EA] rounded-2xl shadow-sm border border-[#A77A1C]/40 hover:scale-105 transition">
            <img src="/pragyan-logo.png" alt="PRAGYAN 2K26 Logo" className="h-12 w-auto object-contain" />
          </Link>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E9E1D2] border border-[#A77A1C]/40 text-[#A77A1C] font-mono text-[11px] font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A77A1C]" />
              <span>OFFICIAL REGISTRATION PORTAL</span>
            </div>
            <h1 className="font-serif font-black text-3xl sm:text-4xl text-[#162E28] uppercase tracking-tight">
              PRAGYAN <span className="italic font-normal text-[#A77A1C]">2K26</span> REGISTRATION
            </h1>
            <p className="text-xs text-[#7B8379] font-sans">
              Create a new team or join an existing team using your team code
            </p>
          </div>
        </div>

        {/* REGISTRATION CLOSED NOTICE */}
        {!systemSettings.registrationOpen && (
          <div className="p-4 rounded-2xl bg-[#E9E1D2] border border-[#A77A1C] text-[#162E28] text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0 text-[#A77A1C]" />
            <span>Registration is currently CLOSED by administrators. Please contact organizers for queries.</span>
          </div>
        )}

        {/* ERROR DISPLAY */}
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* MODE SELECTOR TABS */}
        <div className="bg-[#F3EDE0] border border-[#D2CAB6] p-2 rounded-2xl shadow-sm flex items-center gap-2">
          <button
            type="button"
            onClick={() => { setRegMode('CREATE'); setErrorMsg(null); }}
            className={`flex-1 py-3 px-4 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center gap-2 ${
              regMode === 'CREATE'
                ? 'bg-[#162E28] text-[#E5BE61] border border-[#A77A1C]/50 shadow-md'
                : 'text-[#7B8379] hover:bg-[#E9E1D2]'
            }`}
          >
            <Crown className="w-4 h-4 text-[#A77A1C]" /> CREATE NEW TEAM
          </button>
          
          <button
            type="button"
            onClick={() => { setRegMode('JOIN'); setErrorMsg(null); }}
            className={`flex-1 py-3 px-4 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center gap-2 ${
              regMode === 'JOIN'
                ? 'bg-[#162E28] text-[#E5BE61] border border-[#A77A1C]/50 shadow-md'
                : 'text-[#7B8379] hover:bg-[#E9E1D2]'
            }`}
          >
            <UserPlus className="w-4 h-4 text-[#A77A1C]" /> JOIN TEAM VIA CODE
          </button>
        </div>

        {/* MODE 1: JOIN EXISTING TEAM VIA TEAM CODE */}
        {regMode === 'JOIN' && (
          <form onSubmit={handleJoinTeam} className="bg-[#F3EDE0] border border-[#D2CAB6] p-8 rounded-3xl space-y-6 shadow-xl">
            <div className="border-b border-[#D2CAB6] pb-4">
              <h3 className="font-serif font-black text-xl text-[#162E28] uppercase flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#A77A1C]" />
                <span>JOIN AN EXISTING TEAM</span>
              </h3>
              <p className="text-xs text-[#7B8379]">Ask your Team Leader for the 6-character Team Code (e.g. PRG-7X9K2)</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-[#A77A1C] uppercase">Team Code *</label>
                <input
                  type="text"
                  required
                  value={joinTeamCode}
                  onChange={(e) => setJoinTeamCode(e.target.value.toUpperCase())}
                  placeholder="e.g. PRG-7X9K2"
                  className="w-full p-3.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-sm font-mono font-bold tracking-wider placeholder-[#7B8379]/60 focus:border-[#A77A1C] focus:outline-none transition uppercase"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#7B8379] uppercase">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={joinMember.fullName}
                    onChange={(e) => setJoinMember({ ...joinMember, fullName: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:border-[#A77A1C] focus:outline-none transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#7B8379] uppercase">Email *</label>
                  <input
                    type="email"
                    required
                    value={joinMember.email}
                    onChange={(e) => setJoinMember({ ...joinMember, email: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:border-[#A77A1C] focus:outline-none transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#7B8379] uppercase">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={joinMember.phone}
                    onChange={(e) => setJoinMember({ ...joinMember, phone: e.target.value })}
                    placeholder="+91 98234 11223"
                    className="w-full p-3 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs font-mono focus:border-[#A77A1C] focus:outline-none transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#7B8379] uppercase">Course / Degree *</label>
                  <input
                    type="text"
                    required
                    value={joinMember.course}
                    onChange={(e) => setJoinMember({ ...joinMember, course: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:border-[#A77A1C] focus:outline-none transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#7B8379] uppercase">Year of Study *</label>
                  <select
                    value={joinMember.year}
                    onChange={(e) => setJoinMember({ ...joinMember, year: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs font-mono focus:border-[#A77A1C] focus:outline-none transition"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="Final Year">Final Year / Postgraduate</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#7B8379] uppercase">College / University</label>
                  <input
                    type="text"
                    required
                    value={joinMember.college}
                    onChange={(e) => setJoinMember({ ...joinMember, college: e.target.value })}
                    className="w-full p-3 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:border-[#A77A1C] focus:outline-none transition"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#F9F4EA] border border-[#A77A1C]/60 font-mono font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition"
              >
                <CheckCircle2 className="w-5 h-5 text-[#E5BE61]" />
                <span>JOIN TEAM NOW</span>
              </button>
            </div>
          </form>
        )}

        {/* MODE 2: CREATE A NEW TEAM */}
        {regMode === 'CREATE' && (
          <form onSubmit={step === 1 ? (e) => { e.preventDefault(); setStep(2); } : handleSubmitRegistration} className="bg-[#F3EDE0] border border-[#D2CAB6] p-8 rounded-3xl space-y-8 shadow-xl">
            
            {/* SUB-MODE SUB-HEADER */}
            <div className="flex items-center justify-between border-b border-[#D2CAB6] pb-4">
              <div>
                <h3 className="font-serif font-black text-xl text-[#162E28] uppercase flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#A77A1C]" />
                  <span>CREATE NEW TEAM</span>
                </h3>
                <p className="text-xs text-[#7B8379]">Register as Team Leader or enter full 4-member roster directly</p>
              </div>

              <div className="flex items-center bg-[#E9E1D2] p-1 rounded-xl border border-[#D2CAB6] text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setCreateSubMode('LEADER_ONLY')}
                  className={`px-3.5 py-1.5 rounded-lg font-bold transition ${createSubMode === 'LEADER_ONLY' ? 'bg-[#162E28] text-[#E5BE61] shadow-sm' : 'text-[#7B8379]'}`}
                >
                  Leader Only (+ Share Code)
                </button>
                <button
                  type="button"
                  onClick={() => setCreateSubMode('FULL_ROSTER')}
                  className={`px-3.5 py-1.5 rounded-lg font-bold transition ${createSubMode === 'FULL_ROSTER' ? 'bg-[#162E28] text-[#E5BE61] shadow-sm' : 'text-[#7B8379]'}`}
                >
                  Full 4-Member Roster
                </button>
              </div>
            </div>

            {step === 1 ? (
              <>
                {/* SECTION 1: TEAM & TRACK DETAILS */}
                <div className="space-y-4 border-b border-[#D2CAB6] pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-[#A77A1C] uppercase">Team Name *</label>
                      <input
                        type="text"
                        required
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="e.g. FinTech Innovators"
                        className="w-full p-3 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:border-[#A77A1C] focus:outline-none transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-[#A77A1C] uppercase">College / University *</label>
                      <input
                        type="text"
                        required
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        placeholder="e.g. Sanjivani University"
                        className="w-full p-3 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:border-[#A77A1C] focus:outline-none transition"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-1">
                      <label className="text-xs font-mono font-bold text-[#A77A1C] uppercase">Select Innovation Track *</label>
                      <select
                        value={trackId}
                        onChange={(e) => setTrackId(e.target.value)}
                        className="w-full p-3 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs font-mono focus:border-[#A77A1C] focus:outline-none transition"
                      >
                        {tracks.map(tr => (
                          <option key={tr.id} value={tr.id}>{tr.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: TEAM LEADER (MEMBER 1) */}
                <div className="space-y-4 border-b border-[#D2CAB6] pb-6">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-[#A77A1C]" />
                    <h3 className="font-serif font-black text-lg text-[#162E28] uppercase">
                      TEAM LEADER (MEMBER 1)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-[#7B8379] uppercase">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={leader.fullName}
                        onChange={(e) => setLeader({ ...leader, fullName: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:border-[#A77A1C] focus:outline-none transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-[#7B8379] uppercase">Email *</label>
                      <input
                        type="email"
                        required
                        value={leader.email}
                        onChange={(e) => setLeader({ ...leader, email: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:border-[#A77A1C] focus:outline-none transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-[#7B8379] uppercase">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={leader.phone}
                        onChange={(e) => setLeader({ ...leader, phone: e.target.value })}
                        placeholder="+91 98234 11223"
                        className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs font-mono focus:border-[#A77A1C] focus:outline-none transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-[#7B8379] uppercase">Course / Degree *</label>
                      <input
                        type="text"
                        required
                        value={leader.course}
                        onChange={(e) => setLeader({ ...leader, course: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:border-[#A77A1C] focus:outline-none transition"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-[#7B8379] uppercase">Year of Study *</label>
                      <select
                        value={leader.year}
                        onChange={(e) => setLeader({ ...leader, year: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs font-mono focus:border-[#A77A1C] focus:outline-none transition"
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="Final Year">Final Year / Postgraduate</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono font-bold text-[#7B8379] uppercase">College</label>
                      <input
                        type="text"
                        required
                        value={leader.college}
                        onChange={(e) => setLeader({ ...leader, college: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs focus:border-[#A77A1C] focus:outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 3: MEMBERS 2, 3, 4 IF FULL ROSTER MODE */}
                {createSubMode === 'FULL_ROSTER' && (
                  <div className="space-y-6">
                    <h3 className="font-serif font-black text-lg text-[#162E28] uppercase flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#A77A1C]" />
                      <span>TEAM MEMBERS 2, 3 & 4</span>
                    </h3>

                    {/* MEMBER 2 */}
                    <div className="p-4 rounded-2xl bg-[#F9F4EA] border border-[#D2CAB6] space-y-3">
                      <div className="font-mono text-xs font-bold text-[#A77A1C]">MEMBER 2 DETAILS</div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input type="text" required placeholder="Full Name" value={m2.fullName} onChange={e => setM2({...m2, fullName: e.target.value})} className="p-2.5 rounded-xl bg-[#F3EDE0] border border-[#D2CAB6] text-xs text-[#162E28]" />
                        <input type="email" required placeholder="Email" value={m2.email} onChange={e => setM2({...m2, email: e.target.value})} className="p-2.5 rounded-xl bg-[#F3EDE0] border border-[#D2CAB6] text-xs text-[#162E28]" />
                        <input type="tel" required placeholder="Phone" value={m2.phone} onChange={e => setM2({...m2, phone: e.target.value})} className="p-2.5 rounded-xl bg-[#F3EDE0] border border-[#D2CAB6] text-xs text-[#162E28] font-mono" />
                        <input type="text" required placeholder="Course" value={m2.course} onChange={e => setM2({...m2, course: e.target.value})} className="p-2.5 rounded-xl bg-[#F3EDE0] border border-[#D2CAB6] text-xs text-[#162E28]" />
                        <input type="text" required placeholder="Year" value={m2.year} onChange={e => setM2({...m2, year: e.target.value})} className="p-2.5 rounded-xl bg-[#F3EDE0] border border-[#D2CAB6] text-xs text-[#162E28] font-mono" />
                        <input type="text" required placeholder="College" value={m2.college} onChange={e => setM2({...m2, college: e.target.value})} className="p-2.5 rounded-xl bg-[#F3EDE0] border border-[#D2CAB6] text-xs text-[#162E28]" />
                      </div>
                    </div>

                    {/* MEMBER 3 */}
                    <div className="p-4 rounded-2xl bg-[#F9F4EA] border border-[#D2CAB6] space-y-3">
                      <div className="font-mono text-xs font-bold text-[#A77A1C]">MEMBER 3 DETAILS</div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input type="text" required placeholder="Full Name" value={m3.fullName} onChange={e => setM3({...m3, fullName: e.target.value})} className="p-2.5 rounded-xl bg-[#F3EDE0] border border-[#D2CAB6] text-xs text-[#162E28]" />
                        <input type="email" required placeholder="Email" value={m3.email} onChange={e => setM3({...m3, email: e.target.value})} className="p-2.5 rounded-xl bg-[#F3EDE0] border border-[#D2CAB6] text-xs text-[#162E28]" />
                        <input type="tel" required placeholder="Phone" value={m3.phone} onChange={e => setM3({...m3, phone: e.target.value})} className="p-2.5 rounded-xl bg-[#F3EDE0] border border-[#D2CAB6] text-xs text-[#162E28] font-mono" />
                        <input type="text" required placeholder="Course" value={m3.course} onChange={e => setM3({...m3, course: e.target.value})} className="p-2.5 rounded-xl bg-[#F3EDE0] border border-[#D2CAB6] text-xs text-[#162E28]" />
                        <input type="text" required placeholder="Year" value={m3.year} onChange={e => setM3({...m3, year: e.target.value})} className="p-2.5 rounded-xl bg-[#F3EDE0] border border-[#D2CAB6] text-xs text-[#162E28] font-mono" />
                        <input type="text" required placeholder="College" value={m3.college} onChange={e => setM3({...m3, college: e.target.value})} className="p-2.5 rounded-xl bg-[#F3EDE0] border border-[#D2CAB6] text-xs text-[#162E28]" />
                      </div>
                    </div>

                    {/* MEMBER 4 */}
                    <div className="p-4 rounded-2xl bg-[#F9F4EA] border border-[#D2CAB6] space-y-3">
                      <div className="font-mono text-xs font-bold text-[#A77A1C]">MEMBER 4 DETAILS</div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input type="text" required placeholder="Full Name" value={m4.fullName} onChange={e => setM4({...m4, fullName: e.target.value})} className="p-2.5 rounded-xl bg-[#F3EDE0] border border-[#D2CAB6] text-xs text-[#162E28]" />
                        <input type="email" required placeholder="Email" value={m4.email} onChange={e => setM4({...m4, email: e.target.value})} className="p-2.5 rounded-xl bg-[#F3EDE0] border border-[#D2CAB6] text-xs text-[#162E28]" />
                        <input type="tel" required placeholder="Phone" value={m4.phone} onChange={e => setM4({...m4, phone: e.target.value})} className="p-2.5 rounded-xl bg-[#F3EDE0] border border-[#D2CAB6] text-xs text-[#162E28] font-mono" />
                        <input type="text" required placeholder="Course" value={m4.course} onChange={e => setM4({...m4, course: e.target.value})} className="p-2.5 rounded-xl bg-[#F3EDE0] border border-[#D2CAB6] text-xs text-[#162E28]" />
                        <input type="text" required placeholder="Year" value={m4.year} onChange={e => setM4({...m4, year: e.target.value})} className="p-2.5 rounded-xl bg-[#F3EDE0] border border-[#D2CAB6] text-xs text-[#162E28] font-mono" />
                        <input type="text" required placeholder="College" value={m4.college} onChange={e => setM4({...m4, college: e.target.value})} className="p-2.5 rounded-xl bg-[#F3EDE0] border border-[#D2CAB6] text-xs text-[#162E28]" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#F9F4EA] border border-[#A77A1C]/60 font-mono font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition"
                  >
                    <span>REVIEW REGISTRATION SUMMARY</span>
                    <ArrowRight className="w-4 h-4 text-[#E5BE61]" />
                  </button>
                </div>
              </>
            ) : (
              /* STEP 2: SUMMARY REVIEW */
              <div className="space-y-6">
                <div className="border-b border-[#D2CAB6] pb-4">
                  <h3 className="font-serif font-black text-xl text-[#162E28] uppercase">REVIEW REGISTRATION DETAILS</h3>
                  <p className="text-xs text-[#7B8379]">Confirm details before submitting your team registration</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#F9F4EA] border border-[#D2CAB6] space-y-2 text-xs font-mono text-[#162E28]">
                  <div><span className="text-[#7B8379]">Team Name:</span> <strong className="text-[#162E28]">{teamName}</strong></div>
                  <div><span className="text-[#7B8379]">College:</span> <strong className="text-[#162E28]">{college}</strong></div>
                  <div><span className="text-[#7B8379]">Track:</span> <strong className="text-[#A77A1C]">{selectedTrackObj.title}</strong></div>
                  <div><span className="text-[#7B8379]">Roster Mode:</span> <strong className="text-[#162E28]">{createSubMode === 'FULL_ROSTER' ? '4 Verified Members' : 'Leader Created (+ Team Join Code Auto-Generated)'}</strong></div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#D2CAB6]">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl bg-[#E9E1D2] text-[#162E28] text-xs font-mono font-bold hover:bg-[#D2CAB6]"
                  >
                    ← EDIT DETAILS
                  </button>

                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#F9F4EA] border border-[#A77A1C]/60 font-mono font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#E5BE61]" />
                    <span>SUBMIT FINAL REGISTRATION</span>
                  </button>
                </div>
              </div>
            )}

          </form>
        )}

      </div>

      {/* PAYMENT & TEAM CODE SUCCESS MODAL */}
      {paymentModalOpen && (
        <div className="fixed inset-0 bg-[#050C0C]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#F9F4EA] border border-[#A77A1C] rounded-3xl p-8 max-w-md w-full space-y-6 text-left shadow-2xl text-[#050C0C] max-h-[90vh] overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#E9E1D2] border border-[#A77A1C] text-[#A77A1C] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7 text-[#A77A1C]" />
              </div>
              <h3 className="font-serif font-black text-xl text-[#162E28] uppercase">TEAM CREATED SUCCESSFULLY!</h3>
              <p className="text-xs text-[#7B8379]">Your team registration has been recorded successfully.</p>
            </div>

            {/* TEAM JOIN CODE DISPLAY */}
            {pendingTeamCode && (
              <div className="p-4 rounded-2xl bg-[#F3EDE0] border border-[#A77A1C]/60 space-y-2 text-center">
                <div className="text-xs font-mono font-bold text-[#A77A1C] uppercase">YOUR TEAM JOIN CODE</div>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-mono font-black text-2xl text-[#162E28] tracking-wider bg-[#F9F4EA] px-4 py-1.5 rounded-xl border border-[#D2CAB6] shadow-inner">
                    {pendingTeamCode}
                  </span>
                  <button
                    onClick={() => handleCopyCode(pendingTeamCode)}
                    className="p-2.5 rounded-xl bg-[#162E28] text-[#E5BE61] hover:bg-[#2B3E35] transition border border-[#A77A1C]/40"
                    title="Copy Team Code"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-[#7B8379]">Share this 6-character code with your teammates so they can join your team roster.</p>
              </div>
            )}

            {/* PAYMENT NOTICE BOX */}
            <div className="p-4 rounded-2xl bg-[#F3EDE0] border border-[#D2CAB6] space-y-2 text-xs">
              <div className="font-mono font-bold text-[#162E28] flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-[#A77A1C]" /> REGISTRATION & PAYMENT STATUS:
              </div>
              <p className="text-[#7B8379] leading-relaxed font-sans text-[11px]">
                Registration slot is <strong>reserved & active</strong>. Payment verification stage is optional for today.
              </p>
            </div>

            <button
              onClick={() => {
                setPaymentModalOpen(false);
                navigate('/dashboard');
              }}
              className="w-full py-3.5 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#F9F4EA] border border-[#A77A1C]/60 font-mono font-extrabold text-xs uppercase tracking-wider shadow-md transition"
            >
              GO TO PARTICIPANT DASHBOARD
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default TeamRegistration;
