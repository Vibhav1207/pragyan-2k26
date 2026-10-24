import React, { useState, useEffect } from 'react';
import { 
  Award, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  Edit3, 
  X, 
  Clock
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { apiService } from '../../services/api';
import type { HackathonChallenge } from '../../types/admin';

export const AdminChallenges: React.FC = () => {
  const [challenges, setChallenges] = useState<HackathonChallenge[]>(() => apiService.getChallenges(true));
  const [editingChallenge, setEditingChallenge] = useState<HackathonChallenge | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [selectedPsFilter, setSelectedPsFilter] = useState<string>('ALL');

  const filteredList = selectedPsFilter === 'ALL'
    ? challenges
    : challenges.filter(c => c.psId === selectedPsFilter);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    timeframe: '',
    trackId: 'all',
    psId: '',
    isEnabled: false
  });

  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const loadChallenges = async () => {
    try {
      const fresh = await apiService.fetchChallengesAsync(true);
      if (fresh) {
        setChallenges(fresh);
      }
    } catch {
      setChallenges(apiService.getChallenges(true));
    }
  };

  useEffect(() => {
    loadChallenges();
    const handleUpdate = () => loadChallenges();
    window.addEventListener('pragyan_challenges_updated', handleUpdate);
    return () => window.removeEventListener('pragyan_challenges_updated', handleUpdate);
  }, []);

  const handleToggle = async (c: HackathonChallenge) => {
    const nextState = !c.isEnabled;
    await apiService.toggleChallenge(c.challengeId, nextState);
    await loadChallenges();
    showNotification(
      `Challenge ${c.challengeNumber} is now ${nextState ? 'LIVE to all participants' : 'LOCKED/HIDDEN from participants'}!`,
      nextState ? 'success' : 'info'
    );
  };

  const handleEditClick = (c: HackathonChallenge) => {
    setEditingChallenge(c);
    setFormData({
      title: c.title,
      subtitle: c.subtitle || '',
      description: c.description || '',
      timeframe: c.timeframe || '',
      trackId: c.trackId || 'all',
      psId: c.psId || '',
      isEnabled: c.isEnabled
    });
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingChallenge) return;

    await apiService.updateChallenge(editingChallenge.challengeId, {
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
      timeframe: formData.timeframe,
      trackId: formData.trackId,
      psId: formData.psId.trim(),
      isEnabled: formData.isEnabled
    });

    showNotification(`Saved changes for Challenge ${editingChallenge.challengeNumber}`, 'success');
    setEditingChallenge(null);
    await loadChallenges();
  };

  const handleEnableNext = async () => {
    const nextLocked = challenges.find(c => !c.isEnabled);
    if (!nextLocked) {
      alert('All 5 challenges are already LIVE!');
      return;
    }
    if (window.confirm(`Release Challenge ${nextLocked.challengeNumber}: "${nextLocked.title}" to participants now?`)) {
      await apiService.toggleChallenge(nextLocked.challengeId, true);
      await loadChallenges();
      showNotification(`Challenge ${nextLocked.challengeNumber} has been released live!`, 'success');
    }
  };

  const handleLockAll = async () => {
    if (window.confirm('Are you sure you want to lock all challenges? Participants will not be able to see them.')) {
      for (const c of challenges) {
        if (c.isEnabled) {
          await apiService.toggleChallenge(c.challengeId, false);
        }
      }
      await loadChallenges();
      showNotification('All challenges locked.', 'info');
    }
  };

  return (
    <AdminLayout
      title="5 UNIVERSAL HACKATHON CHALLENGES"
      subtitle="Configure, customize and release milestone challenges one by one to all registered participants"
    >
      <div className="space-y-6 text-left">
        {notification && (
          <div className={`p-4 rounded-xl border flex items-center justify-between text-xs font-mono font-bold transition shadow-md ${
            notification.type === 'success' 
              ? 'bg-emerald-900/20 border-emerald-600/50 text-emerald-800' 
              : notification.type === 'error'
              ? 'bg-rose-900/20 border-rose-600/50 text-rose-800'
              : 'bg-amber-900/20 border-amber-600/50 text-amber-800'
          }`}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{notification.message}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-gray-500 hover:text-black">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Top Control Bar */}
        <div className="p-6 rounded-2xl bg-[#E9E1D2] border border-[#D2CAB6] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#A77A1C]" />
              <h2 className="font-serif font-black text-lg sm:text-xl text-[#162E28] uppercase">
                Milestone Release Control Matrix
              </h2>
            </div>
            <p className="text-xs text-[#7B8379]">
              The 5 milestone challenges are customized for each problem statement. Release them progressively (e.g. Challenge 1, Challenge 2...) as the hackathon unfolds.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <div className="text-xs font-mono font-bold text-[#162E28]">
                RELEASE / HIDE FOR ALL PROBLEM STATEMENTS:
              </div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((num) => {
                  const matchingChals = challenges.filter(c => c.challengeNumber === num);
                  const isAnyLive = matchingChals.some(c => c.isEnabled);

                  return (
                    <button
                      key={num}
                      onClick={async () => {
                        const nextState = !isAnyLive;
                        await apiService.bulkToggleChallengeNumber(num, nextState);
                        await loadChallenges();
                        showNotification(
                          `Challenge 0${num} has been ${nextState ? 'RELEASED' : 'HIDDEN'} across all PS and subtracks!`,
                          nextState ? 'success' : 'info'
                        );
                      }}
                      className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border transition flex items-center gap-1.5 shadow-sm ${
                        isAnyLive
                          ? 'bg-emerald-800 text-white border-emerald-600 hover:bg-emerald-900'
                          : 'bg-[#F9F4EA] text-[#162E28] border-[#D2CAB6] hover:bg-[#D2CAB6]'
                      }`}
                      title={`Click to ${isAnyLive ? 'Hide' : 'Release'} Challenge ${num} for all problem statements`}
                    >
                      {isAnyLive ? <Unlock className="w-3.5 h-3.5 text-emerald-300" /> : <Lock className="w-3.5 h-3.5 text-[#7B8379]" />}
                      <span>CHALLENGE {num === 4 ? '4.1' : num === 5 ? '4.2' : num}: {isAnyLive ? 'RELEASED' : 'LOCKED'}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={handleEnableNext}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-[#162E28] text-[#E5BE61] border border-[#A77A1C]/50 text-xs font-mono font-bold hover:bg-[#2B3E35] transition shadow flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>RELEASE NEXT IN SEQUENCE</span>
            </button>
            <button
              onClick={handleLockAll}
              className="px-3 py-2.5 rounded-xl bg-[#D2CAB6]/60 text-[#162E28] hover:bg-[#D2CAB6] transition text-xs font-mono font-bold"
              title="Lock all challenges"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter bar for PS Selection */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#E9E1D2] border border-[#D2CAB6]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#162E28] uppercase">FILTER BY PS ID:</span>
            <select
              value={selectedPsFilter}
              onChange={(e) => setSelectedPsFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[#F9F4EA] border border-[#D2CAB6] text-xs font-mono font-bold text-[#162E28] outline-none"
            >
              <option value="ALL">ALL PROBLEM STATEMENTS ({challenges.length} Challenges)</option>
              {Array.from(new Set(challenges.map(c => c.psId).filter(Boolean))).map(id => (
                <option key={id} value={id}>{id}</option>
              ))}
            </select>
          </div>
          <span className="text-xs font-mono text-[#7B8379]">
            Showing <strong>{filteredList.length}</strong> of <strong>{challenges.length}</strong> Challenges
          </span>
        </div>

        {/* Challenges List */}
        <div className="space-y-4">
          {filteredList.map((c) => {
            const isLive = c.isEnabled;

            return (
              <div 
                key={c.challengeId}
                className={`p-5 sm:p-6 rounded-2xl border transition shadow-sm ${
                  isLive 
                    ? 'bg-[#F9F4EA] border-[#A77A1C]/50 ring-1 ring-[#A77A1C]/20' 
                    : 'bg-[#E9E1D2]/60 border-[#D2CAB6] opacity-90'
                }`}
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  {/* Left challenge info */}
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 border ${
                      isLive 
                        ? 'bg-[#162E28] border-[#A77A1C] text-[#E5BE61]' 
                        : 'bg-[#D2CAB6] border-[#7B8379]/40 text-[#7B8379]'
                    }`}>
                      <span className="text-[10px] font-mono uppercase font-bold">CHAL</span>
                      <span className="font-serif font-black text-lg leading-none">{c.challengeNumber === 4 ? '4.1' : c.challengeNumber === 5 ? '4.2' : `0${c.challengeNumber}`}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-serif font-bold text-base sm:text-lg text-[#162E28]">
                          {c.title}
                        </h3>
                        {c.psId && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#162E28] text-[#E5BE61]">
                            {c.psId}
                          </span>
                        )}
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider ${
                          isLive 
                            ? 'bg-emerald-900/20 text-emerald-800 border border-emerald-600/40' 
                            : 'bg-amber-900/20 text-amber-900 border border-amber-600/40'
                        }`}>
                          {isLive ? '✓ LIVE TO PARTICIPANTS' : '🔒 LOCKED / HIDDEN'}
                        </span>
                        {c.timeframe && (
                          <span className="text-[11px] font-mono text-[#7B8379] flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#A77A1C]" />
                            {c.timeframe}
                          </span>
                        )}
                      </div>

                      {c.subtitle && (
                        <p className="text-xs font-semibold text-[#A77A1C]">
                          {c.subtitle}
                        </p>
                      )}

                      <p className="text-xs text-[#7B8379] max-w-3xl leading-relaxed pt-1">
                        {c.description}
                      </p>

                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2.5 shrink-0 w-full lg:w-auto justify-end pt-3 lg:pt-0 border-t lg:border-t-0 border-[#D2CAB6]">
                    <button
                      onClick={() => handleEditClick(c)}
                      className="px-3.5 py-2 rounded-xl bg-[#E9E1D2] hover:bg-[#D2CAB6] text-[#162E28] text-xs font-mono font-bold border border-[#D2CAB6] transition flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#A77A1C]" />
                      <span>EDIT DETAILS</span>
                    </button>

                    <button
                      onClick={() => handleToggle(c)}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border transition shadow-sm flex items-center gap-1.5 ${
                        isLive
                          ? 'bg-rose-900/10 hover:bg-rose-900/20 text-rose-800 border-rose-600/40'
                          : 'bg-emerald-900/10 hover:bg-emerald-900/20 text-emerald-800 border-emerald-600/40'
                      }`}
                    >
                      {isLive ? (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>HIDE / LOCK</span>
                        </>
                      ) : (
                        <>
                          <Unlock className="w-3.5 h-3.5" />
                          <span>ENABLE / RELEASE NOW</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Edit Modal */}
        {editingChallenge && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#F9F4EA] border border-[#A77A1C] rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#D2CAB6] pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#A77A1C]" />
                  <h3 className="font-serif font-black text-lg text-[#162E28]">
                    EDIT CHALLENGE #{editingChallenge.challengeNumber}
                  </h3>
                </div>
                <button 
                  onClick={() => setEditingChallenge(null)}
                  className="p-1 rounded-lg text-[#7B8379] hover:text-[#162E28]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-[#162E28] uppercase">Assigned Track</label>
                    <select
                      value={formData.trackId}
                      onChange={(e) => setFormData(prev => ({ ...prev, trackId: e.target.value }))}
                      className="w-full p-2.5 rounded-xl bg-[#E9E1D2] border border-[#D2CAB6] text-[#162E28] font-bold focus:outline-none focus:border-[#A77A1C]"
                    >
                      <option value="all">ALL TRACKS</option>
                      <option value="TRK-01">TRACK 1: FINTECH</option>
                      <option value="TRK-02">TRACK 2: MARKETING & ADTECH</option>
                      <option value="TRK-03">TRACK 3: SMART OPERATIONS</option>
                      <option value="TRK-04">TRACK 4: ENTREPRENEURSHIP</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-[#162E28] uppercase">Assigned PS ID</label>
                    <input
                      type="text"
                      value={formData.psId}
                      onChange={(e) => setFormData(prev => ({ ...prev, psId: e.target.value }))}
                      placeholder="e.g. TRACK-3-01, TRACK-4-02"
                      className="w-full p-2.5 rounded-xl bg-[#E9E1D2] border border-[#D2CAB6] text-[#162E28] focus:outline-none focus:border-[#A77A1C]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#162E28] uppercase">Challenge Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-2.5 rounded-xl bg-[#E9E1D2] border border-[#D2CAB6] text-[#162E28] focus:outline-none focus:border-[#A77A1C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#162E28] uppercase">Subtitle / Focus Area</label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                    placeholder="e.g. System Design, Requirements & Architecture"
                    className="w-full p-2.5 rounded-xl bg-[#E9E1D2] border border-[#D2CAB6] text-[#162E28] focus:outline-none focus:border-[#A77A1C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#162E28] uppercase">Timeframe / Milestone Phase</label>
                  <input
                    type="text"
                    value={formData.timeframe}
                    onChange={(e) => setFormData(prev => ({ ...prev, timeframe: e.target.value }))}
                    placeholder="e.g. Hours 00:00 - 04:00"
                    className="w-full p-2.5 rounded-xl bg-[#E9E1D2] border border-[#D2CAB6] text-[#162E28] focus:outline-none focus:border-[#A77A1C]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#162E28] uppercase">Challenge Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-2.5 rounded-xl bg-[#E9E1D2] border border-[#D2CAB6] text-[#162E28] focus:outline-none focus:border-[#A77A1C]"
                  />
                </div>

                <div className="p-3 rounded-xl bg-[#E9E1D2] border border-[#D2CAB6] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-[#162E28] uppercase">Participant Visibility</div>
                    <div className="text-[10px] text-[#7B8379]">Release this challenge live to participants</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, isEnabled: !prev.isEnabled }))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                      formData.isEnabled 
                        ? 'bg-emerald-900/20 text-emerald-800 border-emerald-600/40' 
                        : 'bg-amber-900/20 text-amber-900 border-amber-600/40'
                    }`}
                  >
                    {formData.isEnabled ? '✓ LIVE' : '🔒 LOCKED'}
                  </button>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#D2CAB6]">
                  <button
                    type="button"
                    onClick={() => setEditingChallenge(null)}
                    className="px-4 py-2 rounded-xl bg-[#D2CAB6] text-[#162E28] font-bold"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#162E28] text-[#E5BE61] font-bold hover:bg-[#2B3E35] transition"
                  >
                    SAVE CHANGES
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
