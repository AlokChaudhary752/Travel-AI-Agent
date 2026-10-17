"use client";

import React from "react";
import { MessageSquareText, Cpu, PlaneTakeoff, Check } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: MessageSquareText,
      title: "Articulate Your Desires",
      tagline: "Voice, Text, or Visual Moodboard",
      description:
        "Speak or type in English, Hindi, or Hinglish. Mention your dates, party size, dietary nuances (Jain/Vegan/Halal), or simply upload a visual aesthetic moodboard.",
      highlights: ["Understands Hindi & Hinglish", "Travel DNA profiling", "Photo-to-vibe analysis"],
    },
    {
      num: "02",
      icon: Cpu,
      title: "Agentic AI Synthesis",
      tagline: "Parallel Tool Execution in Real Time",
      description:
        "Voyara's multi-agent engine queries live Amadeus flight inventories, luxury suites, local climate patterns, and computes optimal 2-opt transit routes with zero hallucination.",
      highlights: ["Live GDS flight & hotel quotes", "Conflict-free day timeline", "Multi-currency recalculation"],
    },
    {
      num: "03",
      icon: PlaneTakeoff,
      title: "Effortless Journey",
      tagline: "Encrypted Vault & Disruption Shield",
      description:
        "Your personalized itinerary opens in our live Itinerary Studio. Stored in 256-bit encrypted vaults, with continuous 24/7 background flight disruption monitoring.",
      highlights: ["Disruption rescue radar", "Apple/Google Calendar sync", "Offline PDF & 1-click shares"],
    },
  ];

  return (
    <section id="experience" className="py-24 relative bg-surface/50 border-y border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-mono block mb-3">
            The Orchestration
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-light text-ivory">
            From First Whisper to Flight in 3 Steps
          </h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mt-6" />
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative p-8 rounded-none bg-surface-elevated/70 border border-white/[0.08] hover:border-gold/40 transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Step Top Bar */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-display text-4xl font-light text-gold/30 group-hover:text-gold transition-colors duration-300 tabular-nums">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center bg-bg/50 group-hover:border-gold transition-colors duration-300">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                  </div>

                  <span className="text-[11px] font-mono tracking-widest text-gold-soft uppercase block mb-1">
                    {step.tagline}
                  </span>
                  <h3 className="font-display text-2xl font-light text-ivory mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted text-xs leading-relaxed mb-6 font-light">
                    {step.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="pt-6 border-t border-white/[0.06] space-y-2.5">
                  {step.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-ivory/80">
                      <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
