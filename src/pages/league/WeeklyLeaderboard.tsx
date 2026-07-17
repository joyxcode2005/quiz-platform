import React from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '../../components/layout/PageLayout';
import { User as UserIcon } from 'lucide-react';
import { staggerContainer, staggerItem } from '../../lib/animations';
import type { LeaderboardEntry } from '../../types';

const PodiumCard: React.FC<{ rank: number; name: string; score: number; height: string }> = ({ rank, name, score, height }) => (
  <motion.div variants={staggerItem} className={`flex flex-col items-center w-1/3 ${rank === 1 ? 'mb-4' : ''}`}>
    <div className="relative mb-2">
      {rank === 1 && <div className="glow-signal w-16 h-16 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center relative" style={{ boxShadow: '4px 4px 10px rgba(0,0,0,0.35), -2px -2px 8px rgba(255,255,255,0.15)' }}>
        <UserIcon size={22} className="text-[var(--ink)]" />
      </div>
    </div>
    <p className="font-black uppercase text-xs text-center w-full truncate text-[var(--bone)]">{name}</p>
    <p className="font-data font-bold text-xs text-[var(--signal)] mt-0.5">{score}</p>
    <div className={`ghost-numeral ${height} w-full flex items-end justify-center text-5xl mt-2 relative overflow-hidden`} style={{ WebkitTextStroke: '2px var(--bone)' }}>
      {rank}
    </div>
  </motion.div>
);

const ScoreRow: React.FC<{ entry: LeaderboardEntry }> = ({ entry }) => (
  <motion.div variants={staggerItem} className="neu-inset flex items-center justify-between p-4">
    <div className="flex items-center gap-4">
      <span className="font-data font-black text-[var(--ink)]/30 text-sm w-6">{String(entry.rank).padStart(2, '0')}</span>
      <span className="font-black uppercase text-sm text-[var(--ink)]">{entry.name}</span>
    </div>
    <div className="inline-flex gap-[3px]">
      {String(entry.score).split('').map((digit, i) => (
        <span key={i} className="flip-tile w-6 h-8 flex items-center justify-center font-data font-black text-sm text-[var(--signal)]">
          {digit}
        </span>
      ))}
    </div>
  </motion.div>
);

export const WeeklyLeaderboard: React.FC = () => {
  const topThree = [
    { rank: 2, name: 'Deepam M', score: 1320 },
    { rank: 1, name: 'Suvanssh', score: 1450 },
    { rank: 3, name: 'Vibhu P.', score: 1280 },
  ];

  const others: LeaderboardEntry[] = [
    { rank: 4, name: 'Sanveer Singh', score: 1250 },
    { rank: 5, name: 'Tanmay Roy', score: 1200 },
    { rank: 6, name: 'Hari P', score: 1180 },
    { rank: 7, name: 'Jayanthi', score: 1150 },
    { rank: 8, name: 'Tanmay Roy', score: 1100 }
  ];

  const podiumHeight: Record<number, string> = { 1: 'h-32', 2: 'h-24', 3: 'h-20' };

  return (
    <PageLayout>
      <div className="flex justify-center py-4 border-b-[3px] border-[var(--ink)] bg-[var(--bone)] sticky top-0 z-50">
        <select className="font-bold font-data text-center appearance-none bg-transparent outline-none cursor-pointer text-sm uppercase tracking-widest">
          <option>WEEK: JUL 14 &ndash; JUL 20 &#9662;</option>
        </select>
      </div>

      <motion.div variants={staggerContainer} initial="hidden" animate="show">
        {/* ---- POSTER (raw) — podium ---- */}
        <motion.div variants={staggerItem} className="poster-block p-4 pt-8 pb-10 relative overflow-hidden">
          <div className="poster-orb w-72 h-72 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
          <div className="halftone opacity-60" />
          <h3 className="poster-type text-center text-lg mb-8 relative z-10">Players</h3>

          <div className="flex justify-center items-end gap-2 relative z-10 max-w-sm mx-auto">
            {topThree.map((player) => (
              <PodiumCard key={player.rank} rank={player.rank} name={player.name} score={player.score} height={podiumHeight[player.rank]} />
            ))}
          </div>
        </motion.div>

        {/* ---- NEUMORPHIC (soft) — full standings ---- */}
        <div className="neu-section p-4 md:p-8 space-y-3">
          {others.map((player) => (
            <ScoreRow key={player.rank} entry={player} />
          ))}
        </div>
      </motion.div>
    </PageLayout>
  );
};