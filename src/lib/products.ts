import productsData from '@/../../data/products.json';
import siteConfig from '@/../../data/site-config.json';
import { Product } from '@/types';

export function getAllProducts(): Product[] {
  return productsData.products as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
  return productsData.products.find((p) => p.slug === slug) as Product | undefined;
}

export function getFeaturedProducts(): Product[] {
  return productsData.products.filter((p) => p.featured) as Product[];
}

export function getSiteConfig() {
  return siteConfig;
}

export function calculateShipping(subtotal: number): number {
  const config = getSiteConfig();
  if (subtotal >= config.shipping.freeShippingThreshold) {
    return 0;
  }
  return config.shipping.rates.standard;
}

export function calculateTax(subtotal: number): number {
  const config = getSiteConfig();
  return subtotal * config.tax.rate;
}

export function calculateTotal(subtotal: number, shipping: number, tax: number): number {
  return subtotal + shipping + tax;
}
