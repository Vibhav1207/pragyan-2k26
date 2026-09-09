import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ExternalLink, 
  Code2, 
  Eye
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { apiService } from '../../services/api';
import type { Submission, SubmissionStatus } from '../../types/admin';

export const AdminSubmissionsList: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>(() => apiService.getSubmissions());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [activeSubmissionModal, setActiveSubmissionModal] = useState<Submission | null>(null);
  const [evalNotes, setEvalNotes] = useState('');

  const filteredSubmissions = submissions.filter(s => {
    const matchesSearch = 
      s.teamId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.projectTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (subId: string, newStatus: SubmissionStatus) => {
    apiService.updateSubmissionStatus(subId, newStatus, evalNotes);
    setSubmissions(apiService.getSubmissions());
    if (activeSubmissionModal?.id === subId) {
      setActiveSubmissionModal({ ...activeSubmissionModal, status: newStatus });
    }
  };

  return (
    <AdminLayout
      title="SUBMISSION MANAGEMENT"
      subtitle="Review team project submissions, pitch decks, demo videos, repositories and scores"
    >
      
      {/* FILTER BAR */}
      <div className="bg-white border border-slate-200 p-5 rounded-3xl space-y-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search project title, team name, team ID..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs placeholder-slate-400"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs font-mono"
          >
            <option value="ALL">All Submission Statuses</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="REVIEWED">Reviewed</option>
            <option value="SHORTLISTED">Shortlisted Finalists</option>
            <option value="DISQUALIFIED">Disqualified</option>
          </select>

          <div className="text-right text-xs font-mono text-slate-500 flex items-center justify-end">
            <span>Total Submissions: <strong className="text-[#0B192C]">{submissions.length}</strong></span>
          </div>
        </div>
      </div>

      {/* SUBMISSIONS TABLE */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/90 border-b border-slate-200 text-[#0B192C] font-mono text-[10px] uppercase font-bold">
                <th className="py-3.5 px-4">Team</th>
                <th className="py-3.5 px-4">Project Title</th>
                <th className="py-3.5 px-4">Track</th>
                <th className="py-3.5 px-4">Submitted Date</th>
                <th className="py-3.5 px-4">Artifacts</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-mono">
                    No project submissions uploaded yet.
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#0B192C]">{sub.teamName}</div>
                      <Link to={`/admin/teams/${sub.teamId}`} className="text-[10px] font-mono text-[#1D4ED8] hover:underline">
                        {sub.teamId}
                      </Link>
                    </td>

                    <td className="py-3.5 px-4 max-w-[240px]">
                      <div className="font-bold text-[#0B192C] truncate">{sub.projectTitle}</div>
                      <div className="text-[10px] text-slate-500 truncate">{sub.description}</div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px] max-w-[160px] truncate">
                      {sub.trackTitle}
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      {sub.submittedAt ? new Date(sub.submittedAt).toLocaleDateString() : 'N/A'}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        {sub.githubUrl && <Code2 className="w-4 h-4 text-[#1D4ED8]" />}
                        {sub.demoUrl && <ExternalLink className="w-4 h-4 text-emerald-600" />}
                        {sub.files?.length > 0 && (
                          <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded-full text-slate-700 font-bold border border-slate-200">
                            {sub.files.length} Files
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        sub.status === 'SHORTLISTED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                        sub.status === 'REVIEWED' ? 'bg-blue-100 text-[#1D4ED8] border border-blue-300' :
                        sub.status === 'DISQUALIFIED' ? 'bg-red-100 text-red-800 border border-red-300' :
                        'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {sub.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setActiveSubmissionModal(sub);
                          setEvalNotes(sub.adminNotes || '');
                        }}
                        className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-[#1D4ED8] hover:bg-[#1D4ED8] hover:text-white text-[11px] font-mono font-bold transition inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> EVALUATE
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EVALUATION MODAL */}
      {activeSubmissionModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-2xl w-full space-y-5 text-left shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-space font-extrabold text-lg text-[#0B192C] uppercase">
                  SUBMISSION EVALUATION
                </h3>
                <p className="text-xs text-slate-500">{activeSubmissionModal.teamName} ({activeSubmissionModal.teamId})</p>
              </div>
              <button onClick={() => setActiveSubmissionModal(null)} className="text-slate-400 font-mono font-bold text-xs">
                ✕ CLOSE
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">PROJECT TITLE</div>
                <h4 className="font-space font-bold text-lg text-[#0B192C]">{activeSubmissionModal.projectTitle}</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans bg-slate-50 p-3 rounded-xl border border-slate-200">
                {activeSubmissionModal.description}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">CHANGE SUBMISSION STATUS</div>
              <div className="flex items-center gap-2 flex-wrap">
                {(['SUBMITTED', 'UNDER_REVIEW', 'REVIEWED', 'SHORTLISTED', 'DISQUALIFIED'] as SubmissionStatus[]).map(st => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(activeSubmissionModal.id, st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
                      activeSubmissionModal.status === st
                        ? 'bg-[#1D4ED8] text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:text-[#0B192C] border border-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">PRIVATE EVALUATION NOTES</div>
              <textarea
                rows={3}
                value={evalNotes}
                onChange={(e) => setEvalNotes(e.target.value)}
                placeholder="Enter judging remarks..."
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs placeholder-slate-400 focus:outline-none focus:border-[#1D4ED8]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-3">
              <button
                onClick={() => {
                  apiService.updateSubmissionStatus(activeSubmissionModal.id, activeSubmissionModal.status, evalNotes);
                  setSubmissions(apiService.getSubmissions());
                  setActiveSubmissionModal(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#1D4ED8] hover:bg-blue-600 text-white text-xs font-bold font-mono"
              >
                SAVE & CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
};
