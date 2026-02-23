export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  images: string[];
  stocks: number;
  sizes: string[];
  discount?: number; // percentage 0-100
  offer?: string; // e.g. "Buy 2 Get 1 Free"
  href: string;
  alt: string;
  createdAt: string;
  updatedAt: string;
}

export type ProductFormData = Omit<Product, "id" | "createdAt" | "updatedAt">;
