export type Track = 'INTL' | 'INDIA' | 'intl' | 'india' ;

// ---------------------------------------------------------
// Competition config — single source of truth for the stuff that
// differs between formats (roster size per game, question count,
// team vs individual). Scoring/leaderboard/match-results logic stays
// identical across all three; only these numbers change.
//
// FLQL + Flames: 4 entrants/game, 64Q.
// Smashdown: 3 entrants/game (each entrant is a 2-person team), 48Q.
// ---------------------------------------------------------
export type ScoringTrack = 'india' | 'intl';

export interface CompetitionConfig {
  label: string;
  entrantsPerGame: number;
  questionsPerGame: number;
  isTeamEvent: boolean;
}

export const COMPETITION_CONFIG: Record<ScoringTrack, CompetitionConfig> = {
  india: { label: "India Track", entrantsPerGame: 4, questionsPerGame: 64, isTeamEvent: false },
  intl: { label: "Int'l Track", entrantsPerGame: 4, questionsPerGame: 64, isTeamEvent: false },
};

// A single competitor's season-long stat line (from the Leaderboard sheet)
export interface LeaderboardEntry {
  rank: number;
  name: string;
  continent: string;
  gamesPlayed: number;
  gamePoints: number;
  totalCorrectAnswers: number;
  totalBAs: number;       // Bonus/Buzzed Answers
  totalOwns: number;      // Correct answers taken from an opponent's question
  totalBPts: number;      // Bonus points earned
  baPercent: number;      // BA conversion rate, e.g. 91
  averageQELO: number;    // Quiz-specific Elo rating
  track: Track;
}

// A single scheduled game - 4 players seated together, one reader hosting
export interface Game {
  id: string;             // match number, e.g. "7122"
  date: string;           // "21-Jun"
  time: string;           // "10:00 PM" (IST)
  seats: string[];
  zoomNeeded: boolean;
  reader: string;
  readerAssigned: boolean;
  track: Track;
}

// Kept for any UI still referencing a generic user profile
export interface User {
  id: string;
  name: string;
  role: string;
  gamesPlayed: number;
  gamesRead: number;
  interestsSent: number;
}

// ---------------------------------------------------------
// ADDED: Weekly Draws Types
// ---------------------------------------------------------
export interface DrawSeat {
  name: string;
  country?: string;
}

export interface DrawGame {
  gameNo: string;
  seats: DrawSeat[];
  // Optional — current mockDraws data is only grouped by week, not by day.
  // Add these per-game once the draw sheet has per-game scheduling, and the
  // reader queue below will automatically start grouping "today's games" by
  // actual day instead of falling back to "this week".
  date?: string;
  time?: string;
  // Whether a reader has already been assigned to this game. Defaults to
  // "not assigned" (open for reading) when omitted.
  readerAssigned?: boolean;
}

export interface WeekDraws {
  week: number;
  league: 'INTL' | 'INDIA';
  games: DrawGame[];
}

// ---------------------------------------------------------
// ADDED: Match Results & Algorithmic Leaderboard Types
// ---------------------------------------------------------
export interface PlayerScore {
  name: string;
  pts: number;
  bas: number;
  qelo: number;
}

export interface MatchScore {
  matchId: string;
  track: Track;
  players: PlayerScore[];
}

export interface ReaderRecord {
  rank: number;
  name: string;
  gamesRead: number;
}