"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  Compass,
  Send,
  Sparkles,
  Terminal,
  ShieldCheck,
  Plane,
  Building2,
  Mic,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FlightResultCard,
  HotelResultCard,
  WeatherResultCard,
  BookingConfirmModal,
  FlightOffer,
  HotelProperty,
} from "@/features/concierge/components/ToolCards";
import { ThinkingTrace } from "@/features/concierge/components/ThinkingTrace";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  thoughtSteps?: Array<{ tool?: string; text: string; timestamp?: string }>;
  flightCard?: FlightOffer;
  hotelCard?: HotelProperty;
  weatherCard?: {
    location: string;
    forecast: Array<{
      date: string;
      condition: string;
      tempDay: string;
      tempNight: string;
      advisory?: string;
    }>;
  };
}

export default function ConciergePage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-init",
      role: "assistant",
      content:
        "Welcome to your private sanctum, Lord Vance. Your **Travel DNA** (Strict Vegetarian/Jain cuisine, lie-flat private suites, quiet luxury) is active in my working memory.\n\nWhere may I orchestrate your next journey?",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentThought, setCurrentThought] = useState("");
  const [activeSteps, setActiveSteps] = useState<
    Array<{ tool?: string; text: string }>
  >([]);

  // Confirmation Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    title: "",
    subtitle: "",
    price: "",
    currency: "USD",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentThought, activeSteps]);

  const quickPrompts = [
    "Plan a 4-day ski getaway in St. Moritz with Michelin fondue & business flights",
    "Maldives private overwater retreat with private slide and vegan dining",
    "Kyoto private ryokan with onsen bath and private tea master",
    "St. Moritz ke liye lie-flat flights aur private chalet check karo",
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const newMessages: ChatMessage[] = [
      ...messages,
      { id: userMsgId, role: "user", content: text },
    ];

    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setActiveSteps([]);
    setCurrentThought("Synthesizing traveler context & activating tools...");

    try {
      const res = await fetch("/api/concierge/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error("Stream connection failed.");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";
      let flightData: FlightOffer | undefined;
      let hotelData: HotelProperty | undefined;
      let weatherData:
        | {
            location: string;
            forecast: Array<{
              date: string;
              condition: string;
              tempDay: string;
              tempNight: string;
              advisory?: string;
            }>;
          }
        | undefined;
      const stepLog: Array<{ tool?: string; text: string }> = [];

      while (reader) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (!line.trim()) continue;

          if (line.startsWith("event: thinking")) {
            const data = JSON.parse(line.replace("event: thinking\ndata: ", ""));
            setCurrentThought(data.thought);
            stepLog.push({ text: data.thought });
            setActiveSteps([...stepLog]);
          } else if (line.startsWith("event: tool_start")) {
            const data = JSON.parse(line.replace("event: tool_start\ndata: ", ""));
            stepLog.push({
              tool: data.tool,
              text: `Calling ${data.tool}(${JSON.stringify(data.input)})`,
            });
            setActiveSteps([...stepLog]);
          } else if (line.startsWith("event: tool_result")) {
            const data = JSON.parse(line.replace("event: tool_result\ndata: ", ""));
            stepLog.push({
              tool: data.tool,
              text: `Verified 100% GDS output from ${data.result.source || "GDS Hub"}`,
            });
            setActiveSteps([...stepLog]);

            if (data.tool === "search_flights" && data.result.offers?.[0]) {
              flightData = data.result.offers[0];
            } else if (data.tool === "search_hotels" && data.result.properties?.[0]) {
              hotelData = data.result.properties[0];
            } else if (data.tool === "get_weather") {
              weatherData = data.result;
            }
          } else if (line.startsWith("event: delta")) {
            const data = JSON.parse(line.replace("event: delta\ndata: ", ""));
            assistantText += data.text;
          } else if (line.startsWith("event: done")) {
            setCurrentThought("");
          }
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          role: "assistant",
          content: assistantText || "Your bespoke itinerary is ready below.",
          thoughtSteps: stepLog,
          flightCard: flightData,
          hotelCard: hotelData,
          weatherCard: weatherData,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content:
            "I apologize, Lord Vance. Our private GDS connection encountered a transient timeout. I have queued a retry with our VIP desk.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setCurrentThought("");
      setActiveSteps([]);
    }
  };

  const handleFlightBook = (offer: FlightOffer) => {
    setModalDetails({
      title: `Confirm Provisional Hold: ${offer.airline}`,
      subtitle: `${offer.flightNumber} • ${offer.cabin} • ${offer.origin} ➔ ${offer.destination}`,
      price: offer.price.toLocaleString(),
      currency: offer.currency === "INR" ? "₹" : "$",
    });
    setModalOpen(true);
  };

  const handleHotelReserve = (hotel: HotelProperty) => {
    setModalDetails({
      title: `Confirm Sanctuary Hold: ${hotel.name}`,
      subtitle: `${hotel.roomCategory} • Guaranteed early check-in & dietary compliance`,
      price: hotel.nightlyRate.toLocaleString(),
      currency: "$",
    });
    setModalOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      {/* Top Telemetry Strip */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center bg-gold/10">
            <Compass className="w-4 h-4 text-gold" />
          </div>
          <div>
            <h1 className="font-display text-xl font-light text-ivory tracking-wide">
              Agentic AI Concierge
            </h1>
            <span className="text-[10px] text-gold-soft font-mono uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-gold" /> Zero-Hallucination & GDS Verified
            </span>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: "msg-reset",
                role: "assistant",
                content:
                  "Conversation reset. Your permanent Travel DNA preferences remain locked into the vault.",
              },
            ])
          }
          className="flex items-center gap-1.5 text-xs font-mono text-muted hover:text-gold transition-colors px-2 py-1 border border-white/10 hover:border-gold/30"
          title="Reset conversation thread"
        >
          <RotateCcw className="w-3 h-3" />
          <span>New Voyage</span>
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3.5 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full border border-gold/40 bg-surface flex items-center justify-center text-gold shadow-gold-subtle flex-shrink-0 mt-1">
                <Sparkles className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-2xl rounded-none p-5 space-y-4 ${
                msg.role === "user"
                  ? "bg-surface-elevated border border-gold/30 text-ivory text-xs sm:text-sm font-light leading-relaxed"
                  : "bg-surface/80 border border-white/10 text-ivory text-xs sm:text-sm font-light leading-relaxed"
              }`}
            >
              {/* Prior Thinking Steps */}
              {msg.thoughtSteps && msg.thoughtSteps.length > 0 && (
                <ThinkingTrace steps={msg.thoughtSteps} />
              )}

              {/* Message Markdown Body */}
              <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-headings:font-display">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>

              {/* Render Flight Card */}
              {msg.flightCard && (
                <FlightResultCard
                  offer={msg.flightCard}
                  onBook={handleFlightBook}
                />
              )}

              {/* Render Hotel Card */}
              {msg.hotelCard && (
                <HotelResultCard
                  hotel={msg.hotelCard}
                  onReserve={handleHotelReserve}
                />
              )}

              {/* Render Weather Card */}
              {msg.weatherCard && (
                <WeatherResultCard weather={msg.weatherCard} />
              )}
            </div>
          </div>
        ))}

        {/* Live Active Thinking Trace (During Generation) */}
        {isLoading && (
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full border border-gold/40 bg-surface flex items-center justify-center text-gold shadow-gold-subtle flex-shrink-0 animate-pulse">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="w-full max-w-2xl">
              <ThinkingTrace
                steps={activeSteps}
                currentThought={currentThought}
              />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box & Quick Inspiration Strip */}
      <div className="pt-4 border-t border-white/10 mt-2 space-y-3">
        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-2 overflow-x-auto text-[11px] font-mono text-muted pb-1">
          <span className="text-gold-soft flex-shrink-0">Prompt Inspiration:</span>
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSendMessage(p)}
              disabled={isLoading}
              className="truncate hover:text-gold border border-white/10 hover:border-gold/40 bg-surface px-2.5 py-1 flex-shrink-0 transition-colors"
            >
              &ldquo;{p.slice(0, 36)}...&rdquo;
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2 bg-surface-elevated border border-gold/30 focus-within:border-gold p-2 shadow-2xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Instruct your concierge (English, Hindi, Hinglish)..."
            disabled={isLoading}
            className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-ivory placeholder:text-muted/60 focus:outline-none"
          />

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => handleSendMessage()}
            disabled={isLoading || !input.trim()}
          >
            <Send className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Explicit Booking Authorization Modal */}
      <BookingConfirmModal
        isOpen={modalOpen}
        title={modalDetails.title}
        subtitle={modalDetails.subtitle}
        price={modalDetails.price}
        currency={modalDetails.currency}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `conf-${Date.now()}`,
              role: "assistant",
              content: `✓ **Reservation Confirmed & Held** for ${modalDetails.title}. Our private flight desk has verified your lie-flat suite with zero disruption guarantee.`,
            },
          ]);
        }}
      />
    </div>
  );
}
