"use client";

import React from "react";
import { ArrowRight, Clock, MapPin, Sparkles } from "lucide-react";
import { FEATURED_DESTINATIONS, DestinationItem } from "../data/agencyData";

interface FeaturedDestinationsProps {
  onOpenEnquiry: (destination?: string) => void;
}

export function FeaturedDestinations({ onOpenEnquiry }: FeaturedDestinationsProps) {
  const largeFeature = FEATURED_DESTINATIONS.find((d) => d.featuredLarge) || FEATURED_DESTINATIONS[0];
  const sideFeatures = FEATURED_DESTINATIONS.filter((d) => !d.featuredLarge);

  return (
    <section id="destinations" className="py-24 px-6 sm:px-8 bg-[#071F22]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-teal-soft/30 pb-8">
          <div className="space-y-3">
            <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-terracotta font-semibold">
              Curated Sanctuaries
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-sand font-light leading-tight">
              Destinations of Raw Beauty & Seclusion
            </h2>
            <p className="text-sand/70 text-sm sm:text-base font-light max-w-xl font-sans">
              We do not sell mass package tours. Every destination we feature has been personally surveyed, from the heating in Himalayan houseboats to private kitchen standards in the Swiss Alps.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenEnquiry("Custom Destination")}
            className="self-start md:self-auto flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sand hover:text-terracotta transition-colors group"
          >
            <span>Request Custom Destination</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Large Hero Card (Kashmir) - 7 cols */}
          <div
            onClick={() => onOpenEnquiry(largeFeature.name)}
            className="lg:col-span-7 group relative bg-[#092A2D] border border-teal-soft/40 overflow-hidden cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-[360px] sm:h-[420px] overflow-hidden">
              <img
                src={largeFeature.image}
                alt={largeFeature.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.78]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#092A2D] via-transparent to-transparent opacity-90" />
              <div className="absolute top-4 left-4 px-3 py-1 bg-[#071F22]/90 backdrop-blur-md border border-sand/20 text-[10px] font-mono uppercase tracking-widest text-sand">
                {largeFeature.badge}
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 bg-terracotta text-white font-mono text-[11px] font-semibold">
                From {largeFeature.priceFromInr}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-sand/60 font-mono mb-1">
                  <MapPin className="w-3.5 h-3.5 text-terracotta" />
                  <span>{largeFeature.stateOrCountry}</span>
                  <span>•</span>
                  <Clock className="w-3.5 h-3.5 text-terracotta" />
                  <span>{largeFeature.tripLength}</span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl text-sand font-light group-hover:text-terracotta-soft transition-colors">
                  {largeFeature.name}
                </h3>

                <p className="text-sand/75 text-sm font-light leading-relaxed mt-2.5">
                  {largeFeature.description}
                </p>
              </div>

              <div className="pt-4 border-t border-teal-soft/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-sand/80">
                <span className="text-sand/60">Ideal For: <strong className="text-sand">{largeFeature.idealFor}</strong></span>
                <span className="flex items-center gap-1.5 text-terracotta font-semibold group-hover:underline">
                  <span>Explore Tailored Itinerary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Secondary Stacked Column - 5 cols */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {sideFeatures.map((dest) => (
              <div
                key={dest.id}
                onClick={() => onOpenEnquiry(dest.name)}
                className="group relative bg-[#092A2D] border border-teal-soft/40 overflow-hidden cursor-pointer flex flex-col sm:flex-row flex-1"
              >
                <div className="relative w-full sm:w-2/5 h-48 sm:h-auto overflow-hidden flex-shrink-0">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.8]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#092A2D]/80 hidden sm:block" />
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#071F22]/90 border border-sand/20 text-[9px] font-mono uppercase tracking-wider text-sand">
                    {dest.tripLength}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-terracotta mb-1">
                      From {dest.priceFromInr}
                    </div>
                    <h4 className="font-display text-2xl text-sand font-light group-hover:text-terracotta-soft transition-colors leading-snug">
                      {dest.name}
                    </h4>
                    <p className="text-sand/70 text-xs font-light line-clamp-2 mt-1.5 leading-relaxed">
                      {dest.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-teal-soft/20 flex items-center justify-between text-xs font-mono text-sand/70">
                    <span className="text-[10px] truncate">{dest.bestSeason}</span>
                    <span className="text-terracotta flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
