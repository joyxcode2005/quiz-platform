import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Calendar, BarChart2, BookOpen, HandMetal, ChevronRight, type LucideIcon } from 'lucide-react';
import { PageLayout } from '../../components/layout/PageLayout';

interface MenuItemProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  path: string;
}

export const LeagueMenu: React.FC = () => {
  const navigate = useNavigate();

  const MenuItem = ({ icon: Icon, title, subtitle, path }: MenuItemProps) => (
    <button
      onClick={() => navigate(path)}
      className="w-full flex items-center justify-between p-4 border-b-[3px] border-[var(--ink)] hover:bg-[var(--signal-soft)] transition-colors text-left group"
    >
      <div className="flex items-center gap-4">
        <div className="p-2 brutal-border bg-white group-hover:bg-[var(--ink)] group-hover:text-white transition-colors">
          <Icon size={20} />
        </div>
        <div>
          <h4 className="font-bold text-md">{title}</h4>
          {subtitle && <p className="text-xs font-data font-bold text-black/50">{subtitle}</p>}
        </div>
      </div>
      <ChevronRight size={20} />
    </button>
  );

  return (
    <PageLayout>
      <div className="flex flex-col items-center pt-8 pb-6 border-b-[3px] border-[var(--ink)] bg-[var(--bone)]">
        <div className="p-4 brutal-border bg-white brutal-shadow mb-4">
          <Trophy size={48} />
        </div>
        <div className="stamp text-[var(--ink)] px-4 py-1.5 font-data font-bold bg-white text-sm">
          <Calendar size={16} className="mr-2 -mt-0.5 inline" />
          Jul 14 &mdash; Jul 20
        </div>
      </div>

      <div className="space-y-6 pt-2">
        <section>
          <h3 className="px-4 text-xs font-black text-black/50 uppercase tracking-widest mb-2 mt-4">
            Leaderboards &amp; Results
          </h3>
          <div className="border-t-[3px] border-[var(--ink)]">
            <MenuItem icon={BarChart2} title="Weekly Leaderboard" path="/league/leaderboard" />
            <MenuItem icon={Trophy} title="Seasonal Leaderboard" path="/league/season" />
            <MenuItem icon={BarChart2} title="Weekly Match Results" path="/league/results" />
          </div>
        </section>

        <section>
          <h3 className="px-4 text-xs font-black text-black/50 uppercase tracking-widest mb-2">
            Read Games
          </h3>
          <div className="border-t-[3px] border-[var(--ink)]">
            <MenuItem
              icon={BookOpen}
              title="My Read Schedule"
              subtitle="Games to read or completed"
              path="/league/read/schedule"
            />
            <MenuItem
              icon={HandMetal}
              title="Interest to Read"
              subtitle="Express interest for games"
              path="/league/read/open"
            />
          </div>
        </section>
      </div>
    </PageLayout>
  );
};