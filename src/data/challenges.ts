export interface Track {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  iconName: string;
  accentColor: string;
}

export const HACKATHON_TRACKS: Track[] = [
  {
    id: "track-1",
    number: "TRACK 1",
    title: "FINTECH & FINANCIAL INNOVATION",
    shortDescription: "Empowering economic growth through digital banking, inclusion, financial literacy, micro-investments, and AI risk modeling.",
    iconName: "Wallet",
    accentColor: "from-blue-600 to-indigo-700"
  },
  {
    id: "track-2",
    number: "TRACK 2",
    title: "MARKETING & CONSUMER INTELLIGENCE",
    shortDescription: "Reinventing brand engagement, ethical AI marketing, consumer behavior analytics, and data-driven retail discovery.",
    iconName: "BarChart2",
    accentColor: "from-amber-500 to-[#FACC15]"
  },
  {
    id: "track-3",
    number: "TRACK 3",
    title: "SMART OPERATIONS & SUSTAINABLE SUPPLY CHAIN",
    shortDescription: "Optimizing logistics, green supply networks, smart inventory routing, circular economy, and waste reduction.",
    iconName: "Truck",
    accentColor: "from-blue-600 to-cyan-600"
  },
  {
    id: "track-4",
    number: "TRACK 4",
    title: "ENTREPRENEURSHIP & FUTURE OF MANAGEMENT",
    shortDescription: "Pioneering new business models, scalable social enterprise tools, automated compliance, and digital workforce platforms.",
    iconName: "Briefcase",
    accentColor: "from-[#FACC15] to-amber-600"
  }
];
