import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Calendar, BarChart2, BookOpen, HandMetal, ChevronRight, type LucideIcon } from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';
import { staggerContainer, staggerItem, tapTransition } from '../../lib/animations';

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
        className="neu-panel w-full flex items-center justify-between p-4 text-left"
        style={{ background: bg }}
      >
        <div className="flex items-center gap-4">
          <span className="font-data font-black text-[10px] text-[var(--ink)]/30 w-6 shrink-0">{String(index).padStart(2, '0')}</span>
          <div className="neu-puck bg-white shrink-0">
            <Icon size={20} strokeWidth={2.5} className="text-[var(--ink)]" />
          </div>
          <div className="flex flex-col justify-center">
            <h4 className="font-black uppercase text-sm md:text-base tracking-wide text-[var(--ink)]">{title}</h4>
            {subtitle && <p className="text-[10px] font-data font-bold text-[var(--ink)]/60 uppercase tracking-widest mt-0.5">{subtitle}</p>}
          </div>
        </div>
        <div className="neu-puck bg-white shrink-0">
          <ChevronRight size={18} strokeWidth={3} className="text-[var(--ink)]" />
        </div>
      </motion.button>
    </motion.div>
  );
};

export const LeagueMenu: React.FC = () => {
  return (
    <PageLayout>
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="max-w-2xl mx-auto w-full">
        {/* ---- POSTER (raw) — hero ---- */}
        <motion.div variants={staggerItem} className="poster-block flex flex-col items-center pt-10 pb-9 relative overflow-hidden">
          <div className="poster-orb w-64 h-64 -top-24 -right-16 opacity-80" />
          <div className="halftone" />

          <div className="relative z-10 p-4 brutal-border bg-white brutal-shadow mb-4" style={{ borderColor: 'var(--bone)' }}>
            <Trophy size={44} strokeWidth={2} className="text-[var(--ink)]" />
          </div>
          <h1 className="poster-type text-2xl relative z-10 mb-3">
            FLQL Smashdown
          </h1>
          <div className="poster-sticker text-xs px-4 py-1.5 relative z-10 flex items-center">
            <Calendar size={14} className="mr-2 -mt-0.5 inline" />
            WEEK 1: JUL 14 &mdash; JUL 20
          </div>
        </motion.div>

        {/* ---- NEUMORPHIC (soft) — menu list ---- */}
        <div className="neu-section p-4 md:p-8 space-y-8 rounded-t-none">
          <motion.section variants={staggerItem}>
            <h3 className="text-xs font-black font-data text-[var(--ink)]/50 uppercase tracking-[0.2em] mb-4 px-1">
              Leaderboards &amp; Results
            </h3>
            <div>
              <MenuItem index={1} icon={BarChart2} title="Weekly Leaderboard" path="/league/leaderboard" bg="var(--neu-blue)" />
              <MenuItem index={2} icon={Trophy} title="Seasonal Leaderboard" path="/league/season" bg="var(--neu-yellow)" />
              <MenuItem index={3} icon={BarChart2} title="Weekly Match Results" path="/league/results" bg="var(--neu-blue)" />
            </div>
          </motion.section>

          <motion.section variants={staggerItem}>
            <h3 className="text-xs font-black font-data text-[var(--ink)]/50 uppercase tracking-[0.2em] mb-4 px-1">
              Read Games
            </h3>
            <div>
              <MenuItem index={4} icon={BookOpen} title="My Read Schedule" subtitle="Games to read or completed" path="/league/read/schedule" bg="var(--neu-green)" />
              <MenuItem index={5} icon={HandMetal} title="Interest to Read" subtitle="Express interest for games" path="/league/read/open" bg="var(--neu-pink)" />
            </div>
          </motion.section>
        </div>
      </motion.div>
    </PageLayout>
  );
};