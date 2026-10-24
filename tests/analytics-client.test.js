import assert from 'node:assert/strict';
import { afterEach, beforeEach, test } from 'node:test';
import { normalizeSdgContent } from '../src/utils/sdgContent.ts';
import {
  analyticsOptedOut,
  getAnalyticsVisitorId,
  sendAnalyticsEvent,
  fetchWebsiteAnalytics
} from '../src/services/analytics.ts';

const originalNavigator = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
const originalStorage = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
const originalFetch = globalThis.fetch;
let storage;
let requests;

beforeEach(() => {
  storage = new Map();
  requests = [];
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: { doNotTrack: '0', globalPrivacyControl: false }
  });
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key) => storage.get(key) || null,
      setItem: (key, value) => storage.set(key, value)
    }
  });
  globalThis.fetch = async (url, options) => {
    requests.push({ url, options });
    return { ok: true, json: async () => ({ range: '24h' }) };
  };
});

afterEach(() => {
  if (originalNavigator) Object.defineProperty(globalThis, 'navigator', originalNavigator);
  else delete globalThis.navigator;
  if (originalStorage) Object.defineProperty(globalThis, 'localStorage', originalStorage);
  else delete globalThis.localStorage;
  globalThis.fetch = originalFetch;
});

test('SDG wording normalizes cached content while preserving dates and individual goals', () => {
  const content = {
    hero: 'SDG GOAL 2927',
    announcement: 'Sustainable Development Goals 2027',
    date: '2027-01-01',
    goals: ['SDG Goal 6', 'SDG GOAL 2030'],
    count: 4
  };
  assert.deepEqual(normalizeSdgContent(content), {
    hero: 'SDG GOAL 2030',
    announcement: 'Sustainable Development Goals 2030',
    date: '2027-01-01',
    goals: ['SDG Goal 6', 'SDG GOAL 2030'],
    count: 4
  });
  assert.equal(content.hero, 'SDG GOAL 2927');
});

test('visitor identities survive navigation and gracefully handle blocked storage', () => {
  const visitor = getAnalyticsVisitorId();
  assert.match(visitor, /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i);
  assert.equal(getAnalyticsVisitorId(), visitor);
  globalThis.localStorage.getItem = () => {
    throw new Error('Storage blocked');
  };
  assert.equal(getAnalyticsVisitorId(), getAnalyticsVisitorId());
});

test('privacy opt-outs suppress network collection and sequence increments', () => {
  const visit = {
    viewId: crypto.randomUUID(),
    visitorId: crypto.randomUUID(),
    path: '/',
    title: 'Homepage',
    device: 'desktop',
    referrer: '',
    sequence: 0
  };
  navigator.doNotTrack = '1';
  assert.equal(analyticsOptedOut(), true);
  sendAnalyticsEvent(visit, 'page_view');
  navigator.doNotTrack = '0';
  navigator.globalPrivacyControl = true;
  sendAnalyticsEvent(visit, 'page_view');
  navigator.globalPrivacyControl = false;
  storage.set('pragyan_analytics_opt_out', 'true');
  sendAnalyticsEvent(visit, 'page_view');
  assert.equal(requests.length, 0);
  assert.equal(visit.sequence, 0);
});

test('page activity has monotonic sequences and falls back when unload beacons are unavailable', () => {
  const visit = {
    viewId: crypto.randomUUID(),
    visitorId: crypto.randomUUID(),
    path: '/',
    title: 'Homepage',
    device: 'desktop',
    referrer: '',
    sequence: 0
  };
  sendAnalyticsEvent(visit, 'page_view');
  navigator.sendBeacon = () => {
    throw new Error('Beacon unavailable');
  };
  sendAnalyticsEvent(visit, 'page_leave');
  assert.deepEqual(
    requests.map((request) => JSON.parse(request.options.body).sequence),
    [1, 2]
  );
  assert.equal(
    requests.every((request) => request.options.keepalive),
    true
  );
  assert.equal(requests[0].options.headers.Authorization, undefined);
});

test('admin reads use the existing session and failures never substitute sample traffic', async () => {
  storage.set('pragyan_admin_token', 'fixture-session');
  await fetchWebsiteAnalytics('7d');
  assert.equal(requests[0].url, '/api/analytics/overview?range=7d');
  assert.equal(requests[0].options.headers.Authorization, 'Bearer fixture-session');
  globalThis.fetch = async () => ({ ok: false, status: 503 });
  await assert.rejects(fetchWebsiteAnalytics('24h'), /backend and database/);
  globalThis.fetch = async () => ({ ok: false, status: 401 });
  await assert.rejects(fetchWebsiteAnalytics('24h'), /sign in again/);
});
