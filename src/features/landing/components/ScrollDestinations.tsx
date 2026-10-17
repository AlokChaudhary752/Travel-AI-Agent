"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowUpRight, SunMedium, Compass } from "lucide-react";

interface DestinationItem {
  id: string;
  name: string;
  country: string;
  tagline: string;
  category: string;
  season: string;
  temp: string;
  startingPrice: string;
  imageUrl: string;
}

const destinations: DestinationItem[] = [
  {
    id: "maldives",
    name: "North Malé Atoll",
    country: "Maldives",
    tagline: "Private Overwater Pavilions & Yacht Reef Transfers",
    category: "Island Sanctuary",
    season: "Nov – Apr",
    temp: "29°C",
    startingPrice: "$3,800 / night",
    imageUrl:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "swiss-alps",
    name: "St. Moritz & Zermatt",
    country: "Switzerland",
    tagline: "Ski-in Ski-out Chalets with Private Michelin Masters",
    category: "Alpine Luxury",
    season: "Dec – Mar",
    temp: "-4°C",
    startingPrice: "$5,200 / night",
    imageUrl:
      "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "dubai",
    name: "Palm Jumeirah",
    country: "United Arab Emirates",
    tagline: "Penthouse Suites & Superyacht Sundowners",
    category: "Urban Splendor",
    season: "Oct – Apr",
    temp: "27°C",
    startingPrice: "$2,600 / night",
    imageUrl:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "kerala",
    name: "Kumarakom & Alleppey",
    country: "India",
    tagline: "Ultra-Luxury Solar Houseboats & Ayurvedic Retreats",
    category: "Serene Heritage",
    season: "Sep – Mar",
    temp: "28°C",
    startingPrice: "₹1,45,000 / night",
    imageUrl:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "santorini",
    name: "Oia Cliffside",
    country: "Greece",
    tagline: "Cave Villas with Infinity Pools Suspended Over Caldera",
    category: "Mediterranean Bliss",
    season: "May – Oct",
    temp: "26°C",
    startingPrice: "€2,900 / night",
    imageUrl:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "kyoto",
    name: "Arashiyama & Gion",
    country: "Japan",
    tagline: "Centuries-Old Ryokans with Private Onsen & Tea Masters",
    category: "Cultural Zen",
    season: "Mar – May / Oct – Nov",
    temp: "18°C",
    startingPrice: "¥420,000 / night",
    imageUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
  },
];

function TiltCard({ item }: { item: DestinationItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = -((y - centerY) / centerY) * 10;
    const rotY = ((x - centerX) / centerX) * 10;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className="group relative h-[480px] rounded-none overflow-hidden border border-white/10 hover:border-gold/50 transition-colors duration-500 bg-surface"
    >
      {/* Background Image with Parallax Zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-95 filter brightness-75"
        />
        {/* Luxury Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090D] via-[#07090D]/50 to-transparent" />
      </div>

      {/* Top Details Pill */}
      <div className="absolute top-5 inset-x-5 flex items-center justify-between z-10">
        <span className="text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-bg/70 backdrop-blur-md border border-gold/30 text-gold-soft font-mono">
          {item.category}
        </span>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-bg/70 backdrop-blur-md border border-white/10 text-[11px] text-ivory">
          <SunMedium className="w-3.5 h-3.5 text-gold" />
          <span>{item.temp}</span>
        </div>
      </div>

      {/* Bottom Content Card */}
      <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex flex-col gap-2">
        <div className="text-xs uppercase tracking-widest text-gold-soft font-mono">
          {item.country}
        </div>
        <h3 className="font-display text-2xl font-light text-ivory group-hover:text-gold-soft transition-colors duration-300">
          {item.name}
        </h3>
        <p className="text-xs text-muted leading-relaxed line-clamp-2">
          {item.tagline}
        </p>

        <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-2">
          <div>
            <span className="text-[10px] uppercase text-muted tracking-widest block">
              Starting From
            </span>
            <span className="text-sm font-semibold text-ivory tabular-nums font-mono">
              {item.startingPrice}
            </span>
          </div>
          <Link
            href={`/onboarding?destination=${encodeURIComponent(item.name)}`}
            className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center bg-bg/80 group-hover:bg-gold group-hover:border-gold transition-colors duration-300"
            aria-label={`Plan escape to ${item.name}`}
          >
            <ArrowUpRight className="w-4 h-4 text-gold group-hover:text-bg transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ScrollDestinations() {
  return (
    <section id="destinations" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 mb-3">
              <Compass className="w-3.5 h-3.5 text-gold" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-soft font-mono">
                Curated Sanctums
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-light text-ivory">
              Destinations of Pure Distinction
            </h2>
          </div>
          <p className="text-muted text-sm max-w-md font-light leading-relaxed">
            Hand-inspected sanctuaries paired with VIP tarmac transfers,
            guaranteed early check-ins, and bespoke concierge access.
          </p>
        </div>

        {/* 3D Tilt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((item) => (
            <TiltCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
