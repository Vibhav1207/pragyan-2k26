import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createServer } from 'vite';
import { createAnalyticsRouter } from './server/analytics.js';
import { AnalyticsPageView } from './server/models.js';

const mongo = await MongoMemoryServer.create({ instance: { dbName: 'isolated_browser_analytics' } });
await mongoose.connect(mongo.getUri());
await AnalyticsPageView.init();
const app = express();
app.use(express.json());
let unavailable = false;
app.post('/__preview/mode', (req, res) => { unavailable = req.body.unavailable === true; res.json({ unavailable }); });
app.get('/__preview/visits', async (_req, res) => res.json(await AnalyticsPageView.find().select('path viewId sequence endedAt').lean()));
app.use('/api/analytics', (req, res, next) => unavailable && req.path === '/overview' ? res.status(503).json({ error: 'Preview connection failure' }) : next());
app.use('/api/analytics', createAnalyticsRouter({
  authenticateAdmin: (req, res, next) => req.headers.authorization === 'Bearer local-analytics-preview' ? next() : res.sendStatus(401),
  ensureDbConnected: async () => {}
}));
app.get('/api/settings', (_req, res) => res.json({ registrationOpen: false, psGlobalVisible: true, psUnlockTime: '2030-10-24T06:30:00Z' }));
app.get('/api/problem-statements', (_req, res) => res.json([]));
app.get('/api/challenges', (_req, res) => res.json([]));
app.use((error, _req, res, _next) => res.status(500).json({ error: error.message }));
const backend = app.listen(5191, '127.0.0.1');
await new Promise(resolve => backend.once('listening', resolve));
const vite = await createServer({ server: { host: '127.0.0.1', port: 5190, strictPort: true, proxy: { '/api': { target: 'http://127.0.0.1:5191', changeOrigin: true } } } });
await vite.listen();
console.log('Isolated analytics preview ready at http://127.0.0.1:5190/.codex-analytics-preview.html');
const close = async () => { await vite.close(); await new Promise(resolve => backend.close(resolve)); await mongoose.disconnect(); await mongo.stop(); process.exit(0); };
process.on('SIGINT', close);
process.on('SIGTERM', close);
