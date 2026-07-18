import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Trophy, Play, BookOpen, Users, 
  Crown, ChevronRight, Activity, HandMetal,
  MessageCircle, Video, FileText, Shuffle
} from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { staggerItem } from '../lib/animations';

/* =======================================================================
   ANIMATION VARIANTS
   ======================================================================= */
const springTransition = { type: 'spring', damping: 20, stiffness: 120 };
const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: springTransition }
};

/* =======================================================================
   REUSABLE SYSTEM COMPONENTS
   ======================================================================= */
const SectionDivider: React.FC<{ title: string; icon?: React.ElementType }> = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-3 w-full my-6">
    <div className="stitch-line flex-1" />
    <div className="woven-tag text-[var(--ink)] font-data font-black text-[10px] px-3 py-1 flex items-center gap-2">
      {Icon && <Icon size={12} strokeWidth={3} className="text-[var(--signal)]" />}
      {title}
    </div>
    <div className="stitch-line flex-1" />
  </div>
);

/* =======================================================================
   MAIN PAGE COMPONENT
   ======================================================================= */
export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="w-full flex flex-col bg-[var(--bone)]"
      >
        {/* ============================================================
            1. POSTER (HERO)
           ============================================================ */}
        <motion.section variants={staggerItem} className="poster-block torn-bottom pt-8 pb-16 sm:pt-12 sm:pb-24 px-4 relative w-full z-10 shadow-xl">
          <div className="poster-orb w-[300px] h-[300px] -top-20 -left-20 opacity-80" style={{ background: 'var(--neu-blue)' }} />
          <div className="poster-orb w-[400px] h-[400px] top-10 -right-32 opacity-60" style={{ background: 'var(--neu-pink)' }} />
          <div className="halftone" />
          
          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center text-center mt-4">
            <span className="poster-sticker text-xs px-4 py-1.5 shadow-md mb-6 transform -rotate-2 bg-[var(--neu-green)] border-[3px] border-[var(--ink)] text-[var(--ink)]">
              NOW RUNNING: SMASHDOWN S3
            </span>
            <h1 className="poster-type text-5xl sm:text-6xl lg:text-7xl text-[var(--bone)] leading-[0.9] tracking-tighter mb-4 drop-shadow-2xl">
              FUNDAESLIGA<br />QUIZ LEAGUE
            </h1>
            <p className="font-data font-bold text-xs sm:text-sm text-[var(--bone)]/70 uppercase tracking-widest mb-8 max-w-sm">
              A MIMIR-style International quiz league
            </p>
            
            <div className="grid grid-cols-2 gap-3 w-full px-2">
              <motion.button 
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/league')}
                className="col-span-2 neu-pill w-full bg-[var(--signal)] text-white font-black py-4 text-base sm:text-lg tracking-widest uppercase shadow-lg flex items-center justify-center gap-2"
              >
                <Play size={20} fill="currentColor" /> Enter League Menu
              </motion.button>
              
              <motion.button 
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/league/read/open')}
                className="neu-pill w-full bg-[var(--bone)] text-[var(--ink)] font-black py-3.5 text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-sm"
              >
                <BookOpen size={16} /> Sign Up to Read
              </motion.button>

              <motion.button 
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/league/season')}
                className="neu-pill w-full bg-[var(--bone)] text-[var(--ink)] font-black py-3.5 text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-sm"
              >
                <Trophy size={16} /> Leaderboard
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* ============================================================
            2. NEUMORPHIC (THE THREE LEAGUES)
           ============================================================ */}
        <motion.section variants={staggerItem} className="neu-section p-4 sm:p-6 md:p-8 -mt-8 pt-12 max-w-2xl mx-auto w-full space-y-6 sm:space-y-8 relative z-20">
          
          <SectionDivider title="OFFICIAL LEAGUE CIRCUIT" icon={Activity} />

          {/* League 1: Active Leader (Routes to League Menu) */}
          <motion.div variants={fadeUpItem} onClick={() => navigate('/league')} className="neu-panel bg-white p-5 sm:p-6 flex flex-col relative overflow-hidden cursor-pointer group shadow-md border-[3px] border-[var(--neu-blue)]">
            <div className="grain" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--neu-blue)] opacity-10 blur-3xl pointer-events-none" />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <span className="woven-tag text-[10px] bg-[var(--neu-blue)] text-white border-transparent">ACTIVE LEAGUE</span>
              <div className="neu-puck w-8 h-8 bg-white shadow-sm shrink-0 group-hover:bg-[var(--neu-blue)] transition-colors"><Activity size={14} className="text-[var(--ink)] group-hover:text-white" /></div>
            </div>
            
            <h2 className="font-black text-2xl sm:text-3xl uppercase text-[var(--ink)] tracking-tighter relative z-10 mb-1">
              Weekly Draw League
            </h2>
            <p className="font-bold text-xs text-[var(--ink)]/50 uppercase tracking-widest relative z-10">India &amp; Intl Tracks &middot; Week 7</p>
            
            <div className="stitch-line my-4 relative z-10" />
            
            <div className="flex justify-between items-center relative z-10">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((a) => <div key={a} className="w-8 h-8 rounded-full bg-[var(--bone)] border-2 border-white shadow-sm flex items-center justify-center font-black font-data text-[10px] text-[var(--ink)]/40">P{a}</div>)}
              </div>
              <span className="font-black text-xs text-[var(--ink)] uppercase tracking-widest flex items-center gap-1 group-hover:text-[var(--neu-blue)] transition-colors">Open Menu <ChevronRight size={14} /></span>
            </div>
          </motion.div>

          {/* Leagues 2 & 3: Seasonal & Reader */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <motion.div variants={fadeUpItem} onClick={() => navigate('/league/season')} className="neu-panel bg-white p-5 flex flex-col relative overflow-hidden cursor-pointer group">
              <div className="grain" />
              <div className="flex justify-between items-start mb-4 relative z-10">
                <span className="woven-tag text-[10px]">ONGOING</span>
                <div className="neu-puck w-8 h-8 bg-[var(--neu-yellow)] shadow-sm shrink-0 border-2 border-white"><Trophy size={14} className="text-[var(--ink)]" /></div>
              </div>
              <h2 className="font-black text-lg uppercase text-[var(--ink)] tracking-tight relative z-10 mb-1">Smashdown S3</h2>
              <p className="font-data font-bold text-[10px] text-[var(--ink)]/50 uppercase tracking-widest relative z-10">Seasonal Standings</p>
            </motion.div>

            <motion.div variants={fadeUpItem} onClick={() => navigate('/league/read/open')} className="neu-panel bg-white p-5 flex flex-col relative overflow-hidden cursor-pointer group">
              <div className="grain" />
              <div className="flex justify-between items-start mb-4 relative z-10">
                <span className="woven-tag text-[10px]">ONGOING</span>
                <div className="neu-puck w-8 h-8 bg-[var(--neu-pink)] shadow-sm shrink-0 border-2 border-white"><BookOpen size={14} className="text-[var(--ink)]" /></div>
              </div>
              <h2 className="font-black text-lg uppercase text-[var(--ink)] tracking-tight relative z-10 mb-1">Reader League</h2>
              <p className="font-data font-bold text-[10px] text-[var(--ink)]/50 uppercase tracking-widest relative z-10">Read games for QELO</p>
            </motion.div>
          </div>

          <SectionDivider title="LATEST DATA" icon={Shuffle} />

          {/* Real Data Integration: Draws Preview */}
          <motion.div variants={fadeUpItem} className="neu-panel bg-[var(--bone)] p-4 sm:p-5 relative overflow-hidden">
            <div className="grain" />
            <div className="rivet-corners hidden sm:block"><div className="rivet"/><div className="rivet"/><div className="rivet"/><div className="rivet"/></div>
            
            <div className="flex items-center justify-between border-b-[3px] border-dashed border-[var(--ink)]/10 pb-3 mb-3 relative z-10">
              <span className="font-data text-[10px] font-black text-[var(--ink)]/50 uppercase tracking-widest">
                WEEK 7 &middot; INDIA TRACK
              </span>
              <span className="font-data font-black text-xs text-[var(--signal)] bg-white px-2 py-1 shadow-sm border border-black/5">
                MATCH #7001
              </span>
            </div>
            
            <div className="flex flex-col gap-2 relative z-10">
              <div className="bg-white p-3 border-2 border-black/5 shadow-sm flex justify-between items-center">
                <span className="font-black text-xs sm:text-sm uppercase text-[var(--ink)]">Mario Fernando</span>
                <span className="font-data font-black text-[9px] uppercase tracking-widest text-[var(--neu-blue)]">India</span>
              </div>
              <div className="bg-white p-3 border-2 border-black/5 shadow-sm flex justify-between items-center">
                <span className="font-black text-xs sm:text-sm uppercase text-[var(--ink)]">Mark Grant</span>
                <span className="font-data font-black text-[9px] uppercase tracking-widest text-[var(--neu-blue)]">UK</span>
              </div>
            </div>
            <button onClick={() => navigate('/league/draws')} className="w-full mt-4 font-black uppercase text-xs tracking-widest text-[var(--ink)]/50 hover:text-[var(--ink)] relative z-10 text-center flex items-center justify-center gap-1">
              View Full Draws <ChevronRight size={14} />
            </button>
            <div className="punch-row absolute bottom-0 left-0 w-full opacity-30 punch-row-bottom" />
          </motion.div>

        </motion.section>

        {/* ============================================================
            3. POSTER (LEADERBOARD PREVIEW)
           ============================================================ */}
        <motion.section variants={staggerItem} className="poster-block torn-bottom pt-16 pb-24 mt-8 w-full relative z-10 shadow-2xl">
          <div className="halftone opacity-40" />
          <div className="poster-orb w-96 h-96 top-0 -left-48 opacity-50" style={{ background: 'var(--neu-coral)' }} />
          
          <div className="relative z-10 max-w-2xl mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-10">
              <span className="woven-tag text-[10px] mb-4 bg-[var(--bone)] text-[var(--ink)]">SMASHDOWN S3</span>
              <h2 className="poster-type text-4xl sm:text-5xl text-[var(--bone)] leading-none">TOP TEAMS</h2>
            </div>

            {/* Real Data Podium */}
            <div className="flex items-end justify-center gap-2 sm:gap-4 h-56 sm:h-64 mb-8">
              {/* 2nd Place */}
              <div className="neu-panel bg-[var(--bone)] w-24 sm:w-28 h-40 flex flex-col items-center pt-4 relative">
                <div className="grain" />
                <div className="neu-puck w-10 h-10 -mt-10 shadow-md relative z-10 bg-[#c9c9d4] border-2 border-[var(--bone)]">
                  <span className="font-black text-sm text-[var(--ink)]">2</span>
                </div>
                <div className="mt-4 text-center relative z-10">
                  <div className="font-black uppercase text-xs text-[var(--ink)] truncate w-20">2 Peas</div>
                  <div className="font-data font-black text-[var(--ink)]/50 text-[9px] tracking-widest mt-0.5">Anagha, Sharon</div>
                  <div className="font-data font-black text-[var(--neu-blue)] text-lg mt-1.5">45.5</div>
                </div>
              </div>
              
              {/* 1st Place */}
              <div className="neu-panel bg-white w-28 sm:w-32 h-52 flex flex-col items-center pt-4 relative z-10 shadow-2xl">
                <div className="grain" />
                <Crown size={24} className="absolute -top-16 text-[var(--neu-yellow)] drop-shadow-md" />
                <div className="neu-puck w-14 h-14 -mt-12 shadow-lg relative z-10 bg-[var(--neu-yellow)] border-2 border-white">
                  <span className="font-black text-xl text-[var(--ink)]">1</span>
                </div>
                <div className="mt-5 text-center relative z-10">
                  <div className="font-black uppercase text-sm text-[var(--ink)] truncate w-24">Aaj Kuch Chazzy</div>
                  <div className="font-data font-black text-[var(--ink)]/50 text-[9px] tracking-widest mt-0.5">Siddhant, Saswata</div>
                  <div className="font-data font-black text-[var(--signal)] text-2xl mt-1.5">52.0</div>
                </div>
              </div>
              
              {/* 3rd Place */}
              <div className="neu-panel bg-[var(--bone)] w-24 sm:w-28 h-36 flex flex-col items-center pt-4 relative">
                <div className="grain" />
                <div className="neu-puck w-10 h-10 -mt-10 shadow-md relative z-10 bg-[var(--neu-coral)] border-2 border-[var(--bone)]">
                  <span className="font-black text-sm text-[var(--ink)]">3</span>
                </div>
                <div className="mt-4 text-center relative z-10">
                  <div className="font-black uppercase text-xs text-[var(--ink)] truncate w-20">Aaramball</div>
                  <div className="font-data font-black text-[var(--ink)]/50 text-[9px] tracking-widest mt-0.5">Krittibas, Mayank</div>
                  <div className="font-data font-black text-[var(--neu-blue)] text-lg mt-1.5">44.5</div>
                </div>
              </div>
            </div>
            
            <button onClick={() => navigate('/league/season')} className="w-full font-black uppercase text-xs tracking-widest text-[var(--bone)]/50 hover:text-white relative z-10 text-center flex items-center justify-center gap-1">
              View Full Standings <ChevronRight size={14} />
            </button>
          </div>
        </motion.section>

        {/* ============================================================
            4. NEUMORPHIC (READER PORTAL)
           ============================================================ */}
        <motion.section variants={staggerItem} className="neu-section p-4 sm:p-6 md:p-8 -mt-8 pt-12 max-w-2xl mx-auto w-full space-y-6 sm:space-y-8 relative z-20">
          
          <SectionDivider title="READER PORTAL" icon={BookOpen} />
          
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 pb-4">
            <motion.div 
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/league/read/open')}
              className="neu-panel bg-white p-5 flex items-center gap-4 cursor-pointer relative overflow-hidden"
            >
              <div className="grain" />
              <div className="neu-puck w-12 h-12 bg-[var(--neu-pink)] border-2 border-white shadow-sm shrink-0 relative z-10">
                <HandMetal size={20} className="text-[var(--ink)]" strokeWidth={2.5} />
              </div>
              <div className="min-w-0 relative z-10">
                <h4 className="font-black uppercase text-sm sm:text-base text-[var(--ink)] truncate">Sign up to read</h4>
                <p className="font-data font-bold text-[10px] text-[var(--ink)]/50 uppercase tracking-widest mt-1">Express Interest</p>
              </div>
            </motion.div>

            <motion.div 
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/league/read/schedule')}
              className="neu-panel bg-[var(--ink)] p-5 flex items-center gap-4 cursor-pointer relative overflow-hidden shadow-inner border-none"
            >
              <div className="grain" />
              <div className="neu-puck w-12 h-12 bg-[var(--bone)] border-2 border-[var(--ink)] shadow-sm shrink-0 relative z-10">
                <FileText size={20} className="text-[var(--ink)]" strokeWidth={2.5} />
              </div>
              <div className="min-w-0 relative z-10">
                <h4 className="font-black uppercase text-sm sm:text-base text-[var(--bone)] truncate emboss-dark">Scoresheets</h4>
                <p className="font-data font-bold text-[10px] text-white/40 uppercase tracking-widest mt-1">Reader Submissions</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ============================================================
            5. FELT BANNER (COMMUNITY / CONTACT)
           ============================================================ */}
        <motion.section variants={staggerItem} className="felt-banner text-[var(--bone)] p-6 sm:p-10 rounded-[32px] mt-8 mb-8 max-w-2xl mx-auto w-full relative overflow-hidden shadow-[inset_0_4px_24px_rgba(0,0,0,0.6)]">
          <div className="grain" />
          <div className="rivet-corners hidden sm:block">
            <div className="rivet" /><div className="rivet" /><div className="rivet" /><div className="rivet" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="emboss-dark text-3xl sm:text-4xl font-black uppercase mb-6 tracking-tighter leading-none">FLQL Community</h2>
            <div className="stitch-line text-white/30 w-full mb-8" />
            
            <div className="w-full space-y-4">
              <a href="https://linktr.ee/flql" target="_blank" rel="noopener noreferrer" className="bg-black/20 border-[3px] border-black/40 p-4 rounded-2xl flex items-center justify-between shadow-[inset_0_2px_12px_rgba(0,0,0,0.4)] backdrop-blur-sm cursor-pointer hover:bg-black/30 transition-colors w-full">
                <div className="flex items-center gap-4">
                  <div className="neu-puck w-10 h-10 bg-[var(--neu-green)] shadow-sm shrink-0">
                    <MessageCircle size={18} className="text-[var(--ink)]" />
                  </div>
                  <div className="text-left">
                    <p className="font-black text-sm uppercase text-[var(--bone)] emboss-dark">WhatsApp Helpline</p>
                    <p className="font-data font-bold text-[9px] text-white/50 uppercase tracking-widest mt-0.5">For urgent queries</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-[var(--bone)] opacity-50" />
              </a>

              <a href="https://linktr.ee/flql" target="_blank" rel="noopener noreferrer" className="bg-black/20 border-[3px] border-black/40 p-4 rounded-2xl flex items-center justify-between shadow-[inset_0_2px_12px_rgba(0,0,0,0.4)] backdrop-blur-sm cursor-pointer hover:bg-black/30 transition-colors w-full">
                <div className="flex items-center gap-4">
                  <div className="neu-puck w-10 h-10 bg-[var(--neu-blue)] shadow-sm shrink-0">
                    <Users size={18} className="text-[var(--ink)]" />
                  </div>
                  <div className="text-left">
                    <p className="font-black text-sm uppercase text-[var(--bone)] emboss-dark">Facebook Group</p>
                    <p className="font-data font-bold text-[9px] text-white/50 uppercase tracking-widest mt-0.5">League Discussions</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-[var(--bone)] opacity-50" />
              </a>
              
              <a href="https://linktr.ee/flql" target="_blank" rel="noopener noreferrer" className="bg-black/20 border-[3px] border-black/40 p-4 rounded-2xl flex items-center justify-between shadow-[inset_0_2px_12px_rgba(0,0,0,0.4)] backdrop-blur-sm cursor-pointer hover:bg-black/30 transition-colors w-full">
                <div className="flex items-center gap-4">
                    <div className="neu-puck w-10 h-10 bg-[var(--neu-coral)] shadow-sm shrink-0">
                    <Video size={18} className="text-[var(--ink)]" />
                  </div>
                  <div className="text-left">
                    <p className="font-black text-sm uppercase text-[var(--bone)] emboss-dark">Watch on YouTube</p>
                    <p className="font-data font-bold text-[9px] text-white/50 uppercase tracking-widest mt-0.5">Past Match VODs</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-[var(--bone)] opacity-50" />
              </a>
            </div>
          </div>
        </motion.section>

      </motion.div>
    </PageLayout>
  );
};