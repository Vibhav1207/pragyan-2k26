export interface ProblemStatement {
  id: string;
  trackId: string;
  trackName: string;
  trackNumber: string;
  title: string;
  shortSummary: string;
  context: string;
  keyObjectives: string[];
  expectedDeliverables: string[];
  sdgGoals: { number: number; name: string; color: string }[];
  evaluationFocus: string[];
  difficulty: 'Intermediate' | 'Advanced';
}

export const HACKATHON_LAUNCH_TARGET_ISO = '2026-10-24T12:00:00+05:30';

// Production repository - populated dynamically by admin
export const PROBLEM_STATEMENTS: ProblemStatement[] = [];

export function isProblemStatementsUnlocked(): boolean {
  if (typeof window !== 'undefined') {
    try {
      const preview = localStorage.getItem('pragyan_ps_preview_unlocked');
      if (preview === 'true') return true;
    } catch {}
  }
  const launchTime = new Date(HACKATHON_LAUNCH_TARGET_ISO).getTime();
  return Date.now() >= launchTime;
}
