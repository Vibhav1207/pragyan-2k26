import React, { useState } from 'react';
import { 
  Search, 
  Crown, 
  Download,
  Eye
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { apiService } from '../../services/api';

export const AdminParticipantsList: React.FC = () => {
  const participants = apiService.getParticipants();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'LEADER' | 'MEMBER'>('ALL');
  const [collegeFilter, setCollegeFilter] = useState('ALL');
  const [selectedParticipant, setSelectedParticipant] = useState<any | null>(null);

  const colleges = Array.from(new Set(participants.map(p => p.college)));

  const filteredParticipants = participants.filter(p => {
    const matchesSearch = 
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm) ||
      p.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.college.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = 
      roleFilter === 'ALL' || 
      (roleFilter === 'LEADER' && p.isLeader) || 
      (roleFilter === 'MEMBER' && !p.isLeader);

    const matchesCollege = collegeFilter === 'ALL' || p.college === collegeFilter;

    return matchesSearch && matchesRole && matchesCollege;
  });

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Name,Email,Phone,Team ID,Team Name,Role,College,Course,Year,Status"]
      .concat(filteredParticipants.map(p => `"${p.fullName}","${p.email}","${p.phone}","${p.teamId}","${p.teamName}","${p.isLeader ? 'Leader' : 'Member'}","${p.college}","${p.course}","${p.year}","${p.status}"`))
      .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `pragyan_participants_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout
      title="PARTICIPANT MANAGEMENT"
      subtitle="Comprehensive roster of all registered hackathon student participants across teams"
    >
      
      {/* FILTER BAR */}
      <div className="bg-white border border-slate-200 p-5 rounded-3xl space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto flex-1">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search participant name, email, team..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs placeholder-slate-400"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs font-mono"
            >
              <option value="ALL">All Member Roles</option>
              <option value="LEADER">Team Leaders Only</option>
              <option value="MEMBER">Team Members Only</option>
            </select>

            <select
              value={collegeFilter}
              onChange={(e) => setCollegeFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[#0B192C] text-xs font-mono"
            >
              <option value="ALL">All Colleges</option>
              {colleges.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-xl bg-[#1D4ED8] hover:bg-blue-600 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-md transition shrink-0"
          >
            <Download className="w-4 h-4" /> EXPORT PARTICIPANTS CSV
          </button>

        </div>
      </div>

      {/* PARTICIPANTS TABLE */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/90 border-b border-slate-200 text-[#0B192C] font-mono text-[10px] uppercase font-bold">
                <th className="py-3.5 px-4">Participant Name</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Team</th>
                <th className="py-3.5 px-4">College</th>
                <th className="py-3.5 px-4">Course & Year</th>
                <th className="py-3.5 px-4">Team Status</th>
                <th className="py-3.5 px-4 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredParticipants.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 font-mono">
                    No participants recorded in database yet.
                  </td>
                </tr>
              ) : (
                filteredParticipants.map((p, idx) => (
                  <tr key={`${p.email}-${idx}`} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4 font-bold text-[#0B192C] font-space">
                      {p.fullName}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="text-[#1D4ED8] font-mono font-bold">{p.email}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{p.phone}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      {p.isLeader ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 font-mono text-[10px] font-bold flex items-center gap-1 w-fit">
                          <Crown className="w-3 h-3 text-amber-600" /> LEADER
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px]">
                          MEMBER
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#0B192C]">{p.teamName}</div>
                      <div className="text-[10px] font-mono text-[#1D4ED8]">{p.teamId}</div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 max-w-[150px] truncate">
                      {p.college}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                      <div>{p.course}</div>
                      <div className="text-[10px] text-slate-400">{p.year}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        p.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                        p.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {p.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedParticipant(p)}
                        className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:text-[#1D4ED8] transition"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PARTICIPANT DETAIL MODAL */}
      {selectedParticipant && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full space-y-4 text-left shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="font-space font-extrabold text-lg uppercase text-[#0B192C]">
                PARTICIPANT PROFILE
              </div>
              <button onClick={() => setSelectedParticipant(null)} className="text-slate-400 font-mono font-bold text-xs">
                ✕ CLOSE
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 font-mono">
              <div><span className="text-slate-400 uppercase">Full Name:</span> <span className="text-[#0B192C] font-bold">{selectedParticipant.fullName}</span></div>
              <div><span className="text-slate-400 uppercase">Email:</span> <span className="text-[#1D4ED8] font-bold">{selectedParticipant.email}</span></div>
              <div><span className="text-slate-400 uppercase">Phone:</span> <span>{selectedParticipant.phone}</span></div>
              <div><span className="text-slate-400 uppercase">Role:</span> <span className="text-amber-600 font-bold">{selectedParticipant.isLeader ? 'Team Leader' : 'Team Member'}</span></div>
              <div><span className="text-slate-400 uppercase">Team:</span> <span>{selectedParticipant.teamName} ({selectedParticipant.teamId})</span></div>
              <div><span className="text-slate-400 uppercase">College:</span> <span>{selectedParticipant.college}</span></div>
              <div><span className="text-slate-400 uppercase">Course:</span> <span>{selectedParticipant.course} ({selectedParticipant.year})</span></div>
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  );
};
