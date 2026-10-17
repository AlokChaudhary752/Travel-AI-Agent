# Travel-AI-Agent
Voyara is an AI-powered luxury travel concierge. Tell it your budget and interests, and it builds a personalized day-by-day itinerary using live weather, flights, hotels, maps and places data. Features a cinematic 3D landing page, secure auth, onboarding, and a real-time dashboard with price alerts, group trip planning and expense tracking. 
# Voyara — AI-Powered Luxury Travel Concierge

> An agentic AI travel planner with a cinematic 3D landing page, secure authentication, personalized onboarding, and a real-time dashboard for itineraries, maps, weather, price alerts, group trips, and expenses.

![Status](https://img.shields.io/badge/status-in%20development-C9A24B)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## Overview

Voyara turns trip planning into a conversation. Tell the concierge where you want to go, your budget, and what you enjoy, and it builds a day-by-day itinerary using **live data** (weather, flights, hotels, places, routes) instead of guesses. Everything updates in real time, and the AI never invents prices or availability: it only reports what its tools return.

**Who it is for:** travelers who want a personalized, premium planning experience, with India as the first market (English, Hindi, and Hinglish supported).

---

## Key Features

### Landing page
- Interactive 3D Earth with animated flight-path arcs (React Three Fiber)
- Scroll-driven storytelling, 3D destination cards, luxury dark-and-gold design
- Low-power fallback for weak GPUs and reduced-motion users

### Authentication and onboarding
- Email and password, Google OAuth, magic link, password reset
- 4-step onboarding wizard: identity, travel style, preferences, logistics
- Saved traveler profile used to personalize every AI response

### Dashboard
| Module | What it does |
|---|---|
| **AI Concierge** | Streaming chat with tool use: weather, flights, hotels, places, routes, currency, itinerary building |
| **Itinerary Studio** | Drag-and-drop day planner, route optimization, versioning, PDF and calendar export |
| **Live Map** | Itinerary pins, routes, and nearby cafes, ATMs, hospitals |
| **Weather and Alerts** | Per-stop forecast with live severe-weather warnings |
| **Flights and Hotels** | Live search, filters, price comparison |
| **Price Tracker** | Target-price alerts with real-time notifications |
| **Group Trips** | Shared itinerary, destination voting, group chat, automatic expense split |
| **Expense Tracker** | Multi-currency budgets with live charts |
| **Smart Utilities** | Currency converter, trip countdown, AI packing list, document vault |

---

## How the AI Works

```
User message -> Claude (plans) -> calls tools -> verifies results -> responds
```

- **Tool use:** the model calls validated tools (`get_weather`, `search_flights`, `search_hotels`, `find_places`, `get_route`, `convert_currency`, `build_itinerary`, and more).
- **Guardrails:** no fabricated prices, availability, or visa rules. Bookings and payments always require explicit user confirmation. Tool and web content is treated as untrusted data.
- **Memory:** short-term (conversation) and long-term (profile and past trips via pgvector), visible and editable by the user.
- **RAG:** a knowledge base of destination guides and travel advisories with source attribution.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui |
| 3D and motion | React Three Fiber, drei, GSAP, Framer Motion |
| Backend | Next.js Route Handlers, Supabase (Postgres, Auth, Realtime, Storage) |
| AI | Anthropic Claude API (streaming and tool use), pgvector embeddings |
| Maps | Mapbox GL JS (MapLibre as fallback) |
| Data APIs | Amadeus, OpenWeather, exchange-rate API, Google Places or OpenTripMap |
| Quality | Zod, Vitest, Playwright, ESLint, GitHub Actions |

---

## Architecture

```
┌────────────────┐     ┌────────────────────┐     ┌──────────────────┐
│  Next.js app   │────▶│  Route Handlers    │────▶│  Claude API      │
│  (3D UI, chat) │     │  (secure, server)  │     │  + tool calls    │
└───────┬────────┘     └─────────┬──────────┘     └────────┬─────────┘
        │ Realtime               │                         │
        ▼                        ▼                         ▼
┌────────────────┐     ┌────────────────────┐     ┌──────────────────┐
│ Supabase       │◀────│ Third-party APIs   │     │ Weather, flights,│
│ (DB, Auth, RLS)│     │ (keys stay server) │◀────│ hotels, maps     │
└────────────────┘     └────────────────────┘     └──────────────────┘
```

All third-party API keys stay on the server and are never exposed to the browser.

---

## Getting Started

### Prerequisites
- Node.js 20 or higher
- A Supabase project
- API keys for the services you want to enable (see below)

### Installation

```bash
git clone https://github.com/<your-username>/voyara.git
cd voyara
npm install
cp .env.example .env.local
```

### Environment variables

Fill in `.env.local`. If a key is missing, the related feature shows a clear fallback state instead of breaking.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase connection |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side database access |
| `ANTHROPIC_API_KEY` | AI concierge |
| `OPENWEATHER_API_KEY` | Weather and alerts |
| `AMADEUS_CLIENT_ID` / `AMADEUS_CLIENT_SECRET` | Flights and hotels (test environment) |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Maps |

### Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

### Useful scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run lint` | Lint the code |
| `npm run test` | Unit tests |
| `npm run test:e2e` | Playwright end-to-end tests |

---

## Roadmap

- [ ] Phase 1: Design system and 3D landing page
- [ ] Phase 2: Authentication, onboarding, database, row-level security
- [ ] Phase 3: Dashboard shell and AI concierge with tools
- [ ] Phase 4: Itinerary Studio, map, weather, flight and hotel search
- [ ] Phase 5: Realtime features (price alerts, group trips, notifications, expenses)
- [ ] Phase 6: Signature features (voice concierge, photo-to-destination), testing, hardening
- [ ] Phase 7: Deployment guide and documentation

---

## Security and Privacy

- Row-level security on every table, so users only see their own data
- Server-side API calls, rate limiting, and input validation with Zod
- Sensitive fields (such as passport details) encrypted; documents served through signed URLs
- Consent screens, data export, and account deletion, aligned with India's DPDP Act and GDPR basics

---

## Contributing

Contributions are welcome. Please open an issue to discuss a change before submitting a pull request, and make sure lint and tests pass.

## License

Released under the MIT License. See `LICENSE` for details.

## Author

Built by **<Your Name>** — [GitHub](https://github.com/<your-username>) · [LinkedIn](https://linkedin.com/in/<your-profile>)
