import assert from 'node:assert/strict';
import { after, before, beforeEach, describe, test } from 'node:test';
import { randomUUID } from 'node:crypto';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createAnalyticsRouter, ACTIVE_WINDOW_MS } from '../server/analytics.js';
import { AnalyticsPageView } from '../server/models.js';

describe('website analytics HTTP and MongoDB integration', () => {
  let mongo;
  let server;
  let baseUrl;
  let now;

  before(
    async () => {
      mongo = await MongoMemoryServer.create({ instance: { dbName: 'isolated_analytics_tests' } });
      await mongoose.connect(mongo.getUri());
      await AnalyticsPageView.init();
      const app = express();
      app.use(express.json());
      app.use(
        '/api/analytics',
        createAnalyticsRouter({
          authenticateAdmin: (req, res, next) =>
            req.headers.authorization === 'Bearer test-analytics-session'
              ? next()
              : res.sendStatus(401),
          ensureDbConnected: async () => {},
          clock: () => new Date(now)
        })
      );
      app.use((error, _req, res, _next) => res.status(500).json({ error: error.message }));
      server = app.listen(0, '127.0.0.1');
      await new Promise((resolve) => server.once('listening', resolve));
      baseUrl = `http://127.0.0.1:${server.address().port}/api/analytics`;
    },
    { timeout: 180000 }
  );

  beforeEach(async () => {
    now = Date.parse('2026-10-24T07:04:00.000Z');
    await AnalyticsPageView.deleteMany({});
  });

  after(async () => {
    if (server) await new Promise((resolve) => server.close(resolve));
    await mongoose.disconnect();
    if (mongo) await mongo.stop();
  });

  const event = (changes = {}) => ({
    viewId: randomUUID(),
    visitorId: randomUUID(),
    event: 'page_view',
    sequence: 1,
    path: '/',
    title: 'Homepage',
    device: 'desktop',
    referrer: '',
    ...changes
  });
  const collect = (payload) =>
    fetch(`${baseUrl}/collect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  const overview = async (range = '24h') => {
    const response = await fetch(`${baseUrl}/overview?range=${range}`, {
      headers: { Authorization: 'Bearer test-analytics-session' }
    });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    return response.json();
  };

  test('empty reports have zero totals, zero-filled IST buckets, and protected access', async () => {
    assert.equal((await fetch(`${baseUrl}/overview`)).status, 401);
    const report = await overview();
    assert.deepEqual(report.totals, {
      pageViews: 0,
      uniqueVisitors: 0,
      pagesVisited: 0,
      onlineVisitors: 0
    });
    assert.equal(report.timeline.length, 25);
    assert.equal(
      report.timeline.every((bucket) => bucket.views === 0),
      true
    );
    assert.equal(report.timeline[0].time.endsWith(':30:00.000Z'), true);
    assert.deepEqual(report.pages, []);
    assert.equal(
      (
        await fetch(`${baseUrl}/overview?range=all`, {
          headers: { Authorization: 'Bearer test-analytics-session' }
        })
      ).status,
      400
    );
  });

  test('heartbeats and retries count one page view while updating online presence', async () => {
    const visit = event();
    assert.equal((await collect(visit)).status, 204);
    now += 20000;
    await collect({ ...visit, event: 'page_heartbeat', sequence: 2 });
    await collect({ ...visit, event: 'page_heartbeat', sequence: 2 });
    const report = await overview();
    assert.deepEqual(report.totals, {
      pageViews: 1,
      uniqueVisitors: 1,
      pagesVisited: 1,
      onlineVisitors: 1
    });
    assert.equal(await AnalyticsPageView.countDocuments(), 1);
    assert.equal(
      report.timeline.reduce((sum, bucket) => sum + bucket.views, 0),
      1
    );
    assert.equal(report.recent[0].active, true);
    assert.equal(Object.hasOwn(report.recent[0], 'visitorId'), false);
    assert.equal(
      (await AnalyticsPageView.findOne()).startedAt.toISOString(),
      '2026-10-24T07:04:00.000Z'
    );
  });

  test('online visitors deduplicate browsers across tabs while page counts stay separate', async () => {
    const first = event();
    await collect(first);
    await collect(
      event({
        visitorId: first.visitorId,
        path: '/problem-statements',
        title: 'Problem statements'
      })
    );
    await collect(event());
    const report = await overview();
    assert.deepEqual(report.totals, {
      pageViews: 3,
      uniqueVisitors: 2,
      pagesVisited: 2,
      onlineVisitors: 2
    });
    assert.deepEqual(
      report.activePages.map((page) => [page.path, page.visitors]),
      [
        ['/', 2],
        ['/problem-statements', 1]
      ]
    );
    assert.deepEqual(
      report.pages.map((page) => [page.path, page.views]),
      [
        ['/', 2],
        ['/problem-statements', 1]
      ]
    );
  });

  test('out-of-order events and Strict Mode replay do not duplicate or revive departed visits', async () => {
    const visit = event();
    await collect({ ...visit, event: 'page_leave', sequence: 3 });
    await collect(visit);
    await collect({ ...visit, event: 'page_heartbeat', sequence: 2 });
    assert.equal((await overview()).totals.onlineVisitors, 0);
    assert.equal((await overview()).totals.pageViews, 1);
    await collect({ ...visit, event: 'page_view', sequence: 4 });
    await collect({ ...visit, event: 'page_leave', sequence: 2 });
    assert.equal((await overview()).totals.onlineVisitors, 1);
    assert.equal(await AnalyticsPageView.countDocuments(), 1);
  });

  test('simultaneous first requests preserve the highest sequence with one persistent record', async () => {
    const visit = event();
    const responses = await Promise.all(
      Array.from({ length: 10 }, (_, index) =>
        collect({
          ...visit,
          sequence: index + 1,
          event: index === 9 ? 'page_leave' : 'page_heartbeat'
        })
      )
    );
    assert.equal(
      responses.every((response) => response.status === 204),
      true
    );
    assert.equal(await AnalyticsPageView.countDocuments(), 1);
    assert.equal((await AnalyticsPageView.findOne()).sequence, 10);
    assert.equal((await overview()).totals.onlineVisitors, 0);
  });

  test('hidden visits leave immediately and disconnected visitors expire after 60 seconds', async () => {
    const visit = event();
    await collect(visit);
    now += ACTIVE_WINDOW_MS + 1;
    assert.equal((await overview()).totals.onlineVisitors, 0);
    await collect({ ...visit, event: 'page_heartbeat', sequence: 2 });
    assert.equal((await overview()).totals.onlineVisitors, 1);
    await collect({ ...visit, event: 'page_leave', sequence: 3 });
    assert.equal((await overview()).totals.onlineVisitors, 0);
    assert.equal((await overview()).totals.pageViews, 1);
  });

  test('report ranges exclude older traffic and record retention uses a TTL index', async () => {
    const present = now;
    now -= 10 * 86400000;
    await collect(event());
    now = present - 2 * 86400000;
    await collect(event());
    now = present;
    await collect(event());
    assert.equal((await overview('24h')).totals.pageViews, 1);
    assert.equal((await overview('7d')).totals.pageViews, 2);
    const month = await overview('30d');
    assert.equal(month.totals.pageViews, 3);
    assert.equal(
      month.timeline.reduce((sum, bucket) => sum + bucket.views, 0),
      3
    );
    const indexes = await AnalyticsPageView.collection.indexes();
    assert.equal(
      indexes.some((index) => index.key.expiresAt === 1 && index.expireAfterSeconds === 0),
      true
    );
    assert.equal(
      indexes.some((index) => index.key.viewId === 1 && index.unique),
      true
    );
  });

  test('collection rejects invalid events, excludes admin routes, strips URL parameters and unneeded fields', async () => {
    for (const changes of [
      { path: '/admin/analytics' },
      { path: '/api/settings' },
      { path: '/%61dmin/settings' },
      { path: '//another.example/' },
      { viewId: 'invalid' },
      { viewId: { toString: null } },
      { path: '/private\u0000' },
      { sequence: 0 },
      { device: 'unknown' },
      { event: 'purchase' }
    ]) {
      assert.equal((await collect(event(changes))).status, 400);
    }
    assert.equal(await AnalyticsPageView.countDocuments(), 0);
    const visit = event({
      path: '/problem-statements/?email=private@example.test#private',
      title: '$literal title',
      referrer: 'https://example.test/private?email=private',
      email: 'private@example.test',
      ip: '127.0.0.1'
    });
    assert.equal((await collect(visit)).status, 204);
    const stored = (await AnalyticsPageView.findOne()).toObject();
    assert.equal(stored.path, '/problem-statements');
    assert.equal(stored.title, '$literal title');
    assert.equal(stored.referrer, '');
    assert.equal(Object.hasOwn(stored, 'email'), false);
    assert.equal(Object.hasOwn(stored, 'ip'), false);
  });

  test('rate limits are per anonymous visitor rather than shared network IP', async () => {
    const visit = event();
    for (let sequence = 1; sequence <= 60; sequence++)
      assert.equal((await collect({ ...visit, sequence })).status, 204);
    assert.equal((await collect({ ...visit, sequence: 61 })).status, 429);
    assert.equal((await collect(event())).status, 204);
    now += 60001;
    assert.equal((await collect({ ...visit, sequence: 62 })).status, 204);
  });
});
