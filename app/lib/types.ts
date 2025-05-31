export type ProductVariant = {
  id: string;
  name: string;
  price: number;
  color?: string;
  size?: string;
  image?: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  images: string[];
  variants: ProductVariant[];
};

export type CartItem = {
  product: Product;
  variant: ProductVariant;
  quantity: number;
};

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