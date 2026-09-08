import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Trash2, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { apiService } from '../../services/api';
import type { Team } from '../../types/admin';

export const AdminTeamsList: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>(() => apiService.getTeams());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedCollege, setSelectedCollege] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [actionModal, setActionModal] = useState<{
    type: 'APPROVE' | 'REJECT' | 'CHANGES' | 'DELETE' | null;
    team: Team | null;
    notes?: string;
  }>({ type: null, team: null, notes: '' });

  const tracks = apiService.getTracks();
  const colleges = Array.from(new Set(teams.map(t => t.college)));

  const filteredTeams = teams.filter((t) => {
    const matchesSearch = 
      t.teamId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.leader.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.college.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTrack = selectedTrack === 'ALL' || t.trackId === selectedTrack;
    const matchesStatus = selectedStatus === 'ALL' || t.status === selectedStatus;
    const matchesCollege = selectedCollege === 'ALL' || t.college === selectedCollege;

    return matchesSearch && matchesTrack && matchesStatus && matchesCollege;
  });

  const totalPages = Math.ceil(filteredTeams.length / itemsPerPage) || 1;
  const paginatedTeams = filteredTeams.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleConfirmAction = () => {
    if (!actionModal.team || !actionModal.type) return;

    const { team, type, notes } = actionModal;

    if (type === 'DELETE') {
      apiService.deleteTeam(team.teamId);
    } else if (type === 'APPROVE') {
      apiService.updateTeamStatus(team.teamId, 'APPROVED');
    } else if (type === 'REJECT') {
      apiService.updateTeamStatus(team.teamId, 'REJECTED', notes || 'Credentials validation failed');
    } else if (type === 'CHANGES') {
      apiService.updateTeamStatus(team.teamId, 'CHANGES_REQUESTED', notes || 'Please verify member documents');
    }

    setTeams(apiService.getTeams());
    setActionModal({ type: null, team: null, notes: '' });
  };

  return (
    <AdminLayout
      title="TEAM MANAGEMENT"
      subtitle="View, verify, edit, approve and manage registered hackathon teams"
    >
      
      {/* FILTER & SEARCH CONTROL BAR */}
      <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Search */}
          <div className="relative md:col-span-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search team ID, name, leader, college..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs placeholder-slate-400 focus:outline-none focus:border-[#1D4ED8] transition"
            />
          </div>

          {/* Track Filter */}
          <div>
            <select
              value={selectedTrack}
              onChange={(e) => setSelectedTrack(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:outline-none focus:border-[#1D4ED8] font-mono"
            >
              <option value="ALL">All Innovation Tracks</option>
              {tracks.map(tr => (
                <option key={tr.id} value={tr.id}>{tr.title}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:outline-none focus:border-[#1D4ED8] font-mono"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending Approval</option>
              <option value="APPROVED">Approved Teams</option>
              <option value="CHANGES_REQUESTED">Changes Requested</option>
              <option value="REJECTED">Rejected Entries</option>
            </select>
          </div>

          {/* College Filter */}
          <div>
            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs focus:outline-none focus:border-[#1D4ED8] font-mono"
            >
              <option value="ALL">All Colleges / Universities</option>
              {colleges.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* TEAMS DATA TABLE */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/90 border-b border-slate-200 text-[#0B192C] font-mono text-[10px] uppercase tracking-wider font-bold">
                <th className="py-4 px-4">Team ID</th>
                <th className="py-4 px-4">Team Name</th>
                <th className="py-4 px-4">Team Leader</th>
                <th className="py-4 px-4">College</th>
                <th className="py-4 px-4">Track</th>
                <th className="py-4 px-4 text-center whitespace-nowrap">Members</th>
                <th className="py-4 px-4">Reg Date</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {paginatedTeams.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 font-mono">
                    No teams found matching search filters.
                  </td>
                </tr>
              ) : (
                paginatedTeams.map((team) => (
                  <tr key={team.teamId} className="hover:bg-slate-50 transition">
                    
                    <td className="py-4 px-4 font-mono font-bold text-[#1D4ED8]">
                      <Link to={`/admin/teams/${team.teamId}`} className="hover:underline">
                        {team.teamId}
                      </Link>
                    </td>

                    <td className="py-4 px-4 font-space font-bold text-[#0B192C]">
                      {team.teamName}
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-bold text-[#0B192C]">{team.leader.fullName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{team.leader.email}</div>
                    </td>

                    <td className="py-4 px-4 text-slate-600 max-w-[160px] truncate">
                      {team.college}
                    </td>

                    <td className="py-4 px-4 text-slate-600 max-w-[180px] truncate font-mono text-[11px]">
                      {team.trackTitle}
                    </td>

                    <td className="py-4 px-4 text-center font-mono font-bold text-[#1D4ED8] whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 whitespace-nowrap inline-flex items-center justify-center min-w-[56px]">
                        {team.members.length} / 4
                      </span>
                    </td>

                    <td className="py-4 px-4 text-slate-500 font-mono text-[11px]">
                      {new Date(team.registrationDate).toLocaleDateString()}
                    </td>

                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                        team.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                        team.status === 'REJECTED' ? 'bg-red-100 text-red-800 border border-red-300' :
                        team.status === 'CHANGES_REQUESTED' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                        'bg-blue-100 text-[#1D4ED8] border border-blue-300'
                      }`}>
                        {team.status.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        
                        <Link
                          to={`/admin/teams/${team.teamId}`}
                          title="View Team Details"
                          className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:text-[#1D4ED8] hover:bg-blue-50 transition"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        {team.status !== 'APPROVED' && (
                          <button
                            onClick={() => setActionModal({ type: 'APPROVE', team })}
                            title="Approve Team"
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          onClick={() => setActionModal({ type: 'CHANGES', team })}
                          title="Request Changes"
                          className="p-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white transition"
                        >
                          <AlertCircle className="w-4 h-4" />
                        </button>

                        {team.status !== 'REJECTED' && (
                          <button
                            onClick={() => setActionModal({ type: 'REJECT', team })}
                            title="Reject Team"
                            className="p-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-600 hover:text-white transition"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          onClick={() => setActionModal({ type: 'DELETE', team })}
                          title="Delete Team"
                          className="p-1.5 rounded-lg bg-slate-100 text-red-600 hover:bg-red-600 hover:text-white transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div>
            Showing <span className="font-bold text-[#0B192C]">{filteredTeams.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to{' '}
            <span className="font-bold text-[#0B192C]">{Math.min(currentPage * itemsPerPage, filteredTeams.length)}</span> of{' '}
            <span className="font-bold text-[#0B192C]">{filteredTeams.length}</span> teams
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-white border border-slate-200 text-[#0B192C] disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-[#0B192C] font-bold">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-white border border-slate-200 text-[#0B192C] disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* CONFIRMATION ACTION MODAL */}
      {actionModal.type && actionModal.team && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full space-y-5 text-left shadow-2xl">
            
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              {actionModal.type === 'DELETE' && <Trash2 className="w-6 h-6 text-red-600" />}
              {actionModal.type === 'APPROVE' && <CheckCircle2 className="w-6 h-6 text-emerald-600" />}
              {actionModal.type === 'REJECT' && <XCircle className="w-6 h-6 text-red-600" />}
              {actionModal.type === 'CHANGES' && <AlertCircle className="w-6 h-6 text-amber-600" />}
              <div>
                <h3 className="font-space font-extrabold text-lg uppercase text-[#0B192C]">
                  {actionModal.type} TEAM
                </h3>
                <p className="text-xs text-slate-500">{actionModal.team.teamName} ({actionModal.team.teamId})</p>
              </div>
            </div>

            <p className="text-xs text-slate-700">
              {actionModal.type === 'DELETE' && 'Are you sure you want to permanently delete this team? This action cannot be undone.'}
              {actionModal.type === 'APPROVE' && 'Approve this team registration for PRAGYAN 2K26 participation?'}
              {actionModal.type === 'REJECT' && 'Provide reason for rejecting this team entry:'}
              {actionModal.type === 'CHANGES' && 'Specify required changes for the team leader:'}
            </p>

            {(actionModal.type === 'REJECT' || actionModal.type === 'CHANGES') && (
              <textarea
                rows={3}
                value={actionModal.notes}
                onChange={(e) => setActionModal({ ...actionModal, notes: e.target.value })}
                placeholder="Enter admin feedback notes..."
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs placeholder-slate-400 focus:outline-none focus:border-[#1D4ED8]"
              />
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActionModal({ type: null, team: null })}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition"
              >
                CANCEL
              </button>
              <button
                onClick={handleConfirmAction}
                className={`px-5 py-2 rounded-xl font-space font-bold text-xs uppercase text-white shadow-lg transition ${
                  actionModal.type === 'DELETE' || actionModal.type === 'REJECT' ? 'bg-red-600 hover:bg-red-500 shadow-red-600/30' :
                  actionModal.type === 'APPROVE' ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30' :
                  'bg-amber-600 hover:bg-amber-500 shadow-amber-600/30'
                }`}
              >
                CONFIRM {actionModal.type}
              </button>
            </div>

          </div>
        </div>
      )}

    </AdminLayout>
  );
};
