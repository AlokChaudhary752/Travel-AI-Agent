"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  IndianRupee,
  CalendarCheck,
  Users,
  Percent,
  Clock,
  ArrowUpRight,
  Sparkles,
  Plane,
  CheckCircle2,
  Circle,
  AlertCircle,
  Filter,
} from "lucide-react";
import { useAgencyStore, formatInr } from "@/lib/store";

export default function OverviewDashboardPage() {
  const {
    bookings,
    leads,
    customers,
    invoices,
    tasks,
    toggleTask,
    dateRange,
    setDateRange,
  } = useAgencyStore();

  // Filter bookings and leads by selected dateRange
  const { filteredBookings, filteredLeads, filteredInvoices } = useMemo(() => {
    const now = new Date(2026, 9, 21); // 2026-10-21
    let daysCutoff = 30;
    if (dateRange === "7d") daysCutoff = 7;
    else if (dateRange === "30d") daysCutoff = 30;
    else if (dateRange === "90d") daysCutoff = 90;
    else if (dateRange === "12m") daysCutoff = 365;
    else daysCutoff = 9999;

    const cutoffDate = new Date(now);
    cutoffDate.setDate(cutoffDate.getDate() - daysCutoff);

    const fb = bookings.filter((b) => new Date(b.createdAt) >= cutoffDate);
    const fl = leads.filter((l) => new Date(l.createdAt) >= cutoffDate);
    const fi = invoices.filter((i) => new Date(i.issueDate) >= cutoffDate);

    return {
      filteredBookings: fb.length > 0 ? fb : bookings,
      filteredLeads: fl.length > 0 ? fl : leads,
      filteredInvoices: fi.length > 0 ? fi : invoices,
    };
  }, [bookings, leads, invoices, dateRange]);

  // Derived Metrics & Trends
  const totalRevenue = useMemo(() => {
    return filteredBookings.reduce((sum, b) => sum + b.totalAmount, 0);
  }, [filteredBookings]);

  const activeLeadsCount = useMemo(() => {
    return leads.filter((l) => l.status !== "Won" && l.status !== "Lost").length;
  }, [leads]);

  const wonLeadsCount = useMemo(() => {
    return leads.filter((l) => l.status === "Won").length;
  }, [leads]);

  const conversionRate = useMemo(() => {
    return leads.length > 0 ? ((wonLeadsCount / leads.length) * 100).toFixed(1) : "0.0";
  }, [wonLeadsCount, leads]);

  const outstandingReceivables = useMemo(() => {
    return invoices.reduce((sum, inv) => sum + inv.balanceDue, 0);
  }, [invoices]);

  // Destination Distribution Breakdown
  const destinationCounts = useMemo(() => {
    const map: Record<string, number> = {};
    bookings.forEach((b) => {
      map[b.destination] = (map[b.destination] || 0) + 1;
    });
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [bookings]);

  // Lead Sources Breakdown
  const sourceCounts = useMemo(() => {
    const map: Record<string, number> = {};
    leads.forEach((l) => {
      map[l.source] = (map[l.source] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [leads]);

  // Upcoming Departures (next 30 days)
  const upcomingDepartures = useMemo(() => {
    return bookings
      .filter((b) => b.status === "Confirmed" && new Date(b.startDate) >= new Date(2026, 9, 21))
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .slice(0, 5);
  }, [bookings]);

  return (
    <div className="space-y-6">
      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F6F2EB]/10 pb-5">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-light text-[#F6F2EB]">
            Executive Agency Overview
          </h1>
          <p className="text-xs text-[#F6F2EB]/60 font-sans mt-0.5">
            Operational metrics derived live from <strong>{bookings.length} bookings</strong>,{" "}
            <strong>{leads.length} active leads</strong>, and <strong>{invoices.length} GST invoices</strong>.
          </p>
        </div>

        {/* Quick Date Range Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-[#C2532A]" />
          <div className="flex rounded border border-[#F6F2EB]/15 bg-[#092B2F] p-0.5 text-xs font-mono">
            {(["7d", "30d", "90d", "12m", "all"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                className={`px-2.5 py-1 rounded transition-colors uppercase ${
                  dateRange === r
                    ? "bg-[#C2532A] text-white font-medium"
                    : "text-[#F6F2EB]/60 hover:text-[#F6F2EB]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Booked Revenue */}
        <div className="p-4 rounded-lg bg-[#092B2F] border border-[#F6F2EB]/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#F6F2EB]/60">
            <span>Gross Bookings Value</span>
            <IndianRupee className="w-4 h-4 text-[#C2532A]" />
          </div>
          <div className="font-display text-2xl font-light text-[#F6F2EB] tabular-nums">
            {formatInr(totalRevenue)}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% vs prev period</span>
          </div>
        </div>

        {/* Confirmed Bookings */}
        <div className="p-4 rounded-lg bg-[#092B2F] border border-[#F6F2EB]/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#F6F2EB]/60">
            <span>Confirmed Bookings</span>
            <CalendarCheck className="w-4 h-4 text-teal-400" />
          </div>
          <div className="font-display text-2xl font-light text-[#F6F2EB] tabular-nums">
            {filteredBookings.length}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+12 new this month</span>
          </div>
        </div>

        {/* Active Pipeline Leads */}
        <div className="p-4 rounded-lg bg-[#092B2F] border border-[#F6F2EB]/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#F6F2EB]/60">
            <span>Active Leads in CRM</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="font-display text-2xl font-light text-[#F6F2EB] tabular-nums">
            {activeLeadsCount}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-400">
            <Clock className="w-3.5 h-3.5" />
            <span>8 overdue follow-ups</span>
          </div>
        </div>

        {/* Pipeline Conversion Rate */}
        <div className="p-4 rounded-lg bg-[#092B2F] border border-[#F6F2EB]/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#F6F2EB]/60">
            <span>Win Conversion</span>
            <Percent className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="font-display text-2xl font-light text-[#F6F2EB] tabular-nums">
            {conversionRate}%
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+3.2% vs industry avg</span>
          </div>
        </div>

        {/* Outstanding Receivables */}
        <div className="p-4 rounded-lg bg-[#092B2F] border border-[#F6F2EB]/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#F6F2EB]/60">
            <span>Outstanding GST Dues</span>
            <AlertCircle className="w-4 h-4 text-red-400" />
          </div>
          <div className="font-display text-2xl font-light text-red-300 tabular-nums">
            {formatInr(outstandingReceivables)}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#F6F2EB]/50">
            <span>Across {invoices.filter((i) => i.balanceDue > 0).length} client invoices</span>
          </div>
        </div>
      </div>

      {/* Middle Row: Revenue Trajectory & Bookings by Destination */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trajectory Bar/Line Chart (2 Cols) */}
        <div className="lg:col-span-2 p-5 rounded-lg bg-[#092B2F] border border-[#F6F2EB]/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg text-[#F6F2EB]">Monthly Revenue Trajectory</h3>
              <p className="text-xs text-[#F6F2EB]/50 font-mono">
                Gross sales in ₹ Lakhs across recent quarters
              </p>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#071F22] text-[#C2532A] text-xs font-mono">
              ₹ Lakhs
            </span>
          </div>

          {/* Styled CSS/SVG Bar Chart */}
          <div className="h-56 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-[#F6F2EB]/10">
            {[
              { month: "May", rev: 32.5, height: "45%" },
              { month: "Jun", rev: 41.2, height: "55%" },
              { month: "Jul", rev: 52.8, height: "68%" },
              { month: "Aug", rev: 48.0, height: "62%" },
              { month: "Sep", rev: 64.5, height: "82%" },
              { month: "Oct (Proj)", rev: 78.4, height: "100%", active: true },
            ].map((col) => (
              <div key={col.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-mono text-[#F6F2EB]/60">₹{col.rev}L</span>
                <div
                  style={{ height: col.height }}
                  className={`w-full max-w-[48px] rounded-t transition-all duration-500 ${
                    col.active
                      ? "bg-gradient-to-t from-[#C2532A] to-[#DC6B42] shadow-lg shadow-[#C2532A]/20"
                      : "bg-[#0E353A] hover:bg-[#16565C]"
                  }`}
                />
                <span className="text-xs font-mono text-[#F6F2EB]/70">{col.month}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-[#F6F2EB]/60 font-mono pt-1">
            <span>Peak seasonality: Kashmir Heli-Ski & Rajasthan Royal Season</span>
            <Link href="/app/reports" className="text-[#C2532A] hover:underline flex items-center gap-1">
              Full P&L Report <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bookings by Destination (1 Col) */}
        <div className="p-5 rounded-lg bg-[#092B2F] border border-[#F6F2EB]/10 space-y-4">
          <h3 className="font-display text-lg text-[#F6F2EB]">Top Destination Volumes</h3>
          <div className="space-y-3">
            {destinationCounts.map(([dest, count]) => {
              const pct = Math.round((count / bookings.length) * 100);
              return (
                <div key={dest} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#F6F2EB]">{dest}</span>
                    <span className="text-[#F6F2EB]/60">
                      {count} trips ({pct}%)
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-[#071F22] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C2532A] rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Lead Source Donut Summary */}
          <div className="pt-4 border-t border-[#F6F2EB]/10 space-y-2">
            <span className="text-xs font-mono text-[#F6F2EB]/50 uppercase tracking-wider block">
              Lead Acquisition Channels
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {sourceCounts.slice(0, 4).map(([src, count]) => (
                <div key={src} className="p-2 rounded bg-[#071F22] flex items-center justify-between">
                  <span className="text-[#F6F2EB]/80">{src}</span>
                  <span className="text-[#C2532A] font-bold">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Upcoming Departures & Today's Operational Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Departures (2 Cols) */}
        <div className="lg:col-span-2 p-5 rounded-lg bg-[#092B2F] border border-[#F6F2EB]/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-[#C2532A]" />
              <h3 className="font-display text-lg text-[#F6F2EB]">Next Scheduled Departures</h3>
            </div>
            <Link href="/app/bookings" className="text-xs font-mono text-[#C2532A] hover:underline">
              View all ({bookings.length})
            </Link>
          </div>

          <div className="divide-y divide-[#F6F2EB]/10">
            {upcomingDepartures.map((b) => (
              <div key={b.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-[#071F22] border border-[#F6F2EB]/15 flex flex-col items-center justify-center font-mono">
                    <span className="text-[9px] text-[#C2532A]">
                      {new Date(b.startDate).toLocaleString("en-US", { month: "short" })}
                    </span>
                    <span className="font-bold text-sm text-[#F6F2EB]">
                      {new Date(b.startDate).getDate()}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-[#F6F2EB] text-sm">{b.guestName}</div>
                    <div className="text-[#F6F2EB]/60 font-mono">
                      {b.destination} • {b.paxAdults} Adults • {b.packageName}
                    </div>
                  </div>
                </div>

                <div className="text-right flex items-center gap-3">
                  <div>
                    <div className="font-mono font-medium text-[#F6F2EB]">
                      {formatInr(b.totalAmount)}
                    </div>
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-mono uppercase ${
                        b.paymentStatus === "Paid"
                          ? "bg-emerald-950/60 text-emerald-400 border border-emerald-500/30"
                          : "bg-amber-950/60 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {b.paymentStatus}
                    </span>
                  </div>
                  <Link
                    href={`/app/bookings?id=${b.id}`}
                    className="p-1.5 rounded bg-[#071F22] hover:bg-[#0E353A] text-[#F6F2EB]/70 hover:text-[#F6F2EB]"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Tasks (1 Col) */}
        <div className="p-5 rounded-lg bg-[#092B2F] border border-[#F6F2EB]/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg text-[#F6F2EB]">Today&apos;s Action Items</h3>
            <span className="text-xs font-mono text-[#F6F2EB]/50">
              {tasks.filter((t) => t.completed).length} / {tasks.length} Done
            </span>
          </div>

          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-3 rounded border cursor-pointer transition-colors flex items-start gap-3 ${
                  task.completed
                    ? "bg-[#071F22]/40 border-[#F6F2EB]/5 text-[#F6F2EB]/40 line-through"
                    : "bg-[#071F22] border-[#F6F2EB]/15 hover:border-[#F6F2EB]/30 text-[#F6F2EB]"
                }`}
              >
                <button className="mt-0.5 text-[#C2532A]">
                  {task.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-[#F6F2EB]/40" />
                  )}
                </button>
                <div className="flex-1 text-xs">
                  <p className="leading-snug">{task.title}</p>
                  <div className="flex items-center gap-2 mt-1.5 font-mono text-[10px] text-[#F6F2EB]/50">
                    <span>{task.dueTime}</span>
                    <span>•</span>
                    <span
                      className={
                        task.priority === "High"
                          ? "text-red-400"
                          : task.priority === "Medium"
                          ? "text-amber-400"
                          : "text-teal-400"
                      }
                    >
                      {task.priority} Priority
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/app/planner"
              className="w-full py-2 bg-[#C2532A]/20 hover:bg-[#C2532A]/30 border border-[#C2532A]/40 text-[#C2532A] rounded font-mono text-xs uppercase flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Open AI Itinerary Generator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
