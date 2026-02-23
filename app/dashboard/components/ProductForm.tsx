"use client";

import React, { useState, useEffect } from "react";
import type { Product } from "@/lib/product-types";

type ProductFormProps = {
  product?: Product | null;
  onSave: (data: Omit<Product, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
};

export function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<string[]>([""]);
  const [stocks, setStocks] = useState("");
  const [sizes, setSizes] = useState<string[]>([""]);
  const [discount, setDiscount] = useState("");
  const [offer, setOffer] = useState("");
  const [href, setHref] = useState("");
  const [alt, setAlt] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setDescription(product.description);
      setPrice(String(product.price));
      setImages(product.images.length ? product.images : [""]);
      setStocks(String(product.stocks));
      setSizes(product.sizes.length ? product.sizes : [""]);
      setDiscount(product.discount != null ? String(product.discount) : "");
      setOffer(product.offer ?? "");
      setHref(product.href);
      setAlt(product.alt);
    }
  }, [product]);

  const addImage = () => setImages((p) => [...p, ""]);
  const removeImage = (i: number) =>
    setImages((p) => (p.length > 1 ? p.filter((_, j) => j !== i) : [""]));
  const setImage = (i: number, v: string) =>
    setImages((p) => p.map((x, j) => (j === i ? v : x)));

  const addSize = () => setSizes((p) => [...p, ""]);
  const removeSize = (i: number) =>
    setSizes((p) => (p.length > 1 ? p.filter((_, j) => j !== i) : [""]));
  const setSize = (i: number, v: string) =>
    setSizes((p) => p.map((x, j) => (j === i ? v : x)));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const imgList = images.filter(Boolean);
    const sizeList = sizes.filter(Boolean);
    if (!name || !category || !price || imgList.length === 0) return;
    onSave({
      name,
      category,
      description,
      price: parseFloat(price) || 0,
      images: imgList,
      stocks: parseInt(stocks, 10) || 0,
      sizes: sizeList.length ? sizeList : ["One Size"],
      discount: discount ? parseFloat(discount) : undefined,
      offer: offer || undefined,
      href: href || `/shop/${name.toLowerCase().replace(/\s+/g, "-")}`,
      alt: alt || name,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-foreground">
            Product Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border border-black/12 bg-white px-4 py-2.5 text-foreground dark:border-white/18 dark:bg-zinc-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">
            Category *
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            placeholder="e.g. Shirt, T-Shirt, Polo"
            className="mt-1 block w-full rounded-lg border border-black/12 bg-white px-4 py-2.5 text-foreground dark:border-white/18 dark:bg-zinc-800"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-lg border border-black/12 bg-white px-4 py-2.5 text-foreground dark:border-white/18 dark:bg-zinc-800"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="block text-sm font-medium text-foreground">
            Price ($) *
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="mt-1 block w-full rounded-lg border border-black/12 bg-white px-4 py-2.5 text-foreground dark:border-white/18 dark:bg-zinc-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">
            Stock
          </label>
          <input
            type="number"
            min="0"
            value={stocks}
            onChange={(e) => setStocks(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-black/12 bg-white px-4 py-2.5 text-foreground dark:border-white/18 dark:bg-zinc-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">
            Discount (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="1"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="0-100"
            className="mt-1 block w-full rounded-lg border border-black/12 bg-white px-4 py-2.5 text-foreground dark:border-white/18 dark:bg-zinc-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">
            Offer
          </label>
          <input
            type="text"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            placeholder="e.g. Buy 2 Get 1 Free"
            className="mt-1 block w-full rounded-lg border border-black/12 bg-white px-4 py-2.5 text-foreground dark:border-white/18 dark:bg-zinc-800"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-foreground">
            Images (URLs) *
          </label>
          <button
            type="button"
            onClick={addImage}
            className="text-sm text-foreground/70 hover:text-foreground"
          >
            + Add image
          </button>
        </div>
        <div className="mt-2 space-y-2">
          {images.map((url, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="url"
                value={url}
                onChange={(e) => setImage(i, e.target.value)}
                placeholder="https://..."
                className="flex-1 rounded-lg border border-black/12 bg-white px-4 py-2 text-foreground dark:border-white/18 dark:bg-zinc-800"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="rounded-lg border border-black/12 px-3 text-red-600 hover:bg-red-50 dark:border-white/18 dark:hover:bg-red-950/30"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-foreground">
            Sizes
          </label>
          <button
            type="button"
            onClick={addSize}
            className="text-sm text-foreground/70 hover:text-foreground"
          >
            + Add size
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {sizes.map((s, i) => (
            <div key={i} className="flex gap-1">
              <input
                type="text"
                value={s}
                onChange={(e) => setSize(i, e.target.value)}
                placeholder="S, M, L..."
                className="w-20 rounded-lg border border-black/12 bg-white px-3 py-2 text-foreground dark:border-white/18 dark:bg-zinc-800"
              />
              <button
                type="button"
                onClick={() => removeSize(i)}
                className="rounded-lg border border-black/12 px-2 text-red-600 hover:bg-red-50 dark:border-white/18 dark:hover:bg-red-950/30"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-foreground">
            Product URL (href)
          </label>
          <input
            type="text"
            value={href}
            onChange={(e) => setHref(e.target.value)}
            placeholder="/shop/product-slug"
            className="mt-1 block w-full rounded-lg border border-black/12 bg-white px-4 py-2.5 text-foreground dark:border-white/18 dark:bg-zinc-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">
            Image alt text
          </label>
          <input
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="Accessible description"
            className="mt-1 block w-full rounded-lg border border-black/12 bg-white px-4 py-2.5 text-foreground dark:border-white/18 dark:bg-zinc-800"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-black/8 pt-6 dark:border-white/12">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-black/12 px-5 py-2.5 text-foreground hover:bg-black/4 dark:border-white/18 dark:hover:bg-white/8"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:opacity-90"
        >
          {product ? "Update Product" : "Add Product"}
        </button>
      </div>
    </form>
  );
}
