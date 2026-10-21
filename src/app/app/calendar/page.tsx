"use client";

import React, { useState, useMemo } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Plane,
  Clock,
  IndianRupee,
  Plus,
  X,
  CheckCircle2,
} from "lucide-react";
import { useAgencyStore, formatInr } from "@/lib/store";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: "departure" | "followup" | "payment";
  amount?: number;
  client?: string;
}

export default function AgencyCalendarPage() {
  const { bookings, leads, invoices } = useAgencyStore();

  const [currentMonth, setCurrentMonth] = useState(9); // October (0-indexed)
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [filterType, setFilterType] = useState<string>("All");

  // Derive calendar events from actual bookings departures, lead follow-ups, and invoice due dates
  const events = useMemo(() => {
    const list: CalendarEvent[] = [];

    // Departures
    bookings.forEach((b) => {
      list.push({
        id: `dep-${b.id}`,
        title: `Departure: ${b.guestName} (${b.destination})`,
        date: b.startDate,
        type: "departure",
        amount: b.totalAmount,
        client: b.guestName,
      });
    });

    // Follow-ups
    leads.forEach((l) => {
      if (l.followUpDate) {
        list.push({
          id: `fol-${l.id}`,
          title: `Follow-up: ${l.name} (${l.destination})`,
          date: l.followUpDate,
          type: "followup",
          amount: l.budgetInr,
          client: l.name,
        });
      }
    });

    // Payment milestones
    invoices.forEach((i) => {
      if (i.balanceDue > 0) {
        list.push({
          id: `pay-${i.id}`,
          title: `Due ₹${(i.balanceDue / 1000).toFixed(0)}k: ${i.clientName}`,
          date: i.dueDate,
          type: "payment",
          amount: i.balanceDue,
          client: i.clientName,
        });
      }
    });

    return list;
  }, [bookings, leads, invoices]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getDayEvents = (dayNumber: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(
      dayNumber
    ).padStart(2, "0")}`;

    return events.filter((e) => {
      const matchDate = e.date === dateStr;
      const matchType = filterType === "All" || e.type === filterType;
      return matchDate && matchType;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F6F2EB]/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl sm:text-3xl font-light text-[#F6F2EB]">
              Agency Operations Calendar
            </h1>
            <span className="px-2 py-0.5 rounded bg-[#C2532A]/20 text-[#C2532A] border border-[#C2532A]/40 text-xs font-mono">
              Month & Week Grid
            </span>
          </div>
          <p className="text-xs text-[#F6F2EB]/60 font-sans mt-0.5">
            Synchronized timeline of flight departures, client follow-ups, and invoice balance due dates.
          </p>
        </div>

        {/* Legend / Filter */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-[#092B2F] border border-[#F6F2EB]/15 rounded px-2.5 py-1.5 text-xs text-[#F6F2EB]"
          >
            <option value="All">All Operations</option>
            <option value="departure">Departures Only</option>
            <option value="followup">Follow-ups Only</option>
            <option value="payment">Payments Due Only</option>
          </select>
        </div>
      </div>

      {/* Calendar Navigation Bar */}
      <div className="p-4 rounded-lg bg-[#092B2F] border border-[#F6F2EB]/15 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-display text-xl text-[#F6F2EB]">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <span className="text-xs font-mono text-[#F6F2EB]/50 hidden sm:inline">
            (Voyara Autumn / Winter Season)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-1.5 rounded bg-[#071F22] hover:bg-[#0E353A] text-[#F6F2EB]"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setCurrentMonth(9);
              setCurrentYear(2026);
            }}
            className="px-2.5 py-1 rounded bg-[#071F22] hover:bg-[#0E353A] text-xs font-mono text-[#F6F2EB]"
          >
            Today
          </button>
          <button
            onClick={handleNextMonth}
            className="p-1.5 rounded bg-[#071F22] hover:bg-[#0E353A] text-[#F6F2EB]"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Month Grid */}
      <div className="border border-[#F6F2EB]/15 rounded-lg bg-[#092B2F] overflow-hidden shadow-sm">
        {/* Day Name Headers */}
        <div className="grid grid-cols-7 bg-[#071F22] border-b border-[#F6F2EB]/10 text-center py-2 text-[11px] font-mono uppercase text-[#F6F2EB]/60">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Calendar Cells Grid */}
        <div className="grid grid-cols-7 divide-x divide-y divide-[#F6F2EB]/10">
          {/* Empty cells before month start */}
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[110px] p-2 bg-[#071F22]/40" />
          ))}

          {/* Month Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const dayEvents = getDayEvents(dayNum);
            const isToday = dayNum === 21 && currentMonth === 9 && currentYear === 2026;

            return (
              <div
                key={`day-${dayNum}`}
                className={`min-h-[110px] p-2 transition-colors flex flex-col justify-between ${
                  isToday ? "bg-[#0B353A]/50 ring-1 ring-[#C2532A]" : "hover:bg-[#0E353A]/40"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span
                    className={`text-xs font-mono font-medium rounded-full w-5 h-5 flex items-center justify-center ${
                      isToday ? "bg-[#C2532A] text-white" : "text-[#F6F2EB]/80"
                    }`}
                  >
                    {dayNum}
                  </span>
                  {dayEvents.length > 0 && (
                    <span className="text-[9px] font-mono text-[#F6F2EB]/40">
                      {dayEvents.length} items
                    </span>
                  )}
                </div>

                {/* Day events pills */}
                <div className="space-y-1 flex-1 overflow-y-auto max-h-[80px]">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono truncate cursor-pointer transition-colors ${
                        event.type === "departure"
                          ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/20"
                          : event.type === "payment"
                          ? "bg-amber-950/80 text-amber-300 border border-amber-500/20"
                          : "bg-[#071F22] text-teal-300 border border-teal-500/20"
                      }`}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-[9px] font-mono text-[#F6F2EB]/50 pl-1">
                      +{dayEvents.length - 3} more...
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Details Flyout Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#092B2F] border border-[#F6F2EB]/20 rounded-lg p-6 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between border-b border-[#F6F2EB]/10 pb-3">
              <span className="text-xs font-mono uppercase text-[#C2532A]">
                Calendar Operation Details
              </span>
              <button onClick={() => setSelectedEvent(null)}>
                <X className="w-4 h-4 text-[#F6F2EB]/50 hover:text-[#F6F2EB]" />
              </button>
            </div>

            <h3 className="font-display text-lg text-[#F6F2EB]">{selectedEvent.title}</h3>

            <div className="p-3 rounded bg-[#071F22] text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-[#F6F2EB]/50">Date:</span>
                <span className="text-[#F6F2EB]">{selectedEvent.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F6F2EB]/50">Operation Type:</span>
                <span className="capitalize text-[#C2532A]">{selectedEvent.type}</span>
              </div>
              {selectedEvent.amount && (
                <div className="flex justify-between">
                  <span className="text-[#F6F2EB]/50">Commercial Amount:</span>
                  <span className="text-emerald-400 font-bold">{formatInr(selectedEvent.amount)}</span>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedEvent(null)}
                className="py-1.5 px-4 bg-[#C2532A] text-white rounded text-xs font-mono uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
