'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/app/lib/types';
import { useStore } from '@/app/lib/store';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useStore();
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product page
    e.stopPropagation();
    
    addToCart({
      productId: product.id,
      variantId: '1', // Default variant ID
      quantity: 1,
      colorId: product.colors[0]?.id,
      sizeId: product.sizes[0]?.id,
    });
    
    // Show toast or notification
    alert('Product added to cart!');
  };

  return (
    <div className="group">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 h-full flex flex-col">
        <Link href={`/product/${product.id}`} className="relative aspect-square bg-gray-50">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              className="object-contain object-center p-4"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              New
            </span>
          </div>
        </Link>
        
        <div className="p-4 flex flex-col flex-grow">
          <Link href={`/product/${product.id}`}>
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 mb-1">{product.name}</h3>
            <p className="text-xs text-gray-500 line-clamp-2 mb-2 flex-grow">{product.description.substring(0, 60)}...</p>
          </Link>
          
          {product.colors.length > 0 && (
            <div className="flex gap-1 mb-2">
              {product.colors.slice(0, 4).map((color) => (
                <div 
                  key={color.id}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[10px] text-gray-600">
                  +{product.colors.length - 4}
                </div>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
            <div className="flex items-center">
              <div className="flex items-center mr-1">
                <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}; 