"use client";

import React from "react";
import { ArrowRight, MessageSquare, FileCheck, PlaneTakeoff } from "lucide-react";

interface HowItWorksProcessProps {
  onOpenEnquiry: () => void;
}

export function HowItWorksProcess({ onOpenEnquiry }: HowItWorksProcessProps) {
  const steps = [
    {
      step: "01",
      icon: MessageSquare,
      title: "Share Your Vision",
      subtitle: "A 5-minute conversation or brief form",
      description:
        "Tell us where you want to go, who you are traveling with, and any special wishes—such as private ski guides, lakefront suites, or specific dietary needs.",
    },
    {
      step: "02",
      icon: FileCheck,
      title: "Receive a Tailored Proposal",
      subtitle: "Within 24 hours in your inbox & WhatsApp",
      description:
        "Your dedicated curator crafts a detailed day-by-day plan with transparent pricing in ₹, verified hotel suite inventory, and private chauffeur logistics.",
    },
    {
      step: "03",
      icon: PlaneTakeoff,
      title: "Travel With Pure Peace of Mind",
      subtitle: "24/7 on-ground concierge support",
      description:
        "From airport VIP greeting to your final return, your personal concierge manages every check-in, dining reservation, and flight status update.",
    },
  ];

  return (
    <section className="py-24 px-6 sm:px-8 bg-[#05181A] border-t border-teal-soft/30">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-terracotta font-semibold">
            Seamless Orchestration
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-sand font-light leading-tight">
            How Your Journey Unfolds
          </h2>
          <p className="text-sand/70 text-sm sm:text-base font-light font-sans">
            Planning an extraordinary trip should never feel like a second job. We handle every detail in three effortless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 bg-[#092A2D] border border-teal-soft/40 relative flex flex-col justify-between space-y-6"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl text-terracotta/40 font-light select-none">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 bg-[#061D1F] border border-teal-soft/50 flex items-center justify-center text-sand">
                    <Icon className="w-5 h-5 text-terracotta" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-2xl text-sand font-light">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono text-terracotta">
                    {item.subtitle}
                  </div>
                  <p className="text-sand/75 text-sm font-light leading-relaxed pt-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-teal-soft/20 text-[10px] font-mono uppercase tracking-wider text-sand/50">
                  Step {item.step} of 03
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-4">
          <button
            type="button"
            onClick={onOpenEnquiry}
            className="inline-flex items-center gap-2 py-3.5 px-8 bg-terracotta hover:bg-terracotta-soft text-white font-mono text-xs font-semibold tracking-wider uppercase transition-all shadow-xl hover:scale-[1.02]"
          >
            <span>Begin Your Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
