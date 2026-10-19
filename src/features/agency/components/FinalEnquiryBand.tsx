"use client";

import React, { useState } from "react";
import { MessageCircle, Send, CheckCircle2, Phone, ShieldCheck } from "lucide-react";
import { AGENCY_DETAILS } from "../data/agencyData";

export function FinalEnquiryBand() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState("Kashmir & Gulmarg");
  const [travelMonth, setTravelMonth] = useState("December 2026");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  const handleWhatsAppChat = () => {
    const text = encodeURIComponent(
      `Hello ${AGENCY_DETAILS.name}! My name is ${name || "Traveler"}. I would like to plan a bespoke trip to ${destination} in ${travelMonth}.`
    );
    window.open(`https://wa.me/919820086927?text=${text}`, "_blank");
  };

  return (
    <section id="contact" className="py-24 px-6 sm:px-8 bg-[#05181A] border-t border-teal-soft/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Direct Agency Contact & Assurance */}
        <div className="lg:col-span-5 space-y-6">
          <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-terracotta font-semibold">
            Begin Your Private Journey
          </span>

          <h2 className="font-display text-4xl sm:text-5xl text-sand font-light leading-tight">
            Ready to Experience Travel Without Compromise?
          </h2>

          <p className="text-sand/75 text-sm sm:text-base font-light font-sans leading-relaxed">
            Send an enquiry or initiate an immediate WhatsApp dialogue with our senior destination curators. We reply with a handcrafted itinerary within 24 hours.
          </p>

          <div className="space-y-4 pt-4 border-t border-teal-soft/20 text-xs font-mono text-sand/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#092A2D] border border-teal-soft/40 flex items-center justify-center text-terracotta">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-sand/50 uppercase block">Private Client Desk:</span>
                <a href={`tel:${AGENCY_DETAILS.phoneRaw}`} className="text-sand font-bold hover:text-terracotta">
                  {AGENCY_DETAILS.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#092A2D] border border-teal-soft/40 flex items-center justify-center text-[#25D366]">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-sand/50 uppercase block">Instant WhatsApp Support:</span>
                <button
                  type="button"
                  onClick={handleWhatsAppChat}
                  className="text-sand font-bold hover:text-[#25D366] underline text-left"
                >
                  Start WhatsApp Thread (Avg 2m reply)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Embedded Quick Enquiry Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 bg-[#092A2D] border border-teal-soft/50 shadow-2xl relative">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-teal-soft/20">
                <span className="text-xs font-mono text-sand font-medium uppercase tracking-wider">
                  Quick Enquiry (Under 60 Seconds)
                </span>
                <span className="text-[10px] text-terracotta font-mono font-bold">
                  Zero Obligations
                </span>
              </div>

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
                    className="w-full bg-[#061D1F] border border-teal-soft/40 p-3 text-xs text-sand placeholder:text-sand/30 focus:border-terracotta outline-none"
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
                    className="w-full bg-[#061D1F] border border-teal-soft/40 p-3 text-xs text-sand placeholder:text-sand/30 focus:border-terracotta outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-sand/70 block mb-1">
                    Destination of Interest
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
                    <option value="Other Custom Destination">Other Destination</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-sand/70 block mb-1">
                    Expected Travel Month
                  </label>
                  <select
                    value={travelMonth}
                    onChange={(e) => setTravelMonth(e.target.value)}
                    className="w-full bg-[#061D1F] border border-teal-soft/40 p-3 text-xs text-sand focus:border-terracotta outline-none"
                  >
                    <option value="November 2026">November 2026</option>
                    <option value="December 2026">December 2026</option>
                    <option value="January 2027">January 2027</option>
                    <option value="February 2027">February 2027</option>
                    <option value="March 2027">March 2027</option>
                    <option value="Summer 2027">Summer 2027</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:flex-1 py-3.5 px-6 bg-terracotta hover:bg-terracotta-soft text-white font-mono text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-xl"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? "Transmitting..." : "Send Journey Enquiry"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppChat}
                  className="w-full sm:w-auto py-3.5 px-5 bg-[#25D366]/20 border border-[#25D366]/50 hover:bg-[#25D366]/30 text-[#25D366] font-mono text-xs font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>

              <div className="pt-3 border-t border-teal-soft/20 flex items-center gap-2 text-[10px] text-sand/60 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-terracotta" />
                <span>Your contact details are strictly confidential and never shared with third parties.</span>
              </div>
            </form>
          ) : (
            <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-teal-soft/30 border border-terracotta/40 flex items-center justify-center mx-auto text-terracotta">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="font-display text-3xl text-sand font-light">
                Enquiry Successfully Transmitted
              </h3>
              <p className="text-xs text-sand/80 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-sand">{name}</strong>. Our senior destination specialist for <strong className="text-terracotta">{destination}</strong> will review your request and reach out on WhatsApp at <strong className="text-sand">{phone}</strong> within 24 hours.
              </p>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppChat}
                  className="py-3 px-6 bg-terracotta text-white font-mono text-xs uppercase tracking-wider font-semibold hover:bg-terracotta-soft transition-all"
                >
                  Message Us on WhatsApp Now
                </button>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="py-3 px-6 border border-teal-soft/60 text-sand font-mono text-xs hover:bg-teal-soft/20 transition-all"
                >
                  Submit Another Enquiry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
