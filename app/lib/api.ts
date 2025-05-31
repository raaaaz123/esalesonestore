import { Product, ProductColor, ProductSize } from './types';
import { products as mockProducts } from './mockData';

// Fetch products from Fake Store API
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const data = await response.json();
    
    // Map the Fake Store API response to our Product type
    return data.map((item: any) => ({
      id: item.id.toString(),
      name: item.title,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      rating: item.rating.rate,
      reviews: item.rating.count,
      tags: item.rating.rate >= 4.5 ? ['featured', 'bestseller'] : 
            item.rating.rate >= 4.0 ? ['featured'] : [],
      colors: [
        { id: 'color-1', name: 'Black', value: '#000000' },
        { id: 'color-2', name: 'White', value: '#FFFFFF' },
        { id: 'color-4', name: 'Blue', value: '#0000FF' }
      ],
      sizes: [
        { id: 'size-2', name: 'S', value: 'S' },
        { id: 'size-3', name: 'M', value: 'M' },
        { id: 'size-4', name: 'L', value: 'L' },
        { id: 'size-5', name: 'XL', value: 'XL' }
      ],
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    // Fallback to mock data if API fails
    return mockProducts;
  }
};

// Fetch a single product by ID
export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    
    const item = await response.json();
    
    return {
      id: item.id.toString(),
      name: item.title,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      rating: item.rating.rate,
      reviews: item.rating.count,
      tags: item.rating.rate >= 4.5 ? ['featured', 'bestseller'] : 
            item.rating.rate >= 4.0 ? ['featured'] : [],
      colors: [
        { id: 'color-1', name: 'Black', value: '#000000' },
        { id: 'color-2', name: 'White', value: '#FFFFFF' },
        { id: 'color-4', name: 'Blue', value: '#0000FF' }
      ],
      sizes: [
        { id: 'size-2', name: 'S', value: 'S' },
        { id: 'size-3', name: 'M', value: 'M' },
        { id: 'size-4', name: 'L', value: 'L' },
        { id: 'size-5', name: 'XL', value: 'XL' }
      ],
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    // Fallback to mock data if API fails
    const product = mockProducts.find((p: Product) => p.id === id);
    return product || null;
  }
};

// Fetch products by category
export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    // If category is "All Categories", fetch all products
    if (category === 'All Categories') {
      return fetchProducts();
    }
    
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products by category');
    }
    
    const data = await response.json();
    
    // Map the Fake Store API response to our Product type
    return data.map((item: any) => ({
      id: item.id.toString(),
      name: item.title,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      rating: item.rating.rate,
      reviews: item.rating.count,
      tags: item.rating.rate >= 4.5 ? ['featured', 'bestseller'] : 
            item.rating.rate >= 4.0 ? ['featured'] : [],
      colors: [
        { id: 'color-1', name: 'Black', value: '#000000' },
        { id: 'color-2', name: 'White', value: '#FFFFFF' },
        { id: 'color-4', name: 'Blue', value: '#0000FF' }
      ],
      sizes: [
        { id: 'size-2', name: 'S', value: 'S' },
        { id: 'size-3', name: 'M', value: 'M' },
        { id: 'size-4', name: 'L', value: 'L' },
        { id: 'size-5', name: 'XL', value: 'XL' }
      ],
    }));
  } catch (error) {
    console.error('Error fetching products by category:', error);
    // Fallback to mock data if API fails
    return category === 'All Categories' 
      ? mockProducts 
      : mockProducts.filter((p: Product) => p.category === category);
  }
};

// Fetch all available categories
export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    const categories = await response.json();
    return ['All Categories', ...categories];
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Return default categories if API fails
    return ['All Categories', 'electronics', 'jewelery', "men's clothing", "women's clothing"];
  }
};

// Filter products by category
export const filterProductsByCategory = (products: Product[], category: string): Product[] => {
  if (!category || category === 'All Categories') {
    return products;
  }
  return products.filter((product) => product.category === category);
};

// Sort products
export const sortProducts = (products: Product[], sortOption: string): Product[] => {
  const sortedProducts = [...products];
  
  switch (sortOption) {
    case 'price-asc':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'name-asc':
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    case 'rating-desc':
      return sortedProducts.sort((a, b) => b.rating - a.rating);
    default:
      return sortedProducts;
  }
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  const products = await fetchProducts();
  
  if (!query) {
    return products;
  }
  
  const lowerCaseQuery = query.toLowerCase();
  
  return products.filter((product) => {
    return (
      product.name.toLowerCase().includes(lowerCaseQuery) ||
      product.description.toLowerCase().includes(lowerCaseQuery) ||
      product.category.toLowerCase().includes(lowerCaseQuery) ||
      product.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery))
    );
  });
}; 