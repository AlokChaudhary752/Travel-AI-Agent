"use client";

import React, { useEffect, useState } from "react";
import { Compass } from "lucide-react";

export function CinematicLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(20);
  const [isFading, setIsFading] = useState(false);
  const onCompleteRef = React.useRef(onComplete);
  onCompleteRef.current = onComplete;

  const handleSkip = React.useCallback(() => {
    if (typeof window !== "undefined") sessionStorage.setItem("voyara_intro_seen", "1");
    setIsFading(true);
    setTimeout(() => {
      onCompleteRef.current();
    }, 200);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && (
      sessionStorage.getItem("voyara_intro_seen") === "1" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )) {
      onCompleteRef.current();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          handleSkip();
          return 100;
        }
        return Math.min(100, prev + 20);
      });
    }, 40);

    const safety = setTimeout(handleSkip, 700);

    return () => {
      clearInterval(interval);
      clearTimeout(safety);
    };
  }, [handleSkip]);

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[99999] bg-[#07090D] flex flex-col items-center justify-center cursor-pointer transition-opacity duration-700 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Glowing Brand Icon */}
        <div className="relative w-16 h-16 flex items-center justify-center mb-8">
          <div className="absolute inset-0 rounded-full border border-gold/40 animate-ping opacity-25" />
          <div className="w-14 h-14 rounded-full border border-gold/60 flex items-center justify-center bg-surface shadow-[0_0_30px_rgba(201,162,75,0.3)]">
            <Compass className="w-7 h-7 text-gold animate-spin [animation-duration:8s]" />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="font-display text-4xl md:text-5xl tracking-[0.35em] text-ivory uppercase font-light mb-4">
          Voyara
        </h1>
        <p className="text-[11px] tracking-[0.25em] text-gold-soft uppercase mb-10 font-mono">
          Private AI Travel Concierge
        </p>

        {/* Luxury Progress Bar */}
        <div className="w-48 h-px bg-white/10 relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold via-gold-soft to-gold transition-all duration-150 ease-out shadow-[0_0_10px_#C9A24B]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Tabular Progress Percentage */}
        <div className="mt-4 text-xs font-mono tabular-nums text-muted tracking-widest">
          {progress.toString().padStart(3, "0")} %
        </div>

        <span className="mt-6 text-[10px] tracking-widest text-gold/60 uppercase font-mono hover:text-gold transition-colors">
          Click anywhere to enter →
        </span>
      </div>
    </div>
  );
}
