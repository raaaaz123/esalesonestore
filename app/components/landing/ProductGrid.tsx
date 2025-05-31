'use client';

import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '@/app/lib/types';
import { sortProducts, filterProductsByCategory } from '@/app/lib/api';
import { sortOptions } from '@/app/lib/mockData';
import { useStore } from '@/app/lib/store';

interface ProductGridProps {
  products: Product[];
  initialCategory?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  products,
  initialCategory = 'All Categories'
}) => {
  const { state, updateSearchQuery, updateSortOption } = useStore();
  const [searchTerm, setSearchTerm] = useState(state.searchQuery || '');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  
  useEffect(() => {
    // Apply search filter
    let result = [...products];
    
    if (searchTerm) {
      const lowerCaseQuery = searchTerm.toLowerCase();
      result = result.filter((product) => {
        return (
          product.name.toLowerCase().includes(lowerCaseQuery) ||
          product.description.toLowerCase().includes(lowerCaseQuery) ||
          product.category.toLowerCase().includes(lowerCaseQuery) ||
          product.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery))
        );
      });
    }
    
    // Apply category filter
    result = filterProductsByCategory(result, selectedCategory);
    
    // Apply sorting
    result = sortProducts(result, state.sortOption);
    
    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, state.sortOption]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateSearchQuery(value);
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSortOption(e.target.value);
  };

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm p-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="mt-2 text-gray-500">We couldn't find any products matching your criteria.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            {selectedCategory !== 'All Categories' ? selectedCategory : 'All Products'}
          </h2>
          <p className="text-sm text-gray-500">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </p>
        </div>
        <div className="flex space-x-2">
          <select 
            className="text-sm border border-gray-300 rounded-md bg-white text-gray-700 py-1 px-3"
            value={state.sortOption}
            onChange={handleSortChange}
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.value}>{option.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}; 