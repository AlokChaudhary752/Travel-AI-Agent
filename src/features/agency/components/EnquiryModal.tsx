"use client";

import React, { useState } from "react";
import { X, CheckCircle2, MessageCircle, Phone, ArrowRight, ArrowLeft, ShieldCheck, Sparkles, Send } from "lucide-react";
import { AGENCY_DETAILS } from "../data/agencyData";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDestination?: string;
  preselectedPackageTitle?: string;
}

export function EnquiryModal({
  isOpen,
  onClose,
  preselectedDestination,
  preselectedPackageTitle,
}: EnquiryModalProps) {
  // Step State
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1: Voyage Scope
  const [destination, setDestination] = useState(preselectedDestination || "Kashmir & Gulmarg");
  const [travelMonth, setTravelMonth] = useState("December 2026");
  const [partySize, setPartySize] = useState("2 Guests (Couple)");
  const [budgetRange, setBudgetRange] = useState("₹2,00,000 – ₹4,00,000");

  // Step 2: Guest Details & Protocols
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dietary, setDietary] = useState("Vegetarian");
  const [notes, setNotes] = useState(
    preselectedPackageTitle ? `Interested in: ${preselectedPackageTitle}` : ""
  );

  const [validationError, setValidationError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!name.trim()) {
      setValidationError("Please share your full name.");
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setValidationError("Please share a valid WhatsApp or phone number.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello ${AGENCY_DETAILS.name}! My name is ${name || "Traveler"}. I am enquiring about a private journey to ${destination} around ${travelMonth} for ${partySize}. Dietary: ${dietary}. ${notes ? `Notes: ${notes}` : ""}`
    );
    window.open(`https://wa.me/919820086927?text=${text}`, "_blank");
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#092A2D] text-sand border border-teal-soft/40 shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Top gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-soft via-terracotta to-teal-soft" />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 text-sand/60 hover:text-sand transition-colors p-1"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-6">
            {/* Header with Step Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-terracotta font-semibold">
                  Private Travel Consultation
                </span>
                <span className="text-[10px] font-mono text-sand/60">
                  Step {step} of 2
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/10 mb-4 overflow-hidden">
                <div
                  className="h-full bg-terracotta transition-all duration-300"
                  style={{ width: step === 1 ? "50%" : "100%" }}
                />
              </div>

              <h3 className="font-display text-2xl sm:text-3xl text-sand font-light">
                {step === 1 ? "Define Your Voyage Scope" : "Guest Details & Preferences"}
              </h3>
              <p className="text-xs text-sand/70 font-light mt-1">
                {step === 1
                  ? "Select your target destination, ideal window, and party size."
                  : "We coordinate with local hoteliers and private guides in advance."}
              </p>
            </div>

            {validationError && (
              <div className="p-3 bg-red-950/60 border border-red-500/50 text-xs text-red-200 font-mono">
                {validationError}
              </div>
            )}

            {/* Step 1 Form */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-sand/70 block mb-1">
                      Destination
                    </label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-[#061D1F] border border-teal-soft/40 p-2.5 text-xs text-sand focus:border-terracotta outline-none cursor-pointer"
                    >
                      <option value="Kashmir & Gulmarg" className="bg-[#092A2D]">Kashmir & Gulmarg</option>
                      <option value="Swiss Alps & Engadin" className="bg-[#092A2D]">Swiss Alps & Engadin</option>
                      <option value="Maldives Overwater Sanctuary" className="bg-[#092A2D]">Maldives Sanctuary</option>
                      <option value="Royal Rajasthan Palaces" className="bg-[#092A2D]">Royal Rajasthan</option>
                      <option value="Kingdom of Bhutan" className="bg-[#092A2D]">Kingdom of Bhutan</option>
                      <option value="Custom Multi-Stop Journey" className="bg-[#092A2D]">Custom Route</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-sand/70 block mb-1">
                      Travel Window
                    </label>
                    <select
                      value={travelMonth}
                      onChange={(e) => setTravelMonth(e.target.value)}
                      className="w-full bg-[#061D1F] border border-teal-soft/40 p-2.5 text-xs text-sand focus:border-terracotta outline-none cursor-pointer"
                    >
                      <option value="November 2026" className="bg-[#092A2D]">November 2026</option>
                      <option value="December 2026" className="bg-[#092A2D]">December 2026</option>
                      <option value="January 2027" className="bg-[#092A2D]">January 2027</option>
                      <option value="February 2027" className="bg-[#092A2D]">February 2027</option>
                      <option value="Spring 2027" className="bg-[#092A2D]">Spring 2027</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-sand/70 block mb-1">
                      Party Composition
                    </label>
                    <select
                      value={partySize}
                      onChange={(e) => setPartySize(e.target.value)}
                      className="w-full bg-[#061D1F] border border-teal-soft/40 p-2.5 text-xs text-sand focus:border-terracotta outline-none cursor-pointer"
                    >
                      <option value="2 Guests (Couple)" className="bg-[#092A2D]">2 Guests (Couple)</option>
                      <option value="Family (3–4 Guests)" className="bg-[#092A2D]">Family (3–4 Guests)</option>
                      <option value="Private Group (5+ Guests)" className="bg-[#092A2D]">Private Group (5+)</option>
                      <option value="Solo Journey" className="bg-[#092A2D]">Solo Journey</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-sand/70 block mb-1">
                      Target Budget (₹)
                    </label>
                    <select
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="w-full bg-[#061D1F] border border-teal-soft/40 p-2.5 text-xs text-sand focus:border-terracotta outline-none cursor-pointer"
                    >
                      <option value="₹1,80,000 – ₹3,50,000" className="bg-[#092A2D]">₹1.8L – ₹3.5L</option>
                      <option value="₹3,50,000 – ₹7,00,000" className="bg-[#092A2D]">₹3.5L – ₹7.0L</option>
                      <option value="₹7,00,000 – ₹15,00,000" className="bg-[#092A2D]">₹7.0L – ₹15.0L</option>
                      <option value="₹15,00,000+ (Ultra-VIP)" className="bg-[#092A2D]">₹15.0L+ (Private Jet & Chalets)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-teal-soft/20">
                  <span className="text-[10px] font-mono text-sand/50">
                    No payment needed to receive proposal
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-terracotta hover:bg-terracotta-soft text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5"
                  >
                    <span>Next: Guest Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 2 Form */}
            {step === 2 && (
              <form onSubmit={handleFinalSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-sand/70 block mb-1">
                      Full Legal / Preferred Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikram Singhania"
                      className="w-full bg-[#061D1F] border border-teal-soft/40 p-2.5 text-xs text-sand placeholder:text-sand/30 focus:border-terracotta outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-sand/70 block mb-1">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98200 86927"
                      className="w-full bg-[#061D1F] border border-teal-soft/40 p-2.5 text-xs text-sand placeholder:text-sand/30 focus:border-terracotta outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-sand/70 block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vikram@domain.com"
                      className="w-full bg-[#061D1F] border border-teal-soft/40 p-2.5 text-xs text-sand placeholder:text-sand/30 focus:border-terracotta outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-sand/70 block mb-1">
                      Dietary Protocol
                    </label>
                    <select
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                      className="w-full bg-[#061D1F] border border-teal-soft/40 p-2.5 text-xs text-sand focus:border-terracotta outline-none cursor-pointer"
                    >
                      <option value="Strict Jain (No Root Veg)" className="bg-[#092A2D]">Strict Jain (No Root Veg)</option>
                      <option value="Lacto-Vegetarian" className="bg-[#092A2D]">Lacto-Vegetarian</option>
                      <option value="Non-Vegetarian" className="bg-[#092A2D]">Non-Vegetarian</option>
                      <option value="Halal Only" className="bg-[#092A2D]">Halal Only</option>
                      <option value="Gluten-Free / Plant-Based" className="bg-[#092A2D]">Gluten-Free / Plant-Based</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-sand/70 block mb-1">
                    Special Requests or Preferred Accommodations
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Cedarwood lake view cottage, heated plunge pool, infant cot needed..."
                    className="w-full bg-[#061D1F] border border-teal-soft/40 p-2.5 text-xs text-sand placeholder:text-sand/30 focus:border-terracotta outline-none resize-none"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-teal-soft/20">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-mono text-sand/60 hover:text-sand flex items-center gap-1 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-terracotta hover:bg-terracotta-soft text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-md flex items-center gap-1.5"
                  >
                    {isSubmitting ? (
                      <span>Transmitting...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Transmit Journey Request</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Step 3: Success Confirmation State */
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-terracotta font-semibold">
                Dossier Received • Ref: VOYARA-2026-892
              </span>
              <h3 className="font-display text-3xl text-sand font-light">
                Your Request Has Been Assigned
              </h3>
              <p className="text-xs text-sand/75 font-light max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-sand">{name}</strong>. Our senior destination specialist is reviewing suite availability for <strong className="text-sand">{destination}</strong>. A dedicated proposal will reach your WhatsApp within 24 hours.
              </p>
            </div>

            <div className="p-4 bg-[#061D1F] border border-teal-soft/30 max-w-md mx-auto space-y-3 text-left text-xs font-mono">
              <div className="flex items-center justify-between text-sand/70">
                <span>Destination:</span>
                <span className="text-sand font-semibold">{destination}</span>
              </div>
              <div className="flex items-center justify-between text-sand/70">
                <span>Travel Window:</span>
                <span className="text-sand font-semibold">{travelMonth}</span>
              </div>
              <div className="flex items-center justify-between text-sand/70">
                <span>Dietary Sync:</span>
                <span className="text-emerald-400 font-semibold">{dietary}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/50 text-[#25D366] text-xs font-mono font-medium flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Directly on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-5 py-2.5 bg-sand/10 hover:bg-sand/20 border border-sand/30 text-sand text-xs font-mono transition-all"
              >
                Return to Site
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
