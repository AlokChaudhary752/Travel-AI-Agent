"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Compass, CheckCircle2, Building2, Users, Database, ArrowRight, ArrowLeft, Upload, Shield } from "lucide-react";
import { useAgencyStore } from "@/lib/store";

export default function OnboardingPage() {
  const router = useRouter();
  const { settings, updateSettings, resetDemoData } = useAgencyStore();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [profileData, setProfileData] = useState({
    agencyName: settings.agencyName || "Voyara Journeys Private Limited",
    gstin: settings.gstin || "07AAACV4891M1Z8",
    iataNumber: settings.iataNumber || "14-3 9284 2",
    city: settings.city || "New Delhi, India",
    currency: "INR (₹)",
    defaultGstPct: 5,
  });

  const [teamInvites, setTeamInvites] = useState([
    { name: "Ananya Deshmukh", email: "ananya@agency.com", role: "Agent" },
    { name: "Rameshwar Iyer, CA", email: "accounts@agency.com", role: "Accountant" },
  ]);
  const [newInvite, setNewInvite] = useState({ name: "", email: "", role: "Agent" });

  const [dataChoice, setDataChoice] = useState<"seed" | "empty">("seed");

  const handleAddInvite = () => {
    if (newInvite.name && newInvite.email) {
      setTeamInvites([...teamInvites, { ...newInvite }]);
      setNewInvite({ name: "", email: "", role: "Agent" });
    }
  };

  const handleFinish = () => {
    updateSettings({
      agencyName: profileData.agencyName,
      gstin: profileData.gstin,
      iataNumber: profileData.iataNumber,
      city: profileData.city,
      gstRatePct: profileData.defaultGstPct,
    });

    if (dataChoice === "seed") {
      resetDemoData(); // Load 80+ bookings, 50+ leads, 40+ customers
    }
    router.push("/app");
  };

  return (
    <div className="min-h-screen bg-[#071F22] text-[#F6F2EB] flex flex-col justify-between p-6 sm:p-12">
      {/* Top Header */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between border-b border-[#F6F2EB]/10 pb-6">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#C2532A] flex items-center justify-center bg-[#092B2F]">
            <Compass className="w-4 h-4 text-[#C2532A]" />
          </div>
          <span className="font-display tracking-[0.2em] uppercase text-xl font-light">Voyara</span>
        </Link>
        <div className="text-xs font-mono text-[#F6F2EB]/60">
          Agency Setup Wizard • Step {currentStep} of 3
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-2xl mx-auto w-full py-8 space-y-8">
        {/* Progress Tracker */}
        <div className="grid grid-cols-3 gap-2 border-b border-[#F6F2EB]/10 pb-4">
          <div
            className={`flex items-center gap-2 text-xs font-mono ${
              currentStep >= 1 ? "text-[#C2532A]" : "text-[#F6F2EB]/40"
            }`}
          >
            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-[10px]">
              1
            </span>
            <span>Agency Profile</span>
          </div>
          <div
            className={`flex items-center gap-2 text-xs font-mono ${
              currentStep >= 2 ? "text-[#C2532A]" : "text-[#F6F2EB]/40"
            }`}
          >
            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-[10px]">
              2
            </span>
            <span>Team & Roles</span>
          </div>
          <div
            className={`flex items-center gap-2 text-xs font-mono ${
              currentStep >= 3 ? "text-[#C2532A]" : "text-[#F6F2EB]/40"
            }`}
          >
            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-[10px]">
              3
            </span>
            <span>Sample Data</span>
          </div>
        </div>

        {/* Step 1: Agency Profile */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-display text-2xl font-light">Configure your agency details</h2>
              <p className="text-xs text-[#F6F2EB]/60">
                These credentials will appear on all client quotations, GST invoices, and e-ticket vouchers.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#F6F2EB]/75 mb-1">
                  Registered Agency Legal Name
                </label>
                <input
                  type="text"
                  value={profileData.agencyName}
                  onChange={(e) => setProfileData({ ...profileData, agencyName: e.target.value })}
                  className="w-full bg-[#0B2A2E] border border-[#F6F2EB]/15 rounded px-3 py-2 text-sm text-[#F6F2EB] focus:outline-none focus:border-[#C2532A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#F6F2EB]/75 mb-1">
                    GSTIN Number (15 Digits)
                  </label>
                  <input
                    type="text"
                    value={profileData.gstin}
                    onChange={(e) => setProfileData({ ...profileData, gstin: e.target.value })}
                    className="w-full bg-[#0B2A2E] border border-[#F6F2EB]/15 rounded px-3 py-2 text-sm font-mono text-[#F6F2EB] focus:outline-none focus:border-[#C2532A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#F6F2EB]/75 mb-1">
                    IATA / Ministry of Tourism Code
                  </label>
                  <input
                    type="text"
                    value={profileData.iataNumber}
                    onChange={(e) => setProfileData({ ...profileData, iataNumber: e.target.value })}
                    className="w-full bg-[#0B2A2E] border border-[#F6F2EB]/15 rounded px-3 py-2 text-sm font-mono text-[#F6F2EB] focus:outline-none focus:border-[#C2532A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#F6F2EB]/75 mb-1">
                    Headquarters City
                  </label>
                  <input
                    type="text"
                    value={profileData.city}
                    onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                    className="w-full bg-[#0B2A2E] border border-[#F6F2EB]/15 rounded px-3 py-2 text-sm text-[#F6F2EB] focus:outline-none focus:border-[#C2532A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#F6F2EB]/75 mb-1">
                    Base Currency & Tax Rule
                  </label>
                  <input
                    type="text"
                    disabled
                    value="INR (₹) • 5% GST (SAC 998555)"
                    className="w-full bg-[#092225] border border-[#F6F2EB]/10 rounded px-3 py-2 text-sm text-[#F6F2EB]/50 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="py-2.5 px-6 bg-[#C2532A] hover:bg-[#C2532A]/90 text-white font-mono text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-2"
              >
                Continue to Team Setup
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Team Invite */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-display text-2xl font-light">Invite your agency team</h2>
              <p className="text-xs text-[#F6F2EB]/60">
                Grant role-based access to your travel designers and accounting team.
              </p>
            </div>

            {/* Existing team roster */}
            <div className="space-y-2 border border-[#F6F2EB]/15 rounded p-4 bg-[#092B2F]">
              <div className="text-xs font-mono uppercase text-[#F6F2EB]/50 tracking-wider">
                Current Team Roster
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-[#071F22]">
                <div>
                  <div className="text-sm font-medium text-[#F6F2EB]">Vikram Malhotra (You)</div>
                  <div className="text-xs text-[#F6F2EB]/50">vikram@voyara.travel</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#C2532A]/20 text-[#C2532A] border border-[#C2532A]/40 text-xs font-mono uppercase">
                  Owner
                </span>
              </div>

              {teamInvites.map((invite, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded bg-[#071F22]">
                  <div>
                    <div className="text-sm font-medium text-[#F6F2EB]">{invite.name}</div>
                    <div className="text-xs text-[#F6F2EB]/50">{invite.email}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#F6F2EB]/10 text-[#F6F2EB]/80 text-xs font-mono uppercase">
                    {invite.role}
                  </span>
                </div>
              ))}
            </div>

            {/* Add new invite */}
            <div className="p-4 border border-dashed border-[#F6F2EB]/20 rounded space-y-3">
              <div className="text-xs font-mono uppercase text-[#F6F2EB]/70 tracking-wider">
                Add Team Member
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newInvite.name}
                  onChange={(e) => setNewInvite({ ...newInvite, name: e.target.value })}
                  className="bg-[#0B2A2E] border border-[#F6F2EB]/15 rounded px-2.5 py-1.5 text-xs text-[#F6F2EB] focus:outline-none focus:border-[#C2532A]"
                />
                <input
                  type="email"
                  placeholder="email@agency.com"
                  value={newInvite.email}
                  onChange={(e) => setNewInvite({ ...newInvite, email: e.target.value })}
                  className="bg-[#0B2A2E] border border-[#F6F2EB]/15 rounded px-2.5 py-1.5 text-xs text-[#F6F2EB] focus:outline-none focus:border-[#C2532A]"
                />
                <select
                  value={newInvite.role}
                  onChange={(e) => setNewInvite({ ...newInvite, role: e.target.value as any })}
                  className="bg-[#0B2A2E] border border-[#F6F2EB]/15 rounded px-2 py-1.5 text-xs text-[#F6F2EB] focus:outline-none focus:border-[#C2532A]"
                >
                  <option value="Agent">Travel Agent</option>
                  <option value="Accountant">Accountant</option>
                  <option value="Owner">Co-Owner</option>
                </select>
              </div>
              <button
                type="button"
                onClick={handleAddInvite}
                className="py-1.5 px-3 bg-[#0B2A2E] hover:bg-[#16565C] border border-[#F6F2EB]/20 text-xs font-mono rounded text-[#F6F2EB]"
              >
                + Add Member
              </button>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="py-2.5 px-4 border border-[#F6F2EB]/20 text-xs font-mono uppercase rounded text-[#F6F2EB] flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="py-2.5 px-6 bg-[#C2532A] hover:bg-[#C2532A]/90 text-white font-mono text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-2"
              >
                Continue to Sample Data
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Import Sample Data or Start Empty */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-display text-2xl font-light">Workspace Initialization</h2>
              <p className="text-xs text-[#F6F2EB]/60">
                Choose how you want to seed your Voyara travel agency terminal.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option A: Realistic Demo Dataset */}
              <div
                onClick={() => setDataChoice("seed")}
                className={`p-5 rounded border cursor-pointer transition-all space-y-3 ${
                  dataChoice === "seed"
                    ? "bg-[#0B2A2E] border-[#C2532A] ring-1 ring-[#C2532A]"
                    : "bg-[#092B2F] border-[#F6F2EB]/15 hover:border-[#F6F2EB]/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded bg-[#C2532A]/20 flex items-center justify-center text-[#C2532A]">
                    <Database className="w-4 h-4" />
                  </div>
                  {dataChoice === "seed" && <CheckCircle2 className="w-4 h-4 text-[#C2532A]" />}
                </div>
                <div>
                  <h3 className="font-display text-base text-[#F6F2EB]">
                    Seed Comprehensive Demo Data
                  </h3>
                  <span className="text-[10px] font-mono text-[#C2532A] uppercase">
                    (Recommended for Evaluation)
                  </span>
                </div>
                <ul className="text-xs text-[#F6F2EB]/70 space-y-1">
                  <li>• <strong>80+ Bookings</strong> (Kashmir, Rajasthan, Bali, Dubai)</li>
                  <li>• <strong>50+ Leads CRM</strong> with scores & follow-ups</li>
                  <li>• <strong>40+ Customers</strong> with spend & anniversary data</li>
                  <li>• <strong>15+ Packages</strong> with supplier margin analysis</li>
                  <li>• <strong>GST 5% Invoices</strong> & Aging breakdown</li>
                </ul>
              </div>

              {/* Option B: Clean Slate */}
              <div
                onClick={() => setDataChoice("empty")}
                className={`p-5 rounded border cursor-pointer transition-all space-y-3 ${
                  dataChoice === "empty"
                    ? "bg-[#0B2A2E] border-[#C2532A] ring-1 ring-[#C2532A]"
                    : "bg-[#092B2F] border-[#F6F2EB]/15 hover:border-[#F6F2EB]/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded bg-[#F6F2EB]/10 flex items-center justify-center text-[#F6F2EB]">
                    <Building2 className="w-4 h-4" />
                  </div>
                  {dataChoice === "empty" && <CheckCircle2 className="w-4 h-4 text-[#C2532A]" />}
                </div>
                <div>
                  <h3 className="font-display text-base text-[#F6F2EB]">Start Fresh (Empty)</h3>
                  <span className="text-[10px] font-mono text-[#F6F2EB]/50 uppercase">
                    Clean Production Slate
                  </span>
                </div>
                <p className="text-xs text-[#F6F2EB]/70 leading-relaxed">
                  Start with zero bookings and manually create your itineraries, client CRM pipelines, and custom vendor contracts.
                </p>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="py-2.5 px-4 border border-[#F6F2EB]/20 text-xs font-mono uppercase rounded text-[#F6F2EB] flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                type="button"
                onClick={handleFinish}
                className="py-3 px-8 bg-[#C2532A] hover:bg-[#C2532A]/90 text-white font-mono text-xs uppercase tracking-[0.15em] font-medium rounded transition-colors flex items-center gap-2 shadow-xl"
              >
                Launch Agency Cockpit
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto w-full text-center text-xs text-[#F6F2EB]/40 font-mono pt-6 border-t border-[#F6F2EB]/10">
        Voyara B2B Agency OS • All data stored in isolated workspace session
      </div>
    </div>
  );
}
