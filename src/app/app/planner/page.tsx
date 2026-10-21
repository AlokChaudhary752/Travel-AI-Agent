"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Send,
  Save,
  Share2,
  Printer,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Building2,
  Car,
  Utensils,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Copy,
  Clock,
  IndianRupee,
  ShieldCheck,
  Bot,
} from "lucide-react";
import { useAgencyStore, formatInr } from "@/lib/store";
import { GeneratedItinerary, PackageDay } from "@/types/travel";

export default function AiTripPlannerPage() {
  const { settings, addPackage } = useAgencyStore();

  const [inputPrompt, setInputPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState<string>("");
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [clientShareModalOpen, setClientShareModalOpen] = useState(false);

  const promptChips = [
    "7-day Kerala honeymoon, 2 adults, ₹1.5 lakh budget, March",
    "5-day Royal Rajasthan palace tour, 4 adults, ₹3.2 lakh budget",
    "6-day Kashmir luxury snowfall & heli-ski, 2 adults, ₹2.0 lakh budget",
    "4-day Bali Uluwatu cliff villa with pool, couple, ₹1.8 lakh budget",
    "5-day Dubai penthouse & desert mirage, family of 3, ₹3.5 lakh budget",
  ];

  const handleGenerate = async (promptToUse?: string) => {
    const text = promptToUse || inputPrompt;
    if (!text.trim()) return;

    setIsGenerating(true);
    setItinerary(null);
    setSavedSuccess(false);

    try {
      setGenerationStep("Analyzing traveler requirements & budget limits...");
      await new Promise((r) => setTimeout(r, 600));

      setGenerationStep("Querying contracted B2B supplier inventory & rack rates...");
      await new Promise((r) => setTimeout(r, 600));

      setGenerationStep("Synthesizing luxury day-by-day routing & calculating GST 5%...");
      
      const res = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: text,
          userApiKey: settings.anthropicApiKey || undefined,
        }),
      });

      const data = await res.json();
      if (data.itinerary) {
        setItinerary(data.itinerary);
      } else {
        throw new Error(data.error || "Failed to generate");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
      setGenerationStep("");
    }
  };

  // Day Reordering
  const moveDay = (index: number, direction: "up" | "down") => {
    if (!itinerary) return;
    const newDays = [...itinerary.days];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newDays.length) return;

    const temp = newDays[index];
    newDays[index] = newDays[targetIndex];
    newDays[targetIndex] = temp;

    // Re-index days
    const reindexed = newDays.map((d, i) => ({ ...d, day: i + 1 }));
    setItinerary({ ...itinerary, days: reindexed });
  };

  // Update Day Hotel
  const updateHotel = (dayIndex: number, newHotel: string) => {
    if (!itinerary) return;
    const updated = [...itinerary.days];
    updated[dayIndex] = { ...updated[dayIndex], hotel: newHotel };
    setItinerary({ ...itinerary, days: updated });
  };

  // Save as Package
  const handleSaveAsPackage = () => {
    if (!itinerary) return;
    addPackage({
      title: itinerary.title,
      tagline: itinerary.summary,
      destination: itinerary.destination,
      region: ["Bali", "Dubai", "Switzerland"].includes(itinerary.destination) ? "International" : "Domestic",
      durationDays: itinerary.durationDays,
      pricePerPersonInr: Math.round(itinerary.finalPriceInr / 2),
      costPerPersonInr: Math.round(itinerary.calculatedCostInr / 2),
      grossMarginPct: itinerary.recommendedMarkupPct,
      totalCapacity: 20,
      bookedSeats: 0,
      availableSeats: 20,
      heroImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
      status: "Active",
      inclusions: [
        "Luxury 5-Star Accommodations with Daily Breakfast",
        "Private Chauffeured Airport & Inter-City Transfers",
        "Curated Bespoke Excursions with Senior Naturalist / Guide",
        "5% GST Included (SAC Code 998555)",
      ],
      exclusions: ["Personal airfare", "Gratuities", "Incidental dining"],
      itinerary: itinerary.days,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  // Print Dossier
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F6F2EB]/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl sm:text-3xl font-light text-[#F6F2EB]">
              AI Trip Architect
            </h1>
            <span className="px-2 py-0.5 rounded bg-[#C2532A]/20 text-[#C2532A] border border-[#C2532A]/40 text-xs font-mono uppercase">
              Core Module
            </span>
          </div>
          <p className="text-xs text-[#F6F2EB]/60 font-sans mt-0.5">
            Describe any complex bespoke travel requirement in natural language to generate fully costed, editable itineraries.
          </p>
        </div>

        {/* Model Status Badge */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <Bot className="w-4 h-4 text-[#C2532A]" />
          <span className="text-[#F6F2EB]/70">Engine:</span>
          {settings.anthropicApiKey ? (
            <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
              Claude 3.5 Sonnet Connected
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-500/30">
              Voyara Neural Engine (Demo Mode)
            </span>
          )}
        </div>
      </div>

      {/* Input Prompt Box & Chips */}
      <div className="p-5 rounded-lg bg-[#092B2F] border border-[#F6F2EB]/15 space-y-4">
        <div className="relative">
          <textarea
            rows={3}
            placeholder="Type your brief: e.g. '7-day Kerala honeymoon, 2 adults, ₹1.5 lakh budget, March with private pool villa and houseboat'..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                handleGenerate();
              }
            }}
            className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded-lg p-3 text-sm text-[#F6F2EB] placeholder-[#F6F2EB]/40 focus:outline-none focus:border-[#C2532A] resize-none font-sans"
          />
          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating || !inputPrompt.trim()}
              className="py-1.5 px-4 bg-[#C2532A] hover:bg-[#C2532A]/90 disabled:opacity-40 text-white font-mono text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 shadow"
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Generate Itinerary
                </>
              )}
            </button>
          </div>
        </div>

        {/* Suggested Prompt Chips */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono text-[#F6F2EB]/50 uppercase tracking-wider block">
            Suggested Brief Templates:
          </span>
          <div className="flex flex-wrap gap-2">
            {promptChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputPrompt(chip);
                  handleGenerate(chip);
                }}
                className="px-2.5 py-1 rounded bg-[#071F22] hover:bg-[#0E353A] border border-[#F6F2EB]/10 text-xs font-mono text-[#F6F2EB]/80 hover:text-[#F6F2EB] transition-colors text-left"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Progress State */}
      {isGenerating && (
        <div className="p-8 rounded-lg bg-[#092B2F] border border-[#C2532A]/40 flex flex-col items-center justify-center gap-3 text-center animate-pulse">
          <div className="w-8 h-8 border-2 border-[#C2532A] border-t-transparent rounded-full animate-spin" />
          <h3 className="font-display text-lg text-[#F6F2EB]">Curating Bespoke Itinerary</h3>
          <p className="text-xs font-mono text-[#C2532A]">{generationStep}</p>
        </div>
      )}

      {/* Generated Itinerary Output Display */}
      {itinerary && !isGenerating && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Action Header Strip */}
          <div className="p-4 rounded-lg bg-[#092B2F] border border-[#F6F2EB]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#C2532A] uppercase">
                  {itinerary.destination} • {itinerary.durationDays} Days / {itinerary.durationDays - 1} Nights
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#071F22] text-[#F6F2EB]/60">
                  {itinerary.modelUsed}
                </span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl text-[#F6F2EB] mt-0.5">
                {itinerary.title}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleSaveAsPackage}
                className="py-1.5 px-3 bg-[#0B2A2E] hover:bg-[#16565C] border border-[#F6F2EB]/20 text-[#F6F2EB] rounded text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                <Save className="w-3.5 h-3.5 text-[#C2532A]" />
                {savedSuccess ? "Saved to Inventory!" : "Save as Package"}
              </button>

              <button
                onClick={() => setClientShareModalOpen(true)}
                className="py-1.5 px-3 bg-[#0B2A2E] hover:bg-[#16565C] border border-[#F6F2EB]/20 text-[#F6F2EB] rounded text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-teal-400" />
                Send to Client
              </button>

              <button
                onClick={handlePrint}
                className="py-1.5 px-3 bg-[#C2532A] hover:bg-[#C2532A]/90 text-white rounded text-xs font-mono flex items-center gap-1.5 transition-colors shadow"
              >
                <Printer className="w-3.5 h-3.5" />
                Export PDF
              </button>
            </div>
          </div>

          {/* Pricing & Commercials Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded bg-[#092B2F] border border-[#F6F2EB]/10">
              <span className="text-[10px] font-mono uppercase text-[#F6F2EB]/50 block">Target Budget</span>
              <div className="font-mono text-base text-[#F6F2EB]">
                {formatInr(itinerary.budgetInr)}
              </div>
            </div>
            <div className="p-3 rounded bg-[#092B2F] border border-[#F6F2EB]/10">
              <span className="text-[10px] font-mono uppercase text-[#F6F2EB]/50 block">B2B Net Cost</span>
              <div className="font-mono text-base text-[#F6F2EB]">
                {formatInr(itinerary.calculatedCostInr)}
              </div>
            </div>
            <div className="p-3 rounded bg-[#092B2F] border border-[#F6F2EB]/10">
              <span className="text-[10px] font-mono uppercase text-[#F6F2EB]/50 block">Agent Margin ({itinerary.recommendedMarkupPct}%)</span>
              <div className="font-mono text-base text-[#C2532A]">
                {formatInr(itinerary.breakdown.marginTotal)}
              </div>
            </div>
            <div className="p-3 rounded bg-[#092B2F] border border-[#C2532A]/50">
              <span className="text-[10px] font-mono uppercase text-[#C2532A] block">Final Quotation (Incl. 5% GST)</span>
              <div className="font-mono text-lg font-bold text-white">
                {formatInr(itinerary.finalPriceInr)}
              </div>
            </div>
          </div>

          {/* Day-by-Day Cards (Drag & Reorder, Hotel Swap) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg text-[#F6F2EB]">
                Interactive Day-by-Day Itinerary ({itinerary.days.length} Days)
              </h3>
              <span className="text-xs font-mono text-[#F6F2EB]/50">
                Use arrows to reorder days or click hotel to customize
              </span>
            </div>

            <div className="space-y-3">
              {itinerary.days.map((day, index) => (
                <div
                  key={day.day}
                  className="p-4 rounded-lg bg-[#092B2F] border border-[#F6F2EB]/15 hover:border-[#F6F2EB]/30 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded bg-[#071F22] border border-[#C2532A]/40 flex flex-col items-center justify-center font-mono flex-shrink-0">
                        <span className="text-[9px] text-[#C2532A] uppercase">DAY</span>
                        <span className="text-sm font-bold text-[#F6F2EB]">{day.day}</span>
                      </div>
                      <div>
                        <h4 className="font-display text-base text-[#F6F2EB] font-light">
                          {day.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs font-mono text-[#F6F2EB]/60 mt-0.5">
                          <span>{day.location}</span>
                          <span>•</span>
                          <span className="text-teal-400">{day.meals}</span>
                        </div>
                      </div>
                    </div>

                    {/* Reorder Buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveDay(index, "up")}
                        disabled={index === 0}
                        className="p-1 rounded bg-[#071F22] hover:bg-[#0E353A] disabled:opacity-30 text-[#F6F2EB]"
                        title="Move Earlier"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveDay(index, "down")}
                        disabled={index === itinerary.days.length - 1}
                        className="p-1 rounded bg-[#071F22] hover:bg-[#0E353A] disabled:opacity-30 text-[#F6F2EB]"
                        title="Move Later"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Highlights / Activities list */}
                  <div className="pl-13 text-xs space-y-1">
                    {day.activities.map((act, i) => (
                      <div key={i} className="flex items-center gap-2 text-[#F6F2EB]/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C2532A]" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>

                  {/* Editable Hotel & Transport Selector */}
                  <div className="pt-3 border-t border-[#F6F2EB]/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 p-2 rounded bg-[#071F22]">
                      <Building2 className="w-4 h-4 text-[#C2532A] flex-shrink-0" />
                      <div className="flex-1">
                        <span className="text-[9px] font-mono text-[#F6F2EB]/40 uppercase block">Hotel Stay</span>
                        <input
                          type="text"
                          value={day.hotel}
                          onChange={(e) => updateHotel(index, e.target.value)}
                          className="w-full bg-transparent text-xs text-[#F6F2EB] focus:outline-none focus:text-[#C2532A]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2 rounded bg-[#071F22]">
                      <Car className="w-4 h-4 text-teal-400 flex-shrink-0" />
                      <div>
                        <span className="text-[9px] font-mono text-[#F6F2EB]/40 uppercase block">Vehicle Logistics</span>
                        <span className="text-[#F6F2EB]/80">{day.transport}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Client Share Modal */}
      {clientShareModalOpen && itinerary && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#092B2F] border border-[#F6F2EB]/20 rounded-lg p-6 max-w-lg w-full space-y-4">
            <h3 className="font-display text-xl text-[#F6F2EB]">Send Itinerary to Client</h3>
            <p className="text-xs text-[#F6F2EB]/70">
              Formatted WhatsApp message ready for instant client dispatch.
            </p>

            <div className="p-3 rounded bg-[#071F22] border border-[#F6F2EB]/15 text-xs font-mono text-[#F6F2EB]/80 max-h-48 overflow-y-auto whitespace-pre-wrap">
              {`✨ Voyara Journeys — ${itinerary.title}
Duration: ${itinerary.durationDays} Days / ${itinerary.durationDays - 1} Nights
Total Price: ${formatInr(itinerary.finalPriceInr)} (All taxes & 5% GST incl.)

Highlights:
${itinerary.days.map((d) => `• Day ${d.day}: ${d.title} (${d.hotel})`).join("\n")}

Prepared by: ${settings.agencyName}
Concierge Hotline: ${settings.phone}`}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setClientShareModalOpen(false)}
                className="py-2 px-4 border border-[#F6F2EB]/20 text-[#F6F2EB] rounded text-xs font-mono uppercase"
              >
                Close
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `✨ Voyara Journeys — ${itinerary.title}\nTotal Price: ${formatInr(itinerary.finalPriceInr)}\nContact: ${settings.phone}`
                  );
                  alert("Copied to clipboard!");
                }}
                className="py-2 px-4 bg-[#C2532A] text-white rounded text-xs font-mono uppercase flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy WhatsApp Text
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
