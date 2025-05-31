import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    helperText, 
    fullWidth = false, 
    leftIcon, 
    rightIcon, 
    className = '', 
    id, 
    ...props 
  }, ref) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substring(2, 9)}`;
    
    const baseInputClasses = 'block rounded-md border-0 py-2.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset text-gray-900';
    const stateClasses = error 
      ? 'ring-red-300 placeholder:text-red-300 focus:ring-red-500' 
      : 'ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-500';
    const widthClass = fullWidth ? 'w-full' : '';
    const paddingClass = leftIcon ? 'pl-10' : 'pl-3';
    const rightPaddingClass = rightIcon ? 'pr-10' : 'pr-3';
    
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
            className={`${baseInputClasses} ${stateClasses} ${widthClass} ${paddingClass} ${rightPaddingClass}`}
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