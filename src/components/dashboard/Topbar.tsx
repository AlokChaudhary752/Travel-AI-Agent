"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Bell, Globe, Menu, ShieldCheck, CheckCircle2, User } from "lucide-react";

import { useRadarStore } from "@/features/radar/store/useRadarStore";

interface TopbarProps {
  onOpenCommand: () => void;
  onToggleMobileMenu: () => void;
}

export function Topbar({ onOpenCommand, onToggleMobileMenu }: TopbarProps) {
  const [currency, setCurrency] = useState("USD");
  const [showNotifications, setShowNotifications] = useState(false);
  const { activeSector, priceAlerts } = useRadarStore();

  const isDisrupted = activeSector.status === "delayed" || activeSector.status === "diverted";

  const notifications = [
    ...(isDisrupted
      ? [
          {
            id: "notif-disruption",
            title: `Sector ${activeSector.flightNumber} Advisory`,
            desc: `Delay of ${activeSector.telemetry.estimatedArrivalDelayMin}m detected. Lie-flat contingency suite holds active.`,
            time: "Live now",
            type: "disruption" as const,
            href: "/dashboard/radar",
          },
        ]
      : [
          {
            id: "notif-radar-clear",
            title: `Sector ${activeSector.flightNumber} On Schedule`,
            desc: "Airspace conditions for Zurich and Engadin Valley are optimal.",
            time: "Active",
            type: "disruption" as const,
            href: "/dashboard/radar",
          },
        ]),
    ...priceAlerts.slice(0, 2).map((alert) => ({
      id: alert.id,
      title: `${alert.airline} Fare Update`,
      desc: alert.priceDropINR > 0
        ? `${alert.route} dropped by ₹${alert.priceDropINR.toLocaleString("en-IN")}.`
        : `Monitoring ${alert.route} (${alert.cabin}) under ₹${alert.targetAlertPriceINR.toLocaleString("en-IN")}.`,
      time: alert.alertDate,
      type: "price" as const,
      href: "/dashboard/radar",
    })),
  ];

  return (
    <header suppressHydrationWarning className="h-16 bg-[#070A0F]/80 backdrop-blur-xl border-b border-gold/15 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Mobile Menu & Global Search Trigger */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button
          type="button"
          suppressHydrationWarning
          onClick={onToggleMobileMenu}
          className="lg:hidden p-1.5 text-muted hover:text-ivory"
          aria-label="Open navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          type="button"
          suppressHydrationWarning
          onClick={onOpenCommand}
          className="w-full flex items-center justify-between px-3.5 py-2 bg-surface-elevated/70 border border-white/10 hover:border-gold/40 text-muted hover:text-ivory transition-colors text-xs font-mono rounded-none"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-gold/70" />
            <span>Search or command concierge...</span>
          </div>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-white/10 border border-white/10 text-gold-soft font-mono">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Actions, Currency, Notifications, Profile */}
      <div className="flex items-center gap-4">
        {/* Currency Switcher */}
        <button
          type="button"
          suppressHydrationWarning
          onClick={() => {
            const list = ["USD", "INR", "EUR", "GBP"];
            const nextIndex = (list.indexOf(currency) + 1) % list.length;
            setCurrency(list[nextIndex]);
          }}
          className="flex items-center gap-1.5 text-xs font-mono text-muted hover:text-ivory px-2 py-1 border border-white/10 hover:border-gold/30 transition-all"
          title="Toggle active currency"
        >
          <Globe className="w-3.5 h-3.5 text-gold" />
          <span>{currency}</span>
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-muted hover:text-gold transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gold animate-pulse" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 p-4 bg-surface-elevated border border-gold/30 shadow-2xl rounded-none z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-gold-soft">
                  Concierge Telemetry
                </span>
                <span className="text-[10px] text-muted font-mono">Realtime</span>
              </div>
              <div className="space-y-2.5">
                {notifications.map((n) => (
                  <Link
                    key={n.id}
                    href={n.href}
                    onClick={() => setShowNotifications(false)}
                    className="p-2.5 bg-surface border border-white/5 hover:border-gold/30 block space-y-1 text-xs transition-colors"
                  >
                    <div className="flex items-center justify-between font-semibold text-ivory">
                      <span className="hover:text-gold transition-colors">{n.title}</span>
                      <span className="text-[9px] text-muted font-mono">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-muted leading-snug">{n.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & Member Identifier */}
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-2.5 pl-3 border-l border-white/10 group"
        >
          <div className="w-8 h-8 rounded-full bg-surface border border-gold/40 flex items-center justify-center text-gold group-hover:border-gold transition-colors shadow-gold-subtle">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden md:block text-left">
            <span className="text-xs font-mono font-medium text-ivory group-hover:text-gold block leading-tight">
              Lord Vance
            </span>
            <span className="text-[9px] text-muted font-mono uppercase tracking-widest">
              Sanctum Member
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
