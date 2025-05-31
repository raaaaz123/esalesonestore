'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PageLayout } from './components/common/PageLayout';
import { ProductCard } from './components/landing/ProductCard';
import { Product } from './lib/types';
import { fetchProducts } from './lib/api';
import { useStore } from './lib/store';
import { Button } from './components/common/Button';
import { categories } from './lib/mockData';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { state } = useStore();
  const [productsByCategory, setProductsByCategory] = useState<Record<string, Product[]>>({});

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);

        // Group products by category
        const groupedProducts: Record<string, Product[]> = {};
        fetchedProducts.forEach(product => {
          if (!groupedProducts[product.category]) {
            groupedProducts[product.category] = [];
          }
          groupedProducts[product.category].push(product);
        });
        setProductsByCategory(groupedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Get featured products (limit to 5)
  const featuredProducts = products.filter(product => 
    product.tags.includes('featured')).slice(0, 5);

  // Display categories with at least one product
  const displayCategories = Object.keys(productsByCategory).filter(
    category => productsByCategory[category].length > 0
  );

  return (
    <PageLayout 
      title="Welcome to e-SalesOne Store"
      subtitle="Discover premium products for your lifestyle"
    >
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Featured Products */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
              <Link href="/catalog">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Product Categories */}
          {displayCategories.map((category) => (
            <section key={category}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
                <Link href={`/catalog?category=${category}`}>
                  <Button variant="outline" size="sm">View All {category}</Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {productsByCategory[category].slice(0, 5).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          ))}

          {/* Shop by Category */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {categories.filter(cat => cat !== 'All Categories').map((category) => (
                <Link 
                  key={category} 
                  href={`/catalog?category=${category}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 h-32 flex items-center justify-center"
                >
                  <div className="text-center p-4">
                    <h3 className="text-lg font-medium text-gray-900">{category}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {productsByCategory[category]?.length || 0} products
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      )}
    </PageLayout>
  );
}
