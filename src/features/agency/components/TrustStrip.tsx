"use client";

import React from "react";
import { Star, ShieldCheck, Award, CheckCircle2 } from "lucide-react";
import { AGENCY_DETAILS } from "../data/agencyData";

export function TrustStrip() {
  const credentials = [
    {
      label: "Years in Private Travel",
      value: AGENCY_DETAILS.yearsInBusiness,
      subtext: "Continuously operational since 2012",
    },
    {
      label: "Families & Couples Served",
      value: AGENCY_DETAILS.travelersServed,
      subtext: "98.4% repeat & referral clientele",
    },
    {
      label: "Verified Google Rating",
      value: AGENCY_DETAILS.googleRating,
      subtext: "Based on 340+ verified client reviews",
      hasStars: true,
    },
  ];

  const badges = [
    { name: "IATA Accredited", code: AGENCY_DETAILS.iataCode },
    { name: "TAAI Member", code: "Active 2026" },
    { name: "Ministry of Tourism", code: AGENCY_DETAILS.ministryReg },
    { name: "Virtuoso Luxury Partner", code: "Direct Amenities" },
  ];

  return (
    <section className="bg-[#05181A] border-y border-teal-soft/30 py-8 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Metric Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 w-full lg:w-auto">
          {credentials.map((c, i) => (
            <div key={i} className="flex flex-col border-l border-terracotta/40 pl-4">
              <div className="flex items-center gap-2">
                <span className="font-display text-3xl sm:text-4xl text-sand font-light tracking-tight">
                  {c.value}
                </span>
                {c.hasStars && (
                  <div className="flex text-terracotta">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                )}
              </div>
              <span className="text-xs uppercase font-mono tracking-wider text-sand/90 font-medium mt-1">
                {c.label}
              </span>
              <span className="text-[11px] text-sand/50 font-sans mt-0.5">
                {c.subtext}
              </span>
            </div>
          ))}
        </div>

        {/* Industry Accreditation Badges */}
        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-teal-soft/20">
          {badges.map((b, i) => (
            <div
              key={i}
              className="px-3.5 py-2 bg-[#092A2D]/80 border border-teal-soft/40 flex items-center gap-2 text-xs font-mono"
            >
              <ShieldCheck className="w-4 h-4 text-terracotta flex-shrink-0" />
              <div>
                <span className="text-sand/90 block font-medium tracking-wide">
                  {b.name}
                </span>
                <span className="text-[9px] text-sand/50 uppercase tracking-widest block">
                  {b.code}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
