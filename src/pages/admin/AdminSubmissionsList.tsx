import React, { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  Code2, 
  Eye,
  Download,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { apiService } from '../../services/api';
import { triggerFileDownload } from '../../utils/downloadHelper';
import type { Submission } from '../../types/admin';

const HACKATHON_CHECKPOINTS = [
  { id: 'ALL', label: 'All 2-Hour Checkpoints' },
  { id: 'CP-02', label: 'Hour 02 — Checkpoint 1 (Setup & Problem Framing)' },
  { id: 'CP-04', label: 'Hour 04 — Checkpoint 2 (Architecture & Wireframes)' },
  { id: 'CP-06', label: 'Hour 06 — Checkpoint 3 (Backend & Data Models)' },
  { id: 'CP-08', label: 'Hour 08 — Checkpoint 4 (Core Logic & Initial API)' },
  { id: 'CP-10', label: 'Hour 10 — Checkpoint 5 (Frontend Integration)' },
  { id: 'CP-12', label: 'Hour 12 — Checkpoint 6 (Midpoint Demo Sprint)' },
  { id: 'CP-14', label: 'Hour 14 — Checkpoint 7 (Feature Implementation)' },
  { id: 'CP-16', label: 'Hour 16 — Checkpoint 8 (Advanced Modules)' },
  { id: 'CP-18', label: 'Hour 18 — Checkpoint 9 (System Testing & Fixes)' },
  { id: 'CP-20', label: 'Hour 20 — Checkpoint 10 (UI/UX & Performance Polish)' },
  { id: 'CP-22', label: 'Hour 22 — Checkpoint 11 (Demo Video & Pitch Deck)' },
  { id: 'CP-24', label: 'Hour 24 — Checkpoint 12 (Final Code & Project Freeze)' }
];

export const AdminSubmissionsList: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>(() => apiService.getSubmissions());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<string>('ALL');
  const [activeSubmissionModal, setActiveSubmissionModal] = useState<Submission | null>(null);
  const [evalNotes, setEvalNotes] = useState('');
  const [evalScore, setEvalScore] = useState<number>(85);
  const [evalCheckpointStatus, setEvalCheckpointStatus] = useState<'VERIFIED' | 'REVIEWED' | 'NEEDS_IMPROVEMENT'>('VERIFIED');

  const filteredSubmissions = submissions.filter(s => {
    const matchesSearch = 
      (s.teamId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.teamName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.projectTitle || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCheckpoint = selectedCheckpoint === 'ALL' || 
      (s.checkpoint && s.checkpoint.includes(selectedCheckpoint)) ||
      (selectedCheckpoint === 'CP-02' && (!s.checkpoint || s.checkpoint.includes('02') || s.checkpoint.includes('1')));

    return matchesSearch && matchesCheckpoint;
  });

  const handleSaveEvaluation = () => {
    if (!activeSubmissionModal) return;
    apiService.updateSubmissionStatus(
      activeSubmissionModal.id, 
      'REVIEWED', 
      `[${evalCheckpointStatus}] Score: ${evalScore}/100 • ${evalNotes}`
    );
    setSubmissions(apiService.getSubmissions());
    setActiveSubmissionModal(null);
  };

  return (
    <AdminLayout
      title="24-HOUR HACKATHON SUBMISSION CENTER"
      subtitle="Live 2-Hour Checkpoint Submissions • Milestone Deliverables & Real-Time Code Evaluations"
    >

      <div className="bg-[#E9E1D2] border border-[#D2CAB6] p-5 rounded-3xl space-y-4 shadow-sm text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="relative">
            <Search className="w-4 h-4 text-[#7B8379] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search team, delegate, project title..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs placeholder-[#7B8379] focus:outline-none focus:border-[#A77A1C]"
            />
          </div>

          <div className="relative">
            <select
              value={selectedCheckpoint}
              onChange={(e) => setSelectedCheckpoint(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs font-mono font-bold focus:outline-none focus:border-[#A77A1C] cursor-pointer"
            >
              {HACKATHON_CHECKPOINTS.map(cp => (
                <option key={cp.id} value={cp.id}>{cp.label}</option>
              ))}
            </select>
          </div>

          <div className="text-right text-xs font-mono text-[#7B8379] flex items-center justify-end gap-2">
            <Clock className="w-4 h-4 text-[#A77A1C]" />
            <span>2-Hour Checkpoint Submissions: <strong className="text-[#162E28] font-bold">{submissions.length}</strong></span>
          </div>
        </div>
      </div>

      <div className="bg-[#E9E1D2] border border-[#D2CAB6] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#162E28] border-b border-[#A77A1C]/30 text-[#F9F4EA] font-mono text-[10px] uppercase font-bold tracking-wider">
                <th className="py-3.5 px-4">Delegate / Team</th>
                <th className="py-3.5 px-4">Project Title</th>
                <th className="py-3.5 px-4">Track</th>
                <th className="py-3.5 px-4">Checkpoint Interval</th>
                <th className="py-3.5 px-4">Submitted Time</th>
                <th className="py-3.5 px-4">Artifacts</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D2CAB6]/60 text-xs">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#7B8379] font-mono">
                    No checkpoint submissions uploaded yet for this 2-hour window.
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((sub, idx) => (
                  <tr key={sub.id || idx} className="hover:bg-[#F9F4EA]/60 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#162E28] font-serif">{sub.teamName || 'Delegate Submission'}</div>
                      <span className="text-[10px] font-mono text-[#A77A1C]">
                        {sub.teamId || `SUB-${idx + 1}`}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 max-w-[240px]">
                      <div className="font-bold text-[#162E28] truncate">{sub.projectTitle || '24h Hackathon Milestone Project'}</div>
                      <div className="text-[10px] text-[#7B8379] truncate">{sub.description || 'Sprint milestone submission'}</div>
                    </td>

                    <td className="py-3.5 px-4 text-[#162E28]/80 font-mono text-[11px] max-w-[160px] truncate">
                      {sub.trackTitle || 'National Innovation Track'}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#162E28] text-[#E5BE61] border border-[#A77A1C]/40 inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#E5BE61]" />
                        {sub.checkpoint || 'Hour 02 Checkpoint'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-[#7B8379] font-mono text-[11px]">
                      {sub.submittedAt ? new Date(sub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Live Sprint'}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        {sub.githubUrl && (
                          <span title="Repository Link">
                            <Code2 className="w-4 h-4 text-[#A77A1C]" />
                          </span>
                        )}
                        {sub.demoUrl && (
                          <span title="Demo Link">
                            <ExternalLink className="w-4 h-4 text-emerald-800" />
                          </span>
                        )}
                        {sub.files && sub.files.length > 0 && (
                          <span className="text-[10px] font-mono bg-[#F9F4EA] px-2 py-0.5 rounded-full text-[#162E28] font-bold border border-[#D2CAB6]">
                            {sub.files.length} Files
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setActiveSubmissionModal(sub);
                          setEvalNotes(sub.adminNotes || '');
                          setEvalScore(sub.score || 85);
                        }}
                        className="px-3 py-1 rounded-lg bg-[#162E28] border border-[#A77A1C]/40 text-[#E5BE61] hover:bg-[#2B3E35] text-[11px] font-mono font-bold transition inline-flex items-center gap-1 cursor-pointer"
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

      {activeSubmissionModal && (
        <div className="fixed inset-0 bg-[#162E28]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#E9E1D2] border border-[#A77A1C]/40 rounded-3xl p-6 max-w-2xl w-full space-y-5 text-left shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-[#D2CAB6] pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#162E28] uppercase flex items-center gap-2">
                  <span>2-HOUR CHECKPOINT EVALUATION</span>
                  <span className="text-xs font-mono font-bold bg-[#162E28] text-[#E5BE61] px-2 py-0.5 rounded-md">
                    {activeSubmissionModal.checkpoint || 'Hour 02 Checkpoint'}
                  </span>
                </h3>
                <p className="text-xs text-[#7B8379] font-mono mt-0.5">{activeSubmissionModal.teamName} ({activeSubmissionModal.teamId})</p>
              </div>
              <button 
                onClick={() => setActiveSubmissionModal(null)} 
                className="text-[#7B8379] hover:text-[#162E28] font-mono font-bold text-xs cursor-pointer"
              >
                ✕ CLOSE
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-[10px] font-mono text-[#7B8379] uppercase font-bold tracking-wider">PROJECT MILESTONE</div>
                <h4 className="font-serif font-bold text-lg text-[#162E28]">{activeSubmissionModal.projectTitle || 'Checkpoint Sprint Progress'}</h4>
              </div>
              <p className="text-xs text-[#162E28] leading-relaxed font-sans bg-[#F9F4EA] p-3 rounded-xl border border-[#D2CAB6]">
                {activeSubmissionModal.description || 'Milestone checkpoint submission for the 24-hour sprint.'}
              </p>
            </div>

            <div className="space-y-2 border-t border-[#D2CAB6] pt-3">
              <div className="text-[10px] font-mono text-[#7B8379] uppercase font-bold flex items-center justify-between tracking-wider">
                <span>SUBMITTED CODE & ARTIFACTS</span>
                <span className="text-[#7B8379]">{activeSubmissionModal.files?.length || 0} Files</span>
              </div>

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
                        className="px-3 py-1.5 rounded-lg bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] font-mono text-[11px] font-bold flex items-center gap-1 shrink-0 border border-[#A77A1C]/30 shadow-sm transition cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" /> DOWNLOAD FILE
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-xs font-mono text-[#7B8379] text-center">
                  No binary file attachments uploaded for this milestone checkpoint.
                </div>
              )}
            </div>

            <div className="space-y-3 border-t border-[#D2CAB6] pt-3">
              <div className="text-[10px] font-mono text-[#7B8379] uppercase font-bold tracking-wider">CHECKPOINT EVALUATION STATUS</div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setEvalCheckpointStatus('VERIFIED')}
                  className={`p-2.5 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition border cursor-pointer ${
                    evalCheckpointStatus === 'VERIFIED'
                      ? 'bg-[#162E28] text-[#E5BE61] border-[#A77A1C]'
                      : 'bg-[#F9F4EA] text-[#7B8379] border-[#D2CAB6]'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED
                </button>
                <button
                  type="button"
                  onClick={() => setEvalCheckpointStatus('REVIEWED')}
                  className={`p-2.5 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition border cursor-pointer ${
                    evalCheckpointStatus === 'REVIEWED'
                      ? 'bg-[#162E28] text-[#E5BE61] border-[#A77A1C]'
                      : 'bg-[#F9F4EA] text-[#7B8379] border-[#D2CAB6]'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" /> REVIEWED
                </button>
                <button
                  type="button"
                  onClick={() => setEvalCheckpointStatus('NEEDS_IMPROVEMENT')}
                  className={`p-2.5 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition border cursor-pointer ${
                    evalCheckpointStatus === 'NEEDS_IMPROVEMENT'
                      ? 'bg-amber-900/20 text-amber-900 border-amber-600/40'
                      : 'bg-[#F9F4EA] text-[#7B8379] border-[#D2CAB6]'
                  }`}
                >
                  <AlertCircle className="w-3.5 h-3.5" /> NEEDS WORK
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-mono text-[#7B8379] uppercase font-bold tracking-wider">CHECKPOINT SCORE (0 - 100)</div>
                <span className="font-mono font-black text-sm text-[#162E28]">{evalScore} / 100</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={evalScore}
                onChange={(e) => setEvalScore(Number(e.target.value))}
                className="w-full accent-[#162E28] cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="text-[10px] font-mono text-[#7B8379] uppercase font-bold tracking-wider">JUDGE REMARKS & MENTOR FEEDBACK</div>
              <textarea
                rows={3}
                value={evalNotes}
                onChange={(e) => setEvalNotes(e.target.value)}
                placeholder="Enter feedback for this 2-hour checkpoint submission..."
                className="w-full p-3 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs placeholder-[#7B8379] focus:outline-none focus:border-[#A77A1C]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-[#D2CAB6] pt-3">
              <button
                type="button"
                onClick={handleSaveEvaluation}
                className="px-6 py-2.5 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] border border-[#A77A1C]/40 text-xs font-bold font-mono shadow-md cursor-pointer"
              >
                SAVE EVALUATION
              </button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
};

export default AdminSubmissionsList;
