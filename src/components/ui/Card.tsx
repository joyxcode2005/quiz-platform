import React, { type HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
  variant?: 'default' | 'signal' | 'ink';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  noPadding = false,
  variant = 'default',
  ...props
}) => {
  const variants = {
    default: 'bg-white brutal-shadow-sm',
    signal: 'bg-[var(--signal-soft)] brutal-shadow-sm',
    ink: 'bg-[var(--ink)] text-white brutal-shadow-signal',
  };

  return (
    <div
      className={`brutal-border ${variants[variant]} ${noPadding ? '' : 'p-4'} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};