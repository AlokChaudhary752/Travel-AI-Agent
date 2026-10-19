import { ItineraryStop, ConflictAlert, TransitLeg } from "../types";

/**
 * Calculate Great-Circle distance between two points on Earth using Haversine formula
 */
export function haversineDistance(
  c1: [number, number],
  c2: [number, number]
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((c2[0] - c1[0]) * Math.PI) / 180;
  const dLng = ((c2[1] - c1[1]) * Math.PI) / 180;
  const lat1 = (c1[0] * Math.PI) / 180;
  const lat2 = (c2[0] * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Estimate transit duration in minutes based on distance and mode
 */
export function estimateTransitTime(
  distanceKm: number,
  mode: "chauffeur" | "helicopter" | "walking" | "boat" = "chauffeur"
): number {
  if (distanceKm <= 0.05) return 2;

  switch (mode) {
    case "helicopter":
      // ~220 km/h + 5 min boarding/clearance buffer
      return Math.round(5 + (distanceKm / 220) * 60);
    case "walking":
      // ~4.5 km/h
      return Math.round((distanceKm / 4.5) * 60);
    case "boat":
      // ~35 km/h + 5 min docking
      return Math.round(5 + (distanceKm / 35) * 60);
    case "chauffeur":
    default:
      // Mountain/urban luxury transfer avg ~40 km/h + 5 min pickup buffer
      return Math.max(5, Math.round(5 + (distanceKm / 40) * 60));
  }
}

/**
 * Calculate total transit distance for an ordered list of stops
 */
export function calculateTotalDistance(stops: ItineraryStop[]): number {
  let total = 0;
  for (let i = 0; i < stops.length - 1; i++) {
    total += haversineDistance(stops[i].coords, stops[i + 1].coords);
  }
  return total;
}

/**
 * 2-Opt Traveling Salesperson Heuristic Optimization
 * Preserves the first stop (typically arrival / hotel base) and optimizes intermediate stops
 * to minimize total travel distance and transit friction.
 */
export function twoOptOptimizer(stops: ItineraryStop[]): {
  optimizedStops: ItineraryStop[];
  initialDistanceKm: number;
  optimizedDistanceKm: number;
  distanceSavedKm: number;
  transitLegs: TransitLeg[];
} {
  if (stops.length <= 3) {
    const initialDist = calculateTotalDistance(stops);
    return {
      optimizedStops: stops,
      initialDistanceKm: Number(initialDist.toFixed(2)),
      optimizedDistanceKm: Number(initialDist.toFixed(2)),
      distanceSavedKm: 0,
      transitLegs: generateTransitLegs(stops),
    };
  }

  const initialDist = calculateTotalDistance(stops);
  let route = [...stops];
  let improved = true;
  let iterations = 0;
  const maxIterations = 50;

  // We keep stop 0 fixed (e.g. morning departure base)
  while (improved && iterations < maxIterations) {
    improved = false;
    iterations++;

    for (let i = 1; i < route.length - 1; i++) {
      for (let k = i + 1; k < route.length; k++) {
        const currentDist =
          haversineDistance(route[i - 1].coords, route[i].coords) +
          (k + 1 < route.length
            ? haversineDistance(route[k].coords, route[k + 1].coords)
            : 0);

        const newDist =
          haversineDistance(route[i - 1].coords, route[k].coords) +
          (k + 1 < route.length
            ? haversineDistance(route[i].coords, route[k + 1].coords)
            : 0);

        if (newDist < currentDist - 0.05) {
          // Perform 2-opt swap: reverse route from index i to k
          const sub = route.slice(i, k + 1).reverse();
          route = [...route.slice(0, i), ...sub, ...route.slice(k + 1)];
          improved = true;
          break;
        }
      }
      if (improved) break;
    }
  }

  // Recalculate scheduled start and end times preserving stop durations
  const optimizedWithTimes = recalculateSchedule(route);
  const finalDist = calculateTotalDistance(optimizedWithTimes);

  return {
    optimizedStops: optimizedWithTimes,
    initialDistanceKm: Number(initialDist.toFixed(2)),
    optimizedDistanceKm: Number(finalDist.toFixed(2)),
    distanceSavedKm: Number(Math.max(0, initialDist - finalDist).toFixed(2)),
    transitLegs: generateTransitLegs(optimizedWithTimes),
  };
}

/**
 * Generate transit leg details between sequential stops
 */
export function generateTransitLegs(stops: ItineraryStop[]): TransitLeg[] {
  const legs: TransitLeg[] = [];
  for (let i = 0; i < stops.length - 1; i++) {
    const from = stops[i];
    const to = stops[i + 1];
    const dist = haversineDistance(from.coords, to.coords);
    const mode = dist > 60 ? "helicopter" : dist < 1.0 ? "walking" : "chauffeur";
    const duration = estimateTransitTime(dist, mode);

    legs.push({
      fromStopId: from.id,
      toStopId: to.id,
      mode,
      durationMinutes: duration,
      distanceKm: Number(dist.toFixed(2)),
    });
  }
  return legs;
}

/**
 * Convert time string "HH:MM" to minutes from midnight
 */
export function timeToMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + (m || 0);
}

/**
 * Convert minutes from midnight to "HH:MM"
 */
export function minutesToTime(minutes: number): string {
  const normalized = Math.max(0, Math.min(24 * 60 - 1, minutes));
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

/**
 * Recalculate scheduled stop times sequentially maintaining durations and transit gaps
 */
export function recalculateSchedule(
  stops: ItineraryStop[],
  dayStartTime?: string
): ItineraryStop[] {
  if (stops.length === 0) return [];

  const initialTime = dayStartTime || stops[0].startTime || "09:00";
  let currentMin = timeToMinutes(initialTime);

  return stops.map((stop, idx) => {
    if (idx > 0) {
      const prevStop = stops[idx - 1];
      const dist = haversineDistance(prevStop.coords, stop.coords);
      const transitMin = estimateTransitTime(dist);
      currentMin += transitMin;
    }

    const startStr = minutesToTime(currentMin);
    const endMin = currentMin + stop.durationMinutes;
    const endStr = minutesToTime(endMin);

    currentMin = endMin;

    return {
      ...stop,
      startTime: startStr,
      endTime: endStr,
    };
  });
}

/**
 * Detect schedule conflicts:
 * 1. Opening hours overlap (arriving before opening or staying past closing)
 * 2. Transit overlap (gap between stops is less than estimated transit travel time)
 */
export function detectScheduleConflicts(stops: ItineraryStop[]): ConflictAlert[] {
  const alerts: ConflictAlert[] = [];

  for (let i = 0; i < stops.length; i++) {
    const stop = stops[i];
    const startMin = timeToMinutes(stop.startTime);
    const endMin = timeToMinutes(stop.endTime);

    // 1. Check opening hours
    if (stop.openingHours) {
      const openMin = timeToMinutes(stop.openingHours.open);
      const closeMin = timeToMinutes(stop.openingHours.close);

      if (startMin < openMin) {
        alerts.push({
          type: "opening_hours",
          severity: "warning",
          stopId: stop.id,
          stopTitle: stop.title,
          message: `${stop.title} opens at ${stop.openingHours.open}, but your arrival is scheduled at ${stop.startTime}.`,
        });
      }

      if (endMin > closeMin) {
        alerts.push({
          type: "opening_hours",
          severity: "error",
          stopId: stop.id,
          stopTitle: stop.title,
          message: `${stop.title} closes at ${stop.openingHours.close}, but your visit ends at ${stop.endTime}.`,
        });
      }
    }

    // 2. Check transit gap to next stop
    if (i < stops.length - 1) {
      const nextStop = stops[i + 1];
      const nextStartMin = timeToMinutes(nextStop.startTime);
      const gapMin = nextStartMin - endMin;
      const distance = haversineDistance(stop.coords, nextStop.coords);
      const requiredTransitMin = estimateTransitTime(distance);

      if (gapMin < requiredTransitMin) {
        alerts.push({
          type: "transit_overlap",
          severity: "warning",
          stopId: nextStop.id,
          stopTitle: nextStop.title,
          message: `Only ${Math.max(0, gapMin)} min buffer between ${stop.title} and ${nextStop.title}, but private transfer requires ~${requiredTransitMin} min.`,
        });
      }
    }
  }

  return alerts;
}
