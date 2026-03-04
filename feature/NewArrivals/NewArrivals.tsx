"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getAllProducts } from "@/lib/products-store";

const INITIAL_COUNT = 6;

const NewArrivals = () => {
  const [products, setProducts] = useState<ReturnType<typeof getAllProducts>>(
    [],
  );
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const refresh = () => setProducts(getAllProducts());
    refresh();
    window.addEventListener("nobelcraft-products-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("nobelcraft-products-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const displayedProducts = showAll
    ? products
    : products.slice(0, INITIAL_COUNT);
  const hasMore = products.length > INITIAL_COUNT;

  return (
    <section className="w-full bg-background py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center sm:mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            New Arrivals
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-zinc-600 dark:text-zinc-400 sm:text-lg">
            Fresh pieces to elevate your everyday style
          </p>
        </header>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-3 lg:gap-8">
          {displayedProducts.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex flex-col overflow-hidden rounded-xl border border-black/8 bg-white transition hover:border-black/12 hover:shadow-lg dark:border-white/12 dark:bg-zinc-900/50 dark:hover:border-white/18 dark:hover:shadow-zinc-900/50"
            >
              <div className="relative aspect-3/4 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <img
                  src={item.images[0] || ""}
                  alt={item.alt}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  {item.category}
                </span>
                <h3 className="mt-1 text-base font-semibold text-foreground sm:text-lg">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  ${item.price}
                  {item.discount != null && item.discount > 0 && (
                    <span className="ml-2 text-green-600 dark:text-green-400">
                      ({item.discount}% off)
                    </span>
                  )}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="rounded-full border-2 border-foreground bg-transparent px-6 py-2.5 text-sm font-semibold text-foreground transition hover:bg-foreground hover:text-background focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
            >
              {showAll
                ? "View less"
                : `View more (${products.length - INITIAL_COUNT} more)`}
            </button>
          </div>
        )}

        {/* <div className="mt-10 text-center sm:mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full border-2 border-foreground bg-transparent px-8 py-3.5 text-sm font-semibold text-foreground transition hover:bg-foreground hover:text-background focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
          >
            View All
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default NewArrivals;
