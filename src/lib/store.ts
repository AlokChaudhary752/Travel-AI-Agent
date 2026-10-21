"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Booking,
  Lead,
  Customer,
  PackageInventory,
  Supplier,
  Invoice,
  AgencyTask,
  TeamMember,
  AgencySettings,
  NotificationItem,
  Role,
  BookingStatus,
  LeadStatus,
  PaymentStatus,
} from "@/types/travel";
import {
  INITIAL_BOOKINGS,
  INITIAL_LEADS,
  INITIAL_CUSTOMERS,
  INITIAL_PACKAGES,
  INITIAL_SUPPLIERS,
  INITIAL_INVOICES,
  INITIAL_TASKS,
  INITIAL_NOTIFICATIONS,
  INITIAL_TEAM,
  INITIAL_SETTINGS,
} from "./seedData";

const STORAGE_KEY = "voyara_agency_saas_store_v1";
const CHANNEL_NAME = "voyara_cross_tab_sync";

export interface AppState {
  bookings: Booking[];
  leads: Lead[];
  customers: Customer[];
  packages: PackageInventory[];
  suppliers: Supplier[];
  invoices: Invoice[];
  tasks: AgencyTask[];
  notifications: NotificationItem[];
  team: TeamMember[];
  settings: AgencySettings;
  currentRole: Role;
  currentUser: TeamMember;
  dateRange: "7d" | "30d" | "90d" | "12m" | "all";
}

const getDefaultState = (): AppState => ({
  bookings: INITIAL_BOOKINGS,
  leads: INITIAL_LEADS,
  customers: INITIAL_CUSTOMERS,
  packages: INITIAL_PACKAGES,
  suppliers: INITIAL_SUPPLIERS,
  invoices: INITIAL_INVOICES,
  tasks: INITIAL_TASKS,
  notifications: INITIAL_NOTIFICATIONS,
  team: INITIAL_TEAM,
  settings: INITIAL_SETTINGS,
  currentRole: "Owner",
  currentUser: INITIAL_TEAM[0],
  dateRange: "30d",
});

// Singleton in-memory store for fast reactivity across components
let globalState: AppState | null = null;
const listeners = new Set<(state: AppState) => void>();
let broadcastChannel: BroadcastChannel | null = null;

if (typeof window !== "undefined") {
  try {
    broadcastChannel = new BroadcastChannel(CHANNEL_NAME);
    broadcastChannel.onmessage = (event) => {
      if (event.data?.type === "SYNC_STATE" && event.data.payload) {
        globalState = event.data.payload;
        listeners.forEach((listener) => listener(globalState!));
      }
    };
  } catch {
    // BroadcastChannel unsupported fallback
  }
}

function loadSavedState(): AppState {
  if (typeof window === "undefined") return getDefaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.bookings) && parsed.bookings.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Failed to parse localStorage state:", err);
  }
  const def = getDefaultState();
  saveStateToStorage(def);
  return def;
}

function saveStateToStorage(state: AppState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (broadcastChannel) {
      broadcastChannel.postMessage({ type: "SYNC_STATE", payload: state });
    }
  } catch (err) {
    console.error("Failed to save state to localStorage:", err);
  }
}

function updateGlobalState(updater: (prev: AppState) => AppState) {
  if (!globalState) {
    globalState = loadSavedState();
  }
  const next = updater(globalState);
  globalState = next;
  saveStateToStorage(next);
  listeners.forEach((listener) => listener(next));
}

