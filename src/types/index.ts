export type Track = 'INTL' | 'INDIA' | 'intl' | 'india' | 'smashdown';

// ---------------------------------------------------------
// Competition config — single source of truth for the stuff that
// differs between formats (roster size per game, question count,
// team vs individual). Scoring/leaderboard/match-results logic stays
// identical across all three; only these numbers change.
//
// FLQL + Flames: 4 entrants/game, 64Q.
// Smashdown: 3 entrants/game (each entrant is a 2-person team), 48Q.
// ---------------------------------------------------------
export type ScoringTrack = 'india' | 'intl' | 'smashdown';

export interface CompetitionConfig {
  label: string;
  entrantsPerGame: number;
  questionsPerGame: number;
  isTeamEvent: boolean;
}

export const COMPETITION_CONFIG: Record<ScoringTrack, CompetitionConfig> = {
  india: { label: "India Track", entrantsPerGame: 4, questionsPerGame: 64, isTeamEvent: false },
  intl: { label: "Int'l Track", entrantsPerGame: 4, questionsPerGame: 64, isTeamEvent: false },
  smashdown: { label: 'Smashdown', entrantsPerGame: 3, questionsPerGame: 48, isTeamEvent: true },
};

// ---------------------------------------------------------
// League rotation — FLQL runs 3 distinct leagues across the year, ONE live
// at a time (never overlapping). Flip `status` here when a season ends and
// the next one kicks off; Home.tsx and LeagueMenu.tsx both read from this
// single source instead of hardcoding "what's running right now".
//
// Current source of truth: https://linktr.ee/flql ("NOW RUNNING: Smashdown S3")
// ---------------------------------------------------------
export type LeagueSlug = 'flql' | 'flames' | 'smashdown';
export type LeagueStatus = 'live' | 'up-next' | 'concluded';

export interface LeagueInfo {
  slug: LeagueSlug;
  name: string;
  fullName: string;
  format: string;
  season: number;
  status: LeagueStatus;
}

export const LEAGUE_ROTATION: LeagueInfo[] = [
  {
    slug: 'flql',
    name: 'FLQL',
    fullName: 'FundaesLiga Quiz League',
    format: "4-player rooms \u00b7 64Q \u00b7 India & Int'l tracks",
    season: 9,
    status: 'concluded',
  },
  {
    slug: 'flames',
    name: 'Flames',
    fullName: 'FLQL Flames',
    format: "4-player rooms \u00b7 64Q \u00b7 India & Int'l tracks",
    season: 6,
    status: 'up-next',
  },
  {
    slug: 'smashdown',
    name: 'Smashdown',
    fullName: 'FLQL Smashdown',
    format: '3-team rooms \u00b7 48Q \u00b7 Team event',
    season: 3,
    status: 'live',
  },
];

export const CURRENT_LEAGUE: LeagueInfo =
  LEAGUE_ROTATION.find((l) => l.status === 'live') ?? LEAGUE_ROTATION[0];

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