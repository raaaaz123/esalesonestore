'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import { PageLayout } from '../components/common/PageLayout';
import { OrderConfirmation } from '../components/thankyou/OrderConfirmation';
import { StoreProvider } from '../lib/store';

export default function ThankYouPage() {
  return (
    <StoreProvider>
      <Toaster position="top-center" />
      <PageLayout 
        title="Order Confirmation" 
        subtitle="Thank you for your purchase"
        showBackButton
        backUrl="/"
        backText="Back to Shop"
      >
        <div className="max-w-3xl mx-auto">
          <OrderConfirmation />
        </div>
      </PageLayout>
    </StoreProvider>
  );
}
