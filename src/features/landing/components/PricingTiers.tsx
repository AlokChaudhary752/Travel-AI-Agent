"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PricingTiers() {
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">("annual");

  const tiers = [
    {
      name: "Explorer",
      tagline: "For discerning independent wanderers",
      price: "Complimentary",
      period: "forever",
      description:
        "Full access to the agentic AI concierge, instant itinerary generation, and real-time live flight & luxury hotel quotations.",
      features: [
        "Unlimited AI Concierge conversations",
        "Under 60s personalized itinerary builder",
        "Live Amadeus flight & hotel search",
        "Public itinerary shareable links",
        "Standard multi-currency converter",
      ],
      ctaText: "Begin Exploring",
      ctaVariant: "secondary" as const,
      isPopular: false,
    },
    {
      name: "Voyager",
      tagline: "For frequent luxury travelers & families",
      price: billingCycle === "annual" ? "$490" : "$49",
      period: billingCycle === "annual" ? "/ year" : "/ month",
      description:
        "Real-time disruption rescue, collaborative group planning with live cursors, price drop radar, and encrypted document vault.",
      features: [
        "Everything in Explorer",
        "Live Disruption Rescue & Auto-Rebook Radar",
        "Group Trip Studio (real-time cursors & expense split)",
        "Automated price tracking & alert notifications",
        "256-bit encrypted document & passport vault",
        "Apple / Google Calendar two-way sync",
        "PDF export with branded travel passes",
      ],
      ctaText: "Unlock Voyager Access",
      ctaVariant: "primary" as const,
      isPopular: true,
    },
    {
      name: "Elite Sanctum",
      tagline: "By invitation or qualification",
      price: billingCycle === "annual" ? "$1,850" : "$180",
      period: billingCycle === "annual" ? "/ year" : "/ month",
      description:
        "Hybrid agentic AI paired with dedicated human private travel masters, private jet charters, and unlisted sanctuary access.",
      features: [
        "Everything in Voyager",
        "Dedicated Human Tastemaker Pair (24/7 WhatsApp)",
        "Direct Private Jet & Superyacht charter desk",
        "Access to unlisted private islands & off-market villas",
        "Guaranteed 12:00 PM early check-in & upgrades",
        "VIP airport tarmac meet-and-greet transfers",
        "Bespoke visa & immigration concierge service",
      ],
      ctaText: "Apply for Elite Sanctum",
      ctaVariant: "gold-outline" as const,
      isPopular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/5 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-soft font-mono">
              Membership Tiers
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-light text-ivory">
            Invest in Effortless Travel
          </h2>
          <p className="text-muted text-sm mt-3 font-light">
            Select the tier aligned with your voyage frequency and privacy preferences.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center p-1 bg-surface-elevated border border-white/10 rounded-full mt-8">
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                billingCycle === "annual"
                  ? "bg-gold text-bg font-semibold"
                  : "text-muted hover:text-ivory"
              }`}
            >
              Annual (Save 20%)
            </button>
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                billingCycle === "monthly"
                  ? "bg-gold text-bg font-semibold"
                  : "text-muted hover:text-ivory"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* 3 Tiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative p-8 rounded-none flex flex-col justify-between transition-all duration-300 ${
                tier.isPopular
                  ? "bg-surface-elevated/95 border-2 border-gold shadow-gold-glow scale-[1.02]"
                  : "bg-surface/70 border border-white/[0.08] hover:border-gold/30"
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-bg font-mono text-[10px] uppercase tracking-widest font-bold shadow-md">
                  Most Preferred
                </div>
              )}

              <div>
                <span className="text-xs uppercase tracking-widest text-gold-soft font-mono block mb-1">
                  {tier.tagline}
                </span>
                <h3 className="font-display text-3xl font-light text-ivory mb-4">
                  {tier.name}
                </h3>

                <div className="mb-6 flex items-baseline gap-1.5">
                  <span className="font-display text-4xl sm:text-5xl font-light text-ivory tabular-nums">
                    {tier.price}
                  </span>
                  <span className="text-xs text-muted font-mono">{tier.period}</span>
                </div>

                <p className="text-xs text-muted leading-relaxed mb-8 font-light">
                  {tier.description}
                </p>

                {/* Features List */}
                <div className="space-y-3 pt-6 border-t border-white/[0.08]">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-ivory/90">
                      <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8 mt-8 border-t border-white/[0.08]">
                <Link href={`/onboarding?tier=${tier.name.toLowerCase()}`}>
                  <Button
                    variant={tier.ctaVariant}
                    size="lg"
                    className="w-full"
                    isMagnetic={tier.isPopular}
                  >
                    {tier.ctaText}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
