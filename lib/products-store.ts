"use client";

import type { Product } from "./product-types";

const STORAGE_KEY = "nobelcraft-products";

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Orange Shirt",
    category: "Apparel",
    description: "Quality product from NobelCraft.",
    price: 1700,
    images: [
      "https://res.cloudinary.com/dtnazotdl/image/upload/v1772579400/WhatsApp_Image_2026-03-04_at_4.04.19_AM_szvxak.jpg",
    ],
    stocks: 50,
    sizes: ["S", "M", "L", "XL"],
    discount: 0,
    offer: "Free shipping over $100",
    href: "/shop/product-1",
    alt: "Product 1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "White Shirt",
    category: "Apparel",
    description: "Quality product from NobelCraft.",
    price: 1700,
    images: [
      "https://res.cloudinary.com/dtnazotdl/image/upload/v1772579400/WhatsApp_Image_2026-03-04_at_4.04.21_AM_hybjzx.jpg",
    ],
    stocks: 120,
    sizes: ["XS", "S", "M", "L", "XL"],
    href: "/shop/product-2",
    alt: "Product 2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Black Shirt",
    category: "Apparel",
    description: "Quality product from NobelCraft.",
    price: 1700,
    images: [
      "https://res.cloudinary.com/dtnazotdl/image/upload/v1772579400/WhatsApp_Image_2026-03-04_at_4.04.21_AM_1_x3bzjy.jpg",
    ],
    stocks: 75,
    sizes: ["S", "M", "L", "XL"],
    discount: 0,
    href: "/shop/product-3",
    alt: "Product 3",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Deep Brown Shirt",
    category: "Apparel",
    description: "Quality product from NobelCraft.",
    price: 1700,
    images: [
      "https://res.cloudinary.com/dtnazotdl/image/upload/v1772579400/WhatsApp_Image_2026-03-04_at_4.04.21_AM_2_t3vcbl.jpg",
    ],
    stocks: 60,
    sizes: ["S", "M", "L", "XL"],
    href: "/shop/product-4",
    alt: "Product 4",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Light Green Shirt",
    category: "Apparel",
    description: "Quality product from NobelCraft.",
    price: 1350,
    images: [
      "https://res.cloudinary.com/dtnazotdl/image/upload/v1772579400/WhatsApp_Image_2026-03-04_at_4.04.38_AM_wv8whw.jpg",
    ],
    stocks: 80,
    sizes: ["S", "M", "L", "XL"],
    href: "/shop/product-5",
    alt: "Product 5",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Black T-Shirt",
    category: "Apparel",
    description: "Quality product from NobelCraft.",
    price: 1350,
    images: [
      "https://res.cloudinary.com/dtnazotdl/image/upload/v1772579400/WhatsApp_Image_2026-03-04_at_4.04.39_AM_gsmcgo.jpg",
    ],
    stocks: 70,
    sizes: ["S", "M", "L", "XL"],
    href: "/shop/product-6",
    alt: "Product 6",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Sky-Blue T-Shirt",
    category: "Apparel",
    description: "Quality product from NobelCraft.",
    price: 1350,
    images: [
      "https://res.cloudinary.com/dtnazotdl/image/upload/v1772579399/WhatsApp_Image_2026-03-04_at_4.04.39_AM_1_ozc9u7.jpg",
    ],
    stocks: 90,
    sizes: ["S", "M", "L", "XL"],
    href: "/shop/product-7",
    alt: "Product 7",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "8",
    name: "White T-Shirt",
    category: "Apparel",
    description: "Quality product from NobelCraft.",
    price: 1350,
    images: [
      "https://res.cloudinary.com/dtnazotdl/image/upload/v1772579399/WhatsApp_Image_2026-03-04_at_4.04.38_AM_1_wwhnxb.jpg",
    ],
    stocks: 85,
    sizes: ["S", "M", "L", "XL"],
    href: "/shop/product-8",
    alt: "Product 8",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "9",
    name: "Off-White T-Shirt",
    category: "Apparel",
    description: "Quality product from NobelCraft.",
    price: 1350,
    images: [
      "https://res.cloudinary.com/dtnazotdl/image/upload/v1772579399/WhatsApp_Image_2026-03-04_at_4.04.20_AM_ktzcxy.jpg",
    ],
    stocks: 100,
    sizes: ["S", "M", "L", "XL"],
    href: "/shop/product-9",
    alt: "Product 9",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "10",
    name: "Black Shirt",
    category: "Apparel",
    description: "Quality product from NobelCraft.",
    price: 1700,
    images: [
      "https://res.cloudinary.com/dtnazotdl/image/upload/v1772579399/WhatsApp_Image_2026-03-04_at_4.04.20_AM_1_kguynw.jpg",
    ],
    stocks: 95,
    sizes: ["S", "M", "L", "XL"],
    href: "/shop/product-10",
    alt: "Product 10",
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

export function addProduct(
  data: Omit<Product, "id" | "createdAt" | "updatedAt">,
): Product {
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

export function updateProduct(
  id: string,
  data: Partial<Product>,
): Product | null {
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
