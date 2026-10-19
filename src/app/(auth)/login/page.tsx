"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<"password" | "magic-link">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [magicSent, setMagicSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please provide a valid private email.");
      return;
    }

    if (authMode === "password" && (!password || password.length < 6)) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    if (authMode === "magic-link") {
      setTimeout(() => {
        setLoading(false);
        setMagicSent(true);
      }, 700);
      return;
    }

    // Default simulation or live auth
    setTimeout(() => {
      setLoading(false);
      // Save session in local storage for demo fallback
      localStorage.setItem(
        "voyara_user",
        JSON.stringify({
          email,
          fullName: email.split("@")[0],
          tier: "voyager",
        })
      );
      router.push("/onboarding");
    }, 700);
  };

  const handleDemoSignIn = (tier: "elite" | "voyager") => {
    setLoading(true);
    const demoUser =
      tier === "elite"
        ? {
            email: "lord.vance@voyara.luxury",
            fullName: "Lord Julian Vance",
            tier: "elite",
          }
        : {
            email: "ananya.mehta@voyara.luxury",
            fullName: "Ananya Mehta",
            tier: "voyager",
          };

    localStorage.setItem("voyara_user", JSON.stringify(demoUser));
    setTimeout(() => {
      router.push("/onboarding");
    }, 500);
  };

  return (
    <div className="p-8 sm:p-10 rounded-none bg-surface/90 border border-gold/25 backdrop-blur-2xl shadow-2xl">
      {/* Header */}
      <div className="mb-8">
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-soft block mb-2">
          Member Portal
        </span>
        <h1 className="font-display text-3xl font-light text-ivory">
          Welcome to the Sanctum
        </h1>
        <p className="text-muted text-xs mt-1.5 font-light">
          Enter your credentials to access your private concierge.
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex border-b border-white/10 mb-6">
        <button
          type="button"
          onClick={() => {
            setAuthMode("password");
            setMagicSent(false);
            setError("");
          }}
          className={`pb-3 text-xs uppercase tracking-widest font-mono transition-colors relative ${
            authMode === "password"
              ? "text-gold font-semibold"
              : "text-muted hover:text-ivory"
          }`}
        >
          Password
          {authMode === "password" && (
            <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gold" />
          )}
        </button>
        <button
          type="button"
          onClick={() => {
            setAuthMode("magic-link");
            setMagicSent(false);
            setError("");
          }}
          className={`ml-6 pb-3 text-xs uppercase tracking-widest font-mono transition-colors relative ${
            authMode === "magic-link"
              ? "text-gold font-semibold"
              : "text-muted hover:text-ivory"
          }`}
        >
          Magic Link
          {authMode === "magic-link" && (
            <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gold" />
          )}
        </button>
      </div>

      {magicSent ? (
        <div className="p-6 bg-gold/10 border border-gold/30 rounded-none text-center space-y-3">
          <CheckCircle2 className="w-8 h-8 text-gold mx-auto" />
          <h3 className="font-display text-lg text-ivory">Dispatch Sent</h3>
          <p className="text-xs text-muted leading-relaxed">
            We have transmitted a secure login pass to{" "}
            <span className="text-gold-soft font-mono">{email}</span>. Click the
            pass in your inbox to enter immediately.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-950/40 border border-red-500/40 text-xs text-red-200">
              {error}
            </div>
          )}

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
                placeholder="vip@domain.luxury"
                className="w-full bg-transparent px-3 py-3 text-xs text-ivory placeholder:text-muted/50 focus:outline-none"
              />
            </div>
          </div>

          {/* Password (if password mode) */}
          {authMode === "password" && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] uppercase tracking-wider text-muted font-mono block">
                  Password
                </label>
                <Link
                  href="/reset-password"
                  className="text-[11px] text-gold-soft hover:underline font-mono"
                >
                  Forgot Passcode?
                </Link>
              </div>
              <div className="relative flex items-center border border-white/15 focus-within:border-gold bg-surface-elevated/80 transition-colors">
                <Lock className="w-4 h-4 text-gold/60 ml-3.5 flex-shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-transparent px-3 py-3 text-xs text-ivory placeholder:text-muted/50 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="mr-3 text-muted hover:text-ivory"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-2"
            disabled={loading}
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <span className="flex items-center gap-2">
                <span>
                  {authMode === "password" ? "Enter Sanctum" : "Transmit Magic Pass"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>
      )}

      {/* Demo Quick Access Sandbox */}
      <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted font-mono">
          <span>Instant Preview Access</span>
          <span className="text-gold-soft">Sandbox Mode</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => handleDemoSignIn("elite")}
            className="p-2.5 text-left border border-gold/30 hover:border-gold bg-surface-elevated hover:bg-gold/5 transition-colors group"
          >
            <div className="flex items-center gap-1.5 text-xs font-semibold text-ivory group-hover:text-gold">
              <Sparkles className="w-3 h-3 text-gold" />
              <span>Elite Member</span>
            </div>
            <p className="text-[10px] text-muted truncate mt-0.5">Lord Vance</p>
          </button>
          <button
            type="button"
            onClick={() => handleDemoSignIn("voyager")}
            className="p-2.5 text-left border border-white/15 hover:border-gold bg-surface-elevated hover:bg-gold/5 transition-colors group"
          >
            <div className="flex items-center gap-1.5 text-xs font-semibold text-ivory group-hover:text-gold">
              <Sparkles className="w-3 h-3 text-gold" />
              <span>Voyager Member</span>
            </div>
            <p className="text-[10px] text-muted truncate mt-0.5">Ananya Mehta</p>
          </button>
        </div>
      </div>

      {/* Footer Link */}
      <div className="mt-6 text-center text-xs text-muted">
        Don&apos;t hold a membership?{" "}
        <Link href="/signup" className="text-gold hover:underline font-mono">
          Sign Up for Access
        </Link>
      </div>
    </div>
  );
}
