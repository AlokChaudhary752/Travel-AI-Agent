"use client";

import React from "react";
import { Check } from "lucide-react";

const steps = [
  { num: 1, title: "Identity" },
  { num: 2, title: "Travel DNA" },
  { num: 3, title: "Preferences" },
  { num: 4, title: "Logistics" },
];

export function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-10">
      <div className="flex items-center justify-between relative">
        {/* Background track line */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-px bg-white/10 -z-10" />

        {/* Active gold progress line */}
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 h-px bg-gold transition-all duration-500 -z-10 shadow-[0_0_8px_#C9A24B]"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((s) => {
          const isCompleted = s.num < currentStep;
          const isCurrent = s.num === currentStep;

          return (
            <div key={s.num} className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs transition-all duration-300 ${
                  isCompleted
                    ? "bg-gold text-bg font-bold shadow-gold-subtle"
                    : isCurrent
                    ? "bg-surface-elevated border-2 border-gold text-gold shadow-gold-subtle"
                    : "bg-surface border border-white/20 text-muted"
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
              </div>
              <span
                className={`mt-2 text-[10px] uppercase tracking-widest font-mono hidden sm:block ${
                  isCurrent ? "text-gold font-semibold" : "text-muted"
                }`}
              >
                {s.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
