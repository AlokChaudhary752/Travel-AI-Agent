"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Search,
  Send,
  Sparkles,
  Paperclip,
  CheckCheck,
  Phone,
  FileText,
  User,
  Clock,
} from "lucide-react";

interface MessageThread {
  id: string;
  guestName: string;
  channel: "WhatsApp" | "Web Concierge" | "Email";
  destination: string;
  lastMessage: string;
  lastTime: string;
  unread: boolean;
  messages: Array<{
    sender: "client" | "agent";
    text: string;
    time: string;
  }>;
}

const INITIAL_THREADS: MessageThread[] = [
  {
    id: "th-1",
    guestName: "Dr. Alok Singhania",
    channel: "WhatsApp",
    destination: "Kashmir Heli-Ski",
    lastMessage: "Can you confirm if the Khyber indoor pool is heated to 32 degrees?",
    lastTime: "10:14 AM",
    unread: true,
    messages: [
      { sender: "agent", text: "Namaste Dr. Singhania, your Sukoon Houseboat arrival shikara is confirmed for Nov 2.", time: "Yesterday, 4:30 PM" },
      { sender: "client", text: "Thank you Vikram. Can you confirm if the Khyber indoor pool is heated to 32 degrees?", time: "10:14 AM" },
    ],
  },
  {
    id: "th-2",
    guestName: "Gayatri Rathore",
    channel: "WhatsApp",
    destination: "Royal Rajasthan",
    lastMessage: "The lake dinner setup at Udaivilas was simply magnificent.",
    lastTime: "Yesterday",
    unread: false,
    messages: [
      { sender: "agent", text: "Good evening Mrs. Rathore, checking if you enjoyed the sunset private boat cruise?", time: "Yesterday, 6:00 PM" },
      { sender: "client", text: "The lake dinner setup at Udaivilas was simply magnificent. Thank you team Voyara!", time: "Yesterday, 9:20 PM" },
    ],
  },
  {
    id: "th-3",
    guestName: "Kabir Oberoi",
    channel: "Web Concierge",
    destination: "Bali Uluwatu",
    lastMessage: "Need a reservation at Il Bar cliff edge for 7 PM on Oct 27.",
    lastTime: "Oct 19",
    unread: false,
    messages: [
      { sender: "client", text: "Hi, need a reservation at Il Bar cliff edge for 7 PM on Oct 27.", time: "Oct 19, 11:20 AM" },
      { sender: "agent", text: "Confirmed Kabir, cliff-side front row table reserved under your name.", time: "Oct 19, 11:45 AM" },
    ],
  },
];

