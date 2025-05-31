import { Product } from './types';

export const mockProduct: Product = {
  id: 'premium-headphones-001',
  name: 'Premium Wireless Headphones',
  description: 'Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions for extended listening sessions. Perfect for music lovers, gamers, and professionals alike.',
  basePrice: 199.99,
  images: [
    '/images/headphones-black.jpg',
    '/images/headphones-white.jpg',
    '/images/headphones-blue.jpg',
  ],
  variants: [
    {
      id: 'black-standard',
      name: 'Black - Standard',
      price: 199.99,
      color: 'black',
      size: 'Standard',
      image: '/images/headphones-black.jpg',
    },
    {
      id: 'white-standard',
      name: 'White - Standard',
      price: 199.99,
      color: 'white',
      size: 'Standard',
      image: '/images/headphones-white.jpg',
    },
    {
      id: 'blue-standard',
      name: 'Blue - Standard',
      price: 199.99,
      color: 'blue',
      size: 'Standard',
      image: '/images/headphones-blue.jpg',
    },
    {
      id: 'black-pro',
      name: 'Black - Pro Edition',
      price: 249.99,
      color: 'black',
      size: 'Pro',
      image: '/images/headphones-black.jpg',
    },
    {
      id: 'white-pro',
      name: 'White - Pro Edition',
      price: 249.99,
      color: 'white',
      size: 'Pro',
      image: '/images/headphones-white.jpg',
    },
    {
      id: 'blue-pro',
      name: 'Blue - Pro Edition',
      price: 249.99,
      color: 'blue',
      size: 'Pro',
      image: '/images/headphones-blue.jpg',
    },
  ],
};

// Helper function to generate a unique order ID
export const generateOrderId = (): string => {
  return `ORDER-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
};

// Simulate transaction processing with different outcomes
export const processTransaction = (): Promise<{
  success: boolean;
  status: 'approved' | 'declined' | 'error';
  message: string;
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const outcome = Math.random();
      if (outcome > 0.2) {
        resolve({
          success: true,
          status: 'approved',
          message: 'Payment approved successfully.',
        });
      } else if (outcome > 0.05) {
        resolve({
          success: false,
          status: 'declined',
          message: 'Payment declined. Please try another payment method.',
        });
      } else {
        resolve({
          success: false,
          status: 'error',
          message: 'An error occurred while processing your payment. Please try again.',
        });
      }
    }, 1500);
  });
}; 