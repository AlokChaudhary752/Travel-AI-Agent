import {
  haversineDistance,
  estimateTransitTime,
  twoOptOptimizer,
  detectScheduleConflicts,
  recalculateSchedule,
} from "../../src/features/itinerary/utils/routeOptimizer";
import { generateItineraryIcs } from "../../src/features/itinerary/export/ics";
import { ItineraryStop, Itinerary } from "../../src/features/itinerary/types";

function runTests() {
  console.log("=== VOYARA PHASE 4: ITINERARY & ROUTE OPTIMIZER TEST SUITE ===\n");
  let passed = 0;
  let total = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    total++;
    if (condition) {
      console.log(`✓ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`✗ [FAIL] ${testName}${detail ? ` - ${detail}` : ""}`);
    }
  }

  // 1. Haversine Distance
  const distZrhStm = haversineDistance([47.3769, 8.5417], [46.4981, 9.8427]);
  assert(
    distZrhStm > 130 && distZrhStm < 155,
    "Haversine distance calculation between Zurich and St. Moritz",
    `Expected ~140km, got ${distZrhStm.toFixed(1)}km`
  );

  // 2. Transit time estimation
  const transitChauffeur = estimateTransitTime(40, "chauffeur");
  assert(
    transitChauffeur >= 60 && transitChauffeur <= 70,
    "Transit time for 40km mountain chauffeur",
    `Expected ~65 min, got ${transitChauffeur} min`
  );

  const transitHeli = estimateTransitTime(100, "helicopter");
  assert(
    transitHeli >= 30 && transitHeli <= 35,
    "Transit time for 100km VIP helicopter transfer",
    `Expected ~32 min, got ${transitHeli} min`
  );

  // 3. 2-Opt TSP Optimization
  // Create an intentionally sub-optimal criss-crossing route:
  // Base (St. Moritz Village) -> Zuoz (Far East) -> Chantarella (Close West) -> Samedan (Mid East)
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
      category: "dining",
      startTime: "10:30",
      endTime: "12:00",
      durationMinutes: 90,
      locationName: "Zuoz",
      coords: [46.6028, 9.9602],
    },
    {
      id: "s3",
      title: "Chantarella Station (Near West)",
      category: "leisure",
      startTime: "12:30",
      endTime: "14:00",
      durationMinutes: 90,
      locationName: "Chantarella",
      coords: [46.5002, 9.8405],
    },
    {
      id: "s4",
      title: "Samedan Airport (Mid East)",
      category: "aviation",
      startTime: "14:30",
      endTime: "15:30",
      durationMinutes: 60,
      locationName: "Samedan",
      coords: [46.5342, 9.8841],
    },
  ];

  const optResult = twoOptOptimizer(messyStops);
  assert(
    optResult.optimizedDistanceKm <= optResult.initialDistanceKm,
    "2-Opt TSP reduces or maintains total transit distance",
    `Initial: ${optResult.initialDistanceKm}km, Optimized: ${optResult.optimizedDistanceKm}km`
  );
  assert(
    optResult.distanceSavedKm >= 0,
    "Distance saved is non-negative",
    `Saved: ${optResult.distanceSavedKm}km`
  );

  // 4. Sequential time recalculation
  const recomputed = recalculateSchedule(messyStops, "09:00");
  assert(
    recomputed[0].startTime === "09:00" && recomputed[0].endTime === "10:00",
    "Recalculate schedule sets initial stop correctly"
  );
  assert(
    recomputed[1].startTime > "10:00",
    "Subsequent stop accounts for duration plus transit gap",
    `Stop 1 ends 10:00, Stop 2 starts ${recomputed[1].startTime}`
  );

  // 5. Schedule Conflict Detection
  const conflictingStops: ItineraryStop[] = [
    {
      id: "c1",
      title: "Early Bird Lounge",
      category: "dining",
      startTime: "08:00", // Opens at 10:00 -> should conflict
      endTime: "09:30",
      durationMinutes: 90,
      locationName: "Alpine Lounge",
      coords: [46.4981, 9.8427],
      openingHours: { open: "10:00", close: "22:00" },
    },
    {
      id: "c2",
      title: "Instant Transfer Far Mountain",
      category: "leisure",
      startTime: "09:35", // Only 5 min gap for ~30km transfer -> transit conflict
      endTime: "11:00",
      durationMinutes: 85,
      locationName: "Distant Summit",
      coords: [46.7028, 9.9902],
    },
  ];

  const conflicts = detectScheduleConflicts(conflictingStops);
  const openingConflict = conflicts.find((c) => c.type === "opening_hours");
  const transitConflict = conflicts.find((c) => c.type === "transit_overlap");

  assert(
    openingConflict !== undefined,
    "Conflict detector identifies early arrival before venue opening hours",
    openingConflict?.message
  );
  assert(
    transitConflict !== undefined,
    "Conflict detector identifies insufficient transit buffer between far stops",
    transitConflict?.message
  );

  // 6. RFC 5545 iCalendar Exporter
  const testItinerary: Itinerary = {
    id: "test-itin-1",
    title: "St. Moritz Winter VIP Test",
    destination: "St. Moritz, Switzerland",
    startDate: "2026-12-10",
    endDate: "2026-12-12",
    leadGuest: "Lord Julian Vance",
    partySize: 2,
    status: "confirmed",
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
  assert(
    icsOutput.includes("BEGIN:VCALENDAR") &&
      icsOutput.includes("VERSION:2.0") &&
      icsOutput.includes("SUMMARY:Private Jet Touchdown (Voyara VIP)") &&
      icsOutput.includes("GEO:46.53420;9.88410") &&
      icsOutput.includes("END:VCALENDAR"),
    "ICS Generator conforms to RFC 5545 specifications with coordinates and VIP metadata"
  );

  console.log(`\n==================================================`);
  console.log(`TOTAL TESTS: ${total} | PASSED: ${passed} | FAILED: ${total - passed}`);
  console.log(`==================================================\n`);

  if (passed !== total) {
    process.exit(1);
  }
}

runTests();
