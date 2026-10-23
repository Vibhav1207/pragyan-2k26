import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Download, 
  Upload, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Unlock, 
  Layers, 
  Search,
  Calendar, 
  X,
  Award
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { apiService } from '../../services/api';
import type { AdminProblemStatement, Track } from '../../types/admin';
import { downloadProblemStatementWordDoc } from '../../utils/wordDocHelper';

export const AdminProblemStatements: React.FC = () => {
  const [problemStatements, setProblemStatements] = useState<AdminProblemStatement[]>(() => 
    apiService.getProblemStatements(true)
  );
  const [tracks, setTracks] = useState<Track[]>(() => apiService.getTracks());
  const [selectedTrackFilter, setSelectedTrackFilter] = useState<string>('ALL');
  const [selectedSubTrackFilter, setSelectedSubTrackFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPs, setEditingPs] = useState<AdminProblemStatement | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    trackId: 'TRK-01',
    trackTitle: 'FINTECH & FINANCIAL INNOVATION',
    subTrack: '',
    title: '',
    description: '',
    context: '',
    documentName: '',
    documentUrl: '',
    documentSize: '',
    fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    isVisible: false, // Default HIDDEN as requested
    releaseAt: '2026-10-24T12:00:00',
    difficulty: 'Intermediate' as 'Intermediate' | 'Advanced'
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadFileName, setUploadFileName] = useState<string>('');
  const [uploadFileSize, setUploadFileSize] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    apiService.fetchProblemStatementsAsync(true).then((fresh) => {
      if (isMounted && fresh) setProblemStatements(fresh);
    });
    setTracks(apiService.getTracks());
    return () => { isMounted = false; };
  }, []);

  const showNotification = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setFeedbackMessage({ text, type });
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  const reloadData = async () => {
    setProblemStatements(apiService.getProblemStatements(true));
    try {
      const fresh = await apiService.fetchProblemStatementsAsync(true);
      if (fresh) setProblemStatements(fresh);
    } catch {}
  };

  const handleOpenCreate = () => {
    setEditingPs(null);
    const defaultTrack = tracks[0] || { id: 'TRK-01', title: 'FINTECH & FINANCIAL INNOVATION' };
    setFormData({
      trackId: defaultTrack.id,
      trackTitle: defaultTrack.title,
      subTrack: '',
      title: '',
      description: '',
      context: '',
      documentName: '',
      documentUrl: '',
      documentSize: '',
      fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      isVisible: true, // Set to visible so participants can see it
      releaseAt: '2026-10-24T12:00:00',
      difficulty: 'Intermediate'
    });
    setUploadFileName('');
    setUploadFileSize('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ps: AdminProblemStatement) => {
    setEditingPs(ps);
    setFormData({
      trackId: ps.trackId,
      trackTitle: ps.trackTitle,
      subTrack: ps.subTrack || '',
      title: ps.title,
      description: ps.description || '',
      context: ps.context || '',
      documentName: ps.documentName || '',
      documentUrl: ps.documentUrl || '',
      documentSize: ps.documentSize || '',
      fileType: ps.fileType || 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      isVisible: ps.isVisible,
      releaseAt: ps.releaseAt ? ps.releaseAt.slice(0, 16) : '2026-10-24T12:00',
      difficulty: ps.difficulty || 'Intermediate'
    });
    setUploadFileName(ps.documentName || '');
    setUploadFileSize(ps.documentSize || '');
    setIsModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeFormatted = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(file.size / 1024)} KB`;

    setUploadFileName(file.name);
    setUploadFileSize(sizeFormatted);

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setFormData(prev => ({
        ...prev,
        documentName: file.name,
        documentUrl: base64,
        documentSize: sizeFormatted,
        fileType: file.type || 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a Problem Statement title');
      return;
    }

    const selectedTrack = tracks.find(t => t.id === formData.trackId);
    const finalTrackTitle = selectedTrack ? selectedTrack.title : formData.trackTitle;

    const docName = formData.documentName || `${formData.title.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '_')}_Brief.docx`;
    const docSize = formData.documentSize || '150 KB';

    if (editingPs) {
      await apiService.updateProblemStatement(editingPs.id, {
        ...formData,
        trackTitle: finalTrackTitle,
        subTrack: formData.subTrack.trim(),
        documentName: docName,
        documentSize: docSize,
        releaseAt: formData.releaseAt ? new Date(formData.releaseAt).toISOString() : undefined
      });
      showNotification(`Updated problem statement: "${formData.title}"`, 'success');
    } else {
      await apiService.createProblemStatement({
        ...formData,
        trackTitle: finalTrackTitle,
        subTrack: formData.subTrack.trim(),
        documentName: docName,
        documentSize: docSize,
        order: problemStatements.filter(p => p.trackId === formData.trackId).length + 1,
        releaseAt: formData.releaseAt ? new Date(formData.releaseAt).toISOString() : undefined
      });
      showNotification(`Saved and published problem statement: "${formData.title}"`, 'success');
    }

    await reloadData();
    setIsModalOpen(false);
  };

  const handleToggleVisibility = async (ps: AdminProblemStatement) => {
    const nextState = !ps.isVisible;
    // Optimistic UI update immediately
    const norm = (s?: string) => (s || '').trim().toLowerCase().replace(/^ps-/, '');
    const targetNorm = norm(ps.id);

    setProblemStatements(prev => prev.map(p => {
      const isMatch = norm(p.id) === targetNorm || norm((p as any).psId) === targetNorm || norm((p as any)._id) === targetNorm;
      return isMatch ? { ...p, isVisible: nextState } : p;
    }));

    await apiService.toggleProblemStatementVisibility(ps.id, nextState);
    await reloadData();
    showNotification(
      `Problem Statement "${ps.title.slice(0, 35)}..." is now ${nextState ? 'VISIBLE to participants' : 'HIDDEN from participants'}`,
      nextState ? 'success' : 'info'
    );
  };

  const handleBulkTrackVisibility = async (trackId: string, isVisible: boolean) => {
    // Optimistic UI update
    setProblemStatements(prev => prev.map(p => {
      if (p.trackId === trackId) {
        return { ...p, isVisible };
      }
      return p;
    }));

    await apiService.bulkUpdateProblemStatementVisibility(isVisible, trackId);
    await reloadData();
    showNotification(
      `All Problem Statements in Track ${trackId} are now ${isVisible ? 'VISIBLE' : 'HIDDEN'}`,
      isVisible ? 'success' : 'info'
    );
  };

  const handleMasterToggleAll = async (isVisible: boolean) => {
    if (window.confirm(`Are you sure you want to set ALL problem statements to ${isVisible ? 'VISIBLE' : 'HIDDEN'} for participants?`)) {
      // Optimistic UI update
      setProblemStatements(prev => prev.map(p => ({ ...p, isVisible })));

      await apiService.bulkUpdateProblemStatementVisibility(isVisible);
      await reloadData();
      showNotification(
        `All problem statements across all tracks are now ${isVisible ? 'UNLOCKED & VISIBLE' : 'LOCKED & HIDDEN'}`,
        isVisible ? 'success' : 'info'
      );
    }
  };

  const handleDelete = async (ps: AdminProblemStatement) => {
    if (window.confirm(`Delete Problem Statement "${ps.title}"?`)) {
      await apiService.deleteProblemStatement(ps.id);
      await reloadData();
      showNotification(`Deleted problem statement "${ps.title}"`, 'error');
    }
  };

  // Filtered list
  const availableSubTracks = Array.from(new Set(
    problemStatements
      .filter(ps => selectedTrackFilter === 'ALL' || ps.trackId === selectedTrackFilter)
      .map(ps => ps.subTrack)
      .filter((s): s is string => Boolean(s && s.trim()))
  ));

  const filteredList = problemStatements.filter(ps => {
    const matchesTrack = selectedTrackFilter === 'ALL' || ps.trackId === selectedTrackFilter;
    const matchesSubTrack = selectedSubTrackFilter === 'ALL' || ps.subTrack === selectedSubTrackFilter;
    const matchesSearch = 
      ps.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ps.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ps.description && ps.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (ps.subTrack && ps.subTrack.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ps.trackTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTrack && matchesSubTrack && matchesSearch;
  });

  const totalCount = problemStatements.length;
  const visibleCount = problemStatements.filter(p => p.isVisible).length;
  const hiddenCount = totalCount - visibleCount;

  return (
    <AdminLayout
      title="PROBLEM STATEMENTS MANAGEMENT"
      subtitle="Manage Problem Statements per track, upload Word documents (.docx/.doc), and control timed visibility for participants"
    >
      {/* Toast Feedback Notification */}
      {feedbackMessage && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl border font-mono text-xs font-bold flex items-center gap-2.5 transition-all animate-bounce ${
          feedbackMessage.type === 'success' 
            ? 'bg-[#162E28] text-[#E5BE61] border-[#A77A1C]' 
            : feedbackMessage.type === 'error'
            ? 'bg-red-950 text-red-200 border-red-500'
            : 'bg-[#2B3E35] text-[#F9F4EA] border-[#A77A1C]/50'
        }`}>
          {feedbackMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-amber-400" />}
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {/* Overview & Public Visibility Control Banner */}
      <div className="bg-[#E9E1D2] border border-[#D2CAB6] p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#D2CAB6] pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#162E28] text-[#E5BE61] uppercase tracking-wider">
                PARTICIPANT VISIBILITY STATUS
              </span>
              <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase flex items-center gap-1 ${
                visibleCount > 0 ? 'bg-emerald-900/20 text-emerald-900 border border-emerald-600/40' : 'bg-amber-900/20 text-amber-900 border border-amber-600/40'
              }`}>
                {visibleCount > 0 ? (
                  <>
                    <Eye className="w-3 h-3 text-emerald-700" />
                    <span>{visibleCount} PS LIVE TO USERS</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3 h-3 text-amber-800" />
                    <span>ALL HIDDEN BY DEFAULT (SECURE)</span>
                  </>
                )}
              </span>
            </div>
            <h2 className="font-serif font-black text-2xl text-[#162E28] uppercase">
              HACKATHON PROBLEM STATEMENTS REPOSITORY
            </h2>
            <p className="text-xs text-[#7B8379] font-sans max-w-2xl">
              By default, all problem statements are <strong className="text-[#162E28]">hidden</strong> to protect confidential hackathon challenges. 
              Organizers can unhide individual problem statements or unlock full tracks in real time when the hackathon countdown concludes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleMasterToggleAll(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-900/20 hover:bg-emerald-900/30 text-emerald-900 border border-emerald-600/40 font-mono font-bold text-xs flex items-center gap-2 transition shadow-sm"
              title="Make all problem statements visible on public portal"
            >
              <Unlock className="w-4 h-4 text-emerald-700" />
              <span>UNHIDE ALL FOR USERS</span>
            </button>

            <button
              onClick={() => handleMasterToggleAll(false)}
              className="px-4 py-2.5 rounded-xl bg-amber-900/20 hover:bg-amber-900/30 text-amber-900 border border-amber-600/40 font-mono font-bold text-xs flex items-center gap-2 transition shadow-sm"
              title="Hide all problem statements from public view"
            >
              <Lock className="w-4 h-4 text-amber-800" />
              <span>HIDE ALL (LOCKDOWN)</span>
            </button>

            <Link
              to="/admin/challenges"
              className="px-4 py-2.5 rounded-xl bg-[#E5BE61] hover:bg-[#D9B255] text-[#162E28] font-mono font-bold text-xs flex items-center gap-2 shadow-sm transition"
            >
              <Award className="w-4 h-4 text-[#162E28]" />
              <span>MANAGE 5 CHALLENGES</span>
            </Link>

            <button
              onClick={handleOpenCreate}
              className="px-5 py-2.5 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] border border-[#A77A1C]/50 font-mono font-bold text-xs flex items-center gap-2 shadow-md transition"
            >
              <Plus className="w-4 h-4 text-[#E5BE61]" />
              <span>ADD PROBLEM STATEMENT</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#F9F4EA] p-4 rounded-2xl border border-[#D2CAB6] space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#7B8379] uppercase">TOTAL PROBLEM STATEMENTS</span>
            <div className="font-serif font-black text-3xl text-[#162E28]">{totalCount}</div>
            <span className="text-[10px] font-mono text-[#A77A1C] font-semibold">Across {tracks.length} Innovation Tracks</span>
          </div>

          <div className="bg-[#F9F4EA] p-4 rounded-2xl border border-[#D2CAB6] space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#7B8379] uppercase">HIDDEN (DEFAULT SAFE)</span>
            <div className="font-serif font-black text-3xl text-amber-800">{hiddenCount}</div>
            <span className="text-[10px] font-mono text-amber-700 font-semibold flex items-center gap-1">
              <Lock className="w-3 h-3" /> Not visible to public
            </span>
          </div>

          <div className="bg-[#F9F4EA] p-4 rounded-2xl border border-[#D2CAB6] space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#7B8379] uppercase">UNHIDDEN / LIVE</span>
            <div className="font-serif font-black text-3xl text-emerald-800">{visibleCount}</div>
            <span className="text-[10px] font-mono text-emerald-700 font-semibold flex items-center gap-1">
              <Eye className="w-3 h-3" /> Visible on portal
            </span>
          </div>

          <div className="bg-[#F9F4EA] p-4 rounded-2xl border border-[#D2CAB6] space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#7B8379] uppercase">DOCUMENTS ATTACHED</span>
            <div className="font-serif font-black text-3xl text-[#162E28]">
              {problemStatements.filter(p => p.documentName).length}
            </div>
            <span className="text-[10px] font-mono text-[#7B8379] font-semibold flex items-center gap-1">
              <FileText className="w-3 h-3 text-[#A77A1C]" /> Word docs (.docx / .doc)
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Track Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full custom-scrollbar">
          <button
            onClick={() => setSelectedTrackFilter('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition ${
              selectedTrackFilter === 'ALL'
                ? 'bg-[#162E28] text-[#E5BE61] shadow-sm'
                : 'bg-[#E9E1D2] text-[#7B8379] hover:text-[#162E28]'
            }`}
          >
            ALL TRACKS ({problemStatements.length})
          </button>
          {tracks.map((tr, idx) => {
            const countInTrack = problemStatements.filter(p => p.trackId === tr.id).length;
            const isSelected = selectedTrackFilter === tr.id;
            return (
              <button
                key={tr.id}
                onClick={() => setSelectedTrackFilter(tr.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#162E28] text-[#E5BE61] shadow-sm'
                    : 'bg-[#E9E1D2] text-[#7B8379] hover:text-[#162E28]'
                }`}
              >
                <span>TRACK {idx + 1}: {tr.title.split('&')[0].trim()}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/10 font-mono">
                  {countInTrack}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {availableSubTracks.length > 0 && (
            <div className="flex items-center gap-1.5 bg-[#E9E1D2] px-3 py-1.5 rounded-xl border border-[#D2CAB6]">
              <span className="text-[10px] font-mono font-bold text-[#7B8379] uppercase">SUBTRACK:</span>
              <select
                value={selectedSubTrackFilter}
                onChange={(e) => setSelectedSubTrackFilter(e.target.value)}
                className="bg-transparent text-xs font-mono font-bold text-[#162E28] focus:outline-none cursor-pointer"
              >
                <option value="ALL">ALL ({availableSubTracks.length})</option>
                {availableSubTracks.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          )}

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7B8379]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problem statements or ID..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#E9E1D2] border border-[#D2CAB6] text-xs font-mono text-[#162E28] placeholder-[#7B8379] focus:outline-none focus:border-[#A77A1C] transition"
            />
          </div>
        </div>
      </div>

      {/* Track Bulk Actions if a specific track is selected */}
      {selectedTrackFilter !== 'ALL' && (
        <div className="p-4 rounded-2xl bg-[#E9E1D2]/80 border border-[#D2CAB6] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#162E28] uppercase">TRACK QUICK ACTIONS:</span>
            <span className="text-[#7B8379]">Manage visibility for all PS in this track at once</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkTrackVisibility(selectedTrackFilter, true)}
              className="px-3 py-1.5 rounded-lg bg-emerald-900/20 text-emerald-900 border border-emerald-600/40 font-bold hover:bg-emerald-900/30 transition flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Unhide Track PS</span>
            </button>
            <button
              onClick={() => handleBulkTrackVisibility(selectedTrackFilter, false)}
              className="px-3 py-1.5 rounded-lg bg-amber-900/20 text-amber-900 border border-amber-600/40 font-bold hover:bg-amber-900/30 transition flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Hide Track PS</span>
            </button>
          </div>
        </div>
      )}

      {/* Problem Statements Cards List */}
      <div className="space-y-4">
        {filteredList.length === 0 ? (
          <div className="bg-[#E9E1D2] border border-[#D2CAB6] rounded-3xl p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F9F4EA] border border-[#A77A1C]/40 mx-auto flex items-center justify-center text-[#A77A1C]">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-black text-lg text-[#162E28] uppercase">NO PROBLEM STATEMENTS FOUND</h3>
              <p className="text-xs text-[#7B8379] font-sans mt-1">
                {searchQuery ? 'No problem statements match your search criteria.' : 'No problem statements added for this track yet.'}
              </p>
            </div>
            <button
              onClick={handleOpenCreate}
              className="px-4 py-2 rounded-xl bg-[#162E28] text-[#E5BE61] font-mono font-bold text-xs uppercase"
            >
              + Create First Problem Statement
            </button>
          </div>
        ) : (
          filteredList.map((ps) => {
            const trackObj = tracks.find(t => t.id === ps.trackId);
            const trackDisplayName = trackObj ? trackObj.title : ps.trackTitle;

            return (
              <div
                key={ps.id}
                className={`bg-[#E9E1D2] border rounded-3xl p-5 sm:p-6 transition-all shadow-sm space-y-4 ${
                  ps.isVisible 
                    ? 'border-emerald-600/40 bg-[#E9E1D2]' 
                    : 'border-[#D2CAB6] bg-[#F3EDE0]/90'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Title and Badges */}
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono font-bold">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#162E28] text-[#E5BE61] uppercase tracking-wider">
                        {ps.id}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F9F4EA] text-[#A77A1C] border border-[#D2CAB6] uppercase">
                        {trackDisplayName}
                      </span>
                      {ps.subTrack && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#162E28]/10 text-[#162E28] border border-[#162E28]/25 uppercase font-bold">
                          {ps.subTrack}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-md bg-[#F9F4EA] text-[#7B8379] border border-[#D2CAB6]">
                        {ps.difficulty || 'Intermediate'}
                      </span>

                      {/* Visibility Pill */}
                      {ps.isVisible ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-900/20 text-emerald-900 border border-emerald-600/40 uppercase flex items-center gap-1">
                          <Eye className="w-3 h-3 text-emerald-700" />
                          <span>VISIBLE TO PARTICIPANTS</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-900/20 text-amber-900 border border-amber-600/40 uppercase flex items-center gap-1">
                          <Lock className="w-3 h-3 text-amber-800" />
                          <span>HIDDEN (NOT VISIBLE)</span>
                        </span>
                      )}

                      {ps.releaseAt && (
                        <span className="px-2 py-0.5 rounded-md bg-[#F9F4EA] text-[#7B8379] border border-[#D2CAB6] flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#A77A1C]" />
                          <span>Release: {new Date(ps.releaseAt).toLocaleDateString()} {new Date(ps.releaseAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif font-black text-lg sm:text-xl text-[#162E28] leading-snug">
                      {ps.title}
                    </h3>

                    {ps.description && (
                      <p className="text-xs text-[#7B8379] font-sans line-clamp-2 max-w-4xl">
                        {ps.description}
                      </p>
                    )}
                  </div>

                  {/* Actions & Buttons */}
                  <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center">
                    {/* Toggle Visibility Button */}
                    <button
                      onClick={() => handleToggleVisibility(ps)}
                      className={`px-3.5 py-2 rounded-xl font-mono font-bold text-xs flex items-center gap-1.5 border transition ${
                        ps.isVisible
                          ? 'bg-amber-900/20 text-amber-900 border-amber-600/40 hover:bg-amber-900/30'
                          : 'bg-emerald-900/20 text-emerald-900 border-emerald-600/40 hover:bg-emerald-900/30'
                      }`}
                      title={ps.isVisible ? 'Click to Hide from users' : 'Click to Unhide for users'}
                    >
                      {ps.isVisible ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-amber-800" />
                          <span>HIDE FROM USERS</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5 text-emerald-700" />
                          <span>UNHIDE FOR USERS</span>
                        </>
                      )}
                    </button>

                    {/* Download Word Doc Button */}
                    <button
                      onClick={() => downloadProblemStatementWordDoc(ps)}
                      className="px-3.5 py-2 rounded-xl bg-[#F9F4EA] hover:bg-white text-[#162E28] border border-[#D2CAB6] font-mono font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                      title="Download full specification Word Document (.docx)"
                    >
                      <Download className="w-3.5 h-3.5 text-[#A77A1C]" />
                      <span>DOWNLOAD DOC</span>
                    </button>

                    {/* Edit Button */}
                    <button
                      onClick={() => handleOpenEdit(ps)}
                      className="p-2 rounded-xl bg-[#F9F4EA] hover:bg-white text-[#162E28] border border-[#D2CAB6] transition"
                      title="Edit Problem Statement details or document"
                    >
                      <Edit className="w-4 h-4 text-[#A77A1C]" />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(ps)}
                      className="p-2 rounded-xl bg-red-900/10 hover:bg-red-900/20 text-red-700 border border-red-300 transition"
                      title="Delete Problem Statement"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Attached Document Banner */}
                <div className="pt-2 border-t border-[#D2CAB6]/60 flex flex-wrap items-center justify-between text-xs font-mono text-[#7B8379]">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#A77A1C]" />
                    <span className="font-bold text-[#162E28]">{ps.documentName || 'Official_Problem_Brief.docx'}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F9F4EA] text-[#7B8379] border border-[#D2CAB6]">
                      {ps.documentSize || '150 KB'}
                    </span>
                    <span className="text-[10px] text-emerald-800 font-semibold">
                      ✓ Word Document Ready for Download
                    </span>
                  </div>

                  <span className="text-[10px] text-[#7B8379]">
                    Added: {ps.createdAt ? new Date(ps.createdAt).toLocaleDateString() : 'Active'}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create / Edit Problem Statement Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#F9F4EA] border border-[#A77A1C]/50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between border-b border-[#D2CAB6] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#A77A1C] uppercase tracking-wider">
                  {editingPs ? 'UPDATE SPECIFICATION' : 'ADD NEW SPECIFICATION'}
                </span>
                <h3 className="font-serif font-black text-xl text-[#162E28] uppercase">
                  {editingPs ? 'EDIT PROBLEM STATEMENT' : 'CREATE PROBLEM STATEMENT'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl bg-[#E9E1D2] hover:bg-[#D2CAB6] text-[#162E28] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs font-mono">
              {/* Track Selection */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#162E28] uppercase flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#A77A1C]" />
                  <span>Innovation Track *</span>
                </label>
                <select
                  value={formData.trackId}
                  onChange={(e) => {
                    const sel = tracks.find(t => t.id === e.target.value);
                    setFormData(prev => ({
                      ...prev,
                      trackId: e.target.value,
                      trackTitle: sel ? sel.title : prev.trackTitle
                    }));
                  }}
                  className="w-full p-3 rounded-xl bg-[#E9E1D2] border border-[#D2CAB6] text-[#162E28] font-bold focus:outline-none focus:border-[#A77A1C]"
                >
                  {tracks.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.title} ({t.id})
                    </option>
                  ))}
                </select>
              </div>

              {/* Subtrack / Domain */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#162E28] uppercase flex items-center justify-between">
                  <span>Subtrack / Domain (Optional)</span>
                  <span className="text-[10px] text-[#7B8379] font-normal">e.g. Subtrack 1, Rural Banking, Agentic AI</span>
                </label>
                <input
                  type="text"
                  value={formData.subTrack}
                  onChange={(e) => setFormData(prev => ({ ...prev, subTrack: e.target.value }))}
                  placeholder="e.g. Subtrack 1: Digital Micro-Financing & Inclusion"
                  className="w-full p-3 rounded-xl bg-[#E9E1D2] border border-[#D2CAB6] text-[#162E28] placeholder-[#7B8379] focus:outline-none focus:border-[#A77A1C]"
                />
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#162E28] uppercase">
                  Problem Statement Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Hyper-Localized Micro-Credit & AI Credit Scoring for Rural Agri-SMEs"
                  className="w-full p-3 rounded-xl bg-[#E9E1D2] border border-[#D2CAB6] text-[#162E28] placeholder-[#7B8379] focus:outline-none focus:border-[#A77A1C]"
                >
                </input>
              </div>

              {/* Word Document Upload Field */}
              <div className="space-y-2 p-4 rounded-2xl bg-[#E9E1D2] border border-[#D2CAB6]">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-[#162E28] uppercase flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#A77A1C]" />
                    <span>Upload Word Document (.docx / .doc)</span>
                  </label>
                  <span className="text-[10px] text-[#7B8379]">Optional (Auto-generated if left blank)</span>
                </div>

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#A77A1C]/60 hover:border-[#162E28] p-4 rounded-xl text-center cursor-pointer bg-[#F9F4EA]/60 transition"
                >
                  <Upload className="w-6 h-6 text-[#A77A1C] mx-auto mb-1" />
                  <div className="font-bold text-[#162E28]">
                    {uploadFileName || formData.documentName || 'Click to choose Word Document (.docx, .doc, .pdf)'}
                  </div>
                  <div className="text-[10px] text-[#7B8379] mt-0.5">
                    {uploadFileSize || formData.documentSize || 'Supports Microsoft Word (.docx, .doc) & PDF'}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".doc,.docx,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Visibility & Scheduling Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#E9E1D2] border border-[#D2CAB6]">
                {/* Instant Visibility Toggle */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#162E28] uppercase flex items-center gap-1.5">
                    {formData.isVisible ? <Eye className="w-3.5 h-3.5 text-emerald-700" /> : <Lock className="w-3.5 h-3.5 text-amber-800" />}
                    <span>Initial Visibility Status</span>
                  </label>
                  <div 
                    onClick={() => setFormData(prev => ({ ...prev, isVisible: !prev.isVisible }))}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] cursor-pointer"
                  >
                    <span className="font-bold">
                      {formData.isVisible ? '✓ UNHIDDEN (Live)' : '✕ HIDDEN BY DEFAULT'}
                    </span>
                    <div className={`w-8 h-4 rounded-full transition-colors relative ${formData.isVisible ? 'bg-emerald-600' : 'bg-gray-400'}`}>
                      <div className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${formData.isVisible ? 'translate-x-4' : 'translate-x-0.5'} mt-0.2`} />
                    </div>
                  </div>
                  <span className="text-[10px] text-[#7B8379]">
                    Keep hidden by default until hackathon announcement time
                  </span>
                </div>

                {/* Scheduled Release Date/Time */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#162E28] uppercase flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#A77A1C]" />
                    <span>Timed Release (Auto Unlock)</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.releaseAt}
                    onChange={(e) => setFormData(prev => ({ ...prev, releaseAt: e.target.value }))}
                    className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] font-mono focus:outline-none focus:border-[#A77A1C]"
                  />
                  <span className="text-[10px] text-[#7B8379]">
                    Auto-reveals when this time is reached
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#D2CAB6]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#E9E1D2] hover:bg-[#D2CAB6] text-[#162E28] font-bold transition"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] border border-[#A77A1C]/50 font-bold transition shadow-md"
                >
                  {editingPs ? 'SAVE CHANGES' : 'CREATE PROBLEM STATEMENT'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProblemStatements;
