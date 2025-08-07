import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled';
}

export default function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'default',
  className = '',
  ...props
}: InputProps) {
  const baseClasses = `
    w-full px-4 py-3 rounded-xl border transition-all duration-200 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-1
    disabled:opacity-50 disabled:cursor-not-allowed
    placeholder:text-neutral-400
  `;

  const variantClasses = {
    default: `
      bg-white border-neutral-300 text-neutral-900
      hover:border-neutral-400
      focus:border-primary-500 focus:ring-primary-500/20
    `,
    filled: `
      bg-neutral-50 border-neutral-200 text-neutral-900
      hover:bg-neutral-100 hover:border-neutral-300
      focus:bg-white focus:border-primary-500 focus:ring-primary-500/20
    `
  };

  const errorClasses = error ? `
    border-error-500 focus:border-error-500 focus:ring-error-500/20
  ` : '';

  const inputClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${errorClasses}
    ${leftIcon ? 'pl-12' : ''}
    ${rightIcon ? 'pr-12' : ''}
    ${className}
  `.trim();

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
            {React.cloneElement(leftIcon as React.ReactElement, { size: 20 })}
          </div>
        )}
        <input className={inputClasses} {...props} />
        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400">
            {React.cloneElement(rightIcon as React.ReactElement, { size: 20 })}
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-error-600 font-medium">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-neutral-500">{helperText}</p>
      )}
    </div>
  );
}