import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  UserCheck, 
  FileText, 
  TrendingUp, 
  ArrowUpRight,
  ChevronRight,
  AlertTriangle,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { apiService } from '../../services/api';

export const AdminDashboardOverview: React.FC = () => {
  const [chartTimeframe, setChartTimeframe] = useState<'7d' | '30d' | 'all'>('7d');

  const teams = apiService.getTeams();
  const submissions = apiService.getSubmissions();
  const tracks = apiService.getTracks();
  const activityLogs = apiService.getActivityLogs().slice(0, 6);
  const participants = apiService.getParticipants();

  // Metrics
  const totalTeams = teams.length;
  const pendingRegistrations = teams.filter(t => t.status === 'PENDING').length;
  const approvedTeams = teams.filter(t => t.status === 'APPROVED').length;
  const rejectedTeams = teams.filter(t => t.status === 'REJECTED').length;
  const totalParticipants = participants.length;
  const totalSubmissions = submissions.length;

  // Dynamic Chart Analytics based on real stored teams and submissions
  const generateDynamicChartData = (daysCount: number) => {
    const data = [];
    const now = new Date();
    
    for (let i = daysCount - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
      
      d.setHours(23, 59, 59, 999);
      const cutoffTime = d.getTime();

      const regCount = teams.filter(t => t.registrationDate && new Date(t.registrationDate).getTime() <= cutoffTime).length;
      const subCount = submissions.filter(s => s.submittedAt && new Date(s.submittedAt).getTime() <= cutoffTime).length;

      data.push({
        date: dateStr,
        registrations: regCount,
        submissions: subCount
      });
    }
    return data;
  };

  const chartData7d = generateDynamicChartData(7);
  const chartData30d = generateDynamicChartData(30);
  const activeChartData = chartTimeframe === '7d' ? chartData7d : chartData30d;

  const trackCounts = tracks.map(tr => {
    const count = teams.filter(t => t.trackId === tr.id || t.trackTitle.toUpperCase() === tr.title.toUpperCase()).length;
    const percentage = totalTeams > 0 ? Math.round((count / totalTeams) * 100) : 0;
    return { ...tr, count, percentage };
  });

  return (
    <AdminLayout
      title="ADMIN DASHBOARD OVERVIEW"
      subtitle="PRAGYAN 2K26 Hackathon Management & Real-Time Analytics"
    >
      
      {/* OVERVIEW METRIC CARDS (WHITE CRISP CARD DESIGN) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        {/* 1. Total Teams */}
        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm space-y-3 relative overflow-hidden group hover:border-[#1D4ED8] transition-all">
          <div className="flex items-center justify-between text-[#1D4ED8]">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">TOTAL TEAMS</span>
            <div className="p-2 rounded-xl bg-blue-50 text-[#1D4ED8]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="font-space font-extrabold text-3xl text-[#0B192C]">{totalTeams}</div>
          <div className="text-[10px] text-emerald-600 font-mono font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Live MongoDB Sync
          </div>
        </div>

        {/* 2. Pending */}
        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm space-y-3 relative overflow-hidden group hover:border-amber-500 transition-all">
          <div className="flex items-center justify-between text-amber-600">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">PENDING</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="font-space font-extrabold text-3xl text-amber-600">{pendingRegistrations}</div>
          <div className="text-[10px] text-slate-500 font-mono">Requires admin review</div>
        </div>

        {/* 3. Approved */}
        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm space-y-3 relative overflow-hidden group hover:border-emerald-500 transition-all">
          <div className="flex items-center justify-between text-emerald-600">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">APPROVED</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="font-space font-extrabold text-3xl text-emerald-600">{approvedTeams}</div>
          <div className="text-[10px] text-emerald-600 font-mono font-bold">Verified for final round</div>
        </div>

        {/* 4. Rejected */}
        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm space-y-3 relative overflow-hidden group hover:border-red-500 transition-all">
          <div className="flex items-center justify-between text-red-600">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">REJECTED</span>
            <div className="p-2 rounded-xl bg-red-50 text-red-600">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="font-space font-extrabold text-3xl text-red-600">{rejectedTeams}</div>
          <div className="text-[10px] text-slate-500 font-mono">Disqualified entries</div>
        </div>

        {/* 5. Participants */}
        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm space-y-3 relative overflow-hidden group hover:border-indigo-500 transition-all">
          <div className="flex items-center justify-between text-indigo-600">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">PARTICIPANTS</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="font-space font-extrabold text-3xl text-indigo-900">{totalParticipants}</div>
          <div className="text-[10px] text-slate-500 font-mono">4 members / team</div>
        </div>

        {/* 6. Submissions */}
        <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm space-y-3 relative overflow-hidden group hover:border-cyan-500 transition-all">
          <div className="flex items-center justify-between text-cyan-600">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">SUBMISSIONS</span>
            <div className="p-2 rounded-xl bg-cyan-50 text-cyan-600">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="font-space font-extrabold text-3xl text-cyan-900">{totalSubmissions}</div>
          <div className="text-[10px] text-slate-500 font-mono">GridFS Files</div>
        </div>

      </div>

      {/* REGISTRATION CHART & TRACKS BREAKDOWN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Registration Analytics Chart */}
        <div className="lg:col-span-8 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-space font-bold text-lg text-[#0B192C] uppercase flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#1D4ED8]" />
                <span>REGISTRATION OVERVIEW</span>
              </h3>
              <p className="text-xs text-slate-500">Cumulative team registrations and project submissions over time</p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setChartTimeframe('7d')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition ${
                  chartTimeframe === '7d' ? 'bg-[#1D4ED8] text-white shadow-sm' : 'text-slate-600 hover:text-[#0B192C]'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setChartTimeframe('30d')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition ${
                  chartTimeframe === '30d' ? 'bg-[#1D4ED8] text-white shadow-sm' : 'text-slate-600 hover:text-[#0B192C]'
                }`}
              >
                30 Days
              </button>
              <button
                onClick={() => setChartTimeframe('all')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition ${
                  chartTimeframe === 'all' ? 'bg-[#1D4ED8] text-white shadow-sm' : 'text-slate-600 hover:text-[#0B192C]'
                }`}
              >
                All Time
              </button>
            </div>
          </div>

          <div className="h-[280px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorSub" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="date" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', borderRadius: '12px', fontSize: '12px', color: '#0B192C' }}
                />
                <Area type="monotone" dataKey="registrations" stroke="#1D4ED8" strokeWidth={3} fillOpacity={1} fill="url(#colorReg)" name="Registrations" />
                <Area type="monotone" dataKey="submissions" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorSub)" name="Submissions" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Teams by Track */}
        <div className="lg:col-span-4 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-space font-bold text-lg text-[#0B192C] uppercase">TEAMS BY TRACK</h3>
            <p className="text-xs text-slate-500">Distribution across 4 innovation tracks</p>
          </div>

          <div className="space-y-4">
            {trackCounts.map((tr) => (
              <div key={tr.id} className="space-y-1.5 bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0B192C] font-space truncate max-w-[200px]">{tr.title}</span>
                  <span className="font-mono text-[#1D4ED8] font-bold">{tr.count} Teams</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#1D4ED8] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(tr.percentage, 10)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RECENT REGISTRATIONS & PENDING ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Registrations */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-space font-bold text-base text-[#0B192C] uppercase">RECENT REGISTRATIONS</h3>
            <Link to="/admin/teams" className="text-xs text-[#1D4ED8] hover:underline font-mono flex items-center gap-1 font-bold">
              VIEW ALL TEAMS <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 font-mono text-[10px] uppercase">
                  <th className="py-2.5 px-3">Team ID</th>
                  <th className="py-2.5 px-3">Team Name</th>
                  <th className="py-2.5 px-3">College</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {teams.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-400 font-mono">
                      No team registrations recorded in database yet.
                    </td>
                  </tr>
                ) : (
                  teams.slice(0, 4).map((tm) => (
                    <tr key={tm.teamId} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-3 font-mono font-bold text-[#1D4ED8]">
                        <Link to={`/admin/teams/${tm.teamId}`} className="hover:underline">
                          {tm.teamId}
                        </Link>
                      </td>
                      <td className="py-3 px-3 font-bold text-[#0B192C]">{tm.teamName}</td>
                      <td className="py-3 px-3 text-slate-600 truncate max-w-[140px]">{tm.college}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          tm.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                          tm.status === 'REJECTED' ? 'bg-red-100 text-red-800 border border-red-300' :
                          'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}>
                          {tm.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Actions & System Audit Stream */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-space font-bold text-base text-[#0B192C] uppercase flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>PENDING ADMIN ACTIONS</span>
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 font-bold">
              ACTION REQUIRED
            </span>
          </div>

          <div className="space-y-3">
            <Link to="/admin/registrations" className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#1D4ED8] transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B192C]">{pendingRegistrations} Team Registrations Pending</div>
                  <div className="text-[10px] text-slate-500">Review team members & college credentials</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link to="/admin/submissions" className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#1D4ED8] transition-all">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-100 text-[#1D4ED8]">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B192C]">{submissions.filter(s => s.status === 'SUBMITTED').length} Project Submissions Awaiting Review</div>
                  <div className="text-[10px] text-slate-500">Evaluate pitch decks, video demos & code repos</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          {/* Activity Log Stream */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#1D4ED8]" /> RECENT SYSTEM AUDIT LOGS
            </div>
            <div className="space-y-2 max-h-36 overflow-y-auto custom-scrollbar pr-1">
              {activityLogs.length === 0 ? (
                <div className="text-xs text-slate-400 font-mono text-center py-2">No activity logs recorded yet.</div>
              ) : (
                activityLogs.map((log) => (
                  <div key={log.id} className="text-[11px] p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="font-bold text-[#0B192C]">{log.action}: </span>
                      <span className="text-slate-600">{log.entity}</span>
                    </div>
                    <span className="font-mono text-[9px] text-slate-400">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </AdminLayout>
  );
};
