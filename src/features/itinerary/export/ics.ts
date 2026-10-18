import { Itinerary } from "../types";

/**
 * Format date string "YYYY-MM-DD" and "HH:MM" into ICS format: "YYYYMMDDTHHMMSS"
 */
function formatIcsDateTime(dateStr: string, timeStr: string): string {
  const cleanDate = dateStr.replace(/-/g, "");
  const [h, m] = timeStr.split(":");
  const cleanTime = `${(h || "00").padStart(2, "0")}${(m || "00").padStart(2, "0")}00`;
  return `${cleanDate}T${cleanTime}`;
}

/**
 * Generate standard RFC 5545 iCalendar string for the entire itinerary
 */
export function generateItineraryIcs(itinerary: Itinerary): string {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Voyara Luxury Concierge//Voyara Itinerary Studio//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:Voyara: ${itinerary.title}`,
    "X-WR-TIMEZONE:UTC",
  ];

  const nowStamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

  itinerary.days.forEach((day) => {
    day.stops.forEach((stop) => {
      const startIso = formatIcsDateTime(day.date, stop.startTime);
      const endIso = formatIcsDateTime(day.date, stop.endTime);

      lines.push("BEGIN:VEVENT");
      lines.push(`UID:voyara-${itinerary.id}-${stop.id}@voyara.luxury`);
      lines.push(`DTSTAMP:${nowStamp}`);
      lines.push(`DTSTART:${startIso}`);
      lines.push(`DTEND:${endIso}`);
      lines.push(`SUMMARY:${escapeIcsText(stop.title)} (Voyara VIP)`);

      const description = [
        `Destination: ${itinerary.destination}`,
        `Category: ${stop.category.toUpperCase()}`,
        stop.notes ? `Concierge Notes: ${stop.notes}` : "",
        stop.bookingRef ? `Confirmation: ${stop.bookingRef}` : "",
        stop.costEstimate ? `Estimated Fare/Fee: ${stop.costEstimate}` : "",
        stop.vipPerks?.length ? `VIP Inclusions: ${stop.vipPerks.join(", ")}` : "",
        "Curated by Voyara Autonomous Travel Concierge.",
      ]
        .filter(Boolean)
        .join("\\n");

      lines.push(`DESCRIPTION:${escapeIcsText(description)}`);

      if (stop.locationName) {
        lines.push(`LOCATION:${escapeIcsText(stop.locationName + (stop.address ? ", " + stop.address : ""))}`);
      }

      if (stop.coords) {
        lines.push(`GEO:${stop.coords[0].toFixed(5)};${stop.coords[1].toFixed(5)}`);
      }

      lines.push("STATUS:CONFIRMED");

      // 15-minute prior alarm
      lines.push("BEGIN:VALARM");
      lines.push("ACTION:DISPLAY");
      lines.push(`DESCRIPTION:Upcoming: ${escapeIcsText(stop.title)}`);
      lines.push("TRIGGER:-PT15M");
      lines.push("END:VALARM");

      lines.push("END:VEVENT");
    });
  });

  lines.push("END:VCALENDAR");

  return lines.join("\r\n");
}

function escapeIcsText(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

/**
 * Trigger client-side download of the generated .ics file
 */
export function downloadItineraryIcs(itinerary: Itinerary): void {
  if (typeof window === "undefined") return;

  const icsData = generateItineraryIcs(itinerary);
  const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `voyara_${itinerary.destination.toLowerCase().replace(/\s+/g, "_")}_itinerary.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
