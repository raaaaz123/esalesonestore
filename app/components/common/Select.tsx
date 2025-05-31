'use client';

import React, { forwardRef } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'underlined';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    label, 
    options, 
    error, 
    helperText, 
    fullWidth = false, 
    variant = 'outlined',
    rounded = 'md',
    className = '', 
    id,
    placeholder,
    ...props 
  }, ref) => {
    const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substring(2, 9)}`;
    
    const baseSelectClasses = 'block w-full py-2.5 pl-3 pr-10 shadow-sm text-gray-900 appearance-none transition-all duration-200';
    
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
      ? 'ring-red-300 border-red-300 focus:ring-red-500 focus:border-red-500' 
      : '';
    
    const widthClass = fullWidth ? 'w-full' : '';
    
    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium leading-6 text-gray-900 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={`${baseSelectClasses} ${variantClasses[variant]} ${stateClasses} ${roundedClasses} ${widthClass}`}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled={props.required}>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600" id={`${selectId}-error`}>
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="mt-1 text-sm text-gray-500" id={`${selectId}-helper`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
); 