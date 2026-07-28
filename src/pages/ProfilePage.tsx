import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, Heart, LogOut, type LucideIcon, Settings, UserIcon } from 'lucide-react';
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
      className="w-full flex items-center justify-between p-3 sm:p-4 md:p-4 lg:p-5 bg-[#141414]/60 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors group rounded-2xl md:rounded-full"
    >
      <div className="flex items-center gap-4 md:gap-5">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shrink-0 ${isDanger ? 'bg-red-500/20' : 'bg-white/10'}`}>
          <Icon className={`w-[18px] h-[18px] md:w-5 md:h-5 ${isDanger ? 'text-red-400' : 'text-white'}`} strokeWidth={2.5} />
        </div>
        <span className={`font-black uppercase text-xs sm:text-sm md:text-sm lg:text-base tracking-widest ${isDanger ? 'text-red-400' : 'text-white'}`}>
          {title}
        </span>
      </div>
      {!isDanger ? (
        <ChevronRight className="w-5 h-5 md:w-5 md:h-5 text-white/20 mr-2 md:mr-4 group-hover:text-white transition-colors" strokeWidth={3} />
      ) : <div className="w-6 md:w-10" />}
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
          className="relative z-10 flex flex-col lg:flex-row gap-6 md:gap-8 w-full max-w-md lg:max-w-[1200px] mx-auto pt-10 md:pt-16 px-4 md:px-8 pb-16"
        >
          {/* LEFT: Profile Overview */}
          <motion.div variants={staggerItem} className="w-full lg:w-[350px] shrink-0">
            <div className="bg-[#141414]/60 backdrop-blur-xl border border-white/10 rounded-3xl md:rounded-[40px] flex flex-col items-center justify-center p-8 md:p-10 relative overflow-hidden shadow-2xl h-full">
              <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 bg-[#141414] border border-white/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.1)] overflow-hidden">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt={displayName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-12 h-12 md:w-16 md:h-16 text-white/60" strokeWidth={2} />
                )}
              </div>

              <h2 className="relative z-10 font-black text-3xl md:text-4xl text-white text-center uppercase tracking-tighter leading-none mb-6 drop-shadow-md">
                {displayName}
              </h2>

              <div className="relative z-10 font-black text-[10px] md:text-xs text-[#141414] bg-white uppercase tracking-widest px-5 md:px-6 py-1.5 md:py-2 rounded-full border border-white/20">
                {profile?.role || 'PLAYER'}
              </div>

              {profile?.created_at && (
                <p className="relative z-10 text-[10px] md:text-xs text-white/50 font-data uppercase tracking-widest mt-8 text-center">
                  Joined<br />{new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </p>
              )}
            </div>
          </motion.div>

          {/* RIGHT: Stats and Menus */}
          <div className="flex-1 flex flex-col gap-6 md:gap-8">
            <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
              <MenuItem icon={Calendar} title="My Read Schedule" />
              <MenuItem icon={Heart} title="My Interests" />
              <MenuItem icon={Settings} title="Account Settings" onClick={handleAccountSettings} />
              <MenuItem icon={LogOut} title="Logout" isDanger onClick={handleLogout} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};