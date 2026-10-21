"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Calendar, Users, Package, FileText, Sparkles, MapPin, X, ArrowRight } from "lucide-react";
import { useAgencyStore } from "@/lib/store";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const { bookings, leads, customers, packages } = useAgencyStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const filteredBookings = cleanQuery
    ? bookings
        .filter(
          (b) =>
            b.bookingCode.toLowerCase().includes(cleanQuery) ||
            b.guestName.toLowerCase().includes(cleanQuery) ||
            b.destination.toLowerCase().includes(cleanQuery)
        )
        .slice(0, 4)
    : bookings.slice(0, 3);

  const filteredLeads = cleanQuery
    ? leads
        .filter(
          (l) =>
            l.name.toLowerCase().includes(cleanQuery) ||
            l.destination.toLowerCase().includes(cleanQuery) ||
            l.status.toLowerCase().includes(cleanQuery)
        )
        .slice(0, 3)
    : leads.slice(0, 2);

  const filteredCustomers = cleanQuery
    ? customers
        .filter(
          (c) =>
            c.name.toLowerCase().includes(cleanQuery) ||
            c.city.toLowerCase().includes(cleanQuery) ||
            c.phone.includes(cleanQuery)
        )
        .slice(0, 3)
    : customers.slice(0, 2);

  const navigateTo = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div className="bg-[#092B2F] border border-[#F6F2EB]/20 rounded-lg max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#F6F2EB]/15 gap-3">
          <Search className="w-5 h-5 text-[#C2532A]" />
          <input
            type="text"
            autoFocus
            placeholder="Search bookings (VYR-...), leads, guests, destinations, packages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-[#F6F2EB] placeholder-[#F6F2EB]/40 focus:outline-none font-sans"
          />
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[#071F22] border border-[#F6F2EB]/20 rounded text-[#F6F2EB]/60">
              ESC
            </kbd>
            <button
              onClick={onClose}
              className="text-[#F6F2EB]/40 hover:text-[#F6F2EB] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Actions Shortcuts */}
        <div className="px-4 py-2 bg-[#071F22]/70 border-b border-[#F6F2EB]/10 flex flex-wrap gap-2 text-xs font-mono">
          <button
            onClick={() => navigateTo("/app/planner")}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0B2A2E] hover:bg-[#16565C] text-[#C2532A] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" /> AI Trip Planner
          </button>
          <button
            onClick={() => navigateTo("/app/leads")}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0B2A2E] hover:bg-[#16565C] text-[#F6F2EB]/80 transition-colors"
          >
            <Users className="w-3.5 h-3.5" /> Leads CRM
          </button>
          <button
            onClick={() => navigateTo("/app/payments")}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0B2A2E] hover:bg-[#16565C] text-[#F6F2EB]/80 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" /> GST Invoices
          </button>
          <button
            onClick={() => navigateTo("/app/tools")}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0B2A2E] hover:bg-[#16565C] text-[#F6F2EB]/80 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5" /> Live Travel Tools
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* Bookings Section */}
          {filteredBookings.length > 0 && (
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#F6F2EB]/40 px-2 mb-1.5">
                Bookings
              </div>
              <div className="space-y-1">
                {filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => navigateTo(`/app/bookings?id=${b.id}`)}
                    className="flex items-center justify-between p-2 rounded hover:bg-[#0E353A] cursor-pointer transition-colors text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-[#C2532A]" />
                      <div>
                        <span className="font-mono font-medium text-[#F6F2EB]">{b.bookingCode}</span>
                        <span className="text-[#F6F2EB]/60 ml-2">• {b.guestName}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#F6F2EB]/50">{b.destination}</span>
                      <span className="font-mono text-[#F6F2EB]">
                        ₹{b.totalAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Leads Section */}
          {filteredLeads.length > 0 && (
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#F6F2EB]/40 px-2 mb-1.5">
                Leads CRM
              </div>
              <div className="space-y-1">
                {filteredLeads.map((l) => (
                  <div
                    key={l.id}
                    onClick={() => navigateTo(`/app/leads?id=${l.id}`)}
                    className="flex items-center justify-between p-2 rounded hover:bg-[#0E353A] cursor-pointer transition-colors text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <Users className="w-4 h-4 text-teal-400" />
                      <div>
                        <span className="font-medium text-[#F6F2EB]">{l.name}</span>
                        <span className="text-[#F6F2EB]/60 ml-2">({l.destination})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-[#071F22] text-[10px] font-mono text-[#C2532A]">
                        {l.status}
                      </span>
                      <span className="font-mono text-[#F6F2EB]/70">
                        ₹{l.budgetInr.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customers Section */}
          {filteredCustomers.length > 0 && (
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#F6F2EB]/40 px-2 mb-1.5">
                VIP Clients
              </div>
              <div className="space-y-1">
                {filteredCustomers.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => navigateTo(`/app/customers?id=${c.id}`)}
                    className="flex items-center justify-between p-2 rounded hover:bg-[#0E353A] cursor-pointer transition-colors text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#C2532A]/20 flex items-center justify-center text-[10px] text-[#C2532A] font-mono">
                        {c.name[0]}
                      </div>
                      <div>
                        <span className="font-medium text-[#F6F2EB]">{c.name}</span>
                        <span className="text-[#F6F2EB]/50 ml-2">{c.city}</span>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-[#C2532A]">{c.tier}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-[#F6F2EB]/10 bg-[#071F22] flex items-center justify-between text-[11px] font-mono text-[#F6F2EB]/40">
          <span>Tip: Press <strong>Ctrl+K</strong> or <strong>Cmd+K</strong> from any screen to search</span>
          <span>Voyara Terminal 1.0</span>
        </div>
      </div>
    </div>
  );
}
