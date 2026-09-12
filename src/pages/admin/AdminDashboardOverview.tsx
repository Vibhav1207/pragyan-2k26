import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  UserCheck, 
  FileText, 
  TrendingUp, 
  ArrowUpRight,
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
  const [teams, setTeams] = useState(() => apiService.getTeams());

  useEffect(() => {
    let isMounted = true;
    apiService.fetchTeamsAsync().then(fresh => {
      if (isMounted && fresh) setTeams(fresh);
    });
    return () => { isMounted = false; };
  }, []);
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
      
      {/* OVERVIEW METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
        {/* 1. Total Teams */}
        <div className="bg-[#F3EDE0] border border-[#D2CAB6] p-5 rounded-3xl shadow-sm space-y-3 relative overflow-hidden group hover:border-[#A77A1C] transition-all">
          <div className="flex items-center justify-between text-[#A77A1C]">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#7B8379]">TOTAL TEAMS</span>
            <div className="p-2 rounded-xl bg-[#E9E1D2] text-[#A77A1C] border border-[#A77A1C]/30">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif font-black text-3xl text-[#162E28]">{totalTeams}</div>
          <div className="text-[10px] font-mono font-bold text-[#A77A1C] uppercase flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-[#A77A1C]" /> Active Roster
          </div>
        </div>

        {/* 2. Pending Approval */}
        <div className="bg-[#F3EDE0] border border-[#D2CAB6] p-5 rounded-3xl shadow-sm space-y-3 relative overflow-hidden group hover:border-[#A77A1C] transition-all">
          <div className="flex items-center justify-between text-[#A77A1C]">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#7B8379]">PENDING VERIFICATION</span>
            <div className="p-2 rounded-xl bg-[#E9E1D2] text-[#A77A1C] border border-[#A77A1C]/30">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif font-black text-3xl text-[#A77A1C]">{pendingRegistrations}</div>
          <div className="text-[10px] font-mono font-bold text-[#A77A1C] uppercase">Needs Admin Review</div>
        </div>

        {/* 3. Approved Teams */}
        <div className="bg-[#F3EDE0] border border-[#D2CAB6] p-5 rounded-3xl shadow-sm space-y-3 relative overflow-hidden group hover:border-[#A77A1C] transition-all">
          <div className="flex items-center justify-between text-[#162E28]">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#7B8379]">APPROVED TEAMS</span>
            <div className="p-2 rounded-xl bg-[#162E28] text-[#E5BE61] border border-[#A77A1C]/40">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif font-black text-3xl text-[#162E28]">{approvedTeams}</div>
          <div className="text-[10px] font-mono font-bold text-[#162E28] uppercase">Confirmed Entries</div>
        </div>

        {/* 4. Total Participants */}
        <div className="bg-[#F3EDE0] border border-[#D2CAB6] p-5 rounded-3xl shadow-sm space-y-3 relative overflow-hidden group hover:border-[#A77A1C] transition-all">
          <div className="flex items-center justify-between text-[#A77A1C]">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#7B8379]">PARTICIPANTS</span>
            <div className="p-2 rounded-xl bg-[#E9E1D2] text-[#A77A1C] border border-[#A77A1C]/30">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif font-black text-3xl text-[#162E28]">{totalParticipants}</div>
          <div className="text-[10px] font-mono font-bold text-[#7B8379] uppercase">Verified Delegates</div>
        </div>

        {/* 5. Submissions Received */}
        <div className="bg-[#F3EDE0] border border-[#D2CAB6] p-5 rounded-3xl shadow-sm space-y-3 relative overflow-hidden group hover:border-[#A77A1C] transition-all">
          <div className="flex items-center justify-between text-[#A77A1C]">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#7B8379]">SUBMISSIONS</span>
            <div className="p-2 rounded-xl bg-[#E9E1D2] text-[#A77A1C] border border-[#A77A1C]/30">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif font-black text-3xl text-[#162E28]">{totalSubmissions}</div>
          <div className="text-[10px] font-mono font-bold text-[#A77A1C] uppercase">Phase 1 Solutions</div>
        </div>

        {/* 6. Rejected Teams */}
        <div className="bg-[#F3EDE0] border border-[#D2CAB6] p-5 rounded-3xl shadow-sm space-y-3 relative overflow-hidden group hover:border-red-400 transition-all">
          <div className="flex items-center justify-between text-red-700">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#7B8379]">REJECTED</span>
            <div className="p-2 rounded-xl bg-red-100 border border-red-200 text-red-700">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif font-black text-3xl text-red-700">{rejectedTeams}</div>
          <div className="text-[10px] font-mono font-bold text-red-700 uppercase">Incomplete</div>
        </div>

      </div>

      {/* SECOND ROW: REAL-TIME ANALYTICS CHART & TRACK DISTRIBUTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Registration Velocity Chart */}
        <div className="lg:col-span-8 bg-[#F3EDE0] border border-[#D2CAB6] p-6 sm:p-8 rounded-3xl shadow-md space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D2CAB6] pb-4">
            <div>
              <h2 className="font-serif font-black text-xl text-[#162E28] uppercase flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#A77A1C]" />
                <span>REGISTRATION & SUBMISSION VELOCITY</span>
              </h2>
              <p className="text-xs text-[#7B8379] font-sans">Real-time daily growth trajectory of teams and project submissions</p>
            </div>

            <div className="flex items-center bg-[#E9E1D2] p-1 rounded-xl border border-[#D2CAB6] text-xs font-mono">
              <button
                onClick={() => setChartTimeframe('7d')}
                className={`px-3 py-1 rounded-lg font-bold transition ${chartTimeframe === '7d' ? 'bg-[#162E28] text-[#E5BE61] shadow-sm' : 'text-[#7B8379]'}`}
              >
                7 Days
              </button>
              <button
                onClick={() => setChartTimeframe('30d')}
                className={`px-3 py-1 rounded-lg font-bold transition ${chartTimeframe === '30d' ? 'bg-[#162E28] text-[#E5BE61] shadow-sm' : 'text-[#7B8379]'}`}
              >
                30 Days
              </button>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRegs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#162E28" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#162E28" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorSubs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A77A1C" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#A77A1C" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#D2CAB6" opacity={0.6} />
                <XAxis dataKey="date" stroke="#7B8379" fontSize={11} tickLine={false} />
                <YAxis stroke="#7B8379" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#162E28', borderColor: '#A77A1C', borderRadius: '1rem', color: '#F9F4EA', fontSize: '12px', fontFamily: 'JetBrains Mono' }}
                />
                <Area type="monotone" dataKey="registrations" stroke="#162E28" strokeWidth={3} fillOpacity={1} fill="url(#colorRegs)" name="Registrations" />
                <Area type="monotone" dataKey="submissions" stroke="#A77A1C" strokeWidth={3} fillOpacity={1} fill="url(#colorSubs)" name="Submissions" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Track Distribution Bar */}
        <div className="lg:col-span-4 bg-[#F3EDE0] border border-[#D2CAB6] p-6 sm:p-8 rounded-3xl shadow-md space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="font-serif font-black text-xl text-[#162E28] uppercase border-b border-[#D2CAB6] pb-3">
              TRACK DISTRIBUTION
            </h2>

            <div className="space-y-4 pt-1">
              {trackCounts.map(tr => (
                <div key={tr.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-[#162E28] truncate max-w-[200px]">{tr.title}</span>
                    <span className="text-[#A77A1C] font-bold">{tr.count} teams ({tr.percentage}%)</span>
                  </div>
                  <div className="h-2 w-full bg-[#E9E1D2] rounded-full overflow-hidden border border-[#D2CAB6]">
                    <div
                      className="h-full bg-[#162E28] rounded-full transition-all duration-500"
                      style={{ width: `${tr.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/admin/tracks"
            className="w-full py-3 rounded-xl bg-[#162E28] hover:bg-[#2B3E35] text-[#F9F4EA] font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 border border-[#A77A1C]/50 transition"
          >
            <span>MANAGE ALL TRACKS</span>
            <ArrowUpRight className="w-4 h-4 text-[#E5BE61]" />
          </Link>
        </div>

      </div>

      {/* THIRD ROW: RECENT REGISTRATIONS TABLE & SYSTEM ACTIVITY LOGS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Registrations Table */}
        <div className="lg:col-span-8 bg-[#F3EDE0] border border-[#D2CAB6] p-6 sm:p-8 rounded-3xl shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-[#D2CAB6] pb-4">
            <h2 className="font-serif font-black text-xl text-[#162E28] uppercase">
              RECENT TEAM REGISTRATIONS
            </h2>
            <Link to="/admin/registrations" className="text-xs font-mono font-bold text-[#A77A1C] hover:underline flex items-center gap-1">
              View All Registrations →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#E9E1D2] border-b border-[#D2CAB6] text-[#162E28] font-mono font-bold uppercase">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Team Code</th>
                  <th className="p-3.5">Team Name</th>
                  <th className="p-3.5">Track</th>
                  <th className="p-3.5">Leader</th>
                  <th className="p-3.5 rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D2CAB6]">
                {teams.slice(0, 5).map(team => (
                  <tr key={team.teamId} className="hover:bg-[#E9E1D2]/50 transition">
                    <td className="p-3.5 font-mono font-bold text-[#162E28]">{team.teamCode || team.teamId}</td>
                    <td className="p-3.5 font-serif font-bold text-[#162E28]">{team.teamName}</td>
                    <td className="p-3.5 text-[#7B8379] font-mono text-[11px]">{team.trackTitle}</td>
                    <td className="p-3.5 text-[#162E28]">{team.leader?.fullName || 'Leader'}</td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                        team.status === 'APPROVED' ? 'bg-[#162E28] text-[#E5BE61] border border-[#A77A1C]' :
                        team.status === 'REJECTED' ? 'bg-red-100 text-red-800 border border-red-300' :
                        'bg-[#E9E1D2] text-[#A77A1C] border border-[#A77A1C]/50'
                      }`}>
                        {team.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Activity Feed */}
        <div className="lg:col-span-4 bg-[#F3EDE0] border border-[#D2CAB6] p-6 sm:p-8 rounded-3xl shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-[#D2CAB6] pb-4">
            <h2 className="font-serif font-black text-xl text-[#162E28] uppercase flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#A77A1C]" />
              <span>LIVE AUDIT TRAIL</span>
            </h2>
            <Link to="/admin/activity" className="text-xs font-mono font-bold text-[#A77A1C] hover:underline">
              View Logs →
            </Link>
          </div>

          <div className="space-y-3">
            {activityLogs.map(log => (
              <div key={log.id} className="p-3.5 rounded-2xl bg-[#F9F4EA] border border-[#D2CAB6] space-y-1 text-xs">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold text-[#162E28] uppercase">{log.action}</span>
                  <span className="text-[#7B8379]">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-xs text-[#7B8379] font-sans">{log.details}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </AdminLayout>
  );
};
