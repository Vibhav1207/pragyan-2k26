import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Download,
  Eye,
  Shield,
  User,
  Trash2,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { apiService } from '../../services/api';
import type { UserProfile } from '../../types/admin';

export const AdminParticipantsList: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>(() => apiService.getRegisteredUsers());
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'ADMIN' | 'PARTICIPANT'>('ALL');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    const fresh = await apiService.fetchUsersAsync();
    setUsers(fresh);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredUsers = users.filter(u => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Name,Email,Role,Registered Date"]
      .concat(filteredUsers.map(u => `"${u.name}","${u.email}","${u.role}","${u.createdAt || ''}"`))
      .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `pragyan_delegates_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteUser = async (user: UserProfile) => {
    if (window.confirm(`Are you sure you want to remove delegate account "${user.email}"?`)) {
      await apiService.deleteUser(user.id || user.email);
      setUsers(apiService.getRegisteredUsers());
    }
  };

  const totalDelegates = users.length;
  const participantCount = users.filter(u => u.role !== 'ADMIN').length;
  const adminCount = users.filter(u => u.role === 'ADMIN').length;

  return (
    <AdminLayout
      title="PARTICIPANT & DELEGATE DIRECTORY"
      subtitle="Comprehensive roster of all registered hackathon delegates and Google logins"
    >

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#F3EDE0] border border-[#D2CAB6] p-4 rounded-2xl shadow-sm text-left">
          <div className="text-[10px] font-mono text-[#7B8379] uppercase font-bold">TOTAL DELEGATES</div>
          <div className="font-serif font-black text-2xl text-[#162E28] mt-1">{totalDelegates}</div>
        </div>
        <div className="bg-[#F3EDE0] border border-[#D2CAB6] p-4 rounded-2xl shadow-sm text-left">
          <div className="text-[10px] font-mono text-[#7B8379] uppercase font-bold">GOOGLE VERIFIED</div>
          <div className="font-serif font-black text-2xl text-emerald-800 mt-1">
            {totalDelegates}
          </div>
        </div>
        <div className="bg-[#F3EDE0] border border-[#D2CAB6] p-4 rounded-2xl shadow-sm text-left">
          <div className="text-[10px] font-mono text-[#7B8379] uppercase font-bold">PARTICIPANTS</div>
          <div className="font-serif font-black text-2xl text-[#162E28] mt-1">
            {participantCount}
          </div>
        </div>
        <div className="bg-[#F3EDE0] border border-[#D2CAB6] p-4 rounded-2xl shadow-sm text-left">
          <div className="text-[10px] font-mono text-[#7B8379] uppercase font-bold">ADMINISTRATORS</div>
          <div className="font-serif font-black text-2xl text-[#A77A1C] mt-1">
            {adminCount}
          </div>
        </div>
      </div>

      <div className="bg-[#E9E1D2] border border-[#D2CAB6] p-5 rounded-3xl space-y-4 shadow-sm text-left">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:w-auto flex-1">
            <div className="relative">
              <Search className="w-4 h-4 text-[#7B8379] absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search delegate name, email..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs placeholder-[#7B8379] focus:outline-none focus:border-[#A77A1C]"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs font-mono focus:outline-none focus:border-[#A77A1C]"
            >
              <option value="ALL">All Roles</option>
              <option value="PARTICIPANT">Participants Only</option>
              <option value="ADMIN">Administrators Only</option>
            </select>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={loadData}
              disabled={isLoading}
              className="px-3 py-2 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] hover:border-[#A77A1C] font-mono text-xs flex items-center gap-1.5 transition"
              title="Refresh roster from database"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#A77A1C]' : 'text-[#7B8379]'}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] border border-[#A77A1C]/40 font-mono text-xs font-bold flex items-center gap-2 shadow-md transition shrink-0"
            >
              <Download className="w-4 h-4 text-[#E5BE61]" /> EXPORT DELEGATES CSV
            </button>
          </div>

        </div>
      </div>

      <div className="bg-[#E9E1D2] border border-[#D2CAB6] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#162E28] border-b border-[#A77A1C]/30 text-[#F9F4EA] font-mono text-[10px] uppercase font-bold tracking-wider">
                <th className="py-3.5 px-4">Delegate Name</th>
                <th className="py-3.5 px-4">Google Account (Email)</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Registered Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D2CAB6]/60 text-xs">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#7B8379] font-mono">
                    No delegates found matching current criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id || u.email} className="hover:bg-[#F9F4EA]/60 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                          alt={u.name}
                          className="w-8 h-8 rounded-full object-cover border border-[#A77A1C]/40 shadow-xs"
                        />
                        <div className="font-bold text-[#162E28] font-serif">{u.name}</div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="text-[#A77A1C] font-mono font-bold">{u.email}</div>
                      <div className="text-[10px] text-emerald-800 font-mono flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-700" /> Google Verified
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {u.role === 'ADMIN' ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#162E28] text-[#E5BE61] border border-[#A77A1C]/40 font-mono text-[10px] font-bold flex items-center gap-1 w-fit">
                          <Shield className="w-3 h-3 text-[#E5BE61]" /> ADMIN
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#F9F4EA] text-[#162E28] border border-[#D2CAB6] font-mono text-[10px] flex items-center gap-1 w-fit">
                          <User className="w-3 h-3 text-[#7B8379]" /> PARTICIPANT
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-[#7B8379] font-mono text-[11px]">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Recent'}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedUser(u)}
                          className="p-1.5 rounded-lg bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] hover:text-[#A77A1C] hover:border-[#A77A1C] transition cursor-pointer"
                          title="View Profile Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u)}
                          className="p-1.5 rounded-lg bg-red-50 border border-red-200 text-red-700 hover:bg-red-700 hover:text-white transition cursor-pointer"
                          title="Delete User"
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
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-[#162E28]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#E9E1D2] border border-[#A77A1C]/40 rounded-3xl p-6 max-w-md w-full space-y-5 text-left shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#D2CAB6] pb-3">
              <div className="font-serif font-bold text-lg uppercase text-[#162E28]">
                DELEGATE PROFILE
              </div>
              <button 
                onClick={() => setSelectedUser(null)} 
                className="text-[#7B8379] hover:text-[#162E28] font-mono font-bold text-xs cursor-pointer"
              >
                ✕ CLOSE
              </button>
            </div>

            <div className="flex items-center gap-4 p-3 bg-[#F9F4EA] rounded-2xl border border-[#D2CAB6]">
              <img
                src={selectedUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt={selectedUser.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#A77A1C]"
              />
              <div>
                <div className="font-serif font-black text-base text-[#162E28]">{selectedUser.name}</div>
                <div className="text-xs font-mono text-[#A77A1C]">{selectedUser.email}</div>
                <div className="text-[10px] font-mono uppercase text-[#7B8379] mt-0.5">Role: {selectedUser.role}</div>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-[#162E28] font-mono bg-[#F9F4EA] p-4 rounded-2xl border border-[#D2CAB6]">
              <div className="flex justify-between border-b border-[#D2CAB6]/50 pb-1.5">
                <span className="text-[#7B8379] uppercase">Account Type:</span> 
                <span className="text-[#162E28] font-bold">Google Authenticated</span>
              </div>
              <div className="flex justify-between border-b border-[#D2CAB6]/50 pb-1.5">
                <span className="text-[#7B8379] uppercase">Institution:</span> 
                <span className="text-[#162E28]">Sanjivani University</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7B8379] uppercase">Registered Date:</span> 
                <span className="text-[#7B8379]">{selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleString() : 'N/A'}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedUser(null)}
              className="w-full py-2.5 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#E5BE61] font-mono font-bold text-xs uppercase border border-[#A77A1C]/50 transition cursor-pointer"
            >
              DONE
            </button>
          </div>
        </div>
      )}

    </AdminLayout>
  );
};

export default AdminParticipantsList;
