"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Clock, Award } from "lucide-react";
import { EarthCanvas } from "@/components/3d/EarthCanvas";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const [promptInput, setPromptInput] = useState("");

  const samplePrompts = [
    "Private chalet in St. Moritz with Michelin chef & ski transfers",
    "Overwater villa in Maldives with sunset yacht excursion",
    "7 days Kyoto ryokan & private tea masters for anniversary",
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Ambient Radial Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-b from-gold/10 via-blue-950/20 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col gap-6 z-10">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-md w-fit">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold-soft font-mono">
              The Next Evolution of Luxury Travel
            </span>
          </div>

          {/* Headline with Luxury Display Font */}
          <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-light tracking-tight leading-[1.08] text-ivory">
            The World, <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-soft to-gold">
              Curated for You
            </span>{" "}
            in 60 Seconds.
          </h1>

          {/* Subtitle */}
          <p className="text-muted text-base sm:text-lg max-w-xl font-light leading-relaxed">
            Voyara orchestrates private aviation, boutique sanctuaries, and
            unlisted culinary residencies through our agentic AI concierge.
            Real-time, bookable, and tailored to your travel DNA.
          </p>

          {/* Interactive AI Prompt Test Drive */}
          <div className="mt-2 p-1.5 rounded-none bg-surface-elevated/80 border border-gold/30 shadow-glass-card max-w-xl">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Where does your desire lead you?"
                className="flex-1 bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-muted/60 focus:outline-none"
              />
              <Link href={promptInput ? `/onboarding?q=${encodeURIComponent(promptInput)}` : "/onboarding"}>
                <Button variant="primary" size="md" className="w-full sm:w-auto">
                  <span>Begin</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            {/* Quick Inspiration Pills */}
            <div className="pt-2 pb-1 px-3 flex items-center gap-2 overflow-x-auto text-[11px] text-muted border-t border-white/5">
              <span className="text-gold-soft flex-shrink-0 font-mono">Try:</span>
              {samplePrompts.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPromptInput(p)}
                  className="truncate hover:text-gold transition-colors text-left flex-shrink-0"
                >
                  &ldquo;{p.slice(0, 32)}...&rdquo;
                </button>
              ))}
            </div>
          </div>

          {/* Luxury Metric Strip */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/[0.08] max-w-xl">
            <div className="flex flex-col">
              <span className="font-display text-2xl sm:text-3xl font-light text-gold tabular-nums">
                &lt; 60s
              </span>
              <span className="text-[11px] tracking-wider text-muted uppercase mt-0.5 flex items-center gap-1">
                <Clock className="w-3 h-3 text-gold/70" /> Itinerary Speed
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-display text-2xl sm:text-3xl font-light text-gold tabular-nums">
                100%
              </span>
              <span className="text-[11px] tracking-wider text-muted uppercase mt-0.5 flex items-center gap-1">
                <Shield className="w-3 h-3 text-gold/70" /> Real-time Pricing
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-display text-2xl sm:text-3xl font-light text-gold tabular-nums">
                VIP
              </span>
              <span className="text-[11px] tracking-wider text-muted uppercase mt-0.5 flex items-center gap-1">
                <Award className="w-3 h-3 text-gold/70" /> Global Amenities
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Earth Globe with Flight Arcs */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <EarthCanvas />
        </div>
      </div>
    </section>
  );
}
