"use client";

import React, { useState, useMemo } from "react";
import { ItineraryStop, AmenityPin } from "../../itinerary/types";
import {
  Compass,
  MapPin,
  Utensils,
  Plane,
  Sparkles,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Clock,
  Car,
} from "lucide-react";

interface LuxuryInteractiveMapProps {
  stops: ItineraryStop[];
  selectedStopId?: string | null;
  onSelectStop?: (stopId: string) => void;
  dayTitle?: string;
}

type NormalizedStop = ItineraryStop & { pos: { x: number; y: number } };

// Sample St. Moritz luxury amenities for layer filtering
const AMENITY_PINS: AmenityPin[] = [
  {
    id: "amenity-1",
    name: "Engadin Airport Samedan (LSZS / FBO)",
    type: "fbo",
    coords: [46.5342, 9.8841],
    description: "Europe's highest elevation VIP executive jet terminal & helipad.",
  },
  {
    id: "amenity-2",
    name: "St. Moritz Heliport (Swiss Helicopter)",
    type: "helipad",
    coords: [46.4965, 9.8402],
    description: "Direct mountain transfer & heli-skiing launchpad.",
  },
  {
    id: "amenity-3",
    name: "Da Vittorio St. Moritz (★★ Michelin)",
    type: "michelin",
    coords: [46.4947, 9.8392],
    description: "Italian haute cuisine in Carlton Hotel.",
    rating: "2 Michelin Stars",
  },
  {
    id: "amenity-4",
    name: "The Palace Wellness & Alpine Spa",
    type: "spa",
    coords: [46.4981, 9.8427],
    description: "Indoor infinity pool overlooking Lake St. Moritz.",
    rating: "Leading Spas of the World",
  },
];

