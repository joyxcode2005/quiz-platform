import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../../components/layout/PageLayout';
import { ChevronDown, Crown, TrendingUp, TrendingDown, Minus, Sparkles } from 'lucide-react';
import { weeklyMatches } from '../../data/mockScores';
import { COMPETITION_CONFIG, type ScoringTrack } from '../../types';

const springTransition = { type: 'spring', damping: 22, stiffness: 120 };
const staggerContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const fadeUpItem = { hidden: { opacity: 0, scale: 0.98 }, show: { opacity: 1, scale: 1, transition: springTransition }, exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } } };

const getPlayerMeta = (name: string, rank: number) => {
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  const seed = name.length + rank;
  const trendMap = ['up', 'same', 'down', 'new'];
  return { initials, trend: rank === 1 ? 'same' : trendMap[seed % 4] as 'up' | 'down' | 'same' | 'new', trendVal: seed % 5 + 1 };
};

const MechanicalScore: React.FC<{ score: number, size?: 'sm' | 'lg' }> = ({ score, size = 'lg' }) => {
  const digits = Math.max(0, score).toString().padStart(2, '0').split('');
  return (
    <div className="flex gap-[1px] sm:gap-[2px]">
      {digits.map((digit, i) => (
        <div key={i} className={`relative bg-[#121212]/80 flex items-center justify-center rounded-[3px] md:rounded-[4px] border border-white/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] overflow-hidden ${size === 'lg' ? 'w-5 h-8 md:w-6 md:h-10' : 'w-4 h-6 md:w-5 md:h-7'}`}>
          <div className="absolute inset-x-0 top-1/2 h-px bg-black/50 shadow-[0_1px_0_rgba(255,255,255,0.1)] z-10" />
          <span className={`font-data font-black text-white relative z-0 ${size === 'lg' ? 'text-lg md:text-2xl' : 'text-xs md:text-sm'}`}>{digit}</span>
        </div>
      ))}
    </div>
  );
};

const TrendIndicator: React.FC<{ trend: string, val: number }> = ({ trend, val }) => {
  if (trend === 'up') return <div className="flex items-center gap-0.5 text-[#FFC800] bg-[#FFC800]/10 px-1 py-0.5 md:px-1.5 md:py-0.5 rounded-sm"><TrendingUp className="w-2.5 h-2.5 md:w-3 md:h-3" strokeWidth={3} /><span className="text-[9px] md:text-[10px] font-black">{val}</span></div>;
  if (trend === 'down') return <div className="flex items-center gap-0.5 text-[#FF4D1C] bg-[#FF4D1C]/10 px-1 py-0.5 md:px-1.5 md:py-0.5 rounded-sm"><TrendingDown className="w-2.5 h-2.5 md:w-3 md:h-3" strokeWidth={3} /><span className="text-[9px] md:text-[10px] font-black">{val}</span></div>;
  if (trend === 'new') return <div className="text-[8px] md:text-[9px] font-black uppercase text-[#FFC800] tracking-wider bg-[#FFC800]/10 px-1 py-0.5 md:px-1.5 md:py-0.5 rounded-sm">New</div>;
  return <div className="text-white/20"><Minus className="w-2.5 h-2.5 md:w-3 md:h-3" strokeWidth={3} /></div>;
};

