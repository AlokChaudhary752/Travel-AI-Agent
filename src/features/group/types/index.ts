export type MemberRole = "Lead Voyager" | "Co-Host" | "Companion" | "Viewer";

export interface GroupMember {
  id: string;
  name: string;
  role: MemberRole;
  avatar: string;
  status: "Active Now" | "Viewing Timeline" | "Away" | "In Flight";
  dietaryProtocol: string;
  seatingPreference: string;
  email: string;
}

export interface PollOption {
  id: string;
  label: string;
  subtext: string;
  votes: string[]; // member IDs who voted for this option
}

export interface DecisionPoll {
  id: string;
  question: string;
  category: "Sanctuary" | "Michelin Dining" | "Aviation & Transit" | "Alpine Adventure";
  options: PollOption[];
  createdBy: string;
  status: "active" | "concluded";
  deadline: string;
}

export interface GroupMemo {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: MemberRole;
  message: string;
  timestamp: string;
  isConciergeTagged: boolean;
}
