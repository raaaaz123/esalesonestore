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
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <Container maxWidth="xl">
        <div className="mb-8">
          {showBackButton && (
            <div className="mb-4">
              <Link 
                href={backUrl}
                className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
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
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>
          {subtitle && <p className="mt-2 text-lg text-gray-600">{subtitle}</p>}
        </div>
        {children}
      </Container>
    </div>
  );
}; 