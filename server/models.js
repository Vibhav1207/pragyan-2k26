import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar: { type: String },
  role: { type: String, enum: ['PARTICIPANT', 'ADMIN'], default: 'PARTICIPANT' },
  teamId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'ADMIN' },
  createdAt: { type: Date, default: Date.now }
});

const TeamMemberSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  college: { type: String, required: true },
  course: { type: String, required: true },
  year: { type: String, required: true },
  isLeader: { type: Boolean, default: false }
});

const SubmissionFileSchema = new mongoose.Schema({
  filename: String,
  fileType: String,
  fileSize: Number,
  uploadDate: { type: Date, default: Date.now },
  gridFsId: String
});

const SubmissionSchema = new mongoose.Schema({
  teamId: { type: String, required: true, unique: true },
  teamName: { type: String, required: true },
  projectTitle: { type: String, required: true },
  description: { type: String, required: true },
  trackId: { type: String, required: true },
  trackTitle: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['NOT_SUBMITTED', 'SUBMITTED', 'UNDER_REVIEW', 'REVIEWED', 'SHORTLISTED', 'DISQUALIFIED'], 
    default: 'SUBMITTED' 
  },
  githubUrl: String,
  demoUrl: String,
  files: [SubmissionFileSchema],
  adminNotes: String,
  score: Number,
  submittedAt: { type: Date, default: Date.now }
});

const TeamSchema = new mongoose.Schema({
  teamId: { type: String, required: true, unique: true },
  teamCode: { type: String, unique: true, sparse: true },
  teamName: { type: String, required: true },
  trackId: { type: String, required: true },
  trackTitle: { type: String, required: true },
  college: { type: String, required: true },
  leader: { type: TeamMemberSchema, required: true },
  members: [TeamMemberSchema], // Up to 4 members total
  registrationDate: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['PENDING', 'APPROVED', 'REJECTED', 'CHANGES_REQUESTED'], 
    default: 'PENDING' 
  },
  rejectionReason: String,
  changeRequestNotes: String,
  submission: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission' }
});

const TrackSchema = new mongoose.Schema({
  trackId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: String,
  iconName: String,
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
});

const AnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: String, enum: ['DRAFT', 'PUBLISHED', 'SCHEDULED'], default: 'PUBLISHED' },
  publishDate: { type: Date, default: Date.now },
  expiryDate: Date,
  createdAt: { type: Date, default: Date.now },
  author: { type: String, default: 'PRAGYAN Admin' }
});

const ActivityLogSchema = new mongoose.Schema({
  adminName: { type: String, required: true },
  adminEmail: { type: String, required: true },
  action: { type: String, required: true },
  entity: { type: String, required: true },
  details: { type: String },
  type: { type: String, enum: ['INFO', 'SUCCESS', 'WARNING', 'DANGER'], default: 'INFO' },
  timestamp: { type: Date, default: Date.now }
});

const SystemSettingsSchema = new mongoose.Schema({
  registrationOpen: { type: Boolean, default: true },
  registrationDeadline: { type: String, default: '2026-03-25T23:59:59Z' },
  maxTeamSize: { type: Number, default: 4 },
  registrationFee: { type: Number, default: 0 },
  submissionOpen: { type: Boolean, default: true },
  submissionDeadline: { type: String, default: '2026-04-10T18:00:00Z' },
  allowedFileTypes: { type: [String], default: ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'mp4'] },
  maxFileSizeMb: { type: Number, default: 50 },
  maintenanceMode: { type: Boolean, default: false },
  homepageVisibility: { type: Boolean, default: true },
  announcementVisibility: { type: Boolean, default: true }
});

const HomepageCMSContentSchema = new mongoose.Schema({
  hero: Object,
  eventDetails: Object,
  about: Object,
  prizes: Object,
  contact: Object,
  updatedAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', UserSchema);
export const Admin = mongoose.model('Admin', AdminSchema);
export const Team = mongoose.model('Team', TeamSchema);
export const Submission = mongoose.model('Submission', SubmissionSchema);
export const Track = mongoose.model('Track', TrackSchema);
export const Announcement = mongoose.model('Announcement', AnnouncementSchema);
export const ActivityLog = mongoose.model('ActivityLog', ActivityLogSchema);
export const SystemSettings = mongoose.model('SystemSettings', SystemSettingsSchema);
export const HomepageCMSContent = mongoose.model('HomepageCMSContent', HomepageCMSContentSchema);
