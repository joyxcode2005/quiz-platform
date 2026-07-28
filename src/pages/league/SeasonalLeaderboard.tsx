import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../../components/layout/PageLayout';

const springTransition = { type: 'spring', damping: 22, stiffness: 120 } as const;
const staggerContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } } as const;
const fadeUpItem = { hidden: { opacity: 0, scale: 0.98 }, show: { opacity: 1, scale: 1, transition: springTransition }, exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } } } as const;

interface TeamEntry { rank: number; team: string; players: string; points: number; }

export const SeasonalLeaderboard: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<'intl' | 'india'>('intl');

  const intlTeams: TeamEntry[] = [
    { rank: 1, team: '2 peas', players: 'Anagha K H, Sharon Thomas', points: 45.5 },
    { rank: 2, team: 'Above Par', players: 'Param Nagda, Parvati', points: 38.0 },
    { rank: 3, team: 'Anuraja', players: 'Anuradha, Raja Bala', points: 32.5 },
    { rank: 4, team: 'Area Boys', players: 'Hem Maradia, Varun Murthy', points: 28.0 },
    { rank: 5, team: 'Bai-Bai Lob', players: 'Nikhil Soneja, Vinoo Sanjay', points: 19.5 },
  ];
  const indiaTeams: TeamEntry[] = [
    { rank: 1, team: 'Aaj Kuch Chazzy', players: 'Siddhant, Saswata', points: 52.0 },
    { rank: 2, team: 'Aaramball', players: 'Krittibas, Mayank', points: 44.5 },
    { rank: 3, team: 'Adalat with Raj', players: 'Raja Sri Charan, Shashank', points: 41.0 },
    { rank: 4, team: 'Airport Alliance', players: 'Abhinav D, Suvajit', points: 36.5 },
    { rank: 5, team: 'AJPJ', players: 'Aditi Jain, Poorvaja', points: 29.0 },
  ];
  const teams = activeTrack === 'intl' ? intlTeams : indiaTeams;

  const medalStyle = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-br from-[#FFD700] via-[#FDB931] to-[#9F7928] text-black shadow-sm border-none';
    if (rank === 2) return 'bg-gradient-to-br from-[#F5F5F5] via-[#C0C0C0] to-[#808080] text-black shadow-sm border-none';
    if (rank === 3) return 'bg-gradient-to-br from-[#FFBCAAA] via-[#CD7F32] to-[#8D5524] text-white shadow-sm border-none';
    return 'bg-white/10 text-white border border-white/20';
  };

  return (
    <PageLayout>
      <div className="min-h-screen relative flex flex-col w-full text-white">
        <section className="relative pt-8 pb-8 sm:pt-12 sm:pb-10 md:pt-10 md:pb-10 px-4 flex flex-col items-center z-20">
          <div className="relative z-10 w-full max-w-md md:max-w-2xl mx-auto flex flex-col items-center">
            <span className="font-data font-black text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-2 md:mb-3 text-white/60 border border-white/20 px-3 py-1 md:px-4 md:py-1 rounded-full backdrop-blur-md">
              Season 3 Standings
            </span>
            <h1 className="font-black text-3xl sm:text-5xl md:text-5xl text-center leading-[0.9] tracking-tighter mb-4 md:mb-5 drop-shadow-md uppercase">
              TEAM<br/>LEADERBOARD
            </h1>
          </div>
        </section>

        <div className="max-w-[1400px] mx-auto px-2 sm:px-4 md:px-6 relative z-20 pt-2 w-full pb-12">
          <div className="bg-[#141414]/60 backdrop-blur-xl p-1 md:p-1.5 rounded-xl shadow-sm border border-white/10 flex w-full max-w-xs md:max-w-sm mx-auto mb-6 md:mb-8 relative">
            {(['india', 'intl'] as const).map((track) => {
              const isActive = activeTrack === track;
              return (
                <button key={track} onClick={() => setActiveTrack(track)} className={`flex-1 py-1.5 md:py-2 px-2 rounded-lg font-black uppercase text-[10px] md:text-[11px] tracking-widest relative z-10 transition-colors ${isActive ? 'text-black' : 'text-white/50 hover:text-white'}`}>
                  {isActive && <motion.div layoutId="activeSeasonTrack" className="absolute inset-0 bg-[#FF7A1A] rounded-lg shadow-md -z-10" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                  {track === 'intl' ? "Int'l Track" : "India Track"}
                </button>
              );
            })}
          </div>

          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="w-full overflow-x-hidden">
            <table className="w-full text-left border-separate table-fixed" style={{ borderSpacing: '0 4px' }}>
              <thead>
                <tr className="text-[8px] md:text-[10px] uppercase font-black text-white/40 tracking-widest">
                  <th className="px-2 pb-1 md:pb-2 w-10 md:w-14 text-center">Rank</th>
                  <th className="px-2 pb-1 md:pb-2">Team</th>
                  <th className="px-2 pb-1 md:pb-2 hidden sm:table-cell">Players</th>
                  <th className="px-2 pb-1 md:pb-2 text-right w-14 md:w-24">Points</th>
                </tr>
              </thead>
              <tbody className="md:[&>tr>td]:py-2">
                <AnimatePresence mode="popLayout">
                  {teams.map((team) => (
                    <motion.tr layout variants={fadeUpItem} key={`${activeTrack}-${team.rank}`} className="group">
                      <td className="p-1 md:p-2 text-center bg-[#141414]/60 backdrop-blur-xl border-y border-l border-white/10 rounded-l-lg md:rounded-l-xl shadow-[0_4px_15px_rgb(0,0,0,0.3)]">
                        <div className={`mx-auto w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center font-data font-black text-[9px] md:text-[11px] ${medalStyle(team.rank)}`}>
                          {team.rank}
                        </div>
                      </td>
                      <td className="p-1.5 md:p-2.5 min-w-0 bg-[#141414]/60 backdrop-blur-xl border-y border-white/10">
                        <div className="flex flex-col min-w-0">
                          <span className="font-black text-[10px] md:text-sm uppercase text-white truncate group-hover:text-[#FF7A1A] transition-colors">{team.team}</span>
                          <span className="sm:hidden text-[8px] font-data font-bold text-white/50 uppercase tracking-widest mt-[1px] truncate">{team.players}</span>
                        </div>
                      </td>
                      <td className="p-1.5 md:p-2.5 text-[9px] md:text-xs font-data font-bold text-white/60 uppercase tracking-wide truncate hidden sm:table-cell bg-[#141414]/60 backdrop-blur-xl border-y border-white/10">
                        {team.players}
                      </td>
                      <td className="p-1.5 md:p-2.5 text-right pr-2 md:pr-4 bg-[#141414]/60 backdrop-blur-xl border-y border-r border-white/10 rounded-r-lg md:rounded-r-xl shadow-[0_4px_15px_rgb(0,0,0,0.3)]">
                        <span className="font-data font-black text-[10px] md:text-xs bg-white/20 text-white px-1.5 md:px-2 py-0.5 rounded shadow-inner">{team.points.toFixed(1)}</span>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
};