export default function MessagesUnifiedInboxPage() {
  const [threads, setThreads] = useState<MessageThread[]>(INITIAL_THREADS);
  const [selectedThread, setSelectedThread] = useState<MessageThread>(INITIAL_THREADS[0]);
  const [replyText, setReplyText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const templates = [
    "Itinerary Dossier Ready for Review",
    "Payment Milestone Receipt Attached",
    "VIP Chauffeur & Flight Details Verified",
    "Welcome to the Destination Kit",
  ];

  const handleSendReply = (textToSend?: string) => {
    const text = textToSend || replyText;
    if (!text.trim()) return;

    const newMsg = {
      sender: "agent" as const,
      text,
      time: "Just now",
    };

    const updated = {
      ...selectedThread,
      lastMessage: text,
      lastTime: "Just now",
      messages: [...selectedThread.messages, newMsg],
    };

    setSelectedThread(updated);
    setThreads(threads.map((t) => (t.id === updated.id ? updated : t)));
    setReplyText("");
  };

  const handleAiSuggestion = () => {
    if (selectedThread.id === "th-1") {
      setReplyText(
        "Namaste Dr. Singhania, yes, The Khyber's temperature-controlled swimming pavilion is consistently maintained at 32°C with full glass views of the snow-capped Apharwat peaks. Your private cabana has been reserved."
      );
    } else {
      setReplyText(
        "Thank you so much! It was our pleasure curating this journey for you. Please let our 24/7 concierge know if you need anything else during your stay."
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F6F2EB]/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl sm:text-3xl font-light text-[#F6F2EB]">
              Unified Client Concierge
            </h1>
            <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-xs font-mono">
              WhatsApp & Web Inbox
            </span>
          </div>
          <p className="text-xs text-[#F6F2EB]/60 font-sans mt-0.5">
            Omnichannel client conversations, instant response templates, and AI-suggested message drafts.
          </p>
        </div>
      </div>

      {/* 2-Column Chat Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[720px] rounded-lg border border-[#F6F2EB]/15 bg-[#092B2F] overflow-hidden">
        {/* Left: Threads list (4 Cols) */}
        <div className="lg:col-span-4 border-r border-[#F6F2EB]/10 flex flex-col bg-[#092B2F]">
          <div className="p-3 border-b border-[#F6F2EB]/10">
            <div className="relative">
              <Search className="w-4 h-4 text-[#F6F2EB]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#071F22] border border-[#F6F2EB]/15 rounded pl-9 pr-3 py-2 text-xs text-[#F6F2EB] focus:outline-none focus:border-[#C2532A]"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#F6F2EB]/5">
            {threads.map((thread) => {
              const isSelected = selectedThread.id === thread.id;
              return (
                <div
                  key={thread.id}
                  onClick={() => setSelectedThread(thread)}
                  className={`p-3.5 cursor-pointer transition-colors space-y-1 ${
                    isSelected ? "bg-[#0B353A] border-l-2 border-[#C2532A]" : "hover:bg-[#071F22]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-xs text-[#F6F2EB]">
                      {thread.guestName}
                    </span>
                    <span className="text-[10px] font-mono text-[#F6F2EB]/50">
                      {thread.lastTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#C2532A]">{thread.destination}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#071F22] text-[#F6F2EB]/60">
                      {thread.channel}
                    </span>
                  </div>
                  <p className="text-xs text-[#F6F2EB]/70 truncate">{thread.lastMessage}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Chat Conversation (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col bg-[#071F22]">
          {/* Chat Header */}
          <div className="p-4 border-b border-[#F6F2EB]/10 bg-[#092B2F] flex items-center justify-between">
            <div>
              <h3 className="font-display text-base text-[#F6F2EB]">
                {selectedThread.guestName}
              </h3>
              <span className="text-xs font-mono text-[#C2532A]">
                {selectedThread.destination} • Channel: {selectedThread.channel}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleAiSuggestion}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#071F22] hover:bg-[#16565C] border border-[#C2532A]/40 text-[#C2532A] text-xs font-mono transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                AI Smart Reply
              </button>
            </div>
          </div>

          {/* Messages Flow */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {selectedThread.messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === "agent" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-md p-3 rounded-lg text-xs leading-relaxed ${
                    m.sender === "agent"
                      ? "bg-[#C2532A] text-white rounded-br-none"
                      : "bg-[#092B2F] border border-[#F6F2EB]/15 text-[#F6F2EB] rounded-bl-none"
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] font-mono text-[#F6F2EB]/40 mt-1 px-1">
                  {m.time}
                </span>
              </div>
            ))}
          </div>

          {/* Response Templates Chips */}
          <div className="px-4 py-2 border-t border-[#F6F2EB]/10 bg-[#092B2F]/50 flex items-center gap-2 overflow-x-auto text-[11px] font-mono">
            <span className="text-[#F6F2EB]/40 uppercase text-[9px]">Templates:</span>
            {templates.map((tmpl, i) => (
              <button
                key={i}
                onClick={() =>
                  setReplyText(
                    `Namaste ${selectedThread.guestName}, your ${tmpl} has been generated and validated by our concierge team.`
                  )
                }
                className="px-2 py-0.5 rounded bg-[#071F22] hover:bg-[#0E353A] border border-[#F6F2EB]/10 text-[#F6F2EB]/70 hover:text-[#F6F2EB] whitespace-nowrap"
              >
                {tmpl}
              </button>
            ))}
          </div>

          {/* Chat Composer Input */}
          <div className="p-3 border-t border-[#F6F2EB]/10 bg-[#092B2F] flex items-center gap-2">
            <input
              type="text"
              placeholder="Type client message or dispatch WhatsApp response..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendReply();
              }}
              className="flex-1 bg-[#071F22] border border-[#F6F2EB]/15 rounded px-3 py-2 text-xs text-[#F6F2EB] placeholder-[#F6F2EB]/40 focus:outline-none focus:border-[#C2532A]"
            />
            <button
              onClick={() => handleSendReply()}
              disabled={!replyText.trim()}
              className="p-2 bg-[#C2532A] hover:bg-[#C2532A]/90 disabled:opacity-40 text-white rounded transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
