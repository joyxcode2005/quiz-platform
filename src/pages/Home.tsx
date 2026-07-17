import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Info,
  Mail,
  Phone,
  AtSign,
  MapPin,
  HelpCircle,
  ChevronRight,
  Trophy,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/layout/PageLayout';
import { Button } from '../components/ui/Button';
import { TiltCard } from '../components/ui/TiltCard';
import { useParallax } from '../hooks/useParallax';
import { staggerContainer, staggerItem } from '../lib/animations';

const FlipCounter: React.FC<{ value: string; label: string; dark?: boolean }> = ({ value, label, dark }) => (
  <div>
    <div className="flex gap-[3px] mb-1.5">
      {value.split('').map((ch, i) => (
        <span key={i} className="flip-tile w-6 h-8 flex items-center justify-center font-data font-black text-base text-[var(--signal)]">
          {ch}
        </span>
      ))}
    </div>
    <p className={`text-xs uppercase tracking-widest font-data ${dark ? 'text-white/50' : 'text-[var(--ink)]/50'}`}>{label}</p>
  </div>
);

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const inkLayer = useParallax<HTMLDivElement>(0.45);
  const signalLayer = useParallax<HTMLDivElement>(0.28);
  const frontLayer = useParallax<HTMLDivElement>(0.05);
  const ghostNumeral = useParallax<HTMLSpanElement>(0.15);

  const features = [
    { icon: Trophy, label: 'Exciting Weekly Matches', bg: 'var(--neu-pink)' },
    { icon: Users, label: 'Readers & Players Leagues', bg: 'var(--neu-blue)' },
    { icon: ShieldCheck, label: 'Fair Play & Transparency', bg: 'var(--neu-green)' },
  ];

  const contactRows = [
    { icon: Mail, label: 'Email', value: 'hello@quizarena.com' },
    { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
    { icon: AtSign, label: 'Instagram', value: '@quiz.arena' },
    { icon: MapPin, label: 'Address', value: 'Quiz Arena HQ, India' },
  ];

  return (
    <PageLayout>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto space-y-0"
      >
        {/* ============================================================
            SECTION 1 — POSTER (raw). The hero hits like the reference
            poster: oversized orb, halftone grain, torn bottom edge.
           ============================================================ */}
        <motion.section variants={staggerItem} className="poster-block torn-bottom pt-10 pb-20 px-4 md:px-8 relative">
          <div className="poster-orb w-[420px] h-[420px] -top-40 -right-40 opacity-90" />
          <div className="poster-orb w-40 h-40 top-16 left-[8%] opacity-60" style={{ background: 'var(--brass, #B08D57)' }} />
          <div className="halftone" />

          <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-5 order-2 md:order-1">
              <span className="poster-sticker text-xs px-3 py-1.5">Live Now</span>
              <h1 className="poster-type text-4xl md:text-6xl lg:text-7xl" style={{ color: 'var(--bone)' }}>
                Play. Read.
                <br />
                Climb the board.
              </h1>
              <p className="font-bold text-white/70 text-md max-w-sm">
                Weekly quiz leagues for players and readers. Every match is scored,
                every reader is credited, every rank is earned.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button onClick={() => navigate('/league')} className="w-40 !bg-[var(--signal)] !text-white !border-white">
                  Play Now
                </Button>
                <a href="#about" className="inline-block">
                  <Button variant="outline" className="w-40 !bg-transparent !text-white !border-white">
                    How it Works
                  </Button>
                </a>
              </div>
              <div className="flex gap-6 pt-4">
                <FlipCounter value="120+" label="Players" dark />
                <FlipCounter value="36" label="Readers" dark />
                <FlipCounter value="08" label="Leagues" dark />
              </div>
            </div>

            <div className="order-1 md:order-2 relative h-64 md:h-96 perspective-1000 hidden md:block">
              <div
                ref={inkLayer.ref}
                style={{ transform: `translate(16px, 16px) rotate(4deg) translateY(${inkLayer.offset}px)` }}
                className="stack-layer bg-black brutal-border border-white/20"
              />
              <div
                ref={signalLayer.ref}
                style={{ transform: `translate(8px, 8px) rotate(-3deg) translateY(${signalLayer.offset}px)` }}
                className="stack-layer bg-[var(--signal)] brutal-border border-white/20"
              />
              <div
                ref={frontLayer.ref}
                style={{ transform: `translateY(${frontLayer.offset}px)` }}
                className="stack-layer bg-[var(--bone)] brutal-border p-6 flex flex-col justify-between overflow-hidden"
              >
                <span
                  ref={ghostNumeral.ref}
                  style={{ transform: `translateY(${ghostNumeral.offset}px)` }}
                  className="ghost-numeral absolute -right-6 -bottom-8 text-[10rem] pointer-events-none select-none"
                  aria-hidden="true"
                >
                  01
                </span>
                <div className="relative z-10">
                  <p className="text-xs font-data uppercase tracking-widest text-black/50">Active League</p>
                  <h2 className="text-xl font-black uppercase mt-2 text-[var(--ink)]">Weekly Draw League</h2>
                  <p className="font-data text-sm text-[var(--ink)]/60 mt-1">Jul 14 &mdash; Jul 20</p>
                </div>
                <div className="relative z-10 stamp text-[var(--signal)] text-xs font-data font-bold uppercase tracking-widest px-3 py-1 bg-white w-fit">
                  Round 3 of 6
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ============================================================
            SECTION 2 — NEUMORPHIC (soft). Upcoming leagues.
           ============================================================ */}
        <motion.section variants={staggerItem} className="neu-section p-6 md:p-10 -mt-1 space-y-5 rounded-none md:rounded-3xl">
          <h3 className="font-black text-lg uppercase text-[var(--ink)]/80">Upcoming</h3>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { label: 'Reader League', starts: 'Starts Jul 21', bg: 'var(--neu-blue)' },
              { label: 'Intl League', starts: 'Starts Jul 28', bg: 'var(--neu-yellow)' },
            ].map((league) => (
              <button
                key={league.label}
                type="button"
                onClick={() => navigate('/league')}
                className="neu-panel flex items-center justify-between p-5 text-left w-full"
                style={{ background: league.bg }}
              >
                <div className="flex items-center gap-4">
                  <div className="neu-puck bg-white/60 backdrop-blur-sm shrink-0">
                    <Calendar size={22} color="#0D0D0D" />
                  </div>
                  <div>
                    <h4 className="font-bold text-md uppercase text-[var(--ink)]">{league.label}</h4>
                    <p className="text-xs font-data text-[var(--ink)]/70 font-bold uppercase tracking-wide mt-0.5">
                      {league.starts}
                    </p>
                  </div>
                </div>
                <div className="neu-puck bg-white/60 backdrop-blur-sm shrink-0">
                  <ChevronRight size={20} strokeWidth={3} className="text-[var(--ink)]" />
                </div>
              </button>
            ))}
          </div>
        </motion.section>

      
        {/* ============================================================
            SECTION 4 — TACTILE NEUMORPHIC. About Section.
           ============================================================ */}
        <motion.section variants={staggerItem} id="about" className="neu-section p-6 md:p-10 space-y-8 scroll-mt-20 relative overflow-hidden mt-4 rounded-[32px]">
          <div className="grain" />
          <div className="relative z-10">
            <div className="woven-tag text-[var(--ink)] font-data font-black text-xs px-3 py-1 w-fit mb-4 shadow-sm">
              ABOUT
            </div>
            <h3 className="font-black uppercase text-2xl md:text-3xl mb-3 text-[var(--ink)] tracking-tight">Quiz Arena</h3>
            <p className="font-bold text-[var(--ink)]/60 leading-relaxed max-w-xl text-sm md:text-base">
              Quiz Arena is a platform for quiz enthusiasts &mdash; players and readers compete in weekly and
              seasonal leagues. Play, read, and climb the leaderboards.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative z-10">
            {features.map((f) => (
              <TiltCard
                key={f.label}
                className="neu-panel border-none p-6 flex flex-col items-start gap-6"
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

        {/* ============================================================
            SECTION 5 — FELT BANNER (Physical). Contact board.
           ============================================================ */}
        <motion.section variants={staggerItem} id="contact" className="felt-banner text-white p-6 md:p-10 space-y-8 scroll-mt-20 pb-12 relative overflow-hidden rounded-[32px] mt-8 mb-8 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)]">
          <div className="rivet-corners hidden md:block">
            <div className="rivet" />
            <div className="rivet" />
            <div className="rivet" />
            <div className="rivet" />
          </div>
          
          <div className="relative z-10">
            <h3 className="font-black uppercase text-3xl emboss-dark text-[var(--bone)] tracking-tight">Contact Us</h3>
            <div className="stitch-line text-white/30 my-5 max-w-xs" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative z-10">
            <div className="space-y-4">
              {contactRows.map((row) => (
                <div key={row.label} className="bg-black/20 border-[3px] border-black/40 p-4 rounded-2xl flex items-center gap-4 shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)] backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-b from-white/10 to-transparent border border-white/10 flex items-center justify-center shrink-0 shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
                    <row.icon size={20} strokeWidth={2.5} className="text-[var(--bone)]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black font-data text-white/50 uppercase tracking-widest">
                      {row.label}
                    </p>
                    <p className="font-bold text-sm mt-0.5 text-[var(--bone)] emboss-dark">{row.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-center gap-6 bg-[var(--bone)] p-8 rounded-2xl brutal-shadow-sm text-[var(--ink)] md:transform md:rotate-2 border-[4px] border-[var(--ink)] relative">
              <div className="grain pointer-events-none" />
              <div className="stamp text-[var(--signal)] font-data font-black text-xs px-3 py-1 w-fit mb-2 relative z-10 bg-white">
                SUPPORT DESK
              </div>
              <p className="font-bold text-[var(--ink)]/70 text-sm leading-relaxed relative z-10">
                Got a question about leagues, reading duty, or scoring? Send us a message
                and we'll get back within a day.
              </p>
              <button className="neu-pill w-full py-4 font-black uppercase text-sm tracking-wide bg-[var(--signal)] text-white shadow-xl hover:scale-[1.02] transition-transform relative z-10">
                Send Us a Message
              </button>
            </div>
          </div>
        </motion.section>

      </motion.div>
    </PageLayout>
  );
};