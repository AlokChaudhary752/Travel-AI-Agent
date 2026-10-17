import { z } from "zod";

// 1. Weather Tool Schema
export const GetWeatherSchema = z.object({
  location: z.string().describe("City, resort or island name (e.g., 'St. Moritz', 'North Male Atoll')"),
  dates: z.array(z.string()).describe("ISO date strings (YYYY-MM-DD)"),
});

// 2. Flight Search Schema
export const SearchFlightsSchema = z.object({
  origin: z.string().length(3).describe("3-letter IATA code (e.g. 'BOM', 'DXB', 'LHR')"),
  destination: z.string().length(3).describe("3-letter IATA code (e.g. 'ZRH', 'MLE', 'JFK')"),
  departureDate: z.string().describe("Departure date (YYYY-MM-DD)"),
  returnDate: z.string().optional().describe("Return date (YYYY-MM-DD)"),
  cabinClass: z.enum(["FIRST", "BUSINESS", "PREMIUM_ECONOMY"]).default("BUSINESS"),
  adults: z.number().int().min(1).default(1),
});

// 3. Hotel Search Schema
export const SearchHotelsSchema = z.object({
  cityOrResort: z.string().describe("Destination or atoll name"),
  checkInDate: z.string().describe("Check-in date (YYYY-MM-DD)"),
  checkOutDate: z.string().describe("Check-out date (YYYY-MM-DD)"),
  ratingMin: z.number().min(4).max(5).default(5),
  luxuryAmenities: z.array(z.string()).optional().describe("Required amenities, e.g. ['PRIVATE_POOL', 'MICHELIN_CHEF']"),
});

// 4. Find Places Schema
export const FindPlacesSchema = z.object({
  destination: z.string().describe("Destination name"),
  category: z.enum(["dining", "culture", "wellness", "nightlife", "secret_spots"]),
  dietaryPreference: z.string().optional().describe("e.g. 'jain', 'vegan', 'michelin'"),
});

// 5. Currency Converter Schema
export const ConvertCurrencySchema = z.object({
  amount: z.number().positive(),
  from: z.string().length(3).describe("3-letter ISO (e.g. 'USD')"),
  to: z.string().length(3).describe("3-letter ISO (e.g. 'INR', 'EUR', 'GBP')"),
});

// 6. Route & Transit Optimizer Schema
export const GetRouteSchema = z.object({
  origin: z.string(),
  destination: z.string(),
  mode: z.enum(["helicopter", "private_chauffeured", "seaplane", "first_class_rail"]),
});

// 7. Itinerary Builder Schema
export const BuildItinerarySchema = z.object({
  title: z.string(),
  destination: z.string(),
  days: z.number().int().min(1).max(30),
  pace: z.enum(["slow", "balanced", "dynamic"]),
  vipPreferences: z.array(z.string()),
});

// 8. Price Alert Schema
export const CreatePriceAlertSchema = z.object({
  origin: z.string().length(3),
  destination: z.string().length(3),
  departureDate: z.string(),
  targetPrice: z.number().positive(),
  currency: z.string().default("USD"),
});

// 9. Add Expense Schema
export const AddExpenseSchema = z.object({
  tripTitle: z.string(),
  title: z.string(),
  amount: z.number().positive(),
  currency: z.string().default("USD"),
  category: z.string(),
});

// 10. Update Packing List Schema
export const UpdatePackingListSchema = z.object({
  destination: z.string(),
  climate: z.string(),
  activities: z.array(z.string()),
});
