import { describe, it, expect } from "vitest";
import {
  haversineDistance,
  estimateTransitTime,
  twoOptOptimizer,
  detectScheduleConflicts,
  recalculateSchedule,
} from "../../src/features/itinerary/utils/routeOptimizer";
import { generateItineraryIcs } from "../../src/features/itinerary/export/ics";
import { ItineraryStop, Itinerary } from "../../src/features/itinerary/types";

describe("Voyara Itinerary & Route Optimizer Suite", () => {
  it("calculates accurate Haversine distance between Zurich and St. Moritz", () => {
    const distZrhStm = haversineDistance([47.3769, 8.5417], [46.4981, 9.8427]);
    expect(distZrhStm).toBeGreaterThan(130);
    expect(distZrhStm).toBeLessThan(155);
  });

  it("estimates transit time accurately for mountain chauffeur and VIP helicopter", () => {
    const transitChauffeur = estimateTransitTime(40, "chauffeur");
    expect(transitChauffeur).toBeGreaterThanOrEqual(60);
    expect(transitChauffeur).toBeLessThanOrEqual(70);

    const transitHeli = estimateTransitTime(100, "helicopter");
    expect(transitHeli).toBeGreaterThanOrEqual(30);
    expect(transitHeli).toBeLessThanOrEqual(35);
  });

  it("reduces or maintains total transit distance using 2-Opt TSP heuristic", () => {
    const messyStops: ItineraryStop[] = [
      {
        id: "s1",
        title: "Hotel Base (St. Moritz)",
        category: "accommodation",
        startTime: "09:00",
        endTime: "10:00",
        durationMinutes: 60,
        locationName: "Badrutt's Palace",
        coords: [46.4981, 9.8427],
      },
      {
        id: "s2",
        title: "Zuoz Alpine Village (Far East)",
        category: "culture",
        startTime: "10:30",
        endTime: "12:00",
        durationMinutes: 90,
        locationName: "Zuoz Old Town",
        coords: [46.602, 9.96],
      },
      {
        id: "s3",
        title: "Chantarella Ski Station (Close West)",
        category: "activity",
        startTime: "13:00",
        endTime: "15:00",
        durationMinutes: 120,
        locationName: "Chantarella Corviglia",
        coords: [46.502, 9.835],
      },
      {
        id: "s4",
        title: "Samedan Golf & Spa (Mid East)",
        category: "leisure",
        startTime: "16:00",
        endTime: "17:30",
        durationMinutes: 90,
        locationName: "Samedan",
        coords: [46.534, 9.871],
      },
    ];

    const optimizationResult = twoOptOptimizer(messyStops);
    expect(optimizationResult.distanceSavedKm).toBeGreaterThanOrEqual(0);
    expect(optimizationResult.optimizedStops).toHaveLength(4);
    // Base stop pinned first
    expect(optimizationResult.optimizedStops[0].id).toBe("s1");
  });

  it("recalculates schedule sequential timing accurately", () => {
    const sampleStops: ItineraryStop[] = [
      {
        id: "a1",
        title: "Breakfast at Kulm",
        category: "dining",
        startTime: "08:00",
        endTime: "09:00",
        durationMinutes: 60,
        locationName: "Kulm Country Club",
        coords: [46.499, 9.845],
      },
      {
        id: "a2",
        title: "Corvatsch Glacier Tour",
        category: "activity",
        startTime: "10:00",
        endTime: "12:30",
        durationMinutes: 150,
        locationName: "Corvatsch",
        coords: [46.421, 9.821],
      },
    ];

    const rescheduled = recalculateSchedule(sampleStops, "08:30");
    expect(rescheduled[0].startTime).toBe("08:30");
    expect(rescheduled[0].endTime).toBe("09:30");
    expect(rescheduled[1].startTime).toBe("09:47");
  });

  it("detects opening-hours conflicts and insufficient transit buffer", () => {
    const conflictStops: ItineraryStop[] = [
      {
        id: "c1",
        title: "Museum Tour",
        category: "culture",
        startTime: "08:30",
        endTime: "09:30",
        durationMinutes: 60,
        locationName: "Segantini Museum",
        coords: [46.495, 9.837],
        openingHours: { open: "10:00", close: "17:00" },
      },
      {
        id: "c2",
        title: "Far Away Dinner",
        category: "dining",
        startTime: "09:35",
        endTime: "11:00",
        durationMinutes: 85,
        locationName: "Castelmur Bergell",
        coords: [46.335, 9.585],
      },
    ];

    const conflicts = detectScheduleConflicts(conflictStops);
    const openingConflict = conflicts.find((c) => c.type === "opening_hours");
    const bufferConflict = conflicts.find((c) => c.type === "transit_buffer");

    expect(openingConflict).toBeDefined();
    expect(bufferConflict).toBeDefined();
  });

  it("conforms to RFC 5545 specifications with coordinates and VIP metadata for ICS generator", () => {
    const testItinerary: Itinerary = {
      id: "itin-test-1",
      title: "Voyara St. Moritz Winter Sanctum",
      clientName: "Lord Julian Vance",
      destination: "St. Moritz, Switzerland",
      currency: "CHF",
      totalBudget: 45000,
      days: [
        {
          dayNumber: 1,
          date: "2026-12-10",
          title: "Arrival Day",
          summary: "Touchdown at LSZS",
          weatherSummary: { temp: "-2°C", condition: "Sunny" },
          stops: [
            {
              id: "t-stop-1",
              title: "Private Jet Touchdown",
              category: "aviation",
              startTime: "11:00",
              endTime: "12:00",
              durationMinutes: 60,
              locationName: "Samedan FBO",
              coords: [46.5342, 9.8841],
              bookingRef: "VOYARA-VIP-001",
            },
          ],
        },
      ],
    };

    const icsOutput = generateItineraryIcs(testItinerary);
    expect(icsOutput).toContain("BEGIN:VCALENDAR");
    expect(icsOutput).toContain("VERSION:2.0");
    expect(icsOutput).toContain("SUMMARY:Private Jet Touchdown (Voyara VIP)");
    expect(icsOutput).toContain("GEO:46.53420;9.88410");
    expect(icsOutput).toContain("END:VCALENDAR");
  });
});
