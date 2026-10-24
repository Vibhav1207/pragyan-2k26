import { Router } from 'express';
import { AnalyticsPageView } from './models.js';

const UUID = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i;
const EVENTS = new Set(['page_view', 'page_heartbeat', 'page_leave']);
const RANGES = { '24h': 86400000, '7d': 7 * 86400000, '30d': 30 * 86400000 };
export const ACTIVE_WINDOW_MS = 60000;
const RETENTION_MS = 90 * 86400000;
const TIME_ZONE = 'Asia/Kolkata';
const isControlCharacter = (character) => character.charCodeAt(0) < 32;

export function normalizeAnalyticsPath(value) {
  if (
    typeof value !== 'string' ||
    value.length > 512 ||
    !value.startsWith('/') ||
    value.startsWith('//') ||
    value.includes('\\') ||
    Array.from(value).some(isControlCharacter)
  )
    return null;
  try {
    const path = new URL(value, 'https://analytics.invalid').pathname.replace(/\/+$/, '') || '/';
    const decoded = decodeURIComponent(path).toLowerCase();
    if (/^\/(admin|api)(\/|$)/.test(decoded)) return null;
    return path;
  } catch {
    return null;
  }
}

export function validateAnalyticsEvent(body) {
  if (
    !body ||
    typeof body.viewId !== 'string' ||
    typeof body.visitorId !== 'string' ||
    !UUID.test(body.viewId) ||
    !UUID.test(body.visitorId) ||
    !EVENTS.has(body.event)
  )
    return null;
  const path = normalizeAnalyticsPath(body.path);
  if (!path || !Number.isSafeInteger(body.sequence) || body.sequence < 1 || body.sequence > 1000000)
    return null;
  if (!['desktop', 'tablet', 'mobile'].includes(body.device)) return null;
  const title =
    typeof body.title === 'string'
      ? Array.from(body.title.slice(0, 1200))
          .filter((character) => !isControlCharacter(character))
          .join('')
          .slice(0, 120)
      : '';
  const referrer =
    typeof body.referrer === 'string' && /^[a-z\d.-]{1,200}$/i.test(body.referrer)
      ? body.referrer.toLowerCase()
      : '';
  return {
    viewId: body.viewId,
    visitorId: body.visitorId,
    event: body.event,
    sequence: body.sequence,
    path,
    title,
    referrer,
    device: body.device
  };
}

export function buildVisitUpdate(event, now) {
  const newer = { $gt: [event.sequence, { $ifNull: ['$sequence', 0] }] };
  const immutable = (value) => ({ $ifNull: [value[0], { $literal: value[1] }] });
  return [
    {
      $set: {
        viewId: { $literal: event.viewId },
        visitorId: immutable(['$visitorId', event.visitorId]),
        path: immutable(['$path', event.path]),
        title: immutable(['$title', event.title]),
        referrer: immutable(['$referrer', event.referrer]),
        device: immutable(['$device', event.device]),
        startedAt: { $ifNull: ['$startedAt', now] },
        expiresAt: { $ifNull: ['$expiresAt', new Date(now.getTime() + RETENTION_MS)] },
        sequence: { $cond: [newer, event.sequence, '$sequence'] },
        lastSeenAt: { $cond: [newer, now, '$lastSeenAt'] },
        endedAt: { $cond: [newer, event.event === 'page_leave' ? now : null, '$endedAt'] }
      }
    }
  ];
}

function fillTimeline(timeline, from, now, hourly) {
  const interval = hourly ? 3600000 : 86400000;
  const offset = 330 * 60000;
  const start = Math.floor((from.getTime() + offset) / interval) * interval - offset;
  const counts = new Map(timeline.map((bucket) => [new Date(bucket._id).getTime(), bucket.views]));
  const filled = [];
  for (let time = start; time <= now.getTime(); time += interval) {
    filled.push({ time: new Date(time).toISOString(), views: counts.get(time) || 0 });
  }
  return filled;
}

