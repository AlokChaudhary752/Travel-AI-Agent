import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata = {
  title: "Terms of Concierge | Voyara Luxury Platform",
  description: "Terms and conditions governing Voyara AI concierge memberships and booking warranties.",
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-6 md:px-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-gold-soft hover:underline font-mono mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Return to Concierge
      </Link>

      <div className="border-b border-white/10 pb-8 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 mb-3">
          <Shield className="w-3.5 h-3.5 text-gold" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold-soft font-mono">
            Membership Agreement
          </span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-light text-ivory">
          Terms of Concierge
        </h1>
        <p className="text-muted text-xs font-mono mt-2">
          Effective Date: October 2026 • Version 1.2-PROD
        </p>
      </div>

      <div className="space-y-8 text-xs text-muted leading-relaxed font-light">
        <section className="space-y-3">
          <h2 className="font-display text-xl text-ivory font-normal">
            1. The Concierge Relationship
          </h2>
          <p>
            Voyara provides autonomous agentic curation, itinerary synchronization,
            and luxury booking mediation. While our AI queries live GDS systems in
            real-time to eliminate hallucinated pricing, formal reservations remain
            subject to operating airline tariffs and property house rules.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl text-ivory font-normal">
            2. Autonomous Booking Confirmation Safeguard
          </h2>
          <p>
            The agentic AI concierge is strictly prevented from executing financial
            transactions or binding reservations without your explicit biometric,
            passcode, or UI button confirmation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl text-ivory font-normal">
            3. Disruption Shield & Auto-Rebooking
          </h2>
          <p>
            For Voyager and Elite members, Voyara actively monitors live ADS-B flight
            telemetry. In the event of a delay or cancellation exceeding 90 minutes,
            our engine generates alternative routing options for one-click traveler
            approval.
          </p>
        </section>
      </div>
    </div>
  );
}
