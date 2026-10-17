"use client";

import React, { useState } from "react";
import { Radar, ShieldCheck, AlertCircle, Plane, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RadarPage() {
  const [radarStatus, setRadarStatus] = useState<"clear" | "warning">("clear");

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold/10 border border-gold/30 text-[10px] font-mono uppercase text-gold-soft mb-2">
            Signature Feature 01
          </div>
          <h1 className="font-display text-3xl font-light text-ivory">
            Live Disruption Rescue Radar
          </h1>
          <p className="text-muted text-xs font-light mt-1">
            24/7 background telemetry tracking private jet airspace, commercial delays, and proactive 1-click VIP auto-rebooking.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-950/40 border border-emerald-500/40 text-xs font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Radar Active (Scan Frequency: 60s)</span>
        </div>
      </div>

      {/* Radar Main Visual Card */}
      <div className="p-8 bg-surface-elevated border border-gold/30 relative overflow-hidden space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center">
              <Radar className="w-5 h-5 text-gold animate-spin [animation-duration:12s]" />
            </div>
            <div>
              <h3 className="font-display text-xl text-ivory font-light">
                Sector Telemetry: BOM (Mumbai) ➔ ZRH (Zurich)
              </h3>
              <span className="text-[10px] text-gold-soft font-mono">
                Monitoring Flight LX 155 • Swiss International Air Lines
              </span>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono">
            On Schedule
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
          <div className="p-3 bg-surface border border-white/5">
            <span className="text-[10px] font-mono text-muted uppercase block">Departure Runway Telemetry</span>
            <span className="text-xs font-bold text-ivory mt-0.5 block">Clear — No Tarmac Delay</span>
          </div>

          <div className="p-3 bg-surface border border-white/5">
            <span className="text-[10px] font-mono text-muted uppercase block">Alpine Airspace Congestion</span>
            <span className="text-xs font-bold text-emerald-400 mt-0.5 block">0% Delay Probability</span>
          </div>

          <div className="p-3 bg-surface border border-white/5">
            <span className="text-[10px] font-mono text-muted uppercase block">Auto-Rebook Contingency</span>
            <span className="text-xs font-bold text-gold-soft mt-0.5 block">2 Private VIP Holds Active</span>
          </div>
        </div>

        {/* Contingency Standby Alert */}
        <div className="p-4 bg-surface border border-gold/20 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
          <div className="text-xs text-muted leading-relaxed font-light">
            <span className="text-gold-soft font-mono font-medium block">
              Proactive Standby Protocol
            </span>
            If any delay exceeds 45 minutes, Voyara automatically locks the
            earliest alternative lie-flat connection through Dubai or Milan and
            transfers limousine standing orders with zero action required from you.
          </div>
        </div>
      </div>
    </div>
  );
}
