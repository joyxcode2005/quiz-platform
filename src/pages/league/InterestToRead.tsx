import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '../../components/layout/PageLayout';
import { Clock, Info, HandMetal } from 'lucide-react';
import { staggerContainer, staggerItem } from '../../lib/animations';
import { useTilt } from '../../hooks/useTilt';

interface OpenMatch {
  id: string;
  gameNo: string;
  date: string;
  time: string;
  teams: string[];
}

const OpenCard: React.FC<{ match: OpenMatch }> = ({ match }) => {
  const { ref, containerStyle, motionStyle, handlers } = useTilt({ max: 4, shadowReach: 8 });
  
  return (
    <motion.div variants={staggerItem} style={containerStyle}>
      <motion.div
        ref={ref}
        {...handlers}
        style={motionStyle}
        className="neu-panel bg-white flex flex-col p-5 gap-5 relative overflow-hidden"
      >
        {/* Subtle paper grain texture overlay */}
        <div className="grain pointer-events-none" />

        {/* Card Header */}
        <div className="flex items-center justify-between border-b-2 border-dashed border-black/10 pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="neu-puck w-auto h-8 px-3 bg-[var(--ink)] text-[var(--bone)] font-data font-black text-xs">
              G-{match.gameNo}
            </div>
            <div className="flex items-center gap-1 text-[10px] font-data font-black uppercase tracking-widest text-[var(--neu-blue)]">
              <Clock size={14} strokeWidth={3} />
              {match.date} &middot; {match.time}
            </div>
          </div>
          <span className="font-data font-black text-[9px] uppercase tracking-widest text-[var(--neu-blue)] bg-[var(--neu-bg)] px-2 py-1 rounded-full shadow-inner border border-[var(--neu-blue)]/20">
            Needed
          </span>
        </div>

        {/* Teams List (Inset Area) */}
        <div className="neu-inset bg-[var(--neu-bg)] flex flex-col p-4 gap-3 relative z-10">
          {match.teams.map((team, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="neu-puck w-7 h-7 shrink-0 bg-white text-[var(--ink)]/40 font-data font-black text-[10px]">
                {idx + 1}
              </div>
              <span className="font-black text-sm uppercase leading-tight truncate w-full text-[var(--ink)]">
                {team}
              </span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button className="neu-pill w-full py-4 mt-1 bg-[var(--neu-blue)] text-white font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 relative z-10 transition-transform active:scale-[0.98]">
          <HandMetal size={16} strokeWidth={2.5} />
          Mark as Interested
        </button>
      </motion.div>
    </motion.div>
  );
};

export const InterestToRead: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'open' | 'myinterests'>('open');

  const matches: OpenMatch[] = [
    { id: '1', gameNo: '1006', date: '18-Jul', time: '9:00 PM', teams: ['Smash Brothers', 'Khoon Zeher Tezaab', 'Double Ka Meetha'] },
    { id: '2', gameNo: '1008', date: '19-Jul', time: '10:00 AM', teams: ['FRSS', 'Ruby Bridges of...', 'Brains Like Berkeley'] }
  ];

  return (
    <PageLayout>
      {/* Sticky Top Tab Switcher (Neumorphic Pill Container) */}
      <div className="flex justify-center pt-6 pb-2 sticky top-0 z-40 bg-[var(--neu-bg)]/90 backdrop-blur-md px-4">
        <div className="neu-inset flex p-1.5 rounded-full w-full max-w-md mx-auto bg-white/50">
          {(['open', 'myinterests'] as const).map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-3.5 px-4 rounded-full font-black uppercase text-xs tracking-widest transition-all ${
                activeTab === tab 
                  ? 'neu-pill bg-[var(--neu-blue)] text-white' 
                  : 'text-[var(--ink)]/50 hover:text-[var(--ink)]'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'open' ? 'Open Games' : 'My Interests'}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        variants={staggerContainer} 
        initial="hidden" 
        animate="show" 
        className="p-4 md:p-8 space-y-8 max-w-3xl mx-auto mt-2"
      >
        {/* Soft Informational Banner */}
        <motion.div variants={staggerItem} className="neu-panel bg-white p-5 md:p-6 flex gap-4 items-start border-l-[6px] border-l-[var(--neu-blue)]">
          <div className="neu-puck bg-[var(--neu-bg)] shrink-0 w-12 h-12">
            <Info className="text-[var(--neu-blue)]" size={24} strokeWidth={2.5} />
          </div>
          <p className="font-data text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed mt-0.5 text-[var(--ink)]/70">
            Express interest to read games that currently display 'Needed' in the draws sheet.
          </p>
        </motion.div>

        {/* Section Title & Card Grid */}
        <div className="neu-section bg-transparent pt-4">
          <h3 className="font-black uppercase text-lg tracking-widest mb-6 px-2 text-[var(--ink)]/80">
            Games Needing Readers
          </h3>
          <div className="space-y-6">
            {matches.map((match) => (
              <OpenCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      </motion.div>
    </PageLayout>
  );
};