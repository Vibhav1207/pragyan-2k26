import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ExternalLink, 
  Code2, 
  Eye,
  Download,
  FileText
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { apiService } from '../../services/api';
import { triggerFileDownload } from '../../utils/downloadHelper';
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
      <div className="bg-[#E9E1D2] border border-[#D2CAB6] p-5 rounded-3xl space-y-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#7B8379] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search project title, team name, team ID..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs placeholder-[#7B8379] focus:outline-none focus:border-[#A77A1C]"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs font-mono"
          >
            <option value="ALL">All Submission Statuses</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="REVIEWED">Reviewed</option>
            <option value="SHORTLISTED">Shortlisted Finalists</option>
            <option value="DISQUALIFIED">Disqualified</option>
          </select>

          <div className="text-right text-xs font-mono text-[#7B8379] flex items-center justify-end">
            <span>Total Submissions: <strong className="text-[#162E28] font-bold">{submissions.length}</strong></span>
          </div>
        </div>
      </div>

      {/* SUBMISSIONS TABLE */}
      <div className="bg-[#E9E1D2] border border-[#D2CAB6] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#162E28] border-b border-[#A77A1C]/30 text-[#F9F4EA] font-mono text-[10px] uppercase font-bold tracking-wider">
                <th className="py-3.5 px-4">Team</th>
                <th className="py-3.5 px-4">Project Title</th>
                <th className="py-3.5 px-4">Track</th>
                <th className="py-3.5 px-4">Submitted Date</th>
                <th className="py-3.5 px-4">Artifacts</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D2CAB6]/60 text-xs">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#7B8379] font-mono">
                    No project submissions uploaded yet.
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-[#F9F4EA]/60 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#162E28] font-serif">{sub.teamName}</div>
                      <Link to={`/admin/teams/${sub.teamId}`} className="text-[10px] font-mono text-[#A77A1C] hover:underline">
                        {sub.teamId}
                      </Link>
                    </td>

                    <td className="py-3.5 px-4 max-w-[240px]">
                      <div className="font-bold text-[#162E28] truncate">{sub.projectTitle}</div>
                      <div className="text-[10px] text-[#7B8379] truncate">{sub.description}</div>
                    </td>

                    <td className="py-3.5 px-4 text-[#162E28]/80 font-mono text-[11px] max-w-[160px] truncate">
                      {sub.trackTitle}
                    </td>

                    <td className="py-3.5 px-4 text-[#7B8379] font-mono text-[11px]">
                      {sub.submittedAt ? new Date(sub.submittedAt).toLocaleDateString() : 'N/A'}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        {sub.githubUrl && <Code2 className="w-4 h-4 text-[#A77A1C]" />}
                        {sub.demoUrl && <ExternalLink className="w-4 h-4 text-emerald-800" />}
                        {sub.files?.length > 0 && (
                          <span className="text-[10px] font-mono bg-[#F9F4EA] px-2 py-0.5 rounded-full text-[#162E28] font-bold border border-[#D2CAB6]">
                            {sub.files.length} Files
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        sub.status === 'SHORTLISTED' ? 'bg-[#162E28] text-[#E5BE61] border border-[#A77A1C]/50' :
                        sub.status === 'REVIEWED' ? 'bg-[#2B3E35] text-[#F9F4EA] border border-[#D2CAB6]' :
                        sub.status === 'DISQUALIFIED' ? 'bg-red-900/20 text-red-900 border border-red-600/30' :
                        'bg-[#F3EDE0] text-[#7B8379] border border-[#D2CAB6]'
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
                        className="px-3 py-1 rounded-lg bg-[#162E28] border border-[#A77A1C]/40 text-[#E5BE61] hover:bg-[#2B3E35] text-[11px] font-mono font-bold transition inline-flex items-center gap-1"
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
        <div className="fixed inset-0 bg-[#162E28]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#E9E1D2] border border-[#A77A1C]/40 rounded-3xl p-6 max-w-2xl w-full space-y-5 text-left shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-[#D2CAB6] pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#162E28] uppercase">
                  SUBMISSION EVALUATION
                </h3>
                <p className="text-xs text-[#7B8379] font-mono">{activeSubmissionModal.teamName} ({activeSubmissionModal.teamId})</p>
              </div>
              <button onClick={() => setActiveSubmissionModal(null)} className="text-[#7B8379] hover:text-[#162E28] font-mono font-bold text-xs">
                ✕ CLOSE
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-[10px] font-mono text-[#7B8379] uppercase font-bold tracking-wider">PROJECT TITLE</div>
                <h4 className="font-serif font-bold text-lg text-[#162E28]">{activeSubmissionModal.projectTitle}</h4>
              </div>
              <p className="text-xs text-[#162E28] leading-relaxed font-sans bg-[#F9F4EA] p-3 rounded-xl border border-[#D2CAB6]">
                {activeSubmissionModal.description}
              </p>
            </div>

            {/* SUBMITTED ARTIFACTS & FILES SECTION */}
            <div className="space-y-2 border-t border-[#D2CAB6] pt-3">
              <div className="text-[10px] font-mono text-[#7B8379] uppercase font-bold flex items-center justify-between tracking-wider">
                <span>SUBMITTED ARTIFACTS & FILES</span>
                <span className="text-[#7B8379]">{activeSubmissionModal.files?.length || 0} Files</span>
              </div>

              {/* Links */}
              {(activeSubmissionModal.githubUrl || activeSubmissionModal.demoUrl) && (
                <div className="flex items-center gap-2 flex-wrap pb-1">
                  {activeSubmissionModal.githubUrl && (
                    <a
                      href={activeSubmissionModal.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#A77A1C] hover:underline text-xs font-mono font-bold flex items-center gap-1.5"
                    >
                      <Code2 className="w-3.5 h-3.5" /> Repository Code ↗
                    </a>
                  )}
                  {activeSubmissionModal.demoUrl && (
                    <a
                      href={activeSubmissionModal.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-[#162E28] border border-[#A77A1C]/40 text-[#E5BE61] hover:underline text-xs font-mono font-bold flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live Demo ↗
                    </a>
                  )}
                </div>
              )}

              {/* Files List */}
              {activeSubmissionModal.files && activeSubmissionModal.files.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {activeSubmissionModal.files.map((file) => (
                    <div key={file.id} className="p-3 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText className="w-4 h-4 text-[#A77A1C] shrink-0" />
                        <div className="truncate">
                          <div className="font-mono font-bold text-[#162E28] truncate">{file.filename}</div>
                          <div className="text-[10px] text-[#7B8379] font-mono">
                            {(file.fileSize / (1024 * 1024)).toFixed(2)} MB • {file.uploadDate ? new Date(file.uploadDate).toLocaleDateString() : 'Uploaded'}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => triggerFileDownload(file)}
                        className="px-3 py-1.5 rounded-lg bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] font-mono text-[11px] font-bold flex items-center gap-1 shrink-0 border border-[#A77A1C]/30 shadow-sm transition"
                      >
                        <Download className="w-3.5 h-3.5" /> DOWNLOAD FILE
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-xs font-mono text-[#7B8379] text-center">
                  No binary file attachments uploaded for this submission.
                </div>
              )}
            </div>

            <div className="space-y-2 border-t border-[#D2CAB6] pt-3">
              <div className="text-[10px] font-mono text-[#7B8379] uppercase font-bold tracking-wider">CHANGE SUBMISSION STATUS</div>
              <div className="flex items-center gap-2 flex-wrap">
                {(['SUBMITTED', 'UNDER_REVIEW', 'REVIEWED', 'SHORTLISTED', 'DISQUALIFIED'] as SubmissionStatus[]).map(st => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(activeSubmissionModal.id, st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
                      activeSubmissionModal.status === st
                        ? 'bg-[#162E28] text-[#E5BE61] border border-[#A77A1C]/50 shadow-md'
                        : 'bg-[#F9F4EA] text-[#7B8379] hover:text-[#162E28] border border-[#D2CAB6]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] font-mono text-[#7B8379] uppercase font-bold tracking-wider">PRIVATE EVALUATION NOTES</div>
              <textarea
                rows={3}
                value={evalNotes}
                onChange={(e) => setEvalNotes(e.target.value)}
                placeholder="Enter judging remarks..."
                className="w-full p-3 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs placeholder-[#7B8379] focus:outline-none focus:border-[#A77A1C]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-[#D2CAB6] pt-3">
              <button
                onClick={() => {
                  apiService.updateSubmissionStatus(activeSubmissionModal.id, activeSubmissionModal.status, evalNotes);
                  setSubmissions(apiService.getSubmissions());
                  setActiveSubmissionModal(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] border border-[#A77A1C]/40 text-xs font-bold font-mono"
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

