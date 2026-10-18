import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Itinerary, ItineraryStop, ConflictAlert, DayPlan } from "../types";
import {
  twoOptOptimizer,
  detectScheduleConflicts,
  recalculateSchedule,
} from "../utils/routeOptimizer";

interface ItineraryState {
  itinerary: Itinerary;
  activeDayIndex: number;
  selectedStopId: string | null;
  conflicts: ConflictAlert[];
  lastOptimizationGainKm: number | null;

  // Actions
  setActiveDay: (index: number) => void;
  selectStop: (stopId: string | null) => void;
  moveStop: (dayIndex: number, fromIndex: number, toIndex: number) => void;
  optimizeDayRoute: (dayIndex: number) => void;
  addStop: (dayIndex: number, stop: Omit<ItineraryStop, "id">) => void;
  removeStop: (dayIndex: number, stopId: string) => void;
  updateStop: (
    dayIndex: number,
    stopId: string,
    updates: Partial<ItineraryStop>
  ) => void;
  resetToDefault: () => void;
}

const SEED_ITINERARY: Itinerary = {
  id: "voyara-itin-stmoritz-2026",
  title: "St. Moritz Winter Sanctuary & Alpine Haute Cuisine",
  destination: "St. Moritz & Engadin Valley, Switzerland",
  startDate: "2026-12-10",
  endDate: "2026-12-14",
  leadGuest: "Lord Julian Vance",
  partySize: 2,
  status: "confirmed",
  days: [
    {
      dayNumber: 1,
      date: "2026-12-10",
      title: "Private Alpine Arrival & Fireside Welcome",
      summary: "Executive jet landing at Samedan FBO, Maybach tarmac chauffeur to Badrutt's Palace, and fondue at Chesa Veglia.",
      weatherSummary: {
        temp: "-2°C",
        condition: "Crisp Alpine Sun",
        advisory: "Optimal runway visibility at LSZS",
      },
      stops: [
        {
          id: "stop-1-1",
          title: "Executive Jet Touchdown — Samedan FBO (LSZS)",
          category: "aviation",
          startTime: "10:30",
          endTime: "11:15",
          durationMinutes: 45,
          locationName: "Engadin Airport Samedan",
          address: "Plazza Aviatica 2, 7503 Samedan",
          coords: [46.5342, 9.8841],
          bookingRef: "LX-VIP-8812",
          costEstimate: "Included in Jet Charter",
          vipPerks: ["Customs cleared in private suite", "Direct tarmac luggage transfer"],
          notes: "Pilatus PC-24 Super Versatile Jet with priority slot.",
        },
        {
          id: "stop-1-2",
          title: "VIP Check-in & Lake Suite Unveiling",
          category: "accommodation",
          startTime: "11:45",
          endTime: "13:30",
          durationMinutes: 105,
          locationName: "Badrutt's Palace Hotel",
          address: "Via Serlas 27, 7500 St. Moritz",
          coords: [46.4981, 9.8427],
          openingHours: { open: "00:00", close: "23:59" },
          costEstimate: "CHF 3,850 / night",
          vipPerks: ["Rolls-Royce Ghost town car on standby", "Personal Palace Butler assigned"],
          notes: "Corner suite overlooking frozen Lake St. Moritz.",
        },
        {
          id: "stop-1-3",
          title: "Alpine Luncheon at Dorta Zuoz",
          category: "dining",
          startTime: "14:00",
          endTime: "15:45",
          durationMinutes: 105,
          locationName: "Hotel & Restaurant Dorta",
          address: "Chant da Rumaun 14, 7524 Zuoz",
          coords: [46.6028, 9.9602],
          openingHours: { open: "11:30", close: "22:00" },
          costEstimate: "CHF 280",
          vipPerks: ["Cheminée fireside table reserved"],
          notes: "Historic 12th-century Engadine farmhouse dining.",
        },
        {
          id: "stop-1-4",
          title: "Fireside Truffle Fondue at Chesa Veglia",
          category: "dining",
          startTime: "19:30",
          endTime: "22:00",
          durationMinutes: 150,
          locationName: "Chesa Veglia (Pizzeria Heuboden)",
          address: "Via Veglia 2, 7500 St. Moritz",
          coords: [46.4975, 9.8395],
          openingHours: { open: "18:30", close: "23:30" },
          costEstimate: "CHF 450",
          vipPerks: ["Maître D' signature Dama Bianca pizza pairing"],
          notes: "St. Moritz's most iconic 1658 farmhouse.",
        },
      ],
    },
    {
      dayNumber: 2,
      date: "2026-12-11",
      title: "Corviglia Powder & Mountain Heli-Ski",
      summary: "First tracks on Corviglia slopes followed by private mountain helicopter transfer to Piz Nair summit.",
      weatherSummary: {
        temp: "-5°C",
        condition: "Powder Snow & Clear Sky",
        advisory: "Fresh 20cm snowfall overnight; avalanche rating Low",
      },
      stops: [
        {
          id: "stop-2-1",
          title: "Private Ski Butler Fitting & Funicular Ascent",
          category: "leisure",
          startTime: "09:00",
          endTime: "10:15",
          durationMinutes: 75,
          locationName: "St. Moritz Chantarella Station",
          address: "Via Chantarella, 7500 St. Moritz",
          coords: [46.5002, 9.8405],
          openingHours: { open: "08:30", close: "17:00" },
          costEstimate: "CHF 320",
          vipPerks: ["Head Pro custom carbon-fiber ski setup", "Skip-the-line VIP pass"],
        },
        {
          id: "stop-2-2",
          title: "Piz Nair Summit Heli-Drop",
          category: "aviation",
          startTime: "10:45",
          endTime: "12:30",
          durationMinutes: 105,
          locationName: "Piz Nair Helipad",
          coords: [46.5047, 9.7997],
          costEstimate: "CHF 1,800",
          vipPerks: ["IFMGA Mountain Guide private escort"],
          notes: "3,057 meters elevation. Direct off-piste descent.",
        },
        {
          id: "stop-2-3",
          title: "Champagne Terrace Lunch at El Paradiso",
          category: "dining",
          startTime: "13:00",
          endTime: "15:00",
          durationMinutes: 120,
          locationName: "El Paradiso Mountain Club",
          address: "Via Suvretta, 7500 St. Moritz",
          coords: [46.4855, 9.8142],
          openingHours: { open: "11:00", close: "16:30" },
          costEstimate: "CHF 550",
          vipPerks: ["Front-row mountain sunbed with cashmere blankets"],
        },
        {
          id: "stop-2-4",
          title: "Palace Wellness Alpine Hydrotherapy & Sauna",
          category: "wellness",
          startTime: "16:30",
          endTime: "18:30",
          durationMinutes: 120,
          locationName: "The Palace Wellness",
          address: "Via Serlas 27, 7500 St. Moritz",
          coords: [46.4981, 9.8427],
          openingHours: { open: "08:00", close: "20:00" },
          costEstimate: "Included in Suite",
          vipPerks: ["Private Swiss pine herbal infusion master"],
        },
      ],
    },
    {
      dayNumber: 3,
      date: "2026-12-12",
      title: "Glacier Express Panorama & Haute Horlogerie",
      summary: "First-class Excellence Class scenic transit, bespoke watchmaker atelier visit, and 2-Star Michelin dinner.",
      weatherSummary: {
        temp: "-3°C",
        condition: "Partly Cloudy",
      },
      stops: [
        {
          id: "stop-3-1",
          title: "Glacier Express Excellence Class (St. Moritz ➔ Filisur)",
          category: "transfer",
          startTime: "09:45",
          endTime: "11:30",
          durationMinutes: 105,
          locationName: "St. Moritz Railway Station",
          coords: [46.4989, 9.8458],
          costEstimate: "CHF 850",
          vipPerks: ["Glacier bar dedicated concierge & 5-course degustation"],
        },
        {
          id: "stop-3-2",
          title: "Bespoke Independent Horology Atelier Private Salon",
          category: "culture",
          startTime: "12:15",
          endTime: "14:15",
          durationMinutes: 120,
          locationName: "Pontresina Watchmaking Vault",
          coords: [46.4912, 9.9015],
          openingHours: { open: "10:00", close: "18:00" },
          vipPerks: ["Master watchmaker tour and movement inspection"],
        },
        {
          id: "stop-3-3",
          title: "Da Vittorio 2-Star Michelin Dinner",
          category: "dining",
          startTime: "19:30",
          endTime: "22:30",
          durationMinutes: 180,
          locationName: "Da Vittorio at Carlton Hotel",
          address: "Via Johannes Badrutt 11, 7500 St. Moritz",
          coords: [46.4947, 9.8392],
          openingHours: { open: "19:00", close: "23:00" },
          costEstimate: "CHF 920",
          vipPerks: ["Cellar tour by Chef Sommelier with rare Barolo vintages"],
        },
      ],
    },
    {
      dayNumber: 4,
      date: "2026-12-13",
      title: "Lake Ice Polo & Executive Departure",
      summary: "Private lakefront VIP marquee champagne reception before afternoon flight to Zurich/Geneva.",
      weatherSummary: {
        temp: "-1°C",
        condition: "Clear Sun",
      },
      stops: [
        {
          id: "stop-4-1",
          title: "Snow Polo World Cup VIP Marquee & Brunch",
          category: "leisure",
          startTime: "10:30",
          endTime: "13:30",
          durationMinutes: 180,
          locationName: "Lake St. Moritz Frozen Arena",
          coords: [46.4945, 9.8441],
          openingHours: { open: "10:00", close: "17:00" },
          costEstimate: "CHF 1,200",
          vipPerks: ["Perrier-Jouët champagne lounge pass"],
        },
        {
          id: "stop-4-2",
          title: "Samedan Executive FBO Chauffeur & Departure",
          category: "aviation",
          startTime: "14:30",
          endTime: "15:45",
          durationMinutes: 75,
          locationName: "Engadin Airport Samedan",
          coords: [46.5342, 9.8841],
          vipPerks: ["Expedited tarmac dispatch to Zurich (LSZH)"],
        },
      ],
    },
  ],
};

