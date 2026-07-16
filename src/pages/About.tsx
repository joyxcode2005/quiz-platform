import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Trophy, Users, ShieldCheck, Image as ImageIcon } from 'lucide-react';

export const About: React.FC = () => {
  const features = [
    { icon: Trophy, label: 'Exciting Weekly Matches' },
    { icon: Users, label: 'Readers & Players Leagues' },
    { icon: ShieldCheck, label: 'Fair Play & Transparency' },
  ];

  return (
    <PageLayout>
      <div className="p-4 space-y-8">
        <div className="w-full h-48 brutal-border brutal-shadow bg-[var(--bone)] flex items-center justify-center relative overflow-hidden">
          <ImageIcon size={48} className="text-black/30" />
        </div>

        <div>
          <h2 className="font-black uppercase text-lg mb-3">What is Quiz Arena</h2>
          <p className="font-bold text-md leading-relaxed">
            Quiz Arena is a platform for quiz enthusiasts &mdash; players and readers compete in weekly and
            seasonal leagues. Play, read, and climb the leaderboards.
          </p>
        </div>

        <div className="hazard-stripe -mx-4" />

        <div className="space-y-4">
          {features.map((f) => (
            <div key={f.label} className="brutal-border brutal-shadow-sm p-4 flex items-center gap-4 bg-white">
              <div className="p-2 brutal-border bg-[var(--bone)]">
                <f.icon size={22} />
              </div>
              <span className="font-bold uppercase text-sm tracking-wide">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};