export interface PrizeOpportunity {
  id: string;
  title: string;
  description: string;
  isMain?: boolean;
}

export const FLYER_PRIZES: PrizeOpportunity[] = [
  {
    id: "cash-prizes",
    title: "EXCITING CASH PRIZES",
    description: "Prestigious cash awards for top winners & track champions at the Grand Finale.",
    isMain: true
  },
  {
    id: "certificates",
    title: "CERTIFICATES",
    description: "Official national certificates of merit & participation issued by Sanjivani University.",
    isMain: false
  },
  {
    id: "internships",
    title: "INTERNSHIP OPPORTUNITIES",
    description: "Direct interview referrals & corporate internship placements for high-performing teams.",
    isMain: false
  },
  {
    id: "incubation",
    title: "INCUBATION SUPPORT",
    description: "Startup incubation, mentoring & seed support via Sanjivani University Entrepreneurship Development Cell.",
    isMain: false
  }
];

export const SHIRDI_TOURISM = {
  title: "SHIRDI TOURISM COMPLEMENTARY",
  tagline: "EXPLORE • EXPERIENCE • BE INSPIRED",
  subtitle: "EXPLORE SHIRDI WITH YOUR JOURNEY",
  description: "As an exclusive privilege for outstation delegates participating in Pragyan 2K26, Sanjivani University provides complimentary guided tourism and shrine visits to Shirdi."
};
