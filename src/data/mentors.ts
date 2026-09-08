export interface ProfilePerson {
  id: string;
  name: string;
  role: string;
  organization: string;
  expertise: string[];
  avatar: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  github?: string;
  isPlaceholder?: boolean;
}

export const MENTORS_DATA: ProfilePerson[] = [
  {
    id: "m-01",
    name: "FINTECH & ANALYTICS ADVISOR",
    role: "Lead FinTech Mentor",
    organization: "Sanjivani University School of Management",
    expertise: ["Digital Banking", "Micro-Finance", "Data Analytics", "Risk Modeling"],
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    bio: "Guiding Track 01 teams on building scalable financial inclusion tools and fraud detection engines.",
    linkedin: "#",
    github: "#",
    isPlaceholder: true
  },
  {
    id: "m-02",
    name: "AI & CONSUMER INTELLIGENCE MENTOR",
    role: "AI & Machine Learning Specialist",
    organization: "Department of Computer Engineering",
    expertise: ["Machine Learning", "NLP / Sentiment AI", "Consumer Research", "Python"],
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    bio: "Helping Track 02 teams train consumer behavior models and ethical AI marketing tools.",
    linkedin: "#",
    twitter: "#",
    isPlaceholder: true
  },
  {
    id: "m-03",
    name: "SMART LOGISTICS & OPERATIONS EXPERT",
    role: "Supply Chain & IoT Mentor",
    organization: "Sanjivani Tech Innovation Lab",
    expertise: ["Logistics Optimization", "IoT Telemetry", "Supply Chain", "Cloud Systems"],
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    bio: "Advising Track 03 teams on green supply networks, agricultural distribution, and inventory forecasting.",
    linkedin: "#",
    github: "#",
    isPlaceholder: true
  },
  {
    id: "m-04",
    name: "ENTREPRENEURSHIP & PRODUCT MENTOR",
    role: "Venture Building & Pitch Mentor",
    organization: "Sanjivani Center for Innovation & Entrepreneurship",
    expertise: ["Business Models", "Pitch Decks", "ESG Compliance", "Product Design"],
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    bio: "Guiding teams on building investor-ready pitch decks and social enterprise models.",
    linkedin: "#",
    isPlaceholder: true
  }
];
