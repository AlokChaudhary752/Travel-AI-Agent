"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, Shield, ArrowRight } from "lucide-react";

export function B2BPricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  const plans = [
    {
      name: "Starter",
      description: "For boutique independent travel advisors and solo curators.",
      monthlyPrice: 2499,
      annualPrice: 1999,
      features: [
        "Up to 3 Active Travel Agents",
        "50 AI Bespoke Itineraries / Month",
        "Leads CRM Kanban Pipeline",
        "Rule 46 GST 5% Tax Invoicing (SAC 998555)",
        "Printable Client Vouchers & Receipts",
        "Community Support",
      ],
      popular: false,
    },
    {
      name: "Pro",
      description: "For growing luxury travel agencies scaling domestic & outbound trips.",
      monthlyPrice: 6999,
      annualPrice: 5499,
      features: [
        "Up to 10 Active Travel Agents",
        "Unlimited AI Itinerary Generation",
        "Live Weather & Frankfurter FX Converter",
        "B2B Supplier Margin Calculator",
        "Automated WhatsApp Follow-Up Generator",
        "BroadcastChannel Multi-Tab Real-Time Sync",
        "Priority Concierge Support",
      ],
      popular: true,
    },
    {
      name: "Agency Enterprise",
      description: "For multi-branch travel operators handling ₹10Cr+ annual turnover.",
      monthlyPrice: 14999,
      annualPrice: 11999,
      features: [
        "Unlimited Travel Agents & Accountants",
        "Custom Claude 3.5 Sonnet BYOK Integration",
        "White-Labeled Vouchers with Agency Watermark",
        "Full PostgreSQL Supabase Cloud Sync (Mode B)",
        "Multi-Branch Commission Tracking",
        "Custom Domain & API Webhooks",
        "Dedicated Account Director",
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-[#071F22] border-t border-teal-soft/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B292D] border border-terracotta/40 text-xs font-mono uppercase tracking-wider text-terracotta">
            <Shield className="w-3.5 h-3.5" />
            Transparent B2B SaaS Licensing
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-sand font-light">
            Engineered for high-margin travel agencies
          </h2>
          <p className="text-xs sm:text-sm text-sand/70 font-sans leading-relaxed">
            All plans include GST SAC 998555 compliance, real-time client pipeline management, and instant AI dossier dispatch.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="inline-flex items-center gap-2 p-1 rounded-full bg-[#0B292D] border border-teal-soft/40 text-xs font-mono">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 rounded-full transition-colors ${
                billingCycle === "monthly" ? "bg-terracotta text-white font-medium" : "text-sand/70"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-4 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
                billingCycle === "annual" ? "bg-terracotta text-white font-medium" : "text-sand/70"
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#071F22] text-white">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const price = billingCycle === "annual" ? plan.annualPrice : plan.monthlyPrice;
            return (
              <div
                key={plan.name}
                className={`p-8 rounded-lg flex flex-col justify-between transition-all ${
                  plan.popular
                    ? "bg-[#0B2A2E] border-2 border-terracotta shadow-2xl relative"
                    : "bg-[#09282C] border border-teal-soft/40 hover:border-teal-soft/70"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-terracotta text-white font-mono text-[10px] uppercase tracking-widest">
                    Most Popular with Indian Agencies
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-xl text-sand font-light">{plan.name}</h3>
                    <p className="text-xs text-sand/60 mt-1 font-sans">{plan.description}</p>
                  </div>

                  <div className="font-mono">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm text-sand/60">₹</span>
                      <span className="text-4xl font-bold text-sand tabular-nums">
                        {price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-sand/60">/ month</span>
                    </div>
                    <span className="text-[10px] text-terracotta block mt-0.5">
                      + 18% GST input credit eligible
                    </span>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-teal-soft/30 text-xs">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-sand/80">
                        <Check className="w-4 h-4 text-terracotta flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href="/signup"
                    className={`w-full py-3 rounded font-mono text-xs uppercase tracking-wider font-semibold text-center flex items-center justify-center gap-2 transition-colors ${
                      plan.popular
                        ? "bg-terracotta hover:bg-terracotta-soft text-white shadow-lg"
                        : "bg-[#071F22] hover:bg-[#0E353A] border border-sand/20 text-sand"
                    }`}
                  >
                    Start 14-Day Free Trial
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Demo Banner */}
        <div className="p-6 rounded-lg bg-[#0B292D] border border-teal-soft/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-display text-lg text-sand font-light">
              Experience the live agency terminal before signing up
            </h4>
            <p className="text-xs text-sand/60 font-sans mt-0.5">
              Test with 80+ pre-seeded Indian luxury bookings, 50+ leads CRM pipeline, and live AI Trip Planner.
            </p>
          </div>
          <Link
            href="/app"
            className="py-2.5 px-6 bg-sand hover:bg-white text-[#071F22] font-mono text-xs uppercase tracking-wider font-semibold rounded transition-colors whitespace-nowrap flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-terracotta" />
            Launch Live Demo Terminal
          </Link>
        </div>
      </div>
    </section>
  );
}
