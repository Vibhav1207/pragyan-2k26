export interface RuleCategory {
  id: string;
  title: string;
  badge: string;
  rules: string[];
}

export const RULES_AND_GUIDELINES: RuleCategory[] = [
  {
    id: "team-rules",
    title: "Team Rules",
    badge: "RULESET 01",
    rules: [
      "Each team must consist of exactly 4 members.",
      "All team members must be currently enrolled UG, PG, or PhD students from a recognized institution.",
      "One member must be designated as the Team Leader responsible for all official communications.",
      "Inter-disciplinary and inter-departmental teams are encouraged."
    ]
  },
  {
    id: "submission-rules",
    title: "Submission Rules",
    badge: "RULESET 02",
    rules: [
      "Phase 01 project decks and proposals must be submitted prior to 30 SEPT 2026, 11:59 PM IST.",
      "All submissions must align with one of the 4 official hackathon tracks.",
      "Final Round code and prototypes must be developed during the 24-hour sprint at Sanjivani University.",
      "Late submissions will not be considered under any circumstances."
    ]
  },
  {
    id: "originality-rules",
    title: "Originality & Plagiarism",
    badge: "RULESET 03",
    rules: [
      "All work, code, business designs, and concepts must be original work created by the team.",
      "Pre-existing open-source libraries, APIs, and frameworks are allowed with explicit disclosure.",
      "Plagiarism or submission of previously published hackathon projects will result in immediate disqualification.",
      "Sanctioned AI tools may be used for assistance but must be declared in project documentation."
    ]
  },
  {
    id: "judging-criteria",
    title: "Judging Criteria",
    badge: "RULESET 04",
    rules: [
      "Innovation & Originality (25%): Uniqueness and creative approach to problem-solving.",
      "Alignment with SDG Goal 2030 (25%): Direct impact on UN Sustainable Development Goals.",
      "Technical & Operational Feasibility (25%): Viability, architecture, and business model realism.",
      "Presentation & Pitch (25%): Clarity, demonstration quality, and responses during jury Q&A."
    ]
  },
  {
    id: "code-of-conduct",
    title: "Code of Conduct",
    badge: "RULESET 05",
    rules: [
      "Maintain the highest standards of professional ethics, respect, and academic integrity.",
      "Harassment, discrimination, or abusive behavior toward any delegate, mentor, or organizer will not be tolerated.",
      "Respect Sanjivani University campus property and adhere to safety and decorum guidelines.",
      "The decision of the jury panel and organizing committee is final and binding."
    ]
  }
];
