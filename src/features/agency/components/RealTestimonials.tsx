"use client";

import React from "react";
import { Star, Quote, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { TESTIMONIALS, AGENCY_DETAILS } from "../data/agencyData";

export function RealTestimonials() {
  return (
    <section className="py-24 px-6 sm:px-8 bg-[#071F22]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-teal-soft/30 pb-8">
          <div className="space-y-3">
            <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-terracotta font-semibold">
              Client Chronicles
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-sand font-light leading-tight">
              Words From Our Travelers
            </h2>
            <p className="text-sand/70 text-sm sm:text-base font-light max-w-xl font-sans">
              Over 4,800 families and couples have explored the world with Voyara Journeys. Here are real experiences shared by our clients.
            </p>
          </div>

          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-auto flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sand hover:text-terracotta transition-colors group"
          >
            <span>Read 340+ Reviews on Google</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-8 bg-[#092A2D] border border-teal-soft/40 hover:border-terracotta/40 transition-all flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="space-y-4">
                {/* Star Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex text-terracotta">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-teal-soft/60" />
                </div>

                {/* Quote Text */}
                <p className="text-sand/85 text-sm font-light leading-relaxed font-sans italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Traveler Metadata & Photo */}
              <div className="pt-6 border-t border-teal-soft/20 flex items-center gap-4">
                <img
                  src={t.photo}
                  alt={t.names}
                  className="w-12 h-12 rounded-full object-cover border border-sand/30 flex-shrink-0"
                />
                <div className="overflow-hidden">
                  <div className="font-display text-lg text-sand font-normal leading-snug">
                    {t.names}
                  </div>
                  <div className="text-[11px] font-mono text-terracotta">
                    {t.city} • {t.travelDate}
                  </div>
                  <div className="text-[10px] text-sand/60 truncate font-sans">
                    {t.tripTaken}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
