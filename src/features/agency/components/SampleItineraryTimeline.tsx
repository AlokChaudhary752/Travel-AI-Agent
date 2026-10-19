"use client";

import React, { useState } from "react";
import { ArrowRight, Calendar, Check, Compass, MapPin, Sparkles, Utensils, Bed } from "lucide-react";
import { FLAGSHIP_ITINERARY } from "../data/agencyData";

interface SampleItineraryTimelineProps {
  onOpenEnquiry: (destination?: string, packageTitle?: string) => void;
}

export function SampleItineraryTimeline({ onOpenEnquiry }: SampleItineraryTimelineProps) {
  const [activeDayNum, setActiveDayNum] = useState<number>(1);

  const activeDay =
    FLAGSHIP_ITINERARY.find((d) => d.day === activeDayNum) || FLAGSHIP_ITINERARY[0];

  return (
    <section className="py-24 px-6 sm:px-8 bg-[#05181A] border-t border-teal-soft/30">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-teal-soft/30 pb-8">
          <div className="space-y-3">
            <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-terracotta font-semibold">
              Sample Itinerary Architecture
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-sand font-light leading-tight">
              7-Day Kashmir & Gulmarg Winter Sanctuary
            </h2>
            <p className="text-sand/70 text-sm sm:text-base font-light max-w-xl font-sans">
              Experience how our curators pace each day to balance unforgettable private access with restorative alpine calm.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenEnquiry("Kashmir & Gulmarg", "7-Day Kashmir & Gulmarg Flagship")}
            className="self-start md:self-auto px-6 py-3 bg-terracotta hover:bg-terracotta-soft text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2"
          >
            <span>Request Full Day-by-Day PDF</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Day Selector Buttons Strip */}
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
          {FLAGSHIP_ITINERARY.map((day) => {
            const isActive = day.day === activeDayNum;
            return (
              <button
                key={day.day}
                type="button"
                onClick={() => setActiveDayNum(day.day)}
                className={`flex-1 min-w-[140px] p-4 text-left border transition-all ${
                  isActive
                    ? "bg-[#092A2D] border-terracotta text-sand shadow-lg"
                    : "bg-[#071F22] border-teal-soft/30 text-sand/60 hover:text-sand hover:border-teal-soft/60"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-terracotta font-bold">
                    Day 0{day.day}
                  </span>
                  {isActive && <Sparkles className="w-3 h-3 text-terracotta" />}
                </div>
                <div className="text-xs font-medium truncate text-sand">
                  {day.location}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Day Detail Display Card */}
        <div className="p-8 sm:p-10 bg-[#092A2D] border border-teal-soft/50 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-teal-soft/30 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-terracotta mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeDay.location}</span>
                <span>•</span>
                <span>Day {activeDay.day} of 07</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-sand font-light">
                {activeDay.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => onOpenEnquiry("Kashmir & Gulmarg", `Customize Day ${activeDay.day}: ${activeDay.title}`)}
              className="self-start sm:self-auto px-4 py-2 bg-[#061D1F] border border-teal-soft/60 hover:border-terracotta text-sand text-xs font-mono transition-colors"
            >
              Tailor This Day
            </button>
          </div>

          {/* Highlights List */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-sand/60">
              Curated Moments & VIP Access:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeDay.highlights.map((h, i) => (
                <div
                  key={i}
                  className="p-4 bg-[#061D1F] border border-teal-soft/30 space-y-2 text-xs text-sand/85 font-sans leading-relaxed"
                >
                  <div className="w-6 h-6 rounded-full bg-teal-soft/30 flex items-center justify-center text-terracotta text-[11px] font-mono font-bold">
                    {i + 1}
                  </div>
                  <p>{h}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Logistics & Stay Strip */}
          <div className="pt-6 border-t border-teal-soft/20 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-sand/80">
            <div className="flex items-center gap-3 p-3 bg-[#061D1F] border border-teal-soft/30">
              <Utensils className="w-4 h-4 text-terracotta flex-shrink-0" />
              <div>
                <span className="text-[10px] text-sand/50 uppercase block">Curated Dining:</span>
                <span className="text-sand">{activeDay.meals}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[#061D1F] border border-teal-soft/30">
              <Bed className="w-4 h-4 text-terracotta flex-shrink-0" />
              <div>
                <span className="text-[10px] text-sand/50 uppercase block">Private Sanctuary:</span>
                <span className="text-sand">{activeDay.stay}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
