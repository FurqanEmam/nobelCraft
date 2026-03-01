"use client";

import type { HeroSlide } from "./hero-types";

const STORAGE_KEY = "nobelcraft-hero-slides";
const SLIDES_UPDATED = "nobelcraft-slides-updated";

const defaultSlides: HeroSlide[] = [
  {
    id: "slide-1",
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80",
    alt: "Shop collection",
    title: "New Arrivals",
    subtitle: "Discover the latest trends and elevate your style",
    cta: "Shop Now",
    ctaHref: "/shop",
    order: 0,
  },
  {
    id: "slide-2",
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80",
    alt: "Lifestyle",
    title: "Curated for You",
    subtitle: "Handpicked pieces that tell your story",
    cta: "Explore",
    ctaHref: "/collection",
    order: 1,
  },
  {
    id: "slide-3",
    src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80",
    alt: "Fashion",
    title: "Limited Edition",
    subtitle: "Exclusive drops — don't miss out",
    cta: "View Drop",
    ctaHref: "/drops",
    order: 2,
  },
];

function getSlidesFromStorage(): HeroSlide[] {
  if (typeof window === "undefined") return defaultSlides;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as HeroSlide[];
      return parsed.length > 0
        ? [...parsed].sort((a, b) => a.order - b.order)
        : defaultSlides;
    }
  } catch {
    // ignore
  }
  return defaultSlides;
}

function saveSlides(slides: HeroSlide[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(slides));
  window.dispatchEvent(new CustomEvent(SLIDES_UPDATED));
}

export function getAllSlides(): HeroSlide[] {
  return getSlidesFromStorage();
}

export function addSlide(data: Omit<HeroSlide, "id">): HeroSlide {
  const slides = getSlidesFromStorage();
  const slide: HeroSlide = {
    ...data,
    id: crypto.randomUUID(),
    order: data.order ?? slides.length,
  };
  slides.push(slide);
  saveSlides(slides);
  return slide;
}

export function updateSlide(id: string, data: Partial<HeroSlide>): HeroSlide | null {
  const slides = getSlidesFromStorage();
  const index = slides.findIndex((s) => s.id === id);
  if (index === -1) return null;
  const updated: HeroSlide = { ...slides[index], ...data, id };
  slides[index] = updated;
  saveSlides(slides);
  return updated;
}

export function deleteSlide(id: string): boolean {
  const slides = getSlidesFromStorage();
  const next = slides.filter((s) => s.id !== id);
  if (next.length === slides.length) return false;
  const reordered = next.map((s, i) => ({ ...s, order: i }));
  saveSlides(reordered);
  return true;
}

export function reorderSlides(ids: string[]): void {
  const slides = getSlidesFromStorage();
  const map = new Map(slides.map((s) => [s.id, s]));
  const reordered = ids
    .map((id, i) => {
      const s = map.get(id);
      return s ? { ...s, order: i } : null;
    })
    .filter(Boolean) as HeroSlide[];
  saveSlides(reordered);
}

export const HERO_SLIDES_UPDATED = SLIDES_UPDATED;
