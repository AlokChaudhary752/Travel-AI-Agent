"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="relative py-28 overflow-hidden bg-gradient-to-b from-transparent via-surface/60 to-surface">
      {/* Background glow and subtle vignette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-to-r from-gold/15 via-blue-900/10 to-gold/10 blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-gold/5 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold-soft font-mono">
            Direct Concierge Access
          </span>
        </div>

        <h2 className="font-display text-4xl sm:text-6xl font-light text-ivory mb-6 leading-tight">
          Your Private Sanctum Awaits. <br />
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-soft to-gold">
            Begin Your Voyage
          </span>{" "}
          Tonight.
        </h2>

        <p className="text-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-10 font-light">
          Step beyond generic booking aggregators. Allow our agentic intelligence
          to curate an escape worthy of your rare time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/onboarding">
            <Button variant="primary" size="xl" isMagnetic>
              <span>Begin Your Journey</span>
              <ArrowRight className="w-4 h-4 ml-3" />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary" size="xl">
              Member Sign In
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-6 text-[11px] text-muted-dark mt-10">
          <span className="flex items-center gap-1.5 text-gold-soft/80">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" /> No Hidden Markups
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-gold-soft/80">
            <Lock className="w-3.5 h-3.5 text-gold" /> Instant 256-Bit Encryption
          </span>
          <span>•</span>
          <span>Cancel Anytime</span>
        </div>
      </div>
    </section>
  );
}
