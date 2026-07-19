import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../../components/layout/PageLayout';
import { ChevronDown, Crown, TrendingUp, TrendingDown, Minus, Sparkles } from 'lucide-react';
import { weeklyMatches } from '../../data/mockScores';
import { COMPETITION_CONFIG, type ScoringTrack } from '../../types';

/* =======================================================================
   ANIMATION VARIANTS (Premium Spring Physics)
   ======================================================================= */
const springTransition = { type: 'spring', damping: 22, stiffness: 120 };
const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: springTransition },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

/* =======================================================================
   UTILITY & TEXTURES
   ======================================================================= */
// Premium SVG Noise overlay for tactile paper feel
const NOISE_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`;

// Deterministic mock data generator for trends/avatars based on name
const getPlayerMeta = (name: string, rank: number) => {
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  const seed = name.length + rank;
  const trendMap = ['up', 'same', 'down', 'new'];
  return {
    initials,
    trend: rank === 1 ? 'same' : trendMap[seed % 4] as 'up' | 'down' | 'same' | 'new',
    trendVal: seed % 5 + 1
  };
};

/* =======================================================================
   COMPONENTS
   ======================================================================= */
const MechanicalScore: React.FC<{ score: number, size?: 'sm' | 'lg' }> = ({ score, size = 'lg' }) => {
  const digits = Math.max(0, score).toString().padStart(2, '0').split('');
  return (
    <div className="flex gap-[2px]">
      {digits.map((digit, i) => (
        <div key={i} className={`relative bg-[#121212] flex items-center justify-center rounded-[4px] border border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_2px_4px_rgba(0,0,0,0.2)] overflow-hidden ${size === 'lg' ? 'w-7 h-10 sm:w-9 sm:h-12' : 'w-5 h-7'}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-black shadow-[0_1px_0_rgba(255,255,255,0.1)] z-10" />
          <span className={`font-data font-black text-white relative z-0 ${size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-sm'}`}>
            {digit}
          </span>
        </div>
      ))}
    </div>
  );
};

