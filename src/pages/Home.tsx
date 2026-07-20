import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Trophy,
  Users,
  ShieldCheck,
  MessageCircle,
  Video,
  ChevronRight,
  Play,
  BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/layout/PageLayout';
import { TiltCard } from '../components/ui/TiltCard';
import { staggerContainer, staggerItem } from '../lib/animations';
import { CURRENT_LEAGUE, LEAGUE_ROTATION } from '../types';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Trophy, label: 'Exciting Weekly Matches', bg: 'var(--neu-pink)' },
    { icon: Users, label: 'Readers & Players Leagues', bg: 'var(--neu-blue)' },
    { icon: ShieldCheck, label: 'Fair Play & Transparency', bg: 'var(--neu-green)' },
  ];

  const communityLinks = [
    { 
      title: "WhatsApp Helpline", 
      sub: "For Urgent Queries", 
      icon: MessageCircle, 
      color: "#8FCB7E", 
      url: "https://chat.whatsapp.com/DjVKndAg9dr9rxf4HtT6HC" 
    },
    { 
      title: "Facebook Group", 
      sub: "League Discussions", 
      icon: Users, 
      color: "#60A5FA", 
      url: "https://www.facebook.com/groups/1453154115028958/" 
    },
    { 
      title: "Watch on YouTube", 
      sub: "Past Match VODs", 
      icon: Video, 
      color: "#E8785A", 
      url: "https://www.youtube.com/channel/UCnJBT7GJSceYH-LfFOqSb_Q" 
    }
  ];

  const liveLeague = LEAGUE_ROTATION.find(l => l.status === 'live') || LEAGUE_ROTATION[0];
  const otherLeagues = LEAGUE_ROTATION.filter(l => l.status !== 'live');
  const displayLeagues = [
    otherLeagues[0] || LEAGUE_ROTATION[1], 
    liveLeague, 
    otherLeagues[1] || LEAGUE_ROTATION[2]
  ].filter(Boolean);

  return (
    <PageLayout>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="w-full flex flex-col"
      >
        {/* ============================================================
            LIVE SEASON BANNER (Full Width)
           ============================================================ */}
        <motion.div variants={staggerItem} className="w-full bg-[var(--signal)] text-white relative overflow-hidden border-b-4 border-[var(--ink)]">
          <div className="grain pointer-events-none" />
          <button
            type="button"
            onClick={() => navigate('/league')}
            className="w-full max-w-7xl mx-auto px-4 md:px-8 py-2.5 sm:py-3 flex items-center justify-center gap-2 sm:gap-3 relative z-10 hover:bg-white/10 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse shrink-0" />
            <span className="font-data font-black text-[10px] sm:text-xs uppercase tracking-widest shrink-0">
              Live Now
            </span>
            <span className="text-white/40 shrink-0">&middot;</span>
            <span className="font-black text-xs sm:text-sm uppercase tracking-wide truncate">
              {CURRENT_LEAGUE.fullName} &mdash; Season {CURRENT_LEAGUE.season}
            </span>
          </button>
        </motion.div>

        {/* ============================================================
            SECTION 1 — POSTER HERO (Full Width Background)
           ============================================================ */}
        <motion.section variants={staggerItem} className="w-full poster-block torn-bottom pt-16 pb-24 sm:pt-20 sm:pb-32 px-4 relative z-30 overflow-hidden">
          <div className="absolute inset-0 bg-[#0F0F0F]" />
          
          <div className="poster-orb w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] -top-20 -left-20 sm:-left-10 opacity-100" style={{ background: 'var(--neu-blue)' }} />
          <div className="poster-orb w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] -bottom-10 -right-20 sm:-right-10 opacity-100" style={{ background: 'var(--neu-purple)' }} />
          
          <div className="halftone opacity-40" />

          {/* Inner Content is constrained and centered */}
          <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center mt-4">
            
            <h1 className="poster-type text-[42px] sm:text-6xl md:text-7xl lg:text-[80px] text-[var(--bone)] leading-[0.9] tracking-tighter mb-3 drop-shadow-2xl">
              FUNDAESLIGA<br />QUIZ LEAGUE
            </h1>
            
            <p className="font-data font-bold text-[9px] sm:text-xs text-[var(--bone)]/60 uppercase tracking-[0.2em] mb-10 max-w-sm sm:max-w-none">
              A MIMIR-STYLE INTERNATIONAL QUIZ LEAGUE
            </p>
            
            {/* Glowing Buttons Container Matching Screenshot */}
            <div className="flex flex-col gap-4 w-full max-w-[500px] px-2">
              <motion.button 
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/league')}
                className="neu-pill w-full bg-[var(--signal)] text-white font-black py-4 sm:py-5 text-sm sm:text-base tracking-widest uppercase flex items-center justify-center gap-2 border-[3px] border-[var(--signal)]"
                style={{ boxShadow: '0 0 35px rgba(255, 255, 255, 0.7), inset 0 -4px 10px rgba(0,0,0,0.2)' }}
              >
                <Play size={20} fill="currentColor" /> Enter League Menu
              </motion.button>
              
              <div className="grid grid-cols-2 gap-4 w-full">
                <motion.button 
                  whileTap={{ scale: 0.96 }}
                  onClick={() => navigate('/league/read/open')}
                  className="neu-pill w-full bg-[var(--bone)] text-[var(--ink)] font-black py-3.5 sm:py-4 text-[10px] sm:text-xs tracking-widest uppercase flex items-center justify-center gap-2 border-[3px] border-[var(--bone)]"
                  style={{ boxShadow: '0 0 35px rgba(255, 255, 255, 0.7), inset 0 -4px 10px rgba(0,0,0,0.1)' }}
                >
                  <BookOpen size={16} /> Sign Up to Read
                </motion.button>

                <motion.button 
                  whileTap={{ scale: 0.96 }}
                  onClick={() => navigate('/league/season')}
                  className="neu-pill w-full bg-[var(--bone)] text-[var(--ink)] font-black py-3.5 sm:py-4 text-[10px] sm:text-xs tracking-widest uppercase flex items-center justify-center gap-2 border-[3px] border-[var(--bone)]"
                  style={{ boxShadow: '0 0 35px rgba(255, 255, 255, 0.7), inset 0 -4px 10px rgba(0,0,0,0.1)' }}
                >
                  <Trophy size={16} /> Leaderboard
                </motion.button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ============================================================
            SECTION 2 — 3D PARALLAX CARDS (Full Width Container)
           ============================================================ */}
        <motion.section variants={staggerItem} className="w-full py-16 sm:py-24 -mt-8 relative z-20 overflow-hidden bg-[var(--bone)]">
          <div className="text-center mb-10 sm:mb-16 px-4 relative z-40">
            <h3 className="font-black text-2xl sm:text-4xl uppercase text-[var(--ink)] bg-white px-8 py-3 border-[4px] border-[var(--ink)] w-fit mx-auto shadow-[8px_8px_0px_rgba(0,0,0,1)]">
              The Leagues
            </h3>
          </div>
          
          <div className="flex justify-center items-end perspective-[1000px] px-2 max-w-5xl mx-auto h-[320px] sm:h-[450px]">
            {displayLeagues.map((league, index) => {
              const isLeft = index === 0;
              const isCenter = index === 1;
              const isRight = index === 2;
              const isLive = league.status === 'live';

              let transform = '';
              if (isLeft) transform = 'translateX(15%) rotateY(15deg) rotateZ(-3deg) scale(0.9)';
              if (isCenter) transform = 'translateZ(60px) translateY(-10px) scale(1.05)';
              if (isRight) transform = 'translateX(-15%) rotateY(-15deg) rotateZ(3deg) scale(0.9)';

              const bgColor = isLeft ? '#EF4444' : isCenter ? '#3B82F6' : '#F59E0B';

              return (
                <div
                  key={league.slug || index}
                  onClick={isLive ? () => navigate('/league/leaderboard') : undefined}
                  className={`relative w-[45%] max-w-[300px] min-w-[140px] aspect-[2.5/4] sm:aspect-[3/4] flex flex-col transition-all duration-300 ease-out ${
                    isLive ? 'cursor-pointer hover:scale-[1.08] hover:-translate-y-4' : 'cursor-default'
                  }`}
                  style={{
                    transform,
                    zIndex: isCenter ? 30 : 10,
                    transformStyle: 'preserve-3d',
                    filter: isLive ? 'none' : 'brightness(0.75) contrast(1.1) grayscale(0.15)' 
                  }}
                >
                  {isLive && (
                    <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 bg-[var(--ink)] text-white px-4 sm:px-6 py-1.5 sm:py-2 flex items-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,0.3)] border-2 border-white/20 z-50 rounded-full w-max">
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="font-data font-black text-[10px] sm:text-xs uppercase tracking-widest leading-none mt-0.5">Live Now</span>
                    </div>
                  )}

                  <div
                    className="w-full h-full border-[3px] sm:border-[5px] border-[var(--ink)] relative flex flex-col p-3 sm:p-5 overflow-hidden"
                    style={{ 
                      backgroundColor: bgColor,
                      boxShadow: isCenter ? '15px 15px 0px rgba(0,0,0,1)' : '8px 8px 0px rgba(0,0,0,0.8)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 pointer-events-none" />
                    <div className="absolute inset-0 grain opacity-40 pointer-events-none" />

                    <div className="bg-[var(--bone)] border-[3px] sm:border-[4px] border-[var(--ink)] p-2 sm:p-4 mt-6 sm:mt-8 flex flex-col items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,1)] relative z-10 -skew-x-2 -skew-y-1 transform-gpu">
                      <span className="font-black text-sm sm:text-2xl uppercase leading-tight text-center break-words w-full text-[var(--ink)]">
                        {league.name}
                      </span>
                    </div>

                    <div className="mt-auto relative z-10 w-full flex flex-col gap-1 sm:gap-2">
                      <p className="text-[9px] sm:text-xs font-data font-black text-white/90 bg-[var(--ink)]/40 p-1 sm:p-2 uppercase tracking-widest text-center border-2 border-black/20">
                        {league.format}
                      </p>
                      
                      <div className="flex justify-between items-end mt-2 border-t-2 border-black/20 pt-2">
                        <div className="flex gap-1">
                           <div className="w-1.5 h-6 bg-black/20" />
                           <div className="w-3 h-6 bg-black/20" />
                           <div className="w-1 h-6 bg-black/20" />
                        </div>
                        <p className="text-xl sm:text-4xl font-black text-[var(--ink)] opacity-90 leading-none tracking-tighter">
                          S{league.season}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* ============================================================
            CONTAINER FOR LOWER SECTIONS (Constrained Width)
           ============================================================ */}
        <div className="w-full max-w-6xl mx-auto px-4 md:px-8 flex flex-col gap-12 sm:gap-16 pb-24 relative z-20">
          
          {/* SECTION 3 — TACTILE NEUMORPHIC. About Section. */}
          <motion.section variants={staggerItem} id="about" className="w-full neu-section p-5 sm:p-8 md:p-10 space-y-6 sm:space-y-8 relative overflow-hidden rounded-[24px] sm:rounded-[32px]">
            <div className="grain" />
            <div className="relative z-10">
              <div className="woven-tag text-[var(--ink)] font-data font-black text-xs px-3 py-1 w-fit mb-4 shadow-sm">
                ABOUT
              </div>
              <h3 className="font-black uppercase text-2xl sm:text-3xl md:text-4xl mb-3 text-[var(--ink)] tracking-tight">FundaesLiga</h3>
              <p className="font-bold text-[var(--ink)]/60 leading-relaxed max-w-xl text-sm md:text-base">
                FundaesLiga is a platform for quiz enthusiasts &mdash; players and readers compete in weekly and
                seasonal leagues. Play, read, and climb the leaderboards.
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-3 relative z-10">
              {features.map((f) => (
                <TiltCard
                  key={f.label}
                  className="neu-panel border-none p-5 sm:p-6 flex flex-col items-start gap-4 sm:gap-6"
                  style={{ background: f.bg }}
                >
                  <div className="neu-puck bg-white/60 backdrop-blur-sm shadow-sm">
                    <f.icon size={24} className="text-[var(--ink)]" strokeWidth={2.5} />
                  </div>
                  <div className="space-y-3 w-full">
                    <div className="stitch-line text-[var(--ink)] w-full opacity-20" />
                    <span className="font-black uppercase text-sm md:text-base tracking-wide text-[var(--ink)] block pt-1 leading-tight">
                      {f.label}
                    </span>
                  </div>
                </TiltCard>
              ))}
            </div>
          </motion.section>

          {/* SECTION 4 — DARK COMMUNITY LINKS */}
          <motion.section variants={staggerItem} className="w-full">
            <div 
              className="w-full max-w-3xl mx-auto rounded-[32px] p-6 sm:p-10 relative overflow-hidden shadow-2xl"
              style={{ backgroundColor: '#101010' }}
            >
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 1px, transparent 10px)'
                }}
              />
              
              <div className="relative z-10">
                <h2 className="text-white text-3xl sm:text-4xl font-black uppercase text-center tracking-tight mb-2">
                  FLQL Community
                </h2>
                
                <div className="border-b-2 border-dashed border-white/10 my-8 w-full" />

                <div className="flex flex-col gap-4 sm:gap-6">
                  {communityLinks.map((link, idx) => (
                    <a 
                      key={idx} 
                      href={link.url}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-[#0A0A0A] hover:bg-[#151515] transition-colors border border-white/[0.05] rounded-[20px] sm:rounded-[24px] p-4 sm:p-5 flex items-center justify-between group shadow-lg"
                    >
                      <div className="flex items-center gap-4 sm:gap-5">
                        <div className="relative">
                          <div 
                            className="absolute inset-0 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity"
                            style={{ backgroundColor: link.color }}
                          />
                          <div 
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center relative z-10 shadow-inner"
                            style={{ backgroundColor: link.color }}
                          >
                            <link.icon size={22} className="text-[#0A0A0A]" strokeWidth={2.5} />
                          </div>
                        </div>
                        
                        <div className="text-left">
                          <h4 className="text-white font-black text-sm sm:text-base uppercase tracking-wide">
                            {link.title}
                          </h4>
                          <p className="text-white/40 font-data font-bold text-[10px] sm:text-[11px] uppercase tracking-widest mt-0.5">
                            {link.sub}
                          </p>
                        </div>
                      </div>
                      
                      <ChevronRight size={20} className="text-white/30 group-hover:text-white/70 transition-colors mr-2" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        </div>

      </motion.div>
    </PageLayout>
  );
};