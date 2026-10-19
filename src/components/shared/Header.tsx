"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Compass, Menu, X, IndianRupee, Sparkles, PhoneCall, MessageCircle } from "lucide-react";
import { AGENCY_DETAILS } from "@/features/agency/data/agencyData";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState("INR (₹)");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Destinations", href: "#destinations" },
    { label: "Curated Packages", href: "#packages" },
    { label: "Why Voyara", href: "#why-us" },
    { label: "Sample Itinerary", href: "#itinerary" },
    { label: "FAQs", href: "#faqs" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#071F22]/95 backdrop-blur-md border-b border-teal-soft/40 py-3 shadow-xl"
          : "bg-gradient-to-b from-[#071F22]/90 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-8 h-8 flex items-center justify-center border border-terracotta/60 rounded-full group-hover:border-terracotta transition-colors duration-300 bg-[#092A2D]">
            <Compass className="w-4 h-4 text-terracotta group-hover:rotate-45 transition-transform duration-500" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl sm:text-2xl tracking-[0.2em] font-light text-sand uppercase group-hover:text-terracotta-soft transition-colors duration-300">
              Voyara
            </span>
            <span className="text-[9px] font-mono tracking-[0.25em] text-sand/60 uppercase">
              Journeys
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs tracking-[0.14em] uppercase text-sand/75 hover:text-sand font-mono transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Currency Switcher */}
          <button
            type="button"
            onClick={() => {
              const list = ["INR (₹)", "USD ($)", "EUR (€)", "GBP (£)"];
              const nextIndex = (list.indexOf(currency) + 1) % list.length;
              setCurrency(list[nextIndex]);
            }}
            className="flex items-center gap-1 text-[11px] font-mono text-sand/70 hover:text-sand px-2.5 py-1.5 border border-teal-soft/30 hover:border-teal-soft/60 transition-all bg-[#092A2D]/50"
            title="Toggle currency"
          >
            <IndianRupee className="w-3 h-3 text-terracotta" />
            <span>{currency.split(" ")[0]}</span>
          </button>

          {/* AI Concierge Link */}
          <Link
            href="/dashboard/concierge"
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#092A2D] border border-teal-soft/40 hover:border-terracotta/50 text-sand/80 hover:text-sand text-xs font-mono transition-colors"
            title="Access the Autonomous AI Concierge Lounge"
          >
            <Sparkles className="w-3 h-3 text-terracotta" />
            <span>AI Concierge</span>
          </Link>

          {/* Sign In Link */}
          <Link
            href="/login"
            className="text-xs uppercase font-mono tracking-widest text-sand/80 hover:text-sand px-3 py-1.5 transition-colors"
          >
            Sign In
          </Link>

          {/* Sign Up Button */}
          <Link
            href="/signup"
            className="py-1.5 px-3.5 border border-terracotta/60 hover:border-terracotta text-sand hover:text-white font-mono text-xs uppercase tracking-wider transition-all bg-terracotta/15 hover:bg-terracotta/25"
          >
            Sign Up
          </Link>

          {/* Main "Plan My Trip" Button */}
          <a
            href="#contact"
            className="py-2 px-5 bg-terracotta hover:bg-terracotta-soft text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all shadow-md"
          >
            Plan My Trip
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-sand hover:text-terracotta transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#092A2D] border-b border-teal-soft/40 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase font-mono tracking-widest text-sand/80 hover:text-terracotta py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-teal-soft/30 flex flex-col gap-3">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 bg-terracotta text-white font-mono text-xs uppercase tracking-wider font-semibold text-center"
            >
              Plan My Trip
            </a>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 bg-[#0A2D30] border border-teal-soft/40 text-sand text-xs font-mono text-center uppercase tracking-wider"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 bg-terracotta/20 border border-terracotta/60 text-sand text-xs font-mono text-center uppercase tracking-wider"
              >
                Sign Up
              </Link>
            </div>

            <div className="flex gap-2">
              <a
                href={AGENCY_DETAILS.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 text-xs font-mono text-center flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <Link
                href="/dashboard/concierge"
                className="flex-1 py-2.5 bg-[#061D1F] border border-teal-soft/40 text-sand text-xs font-mono text-center flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-terracotta" />
                <span>AI Concierge</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
