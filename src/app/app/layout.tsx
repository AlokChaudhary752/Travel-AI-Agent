"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Compass,
  LayoutDashboard,
  Sparkles,
  Users,
  CalendarDays,
  FileCheck2,
  Package,
  Receipt,
  MapPin,
  MessageSquare,
  BarChart3,
  Settings,
  Bell,
  Search,
  Plus,
  ChevronDown,
  LogOut,
  Menu,
  X,
  ShieldAlert,
  Radio,
  Check,
} from "lucide-react";
import { useAuth } from "@/lib/authContext";
import { useAgencyStore } from "@/lib/store";
import { Role } from "@/types/travel";
import { CommandPalette } from "@/components/dashboard/CommandPalette";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout, switchRole } = useAuth();
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    currentRole,
    setCurrentRole,
    dateRange,
    setDateRange,
  } = useAgencyStore();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Sync role between auth context and store
  useEffect(() => {
    if (user?.role && user.role !== currentRole) {
      setCurrentRole(user.role);
    }
  }, [user?.role, currentRole, setCurrentRole]);

  // Route Guard
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  // Keyboard shortcut for Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems = [
    { label: "Overview", href: "/app", icon: LayoutDashboard },
    { label: "AI Trip Planner", href: "/app/planner", icon: Sparkles, badge: "AI Core" },
    { label: "Leads CRM", href: "/app/leads", icon: Users },
    { label: "Bookings", href: "/app/bookings", icon: FileCheck2 },
    { label: "VIP Customers", href: "/app/customers", icon: Users },
    { label: "Packages & Margin", href: "/app/packages", icon: Package },
    { label: "Invoicing & GST", href: "/app/payments", icon: Receipt },
    { label: "Calendar", href: "/app/calendar", icon: CalendarDays },
    { label: "Travel Tools", href: "/app/tools", icon: MapPin },
    { label: "Client Messages", href: "/app/messages", icon: MessageSquare },
    { label: "Reports & P&L", href: "/app/reports", icon: BarChart3 },
    { label: "Agency Settings", href: "/app/settings", icon: Settings },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#071F22] flex items-center justify-center text-[#F6F2EB]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#C2532A] border-t-transparent animate-spin" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#F6F2EB]/60">
            Initializing Voyara Agency Terminal...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#071F22] text-[#F6F2EB] flex flex-col antialiased">
      {/* Real-time sync presence ticker */}
      <div className="bg-[#051719] border-b border-[#F6F2EB]/10 px-4 py-1 flex items-center justify-between text-[11px] font-mono text-[#F6F2EB]/60">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Realtime BroadcastChannel Active • Multi-tab sync live</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">Role Active: <strong className="text-[#C2532A]">{currentRole}</strong></span>
          <span className="text-[#F6F2EB]/40">Two Horizon Center, DLF Phase 5, Gurugram</span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden md:flex flex-col border-r border-[#F6F2EB]/10 bg-[#092B2F] transition-all duration-200 z-20 ${
            sidebarCollapsed ? "w-20" : "w-64"
          }`}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-[#F6F2EB]/10 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-[#C2532A] flex items-center justify-center bg-[#071F22] flex-shrink-0">
                <Compass className="w-4 h-4 text-[#C2532A]" />
              </div>
              {!sidebarCollapsed && (
                <div className="flex flex-col">
                  <span className="font-display tracking-[0.2em] uppercase text-sm font-light text-[#F6F2EB]">
                    Voyara
                  </span>
                  <span className="text-[9px] font-mono tracking-wider text-[#F6F2EB]/50 uppercase">
                    Agency OS
                  </span>
                </div>
              )}
            </Link>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-[#F6F2EB]/40 hover:text-[#F6F2EB] p-1 rounded"
              title="Toggle Sidebar"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded text-xs font-mono transition-colors ${
                    isActive
                      ? "bg-[#C2532A] text-white font-medium shadow-md"
                      : "text-[#F6F2EB]/75 hover:bg-[#0E353A] hover:text-[#F6F2EB]"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <div className="flex-1 flex items-center justify-between">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.2 rounded bg-[#071F22] text-[#C2532A] text-[9px] font-mono uppercase">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar User Footer with Role Selector */}
          <div className="p-3 border-t border-[#F6F2EB]/10 bg-[#071F22]">
            {!sidebarCollapsed ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#F6F2EB]/60">
                  <span>Role-Based Access:</span>
                  <span className="text-[#C2532A] font-medium">{currentRole}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {(["Owner", "Agent", "Accountant"] as Role[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        switchRole(r);
                        setCurrentRole(r);
                      }}
                      className={`py-1 text-[10px] font-mono rounded transition-colors ${
                        currentRole === r
                          ? "bg-[#C2532A] text-white"
                          : "bg-[#092B2F] text-[#F6F2EB]/60 hover:text-[#F6F2EB]"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C2532A] inline-block" title={currentRole} />
              </div>
            )}
          </div>
        </aside>

        {/* Mobile Header & Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-[#071F22] flex flex-col md:hidden">
            <div className="p-4 border-b border-[#F6F2EB]/10 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-[#C2532A] flex items-center justify-center bg-[#092B2F]">
                  <Compass className="w-4 h-4 text-[#C2532A]" />
                </div>
                <span className="font-display tracking-[0.2em] uppercase text-sm">Voyara Agency</span>
              </Link>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6 text-[#F6F2EB]" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded text-sm font-mono ${
                    pathname === item.href ? "bg-[#C2532A] text-white" : "text-[#F6F2EB]/80"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="p-4 border-t border-[#F6F2EB]/10">
              <button
                onClick={logout}
                className="w-full py-2.5 bg-red-950/40 text-red-300 border border-red-500/30 rounded text-xs font-mono flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Main Content Viewport */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Bar */}
          <header className="h-16 border-b border-[#F6F2EB]/10 bg-[#092B2F] px-4 sm:px-6 flex items-center justify-between gap-4 z-10 flex-shrink-0">
            {/* Left: Mobile trigger & Breadcrumbs */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden text-[#F6F2EB]/60 hover:text-[#F6F2EB]"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#F6F2EB]/50">
                <span>Voyara</span>
                <span>/</span>
                <span className="text-[#F6F2EB] capitalize">
                  {pathname.split("/")[2] || "Overview"}
                </span>
              </div>
            </div>

            {/* Center: Command Palette Trigger */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="flex-1 max-w-md hidden md:flex items-center justify-between px-3.5 py-1.5 bg-[#071F22] border border-[#F6F2EB]/15 rounded text-xs text-[#F6F2EB]/50 hover:border-[#F6F2EB]/30 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-[#C2532A]" />
                Search bookings, leads, clients...
              </span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[#092B2F] border border-[#F6F2EB]/15 rounded text-[#F6F2EB]/70">
                ⌘K
              </kbd>
            </button>

            {/* Right: Actions, Date Range, Notifications & Profile */}
            <div className="flex items-center gap-3">
              {/* Date Range Picker */}
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as any)}
                className="hidden lg:block bg-[#071F22] border border-[#F6F2EB]/15 rounded px-2.5 py-1.5 text-xs font-mono text-[#F6F2EB] focus:outline-none focus:border-[#C2532A]"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="12m">Last 12 Months</option>
                <option value="all">All Time Records</option>
              </select>

              {/* Quick New Trip Button */}
              <Link
                href="/app/planner"
                className="inline-flex items-center gap-1.5 py-1.5 px-3 bg-[#C2532A] hover:bg-[#C2532A]/90 text-white font-mono text-xs uppercase tracking-wider rounded transition-colors shadow"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Trip</span>
              </Link>

              {/* Notifications Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                  className="relative p-2 text-[#F6F2EB]/70 hover:text-[#F6F2EB] hover:bg-[#071F22] rounded transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#C2532A]" />
                  )}
                </button>

                {notifDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-[#092B2F] border border-[#F6F2EB]/20 rounded-lg shadow-2xl p-3 z-50 space-y-2">
                    <div className="flex items-center justify-between border-b border-[#F6F2EB]/10 pb-2">
                      <span className="text-xs font-mono font-medium text-[#F6F2EB]">
                        Agency Notifications ({unreadCount})
                      </span>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllNotificationsRead}
                          className="text-[10px] font-mono text-[#C2532A] hover:underline"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                    <div className="max-h-64 overflow-y-auto space-y-1.5">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationRead(n.id)}
                          className={`p-2 rounded text-xs cursor-pointer transition-colors ${
                            n.read ? "bg-[#071F22]/50 text-[#F6F2EB]/50" : "bg-[#071F22] text-[#F6F2EB]"
                          }`}
                        >
                          <div className="flex items-center justify-between font-medium">
                            <span>{n.title}</span>
                            <span className="text-[10px] text-[#F6F2EB]/40 font-mono">{n.time}</span>
                          </div>
                          <p className="text-[11px] mt-0.5 line-clamp-2">{n.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded hover:bg-[#071F22] transition-colors"
                >
                  <img
                    src={user?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"}
                    alt={user?.name || "User"}
                    className="w-7 h-7 rounded-full object-cover border border-[#C2532A]"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-[#F6F2EB]/50 hidden sm:block" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#092B2F] border border-[#F6F2EB]/20 rounded-lg shadow-2xl p-2 z-50 space-y-1 text-xs">
                    <div className="px-3 py-2 border-b border-[#F6F2EB]/10">
                      <div className="font-medium text-[#F6F2EB]">{user?.name}</div>
                      <div className="text-[11px] text-[#F6F2EB]/50 font-mono">{user?.email}</div>
                      <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-[#C2532A]/20 text-[#C2532A] text-[9px] font-mono uppercase">
                        {currentRole}
                      </span>
                    </div>

                    <Link
                      href="/app/settings"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-3 py-2 rounded hover:bg-[#071F22] text-[#F6F2EB]/80 hover:text-[#F6F2EB]"
                    >
                      Settings & Claude API Key
                    </Link>

                    <button
                      onClick={logout}
                      className="w-full text-left px-3 py-2 rounded hover:bg-red-950/40 text-red-300 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Main Route Content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#071F22]">
            {children}
          </main>
        </div>
      </div>

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
}
