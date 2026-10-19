"use client";

import React from "react";
import { Vote, Check, Clock, Plus, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGroupStore } from "../store/useGroupStore";

interface DecisionPollsProps {
  onOpenCreatePoll: () => void;
}

export function DecisionPolls({ onOpenCreatePoll }: DecisionPollsProps) {
  const { polls, currentUserId, members, castVote } = useGroupStore();

  const getMemberInitials = (memberId: string) => {
    const m = members.find((mem) => mem.id === memberId);
    return m ? m.avatar : "VP";
  };

  const getMemberName = (memberId: string) => {
    const m = members.find((mem) => mem.id === memberId);
    return m ? m.name : "Member";
  };

  return (
    <div className="bg-[#0B1317]/90 border border-white/10 p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-none bg-gold/15 border border-gold/30 text-[9px] font-mono uppercase text-gold-soft mb-1">
            <Vote className="w-3 h-3 text-gold" />
            Consensus Engine
          </div>
          <h3 className="font-display text-2xl font-light text-ivory">
            Collaborative Decision Polls
          </h3>
          <p className="text-muted text-xs font-light mt-0.5">
            Democratic vote allocation for sanctuaries, Michelin tasting reservations, and alpine expeditions.
          </p>
        </div>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={onOpenCreatePoll}
          className="font-mono text-xs flex-shrink-0"
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Propose Decision
        </Button>
      </div>

      <div className="space-y-6">
        {polls.map((poll) => {
          const totalVotes = poll.options.reduce(
            (acc, opt) => acc + opt.votes.length,
            0
          );

          return (
            <div
              key={poll.id}
              className="p-5 bg-surface border border-white/5 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase text-gold-soft px-1.5 py-0.5 bg-gold/10 border border-gold/20 mr-2">
                    {poll.category}
                  </span>
                  <h4 className="font-display text-lg text-ivory font-normal inline align-middle">
                    {poll.question}
                  </h4>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-muted">
                  <Clock className="w-3 h-3 text-gold" />
                  <span>Closes: {poll.deadline}</span>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3 pt-1">
                {poll.options.map((option) => {
                  const hasVotedForThis = option.votes.includes(currentUserId);
                  const percentage =
                    totalVotes > 0
                      ? Math.round((option.votes.length / totalVotes) * 100)
                      : 0;

                  return (
                    <div
                      key={option.id}
                      onClick={() => castVote(poll.id, option.id)}
                      className={`p-4 border transition-all cursor-pointer relative overflow-hidden ${
                        hasVotedForThis
                          ? "bg-surface-elevated border-gold shadow-gold-subtle"
                          : "bg-[#070E12] border-white/5 hover:border-white/20"
                      }`}
                    >
                      {/* Vote Progress Bar Fill */}
                      <div
                        className="absolute inset-y-0 left-0 bg-gold/10 transition-all duration-500 pointer-events-none"
                        style={{ width: `${percentage}%` }}
                      />

                      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-ivory">
                              {option.label}
                            </span>
                            {hasVotedForThis && (
                              <span className="text-[9px] font-mono bg-gold text-bg px-1.5 py-0.2 font-semibold">
                                Your Vote
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted font-light leading-relaxed">
                            {option.subtext}
                          </p>

                          {/* Member Avatars Who Voted */}
                          {option.votes.length > 0 && (
                            <div className="flex items-center gap-1.5 pt-2">
                              <span className="text-[9px] font-mono text-muted uppercase mr-1">
                                Backed by:
                              </span>
                              {option.votes.map((voterId) => (
                                <div
                                  key={voterId}
                                  title={getMemberName(voterId)}
                                  className="w-5 h-5 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-[9px] font-mono font-bold text-gold"
                                >
                                  {getMemberInitials(voterId)}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Vote Stats */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 flex-shrink-0">
                          <span className="font-mono text-base font-bold text-gold tabular-nums">
                            {percentage}%
                          </span>
                          <span className="text-[10px] font-mono text-muted">
                            {option.votes.length} {option.votes.length === 1 ? "vote" : "votes"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
