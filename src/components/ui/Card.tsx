import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'glass' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

export default function Card({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'md',
  onClick 
}: CardProps) {
  const baseClasses = 'rounded-xl border transition-all duration-300 ease-out';
  
  const variantClasses = {
    default: 'bg-white border-neutral-200 shadow-sm hover:shadow-md',
    elevated: 'bg-white border-neutral-200 shadow-lg hover:shadow-xl hover:-translate-y-1',
    glass: 'bg-white/70 border-white/20 backdrop-blur-xl shadow-lg hover:bg-white/80',
    interactive: 'bg-white border-neutral-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 cursor-pointer active:scale-[0.98]'
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${paddingClasses[padding]}
    ${className}
  `.trim();

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
}