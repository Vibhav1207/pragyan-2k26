# Website analytics

The admin page is `/admin/analytics`, available from **Website Analytics** in the sidebar. It refreshes every five seconds while visible and supports the last 24 hours, seven days, and 30 days. Tracking begins when this version is deployed; historical traffic cannot be reconstructed.

## Measurement strategy

The initial measurement-readiness assessment was **25/100 (not instrumented)**: decision alignment 25/25, event model 0/20, integrity 0/20, conversions 0/15, attribution 0/10, governance 0/10. The requested remediation is to instrument navigation, verify counts, then display the dashboard. No existing visitor analytics were present. The decision is to identify which pages attract traffic and where visitors are active during the hackathon.

| Event            | Meaning and properties                                                                          | Trigger                                               | Decision supported                    |
| ---------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------- |
| `page_view`      | One `viewId`, anonymous `visitorId`, path, fixed page title, device category, referrer hostname | Initial load or a change to the route pathname        | See which pages visitors use          |
| `page_heartbeat` | Same visit with an increasing sequence                                                          | Every 20 seconds in a visible tab; returning to a tab | See current visitors and active pages |
| `page_leave`     | Same visit, marked inactive                                                                     | Tab becomes hidden, page unload, or route cleanup     | Remove visitors from the online count |

Page views are counted once per `viewId`. Heartbeats and retries update that record without adding views. Increasing sequences prevent delayed or reordered requests from reviving a departed visit. React Strict Mode reuses the view ID during its setup/cleanup replay. Query strings, hashes, and admin routes are not recorded. Unique visitors count anonymous browser IDs; active visitors count distinct IDs with activity in the last 60 seconds and no later leave event. Multiple tabs on different pages can appear on multiple active-page rows while counting once in the site-wide online total.

| Conversion | Event                                           | Counting       | Used by          |
| ---------- | ----------------------------------------------- | -------------- | ---------------- |
| None       | Page views are traffic metrics, not conversions | Not applicable | Hackathon admins |

## Implementation and operations

- Data stays in the existing MongoDB backend in the `analyticspageviews` collection, with a unique view ID and indexes for reporting, activity, and expiry. A TTL index removes records after 90 days. The reporting endpoint uses the existing admin authentication middleware and sends `Cache-Control: no-store`.
- No names, emails, account identifiers, IP addresses, complete user agents, full referrer URLs, or URL parameters are stored. Do Not Track, Global Privacy Control, and the `pragyan_analytics_opt_out` local-storage flag suppress collection. Visitor IDs are anonymous random UUIDs. Any required site-specific consent manager should set that flag before enabling collection.
- The collection endpoint has its own per-browser rate limit and is excluded from the general IP limit, so foreground heartbeats from visitors sharing a campus network do not consume the portal's general request budget.
- All chart buckets and dashboard times use India Standard Time. Missing buckets render as zero. API failures show a connection error, preserve a clearly marked last successful update, and retry automatically; no sample traffic is substituted.
- Repository maintainers own event definitions and regression tests; admins own interpretation. To fulfill a request to remove a browser's records, obtain its local `pragyan_analytics_visitor_id`, set `pragyan_analytics_opt_out` to `true`, and delete only `AnalyticsPageView` records matching that `visitorId` through the database administration tools.
- Limits: blocked scripts or opt-outs undercount traffic; different browsers count separately; online presence can take up to 60 seconds to expire after a lost connection. This release does not measure conversions, geographic location, or campaign UTMs.

## Validation

Run `npm run test:analytics` for isolated HTTP and MongoDB tests, `npm run build`, and `npm run lint`. The test database runs locally in memory and does not import the main server or invoke its application seeding logic. Browser checks should cover public navigation, reload, Strict Mode duplication, native page visibility, an empty report, backend errors and recovery, changing reporting periods, mobile layout, and privacy opt-outs. Cross-browser coverage should be extended whenever another supported browser is available.
