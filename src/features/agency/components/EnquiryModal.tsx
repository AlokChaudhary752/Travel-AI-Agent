"use client";

import React, { useState } from "react";
import { X, CheckCircle2, MessageCircle, Send, ShieldCheck, Sparkles } from "lucide-react";
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
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState(preselectedDestination || "Kashmir & Gulmarg");
  const [travelMonth, setTravelMonth] = useState("December 2026");
  const [travelers, setTravelers] = useState("2 Guests (Couple)");
  const [notes, setNotes] = useState(
    preselectedPackageTitle ? `Interested in: ${preselectedPackageTitle}` : ""
  );

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello ${AGENCY_DETAILS.name}! My name is ${name || "Traveler"}. I am planning a trip to ${destination} in ${travelMonth} for ${travelers}. ${notes ? `Special requests: ${notes}` : ""}`
    );
    window.open(`https://wa.me/919820086927?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#092A2D] text-sand border border-teal-soft/40 shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Subtle decorative border accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-soft via-terracotta to-teal-soft" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-sand/60 hover:text-sand transition-colors p-1"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-terracotta font-semibold">
                Private Consultation Desk
              </span>
              <span className="text-[9px] px-2 py-0.5 bg-teal-soft/30 text-sand/90 font-mono border border-teal-soft/40">
                24H Turnaround Guaranteed
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl text-sand font-light leading-snug">
              Begin Your Bespoke Journey
            </h3>
            <p className="text-xs text-sand/70 font-light mt-1 mb-6">
              Share a few details below. A senior travel curator will review your preferences and connect with a handcrafted proposal.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-sand/70 block mb-1">
                    Your Full Name *
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
                    WhatsApp or Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98200 XXXXX"
                    className="w-full bg-[#061D1F] border border-teal-soft/40 p-2.5 text-xs text-sand placeholder:text-sand/30 focus:border-terracotta outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-sand/70 block mb-1">
                    Destination
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-[#061D1F] border border-teal-soft/40 p-2.5 text-xs text-sand focus:border-terracotta outline-none"
                  >
                    <option value="Kashmir & Gulmarg">Kashmir & Gulmarg</option>
                    <option value="Swiss Alps & Engadin">Swiss Alps & Engadin</option>
                    <option value="Baa & Noonu Atolls (Maldives)">Maldives Overwater</option>
                    <option value="Royal Rajasthan Palaces">Royal Rajasthan</option>
                    <option value="Kingdom of Bhutan">Kingdom of Bhutan</option>
                    <option value="Other Bespoke Destination">Other Destination</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-sand/70 block mb-1">
                    Travel Month
                  </label>
                  <select
                    value={travelMonth}
                    onChange={(e) => setTravelMonth(e.target.value)}
                    className="w-full bg-[#061D1F] border border-teal-soft/40 p-2.5 text-xs text-sand focus:border-terracotta outline-none"
                  >
                    <option value="November 2026">November 2026</option>
                    <option value="December 2026">December 2026</option>
                    <option value="January 2027">January 2027</option>
                    <option value="February 2027">February 2027</option>
                    <option value="March 2027">March 2027</option>
                    <option value="April 2027">April 2027</option>
                    <option value="May - July 2027">Summer 2027</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-sand/70 block mb-1">
                    Travelers
                  </label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className="w-full bg-[#061D1F] border border-teal-soft/40 p-2.5 text-xs text-sand focus:border-terracotta outline-none"
                  >
                    <option value="2 Guests (Couple / Honeymoon)">2 Guests (Couple)</option>
                    <option value="Family (3–4 Guests)">Family (3–4 Guests)</option>
                    <option value="Private Group (5–8 Guests)">Private Group (5+)</option>
                    <option value="Solo Traveler">Solo Explorer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-sand/70 block mb-1">
                  Specific Requests (Dietary, Anniversary, Villa Preference)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Pure vegetarian meals required, celebrating 10th anniversary"
                  className="w-full bg-[#061D1F] border border-teal-soft/40 p-2.5 text-xs text-sand placeholder:text-sand/30 focus:border-terracotta outline-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 py-3 px-6 bg-terracotta hover:bg-terracotta-soft text-white font-mono text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Submitting..." : "Send Enquiry to Curators"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full sm:w-auto py-3 px-4 bg-[#25D366]/20 border border-[#25D366]/40 hover:bg-[#25D366]/30 text-[#25D366] font-mono text-xs font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Now</span>
                </button>
              </div>

              <div className="pt-3 border-t border-teal-soft/20 flex items-center justify-between text-[10px] text-sand/60 font-mono">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-terracotta" />
                  Strictly Confidential • No Spam
                </span>
                <span>Direct Hotline: {AGENCY_DETAILS.phoneDisplay}</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-full bg-teal-soft/40 border border-terracotta/40 flex items-center justify-center mx-auto text-terracotta">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="font-display text-3xl text-sand font-light">
              Thank You, {name}.
            </h3>
            <p className="text-xs text-sand/80 max-w-md mx-auto leading-relaxed font-light">
              Your journey request for <strong className="text-terracotta">{destination}</strong> has been assigned to our senior destination curator. We will review hotel availability and reach out via WhatsApp at <strong className="text-sand">{phone}</strong> within 24 hours.
            </p>

            <div className="pt-4 flex justify-center gap-3">
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="py-2.5 px-5 bg-terracotta text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-terracotta-soft transition-all"
              >
                Open WhatsApp Thread
              </button>
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-5 border border-teal-soft/50 text-sand font-mono text-xs hover:bg-teal-soft/20 transition-all"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
