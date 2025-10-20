// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  images: {
    main: string;
    gallery: string[];
    thumbnail: string;
  };
  category: 'candles' | 'accessories';
  scent: string;
  featured: boolean;
  inStock: boolean;
  inventory?: number;
  specs?: {
    weight?: string;
    burnTime?: string;
    dimensions?: string;
    materials?: string[];
  };
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
  tax?: number;
  shipping?: number;
}

// Booking Types
export interface BookingSlot {
  id: string;
  date: string;
  time: string;
  duration: number; // in minutes
  available: boolean;
  maxCapacity: number;
  currentBookings: number;
}

export interface Booking {
  id?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  slotId: string;
  numberOfPeople: number;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt?: string;
}

// Order Types
export interface ShippingAddress {
  name: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shipping: ShippingAddress;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  stripeSessionId?: string;
  createdAt: string;
}

// Site Config Types
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  logo: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  shipping: {
    freeShippingThreshold: number;
    rates: {
      standard: number;
      express: number;
    };
  };
  tax: {
    rate: number;
  };
}
