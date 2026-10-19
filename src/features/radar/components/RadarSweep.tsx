"use client";

import React from "react";
import { SectorStatus } from "../types";

interface RadarSweepProps {
  status: SectorStatus;
  flightNumber: string;
}

export function RadarSweep({ status, flightNumber }: RadarSweepProps) {
  const isAlert = status === "delayed" || status === "diverted";

  return (
    <div className="relative w-44 h-44 sm:w-56 sm:h-56 mx-auto rounded-full bg-[#050D10] border border-gold/30 p-2 shadow-2xl flex items-center justify-center overflow-hidden">
      {/* Concentric distance rings */}
      <div className="absolute inset-4 rounded-full border border-gold/15" />
      <div className="absolute inset-10 rounded-full border border-gold/20" />
      <div className="absolute inset-16 rounded-full border border-gold/25" />

      {/* Crosshairs */}
      <div className="absolute inset-x-0 top-1/2 h-[1px] bg-gold/20 -translate-y-1/2" />
      <div className="absolute inset-y-0 left-1/2 w-[1px] bg-gold/20 -translate-x-1/2" />

      {/* Degrees markings */}
      <span className="absolute top-1 text-[8px] font-mono text-gold-soft/50">000°</span>
      <span className="absolute bottom-1 text-[8px] font-mono text-gold-soft/50">180°</span>
      <span className="absolute left-1 text-[8px] font-mono text-gold-soft/50">270°</span>
      <span className="absolute right-1 text-[8px] font-mono text-gold-soft/50">090°</span>

      {/* Sweeping Cone */}
      <div className="absolute inset-0 origin-center animate-[spin_4s_linear_infinite] pointer-events-none">
        <div
          className="w-1/2 h-1/2 origin-bottom-right"
          style={{
            background: isAlert
              ? "conic-gradient(from 180deg at 100% 100%, rgba(200, 90, 50, 0.4) 0deg, rgba(200, 90, 50, 0) 60deg)"
              : "conic-gradient(from 180deg at 100% 100%, rgba(201, 162, 75, 0.35) 0deg, rgba(201, 162, 75, 0) 60deg)",
          }}
        />
      </div>

      {/* Blip 1: Monitored VIP Flight */}
      <div
        className="absolute top-[32%] left-[62%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 transition-all duration-700"
      >
        <div
          className={`w-2.5 h-2.5 rounded-full ${
            isAlert ? "bg-terracotta animate-ping" : "bg-gold animate-pulse"
          }`}
        />
        <div className="bg-surface/90 border border-gold/40 px-1.5 py-0.5 rounded text-[8px] font-mono text-ivory tracking-tighter shadow-sm whitespace-nowrap">
          {flightNumber}
        </div>
      </div>

      {/* Blip 2: Secondary Traffic (Swiss Alps corridor) */}
      <div className="absolute top-[68%] left-[28%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 opacity-70">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span className="text-[7px] font-mono text-muted">AFR 184</span>
      </div>

      {/* Blip 3: Helicopter Charter Corridor */}
      <div className="absolute top-[48%] left-[76%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 opacity-70">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        <span className="text-[7px] font-mono text-muted">SMV HELO</span>
      </div>

      {/* Center hub */}
      <div className="w-3 h-3 rounded-full bg-gold/30 border border-gold flex items-center justify-center z-10">
        <div className="w-1 h-1 rounded-full bg-gold" />
      </div>
    </div>
  );
}
