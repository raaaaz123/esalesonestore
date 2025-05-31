'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageLayout } from '@/app/components/common/PageLayout';
import { ProductGrid } from '@/app/components/landing/ProductGrid';
import { Product } from '@/app/lib/types';
import { fetchProducts } from '@/app/lib/api';
import { useStore } from '@/app/lib/store';

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { state } = useStore();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const pageTitle = categoryParam ? `${categoryParam}` : 'Product Catalog';
  const pageSubtitle = categoryParam 
    ? `Browse our ${categoryParam.toLowerCase()} collection`
    : 'Browse our complete collection of products';

  return (
    <PageLayout 
      title={pageTitle}
      subtitle={pageSubtitle}
    >
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <ProductGrid 
          products={products} 
          initialCategory={categoryParam || 'All Categories'} 
        />
      )}
    </PageLayout>
  );
} 