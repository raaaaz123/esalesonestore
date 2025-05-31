'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProductColor, ProductSize, CartItem, StoreState, CustomerInfo, PaymentInfo, OrderStatus, Order } from './types';
import { generateOrderId } from './mockData';

interface StoreContextType {
  state: StoreState;
  setQuantity: (quantity: number) => void;
  setColor: (color: ProductColor) => void;
  setSize: (size: ProductSize) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateSearchQuery: (query: string) => void;
  updateSortOption: (option: string) => void;
  setCustomerInfo: (info: CustomerInfo) => void;
  setPaymentInfo: (info: PaymentInfo) => void;
  createOrder: (status: OrderStatus) => void;
  calculateSubtotal: () => number;
  calculateTax: () => number;
  calculateTotal: () => number;
}

const initialState: StoreState = {
  selectedQuantity: 1,
  selectedColor: null,
  selectedSize: null,
  cart: [],
  searchQuery: '',
  sortOption: 'featured',
  order: null,
  orderStatus: null,
  customerInfo: null,
  paymentInfo: null,
  selectedVariant: null,
  quantity: 1
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<StoreState>(initialState);

  // Load cart from local storage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setState(prevState => ({
          ...prevState,
          cart: parsedCart
        }));
      } catch (error) {
        console.error('Error parsing cart from local storage:', error);
      }
    }
  }, []);

  const setQuantity = (quantity: number) => {
    setState((prevState) => ({
      ...prevState,
      selectedQuantity: quantity,
    }));
  };

  const setColor = (color: ProductColor) => {
    setState((prevState) => ({
      ...prevState,
      selectedColor: color,
    }));
  };

  const setSize = (size: ProductSize) => {
    setState((prevState) => ({
      ...prevState,
      selectedSize: size,
    }));
  };

  const addToCart = (item: CartItem) => {
    setState((prevState) => {
      // Check if item already exists in cart
      const existingItemIndex = prevState.cart.findIndex(
        (cartItem) => cartItem.productId === item.productId && 
                      cartItem.colorId === item.colorId && 
                      cartItem.sizeId === item.sizeId
      );

      let updatedCart;
      if (existingItemIndex > -1) {
        // Update quantity if item exists
        updatedCart = [...prevState.cart];
        updatedCart[existingItemIndex].quantity += item.quantity;
      } else {
        // Add new item if it doesn't exist
        updatedCart = [...prevState.cart, item];
      }
      
      // Save to local storage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      return {
        ...prevState,
        cart: updatedCart,
      };
    });
  };

  const removeFromCart = (productId: string) => {
    setState((prevState) => {
      const updatedCart = prevState.cart.filter((item) => item.productId !== productId);
      
      // Save to local storage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      return {
        ...prevState,
        cart: updatedCart,
      };
    });
  };

  const clearCart = () => {
    // Clear local storage cart
    localStorage.removeItem('cart');
    
    setState((prevState) => ({
      ...prevState,
      cart: [],
    }));
  };

  const updateSearchQuery = (query: string) => {
    setState((prevState) => ({
      ...prevState,
      searchQuery: query,
    }));
  };

  const updateSortOption = (option: string) => {
    setState((prevState) => ({
      ...prevState,
      sortOption: option,
    }));
  };

  const setCustomerInfo = (info: CustomerInfo) => {
    setState((prevState) => ({
      ...prevState,
      customerInfo: info,
    }));
  };

  const setPaymentInfo = (info: PaymentInfo) => {
    setState((prevState) => ({
      ...prevState,
      paymentInfo: info,
    }));
  };

  const createOrder = (status: OrderStatus) => {
    setState((prevState) => {
      // Get product prices from cache for each item
      const cartItemsWithVariants = prevState.cart.map(item => {
        const price = getProductPriceFromCache(item.productId);
        return {
          ...item,
          variant: {
            id: item.variantId,
            name: `Product ${item.productId}`, // Default name
            price: price
          }
        };
      });

      const order: Order = {
        id: generateOrderId(),
        customer: prevState.customerInfo || {
          fullName: '',
          email: '',
          phone: '',
          address: { street: '', city: '', state: '', zipCode: '', country: '' }
        },
        items: cartItemsWithVariants,
        subtotal: calculateSubtotal(),
        tax: calculateTax(),
        total: calculateTotal(),
        status,
        createdAt: new Date().toISOString(),
      };

      // Clear cart after successful order
      if (status === 'approved') {
        localStorage.removeItem('cart');
      }

      return {
        ...prevState,
        order,
        orderStatus: status,
        cart: status === 'approved' ? [] : prevState.cart,
      };
    });
  };

  // Helper function to get product price from cache
  const getProductPriceFromCache = (productId: string): number => {
    try {
      const cachedPrices = localStorage.getItem('productPrices');
      if (cachedPrices) {
        const prices = JSON.parse(cachedPrices);
        if (prices[productId]) {
          return prices[productId];
        }
      }
      return 10; // Default price if not found in cache
    } catch (error) {
      console.error('Error getting cached price:', error);
      return 10; // Default price on error
    }
  };

  const calculateSubtotal = () => {
    return state.cart.reduce((total, item) => {
      const price = getProductPriceFromCache(item.productId);
      return total + (price * item.quantity);
    }, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  return (
    <StoreContext.Provider
      value={{
        state,
        setQuantity,
        setColor,
        setSize,
        addToCart,
        removeFromCart,
        clearCart,
        updateSearchQuery,
        updateSortOption,
        setCustomerInfo,
        setPaymentInfo,
        createOrder,
        calculateSubtotal,
        calculateTax,
        calculateTotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}; 