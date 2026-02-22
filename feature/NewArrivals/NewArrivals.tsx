import React from "react";
import Image from "next/image";
import Link from "next/link";

const newArrivals = [
  {
    id: "1",
    name: "Classic Oxford Shirt",
    category: "Shirt",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
    alt: "Classic Oxford Shirt",
    href: "/shop/oxford-shirt",
  },
  {
    id: "2",
    name: "Essential Cotton T-Shirt",
    category: "T-Shirt",
    price: 32,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    alt: "Essential Cotton T-Shirt",
    href: "/shop/cotton-tshirt",
  },
  {
    id: "3",
    name: "Premium Polo",
    category: "Polo",
    price: 58,
    image:
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&q=80",
    alt: "Premium Polo",
    href: "/shop/polo",
  },
  {
    id: "4",
    name: "Relaxed Linen Shirt",
    category: "Shirt",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
    alt: "Relaxed Linen Shirt",
    href: "/shop/linen-shirt",
  },
  {
    id: "5",
    name: "Oversized Graphic Tee",
    category: "T-Shirt",
    price: 42,
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80",
    alt: "Oversized Graphic Tee",
    href: "/shop/graphic-tee",
  },
  {
    id: "6",
    name: "Zip Hoodie",
    category: "Hoodie",
    price: 78,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80",
    alt: "Zip Hoodie",
    href: "/shop/hoodie",
  },
];

const NewArrivals = () => {
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
          {newArrivals.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex flex-col overflow-hidden rounded-xl border border-black/8 bg-white transition hover:border-black/12 hover:shadow-lg dark:border-white/12 dark:bg-zinc-900/50 dark:hover:border-white/18 dark:hover:shadow-zinc-900/50"
            >
              <div className="relative aspect-3/4 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
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
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center sm:mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full border-2 border-foreground bg-transparent px-8 py-3.5 text-sm font-semibold text-foreground transition hover:bg-foreground hover:text-background focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
