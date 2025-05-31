'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PageLayout } from '@/app/components/common/PageLayout';
import { ProductDisplay } from '@/app/components/landing/ProductDisplay';
import { fetchProductById } from '@/app/lib/api';
import { Product } from '@/app/lib/types';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const fetchedProduct = await fetchProductById(id as string);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <PageLayout title="Loading Product...">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </PageLayout>
    );
  }

  if (error || !product) {
    return (
      <PageLayout title="Product Not Found" showBackButton>
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{error || 'Product not found'}</h3>
          <p className="text-gray-500">The product you are looking for might have been removed or is temporarily unavailable.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title={product.name}
      subtitle={`${product.category} - ${product.tags.join(', ')}`}
      showBackButton
    >
      <ProductDisplay product={product} />
    </PageLayout>
  );
} 