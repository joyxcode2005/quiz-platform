import React, { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyle =
    "font-bold uppercase tracking-wide py-3 px-6 text-center transition-colors flex justify-center items-center rounded-none brutal-border brutal-press brutal-shadow-sm";

  const variants = {
    primary: 'bg-[var(--signal)] text-white hover:bg-[var(--ink)]',
    secondary: 'bg-[var(--ink)] text-white hover:bg-[var(--signal)]',
    outline: 'bg-white text-[var(--ink)] hover:bg-[var(--bone)]',
    ghost: 'border-none shadow-none bg-transparent text-[var(--ink)] hover:bg-[var(--bone)]',
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};