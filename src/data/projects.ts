export interface ProjectShowcase {
  id: string;
  year: string;
  title: string;
  teamName: string;
  challengeTitle: string;
  award: string;
  summary: string;
  image: string;
  githubUrl?: string;
  demoUrl?: string;
  isPlaceholder?: boolean;
}

export const PREVIOUS_PROJECTS: ProjectShowcase[] = [
  {
    id: "proj-2025-01",
    title: "FinPulse Kopargaon: Rural Micro-Inclusion Platform",
    year: "2025",
    teamName: "Team Sanjivani FinTech",
    challengeTitle: "Fintech & Financial Innovation",
    award: "Track Champion & Overall 1st Place",
    summary: "Built an AI-driven micro-credit scoring and financial literacy engine empowering sugarcane farmer collectives in Kopargaon.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    githubUrl: "https://github.com",
    demoUrl: "https://skh.sanjivaniuniversity.com",
    isPlaceholder: true
  },
  {
    id: "proj-2025-02",
    title: "EcoChain Logix: Green Supply Chain Telemetry",
    year: "2025",
    teamName: "SupplySprint KPR",
    challengeTitle: "Smart Operations & Sustainable Supply Chain",
    award: "Best SDG 2030 Innovation",
    summary: "Developed an IoT-enabled fleet routing platform reducing carbon emissions and food spoilage across agricultural supply chains.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    githubUrl: "https://github.com",
    demoUrl: "https://skh.sanjivaniuniversity.com",
    isPlaceholder: true
  },
  {
    id: "proj-2025-03",
    title: "AdSense AI: Ethical Consumer Sentiment Portal",
    year: "2025",
    teamName: "ConsumerIntel AI",
    challengeTitle: "Marketing & Consumer Intelligence",
    award: "Local Delegates Choice Award",
    summary: "Utilized NLP sentiment models to detect greenwashing in retail marketing and provide transparent consumer scoring.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    githubUrl: "https://github.com",
    demoUrl: "https://skh.sanjivaniuniversity.com",
    isPlaceholder: true
  },
  {
    id: "proj-2025-04",
    title: "VentureOS: Social Enterprise Incubation Suite",
    year: "2025",
    teamName: "Sanjivani Founders",
    challengeTitle: "Entrepreneurship & Future of Management",
    award: "Best Incubation Potential Award",
    summary: "Created an automated ESG compliance and business model validation wizard for early-stage social enterprise founders.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    githubUrl: "https://github.com",
    demoUrl: "https://skh.sanjivaniuniversity.com",
    isPlaceholder: true
  }
];
