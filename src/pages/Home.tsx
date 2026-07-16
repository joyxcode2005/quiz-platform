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
import { PageLayout } from '../components/layout/PageLayout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { TiltCard } from '../components/ui/TiltCard';
import { useParallax } from '../hooks/useParallax';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  // Three independent scroll-speeds create the stacked-paper depth illusion:
  // back layers drift more, the front (readable) card barely moves.
  const inkLayer = useParallax<HTMLDivElement>(0.45);
  const signalLayer = useParallax<HTMLDivElement>(0.28);
  const frontLayer = useParallax<HTMLDivElement>(0.05);
  const ghostNumeral = useParallax<HTMLSpanElement>(0.15);

  const features = [
    { icon: Trophy, label: 'Exciting Weekly Matches' },
    { icon: Users, label: 'Readers & Players Leagues' },
    { icon: ShieldCheck, label: 'Fair Play & Transparency' },
  ];

  const contactRows = [
    { icon: Mail, label: 'Email', value: 'hello@quizarena.com' },
    { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
    { icon: AtSign, label: 'Instagram', value: '@quiz.arena' },
    { icon: MapPin, label: 'Address', value: 'Quiz Arena HQ, India' },
  ];

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-12 md:space-y-16">

        {/* ---------------- HERO ---------------- */}
        <section className="pt-4 md:pt-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-5 order-2 md:order-1">
              <Badge variant="live">Live Now</Badge>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.95]">
                Play. Read.
                <br />
                Climb the board.
              </h1>
              <p className="font-bold text-black/70 text-md max-w-sm">
                Weekly quiz leagues for players and readers. Every match is scored,
                every reader is credited, every rank is earned.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button onClick={() => navigate('/league')} className="w-40">
                  Play Now
                </Button>
                <a href="#about">
                  <Button variant="outline" className="w-40">
                    How it Works
                  </Button>
                </a>
              </div>
              <div className="flex gap-6 pt-4 font-data">
                <div>
                  <p className="text-2xl font-black">120+</p>
                  <p className="text-xs uppercase tracking-widest text-black/50">Players</p>
                </div>
                <div>
                  <p className="text-2xl font-black">36</p>
                  <p className="text-xs uppercase tracking-widest text-black/50">Readers</p>
                </div>
                <div>
                  <p className="text-2xl font-black">08</p>
                  <p className="text-xs uppercase tracking-widest text-black/50">Leagues</p>
                </div>
              </div>
            </div>

            {/* Spatial paper-stack: real rotated layers, each on its own scroll-parallax speed */}
            <div className="order-1 md:order-2 relative h-64 md:h-96 perspective-1000">
              <div className="glow-signal w-64 h-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <div
                ref={inkLayer.ref}
                style={{ transform: `translate(16px, 16px) rotate(4deg) translateY(${inkLayer.offset}px)` }}
                className="stack-layer bg-[var(--ink)] brutal-border"
              />
              <div
                ref={signalLayer.ref}
                style={{ transform: `translate(8px, 8px) rotate(-3deg) translateY(${signalLayer.offset}px)` }}
                className="stack-layer bg-[var(--signal)] brutal-border"
              />
              <div
                ref={frontLayer.ref}
                style={{ transform: `translateY(${frontLayer.offset}px)` }}
                className="stack-layer bg-white brutal-border p-6 flex flex-col justify-between overflow-hidden"
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
                  <h2 className="text-xl font-black uppercase mt-2">Weekly Draw League</h2>
                  <p className="font-data text-sm text-black/60 mt-1">Jul 14 &mdash; Jul 20</p>
                </div>
                <div className="relative z-10 stamp text-[var(--signal)] text-xs font-data font-bold uppercase tracking-widest px-3 py-1 bg-white w-fit">
                  Round 3 of 6
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="hazard-stripe -mx-4 md:-mx-8" />

        {/* ---------------- UPCOMING LEAGUES ---------------- */}
        <section className="space-y-4">
          <h3 className="font-black text-lg uppercase">Upcoming</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="flex items-center justify-between cursor-pointer hover:bg-[var(--bone)] transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 brutal-border bg-[var(--bone)]">
                  <Calendar size={22} color="#0D0D0D" />
                </div>
                <div>
                  <h4 className="font-bold text-md">Reader League</h4>
                  <p className="text-xs font-data text-[var(--signal)] font-bold uppercase tracking-wide">
                    Starts Jul 21
                  </p>
                </div>
              </div>
              <ChevronRight size={22} />
            </Card>

            <Card className="flex items-center justify-between cursor-pointer hover:bg-[var(--bone)] transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 brutal-border bg-[var(--bone)]">
                  <Calendar size={22} color="#0D0D0D" />
                </div>
                <div>
                  <h4 className="font-bold text-md">International League</h4>
                  <p className="text-xs font-data text-[var(--signal)] font-bold uppercase tracking-wide">
                    Starts Jul 28
                  </p>
                </div>
              </div>
              <ChevronRight size={22} />
            </Card>
          </div>
        </section>

        {/* ---------------- QUICK LINKS (anchors, same page) ---------------- */}
        <section className="flex justify-between items-center px-2 py-6 border-t-[3px] border-b-[3px] border-[var(--ink)]">
          <a href="#about" className="flex flex-col items-center gap-2 hover:text-[var(--signal)]">
            <Info size={22} />
            <span className="text-[10px] font-bold uppercase font-data tracking-wide">About</span>
          </a>
          <a href="#contact" className="flex flex-col items-center gap-2 hover:text-[var(--signal)]">
            <Mail size={22} />
            <span className="text-[10px] font-bold uppercase font-data tracking-wide">Contact</span>
          </a>
          <button className="flex flex-col items-center gap-2 hover:text-[var(--signal)]">
            <HelpCircle size={22} />
            <span className="text-[10px] font-bold uppercase font-data tracking-wide">How to Play</span>
          </button>
        </section>

        {/* ---------------- ABOUT ---------------- */}
        <section id="about" className="space-y-6 scroll-mt-20">
          <div>
            <h3 className="font-black uppercase text-lg mb-3">About Quiz Arena</h3>
            <p className="font-bold text-black/70 leading-relaxed max-w-xl">
              Quiz Arena is a platform for quiz enthusiasts &mdash; players and readers compete in weekly and
              seasonal leagues. Play, read, and climb the leaderboards.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {features.map((f) => (
              <TiltCard key={f.label} className="p-4 flex items-center gap-4 md:flex-col md:items-start md:gap-6">
                <div className="p-2 brutal-border bg-[var(--bone)] w-fit">
                  <f.icon size={22} />
                </div>
                <span className="font-bold uppercase text-sm tracking-wide">{f.label}</span>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* ---------------- CONTACT ---------------- */}
        <section id="contact" className="space-y-6 scroll-mt-20 pb-4">
          <h3 className="font-black uppercase text-lg">Contact Us</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="brutal-border brutal-shadow-sm bg-white divide-y-[3px] divide-[var(--ink)]">
              {contactRows.map((row) => (
                <div key={row.label} className="p-4 flex items-center gap-4">
                  <div className="p-2 brutal-border bg-[var(--bone)]">
                    <row.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black font-data text-black/50 uppercase tracking-widest">
                      {row.label}
                    </p>
                    <p className="font-bold text-sm">{row.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-center gap-4">
              <p className="font-bold text-black/70 text-sm">
                Got a question about leagues, reading duty, or scoring? Send us a message
                and we&apos;ll get back within a day.
              </p>
              <Button fullWidth className="text-base md:w-56">
                Send Us a Message
              </Button>
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
};