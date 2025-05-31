'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product, ProductColor, ProductSize } from '@/app/lib/types';
import { Button } from '../common/Button';
import { Select } from '../common/Select';
import { useStore } from '@/app/lib/store';
import { Card } from '../common/Card';

interface ProductDisplayProps {
  product: Product;
}

export const ProductDisplay: React.FC<ProductDisplayProps> = ({ product }) => {
  const router = useRouter();
  const { setColor, setSize, addToCart } = useStore();
  const [selectedColorId, setSelectedColorId] = useState(product.colors[0]?.id || '');
  const [selectedSizeId, setSelectedSizeId] = useState(product.sizes[0]?.id || '');
  const [quantity, setLocalQuantity] = useState(1);
  
  const selectedColor = product.colors.find(c => c.id === selectedColorId) || product.colors[0];
  const selectedSize = product.sizes.find(s => s.id === selectedSizeId) || product.sizes[0];
  
  const quantityOptions = Array.from({ length: 10 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1),
  }));
  
  const handleColorChange = (colorId: string) => {
    setSelectedColorId(colorId);
    const color = product.colors.find(c => c.id === colorId);
    if (color) {
      setColor(color);
    }
  };
  
  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sizeId = e.target.value;
    setSelectedSizeId(sizeId);
    const size = product.sizes.find(s => s.id === sizeId);
    if (size) {
      setSize(size);
    }
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const qty = parseInt(e.target.value, 10);
    setLocalQuantity(qty);
  };
  
  const handleBuyNow = () => {
    // Add to cart
    addToCart({
      productId: product.id,
      variantId: '1', // Default variant ID since we don't have variants anymore
      quantity,
      colorId: selectedColorId,
      sizeId: selectedSizeId,
    });
    
    router.push('/checkout');
  };
  
  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      variantId: '1', // Default variant ID since we don't have variants anymore
      quantity,
      colorId: selectedColorId,
      sizeId: selectedSizeId,
    });
    
    // Show a toast or notification
    alert('Product added to cart!');
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="sticky top-8 self-start">
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
          <div className="relative aspect-square bg-gray-50">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                className="object-contain object-center p-6"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-200">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div>
        <Card>
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{product.name}</h1>
              <div className="mt-3 flex items-center">
                <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <svg
                    key={rating}
                    className={`h-5 w-5 ${
                      rating < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="ml-2 text-sm text-gray-500">{product.rating} ({product.reviews} reviews)</p>
            </div>
            
            <div className="border-t border-b border-gray-200 py-6">
              <p className="text-base text-gray-700">{product.description}</p>
            </div>
            
            <div className="space-y-4">
              {product.colors.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.id}
                        type="button"
                        className={`
                          w-8 h-8 rounded-full border-2 transition-all
                          ${selectedColorId === color.id 
                            ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50' 
                            : 'border-gray-300'
                          }
                        `}
                        style={{ backgroundColor: color.value }}
                        onClick={() => handleColorChange(color.id)}
                        aria-label={`Select ${color.name} color`}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {product.sizes.length > 0 && (
                <div>
                  <Select
                    label="Size"
                    options={product.sizes.map(size => ({
                      value: size.id,
                      label: size.name,
                    }))}
                    value={selectedSizeId}
                    onChange={handleSizeChange}
                    fullWidth
                    variant="filled"
                    rounded="lg"
                  />
                </div>
              )}
              
              <div>
                <Select
                  label="Quantity"
                  options={quantityOptions}
                  value={String(quantity)}
                  onChange={handleQuantityChange}
                  fullWidth
                  variant="filled"
                  rounded="lg"
                />
              </div>
            </div>
            
            <div className="pt-4 space-y-3">
              <Button 
                onClick={handleBuyNow} 
                fullWidth 
                size="lg"
                rounded="lg"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                }
              >
                Buy Now
              </Button>
              
              <Button 
                variant="outline" 
                fullWidth 
                size="lg"
                rounded="lg"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
            
            <div className="pt-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Free shipping
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  In stock
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}; 