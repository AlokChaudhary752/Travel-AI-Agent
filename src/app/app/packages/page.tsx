"use client";

import React, { useState } from "react";
import {
  Package,
  Plus,
  Search,
  Building2,
  Users,
  Percent,
  IndianRupee,
  Calendar,
  CheckCircle2,
  Sliders,
  Sparkles,
} from "lucide-react";
import { useAgencyStore, formatInr } from "@/lib/store";

export default function PackagesInventoryPage() {
  const { packages, suppliers, bookings } = useAgencyStore();

  const [activeTab, setActiveTab] = useState<"packages" | "suppliers" | "calculator">("packages");
  const [searchQuery, setSearchQuery] = useState("");

  // Margin Calculator Interactive State
  const [calcRackRate, setCalcRackRate] = useState<number>(45000);
  const [calcNetRate, setCalcNetRate] = useState<number>(31500);
  const [calcTransport, setCalcTransport] = useState<number>(8500);
  const [calcActivities, setCalcActivities] = useState<number>(6000);
  const [calcMarkupPct, setCalcMarkupPct] = useState<number>(25);

  const totalNetCost = calcNetRate + calcTransport + calcActivities;
  const markupAmount = Math.round(totalNetCost * (calcMarkupPct / 100));
  const preTaxPrice = totalNetCost + markupAmount;
  const gstAmount = Math.round(preTaxPrice * 0.05);
  const finalClientQuotation = preTaxPrice + gstAmount;

  const filteredPackages = packages.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F6F2EB]/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl sm:text-3xl font-light text-[#F6F2EB]">
              Packages & Supplier Inventory
            </h1>
            <span className="px-2 py-0.5 rounded bg-[#C2532A]/20 text-[#C2532A] border border-[#C2532A]/40 text-xs font-mono">
              {packages.length} Packages • {suppliers.length} Contracted Suppliers
            </span>
          </div>
          <p className="text-xs text-[#F6F2EB]/60 font-sans mt-0.5">
            Real-time seat/room availability counters, supplier net contracts, and B2B margin analytics.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex rounded border border-[#F6F2EB]/15 bg-[#092B2F] p-0.5 text-xs font-mono">
          <button
            onClick={() => setActiveTab("packages")}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === "packages" ? "bg-[#C2532A] text-white" : "text-[#F6F2EB]/60 hover:text-[#F6F2EB]"
            }`}
          >
            Curated Packages
          </button>
          <button
            onClick={() => setActiveTab("suppliers")}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === "suppliers" ? "bg-[#C2532A] text-white" : "text-[#F6F2EB]/60 hover:text-[#F6F2EB]"
            }`}
          >
            Contracted Suppliers
          </button>
          <button
            onClick={() => setActiveTab("calculator")}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === "calculator" ? "bg-[#C2532A] text-white" : "text-[#F6F2EB]/60 hover:text-[#F6F2EB]"
            }`}
          >
            Margin Calculator
          </button>
        </div>
      </div>

      {/* Tab 1: Packages Library */}
      {activeTab === "packages" && (
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-[#F6F2EB]/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search packages by destination or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#092B2F] border border-[#F6F2EB]/15 rounded pl-9 pr-3 py-2 text-xs text-[#F6F2EB] focus:outline-none focus:border-[#C2532A]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPackages.map((pkg) => {
              const availabilityPct = Math.round((pkg.availableSeats / pkg.totalCapacity) * 100);
              return (
                <div
                  key={pkg.id}
                  className="rounded-lg bg-[#092B2F] border border-[#F6F2EB]/15 overflow-hidden flex flex-col justify-between hover:border-[#F6F2EB]/30 transition-all shadow-sm"
                >
                  <div className="relative h-44 w-full">
                    <img
                      src={pkg.heroImage}
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#092B2F] via-transparent to-black/30" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#071F22]/90 backdrop-blur-sm text-[#C2532A] text-[10px] font-mono uppercase tracking-wider">
                        {pkg.destination}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#071F22]/90 backdrop-blur-sm text-[#F6F2EB] text-[10px] font-mono">
                        {pkg.durationDays}D / {pkg.durationDays - 1}N
                      </span>
                    </div>

                    {/* Dynamic Availability Badge */}
                    <div className="absolute bottom-2 right-3 px-2 py-0.5 rounded bg-[#071F22]/90 border border-emerald-500/40 text-[10px] font-mono text-emerald-300">
                      {pkg.availableSeats} Seats Left
                    </div>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-base text-[#F6F2EB] font-light leading-snug">
                        {pkg.title}
                      </h3>
                      <p className="text-xs text-[#F6F2EB]/60 line-clamp-2 mt-1">
                        {pkg.tagline}
                      </p>
                    </div>

                    <div className="space-y-1 pt-2 border-t border-[#F6F2EB]/10">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-[#F6F2EB]/50">Retail / Person:</span>
                        <strong className="text-[#F6F2EB]">
                          {formatInr(pkg.pricePerPersonInr)}
                        </strong>
                      </div>
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-[#F6F2EB]/50">Gross Agency Margin:</span>
                        <span className="text-[#C2532A] font-medium">{pkg.grossMarginPct}%</span>
                      </div>

                      {/* Seat allocation meter */}
                      <div className="pt-2">
                        <div className="flex justify-between text-[10px] font-mono text-[#F6F2EB]/50 mb-1">
                          <span>Inventory Reserved</span>
                          <span>
                            {pkg.bookedSeats} / {pkg.totalCapacity} Booked
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-[#071F22] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#C2532A] rounded-full"
                            style={{
                              width: `${Math.round((pkg.bookedSeats / pkg.totalCapacity) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Contracted Suppliers */}
      {activeTab === "suppliers" && (
        <div className="border border-[#F6F2EB]/15 rounded-lg bg-[#092B2F] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#071F22] border-b border-[#F6F2EB]/10 text-[10px] font-mono uppercase tracking-wider text-[#F6F2EB]/60">
                <tr>
                  <th className="py-3 px-4">Supplier Partner</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Contact Person</th>
                  <th className="py-3 px-4">Contract Net (₹)</th>
                  <th className="py-3 px-4">Retail Price (₹)</th>
                  <th className="py-3 px-4">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F6F2EB]/10">
                {suppliers.map((s) => (
                  <tr key={s.id} className="hover:bg-[#0E353A]/60 transition-colors">
                    <td className="py-3 px-4 font-medium text-[#F6F2EB]">
                      {s.name}
                      <span className="block text-[10px] text-[#F6F2EB]/50 font-mono">
                        {s.notes}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-[#071F22] text-[10px] font-mono text-[#C2532A]">
                        {s.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#F6F2EB]/70">{s.location}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-[#F6F2EB]/80">
                      <div>{s.contactPerson}</div>
                      <div className="text-[10px] text-[#F6F2EB]/50">{s.phone}</div>
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-emerald-400">
                      {formatInr(s.contractedNetRateInr)}
                    </td>
                    <td className="py-3 px-4 font-mono text-[#F6F2EB]/60 line-through">
                      {formatInr(s.retailPriceInr)}
                    </td>
                    <td className="py-3 px-4 font-mono text-amber-400">★ {s.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Interactive Cost & Margin Calculator */}
      {activeTab === "calculator" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg bg-[#092B2F] border border-[#F6F2EB]/15 space-y-4">
            <h3 className="font-display text-xl text-[#F6F2EB]">B2B Margin & Tax Simulator</h3>
            <p className="text-xs text-[#F6F2EB]/60">
              Calculate agency net commission vs rack price with automatic SAC 998555 5% GST calculation.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-[#F6F2EB]/70 mb-1">
                  Contracted Hotel Net Rate (Per Night in ₹)
                </label>
                <input
                  type="number"
                  value={calcNetRate}
                  onChange={(e) => setCalcNetRate(Number(e.target.value))}
                  className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
                />
              </div>

              <div>
                <label className="block text-[#F6F2EB]/70 mb-1">
                  Private Transport Chauffeur Cost (₹)
                </label>
                <input
                  type="number"
                  value={calcTransport}
                  onChange={(e) => setCalcTransport(Number(e.target.value))}
                  className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
                />
              </div>

              <div>
                <label className="block text-[#F6F2EB]/70 mb-1">
                  Guided Excursions & Permit Fees (₹)
                </label>
                <input
                  type="number"
                  value={calcActivities}
                  onChange={(e) => setCalcActivities(Number(e.target.value))}
                  className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
                />
              </div>

              <div>
                <div className="flex justify-between text-[#F6F2EB]/70 mb-1">
                  <span>Target Agency Gross Markup</span>
                  <span className="text-[#C2532A] font-bold">{calcMarkupPct}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={45}
                  value={calcMarkupPct}
                  onChange={(e) => setCalcMarkupPct(Number(e.target.value))}
                  className="w-full accent-[#C2532A]"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-[#092B2F] border border-[#C2532A]/50 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase text-[#C2532A] tracking-wider block">
                Calculated Commercial Summary
              </span>

              <div className="space-y-2 border-b border-[#F6F2EB]/10 pb-4 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#F6F2EB]/60">Total Supplier Net Cost:</span>
                  <span className="text-[#F6F2EB]">{formatInr(totalNetCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#F6F2EB]/60">Agency Profit Margin ({calcMarkupPct}%):</span>
                  <span className="text-emerald-400 font-bold">{formatInr(markupAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#F6F2EB]/60">Pre-Tax Base Package:</span>
                  <span className="text-[#F6F2EB]">{formatInr(preTaxPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#F6F2EB]/60">5% GST (SGST 2.5% + CGST 2.5%):</span>
                  <span className="text-amber-400">{formatInr(gstAmount)}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded bg-[#071F22] border border-[#C2532A] space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#C2532A] block">
                Recommended Client Retail Quotation
              </span>
              <div className="font-display text-3xl font-light text-white tabular-nums">
                {formatInr(finalClientQuotation)}
              </div>
              <p className="text-[11px] text-[#F6F2EB]/50 font-mono">
                Agency retains {formatInr(markupAmount)} net profit before overheads.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
