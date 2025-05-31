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
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    label, 
    options, 
    error, 
    helperText, 
    fullWidth = false, 
    className = '', 
    id, 
    ...props 
  }, ref) => {
    const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substring(2, 9)}`;
    
    const baseSelectClasses = 'block rounded-md border-0 py-2.5 pl-3 pr-10 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset text-gray-900 appearance-none';
    const stateClasses = error 
      ? 'ring-red-300 focus:ring-red-500' 
      : 'ring-gray-300 focus:ring-indigo-500';
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
            className={`${baseSelectClasses} ${stateClasses} ${widthClass}`}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
            {...props}
          >
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