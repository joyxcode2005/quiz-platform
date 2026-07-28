import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../../components/layout/PageLayout';
import { Clock, Info, HandMetal, Lock, CheckCircle2 } from 'lucide-react';
import { staggerContainer } from '../../lib/animations';
import { useReaderQueue, type OpenReadGame } from '../../hooks/useReaderQueue';

const springTransition = { type: 'spring', damping: 22, stiffness: 120 } as const;
const fadeUpItem = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: springTransition }, exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } } } as const;

const OpenCard: React.FC<{ match: OpenReadGame; eligible: boolean; onMarkInterested: () => void; }> = ({ match, eligible, onMarkInterested }) => {
  return (
    <motion.div variants={fadeUpItem} className="w-full">
      <div className="bg-[#141414]/60 backdrop-blur-xl flex flex-col p-4 md:p-5 gap-4 md:gap-5 relative overflow-hidden rounded-[28px] md:rounded-3xl shadow-2xl border border-white/10">
        <div className="flex items-center justify-between gap-3 md:gap-4 border-b border-white/10 pb-4 md:pb-4 relative z-10">
          <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
            <div className="h-8 md:h-9 px-3 md:px-4 rounded-lg bg-white/10 text-white font-data font-black text-[11px] md:text-xs shrink-0 shadow-inner flex items-center justify-center border border-white/5">
              G-{match.gameNo}
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-[11px] font-data font-black uppercase tracking-widest text-[#FF7A1A] min-w-0 bg-[#FF7A1A]/10 px-2 py-1 md:px-3 md:py-1 rounded-md border border-[#FF7A1A]/20">
              <Clock className="w-3 h-3 md:w-3.5 md:h-3.5 shrink-0" strokeWidth={3} />
              <span className="truncate">
                {match.date ?? `Week ${match.week}`} {match.time ? `\u00b7 ${match.time}` : ''}
              </span>
            </div>
          </div>
          <span className="font-data font-black text-[9px] md:text-[10px] uppercase tracking-widest text-[#FF4D1C] border border-[#FF4D1C]/30 bg-[#FF4D1C]/10 px-2.5 py-1 md:px-3 md:py-1 rounded-full shadow-sm shrink-0">
            Needed
          </span>
        </div>

        <div className="bg-white/5 flex flex-col p-4 md:p-4 gap-2.5 md:gap-3 relative z-10 rounded-2xl md:rounded-2xl shadow-inner border border-white/5">
          {match.players.map((name, idx) => (
            <div key={idx} className="flex items-center gap-3 md:gap-4 min-w-0">
              <div className="w-6 h-6 md:w-7 md:h-7 shrink-0 bg-white/10 text-white/60 font-data font-black text-[10px] md:text-[11px] shadow-sm rounded-md flex items-center justify-center border border-white/10">
                {idx + 1}
              </div>
              <span className="font-black text-xs md:text-sm uppercase leading-tight truncate flex-1 text-white">
                {name}
              </span>
            </div>
          ))}
        </div>

        {eligible ? (
          <button onClick={onMarkInterested} className="w-full min-h-[48px] md:min-h-[44px] py-3.5 md:py-3 bg-[#FF7A1A] text-[#141414] font-black uppercase text-xs md:text-sm tracking-widest flex items-center justify-center gap-2 relative z-10 transition-colors active:scale-[0.98] hover:bg-[#FF7A1A]/90 rounded-xl md:rounded-xl shadow-[0_0_20px_rgba(255,122,26,0.3)] mt-2 md:mt-3">
            <HandMetal className="w-4 h-4 md:w-4 md:h-4" strokeWidth={2.5} /> Mark as Interested
          </button>
        ) : (
          <div className="w-full min-h-[48px] md:min-h-[44px] py-3.5 md:py-3 flex items-center justify-center gap-2 relative z-10 text-white/50 text-[10px] md:text-[11px] font-black uppercase tracking-widest text-center px-4 rounded-xl border border-dashed border-white/20 mt-2 md:mt-3">
            <Lock className="w-3.5 h-3.5 shrink-0" strokeWidth={2.5} /> <span className="truncate">Play a {match.league} game first</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const InterestToRead: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'open' | 'myinterests'>('open');
  const { openGamesByDay, toRead, canRead, markInterested } = useReaderQueue();

  return (
    <PageLayout>
      <div className="min-h-screen relative flex flex-col w-full text-white">
        <div className="sticky top-0 z-40 bg-[#141414]/80 backdrop-blur-2xl px-2 md:px-6 py-3 sm:py-4 md:py-4 border-b border-white/10 flex flex-col gap-3 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
          <div className="bg-white/10 p-1 md:p-1.5 rounded-lg md:rounded-xl shadow-sm border border-white/5 flex w-full max-w-sm md:max-w-md mx-auto relative">
            {(['open', 'myinterests'] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-1.5 md:py-2 px-2 md:px-3 rounded-md font-black uppercase text-[10px] md:text-[11px] tracking-widest relative z-10 transition-colors ${isActive ? 'text-[#141414]' : 'text-white/50 hover:text-white'}`}>
                  {isActive && <motion.div layoutId="activeInterestTab" className="absolute inset-0 bg-[#FF7A1A] rounded-md shadow-md -z-10" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                  {tab === 'open' ? 'Open Games' : `My Interests (${toRead.length})`}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 max-w-[1600px] mx-auto relative z-20 pb-12 w-full">
          <motion.div variants={fadeUpItem} className="bg-white/5 backdrop-blur-md p-4 sm:p-5 md:p-5 flex gap-3 md:gap-4 items-start border border-white/10 border-l-[4px] md:border-l-[5px] border-l-[#FF4D1C] rounded-2xl shadow-lg">
            <div className="w-10 h-10 md:w-10 md:h-10 shrink-0 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
              <Info className="text-[#FF4D1C] w-[18px] h-[18px]" strokeWidth={2.5} />
            </div>
            <p className="font-data text-[10px] sm:text-[11px] md:text-xs font-bold uppercase tracking-widest leading-relaxed md:leading-relaxed mt-0.5 md:mt-1 text-white/70">
              {activeTab === 'open' ? "Express interest to read games that currently display 'Needed' in the draws sheet. You'll need to have played on a track before you can read for it." : "Games you've expressed interest in. Manage them anytime from My Read Schedule."}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === 'open' ? (
              <motion.div key="open-tab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8 md:space-y-10">
                {openGamesByDay.length === 0 && (
                  <div className="bg-white/5 backdrop-blur-md p-12 md:p-16 text-center rounded-3xl border border-white/10 shadow-lg">
                    <p className="font-black uppercase text-sm md:text-base tracking-widest text-white/40">No open games right now</p>
                  </div>
                )}
                {openGamesByDay.map((group) => (
                  <div key={group.label} className="pt-2 md:pt-4">
                    <h3 className="font-black uppercase text-xs md:text-sm tracking-[0.2em] mb-4 md:mb-5 px-2 text-white/80 border-l-2 md:border-l-4 border-[#FF7A1A] pl-3 md:pl-4">
                      {group.label}
                    </h3>
                    <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {group.games.map((match) => (
                        <OpenCard key={match.gameNo} match={match} eligible={canRead(match.league)} onMarkInterested={() => markInterested(match)} />
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div key="interests-tab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {toRead.length === 0 && (
                  <div className="bg-white/5 backdrop-blur-md p-12 md:p-16 text-center rounded-3xl col-span-full border border-white/10 shadow-lg">
                    <p className="font-black uppercase text-sm md:text-base tracking-widest text-white/40">No interests yet — pick a game from Open Games</p>
                  </div>
                )}
                {toRead.map((match) => (
                  <motion.div variants={fadeUpItem} key={match.gameNo} className="bg-[#141414]/60 backdrop-blur-xl flex items-center justify-between gap-3 md:gap-4 p-5 md:p-6 rounded-2xl shadow-xl border border-white/10">
                    <div className="flex items-center gap-4 md:gap-4 min-w-0 flex-1">
                      <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-[#FFC800]/20 border border-[#FFC800]/30 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="text-[#FFC800] w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-black uppercase text-sm md:text-base text-white">G-{match.gameNo}</p>
                        <p className="font-data text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white/50 truncate mt-1">
                          {match.date ?? `Week ${match.week}`} &middot; {match.league}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </PageLayout>
  );
};