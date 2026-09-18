import type { 
  Team, 
  Submission, 
  Track, 
  Announcement, 
  ActivityLog, 
  SystemSettings, 
  HomepageCMS,
  SubmissionFile,
  UserProfile,
  Role
} from '../types/admin';

const STORAGE_KEYS = {
  TEAMS: 'pragyan_teams_v2',
  SUBMISSIONS: 'pragyan_submissions_v2',
  TRACKS: 'pragyan_tracks_v2',
  ANNOUNCEMENTS: 'pragyan_announcements_v2',
  ACTIVITY_LOGS: 'pragyan_activity_v2',
  SETTINGS: 'pragyan_settings_v2',
  CMS: 'pragyan_cms_v2',
  ADMIN_AUTH: 'pragyan_admin_auth_v2',
  USERS: 'pragyan_registered_users_v2',
};

try {
  localStorage.removeItem('pragyan_teams_v2');
  localStorage.removeItem('pragyan_teams_v1');
  localStorage.removeItem('pragyan_teams');
} catch {

}

function getStored<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Storage write error:', err);
  }
}

function getAuthHeaders(extraHeaders: Record<string, string> = {}): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...extraHeaders
  };
  try {
    const adminToken = localStorage.getItem('pragyan_admin_token');
    const participantToken = localStorage.getItem('pragyan_participant_token');
    const token = adminToken || participantToken;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  } catch {

  }
  return headers;
}

const INITIAL_TRACKS: Track[] = [
  {
    id: 'TRK-01',
    title: 'FINTECH & FINANCIAL INNOVATION',
    description: 'Algorithmic trading, micro-finance models, blockchain ledger security, AI credit scoring & decentralized risk management.',
    category: 'Finance',
    iconName: 'Building2',
    isActive: true,
    order: 1,
    problemStatementsCount: 6
  },
  {
    id: 'TRK-02',
    title: 'MARKETING & CONSUMER INTELLIGENCE',
    description: 'Hyper-personalized customer journeys, predictive analytics, neuro-marketing, conversion optimization & brand strategy.',
    category: 'Marketing',
    iconName: 'Target',
    isActive: true,
    order: 2,
    problemStatementsCount: 5
  },
  {
    id: 'TRK-03',
    title: 'SMART OPERATIONS & SUSTAINABLE SUPPLY CHAIN',
    description: 'Logistics tracking, carbon footprint reduction, automated inventory, circular economy & eco-friendly distribution networks.',
    category: 'Operations',
    iconName: 'Truck',
    isActive: true,
    order: 3,
    problemStatementsCount: 8
  },
  {
    id: 'TRK-04',
    title: 'ENTREPRENEURSHIP & FUTURE OF MANAGEMENT',
    description: 'Venture scaling blueprints, remote workforce orchestration, agile corporate governance & disruptive business models.',
    category: 'Management',
    iconName: 'Rocket',
    isActive: true,
    order: 4,
    problemStatementsCount: 7
  }
];

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ANN-01',
    title: 'REGISTRATION OPEN',
    content: 'National Registration for PRAGYAN 2K26 is officially OPEN for all UG, PG & PhD student teams across India.',
    status: 'PUBLISHED',
    publishDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    author: 'Sanjivani Innovation Cell'
  },
  {
    id: 'ANN-02',
    title: 'OFFICIAL THEME',
    content: 'Innovation & Entrepreneurship on UN SDG Goal 2030 hosted at Sanjivani University, Kopargaon.',
    status: 'PUBLISHED',
    publishDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    author: 'PRAGYAN Committee'
  }
];

const INITIAL_SETTINGS: SystemSettings = {
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
};

const INITIAL_CMS: HomepageCMS = {
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
};

class PragyanAPIService {
  getTeams(): Team[] {
    return [];
  }

  getSubmissions(): Submission[] {
    return getStored<Submission[]>(STORAGE_KEYS.SUBMISSIONS, []);
  }

  updateSubmissionStatus(submissionId: string, status: Submission['status'], adminNotes?: string): boolean {
    const submissions = this.getSubmissions();
    const index = submissions.findIndex(s => s.id === submissionId);
    if (index === -1) return false;
    submissions[index].status = status;
    if (adminNotes) submissions[index].adminNotes = adminNotes;
    setStored(STORAGE_KEYS.SUBMISSIONS, submissions);
    this.logActivity('SUBMISSION_REVIEWED', submissionId, `Status set to ${status}`, 'INFO');
    return true;
  }

