import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../../components/layout/PageLayout';
import { ChevronDown, Activity, Trophy, Sparkles } from 'lucide-react';
import { weeklyMatches } from '../../data/mockScores';
import { type ScoringTrack } from '../../types';

const springTransition = { type: 'spring', damping: 22, stiffness: 120 };
const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const NOISE_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`;

const TRACK_OPTIONS = [
  { id: 'india', label: 'India Track' },
  { id: 'intl', label: "Int'l Track" }
] as const;

const MechanicalScore: React.FC<{ score: number, size?: 'sm' | 'lg' }> = ({ score, size = 'sm' }) => {
  const digits = Math.max(0, score).toString().padStart(2, '0').split('');
  return (
    <div className="flex gap-[2px]">
      {digits.map((digit, i) => (
        <div key={i} className={`relative bg-[#121212] flex items-center justify-center rounded-[4px] border border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_2px_4px_rgba(0,0,0,0.2)] overflow-hidden ${size === 'lg' ? 'w-7 h-10' : 'w-5 h-7'}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-black shadow-[0_1px_0_rgba(255,255,255,0.1)] z-10" />
          <span className={`font-data font-black text-white relative z-0 ${size === 'lg' ? 'text-2xl' : 'text-sm'}`}>
            {digit}
          </span>
        </div>
      ))}
    </div>
  );
};

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

export const MatchResults: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<ScoringTrack>('india');
  const [activeWeek, setActiveWeek] = useState<number>(1);

  const matchesForWeek = weeklyMatches[activeWeek] || [];
  const currentMatches = matchesForWeek.filter(m => m.track === activeTrack);

  return (
    <PageLayout>
      <div className="min-h-screen bg-[#FAF9F6] relative overflow-hidden" style={{ backgroundImage: NOISE_TEXTURE }}>
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-12 pb-24 sm:pt-16 sm:pb-32 px-4 flex flex-col items-center overflow-hidden bg-[#121212] text-[#FAF9F6] torn-bottom">
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8Y2lyY2xlIGN4PSI0IiBjeT0iNCIgcj0iMSIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4=')] mix-blend-screen" />
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-[#E07A5F]/40 to-[#E07A5F]/0 blur-3xl pointer-events-none" 
          />
          
          <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center">
            <span className="font-data font-black text-[10px] tracking-[0.3em] uppercase mb-4 text-white/50 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-md">
              Room Scores
            </span>
            <h1 className="font-black text-5xl sm:text-6xl text-center leading-[0.9] tracking-tighter mb-8 emboss-dark">
              MATCH<br/>RESULTS
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
              <span className="font-bold text-sm uppercase tracking-widest relative z-10 group-hover:text-[#E07A5F] transition-colors">
                Gameweek {activeWeek}
              </span>
              <ChevronDown size={16} className="text-white/50 relative z-10 group-hover:text-white transition-colors" />
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-2 sm:px-6 md:px-8 relative z-20 pt-8 sm:pt-12 pb-12">
          
          {/* ================= TRACK SELECTOR ================= */}
          <div className="bg-white p-1.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-black/[0.03] flex w-full max-w-xs mx-auto mb-12 relative">
            {TRACK_OPTIONS.map(({ id, label }) => {
              const isActive = activeTrack === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTrack(id as ScoringTrack)}
                  className={`flex-1 py-3.5 px-2 rounded-xl font-black uppercase text-[10px] sm:text-xs tracking-widest relative z-10 transition-colors ${isActive ? 'text-white' : 'text-black/40 hover:text-black/70'}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeMatchTrack"
                      className="absolute inset-0 bg-[#1A1C23] rounded-xl shadow-md -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {label}
                </button>
              );
            })}
          </div>

          {/* ================= MATCHES GRID ================= */}
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid lg:grid-cols-2 gap-5 sm:gap-6 items-start">
            <AnimatePresence mode="popLayout">
              {currentMatches.map((match, i) => {
                const sortedPlayers = [...match.players].sort((a, b) => {
                  if (b.pts !== a.pts) return b.pts - a.pts;
                  if (b.bas !== a.bas) return b.bas - a.bas;
                  return b.qelo - a.qelo;
                });
                const topScore = sortedPlayers[0].pts;

                return (
                  <motion.div
                    layout
                    key={`${activeWeek}-${match.matchId}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ ...springTransition, delay: i * 0.05 }}
                    className="bg-white flex flex-col overflow-hidden relative rounded-[28px] h-full shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-black/[0.03]"
                  >
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply" style={{ backgroundImage: NOISE_TEXTURE }} />
                    
                    <div className="bg-[#FAF9F6]/80 border-b border-black/[0.05] p-5 flex justify-between items-center relative z-10">
                      <div className="flex items-center gap-2 min-w-0">
                        <Activity size={16} className="text-[#2962FF] shrink-0" strokeWidth={3} />
                        <span className="font-data font-black text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#1A1A1A]/50">Final Scores</span>
                      </div>
                      <div className="h-8 px-3 rounded-lg bg-[#1A1A1A] text-white font-data font-black text-[11px] shadow-inner flex items-center justify-center">
                        M-{match.matchId}
                      </div>
                    </div>

                    <div className="flex flex-col p-4 gap-3 relative z-10 flex-1 justify-center">
                      {sortedPlayers.map((player, idx) => {
                        const isWinner = player.pts === topScore && player.pts > 0;
                        return (
                          <div 
                            key={idx} 
                            className={`flex items-center justify-between p-3 sm:p-4 rounded-2xl transition-all relative overflow-hidden ${
                              isWinner 
                                ? 'bg-gradient-to-r from-[#F0C94A]/10 to-transparent border border-[#F0C94A]/30 shadow-sm' 
                                : 'bg-[#FAF9F6]/50 border border-black/[0.02]'
                            }`}
                          >
                            {isWinner && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F0C94A]" />}
                            
                            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1 pr-2">
                              <div className={`w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full flex items-center justify-center font-data font-black text-[10px] sm:text-xs shadow-inner ${isWinner ? 'bg-gradient-to-br from-[#FFD700] to-[#9F7928] text-black border-none' : 'bg-[#EAEAEA] text-[#1A1A1A]/50 border border-white'}`}>
                                {isWinner ? <Trophy size={14} strokeWidth={2.5} /> : getInitials(player.name)}
                              </div>
                              
                              <div className="flex flex-col min-w-0">
                                <span className={`font-black uppercase text-xs sm:text-sm truncate ${isWinner ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/70'}`}>
                                  {player.name}
                                </span>
                                {isWinner && (
                                  <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-[#D4AF37] mt-0.5">
                                    <Sparkles size={10} /> Winner
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                              <div className="flex flex-col items-end justify-center">
                                <span className={`font-data font-black text-xs ${isWinner ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/60'}`}>{player.bas}</span>
                                <span className="font-data font-bold text-[8px] uppercase tracking-widest text-[#1A1A1A]/40">BAs</span>
                              </div>
                              <div className="pl-3 sm:pl-4 border-l border-[#1A1A1A]/10 flex items-center justify-end">
                                <MechanicalScore score={player.pts} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
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