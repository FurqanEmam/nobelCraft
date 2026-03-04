"use client";

import React from "react";

export default function FreeDeliveryBanner() {
  return (
    <div className="relative z-60 w-full overflow-hidden border-b border-amber-500/20 bg-linear-to-r from-emerald-800 via-emerald-900 to-emerald-800 px-4 py-2.5 text-center shadow-lg">
      {/* Gold shimmer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "linear-gradient(105deg, transparent 0%, transparent 35%, rgba(251,191,36,0.6) 50%, transparent 65%, transparent 100%)",
          backgroundSize: "200% 100%",
          backgroundPosition: "200% 0",
          animation: "banner-shine 2.5s ease-in-out infinite",
        }}
      />
      {/* Subtle geometric accent */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-24 opacity-10"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(251,191,36,0.5) 8px, rgba(251,191,36,0.5) 10px)",
        }}
      />
      <p className="relative flex flex-wrap items-center justify-center gap-2 text-sm font-bold tracking-wide drop-shadow-sm sm:gap-3 sm:text-base">
        <span className="text-amber-300" aria-hidden>🌙</span>
        <span className="rounded-full border border-amber-400/40 bg-amber-500/20 px-2.5 py-0.5 text-xs font-black uppercase text-amber-100 sm:px-3 sm:text-sm">
          Ramadan Special
        </span>
        <span className="text-emerald-100/90">•</span>
        <span className="text-white">Free Delivery on all orders</span>
        <span className="text-emerald-100/90">•</span>
        <span className="text-amber-200/95">No minimum</span>
        <span className="text-amber-300" aria-hidden>✨</span>
      </p>
    </div>
  );
}
