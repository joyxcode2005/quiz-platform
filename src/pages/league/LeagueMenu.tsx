import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Calendar, BarChart2, BookOpen, HandMetal, Shuffle, ChevronRight, type LucideIcon } from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';

const springTransition = { type: 'spring', damping: 22, stiffness: 120 };
const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: springTransition }
};

const NOISE_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`;

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
    <motion.div variants={fadeUpItem} className="mb-4 w-full">
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate(path)}
        className="group relative w-full flex items-center justify-between p-4 sm:p-5 text-left rounded-2xl border border-black/[0.03] shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden cursor-pointer bg-white"
      >
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-multiply" style={{ backgroundImage: NOISE_TEXTURE }} />
        <div className="absolute inset-0 w-2 h-full left-0" style={{ background: bg }} />
        
        <div className="flex items-center gap-4 sm:gap-5 min-w-0 pl-3 relative z-10">
          <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-[#F5F5F0] rounded-xl flex items-center justify-center shadow-inner border border-white group-hover:shadow-md transition-all">
            <Icon size={20} strokeWidth={2.5} className="text-[#1A1A1A]" />
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <h4 className="font-black uppercase text-sm md:text-base tracking-widest text-[#1A1A1A] truncate group-hover:text-[#2962FF] transition-colors">{title}</h4>
            {subtitle && <p className="text-[10px] sm:text-xs font-data font-bold text-[#1A1A1A]/50 uppercase tracking-widest mt-1 truncate">{subtitle}</p>}
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center group-hover:bg-[#2962FF] group-hover:text-white transition-colors relative z-10 shrink-0">
          <ChevronRight size={16} strokeWidth={3} />
        </div>
      </motion.button>
    </motion.div>
  );
};

export const LeagueMenu: React.FC = () => {
  return (
    <PageLayout>
      <div className="min-h-screen bg-[#FAF9F6] relative overflow-hidden" style={{ backgroundImage: NOISE_TEXTURE }}>
        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-24 px-4 flex flex-col items-center overflow-hidden bg-[#121212] text-[#FAF9F6] torn-bottom">
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8Y2lyY2xlIGN4PSI0IiBjeT0iNCIgcj0iMSIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4=')] mix-blend-screen" />
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-[#2962FF]/40 to-[#2962FF]/0 blur-3xl pointer-events-none" 
          />
          
          <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center">
            <span className="font-data font-black text-[10px] tracking-[0.3em] uppercase mb-4 text-white/50 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-md">
              COMPETITIVE HUB
            </span>
            <div className="p-4 sm:p-5 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl mb-6">
              <Trophy size={48} strokeWidth={1.5} className="text-[#F0C94A] drop-shadow-[0_0_15px_rgba(240,201,74,0.5)]" />
            </div>
            <h1 className="font-black text-4xl sm:text-5xl md:text-6xl text-center leading-[0.9] tracking-tighter mb-4 emboss-dark">
              QUIZ ARENA<br/>LEAGUES
            </h1>
          </div>
        </section>

        {/* ================= MENU LIST ================= */}
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-3xl mx-auto w-full px-4 sm:px-6 md:px-8 relative z-20 pt-8 pb-12">
          
          <motion.section variants={fadeUpItem} className="mb-10">
            <h3 className="text-[11px] sm:text-xs font-black font-data text-[#1A1A1A]/40 uppercase tracking-[0.2em] mb-4 px-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E8785A] animate-pulse" /> Live This Week
            </h3>
            <MenuItem index={1} icon={Shuffle} title="Weekly Draws" subtitle="See who's playing, any week" path="/league/draws" bg="#E8785A" />
          </motion.section>

          <motion.section variants={fadeUpItem} className="mb-10">
            <h3 className="text-[11px] sm:text-xs font-black font-data text-[#1A1A1A]/40 uppercase tracking-[0.2em] mb-4 px-2">
              Standings & Results
            </h3>
            <MenuItem index={2} icon={BarChart2} title="Weekly Leaderboard" subtitle="Gameweek individual points" path="/league/leaderboard" bg="#2962FF" />
            <MenuItem index={3} icon={Trophy} title="Seasonal Leaderboard" subtitle="Overall team standings" path="/league/season" bg="#F0C94A" />
            <MenuItem index={4} icon={BarChart2} title="Weekly Match Results" subtitle="Room scores and winners" path="/league/results" bg="#2962FF" />
          </motion.section>

          <motion.section variants={fadeUpItem}>
            <h3 className="text-[11px] sm:text-xs font-black font-data text-[#1A1A1A]/40 uppercase tracking-[0.2em] mb-4 px-2">
              Reader Portal
            </h3>
            <MenuItem index={5} icon={BookOpen} title="My Read Schedule" subtitle="Games you are reading" path="/league/read/schedule" bg="#8FCB7E" />
            <MenuItem index={6} icon={HandMetal} title="Interest to Read" subtitle="Volunteer for open games" path="/league/read/open" bg="#F0A8C4" />
          </motion.section>

        </motion.div>
      </div>
    </PageLayout>
  );
};