"use client";

import React from "react";
import { Users, Shield, Utensils, Armchair, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGroupStore } from "../store/useGroupStore";

interface MembersGridProps {
  onOpenInvite: () => void;
}

export function MembersGrid({ onOpenInvite }: MembersGridProps) {
  const { members, currentUserId, removeMember } = useGroupStore();

  return (
    <div className="bg-[#0B1317]/90 border border-white/10 p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-none bg-gold/15 border border-gold/30 text-[9px] font-mono uppercase text-gold-soft mb-1">
            <Users className="w-3 h-3 text-gold" />
            Accompanying Circle
          </div>
          <h3 className="font-display text-2xl font-light text-ivory">
            Party Members & Dietary Protocols
          </h3>
          <p className="text-muted text-xs font-light mt-0.5">
            Synchronized profiles allow hotel kitchens, private air crews, and Michelin maitre d&apos;s to prepare bespoke menus in advance.
          </p>
        </div>

        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={onOpenInvite}
          className="font-mono text-xs flex-shrink-0"
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Invite Companion
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {members.map((member) => {
          const isCurrentUser = member.id === currentUserId;

          return (
            <div
              key={member.id}
              className={`p-4 md:p-5 border transition-all ${
                isCurrentUser
                  ? "bg-surface-elevated border-gold/40 shadow-gold-subtle"
                  : "bg-surface border-white/5 hover:border-white/20"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center font-mono text-sm text-gold font-bold flex-shrink-0">
                    {member.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-base text-ivory font-medium">
                        {member.name}
                      </span>
                      {isCurrentUser && (
                        <span className="text-[9px] font-mono bg-white/10 text-ivory px-1.5 py-0.2 border border-white/10">
                          You
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gold-soft font-mono block">
                      {member.role}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-1 px-2 py-0.5 bg-emerald-950/40 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {member.status}
                  </span>

                  {!isCurrentUser && member.role !== "Lead Voyager" && (
                    <button
                      type="button"
                      onClick={() => removeMember(member.id)}
                      className="p-1 text-muted hover:text-terracotta transition-colors"
                      title="Remove member"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Protocol Details */}
              <div className="mt-4 pt-3 border-t border-white/5 space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <Utensils className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono text-muted uppercase block">
                      Dietary Requirement
                    </span>
                    <span className="text-ivory font-light text-[11px]">
                      {member.dietaryProtocol}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Armchair className="w-3.5 h-3.5 text-muted flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono text-muted uppercase block">
                      Aviation Seating Preference
                    </span>
                    <span className="text-muted font-light text-[11px]">
                      {member.seatingPreference}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
