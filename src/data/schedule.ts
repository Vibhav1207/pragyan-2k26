export interface TimelinePhase {
  phase: string;
  type: "ONLINE" | "ON-GROUND";
  title: string;
  badge: string;
  events: {
    name: string;
    dates: string;
    description: string;
  }[];
  footerNotice?: string;
}

export const FLYER_TIMELINE: TimelinePhase[] = [
  {
    phase: "PHASE 1",
    type: "ONLINE",
    title: "PHASE 1 — ONLINE",
    badge: "PHASE 1 — ONLINE",
    events: [
      {
        name: "Registration Dates",
        dates: "10th – 25th SEPT 2026",
        description: "Submit online team registration (4 members per team) and select your hackathon track."
      },
      {
        name: "Submission Dates",
        dates: "25th – 30th SEPT 2026",
        description: "Submit initial project proposal deck and solution architecture framework online."
      }
    ]
  },
  {
    phase: "PHASE 2",
    type: "ON-GROUND",
    title: "PHASE 2 — ON-GROUND",
    badge: "PHASE 2 — ON-GROUND",
    events: [
      {
        name: "FINAL ROUND",
        dates: "24th & 25th OCT 2026",
        description: "24-Hour live innovation sprint on-ground at Sanjivani University, Kopargaon."
      }
    ],
    footerNotice: "TOP TEAMS WILL BE INVITED TO THE ON-GROUND ROUND"
  }
];
