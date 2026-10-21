"use client";

import React, { useMemo } from "react";
import {
  BarChart3,
  Download,
  TrendingUp,
  Award,
  Users,
  IndianRupee,
  Layers,
  Percent,
} from "lucide-react";
import { useAgencyStore, formatInr } from "@/lib/store";

export default function ReportsAnalyticsPage() {
  const { bookings, leads, packages, team } = useAgencyStore();

  // Metrics by Package
  const packagePerformance = useMemo(() => {
    return packages.map((pkg) => {
      const bookedCount = bookings.filter((b) => b.packageName === pkg.title).length;
      const totalGross = bookedCount * pkg.pricePerPersonInr * 2; // Avg 2 pax
      const estimatedMargin = Math.round(totalGross * (pkg.grossMarginPct / 100));
      return {
        id: pkg.id,
        title: pkg.title,
        destination: pkg.destination,
        bookedCount,
        totalGross,
        marginPct: pkg.grossMarginPct,
        estimatedMargin,
      };
    });
  }, [packages, bookings]);

  // Agent Performance Leaderboard
  const agentStats = useMemo(() => {
    const agents = team.filter((m) => m.role !== "Accountant");
    return agents.map((agent) => {
      const agentBookings = bookings.filter((b) => b.assignedAgent === agent.name);
      const grossRevenue = agentBookings.reduce((sum, b) => sum + b.totalAmount, 0);
      const agentLeads = leads.filter((l) => l.assignedAgent === agent.name);
      const wonLeads = agentLeads.filter((l) => l.status === "Won");
      const conversionRate =
        agentLeads.length > 0
          ? ((wonLeads.length / agentLeads.length) * 100).toFixed(1)
          : "0.0";

      return {
        ...agent,
        actualBookingsCount: agentBookings.length,
        actualRevenue: grossRevenue,
        conversionRate,
      };
    });
  }, [team, bookings, leads]);

  // Conversion Funnel Metrics
  const funnelStages = useMemo(() => {
    const totalLeads = leads.length;
    const contacted = leads.filter((l) => l.status !== "New").length;
    const quotes = leads.filter(
      (l) => l.status === "Quote sent" || l.status === "Negotiation" || l.status === "Won"
    ).length;
    const won = leads.filter((l) => l.status === "Won").length;

    return [
      { label: "1. Total Inquiries Received", count: totalLeads, pct: 100 },
      {
        label: "2. Contacted & Profiled",
        count: contacted,
        pct: totalLeads ? Math.round((contacted / totalLeads) * 100) : 0,
      },
      {
        label: "3. Bespoke Itinerary & Quote Sent",
        count: quotes,
        pct: totalLeads ? Math.round((quotes / totalLeads) * 100) : 0,
      },
      {
        label: "4. Confirmed & Won Bookings",
        count: won,
        pct: totalLeads ? Math.round((won / totalLeads) * 100) : 0,
      },
    ];
  }, [leads]);

  // CSV Export Handler
  const handleExportCsv = () => {
    const headers = [
      "Booking Reference",
      "Guest Name",
      "Destination",
      "Travel Dates",
      "Total Amount (INR)",
      "Payment Status",
      "Assigned Agent",
    ];

    const rows = bookings.map((b) => [
      b.bookingCode,
      `"${b.guestName}"`,
      b.destination,
      `${b.startDate} to ${b.endDate}`,
      b.totalAmount,
      b.paymentStatus,
      b.assignedAgent,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `voyara_agency_report_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F6F2EB]/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl sm:text-3xl font-light text-[#F6F2EB]">
              Reports & Agency P&L
            </h1>
            <span className="px-2 py-0.5 rounded bg-[#C2532A]/20 text-[#C2532A] border border-[#C2532A]/40 text-xs font-mono">
              Audited Ledger
            </span>
          </div>
          <p className="text-xs text-[#F6F2EB]/60 font-sans mt-0.5">
            Gross booking values, profit margins by package, agent leaderboards, and client conversion funnels.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="inline-flex items-center gap-1.5 py-2 px-4 bg-[#C2532A] hover:bg-[#C2532A]/90 text-white font-mono text-xs uppercase tracking-wider rounded transition-colors shadow"
        >
          <Download className="w-3.5 h-3.5" />
          Export CSV (Excel / Tally)
        </button>
      </div>

      {/* Top Row: Conversion Funnel & Agent Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <div className="p-5 rounded-lg bg-[#092B2F] border border-[#F6F2EB]/15 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg text-[#F6F2EB]">Pipeline Conversion Funnel</h3>
            <span className="text-xs font-mono text-emerald-400">
              {funnelStages[3]?.pct}% Win Ratio
            </span>
          </div>

          <div className="space-y-3">
            {funnelStages.map((stage, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#F6F2EB]/80">{stage.label}</span>
                  <span className="text-[#F6F2EB] font-medium">
                    {stage.count} ({stage.pct}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-[#071F22] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#C2532A] to-[#DC6B42] rounded-full transition-all duration-500"
                    style={{ width: `${stage.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Leaderboard */}
        <div className="p-5 rounded-lg bg-[#092B2F] border border-[#F6F2EB]/15 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg text-[#F6F2EB]">Travel Designer Leaderboard</h3>
            <span className="text-xs font-mono text-[#F6F2EB]/50">Gross Commission Basis</span>
          </div>

          <div className="space-y-3">
            {agentStats.map((agent, rank) => (
              <div
                key={agent.id}
                className="p-3 rounded bg-[#071F22] border border-[#F6F2EB]/10 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#092B2F] border border-[#C2532A]/40 flex items-center justify-center font-mono text-[10px] text-[#C2532A]">
                    #{rank + 1}
                  </span>
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#F6F2EB]/20"
                  />
                  <div>
                    <div className="font-medium text-[#F6F2EB]">{agent.name}</div>
                    <div className="text-[10px] font-mono text-[#F6F2EB]/50">
                      {agent.actualBookingsCount} trips confirmed • {agent.conversionRate}% conversion
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="text-sm font-medium text-white">
                    {formatInr(agent.actualRevenue)}
                  </div>
                  <span className="text-[9px] text-[#C2532A] uppercase">Active Producer</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Package Profitability Matrix */}
      <div className="p-5 rounded-lg bg-[#092B2F] border border-[#F6F2EB]/15 space-y-4">
        <h3 className="font-display text-lg text-[#F6F2EB]">Package Margin & Volume Breakdown</h3>
        <div className="border border-[#F6F2EB]/10 rounded overflow-hidden">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#071F22] border-b border-[#F6F2EB]/10 text-[10px] font-mono uppercase tracking-wider text-[#F6F2EB]/60">
              <tr>
                <th className="py-3 px-4">Curated Itinerary</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Trips Sold</th>
                <th className="py-3 px-4">Gross Revenue (₹)</th>
                <th className="py-3 px-4">Margin %</th>
                <th className="py-3 px-4 text-right">Net Margin Retained</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F6F2EB]/10 font-mono">
              {packagePerformance.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-[#0E353A]/50 transition-colors">
                  <td className="py-3 px-4 font-sans font-medium text-[#F6F2EB]">{pkg.title}</td>
                  <td className="py-3 px-4 text-[#F6F2EB]/70">{pkg.destination}</td>
                  <td className="py-3 px-4">{pkg.bookedCount}</td>
                  <td className="py-3 px-4 font-medium text-[#F6F2EB]">
                    {formatInr(pkg.totalGross)}
                  </td>
                  <td className="py-3 px-4 text-[#C2532A]">{pkg.marginPct}%</td>
                  <td className="py-3 px-4 text-right text-emerald-400 font-bold">
                    {formatInr(pkg.estimatedMargin)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
