"use client";

import React, { useState, useEffect } from "react";
import type { HeroSlide } from "@/lib/hero-types";

type HeroSlideFormProps = {
  slide?: HeroSlide | null;
  nextOrder: number;
  onSave: (data: Omit<HeroSlide, "id">) => void;
  onCancel: () => void;
};

export function HeroSlideForm({
  slide,
  nextOrder,
  onSave,
  onCancel,
}: HeroSlideFormProps) {
  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [cta, setCta] = useState("Shop Now");
  const [ctaHref, setCtaHref] = useState("/shop");
  const [previewError, setPreviewError] = useState(false);

  useEffect(() => {
    if (slide) {
      setSrc(slide.src);
      setAlt(slide.alt);
      setTitle(slide.title);
      setSubtitle(slide.subtitle);
      setCta(slide.cta);
      setCtaHref(slide.ctaHref);
    }
    setPreviewError(false);
  }, [slide]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!src || !title) return;
    onSave({
      src,
      alt: alt || title,
      title,
      subtitle,
      cta: cta || "Shop Now",
      ctaHref: ctaHref || "/shop",
      order: slide?.order ?? nextOrder,
    });
  };

  const inputClass =
    "mt-1 block w-full rounded-lg border border-black/12 bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-zinc-400 outline-none transition-colors focus:border-black/30 dark:border-white/18 dark:bg-zinc-800 dark:focus:border-white/30";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Image URL + live preview */}
      <div>
        <label className="block text-sm font-medium text-foreground">
          Image URL *
        </label>
        <input
          type="url"
          value={src}
          onChange={(e) => {
            setSrc(e.target.value);
            setPreviewError(false);
          }}
          placeholder="https://images.unsplash.com/photo-..."
          required
          className={inputClass}
        />
        {src && !previewError && (
          <div className="mt-2 h-36 w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt="preview"
              className="h-full w-full object-cover"
              onError={() => setPreviewError(true)}
            />
          </div>
        )}
        {previewError && (
          <p className="mt-1 text-xs text-red-500">
            Could not load image — check the URL.
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-foreground">
            Headline *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. New Arrivals"
            required
            className={inputClass}
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
            placeholder="Accessible description (defaults to headline)"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground">
          Subheading
        </label>
        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="e.g. Discover the latest trends and elevate your style"
          className={inputClass}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-foreground">
            Button label
          </label>
          <input
            type="text"
            value={cta}
            onChange={(e) => setCta(e.target.value)}
            placeholder="e.g. Shop Now"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">
            Button link
          </label>
          <input
            type="text"
            value={ctaHref}
            onChange={(e) => setCtaHref(e.target.value)}
            placeholder="/shop"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-black/8 pt-5 dark:border-white/12">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-black/12 px-5 py-2.5 text-sm text-foreground hover:bg-black/4 dark:border-white/18 dark:hover:bg-white/8"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:opacity-90"
        >
          {slide ? "Update Slide" : "Add Slide"}
        </button>
      </div>
    </form>
  );
}
