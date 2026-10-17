import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TravelProfileState {
  currentStep: number;
  identity: {
    fullName: string;
    phone: string;
    country: string;
  };
  travelDNA: {
    styles: string[]; // e.g. ["luxury", "honeymoon", "wellness"]
    pace: "slow" | "balanced" | "dynamic";
    companions: "solo" | "couple" | "family" | "entourage";
    aesthetic: string;
  };
  preferences: {
    budgetBand: string;
    climate: string;
    cuisine: string[]; // e.g. ["veg", "jain", "vegan", "michelin"]
    interests: string[];
    accessibilityNeeds: string;
    loyaltyPrograms: string[];
  };
  logistics: {
    homeAirport: string;
    homeCity: string;
    passportStatus: string;
    visaPrivileges: string[];
  };
  setStep: (step: number) => void;
  updateIdentity: (data: Partial<TravelProfileState["identity"]>) => void;
  updateTravelDNA: (data: Partial<TravelProfileState["travelDNA"]>) => void;
  updatePreferences: (data: Partial<TravelProfileState["preferences"]>) => void;
  updateLogistics: (data: Partial<TravelProfileState["logistics"]>) => void;
  resetOnboarding: () => void;
}

const defaultState = {
  currentStep: 1,
  identity: {
    fullName: "",
    phone: "",
    country: "India",
  },
  travelDNA: {
    styles: ["luxury"],
    pace: "balanced" as const,
    companions: "couple" as const,
    aesthetic: "Quiet Luxury",
  },
  preferences: {
    budgetBand: "$1,500+ / day",
    climate: "Alpine Temperate",
    cuisine: ["michelin", "fine_dining"],
    interests: ["Private Spa", "Michelin Dining", "Art & Architecture"],
    accessibilityNeeds: "None",
    loyaltyPrograms: ["Marriott Bonvoy Titanium", "Emirates Skywards Gold"],
  },
  logistics: {
    homeAirport: "BOM (Mumbai)",
    homeCity: "Mumbai",
    passportStatus: "Valid (> 10 years)",
    visaPrivileges: ["US B1/B2", "Schengen Multiple", "UK Multiple"],
  },
};

export const useOnboardingStore = create<TravelProfileState>()(
  persist(
    (set) => ({
      ...defaultState,
      setStep: (step) => set({ currentStep: step }),
      updateIdentity: (data) =>
        set((state) => ({ identity: { ...state.identity, ...data } })),
      updateTravelDNA: (data) =>
        set((state) => ({ travelDNA: { ...state.travelDNA, ...data } })),
      updatePreferences: (data) =>
        set((state) => ({ preferences: { ...state.preferences, ...data } })),
      updateLogistics: (data) =>
        set((state) => ({ logistics: { ...state.logistics, ...data } })),
      resetOnboarding: () => set(defaultState),
    }),
    {
      name: "voyara_travel_dna_draft",
    }
  )
);
