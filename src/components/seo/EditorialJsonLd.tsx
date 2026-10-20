import React from "react";
import {
  AGENCY_DETAILS,
  FAQ_ITEMS,
  CURATED_PACKAGES,
  FAQItem,
  PackageItem,
} from "@/features/agency/data/agencyData";

export function EditorialJsonLd() {
  const travelAgencySchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": "https://voyara.luxury/#agency",
    name: AGENCY_DETAILS.name,
    legalName: "Voyara Journeys Pvt. Ltd.",
    alternateName: "Voyara Luxury Travel",
    url: "https://voyara.luxury",
    logo: "https://voyara.luxury/logo.png",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=85",
    description:
      "Operational since 2012. Curators of bespoke private luxury travel for discerning families and couples across Kashmir, Switzerland, the Maldives, and Rajasthan.",
    telephone: AGENCY_DETAILS.phoneRaw,
    email: AGENCY_DETAILS.email,
    taxID: AGENCY_DETAILS.gstNumber,
    priceRange: "₹₹₹₹",
    currenciesAccepted: "INR, USD, EUR, CHF",
    paymentAccepted: "Wire Transfer, Credit Card, Escrow Account",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "One BKC, G Block, Bandra Kurla Complex",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        postalCode: "400051",
        addressCountry: "IN",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "The Oberoi Arcade, Dr. Zakir Hussain Marg",
        addressLocality: "New Delhi",
        addressRegion: "Delhi",
        postalCode: "110003",
        addressCountry: "IN",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.97",
      bestRating: "5.0",
      ratingCount: "340",
      reviewCount: "340",
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Accreditation",
        name: "IATA Accredited Agent",
        identifier: AGENCY_DETAILS.iataCode,
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Government Approval",
        name: "Ministry of Tourism Approved Tour Operator",
        identifier: AGENCY_DETAILS.ministryReg,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((faq: FAQItem) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://voyara.luxury",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Curated Journeys",
        item: "https://voyara.luxury/#packages",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Editorial Field Journal",
        item: "https://voyara.luxury/#journal",
      },
    ],
  };

  const tripsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Voyara Signature Journeys",
    itemListElement: CURATED_PACKAGES.map((pkg, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "TouristTrip",
        name: pkg.title,
        description: pkg.tagline,
        touristType: pkg.theme,
        offers: {
          "@type": "Offer",
          price: pkg.priceInr.replace(/[^\d]/g, ""),
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: `https://voyara.luxury/packages/${pkg.id}`,
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripsSchema) }}
      />
    </>
  );
}
