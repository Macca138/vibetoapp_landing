'use client';

import { m } from 'framer-motion';
import { ReactNode } from 'react';
import { buttonHover, buttonTap } from '@/lib/animations';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

const variantStyles = {
  primary: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0',
  secondary: 'bg-slate-800/50 border border-slate-700 text-white hover:bg-slate-800/70',
  ghost: 'text-purple-400 hover:text-white hover:bg-purple-500/20',
};

export default function AnimatedButton({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  variant = 'primary',
}: AnimatedButtonProps) {
  const baseClasses = 'rounded-md px-4 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200';
  const variantClasses = variantStyles[variant];

  return (
    <m.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
      whileHover={disabled ? {} : buttonHover}
      whileTap={disabled ? {} : buttonTap}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      {children}
    </m.button>
  );
}