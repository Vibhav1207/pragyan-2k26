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
        <div className="lg:col-span-7 bg-[#E9E1D2] border border-[#D2CAB6] p-8 rounded-3xl space-y-6 shadow-sm text-left">
          
          <div className="border-b border-[#D2CAB6] pb-3">
            <h3 className="font-serif font-bold text-xl text-[#162E28] uppercase flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-[#A77A1C]" />
              <span>EXPORT DATASET GENERATOR</span>
            </h3>
            <p className="text-xs text-[#7B8379]">Select parameters to download structured CSV / Excel files</p>
          </div>

          <div className="space-y-4">
            
            {/* Dataset Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Select Target Dataset</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['TEAMS', 'PARTICIPANTS', 'REGISTRATIONS', 'SUBMISSIONS'] as const).map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDataset(d)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-mono font-bold border transition ${
                      dataset === d
                        ? 'bg-[#162E28] border-[#A77A1C]/50 text-[#E5BE61] shadow-md'
                        : 'bg-[#F9F4EA] border-[#D2CAB6] text-[#7B8379] hover:bg-[#F3EDE0]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Format Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Export File Format</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFormat('CSV')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border transition ${
                    format === 'CSV' ? 'bg-[#162E28] border-[#A77A1C]/40 text-[#E5BE61]' : 'bg-[#F9F4EA] border-[#D2CAB6] text-[#7B8379]'
                  }`}
                >
                  CSV (Comma Separated)
                </button>
                <button
                  type="button"
                  onClick={() => setFormat('EXCEL')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border transition ${
                    format === 'EXCEL' ? 'bg-[#162E28] border-[#A77A1C]/40 text-[#E5BE61]' : 'bg-[#F9F4EA] border-[#D2CAB6] text-[#7B8379]'
                  }`}
                >
                  Excel (.xls)
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#D2CAB6]">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Filter by Track</label>
                <select
                  value={trackFilter}
                  onChange={(e) => setTrackFilter(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs font-mono focus:outline-none focus:border-[#A77A1C] transition"
                >
                  <option value="ALL">All Tracks</option>
                  {tracks.map(tr => <option key={tr.id} value={tr.id}>{tr.title}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-[#7B8379] uppercase tracking-wider">Filter by Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs font-mono focus:outline-none focus:border-[#A77A1C] transition"
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
              className="w-full py-3.5 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] border border-[#A77A1C]/40 font-serif font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition mt-4"
            >
              <Download className="w-4 h-4 text-[#E5BE61]" /> GENERATE & DOWNLOAD REPORT
            </button>

          </div>

        </div>

        {/* EXPORT HISTORY (5 Cols) */}
        <div className="lg:col-span-5 bg-[#E9E1D2] border border-[#D2CAB6] p-6 rounded-3xl space-y-4 shadow-sm text-left">
          <div className="border-b border-[#D2CAB6] pb-3 flex items-center gap-2">
            <History className="w-5 h-5 text-[#A77A1C]" />
            <h3 className="font-serif font-bold text-lg text-[#162E28] uppercase">EXPORT HISTORY</h3>
          </div>

          <div className="space-y-3">
            {exportHistory.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#F9F4EA] border border-[#D2CAB6] text-xs space-y-1">
                <div className="font-mono font-bold text-[#162E28] truncate">{item.file}</div>
                <div className="flex items-center justify-between text-[10px] text-[#7B8379] font-mono">
                  <span>Type: <strong className="text-[#A77A1C] font-bold">{item.type}</strong></span>
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


