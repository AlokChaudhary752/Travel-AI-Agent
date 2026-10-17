"use client";

import React from "react";
import Link from "next/link";
import { Compass, ShieldCheck } from "lucide-react";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg text-ivory flex flex-col relative overflow-hidden">
      {/* Background ambient radial lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gold/5 blur-[160px] pointer-events-none -z-10" />

      {/* Luxury Onboarding Top Bar */}
      <header className="border-b border-gold/15 py-4 px-6 md:px-12 bg-surface/50 backdrop-blur-md flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-7 h-7 rounded-full border border-gold/40 flex items-center justify-center group-hover:border-gold transition-colors">
            <Compass className="w-3.5 h-3.5 text-gold" />
          </div>
          <span className="font-display text-xl tracking-[0.25em] font-light text-ivory uppercase">
            Voyara
          </span>
        </Link>

        <div className="flex items-center gap-6 text-xs text-muted font-mono">
          <span className="hidden sm:flex items-center gap-1.5 text-gold-soft">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" /> Autosaving Draft
          </span>
          <Link
            href="/"
            className="text-muted hover:text-ivory transition-colors uppercase tracking-widest text-[11px]"
          >
            Exit to Home
          </Link>
        </div>
      </header>

      {/* Main Form Frame */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-10 md:py-16">
        {children}
      </main>
    </div>
  );
}
