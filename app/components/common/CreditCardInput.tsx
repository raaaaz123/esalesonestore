'use client';

import React, { useState } from 'react';
import { Input } from './Input';
import { Select } from './Select';

interface CreditCardInputProps {
  onCardNumberChange: (value: string) => void;
  onCardholderNameChange: (value: string) => void;
  onExpiryDateChange: (month: string, year: string) => void;
  onCvvChange: (value: string) => void;
}

export const CreditCardInput: React.FC<CreditCardInputProps> = ({
  onCardNumberChange,
  onCardholderNameChange,
  onExpiryDateChange,
  onCvvChange,
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [cvvError, setCvvError] = useState('');
  const [expiryError, setExpiryError] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  // Generate month options
  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return {
      value: month.toString().padStart(2, '0'),
      label: month.toString().padStart(2, '0'),
    };
  });

  // Generate year options (current year + 10 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 11 }, (_, i) => {
    const year = currentYear + i;
    return {
      value: year.toString(),
      label: year.toString(),
    };
  });

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    // Format with spaces every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.substring(0, 19);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
    onCardNumberChange(formatted.replace(/\s/g, ''));
  };

  const handleCardholderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardholderName(e.target.value);
    onCardholderNameChange(e.target.value);
  };

  const handleExpiryMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = e.target.value;
    setExpiryMonth(month);
    validateExpiryDate(month, expiryYear);
    onExpiryDateChange(month, expiryYear);
  };

  const handleExpiryYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;
    setExpiryYear(year);
    validateExpiryDate(expiryMonth, year);
    onExpiryDateChange(expiryMonth, year);
  };

  const validateExpiryDate = (month: string, year: string) => {
    if (month && year) {
      const currentDate = new Date();
      const expiryDate = new Date(parseInt(year), parseInt(month) - 1);
      
      if (expiryDate < currentDate) {
        setExpiryError('Expiry date must be in the future');
      } else {
        setExpiryError('');
      }
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 3);
    setCvv(value);
    
    if (value.length < 3) {
      setCvvError('CVV must be 3 digits');
    } else {
      setCvvError('');
    }
    
    onCvvChange(value);
  };

  return (
    <div className="space-y-4">
      <Input
        label="Card Number"
        placeholder="1234 5678 9012 3456"
        value={cardNumber}
        onChange={handleCardNumberChange}
        maxLength={19}
        fullWidth
        leftIcon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
          </svg>
        }
      />

      <Input
        label="Cardholder Name"
        placeholder="John Doe"
        value={cardholderName}
        onChange={handleCardholderNameChange}
        fullWidth
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
          <div className="grid grid-cols-2 gap-2">
            <Select
              label=""
              options={monthOptions}
              value={expiryMonth}
              onChange={handleExpiryMonthChange}
              placeholder="MM"
              error={expiryError ? ' ' : ''}
            />
            <Select
              label=""
              options={yearOptions}
              value={expiryYear}
              onChange={handleExpiryYearChange}
              placeholder="YYYY"
              error={expiryError ? ' ' : ''}
            />
          </div>
          {expiryError && <p className="mt-1 text-sm text-red-600">{expiryError}</p>}
        </div>

        <Input
          label="CVV"
          placeholder="123"
          value={cvv}
          onChange={handleCvvChange}
          maxLength={3}
          error={cvvError}
          leftIcon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          }
        />
      </div>
    </div>
  );
}; 