import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FlightSector, PriceAlert, ContingencyHold } from "../types";

export type SimulationMode = "nominal" | "weather_alert" | "tarmac_delay";

interface RadarState {
  activeSector: FlightSector;
  contingencyHolds: ContingencyHold[];
  priceAlerts: PriceAlert[];
  simulationMode: SimulationMode;
  rebookedSector: ContingencyHold | null;
  scanFrequencySeconds: number;
  lastScannedTime: string;

  // Actions
  setSimulationMode: (mode: SimulationMode) => void;
  authorizeAutoRebook: (holdId: string) => void;
  resetFlightStatus: () => void;
  addPriceAlert: (alert: Omit<PriceAlert, "id" | "status" | "priceDropINR">) => void;
  dismissPriceAlert: (id: string) => void;
}

const INITIAL_SECTOR: FlightSector = {
  flightNumber: "LX 155",
  airline: "Swiss International Air Lines",
  aircraft: "Boeing 777-300ER (Lie-Flat First Suite)",
  origin: {
    code: "BOM",
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj Intl T2",
    gate: "VIP Terminal Gate P1",
    departureTime: "01:25 IST",
    weather: "Fair, 28°C",
    temp: "28°C",
  },
  destination: {
    code: "ZRH",
    city: "Zurich",
    airport: "Zurich Kloten Airport",
    gate: "Gate E26 (Direct VIP Jetbridge)",
    arrivalTime: "06:15 CET",
    weather: "Light Snow, -2°C",
    temp: "-2°C",
  },
  telemetry: {
    altitudeFeet: 36000,
    groundSpeedKnots: 512,
    currentCoordinates: [32.14, 48.72],
    squawk: "7214",
    flightLevel: "FL360",
    distanceRemainingKm: 2840,
    estimatedArrivalDelayMin: 0,
  },
  status: "on_time",
  contingencyActive: false,
};

const INITIAL_CONTINGENCY_HOLDS: ContingencyHold[] = [
  {
    id: "hold-dxb",
    carrier: "Emirates First Class",
    flightNumber: "EK 501 ➔ EK 87",
    routing: "BOM ➔ DXB ➔ ZRH (Private Suite A380)",
    departureTime: "04:30 IST (+3h standby)",
    cabin: "Game Changer Private Suite",
    holdExpiresInMinutes: 42,
    tarmacTransferStatus: "Maybach S-Class Dispatch",
    priceDiffINR: 0, // Covered under Voyara Elite Disruption Guarantee
  },
  {
    id: "hold-doh",
    carrier: "Qatar Airways Qsuite",
    flightNumber: "QR 557 ➔ QR 95",
    routing: "BOM ➔ DOH ➔ ZRH (Direct Qsuite Double Bed)",
    departureTime: "03:55 IST (+2.5h standby)",
    cabin: "Qsuite Double Suite",
    holdExpiresInMinutes: 58,
    tarmacTransferStatus: "VIP Lounge Hold",
    priceDiffINR: 0,
  },
];

const INITIAL_PRICE_ALERTS: PriceAlert[] = [
  {
    id: "pa-1",
    route: "BOM ➔ ZRH (Mumbai to Zurich)",
    originCode: "BOM",
    destCode: "ZRH",
    airline: "Swiss International",
    cabin: "Business Class",
    currentPriceINR: 198000,
    previousPriceINR: 232000,
    targetAlertPriceINR: 205000,
    priceDropINR: 34000,
    priceTrend: [248000, 241000, 235000, 232000, 225000, 209000, 198000],
    status: "triggered",
    alertDate: "Today at 09:14 AM",
  },
  {
    id: "pa-2",
    route: "DEL ➔ MLE (Delhi to Maldives)",
    originCode: "DEL",
    destCode: "MLE",
    airline: "Air India / Vistara",
    cabin: "Business Class",
    currentPriceINR: 124000,
    previousPriceINR: 138000,
    targetAlertPriceINR: 130000,
    priceDropINR: 14000,
    priceTrend: [145000, 142000, 139000, 138000, 135000, 128000, 124000],
    status: "triggered",
    alertDate: "Yesterday at 17:40 PM",
  },
  {
    id: "pa-3",
    route: "BOM ➔ DXB (Mumbai to Dubai)",
    originCode: "BOM",
    destCode: "DXB",
    airline: "Emirates",
    cabin: "First Class",
    currentPriceINR: 310000,
    previousPriceINR: 315000,
    targetAlertPriceINR: 290000,
    priceDropINR: 0,
    priceTrend: [320000, 318000, 315000, 315000, 312000, 311000, 310000],
    status: "watching",
    alertDate: "Tracking Active",
  },
];

export const useRadarStore = create<RadarState>()(
  persist(
    (set, get) => ({
      activeSector: INITIAL_SECTOR,
      contingencyHolds: INITIAL_CONTINGENCY_HOLDS,
      priceAlerts: INITIAL_PRICE_ALERTS,
      simulationMode: "nominal",
      rebookedSector: null,
      scanFrequencySeconds: 30,
      lastScannedTime: "Just now",

      setSimulationMode: (mode: SimulationMode) => {
        const base = { ...INITIAL_SECTOR };

        if (mode === "weather_alert") {
          set({
            simulationMode: mode,
            activeSector: {
              ...base,
              status: "diverted",
              contingencyActive: true,
              telemetry: {
                ...base.telemetry,
                estimatedArrivalDelayMin: 85,
                altitudeFeet: 28000,
                groundSpeedKnots: 420,
              },
              destination: {
                ...base.destination,
                weather: "Severe Alpine Blizzard, Heavy Gusts 45kt, Visibility < 300m",
                temp: "-6°C",
              },
            },
          });
        } else if (mode === "tarmac_delay") {
          set({
            simulationMode: mode,
            activeSector: {
              ...base,
              status: "delayed",
              contingencyActive: true,
              telemetry: {
                ...base.telemetry,
                estimatedArrivalDelayMin: 55,
                altitudeFeet: 0,
                groundSpeedKnots: 0,
              },
              origin: {
                ...base.origin,
                weather: "Air Traffic Flow Control (ATFM) Gate Hold Active",
              },
            },
          });
        } else {
          set({
            simulationMode: "nominal",
            activeSector: INITIAL_SECTOR,
            rebookedSector: null,
          });
        }
      },

      authorizeAutoRebook: (holdId: string) => {
        const hold = get().contingencyHolds.find((h) => h.id === holdId);
        if (hold) {
          set({
            rebookedSector: hold,
            activeSector: {
              ...get().activeSector,
              status: "on_time",
              flightNumber: hold.flightNumber,
              airline: hold.carrier,
              contingencyActive: false,
              telemetry: {
                ...get().activeSector.telemetry,
                estimatedArrivalDelayMin: 0,
              },
            },
          });
        }
      },

      resetFlightStatus: () => {
        set({
          simulationMode: "nominal",
          activeSector: INITIAL_SECTOR,
          rebookedSector: null,
        });
      },

      addPriceAlert: (alertData) => {
        const newAlert: PriceAlert = {
          ...alertData,
          id: `pa-${Date.now()}`,
          status: "watching",
          priceDropINR: 0,
        };
        set({ priceAlerts: [newAlert, ...get().priceAlerts] });
      },

      dismissPriceAlert: (id: string) => {
        set({
          priceAlerts: get().priceAlerts.filter((a) => a.id !== id),
        });
      },
    }),
    {
      name: "voyara-radar-state",
    }
  )
);
