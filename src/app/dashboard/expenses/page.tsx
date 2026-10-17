"use client";

import React from "react";
import { CreditCard, DollarSign, TrendingUp, Plus, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExpensesPage() {
  const expenses = [
    { title: "Swiss Private Jet Charter (BOM ➔ ZRH)", category: "Aviation", amount: "$18,500", paidBy: "Lord Vance", date: "Oct 12" },
    { title: "Badrutt's Palace Suite Advance", category: "Sanctuary", amount: "$9,250", paidBy: "Lord Vance", date: "Oct 14" },
    { title: "Alpine Helicopter Glacier Transfer", category: "Transit", amount: "$3,400", paidBy: "Ananya Mehta", date: "Oct 15" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-soft block mb-1">
            Financial Ledger
          </span>
          <h1 className="font-display text-3xl font-light text-ivory">
            Expenses & Split Ledger
          </h1>
          <p className="text-muted text-xs font-light mt-1">
            Multi-currency tracking, automatic party settling, and live burn rate analytics.
          </p>
        </div>

        <Button variant="primary" size="md">
          <Plus className="w-4 h-4 mr-1.5" />
          Log Expenditure
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-surface-elevated border border-white/10 space-y-1">
          <span className="text-[10px] font-mono uppercase text-muted tracking-widest block">Total Budget Allocation</span>
          <div className="font-display text-3xl font-light text-ivory tabular-nums">$50,000</div>
          <span className="text-[10px] text-gold-soft font-mono">Bespoke Winter Reserve</span>
        </div>

        <div className="p-5 bg-surface-elevated border border-gold/30 space-y-1">
          <span className="text-[10px] font-mono uppercase text-muted tracking-widest block">Disbursed to Date</span>
          <div className="font-display text-3xl font-light text-gold tabular-nums">$31,150</div>
          <span className="text-[10px] text-emerald-400 font-mono">62% of Allocation</span>
        </div>

        <div className="p-5 bg-surface-elevated border border-white/10 space-y-1">
          <span className="text-[10px] font-mono uppercase text-muted tracking-widest block">Remaining Balance</span>
          <div className="font-display text-3xl font-light text-ivory tabular-nums">$18,850</div>
          <span className="text-[10px] text-muted font-mono">Guaranteed Available</span>
        </div>
      </div>

      {/* Transactions List */}
      <div className="p-6 bg-surface-elevated border border-white/10 space-y-4">
        <h3 className="text-xs uppercase font-mono tracking-widest text-gold-soft">
          Recent Vaulted Disbursements
        </h3>

        <div className="space-y-2 text-xs">
          {expenses.map((exp, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-surface border border-white/5 flex items-center justify-between hover:border-gold/30 transition-colors"
            >
              <div>
                <span className="text-ivory font-medium block">{exp.title}</span>
                <span className="text-[10px] text-muted font-mono">
                  {exp.category} • Paid by {exp.paidBy} on {exp.date}
                </span>
              </div>
              <span className="font-mono text-sm font-bold text-gold tabular-nums">
                {exp.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
