"use client";

import React from "react";
import { StepIndicator } from "@/features/onboarding/components/StepIndicator";
import { StepIdentity } from "@/features/onboarding/components/StepIdentity";
import { StepTravelDNA } from "@/features/onboarding/components/StepTravelDNA";
import { StepPreferences } from "@/features/onboarding/components/StepPreferences";
import { StepLogistics } from "@/features/onboarding/components/StepLogistics";
import { useOnboardingStore } from "@/features/onboarding/store/useOnboardingStore";

export default function OnboardingPage() {
  const { currentStep, setStep } = useOnboardingStore();

  return (
    <div className="w-full">
      <StepIndicator currentStep={currentStep} />

      <div className="p-8 md:p-12 bg-surface/90 border border-gold/25 backdrop-blur-2xl shadow-2xl">
        {currentStep === 1 && (
          <StepIdentity onNext={() => setStep(2)} />
        )}
        {currentStep === 2 && (
          <StepTravelDNA
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {currentStep === 3 && (
          <StepPreferences
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}
        {currentStep === 4 && (
          <StepLogistics onBack={() => setStep(3)} />
        )}
      </div>
    </div>
  );
}
