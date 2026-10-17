"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "../store/useOnboardingStore";

export function StepPreferences({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { preferences, updatePreferences } = useOnboardingStore();
  const [budgetBand, setBudgetBand] = useState(preferences.budgetBand || "$2,000+ / day");
  const [climate, setClimate] = useState(preferences.climate || "Alpine Temperate");
  const [selectedCuisine, setSelectedCuisine] = useState<string[]>(
    preferences.cuisine || ["michelin"]
  );
  const [loyaltyPrograms, setLoyaltyPrograms] = useState<string[]>(
    preferences.loyaltyPrograms || ["Taj InnerCircle", "Emirates Skywards"]
  );

  const budgetOptions = [
    { label: "Bespoke Luxury", value: "$1,000 – $2,500 / day" },
    { label: "High Luxury", value: "$2,500 – $5,000 / day" },
    { label: "Ultra High Net Worth", value: "$5,000+ / day (Private Charter)" },
  ];

  const cuisineOptions = [
    { id: "jain", label: "Strict Jain", desc: "No root vegetables, purely sattvic" },
    { id: "veg", label: "Pure Vegetarian", desc: "Plant-based dairy options" },
    { id: "vegan", label: "Vegan / Plant-Forward", desc: "Zero animal products" },
    { id: "halal", label: "Halal Certified", desc: "Strictly prepared" },
    { id: "michelin", label: "Michelin & Omakase", desc: "Tasting menus & wine pairings" },
    { id: "kosher", label: "Kosher Friendly", desc: "Compliant kitchen sourcing" },
  ];

  const loyaltyOptions = [
    "Taj InnerCircle (Chambers)",
    "Oberoi One VIP",
    "Emirates Skywards (Gold/Plat)",
    "Qatar Privilege Club",
    "Marriott Bonvoy Titanium",
    "Four Seasons Preferred Partner",
  ];

  const toggleCuisine = (id: string) => {
    setSelectedCuisine((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleLoyalty = (item: string) => {
    setLoyaltyPrograms((prev) =>
      prev.includes(item) ? prev.filter((l) => l !== item) : [...prev, item]
    );
  };

  const handleContinue = () => {
    updatePreferences({
      budgetBand,
      climate,
      cuisine: selectedCuisine,
      loyaltyPrograms,
    });
    onNext();
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-soft block mb-1">
          Step 03 / 04
        </span>
        <h2 className="font-display text-3xl font-light text-ivory">
          Gastronomy & Sanctuaries
        </h2>
        <p className="text-muted text-xs mt-1 font-light">
          We ensure every dining reservation, private chef, and suite amenity respects your culinary tenets.
        </p>
      </div>

      {/* Culinary & Dietary Nuances */}
      <div className="space-y-3">
        <label className="text-[11px] uppercase tracking-wider text-muted font-mono block">
          Dietary Nuances & Gastronomy (Multi-Select)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cuisineOptions.map((opt) => {
            const isSelected = selectedCuisine.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleCuisine(opt.id)}
                className={`p-3 text-left border transition-all flex items-start justify-between ${
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

      {/* Budget Tier */}
      <div className="space-y-3">
        <label className="text-[11px] uppercase tracking-wider text-muted font-mono block">
          Daily Investment Expectation
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {budgetOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setBudgetBand(opt.value)}
              className={`p-3 text-left border transition-all ${
                budgetBand === opt.value
                  ? "border-gold bg-gold/10 text-ivory shadow-gold-subtle"
                  : "border-white/10 bg-surface-elevated/70 text-muted hover:border-gold/30"
              }`}
            >
              <div className="text-xs font-semibold text-ivory">{opt.label}</div>
              <p className="text-[10px] text-gold-soft font-mono mt-0.5">{opt.value}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Luxury Loyalty Programs */}
      <div className="space-y-3">
        <label className="text-[11px] uppercase tracking-wider text-muted font-mono block">
          Affiliated Luxury Programs (For Direct Upgrades)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {loyaltyOptions.map((prog) => {
            const isChecked = loyaltyPrograms.includes(prog);
            return (
              <button
                key={prog}
                type="button"
                onClick={() => toggleLoyalty(prog)}
                className={`p-2.5 text-left text-xs font-mono border transition-all truncate flex items-center justify-between ${
                  isChecked
                    ? "border-gold/80 bg-gold/15 text-ivory font-semibold"
                    : "border-white/10 bg-surface-elevated text-muted hover:border-gold/30 hover:text-ivory"
                }`}
              >
                <span className="truncate">{prog}</span>
                {isChecked && <Check className="w-3.5 h-3.5 text-gold flex-shrink-0 ml-1.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 flex items-center justify-between border-t border-white/10">
        <Button type="button" variant="ghost" size="md" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back</span>
        </Button>
        <Button type="button" variant="primary" size="lg" onClick={handleContinue}>
          <span>Logistics & Vault</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
