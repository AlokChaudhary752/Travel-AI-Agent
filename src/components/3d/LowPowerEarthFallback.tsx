"use client";

import React from "react";

export function LowPowerEarthFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-gold/10 via-blue-900/10 to-transparent blur-3xl pointer-events-none" />

      {/* Stylized 2D Vector Globe with Golden Meridian Rings */}
      <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full border border-gold/30 flex items-center justify-center shadow-[0_0_80px_rgba(201,162,75,0.15)] bg-surface/40 backdrop-blur-sm">
        {/* Longitudinal Ellipses */}
        <div className="absolute inset-x-8 inset-y-0 rounded-full border border-gold/20" />
        <div className="absolute inset-x-20 inset-y-0 rounded-full border border-gold/15" />
        <div className="absolute inset-y-12 inset-x-0 rounded-full border border-gold/20" />
        <div className="absolute inset-y-28 inset-x-0 rounded-full border border-gold/15" />

        {/* City Pulsing Nodes */}
        <div className="absolute top-1/4 left-1/3 flex items-center gap-1.5 animate-pulse">
          <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_#C9A24B]" />
          <span className="text-[10px] uppercase tracking-widest text-gold-soft font-mono">
            BOM (Mumbai)
          </span>
        </div>

        <div className="absolute top-1/3 right-1/4 flex items-center gap-1.5 animate-pulse delay-300">
          <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_#C9A24B]" />
          <span className="text-[10px] uppercase tracking-widest text-gold-soft font-mono">
            ZRH (Zurich)
          </span>
        </div>

        <div className="absolute bottom-1/3 right-1/3 flex items-center gap-1.5 animate-pulse delay-700">
          <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_#C9A24B]" />
          <span className="text-[10px] uppercase tracking-widest text-gold-soft font-mono">
            MLE (Maldives)
          </span>
        </div>

        {/* Connecting Flight Arc SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="goldFlightArc" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9A24B" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#E6CF8E" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#C9A24B" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            d="M 33 25 Q 55 10 75 33"
            fill="none"
            stroke="url(#goldFlightArc)"
            strokeWidth="0.8"
            strokeDasharray="2,2"
          />
          <path
            d="M 33 25 Q 50 50 67 66"
            fill="none"
            stroke="url(#goldFlightArc)"
            strokeWidth="0.8"
            strokeDasharray="2,2"
          />
        </svg>

        {/* Center Monogram */}
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gold/80 font-mono">
            Global Hub
          </span>
          <p className="text-[11px] text-muted tracking-widest">ECO-MODE READY</p>
        </div>
      </div>
    </div>
  );
}
