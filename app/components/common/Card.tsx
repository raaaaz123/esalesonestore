'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  noPadding?: boolean;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  subtitle,
  footer,
  noPadding = false,
  hoverEffect = false,
}) => {
  return (
    <div className={`
      bg-white 
      shadow-sm hover:shadow-md 
      rounded-xl overflow-hidden 
      border border-gray-100
      transition-all duration-300
      ${hoverEffect ? 'transform hover:-translate-y-1' : ''}
      ${className}
    `}>
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-100">
          {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      <div className={noPadding ? '' : 'px-6 py-5'}>{children}</div>
      {footer && (
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">{footer}</div>
      )}
    </div>
  );
}; 