export function LuxuryInteractiveMap({
  stops,
  selectedStopId,
  onSelectStop,
  dayTitle,
}: LuxuryInteractiveMapProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showHelipads, setShowHelipads] = useState(true);
  const [showMichelin, setShowMichelin] = useState(true);
  const [showSpas, setShowSpas] = useState(true);
  const [hoveredStop, setHoveredStop] = useState<NormalizedStop | null>(null);

  // Calculate bounding box and normalize coordinates to 0..100% SVG viewport
  const { normalizedStops, normalizedAmenities, routePathD } = useMemo(() => {
    const allCoords = [
      ...stops.map((s) => s.coords),
      ...AMENITY_PINS.map((a) => a.coords),
    ];

    if (allCoords.length === 0) {
      return { normalizedStops: [], normalizedAmenities: [], routePathD: "" };
    }

    const lats = allCoords.map((c) => c[0]);
    const lngs = allCoords.map((c) => c[1]);

    const minLat = Math.min(...lats) - 0.015;
    const maxLat = Math.max(...lats) + 0.015;
    const minLng = Math.min(...lngs) - 0.015;
    const maxLng = Math.max(...lngs) + 0.015;

    const latSpan = maxLat - minLat || 0.01;
    const lngSpan = maxLng - minLng || 0.01;

    // Convert [lat, lng] to [xPercent, yPercent] with margins
    const toPercent = (coords: [number, number]) => {
      const x = 12 + ((coords[1] - minLng) / lngSpan) * 76;
      // Invert lat for Y coordinate (north is up)
      const y = 88 - ((coords[0] - minLat) / latSpan) * 76;
      return { x, y };
    };

    const normStops = stops.map((stop) => ({
      ...stop,
      pos: toPercent(stop.coords),
    }));

    const normAmenities = AMENITY_PINS.map((amenity) => ({
      ...amenity,
      pos: toPercent(amenity.coords),
    }));

    // Build curved SVG path connecting stops in order
    let path = "";
    if (normStops.length > 0) {
      path = `M ${normStops[0].pos.x} ${normStops[0].pos.y}`;
      for (let i = 1; i < normStops.length; i++) {
        const prev = normStops[i - 1].pos;
        const curr = normStops[i].pos;
        const midX = (prev.x + curr.x) / 2;
        const midY = (prev.y + curr.y) / 2 - 4; // slight upward luxury curve
        path += ` Q ${midX} ${midY}, ${curr.x} ${curr.y}`;
      }
    }

    return {
      normalizedStops: normStops,
      normalizedAmenities: normAmenities,
      routePathD: path,
    };
  }, [stops]);

  return (
    <div className="relative w-full h-full min-h-[480px] bg-[#070A0F] border border-gold/20 overflow-hidden flex flex-col justify-between">
      {/* Top Map HUD Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 bg-[#0B0F15]/90 border border-gold/30 backdrop-blur-md">
          <Compass className="w-3.5 h-3.5 text-gold animate-spin [animation-duration:12s]" />
          <span className="text-[11px] font-mono tracking-widest text-ivory uppercase">
            {dayTitle || "Live Route Radar"}
          </span>
          <span className="text-[9px] px-1.5 py-0.5 bg-gold/20 text-gold font-mono font-bold">
            2-OPT ACTIVE
          </span>
        </div>

        {/* Layer Filter Toggles */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-[#0B0F15]/90 border border-white/10 p-1 backdrop-blur-md text-[10px] font-mono">
          <button
            type="button"
            onClick={() => setShowHelipads(!showHelipads)}
            className={`px-2 py-1 flex items-center gap-1 transition-all ${
              showHelipads ? "bg-gold/20 text-gold" : "text-muted hover:text-ivory"
            }`}
            title="Toggle Helipads & FBOs"
          >
            <Plane className="w-3 h-3" />
            <span className="hidden sm:inline">Helipads</span>
          </button>

          <button
            type="button"
            onClick={() => setShowMichelin(!showMichelin)}
            className={`px-2 py-1 flex items-center gap-1 transition-all ${
              showMichelin ? "bg-gold/20 text-gold" : "text-muted hover:text-ivory"
            }`}
            title="Toggle Michelin Restaurants"
          >
            <Utensils className="w-3 h-3" />
            <span className="hidden sm:inline">Michelin</span>
          </button>

          <button
            type="button"
            onClick={() => setShowSpas(!showSpas)}
            className={`px-2 py-1 flex items-center gap-1 transition-all ${
              showSpas ? "bg-gold/20 text-gold" : "text-muted hover:text-ivory"
            }`}
            title="Toggle Spas & Sanctuaries"
          >
            <Sparkles className="w-3 h-3" />
            <span className="hidden sm:inline">Spas</span>
          </button>
        </div>
      </div>

      {/* Map Vector Canvas */}
      <div className="relative w-full flex-1 overflow-hidden">
        {/* Subtle Luxury Topographic Contour Grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #C9A24B 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />

        {/* Ambient Dark Terrain Elevation Ring Simulation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] border border-gold/[0.04] rounded-full blur-[1px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[340px] border border-gold/[0.07] rounded-full blur-[1px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[220px] border border-gold/[0.1] rounded-full blur-[1px]" />
        </div>

        {/* Interactive SVG Layers */}
        <svg
          className="w-full h-full transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9A24B" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#E6CF8E" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#C9A24B" stopOpacity="0.4" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Route Trajectory Line */}
          {routePathD && (
            <>
              {/* Outer Glow */}
              <path
                d={routePathD}
                fill="none"
                stroke="#C9A24B"
                strokeWidth="1.2"
                strokeOpacity="0.3"
                filter="url(#glow)"
              />
              {/* Core Sharp Line */}
              <path
                d={routePathD}
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="0.6"
                strokeDasharray="2 1.2"
                className="animate-[dash_20s_linear_infinite]"
              />
            </>
          )}

          {/* Amenity Pins Layer */}
          {normalizedAmenities.map((amenity) => {
            if (
              (amenity.type === "fbo" || amenity.type === "helipad") &&
              !showHelipads
            )
              return null;
            if (amenity.type === "michelin" && !showMichelin) return null;
            if (amenity.type === "spa" && !showSpas) return null;

            return (
              <g
                key={amenity.id}
                transform={`translate(${amenity.pos.x}, ${amenity.pos.y})`}
                className="cursor-pointer group"
              >
                <circle
                  r="1.6"
                  fill="#0B0F15"
                  stroke="#8A8F98"
                  strokeWidth="0.4"
                  className="group-hover:stroke-gold transition-colors"
                />
                <circle
                  r="0.8"
                  fill={
                    amenity.type === "michelin"
                      ? "#E6CF8E"
                      : amenity.type === "spa"
                      ? "#86EFAC"
                      : "#60A5FA"
                  }
                />
              </g>
            );
          })}

          {/* Itinerary Stops Pins */}
          {normalizedStops.map((stop, index) => {
            const isSelected = stop.id === selectedStopId;
            const isHovered = hoveredStop?.id === stop.id;

            return (
              <g
                key={stop.id}
                transform={`translate(${stop.pos.x}, ${stop.pos.y})`}
                onClick={() => onSelectStop?.(stop.id)}
                onMouseEnter={() => setHoveredStop(stop)}
                onMouseLeave={() => setHoveredStop(null)}
                className="cursor-pointer"
              >
                {/* Active Ripple Animation */}
                {(isSelected || isHovered) && (
                  <circle
                    r="4.5"
                    fill="none"
                    stroke="#C9A24B"
                    strokeWidth="0.4"
                    className="animate-ping opacity-50"
                  />
                )}

                {/* Outer Ring */}
                <circle
                  r="2.8"
                  fill="#0B0F15"
                  stroke={isSelected ? "#E6CF8E" : "#C9A24B"}
                  strokeWidth={isSelected ? "0.8" : "0.5"}
                />

                {/* Inner Stop Number Badge */}
                <circle
                  r="1.9"
                  fill={isSelected ? "#C9A24B" : "#1A222D"}
                />
                <text
                  textAnchor="middle"
                  dy="0.7"
                  fontSize="1.6"
                  fontWeight="bold"
                  fill={isSelected ? "#070A0F" : "#F5F1E8"}
                  fontFamily="monospace"
                >
                  {index + 1}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover / Inspection Card Drawer */}
        {hoveredStop && (
          <div
            className="absolute z-30 pointer-events-none p-3 bg-[#0B0F15]/95 border border-gold/40 shadow-2xl backdrop-blur-xl max-w-xs animate-in fade-in duration-150"
            style={{
              left: `${Math.min(70, Math.max(10, hoveredStop.pos ? hoveredStop.pos.x : 50))}%`,
              top: `${Math.min(65, Math.max(20, hoveredStop.pos ? hoveredStop.pos.y : 50))}%`,
              transform: "translate(-50%, -120%)",
            }}
          >
            <div className="flex items-center justify-between pb-1.5 border-b border-white/10 mb-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-gold-soft font-bold">
                {hoveredStop.category}
              </span>
              <span className="text-[10px] text-muted font-mono flex items-center gap-1">
                <Clock className="w-2.5 h-2.5 text-gold" />
                {hoveredStop.startTime} - {hoveredStop.endTime}
              </span>
            </div>
            <div className="font-display text-base text-ivory font-light leading-snug">
              {hoveredStop.title}
            </div>
            <div className="text-[11px] text-muted font-sans mt-0.5">
              {hoveredStop.locationName}
            </div>
            {hoveredStop.notes && (
              <div className="text-[10px] text-gold-soft/80 mt-1.5 font-mono italic">
                “{hoveredStop.notes}”
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Map Controls Bar */}
      <div className="p-3 bg-[#0B0F15]/90 border-t border-white/10 flex items-center justify-between z-20">
        <div className="flex items-center gap-4 text-xs font-mono text-muted">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gold" />
            Itinerary Waypoints ({stops.length})
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            Helipads / FBOs
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-300" />
            Michelin Dining
          </span>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(0.9, z - 0.2))}
            className="p-1.5 bg-surface border border-white/10 hover:border-gold/40 text-muted hover:text-ivory transition-all"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(2.2, z + 0.2))}
            className="p-1.5 bg-surface border border-white/10 hover:border-gold/40 text-muted hover:text-ivory transition-all"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel(1)}
            className="p-1.5 bg-surface border border-white/10 hover:border-gold/40 text-muted hover:text-ivory transition-all"
            title="Reset Frame"
            aria-label="Reset Frame"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
