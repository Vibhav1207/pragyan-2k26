import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Upload, 
  Megaphone, 
  LogOut, 
  Crown, 
  CheckCircle2,
  Copy,
  Check,
  User,
  LayoutDashboard,
  Code2,
  ExternalLink,
  FileText,
  AlertCircle,
  ArrowRight,
  KeyRound,
  PlusCircle,
  Lock,
  MessageSquare,
  Clock,
  Award,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import type { Team, SubmissionFile, TeamMember } from '../../types/admin';

export const ParticipantDashboard: React.FC = () => {
  const { participant, logoutParticipant, updateParticipantTeam } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const [teams, setTeams] = useState<Team[]>(() => apiService.getTeams());
  const announcements = apiService.getAnnouncements().filter(a => a.status === 'PUBLISHED');

  // Find team where logged-in user is leader or member
  const userTeam = teams.find(t => 
    (participant?.teamId && t.teamId === participant.teamId) ||
    t.leader?.email?.toLowerCase() === participant?.email?.toLowerCase() ||
    t.members?.some(m => m.email?.toLowerCase() === participant?.email?.toLowerCase())
  );

  // Check if logged-in user is the Team Leader
  const isTeamLeader = Boolean(
    participant?.email &&
    userTeam?.leader?.email &&
    participant.email.toLowerCase() === userTeam.leader.email.toLowerCase()
  );

  // Create Team Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createTeamName, setCreateTeamName] = useState('');
  const [createCollege, setCreateCollege] = useState('Sanjivani University');
  const [createTrackId, setCreateTrackId] = useState('TRK-01');
  const [createPhone, setCreatePhone] = useState('');
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const tracksList = apiService.getTracks().filter(t => t.isActive);

  const handleCreateTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createTeamName.trim() || !createCollege.trim()) {
      alert('Please fill in Team Name and College Name.');
      return;
    }

    setIsCreatingTeam(true);
    const selectedTrackObj = tracksList.find(t => t.id === createTrackId) || tracksList[0];

    const leaderObj: TeamMember = {
      id: `MEM-LDR-${Date.now()}`,
      fullName: participant?.name || 'Team Leader',
      email: participant?.email || 'leader@gmail.com',
      phone: createPhone.trim() || '+91 98765 43210',
      college: createCollege.trim(),
      course: 'B.Tech Computer Science',
      year: 'Final Year',
      isLeader: true
    };

    const newTeam = await apiService.createTeam({
      teamName: createTeamName.trim(),
      trackId: selectedTrackObj ? selectedTrackObj.id : 'TRK-01',
      trackTitle: selectedTrackObj ? selectedTrackObj.title : 'FinTech & Digital Payments',
      college: createCollege.trim(),
      leader: leaderObj,
      members: [leaderObj]
    });

    updateParticipantTeam(newTeam.teamId);
    setTeams(apiService.getTeams());
    setIsCreatingTeam(false);
    setIsCreateModalOpen(false);
    alert(`🎉 Team "${newTeam.teamName}" created successfully! Your Team Code is: ${newTeam.teamCode}. Share this code with 3 members to complete your roster.`);
  };

  // Join Team State for unregistered users
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [joinError, setJoinError] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');
  const [description, setDescription] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // ₹500 Registration Payment State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [utrInput, setUtrInput] = useState('');
  const [paymentScreenshotFile, setPaymentScreenshotFile] = useState<File | null>(null);
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userTeam || !utrInput.trim() || !paymentScreenshotFile) {
      alert('Please enter a valid UTR Transaction ID and select your payment screenshot image.');
      return;
    }

    setIsSubmittingPayment(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      await apiService.submitTeamPayment(userTeam.teamId, utrInput.trim(), dataUrl, 500);
      setTeams(apiService.getTeams());
      setIsSubmittingPayment(false);
      setIsPaymentModalOpen(false);
      alert('🎉 ₹500 Payment proof submitted for verification! Your team status & project submission will be approved by admins within 24 hours.');
    };
    reader.readAsDataURL(paymentScreenshotFile);
  };

  const handleLogout = () => {
    logoutParticipant();
    navigate('/login');
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDashboardJoinTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCodeInput.trim()) return;

    setIsJoining(true);
    setJoinError('');

    const res = await apiService.joinTeamByCode(joinCodeInput.trim(), {
      id: `MEM-${Date.now()}`,
      fullName: participant?.name || 'Participant Member',
      email: participant?.email || 'member@gmail.com',
      phone: '+91 98765 43210',
      college: 'Sanjivani University',
      course: 'B.Tech Computer Science',
      year: 'Final Year',
      isLeader: false
    });

    if (res.success && res.team) {
      setTeams(apiService.getTeams());
      alert(`🎉 Successfully joined team "${res.team.teamName}"!`);
      setIsJoining(false);
    } else {
      setJoinError(res.error || 'Invalid Team Code. Please verify with your leader.');
      setIsJoining(false);
    }
  };

  const handleUploadSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userTeam) return;
    if (!isTeamLeader) {
      alert('Only the Team Leader is authorized to submit or update the project submission.');
      return;
    }

    setUploadProgress(10);

    const processAndSubmit = (fileObj?: SubmissionFile) => {
      const submissionFiles: SubmissionFile[] = fileObj ? [fileObj] : [];
      if (!fileObj && selectedFile) {
        submissionFiles.push({
          id: `FILE-${Date.now()}-1`,
          filename: selectedFile.name,
          fileType: selectedFile.type || 'application/octet-stream',
          fileSize: selectedFile.size,
          uploadDate: new Date().toISOString()
        });
      }

      apiService.submitProject(userTeam.teamId, {
        projectTitle,
        description,
        trackId: userTeam.trackId,
        trackTitle: userTeam.trackTitle,
        githubUrl,
        demoUrl,
        files: submissionFiles
      });

      setTeams(apiService.getTeams());
      setUploadProgress(100);
      setTimeout(() => {
        setUploadProgress(null);
        setIsSubmitModalOpen(false);
        alert('🎉 Project submission uploaded successfully!');
      }, 500);
    };

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const newFile: SubmissionFile = {
          id: `FILE-${Date.now()}-1`,
          filename: selectedFile.name,
          fileType: selectedFile.type || 'application/octet-stream',
          fileSize: selectedFile.size,
          uploadDate: new Date().toISOString(),
          url: dataUrl
        };
        processAndSubmit(newFile);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      processAndSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4FA] text-[#0B192C] font-sans selection:bg-[#1D4ED8] selection:text-white">
      
      {/* NAVBAR MATCHING MAIN WEBSITE BRANDING */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3 group">
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

            {/* Navigation Bar Links */}
            <nav className="hidden md:flex items-center gap-2">
              <Link
                to="/dashboard"
                className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold text-white bg-[#1D4ED8] shadow-md shadow-blue-600/20 flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-4 h-4 text-yellow-300" /> Dashboard
              </Link>
              <Link
                to="/profile"
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-[#1D4ED8] hover:bg-blue-50 transition flex items-center gap-1.5"
              >
                <User className="w-4 h-4 text-blue-600" /> My Profile
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
            <Link
              to="/profile"
              className="hidden sm:flex items-center gap-2.5 bg-slate-100 hover:bg-blue-50 px-3 py-1.5 rounded-2xl border border-slate-200 transition"
            >
              <img
                src={participant?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt={participant?.name || 'User'}
                className="w-7 h-7 rounded-full border border-blue-600 object-cover"
              />
              <div className="text-left leading-tight">
                <div className="text-xs font-bold text-[#0B192C]">{participant?.name || 'Participant'}</div>
                <div className="text-[10px] font-mono text-slate-500">{participant?.email}</div>
              </div>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-red-50 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>

        </div>
      </header>

      {/* DASHBOARD MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto p-4 sm:p-8 space-y-8 text-left">
        
        {/* CASE 1: PARTICIPANT HAS NOT REGISTERED OR JOINED A TEAM YET */}
        {!userTeam ? (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-white border border-slate-200 p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-sm relative overflow-hidden">
              
              <div className="w-16 h-16 bg-blue-50 text-[#1D4ED8] rounded-2xl flex items-center justify-center mx-auto border border-blue-200 shadow-sm">
                <Users className="w-8 h-8" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h2 className="font-space font-extrabold text-2xl sm:text-3xl text-[#0B192C]">
                  NO HACKATHON TEAM REGISTERED
                </h2>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  Welcome, <strong>{participant?.name || 'Participant'}</strong>! You are signed in via Google Auth, but you are not linked to a registered team yet.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto pt-4 text-left">
                
                {/* Option 1: Create New Team */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 hover:border-blue-300 transition flex flex-col justify-between shadow-sm">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-extrabold text-[#1D4ED8] uppercase bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-300">
                        OPTION 1
                      </span>
                      <PlusCircle className="w-5 h-5 text-[#1D4ED8]" />
                    </div>
                    <h3 className="font-space font-bold text-lg text-[#0B192C]">Create a New Team</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Register as Team Leader. Enter your college details and receive an instant 6-character Team Code (e.g. <strong>PRG-7X9K2</strong>).
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="w-full py-3 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-space font-extrabold text-xs uppercase shadow-md shadow-blue-600/20 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>CREATE NEW TEAM</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Option 2: Join Existing Team via Code */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 hover:border-blue-300 transition flex flex-col justify-between shadow-sm">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-extrabold text-emerald-800 uppercase bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                        OPTION 2
                      </span>
                      <KeyRound className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="font-space font-bold text-lg text-[#0B192C]">Join Team via Code</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Enter the 6-character Team Code shared by your leader to join their roster instantly.
                    </p>

                    {joinError && (
                      <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[11px] font-mono flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{joinError}</span>
                      </div>
                    )}

                    <form onSubmit={handleDashboardJoinTeam} className="space-y-2 pt-1">
                      <input
                        type="text"
                        required
                        value={joinCodeInput}
                        onChange={(e) => setJoinCodeInput(e.target.value.toUpperCase())}
                        placeholder="e.g. PRG-7X9K2"
                        maxLength={9}
                        className="w-full p-2.5 rounded-xl bg-white border border-slate-300 font-mono font-bold text-[#0B192C] text-xs focus:ring-2 focus:ring-blue-600 outline-none uppercase tracking-wider text-center"
                      />
                      <button
                        type="submit"
                        disabled={isJoining}
                        className="w-full py-2.5 rounded-xl bg-[#0B192C] hover:bg-slate-800 text-white font-space font-bold text-xs uppercase shadow-sm transition flex items-center justify-center gap-1.5"
                      >
                        {isJoining ? 'JOINING TEAM...' : 'JOIN TEAM NOW →'}
                      </button>
                    </form>
                  </div>
                </div>

              </div>
            </div>

            {/* ORGANIZER ANNOUNCEMENTS FEED FOR UNREGISTERED USERS */}
            {announcements.length > 0 && (
              <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-4 shadow-sm">
                <h2 className="font-space font-extrabold text-xl text-[#0B192C] uppercase flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Megaphone className="w-5 h-5 text-[#1D4ED8]" />
                  <span>ORGANIZER ANNOUNCEMENTS</span>
                </h2>

                <div className="space-y-3">
                  {announcements.map(ann => (
                    <div key={ann.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-left">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-bold text-[#0B192C]">{ann.title}</span>
                        <span className="text-slate-400">{new Date(ann.publishDate).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-slate-600 font-sans leading-relaxed">{ann.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        ) : (

          /* CASE 2: PARTICIPANT IS IN A REGISTERED TEAM */
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* TEAM BANNER CARD */}
            <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                
                <div className="space-y-3">
                  <div className="flex items-center flex-wrap gap-2.5">
                    <span className="font-mono text-xs font-extrabold text-[#1D4ED8] bg-blue-100 border border-blue-300 px-3 py-1 rounded-full">
                      TEAM ID: {userTeam.teamId}
                    </span>

                    {userTeam.teamCode && (
                      <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-300 px-3 py-1 rounded-full text-xs font-mono font-bold">
                        <span className="text-slate-500">CODE:</span>
                        <span className="text-[#0B192C]">{userTeam.teamCode}</span>
                        <button
                          onClick={() => handleCopyCode(userTeam.teamCode || '')}
                          className="p-1 text-slate-500 hover:text-blue-600 transition"
                          title="Copy Team Code"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    )}

                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase ${
                      userTeam.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                      userTeam.status === 'REJECTED' ? 'bg-red-100 text-red-800 border border-red-300' :
                      'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      REGISTRATION: {userTeam.status}
                    </span>
                  </div>

                  <h1 className="font-space font-extrabold text-3xl sm:text-4xl text-[#0B192C] uppercase tracking-tight">
                    {userTeam.teamName}
                  </h1>

                  <div className="text-xs font-mono text-slate-600 flex items-center flex-wrap gap-4">
                    <span>Track: <strong className="text-[#1D4ED8]">{userTeam.trackTitle}</strong></span>
                    <span>Host: <strong>{userTeam.college}</strong></span>
                  </div>
                </div>

                {/* Submission Action CTA */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center space-y-3 shrink-0 shadow-sm min-w-[220px]">
                  <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">SUBMISSION EVALUATION</div>
                  {userTeam.status !== 'APPROVED' ? (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono space-y-1 text-center">
                      <Lock className="w-4 h-4 mx-auto text-amber-600" />
                      <div className="font-bold">SUBMISSION LOCKED</div>
                      <div className="text-[10px] text-amber-700">Unlocks once ₹500 payment & team are approved</div>
                    </div>
                  ) : userTeam.submission ? (
                    <div className="space-y-2">
                      <div className={`text-xs font-mono font-extrabold px-3 py-1.5 rounded-xl border flex items-center justify-center gap-1.5 uppercase ${
                        userTeam.submission.status === 'SHORTLISTED' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                        userTeam.submission.status === 'REVIEWED' ? 'bg-indigo-100 text-indigo-800 border-indigo-300' :
                        userTeam.submission.status === 'UNDER_REVIEW' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                        userTeam.submission.status === 'DISQUALIFIED' ? 'bg-red-100 text-red-800 border-red-300' :
                        'bg-blue-100 text-blue-800 border-blue-300'
                      }`}>
                        {userTeam.submission.status === 'SHORTLISTED' && <Award className="w-4 h-4 text-emerald-600" />}
                        {userTeam.submission.status === 'UNDER_REVIEW' && <Clock className="w-4 h-4 text-amber-600" />}
                        {userTeam.submission.status === 'REVIEWED' && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                        {userTeam.submission.status === 'SUBMITTED' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                        <span>{userTeam.submission.status.replace('_', ' ')}</span>
                      </div>

                      <div className="text-[10px] text-slate-700 font-bold truncate max-w-[200px]">{userTeam.submission.projectTitle}</div>

                      {isTeamLeader && (
                        <button
                          onClick={() => {
                            setProjectTitle(userTeam.submission?.projectTitle || '');
                            setDescription(userTeam.submission?.description || '');
                            setGithubUrl(userTeam.submission?.githubUrl || '');
                            setDemoUrl(userTeam.submission?.demoUrl || '');
                            setIsSubmitModalOpen(true);
                          }}
                          className="text-[10px] font-mono text-[#1D4ED8] hover:underline font-bold block mx-auto"
                        >
                          ✎ Edit / Resubmit Project
                        </button>
                      )}
                    </div>
                  ) : isTeamLeader ? (
                    <button
                      onClick={() => setIsSubmitModalOpen(true)}
                      className="px-5 py-3 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-space font-extrabold text-xs uppercase flex items-center gap-2 shadow-md shadow-blue-600/20 transition mx-auto"
                    >
                      <Upload className="w-4 h-4 text-yellow-300" /> UPLOAD PROJECT SUBMISSION
                    </button>
                  ) : (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono flex items-center justify-center gap-1.5 max-w-[240px] text-left mx-auto">
                      <Lock className="w-4 h-4 shrink-0 text-amber-600" />
                      <span>Only Team Leader ({userTeam.leader.fullName}) can submit the project.</span>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* ₹500 REGISTRATION PAYMENT & APPROVAL STATUS CARD */}
            {userTeam.status !== 'APPROVED' && (
              <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-5 shadow-sm text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 text-[#1D4ED8] rounded-2xl border border-blue-200">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-space font-extrabold text-lg text-[#0B192C] uppercase">
                        TEAM REGISTRATION & PAYMENT VERIFICATION (₹500)
                      </h3>
                      <p className="text-xs text-slate-500 font-mono">
                        Complete ₹500 team registration fee to get approved & unlock project submission.
                      </p>
                    </div>
                  </div>

                  <span className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase self-start sm:self-auto ${
                    userTeam.paymentStatus === 'PAID' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                    userTeam.paymentStatus === 'UNDER_REVIEW' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                    userTeam.paymentStatus === 'REJECTED' ? 'bg-red-100 text-red-800 border border-red-300' :
                    'bg-blue-100 text-[#1D4ED8] border border-blue-300'
                  }`}>
                    STATUS: {userTeam.paymentStatus === 'UNDER_REVIEW' ? 'UNDER REVIEW' : userTeam.paymentStatus || 'PAYMENT REQUIRED'}
                  </span>
                </div>

                {userTeam.paymentStatus === 'UNDER_REVIEW' ? (
                  <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <h4 className="font-space font-bold text-sm text-amber-900 uppercase">
                          PAYMENT PROOF SUBMITTED — UNDER REVIEW
                        </h4>
                        <p className="text-xs text-amber-800 leading-relaxed font-sans">
                          Your ₹500 payment proof (UTR: <strong>{userTeam.paymentUtr || 'N/A'}</strong>) has been uploaded and sent to the PRAGYAN 2K26 Admin Panel. Your payment screenshot will be verified and approved by admins within <strong>24 hours</strong>.
                        </p>
                      </div>
                    </div>

                    {userTeam.paymentScreenshot && (
                      <div className="pt-2 border-t border-amber-200/60 flex items-center gap-4">
                        <div className="text-xs font-mono font-bold text-amber-900">Uploaded Receipt:</div>
                        <img
                          src={userTeam.paymentScreenshot}
                          alt="Payment Receipt Screenshot"
                          className="w-20 h-20 object-cover rounded-xl border border-amber-300 shadow-sm cursor-pointer hover:opacity-90 transition"
                          onClick={() => window.open(userTeam.paymentScreenshot, '_blank')}
                          title="Click to view full screenshot"
                        />
                        <span className="text-[10px] font-mono text-amber-700">(Click image to view full screenshot)</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1 max-w-xl">
                      <h4 className="font-space font-bold text-base text-[#0B192C]">
                        Pay ₹500 Registration Fee to Unlock Project Submission
                      </h4>
                      <p className="text-xs text-slate-600 font-sans leading-relaxed">
                        Your team has registered 4 members. Please click the button below to scan the UPI QR code, pay ₹500, and upload your UTR ID & screenshot proof.
                      </p>
                    </div>

                    {isTeamLeader ? (
                      <button
                        onClick={() => setIsPaymentModalOpen(true)}
                        className="px-6 py-3 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-space font-extrabold text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition shrink-0"
                      >
                        <CreditCard className="w-4 h-4 text-yellow-300" /> PAY ₹500 REGISTRATION FEE
                      </button>
                    ) : (
                      <div className="px-4 py-2.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 text-xs font-mono font-bold">
                        Leader ({userTeam.leader.fullName}) must pay fee
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* JUDGES EVALUATION & REMARKS BANNER */}
            {userTeam.submission && userTeam.submission.adminNotes && (
              <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200 p-6 rounded-3xl space-y-3 shadow-sm text-left">
                <div className="flex items-center gap-2 text-xs font-mono font-extrabold text-[#1D4ED8] uppercase tracking-wider">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  <span>OFFICIAL JUDGING REMARKS & EVALUATION FEEDBACK</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm text-xs font-sans text-slate-800 leading-relaxed font-medium">
                  "{userTeam.submission.adminNotes}"
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  Evaluated by PRAGYAN 2K26 Hackathon Admin Panel
                </div>
              </div>
            )}

            {/* 4 TEAM MEMBERS ROSTER */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h2 className="font-space font-extrabold text-xl text-[#0B192C] uppercase flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#1D4ED8]" />
                  <span>MY TEAM ROSTER (4 MEMBERS)</span>
                </h2>
                <Link
                  to="/profile"
                  className="text-xs font-mono font-bold text-[#1D4ED8] hover:underline"
                >
                  View Full Profile →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {userTeam.members.map((mem, idx) => (
                  <div key={mem.id} className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 relative shadow-sm hover:border-blue-300 transition">
                    {mem.isLeader && (
                      <span className="absolute top-4 right-4 bg-amber-100 text-amber-800 border border-amber-300 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1">
                        <Crown className="w-3.5 h-3.5 text-amber-600" /> LEADER
                      </span>
                    )}
                    <div className="text-[10px] font-mono text-slate-400 uppercase">MEMBER {idx + 1}</div>
                    <div className="font-space font-bold text-lg text-[#0B192C]">{mem.fullName}</div>
                    <div className="text-xs text-[#1D4ED8] font-mono truncate">{mem.email}</div>
                    <div className="text-xs text-slate-500 font-mono pt-2 border-t border-slate-100 space-y-0.5">
                      <div>{mem.course} ({mem.year})</div>
                      <div className="truncate text-slate-400">{mem.college}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ORGANIZER ANNOUNCEMENTS FEED */}
            <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl space-y-4 shadow-sm">
              <h2 className="font-space font-extrabold text-xl text-[#0B192C] uppercase flex items-center gap-2 border-b border-slate-100 pb-3">
                <Megaphone className="w-5 h-5 text-[#1D4ED8]" />
                <span>ORGANIZER ANNOUNCEMENTS</span>
              </h2>

              <div className="space-y-3">
                {announcements.length > 0 ? (
                  announcements.map(ann => (
                    <div key={ann.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-left">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-bold text-[#0B192C]">{ann.title}</span>
                        <span className="text-slate-400">{new Date(ann.publishDate).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-slate-600 font-sans leading-relaxed">{ann.content}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs font-mono text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
                    No active announcements published yet. Check back soon for hackathon updates!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* UPLOAD PROJECT SUBMISSION MODAL (LIGHT THEME) */}
      {isSubmitModalOpen && userTeam && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 text-left shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-space font-extrabold text-lg uppercase text-[#0B192C] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#1D4ED8]" />
                <span>PROJECT SUBMISSION</span>
              </h3>
              <button onClick={() => setIsSubmitModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-mono text-lg">✕</button>
            </div>

            <form onSubmit={handleUploadSubmission} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700 uppercase">Project Title *</label>
                <input
                  type="text"
                  required
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g. PayTrust AI"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700 uppercase">Executive Summary / Abstract *</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summarize key innovation..."
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-700 uppercase flex items-center gap-1">
                    <Code2 className="w-3.5 h-3.5 text-blue-600" /> GitHub URL
                  </label>
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs font-mono focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-700 uppercase flex items-center gap-1">
                    <ExternalLink className="w-3.5 h-3.5 text-blue-600" /> Demo URL
                  </label>
                  <input
                    type="url"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://demo.app"
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs font-mono focus:ring-2 focus:ring-blue-600 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700 uppercase">
                  Pitch Deck (PPTX / PDF / DOCX) File *
                </label>
                <input
                  type="file"
                  required={!userTeam.submission}
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.zip"
                  onChange={(e) => e.target.files?.[0] && setSelectedFile(e.target.files[0])}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs file:mr-4 file:py-1.5 file:px-3.5 file:rounded-lg file:border-0 file:text-xs file:bg-[#1D4ED8] file:text-white file:font-bold"
                />
              </div>

              {uploadProgress !== null && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-[#1D4ED8] font-bold">
                    <span>UPLOADING FILE...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-[#1D4ED8] h-2 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-space font-extrabold text-xs uppercase flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition"
                >
                  <Upload className="w-4 h-4 text-yellow-300" /> UPLOAD FILE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ₹500 REGISTRATION PAYMENT MODAL */}
      {isPaymentModalOpen && userTeam && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 text-left shadow-2xl animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-space font-extrabold text-lg uppercase text-[#0B192C] flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#1D4ED8]" />
                <span>PAY ₹500 REGISTRATION FEE</span>
              </h3>
              <button onClick={() => setIsPaymentModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-mono text-lg">✕</button>
            </div>

            {/* QR CODE BOX */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl text-center space-y-3">
              <div className="text-[11px] font-mono font-extrabold text-[#1D4ED8] uppercase tracking-wider bg-blue-100 py-1 px-3 rounded-full inline-block border border-blue-200">
                SCAN UPI QR CODE TO PAY ₹500
              </div>

              {/* QR Image Container */}
              <div className="w-48 h-48 bg-white border-2 border-slate-300 rounded-2xl p-2 mx-auto flex items-center justify-center shadow-inner relative group">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=pragyan2k26@upi%26pn=PRAGYAN2K26%26am=500%26cu=INR`}
                  alt="₹500 UPI QR Code"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>

              <div className="space-y-1 font-mono text-xs text-slate-700">
                <div>UPI ID: <strong className="text-[#0B192C] bg-white px-2 py-0.5 rounded border border-slate-200">pragyan2k26@upi</strong></div>
                <div>Amount: <strong className="text-emerald-600 font-bold text-sm">₹500.00</strong></div>
              </div>
            </div>

            {/* PAYMENT INSTRUCTIONS & FORM */}
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700 uppercase flex items-center gap-1">
                  <span>12-Digit UTR / Transaction ID *</span>
                </label>
                <input
                  type="text"
                  required
                  pattern="[0-9]{10,18}"
                  value={utrInput}
                  onChange={(e) => setUtrInput(e.target.value)}
                  placeholder="e.g. 425678901234"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-[#0B192C] text-xs font-mono font-bold focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <p className="text-[10px] text-slate-400 font-mono">Enter the UTR / UPI Reference number from your payment app receipt.</p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700 uppercase">
                  Upload Payment Screenshot *
                </label>
                <input
                  type="file"
                  required
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && setPaymentScreenshotFile(e.target.files[0])}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-700 text-xs file:mr-4 file:py-1.5 file:px-3.5 file:rounded-lg file:border-0 file:text-xs file:bg-[#1D4ED8] file:text-white file:font-bold"
                />
                <p className="text-[10px] text-slate-400 font-mono">Upload a clear screenshot showing ₹500 payment success & UTR ID.</p>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-[11px] font-sans flex items-start gap-2">
                <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>After submission, your payment screenshot will show under review on your team page and will be approved by admins within 24 hours.</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingPayment}
                  className="px-5 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-space font-extrabold text-xs uppercase flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4 text-yellow-300" />
                  {isSubmittingPayment ? 'UPLOADING PROOF...' : 'SUBMIT PAYMENT PROOF'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE TEAM MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 text-left shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-space font-extrabold text-lg uppercase text-[#0B192C] flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-[#1D4ED8]" />
                <span>CREATE A NEW HACKATHON TEAM</span>
              </h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-mono text-lg">✕</button>
            </div>

            <form onSubmit={handleCreateTeamSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700 uppercase">Team Name *</label>
                <input
                  type="text"
                  required
                  value={createTeamName}
                  onChange={(e) => setCreateTeamName(e.target.value)}
                  placeholder="e.g. FinTech Innovators"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-[#0B192C] text-xs font-bold focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700 uppercase">College / University *</label>
                <input
                  type="text"
                  required
                  value={createCollege}
                  onChange={(e) => setCreateCollege(e.target.value)}
                  placeholder="e.g. Sanjivani University"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-[#0B192C] text-xs focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700 uppercase">Select Track *</label>
                <select
                  value={createTrackId}
                  onChange={(e) => setCreateTrackId(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-[#0B192C] text-xs font-mono focus:ring-2 focus:ring-blue-600 outline-none"
                >
                  {tracksList.map(tr => (
                    <option key={tr.id} value={tr.id}>{tr.title}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-700 uppercase">Leader Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={createPhone}
                  onChange={(e) => setCreatePhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-[#0B192C] text-xs font-mono focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-[11px] font-sans flex items-start gap-2">
                <Crown className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>You will be registered as Team Leader. You'll receive a 6-character Team Code to invite your 3 team members.</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={isCreatingTeam}
                  className="px-5 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-space font-extrabold text-xs uppercase flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4 text-yellow-300" />
                  {isCreatingTeam ? 'CREATING TEAM...' : 'CREATE TEAM NOW'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ParticipantDashboard;
