"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Plus,
  Trash2,
  Filter,
  DollarSign,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExpenseStore } from "../store/useExpenseStore";
import { useGroupStore } from "@/features/group/store/useGroupStore";
import { convertCurrency } from "../utils/settleAlgorithm";
import { ExpenseCategory, CurrencyCode } from "../types";

interface ExpenseTableProps {
  onOpenLogModal: () => void;
}

export function ExpenseTable({ onOpenLogModal }: ExpenseTableProps) {
  const { expenses, baseCurrency, deleteExpense } = useExpenseStore();
  const { members } = useGroupStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const currencySymbols: Record<CurrencyCode, string> = {
    INR: "₹",
    CHF: "CHF ",
    USD: "$",
    EUR: "€",
    AED: "AED ",
  };

  const symbol = currencySymbols[baseCurrency];

  const getMemberName = (id: string) => {
    const m = members.find((mem) => mem.id === id);
    return m ? m.name : "Member";
  };

  const getMemberAvatar = (id: string) => {
    const m = members.find((mem) => mem.id === id);
    return m ? m.avatar : "VP";
  };

  const categories = [
    "all",
    "Aviation",
    "Sanctuary",
    "Michelin Dining",
    "Alpine Transit",
    "Experiences",
  ];

  const filteredExpenses =
    selectedCategory === "all"
      ? expenses
      : expenses.filter((e) => e.category === selectedCategory);

  const handleExportCSV = () => {
    const headers = "Title,Category,Amount,Currency,PaidBy,Date\n";
    const rows = expenses
      .map(
        (e) =>
          `"${e.title}","${e.category}",${e.amount},${e.currency},"${getMemberName(
            e.paidById
          )}","${e.date}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "voyara-expense-dossier.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#0B1317]/90 border border-white/10 p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-none bg-gold/15 border border-gold/30 text-[9px] font-mono uppercase text-gold-soft mb-1">
            <CreditCard className="w-3 h-3 text-gold" />
            Vault Transaction Ledger
          </div>
          <h3 className="font-display text-2xl font-light text-ivory">
            Itemized Expenditures & Audit Trail
          </h3>
          <p className="text-muted text-xs font-light mt-0.5">
            Transparent breakdown with multi-currency conversion locked at booking timestamp.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleExportCSV}
            className="font-mono text-xs"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Export Dossier
          </Button>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onOpenLogModal}
            className="font-mono text-xs"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Record Disbursement
          </Button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 text-[11px] font-mono uppercase transition-all ${
              selectedCategory === cat
                ? "bg-gold text-bg font-bold"
                : "bg-surface text-muted hover:text-ivory border border-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Table / List */}
      <div className="space-y-3">
        {filteredExpenses.map((exp) => {
          const convertedAmount = Math.round(
            convertCurrency(exp.amount, exp.currency, baseCurrency)
          );

          return (
            <div
              key={exp.id}
              className="p-4 bg-surface border border-white/5 hover:border-gold/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-display text-base text-ivory font-medium">
                    {exp.title}
                  </span>
                  <span className="text-[9px] font-mono uppercase text-gold-soft px-1.5 py-0.2 bg-gold/10 border border-gold/20">
                    {exp.category}
                  </span>
                </div>

                <div className="text-xs text-muted font-mono flex flex-wrap items-center gap-2">
                  <span>Paid by {getMemberName(exp.paidById)}</span>
                  <span>•</span>
                  <span>{exp.date}</span>
                  {exp.notes && (
                    <>
                      <span>•</span>
                      <span className="text-muted/80">{exp.notes}</span>
                    </>
                  )}
                </div>

                {/* Split Avatars */}
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-[9px] font-mono text-muted uppercase mr-1">
                    Split among {exp.splitBetweenIds.length}:
                  </span>
                  {exp.splitBetweenIds.map((memId) => (
                    <div
                      key={memId}
                      title={getMemberName(memId)}
                      className="w-4 h-4 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[8px] font-mono text-ivory font-bold"
                    >
                      {getMemberAvatar(memId)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing & Delete */}
              <div className="flex items-center gap-4 self-end sm:self-center">
                <div className="text-right">
                  <span className="font-mono text-base font-bold text-gold tabular-nums block">
                    {symbol}
                    {convertedAmount.toLocaleString("en-IN")}
                  </span>
                  {exp.currency !== baseCurrency && (
                    <span className="text-[10px] font-mono text-muted block">
                      Original: {currencySymbols[exp.currency]}
                      {exp.amount.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => deleteExpense(exp.id)}
                  className="p-1.5 text-muted hover:text-terracotta transition-colors"
                  title="Remove record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
