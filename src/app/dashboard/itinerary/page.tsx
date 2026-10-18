"use client";

import React from "react";
import { TimelineView } from "@/features/itinerary/components/TimelineView";
import { LuxuryInteractiveMap } from "@/features/map/components/LuxuryInteractiveMap";
import { useItineraryStore } from "@/features/itinerary/store/useItineraryStore";

export default function ItineraryStudioPage() {
  const { itinerary, activeDayIndex, selectedStopId, selectStop } = useItineraryStore();
  const activeDay = itinerary.days[activeDayIndex] || itinerary.days[0];

  return (
    <div className="h-[calc(100vh-4rem)] -m-6 sm:-m-8 flex flex-col lg:flex-row overflow-hidden bg-[#070A0F]">
      {/* Left Column: Interactive Timeline & Studio Controls (55% width on desktop) */}
      <div className="w-full lg:w-[56%] h-1/2 lg:h-full flex flex-col border-b lg:border-b-0 lg:border-r border-gold/15 overflow-hidden">
        <TimelineView />
      </div>

      {/* Right Column: Luxury Interactive Map (44% width on desktop) */}
      <div className="w-full lg:w-[44%] h-1/2 lg:h-full flex flex-col bg-[#070A0F] overflow-hidden">
        <LuxuryInteractiveMap
          stops={activeDay.stops}
          selectedStopId={selectedStopId}
          onSelectStop={(id) => selectStop(id)}
          dayTitle={`Day 0${activeDay.dayNumber} — ${activeDay.title}`}
        />
      </div>
    </div>
  );
}
