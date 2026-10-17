"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 700);
  };

  return (
    <div className="p-8 sm:p-10 rounded-none bg-surface/90 border border-gold/25 backdrop-blur-2xl shadow-2xl">
      <div className="mb-8">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs text-gold-soft hover:underline font-mono mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Portal
        </Link>
        <h1 className="font-display text-3xl font-light text-ivory">
          Passcode Reset
        </h1>
        <p className="text-muted text-xs mt-1.5 font-light">
          Enter your registered private email to receive recovery instructions.
        </p>
      </div>

      {sent ? (
        <div className="p-6 bg-gold/10 border border-gold/30 rounded-none text-center space-y-3">
          <CheckCircle2 className="w-8 h-8 text-gold mx-auto" />
          <h3 className="font-display text-lg text-ivory">Recovery Dispatched</h3>
          <p className="text-xs text-muted leading-relaxed">
            If an account is associated with{" "}
            <span className="text-gold-soft font-mono">{email}</span>, a secure
            reset link has been delivered.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
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
                required
                className="w-full bg-transparent px-3 py-3 text-xs text-ivory placeholder:text-muted/50 focus:outline-none"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-4"
            disabled={loading}
          >
            {loading ? (
              <span>Dispatching...</span>
            ) : (
              <span className="flex items-center gap-2">
                <span>Send Reset Pass</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
