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
      className="neu-panel w-full flex items-center justify-between p-3 sm:p-4 bg-white mb-4 group"
      style={{ borderRadius: '999px' }} // Perfect pill shape from the screenshot
    >
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 ${isDanger ? 'bg-[var(--neu-coral)]/10' : 'bg-[#F4F4F5]'}`}>
          <Icon size={18} className={isDanger ? 'text-[var(--neu-coral)]' : 'text-[var(--ink)]'} strokeWidth={2.5} />
        </div>
        <span className={`font-black uppercase text-xs sm:text-sm tracking-widest ${isDanger ? 'text-[var(--neu-coral)]' : 'text-[var(--ink)]'}`}>
          {title}
        </span>
      </div>
      {!isDanger ? (
        <ChevronRight size={20} strokeWidth={3} className="text-[var(--ink)]/20 mr-2 group-hover:text-[var(--ink)]/50 transition-colors" />
      ) : <div className="w-6" />}
    </motion.button>
  );

  const displayName = 
    profile?.name || 
    user?.user_metadata?.full_name || 
    user?.user_metadata?.name || 
    user?.email?.split('@')[0] || 
    'AYUSH KIRTANIA'; // Hardcoded fallback to match visual reference

  return (
    <PageLayout>
      <motion.div 
        variants={staggerContainer} 
        initial="hidden" 
        animate="show" 
        className="flex flex-col w-full max-w-md mx-auto"
      >
        {/* ============================================================
            HERO: Poster Block (Matches dark red orb screenshot)
           ============================================================ */}
        <motion.div variants={staggerItem} className="w-full">
          <div className="poster-block torn-bottom flex flex-col items-center justify-center pt-12 pb-24 px-4 relative overflow-hidden bg-[#151515]">
            <div className="halftone opacity-40" />
            
            {/* Huge Red Orb positioned left/center */}
            <div className="absolute top-[-15%] left-[-20%] w-[400px] h-[400px] rounded-full opacity-100" style={{ background: '#BE2E14' }} />
            
            {/* Glowing Avatar */}
            <div 
              className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center mb-5" 
              style={{ boxShadow: '0 0 30px rgba(255,255,255,0.9)' }}
            >
              <UserIcon size={32} className="text-[var(--ink)]" strokeWidth={3} />
            </div>
            
            {/* User Name */}
            <h2 className="relative z-10 font-black text-3xl sm:text-4xl text-white text-center uppercase tracking-tighter leading-none mb-5 drop-shadow-md">
              {displayName}
            </h2>
            
            {/* Skewed Role Sticker */}
            <div 
              className="relative z-10 font-black text-[10px] sm:text-xs text-white uppercase tracking-widest px-5 py-1.5 transform rotate-[-3deg] border-[3px] border-[#151515] shadow-[4px_4px_0px_rgba(21,21,21,1)]" 
              style={{ background: '#FF4111' }}
            >
              {profile?.role || 'PLAYER'}
            </div>

            {profile?.created_at && (
              <p className="relative z-10 text-[10px] text-(--bone)/50 font-data uppercase tracking-widest mt-3">
                Joined {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </p>
            )}
          </div>
        </motion.div>

        {/* ============================================================
            STATS: Tactile Data Blocks
           ============================================================ */}
        <motion.div variants={staggerItem} className="grid grid-cols-2 gap-4 px-4 sm:px-6 -mt-12 relative z-20">
          
          {/* Main Games Played Block */}
          <div className="neu-panel bg-white flex flex-col items-center justify-center p-6 sm:p-8 aspect-[3/4]" style={{ borderRadius: '32px' }}>
            <span className="font-black text-6xl sm:text-7xl mb-2" style={{ color: '#4DB4CA' }}>
              {profile?.gamesPlayed || profile?.games_played || 0}
            </span>
            <span className="text-[9px] sm:text-[10px] font-black font-data uppercase tracking-[0.2em] text-[#9CA3AF] text-center leading-tight">
              GAMES<br/>PLAYED
            </span>
          </div>
          
          {/* Stacked Secondary Stats */}
          <div className="grid grid-rows-2 gap-4">
            <div className="neu-panel bg-white flex flex-col items-center justify-center p-4" style={{ borderRadius: '28px' }}>
              <span className="font-black text-3xl sm:text-4xl text-[var(--ink)] mb-1">
                {profile?.gamesRead || profile?.games_read || 0}
              </span>
              <span className="text-[8px] sm:text-[9px] font-black font-data uppercase tracking-[0.2em] text-[#9CA3AF] text-center">
                GAMES READ
              </span>
            </div>
            
            <div className="neu-panel bg-white flex flex-col items-center justify-center p-4" style={{ borderRadius: '28px' }}>
              <span className="font-black text-3xl sm:text-4xl text-[var(--ink)] mb-1">
                {profile?.interestsSent || profile?.interests_sent || 0}
              </span>
              <span className="text-[8px] sm:text-[9px] font-black font-data uppercase tracking-[0.2em] text-[#9CA3AF] text-center">
                INTERESTS
              </span>
            </div>
          </div>

        </motion.div>

        {/* ============================================================
            MENU: Soft Neumorphic Pillars
           ============================================================ */}
        <motion.div variants={staggerItem} className="mt-8 px-4 sm:px-6 pb-12">
          <MenuItem icon={Calendar} title="My Read Schedule" />
          <MenuItem icon={Heart} title="My Interests" />
          <MenuItem icon={Settings} title="Account Settings" onClick={handleAccountSettings} />
          <MenuItem icon={LogOut} title="Logout" isDanger onClick={handleLogout} />
        </motion.div>

      </motion.div>
    </PageLayout>
  );
};