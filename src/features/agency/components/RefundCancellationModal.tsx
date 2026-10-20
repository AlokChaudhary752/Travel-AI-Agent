"use client";

import React from "react";
import { X, ShieldCheck, CheckCircle2, AlertCircle, FileText, Lock, IndianRupee, Phone } from "lucide-react";
import { AGENCY_DETAILS } from "../data/agencyData";

interface RefundCancellationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RefundCancellationModal({ isOpen, onClose }: RefundCancellationModalProps) {
  if (!isOpen) return null;

  const tiers = [
    {
      window: "45+ Days Prior to Departure",
      refundRate: "100% Refund",
      badge: "Full Restitution",
      description:
        "Full 100% restitution of all land arrangements, villa suites, and chauffeured fleets. Only airline non-refundable ticket fare rules apply.",
      color: "text-emerald-400 border-emerald-400/30 bg-emerald-950/20",
    },
    {
      window: "30 to 44 Days Prior",
      refundRate: "80% Refund or 100% Credit",
      badge: "Zero-Loss Rollover",
      description:
        "Choice of 80% cash refund to original payment method or 100% credit transfer to any future Voyara journey valid for 18 months.",
      color: "text-teal-300 border-teal-300/30 bg-teal-950/20",
    },
    {
      window: "15 to 29 Days Prior",
      refundRate: "50% Refund or Free Reschedule",
      badge: "Date Transfer",
      description:
        "50% cash reimbursement or complimentary date rescheduling based on partner hotel seasonal availability.",
      color: "text-amber-300 border-amber-300/30 bg-amber-950/20",
    },
    {
      window: "Under 14 Days Prior",
      refundRate: "Emergency Negotiation",
      badge: "Dispute Mediation",
      description:
        "Our senior destination director personally negotiates directly with luxury property general managers (Aman, Oberoi, Taj, Soneva) to minimize cancellation forfeiture.",
      color: "text-terracotta border-terracotta/30 bg-terracotta/10",
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#071F22] border border-teal-soft/60 p-6 sm:p-8 my-8 shadow-2xl text-sand space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-teal-soft/30 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-terracotta font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Transparent Consumer Safeguards</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-light text-sand">
              Refund & Cancellation Policy
            </h2>
            <p className="text-sand/70 text-xs font-light">
              Clear terms, zero fine-print ambiguity, and direct escrow security.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-sand/60 hover:text-sand bg-[#092A2D] border border-teal-soft/40 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Timeline Tiers */}
        <div className="space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-sand/50 block">
            Staged Restitution Schedule
          </span>
          <div className="space-y-3">
            {tiers.map((t, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#092A2D] border border-teal-soft/40 space-y-1.5 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs text-sand font-medium">
                    {t.window}
                  </span>
                  <span className={`px-2 py-0.5 border text-[10px] font-mono font-semibold ${t.color}`}>
                    {t.refundRate}
                  </span>
                </div>
                <p className="text-sand/70 text-xs font-light leading-relaxed">
                  {t.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Medical & Force Majeure Exemption */}
        <div className="p-4 bg-[#061D1F] border border-teal-soft/30 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-terracotta font-mono text-[11px] font-semibold">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Medical Emergency & Unforeseen Closure Safeguard</span>
          </div>
          <p className="text-sand/70 leading-relaxed font-light">
            In verified events of hospitalization or government-issued high-altitude road/pass closures, 100% of unspent deposits are rolled over to future travel dates with zero administrative penalties upon submission of documentation.
          </p>
        </div>

        {/* Security & Payment Credentials */}
        <div className="pt-4 border-t border-teal-soft/30 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-sand/70">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-terracotta" />
            <span>Protected Client Escrow Accounts</span>
          </div>
          <div className="flex items-center gap-2">
            <IndianRupee className="w-3.5 h-3.5 text-terracotta" />
            <span>RBI-Approved Indian Payment Gateways</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-terracotta" />
            <a href={`tel:${AGENCY_DETAILS.phoneRaw}`} className="hover:text-sand underline">
              Emergency Desk: {AGENCY_DETAILS.phoneDisplay}
            </a>
          </div>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 bg-terracotta hover:bg-terracotta-soft text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
        >
          Acknowledge & Close
        </button>
      </div>
    </div>
  );
}
