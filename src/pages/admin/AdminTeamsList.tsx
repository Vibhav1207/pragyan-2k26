import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { apiService } from '../../services/api';
import type { Team } from '../../types/admin';

export const AdminTeamsList: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>(() => apiService.getTeams());

  useEffect(() => {
    let isMounted = true;
    apiService.fetchTeamsAsync().then(fresh => {
      if (isMounted && fresh) setTeams(fresh);
    });
    return () => { isMounted = false; };
  }, []);
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
      <div className="bg-[#F3EDE0] border border-[#D2CAB6] p-5 rounded-3xl shadow-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Search */}
          <div className="relative md:col-span-1">
            <Search className="w-4 h-4 text-[#A77A1C] absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search team ID, name, leader, college..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs placeholder-[#7B8379]/60 focus:outline-none focus:border-[#A77A1C] transition"
            />
          </div>

          {/* Track Filter */}
          <div>
            <select
              value={selectedTrack}
              onChange={(e) => setSelectedTrack(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs font-mono font-bold focus:outline-none focus:border-[#A77A1C] transition"
            >
              <option value="ALL">ALL TRACKS</option>
              {tracks.map((tr) => (
                <option key={tr.id} value={tr.id}>{tr.title}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs font-mono font-bold focus:outline-none focus:border-[#A77A1C] transition"
            >
              <option value="ALL">ALL STATUSES</option>
              <option value="PENDING">PENDING</option>
              <option value="APPROVED">APPROVED</option>
              <option value="REJECTED">REJECTED</option>
              <option value="CHANGES_REQUESTED">CHANGES REQUESTED</option>
            </select>
          </div>

          {/* College Filter */}
          <div>
            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs font-mono font-bold focus:outline-none focus:border-[#A77A1C] transition"
            >
              <option value="ALL">ALL COLLEGES</option>
              {colleges.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* TEAMS DATA TABLE CARD */}
      <div className="bg-[#F3EDE0] border border-[#D2CAB6] rounded-3xl shadow-md overflow-hidden">
        <div className="p-5 border-b border-[#D2CAB6] flex items-center justify-between">
          <h2 className="font-serif font-black text-lg text-[#162E28] uppercase">
            REGISTERED TEAMS ROSTER ({filteredTeams.length})
          </h2>
          <span className="font-mono text-xs text-[#A77A1C] font-bold">
            Showing Page {currentPage} of {totalPages}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#E9E1D2] border-b border-[#D2CAB6] text-[#162E28] font-mono font-bold uppercase">
              <tr>
                <th className="p-4">Team Code</th>
                <th className="p-4">Team Name</th>
                <th className="p-4">Track Title</th>
                <th className="p-4">Leader / Contact</th>
                <th className="p-4">Institution</th>
                <th className="p-4">Members</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D2CAB6]">
              {paginatedTeams.map((t) => (
                <tr key={t.teamId} className="hover:bg-[#E9E1D2]/50 transition">
                  <td className="p-4 font-mono font-bold text-[#162E28]">
                    {t.teamCode || t.teamId}
                  </td>
                  <td className="p-4 font-serif font-bold text-[#162E28]">
                    {t.teamName}
                  </td>
                  <td className="p-4 text-[#7B8379] font-mono text-[11px]">
                    {t.trackTitle}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-[#162E28]">{t.leader?.fullName || 'N/A'}</div>
                    <div className="font-mono text-[10px] text-[#A77A1C]">{t.leader?.email}</div>
                  </td>
                  <td className="p-4 text-[#7B8379] max-w-[150px] truncate">{t.college}</td>
                  <td className="p-4 font-mono font-bold text-[#162E28]">{t.members?.length || 1} / 4</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                      t.status === 'APPROVED' ? 'bg-[#162E28] text-[#E5BE61] border border-[#A77A1C]' :
                      t.status === 'REJECTED' ? 'bg-red-100 text-red-800 border border-red-300' :
                      'bg-[#E9E1D2] text-[#A77A1C] border border-[#A77A1C]/50'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        to={`/admin/teams/${t.teamId}`}
                        className="p-2 rounded-lg bg-[#162E28] text-[#E5BE61] hover:bg-[#2B3E35] border border-[#A77A1C]/40 transition"
                        title="View Team Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => setActionModal({ type: 'APPROVE', team: t })}
                        className="p-2 rounded-lg bg-[#E9E1D2] text-[#162E28] hover:bg-[#162E28] hover:text-[#E5BE61] border border-[#A77A1C]/30 transition"
                        title="Approve Team"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setActionModal({ type: 'REJECT', team: t })}
                        className="p-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-700 hover:text-white border border-red-200 transition"
                        title="Reject Team"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setActionModal({ type: 'DELETE', team: t })}
                        className="p-2 rounded-lg bg-red-100 text-red-800 hover:bg-red-800 hover:text-white border border-red-300 transition"
                        title="Delete Team"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="p-4 border-t border-[#D2CAB6] flex items-center justify-between text-xs font-mono">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1.5 rounded-lg bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] disabled:opacity-50 flex items-center gap-1 font-bold"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <span className="text-[#7B8379]">Page {currentPage} of {totalPages}</span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1.5 rounded-lg bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] disabled:opacity-50 flex items-center gap-1 font-bold"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* ACTION MODAL */}
      {actionModal.type && actionModal.team && (
        <div className="fixed inset-0 bg-[#050C0C]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#F9F4EA] border border-[#A77A1C] rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 text-left shadow-2xl">
            <h3 className="font-serif font-black text-xl text-[#162E28] uppercase">
              CONFIRM {actionModal.type} ACTION
            </h3>
            <p className="text-xs text-[#7B8379]">
              Are you sure you want to perform <strong>{actionModal.type}</strong> on team <strong>{actionModal.team.teamName}</strong>?
            </p>

            {(actionModal.type === 'REJECT' || actionModal.type === 'CHANGES') && (
              <textarea
                value={actionModal.notes}
                onChange={(e) => setActionModal({ ...actionModal, notes: e.target.value })}
                placeholder="Reason or verification remarks..."
                className="w-full p-3 rounded-xl bg-[#F3EDE0] border border-[#D2CAB6] text-xs font-mono text-[#162E28] outline-none"
                rows={3}
              />
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setActionModal({ type: null, team: null, notes: '' })}
                className="px-4 py-2 rounded-xl bg-[#E9E1D2] text-[#162E28] text-xs font-mono font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className="px-5 py-2 rounded-xl bg-[#162E28] text-[#F9F4EA] border border-[#A77A1C]/50 text-xs font-mono font-bold"
              >
                Confirm {actionModal.type}
              </button>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
};
