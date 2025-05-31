'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from './Container';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backUrl?: string;
  backText?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  subtitle,
  showBackButton = false,
  backUrl = '/',
  backText = 'Back',
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 md:py-12">
      <Container maxWidth="2xl">
        <div className="mb-8 md:mb-12">
          {showBackButton && (
            <div className="mb-4">
              <Link 
                href={backUrl}
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mr-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {backText}
              </Link>
            </div>
          )}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">{title}</h1>
          {subtitle && <p className="mt-2 text-lg md:text-xl text-gray-600">{subtitle}</p>}
        </div>
        {children}
      </Container>
    </div>
  );
}; 