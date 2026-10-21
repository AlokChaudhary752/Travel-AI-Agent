"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Compass, ShieldCheck, ArrowRight, CheckCircle2, Lock, Eye, EyeOff, Building2, User, Mail, Phone } from "lucide-react";
import { useAuth } from "@/lib/authContext";

export default function SignUpPage() {
  const router = useRouter();
  const { signup, verifyOtp } = useAuth();

  const [step, setStep] = useState<"form" | "otp">("form");
  const [formData, setFormData] = useState({
    name: "",
    agency: "",
    email: "",
    phone: "",
    password: "",
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score += 25;
    if (/[A-Z]/.test(pass)) score += 25;
    if (/[0-9]/.test(pass)) score += 25;
    if (/[^A-Za-z0-9]/.test(pass)) score += 25;
    return score;
  };

  const strength = getPasswordStrength(formData.password);
  const getStrengthLabel = () => {
    if (strength <= 25) return { label: "Weak", color: "bg-red-500", text: "text-red-400" };
    if (strength <= 50) return { label: "Fair", color: "bg-amber-500", text: "text-amber-400" };
    if (strength <= 75) return { label: "Good", color: "bg-teal-400", text: "text-teal-400" };
    return { label: "Strong (Ready)", color: "bg-emerald-400", text: "text-emerald-400" };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.agency || !formData.email || !formData.phone || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!formData.agreeTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);
    try {
      await signup(formData);
      setStep("otp");
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      setError("Please enter the 6-digit verification code sent to your email.");
      return;
    }
    const success = verifyOtp(otp);
    if (success) {
      router.push("/onboarding");
    } else {
      setError("Invalid code. Enter 849201 or any 6 digits for instant demo verification.");
    }
  };

  return (
    <div className="min-h-screen bg-[#071F22] text-[#F6F2EB] flex flex-col lg:flex-row">
      {/* Left Column: Editorial Showcase */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#092B2F] p-12 flex-col justify-between overflow-hidden border-r border-[#F6F2EB]/10">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1400&q=85"
            alt="Udaipur Palace"
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
            B2B Agency Operating System
          </div>
          <h2 className="font-display text-3xl xl:text-4xl leading-tight font-light">
            Engineered for high-volume, bespoke travel agencies in India.
          </h2>
          <p className="text-sm text-[#F6F2EB]/70 leading-relaxed font-sans">
            Itinerary generation in seconds, live GST 5% invoicing, supplier cost and margin calculators, and automated client WhatsApp concierge.
          </p>

          <div className="pt-4 border-t border-[#F6F2EB]/15 flex items-center gap-6 text-xs text-[#F6F2EB]/60">
            <div>
              <span className="block font-mono text-base font-medium text-[#F6F2EB]">₹85+ Cr</span>
              Curated Itineraries
            </div>
            <div className="w-px h-8 bg-[#F6F2EB]/15" />
            <div>
              <span className="block font-mono text-base font-medium text-[#F6F2EB]">350+</span>
              Indian Agencies
            </div>
            <div className="w-px h-8 bg-[#F6F2EB]/15" />
            <div>
              <span className="block font-mono text-base font-medium text-[#F6F2EB]">100%</span>
              GST SAC 998555 Ready
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-[#F6F2EB]/40 font-mono">
          Two Horizon Center, Golf Course Road, DLF Phase 5, Gurugram
        </div>
      </div>

      {/* Right Column: Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left space-y-2">
            <h1 className="font-display text-3xl font-light text-[#F6F2EB]">Create your agency account</h1>
            <p className="text-xs text-[#F6F2EB]/60 font-sans">
              Start your 14-day full agency trial. No credit card required.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              {error}
            </div>
          )}

          {step === "form" ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#F6F2EB]/75 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#F6F2EB]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Malhotra"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0B2A2E] border border-[#F6F2EB]/15 rounded px-9 py-2.5 text-sm text-[#F6F2EB] placeholder-[#F6F2EB]/30 focus:outline-none focus:border-[#C2532A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#F6F2EB]/75 mb-1.5">
                  Travel Agency Name
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-[#F6F2EB]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nirvana Luxury Holidays"
                    value={formData.agency}
                    onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
                    className="w-full bg-[#0B2A2E] border border-[#F6F2EB]/15 rounded px-9 py-2.5 text-sm text-[#F6F2EB] placeholder-[#F6F2EB]/30 focus:outline-none focus:border-[#C2532A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#F6F2EB]/75 mb-1.5">
                    Official Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#F6F2EB]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="vikram@agency.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#0B2A2E] border border-[#F6F2EB]/15 rounded px-9 py-2.5 text-sm text-[#F6F2EB] placeholder-[#F6F2EB]/30 focus:outline-none focus:border-[#C2532A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#F6F2EB]/75 mb-1.5">
                    Phone (+91)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#F6F2EB]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98110 44291"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#0B2A2E] border border-[#F6F2EB]/15 rounded px-9 py-2.5 text-sm text-[#F6F2EB] placeholder-[#F6F2EB]/30 focus:outline-none focus:border-[#C2532A]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#F6F2EB]/75 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#F6F2EB]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="At least 8 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

                {/* Password strength meter */}
                {formData.password.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <div className="h-1 w-full bg-[#F6F2EB]/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${getStrengthLabel().color}`}
                        style={{ width: `${strength}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-[#F6F2EB]/50">Strength:</span>
                      <span className={getStrengthLabel().text}>{getStrengthLabel().label}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="mt-1 accent-[#C2532A] rounded"
                />
                <label htmlFor="agreeTerms" className="text-xs text-[#F6F2EB]/70 leading-snug">
                  I agree to the{" "}
                  <Link href="/terms" className="text-[#C2532A] underline underline-offset-2">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[#C2532A] underline underline-offset-2">
                    Privacy Policy
                  </Link>{" "}
                  under the Indian DPDP Act 2023.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#C2532A] hover:bg-[#C2532A]/90 text-white font-mono text-xs uppercase tracking-[0.15em] font-medium rounded transition-colors flex items-center justify-center gap-2 mt-4 shadow-lg"
              >
                {loading ? "Processing..." : "Create Agency Account"}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="relative py-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#F6F2EB]/15" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#071F22] px-2 text-[#F6F2EB]/50 font-mono text-[10px]">
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setFormData({
                    name: "Vikram Malhotra",
                    agency: "Voyara Journeys New Delhi",
                    email: "vikram@voyara.travel",
                    phone: "+91 98110 44291",
                    password: "Password@1234",
                    agreeTerms: true,
                  });
                  setStep("otp");
                }}
                className="w-full py-2.5 bg-[#0B2A2E] hover:bg-[#0E353A] border border-[#F6F2EB]/15 text-[#F6F2EB] font-sans text-xs rounded transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Continue with Google
              </button>
            </form>
          ) : (
            /* OTP Verification Screen */
            <form onSubmit={handleOtpVerify} className="space-y-6">
              <div className="p-4 rounded bg-[#092B2F] border border-[#F6F2EB]/15 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#C2532A]/20 border border-[#C2532A] mx-auto flex items-center justify-center text-[#C2532A]">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg text-[#F6F2EB]">Verify your agency email</h3>
                <p className="text-xs text-[#F6F2EB]/70">
                  We sent a 6-digit verification code to{" "}
                  <span className="font-mono text-[#F6F2EB]">{formData.email}</span>.
                </p>
                <p className="text-[11px] font-mono text-[#C2532A]">
                  (Quick Demo: enter <strong>849201</strong> or any 6 digits)
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#F6F2EB]/75 mb-2 text-center">
                  6-Digit Verification Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="849201"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-[#0B2A2E] border border-[#F6F2EB]/20 rounded py-3 text-center text-2xl font-mono tracking-[0.4em] text-[#F6F2EB] placeholder-[#F6F2EB]/20 focus:outline-none focus:border-[#C2532A]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#C2532A] hover:bg-[#C2532A]/90 text-white font-mono text-xs uppercase tracking-[0.15em] font-medium rounded transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                Verify & Enter Onboarding
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setStep("form")}
                className="w-full text-center text-xs text-[#F6F2EB]/60 hover:text-[#F6F2EB] font-mono"
              >
                ← Back to registration form
              </button>
            </form>
          )}

          <div className="text-center text-xs text-[#F6F2EB]/60 font-sans">
            Already have an agency account?{" "}
            <Link href="/login" className="text-[#C2532A] hover:underline font-medium">
              Log in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
