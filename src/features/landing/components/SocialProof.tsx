"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function SocialProof() {
  const testimonials = [
    {
      quote:
        "When our private jet from Mumbai to Nice was delayed due to Alpine airspace congestion, Voyara’s Disruption Radar re-routed us through Milan with helicopter transfers already standing by on the tarmac before we even landed. Unmatched peace of mind.",
      author: "Rajiv Singhania",
      title: "Family Office Principal, Mumbai & London",
      trip: "Monaco Grand Prix Weekend",
    },
    {
      quote:
        "Planning a multi-generational ski trip across Courchevel and Zermatt with vegan and Jain dietary requirements used to take our family office three weeks. Voyara curated and verified every chalet chef in under four minutes.",
      author: "Ananya & Vikram Mehta",
      title: "Tech Founders & Philanthropists",
      trip: "Annual Alpine Winter Residency",
    },
    {
      quote:
        "The Multimodal Vibe Curator is sorcery. I uploaded three architectural photos of brutalist concrete villas surrounded by Japanese pine, and it booked us into an unlisted estate in Arashiyama that doesn't even appear on public luxury portals.",
      author: "Lord Julian Vance",
      title: "Contemporary Art Collector, London",
      trip: "Kyoto Architectural Tour",
    },
  ];

  const partners = [
    "AMAN",
    "FOUR SEASONS",
    "ROSEWOOD",
    "MANDARIN ORIENTAL",
    "VISTAJET",
    "NETJETS",
    "BELMOND",
    "ONE&ONLY",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  };
  const next = () => {
    setCurrentIndex((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  };

  return (
    <section className="py-24 relative bg-surface border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Animated Counters Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-20 border-b border-white/[0.08]">
          <div className="flex flex-col">
            <span className="font-display text-4xl sm:text-5xl font-light text-gold tabular-nums">
              $48M+
            </span>
            <span className="text-xs uppercase tracking-widest text-muted mt-2 font-mono">
              Itineraries Orchestrated
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-display text-4xl sm:text-5xl font-light text-gold tabular-nums">
              99.4%
            </span>
            <span className="text-xs uppercase tracking-widest text-muted mt-2 font-mono">
              Disruption Rescue Rate
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-display text-4xl sm:text-5xl font-light text-gold tabular-nums">
              42
            </span>
            <span className="text-xs uppercase tracking-widest text-muted mt-2 font-mono">
              Sovereign Nations Covered
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-display text-4xl sm:text-5xl font-light text-gold tabular-nums">
              &lt; 38s
            </span>
            <span className="text-xs uppercase tracking-widest text-muted mt-2 font-mono">
              Avg Concierge Synthesis
            </span>
          </div>
        </div>

        {/* Partner Logos Marquee */}
        <div className="py-14 border-b border-white/[0.08]">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-dark font-mono text-center block mb-8">
            Integrated with Global Luxury Alliances & Private Aviation
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-50 hover:opacity-80 transition-opacity">
            {partners.map((p) => (
              <span
                key={p}
                className="font-display tracking-[0.3em] text-xs sm:text-sm text-ivory/80 uppercase"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="pt-20 max-w-4xl mx-auto">
          <div className="relative p-8 md:p-12 rounded-none bg-surface-elevated/80 border border-gold/25 shadow-2xl">
            <Quote className="w-10 h-10 text-gold/30 mb-6" />

            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-gold text-gold"
                  aria-hidden="true"
                />
              ))}
            </div>

            <p className="font-display text-lg sm:text-2xl font-light text-ivory leading-relaxed mb-8 italic">
              &ldquo;{testimonials[currentIndex].quote}&rdquo;
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/[0.08]">
              <div>
                <h4 className="font-display text-lg font-normal text-ivory">
                  {testimonials[currentIndex].author}
                </h4>
                <p className="text-xs text-muted font-mono">
                  {testimonials[currentIndex].title}
                </p>
                <span className="text-[11px] text-gold-soft font-mono mt-0.5 block">
                  ✦ {testimonials[currentIndex].trip}
                </span>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  className="w-10 h-10 border border-gold/30 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4 text-gold" />
                </button>
                <span className="text-xs font-mono text-muted tabular-nums">
                  {currentIndex + 1} / {testimonials.length}
                </span>
                <button
                  onClick={next}
                  className="w-10 h-10 border border-gold/30 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4 text-gold" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
