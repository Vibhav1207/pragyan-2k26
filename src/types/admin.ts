export type Role = 'PARTICIPANT' | 'ADMIN';

export type TeamStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CHANGES_REQUESTED';

export type SubmissionStatus = 'NOT_SUBMITTED' | 'SUBMITTED' | 'UNDER_REVIEW' | 'REVIEWED' | 'SHORTLISTED' | 'DISQUALIFIED';

export type AnnouncementStatus = 'DRAFT' | 'PUBLISHED' | 'SCHEDULED';

export interface TeamMember {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  course: string;
  year: string;
  isLeader: boolean;
}

export interface SubmissionFile {
  id: string;
  filename: string;
  fileType: string;
  fileSize: number;
  uploadDate: string;
  gridFsId?: string;
  url?: string;
}

export interface Submission {
  id: string;
  teamId: string;
  teamName: string;
  projectTitle: string;
  description: string;
  trackId: string;
  trackTitle: string;
  status: SubmissionStatus;
  githubUrl?: string;
  demoUrl?: string;
  files: SubmissionFile[];
  adminNotes?: string;
  submittedAt?: string;
  score?: number;
}

export interface Team {
  teamId: string; // e.g. PRAGYAN-TM-101
  teamCode?: string; // e.g. PRG-7X9K2 for team joining
  teamName: string;
  trackId: string;
  trackTitle: string;
  college: string;
  leader: TeamMember;
  members: TeamMember[]; // Up to 4 members total including leader
  registrationDate: string;
  status: TeamStatus;
  submission?: Submission;
  rejectionReason?: string;
  changeRequestNotes?: string;
  paymentStatus?: 'NOT_PAID' | 'UNDER_REVIEW' | 'PAID' | 'REJECTED';
  paymentUtr?: string;
  paymentScreenshot?: string;
  paymentDate?: string;
  paymentAmount?: number;
}

export interface Track {
  id: string;
  title: string;
  description: string;
  category: string;
  iconName: string;
  isActive: boolean;
  order: number;
  problemStatementsCount?: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  status: AnnouncementStatus;
  publishDate: string;
  expiryDate?: string;
  createdAt: string;
  author: string;
}

export interface ActivityLog {
  id: string;
  adminName: string;
  adminEmail: string;
  action: string;
  entity: string; // e.g. "Team PRAGYAN-TM-101"
  details: string;
  timestamp: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'DANGER';
}

export interface SystemSettings {
  registrationOpen: boolean;
  registrationDeadline: string;
  maxTeamSize: number;
  registrationFee: number;
  submissionOpen: boolean;
  submissionDeadline: string;
  allowedFileTypes: string[];
  maxFileSizeMb: number;
  maintenanceMode: boolean;
  homepageVisibility: boolean;
  announcementVisibility: boolean;
}

export interface HomepageCMS {
  hero: {
    eventTitle: string;
    mainHeading: string;
    subHeading: string;
    datesText: string;
    venueText: string;
    ctaPrimaryText: string;
    ctaSecondaryText: string;
  };
  eventDetails: {
    teamSizeText: string;
    feeText: string;
    regDatesText: string;
    subDatesText: string;
    finalDatesText: string;
  };
  about: {
    title: string;
    description: string;
    fourPillars: {
      ideate: string;
      innovate: string;
      collaborate: string;
      createImpact: string;
    };
  };
  prizes: {
    totalPool: string;
    firstPrize: string;
    secondPrize: string;
    thirdPrize: string;
    specialCategory: string;
    perks: string[];
  };
  contact: {
    email: string;
    phone: string;
    instagram: string;
    location: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: Role;
  teamId?: string;
  token?: string;
}
