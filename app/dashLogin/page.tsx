"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (login(email, password)) {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-4 py-12 sm:px-6">
      {/* Animated mesh gradient background */}
      <div
        className="absolute inset-0 -z-10 bg-zinc-100 dark:bg-zinc-950"
        aria-hidden
      >
        <div
          className="absolute -left-1/2 top-0 h-[80%] w-full rounded-full bg-violet-400/40 blur-[128px] dark:bg-violet-500/30"
          style={{ animation: "mesh-1 15s ease-in-out infinite" }}
        />
        <div
          className="absolute -right-1/2 top-1/4 h-[70%] w-full rounded-full bg-cyan-400/35 blur-[128px] dark:bg-cyan-500/25"
          style={{ animation: "mesh-2 18s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-0 left-1/2 h-[60%] w-full -translate-x-1/2 rounded-full bg-amber-400/30 blur-[128px] dark:bg-amber-500/20"
          style={{ animation: "mesh-3 20s ease-in-out infinite" }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-zinc-100/50 via-transparent to-zinc-100/70 dark:from-zinc-950/40 dark:via-transparent dark:to-zinc-950/60" />
      </div>

      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-black/8 bg-white/95 p-8 shadow-lg backdrop-blur-sm dark:border-white/12 dark:bg-zinc-900/80 dark:shadow-zinc-950/50">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Admin Login
            </h1>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Sign in to access the dashboard
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="admin@example.com"
                className="mt-2 block w-full rounded-lg border border-black/12 bg-white px-4 py-3 text-foreground placeholder-zinc-400 outline-none transition focus:border-black/25 focus:ring-2 focus:ring-black/10 dark:border-white/18 dark:bg-zinc-800/50 dark:placeholder-zinc-500 dark:focus:border-white/30 dark:focus:ring-white/10"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••"
                className="mt-2 block w-full rounded-lg border border-black/12 bg-white px-4 py-3 text-foreground placeholder-zinc-400 outline-none transition focus:border-black/25 focus:ring-2 focus:ring-black/10 dark:border-white/18 dark:bg-zinc-800/50 dark:placeholder-zinc-500 dark:focus:border-white/30 dark:focus:ring-white/10"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-foreground px-4 py-3 text-sm font-semibold text-background transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-zinc-500 transition hover:text-foreground dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              ← Back to site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
