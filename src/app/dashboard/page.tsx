"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import Chart from "chart.js/auto";
import {
  LayoutDashboard,
  Calendar,
  Users,
  CreditCard,
  TrendingUp,
  Compass,
  Plus,
  Search,
  Moon,
  Sun,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Phone,
  Mail,
  FileText,
  Sparkles,
  MapPin,
  Clock,
  Printer,
  Trash2,
  ArrowRight,
  ShieldAlert,
  SlidersHorizontal,
  Home,
  MessageSquare
} from "lucide-react";

/* -------------------------------------------------------------
   TYPES & INTERFACES
   ------------------------------------------------------------- */
interface Booking {
  id: string;
  customer: string;
  destination: string;
  date: string;
  returnDate: string;
  amount: number;
  status: "Confirmed" | "Paid" | "Quoted" | "Travelled" | "Enquiry" | "Cancelled";
  agent: string;
  paid: number;
  guests: number;
}

interface Lead {
  id: string;
  name: string;
  destination: string;
  source: string;
  budget: number;
  stage: "New Lead" | "Contacted" | "Proposal Sent" | "Negotiation" | "Won";
  followUp: string;
  notes: string;
}

interface Customer {
  id: string;
  name: string;
  city: string;
  email: string;
  phone: string;
  tier: "Diamond VIP" | "Platinum VIP" | "Gold VIP";
  spend: number;
  trips: number;
  prefs: string;
}

interface PackageItem {
  id: string;
  name: string;
  destination: string;
  days: number;
  costPrice: number;
  sellPrice: number;
  seats: number;
}

interface PaymentRecord {
  id: string;
  bookingId: string;
  client: string;
  amount: number;
  status: "Received" | "Pending";
  date: string;
  method: string;
}

/* -------------------------------------------------------------
   SEEDED DATA GENERATION (65 Bookings, 42 Leads, 32 Clients)
   ------------------------------------------------------------- */
const INDIAN_FIRST_NAMES = ["Vikramaditya", "Ananya", "Rohan", "Meera", "Kabir", "Priya", "Sunita", "Aarav", "Neha", "Aditya", "Tara", "Manish", "Zoya", "Karan", "Pooja", "Arjun", "Simran", "Rajesh", "Kavita", "Siddharth", "Nisha", "Harsh", "Deepika", "Devendra", "Tanvi", "Gautam", "Rhea", "Naveen", "Smriti", "Kunal", "Alok", "Isha"];
const INDIAN_LAST_NAMES = ["Singhania", "Iyer", "Sharma", "Malhotra", "Mehta", "Reddy", "Kapoor", "Verma", "Godrej", "Khosla", "Chawla", "Akhtar", "Bajaj", "Bansal", "Goenka", "Jindal", "Birla", "Ambani", "Tata", "Murthy", "Nambiar", "Deshmukh", "Chaudhary", "Oberoi", "Bhatia", "Grover", "Poddar", "Piramal"];
const INDIAN_CITIES = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Pune", "Jaipur", "Chandigarh"];
const DESTINATIONS = ["Kashmir", "Rajasthan", "Maldives", "Switzerland", "Dubai", "Bali", "Goa", "Manali", "Ladakh", "Thailand"];
const AGENTS = ["Pooja Roy", "Amitabh Sen", "Kavita Nair", "Vikram Patel", "Rhea Kapoor"];
const SOURCES = ["Instagram Luxury", "HNI Referral", "Google Search", "WhatsApp Concierge", "Website Direct", "Private Jet Lounge"];

