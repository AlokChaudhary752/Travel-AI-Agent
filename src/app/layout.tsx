import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/custom-cursor";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#07090D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Voyara | Private Jet Lounge for Bespoke Luxury Travel",
  description:
    "Curated by artificial intelligence, perfected by human tastemakers. Seamless, ultra-personalized travel itineraries across private jets, luxury villas, and bespoke experiences.",
  keywords: [
    "luxury travel",
    "AI travel concierge",
    "private jet charter",
    "bespoke itineraries",
    "luxury villa rental",
    "Voyara",
  ],
  authors: [{ name: "Voyara International Ltd." }],
  openGraph: {
    title: "Voyara — The Art of Effortless Luxury Travel",
    description:
      "Transforming travel dreams into bookable bespoke itineraries in under 60 seconds with an agentic AI concierge.",
    url: "https://voyara.luxury",
    siteName: "Voyara Luxury Concierge",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&h=630&q=85",
        width: 1200,
        height: 630,
        alt: "Voyara Luxury Travel Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Voyara — Private AI Travel Concierge",
    description: "Ultra-luxury personalized travel engineered by agentic AI.",
    images: ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&h=630&q=85"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Voyara Luxury Concierge",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&h=630&q=85",
    description: "Ultra-luxury bespoke travel concierge powered by artificial intelligence.",
    url: "https://voyara.luxury",
    telephone: "+91-800-VOYARA",
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressLocality: "Mumbai",
    },
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${plusJakarta.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="bg-bg text-ivory antialiased selection:bg-gold selection:text-bg">
        <div className="film-grain" aria-hidden="true" />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
