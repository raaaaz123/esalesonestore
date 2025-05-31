'use client';

import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'outlined' | 'filled' | 'underlined';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    helperText, 
    fullWidth = false, 
    leftIcon, 
    rightIcon, 
    variant = 'outlined',
    rounded = 'md',
    className = '', 
    id, 
    ...props 
  }, ref) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substring(2, 9)}`;
    
    const baseInputClasses = 'block w-full py-2.5 shadow-sm text-gray-900 transition-all duration-200';
    
    const variantClasses = {
      outlined: 'border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white',
      filled: 'border border-transparent bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
      underlined: 'border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 bg-transparent px-0',
    };
    
    const roundedClasses = variant === 'underlined' ? '' : {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    }[rounded];
    
    const stateClasses = error 
      ? 'ring-red-300 border-red-300 placeholder:text-red-300 focus:ring-red-500 focus:border-red-500' 
      : '';
    
    const widthClass = fullWidth ? 'w-full' : '';
    const paddingClass = leftIcon ? 'pl-10' : variant === 'underlined' ? 'pl-0' : 'pl-3';
    const rightPaddingClass = rightIcon ? 'pr-10' : variant === 'underlined' ? 'pr-0' : 'pr-3';
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium leading-6 text-gray-900 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`${baseInputClasses} ${variantClasses[variant]} ${stateClasses} ${roundedClasses} ${widthClass} ${paddingClass} ${rightPaddingClass}`}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600" id={`${inputId}-error`}>
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="mt-1 text-sm text-gray-500" id={`${inputId}-helper`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
); 