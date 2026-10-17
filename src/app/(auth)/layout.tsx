import React from "react";
import Link from "next/link";
import { Compass, ShieldCheck, Lock, Sparkles } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg text-ivory flex flex-col lg:flex-row relative overflow-hidden">
      {/* Left Ambience Column (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0A0D12] border-r border-gold/15 p-12 flex-col justify-between overflow-hidden">
        {/* Background Ambient Radial Glow */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-gold/15 via-blue-900/10 to-transparent blur-[140px] pointer-events-none" />

        {/* Decorative Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#C9A24B 1px, transparent 1px), linear-gradient(90deg, #C9A24B 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top Brand Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 w-fit group">
            <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center group-hover:border-gold transition-colors">
              <Compass className="w-4 h-4 text-gold" />
            </div>
            <span className="font-display text-2xl tracking-[0.25em] font-light text-ivory uppercase">
              Voyara
            </span>
          </Link>
        </div>

        {/* Center Quote / Luxury Vignette */}
        <div className="relative z-10 max-w-md my-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-soft font-mono">
              Private Concierge Sanctum
            </span>
          </div>
          <h2 className="font-display text-4xl xl:text-5xl font-light leading-tight text-ivory mb-6">
            The World&apos;s Most Refined Escapes, <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-soft to-gold">
              Secured & Curated.
            </span>
          </h2>
          <p className="text-muted text-sm leading-relaxed font-light">
            Access unlisted alpine chalets, private island charters, and our
            autonomous multi-tool travel intelligence.
          </p>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="relative z-10 flex items-center gap-6 text-xs text-muted-dark pt-8 border-t border-white/[0.08]">
          <span className="flex items-center gap-1.5 text-gold-soft/80">
            <ShieldCheck className="w-4 h-4 text-gold" /> 256-Bit Encrypted Vault
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-gold-soft/80">
            <Lock className="w-3.5 h-3.5 text-gold" /> GDPR & DPDP Compliant
          </span>
        </div>
      </div>

      {/* Right Column: Interactive Form Frame */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 relative z-10">
        {/* Mobile Header */}
        <div className="lg:hidden mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center">
              <Compass className="w-4 h-4 text-gold" />
            </div>
            <span className="font-display text-2xl tracking-[0.25em] font-light text-ivory uppercase">
              Voyara
            </span>
          </Link>
        </div>

        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
