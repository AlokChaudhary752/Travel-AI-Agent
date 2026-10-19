"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Plane,
  Car,
  Clock,
  CheckCircle2,
  X,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRadarStore } from "../store/useRadarStore";

interface AutoRebookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AutoRebookModal({ isOpen, onClose }: AutoRebookModalProps) {
  const { contingencyHolds, authorizeAutoRebook, rebookedSector } =
    useRadarStore();
  const [selectedHoldId, setSelectedHoldId] = useState<string>(
    contingencyHolds[0]?.id || ""
  );
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleAuthorize = () => {
    authorizeAutoRebook(selectedHoldId);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-bg/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0B1317] border border-gold/40 max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-muted hover:text-ivory"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-terracotta/20 border border-terracotta/40 text-[9px] font-mono uppercase text-terracotta-soft mb-1.5">
            <Zap className="w-3 h-3 text-terracotta" />
            Voyara Elite Disruption Guarantee
          </div>
          <h3 className="font-display text-2xl text-ivory font-light">
            Authorize Proactive VIP Rebook
          </h3>
          <p className="text-muted text-xs font-light mt-1">
            Because alpine blizzard conditions threaten your St. Moritz helicopter transfer,
            Voyara has placed two alternative lie-flat suites on immediate private hold.
          </p>
        </div>

        {isSuccess ? (
          <div className="p-8 bg-emerald-950/40 border border-emerald-500/50 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-display text-xl text-ivory">
              VIP Rebook Authorized & Confirmed
            </h4>
            <p className="text-xs text-muted max-w-md mx-auto">
              Your boarding passes have been updated, Maybach S-Class driver re-dispatched to the new arrival terminal, and your Engadin helipad slot rescheduled. Zero out-of-pocket cost.
            </p>
          </div>
        ) : (
          <>
            {/* Contingency Options */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase text-muted tracking-widest block">
                Active Pre-Held Contingency Options (Zero Surcharge):
              </span>

              {contingencyHolds.map((hold) => {
                const isSelected = selectedHoldId === hold.id;

                return (
                  <div
                    key={hold.id}
                    onClick={() => setSelectedHoldId(hold.id)}
                    className={`p-4 border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-surface-elevated border-gold shadow-gold-subtle"
                        : "bg-surface border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-display text-base text-ivory font-medium">
                            {hold.carrier}
                          </span>
                          <span className="text-[10px] font-mono text-gold-soft px-1.5 py-0.5 bg-gold/15 border border-gold/30">
                            {hold.cabin}
                          </span>
                        </div>
                        <div className="text-xs text-muted font-mono flex items-center gap-1.5">
                          <span>{hold.flightNumber}</span>
                          <span>•</span>
                          <span>{hold.routing}</span>
                        </div>
                        <div className="text-[11px] text-ivory/80 pt-1 flex items-center gap-3">
                          <span className="flex items-center gap-1 text-muted">
                            <Clock className="w-3 h-3 text-gold" /> Dep: {hold.departureTime}
                          </span>
                          <span className="flex items-center gap-1 text-emerald-400">
                            <Car className="w-3 h-3" /> {hold.tarmacTransferStatus}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-mono text-emerald-400 block font-semibold uppercase">
                          VIP Covered
                        </span>
                        <span className="text-[9px] font-mono text-muted">
                          Hold expires in {hold.holdExpiresInMinutes}m
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Rebook Details Footer */}
            <div className="p-4 bg-surface border border-white/5 space-y-2 text-xs">
              <div className="flex items-center justify-between text-muted">
                <span>St. Moritz Helicopter Reschedule:</span>
                <span className="text-emerald-400 font-mono">Synchronized (+2h Slot Confirmed)</span>
              </div>
              <div className="flex items-center justify-between text-muted">
                <span>Luggage VIP Porter Forwarding:</span>
                <span className="text-emerald-400 font-mono">Direct Jet-to-Chalet</span>
              </div>
              <div className="flex items-center justify-between text-muted">
                <span>Fare Difference:</span>
                <span className="text-gold font-mono font-bold">₹0 (Voyara Reserve Covered)</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button type="button" variant="ghost" size="sm" onClick={onClose}>
                Keep Current Itinerary
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleAuthorize}
                className="bg-gold hover:bg-gold-light text-bg font-mono font-semibold"
              >
                <ShieldCheck className="w-4 h-4 mr-1.5" />
                Authorize Instant VIP Rebook
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
