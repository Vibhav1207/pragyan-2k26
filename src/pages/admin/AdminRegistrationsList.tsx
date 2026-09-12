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
      <div className="flex items-center gap-2 border-b border-[#D2CAB6] pb-2 overflow-x-auto">
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
                ? 'bg-[#162E28] text-[#E5BE61] border border-[#A77A1C]/40 shadow-sm'
                : 'bg-[#E9E1D2] text-[#7B8379] hover:text-[#162E28] border border-[#D2CAB6]'
            }`}
          >
            <span>{tab.label}</span>
            <span className="px-2 py-0.5 rounded-full bg-[#F9F4EA] text-[#162E28] text-[10px] font-bold border border-[#D2CAB6]">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* ACTION BAR & BULK SELECTION CONTROLS */}
      <div className="bg-[#E9E1D2] border border-[#D2CAB6] p-4 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#7B8379] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter registrations..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs placeholder-[#7B8379] focus:outline-none focus:border-[#A77A1C]"
          />
        </div>

        {/* Bulk Action Buttons */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs font-mono text-[#A77A1C] font-bold mr-2">
              {selectedIds.length} Selected
            </span>
            <button
              onClick={handleBulkApprove}
              className="px-3 py-1.5 rounded-xl bg-[#162E28] text-[#E5BE61] text-xs font-bold font-mono flex items-center gap-1 border border-[#A77A1C]/30 hover:bg-[#2B3E35] transition"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#E5BE61]" /> Approve Selected
            </button>
            <button
              onClick={handleBulkReject}
              className="px-3 py-1.5 rounded-xl bg-red-900/20 text-red-900 border border-red-800/30 text-xs font-bold font-mono flex items-center gap-1 hover:bg-red-900/30 transition"
            >
              <XCircle className="w-3.5 h-3.5 text-red-800" /> Reject Selected
            </button>
            <button
              onClick={handleBulkExport}
              className="px-3 py-1.5 rounded-xl bg-[#F9F4EA] text-[#162E28] text-xs font-bold font-mono flex items-center gap-1 border border-[#D2CAB6] hover:bg-[#F3EDE0] transition"
            >
              <Download className="w-3.5 h-3.5 text-[#A77A1C]" /> Export Selected
            </button>
          </div>
        )}

      </div>

      {/* REGISTRATIONS TABLE */}
      <div className="bg-[#E9E1D2] border border-[#D2CAB6] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#162E28] border-b border-[#A77A1C]/30 text-[#F9F4EA] font-mono text-[10px] uppercase font-bold tracking-wider">
                <th className="py-3.5 px-4 w-10 text-center">
                  <button onClick={toggleSelectAll} className="text-[#E5BE61] hover:text-white">
                    {selectedIds.length === filteredTeams.length && filteredTeams.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-[#E5BE61]" />
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
            <tbody className="divide-y divide-[#D2CAB6]/60 text-xs">
              {filteredTeams.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-[#7B8379] font-mono">
                    No registrations found in this category.
                  </td>
                </tr>
              ) : (
                filteredTeams.map((team) => (
                  <tr key={team.teamId} className="hover:bg-[#F9F4EA]/60 transition">
                    <td className="py-3.5 px-4 text-center">
                      <button onClick={() => toggleSelectTeam(team.teamId)} className="text-[#7B8379] hover:text-[#162E28]">
                        {selectedIds.includes(team.teamId) ? (
                          <CheckSquare className="w-4 h-4 text-[#A77A1C]" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#A77A1C]">
                      <Link to={`/admin/teams/${team.teamId}`} className="hover:underline">
                        {team.teamId}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#162E28]">{team.teamName}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#162E28]">{team.leader.fullName}</div>
                      <div className="text-[10px] text-[#7B8379] font-mono">{team.leader.email}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[#162E28]/80 max-w-[180px] truncate font-mono text-[11px]">{team.trackTitle}</td>
                    <td className="py-3.5 px-4 text-[#162E28]/80 max-w-[160px] truncate">{team.college}</td>
                    <td className="py-3.5 px-4 text-[#7B8379] font-mono text-[11px]">
                      {new Date(team.registrationDate).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        team.status === 'APPROVED' ? 'bg-emerald-900/20 text-emerald-900 border border-emerald-600/40' :
                        team.status === 'REJECTED' ? 'bg-red-900/20 text-red-900 border border-red-600/40' :
                        team.status === 'CHANGES_REQUESTED' ? 'bg-amber-900/20 text-[#A77A1C] border border-[#A77A1C]/40' :
                        'bg-[#F3EDE0] text-[#162E28] border border-[#D2CAB6]'
                      }`}>
                        {team.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/admin/teams/${team.teamId}`}
                        className="px-3 py-1 rounded-lg bg-[#162E28] text-[#E5BE61] border border-[#A77A1C]/40 hover:bg-[#2B3E35] text-[11px] font-mono font-bold transition"
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

