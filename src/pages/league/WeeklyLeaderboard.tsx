import React from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { User as UserIcon } from 'lucide-react';
import type { LeaderboardEntry } from '../../types';

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
    { rank: 8, name: 'Tanmay Roy', score: 1100 },
    { rank: 9, name: 'Sreekanth', score: 1070 },
  ];

  const podiumHeight: Record<number, string> = { 1: 'h-32', 2: 'h-24', 3: 'h-20' };

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center py-4 border-b-[3px] border-[var(--ink)] bg-[var(--bone)]">
          <select className="font-bold font-data text-center appearance-none bg-transparent outline-none cursor-pointer text-sm">
            <option>WEEK: JUL 14 &ndash; JUL 20 &#9662;</option>
          </select>
        </div>

        <div className="p-4 md:p-8 border-b-[3px] border-[var(--ink)] bg-[var(--bone)] relative overflow-hidden">
          {/* Ambient glow behind the podium - the "light source inside a hard object" morphism cue */}
          <div className="glow-signal w-72 h-72 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          <h3 className="text-center font-black uppercase text-sm tracking-widest mb-8 relative z-10">Players</h3>

          <div className="flex justify-center items-end gap-4 md:gap-8 relative z-10 max-w-md md:max-w-xl mx-auto">
            {topThree.map((player) => (
              <div key={player.rank} className={`flex flex-col items-center w-1/3 ${player.rank === 1 ? 'mb-4' : ''}`}>
                <div className="relative mb-2">
                  {player.rank === 1 && (
                    <div className="glow-signal w-16 h-16 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  )}
                  {/* Frosted glass ring - soft accent, avatar frame itself stays hard-edged */}
                  <div className="absolute -inset-1.5 rounded-full glass-panel brutal-border" />
                  <div className="w-12 h-12 brutal-border bg-white flex items-center justify-center relative brutal-shadow-sm rounded-full">
                    <UserIcon size={22} />
                  </div>
                </div>
                <p className="font-bold text-sm text-center w-full truncate">{player.name}</p>
                <p className="font-data font-bold text-sm text-[var(--signal)]">{player.score}</p>
                <div
                  className={`ghost-numeral ${podiumHeight[player.rank]} w-full flex items-end justify-center text-6xl brutal-border border-b-0 bg-white/40 mt-2`}
                >
                  {player.rank}
                </div>
              </div>
            ))}
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-[3px] border-[var(--ink)] bg-[var(--bone)]">
              <th className="py-3 px-4 font-black uppercase text-xs tracking-widest w-12">#</th>
              <th className="py-3 px-4 font-black uppercase text-xs tracking-widest">Name</th>
              <th className="py-3 px-4 font-black uppercase text-xs tracking-widest text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {others.map((player) => (
              <tr key={player.rank} className="border-b-[3px] border-black/10 hover:bg-[var(--signal-soft)] transition-colors">
                <td className="py-3 px-4 font-data font-bold">{String(player.rank).padStart(2, '0')}</td>
                <td className="py-3 px-4 font-bold">{player.name}</td>
                <td className="py-3 px-4 font-data font-bold text-right">{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
};