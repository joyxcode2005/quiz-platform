import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../../components/layout/PageLayout';
import { User, Globe2, ChevronDown } from 'lucide-react';
import { mockDraws, availableWeeks } from '../../data/mockDraws';
import type { WeekDraws } from '../../types';

const springTransition = { type: 'spring', damping: 22, stiffness: 120 };
const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: springTransition }
};

const NOISE_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`;

const TRACK_OPTIONS = [
  { id: 'INDIA', label: 'India Track' },
  { id: 'INTL', label: "Int'l Track" }
] as const;

export const Draws: React.FC = () => {
  const [week, setWeek] = useState(7);
  const [league, setLeague] = useState<'INTL' | 'INDIA'>('INDIA'); // Defaulting strictly to INDIA

  const current: WeekDraws | undefined = mockDraws.find(
    (w) => w.week === week && w.league === league
  );

  return (
    <PageLayout>
      <div className="min-h-screen bg-[#FAF9F6] relative overflow-hidden" style={{ backgroundImage: NOISE_TEXTURE }}>
        
        {/* Sticky Header Configurator */}
        <div className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-xl px-4 py-4 sm:py-6 border-b border-black/[0.03] flex flex-col gap-4 shadow-sm">
          
          <div className="flex justify-center">
            <div className="relative w-full max-w-[200px] h-10 bg-white shadow-inner border border-black/5 rounded-full flex items-center justify-between px-4 hover:bg-white/80 transition-colors cursor-pointer group">
              <select
                value={week}
                onChange={(e) => setWeek(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              >
                {availableWeeks.map((w) => (
                  <option key={w} value={w}>WEEK {w}</option>
                ))}
              </select>
              <span className="font-data font-black text-xs uppercase tracking-widest relative z-10 group-hover:text-[#2962FF] transition-colors text-[#1A1A1A]">
                WEEK {week} DRAWS
              </span>
              <ChevronDown size={14} className="text-[#1A1A1A]/40 relative z-10 group-hover:text-[#2962FF] transition-colors" />
            </div>
          </div>

          <div className="bg-white p-1 rounded-full shadow-[0_4px_15px_rgb(0,0,0,0.04)] border border-black/[0.03] flex w-full max-w-sm mx-auto relative">
            {TRACK_OPTIONS.map(({ id, label }) => {
              const isActive = league === id;
              return (
                <button
                  key={id}
                  onClick={() => setLeague(id)}
                  className={`flex-1 py-2.5 px-2 rounded-full font-black uppercase text-[10px] sm:text-xs tracking-widest relative z-10 transition-colors ${isActive ? 'text-white' : 'text-black/40 hover:text-black/70'}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeDrawsTrack"
                      className="absolute inset-0 bg-[#1A1C23] rounded-full shadow-md -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-8 pb-12">
          <AnimatePresence mode="wait">
            {!current ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white p-10 sm:p-14 text-center rounded-3xl shadow-sm border border-black/[0.03]">
                <p className="font-black uppercase text-xs tracking-widest text-[#1A1A1A]/30 mb-2">
                  Not Published Yet
                </p>
                <p className="font-bold text-[#1A1A1A]/60 max-w-sm mx-auto text-sm sm:text-base leading-relaxed">
                  Draws for Week {week} ({league === 'INTL' ? 'International' : 'India'} League)
                  haven&apos;t gone up yet. Check back once they&apos;re released.
                </p>
              </motion.div>
            ) : (
              <motion.div key="grid" variants={staggerContainer} initial="hidden" animate="show" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {current.games.map((game) => (
                  <motion.div variants={fadeUpItem} key={game.gameNo} className="bg-white flex flex-col justify-between rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-black/[0.02] relative">
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply" style={{ backgroundImage: NOISE_TEXTURE }} />
                    
                    <div className="flex items-center justify-between border-b border-dashed border-[#1A1A1A]/10 px-5 py-4 bg-[#FAF9F6]/50 relative z-10">
                      <span className="font-data text-[9px] font-black text-[#1A1A1A]/40 uppercase tracking-[0.2em]">
                        GAME NO.
                      </span>
                      <span className="font-data font-black text-sm text-[#1A1A1A] bg-[#1A1A1A]/5 px-2 py-0.5 rounded shadow-inner">
                        #{game.gameNo}
                      </span>
                    </div>
                    
                    <div className="flex flex-col gap-2 p-4 relative z-10">
                      {game.seats.map((seat, i) => {
                        const isOpen = seat.name === 'EMPTY';
                        return (
                          <div
                            key={i}
                            className={`flex items-center justify-between gap-3 p-3 rounded-xl text-xs sm:text-sm min-h-[44px] transition-all border ${
                              isOpen ? 'text-[#1A1A1A]/30 italic bg-[#FAF9F6] border-dashed border-[#1A1A1A]/10 shadow-inner' : 'bg-white shadow-sm font-bold border-black/[0.03]'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${isOpen ? 'bg-transparent' : 'bg-[#1A1A1A]/5'}`}>
                                <User size={12} className={isOpen ? 'text-[#1A1A1A]/20' : 'text-[#1A1A1A]/50'} />
                              </div>
                              <span className="truncate">{isOpen ? 'Open Seat' : seat.name}</span>
                            </div>
                            {seat.country && !isOpen && (
                              <div className="flex items-center gap-1 text-[9px] font-data font-black text-[#2962FF] bg-[#2962FF]/10 px-2 py-1 rounded-md shrink-0 uppercase tracking-widest">
                                <Globe2 size={10} strokeWidth={2.5} />
                                {seat.country}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageLayout>
  );
};