'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PageLayout } from '@/app/components/common/PageLayout';
import { Button } from '@/app/components/common/Button';
import { useStore } from '@/app/lib/store';
import { fetchProductById } from '@/app/lib/api';
import { Product, CartItem } from '@/app/lib/types';

interface CartProduct {
  product: Product;
  quantity: number;
  colorId?: string;
  sizeId?: string;
  variantId: string;
}

export default function CartPage() {
  const router = useRouter();
  const { state, removeFromCart } = useStore();
  const [loading, setLoading] = useState(true);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  // Load cart from local storage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // We'll just use this to check if there's a saved cart
        // The actual loading of products happens in loadCartProducts
      } catch (error) {
        console.error('Error parsing cart from local storage:', error);
      }
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    const loadCartProducts = async () => {
      try {
        setLoading(true);
        const productsData: CartProduct[] = [];
        
        for (const item of state.cart) {
          const product = await fetchProductById(item.productId);
          if (product) {
            productsData.push({
              product,
              quantity: item.quantity,
              colorId: item.colorId,
              sizeId: item.sizeId,
              variantId: item.variantId,
            });
          }
        }
        
        setCartProducts(productsData);
      } catch (error) {
        console.error('Error loading cart products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCartProducts();
  }, [state.cart]);

  const getColorName = (product: Product, colorId?: string) => {
    if (!colorId) return '';
    const color = product.colors.find(c => c.id === colorId);
    return color ? color.name : '';
  };

  const getSizeName = (product: Product, sizeId?: string) => {
    if (!sizeId) return '';
    const size = product.sizes.find(s => s.id === sizeId);
    return size ? size.name : '';
  };

  const calculateSubtotal = () => {
    return cartProducts.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  if (loading) {
    return (
      <PageLayout title="Your Cart">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </PageLayout>
    );
  }

  if (cartProducts.length === 0) {
    return (
      <PageLayout title="Your Cart">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Button onClick={() => router.push('/')}>Continue Shopping</Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Your Cart" subtitle={`${cartProducts.length} items in your cart`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {cartProducts.map((item) => {
                const price = item.product.price;
                const colorName = getColorName(item.product, item.colorId);
                const sizeName = getSizeName(item.product, item.sizeId);
                
                return (
                  <li key={`${item.product.id}-${item.colorId}-${item.sizeId}`} className="p-4 sm:p-6 flex flex-col sm:flex-row">
                    <div className="flex-shrink-0 relative w-full sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0">
                      {item.product.image ? (
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          className="object-contain object-center"
                          fill
                          sizes="(max-width: 640px) 100vw, 96px"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-gray-200">
                          <span className="text-gray-400 text-xs">No image</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="sm:ml-6 flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{item.product.name}</h3>
                          <div className="mt-1 text-sm text-gray-500 space-y-1">
                            {colorName && <p>Color: {colorName}</p>}
                            {sizeName && <p>Size: {sizeName}</p>}
                            <p>Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-900">${price.toFixed(2)}</p>
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <button
                          type="button"
                          className="text-sm font-medium text-red-600 hover:text-red-500"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            
            <div className="flow-root">
              <dl className="text-sm">
                <div className="py-2 flex items-center justify-between">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd className="font-medium text-gray-900">${calculateSubtotal().toFixed(2)}</dd>
                </div>
                <div className="py-2 flex items-center justify-between">
                  <dt className="text-gray-600">Shipping</dt>
                  <dd className="font-medium text-gray-900">$0.00</dd>
                </div>
                <div className="py-2 flex items-center justify-between">
                  <dt className="text-gray-600">Tax</dt>
                  <dd className="font-medium text-gray-900">${(calculateSubtotal() * 0.08).toFixed(2)}</dd>
                </div>
                <div className="py-2 border-t border-gray-200 flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">Order total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${(calculateSubtotal() * 1.08).toFixed(2)}
                  </dd>
                </div>
              </dl>
            </div>
            
            <div className="mt-6">
              <Button 
                fullWidth 
                size="lg" 
                onClick={() => router.push('/checkout')}
              >
                Checkout
              </Button>
              <Button 
                fullWidth 
                variant="outline" 
                className="mt-3" 
                onClick={() => router.push('/')}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 