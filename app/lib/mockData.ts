import { Product, ProductColor, ProductSize, SortOption } from './types';

// Generate a random ID
export const generateId = () => {
  return Math.random().toString(36).substring(2, 15);
};

// Generate a random order ID
export const generateOrderId = () => {
  return `ORD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
};

// Product colors
export const productColors: ProductColor[] = [
  { id: 'color-1', name: 'Black', value: '#000000' },
  { id: 'color-2', name: 'White', value: '#FFFFFF' },
  { id: 'color-3', name: 'Red', value: '#FF0000' },
  { id: 'color-4', name: 'Blue', value: '#0000FF' },
  { id: 'color-5', name: 'Green', value: '#00FF00' },
  { id: 'color-6', name: 'Yellow', value: '#FFFF00' },
  { id: 'color-7', name: 'Purple', value: '#800080' },
  { id: 'color-8', name: 'Gray', value: '#808080' },
];

// Product sizes
export const productSizes: ProductSize[] = [
  { id: 'size-1', name: 'XS', value: 'XS' },
  { id: 'size-2', name: 'S', value: 'S' },
  { id: 'size-3', name: 'M', value: 'M' },
  { id: 'size-4', name: 'L', value: 'L' },
  { id: 'size-5', name: 'XL', value: 'XL' },
  { id: 'size-6', name: '2XL', value: '2XL' },
];

// Sort options
export const sortOptions: SortOption[] = [
  { id: 'sort-1', name: 'Featured', value: 'featured' },
  { id: 'sort-2', name: 'Price: Low to High', value: 'price-asc' },
  { id: 'sort-3', name: 'Price: High to Low', value: 'price-desc' },
  { id: 'sort-4', name: 'Newest', value: 'newest' },
  { id: 'sort-5', name: 'Rating', value: 'rating' },
];

// Categories
export const categories = [
  'All Categories',
  'Electronics',
  'Clothing',
  'Jewelry',
  'Home & Kitchen',
  'Books',
  'Sports',
  'Toys',
];

// Mock product
export const mockProduct: Product = {
  id: 'product-1',
  name: 'Premium Wireless Headphones',
  description:
    'Experience crystal-clear sound with our premium wireless headphones. Features noise cancellation, long battery life, and comfortable ear cushions for extended wear. Perfect for music enthusiasts and professionals alike.',
  price: 199.99,
  image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  category: 'Electronics',
  tags: ['headphones', 'wireless', 'audio', 'premium'],
  rating: 4.5,
  reviews: 128,
  colors: [
    { id: 'color-1', name: 'Black', value: '#000000' },
    { id: 'color-2', name: 'White', value: '#FFFFFF' },
    { id: 'color-3', name: 'Red', value: '#FF0000' },
  ],
  sizes: [],
};

// Generate more mock products
export const generateMockProducts = (count: number): Product[] => {
  const products: Product[] = [mockProduct];

  const productTemplates = [
    {
      name: 'Classic T-Shirt',
      description: 'A comfortable cotton t-shirt perfect for everyday wear. Features a classic fit and durable fabric that will last through many washes.',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      category: 'Clothing',
      hasSizes: true,
    },
    {
      name: 'Smart Watch',
      description: 'Track your fitness, receive notifications, and more with this advanced smartwatch. Features a long battery life and water-resistant design.',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1164&q=80',
      category: 'Electronics',
      hasSizes: false,
    },
    {
      name: 'Leather Wallet',
      description: 'A premium leather wallet with multiple card slots and a coin pocket. The perfect accessory for the modern individual.',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
      category: 'Accessories',
      hasSizes: false,
    },
    {
      name: 'Running Shoes',
      description: 'Lightweight and comfortable running shoes designed for maximum performance. Features advanced cushioning and breathable materials.',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      category: 'Footwear',
      hasSizes: true,
    },
    {
      name: 'Ceramic Coffee Mug',
      description: 'Start your day right with this elegant ceramic coffee mug. Holds 12 oz of your favorite beverage and is microwave and dishwasher safe.',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      category: 'Home & Kitchen',
      hasSizes: false,
    },
  ];

  for (let i = 1; i < count; i++) {
    const template = productTemplates[i % productTemplates.length];
    
    // Generate random colors for this product
    const productColorCount = Math.floor(Math.random() * 4) + 1; // 1-4 colors
    const selectedColors = [...productColors]
      .sort(() => 0.5 - Math.random())
      .slice(0, productColorCount);
    
    // Add sizes if applicable
    const productSizesList = template.hasSizes ? [...productSizes] : [];
    
    products.push({
      id: `product-${i + 1}`,
      name: `${template.name} ${i + 1}`,
      description: template.description,
      price: template.price,
      image: template.image,
      category: template.category,
      tags: [template.category.toLowerCase(), 'new', 'featured'],
      rating: Number((Math.random() * 2 + 3).toFixed(1)), // Random rating between 3-5
      reviews: Math.floor(Math.random() * 200) + 10, // Random number of reviews
      colors: selectedColors,
      sizes: productSizesList,
    });
  }

  return products;
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

// Fallback products for when API fails
export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear sound with our premium wireless headphones.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    category: 'electronics',
    tags: ['featured', 'bestseller'],
    rating: 4.5,
    reviews: 128,
    colors: [
      { id: 'color-1', name: 'Black', value: '#000000' },
      { id: 'color-2', name: 'White', value: '#FFFFFF' },
      { id: 'color-3', name: 'Blue', value: '#0000FF' },
    ],
    sizes: [],
  },
  {
    id: '2',
    name: 'Classic T-Shirt',
    description: 'A comfortable cotton t-shirt perfect for everyday wear.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    category: "men's clothing",
    tags: ['featured'],
    rating: 4.2,
    reviews: 95,
    colors: [
      { id: 'color-1', name: 'Black', value: '#000000' },
      { id: 'color-2', name: 'White', value: '#FFFFFF' },
    ],
    sizes: [
      { id: 'size-2', name: 'S', value: 'S' },
      { id: 'size-3', name: 'M', value: 'M' },
      { id: 'size-4', name: 'L', value: 'L' },
      { id: 'size-5', name: 'XL', value: 'XL' },
    ],
  },
  {
    id: '3',
    name: 'Gold Pendant Necklace',
    description: 'Elegant gold pendant necklace, perfect for any occasion.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    category: 'jewelery',
    tags: ['featured'],
    rating: 4.8,
    reviews: 62,
    colors: [
      { id: 'color-9', name: 'Gold', value: '#FFD700' },
      { id: 'color-10', name: 'Silver', value: '#C0C0C0' },
    ],
    sizes: [],
  },
  {
    id: '4',
    name: 'Women\'s Casual Dress',
    description: 'Stylish and comfortable casual dress for everyday wear.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    category: "women's clothing",
    tags: ['featured'],
    rating: 4.4,
    reviews: 87,
    colors: [
      { id: 'color-3', name: 'Blue', value: '#0000FF' },
      { id: 'color-7', name: 'Purple', value: '#800080' },
    ],
    sizes: [
      { id: 'size-1', name: 'XS', value: 'XS' },
      { id: 'size-2', name: 'S', value: 'S' },
      { id: 'size-3', name: 'M', value: 'M' },
      { id: 'size-4', name: 'L', value: 'L' },
    ],
  },
  {
    id: '5',
    name: 'Portable Bluetooth Speaker',
    description: 'Compact and powerful Bluetooth speaker with 20-hour battery life.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    category: 'electronics',
    tags: ['featured'],
    rating: 4.3,
    reviews: 114,
    colors: [
      { id: 'color-1', name: 'Black', value: '#000000' },
      { id: 'color-3', name: 'Red', value: '#FF0000' },
    ],
    sizes: [],
  }
]; 