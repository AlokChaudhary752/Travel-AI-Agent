"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "../store/useOnboardingStore";

export function StepTravelDNA({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { travelDNA, updateTravelDNA } = useOnboardingStore();
  const [selectedStyles, setSelectedStyles] = useState<string[]>(
    travelDNA.styles || ["luxury"]
  );
  const [pace, setPace] = useState(travelDNA.pace || "balanced");
  const [companions, setCompanions] = useState(
    travelDNA.companions || "couple"
  );
  const [aesthetic, setAesthetic] = useState(
    travelDNA.aesthetic || "Quiet Luxury"
  );

  const styleOptions = [
    { id: "luxury", label: "Ultra Luxury & VIP", desc: "Private islands, suites, 5-star sanctums" },
    { id: "wellness", label: "Holistic Wellness", desc: "Private Ayurvedic spas, thermal onsens" },
    { id: "honeymoon", label: "Romantic Escapes", desc: "Secluded intimacy, cliffside candlelight" },
    { id: "family", label: "Bespoke Family", desc: "Spacious private villas, dedicated butler" },
    { id: "adventure", label: "High-Altitude & Safari", desc: "Heli-skiing, private Serengeti camps" },
    { id: "pilgrimage", label: "Sacred Heritage", desc: "Varanasi VIP aarti, Kyoto temple privates" },
    { id: "solo", label: "Solo Contemplation", desc: "Quiet luxury sanctuaries and retreat" },
  ];

  const paceOptions = [
    { id: "slow", label: "Unrushed & Languid", desc: "1-2 curated activities a day" },
    { id: "balanced", label: "Refined Balance", desc: "Morning discovery, leisurely evening" },
    { id: "dynamic", label: "Exhilarating & Full", desc: "Dynamic multi-destination itinerary" },
  ];

  const companionOptions = [
    { id: "solo", label: "Solo Explorer" },
    { id: "couple", label: "Traveling as a Couple" },
    { id: "family", label: "Family with Children" },
    { id: "entourage", label: "Private Entourage / Friends" },
  ];

  const toggleStyle = (id: string) => {
    setSelectedStyles((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    updateTravelDNA({
      styles: selectedStyles,
      pace: pace as "slow" | "balanced" | "dynamic",
      companions: companions as "solo" | "couple" | "family" | "entourage",
      aesthetic,
    });
    onNext();
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-soft block mb-1">
          Step 02 / 04
        </span>
        <h2 className="font-display text-3xl font-light text-ivory">
          Your Travel DNA
        </h2>
        <p className="text-muted text-xs mt-1 font-light">
          Our AI concierges configure itinerary algorithms according to your subconscious cadence.
        </p>
      </div>

      {/* Travel Styles Multi-select */}
      <div className="space-y-3">
        <label className="text-[11px] uppercase tracking-wider text-muted font-mono block">
          Primary Travel Styles (Select All That Apply)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {styleOptions.map((opt) => {
            const isSelected = selectedStyles.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleStyle(opt.id)}
                className={`p-3.5 text-left border transition-all flex items-start justify-between ${
                  isSelected
                    ? "border-gold bg-gold/10 text-ivory shadow-gold-subtle"
                    : "border-white/10 bg-surface-elevated/70 text-muted hover:border-gold/30 hover:text-ivory"
                }`}
              >
                <div>
                  <div className="text-xs font-semibold text-ivory">{opt.label}</div>
                  <p className="text-[10px] text-muted mt-0.5">{opt.desc}</p>
                </div>
                {isSelected && <Check className="w-4 h-4 text-gold flex-shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Travel Pace */}
      <div className="space-y-3">
        <label className="text-[11px] uppercase tracking-wider text-muted font-mono block">
          Desired Rhythm & Pace
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {paceOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setPace(opt.id as "slow" | "balanced" | "dynamic")}
              className={`p-3 text-left border transition-all ${
                pace === opt.id
                  ? "border-gold bg-gold/10 text-ivory shadow-gold-subtle"
                  : "border-white/10 bg-surface-elevated/70 text-muted hover:border-gold/30"
              }`}
            >
              <div className="text-xs font-semibold text-ivory">{opt.label}</div>
              <p className="text-[10px] text-muted mt-0.5">{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Companions */}
      <div className="space-y-3">
        <label className="text-[11px] uppercase tracking-wider text-muted font-mono block">
          Traveling Party
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {companionOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setCompanions(opt.id as "solo" | "couple" | "family" | "entourage")}
              className={`p-2.5 text-center text-xs font-mono border transition-all ${
                companions === opt.id
                  ? "border-gold bg-gold text-bg font-bold shadow-gold-subtle"
                  : "border-white/10 bg-surface-elevated text-muted hover:border-gold/30 hover:text-ivory"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 flex items-center justify-between border-t border-white/10">
        <Button type="button" variant="ghost" size="md" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back</span>
        </Button>
        <Button type="button" variant="primary" size="lg" onClick={handleContinue}>
          <span>Preferences & Gastronomy</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
