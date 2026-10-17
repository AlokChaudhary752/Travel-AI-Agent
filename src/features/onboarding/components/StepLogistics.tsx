"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles, Plane, Lock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "../store/useOnboardingStore";

export function StepLogistics({ onBack }: { onBack: () => void }) {
  const router = useRouter();
  const { identity, travelDNA, preferences, logistics, updateLogistics } =
    useOnboardingStore();

  const [homeAirport, setHomeAirport] = useState(
    logistics.homeAirport || "BOM (Chhatrapati Shivaji Maharaj, Mumbai)"
  );
  const [passportStatus, setPassportStatus] = useState(
    logistics.passportStatus || "Valid (> 5 years remaining)"
  );
  const [selectedVisas, setSelectedVisas] = useState<string[]>(
    logistics.visaPrivileges || ["US B1/B2", "Schengen Multi-Entry"]
  );
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const visaList = [
    "US B1/B2 (10 Year)",
    "Schengen Multi-Entry",
    "UK Standard Visitor",
    "UAE Golden Visa",
    "Singapore Long-Term",
    "Japan Multi-Entry",
    "Canada V-1",
  ];

  const airportOptions = [
    "BOM — Chhatrapati Shivaji Intl, Mumbai",
    "DEL — Indira Gandhi Intl, New Delhi",
    "BLR — Kempegowda Intl, Bengaluru",
    "DXB — Dubai International / Al Maktoum Private",
    "LHR — London Heathrow / Farnborough Private",
    "JFK — John F. Kennedy / Teterboro Jet Hub",
    "SIN — Singapore Changi / Seletar",
    "ZRH — Zurich Airport / St. Moritz Samedan",
  ];

  const toggleVisa = (v: string) => {
    setSelectedVisas((prev) =>
      prev.includes(v) ? prev.filter((item) => item !== v) : [...prev, v]
    );
  };

  const handleCompleteProfile = () => {
    updateLogistics({
      homeAirport,
      passportStatus,
      visaPrivileges: selectedVisas,
    });

    setIsSynthesizing(true);

    // Build the complete Travel Profile payload
    const completeProfile = {
      identity,
      travelDNA,
      preferences,
      logistics: {
        homeAirport,
        passportStatus,
        visaPrivileges: selectedVisas,
      },
      completedAt: new Date().toISOString(),
    };

    // Save locally for instant client persistence
    localStorage.setItem("voyara_profile", JSON.stringify(completeProfile));

    // Simulate luxury synthesis delay (600ms)
    setTimeout(() => {
      setIsSynthesizing(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/concierge");
      }, 900);
    }, 700);
  };

  if (isSuccess) {
    return (
      <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold flex items-center justify-center mx-auto shadow-gold-glow">
          <CheckCircle2 className="w-8 h-8 text-gold" />
        </div>
        <h2 className="font-display text-3xl font-light text-ivory">
          Travel DNA Synthesized
        </h2>
        <p className="text-muted text-xs max-w-sm mx-auto leading-relaxed">
          Your profile has been secured into our 256-bit encrypted vault and
          linked to your personal AI concierge. Opening the Sanctum...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-soft block mb-1">
          Step 04 / 04
        </span>
        <h2 className="font-display text-3xl font-light text-ivory">
          Aviation Logistics & Vault
        </h2>
        <p className="text-muted text-xs mt-1 font-light">
          Enables instantaneous calculation of direct private jet routes and visa advisories without re-asking.
        </p>
      </div>

      {/* Home Aviation Hub */}
      <div className="space-y-2">
        <label className="text-[11px] uppercase tracking-wider text-muted font-mono block">
          Primary Departure Aviation Hub
        </label>
        <div className="relative flex items-center border border-white/15 focus-within:border-gold bg-surface-elevated/80 transition-colors">
          <Plane className="w-4 h-4 text-gold/60 ml-3.5 flex-shrink-0" />
          <select
            value={homeAirport}
            onChange={(e) => setHomeAirport(e.target.value)}
            className="w-full bg-surface-elevated px-3 py-3 text-xs text-ivory focus:outline-none cursor-pointer"
          >
            {airportOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Visas */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[11px] uppercase tracking-wider text-muted font-mono block">
            Existing Active Visas (For Instant Spontaneous Bookings)
          </label>
          <span className="text-[10px] text-gold-soft font-mono">Optional</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {visaList.map((visa) => {
            const isChecked = selectedVisas.includes(visa);
            return (
              <button
                key={visa}
                type="button"
                onClick={() => toggleVisa(visa)}
                className={`p-2.5 text-left text-xs font-mono border transition-all truncate flex items-center justify-between ${
                  isChecked
                    ? "border-gold/80 bg-gold/15 text-ivory font-semibold"
                    : "border-white/10 bg-surface-elevated text-muted hover:border-gold/30 hover:text-ivory"
                }`}
              >
                <span className="truncate">{visa}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Encrypted Vault Notice */}
      <div className="p-4 bg-surface-elevated/60 border border-gold/20 flex items-start gap-3">
        <Lock className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
        <div className="text-[11px] text-muted leading-relaxed">
          <span className="text-gold-soft font-mono font-medium block">
            Vault Confidentiality Guarantee
          </span>
          Your passport details, loyalty credentials, and dietary requirements are
          encrypted using client-side AES-256 keys. We never monetize or expose
          member travel data.
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 flex items-center justify-between border-t border-white/10">
        <Button
          type="button"
          variant="ghost"
          size="md"
          onClick={onBack}
          disabled={isSynthesizing}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back</span>
        </Button>
        <Button
          type="button"
          variant="primary"
          size="lg"
          onClick={handleCompleteProfile}
          disabled={isSynthesizing}
          isMagnetic
        >
          {isSynthesizing ? (
            <span>Synthesizing DNA Profile...</span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Complete & Enter Dashboard</span>
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
