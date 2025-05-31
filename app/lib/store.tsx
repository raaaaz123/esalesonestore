import { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, CustomerInfo, Order, OrderStatus, PaymentInfo, ProductVariant } from './types';
import { mockProduct, generateOrderId } from './mockData';

// Define the state type
type StoreState = {
  selectedVariant: ProductVariant | null;
  quantity: number;
  customerInfo: CustomerInfo | null;
  paymentInfo: PaymentInfo | null;
  order: Order | null;
  orderStatus: OrderStatus | null;
};

// Define the initial state
const initialState: StoreState = {
  selectedVariant: mockProduct.variants[0],
  quantity: 1,
  customerInfo: null,
  paymentInfo: null,
  order: null,
  orderStatus: null,
};

// Define action types
type Action =
  | { type: 'SET_VARIANT'; payload: ProductVariant }
  | { type: 'SET_QUANTITY'; payload: number }
  | { type: 'SET_CUSTOMER_INFO'; payload: CustomerInfo }
  | { type: 'SET_PAYMENT_INFO'; payload: PaymentInfo }
  | { type: 'SET_ORDER'; payload: Order }
  | { type: 'SET_ORDER_STATUS'; payload: OrderStatus }
  | { type: 'RESET_CHECKOUT' };

// Create the reducer
const storeReducer = (state: StoreState, action: Action): StoreState => {
  switch (action.type) {
    case 'SET_VARIANT':
      return { ...state, selectedVariant: action.payload };
    case 'SET_QUANTITY':
      return { ...state, quantity: action.payload };
    case 'SET_CUSTOMER_INFO':
      return { ...state, customerInfo: action.payload };
    case 'SET_PAYMENT_INFO':
      return { ...state, paymentInfo: action.payload };
    case 'SET_ORDER':
      return { ...state, order: action.payload };
    case 'SET_ORDER_STATUS':
      return { ...state, orderStatus: action.payload };
    case 'RESET_CHECKOUT':
      return {
        ...initialState,
        selectedVariant: state.selectedVariant,
        quantity: state.quantity,
      };
    default:
      return state;
  }
};

// Create the context
type StoreContextType = {
  state: StoreState;
  setVariant: (variant: ProductVariant) => void;
  setQuantity: (quantity: number) => void;
  setCustomerInfo: (info: CustomerInfo) => void;
  setPaymentInfo: (info: PaymentInfo) => void;
  createOrder: (status: OrderStatus) => void;
  setOrderStatus: (status: OrderStatus) => void;
  resetCheckout: () => void;
  calculateSubtotal: () => number;
  calculateTax: () => number;
  calculateTotal: () => number;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Create the provider component
export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  const setVariant = (variant: ProductVariant) => {
    dispatch({ type: 'SET_VARIANT', payload: variant });
  };

  const setQuantity = (quantity: number) => {
    dispatch({ type: 'SET_QUANTITY', payload: quantity });
  };

  const setCustomerInfo = (info: CustomerInfo) => {
    dispatch({ type: 'SET_CUSTOMER_INFO', payload: info });
  };

  const setPaymentInfo = (info: PaymentInfo) => {
    dispatch({ type: 'SET_PAYMENT_INFO', payload: info });
  };

  const calculateSubtotal = () => {
    if (!state.selectedVariant) return 0;
    return state.selectedVariant.price * state.quantity;
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax rate
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const createOrder = (status: OrderStatus) => {
    if (!state.selectedVariant || !state.customerInfo) return;

    const cartItem: CartItem = {
      product: mockProduct,
      variant: state.selectedVariant,
      quantity: state.quantity,
    };

    const order: Order = {
      id: generateOrderId(),
      customer: state.customerInfo,
      items: [cartItem],
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal(),
      status,
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: 'SET_ORDER', payload: order });
    dispatch({ type: 'SET_ORDER_STATUS', payload: status });
  };

  const setOrderStatus = (status: OrderStatus) => {
    dispatch({ type: 'SET_ORDER_STATUS', payload: status });
  };

  const resetCheckout = () => {
    dispatch({ type: 'RESET_CHECKOUT' });
  };

  return (
    <StoreContext.Provider
      value={{
        state,
        setVariant,
        setQuantity,
        setCustomerInfo,
        setPaymentInfo,
        createOrder,
        setOrderStatus,
        resetCheckout,
        calculateSubtotal,
        calculateTax,
        calculateTotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

// Create a custom hook to use the store context
export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}; 