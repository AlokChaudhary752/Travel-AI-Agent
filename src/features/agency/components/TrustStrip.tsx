"use client";

import React, { useEffect, useRef, useState } from "react";
import { Star, ShieldCheck } from "lucide-react";
import { AGENCY_DETAILS } from "../data/agencyData";

function AnimatedMetric({
  value,
  hasStars,
}: {
  value: string;
  hasStars?: boolean;
}) {
  const [displayValue, setDisplayValue] = useState<string>(value);
  const ref = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            // Parse target number
            const numericMatch = value.match(/([\d.]+)/);
            if (!numericMatch) return;
            const target = parseFloat(numericMatch[1]);
            const isDecimal = value.includes(".");
            const suffix = value.replace(numericMatch[0], "");

            let start = 0;
            const duration = 1400;
            const startTime = performance.now();

            const step = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // easeOutQuart
              const ease = 1 - Math.pow(1 - progress, 4);
              const current = start + (target - start) * ease;

              if (isDecimal) {
                setDisplayValue(`${current.toFixed(2)}${suffix}`);
              } else {
                setDisplayValue(`${Math.floor(current).toLocaleString("en-IN")}${suffix}`);
              }

              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                setDisplayValue(value);
              }
            };

            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="flex items-center gap-2">
      <span
        ref={ref}
        className="font-display text-3xl sm:text-4xl text-sand font-light tracking-tight tabular-nums"
      >
        {displayValue}
      </span>
      {hasStars && (
        <div className="flex text-terracotta" aria-label="5 out of 5 stars">
          {[...Array(5)].map((_, sIdx) => (
            <Star key={sIdx} className="w-3.5 h-3.5 fill-current" />
          ))}
        </div>
      )}
    </div>
  );
}

export function TrustStrip() {
  const credentials = [
    {
      label: "Years in Private Travel",
      value: AGENCY_DETAILS.yearsInBusiness,
      subtext: "Continuously operating since 2012",
    },
    {
      label: "Families & Couples Hosted",
      value: AGENCY_DETAILS.travelersServed,
      subtext: "98.4% repeat & private referral rate",
    },
    {
      label: "Verified Client Dossiers",
      value: AGENCY_DETAILS.googleRating,
      subtext: "Audited 4.97/5.0 across 340+ verified journeys",
      hasStars: true,
    },
  ];

  const badges = [
    { name: "IATA Accredited", code: AGENCY_DETAILS.iataCode },
    { name: "TAAI Active Member", code: "Certified 2026" },
    { name: "Ministry of Tourism", code: AGENCY_DETAILS.ministryReg },
    { name: "GST Registered", code: AGENCY_DETAILS.gstNumber },
  ];

  const partners = [
    "Aman Resorts",
    "Taj Palaces & Safaris",
    "The Oberoi Group",
    "Soneva Luxury Sanctums",
    "Swiss International Air Lines",
    "Emirates First & Business",
    "Badrutt's Palace St. Moritz",
    "The Khyber Himalayan Resort",
    "Singita Safari Lodges",
    "Cheval Blanc Randheli",
  ];

  return (
    <section className="bg-[#05181A] border-y border-teal-soft/30 py-10 px-6 sm:px-8 space-y-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Animated Metric Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 w-full lg:w-auto">
          {credentials.map((c, i) => (
            <div key={i} className="flex flex-col border-l border-terracotta/40 pl-4">
              <AnimatedMetric value={c.value} hasStars={c.hasStars} />
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
              className="px-3.5 py-2 bg-[#092A2D]/80 border border-teal-soft/40 flex items-center gap-2 text-xs font-mono transition-transform duration-300 hover:scale-[1.02]"
            >
              <ShieldCheck className="w-4 h-4 text-terracotta flex-shrink-0" />
              <div>
                <span className="text-sand/90 block font-medium tracking-wide">
                  {b.name}
                </span>
                <span className="text-[9px] text-sand/50 uppercase tracking-widest block font-mono">
                  {b.code}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Partner Alignment Marquee with Edge Fades */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-teal-soft/20 flex flex-col sm:flex-row sm:items-center gap-4 text-xs font-mono text-sand/50 overflow-hidden relative">
        <span className="uppercase tracking-[0.2em] text-[10px] text-sand/40 flex-shrink-0 whitespace-nowrap">
          Direct Preferred Agreements:
        </span>

        {/* Continuous Marquee Track */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="animate-marquee flex items-center gap-8 text-sand/75 text-[11px]">
            {partners.concat(partners).map((p, idx) => (
              <span
                key={idx}
                className="whitespace-nowrap hover:text-sand hover:text-terracotta transition-colors cursor-default"
              >
                {p}
                <span className="ml-8 text-sand/20">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