const TrendIndicator: React.FC<{ trend: string, val: number }> = ({ trend, val }) => {
  if (trend === 'up') return <div className="flex items-center gap-0.5 text-[#8FCB7E] bg-[#8FCB7E]/10 px-1.5 py-0.5 rounded-sm"><TrendingUp size={12} strokeWidth={3} /><span className="text-[10px] font-black">{val}</span></div>;
  if (trend === 'down') return <div className="flex items-center gap-0.5 text-[#E8785A] bg-[#E8785A]/10 px-1.5 py-0.5 rounded-sm"><TrendingDown size={12} strokeWidth={3} /><span className="text-[10px] font-black">{val}</span></div>;
  if (trend === 'new') return <div className="text-[9px] font-black uppercase text-[#F0C94A] tracking-wider bg-[#F0C94A]/10 px-1.5 py-0.5 rounded-sm">New</div>;
  return <div className="text-black/20"><Minus size={14} strokeWidth={3} /></div>;
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

    return sorted.map((player, index) => ({
      ...player,
      rank: index + 1,
      ...getPlayerMeta(player.name, index + 1)
    }));
  }, [activeTrack, activeWeek]);

  // Construct true physical podium: [2nd, 1st, 3rd]
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
      <div className="min-h-screen bg-[#FAF9F6] relative overflow-hidden" style={{ backgroundImage: NOISE_TEXTURE }}>
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-12 pb-24 sm:pt-16 sm:pb-32 px-4 flex flex-col items-center overflow-hidden bg-[#121212] text-[#FAF9F6] torn-bottom">
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8Y2lyY2xlIGN4PSI0IiBjeT0iNCIgcj0iMSIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4=')] mix-blend-screen" />
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-[#2962FF]/40 to-[#2962FF]/0 blur-3xl pointer-events-none" 
          />
          <motion.div 
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }} 
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-0 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#E07A5F]/30 to-transparent blur-3xl pointer-events-none" 
          />
          
          <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center">
            <span className="font-data font-black text-[10px] tracking-[0.3em] uppercase mb-4 text-white/50 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-md">
              Global Rankings
            </span>
            <h1 className="font-black text-5xl sm:text-6xl text-center leading-[0.9] tracking-tighter mb-8 emboss-dark">
              WEEKLY<br/>LEADERBOARD
            </h1>

            {/* Glassmorphic Week Selector */}
            <div className="relative w-56 h-14 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl flex items-center justify-between px-5 hover:bg-white/10 transition-colors cursor-pointer group">
              <select
                value={activeWeek}
                onChange={(e) => setActiveWeek(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              >
                {Object.keys(weeklyMatches).map((w) => (
                  <option key={w} value={w}>Gameweek {w}</option>
                ))}
              </select>
              <span className="font-bold text-sm uppercase tracking-widest relative z-10 group-hover:text-[#F0C94A] transition-colors">
                Gameweek {activeWeek}
              </span>
              <ChevronDown size={16} className="text-white/50 relative z-10 group-hover:text-white transition-colors" />
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-2 sm:px-6 relative z-20 -mt-16">
          
          {/* ================= TRACK SELECTOR ================= */}
          <div className="bg-white/80 backdrop-blur-xl p-1.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white flex max-w-sm mx-auto mb-16 relative">
            {(Object.keys(COMPETITION_CONFIG) as ScoringTrack[]).map((track) => {
              const isActive = activeTrack === track;
              return (
                <button
                  key={track}
                  onClick={() => setActiveTrack(track)}
                  className={`flex-1 py-3.5 px-2 rounded-xl font-black uppercase text-[10px] tracking-widest relative z-10 transition-colors ${isActive ? 'text-white' : 'text-black/40 hover:text-black/70'}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTrack"
                      className="absolute inset-0 bg-[#1A1C23] rounded-xl shadow-md -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {COMPETITION_CONFIG[track].label}
                </button>
              );
            })}
          </div>

          {/* ================= THE PODIUM ================= */}
          <div className="flex items-end justify-center gap-1 sm:gap-4 mb-16 px-1 h-[320px] sm:h-[360px]">
            <AnimatePresence mode="popLayout">
              {podiumDisplay.map((player) => {
                const isFirst = player.rank === 1;
                const isSecond = player.rank === 2;
                
                // Real physical varying heights
                const heightClass = isFirst ? 'h-64 sm:h-72' : isSecond ? 'h-52 sm:h-60' : 'h-44 sm:h-52';
                const medalBg = medalStyles[player.rank as 1|2|3];

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={springTransition}
                    key={`podium-${player.name}-${activeTrack}`}
                    className={`relative w-[32%] sm:w-48 bg-white border border-[#1A1A1A]/5 rounded-t-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex flex-col items-center pt-8 pb-4 px-2 ${heightClass}`}
                  >
                    <div className="absolute inset-0 rounded-t-3xl opacity-[0.03] pointer-events-none" style={{ backgroundImage: NOISE_TEXTURE }} />
                    
                    {/* Glowing Crown for 1st */}
                    {isFirst && (
                      <motion.div 
                        initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: 0 }} transition={{ delay: 0.3, type: 'spring' }}
                        className="absolute -top-12 sm:-top-14 text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.8)] flex flex-col items-center"
                      >
                        <Sparkles size={16} className="absolute -top-4 -right-4 text-[#FFD700]/80 animate-pulse" />
                        <Crown size={40} fill="currentColor" strokeWidth={1} />
                      </motion.div>
                    )}

                    {/* Avatar / Initials */}
                    <div className={`absolute -top-8 sm:-top-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center font-black text-xl sm:text-2xl border-4 border-white shadow-xl ${medalBg}`}>
                      {player.initials}
                    </div>

                    <div className="mt-8 sm:mt-12 flex flex-col items-center text-center w-full">
                      <span className="font-black text-[10px] sm:text-xs text-[#1A1A1A]/40 tracking-widest uppercase mb-1">
                        Rank {player.rank}
                      </span>
                      <h3 className={`font-black uppercase leading-tight truncate w-full px-1 ${isFirst ? 'text-sm sm:text-lg text-[#1A1A1A]' : 'text-xs sm:text-sm text-[#1A1A1A]/80'}`}>
                        {player.name}
                      </h3>
                    </div>

                    <div className="mt-auto flex flex-col items-center">
                      <span className="font-data font-bold text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A]/30 mb-2">Points</span>
                      <MechanicalScore score={player.pts} />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* ================= THE PACK (Ranks 4+) ================= */}
          <div className="relative">
            <div className="flex items-center justify-between px-2 mb-6 border-b-2 border-dashed border-[#1A1A1A]/10 pb-4">
              <h3 className="font-black uppercase text-sm tracking-[0.2em] text-[#1A1A1A]">The Pack</h3>
              <span className="font-data font-bold text-[9px] uppercase tracking-widest text-[#1A1A1A]/40 bg-white px-2 py-1 rounded shadow-sm border border-[#1A1A1A]/5">Pos 4 &mdash; {leaderboardData.length}</span>
            </div>

            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-3 sm:space-y-4 pb-12">
              <AnimatePresence mode="popLayout">
                {theRest.map((player) => (
                  <motion.div
                    layout
                    variants={fadeUpItem}
                    key={`pack-${player.name}-${activeTrack}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="group bg-white rounded-2xl p-3 sm:p-4 flex items-center justify-between border border-[#1A1A1A]/[0.03] shadow-[0_4px_20px_rgba(0,0,0,0.04)] relative overflow-hidden cursor-pointer"
                  >
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply" style={{ backgroundImage: NOISE_TEXTURE }} />
                    
                    {/* Left: Rank & Info */}
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 z-10">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-[#F5F5F0] rounded-xl flex items-center justify-center font-data font-black text-xs sm:text-sm text-[#1A1A1A]/60 shadow-inner border border-white">
                        {String(player.rank).padStart(2, '0')}
                      </div>
                      
                      <div className="flex flex-col min-w-0">
                        <h4 className="font-black uppercase text-xs sm:text-sm text-[#1A1A1A] truncate group-hover:text-[#2962FF] transition-colors">
                          {player.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <TrendIndicator trend={player.trend} val={player.trendVal} />
                        </div>
                      </div>
                    </div>

                    {/* Right: Stats & Mechanical Score */}
                    <div className="flex items-center gap-4 sm:gap-6 shrink-0 z-10">
                      <div className="hidden sm:flex flex-col items-end justify-center">
                        <span className="font-data font-black text-[11px] text-[#1A1A1A]">{player.bas}</span>
                        <span className="font-data font-bold text-[8px] uppercase tracking-widest text-[#1A1A1A]/40">BAs</span>
                      </div>
                      <div className="hidden sm:flex flex-col items-end justify-center">
                        <span className="font-data font-black text-[11px] text-[#1A1A1A]">{player.qelo.toFixed(1)}</span>
                        <span className="font-data font-bold text-[8px] uppercase tracking-widest text-[#1A1A1A]/40">QELO</span>
                      </div>
                      
                      <div className="pl-3 sm:pl-4 border-l border-[#1A1A1A]/10 flex items-center justify-end">
                        <MechanicalScore score={player.pts} size="sm" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </PageLayout>
  );
};