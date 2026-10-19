"use client";

import React from "react";
import { MessageCircle, ShieldCheck, Utensils, Cpu, ArrowRight } from "lucide-react";

export function WhyTravelWithUs() {
  const differentiators = [
    {
      numeral: "01",
      icon: MessageCircle,
      title: "24/7 On-Ground WhatsApp Lead",
      headline: "A dedicated regional specialist, never an outsourced call center.",
      description:
        "From touchdown in Srinagar or Zurich, your dedicated specialist is connected with your family on WhatsApp. Need an unexpected private dinner table, extra thermal down jackets, or immediate road re-routing due to snow? You speak directly to someone holding direct personal ties with every hotel general manager on your route.",
      metric: "< 2 Min",
      metricLabel: "Average direct response time",
    },
    {
      numeral: "02",
      icon: ShieldCheck,
      title: "Guaranteed Zero Hidden Costs",
      headline: "Complete price transparency with zero checkout surprises.",
      description:
        "Every Voyara proposal itemizes five-star luxury suites, mandatory Swiss/Kashmir tourist levies, private Mercedes or Land Cruiser chauffeurs, fuel, highway tolls, and 18% GST upfront. You will never encounter unexpected on-ground resort fees or bill shocks at checkout.",
      metric: "100%",
      metricLabel: "Transparent quotation guarantee",
    },
    {
      numeral: "03",
      icon: Utensils,
      title: "Inspected Estates & Dietary Care",
      headline: "Strict Jain, pure vegetarian, and bespoke culinary protocols.",
      description:
        "We personally inspect every cedarwood houseboat on Dal Lake, palace suite in Udaipur, and chalet in the Swiss Alps. For our vegetarian and Jain travelers, our concierge briefs executive chefs days prior to your arrival, guaranteeing sunset dining and separate cookware.",
      metric: "68%",
      metricLabel: "Of private travelers request dietary care",
    },
    {
      numeral: "04",
      icon: Cpu,
      title: "Autonomous Travel Intelligence",
      headline: "Real-time airspace telemetry & proactive re-booking contingency.",
      description:
        "Human curation amplified by Voyara's proprietary algorithms. We run 2-Opt route heuristics to eliminate mountain backtracking and track airspace transponders 24/7 to hold alternative lie-flat connections before public flight cancellations appear on terminal monitors.",
      metric: "Instant",
      metricLabel: "Proactive airspace surveillance",
    },
  ];

  return (
    <section className="py-24 px-6 sm:px-8 bg-[#071F22]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header with headline under 8 words */}
        <div className="max-w-3xl space-y-3">
          <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-terracotta font-semibold">
            The Voyara Standard
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-sand font-light leading-tight">
            Built on Human Precision, Not Templates.
          </h2>
          <p className="text-sand/70 text-sm sm:text-base font-light font-sans max-w-xl">
            We operate with the discreet precision of a private family office and the warmth of seasoned Indian hospitality.
          </p>
        </div>

        {/* Bento Grid with Oversized Numerals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {differentiators.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative p-8 sm:p-10 bg-[#092A2D] border border-teal-soft/40 hover:border-terracotta/50 transition-all flex flex-col justify-between space-y-6 overflow-hidden group shadow-xl"
              >
                {/* Oversized Editorial Watermark Numeral */}
                <span className="absolute -top-4 right-4 font-display text-7xl sm:text-8xl text-teal-soft/20 group-hover:text-terracotta/15 transition-colors font-light pointer-events-none select-none">
                  {item.numeral}
                </span>

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-[#061D1F] border border-teal-soft/50 flex items-center justify-center text-terracotta">
                      <Icon className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <div className="text-right">
                      <div className="font-display text-2xl text-sand font-light tabular-nums">
                        {item.metric}
                      </div>
                      <span className="text-[10px] text-sand/50 font-mono uppercase tracking-wider block">
                        {item.metricLabel}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl text-sand font-light">
                      {item.title}
                    </h3>
                    <div className="text-xs font-mono text-terracotta font-medium mt-1">
                      {item.headline}
                    </div>
                  </div>

                  <p className="text-sand/75 text-sm font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-teal-soft/20 flex items-center gap-2 text-xs font-mono text-sand/60 relative z-10">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                  <span>Verified Standard on All Active Bookings</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
