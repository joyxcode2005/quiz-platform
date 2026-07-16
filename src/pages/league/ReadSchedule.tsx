import React, { useState } from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Button } from '../../components/ui/Button';
import { Clock, Info, ChevronRight } from 'lucide-react';
import { type Match } from '../../types';

export const ReadSchedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'toread' | 'read'>('toread');

  const matches: Match[] = [
    { id: '1', time: '9:00 PM', teamA: 'From Coast to Midwest', teamB: 'No Material Misstatement' },
    { id: '2', time: '9:00 PM', teamA: 'Nightmare on LLM Stree', teamB: 'Area Boys' },
    { id: '3', time: '10:00 PM', teamA: 'Fafda, Feni, Feluda', teamB: 'To B or not to BVM' },
    { id: '4', time: '7:00 PM', teamA: 'Speeding Bumpkins', teamB: 'Green Light' },
  ];

  return (
    <PageLayout>
      <div className="flex border-b-[3px] border-[var(--ink)]">
        <button
          className={`flex-1 py-4 font-black uppercase text-sm tracking-wide text-center border-r-[3px] border-[var(--ink)] transition-colors ${
            activeTab === 'toread' ? 'bg-[var(--signal)] text-white' : 'bg-white hover:bg-[var(--bone)]'
          }`}
          onClick={() => setActiveTab('toread')}
        >
          To Read
        </button>
        <button
          className={`flex-1 py-4 font-black uppercase text-sm tracking-wide text-center transition-colors ${
            activeTab === 'read' ? 'bg-[var(--signal)] text-white' : 'bg-white hover:bg-[var(--bone)]'
          }`}
          onClick={() => setActiveTab('read')}
        >
          Read
        </button>
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-[var(--bone)] brutal-border p-3 flex gap-3 text-sm font-bold items-start">
          <Info className="text-[var(--signal)] shrink-0 mt-0.5" size={20} />
          <p>You can only read games that you played today.</p>
        </div>

        <div>
          <h3 className="font-black uppercase text-sm tracking-wide mb-4">Upcoming Games to Read</h3>
          <div className="space-y-4">
            {matches.map((match) => (
              <div key={match.id} className="ticket-notch bg-white brutal-border brutal-shadow-sm flex flex-row items-center justify-between p-3">
                <div className="flex flex-col gap-2 w-1/4">
                  <div className="flex items-center gap-1 text-xs font-data font-bold text-black/60">
                    <Clock size={14} />
                    {match.time}
                  </div>
                </div>

                <div className="flex flex-col gap-1 items-center w-1/2 text-center">
                  <span className="font-bold text-sm truncate w-full">{match.teamA}</span>
                  <span className="text-xs font-black text-[var(--signal)]">VS</span>
                  <span className="font-bold text-sm truncate w-full">{match.teamB}</span>
                </div>

                <div className="w-1/4 flex justify-end items-center gap-2">
                  <Button variant="outline" className="px-3 py-1.5 text-xs">
                    To Read
                  </Button>
                  <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};