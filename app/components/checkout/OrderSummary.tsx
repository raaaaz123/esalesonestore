'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card } from '../common/Card';
import { useStore } from '@/app/lib/store';
import { Product } from '@/app/lib/types';
import { fetchProductById } from '@/app/lib/api';

interface CartProduct {
  product: Product;
  quantity: number;
  colorId?: string;
  sizeId?: string;
}

export const OrderSummary: React.FC = () => {
  const { state, calculateSubtotal, calculateTax, calculateTotal } = useStore();
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCartProducts = async () => {
      try {
        setLoading(true);
        const productsData: CartProduct[] = [];
        const productPrices: Record<string, number> = {};
        
        for (const item of state.cart) {
          const product = await fetchProductById(item.productId);
          if (product) {
            productsData.push({
              product,
              quantity: item.quantity,
              colorId: item.colorId,
              sizeId: item.sizeId,
            });
            
            // Cache the product price
            productPrices[item.productId] = product.price;
          }
        }
        
        // Save prices to localStorage
        const existingPrices = localStorage.getItem('productPrices');
        const mergedPrices = {
          ...(existingPrices ? JSON.parse(existingPrices) : {}),
          ...productPrices
        };
        localStorage.setItem('productPrices', JSON.stringify(mergedPrices));
        
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
  
  const subtotal = calculateSubtotal();
  const tax = calculateTax();
  const total = calculateTotal();
  
  if (loading) {
    return (
      <Card title="Order Summary">
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Card>
    );
  }
  
  if (cartProducts.length === 0) {
    return (
      <Card title="Order Summary">
        <div className="text-center py-6">
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      </Card>
    );
  }
  
  return (
    <Card title="Order Summary">
      <div className="space-y-4">
        {cartProducts.map((item) => {
          const colorName = getColorName(item.product, item.colorId);
          const sizeName = getSizeName(item.product, item.sizeId);
          
          return (
            <div key={`${item.product.id}-${item.colorId}-${item.sizeId}`} className="flex items-start space-x-3">
              <div className="flex-shrink-0 relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                {item.product.image ? (
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    className="object-contain object-center"
                    fill
                    sizes="64px"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-200">
                    <span className="text-gray-400 text-xs">No image</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium text-sm">{item.product.name}</h4>
                <div className="text-xs text-gray-500 space-y-0.5">
                  {colorName && <p>Color: {colorName}</p>}
                  {sizeName && <p>Size: {sizeName}</p>}
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          );
        })}
        
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
