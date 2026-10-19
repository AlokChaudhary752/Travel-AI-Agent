import { describe, it, expect } from "vitest";
import {
  calculateSettlements,
  convertCurrency,
  FX_RATES_TO_INR,
  MemberRef,
} from "../../src/features/expenses/utils/settleAlgorithm";
import { ExpenseItem } from "../../src/features/expenses/types";

describe("Expense Splitter & Debt Minimization Algorithm", () => {
  const members: MemberRef[] = [
    { id: "u1", name: "Alice", avatar: "A" },
    { id: "u2", name: "Bob", avatar: "B" },
    { id: "u3", name: "Charlie", avatar: "C" },
  ];

  it("converts currencies accurately according to FX rates", () => {
    // 100 USD to INR
    const usdToInr = convertCurrency(100, "USD", "INR");
    expect(usdToInr).toBe(8650);

    // 100 CHF to INR
    const chfToInr = convertCurrency(100, "CHF", "INR");
    expect(chfToInr).toBe(9540);
  });

  it("correctly balances a simple 2-person split", () => {
    const expenses: ExpenseItem[] = [
      {
        id: "e1",
        title: "Chalet Dinner",
        category: "Michelin Dining",
        amount: 3000,
        currency: "INR",
        paidById: "u1",
        splitBetweenIds: ["u1", "u2"],
        date: "2026-10-18",
      },
    ];

    const { balances, settlements } = calculateSettlements(expenses, members, "INR");

    const alice = balances.find((b) => b.memberId === "u1")!;
    const bob = balances.find((b) => b.memberId === "u2")!;
    const charlie = balances.find((b) => b.memberId === "u3")!;

    expect(alice.totalPaid).toBe(3000);
    expect(alice.totalOwed).toBe(1500);
    expect(alice.netBalance).toBe(1500);

    expect(bob.totalPaid).toBe(0);
    expect(bob.totalOwed).toBe(1500);
    expect(bob.netBalance).toBe(-1500);

    expect(charlie.netBalance).toBe(0);

    expect(settlements).toHaveLength(1);
    expect(settlements[0].fromId).toBe("u2");
    expect(settlements[0].toId).toBe("u1");
    expect(settlements[0].amount).toBe(1500);
  });

  it("minimizes multi-person circular debts into fewest transactions", () => {
    // Alice pays 900 split among Alice, Bob, Charlie (300 each)
    // Bob pays 600 split among Alice, Bob, Charlie (200 each)
    // Net:
    // Alice: paid 900, owed 300+200=500 -> +400
    // Bob: paid 600, owed 300+200=500 -> +100
    // Charlie: paid 0, owed 300+200=500 -> -500
    // Charlie should pay 400 to Alice, and 100 to Bob (only 2 transactions)
    const expenses: ExpenseItem[] = [
      {
        id: "e1",
        title: "Helicopter Skiing",
        category: "Alpine Transit",
        amount: 900,
        currency: "INR",
        paidById: "u1",
        splitBetweenIds: ["u1", "u2", "u3"],
        date: "2026-10-18",
      },
      {
        id: "e2",
        title: "Fondue Lunch",
        category: "Michelin Dining",
        amount: 600,
        currency: "INR",
        paidById: "u2",
        splitBetweenIds: ["u1", "u2", "u3"],
        date: "2026-10-19",
      },
    ];

    const { balances, settlements } = calculateSettlements(expenses, members, "INR");

    const alice = balances.find((b) => b.memberId === "u1")!;
    const bob = balances.find((b) => b.memberId === "u2")!;
    const charlie = balances.find((b) => b.memberId === "u3")!;

    expect(alice.netBalance).toBe(400);
    expect(bob.netBalance).toBe(100);
    expect(charlie.netBalance).toBe(-500);

    expect(settlements).toHaveLength(2);
    // Charlie pays Alice 400, Charlie pays Bob 100
    const charlieToAlice = settlements.find(
      (s) => s.fromId === "u3" && s.toId === "u1"
    );
    const charlieToBob = settlements.find(
      (s) => s.fromId === "u3" && s.toId === "u2"
    );

    expect(charlieToAlice).toBeDefined();
    expect(charlieToAlice!.amount).toBe(400);

    expect(charlieToBob).toBeDefined();
    expect(charlieToBob!.amount).toBe(100);
  });
});
