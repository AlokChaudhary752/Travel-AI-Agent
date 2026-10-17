"use client";

import React, { useState } from "react";
import { CinematicLoader } from "@/features/landing/components/CinematicLoader";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { ScrollDestinations } from "@/features/landing/components/ScrollDestinations";
import { HowItWorks } from "@/features/landing/components/HowItWorks";
import { AIConciergeDemo } from "@/features/landing/components/AIConciergeDemo";
import { SocialProof } from "@/features/landing/components/SocialProof";
import { PricingTiers } from "@/features/landing/components/PricingTiers";
import { FinalCTA } from "@/features/landing/components/FinalCTA";

export default function LandingPage() {
  const [loaderComplete, setLoaderComplete] = useState(false);

  React.useEffect(() => {
    const safety = setTimeout(() => {
      setLoaderComplete(true);
    }, 1500);
    return () => clearTimeout(safety);
  }, []);

  return (
    <>
      {!loaderComplete && (
        <CinematicLoader onComplete={() => setLoaderComplete(true)} />
      )}
      <div
        className={`transition-opacity duration-700 ${
          loaderComplete ? "opacity-100" : "opacity-90"
        }`}
      >
        <HeroSection />
        <ScrollDestinations />
        <HowItWorks />
        <AIConciergeDemo />
        <SocialProof />
        <PricingTiers />
        <FinalCTA />
      </div>
    </>
  );
}
