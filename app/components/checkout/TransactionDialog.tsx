'use client';

import React from 'react';
import { OrderStatus } from '@/app/lib/types';

interface TransactionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (status: OrderStatus) => void;
}

export const TransactionDialog: React.FC<TransactionDialogProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  if (!isOpen) return null;

  const handleSelect = (status: OrderStatus) => {
    onSelect(status);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Select Transaction Outcome</h2>
        <p className="text-gray-600 mb-6">
          For demonstration purposes, please select a transaction outcome:
        </p>
        
        <div className="space-y-3">
          <button
            onClick={() => handleSelect('approved')}
            className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Approved Transaction
          </button>
          
          <button
            onClick={() => handleSelect('declined')}
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            Declined Transaction
          </button>
          
          <button
            onClick={() => handleSelect('error')}
            className="w-full py-3 px-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Gateway Error / Failure
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            This is for demonstration purposes only. In a real application, this would be handled by a payment processor.
          </p>
        </div>
      </div>
    </div>
  );
}; 