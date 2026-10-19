import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ExpenseItem, CurrencyCode } from "../types";

interface ExpenseState {
  baseCurrency: CurrencyCode;
  totalBudgetAllocationINR: number;
  expenses: ExpenseItem[];
  settledDebtIds: string[];

  // Actions
  setBaseCurrency: (curr: CurrencyCode) => void;
  addExpense: (expense: Omit<ExpenseItem, "id">) => void;
  deleteExpense: (id: string) => void;
  markDebtSettled: (settlementId: string) => void;
}

const INITIAL_EXPENSES: ExpenseItem[] = [
  {
    id: "exp-1",
    title: "Swiss Private Jet Charter (BOM ➔ ZRH)",
    category: "Aviation",
    amount: 1850000,
    currency: "INR",
    paidById: "usr-1", // Lord Vance
    splitBetweenIds: ["usr-1", "usr-2", "usr-3", "usr-4"],
    date: "Oct 12, 2026",
    notes: "Direct VIP tarmac transfer & Lie-flat cabin",
  },
  {
    id: "exp-2",
    title: "Badrutt's Palace Grand Alpine Suite Advance",
    category: "Sanctuary",
    amount: 9250,
    currency: "CHF",
    paidById: "usr-1", // Lord Vance
    splitBetweenIds: ["usr-1", "usr-2"],
    date: "Oct 14, 2026",
    notes: "3 nights panoramic lake view with private butler",
  },
  {
    id: "exp-3",
    title: "Alpine Helicopter Glacier Heli-Transfer",
    category: "Alpine Transit",
    amount: 3400,
    currency: "CHF",
    paidById: "usr-3", // Ananya Mehta
    splitBetweenIds: ["usr-1", "usr-2", "usr-3", "usr-4"],
    date: "Oct 15, 2026",
    notes: "Zurich to St. Moritz Engadin Airport direct link",
  },
  {
    id: "exp-4",
    title: "Da Vittorio St. Moritz (Private Dining Room)",
    category: "Michelin Dining",
    amount: 1950,
    currency: "CHF",
    paidById: "usr-4", // Vikram Singhania
    splitBetweenIds: ["usr-1", "usr-2", "usr-3", "usr-4"],
    date: "Oct 16, 2026",
    notes: "2-Star Michelin tasting with bespoke Jain wine pairing",
  },
  {
    id: "exp-5",
    title: "Diavolezza Glacier Guide & Private Ski Vaults",
    category: "Experiences",
    amount: 1200,
    currency: "CHF",
    paidById: "usr-1", // Lord Vance
    splitBetweenIds: ["usr-1", "usr-2", "usr-3", "usr-4"],
    date: "Oct 17, 2026",
    notes: "Certified UIAGM private mountain guide",
  },
];

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set, get) => ({
      baseCurrency: "INR",
      totalBudgetAllocationINR: 5000000, // ₹50 Lakhs
      expenses: INITIAL_EXPENSES,
      settledDebtIds: [],

      setBaseCurrency: (curr: CurrencyCode) => {
        set({ baseCurrency: curr });
      },

      addExpense: (expenseData) => {
        const newExpense: ExpenseItem = {
          ...expenseData,
          id: `exp-${Date.now()}`,
        };
        set({ expenses: [newExpense, ...get().expenses] });
      },

      deleteExpense: (id: string) => {
        set({
          expenses: get().expenses.filter((e) => e.id !== id),
        });
      },

      markDebtSettled: (settlementId: string) => {
        set({
          settledDebtIds: [...get().settledDebtIds, settlementId],
        });
      },
    }),
    {
      name: "voyara-expense-state",
    }
  )
);
