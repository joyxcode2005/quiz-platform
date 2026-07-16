import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'live' | 'neutral' | 'stamp' | 'winner';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral' }) => {
  if (variant === 'stamp' || variant === 'winner') {
    const color = variant === 'winner' ? 'text-[var(--signal)]' : 'text-[var(--ink)]';
    return (
      <div className={`stamp ${color} px-3 py-1 font-data text-xs font-bold uppercase tracking-widest bg-white`}>
        {children}
      </div>
    );
  }

  const baseStyle =
    'text-xs font-bold px-2 py-1 uppercase tracking-wide flex items-center gap-1 rounded-none brutal-border inline-flex';
  const variants = {
    live: 'bg-[var(--signal)] text-white',
    neutral: 'bg-[var(--bone)] text-[var(--ink)]',
  };

  return (
    <div className={`${baseStyle} ${variants[variant as 'live' | 'neutral']}`}>
      {variant === 'live' && <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>}
      {children}
    </div>
  );
};