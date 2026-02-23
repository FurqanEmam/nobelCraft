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
import type { Product } from "@/lib/product-types";
import { ProductForm } from "./components/ProductForm";

export default function DashboardPage() {
  const { logout } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const refresh = useCallback(() => {
    setProducts(getAllProducts());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleAdd = (data: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    addProduct(data);
    refresh();
    setAdding(false);
  };

  const handleUpdate = (
    data: Omit<Product, "id" | "createdAt" | "updatedAt">
  ) => {
    if (editing) {
      updateProduct(editing.id, data);
      refresh();
      setEditing(null);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this product?")) {
      setDeleting(id);
      deleteProduct(id);
      refresh();
      setDeleting(null);
    }
  };

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
                Manage your products
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
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Add product button */}
        {!adding && !editing && (
          <div className="mb-8">
            <button
              onClick={() => setAdding(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition hover:opacity-90"
            >
              <span>+</span> Add Product
            </button>
          </div>
        )}

        {/* Add/Edit form modal */}
        {(adding || editing) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
            <div className="relative w-full max-w-2xl rounded-2xl border border-black/8 bg-white p-6 shadow-xl dark:border-white/12 dark:bg-zinc-900">
              <h2 className="mb-6 text-xl font-semibold text-foreground">
                {editing ? "Edit Product" : "Add Product"}
              </h2>
              <ProductForm
                product={editing}
                onSave={editing ? handleUpdate : handleAdd}
                onCancel={() => {
                  setAdding(false);
                  setEditing(null);
                }}
              />
            </div>
          </div>
        )}

        {/* Products grid */}
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
                          deleting === p.id ? "opacity-50" : ""
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
                              onClick={() => setEditing(p)}
                              className="rounded-lg border border-black/12 px-3 py-1.5 text-sm text-foreground hover:bg-black/4 dark:border-white/18 dark:hover:bg-white/8"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(p.id)}
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
      </div>
    </div>
  );
}
