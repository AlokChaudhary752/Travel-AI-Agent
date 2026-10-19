"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass, ShieldCheck, Sparkles, MapPin, Calendar, Users, IndianRupee } from "lucide-react";
import { AGENCY_DETAILS } from "../data/agencyData";

interface AgencyHeroProps {
  onOpenEnquiry: (destination?: string) => void;
}

export function AgencyHero({ onOpenEnquiry }: AgencyHeroProps) {
  const [selectedDest, setSelectedDest] = useState("Kashmir & Gulmarg");
  const [selectedMonth, setSelectedMonth] = useState("December 2026");
  const [selectedTravelers, setSelectedTravelers] = useState("2 Guests (Couple)");
  const [selectedBudget, setSelectedBudget] = useState("₹2,00,000 – ₹4,00,000");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenEnquiry(selectedDest);
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-28 pb-20 overflow-hidden bg-[#071F22]">
      {/* Full-bleed Curated Photography Background with Warm Film Grading */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=2000&q=85"
          alt="Dal Lake at Twilight, Kashmir"
          className="w-full h-full object-cover object-center brightness-[0.42] contrast-[1.08] filter"
        />
        {/* Editorial Deep Teal and Sand Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071F22] via-[#092A2D]/60 to-[#071F22]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(13,59,63,0.4),transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full flex flex-col gap-8">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-sand/10 border border-sand/20 backdrop-blur-md w-fit">
          <Compass className="w-3.5 h-3.5 text-terracotta animate-spin [animation-duration:14s]" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-sand/90 font-mono font-medium">
            Bespoke Private Journeys • Est. 2012
          </span>
        </div>

        {/* Confident Editorial Headline */}
        <div className="max-w-4xl space-y-4">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light text-sand leading-[1.08] tracking-tight">
            Travel That Feels Like <br />
            <span className="italic font-normal text-terracotta-soft">
              Coming Home
            </span>{" "}
            to Somewhere You&apos;ve Never Been.
          </h1>

          <p className="text-sand/80 text-base sm:text-xl font-light leading-relaxed max-w-2xl font-sans">
            Handcrafted private journeys for discerning families and couples across Kashmir, Switzerland, the Maldives, and Rajasthan. Secluded heritage estates, private aviation, and 24/7 on-trip human care.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-4 py-2 bg-sand/15 hover:bg-sand/25 border border-sand/30 text-sand text-xs font-mono tracking-wider uppercase transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-terracotta" />
              <span>Sign Up for Membership</span>
            </Link>
            <Link
              href="/dashboard/concierge"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#092A2D] hover:bg-[#092A2D]/80 border border-teal-soft/40 text-sand/80 text-xs font-mono tracking-wider uppercase transition-all"
            >
              <span>Instant AI Concierge</span>
              <ArrowRight className="w-3.5 h-3.5 text-terracotta" />
            </Link>
          </div>
        </div>

        {/* Compact Editorial Search & Enquiry Bar */}
        <div className="mt-2 p-2 bg-[#092A2D]/95 border border-teal-soft/50 shadow-2xl backdrop-blur-xl max-w-5xl">
          <form
            onSubmit={handleSearchSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 items-center"
          >
            {/* Field 1: Destination */}
            <div className="p-2.5 bg-[#061D1F] border border-teal-soft/30 hover:border-terracotta/50 transition-colors">
              <label className="text-[10px] font-mono uppercase tracking-widest text-sand/60 flex items-center gap-1.5 mb-1">
                <MapPin className="w-3 h-3 text-terracotta" />
                <span>Destination</span>
              </label>
              <select
                value={selectedDest}
                onChange={(e) => setSelectedDest(e.target.value)}
                className="w-full bg-transparent text-xs text-sand font-medium focus:outline-none cursor-pointer"
              >
                <option value="Kashmir & Gulmarg" className="bg-[#092A2D]">Kashmir & Gulmarg</option>
                <option value="Swiss Alps & Engadin" className="bg-[#092A2D]">Swiss Alps & Engadin</option>
                <option value="Baa & Noonu Atolls (Maldives)" className="bg-[#092A2D]">Maldives Sanctuary</option>
                <option value="Royal Rajasthan Palaces" className="bg-[#092A2D]">Royal Rajasthan</option>
                <option value="Kingdom of Bhutan" className="bg-[#092A2D]">Kingdom of Bhutan</option>
              </select>
            </div>

            {/* Field 2: Month */}
            <div className="p-2.5 bg-[#061D1F] border border-teal-soft/30 hover:border-terracotta/50 transition-colors">
              <label className="text-[10px] font-mono uppercase tracking-widest text-sand/60 flex items-center gap-1.5 mb-1">
                <Calendar className="w-3 h-3 text-terracotta" />
                <span>Travel Window</span>
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full bg-transparent text-xs text-sand font-medium focus:outline-none cursor-pointer"
              >
                <option value="November 2026" className="bg-[#092A2D]">November 2026</option>
                <option value="December 2026" className="bg-[#092A2D]">December 2026</option>
                <option value="January 2027" className="bg-[#092A2D]">January 2027</option>
                <option value="February 2027" className="bg-[#092A2D]">February 2027</option>
                <option value="March 2027" className="bg-[#092A2D]">March 2027</option>
                <option value="Summer 2027" className="bg-[#092A2D]">Summer 2027</option>
              </select>
            </div>

            {/* Field 3: Travelers */}
            <div className="p-2.5 bg-[#061D1F] border border-teal-soft/30 hover:border-terracotta/50 transition-colors">
              <label className="text-[10px] font-mono uppercase tracking-widest text-sand/60 flex items-center gap-1.5 mb-1">
                <Users className="w-3 h-3 text-terracotta" />
                <span>Party Size</span>
              </label>
              <select
                value={selectedTravelers}
                onChange={(e) => setSelectedTravelers(e.target.value)}
                className="w-full bg-transparent text-xs text-sand font-medium focus:outline-none cursor-pointer"
              >
                <option value="2 Guests (Couple)" className="bg-[#092A2D]">2 Guests (Couple)</option>
                <option value="Family (3–4 Guests)" className="bg-[#092A2D]">Family (3–4 Guests)</option>
                <option value="Private Group (5+ Guests)" className="bg-[#092A2D]">Private Group (5+)</option>
                <option value="Solo Journey" className="bg-[#092A2D]">Solo Explorer</option>
              </select>
            </div>

            {/* Field 4: Budget in INR */}
            <div className="p-2.5 bg-[#061D1F] border border-teal-soft/30 hover:border-terracotta/50 transition-colors">
              <label className="text-[10px] font-mono uppercase tracking-widest text-sand/60 flex items-center gap-1.5 mb-1">
                <IndianRupee className="w-3 h-3 text-terracotta" />
                <span>Budget (₹)</span>
              </label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full bg-transparent text-xs text-sand font-medium focus:outline-none cursor-pointer"
              >
                <option value="₹1,50,000 – ₹3,00,000" className="bg-[#092A2D]">₹1.5L – ₹3.0L</option>
                <option value="₹3,00,000 – ₹6,00,000" className="bg-[#092A2D]">₹3.0L – ₹6.0L</option>
                <option value="₹6,00,000 – ₹12,00,000" className="bg-[#092A2D]">₹6.0L – ₹12.0L</option>
                <option value="₹12,00,000+" className="bg-[#092A2D]">₹12.0L+ (Ultra-VIP)</option>
              </select>
            </div>

            {/* Field 5: Action CTA */}
            <div className="sm:col-span-2 lg:col-span-1">
              <button
                type="submit"
                className="w-full h-full min-h-[50px] bg-terracotta hover:bg-terracotta-soft text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-terracotta/20"
              >
                <span>Plan My Trip</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Micro-Trust Highlights */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-sand/70 font-sans pt-2">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
            24/7 On-Trip WhatsApp Support
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
            Jain & Vegetarian Dietary Pre-Coordination
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
            100% Price Transparency with Zero Hidden Surcharges
          </span>
        </div>
      </div>
    </section>
  );
}
