import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../../components/layout/PageLayout';
import { Clock, Info, HandMetal, Lock, CheckCircle2 } from 'lucide-react';
import { staggerContainer, staggerItem } from '../../lib/animations';
import { useReaderQueue, type OpenReadGame } from '../../hooks/useReaderQueue';

const springTransition = { type: 'spring', damping: 22, stiffness: 120 };
const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: springTransition },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

const NOISE_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`;

const OpenCard: React.FC<{
  match: OpenReadGame;
  eligible: boolean;
  onMarkInterested: () => void;
}> = ({ match, eligible, onMarkInterested }) => {
  return (
    <motion.div variants={fadeUpItem} className="w-full">
      <div className="bg-white flex flex-col p-4 sm:p-5 gap-4 relative overflow-hidden rounded-[28px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-black/[0.03]">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply" style={{ backgroundImage: NOISE_TEXTURE }} />

        <div className="flex items-center justify-between gap-3 border-b-2 border-dashed border-[#1A1A1A]/10 pb-4 relative z-10">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="h-8 px-3 rounded-lg bg-[#1A1A1A] text-white font-data font-black text-[11px] shrink-0 shadow-inner flex items-center justify-center">
              G-{match.gameNo}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-data font-black uppercase tracking-widest text-[#FF7A1A] min-w-0 bg-[#FF7A1A]/10 px-2 py-1 rounded-md">
              <Clock size={12} strokeWidth={3} className="shrink-0" />
              <span className="truncate">
                {match.date ?? `Week ${match.week}`} {match.time ? `\u00b7 ${match.time}` : ''}
              </span>
            </div>
          </div>
          <span className="font-data font-black text-[9px] uppercase tracking-widest text-[#FF4D1C] border border-[#FF4D1C]/30 px-2.5 py-1 rounded-full shadow-sm shrink-0">
            Needed
          </span>
        </div>

        <div className="bg-[#FAF9F6] flex flex-col p-4 gap-2.5 relative z-10 rounded-2xl shadow-inner border border-black/[0.02]">
          {match.players.map((name, idx) => (
            <div key={idx} className="flex items-center gap-3 min-w-0">
              <div className="w-6 h-6 shrink-0 bg-white text-[#1A1A1A]/40 font-data font-black text-[10px] shadow-sm rounded-md flex items-center justify-center border border-black/[0.05]">
                {idx + 1}
              </div>
              <span className="font-black text-xs sm:text-sm uppercase leading-tight truncate flex-1 text-[#1A1A1A]">
                {name}
              </span>
            </div>
          ))}
        </div>

        {eligible ? (
          <button
            onClick={onMarkInterested}
            className="w-full min-h-[48px] py-3.5 bg-[#1A1A1A] text-white font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 relative z-10 transition-transform active:scale-[0.98] hover:bg-[#FF7A1A] rounded-xl shadow-lg mt-2"
          >
            <HandMetal size={16} strokeWidth={2.5} />
            Mark as Interested
          </button>
        ) : (
          <div className="w-full min-h-[48px] py-3.5 flex items-center justify-center gap-2 relative z-10 text-[#1A1A1A]/40 text-[10px] sm:text-xs font-black uppercase tracking-widest text-center px-4 rounded-xl border-2 border-dashed border-[#1A1A1A]/10 mt-2">
            <Lock size={14} strokeWidth={2.5} className="shrink-0" />
            <span className="truncate">Play a {match.league} game first</span>
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
      <div className="min-h-screen bg-[#FAF9F6] relative overflow-hidden" style={{ backgroundImage: NOISE_TEXTURE }}>
        {/* Precision Fixed Top Sub-navigation sticky element */}
        <div className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-xl px-3 sm:px-4 py-4 sm:py-6 border-b border-black/[0.03]">
          <div className="bg-white p-1 rounded-full shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-black/[0.03] flex w-full max-w-sm mx-auto relative">
            {(['open', 'myinterests'] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-2 rounded-full font-black uppercase text-[10px] sm:text-xs tracking-widest relative z-10 transition-colors ${isActive ? 'text-white' : 'text-black/40 hover:text-black/70'}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeInterestTab"
                      className="absolute inset-0 bg-[#1A1C23] rounded-full shadow-md -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {tab === 'open' ? 'Open Games' : `My Interests (${toRead.length})`}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto relative z-20 pb-12"
        >
          <motion.div variants={fadeUpItem} className="bg-white p-4 sm:p-5 flex gap-3 sm:gap-4 items-start border-l-[6px] border-l-[#FF4D1C] rounded-2xl shadow-sm">
            <div className="w-10 h-10 shrink-0 bg-[#F5F5F0] rounded-xl flex items-center justify-center shadow-inner">
              <Info className="text-[#FF4D1C]" size={18} strokeWidth={2.5} />
            </div>
            <p className="font-data text-[10px] sm:text-[11px] font-bold uppercase tracking-widest leading-relaxed mt-0.5 text-[#1A1A1A]/70">
              {activeTab === 'open'
                ? "Express interest to read games that currently display 'Needed' in the draws sheet. You'll need to have played on a track before you can read for it."
                : "Games you've expressed interest in. Manage them anytime from My Read Schedule."}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === 'open' ? (
              <motion.div key="open-tab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                {openGamesByDay.length === 0 && (
                  <div className="bg-white p-12 text-center rounded-3xl border border-black/[0.03] shadow-sm">
                    <p className="font-black uppercase text-sm tracking-widest text-[#1A1A1A]/30">
                      No open games right now
                    </p>
                  </div>
                )}
                {openGamesByDay.map((group) => (
                  <div key={group.label} className="pt-2">
                    <h3 className="font-black uppercase text-xs sm:text-sm tracking-[0.2em] mb-4 px-2 text-[#1A1A1A]/80 border-l-4 border-[#1A1A1A] pl-3">
                      {group.label}
                    </h3>
                    <div className="grid gap-5 sm:grid-cols-2">
                      {group.games.map((match) => (
                        <OpenCard
                          key={match.gameNo}
                          match={match}
                          eligible={canRead(match.league)}
                          onMarkInterested={() => markInterested(match)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div key="interests-tab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-4 sm:grid-cols-2">
                {toRead.length === 0 && (
                  <div className="bg-white p-12 text-center rounded-3xl col-span-full border border-black/[0.03] shadow-sm">
                    <p className="font-black uppercase text-sm tracking-widest text-[#1A1A1A]/30">
                      No interests yet — pick a game from Open Games
                    </p>
                  </div>
                )}
                {toRead.map((match) => (
                  <motion.div
                    variants={fadeUpItem}
                    key={match.gameNo}
                    className="bg-white flex items-center justify-between gap-3 p-5 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-black/[0.02]"
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="w-10 h-10 shrink-0 bg-[#FFC800]/10 rounded-full flex items-center justify-center">
                        <CheckCircle2 size={20} className="text-[#FFC800]" strokeWidth={2.5} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-black uppercase text-sm text-[#1A1A1A]">G-{match.gameNo}</p>
                        <p className="font-data text-[9px] font-bold uppercase tracking-widest text-[#1A1A1A]/40 truncate mt-1">
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