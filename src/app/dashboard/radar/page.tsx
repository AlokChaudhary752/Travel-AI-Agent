"use client";

import React, { useState } from "react";
import { Radar, ShieldCheck, Activity, Bell } from "lucide-react";
import { AirspaceTelemetryCard } from "@/features/radar/components/AirspaceTelemetryCard";
import { PriceAlertTracker } from "@/features/radar/components/PriceAlertTracker";
import { AutoRebookModal } from "@/features/radar/components/AutoRebookModal";

export default function RadarPage() {
  const [rebookModalOpen, setRebookModalOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-none bg-gold/15 border border-gold/30 text-[10px] font-mono uppercase text-gold-soft mb-2">
            <Activity className="w-3 h-3 text-gold" />
            Signature Feature 01 • Autonomous Airspace Guardian
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-light text-ivory">
            Live Disruption Rescue Radar & Fare Watchdog
          </h1>
          <p className="text-muted text-xs font-light mt-1.5 max-w-2xl leading-relaxed">
            Continuous ADS-B transponder telemetry, alpine airspace congestion analysis,
            and proactive 1-click VIP auto-rebooking protocols paired with autonomous GDS price drop tracking.
          </p>
        </div>

        <div className="flex items-center gap-2.5 px-3.5 py-2 bg-surface-elevated border border-gold/30 text-xs font-mono text-gold-soft self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>ADS-B Scan: 30s • Telemetry Synced</span>
        </div>
      </div>

      {/* Main Airspace Telemetry & Simulation Guardian */}
      <AirspaceTelemetryCard
        onOpenRebookModal={() => setRebookModalOpen(true)}
      />

      {/* Price Alert Trajectory & Watchdog Engine */}
      <PriceAlertTracker />

      {/* Auto Rebook Modal */}
      <AutoRebookModal
        isOpen={rebookModalOpen}
        onClose={() => setRebookModalOpen(false)}
      />
    </div>
  );
}
