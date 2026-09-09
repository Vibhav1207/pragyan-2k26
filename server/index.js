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
  // Ignore if DNS server override is restricted
}

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'pragyan-2k26-admin-super-secret-key-2026';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pragyan2k26';

// 1. Security Headers Middleware
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

// 2. CORS Allowlist
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

// 3. In-Memory Rate Limiters
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

// Serverless DB Connection Helper for Vercel & Node
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

// Trigger initial connection
ensureDbConnected();

// Seed Initial System Data into MongoDB if collections are empty
async function seedDatabaseIfNeeded() {
  try {
    // 1. Admin Account Seed
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

    // 2. Tracks Seed
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

    // 3. System Settings Seed
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

    // 4. Homepage CMS Seed
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

// Authentication Middlewares
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

// Input Sanitization Helper
function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str.trim();
}

// --- REST API ENDPOINTS ---

// Health & Status
app.get('/api/health', async (req, res, next) => {
  try {
    await ensureDbConnected();
    res.json({ status: 'ok', dbConnected: mongoose.connection.readyState === 1, timestamp: new Date().toISOString() });
  } catch (err) {
    next(err);
  }
});

// Admin Login with bcrypt password hash check
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

// Participant Google Login - Stores Google user in MongoDB & retrieves team status
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

    // Check if user is linked to any team in MongoDB
    if (!user.teamId) {
      const existingTeam = await Team.findOne({
        $or: [
          { 'leader.email': cleanEmail },
          { 'members.email': cleanEmail }
        ]
      });
      if (existingTeam) {
        user.teamId = existingTeam.teamId;
        console.log(`🔗 Auto-linked existing team ${existingTeam.teamId} to user ${cleanEmail}`);
      }
    }

    await user.save();
    console.log(`✅ Saved/Updated Google user in MongoDB: ${user.email} (TeamId: ${user.teamId || 'None'})`);

    const userObj = user.toObject();
    const token = jwt.sign({ userId: userObj._id, email: cleanEmail, name: userObj.name, role: userObj.role }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: userObj });
  } catch (err) {
    next(err);
  }
});

