"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/products-store";
import type { Product } from "@/lib/product-types";

function TrendingCard({ item }: { item: Product }) {
  return (
    <Link
      href={item.href}
      className="group flex w-[280px] shrink-0 flex-col overflow-hidden rounded-xl border border-black/8 bg-white transition hover:border-black/12 hover:shadow-lg dark:border-white/12 dark:bg-zinc-900/50 dark:hover:border-white/18 dark:hover:shadow-zinc-900/50"
    >
      <div className="relative aspect-3/4 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {item.images[0] ? (
          <Image
            src={item.images[0]}
            alt={item.alt}
            fill
            sizes="280px"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {item.category}
        </span>
        <h3 className="mt-1 text-base font-semibold text-foreground">
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
  );
}

const CARD_WIDTH = 280;
const GAP = 24;
const DURATION_ONE_LOOP_MS = 45000;

export const Trending = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [offsetX, setOffsetX] = useState(0);
  const startTimeRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const wasPausedRef = useRef(false);
  const offsetXRef = useRef(0);

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

  const duplicated = products.length > 0 ? [...products, ...products] : [];
  const halfWidth = products.length * (CARD_WIDTH + GAP) + GAP;

  useEffect(() => {
    if (duplicated.length === 0) return;

    const animate = (now: number) => {
      rafRef.current = requestAnimationFrame(animate);
      if (isPaused) {
        wasPausedRef.current = true;
        startTimeRef.current = now;
        return;
      }
      if (wasPausedRef.current) {
        wasPausedRef.current = false;
        const currentOffset = offsetXRef.current;
        if (halfWidth > 0) {
          startTimeRef.current = now - ((-currentOffset / halfWidth) * DURATION_ONE_LOOP_MS) % DURATION_ONE_LOOP_MS;
        }
      }
      const elapsed = now - startTimeRef.current;
      const progress = (elapsed / DURATION_ONE_LOOP_MS) % 1;
      const nextX = -(progress * halfWidth);
      offsetXRef.current = nextX;
      setOffsetX(nextX);
    };

    startTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [duplicated.length, halfWidth, isPaused]);

  return (
    <section className="w-full overflow-hidden bg-background py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center sm:mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Trending Now
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-zinc-600 dark:text-zinc-400 sm:text-lg">
            Scroll through what’s hot — hover to pause
          </p>
        </header>
      </div>

      <div
        className="relative flex w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex shrink-0 gap-6 pr-6"
          style={{
            transform: `translateX(${offsetX}px)`,
            width: "max-content",
          }}
        >
          {duplicated.map((item, index) => (
            <TrendingCard key={`trending-${item.id}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
