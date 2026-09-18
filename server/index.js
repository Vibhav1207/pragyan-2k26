import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import dns from 'dns';
import { 
  User, 
  Admin, 
  Team, 
  Submission, 
  Track, 
  Announcement, 
  ActivityLog, 
  SystemSettings, 
  HomepageCMSContent 
} from './models.js';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {

}

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'pragyan-2k26-admin-super-secret-key-2026';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pragyan2k26';

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  next();
});

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim())
  : ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

function createRateLimiter(windowMs, maxRequests, message) {
  const requests = new Map();
  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const windowStart = now - windowMs;

    let userRequests = requests.get(ip) || [];
    userRequests = userRequests.filter(timestamp => timestamp > windowStart);

    if (userRequests.length >= maxRequests) {
      return res.status(429).json({ error: message });
    }

    userRequests.push(now);
    requests.set(ip, userRequests);
    next();
  };
}

const authLimiter = createRateLimiter(15 * 60 * 1000, 10, 'Too many login attempts. Please try again later.');
const apiLimiter = createRateLimiter(15 * 60 * 1000, 300, 'Rate limit exceeded. Please slow down.');
const submissionLimiter = createRateLimiter(15 * 60 * 1000, 15, 'Too many submission requests. Please try again later.');

app.use('/api/', apiLimiter);

let dbConnected = false;
let dbPromise = null;

async function ensureDbConnected() {
  if (mongoose.connection.readyState === 1) return;
  if (!dbPromise) {
    dbPromise = mongoose.connect(MONGODB_URI)
      .then(async () => {
        dbConnected = true;
        console.log('✅ Connected to MongoDB Database:', MONGODB_URI);
        await seedDatabaseIfNeeded();
      })
      .catch(err => {
        dbPromise = null;
        console.warn('⚠️ MongoDB connection error:', err.message);
      });
  }
  await dbPromise;
}

ensureDbConnected();

