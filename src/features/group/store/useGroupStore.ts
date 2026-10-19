import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GroupMember, DecisionPoll, GroupMemo } from "../types";

interface GroupState {
  currentUserId: string;
  members: GroupMember[];
  polls: DecisionPoll[];
  memos: GroupMemo[];
  tripShareCode: string;

  // Actions
  castVote: (pollId: string, optionId: string) => void;
  createPoll: (poll: Omit<DecisionPoll, "id" | "status">) => void;
  inviteMember: (member: Omit<GroupMember, "id" | "status">) => void;
  removeMember: (memberId: string) => void;
  postMemo: (message: string, tagConcierge?: boolean) => void;
}

const INITIAL_MEMBERS: GroupMember[] = [
  {
    id: "usr-1",
    name: "Lord Julian Vance",
    role: "Lead Voyager",
    avatar: "JV",
    status: "Active Now",
    dietaryProtocol: "Strict Jain (Zero Root Vegetables, Sunset Dining)",
    seatingPreference: "Lie-Flat Window Suite 1A",
    email: "julian.vance@voyara.vip",
  },
  {
    id: "usr-2",
    name: "Lady Evelyn Vance",
    role: "Co-Host",
    avatar: "EV",
    status: "Viewing Timeline",
    dietaryProtocol: "Lacto-Vegetarian (Organic, Gluten-Free)",
    seatingPreference: "Lie-Flat Window Suite 1K",
    email: "evelyn.vance@voyara.vip",
  },
  {
    id: "usr-3",
    name: "Ananya Mehta",
    role: "Companion",
    avatar: "AM",
    status: "Active Now",
    dietaryProtocol: "Vegetarian (Plant-based / Almond milk)",
    seatingPreference: "Upper Deck Club World 12B",
    email: "ananya.mehta@studio-arch.in",
  },
  {
    id: "usr-4",
    name: "Vikram Singhania",
    role: "Companion",
    avatar: "VS",
    status: "Away",
    dietaryProtocol: "Pescatarian / No Dairy",
    seatingPreference: "Window 2A",
    email: "vikram@singhaniagroup.com",
  },
];

const INITIAL_POLLS: DecisionPoll[] = [
  {
    id: "poll-1",
    question: "Select Alpine Sanctuary for Engadin Valley Stay",
    category: "Sanctuary",
    options: [
      {
        id: "opt-1a",
        label: "Badrutt's Palace Hotel (St. Moritz)",
        subtext: "Historic Lake St. Moritz palace, Rolls-Royce tarmac pick-up, heated infinity pool.",
        votes: ["usr-1", "usr-2"],
      },
      {
        id: "opt-1b",
        label: "The Chedi Andermatt (Chalet Suite)",
        subtext: "Contemporary alpine luxury, Japanese-Swiss fusion, subterranean spa.",
        votes: ["usr-3"],
      },
    ],
    createdBy: "Lord Julian Vance",
    status: "active",
    deadline: "Tomorrow, 18:00 CET",
  },
  {
    id: "poll-2",
    question: "Day 3 Evening Culinary Reservation",
    category: "Michelin Dining",
    options: [
      {
        id: "opt-2a",
        label: "Da Vittorio St. Moritz (2 Michelin Stars)",
        subtext: "Private Lombardian culinary table by Chef Enrico Cerea with custom Jain pairing.",
        votes: ["usr-1", "usr-3", "usr-4"],
      },
      {
        id: "opt-2b",
        label: "Chesa Veglia Dalsass Hearth (Rustic Alpine)",
        subtext: "1658 farmhouse truffled pizza & open wood-fired cheeses.",
        votes: ["usr-2"],
      },
    ],
    createdBy: "Lady Evelyn Vance",
    status: "active",
    deadline: "Oct 24, 12:00 CET",
  },
];

const INITIAL_MEMOS: GroupMemo[] = [
  {
    id: "memo-1",
    authorId: "usr-1",
    authorName: "Lord Julian Vance",
    authorRole: "Lead Voyager",
    message: "Concierge: Please confirm the private heated boot locker is pre-warmed each morning at 08:00.",
    timestamp: "10:15 AM",
    isConciergeTagged: true,
  },
  {
    id: "memo-2",
    authorId: "usr-3",
    authorName: "Ananya Mehta",
    authorRole: "Companion",
    message: "Voted for Da Vittorio! Their vegetarian black truffle risotto looks unbelievable.",
    timestamp: "10:32 AM",
    isConciergeTagged: false,
  },
];

export const useGroupStore = create<GroupState>()(
  persist(
    (set, get) => ({
      currentUserId: "usr-1",
      members: INITIAL_MEMBERS,
      polls: INITIAL_POLLS,
      memos: INITIAL_MEMOS,
      tripShareCode: "ENGADIN-2026-VANCE",

      castVote: (pollId: string, optionId: string) => {
        const userId = get().currentUserId;
        set({
          polls: get().polls.map((poll) => {
            if (poll.id !== pollId) return poll;

            // Remove current user from all options in this poll, then add to selected
            const updatedOptions = poll.options.map((opt) => {
              const withoutUser = opt.votes.filter((id) => id !== userId);
              if (opt.id === optionId) {
                return { ...opt, votes: [...withoutUser, userId] };
              }
              return { ...opt, votes: withoutUser };
            });

            return { ...poll, options: updatedOptions };
          }),
        });
      },

      createPoll: (pollData) => {
        const newPoll: DecisionPoll = {
          ...pollData,
          id: `poll-${Date.now()}`,
          status: "active",
        };
        set({ polls: [newPoll, ...get().polls] });
      },

      inviteMember: (memberData) => {
        const initials = memberData.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);

        const newMember: GroupMember = {
          ...memberData,
          id: `usr-${Date.now()}`,
          avatar: initials || "VP",
          status: "Active Now",
        };
        set({ members: [...get().members, newMember] });
      },

      removeMember: (memberId: string) => {
        set({
          members: get().members.filter((m) => m.id !== memberId),
        });
      },

      postMemo: (message: string, tagConcierge = false) => {
        const currentUser =
          get().members.find((m) => m.id === get().currentUserId) ||
          get().members[0];

        const newMemo: GroupMemo = {
          id: `memo-${Date.now()}`,
          authorId: currentUser.id,
          authorName: currentUser.name,
          authorRole: currentUser.role,
          message,
          timestamp: "Just now",
          isConciergeTagged: tagConcierge,
        };

        set({ memos: [newMemo, ...get().memos] });
      },
    }),
    {
      name: "voyara-group-state",
    }
  )
);