  getTracks(): Track[] {
    return getStored<Track[]>(STORAGE_KEYS.TRACKS, INITIAL_TRACKS);
  }

  createTrack(trackData: Omit<Track, 'id'>): Track {
    const tracks = this.getTracks();
    const newTrack: Track = {
      ...trackData,
      id: `TRK-0${tracks.length + 1}`
    };
    tracks.push(newTrack);
    setStored(STORAGE_KEYS.TRACKS, tracks);
    this.logActivity('TRACK_CREATED', newTrack.id, `Created track: ${newTrack.title}`, 'SUCCESS');
    return newTrack;
  }

  updateTrack(trackId: string, updates: Partial<Track>): Track | undefined {
    const tracks = this.getTracks();
    const index = tracks.findIndex(t => t.id === trackId);
    if (index === -1) return undefined;

    tracks[index] = { ...tracks[index], ...updates };
    setStored(STORAGE_KEYS.TRACKS, tracks);
    this.logActivity('TRACK_UPDATED', trackId, `Updated track: ${tracks[index].title}`, 'INFO');
    return tracks[index];
  }

  deleteTrack(trackId: string): boolean {
    let tracks = this.getTracks();
    tracks = tracks.filter(t => t.id !== trackId);
    setStored(STORAGE_KEYS.TRACKS, tracks);
    this.logActivity('TRACK_DELETED', trackId, `Deleted track ID ${trackId}`, 'DANGER');
    return true;
  }

