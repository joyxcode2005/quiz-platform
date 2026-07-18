import { useCallback, useEffect, useMemo, useState } from 'react';
import { mockDraws } from '../data/mockDraws';
import { mockGames } from '../data/mockGames';
import type { DrawGame, WeekDraws } from '../types';

// TODO: swap this for the real logged-in user once AuthContext exposes a
// display name that matches the "seats"/"reader" strings used in the sheets.
// Everything below keys off this one constant.
const CURRENT_USER = 'Ankit Bisht';

export interface OpenReadGame {
  gameNo: string;
  league: 'INTL' | 'INDIA';
  week: number;
  date?: string;
  time?: string;
  players: string[];
}

export interface ScheduledReadGame extends OpenReadGame {
  status: 'toread' | 'read';
}

const STORAGE_KEY = 'quizarena.readSchedule.v1';

function loadSchedule(): ScheduledReadGame[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ScheduledReadGame[]) : [];
  } catch {
    return [];
  }
}

function saveSchedule(schedule: ScheduledReadGame[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule));
  } catch {
    /* storage unavailable (private mode etc) - fail silently, state still
       works for the rest of the session */
  }
}

/**
 * Eligibility rule (confirm this matches league policy):
 * A player can volunteer to read ANY open game on a track, as long as they
 * have played at least one game on that same track before. This is NOT the
 * same game instance - a reader is by definition not one of the players
 * seated in the match they're reading.
 */
export function useReaderQueue() {
  const [schedule, setSchedule] = useState<ScheduledReadGame[]>(() => loadSchedule());

  useEffect(() => saveSchedule(schedule), [schedule]);

  const playedTracks = useMemo(() => {
    const tracks = new Set<'INTL' | 'INDIA'>();
    mockGames.forEach((g) => {
      if (g.seats.includes(CURRENT_USER)) tracks.add(g.track as 'INTL' | 'INDIA');
    });
    return tracks;
  }, []);

  const scheduledIds = useMemo(() => new Set(schedule.map((s) => s.gameNo)), [schedule]);

  // Open = still needs a reader, this player isn't one of the seated
  // players themselves, and it isn't already sitting in their schedule.
  const openGames: OpenReadGame[] = useMemo(() => {
    const out: OpenReadGame[] = [];
    mockDraws.forEach((weekDraws: WeekDraws) => {
      weekDraws.games.forEach((game: DrawGame) => {
        if (game.readerAssigned) return;
        const isPlaying = game.seats.some((s) => s.name === CURRENT_USER);
        if (isPlaying || scheduledIds.has(game.gameNo)) return;
        out.push({
          gameNo: game.gameNo,
          league: weekDraws.league,
          week: weekDraws.week,
          date: game.date,
          time: game.time,
          players: game.seats.filter((s) => s.name !== 'EMPTY').map((s) => s.name),
        });
      });
    });
    return out;
  }, [scheduledIds]);

  // Group by real day if the data has it, otherwise fall back to one
  // "This Week" bucket so the UI still works with today's (day-less) mockDraws.
  const openGamesByDay = useMemo(() => {
    const groups = new Map<string, OpenReadGame[]>();
    openGames.forEach((g) => {
      const key = g.date ?? `Week ${g.week}`;
      const list = groups.get(key) ?? [];
      list.push(g);
      groups.set(key, list);
    });
    return Array.from(groups.entries()).map(([label, games]) => ({ label, games }));
  }, [openGames]);

  const canRead = useCallback((league: 'INTL' | 'INDIA') => playedTracks.has(league), [playedTracks]);

  const markInterested = useCallback((game: OpenReadGame) => {
    setSchedule((prev) => (prev.some((g) => g.gameNo === game.gameNo) ? prev : [...prev, { ...game, status: 'toread' }]));
  }, []);

  const markRead = useCallback((gameNo: string) => {
    setSchedule((prev) => prev.map((g) => (g.gameNo === gameNo ? { ...g, status: 'read' } : g)));
  }, []);

  const toRead = useMemo(() => schedule.filter((g) => g.status === 'toread'), [schedule]);
  const read = useMemo(() => schedule.filter((g) => g.status === 'read'), [schedule]);

  return { openGamesByDay, toRead, read, canRead, markInterested, markRead, currentUser: CURRENT_USER };
}