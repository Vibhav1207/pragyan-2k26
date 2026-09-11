import type { 
  Team, 
  Submission, 
  Track, 
  Announcement, 
  ActivityLog, 
  SystemSettings, 
  HomepageCMS,
  SubmissionFile
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
};

// Storage Helpers
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
    // Ignore if localStorage is unavailable
  }
  return headers;
}

// Default initial tracks if none in storage
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
  async fetchTeamsAsync(): Promise<Team[]> {
    try {
      let res = await fetch('/api/teams');
      if (!res.ok) {
        res = await fetch('http://localhost:5000/api/teams');
      }
      if (res.ok) {
        const teams = await res.json();
        if (Array.isArray(teams)) {
          setStored(STORAGE_KEYS.TEAMS, teams);
          return teams;
        }
      }
    } catch (err) {
      console.warn('Backend teams fetch note:', err);
    }
    return this.getTeams();
  }

  getTeams(): Team[] {
    return getStored<Team[]>(STORAGE_KEYS.TEAMS, []);
  }

  getTeamById(teamId: string): Team | undefined {
    const teams = this.getTeams();
    return teams.find(t => t.teamId === teamId);
  }

  getTeamByCode(teamCode: string): Team | undefined {
    const teams = this.getTeams();
    return teams.find(t => (t.teamCode || '').toUpperCase() === teamCode.trim().toUpperCase());
  }

  async createTeam(teamData: Omit<Team, 'teamId' | 'registrationDate' | 'status'>): Promise<Team> {
    const teams = this.getTeams();
    const count = teams.length + 101;
    const teamId = `PRAGYAN-TM-${count}`;
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let teamCode = 'PRG-';
    for (let i = 0; i < 5; i++) {
      teamCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    let newTeam: Team = {
      ...teamData,
      teamId,
      teamCode,
      registrationDate: new Date().toISOString(),
      status: 'PENDING'
    };

    // Push Team to MongoDB Backend
    try {
      let res = await fetch('/api/teams', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(teamData)
      });
      if (!res.ok) {
        res = await fetch('http://localhost:5000/api/teams', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(teamData)
        });
      }
      if (res.ok) {
        const mongoTeam = await res.json();
        if (mongoTeam && mongoTeam.teamId) {
          newTeam = {
            ...mongoTeam,
            registrationDate: typeof mongoTeam.registrationDate === 'string' ? mongoTeam.registrationDate : new Date(mongoTeam.registrationDate).toISOString()
          };
        }
      }
    } catch (err) {
      console.warn('MongoDB API connection note (Team stored in local state):', err);
    }

    teams.unshift(newTeam);
    setStored(STORAGE_KEYS.TEAMS, teams);
    this.logActivity('TEAM_REGISTERED', newTeam.teamId, `New team registered: ${newTeam.teamName} (Code: ${newTeam.teamCode}) from ${newTeam.college}`, 'INFO');
    return newTeam;
  }

  async joinTeamByCode(teamCode: string, member: Team['leader']): Promise<{ success: boolean; team?: Team; error?: string }> {
    const targetCode = teamCode.trim().toUpperCase();
    const newMember = { ...member, isLeader: false };

    // 1. Fetch latest teams from backend server first to ensure local cache is up-to-date
    await this.fetchTeamsAsync();

    // 2. Try pushing join request to MongoDB Backend first
    try {
      const payload = { teamCode: targetCode, member: newMember };
      let res = await fetch('/api/teams/join', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        res = await fetch('http://localhost:5000/api/teams/join', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(payload)
        });
      }

      if (res.ok) {
        const mongoTeam = await res.json();
        if (mongoTeam && mongoTeam.teamId) {
          const freshTeams = await this.fetchTeamsAsync();
          const syncedTeam = freshTeams.find(t => t.teamId === mongoTeam.teamId) || mongoTeam;
          this.logActivity('MEMBER_JOINED_TEAM', syncedTeam.teamId, `${member.fullName} joined team ${syncedTeam.teamName} via Code ${teamCode}`, 'INFO');
          return { success: true, team: syncedTeam };
        }
      } else {
        const errData = await res.json().catch(() => ({}));
        if (errData && errData.error) {
          return { success: false, error: errData.error };
        }
      }
    } catch (err) {
      console.warn('MongoDB API connection note (Fallback to local join mode):', err);
    }

    // 3. Fallback to Local Storage join logic if backend server is unreachable
    const teams = this.getTeams();
    const index = teams.findIndex(t => (t.teamCode || '').toUpperCase() === targetCode);

    if (index === -1) {
      return { success: false, error: `Invalid Team Code "${teamCode}". No registered team found with this code.` };
    }

    const team = teams[index];
    if (team.members && team.members.length >= 4) {
      return { success: false, error: `Team "${team.teamName}" is already full! Maximum 4 members allowed per team.` };
    }

    const emailExists = team.members.some(m => m.email.toLowerCase() === member.email.toLowerCase());
    if (emailExists) {
      return { success: false, error: `Member with email "${member.email}" is already registered in this team.` };
    }

    team.members.push(newMember);

    setStored(STORAGE_KEYS.TEAMS, teams);
    this.logActivity('MEMBER_JOINED_TEAM', team.teamId, `${member.fullName} joined team ${team.teamName} via Code ${teamCode}`, 'INFO');
    return { success: true, team };
  }

  async submitTeamPayment(teamId: string, utr: string, screenshot: string, amount: number = 500): Promise<Team | undefined> {
    const teams = this.getTeams();
    const index = teams.findIndex(t => t.teamId === teamId);
    if (index === -1) return undefined;

    teams[index].paymentStatus = 'UNDER_REVIEW';
    teams[index].paymentUtr = utr;
    teams[index].paymentScreenshot = screenshot;
    teams[index].paymentAmount = amount;
    teams[index].paymentDate = new Date().toISOString();

    setStored(STORAGE_KEYS.TEAMS, teams);

    // Push payment update to backend
    try {
      const payload = { utr, screenshot, amount };
      let res = await fetch(`/api/teams/${teamId}/payment`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        res = await fetch(`http://localhost:5000/api/teams/${teamId}/payment`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(payload)
        });
      }
      if (res.ok) {
        const updatedMongoTeam = await res.json();
        if (updatedMongoTeam && updatedMongoTeam.teamId) {
          teams[index] = { ...teams[index], ...updatedMongoTeam };
          setStored(STORAGE_KEYS.TEAMS, teams);
        }
      }
    } catch (err) {
      console.warn('MongoDB API connection note (Payment stored locally):', err);
    }

    this.logActivity('PAYMENT_SUBMITTED', teamId, `₹${amount} Payment submitted with UTR: ${utr}`, 'INFO');
    return teams[index];
  }

  updateTeamStatus(teamId: string, status: Team['status'], notes?: string): Team | undefined {
    const teams = this.getTeams();
    const index = teams.findIndex(t => t.teamId === teamId);
    if (index === -1) return undefined;

    teams[index].status = status;
    if (status === 'APPROVED') {
      teams[index].paymentStatus = 'PAID';
    } else if (status === 'REJECTED') {
      teams[index].paymentStatus = 'REJECTED';
    }

    if (status === 'REJECTED' && notes) {
      teams[index].rejectionReason = notes;
    }
    if (status === 'CHANGES_REQUESTED' && notes) {
      teams[index].changeRequestNotes = notes;
    }

    setStored(STORAGE_KEYS.TEAMS, teams);

    // Sync status change with backend
    fetch(`/api/teams/${teamId}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, notes, paymentStatus: teams[index].paymentStatus })
    }).catch(() => {
      fetch(`http://localhost:5000/api/teams/${teamId}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status, notes, paymentStatus: teams[index].paymentStatus })
      }).catch(err => console.warn('Failed to sync team status to MongoDB:', err));
    });

    const actionName = status === 'APPROVED' ? 'TEAM_APPROVED' : status === 'REJECTED' ? 'TEAM_REJECTED' : 'TEAM_CHANGES_REQUESTED';
    const logType = status === 'APPROVED' ? 'SUCCESS' : status === 'REJECTED' ? 'DANGER' : 'WARNING';
    this.logActivity(actionName, teamId, `Status changed to ${status}. ${notes || ''}`, logType);
    return teams[index];
  }

  deleteTeam(teamId: string): boolean {
    let teams = this.getTeams();
    const target = teams.find(t => t.teamId === teamId);
    if (!target) return false;

    teams = teams.filter(t => t.teamId !== teamId);
    setStored(STORAGE_KEYS.TEAMS, teams);
    this.logActivity('TEAM_DELETED', teamId, `Deleted team ${target.teamName}`, 'DANGER');
    return true;
  }

  // Submissions
  getSubmissions(): Submission[] {
    const teams = this.getTeams();
    const submissions: Submission[] = [];
    teams.forEach(t => {
      if (t.submission) {
        submissions.push(t.submission);
      }
    });
    return submissions;
  }

  submitProject(teamId: string, submissionData: Omit<Submission, 'id' | 'teamId' | 'teamName' | 'status' | 'submittedAt'>): Submission | undefined {
    const teams = this.getTeams();
    const index = teams.findIndex(t => t.teamId === teamId);
    if (index === -1) return undefined;

    const subId = `SUB-${Math.floor(100 + Math.random() * 900)}`;
    const newSub: Submission = {
      ...submissionData,
      id: subId,
      teamId: teams[index].teamId,
      teamName: teams[index].teamName,
      status: 'SUBMITTED',
      submittedAt: new Date().toISOString()
    };

    teams[index].submission = newSub;
    setStored(STORAGE_KEYS.TEAMS, teams);

    // Sync submission to backend
    fetch(`/api/teams/${teamId}/submission`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(newSub)
    }).catch(() => {
      fetch(`http://localhost:5000/api/teams/${teamId}/submission`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(newSub)
      }).catch(err => console.warn('Failed to sync submission to MongoDB:', err));
    });

    this.logActivity('PROJECT_SUBMITTED', teamId, `Project submitted: ${newSub.projectTitle}`, 'SUCCESS');
    return newSub;
  }

  updateSubmissionStatus(submissionId: string, status: Submission['status'], adminNotes?: string): boolean {
    const teams = this.getTeams();
    let updated = false;
    teams.forEach(t => {
      if (t.submission && t.submission.id === submissionId) {
        t.submission.status = status;
        if (adminNotes) t.submission.adminNotes = adminNotes;
        updated = true;
      }
    });
    if (updated) {
      setStored(STORAGE_KEYS.TEAMS, teams);
      this.logActivity('SUBMISSION_REVIEWED', submissionId, `Status set to ${status}`, 'INFO');
    }
    return updated;
  }

  // Tracks
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

  // Announcements
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

  // CMS
  getCMS(): HomepageCMS {
    return getStored<HomepageCMS>(STORAGE_KEYS.CMS, INITIAL_CMS);
  }

  updateCMS(cms: HomepageCMS): HomepageCMS {
    setStored(STORAGE_KEYS.CMS, cms);
    this.logActivity('HOMEPAGE_CMS_UPDATE', 'Public Website', 'Updated homepage CMS sections', 'INFO');
    return cms;
  }

  // Settings
  getSettings(): SystemSettings {
    return getStored<SystemSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  }

  updateSettings(settings: SystemSettings): SystemSettings {
    setStored(STORAGE_KEYS.SETTINGS, settings);
    this.logActivity('SETTINGS_UPDATED', 'System Settings', 'Updated system configurations', 'WARNING');
    return settings;
  }

  // Activity Logs
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

  // Participants
  getParticipants() {
    const teams = this.getTeams();
    const participants: {
      id: string;
      fullName: string;
      email: string;
      phone: string;
      college: string;
      course: string;
      year: string;
      teamId: string;
      teamName: string;
      trackTitle: string;
      isLeader: boolean;
      status: string;
    }[] = [];

    teams.forEach(t => {
      t.members.forEach(m => {
        participants.push({
          ...m,
          teamId: t.teamId,
          teamName: t.teamName,
          trackTitle: t.trackTitle,
          status: t.status
        });
      });
    });

    return participants;
  }

  // Files
  getFiles(): (SubmissionFile & { teamId: string; teamName: string; trackTitle: string })[] {
    const teams = this.getTeams();
    const filesList: (SubmissionFile & { teamId: string; teamName: string; trackTitle: string })[] = [];

    teams.forEach(t => {
      if (t.submission && t.submission.files) {
        t.submission.files.forEach(f => {
          filesList.push({
            ...f,
            teamId: t.teamId,
            teamName: t.teamName,
            trackTitle: t.trackTitle
          });
        });
      }
    });

    return filesList;
  }

  deleteFile(fileId: string): boolean {
    const teams = this.getTeams();
    let fileDeleted = false;

    teams.forEach(t => {
      if (t.submission && t.submission.files) {
        const origLen = t.submission.files.length;
        t.submission.files = t.submission.files.filter(f => f.id !== fileId);
        if (t.submission.files.length < origLen) fileDeleted = true;
      }
    });

    if (fileDeleted) {
      setStored(STORAGE_KEYS.TEAMS, teams);
      this.logActivity('FILE_DELETED', fileId, `Deleted file ID ${fileId} from GridFS`, 'DANGER');
    }
    return fileDeleted;
  }
}

export const apiService = new PragyanAPIService();
