export interface User {
  id: string;
  name: string;
  role: string;
  gamesPlayed: number;
  gamesRead: number;
  interestsSent: number;
}

export interface Match {
  id: string;
  time: string;
  teamA: string;
  teamB: string;
  scoreA?: number | string;
  scoreB?: number | string;
  winner?: string;
  readerAssigned?: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
}