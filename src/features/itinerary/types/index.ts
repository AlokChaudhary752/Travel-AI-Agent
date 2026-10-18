export type StopCategory =
  | "aviation"
  | "accommodation"
  | "dining"
  | "wellness"
  | "leisure"
  | "transfer"
  | "culture";

export interface ItineraryStop {
  id: string;
  title: string;
  category: StopCategory;
  startTime: string; // "09:30"
  endTime: string;   // "11:30"
  durationMinutes: number;
  locationName: string;
  address?: string;
  coords: [number, number]; // [lat, lng]
  openingHours?: { open: string; close: string }; // e.g. { open: "10:00", close: "22:00" }
  costEstimate?: string;
  notes?: string;
  bookingRef?: string;
  amenities?: string[];
  vipPerks?: string[];
}

export interface TransitLeg {
  fromStopId: string;
  toStopId: string;
  mode: "chauffeur" | "helicopter" | "walking" | "boat";
  durationMinutes: number;
  distanceKm: number;
}

export interface DayPlan {
  dayNumber: number;
  date: string; // "2026-12-10"
  title: string;
  summary: string;
  weatherSummary: {
    temp: string;
    condition: string;
    advisory?: string;
  };
  stops: ItineraryStop[];
}

export interface ConflictAlert {
  type: "opening_hours" | "transit_overlap" | "duration_overflow";
  severity: "warning" | "error";
  stopId: string;
  stopTitle: string;
  message: string;
}

export interface Itinerary {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  leadGuest: string;
  partySize: number;
  status: "draft" | "confirmed" | "completed";
  days: DayPlan[];
}

export interface AmenityPin {
  id: string;
  name: string;
  type: "helipad" | "michelin" | "spa" | "fbo";
  coords: [number, number];
  description: string;
  rating?: string;
}
