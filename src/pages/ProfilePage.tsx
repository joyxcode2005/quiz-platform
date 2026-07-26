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
    navigate('/account-settings', { replace: true });
  }

  const MenuItem = ({ icon: Icon, title, isDanger = false, onClick }: MenuItemProps) => (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full flex items-center justify-between p-3 sm:p-4 bg-[#141414]/60 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors mb-4 group rounded-full"
    >
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 ${isDanger ? 'bg-red-500/20' : 'bg-white/10'}`}>
          <Icon size={18} className={isDanger ? 'text-red-400' : 'text-white'} strokeWidth={2.5} />
        </div>
        <span className={`font-black uppercase text-xs sm:text-sm tracking-widest ${isDanger ? 'text-red-400' : 'text-white'}`}>
          {title}
        </span>
      </div>
      {!isDanger ? (
        <ChevronRight size={20} strokeWidth={3} className="text-white/20 mr-2 group-hover:text-white transition-colors" />
      ) : <div className="w-6" />}
    </motion.button>
  );

  const displayName = 
    profile?.name || 
    user?.user_metadata?.full_name || 
    user?.user_metadata?.name || 
    user?.email?.split('@')[0] || 
    'USER';

  return (
    <PageLayout>
      <div className="min-h-screen relative flex flex-col w-full text-white">
        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          animate="show" 
          className="relative z-10 flex flex-col w-full max-w-md mx-auto"
        >
          <motion.div variants={staggerItem} className="w-full">
            <div className="flex flex-col items-center justify-center pt-12 pb-24 px-4 relative overflow-hidden">
              <div 
                className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 bg-[#141414]/60 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(255,255,255,0.1)] overflow-hidden" 
              >
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={displayName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon size={40} className="text-white/60" strokeWidth={2} />
                )}
              </div>
              
              <h2 className="relative z-10 font-black text-3xl sm:text-4xl text-white text-center uppercase tracking-tighter leading-none mb-5 drop-shadow-md">
                {displayName}
              </h2>
              
              <div className="relative z-10 font-black text-[10px] sm:text-xs text-[#141414] bg-white uppercase tracking-widest px-5 py-1.5 rounded-full border-2 border-white/20">
                {profile?.role || 'PLAYER'}
              </div>

              {profile?.created_at && (
                <p className="relative z-10 text-[10px] text-white/50 font-data uppercase tracking-widest mt-4">
                  Joined {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </p>
              )}
            </div>
          </motion.div>

          <motion.div variants={staggerItem} className="grid grid-cols-2 gap-4 px-4 sm:px-6 -mt-12 relative z-20">
            <div className="bg-[#141414]/60 backdrop-blur-xl border border-white/10 rounded-3xl flex flex-col items-center justify-center p-6 sm:p-8 aspect-[3/4] shadow-2xl">
              <span className="font-black text-6xl sm:text-7xl mb-2 text-[#FFC800] drop-shadow-lg">
                {profile?.gamesPlayed || profile?.games_played || 0}
              </span>
              <span className="text-[9px] sm:text-[10px] font-black font-data uppercase tracking-[0.2em] text-white/50 text-center leading-tight">
                GAMES<br/>PLAYED
              </span>
            </div>
            
            <div className="grid grid-rows-2 gap-4">
              <div className="bg-[#141414]/60 backdrop-blur-xl border border-white/10 rounded-[28px] flex flex-col items-center justify-center p-4 shadow-xl">
                <span className="font-black text-3xl sm:text-4xl text-white mb-1">
                  {profile?.gamesRead || profile?.games_read || 0}
                </span>
                <span className="text-[8px] sm:text-[9px] font-black font-data uppercase tracking-[0.2em] text-white/50 text-center">
                  GAMES READ
                </span>
              </div>
              
              <div className="bg-[#141414]/60 backdrop-blur-xl border border-white/10 rounded-[28px] flex flex-col items-center justify-center p-4 shadow-xl">
                <span className="font-black text-3xl sm:text-4xl text-white mb-1">
                  {profile?.interestsSent || profile?.interests_sent || 0}
                </span>
                <span className="text-[8px] sm:text-[9px] font-black font-data uppercase tracking-[0.2em] text-white/50 text-center">
                  INTERESTS
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={staggerItem} className="mt-8 px-4 sm:px-6 pb-12">
            <MenuItem icon={Calendar} title="My Read Schedule" />
            <MenuItem icon={Heart} title="My Interests" />
            <MenuItem icon={Settings} title="Account Settings" onClick={handleAccountSettings} />
            <MenuItem icon={LogOut} title="Logout" isDanger onClick={handleLogout} />
          </motion.div>
        </motion.div>
      </div>
    </PageLayout>
  );
};