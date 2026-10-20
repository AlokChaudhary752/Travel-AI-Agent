import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  CURATED_PACKAGES,
  AGENCY_DETAILS,
  SAMPLE_ITINERARY_DAYS,
  PackageItem,
} from "@/features/agency/data/agencyData";
import { PackageDetailClient } from "./PackageDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CURATED_PACKAGES.map((pkg) => ({
    slug: pkg.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = CURATED_PACKAGES.find((p) => p.id === slug);

  if (!pkg) {
    return {
      title: "Journey Not Found | Voyara Luxury Journeys",
    };
  }

  return {
    title: `${pkg.title} | Voyara Bespoke Luxury`,
    description: `${pkg.tagline} Starting at ${pkg.priceInr} ${pkg.pricePer}. Operational since 2012 with 24/7 private concierge care.`,
    openGraph: {
      title: `${pkg.title} — Voyara Journeys`,
      description: pkg.tagline,
      images: [
        {
          url: pkg.image,
          width: 1200,
          height: 630,
          alt: pkg.title,
        },
      ],
    },
  };
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;
  const pkg = CURATED_PACKAGES.find((p) => p.id === slug);

  if (!pkg) {
    notFound();
  }

  const similarTrips = CURATED_PACKAGES.filter((p) => p.id !== pkg.id).slice(0, 3);

  // Generate TouristTrip JSON-LD Schema
  const tripSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.title,
    description: pkg.tagline,
    touristType: pkg.theme,
    itinerary: {
      "@type": "ItemList",
      numberOfItems: SAMPLE_ITINERARY_DAYS.length,
      itemListElement: SAMPLE_ITINERARY_DAYS.map((day, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "TouristDestination",
          name: day.title,
          description: day.highlights.join(". "),
        },
      })),
    },
    offers: {
      "@type": "Offer",
      price: pkg.priceInr.replace(/[^\d]/g, ""),
      priceCurrency: "INR",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      url: `https://voyara.luxury/packages/${pkg.id}`,
    },
    provider: {
      "@type": "TravelAgency",
      name: AGENCY_DETAILS.name,
      telephone: AGENCY_DETAILS.phoneRaw,
      url: "https://voyara.luxury",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }}
      />
      <PackageDetailClient pkg={pkg} similarTrips={similarTrips} />
    </>
  );
}
