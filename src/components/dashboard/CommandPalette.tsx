"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MessageSquare,
  Calendar,
  Radar,
  Palette,
  Users,
  CreditCard,
  BrainCircuit,
  X,
  ArrowRight,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMemory: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onOpenMemory,
}: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          setQuery("");
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      title: "Talk to AI Concierge",
      category: "Concierge",
      icon: MessageSquare,
      path: "/dashboard/concierge",
    },
    {
      title: "Open Itinerary Studio",
      category: "Planning",
      icon: Calendar,
      path: "/dashboard/itinerary",
    },
    {
      title: "Activate Disruption Rescue Radar",
      category: "Signature VIP",
      icon: Radar,
      path: "/dashboard/radar",
    },
    {
      title: "Curate Visual Trip Moodboard",
      category: "Multimodal AI",
      icon: Palette,
      path: "/dashboard/moodboard",
    },
    {
      title: "Collaborative Group Trips & Split",
      category: "Social",
      icon: Users,
      path: "/dashboard/group",
    },
    {
      title: "Multi-Currency Expenses & Vault",
      category: "Finance",
      icon: CreditCard,
      path: "/dashboard/expenses",
    },
    {
      title: "View & Edit Long-Term Memory",
      category: "Privacy / DPDP",
      icon: BrainCircuit,
      action: () => {
        onClose();
        onOpenMemory();
      },
    },
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-start justify-center pt-24 px-4">
      <div className="w-full max-w-2xl bg-surface-elevated border border-gold/40 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-4 h-4 text-gold flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a destination, command, or voyage tool..."
            autoFocus
            className="w-full bg-transparent text-sm text-ivory placeholder:text-muted/60 focus:outline-none font-mono"
          />
          <button
            onClick={onClose}
            className="p-1 text-muted hover:text-ivory font-mono text-xs"
          >
            ESC
          </button>
        </div>

        {/* Actions List */}
        <div className="p-2 max-h-96 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-muted font-mono">
              No matching concierge actions found.
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.title}
                  onClick={() => {
                    if (item.action) item.action();
                    else if (item.path) {
                      router.push(item.path);
                      onClose();
                    }
                  }}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gold/10 hover:border-gold/30 border border-transparent transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="text-xs font-mono text-ivory group-hover:text-gold block">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-muted font-mono">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted group-hover:text-gold transition-colors opacity-0 group-hover:opacity-100" />
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