function createSeedData() {
  const customers: Customer[] = [];
  for (let i = 0; i < 32; i++) {
    const first = INDIAN_FIRST_NAMES[i % INDIAN_FIRST_NAMES.length];
    const last = INDIAN_LAST_NAMES[i % INDIAN_LAST_NAMES.length];
    const trips = (i % 6) + 2;
    const spend = trips * (250000 + (i * 45000));
    customers.push({
      id: `CUST-${101 + i}`,
      name: `${first} ${last}`,
      city: INDIAN_CITIES[i % INDIAN_CITIES.length],
      email: `${first.toLowerCase()}.${last.toLowerCase()}@${i % 2 === 0 ? 'corp.in' : 'familyoffice.com'}`,
      phone: `+91 ${98000 + (i * 57)} ${10000 + (i * 243)}`,
      tier: spend > 2500000 ? "Diamond VIP" : spend > 1200000 ? "Platinum VIP" : "Gold VIP",
      spend,
      trips,
      prefs: i % 3 === 0 ? "Strict Jain cuisine, private villa only" : i % 3 === 1 ? "Lie-flat suites, quiet luxury, champagne welcome" : "Michelin dining, snow sports, private helicopter"
    });
  }

  const baseDates = [
    "2026-01-12", "2026-02-04", "2026-02-18", "2026-03-10", "2026-03-24",
    "2026-04-05", "2026-04-20", "2026-05-02", "2026-05-15", "2026-05-28",
    "2026-06-08", "2026-06-22", "2026-07-04", "2026-07-19", "2026-08-02",
    "2026-08-16", "2026-09-05", "2026-09-20", "2026-10-02", "2026-10-14",
    "2026-10-22", "2026-11-05", "2026-11-12", "2026-11-20", "2026-12-05",
    "2026-12-18", "2026-12-28", "2027-01-08", "2027-01-22", "2027-02-14"
  ];

  const bookings: Booking[] = [];
  for (let i = 0; i < 65; i++) {
    const cust = customers[i % customers.length];
    const dest = DESTINATIONS[i % DESTINATIONS.length];
    const agent = AGENTS[i % AGENTS.length];
    const dateStr = baseDates[i % baseDates.length];
    const dateObj = new Date(dateStr);
    dateObj.setDate(dateObj.getDate() + 6);
    const returnDateStr = dateObj.toISOString().split("T")[0];

    const amount = 180000 + ((i * 37000) % 950000);
    const status: Booking["status"] = i < 8 ? "Confirmed" : i < 18 ? "Paid" : i < 30 ? "Travelled" : i < 48 ? "Confirmed" : i < 58 ? "Quoted" : i < 62 ? "Enquiry" : "Cancelled";
    const paid = status === "Paid" ? amount : status === "Confirmed" ? Math.round(amount * 0.6) : status === "Travelled" ? amount : 0;

    bookings.push({
      id: `BK-${8801 + i}`,
      customer: cust.name,
      destination: dest,
      date: dateStr,
      returnDate: returnDateStr,
      amount,
      status,
      agent,
      paid,
      guests: (i % 3) + 2
    });
  }

  const leads: Lead[] = [];
  const stages: Lead["stage"][] = ["New Lead", "Contacted", "Proposal Sent", "Negotiation", "Won"];
  for (let i = 0; i < 42; i++) {
    const first = INDIAN_FIRST_NAMES[(i + 7) % INDIAN_FIRST_NAMES.length];
    const last = INDIAN_LAST_NAMES[(i + 5) % INDIAN_LAST_NAMES.length];
    const dest = DESTINATIONS[(i + 2) % DESTINATIONS.length];
    const stage = stages[i % stages.length];
    const budget = 250000 + ((i * 45000) % 1200000);
    const dayOffset = (i % 14) - 4;
    const d = new Date();
    d.setDate(d.getDate() + dayOffset);
    const followUp = d.toISOString().split("T")[0];

    leads.push({
      id: `LD-${501 + i}`,
      name: `${first} ${last}`,
      destination: dest,
      source: SOURCES[i % SOURCES.length],
      budget,
      stage,
      followUp,
      notes: i % 2 === 0 ? "Anniversary getaway; requested private infinity pool villa" : "Family reunion (4 adults, 2 kids); wants ski passes and English butler"
    });
  }

  const packages: PackageItem[] = [
    { id: "PKG-01", name: "Kashmir Gulmarg Powder & Private Chalet", destination: "Kashmir", days: 6, costPrice: 120000, sellPrice: 210000, seats: 12 },
    { id: "PKG-02", name: "Royal Rajasthan Heritage Haveli Trail", destination: "Rajasthan", days: 8, costPrice: 210000, sellPrice: 380000, seats: 8 },
    { id: "PKG-03", name: "Kerala Backwater Houseboat & Ayurveda", destination: "Kerala", days: 5, costPrice: 65000, sellPrice: 135000, seats: 15 },
    { id: "PKG-04", name: "Ladakh High Passes Nubra Expedition", destination: "Ladakh", days: 7, costPrice: 95000, sellPrice: 175000, seats: 10 },
    { id: "PKG-05", name: "Maldives Private Overwater Retreat", destination: "Maldives", days: 5, costPrice: 380000, sellPrice: 620000, seats: 6 },
    { id: "PKG-06", name: "Dubai Desert Palm & Heli Flight", destination: "Dubai", days: 5, costPrice: 180000, sellPrice: 310000, seats: 14 },
    { id: "PKG-07", name: "Bali Secret Uluwatu Cliff Sanctuary", destination: "Bali", days: 6, costPrice: 110000, sellPrice: 195000, seats: 16 },
    { id: "PKG-08", name: "Manali Private Cedar Chalet Winter", destination: "Manali", days: 4, costPrice: 48000, sellPrice: 95000, seats: 20 },
    { id: "PKG-09", name: "Goa Morjim Portuguese Estate Yacht", destination: "Goa", days: 4, costPrice: 75000, sellPrice: 145000, seats: 18 },
    { id: "PKG-10", name: "Swiss Alps Zermatt Glacier Express", destination: "Switzerland", days: 8, costPrice: 420000, sellPrice: 750000, seats: 6 },
    { id: "PKG-11", name: "Andaman Havelock Secluded Scuba", destination: "Andaman", days: 6, costPrice: 92000, sellPrice: 168000, seats: 12 },
    { id: "PKG-12", name: "Thailand Koh Samui Private Catamaran", destination: "Thailand", days: 5, costPrice: 130000, sellPrice: 225000, seats: 10 }
  ];

  const payments: PaymentRecord[] = [];
  bookings.forEach((b, idx) => {
    if (b.paid > 0) {
      payments.push({
        id: `INV-2026-${100 + idx}`,
        bookingId: b.id,
        client: b.customer,
        amount: b.paid,
        status: "Received",
        date: b.date,
        method: idx % 3 === 0 ? "Bank Transfer (NEFT)" : idx % 3 === 1 ? "Amex Centurion" : "RTGS Wire"
      });
    }
    if (b.amount > b.paid && b.status !== "Cancelled") {
      payments.push({
        id: `INV-2026-${500 + idx}`,
        bookingId: b.id,
        client: b.customer,
        amount: b.amount - b.paid,
        status: "Pending",
        date: b.returnDate,
        method: "Payment Link / Due"
      });
    }
  });

  return { customers, bookings, leads, packages, payments };
}

function formatINR(val: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(val);
}

