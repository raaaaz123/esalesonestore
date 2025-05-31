'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Payment methods */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap justify-center space-x-4">
            <Image src="/visa.svg" alt="Visa" width={40} height={24} className="h-6 w-auto" />
            <Image src="/mastercard.svg" alt="Mastercard" width={40} height={24} className="h-6 w-auto" />
            <Image src="/amex.svg" alt="American Express" width={40} height={24} className="h-6 w-auto" />
            <Image src="/paypal.svg" alt="PayPal" width={40} height={24} className="h-6 w-auto" />
            <Image src="/discover.svg" alt="Discover" width={40} height={24} className="h-6 w-auto" />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2025, eSalesOne-Test Powered by Shopify</p>
            <Link href="/privacy-policy" className="mt-2 md:mt-0 hover:text-white transition-colors">
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}; 