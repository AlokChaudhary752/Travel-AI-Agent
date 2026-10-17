"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  MessageSquare,
  Calendar,
  MapPin,
  Users,
  CreditCard,
  Radar,
  Palette,
  Settings,
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface SidebarProps {
  onOpenMemory: () => void;
}

export function Sidebar({ onOpenMemory }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { label: "AI Concierge", href: "/dashboard/concierge", icon: MessageSquare },
    { label: "Itinerary Studio", href: "/dashboard/itinerary", icon: Calendar },
    { label: "3D Live Map", href: "/dashboard/explore", icon: MapPin },
    { label: "Group Journeys", href: "/dashboard/group", icon: Users },
    { label: "Expenses & Budget", href: "/dashboard/expenses", icon: CreditCard },
    { label: "Disruption Radar", href: "/dashboard/radar", icon: Radar, badge: "VIP" },
    { label: "Vibe Moodboard", href: "/dashboard/moodboard", icon: Palette, badge: "AI" },
    { label: "Vault & Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside
      className={`h-screen sticky top-0 bg-[#070A0F] border-r border-gold/15 flex flex-col justify-between transition-all duration-300 z-30 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div>
        {/* Top Brand Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center flex-shrink-0 group-hover:border-gold transition-colors">
              <Compass className="w-4 h-4 text-gold" />
            </div>
            {!collapsed && (
              <span className="font-display text-xl tracking-[0.25em] font-light text-ivory uppercase">
                Voyara
              </span>
            )}
          </Link>
          <button
            suppressHydrationWarning
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 text-muted hover:text-gold transition-colors hidden lg:block"
            aria-label="Collapse sidebar"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5 mt-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-none text-xs font-mono transition-all group ${
                  isActive
                    ? "bg-gold/15 text-gold border-l-2 border-gold font-semibold shadow-gold-subtle"
                    : "text-muted hover:text-ivory hover:bg-white/[0.03]"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-gold" : "text-muted group-hover:text-gold"}`} />
                {!collapsed && (
                  <span className="truncate flex-1 tracking-wider uppercase text-[11px]">
                    {item.label}
                  </span>
                )}
                {!collapsed && item.badge && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gold/20 text-gold-soft font-mono font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Memory & Member Status Card */}
      <div className="p-3 border-t border-white/5 space-y-2">
        <button
          onClick={onOpenMemory}
          className="w-full flex items-center gap-2.5 p-2.5 bg-surface-elevated/70 border border-gold/20 hover:border-gold/50 transition-all text-left group"
        >
          <BrainCircuit className="w-4 h-4 text-gold flex-shrink-0" />
          {!collapsed && (
            <div className="truncate">
              <span className="text-[11px] font-mono text-ivory group-hover:text-gold block">
                What I Remember
              </span>
              <span className="text-[9px] text-muted font-mono">
                Long-Term Vector Context
              </span>
            </div>
          )}
        </button>

        {!collapsed && (
          <div className="p-3 bg-surface border border-white/5 rounded-none flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <span className="text-[10px] uppercase font-mono text-gold-soft block font-bold">
                  Voyager Elite
                </span>
                <span className="text-[9px] text-muted font-mono">
                  GDS Verified Direct
                </span>
              </div>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-gold/60" />
          </div>
        )}
      </div>
    </aside>
  );
}
