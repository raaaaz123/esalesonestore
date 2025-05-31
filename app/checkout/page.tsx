'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import { PageLayout } from '../components/common/PageLayout';
import { CheckoutForm } from '../components/checkout/CheckoutForm';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { StoreProvider } from '../lib/store';

export default function CheckoutPage() {
  return (
    <StoreProvider>
      <Toaster position="top-center" />
      <PageLayout 
        title="Checkout" 
        subtitle="Complete your purchase" 
        showBackButton
        backUrl="/"
        backText="Back to Product"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>
          <div>
            <div className="sticky top-8">
              <OrderSummary />
            </div>
          </div>
        </div>
      </PageLayout>
    </StoreProvider>
  );
}
