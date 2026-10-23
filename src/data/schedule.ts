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
    phase: "ROUND 1 & 2",
    type: "ONLINE",
    title: "ROUND 1 & 2 — ONLINE SELECTION",
    badge: "ONLINE EVALUATION COMPLETED",
    statusBadge: "EVALUATION DONE",
    events: [
      {
        name: "Round 1: Team Registration",
        status: "COMPLETED",
        description: "Online team registration (4 members per team) and track selection."
      },
      {
        name: "Round 2: Solution Submissions",
        status: "COMPLETED",
        description: "Project proposal deck, problem statement framework, and architecture submission."
      }
    ],
    footerNotice: "ONLINE ROUNDS COMPLETED • FINALISTS SHORTLISTED"
  },
  {
    phase: "FINAL HACKATHON",
    type: "ON-GROUND",
    title: "FINAL HACKATHON — GRAND FINALE",
    badge: "FINAL HACKATHON",
    statusBadge: "TBD",
    events: [
      {
        name: "24-Hour Final Hackathon",
        status: "TBD",
        description: "24-Hour non-stop innovation sprint on-ground at Sanjivani University, Kopargaon. Exact commencement schedule to be declared."
      }
    ],
    footerNotice: "FINALIST TEAMS ASSEMBLE ON-GROUND AT SANJIVANI CAMPUS"
  }
];
