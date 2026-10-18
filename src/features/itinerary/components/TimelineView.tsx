"use client";

import React, { useState } from "react";
import { useItineraryStore } from "../store/useItineraryStore";
import { ItineraryStop, StopCategory } from "../types";
import { downloadItineraryIcs } from "../export/ics";
import { openPrintableItineraryDossier } from "../export/pdf";
import { estimateTransitTime, haversineDistance } from "../utils/routeOptimizer";
import {
  Calendar,
  Clock,
  Compass,
  MapPin,
  Plane,
  Utensils,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Trash2,
  AlertTriangle,
  Download,
  Printer,
  Wand2,
  Car,
  CheckCircle2,
  Plus,
  ShieldCheck,
} from "lucide-react";

export function TimelineView() {
  const {
    itinerary,
    activeDayIndex,
    setActiveDay,
    selectedStopId,
    selectStop,
    moveStop,
    optimizeDayRoute,
    removeStop,
    conflicts,
    lastOptimizationGainKm,
    addStop,
  } = useItineraryStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newCategory, setNewCategory] = useState<StopCategory>("dining");
  const [newDuration, setNewDuration] = useState("90");

  const activeDay = itinerary.days[activeDayIndex] || itinerary.days[0];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    // Default coords in St. Moritz center
    addStop(activeDayIndex, {
      title: newTitle,
      category: newCategory,
      locationName: newLocation || "St. Moritz Dorf",
      coords: [46.4981, 9.8427],
      startTime: "15:00",
      endTime: "16:30",
      durationMinutes: Number(newDuration) || 90,
      notes: "Custom VIP stop scheduled via Itinerary Studio",
    });

    setNewTitle("");
    setNewLocation("");
    setShowAddModal(false);
  };

  const getCategoryIcon = (category: StopCategory) => {
    switch (category) {
      case "aviation":
        return <Plane className="w-3.5 h-3.5 text-blue-400" />;
      case "dining":
        return <Utensils className="w-3.5 h-3.5 text-amber-300" />;
      case "wellness":
        return <Sparkles className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <MapPin className="w-3.5 h-3.5 text-gold" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#070A0F] border border-gold/20 overflow-hidden">
      {/* Top Studio Actions Header */}
      <div className="p-4 sm:p-5 border-b border-gold/15 bg-surface flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono tracking-widest text-gold-soft font-bold">
              Itinerary Studio
            </span>
            <span className="text-[9px] px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono font-bold">
              VERIFIED GDS
            </span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl text-ivory font-light mt-0.5">
            {itinerary.destination}
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          {/* 2-Opt Optimizer Trigger */}
          <button
            type="button"
            onClick={() => optimizeDayRoute(activeDayIndex)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/15 border border-gold/40 hover:bg-gold/25 text-gold font-mono text-xs transition-all shadow-gold-subtle"
            title="Run 2-Opt TSP heuristic to minimize transit time"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Optimize Day Route</span>
          </button>

          {/* Export to ICS */}
          <button
            type="button"
            onClick={() => downloadItineraryIcs(itinerary)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-elevated border border-white/10 hover:border-gold/40 text-muted hover:text-ivory font-mono text-xs transition-all"
            title="Download iCalendar file for Apple / Google Calendar"
          >
            <Download className="w-3.5 h-3.5 text-gold" />
            <span className="hidden sm:inline">Export .ICS</span>
          </button>

          {/* Printable Dossier PDF */}
          <button
            type="button"
            onClick={() => openPrintableItineraryDossier(itinerary)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-elevated border border-white/10 hover:border-gold/40 text-muted hover:text-ivory font-mono text-xs transition-all"
            title="Print or Save VIP Briefing Dossier as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-gold" />
            <span className="hidden sm:inline">Dossier PDF</span>
          </button>

          {/* Add Stop Button */}
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gold text-[#07090D] font-mono text-xs font-semibold hover:bg-gold-soft transition-all"
            title="Add Custom Stop"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Stop</span>
          </button>
        </div>
      </div>

      {/* 2-Opt Optimization Feedback Banner */}
      {lastOptimizationGainKm !== null && (
        <div className="px-5 py-2.5 bg-emerald-500/10 border-b border-emerald-500/20 flex items-center justify-between text-xs font-mono text-emerald-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              2-Opt TSP Optimizer completed: {lastOptimizationGainKm > 0 ? `Saved ${lastOptimizationGainKm} km in mountain transit!` : "Route was already optimal."}
            </span>
          </div>
          <span className="text-[10px] text-muted">Sequential schedules updated</span>
        </div>
      )}

      {/* Conflict Alerts Notice */}
      {conflicts.length > 0 && (
        <div className="px-5 py-2.5 bg-amber-500/10 border-b border-amber-500/20 space-y-1">
          {conflicts.map((c, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-amber-300 font-mono">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>{c.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* Day Navigation Tabs */}
      <div className="flex overflow-x-auto border-b border-white/10 bg-[#0A0D12] scrollbar-none">
        {itinerary.days.map((day, idx) => {
          const isActive = idx === activeDayIndex;
          return (
            <button
              key={day.dayNumber}
              type="button"
              onClick={() => setActiveDay(idx)}
              className={`flex-1 min-w-[150px] p-3.5 text-left border-r border-white/5 transition-all relative ${
                isActive
                  ? "bg-gold/10 text-gold border-b-2 border-b-gold"
                  : "text-muted hover:text-ivory hover:bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono tracking-widest font-bold">
                  Day 0{day.dayNumber}
                </span>
                <span className="text-[10px] text-muted-dark font-mono">
                  {day.stops.length} stops
                </span>
              </div>
              <div className="text-xs font-medium truncate mt-1 text-ivory">
                {day.title}
              </div>
              <div className="text-[10px] text-muted font-mono mt-0.5">
                {day.weatherSummary.temp} • {day.weatherSummary.condition}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Timeline Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {activeDay.stops.map((stop, index) => {
          const isSelected = stop.id === selectedStopId;
          const nextStop = activeDay.stops[index + 1];

          // Compute transit gap to next stop
          let transitInfo = null;
          if (nextStop) {
            const dist = haversineDistance(stop.coords, nextStop.coords);
            const time = estimateTransitTime(dist);
            transitInfo = {
              distanceKm: dist.toFixed(1),
              durationMinutes: time,
              mode: dist > 60 ? "Helicopter" : dist < 1.0 ? "Walking" : "Private Chauffeur",
            };
          }

          return (
            <div key={stop.id} className="relative">
              {/* Stop Card */}
              <div
                onClick={() => selectStop(stop.id)}
                className={`p-4 sm:p-5 transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-surface-elevated border-gold/60 shadow-gold-subtle"
                    : "bg-surface/80 border-white/5 hover:border-gold/30 hover:bg-surface-elevated/40"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  {/* Left: Time and Icon Badge */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full border border-gold/40 bg-surface flex items-center justify-center flex-shrink-0 mt-0.5">
                      {getCategoryIcon(stop.category)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-gold">
                          {stop.startTime} - {stop.endTime}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-white/5 text-muted border border-white/10">
                          {stop.category}
                        </span>
                        {stop.bookingRef && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 bg-gold/15 text-gold-soft border border-gold/30">
                            {stop.bookingRef}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-lg text-ivory font-light mt-1">
                        {stop.title}
                      </h3>
                      <div className="text-xs text-muted font-sans flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3 h-3 text-gold/60" />
                        <span>{stop.locationName}</span>
                        {stop.address && (
                          <span className="hidden md:inline text-muted-dark">
                            • {stop.address}
                          </span>
                        )}
                      </div>

                      {/* Notes / VIP Perks */}
                      {stop.notes && (
                        <p className="text-xs text-gold-soft/80 mt-2 font-mono italic">
                          “{stop.notes}”
                        </p>
                      )}

                      {stop.vipPerks && stop.vipPerks.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {stop.vipPerks.map((perk, pIdx) => (
                            <span
                              key={pIdx}
                              className="text-[10px] font-mono px-2 py-0.5 bg-gold/10 text-gold-soft border border-gold/20 flex items-center gap-1"
                            >
                              <ShieldCheck className="w-2.5 h-2.5 text-gold" />
                              {perk}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Reorder & Delete Controls */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        moveStop(activeDayIndex, index, index - 1);
                      }}
                      className="p-1.5 text-muted hover:text-gold disabled:opacity-20 transition-all border border-white/5 hover:border-gold/30"
                      title="Move Up"
                      aria-label="Move stop up"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === activeDay.stops.length - 1}
                      onClick={(e) => {
                        e.stopPropagation();
                        moveStop(activeDayIndex, index, index + 1);
                      }}
                      className="p-1.5 text-muted hover:text-gold disabled:opacity-20 transition-all border border-white/5 hover:border-gold/30"
                      title="Move Down"
                      aria-label="Move stop down"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeStop(activeDayIndex, stop.id);
                      }}
                      className="p-1.5 text-muted hover:text-red-400 transition-all border border-white/5 hover:border-red-400/30"
                      title="Delete Stop"
                      aria-label="Delete stop"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Transit Connector to Next Stop */}
              {transitInfo && (
                <div className="py-2.5 px-6 flex items-center gap-3 text-xs font-mono text-muted border-l-2 border-dashed border-gold/30 ml-8 my-1">
                  <Car className="w-3.5 h-3.5 text-gold" />
                  <span className="text-gold-soft">
                    {transitInfo.mode} transfer
                  </span>
                  <span>•</span>
                  <span>~{transitInfo.durationMinutes} min</span>
                  <span>•</span>
                  <span>{transitInfo.distanceKm} km</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Custom Stop Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B0F15] border border-gold/40 p-6 max-w-md w-full shadow-2xl">
            <h3 className="font-display text-xl text-ivory mb-4 font-light">
              Add Itinerary Stop (Day {activeDay.dayNumber})
            </h3>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-muted uppercase block mb-1">
                  Venue / Activity Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Suvretta House Afternoon High Tea"
                  className="w-full bg-surface border border-white/10 p-2.5 text-xs text-ivory focus:border-gold outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-muted uppercase block mb-1">
                  Location Name
                </label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. Suvretta House, Via Chasellas 1"
                  className="w-full bg-surface border border-white/10 p-2.5 text-xs text-ivory focus:border-gold outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-muted uppercase block mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as StopCategory)}
                    className="w-full bg-surface border border-white/10 p-2.5 text-xs text-ivory focus:border-gold outline-none"
                  >
                    <option value="dining">Dining / Culinary</option>
                    <option value="leisure">Leisure / Skiing</option>
                    <option value="wellness">Wellness / Spa</option>
                    <option value="aviation">Aviation / FBO</option>
                    <option value="culture">Art / Culture</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-muted uppercase block mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    min="15"
                    step="15"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full bg-surface border border-white/10 p-2.5 text-xs text-ivory focus:border-gold outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-mono text-muted hover:text-ivory"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gold text-[#07090D] font-mono text-xs font-bold hover:bg-gold-soft transition-all"
                >
                  Confirm & Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
