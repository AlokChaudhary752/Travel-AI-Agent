"use client";

import React, { useState } from "react";
import { Vote, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGroupStore } from "../store/useGroupStore";
import { DecisionPoll } from "../types";

interface CreatePollModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePollModal({ isOpen, onClose }: CreatePollModalProps) {
  const { createPoll, members, currentUserId } = useGroupStore();
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState<DecisionPoll["category"]>("Sanctuary");
  const [deadline, setDeadline] = useState("Tomorrow, 20:00 CET");

  const [options, setOptions] = useState([
    { label: "", subtext: "" },
    { label: "", subtext: "" },
  ]);

  if (!isOpen) return null;

  const handleAddOption = () => {
    setOptions([...options, { label: "", subtext: "" }]);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length <= 2) return;
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (
    index: number,
    field: "label" | "subtext",
    val: string
  ) => {
    const updated = [...options];
    updated[index][field] = val;
    setOptions(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const validOptions = options
      .filter((opt) => opt.label.trim())
      .map((opt, idx) => ({
        id: `opt-custom-${Date.now()}-${idx}`,
        label: opt.label,
        subtext: opt.subtext || "Custom proposed itinerary option",
        votes: [],
      }));

    if (validOptions.length < 2) return;

    const currentUser = members.find((m) => m.id === currentUserId);

    createPoll({
      question,
      category,
      deadline,
      createdBy: currentUser ? currentUser.name : "Lead Voyager",
      options: validOptions,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-bg/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0B1317] border border-gold/40 max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-muted hover:text-ivory"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-gold-soft">
            Consensus Protocol
          </span>
          <h3 className="font-display text-2xl text-ivory font-light mt-0.5">
            Propose Decision Poll
          </h3>
          <p className="text-muted text-xs font-light mt-1">
            Put hotel suites, tasting menus, or private excursions to a party vote.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-mono uppercase text-muted block mb-1">
              Poll Question
            </label>
            <input
              type="text"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. Glacier Express Panoramic Car vs Private Jet Transfer?"
              className="w-full bg-surface border border-white/10 px-3 py-2 text-xs text-ivory focus:border-gold outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-mono uppercase text-muted block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-surface border border-white/10 px-2 py-2 text-xs text-ivory focus:border-gold outline-none font-mono"
              >
                <option value="Sanctuary">Sanctuary</option>
                <option value="Michelin Dining">Michelin Dining</option>
                <option value="Aviation & Transit">Aviation & Transit</option>
                <option value="Alpine Adventure">Alpine Adventure</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-muted block mb-1">
                Voting Deadline
              </label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="Oct 25, 18:00 CET"
                className="w-full bg-surface border border-white/10 px-3 py-2 text-xs font-mono text-ivory focus:border-gold outline-none"
              />
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-mono uppercase text-muted">
                Voting Options (Minimum 2)
              </label>
              <button
                type="button"
                onClick={handleAddOption}
                className="text-[10px] font-mono text-gold-soft hover:text-gold flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Choice
              </button>
            </div>

            {options.map((opt, idx) => (
              <div
                key={idx}
                className="p-3 bg-surface border border-white/5 space-y-2 relative"
              >
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    required
                    value={opt.label}
                    onChange={(e) =>
                      handleOptionChange(idx, "label", e.target.value)
                    }
                    placeholder={`Option ${idx + 1} Title`}
                    className="w-full bg-transparent border-b border-white/10 pb-1 text-xs text-ivory focus:border-gold outline-none"
                  />
                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(idx)}
                      className="text-muted hover:text-terracotta"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={opt.subtext}
                  onChange={(e) =>
                    handleOptionChange(idx, "subtext", e.target.value)
                  }
                  placeholder="Optional brief description / highlight"
                  className="w-full bg-transparent text-[11px] text-muted focus:text-ivory outline-none"
                />
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Publish Poll
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