export const useItineraryStore = create<ItineraryState>()(
  persist(
    (set, get) => ({
      itinerary: SEED_ITINERARY,
      activeDayIndex: 0,
      selectedStopId: "stop-1-1",
      conflicts: detectScheduleConflicts(SEED_ITINERARY.days[0].stops),
      lastOptimizationGainKm: null,

      setActiveDay: (index: number) => {
        const state = get();
        const validIdx = Math.max(0, Math.min(state.itinerary.days.length - 1, index));
        const activeDayStops = state.itinerary.days[validIdx]?.stops || [];
        set({
          activeDayIndex: validIdx,
          selectedStopId: activeDayStops[0]?.id || null,
          conflicts: detectScheduleConflicts(activeDayStops),
          lastOptimizationGainKm: null,
        });
      },

      selectStop: (stopId: string | null) => {
        set({ selectedStopId: stopId });
      },

      moveStop: (dayIndex: number, fromIndex: number, toIndex: number) => {
        const { itinerary } = get();
        const day = itinerary.days[dayIndex];
        if (!day) return;

        const updatedStops = [...day.stops];
        const [movedItem] = updatedStops.splice(fromIndex, 1);
        updatedStops.splice(toIndex, 0, movedItem);

        // Recalculate schedule times
        const recomputedStops = recalculateSchedule(updatedStops);

        const updatedDays = itinerary.days.map((d, i) =>
          i === dayIndex ? { ...d, stops: recomputedStops } : d
        );

        set({
          itinerary: { ...itinerary, days: updatedDays },
          conflicts: detectScheduleConflicts(recomputedStops),
        });
      },

      optimizeDayRoute: (dayIndex: number) => {
        const { itinerary } = get();
        const day = itinerary.days[dayIndex];
        if (!day || day.stops.length <= 2) return;

        const result = twoOptOptimizer(day.stops);

        const updatedDays = itinerary.days.map((d, i) =>
          i === dayIndex ? { ...d, stops: result.optimizedStops } : d
        );

        set({
          itinerary: { ...itinerary, days: updatedDays },
          conflicts: detectScheduleConflicts(result.optimizedStops),
          lastOptimizationGainKm: result.distanceSavedKm,
        });
      },

      addStop: (dayIndex: number, stopData: Omit<ItineraryStop, "id">) => {
        const { itinerary } = get();
        const day = itinerary.days[dayIndex];
        if (!day) return;

        const newId = `stop-${dayIndex + 1}-${Date.now().toString(36)}`;
        const newStop: ItineraryStop = {
          ...stopData,
          id: newId,
        };

        const updatedStops = recalculateSchedule([...day.stops, newStop]);

        const updatedDays = itinerary.days.map((d, i) =>
          i === dayIndex ? { ...d, stops: updatedStops } : d
        );

        set({
          itinerary: { ...itinerary, days: updatedDays },
          selectedStopId: newId,
          conflicts: detectScheduleConflicts(updatedStops),
        });
      },

      removeStop: (dayIndex: number, stopId: string) => {
        const { itinerary } = get();
        const day = itinerary.days[dayIndex];
        if (!day) return;

        const filtered = day.stops.filter((s) => s.id !== stopId);
        const recomputedStops = recalculateSchedule(filtered);

        const updatedDays = itinerary.days.map((d, i) =>
          i === dayIndex ? { ...d, stops: recomputedStops } : d
        );

        set({
          itinerary: { ...itinerary, days: updatedDays },
          conflicts: detectScheduleConflicts(recomputedStops),
          selectedStopId: recomputedStops[0]?.id || null,
        });
      },

      updateStop: (
        dayIndex: number,
        stopId: string,
        updates: Partial<ItineraryStop>
      ) => {
        const { itinerary } = get();
        const day = itinerary.days[dayIndex];
        if (!day) return;

        const updatedStops = day.stops.map((s) =>
          s.id === stopId ? { ...s, ...updates } : s
        );

        const recomputedStops = recalculateSchedule(updatedStops);

        const updatedDays = itinerary.days.map((d, i) =>
          i === dayIndex ? { ...d, stops: recomputedStops } : d
        );

        set({
          itinerary: { ...itinerary, days: updatedDays },
          conflicts: detectScheduleConflicts(recomputedStops),
        });
      },

      resetToDefault: () => {
        set({
          itinerary: SEED_ITINERARY,
          activeDayIndex: 0,
          selectedStopId: "stop-1-1",
          conflicts: detectScheduleConflicts(SEED_ITINERARY.days[0].stops),
          lastOptimizationGainKm: null,
        });
      },
    }),
    {
      name: "voyara_itinerary_store",
      partialize: (state) => ({
        itinerary: state.itinerary,
        activeDayIndex: state.activeDayIndex,
      }),
    }
  )
);
