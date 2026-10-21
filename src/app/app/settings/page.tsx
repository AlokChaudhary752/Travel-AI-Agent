"use client";

import React, { useState } from "react";
import {
  Settings,
  Building2,
  KeyRound,
  Users,
  Percent,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Bot,
  Shield,
} from "lucide-react";
import { useAgencyStore } from "@/lib/store";
import { useAuth } from "@/lib/authContext";

export default function AgencySettingsPage() {
  const { settings, updateSettings, resetDemoData, team } = useAgencyStore();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    agencyName: settings.agencyName,
    tagline: settings.tagline,
    gstin: settings.gstin,
    iataNumber: settings.iataNumber,
    address: settings.address,
    city: settings.city,
    phone: settings.phone,
    email: settings.email,
    currency: settings.currency,
    gstRatePct: settings.gstRatePct,
    anthropicApiKey: settings.anthropicApiKey || "",
    bankAccountName: settings.bankDetails?.accountName || "Voyara Journeys Pvt Ltd",
    bankAccountNumber: settings.bankDetails?.accountNumber || "50200084920194",
    bankIfsc: settings.bankDetails?.ifsc || "HDFC0000043",
    bankUpi: settings.bankDetails?.upiId || "voyara@hdfcbank",
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      agencyName: formData.agencyName,
      tagline: formData.tagline,
      gstin: formData.gstin,
      iataNumber: formData.iataNumber,
      address: formData.address,
      city: formData.city,
      phone: formData.phone,
      email: formData.email,
      currency: formData.currency,
      gstRatePct: formData.gstRatePct,
      anthropicApiKey: formData.anthropicApiKey,
      bankDetails: {
        accountName: formData.bankAccountName,
        accountNumber: formData.bankAccountNumber,
        ifsc: formData.bankIfsc,
        bankName: "HDFC Bank Ltd",
        upiId: formData.bankUpi,
      },
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExportJson = () => {
    try {
      const stateRaw = localStorage.getItem("voyara_agency_saas_store_v1");
      if (!stateRaw) return;
      const blob = new Blob([stateRaw], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `voyara_backup_${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetData = () => {
    resetDemoData();
    setResetConfirmOpen(false);
    alert("Workspace successfully reset to pristine 80+ bookings demo state!");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F6F2EB]/10 pb-5">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-light text-[#F6F2EB]">
            Agency Settings & Integrations
          </h1>
          <p className="text-xs text-[#F6F2EB]/60 font-sans mt-0.5">
            Manage your legal entity accreditation, Claude API key, tax rules, team permissions, and workspace backups.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
            <CheckCircle2 className="w-4 h-4" />
            Settings saved successfully!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Anthropic Claude API Key */}
        <div className="p-5 rounded-lg bg-[#092B2F] border border-[#C2532A]/50 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-[#C2532A]" />
              <h3 className="font-display text-lg text-[#F6F2EB]">
                Anthropic Claude API Connection
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#071F22] text-[#C2532A]">
              BYOK (Bring Your Own Key)
            </span>
          </div>

          <p className="text-xs text-[#F6F2EB]/70 leading-relaxed font-sans">
            Enter your personal Anthropic API key to unlock full live streaming with Claude 3.5 Sonnet.
            Your key is saved exclusively in your local workstation session and is never hardcoded.
          </p>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#F6F2EB]/70 mb-1">
              Claude API Key
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-[#F6F2EB]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="sk-ant-api03-..."
                value={formData.anthropicApiKey}
                onChange={(e) => setFormData({ ...formData, anthropicApiKey: e.target.value })}
                className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded pl-9 pr-3 py-2 text-xs font-mono text-[#F6F2EB] placeholder-[#F6F2EB]/30 focus:outline-none focus:border-[#C2532A]"
              />
            </div>
            <span className="text-[10px] text-[#F6F2EB]/50 font-mono mt-1 block">
              Leave blank to automatically use the high-fidelity built-in neural demo engine with 8 realistic destination databases.
            </span>
          </div>
        </div>

        {/* Section 2: Agency Legal & Tax Details */}
        <div className="p-5 rounded-lg bg-[#092B2F] border border-[#F6F2EB]/15 space-y-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-teal-400" />
            <h3 className="font-display text-lg text-[#F6F2EB]">
              Agency Accreditation & Billing Profile
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="block text-[#F6F2EB]/70 mb-1">Legal Company Name</label>
              <input
                type="text"
                value={formData.agencyName}
                onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
              />
            </div>

            <div>
              <label className="block text-[#F6F2EB]/70 mb-1">Company Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
              />
            </div>

            <div>
              <label className="block text-[#F6F2EB]/70 mb-1">GSTIN Number</label>
              <input
                type="text"
                value={formData.gstin}
                onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
              />
            </div>

            <div>
              <label className="block text-[#F6F2EB]/70 mb-1">IATA / Ministry Code</label>
              <input
                type="text"
                value={formData.iataNumber}
                onChange={(e) => setFormData({ ...formData, iataNumber: e.target.value })}
                className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[#F6F2EB]/70 mb-1">Registered Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
              />
            </div>

            <div>
              <label className="block text-[#F6F2EB]/70 mb-1">Headquarters City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
              />
            </div>

            <div>
              <label className="block text-[#F6F2EB]/70 mb-1">Concierge Hotline</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Bank & Settlement Accounts */}
        <div className="p-5 rounded-lg bg-[#092B2F] border border-[#F6F2EB]/15 space-y-4">
          <h3 className="font-display text-lg text-[#F6F2EB]">
            Bank Details for Client Invoices
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="block text-[#F6F2EB]/70 mb-1">Account Beneficiary Name</label>
              <input
                type="text"
                value={formData.bankAccountName}
                onChange={(e) => setFormData({ ...formData, bankAccountName: e.target.value })}
                className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
              />
            </div>

            <div>
              <label className="block text-[#F6F2EB]/70 mb-1">Account Number</label>
              <input
                type="text"
                value={formData.bankAccountNumber}
                onChange={(e) => setFormData({ ...formData, bankAccountNumber: e.target.value })}
                className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
              />
            </div>

            <div>
              <label className="block text-[#F6F2EB]/70 mb-1">IFSC Code</label>
              <input
                type="text"
                value={formData.bankIfsc}
                onChange={(e) => setFormData({ ...formData, bankIfsc: e.target.value })}
                className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
              />
            </div>

            <div>
              <label className="block text-[#F6F2EB]/70 mb-1">UPI ID for Quick Collect</label>
              <input
                type="text"
                value={formData.bankUpi}
                onChange={(e) => setFormData({ ...formData, bankUpi: e.target.value })}
                className="w-full bg-[#071F22] border border-[#F6F2EB]/20 rounded p-2 text-[#F6F2EB]"
              />
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="py-2.5 px-6 bg-[#C2532A] hover:bg-[#C2532A]/90 text-white font-mono text-xs uppercase tracking-wider rounded transition-colors shadow-lg"
          >
            Save Agency Settings
          </button>
        </div>
      </form>

      {/* Section 4: Data Management & Demo Reset */}
      <div className="p-5 rounded-lg bg-[#092B2F] border border-[#F6F2EB]/15 space-y-4">
        <h3 className="font-display text-lg text-[#F6F2EB]">
          Data Backup & Workspace Maintenance
        </h3>
        <p className="text-xs text-[#F6F2EB]/60">
          Download a full JSON database snapshot of your current 80+ bookings, leads, customers, and invoices, or reset to pristine default values.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={handleExportJson}
            className="py-2 px-4 rounded bg-[#071F22] hover:bg-[#16565C] border border-[#F6F2EB]/20 text-xs font-mono text-[#F6F2EB] flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-teal-400" />
            Download JSON Backup
          </button>

          <button
            type="button"
            onClick={() => setResetConfirmOpen(true)}
            className="py-2 px-4 rounded bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-xs font-mono text-red-300 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Fresh Demo Data (80+ Bookings)
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#092B2F] border border-red-500/40 rounded-lg p-6 max-w-md w-full space-y-4">
            <div className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-display text-lg text-[#F6F2EB]">
                Confirm Demo Data Reset
              </h3>
            </div>
            <p className="text-xs text-[#F6F2EB]/70 leading-relaxed">
              This will reseed your local workspace with the original 80+ realistic Indian bookings, 50+ CRM leads, 40+ customer dossiers, and 12 supplier contracts.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setResetConfirmOpen(false)}
                className="py-1.5 px-4 border border-[#F6F2EB]/20 rounded text-xs font-mono uppercase text-[#F6F2EB]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetData}
                className="py-1.5 px-4 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-mono uppercase"
              >
                Yes, Reset Workspace
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
