// Order-specific TypeScript types and interfaces

export interface OrderItem {
  id: number;
  product: string;
  image: string;
  qty: number;
  unitPrice: number;
  total: number;
}

export interface OrderCustomer {
  name: string;
  phone: string;
}

export interface OrderShipping {
  recipient: string;
  address: string;
  mobile: string;
  type: string;
}

export interface OrderPricing {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  grandTotal: number;
}

export interface OrderHistoryEvent {
  id: number;
  status: string;
  description: string;
  previousStatus: string;
  timestamp: string;
}

export interface Order {
  id: string;
  currentStatus: string;
  placedOn: string;
  lastUpdated: string;
  customer: OrderCustomer;
  shipping: OrderShipping;
  items: OrderItem[];
  pricing: OrderPricing;
  history: OrderHistoryEvent[];
}

export type OrderStatus = 
  | "Pending" 
  | "Processing" 
  | "Confirmed" 
  | "Shipped" 
  | "Out for Delivery" 
  | "Delivered" 
  | "Cancelled";