// Update User Team Link in MongoDB
app.put('/api/users/team', authenticateParticipant, async (req, res, next) => {
  try {
    await ensureDbConnected();
    const { email, teamId } = req.body || {};
    if (!email || !teamId || typeof email !== 'string' || typeof teamId !== 'string') {
      return res.status(400).json({ error: 'Valid email and teamId are required.' });
    }
    const cleanEmail = sanitizeString(email).toLowerCase();
    const cleanTeamId = sanitizeString(teamId);

    const user = await User.findOneAndUpdate(
      { email: cleanEmail },
      { 
        $set: { teamId: cleanTeamId },
        $setOnInsert: { name: 'Participant User', role: 'PARTICIPANT' }
      },
      { returnDocument: 'after', upsert: true }
    );
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
});

// GET all registered users from MongoDB (Admin only)
app.get('/api/users', authenticateAdmin, async (req, res, next) => {
  try {
    await ensureDbConnected();
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// Helper function to generate unique 6-character team join code
function generateTeamCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'PRG-';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Teams REST API
app.get('/api/teams', async (req, res, next) => {
  try {
    await ensureDbConnected();
    const teams = await Team.find().sort({ registrationDate: -1 });
    res.json(teams);
  } catch (err) {
    next(err);
  }
});

app.get('/api/teams/code/:code', async (req, res, next) => {
  try {
    await ensureDbConnected();
    const codeStr = sanitizeString(req.params.code).toUpperCase();
    const team = await Team.findOne({ teamCode: codeStr });
    if (!team) return res.status(404).json({ error: 'Team not found with code: ' + codeStr });
    res.json(team);
  } catch (err) {
    next(err);
  }
});

app.post('/api/teams', submissionLimiter, async (req, res, next) => {
  try {
    await ensureDbConnected();
    const { teamName, trackId, trackTitle, college, leader, members } = req.body || {};

    if (!teamName || !trackId || !college || !leader || !leader.email || !leader.fullName) {
      return res.status(400).json({ error: 'Team Name, Track, College, Leader Name and Email are required.' });
    }

    const cleanTeamName = sanitizeString(teamName);
    const cleanTrackId = sanitizeString(trackId);
    const cleanCollege = sanitizeString(college);
    const leaderEmail = sanitizeString(leader.email).toLowerCase();
    const leaderName = sanitizeString(leader.fullName);

    // Sanitize member entries
    const validMembers = Array.isArray(members)
      ? members.filter(m => m && m.fullName && m.email).map(m => ({
          fullName: sanitizeString(m.fullName),
          email: sanitizeString(m.email).toLowerCase(),
          phone: sanitizeString(m.phone || leader.phone || ''),
          college: sanitizeString(m.college || college || ''),
          course: sanitizeString(m.course || leader.course || 'B.Tech / B.E.'),
          year: sanitizeString(m.year || leader.year || '2nd Year'),
          isLeader: Boolean(m.isLeader)
        }))
      : [{
          fullName: leaderName,
          email: leaderEmail,
          phone: sanitizeString(leader.phone || ''),
          college: cleanCollege,
          course: sanitizeString(leader.course || 'B.Tech / B.E.'),
          year: sanitizeString(leader.year || '2nd Year'),
          isLeader: true
        }];

    if (!validMembers.some(m => m.email.toLowerCase() === leaderEmail)) {
      validMembers.unshift({
        fullName: leaderName,
        email: leaderEmail,
        phone: sanitizeString(leader.phone || ''),
        college: cleanCollege,
        course: sanitizeString(leader.course || 'B.Tech / B.E.'),
        year: sanitizeString(leader.year || '2nd Year'),
        isLeader: true
      });
    }

    // Generate collision-safe teamId
    const count = await Team.countDocuments();
    let teamId = `PRAGYAN-TM-${count + 101}`;
    let existingTeam = await Team.findOne({ teamId });
    while (existingTeam) {
      teamId = `PRAGYAN-TM-${Date.now().toString().slice(-4)}${Math.floor(10 + Math.random() * 90)}`;
      existingTeam = await Team.findOne({ teamId });
    }

    // Generate collision-safe teamCode
    let teamCode = generateTeamCode();
    let existingCode = await Team.findOne({ teamCode });
    while (existingCode) {
      teamCode = generateTeamCode();
      existingCode = await Team.findOne({ teamCode });
    }

    const newTeam = await Team.create({
      teamId,
      teamCode,
      teamName: cleanTeamName,
      trackId: cleanTrackId,
      trackTitle: sanitizeString(trackTitle) || 'FINTECH & FINANCIAL INNOVATION',
      college: cleanCollege,
      leader: {
        fullName: leaderName,
        email: leaderEmail,
        phone: sanitizeString(leader.phone || ''),
        college: cleanCollege,
        course: sanitizeString(leader.course || 'B.Tech / B.E.'),
        year: sanitizeString(leader.year || '2nd Year'),
        isLeader: true
      },
      members: validMembers,
      registrationDate: new Date(),
      status: 'PENDING'
    });

    // Link teamId to user profile in MongoDB User collection
    await User.findOneAndUpdate(
      { email: leaderEmail },
      { 
        $set: { teamId },
        $setOnInsert: { name: leaderName || 'Participant User', role: 'PARTICIPANT' }
      },
      { returnDocument: 'after', upsert: true }
    );

    for (const m of validMembers) {
      if (m.email) {
        await User.findOneAndUpdate(
          { email: m.email.toLowerCase() },
          { 
            $set: { teamId },
            $setOnInsert: { name: m.fullName || 'Participant User', role: 'PARTICIPANT' }
          },
          { returnDocument: 'after', upsert: true }
        );
      }
    }

    console.log(`✅ Created Team ${teamId} in MongoDB for leader ${leaderEmail}`);
    res.status(201).json(newTeam);
  } catch (err) {
    next(err);
  }
});

app.post('/api/teams/join', submissionLimiter, async (req, res, next) => {
  try {
    await ensureDbConnected();
    const { teamCode, member } = req.body || {};
    if (!teamCode || !member || !member.email) {
      return res.status(400).json({ error: 'Team Code and Member details are required.' });
    }

    const cleanCode = sanitizeString(teamCode).toUpperCase();
    const team = await Team.findOne({ teamCode: cleanCode });
    if (!team) {
      return res.status(404).json({ error: 'Invalid Team Code. No registered team found with code: ' + cleanCode });
    }

    if (team.members && team.members.length >= 4) {
      return res.status(400).json({ error: 'This team is already full! Maximum 4 members allowed per team.' });
    }

    const memberEmail = sanitizeString(member.email).toLowerCase();
    const emailExists = team.members.some(m => m.email.toLowerCase() === memberEmail);
    if (emailExists) {
      return res.status(400).json({ error: 'Member with email ' + member.email + ' is already registered in this team.' });
    }

    const sanitizedMember = {
      fullName: sanitizeString(member.fullName) || 'Team Member',
      email: memberEmail,
      phone: sanitizeString(member.phone || ''),
      college: sanitizeString(member.college || team.college || ''),
      course: sanitizeString(member.course || 'B.Tech / B.E.'),
      year: sanitizeString(member.year || '2nd Year'),
      isLeader: false
    };

    team.members.push(sanitizedMember);
    await team.save();

    // Link joined member to teamId in User collection
    await User.findOneAndUpdate(
      { email: memberEmail },
      { 
        $set: { teamId: team.teamId },
        $setOnInsert: { name: sanitizedMember.fullName || 'Participant User', role: 'PARTICIPANT' }
      },
      { returnDocument: 'after', upsert: true }
    );

    console.log(`✅ Member ${memberEmail} joined Team ${team.teamId} in MongoDB`);
    res.json(team);
  } catch (err) {
    next(err);
  }
});

// Admin update team status
app.put('/api/teams/:teamId/status', authenticateAdmin, async (req, res, next) => {
  try {
    const { status, notes, paymentStatus } = req.body || {};
    const updates = {};

    if (status) updates.status = sanitizeString(status);
    if (notes) {
      updates.rejectionReason = sanitizeString(notes);
      updates.changeRequestNotes = sanitizeString(notes);
    }
    if (paymentStatus) {
      updates.paymentStatus = sanitizeString(paymentStatus);
    } else if (status === 'APPROVED') {
      updates.paymentStatus = 'PAID';
    } else if (status === 'REJECTED') {
      updates.paymentStatus = 'REJECTED';
    }

    const team = await Team.findOneAndUpdate(
      { teamId: sanitizeString(req.params.teamId) },
      updates,
      { returnDocument: 'after' }
    );
    res.json(team);
  } catch (err) {
    next(err);
  }
});

// Participant payment submission
app.put('/api/teams/:teamId/payment', authenticateParticipant, submissionLimiter, async (req, res, next) => {
  try {
    await ensureDbConnected();
    const cleanTeamId = sanitizeString(req.params.teamId);
    const { utr, screenshot, amount } = req.body || {};

    const team = await Team.findOne({ teamId: cleanTeamId });
    if (!team) return res.status(404).json({ error: 'Team not found' });

    // Ensure participant belongs to team
    const userEmail = req.user.email.toLowerCase();
    const isMember = team.leader.email.toLowerCase() === userEmail || team.members.some(m => m.email.toLowerCase() === userEmail);
    if (!isMember && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden: You are not a member of this team' });
    }

    team.paymentStatus = 'UNDER_REVIEW';
    team.paymentUtr = sanitizeString(utr);
    team.paymentScreenshot = typeof screenshot === 'string' ? screenshot : '';
    team.paymentAmount = Number(amount) || 500;
    team.paymentDate = new Date();

    await team.save();
    console.log(`💳 Payment submitted for Team ${cleanTeamId}: UTR ${utr}`);
    res.json(team);
  } catch (err) {
    next(err);
  }
});

// Participant project submission (Only Leader)
app.put('/api/teams/:teamId/submission', authenticateParticipant, submissionLimiter, async (req, res, next) => {
  try {
    await ensureDbConnected();
    const cleanTeamId = sanitizeString(req.params.teamId);
    const team = await Team.findOne({ teamId: cleanTeamId });
    if (!team) return res.status(404).json({ error: 'Team not found' });

    // Validate only team leader can submit
    const userEmail = req.user.email.toLowerCase();
    if (team.leader.email.toLowerCase() !== userEmail && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Only the Team Leader is authorized to submit team documents.' });
    }

    // Validate team has 4 members
    if (team.members.length < 4 && req.user.role !== 'ADMIN') {
      return res.status(400).json({ error: 'Submission requires a full 4-member team.' });
    }

    // Validate file extensions in submission payload if files present
    const submissionData = req.body || {};
    if (Array.isArray(submissionData.files)) {
      const allowedExts = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'mp4', 'png', 'jpg', 'jpeg'];
      for (const file of submissionData.files) {
        if (file.fileName) {
          const ext = file.fileName.split('.').pop().toLowerCase();
          if (!allowedExts.includes(ext)) {
            return res.status(400).json({ error: `File type .${ext} is not allowed.` });
          }
        }
      }
    }

    team.submission = submissionData;
    await team.save();
    res.json(team);
  } catch (err) {
    next(err);
  }
});

// Delete team (Admin only)
app.delete('/api/teams/:teamId', authenticateAdmin, async (req, res, next) => {
  try {
    await ensureDbConnected();
    await Team.findOneAndDelete({ teamId: sanitizeString(req.params.teamId) });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

// Tracks REST API
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

// Announcements REST API
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

// Homepage CMS API
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

// System Settings API
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

// Activity Logs API
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

// Production Error Handler Middleware
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
