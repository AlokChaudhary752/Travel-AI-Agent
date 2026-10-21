"use client";

import React, { useState, useMemo } from "react";
import {
  FileCheck2,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Printer,
  FileText,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit2,
  UserCheck,
  Plane,
  AlertTriangle,
} from "lucide-react";
import { useAgencyStore, formatInr } from "@/lib/store";
import { Booking, BookingStatus, PaymentStatus } from "@/types/travel";

export default function BookingsManagerPage() {
  const { bookings, addBooking, updateBooking, updateBookingStatus, settings } = useAgencyStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [paymentFilter, setPaymentFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Selected booking for slide-over drawer / voucher modal
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [voucherModalBooking, setVoucherModalBooking] = useState<Booking | null>(null);
  const [invoiceModalBooking, setInvoiceModalBooking] = useState<Booking | null>(null);
  const [slideOverOpen, setSlideOverOpen] = useState(false);

  // Filtered & Paginated Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchSearch =
        b.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.packageName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === "All" || b.status === statusFilter;
      const matchPayment = paymentFilter === "All" || b.paymentStatus === paymentFilter;
      return matchSearch && matchStatus && matchPayment;
    });
  }, [bookings, searchQuery, statusFilter, paymentFilter]);

  const totalPages = Math.ceil(filteredBookings.length / rowsPerPage);
  const paginatedBookings = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredBookings.slice(start, start + rowsPerPage);
  }, [filteredBookings, currentPage]);

  const handleOpenEdit = (booking: Booking) => {
    setSelectedBooking({ ...booking });
    setSlideOverOpen(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBooking) {
      updateBooking(selectedBooking.id, selectedBooking);
      setSlideOverOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F6F2EB]/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl sm:text-3xl font-light text-[#F6F2EB]">
              Bookings & Dispatch
            </h1>
            <span className="px-2 py-0.5 rounded bg-[#C2532A]/20 text-[#C2532A] border border-[#C2532A]/40 text-xs font-mono">
              {bookings.length} Confirmed Trips
            </span>
          </div>
          <p className="text-xs text-[#F6F2EB]/60 font-sans mt-0.5">
            Manage traveler documentation checklists, voucher generation, and GST tax invoice issuance.
          </p>
        </div>

        <button
          onClick={() => {
            const newB: Booking = {
              id: `bk-${Date.now()}`,
              bookingCode: `VYR-2026-${Date.now().toString().slice(-4)}`,
              guestName: "",
              guestEmail: "",
              guestPhone: "",
              destination: "Kashmir",
              startDate: new Date().toISOString().split("T")[0],
              endDate: new Date().toISOString().split("T")[0],
              paxAdults: 2,
              paxChildren: 0,
              packageName: "Gulmarg Luxury Heli-Ski Retreat",
              totalAmount: 390000,
              paidAmount: 195000,
              status: "Confirmed",
              paymentStatus: "Partial",
              leadSource: "Direct",
              assignedAgent: "Vikram Malhotra",
              travellers: [
                { id: "1", name: "Lead Passenger", age: 40, gender: "Male", foodPreference: "Veg" },
              ],
              checklist: { passport: true, visa: false, flights: false, hotelVouchers: true, insurance: false },
              createdAt: new Date().toISOString().split("T")[0],
              invoiceNumber: `INV-VYR-2026-0${Date.now().toString().slice(-3)}`,
            };
            setSelectedBooking(newB);
            setSlideOverOpen(true);
          }}
          className="inline-flex items-center gap-1.5 py-2 px-4 bg-[#C2532A] hover:bg-[#C2532A]/90 text-white font-mono text-xs uppercase tracking-wider rounded transition-colors shadow"
        >
          <Plus className="w-3.5 h-3.5" />
          Create Booking
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#F6F2EB]/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Booking code (VYR-...), guest name, destination..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-[#092B2F] border border-[#F6F2EB]/15 rounded pl-9 pr-3 py-2 text-xs text-[#F6F2EB] placeholder-[#F6F2EB]/40 focus:outline-none focus:border-[#C2532A]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[#092B2F] border border-[#F6F2EB]/15 rounded px-3 py-2 text-xs font-mono text-[#F6F2EB] focus:outline-none focus:border-[#C2532A]"
          >
            <option value="All">Status: All</option>
            <option value="Confirmed">Confirmed</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => {
              setPaymentFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[#092B2F] border border-[#F6F2EB]/15 rounded px-3 py-2 text-xs font-mono text-[#F6F2EB] focus:outline-none focus:border-[#C2532A]"
          >
            <option value="All">Payment: All</option>
            <option value="Paid">Paid</option>
            <option value="Partial">Partial</option>
            <option value="Due">Due</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="border border-[#F6F2EB]/15 rounded-lg bg-[#092B2F] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#071F22] border-b border-[#F6F2EB]/10 text-[10px] font-mono uppercase tracking-wider text-[#F6F2EB]/60">
              <tr>
                <th className="py-3 px-4">Booking Ref</th>
                <th className="py-3 px-4">Lead Guest</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Travel Dates</th>
                <th className="py-3 px-4">Pax</th>
                <th className="py-3 px-4">Total (₹)</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F6F2EB]/10">
              {paginatedBookings.map((b) => (
                <tr key={b.id} className="hover:bg-[#0E353A]/60 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-[#C2532A]">
                    {b.bookingCode}
                  </td>
                  <td className="py-3 px-4 font-medium text-[#F6F2EB]">
                    <div>{b.guestName}</div>
                    <div className="text-[10px] text-[#F6F2EB]/50 font-mono">{b.guestPhone}</div>
                  </td>
                  <td className="py-3 px-4 text-[#F6F2EB]/80">{b.destination}</td>
                  <td className="py-3 px-4 font-mono text-[11px] text-[#F6F2EB]/70">
                    {b.startDate}
                  </td>
                  <td className="py-3 px-4 font-mono">{b.paxAdults} A</td>
                  <td className="py-3 px-4 font-mono font-medium text-[#F6F2EB]">
                    {formatInr(b.totalAmount)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-mono uppercase ${
                        b.paymentStatus === "Paid"
                          ? "bg-emerald-950/70 text-emerald-400 border border-emerald-500/30"
                          : b.paymentStatus === "Partial"
                          ? "bg-amber-950/70 text-amber-400 border border-amber-500/30"
                          : "bg-red-950/70 text-red-400 border border-red-500/30"
                      }`}
                    >
                      {b.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-mono uppercase ${
                        b.status === "Confirmed"
                          ? "bg-teal-950/70 text-teal-300 border border-teal-500/30"
                          : b.status === "In Progress"
                          ? "bg-indigo-950/70 text-indigo-300 border border-indigo-500/30"
                          : b.status === "Completed"
                          ? "bg-[#071F22] text-[#F6F2EB]/70 border border-[#F6F2EB]/20"
                          : "bg-red-950/70 text-red-400"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setVoucherModalBooking(b)}
                        title="View & Print E-Ticket Voucher"
                        className="p-1.5 rounded bg-[#071F22] hover:bg-[#16565C] text-[#F6F2EB]/80 hover:text-[#F6F2EB] transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setInvoiceModalBooking(b)}
                        title="View GST Tax Invoice"
                        className="p-1.5 rounded bg-[#071F22] hover:bg-[#16565C] text-[#C2532A] transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(b)}
                        title="Edit Booking & Checklist"
                        className="p-1.5 rounded bg-[#071F22] hover:bg-[#16565C] text-[#F6F2EB]/80 hover:text-[#F6F2EB] transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-3 bg-[#071F22] border-t border-[#F6F2EB]/10 flex items-center justify-between text-xs font-mono text-[#F6F2EB]/60">
          <span>
            Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
            {Math.min(currentPage * rowsPerPage, filteredBookings.length)} of{" "}
            {filteredBookings.length} bookings
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded bg-[#092B2F] hover:bg-[#0E353A] disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1 rounded bg-[#092B2F] hover:bg-[#0E353A] disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide-over Create/Edit Drawer */}
      {slideOverOpen && selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex justify-end">
          <div className="bg-[#092B2F] border-l border-[#F6F2EB]/20 w-full max-w-xl h-full flex flex-col p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-[#F6F2EB]/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#C2532A] uppercase">
                  Booking Editor
                </span>
                <h3 className="font-display text-xl text-[#F6F2EB]">
                  {selectedBooking.bookingCode}
                </h3>
              </div>
              <button onClick={() => setSlideOverOpen(false)}>
                <X className="w-5 h-5 text-[#F6F2EB]/50 hover:text-[#F6F2EB]" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs font-mono flex-1">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#F6F2EB]/70 mb-1">Lead Guest Name</label>
                  <input
                    type="text"
                    required
                    value={selectedBooking.guestName}
                    onChange={(e) =>
                      setSelectedBooking({ ...selectedBooking, guestName: e.target.value })
                    }
                    className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
                  />
                </div>
                <div>
                  <label className="block text-[#F6F2EB]/70 mb-1">Guest Phone</label>
                  <input
                    type="text"
                    required
                    value={selectedBooking.guestPhone}
                    onChange={(e) =>
                      setSelectedBooking({ ...selectedBooking, guestPhone: e.target.value })
                    }
                    className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#F6F2EB]/70 mb-1">Destination</label>
                  <input
                    type="text"
                    required
                    value={selectedBooking.destination}
                    onChange={(e) =>
                      setSelectedBooking({ ...selectedBooking, destination: e.target.value })
                    }
                    className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
                  />
                </div>
                <div>
                  <label className="block text-[#F6F2EB]/70 mb-1">Package Name</label>
                  <input
                    type="text"
                    required
                    value={selectedBooking.packageName}
                    onChange={(e) =>
                      setSelectedBooking({ ...selectedBooking, packageName: e.target.value })
                    }
                    className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#F6F2EB]/70 mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={selectedBooking.startDate}
                    onChange={(e) =>
                      setSelectedBooking({ ...selectedBooking, startDate: e.target.value })
                    }
                    className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
                  />
                </div>
                <div>
                  <label className="block text-[#F6F2EB]/70 mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={selectedBooking.endDate}
                    onChange={(e) =>
                      setSelectedBooking({ ...selectedBooking, endDate: e.target.value })
                    }
                    className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#F6F2EB]/70 mb-1">Status</label>
                  <select
                    value={selectedBooking.status}
                    onChange={(e) =>
                      setSelectedBooking({
                        ...selectedBooking,
                        status: e.target.value as BookingStatus,
                      })
                    }
                    className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#F6F2EB]/70 mb-1">Payment Status</label>
                  <select
                    value={selectedBooking.paymentStatus}
                    onChange={(e) =>
                      setSelectedBooking({
                        ...selectedBooking,
                        paymentStatus: e.target.value as PaymentStatus,
                      })
                    }
                    className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Partial">Partial</option>
                    <option value="Due">Due</option>
                  </select>
                </div>
              </div>

              {/* Document Checklist */}
              <div className="p-3 rounded bg-[#071F22] border border-[#F6F2EB]/15 space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#F6F2EB]/60 block">
                  Document Checklist Verification
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBooking.checklist.passport}
                      onChange={(e) =>
                        setSelectedBooking({
                          ...selectedBooking,
                          checklist: { ...selectedBooking.checklist, passport: e.target.checked },
                        })
                      }
                      className="accent-[#C2532A]"
                    />
                    <span>Passport Verified</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBooking.checklist.visa}
                      onChange={(e) =>
                        setSelectedBooking({
                          ...selectedBooking,
                          checklist: { ...selectedBooking.checklist, visa: e.target.checked },
                        })
                      }
                      className="accent-[#C2532A]"
                    />
                    <span>Visa / Permit Ready</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBooking.checklist.flights}
                      onChange={(e) =>
                        setSelectedBooking({
                          ...selectedBooking,
                          checklist: { ...selectedBooking.checklist, flights: e.target.checked },
                        })
                      }
                      className="accent-[#C2532A]"
                    />
                    <span>Flight PNR Issued</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBooking.checklist.hotelVouchers}
                      onChange={(e) =>
                        setSelectedBooking({
                          ...selectedBooking,
                          checklist: { ...selectedBooking.checklist, hotelVouchers: e.target.checked },
                        })
                      }
                      className="accent-[#C2532A]"
                    />
                    <span>Hotel Vouchers Locked</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#F6F2EB]/10">
                <button
                  type="button"
                  onClick={() => setSlideOverOpen(false)}
                  className="py-2 px-4 border border-[#F6F2EB]/20 rounded text-[#F6F2EB]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-6 bg-[#C2532A] text-white rounded uppercase"
                >
                  Save Booking Updates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official Printable E-Ticket Voucher Modal */}
      {voucherModalBooking && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] text-[#121A1B] rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            {/* Voucher Header */}
            <div className="flex items-start justify-between border-b border-black/15 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#C2532A]">
                  Official Travel Confirmation Voucher
                </span>
                <h2 className="font-display text-2xl font-bold tracking-tight text-[#071F22]">
                  {settings.agencyName}
                </h2>
                <p className="text-xs text-neutral-600 font-sans">
                  IATA No: {settings.iataNumber} • GSTIN: {settings.gstin}
                </p>
              </div>
              <div className="text-right font-mono text-xs">
                <span className="block font-bold text-sm text-[#071F22]">
                  {voucherModalBooking.bookingCode}
                </span>
                <span className="text-neutral-500">Date: {voucherModalBooking.createdAt}</span>
              </div>
            </div>

            {/* Guest & Journey Summary */}
            <div className="grid grid-cols-2 gap-4 bg-neutral-100 p-4 rounded text-xs font-mono">
              <div>
                <span className="text-neutral-500 block">Lead Guest:</span>
                <strong className="text-sm">{voucherModalBooking.guestName}</strong>
                <div>{voucherModalBooking.guestPhone}</div>
              </div>
              <div>
                <span className="text-neutral-500 block">Destination & Dates:</span>
                <strong className="text-sm">{voucherModalBooking.destination}</strong>
                <div>
                  {voucherModalBooking.startDate} to {voucherModalBooking.endDate}
                </div>
              </div>
            </div>

            {/* Inclusions */}
            <div className="space-y-2 text-xs">
              <h4 className="font-mono uppercase font-bold text-neutral-700">
                Confirmed Inclusions:
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-neutral-700">
                <li>Package: {voucherModalBooking.packageName}</li>
                <li>{voucherModalBooking.paxAdults} Adults traveling on private bespoke itinerary</li>
                <li>Private airport meet & greet with designated luxury chauffeur</li>
                <li>5-Star accommodation confirmed on CP/EP basis</li>
                <li>24/7 Dedicated Concierge Support via Voyara Emergency Dispatch</li>
              </ul>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-black/10">
              <button
                onClick={() => setVoucherModalBooking(null)}
                className="py-2 px-4 border border-black/20 text-neutral-700 rounded text-xs font-mono uppercase"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="py-2 px-5 bg-[#071F22] text-white rounded text-xs font-mono uppercase flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Voucher
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Printable GST Tax Invoice Modal */}
      {invoiceModalBooking && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] text-[#121A1B] rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-black/15 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#C2532A]">
                  Tax Invoice (Rule 46 of CGST Rules)
                </span>
                <h2 className="font-display text-2xl font-bold tracking-tight text-[#071F22]">
                  {settings.agencyName}
                </h2>
                <p className="text-xs text-neutral-600 font-sans">
                  SAC Code: 998555 (Tour Operator Services) • GSTIN: {settings.gstin}
                </p>
              </div>
              <div className="text-right font-mono text-xs">
                <span className="block font-bold text-sm text-[#071F22]">
                  {invoiceModalBooking.invoiceNumber}
                </span>
                <span className="text-neutral-500">Booking: {invoiceModalBooking.bookingCode}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-neutral-100 p-4 rounded text-xs font-mono">
              <div>
                <span className="text-neutral-500 block">Billed To:</span>
                <strong className="text-sm">{invoiceModalBooking.guestName}</strong>
                <div>{invoiceModalBooking.guestEmail}</div>
              </div>
              <div>
                <span className="text-neutral-500 block">Place of Supply:</span>
                <strong>State: New Delhi (Code 07)</strong>
                <div>SAC: 998555</div>
              </div>
            </div>

            {/* Calculations Table */}
            <div className="border border-black/10 rounded overflow-hidden text-xs font-mono">
              <div className="bg-neutral-200 p-2 flex justify-between font-bold">
                <span>Description</span>
                <span>Amount (₹)</span>
              </div>
              <div className="p-3 space-y-2">
                <div className="flex justify-between">
                  <span>Tour Package Net Cost ({invoiceModalBooking.destination})</span>
                  <span>{formatInr(Math.round(invoiceModalBooking.totalAmount / 1.05))}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>CGST @ 2.5%</span>
                  <span>{formatInr(Math.round((invoiceModalBooking.totalAmount * 0.05) / 2))}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>SGST @ 2.5%</span>
                  <span>{formatInr(Math.round((invoiceModalBooking.totalAmount * 0.05) / 2))}</span>
                </div>
                <div className="flex justify-between font-bold border-t border-black/10 pt-2 text-sm text-[#071F22]">
                  <span>Total Payable (Incl. 5% GST)</span>
                  <span>{formatInr(invoiceModalBooking.totalAmount)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-black/10">
              <button
                onClick={() => setInvoiceModalBooking(null)}
                className="py-2 px-4 border border-black/20 text-neutral-700 rounded text-xs font-mono uppercase"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="py-2 px-5 bg-[#071F22] text-white rounded text-xs font-mono uppercase flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                Print GST Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
