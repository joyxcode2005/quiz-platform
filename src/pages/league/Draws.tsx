import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../../components/layout/PageLayout';
import { User, Globe2, ChevronDown } from 'lucide-react';
import { mockDraws, availableWeeks } from '../../data/mockDraws';
import type { WeekDraws } from '../../types';

const springTransition = { type: 'spring', damping: 22, stiffness: 120 };
const fadeUpItem = { hidden: { opacity: 0, scale: 0.98 }, show: { opacity: 1, scale: 1, transition: springTransition } };
const staggerContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const TRACK_OPTIONS = [ { id: 'INDIA', label: 'India Track' }, { id: 'INTL', label: "Int'l Track" } ] as const;

export const Draws: React.FC = () => {
  const [week, setWeek] = useState(7);
  const [league, setLeague] = useState<'INTL' | 'INDIA'>('INDIA'); 
  const current: WeekDraws | undefined = mockDraws.find((w) => w.week === week && w.league === league);

  return (
    <PageLayout>
      <div className="min-h-screen relative flex flex-col w-full">
        <div className="sticky top-0 z-40 bg-[#141414]/80 backdrop-blur-xl px-2 py-3 sm:py-4 border-b border-white/10 flex flex-col gap-3 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
          <div className="flex justify-center">
            <div className="relative w-full max-w-[180px] h-9 bg-white/10 shadow-inner border border-white/10 rounded-full flex items-center justify-between px-4 hover:bg-white/20 transition-colors cursor-pointer group">
              <select value={week} onChange={(e) => setWeek(Number(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20">
                {availableWeeks.map((w) => (<option key={w} value={w}>WEEK {w}</option>))}
              </select>
              <span className="font-data font-black text-[10px] sm:text-xs uppercase tracking-widest relative z-10 group-hover:text-white text-white/90 transition-colors">WEEK {week} DRAWS</span>
              <ChevronDown size={12} className="text-white/60 relative z-10 group-hover:text-white transition-colors" />
            </div>
          </div>

          <div className="bg-white/10 p-1 rounded-lg shadow-sm border border-white/5 flex w-full max-w-[240px] sm:max-w-xs mx-auto relative">
            {TRACK_OPTIONS.map(({ id, label }) => {
              const isActive = league === id;
              return (
                <button key={id} onClick={() => setLeague(id)} className={`flex-1 py-1.5 px-1.5 rounded-md font-black uppercase text-[9px] sm:text-[10px] tracking-widest relative z-10 transition-colors ${isActive ? 'text-black' : 'text-white/50 hover:text-white'}`}>
                  {isActive && <motion.div layoutId="activeDrawsTrack" className="absolute inset-0 bg-[#FF7A1A] rounded-md shadow-md -z-10" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-2 sm:px-6 relative z-20 pt-6 pb-12 w-full">
          <AnimatePresence mode="wait">
            {!current ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-[#141414]/60 backdrop-blur-xl p-8 sm:p-10 text-center rounded-2xl shadow-sm border border-white/10">
                <p className="font-black uppercase text-[10px] sm:text-xs tracking-widest text-white/60 mb-2">Not Published Yet</p>
                <p className="font-bold text-white/90 max-w-sm mx-auto text-xs sm:text-sm leading-relaxed">Draws for Week {week} haven&apos;t gone up yet.</p>
              </motion.div>
            ) : (
              <motion.div key="table" variants={staggerContainer} initial="hidden" animate="show" className="w-full overflow-x-hidden">
                <table className="w-full text-left border-separate table-fixed" style={{ borderSpacing: '0 5px' }}>
                  <thead>
                    <tr className="text-[8px] sm:text-[9px] uppercase font-black text-white/40 tracking-widest">
                      <th className="px-2 pb-1 w-10 sm:w-14 text-center">G#</th>
                      <th className="px-2 pb-1 pl-2 sm:pl-3">Seats</th>
                    </tr>
                  </thead>
                  <tbody>
                    {current.games.map((game) => (
                      <motion.tr variants={fadeUpItem} key={game.gameNo} className="group">
                        <td className="p-1 text-center align-middle bg-[#141414]/60 backdrop-blur-xl border-y border-l border-white/10 rounded-l-lg shadow-[0_4px_15px_rgb(0,0,0,0.3)]">
                          <div className="flex items-center justify-center">
                            <span style={{ writingMode: 'vertical-rl' }} className="rotate-180 sm:rotate-0 sm:writing-none font-data font-black text-[9px] sm:text-[10px] bg-white/10 text-white/90 border border-white/20 px-1 sm:px-1.5 py-1.5 sm:py-1 rounded shadow-inner">
                              #{game.gameNo}
                            </span>
                          </div>
                        </td>
                        <td className="p-1.5 pl-2 sm:pl-3 py-1.5 sm:py-2 bg-[#141414]/60 backdrop-blur-xl border-y border-r border-white/10 rounded-r-lg shadow-[0_4px_15px_rgb(0,0,0,0.3)]">
                          <div className="flex flex-wrap gap-1 sm:gap-1.5">
                            {game.seats.map((seat, i) => {
                              const isOpen = seat.name === 'EMPTY';
                              return (
                                <div key={i} className={`flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-1 sm:py-1.5 rounded text-[8px] sm:text-[10px] transition-all border ${isOpen ? 'bg-transparent border-dashed border-white/20 text-white/40 italic' : 'bg-white/10 shadow-sm font-bold border-white/10 text-white'}`}>
                                  <User size={10} className={isOpen ? 'text-white/20' : 'text-white/60'} />
                                  <span className="whitespace-nowrap">{isOpen ? 'Open Seat' : seat.name}</span>
                                  {seat.country && !isOpen && (
                                    <div className="flex items-center gap-0.5 text-[6px] sm:text-[7px] font-data font-black text-[#FF7A1A] uppercase ml-0.5 sm:ml-1">
                                      <Globe2 size={8} strokeWidth={2.5} />
                                      {seat.country}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageLayout>
  );
};