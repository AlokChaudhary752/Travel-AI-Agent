"use client";

import React, { useState } from "react";
import { Plus, X, DollarSign, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExpenseStore } from "../store/useExpenseStore";
import { useGroupStore } from "@/features/group/store/useGroupStore";
import { ExpenseCategory, CurrencyCode } from "../types";

interface LogExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LogExpenseModal({ isOpen, onClose }: LogExpenseModalProps) {
  const { addExpense, baseCurrency } = useExpenseStore();
  const { members } = useGroupStore();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("Michelin Dining");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<CurrencyCode>(baseCurrency);
  const [paidById, setPaidById] = useState(members[0]?.id || "usr-1");
  const [splitBetweenIds, setSplitBetweenIds] = useState<string[]>(
    members.map((m) => m.id)
  );
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleToggleMember = (id: string) => {
    if (splitBetweenIds.includes(id)) {
      if (splitBetweenIds.length > 1) {
        setSplitBetweenIds(splitBetweenIds.filter((mId) => mId !== id));
      }
    } else {
      setSplitBetweenIds([...splitBetweenIds, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!title.trim() || isNaN(parsedAmount) || parsedAmount <= 0) return;

    addExpense({
      title,
      category,
      amount: parsedAmount,
      currency,
      paidById,
      splitBetweenIds,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      notes: notes.trim() || undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-bg/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0B1317] border border-gold/40 max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-muted hover:text-ivory"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-gold-soft">
            Vault Ledger Entry
          </span>
          <h3 className="font-display text-2xl text-ivory font-light mt-0.5">
            Record Vault Disbursement
          </h3>
          <p className="text-muted text-xs font-light mt-1">
            Log hotel deposits, charter flight tabs, or alpine dining bills.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-mono uppercase text-muted block mb-1">
              Expenditure Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Chesa Veglia Private Wine Cellar Dinner"
              className="w-full bg-surface border border-white/10 px-3 py-2 text-xs text-ivory focus:border-gold outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-mono uppercase text-muted block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                className="w-full bg-surface border border-white/10 px-2 py-2 text-xs text-ivory focus:border-gold outline-none font-mono"
              >
                <option value="Aviation">Aviation</option>
                <option value="Sanctuary">Sanctuary</option>
                <option value="Michelin Dining">Michelin Dining</option>
                <option value="Alpine Transit">Alpine Transit</option>
                <option value="Experiences">Experiences</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-muted block mb-1">
                Paid By
              </label>
              <select
                value={paidById}
                onChange={(e) => setPaidById(e.target.value)}
                className="w-full bg-surface border border-white/10 px-2 py-2 text-xs text-ivory focus:border-gold outline-none font-mono"
              >
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="text-[10px] font-mono uppercase text-muted block mb-1">
                Amount
              </label>
              <input
                type="number"
                required
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-surface border border-white/10 px-3 py-2 text-xs font-mono text-ivory focus:border-gold outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-muted block mb-1">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="w-full bg-surface border border-white/10 px-2 py-2 text-xs text-ivory focus:border-gold outline-none font-mono"
              >
                <option value="INR">INR (₹)</option>
                <option value="CHF">CHF</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="AED">AED</option>
              </select>
            </div>
          </div>

          {/* Split Between Members */}
          <div className="space-y-1.5 pt-1">
            <label className="text-[10px] font-mono uppercase text-muted block">
              Split Cost Between:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {members.map((m) => {
                const isSelected = splitBetweenIds.includes(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleToggleMember(m.id)}
                    className={`p-2 border text-left flex items-center justify-between text-xs transition-all ${
                      isSelected
                        ? "bg-surface-elevated border-gold/40 text-ivory"
                        : "bg-surface border-white/5 text-muted hover:text-ivory"
                    }`}
                  >
                    <span className="truncate">{m.name}</span>
                    <span
                      className={`text-[9px] font-mono px-1 py-0.2 ${
                        isSelected
                          ? "bg-gold text-bg font-bold"
                          : "bg-white/5 text-muted"
                      }`}
                    >
                      {isSelected ? "Included" : "Excluded"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase text-muted block mb-1">
              Notes / Receipt Reference (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Master suite upgrade with champagne reception"
              className="w-full bg-surface border border-white/10 px-3 py-2 text-xs text-ivory focus:border-gold outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Commit to Ledger
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
