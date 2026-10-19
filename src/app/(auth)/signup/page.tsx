"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, Phone, ArrowRight, ShieldCheck, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [voyageStyle, setVoyageStyle] = useState("Private Jet & Luxury Villas");
  const [consent, setConsent] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getPasswordStrength();
  const strengthLabels = ["Basic", "Moderate", "High-Security", "Sanctum Grade"];
  const strengthColors = ["bg-red-500", "bg-amber-500", "bg-[#C85A32]", "bg-emerald-400"];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim()) {
      setError("Please provide your full legal or preferred name.");
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please provide a valid private email.");
      return;
    }
    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }
    if (!consent) {
      setError("Please confirm compliance consent for encrypted profile storage.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      localStorage.setItem(
        "voyara_user",
        JSON.stringify({
          fullName,
          email,
          phone: phone || "+91 98200 86927",
          tier: "voyager",
          voyageStyle,
        })
      );
      router.push("/onboarding");
    }, 700);
  };

  const handleSandboxBypass = () => {
    setLoading(true);
    localStorage.setItem(
      "voyara_user",
      JSON.stringify({
        fullName: "Lord Julian Vance",
        email: "lord.vance@voyara.luxury",
        phone: "+91 98200 86927",
        tier: "elite",
        voyageStyle: "Private Jet & Luxury Villas",
      })
    );
    setTimeout(() => {
      router.push("/onboarding");
    }, 400);
  };

  return (
    <div className="p-8 sm:p-10 rounded-none bg-[#071F22]/95 border border-terracotta/30 backdrop-blur-2xl shadow-2xl space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-none bg-terracotta/15 border border-terracotta/40 text-[10px] font-mono uppercase text-terracotta-soft mb-2.5">
          <Sparkles className="w-3 h-3 text-terracotta" />
          Bespoke Travel Membership
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-light text-sand">
          Create Your Private Profile
        </h1>
        <p className="text-sand/70 text-xs mt-1.5 font-light leading-relaxed">
          Gain direct access to private jet lounges, Michelin culinary reservations, and our autonomous AI concierge.
        </p>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-950/50 border border-red-500/50 text-xs text-red-200">
            {error}
          </div>
        )}

        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-wider text-sand/80 font-mono block">
            Full Legal / Preferred Name
          </label>
          <div className="relative flex items-center border border-teal-soft/40 focus-within:border-terracotta bg-[#092A2D]/80 transition-colors">
            <User className="w-4 h-4 text-terracotta ml-3.5 flex-shrink-0" />
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Maharani Gayatri Devi"
              className="w-full bg-transparent px-3 py-3 text-xs text-sand placeholder:text-sand/40 focus:outline-none"
            />
          </div>
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-sand/80 font-mono block">
              Private Email
            </label>
            <div className="relative flex items-center border border-teal-soft/40 focus-within:border-terracotta bg-[#092A2D]/80 transition-colors">
              <Mail className="w-4 h-4 text-terracotta ml-3.5 flex-shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vip@domain.luxury"
                className="w-full bg-transparent px-3 py-3 text-xs text-sand placeholder:text-sand/40 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-sand/80 font-mono block">
              WhatsApp / Mobile
            </label>
            <div className="relative flex items-center border border-teal-soft/40 focus-within:border-terracotta bg-[#092A2D]/80 transition-colors">
              <Phone className="w-4 h-4 text-terracotta ml-3.5 flex-shrink-0" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98200 86927"
                className="w-full bg-transparent px-3 py-3 text-xs text-sand placeholder:text-sand/40 focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Master Passcode */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-wider text-sand/80 font-mono block">
            Master Passcode
          </label>
          <div className="relative flex items-center border border-teal-soft/40 focus-within:border-terracotta bg-[#092A2D]/80 transition-colors">
            <Lock className="w-4 h-4 text-terracotta ml-3.5 flex-shrink-0" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full bg-transparent px-3 py-3 text-xs text-sand placeholder:text-sand/40 focus:outline-none"
            />
          </div>

          {password.length > 0 && (
            <div className="pt-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-sand/70 mb-1">
                <span>Vault Encryption Strength</span>
                <span className="text-terracotta font-medium">
                  {strengthLabels[strength - 1] || "Basic"}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1 h-1">
                {[0, 1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className={`h-full transition-colors ${
                      idx < strength ? strengthColors[strength - 1] : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Preferred Voyage Style */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-wider text-sand/80 font-mono block">
            Primary Travel Focus
          </label>
          <select
            value={voyageStyle}
            onChange={(e) => setVoyageStyle(e.target.value)}
            className="w-full bg-[#092A2D] border border-teal-soft/40 px-3 py-2.5 text-xs text-sand focus:border-terracotta outline-none font-mono"
          >
            <option value="Private Jet & Luxury Villas">Private Jet & Luxury Villas (St. Moritz / Swiss Alps)</option>
            <option value="5-Star Family Escapes">5-Star Family Escapes (Kashmir / Pahalgam Chateaus)</option>
            <option value="Honeymoon & Romantic Sanctums">Honeymoon & Romantic Sanctums (Maldives Water Villas)</option>
            <option value="Royal Heritage & Palaces">Royal Heritage & Palaces (Rajasthan Private Estates)</option>
          </select>
        </div>

        {/* Privacy & DPDP Act Consent */}
        <div className="pt-2">
          <label className="flex items-start gap-2.5 text-xs text-sand/70 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 accent-[#C85A32]"
            />
            <span className="text-[11px] leading-relaxed">
              I consent to encrypted storage of my travel profile and dietary preferences
              under India DPDP Act 2023 and GDPR privacy standards.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-4 bg-terracotta hover:bg-terracotta-soft text-white font-mono font-semibold"
          disabled={loading}
        >
          {loading ? (
            <span>Securing Member Access...</span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span>Create Sanctum Account</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </Button>
      </form>

      {/* 1-Click Sandbox Bypass for Instant Demonstration */}
      <div className="pt-4 border-t border-teal-soft/30 flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-widest text-sand/60">
          Developer & Tastemaker Sandbox
        </span>
        <button
          type="button"
          onClick={handleSandboxBypass}
          className="text-xs font-mono text-terracotta hover:text-terracotta-soft flex items-center gap-1 transition-colors"
        >
          <Sparkles className="w-3 h-3" />
          <span>1-Click Instant Pass</span>
        </button>
      </div>

      {/* Footer Switch to Sign In */}
      <div className="text-center text-xs text-sand/70 pt-2">
        Already registered?{" "}
        <Link href="/login" className="text-terracotta hover:underline font-mono font-medium">
          Sign In to Your Sanctum
        </Link>
      </div>
    </div>
  );
}
