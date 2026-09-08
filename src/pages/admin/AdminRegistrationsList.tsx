import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  XCircle, 
  Search, 
  Download, 
  CheckSquare, 
  Square
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { apiService } from '../../services/api';
import type { Team } from '../../types/admin';

export const AdminRegistrationsList: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>(() => apiService.getTeams());
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredTeams = teams.filter(t => {
    const matchesTab = activeTab === 'ALL' || t.status === activeTab;
    const matchesSearch = 
      t.teamId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.leader.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.college.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredTeams.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredTeams.map(t => t.teamId));
    }
  };

  const toggleSelectTeam = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkApprove = () => {
    selectedIds.forEach(id => apiService.updateTeamStatus(id, 'APPROVED'));
    setTeams(apiService.getTeams());
    setSelectedIds([]);
    alert(`Bulk approved ${selectedIds.length} registration(s)!`);
  };

  const handleBulkReject = () => {
    selectedIds.forEach(id => apiService.updateTeamStatus(id, 'REJECTED', 'Bulk rejected by admin'));
    setTeams(apiService.getTeams());
    setSelectedIds([]);
    alert(`Bulk rejected ${selectedIds.length} registration(s)!`);
  };

  const handleBulkExport = () => {
    const selectedTeams = teams.filter(t => selectedIds.includes(t.teamId));
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Team ID,Team Name,Leader,Email,College,Track,Status,Date"]
      .concat(selectedTeams.map(t => `"${t.teamId}","${t.teamName}","${t.leader.fullName}","${t.leader.email}","${t.college}","${t.trackTitle}","${t.status}","${t.registrationDate}"`))
      .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `pragyan_registrations_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout
      title="REGISTRATION MANAGEMENT"
      subtitle="Review pending team registrations, perform bulk approvals, and manage status workflows"
    >
      
      {/* STATUS TABS */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { key: 'ALL', label: 'All Registrations', count: teams.length },
          { key: 'PENDING', label: 'Pending Approval', count: teams.filter(t => t.status === 'PENDING').length },
          { key: 'APPROVED', label: 'Approved', count: teams.filter(t => t.status === 'APPROVED').length },
          { key: 'CHANGES_REQUESTED', label: 'Changes Requested', count: teams.filter(t => t.status === 'CHANGES_REQUESTED').length },
          { key: 'REJECTED', label: 'Rejected', count: teams.filter(t => t.status === 'REJECTED').length },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setSelectedIds([]); }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition whitespace-nowrap flex items-center gap-2 ${
              activeTab === tab.key
                ? 'bg-[#1D4ED8] text-white shadow-md'
                : 'bg-white text-slate-700 hover:text-[#0B192C] border border-slate-200'
            }`}
          >
            <span>{tab.label}</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[#0B192C] text-[10px]">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* ACTION BAR & BULK SELECTION CONTROLS */}
      <div className="bg-white border border-slate-200 p-4 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter registrations..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs placeholder-slate-400 focus:outline-none focus:border-[#1D4ED8]"
          />
        </div>

        {/* Bulk Action Buttons */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs font-mono text-[#1D4ED8] font-bold mr-2">
              {selectedIds.length} Selected
            </span>
            <button
              onClick={handleBulkApprove}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold font-mono flex items-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Approve Selected
            </button>
            <button
              onClick={handleBulkReject}
              className="px-3 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold font-mono flex items-center gap-1"
            >
              <XCircle className="w-3.5 h-3.5" /> Reject Selected
            </button>
            <button
              onClick={handleBulkExport}
              className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold font-mono flex items-center gap-1 border border-slate-200"
            >
              <Download className="w-3.5 h-3.5" /> Export Selected
            </button>
          </div>
        )}

      </div>

      {/* REGISTRATIONS TABLE */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/90 border-b border-slate-200 text-[#0B192C] font-mono text-[10px] uppercase font-bold">
                <th className="py-3.5 px-4 w-10 text-center">
                  <button onClick={toggleSelectAll} className="text-slate-500 hover:text-[#0B192C]">
                    {selectedIds.length === filteredTeams.length && filteredTeams.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-[#1D4ED8]" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="py-3.5 px-4">Reg ID</th>
                <th className="py-3.5 px-4">Team Name</th>
                <th className="py-3.5 px-4">Team Leader</th>
                <th className="py-3.5 px-4">Track</th>
                <th className="py-3.5 px-4">College</th>
                <th className="py-3.5 px-4">Reg Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredTeams.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 font-mono">
                    No registrations found in this category.
                  </td>
                </tr>
              ) : (
                filteredTeams.map((team) => (
                  <tr key={team.teamId} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4 text-center">
                      <button onClick={() => toggleSelectTeam(team.teamId)} className="text-slate-400 hover:text-[#0B192C]">
                        {selectedIds.includes(team.teamId) ? (
                          <CheckSquare className="w-4 h-4 text-[#1D4ED8]" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#1D4ED8]">
                      <Link to={`/admin/teams/${team.teamId}`} className="hover:underline">
                        {team.teamId}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#0B192C]">{team.teamName}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#0B192C]">{team.leader.fullName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{team.leader.email}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 max-w-[180px] truncate font-mono text-[11px]">{team.trackTitle}</td>
                    <td className="py-3.5 px-4 text-slate-600 max-w-[160px] truncate">{team.college}</td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      {new Date(team.registrationDate).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        team.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                        team.status === 'REJECTED' ? 'bg-red-100 text-red-800 border border-red-300' :
                        team.status === 'CHANGES_REQUESTED' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                        'bg-blue-100 text-[#1D4ED8] border border-blue-300'
                      }`}>
                        {team.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/admin/teams/${team.teamId}`}
                        className="px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-[#1D4ED8] hover:bg-[#1D4ED8] hover:text-white text-[11px] font-mono font-bold transition"
                      >
                        REVIEW →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </AdminLayout>
  );
};
