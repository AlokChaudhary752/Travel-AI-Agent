"use client";

import React, { useState, useMemo } from "react";
import {
  Users,
  Plus,
  Search,
  Filter,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  X,
  FileCheck2,
} from "lucide-react";
import { useAgencyStore, formatInr } from "@/lib/store";
import { Lead, LeadStatus } from "@/types/travel";

const STAGES: LeadStatus[] = ["New", "Contacted", "Quote sent", "Negotiation", "Won", "Lost"];

export default function LeadsCrmPage() {
  const { leads, updateLeadStatus, addLead, convertLeadToBooking } = useAgencyStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState<string>("All");
  const [selectedLeadForAi, setSelectedLeadForAi] = useState<Lead | null>(null);
  const [convertModalLead, setConvertModalLead] = useState<Lead | null>(null);
  const [newLeadModalOpen, setNewLeadModalOpen] = useState(false);

  // New Lead Form
  const [newLeadData, setNewLeadData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "Kashmir",
    budgetInr: 250000,
    pax: 2,
    travelMonth: "December 2026",
    status: "New" as LeadStatus,
    score: 85,
    source: "Instagram" as Lead["source"],
    assignedAgent: "Ananya Deshmukh",
    followUpDate: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const destinations = useMemo(() => {
    const set = new Set(leads.map((l) => l.destination));
    return ["All", ...Array.from(set)];
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const matchSearch =
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.destination.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDest = selectedDestination === "All" || l.destination === selectedDestination;
      return matchSearch && matchDest;
    });
  }, [leads, searchQuery, selectedDestination]);

  // Group by Kanban stage
  const stageColumns = useMemo(() => {
    const map: Record<LeadStatus, Lead[]> = {
      New: [],
      Contacted: [],
      "Quote sent": [],
      Negotiation: [],
      Won: [],
      Lost: [],
    };
    filteredLeads.forEach((lead) => {
      if (map[lead.status]) {
        map[lead.status].push(lead);
      }
    });
    return map;
  }, [filteredLeads]);

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData("text/plain", leadId);
  };

  const handleDrop = (e: React.DragEvent, targetStage: LeadStatus) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData("text/plain");
    if (leadId) {
      updateLeadStatus(leadId, targetStage);
    }
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    addLead(newLeadData);
    setNewLeadModalOpen(false);
    setNewLeadData({
      name: "",
      email: "",
      phone: "",
      destination: "Kashmir",
      budgetInr: 250000,
      pax: 2,
      travelMonth: "December 2026",
      status: "New",
      score: 85,
      source: "Instagram",
      assignedAgent: "Ananya Deshmukh",
      followUpDate: new Date().toISOString().split("T")[0],
      notes: "",
    });
  };

  const handleConfirmConvert = () => {
    if (!convertModalLead) return;
    convertLeadToBooking(convertModalLead.id);
    setConvertModalLead(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F6F2EB]/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl sm:text-3xl font-light text-[#F6F2EB]">
              Leads Pipeline CRM
            </h1>
            <span className="px-2 py-0.5 rounded bg-[#C2532A]/20 text-[#C2532A] border border-[#C2532A]/40 text-xs font-mono">
              {leads.length} Total Leads
            </span>
          </div>
          <p className="text-xs text-[#F6F2EB]/60 font-sans mt-0.5">
            Drag and drop inquiries across pipeline stages. One-click conversion to confirmed booking.
          </p>
        </div>

        <button
          onClick={() => setNewLeadModalOpen(true)}
          className="inline-flex items-center gap-1.5 py-2 px-4 bg-[#C2532A] hover:bg-[#C2532A]/90 text-white font-mono text-xs uppercase tracking-wider rounded transition-colors shadow"
        >
          <Plus className="w-3.5 h-3.5" />
          Add New Lead
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#F6F2EB]/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by guest name, destination, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#092B2F] border border-[#F6F2EB]/15 rounded pl-9 pr-3 py-2 text-xs text-[#F6F2EB] placeholder-[#F6F2EB]/40 focus:outline-none focus:border-[#C2532A]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-[#C2532A]" />
          <select
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
            className="bg-[#092B2F] border border-[#F6F2EB]/15 rounded px-3 py-2 text-xs font-mono text-[#F6F2EB] focus:outline-none focus:border-[#C2532A]"
          >
            {destinations.map((d) => (
              <option key={d} value={d}>
                Destination: {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Kanban Board Horizontal Scroll */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-6">
        {STAGES.map((stage) => {
          const stageLeads = stageColumns[stage] || [];
          const stageTotal = stageLeads.reduce((sum, l) => sum + l.budgetInr, 0);

          return (
            <div
              key={stage}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, stage)}
              className="bg-[#092B2F] border border-[#F6F2EB]/10 rounded-lg p-3 flex flex-col min-w-[260px] h-[750px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F6F2EB]/10">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      stage === "Won"
                        ? "bg-emerald-400"
                        : stage === "Lost"
                        ? "bg-red-400"
                        : stage === "Quote sent"
                        ? "bg-teal-400"
                        : "bg-[#C2532A]"
                    }`}
                  />
                  <h3 className="font-mono text-xs font-medium text-[#F6F2EB] uppercase tracking-wider">
                    {stage}
                  </h3>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-[#071F22] text-[10px] font-mono text-[#F6F2EB]/60">
                  {stageLeads.length}
                </span>
              </div>

              {/* Column Value Total */}
              <div className="text-[10px] font-mono text-[#F6F2EB]/50 mb-3">
                Value: {formatInr(stageTotal)}
              </div>

              {/* Cards Container */}
              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                {stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead.id)}
                    className="p-3 rounded bg-[#071F22] border border-[#F6F2EB]/15 hover:border-[#F6F2EB]/30 cursor-grab active:cursor-grabbing transition-all space-y-2.5 shadow-sm"
                  >
                    {/* Top Row: Name & Score */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-medium text-xs text-[#F6F2EB] line-clamp-1">
                          {lead.name}
                        </h4>
                        <span className="text-[10px] font-mono text-[#F6F2EB]/60">
                          {lead.destination} • {lead.pax} Pax
                        </span>
                      </div>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${
                          lead.score >= 85
                            ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/30"
                            : lead.score >= 70
                            ? "bg-amber-950/80 text-amber-400 border border-amber-500/30"
                            : "bg-[#092B2F] text-[#F6F2EB]/60"
                        }`}
                      >
                        {lead.score} pts
                      </span>
                    </div>

                    {/* Budget & Travel Month */}
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#C2532A] font-medium">
                        {formatInr(lead.budgetInr)}
                      </span>
                      <span className="text-[10px] text-[#F6F2EB]/50">{lead.travelMonth}</span>
                    </div>

                    {/* Overdue alert indicator */}
                    {lead.isOverdue && (
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-500/20">
                        <AlertCircle className="w-3 h-3" />
                        <span>Follow-up Overdue</span>
                      </div>
                    )}

                    {/* Quick Action Buttons (WhatsApp, Call, AI Suggestion) */}
                    <div className="pt-2 border-t border-[#F6F2EB]/10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          title="WhatsApp Client"
                          className="p-1 rounded bg-[#092B2F] hover:bg-emerald-900/60 text-[#F6F2EB]/70 hover:text-emerald-300 transition-colors"
                        >
                          <MessageCircle className="w-3 h-3" />
                        </a>
                        <a
                          href={`tel:${lead.phone}`}
                          title="Call Client"
                          className="p-1 rounded bg-[#092B2F] hover:bg-[#16565C] text-[#F6F2EB]/70 hover:text-[#F6F2EB] transition-colors"
                        >
                          <Phone className="w-3 h-3" />
                        </a>
                        <button
                          onClick={() => setSelectedLeadForAi(lead)}
                          title="Generate AI Follow-up Draft"
                          className="p-1 rounded bg-[#092B2F] hover:bg-[#C2532A]/30 text-[#C2532A] transition-colors"
                        >
                          <Sparkles className="w-3 h-3" />
                        </button>
                      </div>

                      {stage !== "Won" && (
                        <button
                          onClick={() => setConvertModalLead(lead)}
                          className="px-2 py-1 rounded bg-[#092B2F] hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/20 text-[10px] font-mono flex items-center gap-1 transition-colors"
                        >
                          <FileCheck2 className="w-3 h-3" />
                          Convert
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Suggested Follow-up Message Modal */}
      {selectedLeadForAi && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#092B2F] border border-[#F6F2EB]/20 rounded-lg p-6 max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between border-b border-[#F6F2EB]/10 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C2532A]" />
                <h3 className="font-display text-lg text-[#F6F2EB]">
                  AI Follow-Up Drafter
                </h3>
              </div>
              <button
                onClick={() => setSelectedLeadForAi(null)}
                className="text-[#F6F2EB]/40 hover:text-[#F6F2EB]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-[#F6F2EB]/70">
              Personalized follow-up crafted for <strong>{selectedLeadForAi.name}</strong> regarding their{" "}
              <strong>{selectedLeadForAi.destination}</strong> holiday.
            </div>

            <div className="p-3 rounded bg-[#071F22] border border-[#F6F2EB]/15 text-xs font-mono text-[#F6F2EB]/90 whitespace-pre-wrap leading-relaxed">
              {selectedLeadForAi.aiSuggestedFollowUp ||
                `Namaste ${selectedLeadForAi.name}, I am following up on your requested ${selectedLeadForAi.destination} bespoke itinerary. We currently have luxury suites available for ${selectedLeadForAi.travelMonth}. Would 4 PM today work for a brief 5-minute itinerary alignment call?`}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedLeadForAi(null)}
                className="py-2 px-4 border border-[#F6F2EB]/20 text-[#F6F2EB] rounded text-xs font-mono uppercase"
              >
                Close
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    selectedLeadForAi.aiSuggestedFollowUp || "Follow up text copied."
                  );
                  alert("Copied to clipboard!");
                }}
                className="py-2 px-4 bg-[#C2532A] text-white rounded text-xs font-mono uppercase flex items-center gap-1.5"
              >
                Copy to WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Convert to Booking Confirmation Modal */}
      {convertModalLead && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#092B2F] border border-[#F6F2EB]/20 rounded-lg p-6 max-w-md w-full space-y-4">
            <h3 className="font-display text-xl text-[#F6F2EB]">
              Convert Lead to Confirmed Booking
            </h3>
            <p className="text-xs text-[#F6F2EB]/70 leading-relaxed">
              This will automatically mark <strong>{convertModalLead.name}</strong> as <strong>Won</strong>,
              generate booking reference code <strong>VYR-2026-...</strong>, create customer profile, and issue GST tax invoice.
            </p>

            <div className="p-3 rounded bg-[#071F22] border border-[#F6F2EB]/15 text-xs font-mono space-y-1">
              <div>Destination: {convertModalLead.destination}</div>
              <div>Estimated Total: {formatInr(convertModalLead.budgetInr)}</div>
              <div>Deposit Expected (25%): {formatInr(Math.round(convertModalLead.budgetInr * 0.25))}</div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setConvertModalLead(null)}
                className="py-2 px-4 border border-[#F6F2EB]/20 text-[#F6F2EB] rounded text-xs font-mono uppercase"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmConvert}
                className="py-2 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-mono uppercase flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Confirm Conversion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create New Lead Modal */}
      {newLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#092B2F] border border-[#F6F2EB]/20 rounded-lg p-6 max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between border-b border-[#F6F2EB]/10 pb-3">
              <h3 className="font-display text-xl text-[#F6F2EB]">Add New Lead to CRM</h3>
              <button onClick={() => setNewLeadModalOpen(false)}>
                <X className="w-5 h-5 text-[#F6F2EB]/50 hover:text-[#F6F2EB]" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#F6F2EB]/70 mb-1">Guest Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={newLeadData.name}
                    onChange={(e) => setNewLeadData({ ...newLeadData, name: e.target.value })}
                    className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
                  />
                </div>
                <div>
                  <label className="block text-[#F6F2EB]/70 mb-1">Phone (+91)</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98110 00000"
                    value={newLeadData.phone}
                    onChange={(e) => setNewLeadData({ ...newLeadData, phone: e.target.value })}
                    className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#F6F2EB]/70 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="client@mail.com"
                    value={newLeadData.email}
                    onChange={(e) => setNewLeadData({ ...newLeadData, email: e.target.value })}
                    className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
                  />
                </div>
                <div>
                  <label className="block text-[#F6F2EB]/70 mb-1">Destination</label>
                  <input
                    type="text"
                    required
                    placeholder="Kashmir, Bali, Rajasthan..."
                    value={newLeadData.destination}
                    onChange={(e) => setNewLeadData({ ...newLeadData, destination: e.target.value })}
                    className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#F6F2EB]/70 mb-1">Budget (₹)</label>
                  <input
                    type="number"
                    value={newLeadData.budgetInr}
                    onChange={(e) =>
                      setNewLeadData({ ...newLeadData, budgetInr: Number(e.target.value) })
                    }
                    className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
                  />
                </div>
                <div>
                  <label className="block text-[#F6F2EB]/70 mb-1">Pax</label>
                  <input
                    type="number"
                    value={newLeadData.pax}
                    onChange={(e) =>
                      setNewLeadData({ ...newLeadData, pax: Number(e.target.value) })
                    }
                    className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
                  />
                </div>
                <div>
                  <label className="block text-[#F6F2EB]/70 mb-1">Source</label>
                  <select
                    value={newLeadData.source}
                    onChange={(e) =>
                      setNewLeadData({ ...newLeadData, source: e.target.value as any })
                    }
                    className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="Referral">Referral</option>
                    <option value="Google Ads">Google Ads</option>
                    <option value="HNI Concierge">HNI Concierge</option>
                    <option value="Website">Website</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setNewLeadModalOpen(false)}
                  className="py-2 px-4 border border-[#F6F2EB]/20 text-[#F6F2EB] rounded uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 bg-[#C2532A] text-white rounded uppercase"
                >
                  Add Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
