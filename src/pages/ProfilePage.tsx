import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { User as UserIcon, Calendar, Heart, Settings, LogOut, ChevronRight, type LucideIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface MenuItemProps {
  icon: LucideIcon;
  title: string;
  isDanger?: boolean;
  onClick?: () => void;
}

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  // Pull the dummy stats from AppContext

  // Pull the real profile data and logout function from AuthContext
  const { profile, loading, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };


  console.log("User data: ", profile)

  const MenuItem = ({ icon: Icon, title, isDanger = false, onClick }: MenuItemProps) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 border-b-[3px] border-(--ink) hover:bg-(--bone) transition-colors ${isDanger ? 'text-(--signal)' : 'text-(--ink)'
        }`}
    >
      <div className="flex items-center gap-4">
        <Icon size={22} color={isDanger ? '#FF3B0A' : '#0D0D0D'} />
        <span className="font-bold uppercase text-sm tracking-wide">{title}</span>
      </div>
      {!isDanger && <ChevronRight size={20} />}
    </button>
  );

  return (
    <PageLayout>
      <div className="flex flex-col items-center pt-8 pb-6 border-b-[3px] border-(--ink) bg-(--bone)">
        <div className="w-24 h-24 brutal-border brutal-shadow-sm bg-white flex items-center justify-center rounded-full mb-4">
          <UserIcon size={44} className="text-black/40" />
        </div>

        {/* Render real data from Supabase AuthContext */}
        <h2 className="font-black text-2xl uppercase">{profile?.name || 'Player'}</h2>
        <p className="font-bold text-black/50 font-data text-sm uppercase tracking-widest mt-1">
          {profile?.role || 'Unassigned Role'}
        </p>
      </div>

      {/* <div className="flex border-b-[3px] border-[var(--ink)] bg-white md:grid md:grid-cols-3">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`flex-1 py-5 flex flex-col items-center justify-center ${i < stats.length - 1 ? 'border-r-[3px] border-[var(--ink)]' : ''
              }`}
          >
            <span className="font-data font-black text-2xl text-[var(--signal)]">{s.value}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/50 mt-1">{s.label}</span>
          </div>
        ))}
      </div> */}

      <div className="mt-4">
        <MenuItem icon={Calendar} title="My Read Schedule" />
        <MenuItem icon={Heart} title="My Interests" />
        <MenuItem icon={Settings} title="Account Settings" />
        {/* Added onClick handler to trigger Supabase sign out */}
        <MenuItem icon={LogOut} title="Logout" isDanger onClick={handleLogout} />
      </div>
    </PageLayout>
  );
};