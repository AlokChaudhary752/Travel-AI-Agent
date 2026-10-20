"use client";

import React from "react";
import Link from "next/link";
import { Compass, ShieldCheck, Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";
import { AGENCY_DETAILS } from "@/features/agency/data/agencyData";

export function Footer() {
  return (
    <footer className="bg-[#05181A] border-t border-teal-soft/40 text-sand pt-16 pb-12 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Agency Identity & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 w-fit">
              <div className="w-8 h-8 flex items-center justify-center border border-terracotta rounded-full bg-[#092A2D]">
                <Compass className="w-4 h-4 text-terracotta" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl tracking-[0.2em] font-light text-sand uppercase">
                  Voyara
                </span>
                <span className="text-[9px] font-mono tracking-[0.25em] text-sand/60 uppercase">
                  Journeys
                </span>
              </div>
            </Link>

            <p className="text-sand/70 text-xs sm:text-sm font-light leading-relaxed max-w-sm font-sans">
              Curators of bespoke private travel for discerning families and couples. Operational since 2012 across Kashmir, Switzerland, the Maldives, and Rajasthan.
            </p>

            <div className="space-y-1 text-xs font-mono text-sand/80 pt-2">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-terracotta" />
                <a href={`tel:${AGENCY_DETAILS.phoneRaw}`} className="hover:text-terracotta transition-colors">
                  {AGENCY_DETAILS.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-terracotta" />
                <a href={`mailto:${AGENCY_DETAILS.email}`} className="hover:text-terracotta transition-colors">
                  {AGENCY_DETAILS.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <a
                  href={AGENCY_DETAILS.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors"
                >
                  Direct WhatsApp Concierge
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Signature Destinations */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-terracotta font-semibold block">
              Destinations
            </span>
            <ul className="space-y-2 text-xs font-sans text-sand/75">
              <li>
                <a href="#destinations" className="hover:text-sand transition-colors">
                  Kashmir & Gulmarg Heli-Ski
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-sand transition-colors">
                  Swiss Alps & St. Moritz
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-sand transition-colors">
                  Maldives Overwater Sanctuaries
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-sand transition-colors">
                  Royal Rajasthan Palaces
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-sand transition-colors">
                  Kingdom of Bhutan
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Curated Packages */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-terracotta font-semibold block">
              Curated Portfolios
            </span>
            <ul className="space-y-2 text-xs font-sans text-sand/75">
              <li>
                <a href="#packages" className="hover:text-sand transition-colors">
                  Honeymoons & Romance
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-sand transition-colors">
                  Luxury Family Escapes
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-sand transition-colors">
                  Alpine Ski & Adventure
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-sand transition-colors">
                  Royal Heritage Circuits
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-sand transition-colors">
                  Why Travel With Voyara
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-sand transition-colors font-mono">
                  Travel Advisory & FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Private Client Offices */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-terracotta font-semibold block">
              Private Offices
            </span>
            <div className="space-y-3 text-xs text-sand/70 font-sans">
              <div>
                <strong className="text-sand block font-medium">Mumbai Desk:</strong>
                <span>{AGENCY_DETAILS.offices[0].address}</span>
              </div>
              <div>
                <strong className="text-sand block font-medium">New Delhi Desk:</strong>
                <span>{AGENCY_DETAILS.offices[1].address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Accreditations & Trust Bar */}
        <div className="pt-8 border-t border-teal-soft/30 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-sand/70">
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-sand">
              <ShieldCheck className="w-4 h-4 text-terracotta" />
              IATA Code: {AGENCY_DETAILS.iataCode}
            </span>
            <span>•</span>
            <span>Ministry of Tourism: {AGENCY_DETAILS.ministryReg}</span>
            <span>•</span>
            <span>GSTIN: {AGENCY_DETAILS.gstNumber}</span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <Link href="/privacy" className="hover:text-sand transition-colors">
              DPDP Act 2023 & GDPR Notice
            </Link>
            <Link href="/terms" className="hover:text-sand transition-colors">
              Terms & Safeguards
            </Link>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-4 border-t border-teal-soft/20 text-center text-[10px] font-mono text-sand/50">
          © {new Date().getFullYear()} {AGENCY_DETAILS.name} Pvt. Ltd. All rights reserved. Handcrafted for discerning travelers.
        </div>
      </div>
    </footer>
  );
}
