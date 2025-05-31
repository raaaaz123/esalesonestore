import React from 'react';
import Link from 'next/link';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useStore } from '@/app/lib/store';

export const OrderConfirmation: React.FC = () => {
  const { state } = useStore();
  const { order, orderStatus } = state;
  
  if (!order) {
    return (
      <Card>
        <div className="text-center py-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No order found</h3>
          <p className="text-gray-500 mb-4">It seems you haven't placed an order yet.</p>
          <Link href="/">
            <Button>Return to Shop</Button>
          </Link>
        </div>
      </Card>
    );
  }
  
  const isSuccess = orderStatus === 'approved';
  
  return (
    <Card>
      <div className="text-center mb-6">
        {isSuccess ? (
          <>
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <svg className="h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900">Thank you for your order!</h3>
            <p className="text-gray-500 mt-1">Your order has been confirmed.</p>
          </>
        ) : (
          <>
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <svg className="h-8 w-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900">Payment {orderStatus}</h3>
            <p className="text-gray-500 mt-1">
              {orderStatus === 'declined' 
                ? 'Your payment was declined. Please try another payment method.' 
                : 'An error occurred while processing your payment. Please try again.'}
            </p>
          </>
        )}
      </div>
      
      <div className="border-t border-gray-200 pt-4 pb-2">
        <p className="text-sm text-gray-500 mb-2">Order ID: <span className="font-medium">{order.id}</span></p>
        <p className="text-sm text-gray-500 mb-2">Date: <span className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</span></p>
      </div>
      
      <div className="border-t border-gray-200 py-4">
        <h4 className="font-medium mb-3">Order Details</h4>
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between mb-2">
            <div>
              <p className="text-sm font-medium">{item.variant.name}</p>
              <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <p className="text-sm font-medium">${(item.variant.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        
        <div className="border-t border-gray-200 mt-3 pt-3 space-y-1">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${order.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium pt-2">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 py-4">
        <h4 className="font-medium mb-3">Customer Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">{order.customer.fullName}</p>
            <p className="text-sm text-gray-500">{order.customer.email}</p>
            <p className="text-sm text-gray-500">{order.customer.phone}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Shipping Address</p>
            <p className="text-sm text-gray-500">{order.customer.address.street}</p>
            <p className="text-sm text-gray-500">
              {order.customer.address.city}, {order.customer.address.state} {order.customer.address.zipCode}
            </p>
            <p className="text-sm text-gray-500">{order.customer.address.country}</p>
          </div>
        </div>
      </div>
      
      <div className="pt-4 flex justify-center">
        {isSuccess ? (
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        ) : (
          <Link href="/checkout">
            <Button variant="primary">Try Again</Button>
          </Link>
        )}
      </div>
    </Card>
  );
};
