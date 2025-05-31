export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  rating: number;
  reviews: number;
  colors: ProductColor[];
  sizes: ProductSize[];
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  image?: string;
  colorId?: string;
  sizeId?: string;
}

export interface ProductColor {
  id: string;
  name: string;
  value: string; // hex color code
}

export interface ProductSize {
  id: string;
  name: string;
  value: string; // S, M, L, XL, etc.
}

export interface CartItem {
  productId: string;
  variantId: string;  // Keep for backward compatibility
  quantity: number;
  colorId?: string;
  sizeId?: string;
  variant?: {  // Optional field for order display
    name: string;
    price: number;
  };
}

export interface StoreState {
  selectedQuantity: number;
  selectedColor: ProductColor | null;
  selectedSize: ProductSize | null;
  cart: CartItem[];
  searchQuery: string;
  sortOption: string;
  order: Order | null;
  orderStatus: OrderStatus | null;
  customerInfo: CustomerInfo | null;
  paymentInfo: PaymentInfo | null;
  selectedVariant: any; // Using any for compatibility
  quantity: number;
}

export interface SortOption {
  id: string;
  name: string;
  value: string;
}

export interface FilterOption {
  id: string;
  name: string;
  value: string;
}

export type CustomerInfo = {
  fullName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
};

export type PaymentInfo = {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
};

export type OrderStatus = "pending" | "approved" | "declined" | "error";

export type Order = {
  id: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}; 