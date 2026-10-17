"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Plus, MapPin, Clock, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ItineraryPage() {
  const currentTrips = [
    {
      id: "trip-stm",
      title: "St. Moritz Winter Solstice & Alpine Fondue",
      destination: "St. Moritz & Engadin Valley, Switzerland",
      dates: "Dec 10 – Dec 15, 2026",
      status: "Confirmed & Held",
      daysCount: 5,
      cover: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "trip-mle",
      title: "Noonu Atoll Overwater Sanctuary",
      destination: "Maldives Private Island Reserve",
      dates: "Jan 18 – Jan 24, 2027",
      status: "In Planning",
      daysCount: 6,
      cover: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-soft block mb-1">
            Voyage Management
          </span>
          <h1 className="font-display text-3xl font-light text-ivory">
            Itinerary Studio
          </h1>
          <p className="text-muted text-xs font-light mt-1">
            Real-time split-screen timeline with 2-opt route optimization and live transit conflict resolution.
          </p>
        </div>

        <Link href="/dashboard/concierge">
          <Button variant="primary" size="md">
            <Plus className="w-4 h-4 mr-1.5" />
            Curate New Voyage
          </Button>
        </Link>
      </div>

      {/* Trips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentTrips.map((trip) => (
          <div
            key={trip.id}
            className="group relative overflow-hidden bg-surface-elevated border border-white/10 hover:border-gold/40 transition-all duration-300"
          >
            <div className="h-48 relative overflow-hidden">
              <img
                src={trip.cover}
                alt={trip.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-elevated via-transparent to-transparent" />
              <div className="absolute top-3 right-3 px-2.5 py-1 bg-bg/80 backdrop-blur-md border border-gold/30 text-[10px] font-mono text-gold-soft">
                {trip.status}
              </div>
            </div>

            <div className="p-6 space-y-3">
              <h3 className="font-display text-2xl font-light text-ivory group-hover:text-gold-soft transition-colors">
                {trip.title}
              </h3>

              <div className="space-y-1.5 text-xs text-muted font-mono">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  <span>{trip.destination}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  <span>{trip.dates}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-muted font-mono">
                  {trip.daysCount} Curated Days
                </span>
                <Link
                  href="/dashboard/concierge"
                  className="flex items-center gap-1.5 text-xs font-mono text-gold hover:text-gold-soft transition-colors"
                >
                  <span>Open Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
