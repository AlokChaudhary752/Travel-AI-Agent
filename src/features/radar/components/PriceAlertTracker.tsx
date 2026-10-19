"use client";

import React, { useState } from "react";
import {
  TrendingDown,
  Bell,
  Plus,
  ArrowRight,
  CheckCircle,
  X,
  ExternalLink,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRadarStore } from "../store/useRadarStore";
import { PriceAlert } from "../types";

export function PriceAlertTracker() {
  const { priceAlerts, addPriceAlert, dismissPriceAlert } = useRadarStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [bookedId, setBookedId] = useState<string | null>(null);

  // Form state
  const [origin, setOrigin] = useState("BOM");
  const [destination, setDestination] = useState("LHR");
  const [airline, setAirline] = useState("British Airways");
  const [cabin, setCabin] = useState<PriceAlert["cabin"]>("Business Class");
  const [targetPrice, setTargetPrice] = useState("180000");

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseInt(targetPrice) || 150000;
    addPriceAlert({
      route: `${origin} ➔ ${destination}`,
      originCode: origin,
      destCode: destination,
      airline,
      cabin,
      currentPriceINR: target + 18000,
      previousPriceINR: target + 25000,
      targetAlertPriceINR: target,
      priceTrend: [
        target + 35000,
        target + 30000,
        target + 28000,
        target + 25000,
        target + 21000,
        target + 19000,
        target + 18000,
      ],
      alertDate: "Just added",
    });
    setModalOpen(false);
  };

  const renderSparkline = (points: number[]) => {
    if (!points || points.length < 2) return null;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 120;
    const height = 28;

    const coords = points.map((val, idx) => {
      const x = (idx / (points.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    });

    return (
      <svg
        width={width}
        height={height}
        className="overflow-visible inline-block"
      >
        <polyline
          fill="none"
          stroke="#C9A24B"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={coords.join(" ")}
        />
        {/* End dot */}
        {coords.length > 0 && (
          <circle
            cx={coords[coords.length - 1].split(",")[0]}
            cy={coords[coords.length - 1].split(",")[1]}
            r="3"
            fill="#C9A24B"
            className="animate-pulse"
          />
        )}
      </svg>
    );
  };

  return (
    <div className="bg-[#0B1317]/90 border border-white/10 p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-none bg-gold/15 border border-gold/30 text-[9px] font-mono uppercase text-gold-soft mb-1">
            <Bell className="w-3 h-3 text-gold" />
            Active Fare Watchlist
          </div>
          <h3 className="font-display text-2xl font-light text-ivory">
            Autonomous Price Drop Trajectory
          </h3>
          <p className="text-muted text-xs font-light mt-0.5">
            Voyara scrapes direct GDS feeds & private consolidator inventories every 30 seconds to lock dips before public visibility.
          </p>
        </div>

        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={() => setModalOpen(true)}
          className="font-mono text-xs flex-shrink-0"
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Track New Route
        </Button>
      </div>

      {/* Alert Cards Grid */}
      <div className="space-y-3">
        {priceAlerts.map((alert) => {
          const isTriggered = alert.status === "triggered";
          const isBooked = bookedId === alert.id;

          return (
            <div
              key={alert.id}
              className={`p-4 md:p-5 border transition-all ${
                isTriggered
                  ? "bg-surface-elevated border-gold/40 shadow-gold-subtle"
                  : "bg-surface border-white/5 hover:border-white/20"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Route & Cabin */}
                <div className="space-y-1 min-w-[240px]">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-lg text-ivory font-medium">
                      {alert.route}
                    </span>
                    {isTriggered && (
                      <span className="px-2 py-0.5 text-[9px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        Target Met
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted font-mono flex items-center gap-2">
                    <span>{alert.airline}</span>
                    <span>•</span>
                    <span className="text-gold-soft">{alert.cabin}</span>
                    <span>•</span>
                    <span className="text-[10px] text-muted">{alert.alertDate}</span>
                  </div>
                </div>

                {/* 7-Day Sparkline */}
                <div className="hidden sm:flex flex-col items-center justify-center px-4 border-x border-white/5">
                  <span className="text-[9px] font-mono text-muted uppercase tracking-wider mb-1">
                    7-Day Trajectory
                  </span>
                  {renderSparkline(alert.priceTrend)}
                </div>

                {/* Pricing Details */}
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-[10px] font-mono text-muted uppercase block">
                      Current Live Fare
                    </span>
                    <div className="font-mono text-lg font-bold text-ivory tabular-nums">
                      ₹{alert.currentPriceINR.toLocaleString("en-IN")}
                    </div>
                    {alert.priceDropINR > 0 && (
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <TrendingDown className="w-3 h-3" />
                        Save ₹{alert.priceDropINR.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-muted uppercase block">
                      Target Threshold
                    </span>
                    <div className="font-mono text-sm text-gold-soft tabular-nums">
                      ₹{alert.targetAlertPriceINR.toLocaleString("en-IN")}
                    </div>
                    <span className="text-[10px] font-mono text-muted">
                      {alert.currentPriceINR <= alert.targetAlertPriceINR
                        ? "Under Target"
                        : "Watching Dip"}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {isBooked ? (
                      <span className="px-3 py-1.5 text-xs font-mono bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" /> Locked
                      </span>
                    ) : (
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => setBookedId(alert.id)}
                        className="font-mono text-xs hover:border-gold"
                      >
                        Lock Fare
                      </Button>
                    )}

                    <button
                      type="button"
                      onClick={() => dismissPriceAlert(alert.id)}
                      className="p-1.5 text-muted hover:text-terracotta transition-colors"
                      title="Remove Alert"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Alert Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-bg/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0B1317] border border-gold/40 max-w-md w-full p-6 space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-muted hover:text-ivory"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold-soft">
                Automated Fare Watchdog
              </span>
              <h3 className="font-display text-2xl text-ivory font-light mt-0.5">
                Track Luxury Fare
              </h3>
            </div>

            <form onSubmit={handleCreateAlert} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono uppercase text-muted block mb-1">
                    Origin IATA
                  </label>
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value.toUpperCase())}
                    className="w-full bg-surface border border-white/10 px-3 py-2 text-xs font-mono text-ivory focus:border-gold outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase text-muted block mb-1">
                    Destination IATA
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value.toUpperCase())}
                    className="w-full bg-surface border border-white/10 px-3 py-2 text-xs font-mono text-ivory focus:border-gold outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-muted block mb-1">
                  Preferred Carrier
                </label>
                <input
                  type="text"
                  value={airline}
                  onChange={(e) => setAirline(e.target.value)}
                  className="w-full bg-surface border border-white/10 px-3 py-2 text-xs text-ivory focus:border-gold outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono uppercase text-muted block mb-1">
                    Cabin Class
                  </label>
                  <select
                    value={cabin}
                    onChange={(e) => setCabin(e.target.value as any)}
                    className="w-full bg-surface border border-white/10 px-2 py-2 text-xs text-ivory focus:border-gold outline-none font-mono"
                  >
                    <option value="First Class">First Class</option>
                    <option value="Business Class">Business Class</option>
                    <option value="Private Charter">Private Charter</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-muted block mb-1">
                    Target Price (₹ INR)
                  </label>
                  <input
                    type="number"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    className="w-full bg-surface border border-white/10 px-3 py-2 text-xs font-mono text-ivory focus:border-gold outline-none"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Activate Watchdog
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
