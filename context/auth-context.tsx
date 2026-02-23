"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const AUTH_KEY = "nobelcraft-admin-auth";

// Demo credentials - replace with real auth later
const ADMIN_EMAIL = "admin@nobelcraft.com";
const ADMIN_PASSWORD = "admin123";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem(AUTH_KEY);
    setIsAuthenticated(stored === "true");
  }, []);

  const login = (email: string, password: string) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
