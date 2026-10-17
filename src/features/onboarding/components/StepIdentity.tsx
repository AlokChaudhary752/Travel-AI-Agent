"use client";

import React, { useState } from "react";
import { User, Phone, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "../store/useOnboardingStore";

export function StepIdentity({ onNext }: { onNext: () => void }) {
  const { identity, updateIdentity } = useOnboardingStore();
  const [fullName, setFullName] = useState(identity.fullName || "");
  const [phone, setPhone] = useState(identity.phone || "");
  const [country, setCountry] = useState(identity.country || "India");
  const [error, setError] = useState("");

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError("Please provide your name as it appears on your passport.");
      return;
    }
    updateIdentity({ fullName, phone, country });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-soft block mb-1">
          Step 01 / 04
        </span>
        <h2 className="font-display text-3xl font-light text-ivory">
          Traveler Identity
        </h2>
        <p className="text-muted text-xs mt-1 font-light">
          Your credentials for personalized private aviation manifests and suite bookings.
        </p>
      </div>

      <form onSubmit={handleContinue} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-950/40 border border-red-500/40 text-xs text-red-200">
            {error}
          </div>
        )}

        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-wider text-muted font-mono block">
            Passport / Legal Name *
          </label>
          <div className="relative flex items-center border border-white/15 focus-within:border-gold bg-surface-elevated/80 transition-colors">
            <User className="w-4 h-4 text-gold/60 ml-3.5 flex-shrink-0" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (error) setError("");
              }}
              placeholder="e.g. Lord Julian Vance / Rajiv Singhania"
              className="w-full bg-transparent px-3 py-3 text-xs text-ivory placeholder:text-muted/50 focus:outline-none"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-wider text-muted font-mono block">
            VIP Contact / WhatsApp Concierge (Optional)
          </label>
          <div className="relative flex items-center border border-white/15 focus-within:border-gold bg-surface-elevated/80 transition-colors">
            <Phone className="w-4 h-4 text-gold/60 ml-3.5 flex-shrink-0" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98200 XXXXX / +44 7700 XXXXXX"
              className="w-full bg-transparent px-3 py-3 text-xs text-ivory placeholder:text-muted/50 focus:outline-none"
            />
          </div>
        </div>

        {/* Primary Residence Country */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-wider text-muted font-mono block">
            Primary Residence
          </label>
          <div className="relative flex items-center border border-white/15 focus-within:border-gold bg-surface-elevated/80 transition-colors">
            <Globe className="w-4 h-4 text-gold/60 ml-3.5 flex-shrink-0" />
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-surface-elevated px-3 py-3 text-xs text-ivory focus:outline-none cursor-pointer"
            >
              <option value="India">India (Mumbai / Delhi / Bengaluru)</option>
              <option value="United Arab Emirates">United Arab Emirates (Dubai / Abu Dhabi)</option>
              <option value="United Kingdom">United Kingdom (London)</option>
              <option value="United States">United States (New York / SF)</option>
              <option value="Singapore">Singapore</option>
              <option value="Switzerland">Switzerland (Geneva / Zurich)</option>
            </select>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
            <span>Proceed to Travel DNA</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
}
