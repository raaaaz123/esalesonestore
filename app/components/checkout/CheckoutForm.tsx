import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { CustomerInfo, PaymentInfo } from '@/app/lib/types';
import { useStore } from '@/app/lib/store';
import { processTransaction } from '@/app/lib/mockData';
import toast from 'react-hot-toast';

type FormValues = CustomerInfo & PaymentInfo;

export const CheckoutForm: React.FC = () => {
  const router = useRouter();
  const { setCustomerInfo, setPaymentInfo, createOrder } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);
    
    // Extract customer and payment info
    const customerInfo: CustomerInfo = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      address: {
        street: data.address.street,
        city: data.address.city,
        state: data.address.state,
        zipCode: data.address.zipCode,
        country: data.address.country,
      },
    };
    
    const paymentInfo: PaymentInfo = {
      cardNumber: data.cardNumber,
      cardholderName: data.cardholderName,
      expiryDate: data.expiryDate,
      cvv: data.cvv,
    };
    
    // Save to store
    setCustomerInfo(customerInfo);
    setPaymentInfo(paymentInfo);
    
    try {
      // Process transaction
      const result = await processTransaction();
      
      // Create order with status
      createOrder(result.status);
      
      // Redirect to thank you page
      router.push('/thankyou');
    } catch (error) {
      toast.error('An error occurred while processing your payment.');
      setIsSubmitting(false);
    }
  };
  
  return (
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
          
          <Input
            label="Phone Number"
            type="tel"
            {...register('phone', { 
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: 'Invalid phone number',
              },
            })}
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
          
          <Input
            label="Expiry Date (MM/YY)"
            {...register('expiryDate', { 
              required: 'Expiry date is required',
              pattern: {
                value: /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
                message: 'Invalid expiry date (MM/YY)',
              },
            })}
            error={errors.expiryDate?.message}
            fullWidth
          />
          
          <Input
            label="CVV"
            type="password"
            {...register('cvv', { 
              required: 'CVV is required',
              pattern: {
                value: /^[0-9]{3,4}$/,
                message: 'Invalid CVV',
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
  );
};
