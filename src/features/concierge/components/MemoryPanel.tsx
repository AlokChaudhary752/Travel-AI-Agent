"use client";

import React, { useState } from "react";
import { BrainCircuit, Trash2, Edit2, ShieldAlert, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface MemoryItem {
  id: string;
  category: string;
  content: string;
  createdAt: string;
}

export function MemoryPanel({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [memories, setMemories] = useState<MemoryItem[]>([
    {
      id: "mem-1",
      category: "Dietary Tenet",
      content: "Strict preference for vegetarian & Jain culinary options; avoids root vegetables during sacred observances.",
      createdAt: "Saved from Onboarding",
    },
    {
      id: "mem-2",
      category: "Aviation Preference",
      content: "Prefers lie-flat suites with window seat configuration on long-haul sectors (BOM -> ZRH/LHR).",
      createdAt: "Synthesized 2 days ago",
    },
    {
      id: "mem-3",
      category: "Sanctuary Style",
      content: "Prefers Aman, Rosewood, and high-altitude secluded chalets with private onsen or thermal spa.",
      createdAt: "Synthesized 3 days ago",
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  if (!isOpen) return null;

  const handleDelete = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  const handleStartEdit = (m: MemoryItem) => {
    setEditingId(m.id);
    setEditContent(m.content);
  };

  const handleSaveEdit = (id: string) => {
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, content: editContent } : m))
    );
    setEditingId(null);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md h-full bg-surface-elevated border-l border-gold/30 p-8 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center">
                <BrainCircuit className="w-4 h-4 text-gold" />
              </div>
              <div>
                <h3 className="font-display text-xl font-light text-ivory">
                  What I Remember
                </h3>
                <span className="text-[10px] text-gold-soft font-mono uppercase tracking-widest">
                  Long-Term Vector Memory
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-muted hover:text-ivory transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-muted leading-relaxed my-5 font-light">
            Voyara stores contextual memory embeddings to eliminate repetitive
            preferences. Under the India DPDP Act and GDPR, you maintain absolute
            sovereignty to edit or erase any memory record at will.
          </p>

          {/* Memories List */}
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {memories.length === 0 ? (
              <div className="p-6 text-center text-xs text-muted border border-white/5 font-mono">
                Memory vault is empty.
              </div>
            ) : (
              memories.map((m) => (
                <div
                  key={m.id}
                  className="p-4 bg-surface border border-white/10 hover:border-gold/30 transition-all rounded-none space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gold-soft uppercase tracking-wider px-2 py-0.5 bg-gold/10 border border-gold/20">
                      {m.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStartEdit(m)}
                        className="text-muted hover:text-gold transition-colors"
                        title="Edit Memory"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="text-muted hover:text-red-400 transition-colors"
                        title="Erase from Memory"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {editingId === m.id ? (
                    <div className="space-y-2 pt-2">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full bg-surface-elevated border border-gold/40 p-2 text-xs text-ivory focus:outline-none"
                        rows={3}
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleSaveEdit(m.id)}
                        >
                          <Check className="w-3 h-3 mr-1" /> Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-ivory/90 leading-relaxed font-light">
                      {m.content}
                    </p>
                  )}

                  <span className="text-[9px] text-muted font-mono block">
                    {m.createdAt}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bottom DPDP Erasure Action */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={() => setMemories([])}
            className="flex items-center gap-1.5 text-[11px] text-red-400 hover:text-red-300 font-mono transition-colors"
          >
            <ShieldAlert className="w-3.5 h-3.5" /> Erase All Memories (&ldquo;Forget Me&rdquo;)
          </button>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
