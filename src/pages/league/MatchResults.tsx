import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../../components/layout/PageLayout';
import { ChevronDown, Trophy } from 'lucide-react';
import { weeklyMatches } from '../../data/mockScores';
import { type ScoringTrack } from '../../types';

const springTransition = { type: 'spring', damping: 22, stiffness: 120 };
const staggerContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const TRACK_OPTIONS = [ { id: 'india', label: 'India Track' }, { id: 'intl', label: "Int'l Track" } ] as const;
const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

export const MatchResults: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<ScoringTrack>('india');
  const [activeWeek, setActiveWeek] = useState<number>(1);
  const matchesForWeek = weeklyMatches[activeWeek] || [];
  const currentMatches = matchesForWeek.filter(m => m.track === activeTrack);

  return (
    <PageLayout>
      <div className="min-h-screen relative flex flex-col w-full">
        <section className="relative pt-8 pb-10 sm:pt-12 sm:pb-14 px-4 flex flex-col items-center text-[#FAF9F6] z-20">
          <div className="w-full max-w-md mx-auto flex flex-col items-center">
            <span className="font-data font-black text-[9px] tracking-[0.3em] uppercase mb-3 text-white/60 border border-white/20 px-3 py-1 rounded-full backdrop-blur-md">
              Room Scores
            </span>
            <h1 className="font-black text-3xl sm:text-5xl text-center leading-[0.9] tracking-tighter mb-5 emboss-dark">
              MATCH<br/>RESULTS
            </h1>
            <div className="relative w-52 h-10 bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-xl flex items-center justify-between px-4 hover:bg-white/20 transition-colors cursor-pointer group">
              <select value={activeWeek} onChange={(e) => setActiveWeek(Number(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20">
                {Object.keys(weeklyMatches).map((w) => (<option key={w} value={w}>Gameweek {w}</option>))}
              </select>
              <span className="font-bold text-xs uppercase tracking-widest relative z-10 group-hover:text-white text-white/90 transition-colors">Gameweek {activeWeek}</span>
              <ChevronDown size={14} className="text-white/60 relative z-10 group-hover:text-white transition-colors" />
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-2 sm:px-6 pb-12 w-full z-20">
          <div className="bg-[#141414]/60 backdrop-blur-xl p-1 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.4)] border border-white/10 flex w-full max-w-xs mx-auto mb-6 relative">
            {TRACK_OPTIONS.map(({ id, label }) => {
              const isActive = activeTrack === id;
              return (
                <button key={id} onClick={() => setActiveTrack(id as ScoringTrack)} className={`flex-1 py-1.5 px-2 rounded-lg font-black uppercase text-[10px] sm:text-xs tracking-widest relative z-10 transition-colors ${isActive ? 'text-black' : 'text-white/50 hover:text-white'}`}>
                  {isActive && <motion.div layoutId="activeMatchTrack" className="absolute inset-0 bg-[#FF7A1A] rounded-lg shadow-md -z-10" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                  {label}
                </button>
              );
            })}
          </div>

          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col gap-4 w-full">
            <div className="flex items-center text-[9px] sm:text-[10px] uppercase font-black text-white/40 tracking-widest w-full px-1">
              <div className="w-8 sm:w-14 text-center shrink-0">M#</div>
              <div className="flex-1 pl-3 sm:pl-4">Player</div>
              <div className="w-16 text-right hidden sm:block shrink-0">BAs</div>
              <div className="w-16 sm:w-20 text-right pr-3 sm:pr-4 shrink-0">Score</div>
            </div>

            <AnimatePresence mode="popLayout">
              {currentMatches.map((match) => {
                const sortedPlayers = [...match.players].sort((a, b) => {
                  if (b.pts !== a.pts) return b.pts - a.pts;
                  if (b.bas !== a.bas) return b.bas - a.bas;
                  return b.qelo - a.qelo;
                });
                const topScore = sortedPlayers[0].pts;

                return (
                  <motion.div layout initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} key={`${activeWeek}-${match.matchId}`} className="bg-[#141414]/60 backdrop-blur-xl rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.4)] border border-white/10 overflow-hidden">
                    <table className="w-full text-left border-collapse table-fixed">
                      <tbody>
                        {sortedPlayers.map((player, idx) => {
                          const isWinner = player.pts === topScore && player.pts > 0;
                          const isLast = idx === sortedPlayers.length - 1;
                          return (
                            <tr key={`${match.matchId}-${player.name}`} className={`transition-colors ${isWinner ? 'bg-[#FFC800]/20' : 'hover:bg-white/5'} ${!isLast ? 'border-b border-white/5' : ''}`}>
                              {idx === 0 && (
                                <td rowSpan={sortedPlayers.length} className="w-8 sm:w-14 border-r border-white/5 text-center align-middle bg-white/5">
                                  <div className="flex items-center justify-center h-full min-h-[3.5rem]">
                                    <span style={{ writingMode: 'vertical-rl' }} className="rotate-180 sm:rotate-0 sm:writing-none font-data font-black text-[10px] bg-white/20 text-white px-1 sm:px-2 py-2 sm:py-1 rounded shadow-inner tracking-widest sm:tracking-normal">
                                      M-{match.matchId}
                                    </span>
                                  </div>
                                </td>
                              )}
                              <td className="p-1.5 sm:p-2 pl-3 sm:pl-4 min-w-0">
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <div className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 rounded-full flex items-center justify-center font-data font-black text-[8px] sm:text-[9px] shadow-sm ${isWinner ? 'bg-[#FFD700] text-black' : 'bg-white/10 text-white/50'}`}>
                                    {isWinner ? <Trophy size={8} strokeWidth={2.5} /> : getInitials(player.name)}
                                  </div>
                                  <div className="flex flex-col min-w-0 truncate">
                                    <span className={`font-black uppercase text-[10px] sm:text-xs truncate ${isWinner ? 'text-white' : 'text-white/80'}`}>{player.name}</span>
                                    <span className="sm:hidden text-[8px] font-data font-bold text-white/40 uppercase tracking-widest mt-[1px]">{player.bas} BAs</span>
                                  </div>
                                </div>
                              </td>
                              <td className="p-1.5 sm:p-2 text-right hidden sm:table-cell w-16">
                                <span className="font-data font-black text-[11px] sm:text-xs text-white/60">{player.bas}</span>
                              </td>
                              <td className="p-1.5 sm:p-2 text-right pr-3 sm:pr-4 w-16 sm:w-20">
                                <span className={`font-data font-black text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded border ${isWinner ? 'bg-[#FFD700] text-black border-transparent' : 'bg-white/10 text-white border-white/10 shadow-sm'}`}>{player.pts}</span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
};