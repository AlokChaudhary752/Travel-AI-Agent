export type SectorStatus = "on_time" | "delayed" | "diverted" | "standby";

export interface FlightSector {
  flightNumber: string;
  airline: string;
  aircraft: string;
  origin: {
    code: string;
    city: string;
    airport: string;
    gate: string;
    departureTime: string;
    weather: string;
    temp: string;
  };
  destination: {
    code: string;
    city: string;
    airport: string;
    gate: string;
    arrivalTime: string;
    weather: string;
    temp: string;
  };
  telemetry: {
    altitudeFeet: number;
    groundSpeedKnots: number;
    currentCoordinates: [number, number]; // [lat, lng]
    squawk: string;
    flightLevel: string;
    distanceRemainingKm: number;
    estimatedArrivalDelayMin: number;
  };
  status: SectorStatus;
  contingencyActive: boolean;
}

export interface PriceAlert {
  id: string;
  route: string;
  originCode: string;
  destCode: string;
  airline: string;
  cabin: "Private Charter" | "First Class" | "Business Class";
  currentPriceINR: number;
  previousPriceINR: number;
  targetAlertPriceINR: number;
  priceDropINR: number;
  priceTrend: number[]; // Sparkline data (last 7 days)
  status: "triggered" | "watching" | "booked";
  alertDate: string;
}

export interface ContingencyHold {
  id: string;
  carrier: string;
  flightNumber: string;
  routing: string;
  departureTime: string;
  cabin: string;
  holdExpiresInMinutes: number;
  tarmacTransferStatus: "Helicopter on Standby" | "Maybach S-Class Dispatch" | "VIP Lounge Hold";
  priceDiffINR: number;
}
