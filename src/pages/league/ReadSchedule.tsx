import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../../components/layout/PageLayout';
import { Clock, Info, BookOpen } from 'lucide-react';
import { staggerContainer, staggerItem } from '../../lib/animations';

interface ScheduledRead {
  id: string;
  gameNo: string;
  date: string;
  time: string;
  teamA: string;
  teamB: string;
  teamC: string;
}

const ReadCard: React.FC<{ match: ScheduledRead; bg: string }> = ({ match, bg }) => (
  <motion.div variants={staggerItem} className="neu-panel flex flex-col relative overflow-hidden" style={{ background: bg }}>
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <div className="font-data font-black text-xs bg-[var(--ink)] text-white px-2 py-1 rounded-md">G-{match.gameNo}</div>
        <div className="flex items-center gap-1 text-[10px] font-data font-black uppercase tracking-widest text-[var(--ink)]/70">
          <Clock size={14} strokeWidth={3} />
          {match.date} &middot; {match.time}
        </div>
      </div>
      <div className="neu-puck bg-white shrink-0">
        <BookOpen size={16} className="text-[var(--ink)]" strokeWidth={2.5} />
      </div>
    </div>

    <div className="flex flex-col px-4 pb-4 gap-2">
      {[match.teamA, match.teamB, match.teamC].map((team, idx) => (
        <div key={idx} className="flex items-center gap-3 bg-white/50 rounded-2xl px-3 py-2.5">
          <span className="font-data font-black text-[var(--ink)]/30 text-sm">{idx + 1}</span>
          <span className="font-black text-sm uppercase leading-tight text-[var(--ink)]">{team}</span>
        </div>
      ))}
    </div>

    <button className="neu-pill mx-4 mb-4 py-3 font-black uppercase text-xs tracking-wide text-[var(--ink)] bg-white">
      Access Scoresheet
    </button>
  </motion.div>
);

export const ReadSchedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'toread' | 'read'>('toread');

  const matches: ScheduledRead[] = [
    { id: '1', gameNo: '1004', date: '17-Jul', time: '10:00 PM', teamA: 'The Ramdeuters', teamB: 'Quiz Me Baby One More Time', teamC: 'On the Rocks' },
    { id: '2', gameNo: '1005', date: '18-Jul', time: '8:30 AM', teamA: 'Gospel of Fluke', teamB: 'The HanKel Functions', teamC: 'Schwarmand Hammer' }
  ];

  const bgs = ['var(--neu-green)', 'var(--neu-blue)'];

  return (
    <PageLayout>
      {/* ---- POSTER (raw) — tabs ---- */}
      <div className="poster-block flex sticky top-0 z-50 max-w-4xl mx-auto w-full relative overflow-hidden">
        <div className="halftone opacity-40" />
        {(['toread', 'read'] as const).map((tab, i) => (
          <button
            key={tab}
            className={`relative z-10 flex-1 py-4 font-black uppercase text-sm tracking-widest text-center transition-colors ${
              i === 0 ? 'border-r-[3px] border-r-white/20' : ''
            } ${activeTab === tab ? 'bg-[var(--signal)] text-white' : 'text-white/60 hover:text-white'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'toread' ? 'To Read' : 'Read'}
          </button>
        ))}
      </div>

      {/* ---- NEUMORPHIC (soft) — content ---- */}
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="neu-section p-4 md:p-8 space-y-6 max-w-4xl mx-auto">
        <motion.div variants={staggerItem} className="neu-inset p-4 flex gap-3 text-sm font-bold items-start">
          <Info className="text-[var(--signal)] shrink-0 mt-0.5" size={22} strokeWidth={2.5} />
          <p className="font-data text-xs uppercase tracking-widest leading-relaxed mt-1 text-[var(--ink)]/70">You can only read games that you are scheduled for via the draws sheet.</p>
        </motion.div>

        <div>
          <h3 className="font-black uppercase text-sm tracking-widest mb-4 px-1 text-[var(--ink)]/50">Upcoming Games to Read</h3>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} className="space-y-6">
              {matches.map((match, i) => (
                <ReadCard key={match.id} match={match} bg={bgs[i % bgs.length]} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </PageLayout>
  );
};