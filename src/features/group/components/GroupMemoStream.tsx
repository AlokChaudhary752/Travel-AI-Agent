"use client";

import React, { useState } from "react";
import { MessageSquare, Send, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGroupStore } from "../store/useGroupStore";

export function GroupMemoStream() {
  const { memos, postMemo, members, currentUserId } = useGroupStore();
  const [message, setMessage] = useState("");
  const [tagConcierge, setTagConcierge] = useState(true);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    postMemo(message, tagConcierge);
    setMessage("");
  };

  return (
    <div className="bg-[#0B1317]/90 border border-white/10 p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-none bg-gold/15 border border-gold/30 text-[9px] font-mono uppercase text-gold-soft mb-1">
            <MessageSquare className="w-3 h-3 text-gold" />
            Synchronized Party Comms
          </div>
          <h3 className="font-display text-2xl font-light text-ivory">
            Shared Voyage Log & Concierge Memos
          </h3>
          <p className="text-muted text-xs font-light mt-0.5">
            Real-time notes visible to all companions and automatically monitored by your dedicated Voyara concierge team.
          </p>
        </div>
      </div>

      {/* Memos List */}
      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
        {memos.map((memo) => {
          const isMe = memo.authorId === currentUserId;

          return (
            <div
              key={memo.id}
              className={`p-3.5 border transition-all ${
                memo.isConciergeTagged
                  ? "bg-surface-elevated border-gold/30"
                  : "bg-surface border-white/5"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-ivory">
                    {memo.authorName}
                  </span>
                  <span className="text-[10px] text-gold-soft font-mono">
                    {memo.authorRole}
                  </span>
                  {memo.isConciergeTagged && (
                    <span className="px-1.5 py-0.2 text-[8px] font-mono uppercase bg-gold/20 text-gold-soft border border-gold/40 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> Concierge Dispatched
                    </span>
                  )}
                </div>
                <span className="text-[9px] font-mono text-muted">
                  {memo.timestamp}
                </span>
              </div>
              <p className="text-xs text-ivory/90 font-light leading-relaxed">
                {memo.message}
              </p>
            </div>
          );
        })}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="space-y-3 pt-2 border-t border-white/5">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Post instructions, dietary requests, or notes for the party & concierge..."
            className="flex-1 bg-surface border border-white/10 px-3.5 py-2.5 text-xs text-ivory placeholder:text-muted/60 focus:border-gold outline-none"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="flex-shrink-0 font-mono text-xs"
          >
            <Send className="w-3.5 h-3.5 mr-1.5" />
            Transmit
          </Button>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-muted">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={tagConcierge}
              onChange={(e) => setTagConcierge(e.target.checked)}
              className="accent-[#C9A24B] w-3.5 h-3.5"
            />
            <span className="text-ivory">
              Tag Voyara AI Concierge for autonomous fulfillment
            </span>
          </label>
          <span className="hidden sm:inline text-gold-soft">
            E2E Encrypted Sanctum
          </span>
        </div>
      </form>
    </div>
  );
}
