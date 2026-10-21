"use client";

import React, { useState, useMemo } from "react";
import {
  Receipt,
  Search,
  Filter,
  Printer,
  CheckCircle2,
  Clock,
  AlertCircle,
  IndianRupee,
  Calendar,
  X,
  CreditCard,
  Plus,
} from "lucide-react";
import { useAgencyStore, formatInr } from "@/lib/store";
import { Invoice, PaymentStatus } from "@/types/travel";

export default function PaymentsInvoicingPage() {
  const { invoices, recordPayment, settings } = useAgencyStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [agingFilter, setAgingFilter] = useState<string>("All");

  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [paymentModalInvoice, setPaymentModalInvoice] = useState<Invoice | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);

  // Aging Summary Calculation
  const agingTotals = useMemo(() => {
    const buckets = { "0-15d": 0, "16-30d": 0, "31-60d": 0, "60d+": 0 };
    invoices.forEach((inv) => {
      if (inv.balanceDue > 0 && buckets[inv.agingBucket] !== undefined) {
        buckets[inv.agingBucket] += inv.balanceDue;
      }
    });
    return buckets;
  }, [invoices]);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((i) => {
      const matchSearch =
        i.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.destination.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === "All" || i.status === statusFilter;
      const matchAging = agingFilter === "All" || i.agingBucket === agingFilter;
      return matchSearch && matchStatus && matchAging;
    });
  }, [invoices, searchQuery, statusFilter, agingFilter]);

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentModalInvoice && paymentAmount > 0) {
      recordPayment(paymentModalInvoice.id, paymentAmount);
      setPaymentModalInvoice(null);
      setPaymentAmount(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F6F2EB]/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl sm:text-3xl font-light text-[#F6F2EB]">
              Invoicing & GST Receivables
            </h1>
            <span className="px-2 py-0.5 rounded bg-[#C2532A]/20 text-[#C2532A] border border-[#C2532A]/40 text-xs font-mono">
              SAC 998555 Compliant (5% GST)
            </span>
          </div>
          <p className="text-xs text-[#F6F2EB]/60 font-sans mt-0.5">
            Automated CGST/SGST splitting, milestone schedules, payment aging analysis, and printable tax receipts.
          </p>
        </div>
      </div>

      {/* Aging Analysis Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-[#092B2F] border border-[#F6F2EB]/10 space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#F6F2EB]/50 block">0 - 15 Days Current</span>
          <div className="font-display text-xl text-emerald-400 tabular-nums">
            {formatInr(agingTotals["0-15d"])}
          </div>
          <span className="text-[11px] font-mono text-[#F6F2EB]/40">Active departures</span>
        </div>

        <div className="p-4 rounded-lg bg-[#092B2F] border border-[#F6F2EB]/10 space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#F6F2EB]/50 block">16 - 30 Days Aging</span>
          <div className="font-display text-xl text-amber-300 tabular-nums">
            {formatInr(agingTotals["16-30d"])}
          </div>
          <span className="text-[11px] font-mono text-[#F6F2EB]/40">Reminder due</span>
        </div>

        <div className="p-4 rounded-lg bg-[#092B2F] border border-[#F6F2EB]/10 space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#F6F2EB]/50 block">31 - 60 Days Overdue</span>
          <div className="font-display text-xl text-[#C2532A] tabular-nums">
            {formatInr(agingTotals["31-60d"])}
          </div>
          <span className="text-[11px] font-mono text-[#F6F2EB]/40">Escalated collection</span>
        </div>

        <div className="p-4 rounded-lg bg-[#092B2F] border border-red-500/30 space-y-1">
          <span className="text-[10px] font-mono uppercase text-red-400 block">60+ Days Critical</span>
          <div className="font-display text-xl text-red-400 tabular-nums">
            {formatInr(agingTotals["60d+"])}
          </div>
          <span className="text-[11px] font-mono text-[#F6F2EB]/40">Accounts follow-up</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#F6F2EB]/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by invoice number (INV-...), guest name, destination..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#092B2F] border border-[#F6F2EB]/15 rounded pl-9 pr-3 py-2 text-xs text-[#F6F2EB] focus:outline-none focus:border-[#C2532A]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#092B2F] border border-[#F6F2EB]/15 rounded px-3 py-2 text-xs font-mono text-[#F6F2EB] focus:outline-none focus:border-[#C2532A]"
          >
            <option value="All">Payment: All</option>
            <option value="Paid">Paid</option>
            <option value="Partial">Partial</option>
            <option value="Due">Due</option>
          </select>

          <select
            value={agingFilter}
            onChange={(e) => setAgingFilter(e.target.value)}
            className="bg-[#092B2F] border border-[#F6F2EB]/15 rounded px-3 py-2 text-xs font-mono text-[#F6F2EB] focus:outline-none focus:border-[#C2532A]"
          >
            <option value="All">Aging: All</option>
            <option value="0-15d">0-15d</option>
            <option value="16-30d">16-30d</option>
            <option value="31-60d">31-60d</option>
            <option value="60d+">60d+</option>
          </select>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="border border-[#F6F2EB]/15 rounded-lg bg-[#092B2F] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#071F22] border-b border-[#F6F2EB]/10 text-[10px] font-mono uppercase tracking-wider text-[#F6F2EB]/60">
              <tr>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Tax Base (₹)</th>
                <th className="py-3 px-4">CGST + SGST (5%)</th>
                <th className="py-3 px-4">Total (₹)</th>
                <th className="py-3 px-4">Paid (₹)</th>
                <th className="py-3 px-4">Balance Due</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F6F2EB]/10">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#0E353A]/60 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-[#C2532A]">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-3 px-4 font-medium text-[#F6F2EB]">
                    <div>{inv.clientName}</div>
                    <div className="text-[10px] text-[#F6F2EB]/50 font-mono">{inv.destination}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-[#F6F2EB]/70">
                    {formatInr(inv.subtotal)}
                  </td>
                  <td className="py-3 px-4 font-mono text-[#F6F2EB]/60">
                    {formatInr(inv.cgst + inv.sgst + inv.igst)}
                  </td>
                  <td className="py-3 px-4 font-mono font-medium text-[#F6F2EB]">
                    {formatInr(inv.totalWithTax)}
                  </td>
                  <td className="py-3 px-4 font-mono text-emerald-400">
                    {formatInr(inv.amountPaid)}
                  </td>
                  <td className="py-3 px-4 font-mono text-amber-300">
                    {formatInr(inv.balanceDue)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-mono uppercase ${
                        inv.status === "Paid"
                          ? "bg-emerald-950/70 text-emerald-400 border border-emerald-500/30"
                          : inv.status === "Partial"
                          ? "bg-amber-950/70 text-amber-400 border border-amber-500/30"
                          : "bg-red-950/70 text-red-400 border border-red-500/30"
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {inv.balanceDue > 0 && (
                        <button
                          onClick={() => {
                            setPaymentModalInvoice(inv);
                            setPaymentAmount(inv.balanceDue);
                          }}
                          className="px-2 py-1 rounded bg-[#071F22] hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono flex items-center gap-1"
                        >
                          <CreditCard className="w-3 h-3" />
                          Record Pay
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        title="Print GST Invoice"
                        className="p-1.5 rounded bg-[#071F22] hover:bg-[#16565C] text-[#F6F2EB]/80"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {paymentModalInvoice && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#092B2F] border border-[#F6F2EB]/20 rounded-lg p-6 max-w-md w-full space-y-4">
            <h3 className="font-display text-xl text-[#F6F2EB]">Record Client Payment</h3>
            <p className="text-xs text-[#F6F2EB]/70">
              Apply partial or full settlement to invoice{" "}
              <strong>{paymentModalInvoice.invoiceNumber}</strong>.
            </p>

            <form onSubmit={handleRecordPayment} className="space-y-4 text-xs font-mono">
              <div className="p-3 rounded bg-[#071F22] space-y-1">
                <div>Client: {paymentModalInvoice.clientName}</div>
                <div>Total Invoice: {formatInr(paymentModalInvoice.totalWithTax)}</div>
                <div>Outstanding Balance: {formatInr(paymentModalInvoice.balanceDue)}</div>
              </div>

              <div>
                <label className="block text-[#F6F2EB]/70 mb-1">Payment Amount Received (₹)</label>
                <input
                  type="number"
                  required
                  max={paymentModalInvoice.balanceDue}
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPaymentModalInvoice(null)}
                  className="py-2 px-4 border border-[#F6F2EB]/20 rounded text-[#F6F2EB] uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded uppercase"
                >
                  Record Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable GST Invoice View Modal */}
      {selectedInvoice && (
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
                  SAC: 998555 • GSTIN: {settings.gstin} • IATA: {settings.iataNumber}
                </p>
              </div>
              <div className="text-right font-mono text-xs">
                <span className="block font-bold text-sm text-[#071F22]">
                  {selectedInvoice.invoiceNumber}
                </span>
                <span className="text-neutral-500">Date: {selectedInvoice.issueDate}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-neutral-100 p-4 rounded text-xs font-mono">
              <div>
                <span className="text-neutral-500 block">Billed To:</span>
                <strong className="text-sm">{selectedInvoice.clientName}</strong>
                <div>{selectedInvoice.clientEmail}</div>
              </div>
              <div>
                <span className="text-neutral-500 block">Bank Details for RTGS/NEFT:</span>
                <div>Account: {settings.bankDetails.accountNumber}</div>
                <div>IFSC: {settings.bankDetails.ifsc}</div>
                <div>UPI: {settings.bankDetails.upiId}</div>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="border border-black/10 rounded overflow-hidden text-xs font-mono">
              <div className="bg-neutral-200 p-2 flex justify-between font-bold">
                <span>Particulars</span>
                <span>Amount (₹)</span>
              </div>
              <div className="p-3 space-y-2">
                <div className="flex justify-between">
                  <span>Tour Package Net Cost ({selectedInvoice.destination})</span>
                  <span>{formatInr(selectedInvoice.subtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>CGST @ 2.5%</span>
                  <span>{formatInr(selectedInvoice.cgst)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>SGST @ 2.5%</span>
                  <span>{formatInr(selectedInvoice.sgst)}</span>
                </div>
                <div className="flex justify-between font-bold border-t border-black/10 pt-2 text-sm text-[#071F22]">
                  <span>Total Invoice Amount (5% GST Incl.)</span>
                  <span>{formatInr(selectedInvoice.totalWithTax)}</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Amount Paid to Date</span>
                  <span>{formatInr(selectedInvoice.amountPaid)}</span>
                </div>
                <div className="flex justify-between font-bold text-amber-800 border-t border-black/5 pt-1">
                  <span>Net Balance Due</span>
                  <span>{formatInr(selectedInvoice.balanceDue)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-black/10">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="py-2 px-4 border border-black/20 text-neutral-700 rounded text-xs font-mono uppercase"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="py-2 px-5 bg-[#071F22] text-white rounded text-xs font-mono uppercase flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Invoice Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
