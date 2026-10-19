"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { AGENCY_DETAILS } from "@/features/agency/data/agencyData";

export function WhatsAppButton() {
  return (
    <aside
      aria-label="Direct WhatsApp Concierge"
      className="fixed bottom-6 right-6 z-50 flex items-center group cursor-pointer"
    >
      <a
        href={AGENCY_DETAILS.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] text-[#072427] font-sans font-semibold text-xs shadow-2xl hover:bg-[#2fe571] hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20"
        title="Chat directly with our senior travel curators on WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-950 animate-pulse" />
        </div>
        <div className="flex flex-col text-left leading-tight">
          <span className="text-[11px] font-bold tracking-tight">
            Chat on WhatsApp
          </span>
          <span className="text-[9px] font-mono text-emerald-950/80 font-normal">
            Online • Under 2m reply
          </span>
        </div>
      </a>
    </aside>
  );
}
