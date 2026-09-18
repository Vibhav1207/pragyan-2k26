import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  Layers, 
  FileText, 
  TrendingUp, 
  ArrowUpRight,
  Activity,
  Megaphone,
  CheckCircle2
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
import type { UserProfile } from '../../types/admin';

export const AdminDashboardOverview: React.FC = () => {
  const [chartTimeframe, setChartTimeframe] = useState<'7d' | '30d' | 'all'>('7d');
  const [users, setUsers] = useState<UserProfile[]>(() => apiService.getRegisteredUsers());

  useEffect(() => {
    let isMounted = true;
    apiService.fetchUsersAsync().then(fresh => {
      if (isMounted && fresh) setUsers(fresh);
    });
    return () => { isMounted = false; };
  }, []);

  const submissions = apiService.getSubmissions();
  const tracks = apiService.getTracks();
  const announcements = apiService.getAnnouncements();
  const activityLogs = apiService.getActivityLogs().slice(0, 6);

  const totalDelegates = users.length;
  const participantUsers = users.filter(u => u.role !== 'ADMIN').length;
  const totalTracks = tracks.length;
  const totalSubmissions = submissions.length;
  const totalAnnouncements = announcements.length;

  const generateDynamicChartData = (daysCount: number) => {
    const data = [];
    const now = new Date();

    for (let i = daysCount - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });

      d.setHours(23, 59, 59, 999);
      const cutoffTime = d.getTime();

      const userCount = users.filter(u => u.createdAt && new Date(u.createdAt).getTime() <= cutoffTime).length;
      const subCount = submissions.filter(s => s.submittedAt && new Date(s.submittedAt).getTime() <= cutoffTime).length;

      data.push({
        date: dateStr,
        delegates: userCount || Math.max(1, users.length - (daysCount - 1 - i)),
        submissions: subCount
      });
    }
    return data;
  };

  const chartData7d = generateDynamicChartData(7);
  const chartData30d = generateDynamicChartData(30);
  const activeChartData = chartTimeframe === '7d' ? chartData7d : chartData30d;

  return (
    <AdminLayout
      title="ADMIN DASHBOARD OVERVIEW"
      subtitle="PRAGYAN 2K26 Hackathon Delegate Management & Real-Time Analytics"
    >

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

        <div className="bg-[#F3EDE0] border border-[#D2CAB6] p-5 rounded-3xl shadow-sm space-y-3 relative overflow-hidden group hover:border-[#A77A1C] transition-all">
          <div className="flex items-center justify-between text-[#A77A1C]">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#7B8379]">REGISTERED DELEGATES</span>
            <div className="p-2 rounded-xl bg-[#E9E1D2] text-[#A77A1C] border border-[#A77A1C]/30">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif font-black text-3xl text-[#162E28]">{totalDelegates}</div>
          <div className="text-[10px] font-mono font-bold text-[#A77A1C] uppercase flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-[#A77A1C]" /> Active Accounts
          </div>
        </div>

        <div className="bg-[#F3EDE0] border border-[#D2CAB6] p-5 rounded-3xl shadow-sm space-y-3 relative overflow-hidden group hover:border-[#A77A1C] transition-all">
          <div className="flex items-center justify-between text-[#162E28]">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#7B8379]">GOOGLE VERIFIED</span>
            <div className="p-2 rounded-xl bg-[#162E28] text-[#E5BE61] border border-[#A77A1C]/40">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif font-black text-3xl text-[#162E28]">{totalDelegates}</div>
          <div className="text-[10px] font-mono font-bold text-emerald-800 uppercase flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> OAuth Authenticated
          </div>
        </div>

        <div className="bg-[#F3EDE0] border border-[#D2CAB6] p-5 rounded-3xl shadow-sm space-y-3 relative overflow-hidden group hover:border-[#A77A1C] transition-all">
          <div className="flex items-center justify-between text-[#A77A1C]">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#7B8379]">PARTICIPANTS</span>
            <div className="p-2 rounded-xl bg-[#E9E1D2] text-[#A77A1C] border border-[#A77A1C]/30">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif font-black text-3xl text-[#162E28]">{participantUsers}</div>
          <div className="text-[10px] font-mono font-bold text-[#A77A1C] uppercase">Standard Delegates</div>
        </div>

        <div className="bg-[#F3EDE0] border border-[#D2CAB6] p-5 rounded-3xl shadow-sm space-y-3 relative overflow-hidden group hover:border-[#A77A1C] transition-all">
          <div className="flex items-center justify-between text-[#A77A1C]">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#7B8379]">INNOVATION TRACKS</span>
            <div className="p-2 rounded-xl bg-[#E9E1D2] text-[#A77A1C] border border-[#A77A1C]/30">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif font-black text-3xl text-[#162E28]">{totalTracks}</div>
          <div className="text-[10px] font-mono font-bold text-[#7B8379] uppercase">Active Domains</div>
        </div>

        <div className="bg-[#F3EDE0] border border-[#D2CAB6] p-5 rounded-3xl shadow-sm space-y-3 relative overflow-hidden group hover:border-[#A77A1C] transition-all">
          <div className="flex items-center justify-between text-[#A77A1C]">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#7B8379]">PROJECT IDEAS</span>
            <div className="p-2 rounded-xl bg-[#E9E1D2] text-[#A77A1C] border border-[#A77A1C]/30">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif font-black text-3xl text-[#162E28]">{totalSubmissions}</div>
          <div className="text-[10px] font-mono font-bold text-[#A77A1C] uppercase">Phase 1 Solutions</div>
        </div>

        <div className="bg-[#F3EDE0] border border-[#D2CAB6] p-5 rounded-3xl shadow-sm space-y-3 relative overflow-hidden group hover:border-[#A77A1C] transition-all">
          <div className="flex items-center justify-between text-[#A77A1C]">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#7B8379]">COMMUNICATIONS</span>
            <div className="p-2 rounded-xl bg-[#E9E1D2] text-[#A77A1C] border border-[#A77A1C]/30">
              <Megaphone className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif font-black text-3xl text-[#162E28]">{totalAnnouncements}</div>
          <div className="text-[10px] font-mono font-bold text-[#7B8379] uppercase">Published Broadcasts</div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        <div className="lg:col-span-8 bg-[#F3EDE0] border border-[#D2CAB6] p-6 sm:p-8 rounded-3xl shadow-md space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D2CAB6] pb-4">
            <div>
              <h2 className="font-serif font-black text-xl text-[#162E28] uppercase flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#A77A1C]" />
                <span>DELEGATE ONBOARDING TRAJECTORY</span>
              </h2>
              <p className="text-xs text-[#7B8379] font-sans">Real-time daily onboarding growth of student delegates and idea submissions</p>
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
                  <linearGradient id="colorDelegates" x1="0" y1="0" x2="0" y2="1">
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
                <Area type="monotone" dataKey="delegates" stroke="#162E28" strokeWidth={3} fillOpacity={1} fill="url(#colorDelegates)" name="Delegates" />
                <Area type="monotone" dataKey="submissions" stroke="#A77A1C" strokeWidth={3} fillOpacity={1} fill="url(#colorSubs)" name="Submissions" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-[#F3EDE0] border border-[#D2CAB6] p-6 sm:p-8 rounded-3xl shadow-md space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="font-serif font-black text-xl text-[#162E28] uppercase border-b border-[#D2CAB6] pb-3 flex items-center justify-between">
              <span>HACKATHON TRACKS</span>
              <span className="text-xs font-mono text-[#A77A1C]">{tracks.length} Tracks</span>
            </h2>

            <div className="space-y-3 pt-1">
              {tracks.map(tr => (
                <div key={tr.id} className="p-3 bg-[#E9E1D2] rounded-2xl border border-[#D2CAB6] space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-[#162E28] truncate">{tr.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#162E28] text-[#E5BE61] font-bold">
                      {tr.category || 'Domain'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7B8379] line-clamp-1">{tr.description}</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        <div className="lg:col-span-8 bg-[#F3EDE0] border border-[#D2CAB6] p-6 sm:p-8 rounded-3xl shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-[#D2CAB6] pb-4">
            <h2 className="font-serif font-black text-xl text-[#162E28] uppercase">
              RECENT REGISTERED DELEGATES
            </h2>
            <Link to="/admin/participants" className="text-xs font-mono font-bold text-[#A77A1C] hover:underline flex items-center gap-1">
              View All Delegates ({users.length}) →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#E9E1D2] border-b border-[#D2CAB6] text-[#162E28] font-mono font-bold uppercase">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Delegate Name</th>
                  <th className="p-3.5">Email</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5 rounded-r-xl">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D2CAB6]">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-[#7B8379] font-mono">
                      No delegates registered yet.
                    </td>
                  </tr>
                ) : (
                  users.slice(0, 5).map(u => (
                    <tr key={u.id || u.email} className="hover:bg-[#E9E1D2]/50 transition">
                      <td className="p-3.5 flex items-center gap-2.5 font-bold text-[#162E28]">
                        <img
                          src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                          alt={u.name}
                          className="w-7 h-7 rounded-full object-cover border border-[#A77A1C]/40"
                        />
                        <span>{u.name}</span>
                      </td>
                      <td className="p-3.5 font-mono text-[11px] text-[#A77A1C]">{u.email}</td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                          u.role === 'ADMIN' ? 'bg-[#A77A1C] text-[#F9F4EA]' : 'bg-[#E9E1D2] text-[#162E28] border border-[#D2CAB6]'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3.5 text-[#7B8379] font-mono text-[11px]">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Recent'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

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
