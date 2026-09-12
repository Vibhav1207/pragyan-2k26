import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { apiService } from '../../services/api';

export const AdminActivityLogs: React.FC = () => {
  const logs = apiService.getActivityLogs();
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.adminEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAction = actionFilter === 'ALL' || log.type === actionFilter;

    return matchesSearch && matchesAction;
  });

  return (
    <AdminLayout
      title="SECURITY ACTIVITY AUDIT LOGS"
      subtitle="Complete chronological audit trail recording all administrative actions, team approvals, and CMS updates"
    >
      
      {/* FILTER BAR */}
      <div className="bg-[#E9E1D2] border border-[#D2CAB6] p-5 rounded-3xl space-y-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-[#7B8379] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search audit logs by admin email, action type, team ID..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs placeholder-[#7B8379] focus:outline-none focus:border-[#A77A1C] transition"
            />
          </div>

          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#F9F4EA] border border-[#D2CAB6] text-[#162E28] text-xs font-mono focus:outline-none focus:border-[#A77A1C] transition"
          >
            <option value="ALL">All Event Severities</option>
            <option value="SUCCESS">Success Actions</option>
            <option value="INFO">Information Logs</option>
            <option value="WARNING">Warnings</option>
            <option value="DANGER">Destructive / Deletions</option>
          </select>
        </div>
      </div>

      {/* AUDIT LOG TABLE */}
      <div className="bg-[#E9E1D2] border border-[#D2CAB6] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#162E28] border-b border-[#A77A1C]/30 text-[#F9F4EA] font-mono text-[10px] uppercase font-bold tracking-wider">
                <th className="py-3.5 px-4 font-bold">Timestamp</th>
                <th className="py-3.5 px-4 font-bold">Admin User</th>
                <th className="py-3.5 px-4 font-bold">Action Type</th>
                <th className="py-3.5 px-4 font-bold">Target Entity</th>
                <th className="py-3.5 px-4 font-bold">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D2CAB6]/60 text-xs">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#7B8379] font-mono">
                    No activity audit logs matching filters.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#F9F4EA]/60 transition">
                    
                    {/* Timestamp */}
                    <td className="py-3.5 px-4 text-[#7B8379] font-mono text-[11px] whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>

                    {/* Admin */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#162E28] font-serif">{log.adminName}</div>
                      <div className="text-[10px] font-mono text-[#A77A1C] font-bold">{log.adminEmail}</div>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        log.type === 'SUCCESS' ? 'bg-emerald-900/20 text-emerald-900 border border-emerald-600/30' :
                        log.type === 'DANGER' ? 'bg-red-900/20 text-red-900 border border-red-600/30' :
                        log.type === 'WARNING' ? 'bg-amber-900/20 text-[#A77A1C] border border-[#A77A1C]/30' :
                        'bg-[#F9F4EA] text-[#162E28] border border-[#D2CAB6]'
                      }`}>
                        {log.action}
                      </span>
                    </td>

                    {/* Entity */}
                    <td className="py-3.5 px-4 font-mono font-bold text-[#162E28]">
                      {log.entity}
                    </td>

                    {/* Details */}
                    <td className="py-3.5 px-4 text-[#7B8379] font-sans text-xs">
                      {log.details}
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


