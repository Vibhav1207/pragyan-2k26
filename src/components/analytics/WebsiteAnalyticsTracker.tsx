import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  analyticsOptedOut,
  getAnalyticsDevice,
  getAnalyticsPageTitle,
  getAnalyticsVisitorId,
  sendAnalyticsEvent
} from '../../services/analytics';
import type { AnalyticsVisit } from '../../services/analytics';

export function WebsiteAnalyticsTracker() {
  const { pathname } = useLocation();
  const currentVisit = useRef<AnalyticsVisit | null>(null);

  useEffect(() => {
    if (/^\/(admin|api)(\/|$)/i.test(pathname) || analyticsOptedOut()) {
      currentVisit.current = null;
      return;
    }
    let visit = currentVisit.current;
    if (!visit || visit.path !== pathname) {
      let referrer = '';
      try {
        referrer = document.referrer ? new URL(document.referrer).hostname : '';
      } catch {
        /* Direct visit. */
      }
      visit = {
        viewId: crypto.randomUUID(),
        visitorId: getAnalyticsVisitorId(),
        path: pathname,
        title: getAnalyticsPageTitle(pathname),
        referrer,
        device: getAnalyticsDevice(),
        sequence: 0
      };
      currentVisit.current = visit;
    }
    const trackedVisit = visit;
    const send = (event: 'page_view' | 'page_heartbeat' | 'page_leave') => {
      if (!analyticsOptedOut()) sendAnalyticsEvent(trackedVisit, event);
    };
    send(document.visibilityState === 'hidden' ? 'page_leave' : 'page_view');
    const heartbeat = window.setInterval(() => {
      if (document.visibilityState === 'visible') send('page_heartbeat');
    }, 20000);
    const visibilityChanged = () =>
      send(document.visibilityState === 'visible' ? 'page_heartbeat' : 'page_leave');
    const pageHidden = () => send('page_leave');
    const pageShown = (event: PageTransitionEvent) => {
      if (event.persisted) visibilityChanged();
    };
    document.addEventListener('visibilitychange', visibilityChanged);
    window.addEventListener('pagehide', pageHidden);
    window.addEventListener('pageshow', pageShown);
    return () => {
      window.clearInterval(heartbeat);
      document.removeEventListener('visibilitychange', visibilityChanged);
      window.removeEventListener('pagehide', pageHidden);
      window.removeEventListener('pageshow', pageShown);
      send('page_leave');
    };
  }, [pathname]);

  return null;
}
