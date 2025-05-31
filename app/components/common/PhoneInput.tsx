'use client';

import React, { useState } from 'react';
import { Input } from './Input';

interface CountryCode {
  code: string;
  flag: string;
  name: string;
}

interface PhoneInputProps {
  value: string;
  onChange: (value: string, countryCode: string) => void;
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  label = 'Phone Number',
  error,
  helperText,
  fullWidth = false,
}) => {
  const [phoneNumber, setPhoneNumber] = useState(value);
  const [showCountryList, setShowCountryList] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(countryCodes[0]);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove all non-digit characters
    const digits = e.target.value.replace(/\D/g, '');
    setPhoneNumber(digits);
    onChange(digits, selectedCountry.code);
  };

  const handleCountryChange = (country: CountryCode) => {
    setSelectedCountry(country);
    setShowCountryList(false);
    onChange(phoneNumber, country.code);
  };

  return (
    <div className={`${fullWidth ? 'w-full' : ''} relative`}>
      {label && (
        <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">
          {label}
        </label>
      )}
      <div className="flex">
        <div className="relative">
          <button
            type="button"
            className="flex items-center justify-between px-3 py-2.5 border border-gray-300 bg-gray-50 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onClick={() => setShowCountryList(!showCountryList)}
          >
            <span className="mr-2 text-lg">{selectedCountry.flag}</span>
            <span className="text-sm text-gray-700">{selectedCountry.code}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          {showCountryList && (
            <div className="absolute z-10 mt-1 w-64 bg-white shadow-lg max-h-60 rounded-md overflow-auto">
              <div className="p-2 sticky top-0 bg-white border-b">
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search countries..."
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <ul className="py-1">
                {countryCodes.map((country) => (
                  <li key={`${country.code}-${country.name}`}>
                    <button
                      type="button"
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                      onClick={() => handleCountryChange(country)}
                    >
                      <span className="mr-2 text-lg">{country.flag}</span>
                      <span className="text-sm text-gray-700">{country.name}</span>
                      <span className="ml-auto text-sm text-gray-500">{country.code}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <Input
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          className="flex-1"
          placeholder="Enter phone number"
          type="tel"
          error={error}
          helperText={helperText}
          fullWidth
          rounded="none"
          variant="outlined"
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        />
      </div>
    </div>
  );
};

// Common country codes with flags
const countryCodes: CountryCode[] = [
  { code: '+1', flag: '🇺🇸', name: 'United States' },
  { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: '+86', flag: '🇨🇳', name: 'China' },
  { code: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: '+33', flag: '🇫🇷', name: 'France' },
  { code: '+81', flag: '🇯🇵', name: 'Japan' },
  { code: '+7', flag: '🇷🇺', name: 'Russia' },
  { code: '+55', flag: '🇧🇷', name: 'Brazil' },
  { code: '+52', flag: '🇲🇽', name: 'Mexico' },
  { code: '+39', flag: '🇮🇹', name: 'Italy' },
  { code: '+34', flag: '🇪🇸', name: 'Spain' },
  { code: '+82', flag: '🇰🇷', name: 'South Korea' },
  { code: '+1', flag: '🇨🇦', name: 'Canada' },
  { code: '+31', flag: '🇳🇱', name: 'Netherlands' },
  { code: '+90', flag: '🇹🇷', name: 'Turkey' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+971', flag: '🇦🇪', name: 'United Arab Emirates' },
  { code: '+92', flag: '🇵🇰', name: 'Pakistan' },
]; 