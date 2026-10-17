"use client";

import React, { useState } from "react";
import { Plane, Building2, CloudSun, ShieldCheck, Check, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface FlightOffer {
  id: string;
  airline: string;
  flightNumber: string;
  cabin: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  currency: string;
  availability: string;
  lieFlatBed?: boolean;
}

export interface HotelProperty {
  id: string;
  name: string;
  rating: number;
  tier: string;
  roomCategory: string;
  nightlyRate: number;
  currency: string;
  amenities: string[];
  gastronomy: string;
  dietarySupport?: string[];
  cancellation: string;
}

export function FlightResultCard({
  offer,
  onBook,
}: {
  offer: FlightOffer;
  onBook: (offer: FlightOffer) => void;
}) {
  return (
    <div className="p-5 rounded-none bg-surface/90 border border-gold/30 hover:border-gold/60 transition-all duration-300 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center">
            <Plane className="w-3.5 h-3.5 text-gold" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-ivory tracking-wide">
              {offer.airline}
            </h4>
            <span className="text-[10px] text-muted font-mono">
              Flight {offer.flightNumber} • {offer.cabin}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-gold font-mono tabular-nums">
            {offer.currency === "INR" ? "₹" : "$"}
            {offer.price.toLocaleString()}
          </div>
          <span className="text-[10px] text-muted-dark font-mono block">
            Guaranteed GDS Fare
          </span>
        </div>
      </div>

      {/* Flight Timeline */}
      <div className="flex items-center justify-between text-xs py-1">
        <div>
          <span className="font-mono text-sm text-ivory font-bold">{offer.origin}</span>
          <span className="text-[11px] text-muted block">{offer.departureTime}</span>
        </div>
        <div className="flex flex-col items-center px-4">
          <span className="text-[10px] text-gold-soft font-mono">{offer.duration}</span>
          <div className="w-24 h-px bg-gold/40 relative my-1">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold" />
          </div>
          <span className="text-[9px] text-muted uppercase">Direct Charter</span>
        </div>
        <div className="text-right">
          <span className="font-mono text-sm text-ivory font-bold">{offer.destination}</span>
          <span className="text-[11px] text-muted block">{offer.arrivalTime}</span>
        </div>
      </div>

      {/* Perks & Amenities */}
      <div className="flex items-center gap-3 text-[10px] text-muted font-mono pt-2 border-t border-white/5">
        <span className="text-gold-soft flex items-center gap-1">
          <Check className="w-3 h-3 text-gold" /> Lie-Flat Suite
        </span>
        <span>•</span>
        <span>VIP Tarmac Chauffeur</span>
        <span>•</span>
        <span className="text-emerald-400">{offer.availability}</span>
      </div>

      {/* Action */}
      <Button
        variant="primary"
        size="sm"
        className="w-full mt-2"
        onClick={() => onBook(offer)}
      >
        <Sparkles className="w-3.5 h-3.5 mr-1.5" />
        Hold Suite with Disruption Shield
      </Button>
    </div>
  );
}

export function HotelResultCard({
  hotel,
  onReserve,
}: {
  hotel: HotelProperty;
  onReserve: (hotel: HotelProperty) => void;
}) {
  return (
    <div className="p-5 rounded-none bg-surface/90 border border-gold/30 hover:border-gold/60 transition-all duration-300 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between pb-3 border-b border-white/10">
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Building2 className="w-3.5 h-3.5 text-gold" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-ivory tracking-wide">
              {hotel.name}
            </h4>
            <span className="text-[10px] text-gold-soft font-mono">
              {hotel.tier} • 5-Star Luxury
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-gold font-mono tabular-nums">
            ${hotel.nightlyRate.toLocaleString()}
          </div>
          <span className="text-[10px] text-muted-dark font-mono block">/ night</span>
        </div>
      </div>

      {/* Suite Details */}
      <div className="text-xs text-ivory/90 leading-snug">
        <span className="text-[10px] text-muted font-mono block mb-0.5 uppercase tracking-wider">
          Reserved Category:
        </span>
        {hotel.roomCategory}
      </div>

      {/* Gastronomy & Dietary Accreditation */}
      <div className="p-2.5 bg-surface-elevated/70 border border-white/5 space-y-1 text-[11px]">
        <div className="text-gold-soft font-medium">✦ {hotel.gastronomy}</div>
        {hotel.dietarySupport && (
          <div className="text-muted text-[10px] flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            <span>Verified: {hotel.dietarySupport.join(" • ")}</span>
          </div>
        )}
      </div>

      {/* Action */}
      <Button
        variant="primary"
        size="sm"
        className="w-full"
        onClick={() => onReserve(hotel)}
      >
        <Sparkles className="w-3.5 h-3.5 mr-1.5" />
        Reserve Sanctuary
      </Button>
    </div>
  );
}

export function WeatherResultCard({
  weather,
}: {
  weather: { location: string; forecast: Array<{ date: string; condition: string; tempDay: string; tempNight: string; advisory?: string }> };
}) {
  return (
    <div className="p-4 rounded-none bg-surface/80 border border-gold/20 shadow-md space-y-3">
      <div className="flex items-center justify-between text-xs font-mono text-gold-soft">
        <span className="flex items-center gap-1.5 uppercase tracking-wider">
          <CloudSun className="w-4 h-4 text-gold" /> Weather Telemetry — {weather.location}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs">
        {weather.forecast.map((f, i) => (
          <div key={i} className="p-2.5 bg-surface-elevated/60 border border-white/5">
            <span className="text-[10px] font-mono text-muted block">{f.date}</span>
            <div className="text-sm font-semibold text-ivory mt-0.5">{f.tempDay}</div>
            <span className="text-[11px] text-gold-soft">{f.condition}</span>
          </div>
        ))}
      </div>
      {weather.forecast[0]?.advisory && (
        <p className="text-[10px] text-muted font-mono border-t border-white/5 pt-2">
          Advisory: {weather.forecast[0].advisory}
        </p>
      )}
    </div>
  );
}

export function BookingConfirmModal({
  isOpen,
  title,
  subtitle,
  price,
  currency,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  title: string;
  subtitle: string;
  price: string;
  currency: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-surface-elevated border border-gold/40 shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-ivory"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-gold" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-gold-soft">
            Explicit Authorization Guardrail
          </span>
        </div>

        <h3 className="font-display text-2xl font-light text-ivory mb-2">
          {title}
        </h3>
        <p className="text-xs text-muted leading-relaxed mb-6 font-light">
          {subtitle}
        </p>

        <div className="p-4 bg-bg border border-white/10 mb-6 flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-widest text-muted">
            Total Investment
          </span>
          <span className="font-mono text-base font-bold text-gold tabular-nums">
            {currency} {price}
          </span>
        </div>

        {confirmed ? (
          <div className="p-4 bg-gold/15 border border-gold text-center text-xs text-gold-soft font-mono">
            ✓ Reservation Transmitted to VIP Aviation / Sanctuary Desk.
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="md" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              className="flex-1"
              onClick={() => {
                setConfirmed(true);
                setTimeout(() => {
                  onConfirm();
                  onClose();
                }, 800);
              }}
            >
              Authorize Reservation
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
