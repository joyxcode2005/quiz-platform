import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Heart, Settings, LogOut, ChevronRight, type LucideIcon, UserIcon } from 'lucide-react';

import { PageLayout } from '../components/layout/PageLayout';
import { useAuth } from '../context/AuthContext';
import { staggerContainer, staggerItem } from '../lib/animations';

interface MenuItemProps {
  icon: LucideIcon;
  title: string;
  isDanger?: boolean;
  onClick?: () => void;
}

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { profile, user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  const handleAccountSettings = async () => {
    navigate('/account-settings', { replace: true })
  }


  console.log("User data: ", profile)



  const MenuItem = ({ icon: Icon, title, isDanger = false, onClick }: MenuItemProps) => (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="neu-panel w-full flex items-center justify-between p-4 bg-white mb-4"
    >
      <div className="flex items-center gap-4">
        <div className="neu-puck" style={{ background: isDanger ? 'var(--neu-coral)' : 'var(--neu-bg)' }}>
          <Icon size={20} color={isDanger ? 'white' : 'var(--ink)'} strokeWidth={2.5} />
        </div>
        <span className={`font-black uppercase text-sm tracking-wide ${isDanger ? 'text-(--neu-coral)' : 'text-(--ink)'}`}>
          {title}
        </span>
      </div>
      {!isDanger && <ChevronRight size={22} strokeWidth={3} className="text-(--ink)/30" />}
    </motion.button>
  );

  const displayName =
    profile?.name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'Unknown Player';

  return (
    <PageLayout>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="p-4 md:p-8 flex flex-col gap-6 max-w-4xl mx-auto"
      >
        {/* HERO: Poster style to hit hard */}
        <motion.div variants={staggerItem}>
          <div className="poster-block torn-bottom flex flex-col items-center justify-center py-12 px-4 relative">
            <div className="halftone" />
            <div className="poster-orb w-64 h-64 -top-10 -left-10 opacity-60" />

            <div className="relative z-10 w-20 h-20 mb-4 rounded-full overflow-hidden bg-white flex items-center justify-center">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserIcon size={36} className="text-black/40" />
              )}
            </div>

            <h2 className="relative z-10 poster-type text-3xl md:text-4xl text-(--bone) text-center">
              {displayName}
            </h2>

            <p className="relative z-10 text-xs text-(--bone)/70 font-data mt-1">
              {profile?.email}
            </p>

            <div className="relative z-10 flex items-center gap-2 mt-4">
              <div className="poster-sticker text-xs px-4 py-1.5">
                {profile?.role}
              </div>
            </div>

            {profile?.created_at && (
              <p className="relative z-10 text-[10px] text-(--bone)/50 font-data uppercase tracking-widest mt-3">
                Joined {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </p>
            )}
          </div>
        </motion.div>

        {/* STATS: Neumorphic style for tactile data */}
        {/* <motion.div variants={staggerItem} className="grid grid-cols-2 gap-5 mt-2">
          <div className="neu-panel flex flex-col items-center justify-center p-6 bg-white">
            <span className="font-black text-5xl text-[var(--neu-blue)]">
              {profile?.gamesPlayed || profile?.games_played || 0}
            </span>
            <span className="text-[10px] font-black font-data uppercase tracking-widest text-[var(--ink)]/50 mt-2 text-center leading-tight">
              Games<br />Played
            </span>
          </div>

          <div className="grid grid-rows-2 gap-5">
            <div className="neu-panel flex flex-col items-center justify-center p-3 bg-white">
              <span className="font-black text-2xl text-[var(--ink)]">
                {profile?.gamesRead || profile?.games_read || 0}
              </span>
              <span className="text-[9px] font-black font-data uppercase tracking-widest text-[var(--ink)]/50 mt-1">
                Games Read
              </span>
            </div>

            <div className="neu-panel flex flex-col items-center justify-center p-3 bg-white">
              <span className="font-black text-2xl text-[var(--ink)]">
                {profile?.interestsSent || profile?.interests_sent || 0}
              </span>
              <span className="text-[9px] font-black font-data uppercase tracking-widest text-[var(--ink)]/50 mt-1">
                Interests
              </span>
            </div>
          </div>
        </motion.div> */}

        {/* MENU: Soft Neumorphic buttons */}
        <motion.div variants={staggerItem} className="mt-4 pb-12">
          <MenuItem icon={Calendar} title="My Read Schedule" />
          <MenuItem icon={Heart} title="My Interests" />
          <MenuItem icon={Settings} title="Account Settings" onClick={handleAccountSettings} />
          <MenuItem icon={LogOut} title="Logout" isDanger onClick={handleLogout} />
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};