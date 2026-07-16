import React from 'react';
import { PageLayout } from '../../components/layout/PageLayout';
import { Clock } from 'lucide-react';
import type { Match } from '../../types';

export const MatchResults: React.FC = () => {
  const matches: Match[] = [
    {
      id: '1',
      time: '9:00 PM',
      teamA: 'From Coast to Midwest',
      teamB: 'No Material Misstatement',
      scoreA: 1023,
      scoreB: 1106,
      winner: 'No Material Misstatement',
    },
    {
      id: '2',
      time: '9:00 PM',
      teamA: 'Nightmare on LLM Stree',
      teamB: 'Area Boys',
      scoreA: 1018,
      scoreB: 1020,
      winner: 'Area Boys',
    },
    {
      id: '3',
      time: '10:00 PM',
      teamA: 'Fafda, Feni, Feluda',
      teamB: 'To B or not to BVM',
      scoreA: 1112,
      scoreB: 1013,
      winner: 'Fafda, Feni, Feluda',
    },
    {
      id: '4',
      time: '7:00 PM',
      teamA: 'Speeding Bumpkins',
      teamB: 'Green Light',
      scoreA: 1106,
      scoreB: 1105,
      winner: 'Speeding Bumpkins',
    },
  ];

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center py-4 border-b-[3px] border-[var(--ink)] bg-[var(--bone)] sticky top-0 z-10">
          <select className="font-bold font-data text-center appearance-none bg-transparent outline-none cursor-pointer text-sm">
            <option>WEEK: JUL 14 &ndash; JUL 20 &#9662;</option>
          </select>
        </div>

        <div className="p-4 md:p-8 grid md:grid-cols-2 gap-5">
          {matches.map((match) => (
            <div key={match.id} className="ticket-notch bg-white brutal-border brutal-shadow-sm relative">
              <div className="flex items-center justify-between gap-2 border-b-[3px] border-dashed border-black/20 px-4 py-2">
                <div className="flex items-center gap-2 text-xs font-data font-bold text-black/60">
                  <Clock size={14} />
                  {match.time}
                </div>
                <div className="relative">
                  <div className="glow-signal w-14 h-14 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  <div className="stamp relative text-[var(--signal)] text-[10px] font-data font-bold uppercase tracking-widest px-2 py-0.5 bg-white">
                    Winner
                  </div>
                </div>
              </div>

              {/* Frosted inset panel behind the score readout - the soft light, hard frame idea */}
              <div className="relative mx-4 mt-4 glass-panel brutal-border">
                <div className="flex justify-between items-center gap-3 p-4">
                  <div className="w-1/3 text-left font-bold text-sm leading-tight">{match.teamA}</div>
                  <div className="w-1/3 text-center font-data font-black text-xl whitespace-nowrap">
                    {match.scoreA} <span className="text-black/30">&ndash;</span> {match.scoreB}
                  </div>
                  <div className="w-1/3 text-right font-bold text-sm leading-tight">{match.teamB}</div>
                </div>
              </div>

              <div className="text-center font-bold text-sm py-2 mt-4 border-t-[3px] border-[var(--ink)] bg-[var(--signal-soft)]">
                {match.winner}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};