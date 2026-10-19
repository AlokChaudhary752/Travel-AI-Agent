"use client";

import React, { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { FAQS } from "../data/agencyData";

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-24 px-6 sm:px-8 bg-[#071F22]">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-terracotta font-semibold">
            Clarity & Guidance
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-sand font-light leading-tight">
            Frequently Addressed Questions
          </h2>
          <p className="text-sand/70 text-sm sm:text-base font-light font-sans max-w-xl mx-auto">
            Everything you need to know about our booking safeguards, culinary coordination, and private travel standards.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#092A2D] border border-teal-soft/40 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-display text-xl text-sand font-normal">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#061D1F] border border-teal-soft/50 flex items-center justify-center text-terracotta flex-shrink-0 transition-transform">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sand/80 text-sm font-light leading-relaxed border-t border-teal-soft/20 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                    <div className="mt-3 pt-3 border-t border-teal-soft/10 text-[10px] font-mono text-terracotta uppercase tracking-wider">
                      Category: {faq.category}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
