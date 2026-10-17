"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Compass, ArrowRight, ShieldCheck, CheckCircle2, Lock } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubscribed(true);
  };

  return (
    <footer className="relative bg-surface/90 border-t border-gold/15 pt-20 pb-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center border border-gold/40 rounded-full">
                <Compass className="w-4 h-4 text-gold" />
              </div>
              <span className="font-display text-2xl tracking-[0.25em] font-light text-ivory uppercase">
                Voyara
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-sm">
              The premier AI-orchestrated travel concierge for private jet
              charters, superyachts, Michelin gastronomy, and bespoke escapes
              worldwide.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-dark mt-2">
              <span className="flex items-center gap-1.5 text-gold-soft/80">
                <ShieldCheck className="w-4 h-4 text-gold" /> India DPDP & GDPR Compliant
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-gold-soft/80">
                <Lock className="w-3.5 h-3.5 text-gold" /> 256-bit Vault Encryption
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-gold font-medium mb-4">
                Curations
              </h4>
              <ul className="space-y-2.5 text-xs tracking-wider text-muted">
                <li><a href="#destinations" className="hover:text-ivory transition-colors">St. Moritz</a></li>
                <li><a href="#destinations" className="hover:text-ivory transition-colors">Maldives</a></li>
                <li><a href="#destinations" className="hover:text-ivory transition-colors">Kyoto Private</a></li>
                <li><a href="#destinations" className="hover:text-ivory transition-colors">Amalfi Coast</a></li>
                <li><a href="#destinations" className="hover:text-ivory transition-colors">Dubai Skylines</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-gold font-medium mb-4">
                Platform
              </h4>
              <ul className="space-y-2.5 text-xs tracking-wider text-muted">
                <li><a href="#concierge" className="hover:text-ivory transition-colors">Agentic AI</a></li>
                <li><a href="#pricing" className="hover:text-ivory transition-colors">Membership</a></li>
                <li><Link href="/login" className="hover:text-ivory transition-colors">Member Portal</Link></li>
                <li><Link href="/onboarding" className="hover:text-ivory transition-colors">Travel DNA</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter / Private Dispatch */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold font-medium">
              Private Dispatch
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              Receive confidential dispatches on unlisted villas, private island
              openings, and curated culinary residencies.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-gold/10 border border-gold/30 rounded text-xs text-gold-soft">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Welcome to the circle. Your first dispatch is on its way.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center border border-gold/30 focus-within:border-gold rounded-none bg-surface-elevated/70 transition-colors">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="Enter your private email"
                    className="w-full bg-transparent px-4 py-3 text-xs text-ivory placeholder:text-muted/60 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-3 bg-gold text-bg hover:bg-gold-soft transition-colors text-xs font-semibold"
                    aria-label="Subscribe to private dispatch"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                {error && <p className="text-[11px] text-red-400">{error}</p>}
              </form>
            )}
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-muted">
          <div>
            © {new Date().getFullYear()} Voyara International Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gold transition-colors">
              Privacy Policy & DPDP
            </Link>
            <Link href="/terms" className="hover:text-gold transition-colors">
              Terms of Concierge
            </Link>
            <a href="#top" className="hover:text-gold transition-colors">
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