async function seedDatabaseIfNeeded() {
  try {

    try {
      const deletedTeams = await Team.deleteMany({});
      await User.updateMany({}, { $unset: { teamId: "" } });
      if (deletedTeams.deletedCount > 0) {
        console.log(`🧹 Cleaned up teams from database: removed ${deletedTeams.deletedCount} teams and unlinked users.`);
      }
    } catch (teamPurgeErr) {
      console.warn('Note cleaning up teams from DB:', teamPurgeErr.message);
    }

    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const hash = await bcrypt.hash('admin123', 10);
      await Admin.create({
        email: 'admin@sanjivani.edu.in',
        passwordHash: hash,
        name: 'PRAGYAN Super Admin',
        role: 'ADMIN'
      });
      console.log('🌱 Seeded default Admin user in MongoDB (admin@sanjivani.edu.in / admin123)');
    }

    const tracksCount = await Track.countDocuments();
    if (tracksCount === 0) {
      await Track.insertMany([
        {
          trackId: 'TRK-01',
          title: 'FINTECH & FINANCIAL INNOVATION',
          description: 'Algorithmic trading, micro-finance models, blockchain ledger security, AI credit scoring & decentralized risk management.',
          category: 'Finance',
          iconName: 'Building2',
          isActive: true,
          order: 1
        },
        {
          trackId: 'TRK-02',
          title: 'MARKETING & CONSUMER INTELLIGENCE',
          description: 'Hyper-personalized customer journeys, predictive analytics, neuro-marketing, conversion optimization & brand strategy.',
          category: 'Marketing',
          iconName: 'Target',
          isActive: true,
          order: 2
        },
        {
          trackId: 'TRK-03',
          title: 'SMART OPERATIONS & SUSTAINABLE SUPPLY CHAIN',
          description: 'Logistics tracking, carbon footprint reduction, automated inventory, circular economy & eco-friendly distribution networks.',
          category: 'Operations',
          iconName: 'Truck',
          isActive: true,
          order: 3
        },
        {
          trackId: 'TRK-04',
          title: 'ENTREPRENEURSHIP & FUTURE OF MANAGEMENT',
          description: 'Venture scaling blueprints, remote workforce orchestration, agile corporate governance & disruptive business models.',
          category: 'Management',
          iconName: 'Rocket',
          isActive: true,
          order: 4
        }
      ]);
      console.log('🌱 Seeded 4 default Tracks in MongoDB');
    }

    const settingsCount = await SystemSettings.countDocuments();
    if (settingsCount === 0) {
      await SystemSettings.create({
        registrationOpen: true,
        registrationDeadline: '2026-03-25T23:59:59Z',
        maxTeamSize: 4,
        registrationFee: 0,
        submissionOpen: true,
        submissionDeadline: '2026-04-10T18:00:00Z',
        allowedFileTypes: ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'mp4', 'png', 'jpg', 'jpeg'],
        maxFileSizeMb: 50,
        maintenanceMode: false,
        homepageVisibility: true,
        announcementVisibility: true
      });
      console.log('🌱 Seeded default System Settings in MongoDB');
    }

    const cmsCount = await HomepageCMSContent.countDocuments();
    if (cmsCount === 0) {
      await HomepageCMSContent.create({
        hero: {
          eventTitle: 'PRAGYAN 2K26',
          mainHeading: 'NATIONAL LEVEL HACKATHON 2026',
          subHeading: 'INNOVATION & ENTREPRENEURSHIP FOR SUSTAINABLE DEVELOPMENT',
          datesText: 'APRIL 09 - 10, 2026',
          venueText: 'SANJIVANI UNIVERSITY, KOPARGAON, MAHARASHTRA',
          ctaPrimaryText: 'REGISTER NOW',
          ctaSecondaryText: 'EXPLORE TRACKS'
        },
        eventDetails: {
          teamSizeText: '4 Members per Team',
          feeText: 'Free Entry / Zero Fee',
          regDatesText: 'March 01 - March 25, 2026',
          subDatesText: 'April 05 - April 10, 2026',
          finalDatesText: 'April 09 - 10, 2026'
        },
        about: {
          title: 'ABOUT PRAGYAN 2K26',
          description: 'Organized by Sanjivani University in association with Institution\'s Innovation Council (IIC) and Entrepreneurship Development Cell (EDC), PRAGYAN 2K26 is India\'s premier commerce and management hackathon driving SDG Goal 2030.',
          fourPillars: {
            ideate: 'Formulate disruptive solutions for modern economic & operational challenges.',
            innovate: 'Build practical prototypes, financial models, and market intelligence systems.',
            collaborate: 'Partner with industry mentors, venture capitalists, and academic leaders.',
            createImpact: 'Scale high-potential ideas into viable startups with incubation support.'
          }
        },
        prizes: {
          totalPool: '₹1,00,000+',
          firstPrize: '₹50,000 + Winner Trophy & National Certificate',
          secondPrize: '₹30,000 + Runner-up Trophy & Certificate',
          thirdPrize: '₹20,000 + 2nd Runner-up Trophy & Certificate',
          specialCategory: 'Best Women-Led Startup Award & Innovation Excellence Badges',
          perks: [
            'Incubation support at Sanjivani EDC Center',
            'Direct interview access to partner VC accelerators',
            'Certificate of Excellence for all shortlisted finalists',
            'Complimentary Shirdi Temple tour pass for non-local finalists'
          ]
        },
        contact: {
          email: 'pragyan2k26@sanjivani.edu.in',
          phone: '+91 98234 56789 / +91 98765 43210',
          instagram: '@pragyan2k26_sanjivani',
          location: 'Sanjivani University Campus, Sahajanandnagar, Kopargaon, Dist. Ahilyanagar (Ahmednagar) - 423603, Maharashtra, India'
        }
      });
      console.log('🌱 Seeded default Homepage CMS in MongoDB');
    }

  } catch (err) {
    console.error('Error seeding database:', err);
  }
}

const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Admin token required' });
  }
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'ADMIN') return res.status(403).json({ error: 'Forbidden: Admin privileges required' });
    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired admin token' });
  }
};

const authenticateParticipant = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Login required' });
  }
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str.trim();
}

