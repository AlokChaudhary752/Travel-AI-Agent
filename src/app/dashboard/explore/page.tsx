"use client";

import React, { useState } from "react";
import {
  Search,
  Plane,
  Building,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  SlidersHorizontal,
  ChevronRight,
  Check,
} from "lucide-react";
import { useItineraryStore } from "@/features/itinerary/store/useItineraryStore";

interface FlightOffer {
  id: string;
  airline: string;
  flightNumber: string;
  aircraft: string;
  origin: string;
  originTime: string;
  destination: string;
  destinationTime: string;
  duration: string;
  cabin: "Private Jet" | "First Class" | "Business Class";
  price: string;
  currency: string;
  aiJustification: string;
  amenities: string[];
  seatsLeft: number;
}

interface HotelOffer {
  id: string;
  name: string;
  location: string;
  rating: string;
  pricePerNight: string;
  currency: string;
  aiJustification: string;
  vipPerks: string[];
  image: string;
}

export default function ExploreSearchPage() {
  const { addStop, activeDayIndex } = useItineraryStore();

  const [activeTab, setActiveTab] = useState<"flights" | "hotels">("flights");
  const [origin, setOrigin] = useState("BOM (Mumbai)");
  const [destination, setDestination] = useState("ZRH (Zurich / St. Moritz)");
  const [cabinFilter, setCabinFilter] = useState<string>("All");
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  const sampleFlights: FlightOffer[] = [
    {
      id: "fl-1",
      airline: "Swiss International Air Lines",
      flightNumber: "LX 155",
      aircraft: "Boeing 777-300ER Suite",
      origin: "BOM (Chhatrapati Shivaji Maharaj)",
      originTime: "01:25 AM",
      destination: "ZRH (Zurich Airport)",
      destinationTime: "06:15 AM",
      duration: "8h 20m Non-Stop",
      cabin: "First Class",
      price: "348,000",
      currency: "INR",
      aiJustification:
        "Direct non-stop red-eye allows full lie-flat sleep before morning helicopter transfer to St. Moritz.",
      amenities: ["Private Check-in Lounge", "Lie-Flat 203cm Bed", "Caviar Service", "Bespoke Vegetarian Menu"],
      seatsLeft: 2,
    },
    {
      id: "fl-2",
      airline: "Voyara Air Wings / NetJets Charter",
      flightNumber: "VY 880",
      aircraft: "Bombardier Global 7500",
      origin: "BOM (VIP Terminal)",
      originTime: "08:00 AM",
      destination: "SMV (Samedan FBO / Direct St. Moritz)",
      destinationTime: "01:10 PM",
      duration: "7h 40m Direct Charter",
      cabin: "Private Jet",
      price: "2,450,000",
      currency: "INR",
      aiJustification:
        "Lands directly at Samedan Airport (5 min from Badrutt's Palace), bypassing Zurich rail transfer completely.",
      amenities: ["10-Minute Tarmac Boarding", "Master Bedroom Suite", "Private Chef on Board", "Zero Customs Queue"],
      seatsLeft: 8,
    },
    {
      id: "fl-3",
      airline: "Emirates",
      flightNumber: "EK 501 + EK 87",
      aircraft: "Airbus A380-800",
      origin: "BOM (Mumbai)",
      originTime: "04:30 AM",
      destination: "ZRH (Zurich)",
      destinationTime: "01:20 PM",
      duration: "11h 20m (1h 45m DXB connection)",
      cabin: "Business Class",
      price: "185,000",
      currency: "INR",
      aiJustification:
        "Optimal price-to-comfort ratio with complimentary Chauffeur-drive at both BOM and ZRH.",
      amenities: ["Onboard Lounge & Bar", "Chauffeur Drive", "Bvlgari Amenity Kit"],
      seatsLeft: 4,
    },
  ];

  const sampleHotels: HotelOffer[] = [
    {
      id: "ht-1",
      name: "Badrutt's Palace Hotel",
      location: "Via Serlas 27, 7500 St. Moritz",
      rating: "5-Star Superior Luxury",
      pricePerNight: "CHF 3,850",
      currency: "CHF",
      aiJustification:
        "Iconic heritage landmark matching your requested lake view and historic Chesa Veglia private dining access.",
      vipPerks: [
        "Palace Butler 24/7",
        "Rolls-Royce Ghost chauffeur on standby",
        "Guaranteed 10:00 AM Early Check-in",
        "CHF 200 Palace Spa Credit",
      ],
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "ht-2",
      name: "Carlton Hotel St. Moritz",
      location: "Via Johannes Badrutt 11, St. Moritz",
      rating: "All-Suite 5-Star Boutique",
      pricePerNight: "CHF 2,950",
      currency: "CHF",
      aiJustification:
        "Home to 2-Star Michelin Da Vittorio with uninterrupted southern panoramic views of the Engadin mountains.",
      vipPerks: [
        "Private ski guide for 1 full day",
        "Unpacked luggage service",
        "Bentley lake station transfers",
      ],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const handleAddFlightToItinerary = (flight: FlightOffer) => {
    addStop(activeDayIndex, {
      title: `${flight.airline} (${flight.flightNumber}) — ${flight.cabin}`,
      category: "aviation",
      startTime: "10:00",
      endTime: "14:00",
      durationMinutes: 240,
      locationName: flight.destination,
      coords: [46.5342, 9.8841],
      costEstimate: `₹${flight.price}`,
      bookingRef: flight.flightNumber,
      notes: flight.aiJustification,
      vipPerks: flight.amenities,
    });

    setAddedItemNotice(`${flight.airline} (${flight.flightNumber}) added to Day ${activeDayIndex + 1}!`);
    setTimeout(() => setAddedItemNotice(null), 3500);
  };

  const handleAddHotelToItinerary = (hotel: HotelOffer) => {
    addStop(activeDayIndex, {
      title: `${hotel.name} Check-in`,
      category: "accommodation",
      startTime: "14:30",
      endTime: "16:00",
      durationMinutes: 90,
      locationName: hotel.location,
      coords: [46.4981, 9.8427],
      costEstimate: hotel.pricePerNight,
      notes: hotel.aiJustification,
      vipPerks: hotel.vipPerks,
    });

    setAddedItemNotice(`${hotel.name} added to Day ${activeDayIndex + 1}!`);
    setTimeout(() => setAddedItemNotice(null), 3500);
  };

  const filteredFlights = sampleFlights.filter(
    (f) => cabinFilter === "All" || f.cabin === cabinFilter
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-gold-soft font-bold">
              Global GDS Inventory
            </span>
            <span className="text-[9px] px-2 py-0.5 bg-gold/15 text-gold border border-gold/30 font-mono font-bold">
              AMADEUS & PRIVATE CHARTER CONNECTED
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-light text-ivory mt-1">
            Explore Flights & Sanctuaries
          </h1>
          <p className="text-muted text-xs font-light mt-1 max-w-xl">
            Live rates with autonomous travel DNA curation. Compare commercial first-class suites against private jet charters.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-surface-elevated border border-gold/30 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("flights")}
            className={`flex items-center gap-2 px-5 py-2 text-xs font-mono transition-all ${
              activeTab === "flights"
                ? "bg-gold text-[#07090D] font-bold shadow-gold-subtle"
                : "text-muted hover:text-ivory"
            }`}
          >
            <Plane className="w-3.5 h-3.5" />
            <span>Aviation & Flights</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("hotels")}
            className={`flex items-center gap-2 px-5 py-2 text-xs font-mono transition-all ${
              activeTab === "hotels"
                ? "bg-gold text-[#07090D] font-bold shadow-gold-subtle"
                : "text-muted hover:text-ivory"
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Luxury Sanctuaries</span>
          </button>
        </div>
      </div>

      {/* Added to Itinerary Notification */}
      {addedItemNotice && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs font-mono text-emerald-400 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{addedItemNotice}</span>
          </div>
          <span className="text-[10px] text-muted">Synced with Itinerary Studio</span>
        </div>
      )}

      {/* Global Filter Bar */}
      <div className="p-4 sm:p-5 bg-surface border border-gold/20 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="text-[10px] font-mono uppercase tracking-wider text-muted block mb-1">
            Origin
          </label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full bg-[#070A0F] border border-white/10 p-2.5 text-xs text-ivory font-mono focus:border-gold outline-none"
          />
        </div>

        <div>
          <label className="text-[10px] font-mono uppercase tracking-wider text-muted block mb-1">
            Destination
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full bg-[#070A0F] border border-white/10 p-2.5 text-xs text-ivory font-mono focus:border-gold outline-none"
          />
        </div>

        <div>
          <label className="text-[10px] font-mono uppercase tracking-wider text-muted block mb-1">
            Cabin Tier
          </label>
          <select
            value={cabinFilter}
            onChange={(e) => setCabinFilter(e.target.value)}
            className="w-full bg-[#070A0F] border border-white/10 p-2.5 text-xs text-ivory font-mono focus:border-gold outline-none"
          >
            <option value="All">All Luxury Cabins</option>
            <option value="Private Jet">Private Jet Charter</option>
            <option value="First Class">First Class Suite</option>
            <option value="Business Class">Business Class</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gold text-[#07090D] font-mono text-xs font-bold hover:bg-gold-soft transition-all"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search GDS</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Flights View */}
      {activeTab === "flights" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-muted">
            <span>Showing verified premium flight routes ({filteredFlights.length})</span>
            <span className="flex items-center gap-1.5 text-gold-soft">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              Disruption Shield Guarantee Included
            </span>
          </div>

          <div className="space-y-4">
            {filteredFlights.map((flight) => (
              <div
                key={flight.id}
                className="p-5 sm:p-6 bg-surface-elevated border border-white/10 hover:border-gold/40 transition-all space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center bg-[#070A0F]">
                      <Plane className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-ivory">
                          {flight.airline}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-gold/15 text-gold-soft border border-gold/30">
                          {flight.cabin}
                        </span>
                        <span className="text-[10px] text-muted font-mono">
                          {flight.flightNumber} • {flight.aircraft}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl sm:text-2xl font-display text-gold tabular-nums">
                      ₹{flight.price}
                    </div>
                    <span className="text-[10px] text-muted font-mono">
                      All-Inclusive VIP Fare
                    </span>
                  </div>
                </div>

                {/* Flight Route Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div>
                    <div className="text-lg font-mono text-ivory font-bold">
                      {flight.originTime}
                    </div>
                    <div className="text-xs text-muted truncate">
                      {flight.origin}
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-[11px] font-mono text-gold-soft">
                      {flight.duration}
                    </span>
                    <div className="w-full flex items-center gap-2 my-1">
                      <div className="h-px bg-gold/30 flex-1" />
                      <Plane className="w-3.5 h-3.5 text-gold rotate-90" />
                      <div className="h-px bg-gold/30 flex-1" />
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      {flight.seatsLeft} Suites Remaining
                    </span>
                  </div>

                  <div className="sm:text-right">
                    <div className="text-lg font-mono text-ivory font-bold">
                      {flight.destinationTime}
                    </div>
                    <div className="text-xs text-muted truncate">
                      {flight.destination}
                    </div>
                  </div>
                </div>

                {/* AI Justification Box */}
                <div className="p-3 bg-surface border border-gold/20 flex items-start gap-2.5 text-xs text-ivory font-sans">
                  <Sparkles className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-gold-soft text-[11px] uppercase tracking-wider block font-bold">
                      Why Voyara AI Picked This:
                    </span>
                    <span className="text-muted leading-relaxed font-light">
                      {flight.aiJustification}
                    </span>
                  </div>
                </div>

                {/* Amenities & Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {flight.amenities.map((a, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 bg-white/5 border border-white/10 text-muted"
                      >
                        ✓ {a}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => handleAddFlightToItinerary(flight)}
                      className="px-4 py-2 bg-surface border border-gold/40 hover:border-gold text-gold font-mono text-xs transition-all flex items-center gap-1.5"
                    >
                      <span>Add to Itinerary</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-gold hover:bg-gold-soft text-[#07090D] font-mono text-xs font-bold transition-all shadow-gold-subtle"
                    >
                      Instant Hold (24h)
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Hotels View */}
      {activeTab === "hotels" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-surface-elevated border border-white/10 hover:border-gold/40 transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="h-56 relative overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-elevated via-transparent to-transparent" />
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#070A0F]/80 backdrop-blur-md border border-gold/30 text-[10px] font-mono text-gold-soft">
                  {hotel.rating}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-2xl text-ivory font-light group-hover:text-gold-soft transition-colors">
                        {hotel.name}
                      </h3>
                      <div className="text-xs text-muted font-sans mt-0.5">
                        {hotel.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-2xl text-gold">
                        {hotel.pricePerNight}
                      </div>
                      <span className="text-[10px] text-muted font-mono">
                        per suite / night
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 p-3 bg-surface border border-gold/15 text-xs text-muted">
                    <span className="font-mono text-gold-soft text-[10px] uppercase block font-bold mb-0.5">
                      AI Tastemaker Note:
                    </span>
                    {hotel.aiJustification}
                  </div>

                  <div className="mt-3 space-y-1">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-muted block">
                      Voyara VIP Inclusions:
                    </span>
                    {hotel.vipPerks.map((p, i) => (
                      <div
                        key={i}
                        className="text-[11px] font-mono text-gold-soft flex items-center gap-1.5"
                      >
                        <ShieldCheck className="w-3 h-3 text-gold" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] text-muted font-mono">
                    Direct GDS Rate Guaranteed
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAddHotelToItinerary(hotel)}
                    className="px-4 py-2 bg-gold hover:bg-gold-soft text-[#07090D] font-mono text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <span>Reserve into Itinerary</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
