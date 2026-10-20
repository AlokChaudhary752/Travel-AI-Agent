"use client";

import React, { useState } from "react";
import { AgencyHero } from "@/features/agency/components/AgencyHero";
import { TrustStrip } from "@/features/agency/components/TrustStrip";
import { FeaturedDestinations } from "@/features/agency/components/FeaturedDestinations";
import { CuratedPackages } from "@/features/agency/components/CuratedPackages";
import { WhyTravelWithUs } from "@/features/agency/components/WhyTravelWithUs";
import { HowItWorksProcess } from "@/features/agency/components/HowItWorksProcess";
import { RealTestimonials } from "@/features/agency/components/RealTestimonials";
import { SampleItineraryTimeline } from "@/features/agency/components/SampleItineraryTimeline";
import { EditorialJournal } from "@/features/agency/components/EditorialJournal";
import { FAQAccordion } from "@/features/agency/components/FAQAccordion";
import { FinalEnquiryBand } from "@/features/agency/components/FinalEnquiryBand";
import { EnquiryModal } from "@/features/agency/components/EnquiryModal";
import { RefundCancellationModal } from "@/features/agency/components/RefundCancellationModal";
import { ExpertCallbackModal } from "@/features/agency/components/ExpertCallbackModal";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { EditorialJsonLd } from "@/components/seo/EditorialJsonLd";

export default function AgencyHomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [callbackModalOpen, setCallbackModalOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState<string | undefined>(undefined);
  const [selectedPkg, setSelectedPkg] = useState<string | undefined>(undefined);

  const handleOpenEnquiry = (destination?: string, packageTitle?: string) => {
    setSelectedDest(destination);
    setSelectedPkg(packageTitle);
    setModalOpen(true);
  };

  return (
    <div className="bg-[#071F22] text-sand antialiased min-h-screen flex flex-col">
      {/* Search Engine Rich Snippet Structured Data (JSON-LD) */}
      <EditorialJsonLd />

      {/* 1. Hero Section */}
      <AgencyHero onOpenEnquiry={handleOpenEnquiry} />

      {/* 2. Trust Strip */}
      <TrustStrip />

      {/* 3. Featured Destinations (Editorial Asymmetric Grid) */}
      <FeaturedDestinations onOpenEnquiry={handleOpenEnquiry} />

      {/* 4. Curated Packages (Filterable without full-page reloads) */}
      <CuratedPackages onOpenEnquiry={handleOpenEnquiry} />

      {/* 5. "Why Travel With Us" (Concrete specifics) */}
      <section id="why-us">
        <WhyTravelWithUs />
      </section>

      {/* 6. How It Works (3-Step Editorial Process) */}
      <HowItWorksProcess onOpenEnquiry={() => handleOpenEnquiry()} />

      {/* 7. Real Testimonials (Verified client stories) */}
      <RealTestimonials />

      {/* 8. Sample Itinerary Preview (7-Day Kashmir Flagship Timeline) */}
      <section id="itinerary">
        <SampleItineraryTimeline onOpenEnquiry={handleOpenEnquiry} />
      </section>

      {/* 9. Editorial Field Journal */}
      <EditorialJournal />

      {/* 10. Travel Guides & FAQ Accordion with Refund Summary */}
      <FAQAccordion
        onOpenRefundModal={() => setRefundModalOpen(true)}
        onOpenCallbackModal={() => setCallbackModalOpen(true)}
      />

      {/* 11. Final Enquiry Band with 4-Field Form & Callback Link */}
      <FinalEnquiryBand onOpenCallbackModal={() => setCallbackModalOpen(true)} />

      {/* 12. Global Interactive Consultation Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedDestination={selectedDest}
        preselectedPackageTitle={selectedPkg}
      />

      {/* 13. Transparent Refund & Cancellation Modal */}
      <RefundCancellationModal
        isOpen={refundModalOpen}
        onClose={() => setRefundModalOpen(false)}
      />

      {/* 14. "Plan With An Expert" Callback Modal */}
      <ExpertCallbackModal
        isOpen={callbackModalOpen}
        onClose={() => setCallbackModalOpen(false)}
        defaultDestination={selectedDest}
      />

      {/* 15. Floating WhatsApp Concierge Pill */}
      <WhatsAppButton />
    </div>
  );
}
