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

app.use(cors());
app.use(express.json());

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
        allowedFileTypes: ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'mp4'],
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

// Authentication Middleware
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'ADMIN') return res.status(403).json({ error: 'Forbidden' });
    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// --- REST API ENDPOINTS ---

// Health & Status
app.get('/api/health', async (req, res) => {
  await ensureDbConnected();
  res.json({ status: 'ok', dbConnected: mongoose.connection.readyState === 1, timestamp: new Date().toISOString() });
});

// Admin Login
app.post('/api/auth/admin/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (email && email.toLowerCase() === 'admin@sanjivani.edu.in' && password === 'admin123') {
    const token = jwt.sign({ email, name: 'PRAGYAN Super Admin', role: 'ADMIN' }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ token, admin: { email, name: 'PRAGYAN Super Admin', role: 'ADMIN' } });
  }
  return res.status(401).json({ error: 'Invalid admin credentials' });
});

// Participant Google Login - Stores Google user in MongoDB & retrieves team status
app.post('/api/auth/participant/google', async (req, res) => {
  try {
    await ensureDbConnected();
    const { email, name, avatar, googleId, uid } = req.body || {};
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    const gId = googleId || uid || `google-${Date.now()}`;
    const cleanEmail = String(email).toLowerCase();

    let user = await User.findOne({ email: cleanEmail });
    const adminAccount = await Admin.findOne({ email: cleanEmail });

    if (user) {
      user.name = name || user.name;
      user.avatar = avatar || user.avatar;
      if (gId && !user.googleId) user.googleId = gId;
      if (adminAccount) user.role = 'ADMIN';
    } else {
      user = new User({
        googleId: gId,
        email: cleanEmail,
        name: name || 'Participant User',
        avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
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
    const token = jwt.sign({ userId: userObj._id, email: cleanEmail, name, role: 'PARTICIPANT' }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: userObj });
  } catch (err) {
    console.error('❌ Error saving Google user to MongoDB:', err);
    return res.status(500).json({ error: err.message });
  }
});

// Update User Team Link in MongoDB
app.put('/api/users/team', async (req, res) => {
  try {
    await ensureDbConnected();
    const { email, teamId } = req.body || {};
    if (!email || !teamId) {
      return res.status(400).json({ error: 'Email and teamId are required.' });
    }
    const cleanEmail = String(email).toLowerCase();
    const user = await User.findOneAndUpdate(
      { email: cleanEmail },
      { 
        $set: { teamId },
        $setOnInsert: { name: 'Participant User', role: 'PARTICIPANT' }
      },
      { returnDocument: 'after', upsert: true }
    );
    res.json({ success: true, user });
  } catch (err) {
    console.error('Error in PUT /api/users/team:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET all registered users from MongoDB
app.get('/api/users', async (req, res) => {
  try {
    await ensureDbConnected();
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
app.get('/api/teams', async (req, res) => {
  try {
    await ensureDbConnected();
    const teams = await Team.find().sort({ registrationDate: -1 });
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/teams/code/:code', async (req, res) => {
  try {
    await ensureDbConnected();
    const team = await Team.findOne({ teamCode: req.params.code.toUpperCase() });
    if (!team) return res.status(404).json({ error: 'Team not found with code: ' + req.params.code });
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/teams', async (req, res) => {
  try {
    await ensureDbConnected();
    const { teamName, trackId, trackTitle, college, leader, members } = req.body || {};

    if (!teamName || !trackId || !college || !leader || !leader.email || !leader.fullName) {
      return res.status(400).json({ error: 'Team Name, Track, College, Leader Name and Email are required.' });
    }

    const leaderEmail = String(leader.email).toLowerCase();

    // Sanitize member entries
    const validMembers = Array.isArray(members)
      ? members.filter(m => m && m.fullName && m.email).map(m => ({
          fullName: m.fullName,
          email: String(m.email).toLowerCase(),
          phone: m.phone || leader.phone || '',
          college: m.college || college || '',
          course: m.course || leader.course || 'B.Tech / B.E.',
          year: m.year || leader.year || '2nd Year',
          isLeader: Boolean(m.isLeader)
        }))
      : [{
          fullName: leader.fullName,
          email: leaderEmail,
          phone: leader.phone || '',
          college: college,
          course: leader.course || 'B.Tech / B.E.',
          year: leader.year || '2nd Year',
          isLeader: true
        }];

    if (!validMembers.some(m => m.email.toLowerCase() === leaderEmail)) {
      validMembers.unshift({
        fullName: leader.fullName,
        email: leaderEmail,
        phone: leader.phone || '',
        college: college,
        course: leader.course || 'B.Tech / B.E.',
        year: leader.year || '2nd Year',
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
      teamName,
      trackId,
      trackTitle: trackTitle || 'FINTECH & FINANCIAL INNOVATION',
      college,
      leader: {
        fullName: leader.fullName,
        email: leaderEmail,
        phone: leader.phone || '',
        college: college,
        course: leader.course || 'B.Tech / B.E.',
        year: leader.year || '2nd Year',
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
        $setOnInsert: { name: leader.fullName || 'Participant User', role: 'PARTICIPANT' }
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
    console.error('❌ Error creating team in MongoDB:', err);
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/teams/join', async (req, res) => {
  try {
    await ensureDbConnected();
    const { teamCode, member } = req.body || {};
    if (!teamCode || !member || !member.email) {
      return res.status(400).json({ error: 'Team Code and Member details are required.' });
    }

    const team = await Team.findOne({ teamCode: String(teamCode).toUpperCase() });
    if (!team) {
      return res.status(404).json({ error: 'Invalid Team Code. No registered team found with code: ' + teamCode });
    }

    if (team.members && team.members.length >= 4) {
      return res.status(400).json({ error: 'This team is already full! Maximum 4 members allowed per team.' });
    }

    const memberEmail = String(member.email).toLowerCase();
    const emailExists = team.members.some(m => m.email.toLowerCase() === memberEmail);
    if (emailExists) {
      return res.status(400).json({ error: 'Member with email ' + member.email + ' is already registered in this team.' });
    }

    const sanitizedMember = {
      fullName: member.fullName || 'Team Member',
      email: memberEmail,
      phone: member.phone || '',
      college: member.college || team.college || '',
      course: member.course || 'B.Tech / B.E.',
      year: member.year || '2nd Year',
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
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/teams/:teamId/status', async (req, res) => {
  try {
    const { status, notes, paymentStatus } = req.body || {};
    const updates: any = { status, rejectionReason: notes, changeRequestNotes: notes };
    if (paymentStatus) {
      updates.paymentStatus = paymentStatus;
    } else if (status === 'APPROVED') {
      updates.paymentStatus = 'PAID';
    } else if (status === 'REJECTED') {
      updates.paymentStatus = 'REJECTED';
    }

    const team = await Team.findOneAndUpdate(
      { teamId: req.params.teamId },
      updates,
      { returnDocument: 'after' }
    );
    res.json(team);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/teams/:teamId/payment', async (req, res) => {
  try {
    await ensureDbConnected();
    const { utr, screenshot, amount } = req.body || {};
    const team = await Team.findOneAndUpdate(
      { teamId: req.params.teamId },
      {
        paymentStatus: 'UNDER_REVIEW',
        paymentUtr: utr,
        paymentScreenshot: screenshot,
        paymentAmount: amount || 500,
        paymentDate: new Date()
      },
      { returnDocument: 'after' }
    );
    console.log(`💳 Payment submitted for Team ${req.params.teamId}: UTR ${utr}`);
    res.json(team);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/teams/:teamId/submission', async (req, res) => {
  try {
    await ensureDbConnected();
    const team = await Team.findOneAndUpdate(
      { teamId: req.params.teamId },
      { submission: req.body },
      { returnDocument: 'after' }
    );
    res.json(team);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/teams/:teamId', async (req, res) => {
  try {
    await Team.findOneAndDelete({ teamId: req.params.teamId });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Tracks REST API
app.get('/api/tracks', async (req, res) => {
  try {
    const tracks = await Track.find().sort({ order: 1 });
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/tracks', async (req, res) => {
  try {
    const count = await Track.countDocuments();
    const trackId = `TRK-0${count + 1}`;
    const newTrack = await Track.create({ ...req.body, trackId });
    res.status(201).json(newTrack);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/tracks/:id', async (req, res) => {
  try {
    const updated = await Track.findOneAndUpdate({ trackId: req.params.id }, req.body, { returnDocument: 'after' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/tracks/:id', async (req, res) => {
  try {
    await Track.findOneAndDelete({ trackId: req.params.id });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Announcements REST API
app.get('/api/announcements', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/announcements', async (req, res) => {
  try {
    const newAnn = await Announcement.create(req.body);
    res.status(201).json(newAnn);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/announcements/:id', async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Homepage CMS API
app.get('/api/homepage', async (req, res) => {
  try {
    const cms = await HomepageCMSContent.findOne();
    res.json(cms || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/homepage', async (req, res) => {
  try {
    const updated = await HomepageCMSContent.findOneAndUpdate({}, req.body, { upsert: true, returnDocument: 'after' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// System Settings API
app.get('/api/settings', async (req, res) => {
  try {
    const settings = await SystemSettings.findOne();
    res.json(settings || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/settings', async (req, res) => {
  try {
    const updated = await SystemSettings.findOneAndUpdate({}, req.body, { upsert: true, returnDocument: 'after' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Activity Logs API
app.get('/api/activity', async (req, res) => {
  try {
    const logs = await ActivityLog.find().sort({ timestamp: -1 }).limit(100);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/activity', async (req, res) => {
  try {
    const log = await ActivityLog.create(req.body);
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 PRAGYAN 2K26 Express Server running on port ${PORT}`);
});

export default app;
