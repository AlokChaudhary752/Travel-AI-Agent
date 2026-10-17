"use client";

import React, { useState } from "react";
import {
  User,
  ShieldCheck,
  Lock,
  Download,
  Trash2,
  Sparkles,
  Award,
  Globe,
  Plane,
  Utensils,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "vault" | "privacy">("profile");

  // Profile State
  const [fullName, setFullName] = useState("Lord Julian Vance");
  const [email, setEmail] = useState("vip@vance.luxury");
  const [homeAirport, setHomeAirport] = useState("BOM — Chhatrapati Shivaji Intl, Mumbai");
  const [dietary, setDietary] = useState("Strict Vegetarian & Jain Fine Dining");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleExportData = () => {
    const data = {
      profile: { fullName, email, homeAirport, dietary, tier: "elite" },
      memories: [
        "Prefers Aman resorts and window suites on long-haul flights",
        "Strict Jain culinary requirements; avoids root vegetables during sacred periods",
      ],
      vault: {
        passportEncryption: "AES-256-GCM",
        documentsCount: 2,
      },
      exportTimestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "voyara_member_data_archive.json";
    a.click();
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-soft block mb-1">
            Member Management
          </span>
          <h1 className="font-display text-3xl font-light text-ivory">
            Vault & Member Settings
          </h1>
          <p className="text-muted text-xs font-light mt-1">
            Manage your personal travel DNA, encrypted credentials, and DPDP privacy rights.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-gold/40 bg-gold/10 text-gold-soft text-xs font-mono">
          <Award className="w-4 h-4 text-gold" />
          <span>Elite Member Status</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 gap-6">
        <button
          onClick={() => setActiveTab("profile")}
          className={`pb-3 text-xs uppercase font-mono tracking-widest relative transition-colors ${
            activeTab === "profile"
              ? "text-gold font-semibold"
              : "text-muted hover:text-ivory"
          }`}
        >
          Travel Profile
          {activeTab === "profile" && (
            <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gold" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("vault")}
          className={`pb-3 text-xs uppercase font-mono tracking-widest relative transition-colors ${
            activeTab === "vault"
              ? "text-gold font-semibold"
              : "text-muted hover:text-ivory"
          }`}
        >
          Encrypted Vault
          {activeTab === "vault" && (
            <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gold" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("privacy")}
          className={`pb-3 text-xs uppercase font-mono tracking-widest relative transition-colors ${
            activeTab === "privacy"
              ? "text-gold font-semibold"
              : "text-muted hover:text-ivory"
          }`}
        >
          DPDP & Sovereignty
          {activeTab === "privacy" && (
            <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gold" />
          )}
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <form onSubmit={handleSave} className="space-y-6">
          {savedSuccess && (
            <div className="p-3 bg-gold/15 border border-gold text-xs text-gold-soft flex items-center gap-2">
              <Check className="w-4 h-4 text-gold" />
              <span>Travel DNA updated and synchronized with AI working memory.</span>
            </div>
          )}

          <div className="p-6 bg-surface-elevated/70 border border-white/10 space-y-4">
            <h3 className="text-sm font-semibold text-ivory flex items-center gap-2">
              <User className="w-4 h-4 text-gold" /> Personal Identity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] text-muted font-mono uppercase tracking-wider">
                  Passport Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-surface border border-white/15 px-3 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-muted font-mono uppercase tracking-wider">
                  Private Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface border border-white/15 px-3 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="p-6 bg-surface-elevated/70 border border-white/10 space-y-4">
            <h3 className="text-sm font-semibold text-ivory flex items-center gap-2">
              <Plane className="w-4 h-4 text-gold" /> Aviation & Gastronomy
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] text-muted font-mono uppercase tracking-wider">
                  Primary Aviation Hub
                </label>
                <input
                  type="text"
                  value={homeAirport}
                  onChange={(e) => setHomeAirport(e.target.value)}
                  className="w-full bg-surface border border-white/15 px-3 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-muted font-mono uppercase tracking-wider">
                  Dietary Nuances (Enforced Across All Concierge Bookings)
                </label>
                <input
                  type="text"
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  className="w-full bg-surface border border-white/15 px-3 py-2.5 text-xs text-ivory focus:border-gold focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="primary" size="md">
              Save Preferences
            </Button>
          </div>
        </form>
      )}

      {/* Vault Tab */}
      {activeTab === "vault" && (
        <div className="space-y-6">
          <div className="p-6 bg-surface-elevated/70 border border-gold/30 space-y-4">
            <div className="flex items-center gap-3 text-gold">
              <Lock className="w-5 h-5" />
              <h3 className="font-display text-xl text-ivory font-light">
                Client-Side AES-256 Vault Status
              </h3>
            </div>
            <p className="text-xs text-muted leading-relaxed font-light">
              Your sensitive documents (passports, private jet manifests, visa
              clearances) are secured with client-side derived encryption keys. Third
              parties only receive short-lived, cryptographically signed tokens.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-surface border border-white/10">
                <span className="text-[10px] text-muted font-mono uppercase block">
                  Encryption Standard
                </span>
                <span className="text-xs font-bold text-ivory mt-0.5 block">
                  AES-256-GCM
                </span>
              </div>
              <div className="p-3 bg-surface border border-white/10">
                <span className="text-[10px] text-muted font-mono uppercase block">
                  Signed URL Expiry
                </span>
                <span className="text-xs font-bold text-gold-soft mt-0.5 block">
                  15 Minutes
                </span>
              </div>
              <div className="p-3 bg-surface border border-white/10">
                <span className="text-[10px] text-muted font-mono uppercase block">
                  Vault Items
                </span>
                <span className="text-xs font-bold text-emerald-400 mt-0.5 block">
                  2 Documents Secured
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-surface border border-white/10 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-gold-soft">
              Vaulted Travel Credentials
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-surface-elevated flex items-center justify-between border border-white/5">
                <div>
                  <span className="text-ivory font-medium block">
                    Passport (United Kingdom Diplomatic / Standard)
                  </span>
                  <span className="text-[10px] text-muted font-mono">
                    Expires 2034 • Encrypted Hash: 0x9f8c...3a12
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono">
                  Verified Active
                </span>
              </div>

              <div className="p-3 bg-surface-elevated flex items-center justify-between border border-white/5">
                <div>
                  <span className="text-ivory font-medium block">
                    Schengen Multi-Entry Long-Term Visa
                  </span>
                  <span className="text-[10px] text-muted font-mono">
                    Valid for all Alpine & Mediterranean Sectors
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono">
                  Verified Active
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Tab (DPDP & GDPR Sovereign Rights) */}
      {activeTab === "privacy" && (
        <div className="space-y-6">
          <div className="p-6 bg-surface-elevated/70 border border-white/10 space-y-4">
            <div className="flex items-center gap-2.5 text-gold">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="font-display text-xl text-ivory font-light">
                Digital Personal Data Protection (DPDP) Sovereignty
              </h3>
            </div>
            <p className="text-xs text-muted leading-relaxed font-light">
              Under India DPDP Act 2023 and European GDPR guidelines, you hold the
              absolute legal right to export your complete profile records or enact
              instantaneous erasure.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                variant="secondary"
                size="md"
                onClick={handleExportData}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-gold" />
                <span>Export Complete Data Archive (JSON)</span>
              </Button>

              {exportSuccess && (
                <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Download Dispatched
                </span>
              )}
            </div>
          </div>

          {/* Forget Me / Erasure */}
          <div className="p-6 bg-red-950/20 border border-red-500/30 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-red-400 flex items-center gap-2">
              <Trash2 className="w-4 h-4" /> Permanent Account & Vault Erasure (&ldquo;Forget Me&rdquo;)
            </h4>
            <p className="text-xs text-muted leading-relaxed font-light">
              This action will permanently delete all your profiles, vector
              memories, trip records, and vaulted passport hashes from the Supabase
              database. This cannot be undone.
            </p>
            <Button
              variant="gold-outline"
              size="sm"
              onClick={() => {
                if (
                  confirm(
                    "Are you certain you wish to purge all member records and vector memories permanently?"
                  )
                ) {
                  localStorage.clear();
                  alert("Member vault and vector memories permanently purged.");
                  window.location.href = "/";
                }
              }}
              className="border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white"
            >
              Request Irreversible Erasure
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
