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
      <div className="min-h-screen relative flex flex-col w-full text-white">
        <div className="sticky top-0 z-40 bg-[#141414]/80 backdrop-blur-xl px-2 md:px-6 py-3 md:py-4 border-b border-white/10 flex flex-col gap-3 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
          <div className="flex justify-center">
            <div className="relative w-full max-w-[180px] md:max-w-[200px] h-9 md:h-10 bg-white/10 shadow-inner border border-white/10 rounded-full flex items-center justify-between px-4 hover:bg-white/20 transition-colors cursor-pointer group">
              <select value={week} onChange={(e) => setWeek(Number(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20">
                {availableWeeks.map((w) => (<option key={w} value={w}>WEEK {w}</option>))}
              </select>
              <span className="font-data font-black text-[10px] md:text-[11px] uppercase tracking-widest relative z-10 group-hover:text-white text-white/90 transition-colors">WEEK {week} DRAWS</span>
              <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-white/60 relative z-10 group-hover:text-white transition-colors" />
            </div>
          </div>

          <div className="bg-white/10 p-1 md:p-1.5 rounded-lg md:rounded-xl shadow-sm border border-white/5 flex w-full max-w-[240px] sm:max-w-xs md:max-w-sm mx-auto relative">
            {TRACK_OPTIONS.map(({ id, label }) => {
              const isActive = league === id;
              return (
                <button key={id} onClick={() => setLeague(id)} className={`flex-1 py-1.5 md:py-2 px-1.5 md:px-2 rounded-md font-black uppercase text-[9px] md:text-[10px] tracking-widest relative z-10 transition-colors ${isActive ? 'text-black' : 'text-white/50 hover:text-white'}`}>
                  {isActive && <motion.div layoutId="activeDrawsTrack" className="absolute inset-0 bg-[#FF7A1A] rounded-md shadow-md -z-10" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-2 sm:px-4 md:px-6 relative z-20 pt-6 md:pt-8 pb-12 w-full">
          <AnimatePresence mode="wait">
            {!current ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-[#141414]/60 backdrop-blur-xl p-8 md:p-12 text-center rounded-2xl md:rounded-3xl shadow-sm border border-white/10">
                <p className="font-black uppercase text-[10px] md:text-xs tracking-widest text-white/60 mb-2 md:mb-4">Not Published Yet</p>
                <p className="font-bold text-white/90 max-w-sm md:max-w-xl mx-auto text-xs md:text-sm leading-relaxed">Draws for Week {week} haven&apos;t gone up yet. Check back once they&apos;re released.</p>
              </motion.div>
            ) : (
              <motion.div key="table" variants={staggerContainer} initial="hidden" animate="show" className="w-full overflow-x-hidden">
                <table className="w-full text-left border-separate table-fixed" style={{ borderSpacing: '0 4px' }}>
                  <thead>
                    <tr className="text-[8px] md:text-[10px] uppercase font-black text-white/40 tracking-widest">
                      <th className="px-2 pb-1 md:pb-2 w-10 md:w-16 text-center">G#</th>
                      <th className="px-2 pb-1 md:pb-2 pl-2 md:pl-4">Seats</th>
                    </tr>
                  </thead>
                  <tbody className="md:[&>tr>td]:py-1.5">
                    {current.games.map((game) => (
                      <motion.tr variants={fadeUpItem} key={game.gameNo} className="group">
                        <td className="p-1 md:p-2 text-center align-middle bg-[#141414]/60 backdrop-blur-xl border-y border-l border-white/10 rounded-l-lg md:rounded-l-xl shadow-[0_4px_15px_rgb(0,0,0,0.3)]">
                          <div className="flex items-center justify-center">
                            <span style={{ writingMode: 'vertical-rl' }} className="rotate-180 sm:rotate-0 sm:writing-none font-data font-black text-[9px] md:text-[11px] bg-white/10 text-white/90 border border-white/20 px-1 sm:px-1.5 md:px-2 py-1.5 sm:py-1 md:py-1 rounded shadow-inner">
                              #{game.gameNo}
                            </span>
                          </div>
                        </td>
                        <td className="p-1.5 md:p-2.5 pl-2 md:pl-4 py-1.5 md:py-2 bg-[#141414]/60 backdrop-blur-xl border-y border-r border-white/10 rounded-r-lg md:rounded-r-xl shadow-[0_4px_15px_rgb(0,0,0,0.3)]">
                          <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
                            {game.seats.map((seat, i) => {
                              const isOpen = seat.name === 'EMPTY';
                              return (
                                <div key={i} className={`flex items-center gap-1 md:gap-1.5 px-1.5 md:px-2.5 py-1 md:py-1.5 rounded md:rounded-md text-[8px] md:text-[11px] transition-all border ${isOpen ? 'bg-transparent border-dashed border-white/20 text-white/40 italic' : 'bg-white/10 shadow-sm font-bold border-white/10 text-white'}`}>
                                  <User className={`w-2.5 h-2.5 md:w-3 md:h-3 ${isOpen ? 'text-white/20' : 'text-white/60'}`} />
                                  <span className="whitespace-nowrap">{isOpen ? 'Open Seat' : seat.name}</span>
                                  {seat.country && !isOpen && (
                                    <div className="flex items-center gap-0.5 md:gap-1 text-[6px] md:text-[8px] font-data font-black text-[#FF7A1A] uppercase ml-0.5 md:ml-1.5">
                                      <Globe2 className="w-2 h-2 md:w-2.5 md:h-2.5" strokeWidth={2.5} />
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