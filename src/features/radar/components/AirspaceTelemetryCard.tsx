"use client";

import React, { useState } from "react";
import {
  Radar,
  Plane,
  ShieldCheck,
  AlertTriangle,
  Wind,
  Compass,
  ArrowRight,
  RefreshCw,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadarSweep } from "./RadarSweep";
import { useRadarStore, SimulationMode } from "../store/useRadarStore";

interface AirspaceTelemetryCardProps {
  onOpenRebookModal: () => void;
}

export function AirspaceTelemetryCard({ onOpenRebookModal }: AirspaceTelemetryCardProps) {
  const {
    activeSector,
    simulationMode,
    setSimulationMode,
    rebookedSector,
    resetFlightStatus,
  } = useRadarStore();

  const isDisrupted =
    activeSector.status === "delayed" || activeSector.status === "diverted";

  return (
    <div className="bg-[#0B1317]/90 border border-gold/30 rounded-none p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
      {/* Background glow when alert */}
      {isDisrupted && (
        <div className="absolute top-0 right-0 w-96 h-96 bg-terracotta/10 blur-[100px] pointer-events-none" />
      )}

      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 text-[9px] font-mono uppercase bg-gold/15 text-gold-soft border border-gold/30 tracking-widest">
              Live Transponder Feed
            </span>
            <span className="text-[10px] text-muted font-mono">
              ADS-B Level 4 Active
            </span>
          </div>
          <h2 className="font-display text-2xl text-ivory font-light flex items-center gap-2">
            <span>{activeSector.origin.code}</span>
            <ArrowRight className="w-4 h-4 text-gold" />
            <span>{activeSector.destination.code}</span>
            <span className="text-muted text-lg font-mono">
              ({activeSector.flightNumber})
            </span>
          </h2>
          <p className="text-xs text-muted font-light mt-0.5">
            {activeSector.airline} • {activeSector.aircraft}
          </p>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-3">
          <div
            className={`px-3 py-1.5 text-xs font-mono flex items-center gap-2 border ${
              isDisrupted
                ? "bg-terracotta/15 border-terracotta/50 text-terracotta-soft animate-pulse"
                : "bg-emerald-950/40 border-emerald-500/40 text-emerald-400"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isDisrupted ? "bg-terracotta" : "bg-emerald-400 animate-ping"
              }`}
            />
            <span className="uppercase font-semibold">
              {activeSector.status === "on_time"
                ? "On Schedule"
                : activeSector.status === "diverted"
                ? "Severe Weather Alert"
                : "Tarmac Gate Hold"}
            </span>
          </div>

          {rebookedSector && (
            <span className="px-2.5 py-1 text-[10px] font-mono bg-gold/20 text-gold-soft border border-gold/40">
              VIP Auto-Rebook Confirmed
            </span>
          )}
        </div>
      </div>

      {/* Radar Scope & Real-Time Telemetry Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Radar Sweep Animation */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-[#050D10]/80 border border-white/5">
          <RadarSweep
            status={activeSector.status}
            flightNumber={activeSector.flightNumber}
          />
          <div className="mt-4 flex items-center justify-between w-full text-[10px] font-mono text-muted px-2">
            <span>Airspace: European Free Route</span>
            <span className="text-gold-soft">Squawk: {activeSector.telemetry.squawk}</span>
          </div>
        </div>

        {/* Telemetry Stats Grid */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-surface border border-white/5 space-y-1">
            <span className="text-[10px] font-mono text-muted uppercase flex items-center gap-1">
              <Compass className="w-3 h-3 text-gold" /> Cruising Altitude
            </span>
            <div className="text-lg font-mono font-semibold text-ivory">
              {activeSector.telemetry.altitudeFeet.toLocaleString()} FT
            </div>
            <span className="text-[9px] text-gold-soft font-mono">
              {activeSector.telemetry.flightLevel}
            </span>
          </div>

          <div className="p-3.5 bg-surface border border-white/5 space-y-1">
            <span className="text-[10px] font-mono text-muted uppercase flex items-center gap-1">
              <Plane className="w-3 h-3 text-gold" /> Ground Speed
            </span>
            <div className="text-lg font-mono font-semibold text-ivory">
              {activeSector.telemetry.groundSpeedKnots} KTS
            </div>
            <span className="text-[9px] text-muted font-mono">Mach 0.84</span>
          </div>

          <div className="p-3.5 bg-surface border border-white/5 space-y-1">
            <span className="text-[10px] font-mono text-muted uppercase flex items-center gap-1">
              <Wind className="w-3 h-3 text-gold" /> Arrival Delay
            </span>
            <div
              className={`text-lg font-mono font-semibold ${
                activeSector.telemetry.estimatedArrivalDelayMin > 0
                  ? "text-terracotta"
                  : "text-emerald-400"
              }`}
            >
              +{activeSector.telemetry.estimatedArrivalDelayMin} MIN
            </div>
            <span className="text-[9px] text-muted font-mono">
              {activeSector.telemetry.estimatedArrivalDelayMin > 0
                ? "Contingency Triggered"
                : "Zero Deviation"}
            </span>
          </div>

          <div className="p-3.5 bg-surface border border-white/5 space-y-1 col-span-2 sm:col-span-1">
            <span className="text-[10px] font-mono text-muted uppercase block">
              Remaining Sector
            </span>
            <div className="text-lg font-mono font-semibold text-ivory">
              {activeSector.telemetry.distanceRemainingKm.toLocaleString()} KM
            </div>
            <span className="text-[9px] text-muted font-mono">
              Coordinates: {activeSector.telemetry.currentCoordinates[0]}°N,{" "}
              {activeSector.telemetry.currentCoordinates[1]}°E
            </span>
          </div>

          {/* METAR Weather Info */}
          <div className="p-3.5 bg-surface border border-white/5 space-y-1 col-span-2">
            <span className="text-[10px] font-mono text-muted uppercase block">
              Destination METAR Telemetry ({activeSector.destination.code})
            </span>
            <div className="text-xs text-ivory font-light">
              {activeSector.destination.weather} ({activeSector.destination.temp})
            </div>
            <span className="text-[9px] text-gold-soft font-mono">
              Terminal Gate: {activeSector.destination.gate}
            </span>
          </div>
        </div>
      </div>

      {/* Contingency Standby Alert Banner */}
      {isDisrupted && (
        <div className="p-4 bg-terracotta/10 border border-terracotta/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-ivory tracking-wide uppercase font-mono">
                Proactive Disruption Protocol Activated
              </h4>
              <p className="text-xs text-muted font-light mt-0.5">
                Delay of {activeSector.telemetry.estimatedArrivalDelayMin}m
                threatens your private helicopter connection in St. Moritz.
                Voyara Concierge has secured 2 lie-flat contingency suites.
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onOpenRebookModal}
            className="flex-shrink-0 bg-terracotta hover:bg-terracotta/90 text-white font-mono text-xs"
          >
            <Zap className="w-3.5 h-3.5 mr-1.5" />
            Review & Authorize Rebook
          </Button>
        </div>
      )}

      {/* Simulation Controls Strip */}
      <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted flex items-center gap-1.5">
          <RefreshCw className="w-3 h-3 text-gold" />
          Test Telemetry Simulation Engine:
        </span>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSimulationMode("nominal")}
            className={`px-2.5 py-1 text-[10px] font-mono transition-all ${
              simulationMode === "nominal"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                : "bg-surface text-muted hover:text-ivory border border-white/10"
            }`}
          >
            Clear Sky (Nominal)
          </button>

          <button
            type="button"
            onClick={() => setSimulationMode("weather_alert")}
            className={`px-2.5 py-1 text-[10px] font-mono transition-all ${
              simulationMode === "weather_alert"
                ? "bg-terracotta/20 text-terracotta-soft border border-terracotta/50"
                : "bg-surface text-muted hover:text-ivory border border-white/10"
            }`}
          >
            Simulate Alpine Blizzard
          </button>

          <button
            type="button"
            onClick={() => setSimulationMode("tarmac_delay")}
            className={`px-2.5 py-1 text-[10px] font-mono transition-all ${
              simulationMode === "tarmac_delay"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "bg-surface text-muted hover:text-ivory border border-white/10"
            }`}
          >
            Simulate Tarmac Gate Hold
          </button>
        </div>
      </div>
    </div>
  );
}
