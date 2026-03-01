"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/products-store";
import {
  getAllSlides,
  addSlide,
  updateSlide,
  deleteSlide,
  reorderSlides,
} from "@/lib/hero-store";
import type { Product } from "@/lib/product-types";
import type { HeroSlide } from "@/lib/hero-types";
import { ProductForm } from "./components/ProductForm";
import { HeroSlideForm } from "./components/HeroSlideForm";

type Tab = "products" | "hero";

export default function DashboardPage() {
  const { logout } = useAuth();
  const [tab, setTab] = useState<Tab>("products");

  // ── Products state ──────────────────────────────────────────────────
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [addingProduct, setAddingProduct] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState<string | null>(null);

  const refreshProducts = useCallback(() => {
    setProducts(getAllProducts());
  }, []);

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  const handleAddProduct = (data: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    addProduct(data);
    refreshProducts();
    setAddingProduct(false);
  };

  const handleUpdateProduct = (data: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data);
      refreshProducts();
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Delete this product?")) {
      setDeletingProduct(id);
      deleteProduct(id);
      refreshProducts();
      setDeletingProduct(null);
    }
  };

  // ── Hero slides state ────────────────────────────────────────────────
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [addingSlide, setAddingSlide] = useState(false);

  const refreshSlides = useCallback(() => {
    setSlides(getAllSlides());
  }, []);

  useEffect(() => {
    refreshSlides();
  }, [refreshSlides]);

  const handleAddSlide = (data: Omit<HeroSlide, "id">) => {
    addSlide(data);
    refreshSlides();
    setAddingSlide(false);
  };

  const handleUpdateSlide = (data: Omit<HeroSlide, "id">) => {
    if (editingSlide) {
      updateSlide(editingSlide.id, data);
      refreshSlides();
      setEditingSlide(null);
    }
  };

  const handleDeleteSlide = (id: string) => {
    if (confirm("Delete this slide?")) {
      deleteSlide(id);
      refreshSlides();
    }
  };

  const moveSlide = (index: number, direction: -1 | 1) => {
    const next = [...slides];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    reorderSlides(next.map((s) => s.id));
    refreshSlides();
  };

  const isProductModalOpen = addingProduct || !!editingProduct;
  const isSlideModalOpen = addingSlide || !!editingSlide;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <div className="border-b border-black/8 bg-white dark:border-white/12 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Admin Dashboard
              </h1>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Manage products and hero slides
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/"
                className="rounded-lg border border-black/12 px-4 py-2 text-sm font-medium text-foreground hover:bg-black/4 dark:border-white/18 dark:hover:bg-white/8"
              >
                View Site
              </Link>
              <button
                onClick={logout}
                className="rounded-lg border border-red-500/30 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex gap-1 border-b border-black/8 dark:border-white/12">
            {(["products", "hero"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`-mb-px px-4 py-2.5 text-sm font-medium transition-colors ${
                  tab === t
                    ? "border-b-2 border-foreground text-foreground"
                    : "text-zinc-500 hover:text-foreground dark:text-zinc-400"
                }`}
              >
                {t === "products" ? "Products" : "Hero Slides"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ── PRODUCTS TAB ── */}
        {tab === "products" && (
          <>
            {!isProductModalOpen && (
              <div className="mb-8">
                <button
                  onClick={() => setAddingProduct(true)}
                  className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition hover:opacity-90"
                >
                  <span>+</span> Add Product
                </button>
              </div>
            )}

            {isProductModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
                <div className="relative w-full max-w-2xl rounded-2xl border border-black/8 bg-white p-6 shadow-xl dark:border-white/12 dark:bg-zinc-900">
                  <h2 className="mb-6 text-xl font-semibold text-foreground">
                    {editingProduct ? "Edit Product" : "Add Product"}
                  </h2>
                  <ProductForm
                    product={editingProduct}
                    onSave={editingProduct ? handleUpdateProduct : handleAddProduct}
                    onCancel={() => {
                      setAddingProduct(false);
                      setEditingProduct(null);
                    }}
                  />
                </div>
              </div>
            )}

            <div className="space-y-4">
              {products.length === 0 ? (
                <div className="rounded-xl border border-black/8 bg-white p-12 text-center dark:border-white/12 dark:bg-zinc-900">
                  <p className="text-zinc-500 dark:text-zinc-400">
                    No products yet. Click &quot;Add Product&quot; to get started.
                  </p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-xl border border-black/8 bg-white dark:border-white/12 dark:bg-zinc-900">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px]">
                      <thead>
                        <tr className="border-b border-black/8 dark:border-white/12">
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Product
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Category
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Price
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Stock
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Sizes
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((p) => (
                          <tr
                            key={p.id}
                            className={`border-b border-black/6 transition dark:border-white/8 ${
                              deletingProduct === p.id ? "opacity-50" : ""
                            }`}
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
                                  <img
                                    src={p.images[0] || ""}
                                    alt={p.alt}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium text-foreground">
                                    {p.name}
                                  </p>
                                  {p.discount != null && p.discount > 0 && (
                                    <span className="text-xs text-green-600 dark:text-green-400">
                                      {p.discount}% off
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
                              {p.category}
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-foreground">
                              ${p.price}
                            </td>
                            <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
                              {p.stocks}
                            </td>
                            <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
                              {p.sizes.join(", ")}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => setEditingProduct(p)}
                                  className="rounded-lg border border-black/12 px-3 py-1.5 text-sm text-foreground hover:bg-black/4 dark:border-white/18 dark:hover:bg-white/8"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(p.id)}
                                  className="rounded-lg border border-red-500/30 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── HERO SLIDES TAB ── */}
        {tab === "hero" && (
          <>
            {!isSlideModalOpen && (
              <div className="mb-8">
                <button
                  onClick={() => setAddingSlide(true)}
                  className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition hover:opacity-90"
                >
                  <span>+</span> Add Slide
                </button>
              </div>
            )}

            {isSlideModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
                <div className="relative w-full max-w-2xl rounded-2xl border border-black/8 bg-white p-6 shadow-xl dark:border-white/12 dark:bg-zinc-900">
                  <h2 className="mb-6 text-xl font-semibold text-foreground">
                    {editingSlide ? "Edit Slide" : "Add Slide"}
                  </h2>
                  <HeroSlideForm
                    slide={editingSlide}
                    nextOrder={slides.length}
                    onSave={editingSlide ? handleUpdateSlide : handleAddSlide}
                    onCancel={() => {
                      setAddingSlide(false);
                      setEditingSlide(null);
                    }}
                  />
                </div>
              </div>
            )}

            {slides.length === 0 ? (
              <div className="rounded-xl border border-black/8 bg-white p-12 text-center dark:border-white/12 dark:bg-zinc-900">
                <p className="text-zinc-500 dark:text-zinc-400">
                  No slides yet. Click &quot;Add Slide&quot; to get started.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className="flex items-center gap-4 rounded-xl border border-black/8 bg-white p-4 dark:border-white/12 dark:bg-zinc-900"
                  >
                    {/* Thumbnail */}
                    <div className="h-20 w-32 shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-foreground">
                        {slide.title}
                      </p>
                      {slide.subtitle && (
                        <p className="mt-0.5 truncate text-sm text-zinc-500 dark:text-zinc-400">
                          {slide.subtitle}
                        </p>
                      )}
                      <div className="mt-1 flex items-center gap-2">
                        <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                          {slide.cta}
                        </span>
                        <span className="text-xs text-zinc-400 dark:text-zinc-600">
                          → {slide.ctaHref}
                        </span>
                      </div>
                    </div>

                    {/* Order controls + actions */}
                    <div className="flex shrink-0 items-center gap-2">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => moveSlide(index, -1)}
                          disabled={index === 0}
                          className="rounded p-1 text-zinc-400 hover:bg-black/4 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-white/8"
                          aria-label="Move up"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => moveSlide(index, 1)}
                          disabled={index === slides.length - 1}
                          className="rounded p-1 text-zinc-400 hover:bg-black/4 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-white/8"
                          aria-label="Move down"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                      <button
                        onClick={() => setEditingSlide(slide)}
                        className="rounded-lg border border-black/12 px-3 py-1.5 text-sm text-foreground hover:bg-black/4 dark:border-white/18 dark:hover:bg-white/8"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSlide(slide.id)}
                        className="rounded-lg border border-red-500/30 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