export const WeeklyLeaderboard: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<ScoringTrack>('india');
  const [activeWeek, setActiveWeek] = useState<number>(1);

  const leaderboardData = useMemo(() => {
    const matchesForWeek = weeklyMatches[activeWeek] || [];
    const trackMatches = matchesForWeek.filter((m) => m.track === activeTrack);
    const sorted = trackMatches.flatMap((m) => m.players).sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.bas !== a.bas) return b.bas - a.bas;
      return b.qelo - a.qelo;
    });
    return sorted.map((player, index) => ({ ...player, rank: index + 1, ...getPlayerMeta(player.name, index + 1) }));
  }, [activeTrack, activeWeek]);

  const topThree = leaderboardData.slice(0, 3);
  const podiumDisplay = [topThree[1], topThree[0], topThree[2]].filter(Boolean);
  const theRest = leaderboardData.slice(3);

  const medalStyles = {
    1: 'bg-gradient-to-br from-[#FFD700] via-[#FDB931] to-[#9F7928] text-black shadow-[0_0_20px_rgba(253,185,49,0.4)]',
    2: 'bg-gradient-to-br from-[#F5F5F5] via-[#C0C0C0] to-[#808080] text-black',
    3: 'bg-gradient-to-br from-[#FFBCAAA] via-[#CD7F32] to-[#8D5524] text-white',
  };

  return (
    <PageLayout>
      <div className="min-h-screen relative flex flex-col w-full text-white">
        <section className="relative pt-6 pb-8 md:pt-10 md:pb-10 px-4 flex flex-col items-center z-20">
          <div className="relative z-10 w-full max-w-md md:max-w-2xl mx-auto flex flex-col items-center">
            <span className="font-data font-black text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-2 md:mb-3 text-white/60 border border-white/20 px-3 py-1 md:px-4 md:py-1 rounded-full backdrop-blur-md">
              Global Rankings
            </span>
            <h1 className="font-black text-3xl sm:text-5xl md:text-5xl text-center leading-[0.9] tracking-tighter mb-4 md:mb-5 drop-shadow-md uppercase">
              Weekly<br/>Leaderboard
            </h1>
            <div className="relative w-52 md:w-56 h-10 bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-xl flex items-center justify-between px-4 hover:bg-white/20 transition-colors cursor-pointer group">
              <select value={activeWeek} onChange={(e) => setActiveWeek(Number(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20">
                {Object.keys(weeklyMatches).map((w) => (<option key={w} value={w}>Gameweek {w}</option>))}
              </select>
              <span className="font-bold text-xs md:text-sm uppercase tracking-widest relative z-10 group-hover:text-white text-white/90 transition-colors">Gameweek {activeWeek}</span>
              <ChevronDown className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/60 relative z-10 group-hover:text-white transition-colors" />
            </div>
          </div>
        </section>

        <div className="max-w-[1400px] mx-auto px-2 sm:px-4 md:px-6 relative z-20 pt-2 w-full pb-12">
          <div className="bg-[#141414]/60 backdrop-blur-xl p-1 rounded-xl shadow-sm border border-white/10 flex max-w-xs md:max-w-sm mx-auto mb-6 md:mb-8 relative">
            {(Object.keys(COMPETITION_CONFIG) as ScoringTrack[]).map((track) => {
              const isActive = activeTrack === track;
              return (
                <button key={track} onClick={() => setActiveTrack(track)} className={`flex-1 py-1.5 md:py-2 px-2 rounded-lg font-black uppercase text-[10px] md:text-[11px] tracking-widest relative z-10 transition-colors ${isActive ? 'text-black' : 'text-white/50 hover:text-white'}`}>
                  {isActive && <motion.div layoutId="activeTrack" className="absolute inset-0 bg-[#FF7A1A] rounded-lg shadow-md -z-10" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                  {COMPETITION_CONFIG[track].label}
                </button>
              );
            })}
          </div>

          <div className="flex items-end justify-center gap-1 sm:gap-4 md:gap-6 mb-8 md:mb-10 px-1 h-[200px] sm:h-[240px] md:h-[260px]">
            <AnimatePresence mode="popLayout">
              {podiumDisplay.map((player) => {
                const isFirst = player.rank === 1;
                const isSecond = player.rank === 2;
                const heightClass = isFirst ? 'h-40 sm:h-52 md:h-60' : isSecond ? 'h-32 sm:h-44 md:h-48' : 'h-28 sm:h-36 md:h-40';
                return (
                  <motion.div layout initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={springTransition} key={`podium-${player.name}-${activeTrack}`} className={`relative w-[32%] sm:w-40 md:w-48 bg-[#141414]/60 backdrop-blur-xl border border-white/10 rounded-t-2xl md:rounded-t-3xl shadow-[0_10px_40px_rgba(0,0,0,0.4)] flex flex-col items-center pt-6 md:pt-10 pb-3 md:pb-5 px-1 md:px-2 ${heightClass}`}>
                    {isFirst && (
                      <motion.div initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: 0 }} transition={{ delay: 0.3, type: 'spring' }} className="absolute -top-10 md:-top-12 text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.8)] flex flex-col items-center">
                        <Sparkles className="absolute -top-3 -right-3 w-3.5 h-3.5 md:w-4 md:h-4 text-[#FFD700]/80 animate-pulse" />
                        <Crown className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" strokeWidth={1} />
                      </motion.div>
                    )}
                    <div className={`absolute -top-6 md:-top-8 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-black text-lg md:text-xl border-2 md:border-[3px] border-[#141414] shadow-lg ${medalStyles[player.rank as 1|2|3]}`}>
                      {player.initials}
                    </div>
                    <div className="mt-6 md:mt-10 flex flex-col items-center text-center w-full">
                      <span className="font-black text-[9px] md:text-[10px] text-white/40 tracking-widest uppercase mb-0.5 md:mb-1">Rank {player.rank}</span>
                      <h3 className={`font-black uppercase leading-tight truncate w-full px-1 ${isFirst ? 'text-xs md:text-sm text-white' : 'text-[9px] md:text-xs text-white/80'}`}>{player.name}</h3>
                    </div>
                    <div className="mt-auto flex flex-col items-center">
                      <span className="font-data font-bold text-[7px] md:text-[8px] uppercase tracking-[0.2em] text-white/40 mb-0.5 md:mb-1">Points</span>
                      <MechanicalScore score={player.pts} />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between px-2 mb-2 md:mb-4 border-b-2 border-dashed border-white/10 pb-1.5 md:pb-2">
              <h3 className="font-black uppercase text-xs md:text-sm tracking-[0.2em] text-white">The Pack</h3>
              <span className="font-data font-bold text-[8px] md:text-[9px] uppercase tracking-widest text-white/60 bg-white/5 px-1.5 py-0.5 md:px-2 md:py-1 rounded shadow-sm border border-white/10">Pos 4 &mdash; {leaderboardData.length}</span>
            </div>

            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="w-full overflow-x-hidden">
              <table className="w-full text-left border-separate table-fixed" style={{ borderSpacing: '0 4px' }}>
                <thead>
                  <tr className="text-[8px] md:text-[9px] uppercase font-black text-white/40 tracking-widest">
                    <th className="px-2 pb-1 md:pb-2 w-10 md:w-14 text-center">#</th>
                    <th className="px-2 pb-1 md:pb-2">Player</th>
                    <th className="px-2 pb-1 md:pb-2 text-right hidden sm:table-cell w-14 md:w-20">BAs</th>
                    <th className="px-2 pb-1 md:pb-2 text-right hidden sm:table-cell w-16 md:w-20">QELO</th>
                    <th className="px-2 pb-1 md:pb-2 text-right w-14 md:w-20">Score</th>
                  </tr>
                </thead>
                <tbody className="md:[&>tr>td]:py-1.5">
                  <AnimatePresence mode="popLayout">
                    {theRest.map((player) => (
                      <motion.tr layout variants={fadeUpItem} key={`pack-${player.name}-${activeTrack}`} className="group">
                        <td className="p-1 md:p-1.5 text-center bg-[#141414]/60 backdrop-blur-xl border-y border-l border-white/10 rounded-l-lg shadow-[0_4px_15px_rgb(0,0,0,0.3)]">
                          <div className="mx-auto w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center font-data font-black text-[9px] md:text-[10px] bg-white/10 text-white/90 border border-white/20">
                            {String(player.rank).padStart(2, '0')}
                          </div>
                        </td>
                        <td className="p-1.5 md:p-2 min-w-0 bg-[#141414]/60 backdrop-blur-xl border-y border-white/10">
                          <div className="flex flex-col min-w-0">
                            <h4 className="font-black uppercase text-[10px] md:text-xs text-white truncate group-hover:text-[#FF7A1A] transition-colors">{player.name}</h4>
                            <div className="mt-0.5 md:mt-1 flex items-center gap-1.5">
                              <TrendIndicator trend={player.trend} val={player.trendVal} />
                              <div className="sm:hidden flex items-center gap-1 text-[7px] font-data font-bold text-white/40 uppercase tracking-widest border-l border-white/10 pl-1.5">
                                <span>{player.bas} BA</span> &middot; <span>{player.qelo.toFixed(1)} QL</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-1.5 md:p-2 text-right hidden sm:table-cell bg-[#141414]/60 backdrop-blur-xl border-y border-white/10">
                          <span className="font-data font-black text-[10px] md:text-[11px] text-white/70">{player.bas}</span>
                        </td>
                        <td className="p-1.5 md:p-2 text-right hidden sm:table-cell bg-[#141414]/60 backdrop-blur-xl border-y border-white/10">
                          <span className="font-data font-black text-[10px] md:text-[11px] text-white/70">{player.qelo.toFixed(1)}</span>
                        </td>
                        <td className="p-1.5 md:p-2 text-right pr-2 md:pr-4 bg-[#141414]/60 backdrop-blur-xl border-y border-r border-white/10 rounded-r-lg shadow-[0_4px_15px_rgb(0,0,0,0.3)]">
                          <span className="font-data font-black text-[10px] md:text-[11px] bg-white/20 text-white px-1.5 md:px-2 py-0.5 rounded shadow-inner">{player.pts}</span>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};