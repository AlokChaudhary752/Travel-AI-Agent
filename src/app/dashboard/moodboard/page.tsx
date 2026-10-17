"use client";

import React, { useState } from "react";
import { Palette, Upload, Sparkles, Image as ImageIcon, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MoodboardPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const sampleMoods = [
    {
      title: "Alpine Brutalism & Dark Cedar",
      palette: ["#1B1F23", "#3D4147", "#C9A24B", "#E5DCC5"],
      matchedSanctuary: "The Chedi Andermatt / 7132 Hotel Vals",
      image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Quiet Kyoto Zen & Bamboo Light",
      palette: ["#2C3529", "#8A9A86", "#D4AF37", "#F4F1EA"],
      matchedSanctuary: "Aman Kyoto & Suiran Arashiyama",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Caldera Cliffside Monoliths",
      palette: ["#FFFFFF", "#0A192F", "#D4AF37", "#4A6B82"],
      matchedSanctuary: "Canaves Oia Epitome, Santorini",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const handleSimulateAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold/10 border border-gold/30 text-[10px] font-mono uppercase text-gold-soft mb-2">
            Signature Feature 02
          </div>
          <h1 className="font-display text-3xl font-light text-ivory">
            Multimodal Vibe & Moodboard Curator
          </h1>
          <p className="text-muted text-xs font-light mt-1">
            Upload architectural screenshots, editorial moodboards, or fashion inspirations. Claude Vision maps imagery to verified luxury sanctums.
          </p>
        </div>

        <Button variant="primary" size="md" onClick={handleSimulateAnalysis} disabled={analyzing}>
          <Upload className="w-4 h-4 mr-1.5" />
          {analyzing ? "Analyzing Aesthetics..." : "Upload Aesthetic Image"}
        </Button>
      </div>

      {/* Analysis Result Banner */}
      {analyzed && (
        <div className="p-6 bg-gold/10 border border-gold/40 flex items-start justify-between gap-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gold-soft font-bold">
              ✦ Multimodal Analysis Complete
            </span>
            <h3 className="font-display text-xl text-ivory font-light">
              Matched Vibe: &ldquo;Minimalist Nordic Thermal Haven&rdquo;
            </h3>
            <p className="text-xs text-muted leading-relaxed font-light">
              Extracted palette tokens: Charred cedar, thermal mineral steam, muted brass. Matched to 2 secluded private chalets in Switzerland.
            </p>
          </div>
          <Button variant="primary" size="sm">
            Curate Itinerary from Vibe
          </Button>
        </div>
      )}

      {/* Curated Vibe Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sampleMoods.map((mood) => (
          <div
            key={mood.title}
            className="p-5 bg-surface-elevated border border-white/10 hover:border-gold/30 transition-all space-y-4"
          >
            <div className="h-44 relative overflow-hidden">
              <img
                src={mood.image}
                alt={mood.title}
                className="w-full h-full object-cover brightness-75 hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div>
              <h4 className="font-display text-lg text-ivory font-light">{mood.title}</h4>
              <span className="text-[10px] text-gold-soft font-mono block mt-0.5">
                ✦ {mood.matchedSanctuary}
              </span>
            </div>

            {/* Extracted Color Palette */}
            <div className="pt-2 border-t border-white/10 space-y-1">
              <span className="text-[9px] uppercase font-mono text-muted tracking-wider">
                Vibe Palette Tokens
              </span>
              <div className="flex items-center gap-1.5">
                {mood.palette.map((color) => (
                  <div
                    key={color}
                    className="w-6 h-6 border border-white/20"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
