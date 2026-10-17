"use client";

import React, { useState } from "react";
import { MapPin, Compass, Navigation, SunMedium, Layers, Search } from "lucide-react";
import { LowPowerEarthFallback } from "@/components/3d/LowPowerEarthFallback";

export default function ExplorePage() {
  const [selectedCity, setSelectedCity] = useState("St. Moritz, Switzerland");

  const sanctums = [
    { name: "St. Moritz, Switzerland", lat: 46.4908, lng: 9.8355, temp: "-3°C", status: "Alpine High Season" },
    { name: "North Malé Atoll, Maldives", lat: 4.1755, lng: 73.5093, temp: "29°C", status: "Calm Lagoon Waters" },
    { name: "Arashiyama, Kyoto, Japan", lat: 35.0116, lng: 135.6777, temp: "16°C", status: "Autumn Foliage Peak" },
    { name: "Amalfi Caldera, Positano", lat: 40.6281, lng: 14.485, temp: "22°C", status: "Clear Skies" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-soft block mb-1">
            Geospatial Telemetry
          </span>
          <h1 className="font-display text-3xl font-light text-ivory">
            3D Global Sanctum Explorer
          </h1>
          <p className="text-muted text-xs font-light mt-1">
            Mapbox 3D vector terrain with Michelin culinary pins, private helipads, and live climate telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 border border-gold/30 bg-gold/10 text-xs font-mono text-gold-soft">
          <Navigation className="w-3.5 h-3.5 text-gold" />
          <span>Vector GPS Active</span>
        </div>
      </div>

      {/* Interactive Map Canvas Container */}
      <div className="relative h-[550px] w-full bg-[#07090D] border border-gold/30 overflow-hidden flex flex-col justify-between p-6">
        {/* Floating Top Controls */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            {sanctums.map((s) => (
              <button
                key={s.name}
                onClick={() => setSelectedCity(s.name)}
                className={`px-3 py-1.5 text-xs font-mono transition-all ${
                  selectedCity === s.name
                    ? "bg-gold text-bg font-bold shadow-gold-subtle"
                    : "bg-surface-elevated/80 border border-white/10 text-muted hover:text-ivory"
                }`}
              >
                {s.name.split(",")[0]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 px-3 py-1 bg-surface-elevated/80 border border-white/10 text-[11px] font-mono text-ivory">
            <Layers className="w-3.5 h-3.5 text-gold" />
            <span>3D Terrain • Dark Horizon</span>
          </div>
        </div>

        {/* Center 3D Globe representation */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <LowPowerEarthFallback />
        </div>

        {/* Floating Bottom Telemetry Info */}
        <div className="p-4 bg-surface-elevated/90 backdrop-blur-md border border-gold/30 max-w-md z-10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-gold-soft uppercase tracking-wider font-semibold">
              {selectedCity}
            </span>
            <span className="text-[10px] text-muted font-mono">Live Sync</span>
          </div>
          <p className="text-xs text-muted leading-relaxed font-light">
            Private aviation clearance coordinates locked. Helipad transfers available directly to chalet & overwater sanctuary docks.
          </p>
        </div>
      </div>
    </div>
  );
}
