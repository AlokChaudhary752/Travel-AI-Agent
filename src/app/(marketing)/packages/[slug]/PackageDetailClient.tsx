"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Compass,
  FileText,
  Heart,
  HelpCircle,
  IndianRupee,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import {
  PackageItem,
  AGENCY_DETAILS,
  SAMPLE_ITINERARY_DAYS,
} from "@/features/agency/data/agencyData";
import { EnquiryModal } from "@/features/agency/components/EnquiryModal";

interface PackageDetailClientProps {
  pkg: PackageItem;
  similarTrips: PackageItem[];
}

export function PackageDetailClient({ pkg, similarTrips }: PackageDetailClientProps) {
  const [activeTab, setActiveTab] = useState<"itinerary" | "map" | "inclusions">("itinerary");
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  // Booking panel states
  const [travelMonth, setTravelMonth] = useState("December 2026");
  const [guestCount, setGuestCount] = useState("2 Guests (Couple)");

  // Gallery photographs
  const gallery = [
    pkg.image,
    "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85",
    "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=900&q=85",
  ];

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Voyara Journeys, I am reviewing the ${pkg.title} dossier (${pkg.priceInr} ${pkg.pricePer}) for ${guestCount} in ${travelMonth}. Please share tailored dates and villa availability.`
    );
    window.open(`https://wa.me/919820086927?text=${text}`, "_blank");
  };

  return (
    <div className="bg-[#071F22] text-sand antialiased min-h-screen pt-24 pb-20">
      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setLightboxImg(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 p-2 text-sand/80 hover:text-sand bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxImg}
            alt="Enlarged view"
            className="max-w-full max-h-[90vh] object-contain border border-teal-soft/40 shadow-2xl"
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-sand/60">
          <Link href="/" className="hover:text-sand transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voyara Home</span>
          </Link>
          <span>/</span>
          <Link href="/#packages" className="hover:text-sand transition-colors">
            Curated Portfolios
          </Link>
          <span>/</span>
          <span className="text-terracotta-soft truncate max-w-xs">{pkg.title}</span>
        </nav>

        {/* Hero Headline & Tags */}
        <div className="space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 bg-sand/10 border border-sand/20 text-[10px] font-mono uppercase tracking-widest text-sand">
              {pkg.theme}
            </span>
            <span className="px-3 py-1 bg-terracotta text-white text-[10px] font-mono uppercase tracking-widest font-semibold">
              {pkg.duration}
            </span>
            <span className="px-3 py-1 bg-[#092A2D] border border-teal-soft/40 text-[10px] font-mono text-sand/70">
              {pkg.region} Circuit
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-light text-sand leading-tight">
            {pkg.title}
          </h1>

          <p className="text-sand/80 text-base sm:text-lg font-light leading-relaxed max-w-3xl">
            {pkg.tagline}
          </p>

          <div className="flex items-center gap-2 text-xs font-mono text-sand/60">
            <MapPin className="w-4 h-4 text-terracotta" />
            <span>Route: {pkg.destination}</span>
          </div>
        </div>

        {/* Cinematic Gallery Grid with Lightbox Triggers */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div
            className="md:col-span-2 md:row-span-2 relative h-80 sm:h-96 md:h-full overflow-hidden cursor-pointer group"
            onClick={() => setLightboxImg(gallery[0])}
          >
            <img
              src={gallery[0]}
              alt={pkg.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.88]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071F22] via-transparent to-transparent opacity-60" />
            <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-[#071F22]/90 border border-teal-soft/40 text-[10px] font-mono text-sand/80">
              Click to view full photograph
            </span>
          </div>

          {gallery.slice(1, 4).map((img, idx) => (
            <div
              key={idx}
              className="relative h-44 sm:h-52 overflow-hidden cursor-pointer group"
              onClick={() => setLightboxImg(img)}
            >
              <img
                src={img}
                alt={`${pkg.title} photograph ${idx + 2}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071F22] via-transparent to-transparent opacity-50" />
            </div>
          ))}
        </div>

        {/* Main 2-Column Content Layout: Left Details, Right Sticky Booking Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Itinerary, Map Schematic, Inclusions (8 Cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Nav Tabs */}
            <div className="flex border-b border-teal-soft/30 gap-6">
              <button
                type="button"
                onClick={() => setActiveTab("itinerary")}
                className={`pb-3 text-xs font-mono uppercase tracking-wider transition-colors relative ${
                  activeTab === "itinerary"
                    ? "text-terracotta font-semibold"
                    : "text-sand/60 hover:text-sand"
                }`}
              >
                <span>Day-by-Day Journey</span>
                {activeTab === "itinerary" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("map")}
                className={`pb-3 text-xs font-mono uppercase tracking-wider transition-colors relative ${
                  activeTab === "map"
                    ? "text-terracotta font-semibold"
                    : "text-sand/60 hover:text-sand"
                }`}
              >
                <span>Route Schematic</span>
                {activeTab === "map" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("inclusions")}
                className={`pb-3 text-xs font-mono uppercase tracking-wider transition-colors relative ${
                  activeTab === "inclusions"
                    ? "text-terracotta font-semibold"
                    : "text-sand/60 hover:text-sand"
                }`}
              >
                <span>Inclusions & Exclusions</span>
                {activeTab === "inclusions" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta" />
                )}
              </button>
            </div>

            {/* Tab 1: Day-by-Day Accordion */}
            {activeTab === "itinerary" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-sand/50">
                    Chronological Flow ({SAMPLE_ITINERARY_DAYS.length} Days)
                  </span>
                  <button
                    type="button"
                    onClick={() => setExpandedDay(expandedDay === null ? 1 : null)}
                    className="text-[11px] font-mono text-terracotta-soft hover:underline"
                  >
                    {expandedDay === null ? "Expand First Day" : "Collapse All"}
                  </button>
                </div>

                {SAMPLE_ITINERARY_DAYS.map((day) => {
                  const isExpanded = expandedDay === day.day;
                  return (
                    <div
                      key={day.day}
                      className="border border-teal-soft/40 bg-[#092A2D]/60 transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <span className="w-8 h-8 rounded-full border border-terracotta/50 flex items-center justify-center font-mono text-xs text-terracotta font-medium flex-shrink-0">
                            0{day.day}
                          </span>
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-sand/50 block">
                              {day.location}
                            </span>
                            <span className="font-display text-lg text-sand font-normal block">
                              {day.title}
                            </span>
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-sand/60 transition-transform duration-300 flex-shrink-0 ${
                            isExpanded ? "rotate-180 text-terracotta" : ""
                          }`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="px-5 pb-5 pt-2 border-t border-teal-soft/20 space-y-4 text-xs">
                          <div className="space-y-2">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-sand/60 block">
                              Curated Experiences:
                            </span>
                            <ul className="space-y-1.5 text-sand/80">
                              {day.highlights.map((h, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <Check className="w-3.5 h-3.5 text-terracotta flex-shrink-0 mt-0.5" />
                                  <span>{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-teal-soft/20 text-sand/70 font-mono text-[11px]">
                            <div>
                              <strong className="text-sand/90 block">Accommodation:</strong>
                              <span>{day.stay}</span>
                            </div>
                            <div>
                              <strong className="text-sand/90 block">Meals Included:</strong>
                              <span>{day.meals}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Tab 2: Route Map Schematic */}
            {activeTab === "map" && (
              <div className="p-6 bg-[#092A2D]/70 border border-teal-soft/40 space-y-6">
                <div>
                  <h3 className="font-display text-2xl text-sand font-light">
                    Topographical Route Schematic
                  </h3>
                  <p className="text-sand/70 text-xs font-light mt-1">
                    Chauffeured via private 4WD all-wheel vehicles and dedicated float planes.
                  </p>
                </div>

                {/* SVG Route Visualization */}
                <div className="p-8 bg-[#05181A] border border-teal-soft/30 rounded flex flex-col items-center justify-center space-y-6">
                  <div className="w-full max-w-lg flex items-center justify-between relative">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-terracotta via-sand/30 to-terracotta -translate-y-1/2" />
                    
                    {["Arrival Hub", "Mountain Sanctuary", "Wilderness Reserve", "Departure Lounge"].map(
                      (point, idx) => (
                        <div key={idx} className="relative z-10 flex flex-col items-center">
                          <div className="w-4 h-4 rounded-full bg-terracotta border-2 border-[#05181A] ring-2 ring-terracotta/40" />
                          <span className="text-[10px] font-mono uppercase tracking-wider text-sand/80 mt-2 text-center max-w-[80px]">
                            {point}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-sand/40 tracking-widest uppercase">
                    Zero Surcharge Private Transit Protocol • Verified Escort
                  </span>
                </div>
              </div>
            )}

            {/* Tab 3: Inclusions vs Exclusions */}
            {activeTab === "inclusions" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-[#092A2D]/70 border border-teal-soft/40 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sand/90">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold">Fully Covered Inclusions</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-sand/80">
                    {pkg.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>24/7 dedicated on-ground local private escort lead</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>All domestic state entry permits and environmental fees</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-[#092A2D]/70 border border-teal-soft/40 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-sand/90">
                    <X className="w-4 h-4 text-rose-400" />
                    <span className="font-semibold">Transparent Exclusions</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-sand/70">
                    <li className="flex items-start gap-2">
                      <X className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                      <span>International commercial or private jet airfare (available upon request)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                      <span>Personal alcoholic rare cellar selections beyond curated pairings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                      <span>Discretionary gratuities for local hotel staff</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Booking & Consultation Panel (4 Cols) */}
          <aside className="lg:col-span-4 sticky top-28 bg-[#092A2D] border border-teal-soft/50 p-6 space-y-6 shadow-2xl">
            <div className="space-y-1 border-b border-teal-soft/30 pb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-sand/60">
                Transparent Tariff
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl text-sand font-light tabular-nums">
                  {pkg.priceInr}
                </span>
                <span className="text-xs font-mono text-sand/60">
                  {pkg.pricePer}
                </span>
              </div>
              <span className="text-[10px] font-mono text-terracotta-soft block pt-0.5">
                Inclusive of 5% GST • Zero Hidden Booking Charges
              </span>
            </div>

            {/* Selectors */}
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-sand/60 flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3 h-3 text-terracotta" />
                  <span>Target Travel Season</span>
                </label>
                <select
                  value={travelMonth}
                  onChange={(e) => setTravelMonth(e.target.value)}
                  className="w-full bg-[#061D1F] border border-teal-soft/40 p-2.5 text-xs text-sand font-medium focus:outline-none"
                >
                  <option value="December 2026">December 2026 (Peak Winter)</option>
                  <option value="January 2027">January 2027 (Alpine Snow)</option>
                  <option value="February 2027">February 2027 (Late Winter)</option>
                  <option value="April 2027">April 2027 (Spring Bloom)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-sand/60 flex items-center gap-1.5 mb-1">
                  <Users className="w-3 h-3 text-terracotta" />
                  <span>Party Size</span>
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full bg-[#061D1F] border border-teal-soft/40 p-2.5 text-xs text-sand font-medium focus:outline-none"
                >
                  <option value="2 Guests (Couple)">2 Guests (Couple)</option>
                  <option value="Family (3–4 Guests)">Family (3–4 Guests)</option>
                  <option value="Private Group (5+ Guests)">Private Group (5+ Guests)</option>
                  <option value="Solo Traveler">Solo Traveler</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={() => setEnquiryOpen(true)}
                className="w-full py-3 bg-terracotta hover:bg-terracotta-soft text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-terracotta/20"
              >
                <span>Request Tailored Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full py-2.5 bg-[#061D1F] border border-teal-soft/60 hover:border-[#25D366] text-sand hover:text-[#25D366] font-mono text-xs transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Instant WhatsApp Consultation</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-4 border-t border-teal-soft/30 space-y-2 text-[11px] font-mono text-sand/70">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
                <span>Protected Client Escrow Accounts</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
                <span>18-Minute Average Lead Response Time</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
                <span>Private Desk: {AGENCY_DETAILS.phoneDisplay}</span>
              </div>
            </div>
          </aside>
        </div>

        {/* Similar Curated Journeys Section */}
        <div className="pt-16 border-t border-teal-soft/30 space-y-8">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-sand/50 block mb-1">
              Alternative Itineraries
            </span>
            <h2 className="font-display text-2xl sm:text-4xl text-sand font-light">
              Similar Bespoke Journeys
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarTrips.map((s) => (
              <Link
                key={s.id}
                href={`/packages/${s.id}`}
                className="group bg-[#092A2D]/80 border border-teal-soft/40 hover:border-terracotta/60 transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.85]"
                  />
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-terracotta text-white font-mono text-[10px] font-semibold">
                    {s.duration}
                  </span>
                </div>
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-sand/60 block">
                      {s.destination}
                    </span>
                    <h3 className="font-display text-xl text-sand font-light group-hover:text-terracotta-soft transition-colors mt-1">
                      {s.title}
                    </h3>
                  </div>
                  <div className="flex items-baseline justify-between pt-3 border-t border-teal-soft/20 text-xs">
                    <span className="font-display text-lg text-sand font-light tabular-nums">
                      {s.priceInr}
                    </span>
                    <span className="text-terracotta font-mono text-[11px] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Global Interactive Consultation Modal */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        preselectedDestination={pkg.destination}
        preselectedPackageTitle={pkg.title}
      />
    </div>
  );
}
