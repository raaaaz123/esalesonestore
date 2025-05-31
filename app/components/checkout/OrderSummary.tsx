import React from 'react';
import { Card } from '../common/Card';
import { useStore } from '@/app/lib/store';

export const OrderSummary: React.FC = () => {
  const { state, calculateSubtotal, calculateTax, calculateTotal } = useStore();
  const { selectedVariant, quantity } = state;
  
  if (!selectedVariant) return null;
  
  const subtotal = calculateSubtotal();
  const tax = calculateTax();
  const total = calculateTotal();
  
  return (
    <Card title="Order Summary">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">{selectedVariant.name}</h4>
            <p className="text-sm text-gray-500">Quantity: {quantity}</p>
          </div>
          <p className="font-medium">${(selectedVariant.price * quantity).toFixed(2)}</p>
        </div>
        
        <div className="border-t border-gray-200 pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium text-base pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
