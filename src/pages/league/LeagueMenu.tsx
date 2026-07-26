import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Calendar, BarChart2, BookOpen, HandMetal, Shuffle, ChevronRight, type LucideIcon } from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { staggerContainer, staggerItem, tapTransition } from '../../lib/animations';
import { CURRENT_LEAGUE } from '../../types';

interface MenuItemProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  path: string;
  index: number;
  bg: string;
}

const MenuItem = ({ icon: Icon, title, subtitle, path, index, bg }: MenuItemProps) => {
  const navigate = useNavigate();

  return (
    <motion.div variants={staggerItem} className="mb-4">
      <motion.button
        whileTap={{ scale: 0.98, transition: tapTransition }}
        onClick={() => navigate(path)}
        className="w-full flex items-center justify-between p-3 sm:p-4 text-left gap-2 bg-[#141414]/60 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-colors shadow-lg group"
      >
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <span className="font-data font-black text-[10px] text-white/30 w-5 sm:w-6 shrink-0">{String(index).padStart(2, '0')}</span>
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: bg }}>
            <Icon size={18} strokeWidth={2.5} className="text-[#141414]" />
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <h4 className="font-black uppercase text-sm md:text-base tracking-wide text-white truncate">{title}</h4>
            {subtitle && <p className="text-[10px] font-data font-bold text-white/50 uppercase tracking-widest mt-0.5 truncate">{subtitle}</p>}
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
          <ChevronRight size={16} strokeWidth={3} className="text-white/50 group-hover:text-white" />
        </div>
      </motion.button>
    </motion.div>
  );
};

export const LeagueMenu: React.FC = () => {
  return (
    <PageLayout>
      <div className="min-h-screen relative flex flex-col w-full text-white">
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="relative z-10 max-w-2xl mx-auto w-full flex flex-col min-h-screen">
          
          <motion.div variants={staggerItem} className="flex flex-col items-center pt-10 pb-8 sm:pt-14 sm:pb-12 px-4">
            <div className="p-3 sm:p-4 border border-white/20 bg-white/10 backdrop-blur-md rounded-2xl mb-5 shadow-2xl">
              <Trophy size={36} strokeWidth={2} className="text-white" />
            </div>
            <h1 className="font-black text-2xl sm:text-4xl text-center uppercase tracking-tighter mb-3 drop-shadow-md">
              {CURRENT_LEAGUE.fullName}
            </h1>
            <div className="bg-white/10 border border-white/20 backdrop-blur-md text-white text-[10px] sm:text-xs px-4 py-1.5 rounded-full flex items-center font-bold tracking-widest uppercase">
              <Calendar size={14} className="mr-2 shrink-0 text-[#FFC800]" />
              SEASON {CURRENT_LEAGUE.season} &middot; NOW LIVE
            </div>
          </motion.div>

          <div className="px-4 sm:px-6 md:px-8 space-y-8 sm:space-y-10 pb-12 w-full">
            <motion.section variants={staggerItem}>
              <h3 className="text-[10px] font-black font-data text-white/50 uppercase tracking-[0.2em] mb-4 px-2">
                This Week
              </h3>
              <div>
                <MenuItem index={1} icon={Shuffle} title="Weekly Draws" subtitle="See who's playing, any week" path="/league/draws" bg="#FF4D1C" />
              </div>
            </motion.section>

            <motion.section variants={staggerItem}>
              <h3 className="text-[10px] font-black font-data text-white/50 uppercase tracking-[0.2em] mb-4 px-2">
                Leaderboards &amp; Results
              </h3>
              <div>
                <MenuItem index={2} icon={BarChart2} title="Weekly Leaderboard" path="/league/leaderboard" bg="#FF7A1A" />
                <MenuItem index={3} icon={Trophy} title="Seasonal Leaderboard" path="/league/season" bg="#FFC800" />
                <MenuItem index={4} icon={BarChart2} title="Weekly Match Results" path="/league/results" bg="#FF7A1A" />
              </div>
            </motion.section>

            <motion.section variants={staggerItem}>
              <h3 className="text-[10px] font-black font-data text-white/50 uppercase tracking-[0.2em] mb-4 px-2">
                Read Games
              </h3>
              <div>
                <MenuItem index={5} icon={BookOpen} title="My Read Schedule" subtitle="Games to read or completed" path="/league/read/schedule" bg="#FFC800" />
                <MenuItem index={6} icon={HandMetal} title="Interest to Read" subtitle="Express interest for games" path="/league/read/open" bg="#FF4D1C" />
              </div>
            </motion.section>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};