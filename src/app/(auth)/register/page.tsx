"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Password strength calculation
  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getPasswordStrength();
  const strengthLabels = ["Too Short", "Moderate", "Strong", "Ultra-Secured"];
  const strengthColors = ["bg-red-500", "bg-amber-500", "bg-blue-400", "bg-emerald-400"];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim()) {
      setError("Please provide your full legal name.");
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
      setError("Please accept the private concierge privacy terms.");
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
          tier: "explorer",
        })
      );
      router.push("/onboarding");
    }, 700);
  };

  return (
    <div className="p-8 sm:p-10 rounded-none bg-surface/90 border border-gold/25 backdrop-blur-2xl shadow-2xl">
      <div className="mb-8">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-soft block mb-2">
          New Membership
        </span>
        <h1 className="font-display text-3xl font-light text-ivory">
          Request Sanctum Access
        </h1>
        <p className="text-muted text-xs mt-1.5 font-light">
          Join a bespoke circle of global wanderers.
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-950/40 border border-red-500/40 text-xs text-red-200">
            {error}
          </div>
        )}

        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-wider text-muted font-mono block">
            Full Name
          </label>
          <div className="relative flex items-center border border-white/15 focus-within:border-gold bg-surface-elevated/80 transition-colors">
            <User className="w-4 h-4 text-gold/60 ml-3.5 flex-shrink-0" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Julian Vance"
              className="w-full bg-transparent px-3 py-3 text-xs text-ivory placeholder:text-muted/50 focus:outline-none"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-wider text-muted font-mono block">
            Private Email
          </label>
          <div className="relative flex items-center border border-white/15 focus-within:border-gold bg-surface-elevated/80 transition-colors">
            <Mail className="w-4 h-4 text-gold/60 ml-3.5 flex-shrink-0" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="julian@domain.luxury"
              className="w-full bg-transparent px-3 py-3 text-xs text-ivory placeholder:text-muted/50 focus:outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-wider text-muted font-mono block">
            Master Passcode
          </label>
          <div className="relative flex items-center border border-white/15 focus-within:border-gold bg-surface-elevated/80 transition-colors">
            <Lock className="w-4 h-4 text-gold/60 ml-3.5 flex-shrink-0" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-transparent px-3 py-3 text-xs text-ivory placeholder:text-muted/50 focus:outline-none"
            />
          </div>

          {/* Password Strength Meter */}
          {password.length > 0 && (
            <div className="pt-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-muted mb-1">
                <span>Passcode Strength</span>
                <span className="text-ivory">{strengthLabels[strength - 1] || "Weak"}</span>
              </div>
              <div className="grid grid-cols-4 gap-1 h-1">
                {[0, 1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className={`h-full rounded-none transition-colors ${
                      idx < strength ? strengthColors[strength - 1] : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Privacy & DPDP Consent */}
        <div className="pt-2">
          <label className="flex items-start gap-2.5 text-xs text-muted cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 accent-[#C9A24B] rounded-none"
            />
            <span className="text-[11px] leading-relaxed">
              I consent to encrypted storage of my travel profile and preferences
              under India DPDP Act and GDPR compliance standards.
            </span>
          </label>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-4"
          disabled={loading}
        >
          {loading ? (
            <span>Creating Member Profile...</span>
          ) : (
            <span className="flex items-center gap-2">
              <span>Initiate Membership</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </Button>
      </form>

      <div className="mt-8 text-center text-xs text-muted">
        Already registered?{" "}
        <Link href="/login" className="text-gold hover:underline font-mono">
          Sign In
        </Link>
      </div>
    </div>
  );
}
