import type { AnalyticsDevice, AnalyticsRange, WebsiteAnalyticsOverview } from '../types/analytics';

const VISITOR_KEY = 'pragyan_analytics_visitor_id';
let memoryVisitorId: string | undefined;

export function analyticsOptedOut(): boolean {
  const browser = navigator as Navigator & { globalPrivacyControl?: boolean };
  if (browser.doNotTrack === '1' || browser.globalPrivacyControl) return true;
  try {
    return localStorage.getItem('pragyan_analytics_opt_out') === 'true';
  } catch {
    return false;
  }
}

export function getAnalyticsVisitorId(): string {
  try {
    const saved = localStorage.getItem(VISITOR_KEY);
    if (saved && /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i.test(saved))
      return saved;
    const visitorId = memoryVisitorId || crypto.randomUUID();
    memoryVisitorId = visitorId;
    localStorage.setItem(VISITOR_KEY, visitorId);
    return visitorId;
  } catch {
    memoryVisitorId ||= crypto.randomUUID();
    return memoryVisitorId;
  }
}

export function getAnalyticsDevice(): AnalyticsDevice {
  if (/ipad|tablet/i.test(navigator.userAgent)) return 'tablet';
  if (/mobi|android|iphone/i.test(navigator.userAgent)) return 'mobile';
  return 'desktop';
}

export function getAnalyticsPageTitle(path: string): string {
  const names: Record<string, string> = {
    '/': 'Homepage',
    '/problem-statements': 'Problem statements',
    '/problems': 'Problem statements',
    '/login': 'Participant login',
    '/signup': 'Participant signup',
    '/profile': 'Participant profile',
    '/register': 'Registration',
    '/dashboard': 'Participant dashboard'
  };
  if (names[path]) return names[path];
  if (/^\/(problem-statements|tracks)\//.test(path)) return 'Track problem statements';
  return 'PRAGYAN 2K26';
}

export interface AnalyticsVisit {
  viewId: string;
  visitorId: string;
  path: string;
  title: string;
  referrer: string;
  device: AnalyticsDevice;
  sequence: number;
}

export function sendAnalyticsEvent(
  visit: AnalyticsVisit,
  event: 'page_view' | 'page_heartbeat' | 'page_leave'
) {
  if (analyticsOptedOut()) return;
  const payload = JSON.stringify({ ...visit, sequence: ++visit.sequence, event });
  if (event === 'page_leave' && typeof navigator.sendBeacon === 'function') {
    try {
      if (
        navigator.sendBeacon(
          '/api/analytics/collect',
          new Blob([payload], { type: 'application/json' })
        )
      )
        return;
    } catch {
      /* Fall back to a keepalive request. */
    }
  }
  void fetch('/api/analytics/collect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    keepalive: true
  }).catch(() => {
    /* Analytics must never interrupt the website. */
  });
}

export async function fetchWebsiteAnalytics(
  range: AnalyticsRange,
  signal?: AbortSignal
): Promise<WebsiteAnalyticsOverview> {
  const token =
    localStorage.getItem('pragyan_admin_token') ||
    localStorage.getItem('pragyan_participant_token');
  const response = await fetch(`/api/analytics/overview?range=${range}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    signal,
    cache: 'no-store'
  });
  if (!response.ok) {
    if (response.status === 401 || response.status === 403)
      throw new Error('Your admin session has expired. Please sign in again.');
    throw new Error(
      'Analytics could not connect. Check that the backend and database are available.'
    );
  }
  return response.json();
}
