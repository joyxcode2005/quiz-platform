import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Users, ShieldCheck, MessageCircle, Video, ChevronRight, Play, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/layout/PageLayout';
import { TiltCard } from '../components/ui/TiltCard';
import { staggerContainer, staggerItem } from '../lib/animations';
import { CURRENT_LEAGUE, LEAGUE_ROTATION, COMPETITION_CONFIG } from '../types';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Trophy, label: 'Exciting Weekly Matches', bg: '#FF4D1C' },
    { icon: Users, label: 'Readers & Players Leagues', bg: '#FF7A1A' },
    { icon: ShieldCheck, label: 'Fair Play & Transparency', bg: '#FFC800' },
  ];

  const communityLinks = [
    { title: "WhatsApp Helpline", sub: "For Urgent Queries", icon: MessageCircle, color: "#FFC800", url: "https://chat.whatsapp.com/DjVKndAg9dr9rxf4HtT6HC" },
    { title: "Facebook Group", sub: "League Discussions", icon: Users, color: "#FF7A1A", url: "https://www.facebook.com/groups/1453154115028958/" },
    { title: "Watch on YouTube", sub: "Past Match VODs", icon: Video, color: "#FF4D1C", url: "https://www.youtube.com/channel/UCnJBT7GJSceYH-LfFOqSb_Q" }
  ];

  const liveLeague = LEAGUE_ROTATION.find(l => l.status === 'live') || LEAGUE_ROTATION[0];
  const liveConfig = liveLeague.slug === 'smashdown' ? COMPETITION_CONFIG.smashdown : COMPETITION_CONFIG.india;
  const otherLeagues = LEAGUE_ROTATION.filter(l => l.status !== 'live');
  const displayLeagues = [otherLeagues[0] || LEAGUE_ROTATION[1], liveLeague, otherLeagues[1] || LEAGUE_ROTATION[2]].filter(Boolean);

  return (
    <PageLayout>
      <div className="min-h-screen relative flex flex-col w-full">
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="w-full flex flex-col">
          
          <motion.div variants={staggerItem} className="w-full bg-[#141414]/80 backdrop-blur-xl border-b border-white/10 text-white relative z-40">
            <button type="button" onClick={() => navigate('/league')} className="w-full max-w-7xl mx-auto px-4 md:px-8 py-2.5 flex items-center justify-center gap-2 sm:gap-3 hover:bg-white/5 transition-colors">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
              <span className="font-data font-black text-[10px] sm:text-xs uppercase tracking-widest shrink-0">Live Now</span>
              <span className="text-white/40 shrink-0">&middot;</span>
              <span className="font-black text-xs sm:text-sm uppercase tracking-wide truncate">
                {CURRENT_LEAGUE.fullName} &mdash; Season {CURRENT_LEAGUE.season}
              </span>
            </button>
          </motion.div>

          <motion.section variants={staggerItem} className="w-full pt-10 pb-16 sm:pt-14 sm:pb-20 px-4 relative z-30">
            <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center mt-2">
              <h1 className="font-black text-[42px] sm:text-6xl md:text-7xl lg:text-[80px] text-white leading-[0.9] tracking-tighter mb-2 drop-shadow-2xl uppercase">
                Fundaesliga<br />Quiz League
              </h1>
              <p className="font-data font-bold text-[9px] sm:text-xs text-white/60 uppercase tracking-[0.2em] mb-5 max-w-sm sm:max-w-none">
                A Mimir-Style International Quiz League
              </p>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }} className="bg-white/10 border border-white/20 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                {liveLeague.name} S{liveLeague.season} · Format
              </motion.div>

              <div className="flex items-stretch justify-center gap-2 sm:gap-3 mb-8 w-full max-w-xs sm:max-w-sm">
                <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl flex-1 py-3 px-1 flex flex-col items-center justify-center">
                  <span className="font-data font-black text-lg sm:text-2xl text-white leading-none">{liveConfig.entrantsPerGame}</span>
                  <span className="font-data text-[7px] sm:text-[8px] text-white/50 uppercase tracking-widest mt-1">{liveConfig.isTeamEvent ? 'Teams/Game' : 'Players/Game'}</span>
                </div>
                <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl flex-1 py-3 px-1 flex flex-col items-center justify-center">
                  <span className="font-data font-black text-lg sm:text-2xl text-white leading-none">{liveConfig.questionsPerGame}</span>
                  <span className="font-data text-[7px] sm:text-[8px] text-white/50 uppercase tracking-widest mt-1">Questions</span>
                </div>
                <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl flex-1 py-3 px-1 flex flex-col items-center justify-center">
                  <span className="font-data font-black text-lg sm:text-2xl text-white leading-none">{liveConfig.isTeamEvent ? 'TEAM' : 'SOLO'}</span>
                  <span className="font-data text-[7px] sm:text-[8px] text-white/50 uppercase tracking-widest mt-1">Format</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-3 w-full max-w-[500px] px-2">
                <motion.button whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.015 }} onClick={() => navigate('/league')} className="w-full bg-[#FF4D1C] text-white rounded-xl font-black py-3.5 sm:py-4 text-sm sm:text-base tracking-widest uppercase flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,77,28,0.5)] border border-[#FF4D1C]/50">
                  <Play size={20} fill="currentColor" /> Enter League Menu
                </motion.button>
                <div className="grid grid-cols-2 gap-3 w-full">
                  <motion.button whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.02 }} onClick={() => navigate('/league/read/open')} className="w-full bg-white/10 backdrop-blur-md text-white rounded-xl font-black py-3 sm:py-3.5 text-[10px] sm:text-xs tracking-widest uppercase flex items-center justify-center gap-2 border border-white/20 hover:bg-white/20 transition-colors">
                    <BookOpen size={16} /> Sign Up to Read
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.02 }} onClick={() => navigate('/league/season')} className="w-full bg-white/10 backdrop-blur-md text-white rounded-xl font-black py-3 sm:py-3.5 text-[10px] sm:text-xs tracking-widest uppercase flex items-center justify-center gap-2 border border-white/20 hover:bg-white/20 transition-colors">
                    <Trophy size={16} /> Leaderboard
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section variants={staggerItem} className="w-full py-10 sm:py-14 relative z-20">
            <div className="text-center mb-6 sm:mb-8 px-4 relative z-40">
              <h3 className="font-black text-2xl sm:text-4xl uppercase text-[#141414] bg-white px-8 py-3 border-[4px] border-[#141414] w-fit mx-auto shadow-[8px_8px_0px_rgba(0,0,0,1)]">
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
                const bgColor = isLeft ? '#161616' : isCenter ? '#FF5A1F' : '#FFC800';
                const onDark = isLeft;

                return (
                  <div key={league.slug || index} onClick={isLive ? () => navigate('/league/leaderboard') : undefined} className={`relative w-[45%] max-w-[300px] min-w-[140px] aspect-[2.5/4] sm:aspect-[3/4] flex flex-col transition-all duration-300 ease-out ${isLive ? 'cursor-pointer hover:scale-[1.08] hover:-translate-y-4' : 'cursor-default'}`} style={{ transform, zIndex: isCenter ? 30 : 10, transformStyle: 'preserve-3d', filter: isLive ? 'none' : 'brightness(0.75) contrast(1.1) grayscale(0.15)' }}>
                    {isLive && (
                      <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 bg-[#141414] text-white px-4 sm:px-6 py-1.5 sm:py-2 flex items-center gap-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] border-2 border-[#141414] z-50 rounded-full w-max">
                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500 animate-pulse" />
                        <span className="font-data font-black text-[10px] sm:text-xs uppercase tracking-widest leading-none mt-0.5">Live Now</span>
                      </div>
                    )}
                    <div className="w-full h-full border-[3px] sm:border-[5px] border-[#141414] relative flex flex-col p-3 sm:p-5 overflow-hidden" style={{ backgroundColor: bgColor, boxShadow: isCenter ? '15px 15px 0px rgba(0,0,0,1)' : '8px 8px 0px rgba(0,0,0,0.8)' }}>
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 pointer-events-none" />
                      <div className="bg-white border-[3px] sm:border-[4px] border-[#141414] p-2 sm:p-4 mt-6 sm:mt-8 flex flex-col items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,1)] relative z-10 -skew-x-2 -skew-y-1 transform-gpu">
                        <span className="font-black text-sm sm:text-2xl uppercase leading-tight text-center break-words w-full text-[#141414]">
                          {league.name}
                        </span>
                      </div>
                      <div className="mt-auto relative z-10 w-full flex flex-col gap-1 sm:gap-2">
                        <p className="text-[9px] sm:text-xs font-data font-black text-white/90 bg-[#141414]/40 p-1 sm:p-2 uppercase tracking-widest text-center border-2 border-black/20">
                          {league.format}
                        </p>
                        <div className="flex justify-between items-end mt-2 border-t-2 border-black/20 pt-2">
                          <div className="flex gap-1">
                             <div className={`w-1.5 h-6 ${onDark ? 'bg-white/25' : 'bg-black/20'}`} />
                             <div className={`w-3 h-6 ${onDark ? 'bg-white/25' : 'bg-black/20'}`} />
                             <div className={`w-1 h-6 ${onDark ? 'bg-white/25' : 'bg-black/20'}`} />
                          </div>
                          <p className={`text-xl sm:text-4xl font-black opacity-90 leading-none tracking-tighter ${onDark ? 'text-white' : 'text-[#141414]'}`}>
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

          <div className="w-full max-w-6xl mx-auto px-4 md:px-8 flex flex-col gap-8 sm:gap-10 pb-16 relative z-20">
            <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={staggerItem} className="w-full bg-[#141414]/60 backdrop-blur-xl border border-white/10 p-5 sm:p-7 md:p-8 space-y-6 rounded-3xl">
              <div className="relative z-10">
                <div className="bg-white/10 border border-white/20 text-white font-data font-black text-xs px-3 py-1 rounded w-fit mb-4">ABOUT</div>
                <h3 className="font-black uppercase text-2xl sm:text-3xl mb-2 text-white tracking-tight">FundaesLiga</h3>
                <p className="font-bold text-white/60 leading-relaxed max-w-xl text-sm md:text-base">
                  FundaesLiga is a platform for quiz enthusiasts &mdash; players and readers compete in weekly and seasonal leagues. Play, read, and climb the leaderboards.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {features.map((f) => (
                  <TiltCard key={f.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-start gap-4 hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-[#141414] shadow-inner" style={{ backgroundColor: f.bg }}>
                      <f.icon size={24} strokeWidth={2.5} />
                    </div>
                    <span className="font-black uppercase text-sm tracking-wide text-white block leading-tight">{f.label}</span>
                  </TiltCard>
                ))}
              </div>
            </motion.section>

            <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={staggerItem} className="w-full max-w-3xl mx-auto bg-[#141414]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <h2 className="text-white text-xl sm:text-2xl font-black uppercase text-center tracking-widest mb-6">FLQL Community</h2>
              <div className="flex flex-col gap-4">
                {communityLinks.map((link, idx) => (
                  <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="w-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-2xl p-4 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: link.color }}>
                        <link.icon size={20} className="text-[#141414]" strokeWidth={2.5} />
                      </div>
                      <div className="text-left">
                        <h4 className="text-white font-black text-sm sm:text-base uppercase tracking-wide">{link.title}</h4>
                        <p className="text-white/50 font-data font-bold text-[10px] sm:text-xs uppercase tracking-widest mt-0.5">{link.sub}</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all mr-2" />
                  </a>
                ))}
              </div>
            </motion.section>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};