"use client";

import React, { useState } from "react";
import { CreditCard, Plus, DollarSign, Scale, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BudgetOverviewCards } from "@/features/expenses/components/BudgetOverviewCards";
import { SettleUpMatrix } from "@/features/expenses/components/SettleUpMatrix";
import { ExpenseTable } from "@/features/expenses/components/ExpenseTable";
import { LogExpenseModal } from "@/features/expenses/components/LogExpenseModal";

export default function ExpensesPage() {
  const [logModalOpen, setLogModalOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-none bg-gold/15 border border-gold/30 text-[10px] font-mono uppercase text-gold-soft mb-2">
            <CreditCard className="w-3 h-3 text-gold" />
            Signature Feature 03 • Autonomous Vault Ledger
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-light text-ivory">
            Expenses, Multi-Currency Ledger & Settle-Up
          </h1>
          <p className="text-muted text-xs font-light mt-1.5 max-w-2xl leading-relaxed">
            Multi-currency ledger across INR, CHF, USD, and EUR with live burn rate telemetry,
            itemized audit trails, and O(N log N) mathematical debt minimization for seamless group settlement.
          </p>
        </div>

        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={() => setLogModalOpen(true)}
          className="font-mono text-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Record Disbursement
        </Button>
      </div>

      {/* Budget Summary Cards & Multi-Currency Switcher */}
      <BudgetOverviewCards />

      {/* Settle Up Matrix */}
      <SettleUpMatrix />

      {/* Itemized Transactions Table */}
      <ExpenseTable onOpenLogModal={() => setLogModalOpen(true)} />

      {/* Modal */}
      <LogExpenseModal
        isOpen={logModalOpen}
        onClose={() => setLogModalOpen(false)}
      />
    </div>
  );
}
