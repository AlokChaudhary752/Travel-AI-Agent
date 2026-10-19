"use client";

import React from "react";
import { CreditCard, DollarSign, PieChart, ArrowUpRight, Globe } from "lucide-react";
import { useExpenseStore } from "../store/useExpenseStore";
import { convertCurrency } from "../utils/settleAlgorithm";
import { CurrencyCode } from "../types";

export function BudgetOverviewCards() {
  const { expenses, baseCurrency, setBaseCurrency, totalBudgetAllocationINR } =
    useExpenseStore();

  // Calculate total disbursed in active currency
  const totalDisbursedActive = expenses.reduce((acc, exp) => {
    return acc + convertCurrency(exp.amount, exp.currency, baseCurrency);
  }, 0);

  const totalAllocationActive = convertCurrency(
    totalBudgetAllocationINR,
    "INR",
    baseCurrency
  );

  const remainingBalanceActive = Math.max(
    0,
    totalAllocationActive - totalDisbursedActive
  );

  const burnRatePercentage = Math.min(
    100,
    Math.round((totalDisbursedActive / totalAllocationActive) * 100)
  );

  const currencySymbols: Record<CurrencyCode, string> = {
    INR: "₹",
    CHF: "CHF ",
    USD: "$",
    EUR: "€",
    AED: "AED ",
  };

  const symbol = currencySymbols[baseCurrency];

  const currencies: CurrencyCode[] = ["INR", "CHF", "USD", "EUR"];

  return (
    <div className="space-y-4">
      {/* Currency Switcher Bar */}
      <div className="flex items-center justify-between pb-2">
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted flex items-center gap-1.5">
          <Globe className="w-3 h-3 text-gold" />
          Active Ledger Currency:
        </span>

        <div className="flex items-center gap-1 bg-surface-elevated border border-white/10 p-1">
          {currencies.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setBaseCurrency(c)}
              className={`px-2.5 py-1 text-[10px] font-mono transition-all ${
                baseCurrency === c
                  ? "bg-gold text-bg font-bold"
                  : "text-muted hover:text-ivory"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Budget */}
        <div className="p-5 bg-[#0B1317]/90 border border-white/10 space-y-1">
          <span className="text-[10px] font-mono uppercase text-muted tracking-widest block">
            Total Voyage Allocation
          </span>
          <div className="font-display text-3xl font-light text-ivory tabular-nums">
            {symbol}
            {Math.round(totalAllocationActive).toLocaleString("en-IN")}
          </div>
          <span className="text-[10px] text-gold-soft font-mono">
            Bespoke Winter Reserve
          </span>
        </div>

        {/* Total Disbursed */}
        <div className="p-5 bg-[#0B1317]/90 border border-gold/40 shadow-gold-subtle space-y-1 relative overflow-hidden">
          <span className="text-[10px] font-mono uppercase text-muted tracking-widest block">
            Disbursed to Date
          </span>
          <div className="font-display text-3xl font-light text-gold tabular-nums">
            {symbol}
            {Math.round(totalDisbursedActive).toLocaleString("en-IN")}
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400">
            <span>{burnRatePercentage}% of Reserve Disbursed</span>
          </div>

          {/* Mini progress bar */}
          <div className="w-full h-1 bg-white/10 mt-2 overflow-hidden">
            <div
              className="h-full bg-gold transition-all duration-500"
              style={{ width: `${burnRatePercentage}%` }}
            />
          </div>
        </div>

        {/* Remaining Reserve */}
        <div className="p-5 bg-[#0B1317]/90 border border-white/10 space-y-1">
          <span className="text-[10px] font-mono uppercase text-muted tracking-widest block">
            Available Remaining Liquidity
          </span>
          <div className="font-display text-3xl font-light text-ivory tabular-nums">
            {symbol}
            {Math.round(remainingBalanceActive).toLocaleString("en-IN")}
          </div>
          <span className="text-[10px] text-muted font-mono">
            Guaranteed Tarmac & Hospitality Backing
          </span>
        </div>
      </div>
    </div>
  );
}
