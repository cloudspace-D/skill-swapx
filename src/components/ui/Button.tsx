import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-xl
    transition-all duration-200 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-[0.98]
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-primary-600 to-primary-700 text-white
      hover:from-primary-700 hover:to-primary-800
      focus:ring-primary-500 shadow-lg hover:shadow-xl
      border border-primary-600
    `,
    secondary: `
      bg-gradient-to-r from-secondary-600 to-secondary-700 text-white
      hover:from-secondary-700 hover:to-secondary-800
      focus:ring-secondary-500 shadow-lg hover:shadow-xl
      border border-secondary-600
    `,
    outline: `
      bg-white text-neutral-700 border-2 border-neutral-300
      hover:bg-neutral-50 hover:border-neutral-400
      focus:ring-neutral-500 shadow-sm hover:shadow-md
    `,
    ghost: `
      bg-transparent text-neutral-700 border border-transparent
      hover:bg-neutral-100 hover:text-neutral-900
      focus:ring-neutral-500
    `,
    danger: `
      bg-gradient-to-r from-error-600 to-error-700 text-white
      hover:from-error-700 hover:to-error-800
      focus:ring-error-500 shadow-lg hover:shadow-xl
      border border-error-600
    `
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm gap-2 h-9',
    md: 'px-4 py-2.5 text-sm gap-2 h-10',
    lg: 'px-6 py-3 text-base gap-3 h-12',
    xl: 'px-8 py-4 text-lg gap-3 h-14'
  };

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim();

  const iconSize = size === 'sm' ? 16 : size === 'md' ? 18 : size === 'lg' ? 20 : 22;

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Loader2 size={iconSize} className="animate-spin" />
      )}
      {!loading && icon && iconPosition === 'left' && (
        React.cloneElement(icon as React.ReactElement, { size: iconSize })
      )}
      {children}
      {!loading && icon && iconPosition === 'right' && (
        React.cloneElement(icon as React.ReactElement, { size: iconSize })
      )}
    </button>
  );
}