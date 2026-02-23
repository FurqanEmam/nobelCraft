"use client";

import type { Product } from "./product-types";

const STORAGE_KEY = "nobelcraft-products";

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Classic Oxford Shirt",
    category: "Shirt",
    description: "Timeless oxford shirt in premium cotton.",
    price: 89,
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
    ],
    stocks: 50,
    sizes: ["S", "M", "L", "XL"],
    discount: 10,
    offer: "Free shipping over $100",
    href: "/shop/oxford-shirt",
    alt: "Classic Oxford Shirt",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Essential Cotton T-Shirt",
    category: "T-Shirt",
    description: "Soft cotton tee for everyday wear.",
    price: 32,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    ],
    stocks: 120,
    sizes: ["XS", "S", "M", "L", "XL"],
    href: "/shop/cotton-tshirt",
    alt: "Essential Cotton T-Shirt",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Premium Polo",
    category: "Polo",
    description: "Elegant polo in breathable fabric.",
    price: 58,
    images: [
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&q=80",
    ],
    stocks: 75,
    sizes: ["S", "M", "L", "XL"],
    discount: 15,
    href: "/shop/polo",
    alt: "Premium Polo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function getProductsFromStorage(): Product[] {
  if (typeof window === "undefined") return defaultProducts;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Product[];
      return parsed.length > 0 ? parsed : defaultProducts;
    }
  } catch {
    // ignore
  }
  return defaultProducts;
}

const PRODUCTS_UPDATED = "nobelcraft-products-updated";

function saveProducts(products: Product[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  window.dispatchEvent(new CustomEvent(PRODUCTS_UPDATED));
}

export function getAllProducts(): Product[] {
  return getProductsFromStorage();
}

export function getProductById(id: string): Product | undefined {
  return getProductsFromStorage().find((p) => p.id === id);
}

export function addProduct(data: Omit<Product, "id" | "createdAt" | "updatedAt">): Product {
  const products = getProductsFromStorage();
  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  const product: Product = {
    ...data,
    id,
    createdAt: now,
    updatedAt: now,
  };
  products.push(product);
  saveProducts(products);
  return product;
}

export function updateProduct(id: string, data: Partial<Product>): Product | null {
  const products = getProductsFromStorage();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const updated: Product = {
    ...products[index],
    ...data,
    id,
    updatedAt: new Date().toISOString(),
  };
  products[index] = updated;
  saveProducts(products);
  return updated;
}

export function deleteProduct(id: string): boolean {
  const products = getProductsFromStorage().filter((p) => p.id !== id);
  if (products.length === getProductsFromStorage().length) return false;
  saveProducts(products);
  return true;
}
