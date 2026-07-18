import React from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '../../components/layout/PageLayout';
import { Clock, Trophy } from 'lucide-react';
import { staggerContainer, staggerItem } from '../../lib/animations';

interface ThreeWayMatch {
  id: string;
  gameNo: string;
  time: string;
  teamA: { name: string; score: number };
  teamB: { name: string; score: number };
  teamC: { name: string; score: number };
}

const MatchCard: React.FC<{ match: ThreeWayMatch; bg: string }> = ({ match, bg }) => {
  const teams = [match.teamA, match.teamB, match.teamC];
  const winner = teams.reduce((prev, current) => (prev.score > current.score ? prev : current));

  return (
    <motion.div variants={staggerItem} className="neu-panel relative overflow-hidden" style={{ background: bg }}>
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="font-data font-black text-xs bg-[var(--ink)] text-white px-2 py-1 rounded-md">
            G-{match.gameNo}
          </div>
          <div className="flex items-center gap-1 text-xs font-data font-black uppercase tracking-widest text-[var(--ink)]/60">
            <Clock size={14} strokeWidth={3} />
            {match.time}
          </div>
        </div>
        <div className="neu-puck bg-white shrink-0">
          <Trophy size={14} className="text-[var(--ink)]" strokeWidth={2.5} />
        </div>
      </div>

      <div className="flex flex-col gap-2 px-4 pb-4">
        {teams.map((team, idx) => {
          const isWinner = team.name === winner.name;
          return (
            <div key={idx} className={`flex justify-between items-center px-3 py-3 rounded-2xl ${isWinner ? 'bg-white' : 'bg-white/40'}`}>
              <span className="font-black uppercase text-sm w-2/3 text-[var(--ink)]">{team.name}</span>
              <span className={`font-data font-black text-xl text-right ${isWinner ? 'text-[var(--signal)]' : 'text-[var(--ink)]/50'}`}>
                {team.score}
              </span>
            </div>
          );
        })}
      </div>

      <div className="text-center font-black uppercase text-[10px] py-2.5 bg-[var(--ink)] text-white tracking-widest">
        Winner: <span className="text-[var(--signal)]">{winner.name}</span>
      </div>
    </motion.div>
  );
};

export const MatchResults: React.FC = () => {
  const matches: ThreeWayMatch[] = [
    {
      id: '1', gameNo: '1001', time: '8:00 PM',
      teamA: { name: 'Above Par', score: 45 },
      teamB: { name: 'Sticky Bong Pudding', score: 30 },
      teamC: { name: 'Smashin\' Bumpkins', score: 25 },
    },
    {
      id: '2', gameNo: '1002', time: '9:00 PM',
      teamA: { name: 'NPAK', score: 50 },
      teamB: { name: 'Potato Eaters', score: 55 },
      teamC: { name: 'The BA of Algiers', score: 20 },
    }
  ];

  const bgs = ['var(--neu-blue)', 'var(--neu-yellow)'];

  return (
    <PageLayout>
      {/* ---- POSTER (raw) — week select ---- */}
      <div className="poster-block flex justify-center py-4 relative overflow-hidden sticky top-0 z-50">
        <div className="halftone opacity-40" />
        <select className="relative z-10 font-bold font-data text-center appearance-none bg-transparent outline-none cursor-pointer text-sm uppercase tracking-widest text-white">
          <option className="text-black">WEEK 1: JUL 14 &ndash; JUL 20 &#9662;</option>
        </select>
      </div>

      {/* ---- NEUMORPHIC (soft) — match cards ---- */}
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="neu-section p-4 md:p-8 space-y-6 max-w-4xl mx-auto">
        {matches.map((match, i) => (
          <MatchCard key={match.id} match={match} bg={bgs[i % bgs.length]} />
        ))}
      </motion.div>
    </PageLayout>
  );
};