"use client";

import React, { useState } from "react";
import { Sparkles, Terminal, Plane, Building2, CloudSun, Check, ChevronRight } from "lucide-react";

export function AIConciergeDemo() {
  const [activeTab, setActiveTab] = useState<"swiss" | "maldives" | "kyoto">("swiss");

  const conversations = {
    swiss: {
      userQuery:
        "Plan a 4-day anniversary escape to St. Moritz from Mumbai with private fondue dining, luxury spa, and business class flights.",
      thoughtSteps: [
        "Identified travel style: Ultra-luxury romantic anniversary.",
        "Calling `search_flights(origin: 'BOM', dest: 'ZRH', cabin: 'BUSINESS')`...",
        "Calling `search_hotels(city: 'St. Moritz', tier: 5, amenity: 'LUXURY_SPA')`...",
        "Calling `get_weather(location: 'St. Moritz', dates: ['2026-11-12', '2026-11-15'])`...",
      ],
      aiResponse:
        "I have orchestrated your 4-day anniversary escape to St. Moritz. Swiss International Air Lines offers seamless lie-flat business suites from Mumbai to Zurich with a direct private chauffeured transfer up the Engadin valley.",
      flightCard: {
        airline: "Swiss International Air Lines",
        flightNumber: "LX 155",
        cabin: "Business Class Lie-Flat",
        route: "BOM (Mumbai) ➔ ZRH (Zurich)",
        duration: "8h 45m Direct",
        price: "$3,420 return",
      },
      hotelCard: {
        name: "Badrutt's Palace Hotel",
        location: "St. Moritz, Switzerland",
        room: "Signature Lake View Suite & Palace Wellness Spa",
        perks: "Private Alpine fondue igloo reservation included, VIP ski valet, 24/7 Rolls-Royce airport transfer",
        price: "$1,850 / night",
      },
    },
    maldives: {
      userQuery:
        "Looking for an ultra-private overwater villa in Maldives with a slide into the lagoon, vegan fine dining, and seaplane transfer.",
      thoughtSteps: [
        "Profile preference detected: Vegan gastronomy + secluded reef lagoon.",
        "Executing `search_hotels(atoll: 'Noonu Atoll', property_type: 'OVERWATER_SLIDE')`...",
        "Confirming dedicated vegan chef availability at Soneva Jani...",
      ],
      aiResponse:
        "I have locked in the Water Retreat with Slide at Soneva Jani, Noonu Atoll. Dedicated executive plant-based dining is arranged with Master Chef Carsten, paired with VIP seaplane lounge access.",
      flightCard: {
        airline: "Emirates First Class",
        flightNumber: "EK 658",
        cabin: "Private Suite with Shower Spa",
        route: "DXB ➔ MLE (Malé)",
        duration: "4h 10m",
        price: "$4,100 return",
      },
      hotelCard: {
        name: "Soneva Jani Retreat",
        location: "Medhufaru Island, Maldives",
        room: "1-Bedroom Water Retreat with Private Slide & Retractable Roof",
        perks: "Curated 7-course vegan tasting under the stars, Barefoot Butler, Private Cinema Paradiso over water",
        price: "$3,200 / night",
      },
    },
    kyoto: {
      userQuery:
        "A 3-day quiet cultural retreat in Kyoto for solo traveler. Must have a private onsen, authentic tea ceremony, and temple access before public hours.",
      thoughtSteps: [
        "Analyzing Travel DNA: Solo cultural sanctuary, private onsen, serenity.",
        "Searching private ryokans in Arashiyama & Higashiyama...",
        "Booking 15th-generation Urasenke private tea master...",
      ],
      aiResponse:
        "Reserved Suiran, a Luxury Collection Hotel in Arashiyama, overlooking the Hozu River. Includes private Hinoki onsen bath and exclusive early morning private admission to Tenryu-ji Zen temple before gates open.",
      flightCard: {
        airline: "All Nippon Airways (ANA)",
        flightNumber: "NH 830",
        cabin: "The Room — Business Class",
        route: "DEL ➔ HND ➔ ITM (Osaka)",
        duration: "9h 30m Total",
        price: "$2,890 return",
      },
      hotelCard: {
        name: "Suiran Luxury Sanctuary",
        location: "Arashiyama, Kyoto",
        room: "Shirosumire Suite with Open-Air Natural Onsen Bath",
        perks: "Private rickshaw pickup, private tea ceremony with Master Yamada, sunrise Zen meditation",
        price: "¥210,000 / night",
      },
    },
  };

  const curr = conversations[activeTab];

  return (
    <section id="concierge" className="py-24 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gold/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold/30 bg-gold/5 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-soft font-mono">
              Live Agentic Demonstration
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-light text-ivory">
            The Agentic Concierge in Motion
          </h2>
          <p className="text-muted text-xs sm:text-sm mt-3 font-light">
            Observe how Voyara reasons, calls multiple live travel tools in
            parallel, and returns verified, bookable luxury arrangements.
          </p>

          {/* Interactive Scenario Tabs */}
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            <button
              onClick={() => setActiveTab("swiss")}
              className={`px-4 py-2 text-xs tracking-wider uppercase font-mono transition-all ${
                activeTab === "swiss"
                  ? "bg-gold text-bg font-semibold shadow-gold-subtle"
                  : "bg-surface-elevated/70 text-muted hover:text-ivory border border-white/10"
              }`}
            >
              St. Moritz Anniversary
            </button>
            <button
              onClick={() => setActiveTab("maldives")}
              className={`px-4 py-2 text-xs tracking-wider uppercase font-mono transition-all ${
                activeTab === "maldives"
                  ? "bg-gold text-bg font-semibold shadow-gold-subtle"
                  : "bg-surface-elevated/70 text-muted hover:text-ivory border border-white/10"
              }`}
            >
              Maldives Water Villa
            </button>
            <button
              onClick={() => setActiveTab("kyoto")}
              className={`px-4 py-2 text-xs tracking-wider uppercase font-mono transition-all ${
                activeTab === "kyoto"
                  ? "bg-gold text-bg font-semibold shadow-gold-subtle"
                  : "bg-surface-elevated/70 text-muted hover:text-ivory border border-white/10"
              }`}
            >
              Kyoto Cultural Zen
            </button>
          </div>
        </div>

        {/* Mock Concierge Console Window */}
        <div className="rounded-none border border-gold/30 bg-[#0A0E14]/90 backdrop-blur-2xl shadow-2xl overflow-hidden">
          {/* Mac-style Window Bar with Luxury Gold Polish */}
          <div className="px-5 py-3.5 bg-surface-elevated border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
              <span className="ml-3 text-[11px] font-mono tracking-widest text-muted uppercase">
                Voyara Concierge Engine • Claude 3.5 Sonnet Tool Loop
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gold font-mono uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              GDS Live Connected
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            {/* User Message Bubble */}
            <div className="flex items-start justify-end gap-3">
              <div className="max-w-xl p-4 bg-surface-elevated border border-gold/20 rounded-none text-xs sm:text-sm text-ivory leading-relaxed">
                <span className="text-[10px] font-mono text-gold-soft uppercase block mb-1">
                  You (Member)
                </span>
                {curr.userQuery}
              </div>
            </div>

            {/* Live Agent Thinking & Tool Calling Trace */}
            <div className="p-4 bg-bg/90 border border-white/[0.06] rounded-none space-y-2">
              <div className="flex items-center gap-2 text-gold text-xs font-mono">
                <Terminal className="w-3.5 h-3.5 animate-spin [animation-duration:6s]" />
                <span className="uppercase tracking-widest">
                  Autonomous Tool Execution Trace
                </span>
              </div>
              <div className="space-y-1 pl-5 border-l border-gold/20 text-[11px] font-mono text-muted">
                {curr.thoughtSteps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-gold" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Response Narrative */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full border border-gold/40 bg-surface flex items-center justify-center flex-shrink-0 text-gold shadow-gold-subtle">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-4 max-w-3xl">
                <p className="text-xs sm:text-sm text-ivory leading-relaxed">
                  {curr.aiResponse}
                </p>

                {/* Rich Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* Flight Card */}
                  <div className="p-4 bg-surface border border-gold/25 hover:border-gold/50 transition-colors">
                    <div className="flex items-center justify-between text-xs text-gold font-mono mb-2">
                      <span className="flex items-center gap-1.5 uppercase tracking-wider">
                        <Plane className="w-3.5 h-3.5" /> {curr.flightCard.airline}
                      </span>
                      <span className="text-white font-semibold tabular-nums">
                        {curr.flightCard.price}
                      </span>
                    </div>
                    <div className="text-sm font-light text-ivory">
                      {curr.flightCard.route}
                    </div>
                    <div className="text-[11px] text-muted mt-1 flex items-center justify-between">
                      <span>{curr.flightCard.cabin}</span>
                      <span>{curr.flightCard.duration}</span>
                    </div>
                  </div>

                  {/* Hotel Card */}
                  <div className="p-4 bg-surface border border-gold/25 hover:border-gold/50 transition-colors">
                    <div className="flex items-center justify-between text-xs text-gold font-mono mb-2">
                      <span className="flex items-center gap-1.5 uppercase tracking-wider">
                        <Building2 className="w-3.5 h-3.5" /> {curr.hotelCard.name}
                      </span>
                      <span className="text-white font-semibold tabular-nums">
                        {curr.hotelCard.price}
                      </span>
                    </div>
                    <div className="text-sm font-light text-ivory">
                      {curr.hotelCard.room}
                    </div>
                    <p className="text-[11px] text-gold-soft/80 mt-1.5 leading-snug">
                      ✦ {curr.hotelCard.perks}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
