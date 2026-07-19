import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '../../components/layout/PageLayout';
import { Trophy } from 'lucide-react';

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

interface TeamEntry {
  rank: number;
  team: string;
  players: string;
  points: number;
}

const MechanicalScore: React.FC<{ score: number }> = ({ score }) => {
  const digits = score.toFixed(1).padStart(4, '0').split('');
  return (
    <div className="flex gap-[2px]">
      {digits.map((digit, i) => {
        if (digit === '.') return <span key={i} className="text-[#1A1A1A] font-black font-data self-end mb-1">.</span>;
        return (
          <div key={i} className="relative bg-[#121212] flex items-center justify-center rounded-[3px] border border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_2px_4px_rgba(0,0,0,0.2)] overflow-hidden w-5 h-7 sm:w-6 sm:h-8">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50" />
            <div className="absolute inset-x-0 top-1/2 h-px bg-black shadow-[0_1px_0_rgba(255,255,255,0.1)] z-10" />
            <span className="font-data font-black text-white relative z-0 text-sm sm:text-base">{digit}</span>
          </div>
        );
      })}
    </div>
  );
};

export const SeasonalLeaderboard: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<'intl' | 'india'>('intl');

  const intlTeams: TeamEntry[] = [
    { rank: 1, team: '2 peas', players: 'Anagha K H, Sharon Thomas', points: 45.5 },
    { rank: 2, team: 'Above Par', players: 'Param Nagda, Parvati', points: 38.0 },
    { rank: 3, team: 'Anuraja', players: 'Anuradha, Raja Bala', points: 32.5 },
    { rank: 4, team: 'Area Boys', players: 'Hem Maradia, Varun Murthy', points: 28.0 },
    { rank: 5, team: 'Bai-Bai Lob', players: 'Nikhil Soneja, Vinoo Sanjay', points: 19.5 },
  ];

  const indiaTeams: TeamEntry[] = [
    { rank: 1, team: 'Aaj Kuch Chazzy', players: 'Siddhant, Saswata', points: 52.0 },
    { rank: 2, team: 'Aaramball', players: 'Krittibas, Mayank', points: 44.5 },
    { rank: 3, team: 'Adalat with Raj', players: 'Raja Sri Charan, Shashank', points: 41.0 },
    { rank: 4, team: 'Airport Alliance', players: 'Abhinav D, Suvajit', points: 36.5 },
    { rank: 5, team: 'AJPJ', players: 'Aditi Jain, Poorvaja', points: 29.0 },
  ];

  const teams = activeTrack === 'intl' ? intlTeams : indiaTeams;

  const medalStyle = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-br from-[#FFD700] via-[#FDB931] to-[#9F7928] text-black shadow-lg border-none';
    if (rank === 2) return 'bg-gradient-to-br from-[#F5F5F5] via-[#C0C0C0] to-[#808080] text-black shadow-md border-none';
    if (rank === 3) return 'bg-gradient-to-br from-[#FFBCAAA] via-[#CD7F32] to-[#8D5524] text-white shadow-md border-none';
    return 'bg-[#F5F5F0] text-[#1A1A1A]/60 shadow-inner border border-white';
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-[#FAF9F6] relative overflow-hidden" style={{ backgroundImage: NOISE_TEXTURE }}>
        
        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-12 pb-24 sm:pt-16 sm:pb-32 px-4 flex flex-col items-center overflow-hidden bg-[#121212] text-[#FAF9F6] torn-bottom">
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8Y2lyY2xlIGN4PSI0IiBjeT0iNCIgcj0iMSIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4=')] mix-blend-screen" />
          <motion.div 
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }} 
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#F0C94A]/30 to-transparent blur-3xl pointer-events-none" 
          />
          
          <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center">
            <span className="font-data font-black text-[10px] tracking-[0.3em] uppercase mb-4 text-white/50 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-md">
              Season 3 Standings
            </span>
            <h1 className="font-black text-5xl sm:text-6xl text-center leading-[0.9] tracking-tighter mb-8 emboss-dark">
              TEAM<br/>LEADERBOARD
            </h1>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-2 sm:px-6 relative z-20 pt-8 sm:pt-12">
          
          {/* ================= TRACK SELECTOR ================= */}
          <div className="bg-white p-1.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-black/[0.03] flex w-full max-w-xs mx-auto mb-12 relative">
            {(['india', 'intl'] as const).map((track) => {
              const isActive = activeTrack === track;
              return (
                <button
                  key={track}
                  onClick={() => setActiveTrack(track)}
                  className={`flex-1 py-3.5 px-2 rounded-xl font-black uppercase text-[10px] sm:text-xs tracking-widest relative z-10 transition-colors ${isActive ? 'text-white' : 'text-black/40 hover:text-black/70'}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSeasonTrack"
                      className="absolute inset-0 bg-[#1A1C23] rounded-xl shadow-md -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {track === 'intl' ? "Int'l Track" : "India Track"}
                </button>
              );
            })}
          </div>

          {/* ================= STANDINGS LIST ================= */}
          <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-3 sm:space-y-4 pb-12">
            <AnimatePresence mode="popLayout">
              {teams.map((team) => (
                <motion.div
                  layout
                  variants={fadeUpItem}
                  key={`${activeTrack}-${team.rank}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="group bg-white rounded-2xl p-4 sm:p-5 flex items-center justify-between border border-[#1A1A1A]/[0.03] shadow-[0_4px_20px_rgba(0,0,0,0.04)] relative overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply" style={{ backgroundImage: NOISE_TEXTURE }} />
                  
                  <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0 z-10">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full flex items-center justify-center font-data font-black text-sm sm:text-base ${medalStyle(team.rank)}`}>
                      {String(team.rank).padStart(2, '0')}
                    </div>
                    
                    <div className="flex flex-col min-w-0">
                      <h4 className="font-black uppercase text-sm sm:text-base text-[#1A1A1A] truncate tracking-wide">
                        {team.team}
                      </h4>
                      <p className="text-[10px] sm:text-xs font-data font-bold text-[#1A1A1A]/50 uppercase tracking-widest mt-1 truncate">
                        {team.players}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 z-10 pl-4 border-l border-dashed border-[#1A1A1A]/10">
                    <div className="flex flex-col items-end">
                      <MechanicalScore score={team.points} />
                      <span className="font-data font-bold text-[8px] uppercase tracking-widest text-[#1A1A1A]/40 mt-1">Pts</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
};