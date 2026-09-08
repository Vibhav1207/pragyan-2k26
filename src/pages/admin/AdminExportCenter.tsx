import React, { useState } from 'react';
import { Download, FileSpreadsheet, History } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { apiService } from '../../services/api';

export const AdminExportCenter: React.FC = () => {
  const [dataset, setDataset] = useState<'TEAMS' | 'PARTICIPANTS' | 'REGISTRATIONS' | 'SUBMISSIONS'>('TEAMS');
  const [format, setFormat] = useState<'CSV' | 'EXCEL'>('CSV');
  const [trackFilter, setTrackFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const [exportHistory, setExportHistory] = useState([
    {
      file: 'pragyan_teams_approved_2026-09-08.csv',
      type: 'Teams Data',
      generatedBy: 'admin@sanjivani.edu.in',
      date: '2026-09-08 18:30'
    },
    {
      file: 'pragyan_participants_roster.csv',
      type: 'Participants Data',
      generatedBy: 'admin@sanjivani.edu.in',
      date: '2026-09-07 14:15'
    }
  ]);

  const tracks = apiService.getTracks();

  const handleGenerateExport = () => {
    let data: any[] = [];
    let filename = `pragyan_${dataset.toLowerCase()}_${Date.now()}`;

    if (dataset === 'TEAMS') {
      const teams = apiService.getTeams();
      data = teams.map(t => ({
        TeamID: t.teamId,
        TeamName: t.teamName,
        Track: t.trackTitle,
        College: t.college,
        LeaderName: t.leader.fullName,
        LeaderEmail: t.leader.email,
        Status: t.status,
        RegDate: t.registrationDate
      }));
    } else if (dataset === 'PARTICIPANTS') {
      data = apiService.getParticipants();
    } else if (dataset === 'SUBMISSIONS') {
      const subs = apiService.getSubmissions();
      data = subs.map(s => ({
        SubmissionID: s.id,
        TeamID: s.teamId,
        TeamName: s.teamName,
        ProjectTitle: s.projectTitle,
        Status: s.status,
        GitHubURL: s.githubUrl || '',
        SubmittedAt: s.submittedAt || ''
      }));
    } else {
      data = apiService.getTeams().map(t => ({
        RegID: t.teamId,
        Team: t.teamName,
        College: t.college,
        Status: t.status,
        Date: t.registrationDate
      }));
    }

    if (data.length === 0) {
      alert('No data records found for selected export criteria.');
      return;
    }

    // Convert to CSV
    const keys = Object.keys(data[0]);
    const csvLines = [keys.join(',')];
    data.forEach(row => {
      csvLines.push(keys.map(k => `"${row[k] || ''}"`).join(','));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvLines.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.${format.toLowerCase() === 'csv' ? 'csv' : 'xls'}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportHistory([
      {
        file: `${filename}.${format.toLowerCase()}`,
        type: `${dataset} Export`,
        generatedBy: 'admin@sanjivani.edu.in',
        date: new Date().toLocaleString()
      },
      ...exportHistory
    ]);

    apiService.logActivity('DATA_EXPORT', dataset, `Generated ${dataset} export in ${format} format`, 'SUCCESS');
  };

  return (
    <AdminLayout
      title="EXPORT CENTER"
      subtitle="Generate and download complete CSV & Excel data reports for Teams, Participants, Registrations & Submissions"
    >
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* EXPORT GENERATOR (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 p-8 rounded-3xl space-y-6 shadow-sm text-left">
          
          <div className="border-b border-slate-200 pb-3">
            <h3 className="font-space font-extrabold text-xl text-[#0B192C] uppercase flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-blue-600" />
              <span>EXPORT DATASET GENERATOR</span>
            </h3>
            <p className="text-xs text-slate-500">Select parameters to download structured CSV / Excel files</p>
          </div>

          <div className="space-y-4">
            
            {/* Dataset Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">Select Target Dataset</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['TEAMS', 'PARTICIPANTS', 'REGISTRATIONS', 'SUBMISSIONS'] as const).map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDataset(d)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-mono font-bold border transition ${
                      dataset === d
                        ? 'bg-[#1D4ED8] border-blue-600 text-white shadow-md'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Format Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-600 uppercase">Export File Format</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFormat('CSV')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border transition ${
                    format === 'CSV' ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  CSV (Comma Separated)
                </button>
                <button
                  type="button"
                  onClick={() => setFormat('EXCEL')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border transition ${
                    format === 'EXCEL' ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  Excel (.xls)
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-600 uppercase">Filter by Track</label>
                <select
                  value={trackFilter}
                  onChange={(e) => setTrackFilter(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs font-mono focus:bg-white focus:border-blue-600 focus:outline-none transition"
                >
                  <option value="ALL">All Tracks</option>
                  {tracks.map(tr => <option key={tr.id} value={tr.id}>{tr.title}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-600 uppercase">Filter by Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs font-mono focus:bg-white focus:border-blue-600 focus:outline-none transition"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="APPROVED">Approved Only</option>
                  <option value="PENDING">Pending Only</option>
                  <option value="REJECTED">Rejected Only</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerateExport}
              className="w-full py-3.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-space font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition mt-4"
            >
              <Download className="w-4 h-4" /> GENERATE & DOWNLOAD REPORT
            </button>

          </div>

        </div>

        {/* EXPORT HISTORY (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm text-left">
          <div className="border-b border-slate-200 pb-3 flex items-center gap-2">
            <History className="w-5 h-5 text-blue-600" />
            <h3 className="font-space font-extrabold text-lg text-[#0B192C] uppercase">EXPORT HISTORY</h3>
          </div>

          <div className="space-y-3">
            {exportHistory.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <div className="font-mono font-bold text-[#0B192C] truncate">{item.file}</div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Type: <strong className="text-blue-600 font-bold">{item.type}</strong></span>
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </AdminLayout>
  );
};