export default function NativeAdminDashboard() {
  // Store
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [currentRole, setCurrentRole] = useState<string>("Admin");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Entities
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);

  // Filtering & Pagination
  const [dateFilter, setDateFilter] = useState("30D");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [destFilter, setDestFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortCol, setSortCol] = useState<keyof Booking>("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  // Modals & Drawers
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"booking" | "lead">("booking");
  const [commandOpen, setCommandOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Live Simulator state
  const [simCost, setSimCost] = useState(180000);
  const [simSell, setSimSell] = useState(280000);

  // Charts references
  const revenueChartRef = useRef<HTMLCanvasElement | null>(null);
  const destChartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstances = useRef<{ rev?: Chart; dest?: Chart }>({});

  // 1. Initial Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("voyara_native_admin_store");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.bookings && data.bookings.length > 50) {
          setBookings(data.bookings);
          setLeads(data.leads);
          setCustomers(data.customers);
          setPackages(data.packages);
          setPayments(data.payments);
          return;
        }
      } catch {
        // Fallback to fresh seed
      }
    }
    const seed = createSeedData();
    setBookings(seed.bookings);
    setLeads(seed.leads);
    setCustomers(seed.customers);
    setPackages(seed.packages);
    setPayments(seed.payments);
  }, []);

  // 2. Persist to LocalStorage
  useEffect(() => {
    if (bookings.length > 0) {
      localStorage.setItem(
        "voyara_native_admin_store",
        JSON.stringify({ bookings, leads, customers, packages, payments })
      );
    }
  }, [bookings, leads, customers, packages, payments]);

  // Toast Helper
  const triggerToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  }, []);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setCommandOpen(false);
        setDrawerOpen(false);
      }
      if (e.key.toLowerCase() === "n" && !["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setDrawerMode("booking");
        setDrawerOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 3. Render Chart.js
  useEffect(() => {
    if (activeTab !== "overview") return;

    if (revenueChartRef.current) {
      chartInstances.current.rev?.destroy();
      const ctx = revenueChartRef.current.getContext("2d");
      if (ctx) {
        chartInstances.current.rev = new Chart(ctx, {
          type: "line",
          data: {
            labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct (Peak)", "Nov (Proj)", "Dec (Proj)"],
            datasets: [{
              label: "Gross Bookings (₹)",
              data: [1850000, 3100000, 1600000, 2250000, 2900000, 5800000, 6400000, 8900000],
              borderColor: "#0D5C63",
              backgroundColor: "rgba(13, 92, 99, 0.08)",
              fill: true,
              tension: 0.35,
              borderWidth: 2,
              pointRadius: 4,
              pointBackgroundColor: "#0D5C63"
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { display: false } },
              y: {
                grid: { color: "rgba(0,0,0,0.05)" },
                ticks: { callback: (v) => "₹" + (Number(v) / 100000) + "L" }
              }
            }
          }
        });
      }
    }

    if (destChartRef.current) {
      chartInstances.current.dest?.destroy();
      const counts: Record<string, number> = {};
      bookings.forEach((b) => {
        counts[b.destination] = (counts[b.destination] || 0) + 1;
      });
      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);

      const ctx = destChartRef.current.getContext("2d");
      if (ctx) {
        chartInstances.current.dest = new Chart(ctx, {
          type: "bar",
          data: {
            labels: sorted.map((s) => s[0]),
            datasets: [{
              data: sorted.map((s) => s[1]),
              backgroundColor: "#188A94",
              borderRadius: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { display: false } },
              y: { grid: { display: false } }
            }
          }
        });
      }
    }

    return () => {
      chartInstances.current.rev?.destroy();
      chartInstances.current.dest?.destroy();
    };
  }, [activeTab, bookings]);

  // Derived Financial KPIs
  const validBookings = useMemo(() => bookings.filter((b) => b.status !== "Cancelled"), [bookings]);
  const totalRevenue = useMemo(() => validBookings.reduce((sum, b) => sum + b.amount, 0), [validBookings]);
  const totalReceived = useMemo(() => payments.filter((p) => p.status === "Received").reduce((s, p) => s + p.amount, 0), [payments]);
  const pendingReceivables = useMemo(() => payments.filter((p) => p.status === "Pending").reduce((s, p) => s + p.amount, 0), [payments]);
  const confirmedCount = useMemo(() => bookings.filter((b) => b.status === "Confirmed" || b.status === "Paid").length, [bookings]);
  const conversionRate = Math.round((confirmedCount / (leads.length + bookings.length || 1)) * 100);

  // Filtered & Sorted Bookings Table
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchQ = b.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     b.destination.toLowerCase().includes(searchQuery.toLowerCase());
      const matchS = statusFilter === "ALL" || b.status === statusFilter;
      const matchD = destFilter === "ALL" || b.destination === destFilter;
      return matchQ && matchS && matchD;
    }).sort((a, b) => {
      const valA = a[sortCol];
      const valB = b[sortCol];
      if (typeof valA === "string" && typeof valB === "string") {
        return sortDir === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortDir === "asc" ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });
  }, [bookings, searchQuery, statusFilter, destFilter, sortCol, sortDir]);

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage) || 1;
  const paginatedBookings = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBookings.slice(start, start + itemsPerPage);
  }, [filteredBookings, currentPage]);

  const handleSort = (col: keyof Booking) => {
    if (sortCol === col) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortCol(col);
      setSortDir("asc");
    }
  };

  // Convert Lead to Booking
  const convertLead = (leadId: string) => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return;

    const newBooking: Booking = {
      id: `BK-${Math.floor(8900 + Math.random() * 1000)}`,
      customer: lead.name,
      destination: lead.destination,
      date: "2026-11-20",
      returnDate: "2026-11-26",
      amount: lead.budget,
      status: "Confirmed",
      agent: "Pooja Roy",
      paid: Math.round(lead.budget * 0.5),
      guests: 2
    };

    setBookings((prev) => [newBooking, ...prev]);
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, stage: "Won" } : l)));
    triggerToast(`Lead ${lead.name} converted to booking ${newBooking.id}!`);
  };

  // Delete Booking
  const deleteBooking = (id: string) => {
    const found = bookings.find((b) => b.id === id);
    if (!found) return;
    setBookings((prev) => prev.filter((b) => b.id !== id));
    triggerToast(`Booking ${id} deleted.`);
  };

  // Print Invoice Window
  const handlePrintInvoice = (b: Booking) => {
    const gst = Math.round(b.amount * 0.05);
    const subtotal = b.amount - gst;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice #${b.id} — Voyara Journeys</title>
        <style>
          body { font-family: -apple-system, sans-serif; padding: 40px; color: #111; max-width: 800px; margin: auto; }
          .inv-header { display: flex; justify-content: space-between; border-bottom: 2px solid #0D5C63; padding-bottom: 20px; }
          .inv-title { font-size: 26px; font-weight: 700; color: #0D5C63; }
          .inv-grid { display: grid; grid-template-columns: 1fr 1fr; margin: 30px 0; gap: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { padding: 12px; border-bottom: 1px solid #ddd; text-align: left; }
          .total-row td { font-weight: bold; font-size: 16px; border-top: 2px solid #000; }
        </style>
      </head>
      <body>
        <div class="inv-header">
          <div>
            <div class="inv-title">VOYARA JOURNEYS</div>
            <div>Bespoke Private Aviation & Itineraries</div>
            <div>Nariman Point, Mumbai 400021</div>
            <div>GSTIN: 27AABCV1234F1Z8</div>
          </div>
          <div style="text-align: right;">
            <h2>TAX INVOICE</h2>
            <div>Invoice #: INV-${b.id}</div>
            <div>Date: ${b.date}</div>
          </div>
        </div>
        <div class="inv-grid">
          <div><strong>Billed To:</strong><br>${b.customer}<br>VIP Client Manifest</div>
          <div style="text-align: right;"><strong>Destination:</strong><br>${b.destination} Luxury Itinerary<br>${b.date} to ${b.returnDate} (${b.guests} Guests)</div>
        </div>
        <table>
          <thead><tr><th>Description</th><th>PAX</th><th style="text-align: right;">Amount (INR)</th></tr></thead>
          <tbody>
            <tr><td>Curated ${b.destination} Ground Services & Stays</td><td>${b.guests}</td><td style="text-align: right;">₹${subtotal.toLocaleString("en-IN")}</td></tr>
            <tr><td>Goods & Services Tax (GST @ 5%)</td><td>-</td><td style="text-align: right;">₹${gst.toLocaleString("en-IN")}</td></tr>
            <tr class="total-row"><td>Grand Total</td><td>-</td><td style="text-align: right;">₹${b.amount.toLocaleString("en-IN")}</td></tr>
          </tbody>
        </table>
        <p style="margin-top: 40px; font-size: 12px; color: #666;">Computer-generated tax document compliant with Indian Tax Jurisdiction.</p>
        <script>window.onload = function() { window.print(); }<\/script>
      </body>
      </html>
    `);
    win.document.close();
  };

  // Reset Demo Data
  const resetDemo = () => {
    if (confirm("Reset all 65 bookings, 42 leads, and 32 customers back to factory seed?")) {
      const seed = createSeedData();
      setBookings(seed.bookings);
      setLeads(seed.leads);
      setCustomers(seed.customers);
      setPackages(seed.packages);
      setPayments(seed.payments);
      localStorage.removeItem("voyara_native_admin_store");
      triggerToast("Demo data re-seeded to factory state.");
    }
  };

  return (
    <div className={`flex w-screen h-screen overflow-hidden font-sans ${theme === "dark" ? "bg-[#0B0E11] text-[#F3F4F6]" : "bg-[#F8F9FA] text-[#111827]"}`}>
      {/* -------------------------------------------------------------
          LEFT SIDEBAR
          ------------------------------------------------------------- */}
      <aside className={`h-full border-r transition-all duration-200 flex flex-col shrink-0 z-40 ${theme === "dark" ? "bg-[#12161A] border-[#28313A]" : "bg-white border-[#DEE2E6]"} ${sidebarCollapsed ? "w-16" : "w-64"}`}>
        {/* Brand Header */}
        <div className={`h-14 flex items-center justify-between px-4 border-b shrink-0 ${theme === "dark" ? "border-[#1E242B]" : "border-[#E9ECEF]"}`}>
          <div className="flex items-center gap-2.5 overflow-hidden whitespace-nowrap">
            <div className="w-8 h-8 rounded-md bg-[#0D5C63] text-white flex items-center justify-center font-bold text-sm shrink-0">
              V
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col">
                <span className="font-semibold text-xs tracking-tight">Voyara Journeys</span>
                <span className="text-[10px] text-gray-400">Mumbai Operations</span>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 rounded text-gray-400 hover:text-gray-200 hover:bg-gray-800/40"
            title="Toggle Sidebar"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Groups */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-4">
          <div>
            {!sidebarCollapsed && <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-3 mb-1">Operations</div>}
            <div className="space-y-0.5">
              {[
                { id: "overview", label: "Overview", icon: LayoutDashboard },
                { id: "bookings", label: "Bookings", icon: Briefcase, badge: bookings.length },
                { id: "leads", label: "Leads CRM", icon: Users, badge: leads.length },
                { id: "customers", label: "VIP Clients", icon: Users },
                { id: "packages", label: "Packages & Margins", icon: Compass },
              ].map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors text-left ${active ? "bg-[#0D5C63]/15 text-[#0D5C63] dark:text-[#188A94] font-semibold" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60"}`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                    {!sidebarCollapsed && item.badge !== undefined && (
                      <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${active ? "bg-[#0D5C63] text-white" : "bg-gray-200 dark:bg-gray-800 text-gray-500"}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            {!sidebarCollapsed && <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-3 mb-1">Intelligence</div>}
            <div className="space-y-0.5">
              {[
                { id: "payments", label: "Payments & Aging", icon: CreditCard },
                { id: "calendar", label: "Calendar", icon: Calendar },
                { id: "reports", label: "Reports & Audits", icon: TrendingUp },
                { id: "settings", label: "Settings", icon: SlidersHorizontal },
              ].map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors text-left ${active ? "bg-[#0D5C63]/15 text-[#0D5C63] dark:text-[#188A94] font-semibold" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60"}`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            {!sidebarCollapsed && <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-3 mb-1">Quick Links</div>}
            <div className="space-y-0.5">
              <Link
                href="/"
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors"
              >
                <Home className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && <span>Main Website</span>}
              </Link>
              <Link
                href="/dashboard/concierge"
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors"
              >
                <Sparkles className="w-4 h-4 shrink-0 text-[#C2532A]" />
                {!sidebarCollapsed && <span>AI Concierge</span>}
              </Link>
            </div>
          </div>
        </nav>

        {/* Footer Role Switcher */}
        {!sidebarCollapsed && (
          <div className={`p-3 border-t shrink-0 ${theme === "dark" ? "border-[#1E242B]" : "border-[#E9ECEF]"}`}>
            <div className="flex items-center justify-between text-[11px] p-2 bg-gray-100 dark:bg-gray-800/50 rounded-md">
              <span className="text-gray-400">Role:</span>
              <select
                value={currentRole}
                onChange={(e) => {
                  setCurrentRole(e.target.value);
                  triggerToast(`Role switched to: ${e.target.value}`);
                }}
                className="bg-transparent text-xs font-semibold outline-none cursor-pointer"
              >
                <option value="Admin">Admin (Owner)</option>
                <option value="Sales">Sales Curator</option>
                <option value="Accountant">Accountant</option>
              </select>
            </div>
          </div>
        )}
      </aside>

      {/* -------------------------------------------------------------
          MAIN VIEWPORT & TOPBAR
          ------------------------------------------------------------- */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className={`h-14 border-b px-6 flex items-center justify-between shrink-0 z-30 ${theme === "dark" ? "bg-[#12161A] border-[#28313A]" : "bg-white border-[#DEE2E6]"}`}>
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <button
              onClick={() => setCommandOpen(true)}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-xs border transition-colors ${theme === "dark" ? "bg-gray-900/60 border-gray-800 text-gray-400 hover:border-gray-700" : "bg-gray-50 border-gray-200 text-gray-400 hover:border-gray-300"}`}
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5" />
                <span>Search 60+ bookings, leads, clients (Ctrl+K)...</span>
              </div>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-gray-300 dark:border-gray-700">⌘K</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`p-2 rounded-md border text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors ${theme === "dark" ? "border-gray-800 hover:bg-gray-800" : "border-gray-200 hover:bg-gray-100"}`}
              title="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                setDrawerMode("booking");
                setDrawerOpen(true);
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0D5C63] hover:bg-[#09474D] text-white rounded-md text-xs font-medium transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Booking</span>
            </button>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-xl font-bold tracking-tight">Executive Operations Overview</h1>
                  <p className="text-xs text-gray-400 mt-0.5">High-level sales velocity across {bookings.length} tracked journeys and ₹{(totalRevenue / 10000000).toFixed(2)} Cr gross value.</p>
                </div>
                <div className="inline-flex bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-0.5 rounded-md gap-1">
                  {["7D", "30D", "90D", "YTD"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setDateFilter(filter)}
                      className={`px-2.5 py-1 text-[11px] font-medium rounded ${dateFilter === filter ? "bg-[#0D5C63] text-white" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"}`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`p-4 rounded-lg border shadow-sm ${theme === "dark" ? "bg-[#12161A] border-[#28313A]" : "bg-white border-[#DEE2E6]"}`}>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Gross Booked Value</span>
                    <TrendingUp className="w-4 h-4 text-[#0D5C63]" />
                  </div>
                  <div className="text-2xl font-bold mt-2 font-mono">{formatINR(totalRevenue)}</div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-1">↑ 24.8% <span className="text-gray-400 font-normal">vs last period</span></div>
                </div>

                <div className={`p-4 rounded-lg border shadow-sm ${theme === "dark" ? "bg-[#12161A] border-[#28313A]" : "bg-white border-[#DEE2E6]"}`}>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Cash Realized (Bank)</span>
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold mt-2 font-mono text-emerald-600">{formatINR(totalReceived)}</div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-1">↑ 19.3% <span className="text-gray-400 font-normal">reconciled</span></div>
                </div>

                <div className={`p-4 rounded-lg border shadow-sm ${theme === "dark" ? "bg-[#12161A] border-[#28313A]" : "bg-white border-[#DEE2E6]"}`}>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Pending Receivables</span>
                    <Clock className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-2xl font-bold mt-2 font-mono text-amber-500">{formatINR(pendingReceivables)}</div>
                  <div className="text-[11px] text-gray-400 mt-1">Due in next 30 days</div>
                </div>

                <div className={`p-4 rounded-lg border shadow-sm ${theme === "dark" ? "bg-[#12161A] border-[#28313A]" : "bg-white border-[#DEE2E6]"}`}>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Lead Conversion</span>
                    <CheckCircle2 className="w-4 h-4 text-[#0D5C63]" />
                  </div>
                  <div className="text-2xl font-bold mt-2 font-mono">{conversionRate}%</div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-1">↑ 6.4% <span className="text-gray-400 font-normal">from {leads.length} leads</span></div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className={`p-5 rounded-lg border lg:col-span-2 shadow-sm ${theme === "dark" ? "bg-[#12161A] border-[#28313A]" : "bg-white border-[#DEE2E6]"}`}>
                  <h3 className="font-semibold text-sm">Monthly Revenue Momentum</h3>
                  <p className="text-[11px] text-gray-400 mb-4">Gross booking volume in Lakhs (₹)</p>
                  <div className="h-64">
                    <canvas ref={revenueChartRef}></canvas>
                  </div>
                </div>

                <div className={`p-5 rounded-lg border shadow-sm ${theme === "dark" ? "bg-[#12161A] border-[#28313A]" : "bg-white border-[#DEE2E6]"}`}>
                  <h3 className="font-semibold text-sm">Top Destinations</h3>
                  <p className="text-[11px] text-gray-400 mb-4">Volume distribution by destination</p>
                  <div className="h-64">
                    <canvas ref={destChartRef}></canvas>
                  </div>
                </div>
              </div>

              {/* Upcoming Departures Table */}
              <div className={`rounded-lg border overflow-hidden shadow-sm ${theme === "dark" ? "bg-[#12161A] border-[#28313A]" : "bg-white border-[#DEE2E6]"}`}>
                <div className="p-4 border-b flex items-center justify-between">
                  <h3 className="font-semibold text-sm">Immediate Upcoming Departures</h3>
                  <button onClick={() => setActiveTab("bookings")} className="text-xs text-[#0D5C63] hover:underline font-medium">View All {bookings.length} Bookings →</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-400 uppercase text-[10px]">
                      <tr>
                        <th className="p-3">Booking ID</th>
                        <th className="p-3">Client</th>
                        <th className="p-3">Destination</th>
                        <th className="p-3">Departure Date</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {bookings.slice(0, 5).map((b) => (
                        <tr key={b.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                          <td className="p-3 font-mono font-semibold">{b.id}</td>
                          <td className="p-3 font-medium">{b.customer}</td>
                          <td className="p-3">{b.destination}</td>
                          <td className="p-3 font-mono">{b.date}</td>
                          <td className="p-3 font-mono font-semibold text-[#0D5C63] dark:text-[#188A94]">{formatINR(b.amount)}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BOOKINGS */}
          {activeTab === "bookings" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-xl font-bold tracking-tight">Bookings Manifest ({filteredBookings.length} Records)</h1>
                  <p className="text-xs text-gray-400">Sortable, searchable, and paginated travel operational records.</p>
                </div>
                <button
                  onClick={() => {
                    setDrawerMode("booking");
                    setDrawerOpen(true);
                  }}
                  className="px-3.5 py-1.5 bg-[#0D5C63] text-white rounded-md text-xs font-medium hover:bg-[#09474D] flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Booking</span>
                </button>
              </div>

              {/* Filters Toolbar */}
              <div className={`p-3 rounded-lg border flex items-center justify-between gap-3 flex-wrap ${theme === "dark" ? "bg-[#12161A] border-[#28313A]" : "bg-white border-[#DEE2E6]"}`}>
                <input
                  type="text"
                  placeholder="Search by client, ID, destination..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-xs outline-none w-64 focus:border-[#0D5C63]"
                />

                <div className="flex items-center gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-2.5 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-xs outline-none"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Paid">Paid</option>
                    <option value="Quoted">Quoted</option>
                    <option value="Travelled">Travelled</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                  <select
                    value={destFilter}
                    onChange={(e) => {
                      setDestFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-2.5 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-xs outline-none"
                  >
                    <option value="ALL">All Destinations</option>
                    {DESTINATIONS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className={`rounded-lg border overflow-hidden shadow-sm ${theme === "dark" ? "bg-[#12161A] border-[#28313A]" : "bg-white border-[#DEE2E6]"}`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-400 uppercase text-[10px]">
                      <tr>
                        <th onClick={() => handleSort("id")} className="p-3 cursor-pointer hover:text-gray-900 dark:hover:text-white">Booking ID ↕</th>
                        <th onClick={() => handleSort("customer")} className="p-3 cursor-pointer hover:text-gray-900 dark:hover:text-white">Client ↕</th>
                        <th onClick={() => handleSort("destination")} className="p-3 cursor-pointer hover:text-gray-900 dark:hover:text-white">Destination ↕</th>
                        <th onClick={() => handleSort("date")} className="p-3 cursor-pointer hover:text-gray-900 dark:hover:text-white">Travel Dates ↕</th>
                        <th className="p-3">Guests</th>
                        <th onClick={() => handleSort("amount")} className="p-3 cursor-pointer hover:text-gray-900 dark:hover:text-white">Amount ↕</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {paginatedBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                          <td className="p-3 font-mono font-semibold">{b.id}</td>
                          <td className="p-3 font-medium">{b.customer}</td>
                          <td className="p-3">{b.destination}</td>
                          <td className="p-3 font-mono">{b.date} → {b.returnDate}</td>
                          <td className="p-3 font-mono">{b.guests} PAX</td>
                          <td className="p-3 font-mono font-semibold text-[#0D5C63] dark:text-[#188A94]">{formatINR(b.amount)}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                              {b.status}
                            </span>
                          </td>
                          <td className="p-3 space-x-1.5 whitespace-nowrap">
                            <button
                              onClick={() => handlePrintInvoice(b)}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 text-[11px]"
                            >
                              Invoice
                            </button>
                            <button
                              onClick={() => deleteBooking(b.id)}
                              className="px-2 py-1 bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 rounded hover:bg-rose-100 text-[11px]"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="p-3 border-t flex items-center justify-between text-xs text-gray-500">
                  <span>Showing Page {currentPage} of {totalPages} ({filteredBookings.length} total records)</span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage <= 1}
                      className="px-2.5 py-1 border rounded disabled:opacity-40"
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage >= totalPages}
                      className="px-2.5 py-1 border rounded disabled:opacity-40"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LEADS CRM */}
          {activeTab === "leads" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-xl font-bold tracking-tight">HNI Sales Pipeline ({leads.length} Leads)</h1>
                  <p className="text-xs text-gray-400">Drag-and-drop workflow to convert high-value travel prospects.</p>
                </div>
                <button
                  onClick={() => {
                    setDrawerMode("lead");
                    setDrawerOpen(true);
                  }}
                  className="px-3.5 py-1.5 bg-[#0D5C63] text-white rounded-md text-xs font-medium hover:bg-[#09474D] flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Lead</span>
                </button>
              </div>

              {/* Kanban Columns */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
                {(["New Lead", "Contacted", "Proposal Sent", "Negotiation", "Won"] as Lead["stage"][]).map((stage) => {
                  const stageLeads = leads.filter((l) => l.stage === stage);
                  return (
                    <div key={stage} className={`p-3 rounded-lg border flex flex-col gap-3 min-w-[240px] ${theme === "dark" ? "bg-gray-900/40 border-gray-800" : "bg-gray-50 border-gray-200"}`}>
                      <div className="flex items-center justify-between pb-2 border-b">
                        <span className="font-semibold text-xs tracking-wider uppercase">{stage}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white dark:bg-gray-800 font-semibold">{stageLeads.length}</span>
                      </div>

                      <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[68vh]">
                        {stageLeads.map((lead) => (
                          <div key={lead.id} className={`p-3 rounded-md border shadow-sm space-y-2 ${theme === "dark" ? "bg-[#12161A] border-[#28313A]" : "bg-white border-[#DEE2E6]"}`}>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-xs">{lead.name}</span>
                              <span className="font-mono text-xs font-bold text-[#0D5C63] dark:text-[#188A94]">{formatINR(lead.budget)}</span>
                            </div>
                            <div className="text-[11px] text-gray-500">📍 {lead.destination} • <em>{lead.source}</em></div>
                            <p className="text-[11px] text-gray-400 line-clamp-2">{lead.notes}</p>
                            <div className="flex items-center justify-between pt-2 border-t border-dashed text-[10px] text-gray-400">
                              <span>Due: {lead.followUp}</span>
                              {stage !== "Won" ? (
                                <button
                                  onClick={() => convertLead(lead.id)}
                                  className="px-2 py-0.5 bg-[#0D5C63] text-white rounded hover:bg-[#09474D] font-medium"
                                >
                                  Convert →
                                </button>
                              ) : (
                                <span className="text-emerald-500 font-semibold">✓ Converted</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: VIP CLIENTS */}
          {activeTab === "customers" && (
            <div className="space-y-4">
              <div>
                <h1 className="text-xl font-bold tracking-tight">VIP Client Profiles ({customers.length} Members)</h1>
                <p className="text-xs text-gray-400">High-Net-Worth individuals, past spending history, and bespoke culinary preferences.</p>
              </div>

              <div className={`rounded-lg border overflow-hidden shadow-sm ${theme === "dark" ? "bg-[#12161A] border-[#28313A]" : "bg-white border-[#DEE2E6]"}`}>
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-400 uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Client Name</th>
                      <th className="p-3">City</th>
                      <th className="p-3">Contact</th>
                      <th className="p-3">VIP Tier</th>
                      <th className="p-3">Lifetime Value</th>
                      <th className="p-3">Trips</th>
                      <th className="p-3">Preferences</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {customers.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                        <td className="p-3 font-semibold">{c.name}</td>
                        <td className="p-3">{c.city}</td>
                        <td className="p-3">
                          <div>{c.phone}</div>
                          <div className="text-[10px] text-gray-400">{c.email}</div>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                            {c.tier}
                          </span>
                        </td>
                        <td className="p-3 font-mono font-semibold text-[#0D5C63] dark:text-[#188A94]">{formatINR(c.spend)}</td>
                        <td className="p-3 font-mono">{c.trips}</td>
                        <td className="p-3 max-w-xs truncate">{c.prefs}</td>
                        <td className="p-3">
                          <a
                            href={`https://wa.me/${c.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600 text-[11px]"
                          >
                            WhatsApp
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: PACKAGES & MARGINS */}
          {activeTab === "packages" && (
            <div className="space-y-4">
              <div>
                <h1 className="text-xl font-bold tracking-tight">Bespoke Packages & Live Margin Calculator</h1>
                <p className="text-xs text-gray-400">Pre-packaged flagships and live profitability analysis.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className={`rounded-lg border overflow-hidden shadow-sm lg:col-span-2 ${theme === "dark" ? "bg-[#12161A] border-[#28313A]" : "bg-white border-[#DEE2E6]"}`}>
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-400 uppercase text-[10px]">
                      <tr>
                        <th className="p-3">Package</th>
                        <th className="p-3">Destination</th>
                        <th className="p-3">Duration</th>
                        <th className="p-3">Cost Price</th>
                        <th className="p-3">Selling Price</th>
                        <th className="p-3">Gross Margin</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {packages.map((p) => {
                        const profit = p.sellPrice - p.costPrice;
                        const pct = Math.round((profit / p.sellPrice) * 100);
                        return (
                          <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                            <td className="p-3 font-semibold">{p.name}</td>
                            <td className="p-3">{p.destination}</td>
                            <td className="p-3 font-mono">{p.days} Days</td>
                            <td className="p-3 font-mono">{formatINR(p.costPrice)}</td>
                            <td className="p-3 font-mono font-semibold">{formatINR(p.sellPrice)}</td>
                            <td className="p-3 font-mono text-emerald-600 font-semibold">{formatINR(profit)} ({pct}%)</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Live Margin Simulator */}
                <div className={`p-5 rounded-lg border shadow-sm space-y-4 ${theme === "dark" ? "bg-[#12161A] border-[#28313A]" : "bg-white border-[#DEE2E6]"}`}>
                  <div>
                    <h3 className="font-semibold text-sm">Live Margin Simulator</h3>
                    <p className="text-[11px] text-gray-400">Calculate agency commission before finalizing quote.</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-gray-400">Ground & Flight Cost (₹)</label>
                    <input
                      type="number"
                      value={simCost}
                      onChange={(e) => setSimCost(Number(e.target.value))}
                      className="w-full px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border rounded text-xs outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-gray-400">Client Quoted Price (₹)</label>
                    <input
                      type="number"
                      value={simSell}
                      onChange={(e) => setSimSell(Number(e.target.value))}
                      className="w-full px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border rounded text-xs outline-none"
                    />
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800/60 rounded-md border space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400">Gross Profit:</span>
                      <strong className="font-mono text-emerald-600 text-sm">{formatINR(simSell - simCost)}</strong>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400">Margin Percentage:</span>
                      <strong className="font-mono text-[#0D5C63] dark:text-[#188A94] text-sm">
                        {(((simSell - simCost) / (simSell || 1)) * 100).toFixed(1)}%
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PAYMENTS */}
          {activeTab === "payments" && (
            <div className="space-y-4">
              <div>
                <h1 className="text-xl font-bold tracking-tight">Payments Ledger & Receivables Aging</h1>
                <p className="text-xs text-gray-400">Reconcile NEFT, Wire transfers, credit card links, and outstanding balances.</p>
              </div>

              <div className={`rounded-lg border overflow-hidden shadow-sm ${theme === "dark" ? "bg-[#12161A] border-[#28313A]" : "bg-white border-[#DEE2E6]"}`}>
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-400 uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Invoice #</th>
                      <th className="p-3">Booking Ref</th>
                      <th className="p-3">Client</th>
                      <th className="p-3">Payment Mode</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {payments.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                        <td className="p-3 font-mono font-semibold">{p.id}</td>
                        <td className="p-3 font-mono">{p.bookingId}</td>
                        <td className="p-3 font-medium">{p.client}</td>
                        <td className="p-3">{p.method}</td>
                        <td className="p-3 font-mono">{p.date}</td>
                        <td className="p-3 font-mono font-semibold">{formatINR(p.amount)}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${p.status === "Received" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200" : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200"}`}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: CALENDAR */}
          {activeTab === "calendar" && (
            <div className="space-y-4">
              <div>
                <h1 className="text-xl font-bold tracking-tight">Departures & Concierge Calendar</h1>
                <p className="text-xs text-gray-400">Schedule of active departures, return transfers, and scheduled follow-ups.</p>
              </div>

              <div className={`p-5 rounded-lg border shadow-sm ${theme === "dark" ? "bg-[#12161A] border-[#28313A]" : "bg-white border-[#DEE2E6]"}`}>
                <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-800 border rounded overflow-hidden">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                    <div key={d} className="p-2 text-center text-[10px] font-semibold uppercase bg-gray-50 dark:bg-gray-900 text-gray-400">
                      {d}
                    </div>
                  ))}
                  {Array.from({ length: 31 }, (_, i) => {
                    const day = i + 1;
                    const hasTrip = day % 4 === 0;
                    return (
                      <div key={day} className="min-h-[80px] p-2 bg-white dark:bg-[#12161A] text-xs flex flex-col gap-1">
                        <span className="font-mono text-gray-400 text-[11px] font-semibold">{day}</span>
                        {hasTrip && (
                          <div className="p-1 rounded bg-[#0D5C63]/10 text-[#0D5C63] dark:text-[#188A94] text-[10px] font-semibold leading-tight">
                            🛫 Dep: {DESTINATIONS[day % DESTINATIONS.length]} (2)
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: REPORTS */}
          {activeTab === "reports" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold tracking-tight">Executive Financial & Margin Reports</h1>
                  <p className="text-xs text-gray-400">Audited commission statement and curator performance.</p>
                </div>
                <button onClick={() => window.print()} className="px-3 py-1.5 bg-[#0D5C63] text-white rounded text-xs font-medium">
                  Print Report
                </button>
              </div>

              <div className={`rounded-lg border overflow-hidden shadow-sm ${theme === "dark" ? "bg-[#12161A] border-[#28313A]" : "bg-white border-[#DEE2E6]"}`}>
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-400 uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Curator</th>
                      <th className="p-3">Bookings</th>
                      <th className="p-3">Gross Realized</th>
                      <th className="p-3">Commission (15%)</th>
                      <th className="p-3">Performance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {AGENTS.map((agent, i) => {
                      const count = bookings.filter((b) => b.agent === agent).length;
                      const gross = count * 340000;
                      return (
                        <tr key={agent} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                          <td className="p-3 font-semibold">{agent}</td>
                          <td className="p-3 font-mono">{count} Bookings</td>
                          <td className="p-3 font-mono">{formatINR(gross)}</td>
                          <td className="p-3 font-mono font-semibold text-emerald-600">{formatINR(gross * 0.15)}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                              {85 - i * 4}% Win
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 9: SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-4">
              <div>
                <h1 className="text-xl font-bold tracking-tight">Agency Settings & Governance</h1>
                <p className="text-xs text-gray-400">GST credentials, team permissions, and persistent data reset.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-5 rounded-lg border shadow-sm space-y-3 ${theme === "dark" ? "bg-[#12161A] border-[#28313A]" : "bg-white border-[#DEE2E6]"}`}>
                  <h3 className="font-semibold text-sm">Agency Profile</h3>
                  <div className="space-y-1">
                    <label className="text-[11px] text-gray-400">Agency Legal Name</label>
                    <input type="text" defaultValue="Voyara Luxury Journeys" className="w-full px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border rounded text-xs outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-gray-400">Headquarters City</label>
                    <input type="text" defaultValue="Mumbai" className="w-full px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border rounded text-xs outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-gray-400">GSTIN Tax Identifier</label>
                    <input type="text" defaultValue="27AABCV1234F1Z8" className="w-full px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border rounded text-xs outline-none" />
                  </div>
                  <button onClick={() => triggerToast("Agency settings saved.")} className="px-3.5 py-1.5 bg-[#0D5C63] text-white rounded text-xs font-medium">Save Changes</button>
                </div>

                <div className={`p-5 rounded-lg border shadow-sm space-y-3 ${theme === "dark" ? "bg-[#12161A] border-[#28313A]" : "bg-white border-[#DEE2E6]"}`}>
                  <h3 className="font-semibold text-sm">Data Management & Reset</h3>
                  <p className="text-xs text-gray-400">Reset all 65+ bookings, 42 leads, and 32 VIP clients back to initial seeded values.</p>
                  <button onClick={resetDemo} className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-medium">
                    Reset All Demo Data
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* -------------------------------------------------------------
          SLIDE-OVER DRAWER (CREATION MODAL)
          ------------------------------------------------------------- */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div className={`relative w-full max-w-md h-full shadow-2xl z-10 flex flex-col p-6 space-y-4 ${theme === "dark" ? "bg-[#12161A]" : "bg-white"}`}>
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="font-semibold text-sm">{drawerMode === "booking" ? "Create High-Touch Booking" : "Add Sales Lead"}</h3>
              <button onClick={() => setDrawerOpen(false)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"><X className="w-4 h-4" /></button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                if (drawerMode === "booking") {
                  const newB: Booking = {
                    id: `BK-${Math.floor(9000 + Math.random() * 999)}`,
                    customer: String(fd.get("customer")),
                    destination: String(fd.get("destination")),
                    agent: "Pooja Roy",
                    date: String(fd.get("date")),
                    returnDate: String(fd.get("returnDate")),
                    amount: Number(fd.get("amount")),
                    status: "Confirmed",
                    paid: 0,
                    guests: 2
                  };
                  setBookings((prev) => [newB, ...prev]);
                  triggerToast(`Booking ${newB.id} created!`);
                } else {
                  const newL: Lead = {
                    id: `LD-${Math.floor(600 + Math.random() * 300)}`,
                    name: String(fd.get("name")),
                    destination: String(fd.get("destination")),
                    source: "HNI Referral",
                    budget: Number(fd.get("budget")),
                    stage: "New Lead",
                    followUp: "2026-10-30",
                    notes: "High priority lead from dashboard"
                  };
                  setLeads((prev) => [newL, ...prev]);
                  triggerToast(`Lead ${newL.name} added to pipeline!`);
                }
                setDrawerOpen(false);
              }}
              className="space-y-3 flex-1 overflow-y-auto"
            >
              {drawerMode === "booking" ? (
                <>
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-gray-400">Client Name</label>
                    <input name="customer" required placeholder="e.g. Vikramaditya Singhania" className="w-full px-3 py-1.5 border rounded text-xs bg-transparent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-gray-400">Destination</label>
                    <select name="destination" className="w-full px-3 py-1.5 border rounded text-xs bg-transparent">
                      {DESTINATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-gray-400">Departure</label>
                      <input name="date" type="date" defaultValue="2026-11-15" className="w-full px-2 py-1.5 border rounded text-xs bg-transparent" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-gray-400">Return</label>
                      <input name="returnDate" type="date" defaultValue="2026-11-22" className="w-full px-2 py-1.5 border rounded text-xs bg-transparent" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-gray-400">Agreed Gross Amount (₹)</label>
                    <input name="amount" type="number" defaultValue="450000" className="w-full px-3 py-1.5 border rounded text-xs bg-transparent" />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-gray-400">Prospect Name</label>
                    <input name="name" required placeholder="e.g. Sameer Jain" className="w-full px-3 py-1.5 border rounded text-xs bg-transparent" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-gray-400">Destination</label>
                    <select name="destination" className="w-full px-3 py-1.5 border rounded text-xs bg-transparent">
                      {DESTINATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-gray-400">Estimated Budget (₹)</label>
                    <input name="budget" type="number" defaultValue="500000" className="w-full px-3 py-1.5 border rounded text-xs bg-transparent" />
                  </div>
                </>
              )}

              <div className="pt-4 flex justify-end gap-2 border-t">
                <button type="button" onClick={() => setDrawerOpen(false)} className="px-3 py-1.5 border rounded text-xs">Cancel</button>
                <button type="submit" className="px-3.5 py-1.5 bg-[#0D5C63] text-white rounded text-xs font-medium">Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          COMMAND PALETTE (CTRL+K)
          ------------------------------------------------------------- */}
      {commandOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setCommandOpen(false)} />
          <div className={`relative w-full max-w-lg rounded-xl border shadow-2xl overflow-hidden z-10 ${theme === "dark" ? "bg-[#12161A] border-[#28313A]" : "bg-white border-[#DEE2E6]"}`}>
            <div className="p-3 border-b flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                autoFocus
                placeholder="Type command or jump to module..."
                className="w-full bg-transparent text-xs outline-none"
              />
            </div>
            <div className="p-2 space-y-1 text-xs">
              {[
                { label: "Go to Operations Overview", action: () => setActiveTab("overview"), icon: LayoutDashboard },
                { label: "Go to Bookings Manifest", action: () => setActiveTab("bookings"), icon: Briefcase },
                { label: "Go to Leads Pipeline (Kanban)", action: () => setActiveTab("leads"), icon: Users },
                { label: "Go to VIP Clients", action: () => setActiveTab("customers"), icon: Users },
                { label: "Create New Booking", action: () => { setDrawerMode("booking"); setDrawerOpen(true); }, icon: Plus },
                { label: "Toggle Theme", action: () => setTheme(theme === "dark" ? "light" : "dark"), icon: Sun }
              ].map((cmd, i) => {
                const Icon = cmd.icon;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      cmd.action();
                      setCommandOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#0D5C63]/10 hover:text-[#0D5C63] text-left transition-colors"
                  >
                    <Icon className="w-4 h-4 text-gray-400" />
                    <span>{cmd.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          TOAST ALERT NOTIFICATION
          ------------------------------------------------------------- */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#12161A] text-white border border-gray-700 px-4 py-2.5 rounded-md shadow-2xl flex items-center gap-2 text-xs animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
