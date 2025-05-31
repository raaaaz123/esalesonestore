'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { PhoneInput } from '../common/PhoneInput';
import { CustomerInfo, PaymentInfo, OrderStatus } from '@/app/lib/types';
import { useStore } from '@/app/lib/store';
import { sendOrderConfirmationEmail } from '@/app/lib/emailService';
import { TransactionDialog } from './TransactionDialog';
import toast from 'react-hot-toast';
import Link from 'next/link';

type FormValues = CustomerInfo & PaymentInfo;

export const CheckoutForm: React.FC = () => {
  const router = useRouter();
  const { state, setCustomerInfo, setPaymentInfo, createOrder } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [showTransactionDialog, setShowTransactionDialog] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);
  
  // Check if cart is empty
  useEffect(() => {
    if (state.cart.length === 0) {
      toast.error('Your cart is empty. Please add items to your cart before checkout.');
    }
  }, [state.cart]);
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();
  
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
      value: year.toString().slice(-2),
      label: year.toString(),
    };
  });
  
  // Validate expiry date is in the future
  const validateExpiryDate = () => {
    if (expiryMonth && expiryYear) {
      const currentDate = new Date();
      const selectedYear = parseInt('20' + expiryYear);
      const selectedMonth = parseInt(expiryMonth) - 1; // JS months are 0-indexed
      const expiryDate = new Date(selectedYear, selectedMonth);
      
      return expiryDate > currentDate || 'Expiry date must be in the future';
    }
    return true;
  };
  
  const handleExpiryMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExpiryMonth(e.target.value);
  };

  const handleExpiryYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExpiryYear(e.target.value);
  };
  
  const handlePhoneChange = (value: string, code: string) => {
    setPhoneNumber(value);
    setCountryCode(code);
  };
  
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Check if cart is empty before processing
    if (state.cart.length === 0) {
      toast.error('Your cart is empty. Please add items to your cart before checkout.');
      return;
    }
    
    setFormData(data);
    setShowTransactionDialog(true);
  };
  
  const handleTransactionSelect = async (status: OrderStatus) => {
    if (!formData) return;
    
    setIsSubmitting(true);
    
    // Format expiry date
    const formattedExpiryDate = `${expiryMonth}/${expiryYear}`;
    
    // Extract customer and payment info
    const customerInfo: CustomerInfo = {
      fullName: formData.fullName,
      email: formData.email,
      phone: `${countryCode}${phoneNumber}`, // Include country code
      address: {
        street: formData.address.street,
        city: formData.address.city,
        state: formData.address.state,
        zipCode: formData.address.zipCode,
        country: formData.address.country,
      },
    };
    
    const paymentInfo: PaymentInfo = {
      cardNumber: formData.cardNumber,
      cardholderName: formData.cardholderName,
      expiryDate: formattedExpiryDate,
      cvv: formData.cvv,
    };
    
    // Save to store
    setCustomerInfo(customerInfo);
    setPaymentInfo(paymentInfo);
    
    try {
      // Create order with selected status
      createOrder(status);
      
      // Send confirmation email
      if (state.order) {
        await sendOrderConfirmationEmail(state.order, customerInfo.email);
        
        // Show toast based on status
        if (status === 'approved') {
          toast.success('Order confirmed! Check your email for confirmation.');
        } else if (status === 'declined') {
          toast.error('Transaction declined. Please try another payment method.');
        } else {
          toast.error('Gateway error. Please try again later.');
        }
      }
      
      // Redirect to thank you page
      router.push('/thankyou');
    } catch (error) {
      console.error('Error processing order:', error);
      toast.error('An error occurred while processing your payment.');
      setIsSubmitting(false);
    }
  };
  
  // If cart is empty, show message
  if (state.cart.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-500 mb-6">You need to add items to your cart before checking out.</p>
        <Link href="/">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Customer Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Customer Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              {...register('fullName', { required: 'Full name is required' })}
              error={errors.fullName?.message}
              fullWidth
            />
            
            <Input
              label="Email Address"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              error={errors.email?.message}
              fullWidth
            />
            
            <PhoneInput
              label="Phone Number"
              value={phoneNumber}
              onChange={handlePhoneChange}
              error={errors.phone?.message}
              fullWidth
            />
          </div>
        </div>
        
        {/* Shipping Address */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Shipping Address</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <Input
                label="Street Address"
                {...register('address.street', { required: 'Street address is required' })}
                error={errors.address?.street?.message}
                fullWidth
              />
            </div>
            
            <Input
              label="City"
              {...register('address.city', { required: 'City is required' })}
              error={errors.address?.city?.message}
              fullWidth
            />
            
            <Input
              label="State/Province"
              {...register('address.state', { required: 'State is required' })}
              error={errors.address?.state?.message}
              fullWidth
            />
            
            <Input
              label="ZIP/Postal Code"
              {...register('address.zipCode', { required: 'ZIP code is required' })}
              error={errors.address?.zipCode?.message}
              fullWidth
            />
            
            <Input
              label="Country"
              {...register('address.country', { required: 'Country is required' })}
              error={errors.address?.country?.message}
              fullWidth
            />
          </div>
        </div>
        
        {/* Payment Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Payment Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Card Number"
              {...register('cardNumber', { 
                required: 'Card number is required',
                pattern: {
                  value: /^[0-9]{16}$/,
                  message: 'Invalid card number',
                },
              })}
              error={errors.cardNumber?.message}
              fullWidth
            />
            
            <Input
              label="Cardholder Name"
              {...register('cardholderName', { required: 'Cardholder name is required' })}
              error={errors.cardholderName?.message}
              fullWidth
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  className="block w-full py-2.5 pl-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  value={expiryMonth}
                  onChange={handleExpiryMonthChange}
                  required
                >
                  <option value="" disabled>Month</option>
                  {monthOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                
                <select
                  className="block w-full py-2.5 pl-3 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  value={expiryYear}
                  onChange={handleExpiryYearChange}
                  required
                >
                  <option value="" disabled>Year</option>
                  {yearOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              {!validateExpiryDate() && (
                <p className="mt-1 text-sm text-red-600">Expiry date must be in the future</p>
              )}
            </div>
            
            <Input
              label="CVV"
              type="password"
              {...register('cvv', { 
                required: 'CVV is required',
                pattern: {
                  value: /^[0-9]{3}$/,
                  message: 'CVV must be exactly 3 digits',
                },
              })}
              error={errors.cvv?.message}
              fullWidth
            />
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="pt-4">
          <Button 
            type="submit" 
            fullWidth 
            size="lg"
            isLoading={isSubmitting}
          >
            Complete Purchase
          </Button>
        </div>
      </form>
      
      {/* Transaction Dialog */}
      <TransactionDialog
        isOpen={showTransactionDialog}
        onClose={() => setShowTransactionDialog(false)}
        onSelect={handleTransactionSelect}
      />
    </>
  );
};
