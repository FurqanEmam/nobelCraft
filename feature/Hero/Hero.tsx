"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80",
    alt: "Shop collection",
    title: "New Arrivals",
    subtitle: "Discover the latest trends and elevate your style",
    cta: "Shop Now",
    ctaHref: "/shop",
  },
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80",
    alt: "Lifestyle",
    title: "Curated for You",
    subtitle: "Handpicked pieces that tell your story",
    cta: "Explore",
    ctaHref: "/collection",
  },
  {
    src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80",
    alt: "Fashion",
    title: "Limited Edition",
    subtitle: "Exclusive drops — don't miss out",
    cta: "View Drop",
    ctaHref: "/drops",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goTo = (index: number) => setCurrent(index);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="relative h-[85vh] min-h-[420px] w-full overflow-hidden bg-zinc-900">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            index === current ? "opacity-100 z-0" : "opacity-0 z-[-1]"
          }`}
          aria-hidden={index !== current}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent"
            aria-hidden
          />
          <div className="relative flex h-full max-w-6xl flex-col justify-center px-6 py-16 sm:px-12 md:px-16 lg:px-24">
            <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
              {slide.title}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/90 sm:text-xl">
              {slide.subtitle}
            </p>
            <a
              href={slide.ctaHref}
              className="mt-8 inline-flex w-fit items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            >
              {slide.cta}
            </a>
          </div>
        </div>
      ))}

      {/* Prev / Next */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 md:left-6"
        aria-label="Previous slide"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 md:right-6"
        aria-label="Next slide"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent ${
              index === current
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === current ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
