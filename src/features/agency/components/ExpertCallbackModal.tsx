"use client";

import React, { useState } from "react";
import { X, PhoneCall, CheckCircle2, Clock, ShieldCheck, MessageCircle, ArrowRight } from "lucide-react";
import { AGENCY_DETAILS } from "../data/agencyData";

interface ExpertCallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDestination?: string;
}

export function ExpertCallbackModal({
  isOpen,
  onClose,
  defaultDestination,
}: ExpertCallbackModalProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [timeSlot, setTimeSlot] = useState("Immediate (Within 15 Mins)");
  const [destination, setDestination] = useState(defaultDestination || "Kashmir & Gulmarg");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleWhatsAppInstant = () => {
    const text = encodeURIComponent(
      `Hello ${AGENCY_DETAILS.name}! My name is ${fullName || "Traveler"}. I requested a specialist callback for ${destination} during ${timeSlot}. Looking forward to connecting.`
    );
    window.open(`https://wa.me/919820086927?text=${text}`, "_blank");
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={resetAndClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#071F22] border border-teal-soft/60 p-6 sm:p-8 my-8 shadow-2xl text-sand space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-teal-soft/30 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-terracotta font-semibold">
              <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
              <span>Direct Human Advisory</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-light text-sand">
              Plan With a Destination Expert
            </h2>
            <p className="text-sand/70 text-xs font-light">
              Schedule a 10-minute briefing with a senior travel curator. Zero commercial pressure.
            </p>
          </div>

          <button
            type="button"
            onClick={resetAndClose}
            className="p-1.5 text-sand/60 hover:text-sand bg-[#092A2D] border border-teal-soft/40 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-sand/70 block mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Vikram Singhania"
                className="w-full bg-[#061D1F] border border-teal-soft/40 p-3 text-xs text-sand placeholder:text-sand/30 focus:border-terracotta outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-sand/70 block mb-1">
                WhatsApp or Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98200 XXXXX"
                className="w-full bg-[#061D1F] border border-teal-soft/40 p-3 text-xs text-sand placeholder:text-sand/30 focus:border-terracotta outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-sand/70 block mb-1">
                Preferred Call Window
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full bg-[#061D1F] border border-teal-soft/40 p-3 text-xs text-sand focus:border-terracotta outline-none"
              >
                <option value="Immediate (Within 15 Mins)">Immediate (Within 15 Mins)</option>
                <option value="Morning Slot (10:00 AM – 01:00 PM)">Morning Slot (10:00 AM – 01:00 PM)</option>
                <option value="Afternoon Slot (02:00 PM – 05:00 PM)">Afternoon Slot (02:00 PM – 05:00 PM)</option>
                <option value="Evening Slot (06:00 PM – 09:00 PM)">Evening Slot (06:00 PM – 09:00 PM)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-sand/70 block mb-1">
                Destination Focus
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-[#061D1F] border border-teal-soft/40 p-3 text-xs text-sand focus:border-terracotta outline-none"
              >
                <option value="Kashmir & Gulmarg">Kashmir & Gulmarg</option>
                <option value="Swiss Alps & Engadin">Swiss Alps & Engadin</option>
                <option value="Baa & Noonu Atolls (Maldives)">Maldives Overwater</option>
                <option value="Royal Rajasthan Palaces">Royal Rajasthan</option>
                <option value="Kingdom of Bhutan">Kingdom of Bhutan</option>
                <option value="Custom Multi-Country Itinerary">Custom Multi-Country</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-terracotta hover:bg-terracotta-soft text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                {loading ? (
                  <span>Dispatching Request...</span>
                ) : (
                  <>
                    <span>Confirm Callback Request</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-sand/50">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-terracotta" />
                Avg Response: 18 Minutes
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Confidential & Secure
              </span>
            </div>
          </form>
        ) : (
          <div className="p-6 bg-[#092A2D] border border-teal-soft/40 text-center space-y-4 animate-in fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="font-display text-2xl text-sand font-light">
                Callback Confirmed
              </h3>
              <p className="text-sand/70 text-xs font-light max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="text-sand">{fullName}</strong>. A dedicated senior curator specializing in <strong className="text-terracotta-soft">{destination}</strong> has received your briefing and will call you during your selected window ({timeSlot}).
              </p>
            </div>

            <div className="pt-3 border-t border-teal-soft/20 flex flex-col sm:flex-row items-center gap-3 justify-center">
              <button
                type="button"
                onClick={handleWhatsAppInstant}
                className="w-full sm:w-auto px-4 py-2 bg-[#061D1F] border border-teal-soft/60 hover:border-[#25D366] text-sand hover:text-[#25D366] font-mono text-xs transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Start Direct WhatsApp Chat</span>
              </button>

              <button
                type="button"
                onClick={resetAndClose}
                className="w-full sm:w-auto px-4 py-2 bg-sand/10 hover:bg-sand/20 text-sand font-mono text-xs transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
