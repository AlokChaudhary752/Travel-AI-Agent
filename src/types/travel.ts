export type Role = "Owner" | "Agent" | "Accountant";

export type LeadStatus = "New" | "Contacted" | "Quote sent" | "Negotiation" | "Won" | "Lost";

export type BookingStatus = "Draft" | "Confirmed" | "In Progress" | "Completed" | "Cancelled";

export type PaymentStatus = "Paid" | "Partial" | "Due" | "Overdue";

export interface Traveller {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  passportNumber?: string;
  foodPreference?: "Veg" | "Jain" | "Non-Veg" | "Vegan";
}

export interface DocumentChecklist {
  passport: boolean;
  visa: boolean;
  flights: boolean;
  hotelVouchers: boolean;
  insurance: boolean;
}

export interface Booking {
  id: string;
  bookingCode: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  destination: string;
  startDate: string;
  endDate: string;
  paxAdults: number;
  paxChildren: number;
  packageId?: string;
  packageName: string;
  totalAmount: number;
  paidAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  leadSource: string;
  assignedAgent: string;
  travellers: Traveller[];
  checklist: DocumentChecklist;
  notes?: string;
  createdAt: string;
  invoiceNumber: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  budgetInr: number;
  pax: number;
  travelMonth: string;
  status: LeadStatus;
  score: number; // 0-100
  source: "Instagram" | "Referral" | "Google Ads" | "Walk-in" | "HNI Concierge" | "Website";
  assignedAgent: string;
  followUpDate: string;
  isOverdue?: boolean;
  notes: string;
  lastContactedAt: string;
  createdAt: string;
  aiSuggestedFollowUp?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalSpend: number;
  tripsCount: number;
  tier: "Silver" | "Gold" | "Black Diamond";
  preferences: string[];
  dietary: string;
  birthday?: string;
  anniversary?: string;
  passportExpiry?: string;
  notes: string;
  lastTripDate: string;
  favouriteDestinations: string[];
}

export interface PackageDay {
  day: number;
  title: string;
  location: string;
  hotel: string;
  activities: string[];
  meals: string;
  transport: string;
  estimatedCost: number;
}

export interface PackageInventory {
  id: string;
  title: string;
  tagline: string;
  destination: string;
  region: "Domestic" | "International";
  durationDays: number;
  pricePerPersonInr: number;
  costPerPersonInr: number;
  grossMarginPct: number;
  totalCapacity: number;
  bookedSeats: number;
  availableSeats: number;
  itinerary: PackageDay[];
  inclusions: string[];
  exclusions: string[];
  heroImage: string;
  status: "Active" | "Archived" | "Draft";
}

export interface Supplier {
  id: string;
  name: string;
  category: "Hotel" | "Transport" | "Activity / Guide" | "Charter Flight";
  location: string;
  contactPerson: string;
  phone: string;
  email: string;
  rating: number;
  contractedNetRateInr: number;
  retailPriceInr: number;
  notes: string;
}

export interface InvoiceSchedule {
  milestone: string;
  percentage: number;
  amount: number;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue";
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  bookingId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientGst?: string;
  destination: string;
  subtotal: number;
  cgst: number; // 2.5%
  sgst: number; // 2.5%
  igst: number; // 5% if inter-state
  totalWithTax: number;
  amountPaid: number;
  balanceDue: number;
  issueDate: string;
  dueDate: string;
  status: PaymentStatus;
  agingBucket: "0-15d" | "16-30d" | "31-60d" | "60d+";
  schedules: InvoiceSchedule[];
}

export interface AgencyTask {
  id: string;
  title: string;
  dueTime: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
  type: "Call" | "Voucher" | "Payment" | "Itinerary";
  leadOrBookingRef?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone: string;
  avatar: string;
  active: boolean;
  dealsWon: number;
  revenueGenerated: number;
}

export interface AgencySettings {
  agencyName: string;
  tagline: string;
  gstin: string;
  iataNumber: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  currency: string;
  gstRatePct: number;
  anthropicApiKey: string;
  bankDetails: {
    accountName: string;
    accountNumber: string;
    ifsc: string;
    bankName: string;
    upiId: string;
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "lead" | "payment" | "booking" | "system";
  link?: string;
}

export interface GeneratedItinerary {
  id: string;
  title: string;
  destination: string;
  durationDays: number;
  budgetInr: number;
  calculatedCostInr: number;
  recommendedMarkupPct: number;
  finalPriceInr: number;
  summary: string;
  days: PackageDay[];
  hotels: { name: string; roomType: string; nights: number; pricePerNight: number }[];
  transfers: { route: string; vehicle: string; cost: number }[];
  breakdown: {
    hotelsTotal: number;
    transfersTotal: number;
    activitiesTotal: number;
    gstTotal: number;
    marginTotal: number;
  };
  clientNotes: string;
  generatedByAi: boolean;
  modelUsed?: string;
}
