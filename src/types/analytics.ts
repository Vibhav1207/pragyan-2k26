export type AnalyticsRange = '24h' | '7d' | '30d';
export type AnalyticsDevice = 'desktop' | 'tablet' | 'mobile';

export interface WebsiteAnalyticsOverview {
  range: AnalyticsRange;
  generatedAt: string;
  timeZone: string;
  activeWindowSeconds: number;
  totals: {
    pageViews: number;
    uniqueVisitors: number;
    pagesVisited: number;
    onlineVisitors: number;
  };
  timeline: { time: string; views: number }[];
  pages: { path: string; title: string; views: number; visitors: number }[];
  activePages: { path: string; title: string; visitors: number }[];
  recent: {
    path: string;
    title: string;
    device: AnalyticsDevice;
    referrer: string;
    startedAt: string;
    lastSeenAt: string;
    active: boolean;
  }[];
}
