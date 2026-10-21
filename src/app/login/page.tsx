"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Compass, ShieldCheck, ArrowRight, Lock, Eye, EyeOff, Mail, AlertTriangle, KeyRound } from "lucide-react";
import { useAuth } from "@/lib/authContext";
import { Role } from "@/types/travel";

export default function LoginPage() {
  const router = useRouter();
  const { login, demoLogin, failedAttempts, lockoutRemainingSec } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      router.push("/app");
    } else {
      setError(result.error || "Login failed");
    }
  };

  const handleDemoSelect = (role: Role) => {
    demoLogin(role);
  };

  return (
    <div className="min-h-screen bg-[#071F22] text-[#F6F2EB] flex flex-col lg:flex-row">
      {/* Left Column: Editorial Showcase */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#092B2F] p-12 flex-col justify-between overflow-hidden border-r border-[#F6F2EB]/10">
        <div className="absolute inset-0 z-0 opacity-35">
          <img
            src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=85"
            alt="Gulmarg Kashmir"
            className="w-full h-full object-cover grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071F22] via-[#071F22]/70 to-[#071F22]/40" />
        </div>

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#C2532A] flex items-center justify-center bg-[#071F22]">
              <Compass className="w-4 h-4 text-[#C2532A]" />
            </div>
            <span className="font-display tracking-[0.2em] uppercase text-xl font-light">Voyara</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6F2EB]/10 border border-[#F6F2EB]/20 text-xs font-mono uppercase tracking-wider text-[#C2532A]">
            <ShieldCheck className="w-3.5 h-3.5" />
            Licensed Travel Agency Terminal
          </div>
          <h2 className="font-display text-3xl xl:text-4xl leading-tight font-light">
            Welcome back to your agency cockpit.
          </h2>
          <p className="text-sm text-[#F6F2EB]/70 leading-relaxed font-sans">
            Monitor client pipeline velocity, dispatch GST vouchers, review outstanding receivables, and generate AI itineraries.
          </p>

          {/* Quick Demo Credentials Card */}
          <div className="p-4 rounded bg-[#071F22]/90 border border-[#C2532A]/40 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#C2532A]">
              <span className="flex items-center gap-1.5 font-medium">
                <KeyRound className="w-3.5 h-3.5" /> Quick 1-Click Demo Login
              </span>
              <span className="text-[10px] text-[#F6F2EB]/40">Password: Voyara@2026</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemoSelect("Owner")}
                className="py-2 px-2 bg-[#0E353A] hover:bg-[#16565C] border border-[#F6F2EB]/15 rounded text-[11px] font-mono text-center transition-colors text-[#F6F2EB]"
              >
                Owner
                <span className="block text-[9px] text-[#F6F2EB]/50">Vikram M.</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoSelect("Agent")}
                className="py-2 px-2 bg-[#0E353A] hover:bg-[#16565C] border border-[#F6F2EB]/15 rounded text-[11px] font-mono text-center transition-colors text-[#F6F2EB]"
              >
                Agent
                <span className="block text-[9px] text-[#F6F2EB]/50">Ananya D.</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoSelect("Accountant")}
                className="py-2 px-2 bg-[#0E353A] hover:bg-[#16565C] border border-[#F6F2EB]/15 rounded text-[11px] font-mono text-center transition-colors text-[#F6F2EB]"
              >
                Accountant
                <span className="block text-[9px] text-[#F6F2EB]/50">Rameshwar CA</span>
              </button>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-[#F6F2EB]/40 font-mono">
          GSTIN: 07AAACV4891M1Z8 • IATA: 14-3 9284 2
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left space-y-2">
            <h1 className="font-display text-3xl font-light text-[#F6F2EB]">Sign in to Voyara</h1>
            <p className="text-xs text-[#F6F2EB]/60 font-sans">
              Enter your agency credentials to access your workspace.
            </p>
          </div>

          {/* Rate Limit Warning Banner */}
          {lockoutRemainingSec > 0 && (
            <div className="p-4 rounded bg-red-950/80 border border-red-500 text-red-200 text-xs space-y-1">
              <div className="flex items-center gap-2 font-medium">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                Security Lockout Active
              </div>
              <p>
                Too many failed login attempts. Please wait{" "}
                <span className="font-mono font-bold text-white">{lockoutRemainingSec} seconds</span>{" "}
                before trying again, or use the 1-Click Demo buttons.
              </p>
            </div>
          )}

          {error && lockoutRemainingSec === 0 && (
            <div className="p-3 rounded bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#F6F2EB]/75 mb-1.5">
                Agency Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#F6F2EB]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="vikram@voyara.travel"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0B2A2E] border border-[#F6F2EB]/15 rounded px-9 py-2.5 text-sm text-[#F6F2EB] placeholder-[#F6F2EB]/30 focus:outline-none focus:border-[#C2532A]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#F6F2EB]/75">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs text-[#C2532A] hover:underline font-sans"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#F6F2EB]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0B2A2E] border border-[#F6F2EB]/15 rounded pl-9 pr-10 py-2.5 text-sm text-[#F6F2EB] placeholder-[#F6F2EB]/30 focus:outline-none focus:border-[#C2532A]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F6F2EB]/40 hover:text-[#F6F2EB]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-[#F6F2EB]/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#C2532A] rounded"
                />
                Remember this workstation for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || lockoutRemainingSec > 0}
              className="w-full py-3 bg-[#C2532A] hover:bg-[#C2532A]/90 disabled:opacity-50 text-white font-mono text-xs uppercase tracking-[0.15em] font-medium rounded transition-colors flex items-center justify-center gap-2 mt-4 shadow-lg"
            >
              {loading ? "Authenticating..." : "Sign In to Terminal"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Buttons for Mobile View */}
          <div className="lg:hidden p-4 rounded bg-[#092B2F] border border-[#F6F2EB]/15 space-y-2">
            <span className="block text-xs font-mono text-[#C2532A] text-center">
              Quick 1-Click Demo Login
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemoSelect("Owner")}
                className="py-1.5 px-2 bg-[#0E353A] border border-[#F6F2EB]/15 rounded text-[10px] font-mono text-center"
              >
                Owner
              </button>
              <button
                type="button"
                onClick={() => handleDemoSelect("Agent")}
                className="py-1.5 px-2 bg-[#0E353A] border border-[#F6F2EB]/15 rounded text-[10px] font-mono text-center"
              >
                Agent
              </button>
              <button
                type="button"
                onClick={() => handleDemoSelect("Accountant")}
                className="py-1.5 px-2 bg-[#0E353A] border border-[#F6F2EB]/15 rounded text-[10px] font-mono text-center"
              >
                Accountant
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-[#F6F2EB]/60 font-sans">
            Need an agency account?{" "}
            <Link href="/signup" className="text-[#C2532A] hover:underline font-medium">
              Start free trial
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#092B2F] border border-[#F6F2EB]/20 rounded-lg p-6 max-w-md w-full space-y-4">
            <h3 className="font-display text-xl text-[#F6F2EB]">Reset Agency Password</h3>
            <p className="text-xs text-[#F6F2EB]/70">
              Enter your registered agency email address to receive password reset instructions.
            </p>

            {resetSent ? (
              <div className="p-4 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs space-y-2">
                <p>A secure password reset link has been dispatched to <strong>{resetEmail}</strong>.</p>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(false);
                    setResetSent(false);
                  }}
                  className="w-full py-2 bg-emerald-600 text-white rounded font-mono text-xs uppercase"
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (resetEmail) setResetSent(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#F6F2EB]/75 mb-1.5">
                    Registered Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="agent@agency.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full bg-[#0B2A2E] border border-[#F6F2EB]/20 rounded px-3 py-2 text-sm text-[#F6F2EB] focus:outline-none focus:border-[#C2532A]"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="flex-1 py-2 border border-[#F6F2EB]/20 text-[#F6F2EB] rounded text-xs font-mono uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-[#C2532A] text-white rounded text-xs font-mono uppercase"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
