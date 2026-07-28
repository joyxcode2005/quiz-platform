import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../../components/layout/PageLayout';
import { Clock, Info, CheckCircle2, Check } from 'lucide-react';
import { useReaderQueue, type ScheduledReadGame } from '../../hooks/useReaderQueue';

const springTransition = { type: 'spring', damping: 22, stiffness: 120 } as const;
const staggerContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } } as const;
const fadeUpItem = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: springTransition }, exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } } } as const;

const ReadCard: React.FC<{ match: ScheduledReadGame; onMarkRead?: () => void; }> = ({ match, onMarkRead }) => (
  <motion.div layout variants={fadeUpItem} className="bg-[#141414]/60 backdrop-blur-xl rounded-3xl flex flex-col relative overflow-hidden shadow-2xl border border-white/10 w-full">
    <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-3 p-5 md:p-6 border-b border-white/10 relative z-10">
      <div className="flex items-center gap-3 sm:gap-4 md:gap-4 min-w-0">
        <div className="font-data font-black text-xs md:text-sm bg-white/10 border border-white/5 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg shadow-inner shrink-0">
          G-{match.gameNo}
        </div>
        <div className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-[11px] font-data font-black uppercase tracking-widest text-white/70 truncate bg-white/5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-md border border-white/5">
          <Clock className="w-3 h-3 md:w-3.5 md:h-3.5 shrink-0" strokeWidth={3} />
          <span className="truncate">
            {match.date ?? `Week ${match.week}`} {match.time ? `\u00b7 ${match.time}` : ''}
          </span>
        </div>
      </div>
    </div>

    <div className="flex flex-col p-5 md:p-6 gap-2.5 md:gap-3 relative z-10">
      {match.players.map((name, idx) => (
        <div key={idx} className="flex items-center gap-3 md:gap-4 bg-white/5 backdrop-blur-md rounded-xl px-4 py-3 md:px-5 md:py-3.5 shadow-sm border border-white/10">
          <span className="font-data font-black text-white/40 text-xs md:text-sm shrink-0 w-4 md:w-5">{idx + 1}</span>
          <span className="font-black text-sm md:text-base uppercase leading-tight text-white truncate">{name}</span>
        </div>
      ))}
    </div>

    <div className="px-5 pb-5 md:px-6 md:pb-6 relative z-10 mt-auto">
      {onMarkRead ? (
        <button onClick={onMarkRead} className="w-full min-h-[48px] md:min-h-[44px] py-3.5 md:py-3.5 rounded-xl font-black uppercase text-xs md:text-sm tracking-widest text-[#141414] bg-[#FFC800] hover:bg-[#FFC800]/90 transition-colors shadow-[0_0_20px_rgba(255,200,0,0.3)] flex items-center justify-center gap-2 md:gap-3 active:scale-[0.98]">
          <Check className="w-4 h-4 md:w-5 md:h-5" strokeWidth={3} /> Mark as Completed
        </button>
      ) : (
        <div className="w-full min-h-[48px] md:min-h-[44px] py-3.5 md:py-3.5 rounded-xl font-black uppercase text-xs md:text-sm tracking-widest text-white/50 border border-dashed border-white/20 flex items-center justify-center gap-2 md:gap-3 bg-white/5">
          <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} /> Verified Complete
        </div>
      )}
    </div>
  </motion.div>
);

export const ReadSchedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'toread' | 'read'>('toread');
  const { toRead, read, markRead } = useReaderQueue();
  const matches = activeTab === 'toread' ? toRead : read;

  return (
    <PageLayout>
      <div className="min-h-screen relative flex flex-col w-full text-white">
        <div className="sticky top-0 z-40 bg-[#141414]/80 backdrop-blur-2xl px-2 md:px-6 py-3 sm:py-4 md:py-4 border-b border-white/10 flex flex-col gap-3 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
          <div className="bg-white/10 p-1 md:p-1.5 rounded-lg md:rounded-xl shadow-sm border border-white/5 flex w-full max-w-sm md:max-w-md mx-auto relative">
            {(['toread', 'read'] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-1.5 md:py-2 px-2 md:px-3 rounded-md font-black uppercase text-[10px] sm:text-xs md:text-[11px] tracking-widest relative z-10 transition-colors ${isActive ? 'text-[#141414]' : 'text-white/50 hover:text-white'}`}>
                  {isActive && <motion.div layoutId="activeReadTab" className="absolute inset-0 bg-[#FFC800] rounded-md shadow-md -z-10" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                  {tab === 'toread' ? `To Read (${toRead.length})` : `Read (${read.length})`}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 md:space-y-8 max-w-[1600px] mx-auto relative z-20 pb-12 w-full">
          <motion.div variants={fadeUpItem} className="bg-white/5 backdrop-blur-md p-4 sm:p-5 md:p-6 flex gap-3 sm:gap-4 md:gap-5 items-start border border-white/10 border-l-[4px] md:border-l-[5px] border-l-[#FFC800] rounded-2xl md:rounded-3xl shadow-lg">
            <div className="w-10 h-10 md:w-10 md:h-10 shrink-0 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
              <Info className="text-[#FFC800] w-[18px] h-[18px]" strokeWidth={2.5} />
            </div>
            <p className="font-data text-[10px] sm:text-[11px] md:text-xs font-bold uppercase tracking-widest leading-relaxed md:leading-relaxed mt-0.5 md:mt-1 text-white/70">
              You can only read games that you are scheduled for via the draws sheet. Express interest for open slots in the 'Interest to Read' tab.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-6">
              {matches.length === 0 && (
                <div className="bg-white/5 backdrop-blur-md p-12 md:p-16 text-center rounded-3xl col-span-full border border-white/10 shadow-lg">
                  <p className="font-black uppercase text-sm md:text-base tracking-widest text-white/40">
                    {activeTab === 'toread' ? 'Nothing scheduled yet' : 'No completed reads yet'}
                  </p>
                </div>
              )}
              {matches.map((match) => (
                <ReadCard key={match.gameNo} match={match} onMarkRead={activeTab === 'toread' ? () => markRead(match.gameNo) : undefined} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </PageLayout>
  );
};