"use client";

import React from "react";
import { MessageCircle, ShieldCheck, Utensils, Cpu, CheckCircle2 } from "lucide-react";

export function WhyTravelWithUs() {
  const differentiators = [
    {
      icon: MessageCircle,
      title: "24/7 On-Trip WhatsApp Concierge",
      headline: "A dedicated human specialist, not an outsourced call center.",
      description:
        "From the moment your plane lands in Srinagar or Zurich, your personal concierge is connected with your family on WhatsApp. Need an unexpected dinner table reservation, extra woolens, or immediate re-routing due to snow? You speak directly to someone who knows every detail of your itinerary.",
      metric: "< 2 Min",
      metricLabel: "Average WhatsApp response time",
    },
    {
      icon: ShieldCheck,
      title: "Guaranteed Zero Hidden Costs",
      headline: "Complete price transparency with zero checkout surprises.",
      description:
        "Every Voyara proposal itemizes all five-star hotel taxes, mandatory green taxes, private chauffeur allowances, highway toll charges, and GST upfront. We never hit you with unexpected on-ground resort fees or surcharges at check-out.",
      metric: "100%",
      metricLabel: "Upfront pricing guarantee",
    },
    {
      icon: Utensils,
      title: "Hand-Inspected Estates & Dietary Care",
      headline: "Jain, pure vegetarian, and bespoke culinary pre-arrangements.",
      description:
        "We personally inspect every cedarwood houseboat on Dal Lake, palace suite in Udaipur, and chalet in the Swiss Alps. For our vegetarian and Jain guests, our team pre-coordinates with executive chefs before your arrival so your dining is effortless.",
      metric: "65%+",
      metricLabel: "Of guests require bespoke dining",
    },
    {
      icon: Cpu,
      title: "Autonomous Travel Intelligence",
      headline: "GDS direct flight feeds & instant disruption protection.",
      description:
        "Our human craft is amplified by Voyara's proprietary AI systems. We run 2-Opt route optimization to minimize mountain transit times and monitor airspace telemetry 24/7 to safeguard your connections before delays occur.",
      metric: "Instant",
      metricLabel: "Real-time disruption re-routing",
    },
  ];

  return (
    <section className="py-24 px-6 sm:px-8 bg-[#071F22]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-terracotta font-semibold">
            The Voyara Difference
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-sand font-light leading-tight">
            Why Discerning Travelers Place Their Trust in Us
          </h2>
          <p className="text-sand/70 text-sm sm:text-base font-light font-sans">
            We operate with the discreet precision of a Swiss private bank and the warmth of bespoke Indian hospitality.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {differentiators.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 bg-[#092A2D] border border-teal-soft/40 hover:border-terracotta/50 transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-[#061D1F] border border-teal-soft/50 flex items-center justify-center text-terracotta">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <div className="font-display text-2xl text-sand font-light">
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

                <div className="pt-4 border-t border-teal-soft/20 flex items-center gap-2 text-xs font-mono text-sand/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Verified Standard Across All Bookings</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
