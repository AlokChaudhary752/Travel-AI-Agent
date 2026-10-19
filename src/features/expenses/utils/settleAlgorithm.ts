import { ExpenseItem, CurrencyCode, MemberBalance, SettlementDebt } from "../types";

export const FX_RATES_TO_INR: Record<CurrencyCode, number> = {
  INR: 1,
  USD: 86.5,
  CHF: 95.4,
  EUR: 94.1,
  AED: 23.55,
};

export function convertCurrency(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode
): number {
  if (from === to) return amount;
  const inINR = amount * (FX_RATES_TO_INR[from] || 1);
  const targetRate = FX_RATES_TO_INR[to] || 1;
  return Math.round((inINR / targetRate) * 100) / 100;
}

export interface MemberRef {
  id: string;
  name: string;
  avatar: string;
}

/**
 * Calculates net balances and minimal settlement transactions (O(N log N) greedy debt matching).
 */
export function calculateSettlements(
  expenses: ExpenseItem[],
  members: MemberRef[],
  targetCurrency: CurrencyCode = "INR"
): {
  balances: MemberBalance[];
  settlements: SettlementDebt[];
} {
  // Initialize balances map
  const paidMap: Record<string, number> = {};
  const owedMap: Record<string, number> = {};

  members.forEach((m) => {
    paidMap[m.id] = 0;
    owedMap[m.id] = 0;
  });

  // Tally up payments and owed shares in targetCurrency
  expenses.forEach((exp) => {
    const amountInTarget = convertCurrency(exp.amount, exp.currency, targetCurrency);

    // Add to payer
    if (paidMap[exp.paidById] !== undefined) {
      paidMap[exp.paidById] += amountInTarget;
    } else {
      paidMap[exp.paidById] = amountInTarget;
    }

    // Split across participants
    const splitCount = exp.splitBetweenIds.length;
    if (splitCount > 0) {
      const share = amountInTarget / splitCount;
      exp.splitBetweenIds.forEach((participantId) => {
        if (owedMap[participantId] !== undefined) {
          owedMap[participantId] += share;
        } else {
          owedMap[participantId] = share;
        }
      });
    }
  });

  const memberNameMap: Record<string, string> = {};
  const memberAvatarMap: Record<string, string> = {};
  members.forEach((m) => {
    memberNameMap[m.id] = m.name;
    memberAvatarMap[m.id] = m.avatar;
  });

  // Calculate Net Balances
  const balances: MemberBalance[] = members.map((m) => {
    const totalPaid = Math.round(paidMap[m.id] || 0);
    const totalOwed = Math.round(owedMap[m.id] || 0);
    const netBalance = Math.round((totalPaid - totalOwed) * 100) / 100;

    return {
      memberId: m.id,
      memberName: m.name,
      avatar: m.avatar,
      totalPaid,
      totalOwed,
      netBalance,
    };
  });

  // Debt Minimization Algorithm
  // Separate into debtors (net < 0) and creditors (net > 0)
  interface PersonBalance {
    id: string;
    name: string;
    amount: number;
  }

  const debtors: PersonBalance[] = [];
  const creditors: PersonBalance[] = [];

  balances.forEach((b) => {
    if (b.netBalance < -0.5) {
      debtors.push({ id: b.memberId, name: b.memberName, amount: -b.netBalance });
    } else if (b.netBalance > 0.5) {
      creditors.push({ id: b.memberId, name: b.memberName, amount: b.netBalance });
    }
  });

  // Sort descending by amount
  debtors.sort((a, b) => b.amount - a.amount);
  creditors.sort((a, b) => b.amount - a.amount);

  const settlements: SettlementDebt[] = [];
  let dIdx = 0;
  let cIdx = 0;

  while (dIdx < debtors.length && cIdx < creditors.length) {
    const debtor = debtors[dIdx];
    const creditor = creditors[cIdx];

    const settledAmount = Math.min(debtor.amount, creditor.amount);

    if (settledAmount > 0.5) {
      settlements.push({
        id: `stl-${debtor.id}-${creditor.id}-${settlements.length}`,
        fromId: debtor.id,
        fromName: debtor.name,
        toId: creditor.id,
        toName: creditor.name,
        amount: Math.round(settledAmount),
        currency: targetCurrency,
        settled: false,
      });
    }

    debtor.amount -= settledAmount;
    creditor.amount -= settledAmount;

    if (debtor.amount <= 0.5) dIdx++;
    if (creditor.amount <= 0.5) cIdx++;
  }

  return { balances, settlements };
}
