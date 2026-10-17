"use client";

import React from "react";
import { Users, UserPlus, MessageCircle, Vote, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GroupPage() {
  const members = [
    { name: "Lord Julian Vance", role: "Trip Owner", status: "Active Now", avatar: "JV" },
    { name: "Ananya Mehta", role: "Editor", status: "Viewing Timeline", avatar: "AM" },
    { name: "Vikram Singhania", role: "Viewer", status: "Joined 2h ago", avatar: "VS" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-soft block mb-1">
            Collaborative Circles
          </span>
          <h1 className="font-display text-3xl font-light text-ivory">
            Group Voyage Studio
          </h1>
          <p className="text-muted text-xs font-light mt-1">
            Real-time multi-user presence, destination polls, and automated expense splitting.
          </p>
        </div>

        <Button variant="primary" size="md">
          <UserPlus className="w-4 h-4 mr-1.5" />
          Invite Private Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Members List */}
        <div className="p-6 bg-surface-elevated border border-white/10 space-y-4">
          <h3 className="text-xs uppercase font-mono tracking-widest text-gold-soft flex items-center gap-2">
            <Users className="w-4 h-4 text-gold" /> Active Party Members
          </h3>

          <div className="space-y-3">
            {members.map((m) => (
              <div
                key={m.name}
                className="p-3 bg-surface border border-white/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center font-mono text-xs text-gold font-bold">
                    {m.avatar}
                  </div>
                  <div>
                    <span className="text-xs font-medium text-ivory block">{m.name}</span>
                    <span className="text-[10px] text-muted font-mono">{m.role}</span>
                  </div>
                </div>
                <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Destination Poll */}
        <div className="p-6 bg-surface-elevated border border-white/10 space-y-4 md:col-span-2">
          <h3 className="text-xs uppercase font-mono tracking-widest text-gold-soft flex items-center gap-2">
            <Vote className="w-4 h-4 text-gold" /> Destination Decision Poll
          </h3>
          <p className="text-xs text-muted leading-relaxed font-light">
            All party members can cast weighted preference votes for upcoming winter sanctums.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-4 bg-surface border border-gold/30 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-ivory block">St. Moritz Badrutt&apos;s Palace (Engadin)</span>
                <span className="text-[10px] text-gold-soft font-mono">2 Votes (67%) • Leading</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-gold text-bg flex items-center justify-center">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            </div>

            <div className="p-4 bg-surface border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-ivory block">Zermatt Omnia Chalet (Matterhorn View)</span>
                <span className="text-[10px] text-muted font-mono">1 Vote (33%)</span>
              </div>
              <Button variant="ghost" size="sm">Vote</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
