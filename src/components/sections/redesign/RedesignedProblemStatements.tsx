import React, { useState, useEffect } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  LayoutGrid, 
  Download, 
  Briefcase, 
  Wallet, 
  BarChart2, 
  Truck,
  FileText
} from 'lucide-react';
import { ScrollReveal } from '../../transitions/ScrollReveal';
import { apiService } from '../../../services/api';
import type { AdminProblemStatement, SystemSettings, HackathonChallenge } from '../../../types/admin';
import { downloadProblemStatementWordDoc } from '../../../utils/wordDocHelper';
import { UniversalChallengesSection } from './UniversalChallengesSection';

interface RedesignedProblemStatementsProps {
  id?: string;
  initialTrackFilter?: string;
}

export const normalizeTrack = (raw: string = ''): string => {
  if (!raw) return 'all';
  const clean = raw.toLowerCase().trim();
  if (clean === 'all') return 'all';
  if (clean.includes('track-1') || clean.includes('trk-01') || clean.includes('track 1') || clean.includes('fintech') || clean.includes('finance')) return 'TRK-01';
  if (clean.includes('track-2') || clean.includes('trk-02') || clean.includes('track 2') || clean.includes('marketing') || clean.includes('consumer')) return 'TRK-02';
  if (clean.includes('track-3') || clean.includes('trk-03') || clean.includes('track 3') || clean.includes('operations') || clean.includes('supply') || clean.includes('ops') || clean.includes('smart ops')) return 'TRK-03';
  if (clean.includes('track-4') || clean.includes('trk-04') || clean.includes('track 4') || clean.includes('management') || clean.includes('entrepreneur')) return 'TRK-04';
  return raw;
};

export const isMatchingTrack = (filterTrack: string, psTrackId?: string, psTrackTitle?: string): boolean => {
  const normFilter = normalizeTrack(filterTrack);
  if (normFilter === 'all') return true;

  const normPsId = normalizeTrack(psTrackId);
  if (normFilter === normPsId) return true;

  if (psTrackTitle) {
    const normTitle = normalizeTrack(psTrackTitle);
    if (normFilter === normTitle) return true;
  }

  return false;
};