export async function getAnalyticsOverview(model, range, now = new Date()) {
  const from = new Date(now.getTime() - RANGES[range]);
  const activeSince = new Date(now.getTime() - ACTIVE_WINDOW_MS);
  const rangeMatch = { startedAt: { $gte: from, $lte: now } };
  const liveMatch = { lastSeenAt: { $gte: activeSince, $lte: now }, endedAt: null };
  const [result] = await model.aggregate([
    { $match: { $or: [rangeMatch, liveMatch] } },
    {
      $facet: {
        totals: [
          { $match: rangeMatch },
          {
            $group: {
              _id: null,
              pageViews: { $sum: 1 },
              visitors: { $addToSet: '$visitorId' },
              paths: { $addToSet: '$path' }
            }
          },
          {
            $project: {
              _id: 0,
              pageViews: 1,
              uniqueVisitors: { $size: '$visitors' },
              pagesVisited: { $size: '$paths' }
            }
          }
        ],
        online: [
          { $match: liveMatch },
          { $group: { _id: null, visitors: { $addToSet: '$visitorId' } } },
          { $project: { count: { $size: '$visitors' } } }
        ],
        pages: [
          { $match: rangeMatch },
          {
            $group: {
              _id: '$path',
              title: { $last: '$title' },
              views: { $sum: 1 },
              visitors: { $addToSet: '$visitorId' }
            }
          },
          {
            $project: { _id: 0, path: '$_id', title: 1, views: 1, visitors: { $size: '$visitors' } }
          },
          { $sort: { views: -1, path: 1 } },
          { $limit: 25 }
        ],
        activePages: [
          { $match: liveMatch },
          {
            $group: {
              _id: '$path',
              title: { $last: '$title' },
              visitors: { $addToSet: '$visitorId' }
            }
          },
          { $project: { _id: 0, path: '$_id', title: 1, visitors: { $size: '$visitors' } } },
          { $sort: { visitors: -1, path: 1 } },
          { $limit: 25 }
        ],
        timeline: [
          { $match: rangeMatch },
          {
            $group: {
              _id: {
                $dateTrunc: {
                  date: '$startedAt',
                  unit: range === '24h' ? 'hour' : 'day',
                  timezone: TIME_ZONE
                }
              },
              views: { $sum: 1 }
            }
          },
          { $sort: { _id: 1 } }
        ],
        recent: [
          { $match: rangeMatch },
          { $sort: { startedAt: -1 } },
          { $limit: 20 },
          {
            $project: {
              _id: 0,
              path: 1,
              title: 1,
              device: 1,
              referrer: 1,
              startedAt: 1,
              lastSeenAt: 1,
              active: {
                $and: [{ $gte: ['$lastSeenAt', activeSince] }, { $eq: ['$endedAt', null] }]
              }
            }
          }
        ]
      }
    }
  ]);
  return {
    range,
    generatedAt: now.toISOString(),
    timeZone: TIME_ZONE,
    activeWindowSeconds: ACTIVE_WINDOW_MS / 1000,
    totals: {
      pageViews: 0,
      uniqueVisitors: 0,
      pagesVisited: 0,
      ...result.totals[0],
      onlineVisitors: result.online[0]?.count || 0
    },
    pages: result.pages,
    activePages: result.activePages,
    recent: result.recent,
    timeline: fillTimeline(result.timeline, from, now, range === '24h')
  };
}

export function createAnalyticsRouter({
  authenticateAdmin,
  ensureDbConnected,
  model = AnalyticsPageView,
  clock = () => new Date()
}) {
  const router = Router();
  const requests = new Map();

  router.post('/collect', async (req, res, next) => {
    const event = validateAnalyticsEvent(req.body);
    if (!event) return res.status(400).json({ error: 'Invalid page activity event' });
    const now = clock();
    let limit = requests.get(event.visitorId);
    if (!limit || limit.until <= now.getTime()) {
      if (requests.size >= 10000) {
        for (const [key, value] of requests) if (value.until <= now.getTime()) requests.delete(key);
        if (requests.size >= 10000) requests.delete(requests.keys().next().value);
      }
      limit = { until: now.getTime() + 60000, count: 0 };
      requests.set(event.visitorId, limit);
    }
    if (++limit.count > 60)
      return res
        .status(429)
        .set('Retry-After', '60')
        .json({ error: 'Too many page activity events' });
    try {
      await ensureDbConnected();
      try {
        await model.updateOne({ viewId: event.viewId }, buildVisitUpdate(event, now), {
          upsert: true,
          updatePipeline: true
        });
      } catch (error) {
        if (error.code !== 11000) throw error;
        await model.updateOne({ viewId: event.viewId }, buildVisitUpdate(event, now), {
          updatePipeline: true
        });
      }
      return res.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  });

  router.get('/overview', authenticateAdmin, async (req, res, next) => {
    const range = req.query.range || '24h';
    if (typeof range !== 'string' || !Object.hasOwn(RANGES, range))
      return res.status(400).json({ error: 'Choose 24h, 7d, or 30d' });
    try {
      await ensureDbConnected();
      res.set('Cache-Control', 'no-store');
      return res.json(await getAnalyticsOverview(model, range, clock()));
    } catch (error) {
      return next(error);
    }
  });

  return router;
}
