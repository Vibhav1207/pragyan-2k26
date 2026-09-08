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
  Trash2
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { apiService } from '../../services/api';

export const AdminTeamDetail: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();

  const [team, setTeam] = useState(() => apiService.getTeamById(teamId || ''));
  const [adminNotes, setAdminNotes] = useState(team?.submission?.adminNotes || '');

  if (!team) {
    return (
      <AdminLayout title="TEAM NOT FOUND">
        <div className="bg-white border border-slate-200 p-12 rounded-3xl text-center space-y-4 shadow-sm">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
          <h2 className="text-xl font-space font-extrabold text-[#0B192C]">TEAM NOT FOUND</h2>
          <p className="text-xs text-slate-500">Team ID "{teamId}" does not exist in MongoDB.</p>
          <Link to="/admin/teams" className="inline-block px-4 py-2 rounded-xl bg-[#1D4ED8] text-white text-xs font-bold">
            ← Back to Teams List
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
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-600 hover:text-[#0B192C] transition"
        >
          <ArrowLeft className="w-4 h-4" /> BACK TO TEAMS MANAGEMENT
        </Link>

        <div className="flex items-center gap-2 flex-wrap">
          {team.status !== 'APPROVED' && (
            <button
              onClick={() => handleStatusChange('APPROVED')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 transition"
            >
              <CheckCircle2 className="w-4 h-4" /> APPROVE TEAM
            </button>
          )}

          {team.status !== 'REJECTED' && (
            <button
              onClick={() => handleStatusChange('REJECTED')}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-red-600/20 transition"
            >
              <XCircle className="w-4 h-4" /> REJECT TEAM
            </button>
          )}

          <button
            onClick={() => handleStatusChange('CHANGES_REQUESTED')}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-600/20 transition"
          >
            <AlertCircle className="w-4 h-4" /> REQUEST CHANGES
          </button>

          <button
            onClick={handleDelete}
            className="px-3 py-2 rounded-xl bg-slate-200 text-red-600 hover:bg-red-600 hover:text-white transition text-xs font-mono font-bold flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" /> DELETE
          </button>
        </div>
      </div>

      {/* TEAM OVERVIEW BANNER CARD */}
      <div className="bg-[#0B192C] text-white border border-slate-800 p-8 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          
          <div className="md:col-span-3 space-y-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full">
                {team.teamId}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase ${
                team.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                team.status === 'REJECTED' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}>
                {team.status}
              </span>
            </div>

            <h2 className="font-space font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
              {team.teamName}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 font-mono pt-1">
              <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-[#FACC15]" /> {team.college}</span>
              <span className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-[#FACC15]" /> {team.trackTitle}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#FACC15]" /> Registered: {new Date(team.registrationDate).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="md:col-span-1 text-right bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-sm space-y-1">
            <div className="text-[10px] font-mono text-slate-300 uppercase">ROSTER CAPACITY</div>
            <div className="font-space font-extrabold text-2xl text-[#FACC15]">{team.members.length} / 4 MEMBERS</div>
            <div className="text-[11px] text-emerald-400 font-mono font-bold">✓ 4 Verified Members</div>
          </div>

        </div>
      </div>

      {/* TEAM MEMBERS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h3 className="font-space font-bold text-xl text-[#0B192C] uppercase flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#1D4ED8]" />
            <span>TEAM MEMBERS ROSTER (4 MEMBERS)</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.members.map((mem: any, idx: number) => (
            <div
              key={mem.id || idx}
              className={`bg-white border rounded-3xl p-6 space-y-4 relative shadow-sm ${
                mem.isLeader ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-slate-200'
              }`}
            >
              {mem.isLeader && (
                <div className="absolute top-4 right-4 bg-amber-100 text-amber-800 border border-amber-300 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-amber-600" /> TEAM LEADER
                </div>
              )}

              <div className="space-y-1 pt-2">
                <div className="text-[10px] font-mono text-slate-400 uppercase">MEMBER {idx + 1}</div>
                <h4 className="font-space font-bold text-lg text-[#0B192C]">{mem.fullName}</h4>
                <p className="text-xs text-[#1D4ED8] font-mono truncate">{mem.email}</p>
              </div>

              <div className="space-y-2 text-xs text-slate-600 font-mono pt-2 border-t border-slate-100">
                <div><span className="text-slate-400">Phone:</span> {mem.phone}</div>
                <div><span className="text-slate-400">Course:</span> {mem.course}</div>
                <div><span className="text-slate-400">Year:</span> {mem.year}</div>
                <div className="truncate"><span className="text-slate-400">College:</span> {mem.college}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROJECT SUBMISSION SECTION */}
      <div className="bg-white border border-slate-200 p-8 rounded-3xl space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="font-space font-extrabold text-xl text-[#0B192C] uppercase flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-600" />
            <span>PROJECT SUBMISSION & ARTIFACTS</span>
          </h3>

          {team.submission && (
            <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase ${
              team.submission.status === 'SHORTLISTED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
              team.submission.status === 'REVIEWED' ? 'bg-blue-100 text-[#1D4ED8] border border-blue-300' :
              'bg-slate-100 text-slate-700 border border-slate-300'
            }`}>
              {team.submission.status}
            </span>
          )}
        </div>

        {team.submission ? (
          <div className="space-y-6">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-8 space-y-3">
                <h4 className="font-space font-bold text-2xl text-[#0B192C]">{team.submission.projectTitle}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">{team.submission.description}</p>
                
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {team.submission.githubUrl && (
                    <a
                      href={team.submission.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 hover:text-[#1D4ED8] text-xs font-mono flex items-center gap-1.5"
                    >
                      <Code2 className="w-4 h-4 text-[#1D4ED8]" /> GitHub Repo
                    </a>
                  )}
                  {team.submission.demoUrl && (
                    <a
                      href={team.submission.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-[#1D4ED8] hover:bg-blue-100 text-xs font-mono flex items-center gap-1.5 font-bold"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo URL
                    </a>
                  )}
                </div>
              </div>

              {/* Uploaded Files (GridFS) */}
              <div className="lg:col-span-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="text-xs font-mono font-bold text-slate-500 uppercase">GRIDFS FILES STORED</div>
                <div className="space-y-2">
                  {team.submission.files.map((file: any) => (
                    <div key={file.id} className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
                      <div className="truncate pr-2">
                        <div className="text-xs font-bold text-[#0B192C] truncate">{file.filename}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{(file.fileSize / (1024 * 1024)).toFixed(2)} MB</div>
                      </div>
                      <button
                        onClick={() => alert(`Downloading GridFS Binary File: ${file.filename}`)}
                        className="p-2 rounded-lg bg-[#1D4ED8] hover:bg-blue-600 text-white transition shrink-0"
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
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">
                ADMIN EVALUATION & PRIVATE JUDGING NOTES
              </label>
              <textarea
                rows={3}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Enter evaluation notes, pitch score remarks, or feedback..."
                className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs placeholder-slate-400 focus:outline-none focus:border-[#1D4ED8]"
              />
              <button
                onClick={handleSaveEvaluation}
                className="px-5 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-600 text-white font-mono font-bold text-xs uppercase"
              >
                SAVE EVALUATION NOTES
              </button>
            </div>

          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
            <FileText className="w-8 h-8 text-slate-400 mx-auto" />
            <div className="text-sm font-bold text-[#0B192C]">NO PROJECT SUBMISSION YET</div>
            <p className="text-xs text-slate-500">Team has registered but has not uploaded final submission files.</p>
          </div>
        )}
      </div>

    </AdminLayout>
  );
};