app.get('/api/health', async (req, res, next) => {
  try {
    await ensureDbConnected();
    res.json({ status: 'ok', dbConnected: mongoose.connection.readyState === 1, timestamp: new Date().toISOString() });
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/admin/login', authLimiter, async (req, res, next) => {
  try {
    await ensureDbConnected();
    const { email, password } = req.body || {};
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const cleanEmail = sanitizeString(email).toLowerCase();
    const admin = await Admin.findOne({ email: cleanEmail });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    const token = jwt.sign({ id: admin._id, email: admin.email, name: admin.name, role: 'ADMIN' }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ token, admin: { id: admin._id, email: admin.email, name: admin.name, role: 'ADMIN' } });
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/admin/google', authLimiter, async (req, res, next) => {
  try {
    await ensureDbConnected();
    const { email, name, avatar, googleId, uid } = req.body || {};
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Valid email is required.' });
    }
    const cleanEmail = sanitizeString(email).toLowerCase();
    const adminAccount = await Admin.findOne({ email: cleanEmail });
    const userAccount = await User.findOne({ email: cleanEmail });
    const isUserAdmin = userAccount && typeof userAccount.role === 'string' && userAccount.role.toUpperCase() === 'ADMIN';

    const envAdminList = (process.env.ALLOWED_ADMIN_EMAILS || 'admin@sanjivani.edu.in,vibhav07patel@gmail.com')
      .split(',')
      .map(e => e.trim().toLowerCase());

    const isAuthorized = Boolean(adminAccount || isUserAdmin || envAdminList.includes(cleanEmail));

    if (!isAuthorized) {
      return res.status(403).json({ 
        error: `Access Denied: Google account (${cleanEmail}) does not have administrative access.` 
      });
    }

    const adminName = sanitizeString(name) || (userAccount ? userAccount.name : (adminAccount ? adminAccount.name : 'PRAGYAN Administrator'));
    const adminId = adminAccount ? adminAccount._id : (userAccount ? userAccount._id : `ADM-${Date.now()}`);

    if (userAccount && userAccount.role !== 'ADMIN') {
      userAccount.role = 'ADMIN';
      await userAccount.save().catch(() => {});
    }

    if (!adminAccount) {
      await Admin.findOneAndUpdate(
        { email: cleanEmail },
        { $setOnInsert: { email: cleanEmail, name: adminName, role: 'ADMIN', passwordHash: 'oauth-google-managed' } },
        { upsert: true }
      ).catch(() => {});
    }

    const token = jwt.sign({ id: adminId, email: cleanEmail, name: adminName, role: 'ADMIN' }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({
      success: true,
      token,
      admin: { id: adminId, email: cleanEmail, name: adminName, role: 'ADMIN', avatar: avatar || (userAccount ? userAccount.avatar : undefined) }
    });
  } catch (err) {
    console.error('Error in /api/auth/admin/google:', err);
    return res.status(500).json({ error: err?.message || 'Server error during admin verification.' });
  }
});

app.post('/api/auth/participant/google', authLimiter, async (req, res, next) => {
  try {
    await ensureDbConnected();
    const { email, name, avatar, googleId, uid } = req.body || {};
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Valid email is required' });
    }
    const gId = sanitizeString(googleId || uid) || `google-${Date.now()}`;
    const cleanEmail = sanitizeString(email).toLowerCase();

    let user = await User.findOne({ email: cleanEmail });
    const adminAccount = await Admin.findOne({ email: cleanEmail });

    if (user) {
      if (name && typeof name === 'string') user.name = sanitizeString(name);
      if (avatar && typeof avatar === 'string') user.avatar = sanitizeString(avatar);
      if (gId && !user.googleId) user.googleId = gId;
      if (adminAccount) user.role = 'ADMIN';
    } else {
      user = new User({
        googleId: gId,
        email: cleanEmail,
        name: sanitizeString(name) || 'Participant User',
        avatar: sanitizeString(avatar) || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        role: adminAccount ? 'ADMIN' : 'PARTICIPANT'
      });
    }

    await user.save();
    console.log(`✅ Saved/Updated Google user in MongoDB: ${user.email}`);

    const userObj = user.toObject();
    const token = jwt.sign({ userId: userObj._id, email: cleanEmail, name: userObj.name, role: userObj.role }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: userObj });
  } catch (err) {
    next(err);
  }
});

