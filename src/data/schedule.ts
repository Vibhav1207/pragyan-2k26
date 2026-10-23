export interface TimelinePhase {
  phase: string;
  type: "ONLINE" | "ON-GROUND";
  title: string;
  badge: string;
  statusBadge?: string;
  events: {
    name: string;
    dates?: string;
    status: string;
    description: string;
  }[];
  footerNotice?: string;
}

export const FLYER_TIMELINE: TimelinePhase[] = [
  {
    phase: "ROUND 1",
    type: "ONLINE",
    title: "ROUND 1 — ONLINE EVALUATION",
    badge: "ROUND 1 — OVER",
    statusBadge: "COMPLETED",
    events: [
      {
        name: "Team Registration",
        status: "COMPLETED",
        description: "Online team registration (4 members per team) and track selection concluded."
      },
      {
        name: "Solution Proposal Submission",
        status: "EVALUATION OVER",
        description: "Initial project proposal deck and solution architecture evaluation completed."
      }
    ],
    footerNotice: "ROUND 1 CONCLUDED • SHORTLISTED TEAMS ADVANCED"
  },
  {
    phase: "ROUND 2",
    type: "ON-GROUND",
    title: "ROUND 2 — ON-GROUND GRAND FINALE",
    badge: "ROUND 2 — COMMENCING SOON",
    statusBadge: "STARTING SOON",
    events: [
      {
        name: "24-Hour Live Hackathon",
        status: "STARTS IN 12 HOURS",
        description: "24-Hour live innovation sprint on-ground at Sanjivani University, Kopargaon."
      }
    ],
    footerNotice: "FINALIST TEAMS REPORT ON-GROUND AT SANJIVANI CAMPUS"
  }
];
