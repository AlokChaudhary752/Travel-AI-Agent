import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, FileText, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy & DPDP Compliance | Voyara Luxury Concierge",
  description:
    "Comprehensive privacy notice adhering to India Digital Personal Data Protection (DPDP) Act 2023 and European Union General Data Protection Regulation (GDPR).",
};

export default function PrivacyPage() {
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
          <ShieldCheck className="w-3.5 h-3.5 text-gold" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold-soft font-mono">
            Legal & Regulatory Safeguards
          </span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-light text-ivory">
          Privacy Policy & DPDP Charter
        </h1>
        <p className="text-muted text-xs font-mono mt-2">
          Effective Date: October 2026 • Version 1.4-PROD
        </p>
      </div>

      <div className="space-y-8 text-xs text-muted leading-relaxed font-light">
        <section className="space-y-3">
          <h2 className="font-display text-xl text-ivory font-normal">
            1. Regulatory Philosophy & Jurisdiction
          </h2>
          <p>
            Voyara operates with the utmost discretion. This privacy framework
            strictly adheres to the{" "}
            <strong className="text-ivory">
              Digital Personal Data Protection (DPDP) Act 2023 of India
            </strong>{" "}
            and the{" "}
            <strong className="text-ivory">
              European Union General Data Protection Regulation (GDPR)
            </strong>
            . We collect only what is strictly required to orchestrate private aviation,
            luxury sanctuaries, and curated gastronomic experiences.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl text-ivory font-normal">
            2. Categories of Data Collected
          </h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong className="text-ivory">Identity Data:</strong> Legal passport
              name, contact numbers, and sovereign residency.
            </li>
            <li>
              <strong className="text-ivory">Travel DNA & Preferences:</strong> Dietary
              tenets (Jain, vegetarian, vegan, halal), pacing, companion profiles, and
              curation aesthetics.
            </li>
            <li>
              <strong className="text-ivory">Logistical Credentials:</strong> Departure
              airports, visa statuses, and encrypted airline/hotel loyalty tiers.
            </li>
            <li>
              <strong className="text-ivory">Vector Memories:</strong> Semantic summaries
              of your past itineraries and preferences for autonomous AI agent continuity.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl text-ivory font-normal">
            3. Client-Side AES-256 Vault Encryption
          </h2>
          <p>
            All sensitive travel credentials (e.g., passport numbers, national identity
            tokens) are encrypted at rest with AES-256 GCM encryption. Third-party GDS
            and hotel providers only receive cryptographically signed reservation
            tokens necessary to guarantee booking fulfillment.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl text-ivory font-normal">
            4. Your Sovereign Rights (DPDP & GDPR)
          </h2>
          <p>At any moment, Voyara members possess the unquestioned rights to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong className="text-ivory">Right to Access:</strong> Export your
              complete itinerary history and memory vectors in JSON format.
            </li>
            <li>
              <strong className="text-ivory">Right to Correction:</strong> Update dietary
              or lifestyle preferences instantly via your profile dashboard.
            </li>
            <li>
              <strong className="text-ivory">Right to Erasure (&ldquo;Forget Me&rdquo;):</strong> Permanent
              destruction of all database rows, vaulted documents, and vector embeddings.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl text-ivory font-normal">
            5. Data Protection Officer (DPO) Contact
          </h2>
          <p>
            For privacy inquiries or formal data erasure requests, please transmit a
            secure communication to our appointed Data Protection Officer at:{" "}
            <span className="text-gold-soft font-mono">dpo@voyara.luxury</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
