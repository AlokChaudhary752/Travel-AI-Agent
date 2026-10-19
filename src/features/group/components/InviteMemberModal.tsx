"use client";

import React, { useState } from "react";
import { UserPlus, Copy, Check, X, Shield, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGroupStore } from "../store/useGroupStore";
import { MemberRole } from "../types";

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InviteMemberModal({ isOpen, onClose }: InviteMemberModalProps) {
  const { tripShareCode, inviteMember } = useGroupStore();
  const [copied, setCopied] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<MemberRole>("Companion");
  const [dietary, setDietary] = useState("Vegetarian");
  const [seat, setSeat] = useState("Aisle / Lie-Flat");

  if (!isOpen) return null;

  const inviteLink = `https://voyara.vip/join/${tripShareCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    inviteMember({
      name,
      email: email || `${name.toLowerCase().replace(/\s+/g, ".")}@privatemail.com`,
      role,
      dietaryProtocol: dietary,
      seatingPreference: seat,
      avatar: "",
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
            Private Access Invitation
          </span>
          <h3 className="font-display text-2xl text-ivory font-light mt-0.5">
            Invite Accompanying Companion
          </h3>
          <p className="text-muted text-xs font-light mt-1">
            Companions receive real-time updates, itinerary voting rights, and automated diet synchronization with hospitality providers.
          </p>
        </div>

        {/* Copy Quick Link */}
        <div className="p-3.5 bg-surface border border-gold/25 space-y-2">
          <span className="text-[10px] font-mono uppercase text-muted block">
            Direct Private Access Passcode Link
          </span>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={inviteLink}
              className="w-full bg-[#070E12] border border-white/10 px-3 py-1.5 text-xs font-mono text-gold-soft select-all outline-none"
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              className="flex-shrink-0 font-mono text-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1" />
                  Copy Link
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Or direct invite by details */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-mono uppercase text-muted block mb-1">
                Full Legal / Preferred Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Maharani Gayatri Devi"
                className="w-full bg-surface border border-white/10 px-3 py-2 text-xs text-ivory focus:border-gold outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-muted block mb-1">
                Sanctum Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as MemberRole)}
                className="w-full bg-surface border border-white/10 px-2 py-2 text-xs text-ivory focus:border-gold outline-none font-mono"
              >
                <option value="Co-Host">Co-Host (Full Edit Privileges)</option>
                <option value="Companion">Companion (Vote & View)</option>
                <option value="Viewer">Viewer (Read Only)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase text-muted block mb-1">
              Private Contact / Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="companion@privatevault.com"
              className="w-full bg-surface border border-white/10 px-3 py-2 text-xs text-ivory focus:border-gold outline-none font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-mono uppercase text-muted block mb-1">
                Dietary Protocol
              </label>
              <input
                type="text"
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                placeholder="Strict Jain, Lacto-Veg, Halal..."
                className="w-full bg-surface border border-white/10 px-3 py-2 text-xs text-ivory focus:border-gold outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-muted block mb-1">
                Seat Preference
              </label>
              <input
                type="text"
                value={seat}
                onChange={(e) => setSeat(e.target.value)}
                placeholder="Lie-Flat Window, Upper Deck..."
                className="w-full bg-surface border border-white/10 px-3 py-2 text-xs text-ivory focus:border-gold outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Issue Official Pass
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
