export type CurrencyCode = "INR" | "CHF" | "USD" | "EUR" | "AED";

export type ExpenseCategory =
  | "Aviation"
  | "Sanctuary"
  | "Michelin Dining"
  | "Alpine Transit"
  | "Experiences";

export interface ExpenseItem {
  id: string;
  title: string;
  category: ExpenseCategory;
  amount: number;
  currency: CurrencyCode;
  paidById: string;
  splitBetweenIds: string[];
  date: string;
  notes?: string;
}

export interface MemberBalance {
  memberId: string;
  memberName: string;
  avatar: string;
  totalPaid: number;
  totalOwed: number;
  netBalance: number; // positive = should receive, negative = owes
}

export interface SettlementDebt {
  id: string;
  fromId: string;
  fromName: string;
  toId: string;
  toName: string;
  amount: number;
  currency: CurrencyCode;
  settled: boolean;
}