  getAnnouncements(): Announcement[] {
    const list = getStored<Announcement[]>(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
    const valid = list.filter(a => a && a.title && !a.title.includes('ADFF') && a.title.trim().length > 0);
    return valid.length > 0 ? valid : INITIAL_ANNOUNCEMENTS;
  }

  createAnnouncement(annData: Omit<Announcement, 'id' | 'createdAt'>): Announcement {
    const list = this.getAnnouncements();
    const newAnn: Announcement = {
      ...annData,
      id: `ANN-0${list.length + 1}`,
      createdAt: new Date().toISOString()
    };
    list.unshift(newAnn);
    setStored(STORAGE_KEYS.ANNOUNCEMENTS, list);
    this.logActivity('ANNOUNCEMENT_CREATED', newAnn.id, `Published announcement: ${newAnn.title}`, 'SUCCESS');
    return newAnn;
  }

  deleteAnnouncement(id: string): boolean {
    let list = this.getAnnouncements();
    list = list.filter(a => a.id !== id);
    setStored(STORAGE_KEYS.ANNOUNCEMENTS, list);
    this.logActivity('ANNOUNCEMENT_DELETED', id, `Deleted announcement ID ${id}`, 'WARNING');
    return true;
  }

  getCMS(): HomepageCMS {
    return getStored<HomepageCMS>(STORAGE_KEYS.CMS, INITIAL_CMS);
  }

  updateCMS(cms: HomepageCMS): HomepageCMS {
    setStored(STORAGE_KEYS.CMS, cms);
    this.logActivity('HOMEPAGE_CMS_UPDATE', 'Public Website', 'Updated homepage CMS sections', 'INFO');
    return cms;
  }

  getSettings(): SystemSettings {
    return getStored<SystemSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  }

  updateSettings(settings: SystemSettings): SystemSettings {
    setStored(STORAGE_KEYS.SETTINGS, settings);
    this.logActivity('SETTINGS_UPDATED', 'System Settings', 'Updated system configurations', 'WARNING');
    return settings;
  }

  getActivityLogs(): ActivityLog[] {
    return getStored<ActivityLog[]>(STORAGE_KEYS.ACTIVITY_LOGS, []);
  }

  logActivity(action: string, entity: string, details: string, type: ActivityLog['type'] = 'INFO'): void {
    const logs = this.getActivityLogs();
    const authAdmin = getStored<{ email: string; name: string } | null>(STORAGE_KEYS.ADMIN_AUTH, null);
    const newLog: ActivityLog = {
      id: `LOG-${Date.now()}`,
      adminName: authAdmin ? authAdmin.name : 'PRAGYAN Admin',
      adminEmail: authAdmin ? authAdmin.email : 'admin@sanjivani.edu.in',
      action,
      entity,
      details,
      timestamp: new Date().toISOString(),
      type
    };
    logs.unshift(newLog);
    setStored(STORAGE_KEYS.ACTIVITY_LOGS, logs.slice(0, 100));
  }

  async fetchUsersAsync(): Promise<UserProfile[]> {
    try {
      let res = await fetch('/api/users');
      if (!res.ok) {
        res = await fetch('http://localhost:5000/api/users');
      }
      if (res.ok) {
        const users = await res.json();
        if (Array.isArray(users)) {
          const mapped: UserProfile[] = users.map(u => ({
            id: u._id || u.id || u.googleId || u.email,
            name: u.name || 'Participant Delegate',
            email: u.email,
            avatar: u.avatar,
            role: (u.role?.toUpperCase() === 'ADMIN' ? 'ADMIN' : 'PARTICIPANT') as Role,
            createdAt: u.createdAt || new Date().toISOString()
          }));
          setStored(STORAGE_KEYS.USERS, mapped);
          return mapped;
        }
      }
    } catch (err) {
      console.warn('Backend users fetch note:', err);
    }
    return this.getRegisteredUsers();
  }

  getRegisteredUsers(): UserProfile[] {
    const list = getStored<UserProfile[]>(STORAGE_KEYS.USERS, []);

    try {
      const current = localStorage.getItem('pragyan_participant_user');
      if (current) {
        const user = JSON.parse(current);
        if (user && user.email) {
          const exists = list.some(u => u.email.toLowerCase() === user.email.toLowerCase());
          if (!exists) {
            list.unshift({
              id: user.id || `usr-${Date.now()}`,
              name: user.name || 'Participant Delegate',
              email: user.email,
              avatar: user.avatar,
              role: user.role || 'PARTICIPANT',
              createdAt: new Date().toISOString()
            });
          }
        }
      }
    } catch {}
    return list;
  }

  async deleteUser(userId: string): Promise<boolean> {
    try {
      await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
    } catch {}

    const users = this.getRegisteredUsers().filter(u => u.id !== userId && u.email !== userId);
    setStored(STORAGE_KEYS.USERS, users);
    this.logActivity('USER_DELETED', userId, `Deleted user account from system`, 'DANGER');
    return true;
  }

  getParticipants() {
    const users = this.getRegisteredUsers();
    return users.map(u => ({
      id: u.id,
      fullName: u.name,
      email: u.email,
      phone: '',
      college: 'Sanjivani University',
      course: 'UG / PG Program',
      year: '2026',
      teamId: 'DELEGATE',
      teamName: 'Individual Delegate',
      trackTitle: 'NATIONAL INNOVATION TRACK',
      isLeader: u.role === 'ADMIN',
      status: 'REGISTERED',
      role: u.role,
      createdAt: u.createdAt
    }));
  }

  getFiles(): (SubmissionFile & { teamId: string; teamName: string; trackTitle: string })[] {
    const submissions = this.getSubmissions();
    const filesList: (SubmissionFile & { teamId: string; teamName: string; trackTitle: string })[] = [];

    submissions.forEach(s => {
      if (s.files) {
        s.files.forEach(f => {
          filesList.push({
            ...f,
            teamId: s.teamId || 'DELEGATE',
            teamName: s.teamName || 'Individual Delegate',
            trackTitle: s.trackTitle || 'National Track'
          });
        });
      }
    });

    return filesList;
  }

  deleteFile(fileId: string): boolean {
    const submissions = this.getSubmissions();
    let fileDeleted = false;

    submissions.forEach(s => {
      if (s.files) {
        const origLen = s.files.length;
        s.files = s.files.filter(f => f.id !== fileId);
        if (s.files.length < origLen) fileDeleted = true;
      }
    });

    if (fileDeleted) {
      setStored(STORAGE_KEYS.SUBMISSIONS, submissions);
      this.logActivity('FILE_DELETED', fileId, `Deleted file ID ${fileId} from GridFS`, 'DANGER');
    }
    return fileDeleted;
  }
}

export const apiService = new PragyanAPIService();
