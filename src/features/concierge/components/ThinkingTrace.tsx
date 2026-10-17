"use client";

import React, { useState } from "react";
import { Terminal, ChevronDown, ChevronUp, Check, Cpu } from "lucide-react";

export function ThinkingTrace({
  steps,
  currentThought,
}: {
  steps: Array<{ tool?: string; text: string; timestamp?: string }>;
  currentThought?: string;
}) {
  const [isOpen, setIsOpen] = useState(true);

  if (steps.length === 0 && !currentThought) return null;

  return (
    <div className="rounded-none border border-gold/25 bg-[#090D13]/90 shadow-md mb-4 overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 bg-surface-elevated/70 border-b border-white/5 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-gold">
          <Cpu className="w-3.5 h-3.5 animate-spin [animation-duration:8s]" />
          <span className="uppercase tracking-widest text-[10px]">
            Autonomous Concierge Reasoning Trace ({steps.length} Actions)
          </span>
        </div>
        <div className="text-muted hover:text-ivory">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 space-y-2 text-xs font-mono">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-muted">
              <Check className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                {step.tool && (
                  <span className="text-gold-soft font-semibold mr-1.5 uppercase tracking-wider text-[10px]">
                    [{step.tool}]
                  </span>
                )}
                <span className="text-ivory/80">{step.text}</span>
              </div>
            </div>
          ))}

          {currentThought && (
            <div className="flex items-center gap-2 text-gold animate-pulse text-[11px] pt-1">
              <Terminal className="w-3.5 h-3.5" />
              <span>{currentThought}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
