import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../../components/layout/PageLayout';
import { Trophy } from 'lucide-react';
import { staggerContainer, staggerItem } from '../../lib/animations';

interface TeamEntry {
  rank: number;
  team: string;
  players: string;
  points: number;
}

export const SeasonalLeaderboard: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<'intl' | 'india'>('intl');

  const intlTeams: TeamEntry[] = [
    { rank: 1, team: '2 peas', players: 'Anagha K H, Sharon Thomas', points: 0.0 },
    { rank: 2, team: 'Above Par', players: 'Param Nagda, Parvati Abdulpurkar', points: 0.0 },
    { rank: 3, team: 'Anuraja', players: 'Anuradha, Raja Balasubramanian', points: 0.0 },
    { rank: 4, team: 'Area Boys', players: 'Hem Maradia, Varun Murthy', points: 0.0 },
    { rank: 5, team: 'Bai-Bai Lob', players: 'Nikhil Soneja, Vinoo Sanjay', points: 0.0 },
  ];

  const indiaTeams: TeamEntry[] = [
    { rank: 1, team: 'Aaj Kuch Chazzy...', players: 'Siddhant Agarwal, Saswata Acharya', points: 0.0 },
    { rank: 2, team: 'Aaramball', players: 'Krittibas Majumdar, Mayank Aggarwal', points: 0.0 },
    { rank: 3, team: 'Adalat with Raj...', players: 'Raja Sri Charan, Shashank Sharma', points: 0.0 },
    { rank: 4, team: 'Airport Alliance', players: 'Abhinav Dasgupta, Suvajit Chakraborty', points: 0.0 },
    { rank: 5, team: 'AJPJ', players: 'Aditi Jain, Poorvaja Prakash', points: 0.0 },
  ];

  const teams = activeTrack === 'intl' ? intlTeams : indiaTeams;

  const medal = (rank: number) => (rank === 1 ? 'var(--neu-yellow)' : rank === 2 ? '#c9c9d4' : rank === 3 ? 'var(--neu-coral)' : null);

  return (
    <PageLayout>
      {/* ---- POSTER (raw) — track tabs + trophy header ---- */}
      <div className="poster-block relative overflow-hidden">
        <div className="halftone opacity-50" />
        <div className="flex border-b-[3px] border-white/20 sticky top-0 z-50 relative">
          {(['intl', 'india'] as const).map((track) => (
            <button
              key={track}
              className={`flex-1 py-4 font-black uppercase text-sm tracking-widest text-center transition-colors relative ${
                track === 'intl' ? 'border-r-[3px] border-r-white/20' : ''
              } ${activeTrack === track ? 'bg-[var(--signal)] text-white' : 'text-white/60 hover:text-white'}`}
              onClick={() => setActiveTrack(track)}
            >
              {track === 'intl' ? 'Intl Track' : 'India Track'}
            </button>
          ))}
        </div>

        <motion.div variants={staggerItem} initial="hidden" animate="show" className="p-6 md:p-8 flex items-center gap-4 relative z-10 max-w-4xl mx-auto">
          <div className="p-3 bg-white brutal-border brutal-shadow-sm shrink-0" style={{ borderColor: 'var(--bone)' }}>
            <Trophy size={28} strokeWidth={2} className="text-[var(--ink)]" />
          </div>
          <div>
            <h2 className="poster-type text-2xl">Season 3<br />Standings</h2>
            <p className="font-data font-bold text-xs uppercase tracking-widest text-white/50 mt-1">FLQL Smashdown</p>
          </div>
        </motion.div>
      </div>

      {/* ---- NEUMORPHIC (soft) — standings table ---- */}
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="neu-section max-w-4xl mx-auto w-full p-4 md:p-8 space-y-3">
        <AnimatePresence mode="popLayout">
          {teams.map((team) => {
            const m = medal(team.rank);
            return (
              <motion.div
                layout
                key={`${activeTrack}-${team.rank}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                className="neu-inset flex items-center gap-4 p-4"
              >
                <div className="neu-puck bg-white shrink-0 relative" style={m ? { boxShadow: `4px 4px 10px var(--neu-shadow-dark), -4px -4px 10px var(--neu-shadow-light), 0 0 0 2px ${m}` } : undefined}>
                  <span className="font-data font-black text-[var(--ink)]/60 text-xs">{String(team.rank).padStart(2, '0')}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-black uppercase text-sm leading-tight text-[var(--ink)] truncate">{team.team}</div>
                  <div className="text-[10px] font-data font-bold text-[var(--ink)]/50 uppercase mt-0.5 truncate">
                    {team.players}
                  </div>
                </div>
                <span className="font-data font-black text-[var(--signal)] text-lg shrink-0">
                  {team.points.toFixed(1)}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </PageLayout>
  );
};