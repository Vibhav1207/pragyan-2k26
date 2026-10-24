import { useEffect, useState } from 'react';
import {
  Activity,
  Eye,
  Users,
  Globe,
  RefreshCw,
  ExternalLink,
  Monitor,
  Smartphone,
  Tablet,
  AlertCircle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { fetchWebsiteAnalytics } from '../../services/analytics';
import type { AnalyticsRange, WebsiteAnalyticsOverview } from '../../types/analytics';

const RANGE_LABELS: Record<AnalyticsRange, string> = {
  '24h': 'Last 24 hours',
  '7d': 'Last 7 days',
  '30d': 'Last 30 days'
};
const TIME_ZONE = 'Asia/Kolkata';

function formatTime(value: string, date = false) {
  return new Date(value).toLocaleString('en-IN', {
    timeZone: TIME_ZONE,
    ...(date ? { month: 'short', day: 'numeric' } : { hour: '2-digit', minute: '2-digit' })
  });
}

export function AdminAnalytics() {
  const [range, setRange] = useState<AnalyticsRange>('24h');
  const [data, setData] = useState<WebsiteAnalyticsOverview | null>(null);
  const [error, setError] = useState<{ range: AnalyticsRange; message: string } | null>(null);
  const [refreshVersion, setRefreshVersion] = useState(0);

  useEffect(() => {
    let stopped = false;
    let pending = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const controller = new AbortController();
    const refresh = async () => {
      if (stopped || pending || document.visibilityState === 'hidden') return;
      pending = true;
      try {
        const next = await fetchWebsiteAnalytics(range, controller.signal);
        if (!stopped) {
          setData(next);
          setError(null);
        }
      } catch (failure) {
        if (!stopped && !controller.signal.aborted) {
          setError({
            range,
            message:
              failure instanceof Error ? failure.message : 'Analytics is temporarily unavailable.'
          });
        }
      } finally {
        pending = false;
        if (!stopped) timer = setTimeout(refresh, 5000);
      }
    };
    const becameVisible = () => {
      if (document.visibilityState === 'visible') {
        clearTimeout(timer);
        void refresh();
      }
    };
    void refresh();
    document.addEventListener('visibilitychange', becameVisible);
    return () => {
      stopped = true;
      controller.abort();
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', becameVisible);
    };
  }, [range, refreshVersion]);

  const current = data?.range === range ? data : null;
  const failure = error?.range === range ? error.message : null;
  const cards = [
    {
      label: 'Visitors online',
      value: current?.totals.onlineVisitors,
      Icon: Activity,
      hint: `Active in the last ${current?.activeWindowSeconds || 60} seconds`
    },
    { label: 'Page views', value: current?.totals.pageViews, Icon: Eye, hint: RANGE_LABELS[range] },
    {
      label: 'Unique visitors',
      value: current?.totals.uniqueVisitors,
      Icon: Users,
      hint: 'Distinct anonymous browsers'
    },
    {
      label: 'Pages visited',
      value: current?.totals.pagesVisited,
      Icon: Globe,
      hint: RANGE_LABELS[range]
    }
  ];

  return (
    <AdminLayout
      title="LIVE WEBSITE ANALYTICS"
      subtitle="See website traffic, visitors online, and the pages people are exploring"
    >
      <div className="space-y-6 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D2CAB6] pb-5">
          <div className="space-y-2">
            <div
              role="status"
              className="flex items-center gap-2 text-xs font-mono font-bold text-[#162E28]"
            >
              <span
                className={`h-2 w-2 rounded-full ${failure ? 'bg-amber-600' : current ? 'bg-emerald-600 animate-pulse' : 'bg-[#7B8379]'}`}
              />
              {failure
                ? 'CONNECTION INTERRUPTED'
                : current
                  ? 'LIVE · REFRESHES EVERY 5 SECONDS'
                  : 'CONNECTING TO ANALYTICS'}
            </div>
            <p className="text-xs text-[#7B8379]">
              {current
                ? `Last updated ${formatTime(current.generatedAt)} IST`
                : 'Traffic will appear here as visitors browse the website.'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="analytics-range" className="sr-only">
              Reporting period
            </label>
            <select
              id="analytics-range"
              value={range}
              onChange={(event) => setRange(event.target.value as AnalyticsRange)}
              className="min-w-0 rounded-xl border border-[#D2CAB6] bg-[#F9F4EA] px-3 py-2.5 text-xs font-mono text-[#162E28] focus:outline-none focus:border-[#A77A1C]"
            >
              {Object.entries(RANGE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setRefreshVersion((version) => version + 1)}
              className="flex items-center gap-2 rounded-xl bg-[#162E28] px-4 py-2.5 text-xs font-mono font-bold text-[#E5BE61] hover:bg-[#2B3E35] transition"
            >
              <RefreshCw className="h-4 w-4" /> Refresh
            </button>
          </div>
        </div>

        {failure && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-2xl border border-amber-700/30 bg-amber-100/60 p-4 text-sm text-amber-950"
          >
            <AlertCircle className="h-5 w-5 shrink-0" />
            <div>
              {failure}
              {current && <p className="mt-1 text-xs">Showing the last successful update.</p>}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {cards.map(({ label, value, Icon, hint }) => (
            <div
              key={label}
              className="rounded-3xl border border-[#D2CAB6] bg-[#E9E1D2] p-4 sm:p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#7B8379]">
                  {label}
                </span>
                <Icon className="h-4 w-4 shrink-0 text-[#A77A1C]" />
              </div>
              <div className="mt-4 font-serif text-3xl sm:text-4xl font-black text-[#162E28]">
                {value === undefined ? '—' : value.toLocaleString('en-IN')}
              </div>
              <p className="mt-2 text-[10px] sm:text-xs text-[#7B8379]">{hint}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <section className="xl:col-span-2 rounded-3xl border border-[#D2CAB6] bg-[#F3EDE0] p-5 sm:p-6 shadow-sm">
            <div className="mb-6 flex items-start justify-between gap-3">
              <div>
                <h2 className="font-serif text-lg font-bold text-[#162E28]">VIEWS OVER TIME</h2>
                <p className="mt-1 text-xs text-[#7B8379]">
                  {RANGE_LABELS[range]} · India Standard Time
                </p>
              </div>
              <Eye className="h-5 w-5 text-[#A77A1C]" />
            </div>
            {!current ? (
              <div className="flex h-64 items-center justify-center text-sm text-[#7B8379]">
                {failure ? 'Waiting for a connection' : 'Loading traffic…'}
              </div>
            ) : current.totals.pageViews === 0 ? (
              <div className="flex h-64 flex-col items-center justify-center gap-2 text-center">
                <Globe className="h-8 w-8 text-[#A77A1C]" />
                <p className="text-sm font-semibold text-[#162E28]">
                  No page views in this period yet
                </p>
                <p className="text-xs text-[#7B8379]">
                  Visit the public website to start seeing activity.
                </p>
              </div>
            ) : (
              <div className="h-64 w-full min-w-0" aria-label="Page views over time">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={current.timeline}
                    margin={{ left: -20, right: 8, top: 8, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="websiteAnalyticsFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#A77A1C" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#A77A1C" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#D2CAB6" strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="time"
                      tickFormatter={(value) => formatTime(value, range !== '24h')}
                      minTickGap={35}
                      tick={{ fill: '#7B8379', fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fill: '#7B8379', fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      labelFormatter={(value) => formatTime(String(value), range !== '24h')}
                      formatter={(value) => [Number(value).toLocaleString('en-IN'), 'Page views']}
                      contentStyle={{
                        background: '#F9F4EA',
                        border: '1px solid #D2CAB6',
                        borderRadius: 12,
                        fontSize: 12
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stroke="#A77A1C"
                      strokeWidth={2}
                      fill="url(#websiteAnalyticsFill)"
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </section>

          <section className="rounded-3xl border border-[#D2CAB6] bg-[#162E28] p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-[#E5BE61]" />
              <h2 className="font-serif text-lg font-bold text-[#F9F4EA]">PAGES ACTIVE NOW</h2>
            </div>
            <p className="mt-2 text-xs text-[#D2CAB6]">Where visitors are browsing right now</p>
            <div className="mt-5 max-h-64 space-y-3 overflow-y-auto">
              {!current ? (
                <p className="py-8 text-center text-xs text-[#D2CAB6]">
                  {failure ? 'Waiting for a connection' : 'Loading active pages…'}
                </p>
              ) : current.activePages.length === 0 ? (
                <p className="py-8 text-center text-xs text-[#D2CAB6]">
                  No visitors online right now.
                </p>
              ) : (
                current.activePages.map((page) => (
                  <div
                    key={page.path}
                    className="flex items-center justify-between gap-3 rounded-xl border border-[#A77A1C]/30 bg-[#2B3E35] p-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-[#F9F4EA]">
                        {page.title || page.path}
                      </p>
                      <p className="mt-1 break-all font-mono text-[10px] text-[#D2CAB6]">
                        {page.path}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-lg bg-[#E5BE61] px-2.5 py-1 font-mono text-xs font-black text-[#162E28]">
                      {page.visitors}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <section className="overflow-hidden rounded-3xl border border-[#D2CAB6] bg-[#F3EDE0] shadow-sm">
          <div className="p-5 sm:p-6">
            <h2 className="font-serif text-lg font-bold text-[#162E28]">MOST VISITED PAGES</h2>
            <p className="mt-1 text-xs text-[#7B8379]">
              Pages ranked by views · {RANGE_LABELS[range]}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-xs">
              <thead className="bg-[#E9E1D2] text-[10px] font-mono uppercase tracking-wider text-[#7B8379]">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Page
                  </th>
                  <th scope="col" className="px-4 py-3 text-right">
                    Views
                  </th>
                  <th scope="col" className="px-4 py-3 text-right">
                    Visitors
                  </th>
                  <th scope="col" className="px-6 py-3 text-right">
                    Share of views
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D2CAB6]">
                {!current || current.pages.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-[#7B8379]">
                      {!current
                        ? 'Waiting for traffic data'
                        : 'No pages viewed in this period yet.'}
                    </td>
                  </tr>
                ) : (
                  current.pages.map((page) => (
                    <tr key={page.path} className="hover:bg-[#E9E1D2]/50">
                      <td className="px-6 py-4">
                        <a
                          href={page.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-semibold text-[#162E28] hover:text-[#A77A1C]"
                        >
                          {page.title || page.path}
                          <ExternalLink className="h-3 w-3 shrink-0" />
                        </a>
                        <p className="mt-1 break-all font-mono text-[10px] text-[#7B8379]">
                          {page.path}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-right font-mono font-bold text-[#162E28]">
                        {page.views.toLocaleString('en-IN')}
                      </td>
                      <td className="px-4 py-4 text-right font-mono text-[#162E28]">
                        {page.visitors.toLocaleString('en-IN')}
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-[#A77A1C]">
                        {((page.views / current.totals.pageViews) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-[#D2CAB6] bg-[#F3EDE0] shadow-sm">
          <div className="p-5 sm:p-6">
            <h2 className="font-serif text-lg font-bold text-[#162E28]">RECENT PAGE VIEWS</h2>
            <p className="mt-1 text-xs text-[#7B8379]">Latest 20 visits · Times in IST</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[580px] text-left text-xs">
              <thead className="bg-[#E9E1D2] text-[10px] font-mono uppercase tracking-wider text-[#7B8379]">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Page
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Device
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Source
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Viewed at
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D2CAB6]">
                {!current || current.recent.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-[#7B8379]">
                      {!current
                        ? 'Waiting for activity data'
                        : 'New page views will appear here automatically.'}
                    </td>
                  </tr>
                ) : (
                  current.recent.map((visit, index) => {
                    const DeviceIcon =
                      visit.device === 'mobile'
                        ? Smartphone
                        : visit.device === 'tablet'
                          ? Tablet
                          : Monitor;
                    return (
                      <tr key={`${visit.startedAt}-${visit.path}-${index}`}>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-[#162E28]">
                            {visit.title || visit.path}
                          </p>
                          <p className="mt-1 break-all font-mono text-[10px] text-[#7B8379]">
                            {visit.path}
                          </p>
                        </td>
                        <td className="px-4 py-4">
                          <span className="flex items-center gap-1.5 capitalize text-[#7B8379]">
                            <DeviceIcon className="h-3.5 w-3.5" />
                            {visit.device}
                          </span>
                        </td>
                        <td className="max-w-44 break-all px-4 py-4 text-[#7B8379]">
                          {visit.referrer || 'Direct'}
                        </td>
                        <td className="px-4 py-4 font-mono text-[#7B8379]">
                          {formatTime(visit.startedAt)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-[10px] font-mono font-bold ${visit.active ? 'bg-emerald-900/10 text-emerald-800' : 'bg-[#E9E1D2] text-[#7B8379]'}`}
                          >
                            {visit.active ? 'ONLINE' : 'VISITED'}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
        <p className="text-[11px] text-[#7B8379]">
          Tracking starts with this release. Admin pages are excluded. Anonymous visitor counts
          identify browsers, so a person using multiple browsers may count more than once.
        </p>
      </div>
    </AdminLayout>
  );
}
