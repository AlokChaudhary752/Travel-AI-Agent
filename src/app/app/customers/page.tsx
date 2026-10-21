"use client";

import React, { useState, useMemo } from "react";
import {
  Users,
  Search,
  Gift,
  Calendar,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  Heart,
  ChevronRight,
  ShieldCheck,
  Tag,
  Plus,
} from "lucide-react";
import { useAgencyStore, formatInr } from "@/lib/store";
import { Customer } from "@/types/travel";

export default function CustomersPage() {
  const { customers, bookings } = useAgencyStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("All");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(customers[0] || null);

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchTier = tierFilter === "All" || c.tier === tierFilter;
      return matchSearch && matchTier;
    });
  }, [customers, searchQuery, tierFilter]);

  // Customer's bookings history
  const customerBookings = useMemo(() => {
    if (!selectedCustomer) return [];
    return bookings.filter(
      (b) =>
        b.guestEmail.toLowerCase() === selectedCustomer.email.toLowerCase() ||
        b.guestName.toLowerCase().includes(selectedCustomer.name.toLowerCase())
    );
  }, [bookings, selectedCustomer]);

  // Upcoming Celebrations (Birthdays & Anniversaries)
  const upcomingCelebrations = useMemo(() => {
    return customers
      .filter((c) => c.anniversary || c.birthday)
      .slice(0, 4);
  }, [customers]);

  return (
    <div className="space-y-6">
      {/* Page Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F6F2EB]/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl sm:text-3xl font-light text-[#F6F2EB]">
              VIP Client Profiles
            </h1>
            <span className="px-2 py-0.5 rounded bg-[#C2532A]/20 text-[#C2532A] border border-[#C2532A]/40 text-xs font-mono">
              {customers.length} High-Net-Worth Travelers
            </span>
          </div>
          <p className="text-xs text-[#F6F2EB]/60 font-sans mt-0.5">
            Complete guest dossiers, dietary preferences, repeat booking history, and milestone reminders.
          </p>
        </div>
      </div>

      {/* Birthday & Anniversary Reminder Banner */}
      <div className="p-4 rounded-lg bg-[#092B2F] border border-[#C2532A]/40 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-[#C2532A]">
            <Gift className="w-4 h-4" />
            <span className="font-medium uppercase tracking-wider">
              Upcoming Milestones & Anniversaries
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#F6F2EB]/50">Loyalty Touchpoints</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {upcomingCelebrations.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedCustomer(c)}
              className="p-2.5 rounded bg-[#071F22] border border-[#F6F2EB]/10 hover:border-[#C2532A]/50 cursor-pointer transition-colors space-y-1 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#F6F2EB]">{c.name}</span>
                <span className="text-[10px] font-mono text-[#C2532A]">{c.city}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#F6F2EB]/60 font-mono">
                {c.anniversary && <span>💍 Anniv: {c.anniversary}</span>}
                {c.birthday && <span>🎂 Birthday: {c.birthday}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main 2-Column Layout: Directory on Left, Profile Dossier on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Customer Directory (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#F6F2EB]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#092B2F] border border-[#F6F2EB]/15 rounded pl-9 pr-3 py-2 text-xs text-[#F6F2EB] focus:outline-none focus:border-[#C2532A]"
              />
            </div>

            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="bg-[#092B2F] border border-[#F6F2EB]/15 rounded px-2.5 py-2 text-xs font-mono text-[#F6F2EB] focus:outline-none focus:border-[#C2532A]"
            >
              <option value="All">All Tiers</option>
              <option value="Black Diamond">Black Diamond</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
            </select>
          </div>

          <div className="border border-[#F6F2EB]/15 rounded-lg bg-[#092B2F] max-h-[680px] overflow-y-auto divide-y divide-[#F6F2EB]/10">
            {filteredCustomers.map((cust) => {
              const isSelected = selectedCustomer?.id === cust.id;
              return (
                <div
                  key={cust.id}
                  onClick={() => setSelectedCustomer(cust)}
                  className={`p-3.5 cursor-pointer transition-colors flex items-center justify-between ${
                    isSelected ? "bg-[#0E353A] border-l-2 border-[#C2532A]" : "hover:bg-[#071F22]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#071F22] border border-[#C2532A]/40 flex items-center justify-center font-mono text-xs text-[#C2532A]">
                      {cust.name[0]}
                    </div>
                    <div>
                      <h4 className="font-medium text-xs text-[#F6F2EB]">{cust.name}</h4>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-[#F6F2EB]/60">
                        <span>{cust.city}</span>
                        <span>•</span>
                        <span>{cust.tripsCount} journeys</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-xs font-medium text-[#F6F2EB] block">
                      {formatInr(cust.totalSpend)}
                    </span>
                    <span
                      className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-mono uppercase ${
                        cust.tier === "Black Diamond"
                          ? "bg-purple-950/70 text-purple-300 border border-purple-500/30"
                          : cust.tier === "Gold"
                          ? "bg-amber-950/70 text-amber-300 border border-amber-500/30"
                          : "bg-[#071F22] text-[#F6F2EB]/60"
                      }`}
                    >
                      {cust.tier}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Guest Dossier (7 Cols) */}
        {selectedCustomer && (
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-lg bg-[#092B2F] border border-[#F6F2EB]/15 space-y-6">
              {/* Profile Top Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F6F2EB]/10 pb-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#071F22] border-2 border-[#C2532A] flex items-center justify-center font-display text-xl text-[#C2532A]">
                    {selectedCustomer.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-display text-xl text-[#F6F2EB]">
                        {selectedCustomer.name}
                      </h2>
                      <span className="px-2 py-0.5 rounded bg-[#C2532A]/20 text-[#C2532A] text-[10px] font-mono uppercase">
                        {selectedCustomer.tier}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono text-[#F6F2EB]/60 mt-1">
                      <span>{selectedCustomer.city}</span>
                      <span>•</span>
                      <span>Passport: {selectedCustomer.passportExpiry ? "Valid" : "Pending"}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right sm:border-l sm:border-[#F6F2EB]/10 sm:pl-4">
                  <span className="text-[10px] font-mono text-[#F6F2EB]/50 uppercase block">
                    Lifetime Agency Spend
                  </span>
                  <div className="font-display text-xl text-[#F6F2EB] tabular-nums">
                    {formatInr(selectedCustomer.totalSpend)}
                  </div>
                </div>
              </div>

              {/* Contact info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="flex items-center gap-2 p-2.5 rounded bg-[#071F22]">
                  <Mail className="w-4 h-4 text-[#C2532A]" />
                  <span className="text-[#F6F2EB]/80">{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded bg-[#071F22]">
                  <Phone className="w-4 h-4 text-teal-400" />
                  <span className="text-[#F6F2EB]/80">{selectedCustomer.phone}</span>
                </div>
              </div>

              {/* Guest Preferences & Dietary */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#F6F2EB]/60">
                  Curated Travel Preferences
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#071F22] border border-[#F6F2EB]/15 text-xs font-mono text-emerald-400">
                    Dietary: {selectedCustomer.dietary}
                  </span>
                  {selectedCustomer.preferences.map((p, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-[#071F22] border border-[#F6F2EB]/15 text-xs font-mono text-[#F6F2EB]/80"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Internal Agency Notes */}
              <div className="p-3.5 rounded bg-[#071F22] border border-[#F6F2EB]/10 space-y-1">
                <span className="text-[10px] font-mono text-[#C2532A] uppercase tracking-wider block">
                  Confidential Concierge Notes
                </span>
                <p className="text-xs text-[#F6F2EB]/80 leading-relaxed font-sans">
                  {selectedCustomer.notes}
                </p>
              </div>

              {/* Journey History */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[#F6F2EB]/60">
                    Bespoke Journey History ({customerBookings.length})
                  </h4>
                  <span className="text-[10px] font-mono text-[#F6F2EB]/40">
                    Last departure: {selectedCustomer.lastTripDate}
                  </span>
                </div>

                {customerBookings.length > 0 ? (
                  <div className="space-y-2">
                    {customerBookings.map((b) => (
                      <div
                        key={b.id}
                        className="p-3 rounded bg-[#071F22] border border-[#F6F2EB]/10 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-medium text-[#F6F2EB]">{b.packageName}</div>
                          <div className="font-mono text-[11px] text-[#F6F2EB]/50">
                            {b.destination} • {b.startDate} • {b.bookingCode}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-[#F6F2EB]">{formatInr(b.totalAmount)}</span>
                          <span className="block text-[10px] font-mono text-emerald-400">
                            {b.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#F6F2EB]/40 font-mono italic">
                    Historical record logged from offline legacy dossier.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
