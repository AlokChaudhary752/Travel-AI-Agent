"use client";

import React, { useState } from "react";
import { Users, UserPlus, Vote, MessageSquare, ShieldCheck, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MembersGrid } from "@/features/group/components/MembersGrid";
import { DecisionPolls } from "@/features/group/components/DecisionPolls";
import { GroupMemoStream } from "@/features/group/components/GroupMemoStream";
import { InviteMemberModal } from "@/features/group/components/InviteMemberModal";
import { CreatePollModal } from "@/features/group/components/CreatePollModal";
import { useGroupStore } from "@/features/group/store/useGroupStore";

export default function GroupPage() {
  const { members, polls, tripShareCode } = useGroupStore();
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [createPollModalOpen, setCreatePollModalOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-none bg-gold/15 border border-gold/30 text-[10px] font-mono uppercase text-gold-soft mb-2">
            <Users className="w-3 h-3 text-gold" />
            Signature Feature 02 • Collaborative Circle
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-light text-ivory">
            Group Voyage Studio & Consensus Hub
          </h1>
          <p className="text-muted text-xs font-light mt-1.5 max-w-2xl leading-relaxed">
            Multi-traveler presence, synchronized dietary protocols for Michelin and private jet catering,
            democratic itinerary polls, and real-time concierge memo routing.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="px-3 py-1.5 bg-surface-elevated border border-gold/30 text-xs font-mono text-gold-soft flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Passcode: {tripShareCode}</span>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => setInviteModalOpen(true)}
            className="font-mono text-xs"
          >
            <UserPlus className="w-4 h-4 mr-1.5" />
            Invite Companion
          </Button>
        </div>
      </div>

      {/* Party Members & Dietary Protocols */}
      <MembersGrid onOpenInvite={() => setInviteModalOpen(true)} />

      {/* Decision Polls */}
      <DecisionPolls onOpenCreatePoll={() => setCreatePollModalOpen(true)} />

      {/* Group Comms & Concierge Memo Stream */}
      <GroupMemoStream />

      {/* Modals */}
      <InviteMemberModal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
      />

      <CreatePollModal
        isOpen={createPollModalOpen}
        onClose={() => setCreatePollModalOpen(false)}
      />
    </div>
  );
}
