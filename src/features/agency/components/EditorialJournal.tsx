"use client";

import React from "react";
import { ArrowRight, Clock, BookOpen, Compass } from "lucide-react";

interface JournalArticle {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  season: string;
  destination: string;
  image: string;
  author: string;
}

const ARTICLES: JournalArticle[] = [
  {
    id: "art-1",
    category: "Field Notes • Kashmir",
    title: "When the Saffron Blooms in Pampore",
    excerpt: "Every late October, the plateau between Srinagar and Awantipora turns lilac for ten days. How to walk the fields with third-generation harvesters and sip pure mongra kehwa at sunrise.",
    readTime: "5 min read",
    season: "Autumn / October",
    destination: "Pampore & Dal Lake",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=85",
    author: "Zainab Mir, Resident Curator",
  },
  {
    id: "art-2",
    category: "Alpine Dispatch • Switzerland",
    title: "Crossing the Oberalp Pass in Winter",
    excerpt: "Why Excellence Class on the Glacier Express is best reserved during the January freeze, and how private horse-drawn sledges navigate the silence of the snow-laden Val Roseg.",
    readTime: "6 min read",
    season: "Winter / January",
    destination: "St. Moritz & Zermatt",
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=85",
    author: "Marcus Keller, Alpine Scout",
  },
  {
    id: "art-3",
    category: "Heritage Chronicle • Rajasthan",
    title: "Dining by Oil Lamp on the Great Dune",
    excerpt: "Beyond the crowded camel safaris of Jaisalmer lies private land where desert musicians play without microphones and dining tables are dug directly into warm evening sand.",
    readTime: "4 min read",
    season: "Winter / November–February",
    destination: "Thar Desert, Jaisalmer",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=85",
    author: "Raghavendra Singh, Royal Escort",
  },
];

interface EditorialJournalProps {
  onOpenArticle?: (title: string) => void;
}

export function EditorialJournal({ onOpenArticle }: EditorialJournalProps) {
  return (
    <section className="py-24 px-6 sm:px-8 bg-[#071F22] border-t border-teal-soft/30">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-teal-soft/30 pb-8">
          <div className="space-y-3">
            <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-terracotta font-semibold">
              The Voyara Journal
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-sand font-light leading-tight">
              Dispatches From the Field
            </h2>
            <p className="text-sand/70 text-sm sm:text-base font-light max-w-xl font-sans">
              Unfiltered observations, seasonal shifts, and cultural etiquette recorded by our resident scouts on ground.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-sand/60">
            <Compass className="w-3.5 h-3.5 text-terracotta" />
            <span>Updated Monthly by Regional Curators</span>
          </div>
        </div>

        {/* 3-Article Magazine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((art) => (
            <article
              key={art.id}
              className="group bg-[#092A2D] border border-teal-soft/40 hover:border-terracotta/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.8]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#092A2D] via-transparent to-transparent opacity-85" />

                <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#071F22]/90 border border-sand/20 text-[9px] font-mono text-sand uppercase tracking-wider">
                  {art.category}
                </div>

                <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/50 backdrop-blur-md text-sand/90 text-[10px] font-mono">
                  {art.readTime}
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-sand/50 mb-1">
                    <span>{art.destination}</span>
                    <span>•</span>
                    <span className="text-terracotta-soft">{art.season}</span>
                  </div>

                  <h3 className="font-display text-2xl text-sand font-light group-hover:text-terracotta-soft transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-sand/70 text-xs font-light leading-relaxed mt-2.5">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-teal-soft/20 flex items-center justify-between text-xs font-mono text-sand/60">
                  <span className="text-[11px] text-sand/80">{art.author}</span>
                  <span className="text-terracotta flex items-center gap-1 group-hover:underline">
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
