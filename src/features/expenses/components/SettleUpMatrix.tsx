"use client";

import React, { useState } from "react";
import { Scale, ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExpenseStore } from "../store/useExpenseStore";
import { useGroupStore } from "@/features/group/store/useGroupStore";
import { calculateSettlements } from "../utils/settleAlgorithm";
import { CurrencyCode } from "../types";

export function SettleUpMatrix() {
  const { expenses, baseCurrency, settledDebtIds, markDebtSettled } =
    useExpenseStore();
  const { members } = useGroupStore();
  const [activeModalDebt, setActiveModalDebt] = useState<any | null>(null);

  const memberRefs = members.map((m) => ({
    id: m.id,
    name: m.name,
    avatar: m.avatar,
  }));

  const { balances, settlements } = calculateSettlements(
    expenses,
    memberRefs,
    baseCurrency
  );

  const currencySymbols: Record<CurrencyCode, string> = {
    INR: "₹",
    CHF: "CHF ",
    USD: "$",
    EUR: "€",
    AED: "AED ",
  };

  const symbol = currencySymbols[baseCurrency];

  const handleSettle = (id: string) => {
    markDebtSettled(id);
    setActiveModalDebt(null);
  };

  return (
    <div className="bg-[#0B1317]/90 border border-white/10 p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-none bg-gold/15 border border-gold/30 text-[9px] font-mono uppercase text-gold-soft mb-1">
            <Scale className="w-3 h-3 text-gold" />
            Mathematical Debt Minimizer
          </div>
          <h3 className="font-display text-2xl font-light text-ivory">
            Autonomous Settle-Up Engine
          </h3>
          <p className="text-muted text-xs font-light mt-0.5">
            O(N log N) greedy debt matching compresses multi-party group debts into the absolute minimum number of settlement payments.
          </p>
        </div>
      </div>

      {/* Net Balances Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {balances.map((b) => {
          const isCreditor = b.netBalance > 0;
          const isDebtor = b.netBalance < 0;

          return (
            <div
              key={b.memberId}
              className="p-3.5 bg-surface border border-white/5 space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-[10px] font-mono font-bold text-gold">
                  {b.avatar}
                </div>
                <span className="text-xs font-medium text-ivory truncate">
                  {b.memberName}
                </span>
              </div>

              <div className="pt-1 flex items-baseline justify-between">
                <span className="text-[10px] font-mono text-muted uppercase">
                  {isCreditor ? "Gets Back" : isDebtor ? "Owes" : "Settled"}
                </span>
                <span
                  className={`font-mono text-sm font-semibold tabular-nums ${
                    isCreditor
                      ? "text-emerald-400"
                      : isDebtor
                      ? "text-terracotta"
                      : "text-muted"
                  }`}
                >
                  {isCreditor ? "+" : isDebtor ? "-" : ""}
                  {symbol}
                  {Math.abs(Math.round(b.netBalance)).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Optimized Settlement Payments */}
      <div className="space-y-3 pt-2">
        <span className="text-[10px] font-mono uppercase text-muted tracking-widest block">
          Minimal Settlement Transfers ({settlements.length} Required):
        </span>

        {settlements.length === 0 ? (
          <div className="p-6 bg-surface border border-white/5 text-center text-xs text-muted font-light">
            All party balances are completely settled.
          </div>
        ) : (
          settlements.map((settlement) => {
            const isSettled = settledDebtIds.includes(settlement.id);

            return (
              <div
                key={settlement.id}
                className={`p-4 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                  isSettled
                    ? "bg-emerald-950/20 border-emerald-500/30 opacity-70"
                    : "bg-surface-elevated border-gold/30 hover:border-gold"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-ivory">
                    {settlement.fromName}
                  </span>
                  <div className="flex items-center gap-1.5 text-gold-soft font-mono text-xs">
                    <span>pays</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold" />
                  </div>
                  <span className="text-sm font-medium text-ivory">
                    {settlement.toName}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="font-mono text-base font-bold text-gold tabular-nums">
                      {symbol}
                      {settlement.amount.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[9px] font-mono text-muted block uppercase">
                      Exact Net Equivalence
                    </span>
                  </div>

                  {isSettled ? (
                    <span className="px-3 py-1.5 text-xs font-mono bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Settled
                    </span>
                  ) : (
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={() => handleSettle(settlement.id)}
                      className="font-mono text-xs flex-shrink-0"
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      Settle via Vault
                    </Button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
