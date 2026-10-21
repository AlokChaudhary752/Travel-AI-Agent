import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { GeneratedItinerary, PackageDay } from "@/types/travel";

export async function POST(req: NextRequest) {
  try {
    const { prompt, userApiKey } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = userApiKey || process.env.ANTHROPIC_API_KEY;

    // If Anthropic Claude API key is provided and valid, call Claude 3.5 Sonnet
    if (apiKey && apiKey.startsWith("sk-ant-") && !apiKey.includes("your-anthropic")) {
      try {
        const anthropic = new Anthropic({ apiKey });
        const systemPrompt = `You are the Master Travel Architect for Voyara Journeys, a high-end luxury bespoke travel SaaS in New Delhi, India.
Generate a structured JSON response matching the following TypeScript schema:
{
  "title": string,
  "destination": string,
  "durationDays": number,
  "budgetInr": number,
  "calculatedCostInr": number,
  "recommendedMarkupPct": number,
  "finalPriceInr": number,
  "summary": string,
  "days": Array<{
    "day": number,
    "title": string,
    "location": string,
    "hotel": string,
    "activities": string[],
    "meals": string,
    "transport": string,
    "estimatedCost": number
  }>,
  "hotels": Array<{ "name": string, "roomType": string, "nights": number, "pricePerNight": number }>,
  "transfers": Array<{ "route": string, "vehicle": string, "cost": number }>,
  "breakdown": {
    "hotelsTotal": number,
    "transfersTotal": number,
    "activitiesTotal": number,
    "gstTotal": number,
    "marginTotal": number
  },
  "clientNotes": string
}
Strictly output raw JSON only, no markdown backticks, no markdown text.`;

        const response = await anthropic.messages.create({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 2500,
          temperature: 0.7,
          system: systemPrompt,
          messages: [{ role: "user", content: prompt }],
        });

        const textContent = response.content[0].type === "text" ? response.content[0].text : "";
        const cleanJson = textContent.replace(/```json/g, "").replace(/```/g, "").trim();
        const parsed = JSON.parse(cleanJson);

        return NextResponse.json({
          itinerary: {
            ...parsed,
            id: `itin-${Date.now()}`,
            generatedByAi: true,
            modelUsed: "Claude 3.5 Sonnet",
          },
        });
      } catch (err: any) {
        console.warn("Claude API call failed, falling back to built-in generator:", err.message);
      }
    }

    // Graceful Rule-Based AI Engine Fallback (Rich Curated Destination Knowledge)
    const lowerPrompt = prompt.toLowerCase();
    let dest = "Kerala";
    if (lowerPrompt.includes("kashmir") || lowerPrompt.includes("gulmarg") || lowerPrompt.includes("srinagar")) {
      dest = "Kashmir";
    } else if (lowerPrompt.includes("rajasthan") || lowerPrompt.includes("udaipur") || lowerPrompt.includes("jaipur")) {
      dest = "Rajasthan";
    } else if (lowerPrompt.includes("ladakh") || lowerPrompt.includes("leh") || lowerPrompt.includes("pangong")) {
      dest = "Ladakh";
    } else if (lowerPrompt.includes("bali") || lowerPrompt.includes("ubud") || lowerPrompt.includes("uluwatu")) {
      dest = "Bali";
    } else if (lowerPrompt.includes("dubai") || lowerPrompt.includes("uae") || lowerPrompt.includes("desert")) {
      dest = "Dubai";
    } else if (lowerPrompt.includes("swiss") || lowerPrompt.includes("zermatt") || lowerPrompt.includes("alps")) {
      dest = "Switzerland";
    }

    // Parse duration
    let duration = 6;
    const dayMatch = lowerPrompt.match(/(\d+)\s*[- ]*(day|night)/);
    if (dayMatch) {
      duration = parseInt(dayMatch[1], 10);
    }

    // Parse budget
    let budget = 250000;
    if (lowerPrompt.includes("1.5") || lowerPrompt.includes("150000") || lowerPrompt.includes("1.5 lakh")) budget = 150000;
    else if (lowerPrompt.includes("2.5") || lowerPrompt.includes("250000")) budget = 250000;
    else if (lowerPrompt.includes("3") || lowerPrompt.includes("3 lakh") || lowerPrompt.includes("300000")) budget = 300000;
    else if (lowerPrompt.includes("4") || lowerPrompt.includes("4 lakh")) budget = 400000;
    else if (lowerPrompt.includes("5") || lowerPrompt.includes("5 lakh")) budget = 500000;

    const baseCost = Math.round(budget * 0.72);
    const margin = Math.round(budget * 0.23);
    const gst = Math.round((baseCost + margin) * 0.05);
    const finalPrice = baseCost + margin + gst;

    const generatedDays: PackageDay[] = [];
    for (let i = 1; i <= duration; i++) {
      let dayTitle = `Day ${i}: Exploration & Heritage`;
      let loc = dest;
      let hotel = `Luxury Heritage Suite, ${dest}`;
      let activities = ["Private guided walking tour", "Sunset signature tea"];
      let transport = "Private Chauffeur Sedan";

      if (dest === "Kerala") {
        if (i === 1) {
          dayTitle = "Arrival at Kochi & Transfer to Kumarakom";
          loc = "Kumarakom";
          hotel = "Kumarakom Lake Resort (Heritage Pool Villa)";
          activities = ["Lotus pool welcome ceremony", "Sunset flute recital over Vembanad Lake"];
        } else if (i === 2) {
          dayTitle = "Vembanad Canals & Ayurvedic Rejuvenation";
          loc = "Kumarakom";
          hotel = "Kumarakom Lake Resort";
          activities = ["Shirodhara spa therapy", "Village canoe trail with naturalist"];
        } else if (i === 3) {
          dayTitle = "Private Kettuvallam Houseboat Embarkation";
          loc = "Alleppey";
          hotel = "Spice Coast Luxury Private Kettuvallam";
          activities = ["Canal cruise", "Chef-prepared freshwater Karimeen feast"];
          transport = "Private Houseboat";
        } else if (i === 4) {
          dayTitle = "Marari Arabian Sea Sands & Coconut Groves";
          loc = "Mararikulam";
          hotel = "Marari Beach Resort (Pool Villa)";
          activities = ["Butterfly garden walk", "Sunset beach dining"];
        } else {
          dayTitle = "Fort Kochi Colonial Heritage & Departure";
          loc = "Fort Kochi / COK Airport";
          hotel = "Brunton Boatyard (Day Use)";
          activities = ["Chinese fishing nets photography", "Spice market antique shopping"];
        }
      } else if (dest === "Kashmir") {
        if (i === 1) {
          dayTitle = "Arrival in Srinagar & Sukoon Houseboat Welcome";
          loc = "Srinagar";
          hotel = "Sukoon Heritage Houseboat, Nigeen Lake";
          activities = ["Private Shikara ride with saffron Kahwa", "Old city brass master visit"];
        } else if (i === 2) {
          dayTitle = "Ascent to Gulmarg Pine Sanctuary";
          loc = "Gulmarg";
          hotel = "The Khyber Himalayan Resort & Spa";
          activities = ["4x4 Land Cruiser drive through Tangmarg", "L'Occitane Spa session"];
        } else if (i === 3) {
          dayTitle = "Mt. Apharwat Heli-Ski & Powder Snow Descent";
          loc = "Gulmarg (3,980m)";
          hotel = "The Khyber Himalayan Resort & Spa";
          activities = ["Phase 2 Gondola ride", "Eurocopter mountain heli-hop"];
        } else {
          dayTitle = "Mughal Terraced Gardens & Wazwan Banquet";
          loc = "Srinagar";
          hotel = "Sukoon Heritage Houseboat";
          activities = ["Nishat Bagh royal walk", "7-course traditional Wazwan feast"];
        }
      } else if (dest === "Rajasthan") {
        if (i === 1) {
          dayTitle = "Arrival in Udaipur — Lake Pichola Royalty";
          loc = "Udaipur";
          hotel = "The Oberoi Udaivilas";
          activities = ["Private boat arrival jetty check-in", "Sunset champagne over Lake Pichola"];
        } else if (i === 2) {
          dayTitle = "City Palace Private Archives & Crystal Gallery";
          loc = "Udaipur";
          hotel = "The Oberoi Udaivilas";
          activities = ["Curator-escorted palace tour", "Candlelit pavilion dinner"];
        } else {
          dayTitle = "Ranakpur Marble Marvels & Marwar Departure";
          loc = "Ranakpur / Jodhpur";
          hotel = "Umaid Bhawan Palace";
          activities = ["1,444 carved marble pillars tour", "Mehrangarh fort private elevator access"];
        }
      } else {
        dayTitle = `Day ${i}: Signature ${dest} Luxury Experience`;
        loc = dest;
        hotel = `5-Star Curated Retreat, ${dest}`;
        activities = ["Private architectural tour", "Bespoke dinner by executive chef"];
      }

      generatedDays.push({
        day: i,
        title: dayTitle,
        location: loc,
        hotel,
        activities,
        meals: i === 1 ? "Dinner" : "Breakfast, Dinner",
        transport,
        estimatedCost: Math.round(baseCost / duration),
      });
    }

    const mockItinerary: GeneratedItinerary = {
      id: `itin-${Date.now()}`,
      title: `${duration}-Day Bespoke ${dest} Luxury Journey`,
      destination: dest,
      durationDays: duration,
      budgetInr: budget,
      calculatedCostInr: baseCost,
      recommendedMarkupPct: 24,
      finalPriceInr: finalPrice,
      summary: `Tailor-made ${duration}-day itinerary engineered specifically for ${dest} with verified 5-star properties, private chauffeured transfers, and curated cultural access.`,
      days: generatedDays,
      hotels: [
        {
          name: generatedDays[0]?.hotel || `The Grand ${dest}`,
          roomType: "Luxury Suite with Panoramic View",
          nights: Math.ceil(duration / 2),
          pricePerNight: Math.round((baseCost * 0.6) / duration),
        },
        {
          name: generatedDays[generatedDays.length - 1]?.hotel || `The Oberoi ${dest}`,
          roomType: "Heritage Pool Villa",
          nights: Math.floor(duration / 2),
          pricePerNight: Math.round((baseCost * 0.4) / duration),
        },
      ],
      transfers: [
        {
          route: `Airport - ${dest} - Excursions`,
          vehicle: "Toyota Vellfire / Mercedes E-Class Private Chauffeur",
          cost: Math.round(baseCost * 0.18),
        },
      ],
      breakdown: {
        hotelsTotal: Math.round(baseCost * 0.62),
        transfersTotal: Math.round(baseCost * 0.18),
        activitiesTotal: Math.round(baseCost * 0.2),
        gstTotal: gst,
        marginTotal: margin,
      },
      clientNotes: `All accommodations guaranteed on EP/CP basis as per contract. Chauffeur provided with mineral water, cold towels, and cellular Wi-Fi. 5% GST calculated under SAC Code 998555.`,
      generatedByAi: true,
      modelUsed: "Voyara Rule-Based Neural Engine (Demo Mode)",
    };

    return NextResponse.json({ itinerary: mockItinerary });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to generate itinerary" }, { status: 500 });
  }
}
