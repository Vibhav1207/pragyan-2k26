import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Building2, 
  UserCheck, 
  Crown, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  FileText, 
  Download, 
  ExternalLink, 
  Code2, 
  Calendar, 
  Layers,
  Trash2,
  CreditCard
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { apiService } from '../../services/api';
import { triggerFileDownload } from '../../utils/downloadHelper';

export const AdminTeamDetail: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();

  const [team, setTeam] = useState(() => apiService.getTeamById(teamId || ''));
  const [adminNotes, setAdminNotes] = useState(team?.submission?.adminNotes || '');
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  if (!team) {
    return (
      <AdminLayout title="TEAM NOT FOUND">
        <div className="bg-[#E9E1D2] border border-[#D2CAB6] p-12 rounded-3xl text-center space-y-4 shadow-sm">
          <AlertCircle className="w-12 h-12 text-[#A77A1C] mx-auto" />
          <h2 className="text-xl font-serif font-bold text-[#162E28]">TEAM NOT FOUND</h2>
          <p className="text-xs text-[#7B8379]">Team ID "{teamId}" does not exist in records.</p>
          <Link to="/admin/teams" className="inline-block px-5 py-2.5 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] text-xs font-bold font-mono tracking-wider transition border border-[#A77A1C]/30">
            ← BACK TO TEAMS LIST
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const handleStatusChange = (status: 'APPROVED' | 'REJECTED' | 'CHANGES_REQUESTED') => {
    const updated = apiService.updateTeamStatus(team.teamId, status);
    if (updated) setTeam(updated);
  };

  const handleSaveEvaluation = () => {
    if (team.submission) {
      apiService.updateSubmissionStatus(team.submission.id, team.submission.status, adminNotes);
      setTeam(apiService.getTeamById(team.teamId));
      alert('Admin notes & evaluation saved successfully!');
    }
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${team.teamName}?`)) {
      apiService.deleteTeam(team.teamId);
      navigate('/admin/teams');
    }
  };

  return (
    <AdminLayout
      title={`TEAM DETAIL: ${team.teamName}`}
      subtitle={`Detailed roster, credentials, and project submission for ${team.teamId}`}
    >
      
      {/* TOP ACTION BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          to="/admin/teams"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#7B8379] hover:text-[#162E28] transition uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4 text-[#A77A1C]" /> BACK TO TEAMS MANAGEMENT
        </Link>

        <div className="flex items-center gap-2 flex-wrap">
          {team.status !== 'APPROVED' && (
            <button
              onClick={() => handleStatusChange('APPROVED')}
              className="px-4 py-2 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] border border-[#A77A1C]/50 font-mono text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
            >
              <CheckCircle2 className="w-4 h-4 text-[#E5BE61]" /> APPROVE TEAM
            </button>
          )}

          {team.status !== 'REJECTED' && (
            <button
              onClick={() => handleStatusChange('REJECTED')}
              className="px-4 py-2 rounded-xl bg-red-900/10 border border-red-800/30 text-red-800 hover:bg-red-900/20 font-mono text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
            >
              <XCircle className="w-4 h-4 text-red-700" /> REJECT TEAM
            </button>
          )}

          <button
            onClick={() => handleStatusChange('CHANGES_REQUESTED')}
            className="px-4 py-2 rounded-xl bg-[#A77A1C]/10 border border-[#A77A1C]/30 text-[#A77A1C] hover:bg-[#A77A1C]/20 font-mono text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
          >
            <AlertCircle className="w-4 h-4 text-[#A77A1C]" /> REQUEST CHANGES
          </button>

          <button
            onClick={handleDelete}
            className="px-3 py-2 rounded-xl bg-red-100 text-red-800 border border-red-200 hover:bg-red-200 transition text-xs font-mono font-bold flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" /> DELETE
          </button>
        </div>
      </div>

      {/* TEAM OVERVIEW BANNER CARD */}
      <div className="bg-[#162E28] text-[#F9F4EA] border border-[#A77A1C]/30 p-8 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          
          <div className="md:col-span-3 space-y-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-[#E5BE61] bg-[#A77A1C]/20 border border-[#A77A1C]/40 px-3 py-1 rounded-full">
                {team.teamId}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase ${
                team.status === 'APPROVED' ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40' :
                team.status === 'REJECTED' ? 'bg-red-950/60 text-red-300 border border-red-500/40' :
                'bg-amber-950/60 text-[#E5BE61] border border-[#A77A1C]/40'
              }`}>
                {team.status}
              </span>
            </div>

            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#F9F4EA] tracking-tight">
              {team.teamName}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#F3EDE0]/80 font-mono pt-1">
              <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-[#E5BE61]" /> {team.college}</span>
              <span className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-[#E5BE61]" /> {team.trackTitle}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#E5BE61]" /> Registered: {new Date(team.registrationDate).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="md:col-span-1 text-right bg-[#2B3E35]/60 p-4 rounded-2xl border border-[#A77A1C]/30 space-y-1">
            <div className="text-[10px] font-mono text-[#F3EDE0]/70 uppercase tracking-wider">ROSTER CAPACITY</div>
            <div className="font-serif font-bold text-2xl text-[#E5BE61]">{team.members.length} / 4 MEMBERS</div>
            <div className="text-[11px] text-emerald-400 font-mono font-bold">✓ 4 Verified Members</div>
          </div>

        </div>
      </div>

      {/* TEAM MEMBERS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#D2CAB6] pb-2">
          <h3 className="font-serif font-bold text-xl text-[#162E28] uppercase flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#A77A1C]" />
            <span>TEAM MEMBERS ROSTER (4 MEMBERS)</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.members.map((mem: any, idx: number) => (
            <div
              key={mem.id || idx}
              className={`bg-[#E9E1D2] border rounded-3xl p-6 space-y-4 relative shadow-sm ${
                mem.isLeader ? 'border-[#A77A1C] ring-2 ring-[#A77A1C]/20' : 'border-[#D2CAB6]'
              }`}
            >
              {mem.isLeader && (
                <div className="absolute top-4 right-4 bg-[#162E28] text-[#E5BE61] border border-[#A77A1C]/40 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-[#E5BE61]" /> TEAM LEADER
                </div>
              )}

              <div className="space-y-1 pt-2">
                <div className="text-[10px] font-mono text-[#7B8379] uppercase tracking-wider">MEMBER {idx + 1}</div>
                <h4 className="font-serif font-bold text-lg text-[#162E28]">{mem.fullName}</h4>
                <p className="text-xs text-[#A77A1C] font-mono truncate">{mem.email}</p>
              </div>

              <div className="space-y-2 text-xs text-[#162E28] font-mono pt-2 border-t border-[#D2CAB6]/60">
                <div><span className="text-[#7B8379]">Phone:</span> {mem.phone}</div>
                <div><span className="text-[#7B8379]">Course:</span> {mem.course}</div>
                <div><span className="text-[#7B8379]">Year:</span> {mem.year}</div>
                <div className="truncate"><span className="text-[#7B8379]">College:</span> {mem.college}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REGISTRATION PAYMENT & VERIFICATION SECTION (₹500) */}
      <div className="bg-[#E9E1D2] border border-[#D2CAB6] p-8 rounded-3xl space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#D2CAB6] pb-4">
          <h3 className="font-serif font-bold text-xl text-[#162E28] uppercase flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-[#A77A1C]" />
            <span>REGISTRATION PAYMENT & VERIFICATION (₹500)</span>
          </h3>

          <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase ${
            team.paymentStatus === 'PAID' ? 'bg-emerald-900/20 text-emerald-900 border border-emerald-600/40' :
            team.paymentStatus === 'UNDER_REVIEW' ? 'bg-amber-900/20 text-[#A77A1C] border border-[#A77A1C]/40' :
            team.paymentStatus === 'REJECTED' ? 'bg-red-900/20 text-red-900 border border-red-600/40' :
            'bg-[#F3EDE0] text-[#7B8379] border border-[#D2CAB6]'
          }`}>
            PAYMENT: {team.paymentStatus || 'NOT_PAID'}
          </span>
        </div>

        {team.paymentUtr || team.paymentScreenshot ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start text-left">
            <div className="space-y-3 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-[#F9F4EA] border border-[#D2CAB6] space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#7B8379]">Payment Amount:</span>
                  <span className="font-bold text-[#162E28] text-sm">₹{team.paymentAmount || 500}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7B8379]">UTR / Reference ID:</span>
                  <span className="font-bold text-[#A77A1C]">{team.paymentUtr || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7B8379]">Submitted Date:</span>
                  <span className="font-bold text-[#162E28]">
                    {team.paymentDate ? new Date(team.paymentDate).toLocaleString() : 'N/A'}
                  </span>
                </div>
              </div>

              {team.status !== 'APPROVED' && (
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => handleStatusChange('APPROVED')}
                    className="flex-1 py-3 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] border border-[#A77A1C]/40 font-mono font-bold text-xs uppercase flex items-center justify-center gap-1.5 shadow-md transition"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#E5BE61]" /> APPROVE PAYMENT & TEAM
                  </button>
                  <button
                    onClick={() => handleStatusChange('REJECTED')}
                    className="px-4 py-3 rounded-xl bg-red-100 border border-red-300 text-red-800 hover:bg-red-200 font-mono font-bold text-xs transition"
                  >
                    REJECT
                  </button>
                </div>
              )}
            </div>

            {/* Payment Screenshot */}
            {team.paymentScreenshot && (
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">PAYMENT SCREENSHOT PROOF</div>
                <div className="p-2.5 rounded-2xl bg-[#F9F4EA] border border-[#D2CAB6] overflow-hidden space-y-2">
                  <img
                    src={team.paymentScreenshot}
                    alt="Payment Screenshot Proof"
                    className="w-full max-h-64 object-contain rounded-xl border border-[#D2CAB6] shadow-sm cursor-pointer hover:opacity-90 transition"
                    onClick={() => setExpandedImage(team.paymentScreenshot || null)}
                    title="Click image to expand full size"
                  />
                  <button
                    type="button"
                    onClick={() => setExpandedImage(team.paymentScreenshot || null)}
                    className="w-full py-2 rounded-xl bg-[#162E28] text-[#E5BE61] hover:bg-[#2B3E35] text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition border border-[#A77A1C]/30"
                  >
                    <span>🔍 Click to Expand Full Image</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-[#F9F4EA] border border-[#D2CAB6] text-center space-y-1">
            <div className="text-xs font-mono font-bold text-[#7B8379]">NO PAYMENT PROOF SUBMITTED YET</div>
            <p className="text-[11px] text-[#7B8379] font-mono">Team has not uploaded ₹500 UTR ID or payment screenshot yet.</p>
          </div>
        )}
      </div>

      {/* PROJECT SUBMISSION SECTION */}
      <div className="bg-[#E9E1D2] border border-[#D2CAB6] p-8 rounded-3xl space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#D2CAB6] pb-4">
          <h3 className="font-serif font-bold text-xl text-[#162E28] uppercase flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#A77A1C]" />
            <span>PROJECT SUBMISSION & ARTIFACTS</span>
          </h3>

          {team.submission && (
            <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase ${
              team.submission.status === 'SHORTLISTED' ? 'bg-[#162E28] text-[#E5BE61] border border-[#A77A1C]/50' :
              team.submission.status === 'REVIEWED' ? 'bg-[#2B3E35] text-[#F9F4EA] border border-[#D2CAB6]' :
              'bg-[#F3EDE0] text-[#7B8379] border border-[#D2CAB6]'
            }`}>
              {team.submission.status}
            </span>
          )}
        </div>

        {team.submission ? (
          <div className="space-y-6">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-8 space-y-3">
                <h4 className="font-serif font-bold text-2xl text-[#162E28]">{team.submission.projectTitle}</h4>
                <p className="text-xs text-[#7B8379] leading-relaxed font-sans">{team.submission.description}</p>
                
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {team.submission.githubUrl && (
                    <a
                      href={team.submission.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] hover:text-[#A77A1C] text-xs font-mono flex items-center gap-1.5"
                    >
                      <Code2 className="w-4 h-4 text-[#A77A1C]" /> GitHub Repo
                    </a>
                  )}
                  {team.submission.demoUrl && (
                    <a
                      href={team.submission.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-[#162E28] border border-[#A77A1C]/40 text-[#E5BE61] hover:bg-[#2B3E35] text-xs font-mono flex items-center gap-1.5 font-bold"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo URL
                    </a>
                  )}
                </div>
              </div>

              {/* Uploaded Files (GridFS) */}
              <div className="lg:col-span-4 bg-[#F9F4EA] p-5 rounded-2xl border border-[#D2CAB6] space-y-3">
                <div className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">SUBMITTED FILES STORED</div>
                <div className="space-y-2">
                  {team.submission.files.map((file: any) => (
                    <div key={file.id} className="p-3 rounded-xl bg-[#E9E1D2] border border-[#D2CAB6] flex items-center justify-between shadow-sm">
                      <div className="truncate pr-2">
                        <div className="text-xs font-bold text-[#162E28] truncate">{file.filename}</div>
                        <div className="text-[10px] text-[#7B8379] font-mono">{(file.fileSize / (1024 * 1024)).toFixed(2)} MB</div>
                      </div>
                      <button
                        onClick={() => triggerFileDownload(file)}
                        className="p-2 rounded-lg bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] transition shrink-0 border border-[#A77A1C]/30"
                        title="Download File"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Admin Evaluation Notes */}
            <div className="pt-4 border-t border-[#D2CAB6] space-y-3">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">
                ADMIN EVALUATION & PRIVATE JUDGING NOTES
              </label>
              <textarea
                rows={3}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Enter evaluation notes, pitch score remarks, or feedback..."
                className="w-full p-4 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs placeholder-[#7B8379] focus:outline-none focus:border-[#A77A1C]"
              />
              <button
                onClick={handleSaveEvaluation}
                className="px-5 py-2.5 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] border border-[#A77A1C]/40 font-mono font-bold text-xs uppercase"
              >
                SAVE EVALUATION NOTES
              </button>
            </div>

          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-[#F9F4EA] border border-[#D2CAB6] text-center space-y-2">
            <FileText className="w-8 h-8 text-[#7B8379] mx-auto" />
            <div className="text-sm font-bold text-[#162E28]">NO PROJECT SUBMISSION YET</div>
            <p className="text-xs text-[#7B8379]">Team has registered but has not uploaded final submission files.</p>
          </div>
        )}
      </div>

      {/* FULLSCREEN IMAGE LIGHTBOX OVERLAY */}
      {expandedImage && (
        <div
          className="fixed inset-0 bg-[#162E28]/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center space-y-3">
            <div className="flex items-center justify-between w-full text-[#F9F4EA] text-xs font-mono px-2">
              <span className="font-bold uppercase tracking-wider text-[#E5BE61]">PAYMENT SCREENSHOT PROOF</span>
              <button
                onClick={() => setExpandedImage(null)}
                className="px-3.5 py-1.5 rounded-full bg-[#E5BE61]/20 hover:bg-[#E5BE61]/30 text-[#E5BE61] border border-[#E5BE61]/40 font-bold transition flex items-center gap-1 cursor-pointer"
              >
                ✕ CLOSE PREVIEW
              </button>
            </div>

            <img
              src={expandedImage}
              alt="Expanded Payment Proof"
              className="max-h-[80vh] max-w-full object-contain rounded-2xl border-2 border-[#A77A1C]/40 shadow-2xl bg-black/60"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

    </AdminLayout>
  );
};

