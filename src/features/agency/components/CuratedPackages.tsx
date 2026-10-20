"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Clock, MapPin, MessageCircle, FileText } from "lucide-react";
import { CURATED_PACKAGES, PackageItem, AGENCY_DETAILS } from "../data/agencyData";
import { PackageDetailModal } from "./PackageDetailModal";

interface CuratedPackagesProps {
  onOpenEnquiry: (destination?: string, packageTitle?: string) => void;
}

export function CuratedPackages({ onOpenEnquiry }: CuratedPackagesProps) {
  const [activeTheme, setActiveTheme] = useState<string>("All");
  const [selectedPkgForDossier, setSelectedPkgForDossier] = useState<PackageItem | null>(null);

  const themes = [
    "All",
    "Family Escapes",
    "Honeymoon & Romance",
    "Alpine Ski & Adventure",
    "Royal Heritage",
  ];

  const filteredPackages = CURATED_PACKAGES.filter((pkg) => {
    if (activeTheme === "All") return true;
    return pkg.theme === activeTheme;
  });

  const handleWhatsAppInquiry = (pkg: PackageItem) => {
    const text = encodeURIComponent(
      `Hello ${AGENCY_DETAILS.name}! I am interested in the "${pkg.title}" journey (${pkg.duration}, starting at ${pkg.priceInr}). Could you please share the detailed itinerary and availability?`
    );
    window.open(`https://wa.me/919820086927?text=${text}`, "_blank");
  };

  return (
    <section id="packages" className="py-24 px-6 sm:px-8 bg-[#05181A]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-teal-soft/30 pb-8">
          <div className="space-y-3">
            <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-terracotta font-semibold">
              Handcrafted Portfolios
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-sand font-light leading-tight">
              Curated Private Packages
            </h2>
            <p className="text-sand/70 text-sm sm:text-base font-light max-w-xl font-sans">
              Authentic bespoke journeys with pre-inspected suites, private chauffeurs, and dedicated on-ground concierge support.
            </p>
          </div>

          {/* Theme Filters (Zero Full-Page Reload) */}
          <div className="flex flex-wrap gap-2">
            {themes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setActiveTheme(t)}
                className={`px-4 py-2 text-xs font-mono transition-all border ${
                  activeTheme === t
                    ? "bg-terracotta text-white border-terracotta font-semibold shadow-md"
                    : "bg-[#092A2D] text-sand/70 border-teal-soft/40 hover:text-sand hover:border-sand/40"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-[#092A2D] border border-teal-soft/40 hover:border-terracotta/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xl"
            >
              {/* Image & Badges */}
              <div
                onClick={() => setSelectedPkgForDossier(pkg)}
                className="relative h-60 overflow-hidden cursor-pointer"
              >
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.82]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#092A2D] via-transparent to-transparent opacity-80" />

                <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#071F22]/90 border border-sand/20 text-[10px] font-mono text-sand">
                  {pkg.theme}
                </div>

                <div className="absolute top-3 right-3 px-2.5 py-1 bg-terracotta text-white text-[11px] font-mono font-semibold">
                  {pkg.duration}
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-sand/60 font-mono mb-1">
                    <MapPin className="w-3.5 h-3.5 text-terracotta" />
                    <span>{pkg.destination}</span>
                  </div>

                  <h3
                    onClick={() => setSelectedPkgForDossier(pkg)}
                    className="font-display text-2xl sm:text-3xl text-sand font-light group-hover:text-terracotta-soft transition-colors cursor-pointer"
                  >
                    {pkg.title}
                  </h3>

                  <p className="text-sand/70 text-xs font-light leading-relaxed mt-2">
                    {pkg.tagline}
                  </p>

                  {/* Highlights Bullet Points */}
                  <div className="mt-4 pt-3 border-t border-teal-soft/20 space-y-2">
                    {pkg.highlights.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-sand/80 font-light">
                        <Check className="w-3.5 h-3.5 text-terracotta flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Action Buttons */}
                <div className="pt-5 border-t border-teal-soft/30 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="font-display text-2xl sm:text-3xl text-sand font-light tabular-nums">
                        {pkg.priceInr}
                      </div>
                      <span className="text-[10px] text-sand/60 font-mono">
                        {pkg.pricePer}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedPkgForDossier(pkg)}
                        className="text-[11px] font-mono text-terracotta-soft hover:underline flex items-center gap-1"
                        title="Quick View Dossier"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Quick View</span>
                      </button>
                      <span className="text-sand/30">•</span>
                      <Link
                        href={`/packages/${pkg.id}`}
                        className="text-[11px] font-mono text-sand/70 hover:text-sand hover:underline"
                        title="Dedicated Dossier Page"
                      >
                        Page →
                      </Link>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenEnquiry(pkg.destination, pkg.title)}
                      className="py-2.5 px-3 bg-terracotta hover:bg-terracotta-soft text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1 text-center"
                    >
                      <span>Customise</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleWhatsAppInquiry(pkg)}
                      className="py-2.5 px-3 bg-[#061D1F] border border-teal-soft/60 hover:border-[#25D366] text-sand hover:text-[#25D366] font-mono text-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Package Detail Modal */}
      <PackageDetailModal
        pkg={selectedPkgForDossier}
        isOpen={Boolean(selectedPkgForDossier)}
        onClose={() => setSelectedPkgForDossier(null)}
        onBookNow={(title, dest) => onOpenEnquiry(dest, title)}
      />
    </section>
  );
}
