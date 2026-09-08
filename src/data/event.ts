export interface EventInfo {
  name: string;
  tagline: string;
  headline: string;
  supportingLine: string;
  institution: string;
  venueName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  theme: string;
  sprint: string;
  teamSize: string;
  firstRoundFee: string;
  secondRoundFeeNotice: string;
  eligibility: string;
  email: string;
  instagram: string;
  year: string;
  socials: {
    instagram: string;
    email: string;
  };
  organizers: string[];
}

export const EVENT_DATA: EventInfo = {
  name: "PRAGYAN 2K26",
  tagline: "NATIONAL LEVEL HACKATHON",
  headline: "INNOVATION & ENTREPRENEURSHIP ON SDG GOAL 2030",
  supportingLine: "24 HRS INNOVATION SPRINT FOR INDIA'S BRIGHTEST COMMERCE AND MANAGEMENT MINDS",
  institution: "SANJIVANI UNIVERSITY",
  venueName: "Sanjivani University Campus",
  address: "Kopargaon, near Shirdi, Ahilyanagar, Maharashtra 423601",
  city: "Kopargaon",
  state: "Maharashtra",
  pincode: "423601",
  theme: "INNOVATION & ENTREPRENEURSHIP ON SDG GOAL 2030",
  sprint: "24 HRS HACKATHON",
  teamSize: "4 MEMBERS PER TEAM",
  firstRoundFee: "₹500 REGISTRATION FEE (PER TEAM)",
  secondRoundFeeNotice: "SELECTED MEMBERS WILL HAVE TO PAY THE FEE FOR 2ND ROUND LATER",
  eligibility: "OPEN FOR ALL DOMAIN STUDENTS ACROSS UG, PG AND PhD",
  email: "pragyan2k26su@gmail.com",
  instagram: "@pragyan_2k26",
  year: "2K26",
  socials: {
    instagram: "https://instagram.com/pragyan_2k26",
    email: "mailto:pragyan2k26su@gmail.com"
  },
  organizers: [
    "SANJIVANI UNIVERSITY",
    "PRAGYAN 2K26",
    "INSTITUTION'S INNOVATION COUNCIL",
    "ENTREPRENEURSHIP DEVELOPMENT CELL"
  ]
};

export const FLYER_BADGES = [
  { label: "TEAM CAPACITY", value: "4 MEMBERS PER TEAM" },
  { label: "REGISTRATION FEE", value: "₹500 REGISTRATION FEE" },
  { label: "SPRINT DURATION", value: "24 HRS HACKATHON" }
];

export const FOUR_CONCEPTS = [
  {
    title: "IDEATE",
    subtitle: "Real Problems",
    description: "Identify & analyze high-impact challenges rooted in United Nations SDG Goal 2030 targets.",
    iconName: "Lightbulb"
  },
  {
    title: "INNOVATE",
    subtitle: "Practical Solutions",
    description: "Engineered, deployable products & actionable business models built for rapid implementation.",
    iconName: "Rocket"
  },
  {
    title: "COLLABORATE",
    subtitle: "Across Disciplines",
    description: "Fusing management, technology, design, and research expertise in multi-disciplinary teams.",
    iconName: "Users"
  },
  {
    title: "CREATE IMPACT",
    subtitle: "For a Sustainable Future",
    description: "Transform academic concepts into sustainable enterprises driving long-term economic & social value.",
    iconName: "Target"
  }
];
