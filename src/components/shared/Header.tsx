"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Compass, Menu, X, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Destinations", href: "#destinations" },
    { label: "AI Concierge", href: "#concierge" },
    { label: "Experience", href: "#experience" },
    { label: "Tiers", href: "#pricing" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-bg/80 backdrop-blur-xl border-b border-gold/15 py-3.5 shadow-2xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="relative w-8 h-8 flex items-center justify-center border border-gold/40 rounded-full group-hover:border-gold transition-colors duration-300">
            <Compass className="w-4 h-4 text-gold group-hover:rotate-45 transition-transform duration-500" />
            <div className="absolute inset-0 rounded-full bg-gold/10 blur-sm -z-10 group-hover:bg-gold/20 transition-all" />
          </div>
          <span className="font-display text-2xl tracking-[0.25em] font-light text-ivory uppercase group-hover:text-gold-soft transition-colors duration-300">
            Voyara
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs tracking-[0.18em] uppercase text-muted hover:text-gold transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-5">
          {/* Currency Switcher */}
          <button
            onClick={() => {
              const list = ["USD", "INR", "EUR", "GBP"];
              const nextIndex = (list.indexOf(currency) + 1) % list.length;
              setCurrency(list[nextIndex]);
            }}
            className="flex items-center gap-1.5 text-xs tracking-wider text-muted hover:text-ivory px-2 py-1 rounded border border-transparent hover:border-gold/20 transition-all"
            title="Toggle currency"
          >
            <Globe className="w-3.5 h-3.5 text-gold/70" />
            <span>{currency}</span>
          </button>

          <Link
            href="/login"
            className="text-xs uppercase tracking-widest text-ivory/80 hover:text-gold transition-colors px-3 py-1.5"
          >
            Sign In
          </Link>

          <Link href="/onboarding">
            <Button variant="primary" size="sm" isMagnetic>
              <Sparkles className="w-3 h-3 mr-1.5" />
              Begin Journey
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-ivory hover:text-gold transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bg-surface/95 backdrop-blur-2xl border-b border-gold/20 p-8 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm tracking-[0.2em] uppercase text-ivory hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="h-px bg-white/10 w-full" />
          <div className="flex flex-col gap-4">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2 text-xs uppercase tracking-widest text-muted hover:text-ivory"
            >
              Sign In
            </Link>
            <Link href="/onboarding" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="lg" className="w-full">
                Begin Your Journey
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
