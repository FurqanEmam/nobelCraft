"use client";

import React, { useState, useEffect, useCallback } from "react";
import { getAllSlides, HERO_SLIDES_UPDATED } from "@/lib/hero-store";
import type { HeroSlide } from "@/lib/hero-types";

const Hero = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [current, setCurrent] = useState(0);

  const refresh = useCallback(() => {
    const loaded = getAllSlides();
    setSlides(loaded);
    setCurrent((prev) => (prev >= loaded.length ? 0 : prev));
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener(HERO_SLIDES_UPDATED, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(HERO_SLIDES_UPDATED, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % (slides.length || 1));
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + (slides.length || 1)) % (slides.length || 1));
  }, [slides.length]);

  const goTo = (index: number) => setCurrent(index);

  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, slides.length]);

  if (slides.length === 0) {
    return (
      <section className="relative flex h-[85vh] min-h-[420px] w-full items-center justify-center bg-zinc-900">
        <p className="text-zinc-500">No slides yet. Add one from the dashboard.</p>
      </section>
    );
  }

  return (
    <section className="relative h-[85vh] min-h-[420px] w-full overflow-hidden bg-zinc-900">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            index === current ? "z-0 opacity-100" : "z-[-1] opacity-0"
          }`}
          aria-hidden={index !== current}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.src}
            alt={slide.alt}
            className="h-full w-full object-cover"
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
      {slides.length > 1 && (
        <>
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
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
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
      )}
    </section>
  );
};

export default Hero;
