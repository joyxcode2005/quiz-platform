import React, { useState } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Button } from '../../components/ui/Button';
import { Clock, Info } from 'lucide-react';
import type { Match } from '../../types';

export const InterestToRead: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'open' | 'myinterests'>('open');

  const matches: Match[] = [
    { id: '1', time: '11:30 PM', teamA: 'To B or not to BVM', teamB: 'VOC' },
    { id: '2', time: '8:00 PM', teamA: 'Somewhat Interested', teamB: 'The IP Team' },
    { id: '3', time: '10:00 PM', teamA: 'Lob boblaw', teamB: 'The BA of Algiers' },
    { id: '4', time: '9:00 PM', teamA: 'Idly watching Enthusiasts', teamB: 'Whiskey Kaapi' },
  ];

  return (
    <PageLayout>
      <div className="flex border-b-[3px] border-[var(--ink)]">
        <button
          className={`flex-1 py-4 font-black uppercase text-sm tracking-wide text-center border-r-[3px] border-[var(--ink)] transition-colors ${
            activeTab === 'open' ? 'bg-[var(--signal)] text-white' : 'bg-white hover:bg-[var(--bone)]'
          }`}
          onClick={() => setActiveTab('open')}
        >
          Open
        </button>
        <button
          className={`flex-1 py-4 font-black uppercase text-sm tracking-wide text-center transition-colors ${
            activeTab === 'myinterests' ? 'bg-[var(--signal)] text-white' : 'bg-white hover:bg-[var(--bone)]'
          }`}
          onClick={() => setActiveTab('myinterests')}
        >
          My Interests
        </button>
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-[var(--bone)] brutal-border p-3 flex gap-3 text-sm font-bold items-start">
          <Info className="text-[var(--signal)] shrink-0 mt-0.5" size={20} />
          <p>Express interest to read games that have no assigned reader yet.</p>
        </div>

        <div>
          <h3 className="font-black uppercase text-sm tracking-wide mb-4">Open Games (Need Readers)</h3>
          <div className="space-y-4">
            {matches.map((match) => (
              <div key={match.id} className="ticket-notch bg-white brutal-border brutal-shadow-sm flex flex-row items-center justify-between p-3">
                <div className="flex flex-col gap-2 w-1/4">
                  <div className="flex items-center gap-1 text-xs font-data font-bold text-black/60">
                    <Clock size={14} />
                    {match.time}
                  </div>
                </div>

                <div className="flex flex-col gap-1 items-center w-1/2 text-center px-2">
                  <span className="font-bold text-sm truncate w-full">{match.teamA}</span>
                  <span className="text-xs font-black text-[var(--signal)]">VS</span>
                  <span className="font-bold text-sm truncate w-full">{match.teamB}</span>
                </div>

                <div className="w-1/4 flex justify-end">
                  <Button variant="outline" className="px-2 py-2 text-xs whitespace-nowrap">
                    Interested
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};