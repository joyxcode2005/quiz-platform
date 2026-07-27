import React, { useEffect, useId, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Users, ShieldCheck, ChevronRight, Play, BookOpen, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/layout/PageLayout';
import { TiltCard } from '../components/ui/TiltCard';
import { staggerContainer, staggerItem } from '../lib/animations';
import { CURRENT_LEAGUE, LEAGUE_ROTATION, COMPETITION_CONFIG, type LeagueInfo } from '../types';

// ============================================================================
// BRAND ICONS
// ============================================================================

const BrandWhatsapp = ({ className, strokeWidth = 2 }: { className?: string; strokeWidth?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} strokeWidth={strokeWidth}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.02-1.04 2.484s1.065 2.878 1.213 3.076c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.409-.074-.119-.272-.194-.57-.342M12.003 22c-1.69 0-3.336-.454-4.786-1.314l-.343-.204-3.557.93 1.002-3.468-.224-.356A9.953 9.953 0 0 1 2 12c0-5.514 4.486-10 10.003-10 5.513 0 10.001 4.486 10.001 10S17.516 22 12.003 22m0-21.5C5.66 .5.5 5.658.5 12c0 2.025.534 3.992 1.547 5.727L.5 23.5l5.922-1.556A11.455 11.455 0 0 0 12.003 23.5c6.34 0 11.498-5.158 11.498-11.5S18.343.5 12.003.5" />
  </svg>
);

const BrandFacebook = ({ className, strokeWidth = 2 }: { className?: string; strokeWidth?: number }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const BrandYoutube = ({ className, strokeWidth = 2 }: { className?: string; strokeWidth?: number }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .54 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .54-5.33 29 29 0 0 0-.54-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

// ============================================================================
// DYNAMIC HERO TEXT MASKING
// ============================================================================
// PageLayout renders the colored blobs as `position: fixed` — they never
// move, but this text scrolls with the page. So instead of a static
// mix-blend-mode trick (which only cancels out cleanly against ONE exact
// background color), we mirror the blobs' real geometry here and clip a
// black copy of the text to their union. Wherever the text currently
// overlaps a blob it reads black; everywhere else it reads brand-orange.
// Recalculated on scroll/resize, so it updates live as you scroll.
// Only active below the `sm` breakpoint — sm+ keeps the original
// mix-blend-mode look untouched.

type HeroBlob = {
  size: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  topPct?: number;
  bottomPct?: number;
  leftPct?: number;
  rightPct?: number;
};

// Mirrors PageLayout.tsx's fixed background blobs (base/mobile sizes only)
const HERO_BLOBS: HeroBlob[] = [
  { size: 350, top: -128, left: -128 },     // main orange blob (#FF7A1A)
  { size: 200, topPct: 0.30, right: -40 },  // yellow blob (#FFC800)
  { size: 120, top: -40, rightPct: 0.20 },  // gold blob (#FFD700)
  { size: 150, bottomPct: 0.10, left: -40 }, // red-orange blob (#FF4D1C)
];

function resolveBlobCircle(blob: HeroBlob, vw: number, vh: number) {
  const size = blob.size;
  const r = size / 2;

  let left: number;
  if (blob.left !== undefined) left = blob.left;
  else if (blob.leftPct !== undefined) left = vw * blob.leftPct;
  else if (blob.right !== undefined) left = vw - size - blob.right;
  else if (blob.rightPct !== undefined) left = vw - size - vw * blob.rightPct;
  else left = 0;

  let top: number;
  if (blob.top !== undefined) top = blob.top;
  else if (blob.topPct !== undefined) top = vh * blob.topPct;
  else if (blob.bottom !== undefined) top = vh - size - blob.bottom;
  else if (blob.bottomPct !== undefined) top = vh - size - vh * blob.bottomPct;
  else top = 0;

  return { cx: left + r, cy: top + r, r };
}

const DynamicHeroMask: React.FC<{
  children: React.ReactNode;
  className: string;
  as: 'h1' | 'p';
}> = ({ children, className, as: Tag }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [circles, setCircles] = useState<{ cx: number; cy: number; r: number }[]>([]);
  const clipId = useId().replace(/:/g, '');

  useEffect(() => {
    let rafId: number | null = null;

    const update = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setCircles(
        HERO_BLOBS.map((blob) => {
          const { cx, cy, r } = resolveBlobCircle(blob, vw, vh);
          return { cx: cx - rect.left, cy: cy - rect.top, r };
        })
      );
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        update();
      });
    };

    update();

    const scrollEl = (wrapRef.current?.closest('.overflow-y-auto') as HTMLElement | null) ?? window;
    scrollEl.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      scrollEl.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <Tag className={`${className} sm:mix-blend-difference`} style={{ color: '#FF7A1A' }}>
        {children}
      </Tag>
      <div
        aria-hidden="true"
        className={`absolute inset-0 top-0 left-0 sm:hidden ${className}`}
        style={{ color: '#0A0A0A', clipPath: `url(#${clipId})` }}
      >
        {children}
      </div>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            {circles.map((c, i) => (
              <circle key={i} cx={c.cx} cy={c.cy} r={c.r} />
            ))}
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

// ============================================================================
// TICKET STUB COMPONENTS
// ============================================================================

const Barcode: React.FC<{ seed: string }> = ({ seed }) => {
  const bars = Array.from({ length: 16 }, (_, i) => {
    const code = seed.charCodeAt(i % seed.length);
    return { w: 1 + ((code * (i + 3)) % 3), tall: (code + i) % 3 !== 0 };
  });
  return (
    <div className="flex items-end h-5 md:h-7 gap-[1px] md:gap-[2px] opacity-90">
      {bars.map((b, i) => (
        <span key={i} className="bg-[#FFC800]" style={{ width: `${b.w}px`, height: b.tall ? '100%': '65%' }} />
      ))}
    </div>
  );
};

const STATUS_LABEL: Record<LeagueInfo['status'], string> = {
  'live': 'LIVE GATE',
  'up-next': 'BOARDING SOON',
  'concluded': 'GATE CLOSED',
};

const TicketStub: React.FC<{ league: LeagueInfo; className?: string }> = ({ league, className }) => {
  const isLive = league.status === 'live';
  const isConcluded = league.status === 'concluded';

  return (
    <div
      className={`relative rounded-xl md:rounded-2xl overflow-hidden flex flex-col w-full h-full ${className}`}
      style={{
        filter: isConcluded ? 'grayscale(0.6) brightness(0.6)' : 'none',
      }}
    >
      <div className="p-3 md:p-5 pb-2 md:pb-3 flex-1 flex flex-col justify-center" style={{ background: isLive ? `linear-gradient(155deg, #FFC800, #FF4D1C)` : '#1A1A1A' }}>
        <div className="flex justify-between items-center mb-1 md:mb-2">
            
          {isLive && (
            <span className="font-data text-[6px] md:text-[9px] font-black tracking-widest bg-[#141414] text-[#FFC800] px-1.5 md:px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md shrink-0 ml-1">
              <span className="w-1 h-1 rounded-full bg-[#FF4D1C] animate-pulse" /> LIVE
            </span>
          )}
        </div>
        <h4 className="font-black uppercase text-base sm:text-xl md:text-3xl leading-[1] tracking-tighter" style={{ color: isLive ? '#141414' : '#FFFFFF' }}>
          {league.name}
        </h4>
        <p className="font-data text-[6px] md:text-[9px] uppercase tracking-wide mt-1 leading-tight opacity-90 truncate" style={{ color: isLive ? '#141414' : '#FFFFFF' }}>
          {league.format}
        </p>
      </div>

      <div className="relative flex items-center h-3 md:h-5 bg-[#1A1A1A] overflow-hidden shrink-0">
        <div className="absolute -left-2 w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#141414]" />
        <div className="w-full border-t border-dashed border-[#141414] mx-2 opacity-50" />
        <div className="absolute -right-2 w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#141414]" />
      </div>

      <div className="p-3 md:p-5 pt-1 md:pt-2 flex items-center justify-between shrink-0" style={{ background: '#1A1A1A' }}>
        <Barcode seed={league.slug} />
        <span className="font-black text-xl md:text-4xl leading-none tracking-tighter" style={{ color: '#FFC800' }}>
          S{league.season}
        </span>
      </div>

      <div
        className="font-data text-center text-[6px] md:text-[8px] font-bold tracking-[0.2em] py-1 md:py-2 uppercase shrink-0"
        style={{ background: '#0A0A0A', color: isLive ? '#FF4D1C' : 'rgba(255,255,255,0.3)' }}
      >
        {STATUS_LABEL[league.status]}
      </div>
    </div>
  );
};

// ============================================================================
// MAIN PAGE
// ============================================================================

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Trophy, label: 'Exciting Weekly Matches', bg: '#FF4D1C' },
    { icon: Users, label: 'Readers & Players Leagues', bg: '#FF7A1A' },
    { icon: ShieldCheck, label: 'Fair Play & Transparency', bg: '#FFC800' },
  ];

  const communityLinks = [
    { title: "WhatsApp Helpline", sub: "For Urgent Queries", icon: BrandWhatsapp, color: "#FFC800", url: "https://chat.whatsapp.com/DjVKndAg9dr9rxf4HtT6HC" },
    { title: "Facebook Group", sub: "League Discussions", icon: BrandFacebook, color: "#FF7A1A", url: "https://www.facebook.com/groups/1453154115028958/" },
    { title: "Watch on YouTube", sub: "Past Match VODs", icon: BrandYoutube, color: "#FF4D1C", url: "https://www.youtube.com/channel/UCnJBT7GJSceYH-LfFOqSb_Q" }
  ];

  const liveLeague = LEAGUE_ROTATION.find(l => l.status === 'live') || LEAGUE_ROTATION[0];
  const liveConfig = liveLeague.slug === 'smashdown' ? COMPETITION_CONFIG.smashdown : COMPETITION_CONFIG.india;
  const otherLeagues = LEAGUE_ROTATION.filter(l => l.status !== 'live');
  const displayLeagues = [otherLeagues[0] || LEAGUE_ROTATION[1], liveLeague, otherLeagues[1] || LEAGUE_ROTATION[2]].filter(Boolean);

  return (
    <PageLayout>
      <div className="min-h-screen flex flex-col w-full text-white overflow-x-hidden">
        
        {/* Removed relative and z-10 here so blend mode can reach the background layer */}
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="w-full flex flex-col">
          
          {/* ================= HERO SECTION ================= */}
          {/* Removed relative and z-30 here */}
          <motion.section variants={staggerItem} className="w-full pt-4 pb-6 sm:pt-6 sm:pb-8 md:pt-10 md:pb-12 px-4">
            
            {/* Removed relative and z-10 here */}
            <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center text-center">
              
              <button 
                type="button" 
                onClick={() => navigate('/league/leaderboard')} 
                className="mb-4 md:mb-5 bg-[#141414]/80 backdrop-blur-xl border border-[#FF4D1C]/50 shadow-[0_0_20px_rgba(255,77,28,0.2)] hover:shadow-[0_0_30px_rgba(255,77,28,0.4)] hover:bg-[#141414] px-4 md:px-5 py-1.5 md:py-2 rounded-full flex items-center justify-center gap-2 sm:gap-3 transition-all cursor-pointer group"
              >
                <Activity className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#FF4D1C] group-hover:animate-pulse" />
                <span className="font-data font-black text-[8px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#FF4D1C]">Live Now</span>
                <span className="text-white/30 shrink-0">&middot;</span>
                <span className="font-black text-[9px] sm:text-xs md:text-xs uppercase tracking-widest text-white/90 truncate">
                  {CURRENT_LEAGUE.fullName} S{CURRENT_LEAGUE.season}
                </span>
                <ChevronRight className="w-3 h-3 md:w-3.5 md:h-3.5 text-white/40 group-hover:text-[#FF4D1C] transition-colors group-hover:translate-x-1" />
              </button>

              <DynamicHeroMask
                as="h1"
                className="font-black text-4xl sm:text-5xl md:text-[60px] lg:text-[76px] leading-[0.9] tracking-tighter mb-2 md:mb-3 uppercase"
              >
                Fundaesliga<br />Quiz League
              </DynamicHeroMask>

              <DynamicHeroMask
                as="p"
                className="font-data font-bold text-[8px] sm:text-[10px] md:text-[11px] lg:text-xs uppercase tracking-[0.3em] mb-6 md:mb-8 max-w-[280px] sm:max-w-none"
              >
                A Mimir-Style International Quiz League
              </DynamicHeroMask>

              <div className="flex items-stretch justify-center gap-2 md:gap-4 mb-6 md:mb-8 w-full max-w-[300px] sm:max-w-sm md:max-w-xl relative z-20">
                <div className="bg-[#141414]/60 border border-white/10 backdrop-blur-xl rounded-xl md:rounded-2xl flex-1 py-3 md:py-4 px-1 flex flex-col items-center justify-center shadow-lg">
                  <span className="font-data font-black text-xl sm:text-2xl md:text-3xl text-white leading-none">{liveConfig.entrantsPerGame}</span>
                  <span className="font-data text-[7px] sm:text-[8px] md:text-[9px] text-white/40 uppercase tracking-[0.2em] mt-1.5 md:mt-2">{liveConfig.isTeamEvent ? 'Teams/Game' : 'Players/Game'}</span>
                </div>
                <div className="bg-[#141414]/60 border border-white/10 backdrop-blur-xl rounded-xl md:rounded-2xl flex-1 py-3 md:py-4 px-1 flex flex-col items-center justify-center shadow-lg">
                  <span className="font-data font-black text-xl sm:text-2xl md:text-3xl text-white leading-none">{liveConfig.questionsPerGame}</span>
                  <span className="font-data text-[7px] sm:text-[8px] md:text-[9px] text-white/40 uppercase tracking-[0.2em] mt-1.5 md:mt-2">Questions</span>
                </div>
                <div className="bg-[#141414]/60 border border-white/10 backdrop-blur-xl rounded-xl md:rounded-2xl flex-1 py-3 md:py-4 px-1 flex flex-col items-center justify-center shadow-lg">
                  <span className="font-data font-black text-xl sm:text-2xl md:text-3xl text-white leading-none">{liveConfig.isTeamEvent ? 'TEAM' : 'SOLO'}</span>
                  <span className="font-data text-[7px] sm:text-[8px] md:text-[9px] text-white/40 uppercase tracking-[0.2em] mt-1.5 md:mt-2">Format</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 md:gap-3 w-full max-w-[400px] md:max-w-[550px] px-4 relative z-20">
                <motion.button whileTap={{ scale: 0.96 }} onClick={() => navigate('/league')} className="w-full bg-[#FF4D1C] md:hover:bg-[#FF4D1C]/90 transition-colors text-[#141414] rounded-xl md:rounded-2xl font-black py-3.5 md:py-4 text-xs sm:text-sm md:text-sm lg:text-base tracking-widest uppercase flex items-center justify-center gap-2 md:gap-3 shadow-[0_0_30px_rgba(255,77,28,0.4)]">
                  <Play className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" /> Enter League Menu
                </motion.button>
                <div className="grid grid-cols-2 gap-2 md:gap-3 w-full">
                  <motion.button whileTap={{ scale: 0.96 }} onClick={() => navigate('/league/read/open')} className="w-full bg-[#141414]/60 backdrop-blur-xl text-white rounded-xl md:rounded-2xl font-black py-3 md:py-3.5 text-[9px] sm:text-[10px] md:text-[11px] tracking-widest uppercase flex items-center justify-center gap-2 border border-white/10 md:hover:border-white/30 md:hover:bg-white/10 transition-all shadow-lg">
                    <BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/70" /> Sign Up to Read
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.96 }} onClick={() => navigate('/league/season')} className="w-full bg-[#141414]/60 backdrop-blur-xl text-white rounded-xl md:rounded-2xl font-black py-3 md:py-3.5 text-[9px] sm:text-[10px] md:text-[11px] tracking-widest uppercase flex items-center justify-center gap-2 border border-white/10 md:hover:border-white/30 md:hover:bg-white/10 transition-all shadow-lg">
                    <Trophy className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/70" /> Leaderboard
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ================= TICKET STUB LEAGUES ================= */}
          <motion.section variants={staggerItem} className="w-full py-6 sm:py-8 md:py-10 relative z-20 overflow-hidden">
            <div className="text-center mb-5 md:mb-8 px-4 relative z-40">
              <div className="inline-flex flex-col items-center">
                <span className="font-data font-black text-[9px] md:text-[10px] text-white/40 tracking-[0.3em] uppercase mb-2 md:mb-2.5">Explore League Types</span>
                <h3 className="font-black text-xl sm:text-3xl md:text-3xl uppercase text-[#141414] bg-[#FFC800] px-6 md:px-8 py-2 md:py-2.5 border-[3px] border-[#141414] shadow-[6px_6px_0_rgba(0,0,0,1)] md:shadow-[8px_8px_0_rgba(0,0,0,1)]">
                  The Leagues
                </h3>
              </div>
            </div>
            
            <div className="flex max-md:grid max-md:grid-cols-3 max-md:-space-x-12 max-md:px-4 justify-center items-center md:px-8 max-w-[1100px] mx-auto w-full md:gap-6 lg:gap-8 pb-4">
              {displayLeagues.map((league, index) => {
                const isLive = league.status === 'live';

                return (
                  <div
                    key={league.slug || index}
                    onClick={isLive ? () => navigate('/league/leaderboard') : undefined}
                    className={`relative w-full md:max-w-[300px] lg:max-w-[340px] transition-all duration-500 ease-out ${isLive ? 'z-30 scale-[1.08] shadow-[0_15px_30px_rgba(0,0,0,0.6)] cursor-pointer md:hover:scale-[1.03] md:hover:-translate-y-2' : 'z-10 scale-[0.88] opacity-75'}`}
                  >
                    <TicketStub league={league} />
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* ================= DESKTOP DASHBOARD GRID ================= */}
          <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 pb-8 md:pb-16 relative z-20 items-stretch">
            
            <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={staggerItem} className="w-full bg-[#141414]/60 backdrop-blur-xl border border-white/10 p-5 sm:p-6 md:p-8 space-y-4 md:space-y-6 rounded-[24px] md:rounded-[36px] shadow-2xl h-full flex flex-col">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <div className="bg-white/10 border border-white/20 text-white font-data font-black text-[9px] md:text-[10px] px-3 py-1 md:px-4 md:py-1.5 rounded-full uppercase tracking-widest">About</div>
                </div>
                <h3 className="font-black uppercase text-xl sm:text-2xl md:text-3xl mb-2 md:mb-3 text-white tracking-tight leading-[0.9]">Welcome to<br/>FundaesLiga</h3>
                <p className="font-bold text-white/50 leading-relaxed text-[11px] sm:text-xs md:text-[13px]">
                  FundaesLiga is a platform for quiz enthusiasts &mdash; players and readers compete in weekly and seasonal leagues. Play, read, and climb the leaderboards.
                </p>
              </div>
              <div className="grid gap-2 sm:gap-3 md:gap-3 flex-1 content-end mt-2 md:mt-3">
                {features.map((f) => (
                  <TiltCard key={f.label} className="bg-white/5 border border-white/10 rounded-[20px] md:rounded-2xl p-3 md:p-4 flex items-center gap-3 md:gap-4 hover:bg-white/10 transition-colors shadow-sm">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 shadow-inner" style={{ backgroundColor: f.bg }}>
                      <f.icon className="w-4 h-4 md:w-5 md:h-5 text-[#141414]" strokeWidth={2.5} />
                    </div>
                    <span className="font-black uppercase text-[10px] md:text-xs tracking-wide text-white/90 leading-tight">{f.label}</span>
                  </TiltCard>
                ))}
              </div>
            </motion.section>

            <motion.section initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={staggerItem} className="w-full bg-[#141414]/60 backdrop-blur-xl border border-white/10 rounded-[24px] md:rounded-[36px] p-5 sm:p-6 md:p-8 shadow-2xl h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="bg-[#FFC800]/20 border border-[#FFC800]/30 text-[#FFC800] font-data font-black text-[9px] md:text-[10px] px-3 py-1 md:px-4 md:py-1 rounded-full uppercase tracking-widest">Network</div>
              </div>
              <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight leading-[0.9] mb-4 md:mb-5">Join the<br/>Community</h2>
              
              <div className="flex flex-col gap-2 md:gap-3 flex-1 content-end">
                {communityLinks.map((link, idx) => (
                  <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="w-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 rounded-[20px] md:rounded-2xl p-3 md:p-4 flex items-center justify-between group shadow-sm">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 shadow-inner" style={{ backgroundColor: link.color }}>
                        <link.icon className="w-4 h-4 md:w-5 md:h-5 text-[#141414]" strokeWidth={2.5} />
                      </div>
                      <div className="text-left flex flex-col justify-center">
                        <h4 className="text-white font-black text-[11px] sm:text-xs md:text-sm uppercase tracking-wide group-hover:text-[#FFC800] transition-colors">{link.title}</h4>
                        <p className="text-white/40 font-data font-bold text-[8px] md:text-[9px] uppercase tracking-widest mt-0.5">{link.sub}</p>
                      </div>
                    </div>
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 group-hover:scale-105 transition-all">
                      <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-white/50 group-hover:text-white transition-colors" strokeWidth={3} />
                    </div>
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