app.get('/api/users', async (req, res, next) => {
  try {
    await ensureDbConnected();
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

app.put('/api/users/:id/group-code', async (req, res, next) => {
  try {
    await ensureDbConnected();
    const { groupCode } = req.body || {};
    const cleanGroupCode = groupCode && typeof groupCode === 'string' ? sanitizeString(groupCode).toUpperCase().trim() : '';
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { groupCode: cleanGroupCode } },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
});

app.delete('/api/users/:id', async (req, res, next) => {
  try {
    await ensureDbConnected();
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
});

app.all(['/api/admin/clear-teams', '/api/teams/purge'], async (req, res) => {
  try {
    await ensureDbConnected();
    const result = await Team.deleteMany({});
    await User.updateMany({}, { $unset: { teamId: "" } });
    console.log(`🧹 Explicitly purged ${result.deletedCount} teams from database.`);
    res.json({ 
      success: true, 
      message: `Successfully purged ${result.deletedCount} teams from MongoDB.`, 
      count: result.deletedCount 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/teams', async (req, res) => {
  res.json([]);
});

app.get('/api/tracks', async (req, res, next) => {
  try {
    await ensureDbConnected();
    const tracks = await Track.find().sort({ order: 1 });
    res.json(tracks);
  } catch (err) {
    next(err);
  }
});

app.post('/api/tracks', authenticateAdmin, async (req, res, next) => {
  try {
    await ensureDbConnected();
    const count = await Track.countDocuments();
    const trackId = `TRK-0${count + 1}`;
    const newTrack = await Track.create({ ...req.body, trackId });
    res.status(201).json(newTrack);
  } catch (err) {
    next(err);
  }
});

app.put('/api/tracks/:id', authenticateAdmin, async (req, res, next) => {
  try {
    await ensureDbConnected();
    const updated = await Track.findOneAndUpdate({ trackId: sanitizeString(req.params.id) }, req.body, { returnDocument: 'after' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/tracks/:id', authenticateAdmin, async (req, res, next) => {
  try {
    await ensureDbConnected();
    await Track.findOneAndDelete({ trackId: sanitizeString(req.params.id) });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

app.get('/api/announcements', async (req, res, next) => {
  try {
    await ensureDbConnected();
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    next(err);
  }
});

app.post('/api/announcements', authenticateAdmin, async (req, res, next) => {
  try {
    await ensureDbConnected();
    const newAnn = await Announcement.create(req.body);
    res.status(201).json(newAnn);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/announcements/:id', authenticateAdmin, async (req, res, next) => {
  try {
    await ensureDbConnected();
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

app.get('/api/homepage', async (req, res, next) => {
  try {
    await ensureDbConnected();
    const cms = await HomepageCMSContent.findOne();
    res.json(cms || {});
  } catch (err) {
    next(err);
  }
});

app.put('/api/homepage', authenticateAdmin, async (req, res, next) => {
  try {
    await ensureDbConnected();
    const updated = await HomepageCMSContent.findOneAndUpdate({}, req.body, { upsert: true, returnDocument: 'after' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

app.get('/api/settings', async (req, res, next) => {
  try {
    await ensureDbConnected();
    const settings = await SystemSettings.findOne();
    res.json(settings || {});
  } catch (err) {
    next(err);
  }
});

app.put('/api/settings', authenticateAdmin, async (req, res, next) => {
  try {
    await ensureDbConnected();
    const updated = await SystemSettings.findOneAndUpdate({}, req.body, { upsert: true, returnDocument: 'after' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

app.get('/api/activity', authenticateAdmin, async (req, res, next) => {
  try {
    await ensureDbConnected();
    const logs = await ActivityLog.find().sort({ timestamp: -1 }).limit(100);
    res.json(logs);
  } catch (err) {
    next(err);
  }
});

app.post('/api/activity', authenticateAdmin, async (req, res, next) => {
  try {
    await ensureDbConnected();
    const log = await ActivityLog.create(req.body);
    res.status(201).json(log);
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error('❌ Unhandled Server Error:', err);
  const isProd = process.env.NODE_ENV === 'production';
  res.status(err.status || 500).json({
    error: isProd ? 'Internal Server Error' : (err.message || 'Server Error')
  });
});

app.listen(PORT, () => {
  console.log(`🚀 PRAGYAN 2K26 Express Server running on port ${PORT}`);
});

export default app;