export const RedesignedProblemStatements: React.FC<RedesignedProblemStatementsProps> = ({ 
  id = 'problem-statements',
  initialTrackFilter = 'all' 
}) => {
  const [problemStatements, setProblemStatements] = useState<AdminProblemStatement[]>(() => 
    apiService.getProblemStatements(false)
  );
  const [challenges, setChallenges] = useState<HackathonChallenge[]>(() => 
    apiService.getChallenges(false)
  );
  const [settings, setSettings] = useState<SystemSettings>(() => apiService.getSettings());
  const [selectedTrack, setSelectedTrack] = useState<string>(() => normalizeTrack(initialTrackFilter));
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalPS, setActiveModalPS] = useState<AdminProblemStatement | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setSelectedTrack(normalizeTrack(initialTrackFilter));
  }, [initialTrackFilter]);

  useEffect(() => {
    let isMounted = true;

    const refreshData = async () => {
      try {
        const [freshPs, freshSettings, freshChallenges] = await Promise.all([
          apiService.fetchProblemStatementsAsync(false),
          apiService.fetchSettingsAsync(),
          apiService.fetchChallengesAsync(false)
        ]);
        if (isMounted) {
          if (freshPs) setProblemStatements(freshPs);
          if (freshSettings) setSettings(freshSettings);
          if (freshChallenges) setChallenges(freshChallenges);
        }
      } catch {
        if (isMounted) {
          setProblemStatements(apiService.getProblemStatements(false));
          setSettings(apiService.getSettings());
          setChallenges(apiService.getChallenges(false));
        }
      }
    };

    refreshData();

    const handleCustomUpdate = () => {
      refreshData();
    };
    window.addEventListener('pragyan_ps_updated', handleCustomUpdate);
    window.addEventListener('pragyan_settings_updated', handleCustomUpdate);
    window.addEventListener('pragyan_challenges_updated', handleCustomUpdate);

    const handleStorageChange = (e: StorageEvent) => {
      if (!e.key || e.key === 'pragyan_problem_statements_v2' || e.key === 'pragyan_settings_v2' || e.key === 'pragyan_challenges_v2') {
        refreshData();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    const pollInterval = setInterval(refreshData, 2500);

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
      window.removeEventListener('pragyan_ps_updated', handleCustomUpdate);
      window.removeEventListener('pragyan_settings_updated', handleCustomUpdate);
      window.removeEventListener('pragyan_challenges_updated', handleCustomUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleCopySummary = (ps: AdminProblemStatement) => {
    const text = `[PRAGYAN 2K26 - ${ps.id}] ${ps.title}\nTrack: ${ps.trackTitle}\nOverview: ${ps.description || ''}\nContext: ${ps.context || ''}`;
    navigator.clipboard.writeText(text);
    setCopiedId(ps.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const trackTabs = [
    { id: 'all', label: 'All Tracks', icon: LayoutGrid },
    { id: 'TRK-01', label: 'Track 1: Fintech', icon: Wallet },
    { id: 'TRK-02', label: 'Track 2: Marketing', icon: BarChart2 },
    { id: 'TRK-03', label: 'Track 3: Smart Ops', icon: Truck },
    { id: 'TRK-04', label: 'Track 4: Management', icon: Briefcase },
  ];

  const filteredStatements = problemStatements.filter((ps) => {
    // Only show problem statements that are visible (or if admin turned on psGlobalVisible)
    if (!ps.isVisible && !settings.psGlobalVisible) return false;
    const matchesTrack = isMatchingTrack(selectedTrack, ps.trackId, ps.trackTitle);
    const matchesSearch = 
      searchQuery.trim() === '' ||
      ps.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ps.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ps.description && ps.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (ps.trackTitle && ps.trackTitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTrack && matchesSearch;
  });

  return (
    <section id={id} className="w-full py-20 lg:py-28 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#F9F4EA] text-[#050C0C] text-left border-b border-[#D2CAB6] relative">
      <div className="max-w-[1500px] mx-auto w-full space-y-12">

        {/* Section Header */}
        <ScrollReveal delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D2CAB6] pb-6 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#A77A1C] uppercase tracking-widest bg-[#E9E1D2] px-3.5 py-1.5 rounded-full border border-[#A77A1C]/30 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#A77A1C]" />
                  <span>NATIONAL HACKATHON REPOSITORY</span>
                </span>
              </div>
              <h2 className="font-serif font-black text-4xl sm:text-6xl text-[#162E28] uppercase tracking-tight">
                PROBLEM <span className="italic font-normal text-[#A77A1C]">STATEMENTS</span>
              </h2>
              <p className="font-mono text-xs sm:text-sm font-bold text-[#A77A1C] uppercase tracking-wider">
                CHALLENGE BLUEPRINTS FOR 4 INNOVATION TRACKS &bull; WORD DOCUMENT BRIEFS
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2">
              <span className="text-xs font-mono font-bold text-[#A77A1C] uppercase tracking-wider">
                Official Hackathon Problem Statements
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* PROBLEM STATEMENTS BROWSER (Directly live so organizers can test hide / unhide) */}
        <div className="space-y-10">
          {/* Milestone Challenges Section (Scoped to active track & PS) */}
          <UniversalChallengesSection 
            challenges={challenges} 
            selectedTrack={selectedTrack}
          />

          {/* Filter Tabs & Search Bar */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full flex-nowrap sm:flex-wrap">
              {trackTabs.map((tab) => {
                const Icon = tab.icon;
                const isSelected = selectedTrack === tab.id;
                const count = tab.id === 'all' 
                  ? problemStatements.filter(p => Boolean(p.isVisible) || settings.psGlobalVisible).length 
                  : problemStatements.filter(p => (Boolean(p.isVisible) || settings.psGlobalVisible) && isMatchingTrack(tab.id, p.trackId, p.trackTitle)).length;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTrack(tab.id)}
                      className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-mono text-xs font-black uppercase tracking-wider flex items-center gap-1.5 sm:gap-2 transition-all duration-200 shrink-0 whitespace-nowrap ${
                        isSelected
                          ? 'bg-[#162E28] text-[#E5BE61] shadow-md border border-[#A77A1C]/50'
                          : 'bg-[#E9E1D2] text-[#7B8379] hover:text-[#162E28] hover:bg-[#D2CAB6]/50 border border-[#D2CAB6]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label} ({count})</span>
                    </button>
                  );
                })}
              </div>

              {/* Search Box */}
              <div className="relative min-w-[280px]">
                <Search className="w-4 h-4 text-[#7B8379] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search problem statements or topics..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#E9E1D2] border border-[#D2CAB6] text-xs font-mono text-[#162E28] placeholder-[#7B8379] focus:outline-none focus:border-[#A77A1C] transition-colors"
                />
              </div>
            </div>

            {/* Statements Count Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-[#7B8379] px-1">
              <span>Showing <strong>{filteredStatements.length}</strong> problem statements</span>
              <span className="text-[#A77A1C] font-bold">Teams may view or download the complete Word Document specification</span>
            </div>

            {/* Empty State when no statements found in this filter */}
            {filteredStatements.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-[#E9E1D2]/40 border border-[#D2CAB6] space-y-4">
                <FileText className="w-10 h-10 text-[#A77A1C] mx-auto opacity-70" />
                <h4 className="font-serif font-black text-xl text-[#162E28] uppercase">
                  {searchQuery ? 'No Matching Problem Statements' : 'Problem Statements Currently Hidden'}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#7B8379] max-w-md mx-auto">
                  {searchQuery 
                    ? `No statements match your search "${searchQuery}". Try selecting "All Tracks" or clearing your query.` 
                    : 'All problem statements are currently sealed by organizers. You can unhide them individually or by track in the Admin Panel to test.'}
                </p>
                <button
                  onClick={() => { setSelectedTrack('all'); setSearchQuery(''); }}
                  className="px-4 py-2 rounded-xl bg-[#162E28] text-[#E5BE61] font-mono text-xs font-bold uppercase transition"
                >
                  View All Tracks
                </button>
              </div>
            ) : (
              /* Problem Statements Cards Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStatements.map((ps, idx) => {
                  return (
                    <ScrollReveal key={ps.id} delay={idx * 50}>
                      <div className="p-6 rounded-2xl bg-[#F9F4EA] border border-[#D2CAB6] hover:border-[#A77A1C] group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between h-full space-y-6">
                        
                        <div className="space-y-4">
                          {/* Header: PS ID & Track Number */}
                          <div className="flex items-center justify-between border-b border-[#D2CAB6] pb-3 gap-2 flex-wrap">
                            <span className="font-mono font-black text-xs px-3 py-1 rounded-md bg-[#162E28] text-[#E5BE61] tracking-wider">
                              {ps.id}
                            </span>
                            <span className="font-mono text-[11px] font-extrabold text-[#A77A1C] uppercase truncate max-w-[180px]">
                              {ps.trackTitle}
                            </span>
                          </div>

                          {/* Title & Short Summary */}
                          <div className="space-y-2">
                            <h4 className="font-serif font-bold text-xl text-[#162E28] group-hover:text-[#A77A1C] transition-colors leading-snug">
                              {ps.title}
                            </h4>
                            <p className="text-xs text-[#7B8379] font-sans leading-relaxed line-clamp-3">
                              {ps.description || ps.context || 'Comprehensive problem statement brief approved by the PRAGYAN 2K26 Academic & Industry Jury Committee.'}
                            </p>
                          </div>

                          {/* Document File Badge */}
                          <div className="p-3 rounded-xl bg-[#E9E1D2] border border-[#D2CAB6] flex items-center justify-between text-xs font-mono">
                            <div className="flex items-center gap-2 truncate">
                              <FileText className="w-4 h-4 text-[#A77A1C] shrink-0" />
                              <span className="font-bold text-[#162E28] truncate">{ps.documentName || `${ps.id}_Brief.docx`}</span>
                            </div>
                            <span className="text-[10px] text-[#7B8379] shrink-0 ml-2">
                              {ps.documentSize || 'Word Doc'}
                            </span>
                          </div>
                        </div>

                        {/* Card Action Buttons */}
                        <div className="pt-4 border-t border-[#D2CAB6] space-y-2.5">
                          <button
                            type="button"
                            onClick={() => downloadProblemStatementWordDoc(ps)}
                            className="w-full py-2.5 px-4 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] font-mono text-xs font-bold flex items-center justify-center gap-2 transition shadow-sm border border-[#A77A1C]/50 touch-manipulation"
                          >
                            <Download className="w-4 h-4 text-[#E5BE61]" />
                            <span>DOWNLOAD WORD DOC (.DOCX)</span>
                          </button>

                          <div className="flex items-center justify-between gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => handleCopySummary(ps)}
                              className="px-3 py-1.5 rounded-lg bg-[#E9E1D2] hover:bg-[#D2CAB6] text-[#162E28] font-mono text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                              title="Copy Summary"
                            >
                              {copiedId === ps.id ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span className="text-emerald-700">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5 text-[#7B8379]" />
                                  <span>Copy Brief</span>
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => setActiveModalPS(ps)}
                              className="px-3.5 py-1.5 rounded-lg bg-[#F9F4EA] hover:bg-[#E9E1D2] text-[#162E28] font-mono text-[11px] font-bold border border-[#D2CAB6] flex items-center gap-1.5 transition"
                            >
                              <span>View Details</span>
                              <ExternalLink className="w-3.5 h-3.5 text-[#A77A1C]" />
                            </button>
                          </div>
                        </div>

                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      {/* FULL STATEMENT SCOPE MODAL */}
      {activeModalPS && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveModalPS(null)}
        >
          <div 
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#F9F4EA] rounded-3xl border-2 border-[#A77A1C] shadow-2xl p-6 sm:p-8 space-y-6 text-left relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-start justify-between border-b border-[#D2CAB6] pb-4 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-xs px-3 py-1 rounded bg-[#162E28] text-[#E5BE61]">
                    {activeModalPS.id}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#A77A1C] uppercase">
                    {activeModalPS.trackTitle}
                  </span>
                </div>
                <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#162E28] leading-tight">
                  {activeModalPS.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalPS(null)}
                className="p-2 rounded-full bg-[#E9E1D2] hover:bg-[#D2CAB6] text-[#162E28] font-bold text-sm transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Word Document Direct Download Banner inside Modal */}
            <div className="p-4 rounded-2xl bg-[#E9E1D2] border border-[#A77A1C]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#162E28] text-[#E5BE61]">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-serif font-bold text-sm text-[#162E28]">
                    {activeModalPS.documentName || 'Official_Problem_Specification.docx'}
                  </div>
                  <div className="font-mono text-[11px] text-[#7B8379]">
                    Microsoft Word Document &bull; {activeModalPS.documentSize || '150 KB'} &bull; Official Letterhead
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => downloadProblemStatementWordDoc(activeModalPS)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-md transition"
              >
                <Download className="w-4 h-4 text-[#E5BE61]" />
                <span>DOWNLOAD WORD DOC</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-6 text-sm">
              {/* Executive Summary */}
              {activeModalPS.description && (
                <div className="space-y-2">
                  <h5 className="font-mono text-xs font-black text-[#A77A1C] uppercase tracking-wider">
                    EXECUTIVE SUMMARY
                  </h5>
                  <p className="font-sans text-[#050C0C]/90 leading-relaxed bg-[#F3EDE0] p-4 rounded-xl border border-[#D2CAB6]">
                    {activeModalPS.description}
                  </p>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-[#D2CAB6] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleCopySummary(activeModalPS)}
                className="px-4 py-2 rounded-xl bg-[#E9E1D2] hover:bg-[#D2CAB6] text-[#162E28] font-mono text-xs font-bold flex items-center gap-2 transition-colors"
              >
                {copiedId === activeModalPS.id ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Statement Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#7B8379]" />
                    <span>Copy Brief</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => downloadProblemStatementWordDoc(activeModalPS)}
                  className="px-4 py-2 rounded-xl bg-[#162E28] text-[#E5BE61] font-mono text-xs font-bold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Document</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalPS(null)}
                  className="px-5 py-2 rounded-xl bg-[#E9E1D2] hover:bg-[#D2CAB6] text-[#162E28] font-mono text-xs font-bold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default RedesignedProblemStatements;