export function useAgencyStore() {
  const [state, setState] = useState<AppState>(() => {
    if (!globalState) {
      globalState = loadSavedState();
    }
    return globalState;
  });

  useEffect(() => {
    if (!globalState) {
      globalState = loadSavedState();
      setState(globalState);
    }
    const listener = (newState: AppState) => {
      setState(newState);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  // Role switching
  const setCurrentRole = useCallback((role: Role) => {
    updateGlobalState((prev) => {
      const user = prev.team.find((m) => m.role === role) || prev.currentUser;
      return { ...prev, currentRole: role, currentUser: user };
    });
  }, []);

  // Date Range switching
  const setDateRange = useCallback((range: AppState["dateRange"]) => {
    updateGlobalState((prev) => ({ ...prev, dateRange: range }));
  }, []);

  // Leads Actions
  const updateLeadStatus = useCallback((leadId: string, newStatus: LeadStatus) => {
    updateGlobalState((prev) => {
      const updatedLeads = prev.leads.map((l) =>
        l.id === leadId
          ? {
              ...l,
              status: newStatus,
              lastContactedAt: new Date().toISOString().split("T")[0],
            }
          : l
      );
      return { ...prev, leads: updatedLeads };
    });
  }, []);

  const addLead = useCallback((leadData: Omit<Lead, "id" | "createdAt" | "lastContactedAt">) => {
    const newId = `lead-${Date.now()}`;
    const today = new Date().toISOString().split("T")[0];
    const newLead: Lead = {
      ...leadData,
      id: newId,
      createdAt: today,
      lastContactedAt: today,
    };
    updateGlobalState((prev) => ({
      ...prev,
      leads: [newLead, ...prev.leads],
      notifications: [
        {
          id: `notif-${Date.now()}`,
          title: "New Lead Created",
          message: `${newLead.name} (${newLead.destination}) added to pipeline.`,
          time: "Just now",
          read: false,
          type: "lead",
        },
        ...prev.notifications,
      ],
    }));
    return newLead;
  }, []);

  const updateLead = useCallback((leadId: string, updates: Partial<Lead>) => {
    updateGlobalState((prev) => ({
      ...prev,
      leads: prev.leads.map((l) => (l.id === leadId ? { ...l, ...updates } : l)),
    }));
  }, []);

  const deleteLead = useCallback((leadId: string) => {
    updateGlobalState((prev) => ({
      ...prev,
      leads: prev.leads.filter((l) => l.id !== leadId),
    }));
  }, []);

  // Convert Lead to Booking
  const convertLeadToBooking = useCallback(
    (leadId: string, bookingOverrides?: Partial<Booking>) => {
      let createdBooking: Booking | null = null;
      updateGlobalState((prev) => {
        const lead = prev.leads.find((l) => l.id === leadId);
        if (!lead) return prev;

        const bookingCode = `VYR-${new Date().getFullYear()}-${1000 + prev.bookings.length + 1}`;
        const invoiceNumber = `INV-VYR-${new Date().getFullYear()}-0${100 + prev.invoices.length + 1}`;
        const totalAmount = bookingOverrides?.totalAmount || lead.budgetInr;
        const paidAmount = bookingOverrides?.paidAmount || Math.round(totalAmount * 0.25);
        const today = new Date().toISOString().split("T")[0];

        const newBooking: Booking = {
          id: `bk-${Date.now()}`,
          bookingCode,
          guestName: lead.name,
          guestEmail: lead.email,
          guestPhone: lead.phone,
          destination: lead.destination,
          startDate: bookingOverrides?.startDate || today,
          endDate: bookingOverrides?.endDate || today,
          paxAdults: lead.pax,
          paxChildren: 0,
          packageName: bookingOverrides?.packageName || `${lead.destination} Bespoke Experience`,
          totalAmount,
          paidAmount,
          status: "Confirmed",
          paymentStatus: paidAmount >= totalAmount ? "Paid" : paidAmount > 0 ? "Partial" : "Due",
          leadSource: lead.source,
          assignedAgent: lead.assignedAgent || prev.currentUser.name,
          travellers: [
            {
              id: `tr-${Date.now()}-1`,
              name: lead.name,
              age: 35,
              gender: "Male",
              foodPreference: "Veg",
            },
          ],
          checklist: {
            passport: true,
            visa: false,
            flights: false,
            hotelVouchers: true,
            insurance: false,
          },
          notes: lead.notes,
          createdAt: today,
          invoiceNumber,
          ...bookingOverrides,
        };

        createdBooking = newBooking;

        // Auto-create customer if does not exist
        const customerExists = prev.customers.some(
          (c) => c.email.toLowerCase() === lead.email.toLowerCase()
        );
        let updatedCustomers = prev.customers;
        if (!customerExists) {
          const newCust: Customer = {
            id: `cust-${Date.now()}`,
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            city: "New Delhi",
            totalSpend: totalAmount,
            tripsCount: 1,
            tier: totalAmount > 1000000 ? "Black Diamond" : "Gold",
            preferences: ["Luxury stay"],
            dietary: "Veg",
            notes: `Converted from lead ${lead.id}`,
            lastTripDate: today,
            favouriteDestinations: [lead.destination],
          };
          updatedCustomers = [newCust, ...prev.customers];
        } else {
          updatedCustomers = prev.customers.map((c) =>
            c.email.toLowerCase() === lead.email.toLowerCase()
              ? {
                  ...c,
                  totalSpend: c.totalSpend + totalAmount,
                  tripsCount: c.tripsCount + 1,
                }
              : c
          );
        }

        // Create Invoice
        const subtotal = Math.round(totalAmount / 1.05);
        const tax = totalAmount - subtotal;
        const newInvoice: Invoice = {
          id: `inv-${Date.now()}`,
          invoiceNumber,
          bookingId: newBooking.id,
          clientName: lead.name,
          clientEmail: lead.email,
          clientPhone: lead.phone,
          destination: lead.destination,
          subtotal,
          cgst: Math.round(tax / 2),
          sgst: tax - Math.round(tax / 2),
          igst: 0,
          totalWithTax: totalAmount,
          amountPaid: paidAmount,
          balanceDue: totalAmount - paidAmount,
          issueDate: today,
          dueDate: newBooking.startDate,
          status: newBooking.paymentStatus,
          agingBucket: "0-15d",
          schedules: [
            {
              milestone: "25% Booking Deposit",
              percentage: 25,
              amount: Math.round(totalAmount * 0.25),
              dueDate: today,
              status: paidAmount >= totalAmount * 0.25 ? "Paid" : "Pending",
            },
            {
              milestone: "75% Balance Prior to Departure",
              percentage: 75,
              amount: Math.round(totalAmount * 0.75),
              dueDate: newBooking.startDate,
              status: paidAmount === totalAmount ? "Paid" : "Pending",
            },
          ],
        };

        // Decrement package availability if linked
        const updatedPackages = prev.packages.map((pkg) => {
          if (pkg.destination.toLowerCase() === lead.destination.toLowerCase() && pkg.availableSeats > 0) {
            return {
              ...pkg,
              availableSeats: Math.max(0, pkg.availableSeats - lead.pax),
              bookedSeats: pkg.bookedSeats + lead.pax,
            };
          }
          return pkg;
        });

        // Mark lead as Won
        const updatedLeads = prev.leads.map((l) =>
          l.id === leadId ? { ...l, status: "Won" as LeadStatus } : l
        );

        return {
          ...prev,
          leads: updatedLeads,
          bookings: [newBooking, ...prev.bookings],
          customers: updatedCustomers,
          invoices: [newInvoice, ...prev.invoices],
          packages: updatedPackages,
          notifications: [
            {
              id: `notif-${Date.now()}`,
              title: "Booking Won & Confirmed",
              message: `${newBooking.bookingCode} for ${newBooking.guestName} created with invoice ${invoiceNumber}.`,
              time: "Just now",
              read: false,
              type: "booking",
            },
            ...prev.notifications,
          ],
        };
      });
      return createdBooking;
    },
    []
  );

  // Bookings Actions
  const addBooking = useCallback((bookingData: Omit<Booking, "id" | "bookingCode" | "invoiceNumber" | "createdAt">) => {
    const today = new Date().toISOString().split("T")[0];
    const newId = `bk-${Date.now()}`;
    const code = `VYR-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`;
    const invoiceNumber = `INV-VYR-${new Date().getFullYear()}-0${Date.now().toString().slice(-3)}`;

    const newBooking: Booking = {
      ...bookingData,
      id: newId,
      bookingCode: code,
      invoiceNumber,
      createdAt: today,
    };

    updateGlobalState((prev) => ({
      ...prev,
      bookings: [newBooking, ...prev.bookings],
      notifications: [
        {
          id: `notif-${Date.now()}`,
          title: "New Booking Created",
          message: `${newBooking.bookingCode} confirmed for ${newBooking.guestName}.`,
          time: "Just now",
          read: false,
          type: "booking",
        },
        ...prev.notifications,
      ],
    }));
    return newBooking;
  }, []);

  const updateBooking = useCallback((bookingId: string, updates: Partial<Booking>) => {
    updateGlobalState((prev) => ({
      ...prev,
      bookings: prev.bookings.map((b) => (b.id === bookingId ? { ...b, ...updates } : b)),
    }));
  }, []);

  const updateBookingStatus = useCallback((bookingId: string, status: BookingStatus) => {
    updateGlobalState((prev) => ({
      ...prev,
      bookings: prev.bookings.map((b) => (b.id === bookingId ? { ...b, status } : b)),
    }));
  }, []);

  // Payments & Invoices Actions
  const recordPayment = useCallback((invoiceId: string, amount: number) => {
    updateGlobalState((prev) => {
      const invoice = prev.invoices.find((i) => i.id === invoiceId);
      if (!invoice) return prev;

      const newPaid = Math.min(invoice.totalWithTax, invoice.amountPaid + amount);
      const newBalance = invoice.totalWithTax - newPaid;
      const newStatus: PaymentStatus = newBalance === 0 ? "Paid" : newPaid > 0 ? "Partial" : "Due";

      const updatedInvoices = prev.invoices.map((i) =>
        i.id === invoiceId
          ? {
              ...i,
              amountPaid: newPaid,
              balanceDue: newBalance,
              status: newStatus,
            }
          : i
      );

      // Sync with corresponding booking
      const updatedBookings = prev.bookings.map((b) =>
        b.id === invoice.bookingId
          ? {
              ...b,
              paidAmount: newPaid,
              paymentStatus: newStatus,
            }
          : b
      );

      return {
        ...prev,
        invoices: updatedInvoices,
        bookings: updatedBookings,
        notifications: [
          {
            id: `notif-${Date.now()}`,
            title: "Payment Recorded",
            message: `₹${amount.toLocaleString("en-IN")} received for invoice ${invoice.invoiceNumber}.`,
            time: "Just now",
            read: false,
            type: "payment",
          },
          ...prev.notifications,
        ],
      };
    });
  }, []);

  // Tasks Actions
  const toggleTask = useCallback((taskId: string) => {
    updateGlobalState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)),
    }));
  }, []);

  const addTask = useCallback((taskData: Omit<AgencyTask, "id" | "completed">) => {
    const newTask: AgencyTask = {
      ...taskData,
      id: `task-${Date.now()}`,
      completed: false,
    };
    updateGlobalState((prev) => ({
      ...prev,
      tasks: [newTask, ...prev.tasks],
    }));
  }, []);

  // Packages Actions
  const addPackage = useCallback((pkg: Omit<PackageInventory, "id">) => {
    const newPkg: PackageInventory = {
      ...pkg,
      id: `pkg-${Date.now()}`,
    };
    updateGlobalState((prev) => ({
      ...prev,
      packages: [newPkg, ...prev.packages],
    }));
  }, []);

  // Settings Actions
  const updateSettings = useCallback((newSettings: Partial<AgencySettings>) => {
    updateGlobalState((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings },
    }));
  }, []);

  // Notifications Actions
  const markNotificationRead = useCallback((notifId: string) => {
    updateGlobalState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => (n.id === notifId ? { ...n, read: true } : n)),
    }));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    updateGlobalState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, read: true })),
    }));
  }, []);

  // Reset to Pristine Demo Data (80+ Bookings, 50+ Leads, etc.)
  const resetDemoData = useCallback(() => {
    const fresh = getDefaultState();
    globalState = fresh;
    saveStateToStorage(fresh);
    listeners.forEach((l) => l(fresh));
  }, []);

  return {
    ...state,
    setCurrentRole,
    setDateRange,
    // Leads
    addLead,
    updateLead,
    updateLeadStatus,
    deleteLead,
    convertLeadToBooking,
    // Bookings
    addBooking,
    updateBooking,
    updateBookingStatus,
    // Payments
    recordPayment,
    // Tasks
    toggleTask,
    addTask,
    // Packages
    addPackage,
    // Settings
    updateSettings,
    // Notifications
    markNotificationRead,
    markAllNotificationsRead,
    // Demo Reset
    resetDemoData,
  };
}

export function formatInr(val: number): string {
  return "₹" + Number(val).toLocaleString("en-IN");
}
