import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Mail, Phone, AtSign, MapPin } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Contact: React.FC = () => {
  const rows = [
    { icon: Mail, label: 'Email', value: 'hello@quizarena.com' },
    { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
    { icon: AtSign, label: 'Instagram', value: '@quiz.arena' },
    { icon: MapPin, label: 'Address', value: 'Quiz Arena HQ, India' },
  ];

  return (
    <PageLayout>
      <div className="p-4 space-y-6">
        <div className="brutal-border brutal-shadow bg-white divide-y-[3px] divide-[var(--ink)]">
          {rows.map((row) => (
            <div key={row.label} className="p-4 flex items-center gap-4">
              <div className="p-2 brutal-border bg-[var(--bone)]">
                <row.icon size={22} />
              </div>
              <div>
                <p className="text-xs font-black font-data text-black/50 uppercase tracking-widest">{row.label}</p>
                <p className="font-bold">{row.value}</p>
              </div>
            </div>
          ))}
        </div>

        <Button fullWidth className="mt-8 text-base">
          Send Us a Message
        </Button>
      </div>
    </PageLayout>
  );
};