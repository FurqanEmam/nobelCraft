"use client";

import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#contact", label: "Contact" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        aria-hidden
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://x.com",
    icon: (
      <svg
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com",
    icon: (
      <svg
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-black/8 bg-white dark:border-white/[.145] dark:bg-black">
      {/* Main footer content */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="w-fit text-lg font-semibold tracking-tight text-foreground transition-opacity hover:opacity-70"
            >
              NobelCraft
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Crafted with intention. Worn with confidence. Timeless pieces for
              the modern wardrobe.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-black/4 hover:text-foreground dark:text-zinc-400 dark:hover:bg-white/8 dark:hover:text-zinc-50"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Navigate
            </h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-zinc-600 transition-colors hover:text-foreground dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Newsletter column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Stay in the loop
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Get early access to new arrivals and exclusive offers.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="h-9 flex-1 rounded-lg border border-black/12 bg-transparent px-3 text-sm text-foreground placeholder:text-zinc-400 outline-none transition-colors focus:border-black/30 dark:border-white/12 dark:placeholder:text-zinc-600 dark:focus:border-white/30"
              />
              <button
                type="submit"
                className="h-9 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-80"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-black/8 dark:border-white/[.145]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-zinc-400 sm:flex-row sm:px-6 lg:px-8 dark:text-zinc-600">
          <span>© {currentYear} NobelCraft. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link
              href="/#"
              className="transition-colors hover:text-zinc-600 dark:hover:text-zinc-400"
            >
              Privacy Policy
            </Link>
            <Link
              href="/#"
              className="transition-colors hover:text-zinc-600 dark:hover:text-zinc-400"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
