import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../../components/layout/PageLayout';
import { Clock, Info, CheckCircle2, Check } from 'lucide-react';
import { useReaderQueue, type ScheduledReadGame } from '../../hooks/useReaderQueue';

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

const NOISE_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`;

const ReadCard: React.FC<{
  match: ScheduledReadGame;
  bg: string;
  onMarkRead?: () => void;
}> = ({ match, bg, onMarkRead }) => (
  <motion.div
    variants={fadeUpItem}
    layout
    className="rounded-3xl flex flex-col relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/20"
    style={{ background: bg }}
  >
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{ backgroundImage: NOISE_TEXTURE }} />
    
    <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-3 p-5 border-b border-black/[0.05] relative z-10">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <div className="font-data font-black text-xs bg-[#1A1A1A] text-white px-3 py-1.5 rounded-lg shadow-inner shrink-0">
          G-{match.gameNo}
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-data font-black uppercase tracking-widest text-[#1A1A1A]/70 truncate bg-black/5 px-2.5 py-1 rounded-md">
          <Clock size={12} strokeWidth={3} className="shrink-0" />
          <span className="truncate">
            {match.date ?? `Week ${match.week}`} {match.time ? `\u00b7 ${match.time}` : ''}
          </span>
        </div>
      </div>
    </div>

    <div className="flex flex-col p-5 gap-2.5 relative z-10">
      {match.players.map((name, idx) => (
        <div key={idx} className="flex items-center gap-3 bg-white/60 backdrop-blur-md rounded-2xl px-4 py-3 shadow-sm border border-white/40">
          <span className="font-data font-black text-[#1A1A1A]/40 text-xs shrink-0 w-4">{idx + 1}</span>
          <span className="font-black text-sm uppercase leading-tight text-[#1A1A1A] truncate">{name}</span>
        </div>
      ))}
    </div>

    <div className="px-5 pb-5 relative z-10 mt-auto">
      {onMarkRead ? (
        <button
          onClick={onMarkRead}
          className="w-full min-h-[48px] py-3.5 rounded-full font-black uppercase text-xs tracking-widest text-white bg-[#1A1A1A] shadow-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform hover:bg-[#2962FF]"
        >
          <Check size={16} strokeWidth={3} />
          Mark as Completed
        </button>
      ) : (
        <div className="w-full min-h-[48px] py-3.5 rounded-full font-black uppercase text-xs tracking-widest text-[#1A1A1A]/40 border-2 border-dashed border-[#1A1A1A]/20 flex items-center justify-center gap-2">
          <CheckCircle2 size={16} strokeWidth={2.5} />
          Verified Complete
        </div>
      )}
    </div>
  </motion.div>
);

export const ReadSchedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'toread' | 'read'>('toread');
  const { toRead, read, markRead } = useReaderQueue();

  const bgs = ['#E8785A', '#8FCB7E', '#2962FF', '#F0C94A'];
  const matches = activeTab === 'toread' ? toRead : read;

  return (
    <PageLayout>
      <div className="min-h-screen bg-[#FAF9F6] relative overflow-hidden" style={{ backgroundImage: NOISE_TEXTURE }}>
        
        {/* Precision Fixed Top Sub-navigation sticky element */}
        <div className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-xl px-3 sm:px-4 py-4 sm:py-6 border-b border-black/[0.03]">
          <div className="bg-white p-1 rounded-full shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-black/[0.03] flex w-full max-w-sm mx-auto relative">
            {(['toread', 'read'] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-2 rounded-full font-black uppercase text-[10px] sm:text-xs tracking-widest relative z-10 transition-colors ${isActive ? 'text-white' : 'text-black/40 hover:text-black/70'}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeReadTab"
                      className="absolute inset-0 bg-[#1A1C23] rounded-full shadow-md -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {tab === 'toread' ? `To Read (${toRead.length})` : `Read (${read.length})`}
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 max-w-4xl mx-auto relative z-20 pb-12"
        >
          <motion.div variants={fadeUpItem} className="bg-white p-4 sm:p-5 flex gap-3 sm:gap-4 items-start border-l-[6px] border-l-[#2962FF] rounded-2xl shadow-sm">
            <div className="w-10 h-10 shrink-0 bg-[#F5F5F0] rounded-xl flex items-center justify-center shadow-inner">
              <Info className="text-[#2962FF]" size={18} strokeWidth={2.5} />
            </div>
            <p className="font-data text-[10px] sm:text-[11px] font-bold uppercase tracking-widest leading-relaxed mt-0.5 text-[#1A1A1A]/70">
              You can only read games that you are scheduled for via the draws sheet. Express interest for open slots in the 'Interest to Read' tab.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} className="grid sm:grid-cols-2 gap-5 sm:gap-6">
              {matches.length === 0 && (
                <div className="bg-white p-12 text-center rounded-3xl col-span-full border border-black/[0.03] shadow-sm">
                  <p className="font-black uppercase text-sm tracking-widest text-[#1A1A1A]/30">
                    {activeTab === 'toread' ? 'Nothing scheduled yet' : 'No completed reads yet'}
                  </p>
                </div>
              )}
              {matches.map((match, i) => (
                <ReadCard
                  key={match.gameNo}
                  match={match}
                  bg={bgs[i % bgs.length]}
                  onMarkRead={activeTab === 'toread' ? () => markRead(match.gameNo) : undefined}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </PageLayout>
  );
};