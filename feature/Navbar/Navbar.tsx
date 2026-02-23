"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#contact", label: "Contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/8 bg-white/80 backdrop-blur-md dark:border-white/[.145] dark:bg-black/80">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          NobelCraft
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-foreground dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={isAuthenticated ? "/dashboard" : "/DashLogin"}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-foreground dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              {isAuthenticated ? "Dashboard" : "Admin"}
            </Link>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-black/4 dark:hover:bg-white/8 md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile nav panel */}
      {mobileOpen && (
        <div className="border-t border-black/8 bg-white dark:border-white/[.145] dark:bg-black md:hidden">
          <ul className="flex flex-col px-4 py-4">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-black/4 hover:text-foreground dark:text-zinc-400 dark:hover:bg-white/8 dark:hover:text-zinc-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={isAuthenticated ? "/dashboard" : "/DashLogin"}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-black/4 hover:text-foreground dark:text-zinc-400 dark:hover:bg-white/8 dark:hover:text-zinc-50"
                onClick={() => setMobileOpen(false)}
              >
                {isAuthenticated ? "Dashboard" : "Admin"}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
