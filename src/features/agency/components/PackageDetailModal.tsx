"use client";

import React, { useState } from "react";
import { X, Check, Clock, MapPin, IndianRupee, MessageCircle, Phone, ArrowRight, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";
import { PackageItem, AGENCY_DETAILS } from "../data/agencyData";

interface PackageDetailModalProps {
  pkg: PackageItem | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (packageTitle: string, destination: string) => void;
}

export function PackageDetailModal({
  pkg,
  isOpen,
  onClose,
  onBookNow,
}: PackageDetailModalProps) {
  const [activeDay, setActiveDay] = useState<number | null>(1);

  if (!isOpen || !pkg) return null;

  // Day-by-day sample breakdown tailored to the destination
  const dayPlans = [
    {
      day: 1,
      title: "Private Arrival & Sunset Check-in",
      location: pkg.destination.split("&")[0].trim(),
      desc: "Chauffeured airport tarmac transfer in a dedicated Mercedes-Benz E-Class or Land Cruiser. Private check-in at your heritage suite followed by a welcome kahwa tea ceremony or champagne service.",
    },
    {
      day: 2,
      title: "Guided Valley Exploration & Local Artisans",
      location: pkg.destination.split("&")[0].trim(),
      desc: "Private morning walkthrough with our senior cultural historian. Curated access to private pashmina and walnut woodcraft ateliers closed to ordinary tour groups.",
    },
    {
      day: 3,
      title: "Scenic Transfer to Mountain Sanctuary",
      location: pkg.destination.includes("&") ? pkg.destination.split("&")[1].trim() : "High Alpine Pass",
      desc: "Mountain drive with panoramic vista photo stops. Check-in to your pine-facing luxury suite with pre-heated cedar soaking tub prepared prior to arrival.",
    },
    {
      day: 4,
      title: "Alpine Adventure & Open-Hearth Dining",
      location: pkg.destination.includes("&") ? pkg.destination.split("&")[1].trim() : "High Alpine Pass",
      desc: "Phase II gondola fast-track access or private cable car pass with our certified mountain guide. Evening 5-course curated dinner featuring local seasonal produce.",
    },
    {
      day: 5,
      title: "Gentle Morning & Chauffeured Departure",
      location: pkg.destination.split("&")[0].trim(),
      desc: "Leisurely breakfast with panoramic views. Private vehicle transfer to the airport terminal with assisted luggage porterage through security.",
    },
  ];

  const exclusions = [
    "International or domestic commercial airfare (available on request)",
    "Personal expenses, laundry, and discretionary gratuities",
    "Visa issuance fees and travel medical insurance",
    "Alcoholic beverages outside designated tasting sessions",
  ];

  const handleWhatsAppBooking = () => {
    const text = encodeURIComponent(
      `Hello ${AGENCY_DETAILS.name}! I would like to enquire about reserving the "${pkg.title}" journey (${pkg.duration}, ${pkg.priceInr}). Could you share exact departures and available suites?`
    );
    window.open(`https://wa.me/919820086927?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#071F22] text-sand border border-teal-soft/40 shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header Strip */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-teal-soft/30 bg-[#092A2D]">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2 py-0.5 bg-terracotta/20 text-terracotta-soft border border-terracotta/40 uppercase tracking-widest text-[10px]">
              {pkg.theme}
            </span>
            <span className="text-sand/60">•</span>
            <span className="text-sand/80 font-medium">{pkg.duration}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 text-sand/60 hover:text-sand transition-colors"
            aria-label="Close dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8 space-y-8">
          {/* Hero Banner with Curated Photo */}
          <div className="relative h-64 sm:h-80 overflow-hidden border border-teal-soft/30">
            <img
              src={pkg.image}
              alt={pkg.title}
              className="w-full h-full object-cover brightness-[0.75]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071F22] via-transparent to-transparent opacity-90" />
            
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-terracotta-soft">
                {pkg.region} Bespoke Dossier
              </span>
              <h2 className="font-display text-2xl sm:text-4xl text-sand font-light leading-tight">
                {pkg.title}
              </h2>
              <p className="text-sand/80 text-xs sm:text-sm font-light max-w-2xl">
                {pkg.tagline}
              </p>
            </div>
          </div>

          {/* Pricing & Key Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#092A2D] border border-teal-soft/30">
            <div>
              <span className="text-[10px] font-mono text-sand/60 uppercase block">Starting Price</span>
              <span className="font-display text-2xl text-sand font-semibold tabular-nums">{pkg.priceInr}</span>
              <span className="text-[10px] text-sand/50 block font-mono">{pkg.pricePer}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-sand/60 uppercase block">Duration</span>
              <span className="font-mono text-lg text-sand font-medium">{pkg.duration}</span>
              <span className="text-[10px] text-sand/50 block">Tailorable dates</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-sand/60 uppercase block">Destination</span>
              <span className="font-mono text-sm text-sand font-medium truncate block">{pkg.destination}</span>
              <span className="text-[10px] text-terracotta-soft block font-mono">Surveyed in person</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-sand/60 uppercase block">Dietary Readiness</span>
              <span className="font-mono text-sm text-emerald-400 font-medium block">Jain / Veg Ready</span>
              <span className="text-[10px] text-sand/50 block">Kitchen briefed</span>
            </div>
          </div>

          {/* Day-by-Day Accordion */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl text-sand font-light flex items-center gap-2">
              <span>Day-by-Day Journey Flow</span>
            </h3>

            <div className="space-y-2.5">
              {dayPlans.map((dp) => {
                const isOpen = activeDay === dp.day;
                return (
                  <div
                    key={dp.day}
                    className="border border-teal-soft/30 bg-[#092A2D]/60 transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveDay(isOpen ? null : dp.day)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-terracotta font-semibold">
                          Day 0{dp.day}
                        </span>
                        <span className="text-sm font-medium text-sand">{dp.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-sand/60 hidden sm:inline">
                          {dp.location}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-sand/60" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-sand/60" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs text-sand/75 font-light leading-relaxed border-t border-teal-soft/20">
                        {dp.desc}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inclusions vs Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Inclusions */}
            <div className="p-5 bg-[#092A2D] border border-teal-soft/30 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-1.5 font-semibold">
                <Check className="w-4 h-4" /> What Is Included
              </h4>
              <ul className="space-y-2 text-xs text-sand/80 font-light">
                {pkg.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="p-5 bg-[#092A2D] border border-teal-soft/30 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-sand/60 flex items-center gap-1.5 font-semibold">
                <X className="w-4 h-4" /> Excluded From Base Tariff
              </h4>
              <ul className="space-y-2 text-xs text-sand/70 font-light">
                {exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-sand/40 mt-0.5">•</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 sm:p-6 bg-[#05181A] border-t border-teal-soft/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left w-full sm:w-auto">
            <span className="text-[10px] font-mono text-sand/60 uppercase block">Total Indicative Tariff</span>
            <span className="font-display text-2xl text-sand font-semibold tabular-nums">{pkg.priceInr}</span>
            <span className="text-[10px] text-sand/50 font-mono ml-1.5">{pkg.pricePer} (Inclusive of GST)</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleWhatsAppBooking}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Concierge</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onBookNow(pkg.title, pkg.destination);
              }}
              className="flex-1 sm:flex-initial px-6 py-2.5 bg-terracotta hover:bg-terracotta-soft text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Customise Itinerary</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
