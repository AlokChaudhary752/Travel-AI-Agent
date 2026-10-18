import { Itinerary } from "../types";

/**
 * Open an ultra-luxury print-ready travel dossier formatted for A4 PDF export
 */
export function openPrintableItineraryDossier(itinerary: Itinerary): void {
  if (typeof window === "undefined") return;

  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>VOYARA VIP DOSSIER — ${itinerary.title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap');

    @page {
      size: A4;
      margin: 18mm 14mm 18mm 14mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: #07090D;
      color: #F5F1E8;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 11pt;
      line-height: 1.5;
      padding: 24px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .header {
      border-bottom: 2px solid #C9A24B;
      padding-bottom: 18px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .brand {
      font-family: 'Cormorant Garamond', serif;
      font-size: 28pt;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: #F5F1E8;
      font-weight: 300;
    }

    .brand-sub {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8pt;
      letter-spacing: 0.25em;
      color: #C9A24B;
      text-transform: uppercase;
      margin-top: 4px;
    }

    .meta-box {
      text-align: right;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9pt;
      color: #8A8F98;
    }

    .meta-box strong {
      color: #C9A24B;
    }

    .dossier-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 22pt;
      font-weight: 400;
      color: #F5F1E8;
      margin-bottom: 6px;
    }

    .dossier-subtitle {
      color: #8A8F98;
      font-size: 10pt;
      margin-bottom: 20px;
    }

    .day-container {
      margin-bottom: 24px;
      page-break-inside: avoid;
      background: #0E1218;
      border: 1px solid rgba(201, 162, 75, 0.25);
      padding: 16px;
    }

    .day-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 10px;
      margin-bottom: 12px;
    }

    .day-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 14pt;
      color: #C9A24B;
    }

    .day-weather {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8.5pt;
      color: #8A8F98;
    }

    .stop-row {
      display: flex;
      padding: 8px 0;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.06);
    }

    .stop-row:last-child {
      border-bottom: none;
    }

    .stop-time {
      width: 100px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9pt;
      color: #C9A24B;
      flex-shrink: 0;
    }

    .stop-info {
      flex: 1;
    }

    .stop-title {
      font-weight: 600;
      color: #F5F1E8;
      font-size: 10.5pt;
    }

    .stop-location {
      font-size: 8.5pt;
      color: #8A8F98;
      margin-top: 2px;
    }

    .stop-notes {
      font-size: 8.5pt;
      color: #E6CF8E;
      margin-top: 4px;
      font-style: italic;
    }

    .footer {
      margin-top: 36px;
      border-top: 1px solid rgba(201, 162, 75, 0.2);
      padding-top: 14px;
      display: flex;
      justify-content: space-between;
      font-family: 'JetBrains Mono', monospace;
      font-size: 8pt;
      color: #8A8F98;
    }

    @media print {
      body {
        padding: 0;
      }
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="no-print" style="margin-bottom: 20px; text-align: right;">
    <button onclick="window.print()" style="background: #C9A24B; color: #07090D; border: none; padding: 10px 20px; font-weight: bold; cursor: pointer; text-transform: uppercase; font-family: sans-serif; font-size: 12px; letter-spacing: 0.1em;">
      Print / Save to PDF
    </button>
  </div>

  <div class="header">
    <div>
      <div class="brand">VOYARA</div>
      <div class="brand-sub">Private AI Travel Concierge — VIP Dossier</div>
    </div>
    <div class="meta-box">
      <div>Lead Guest: <strong>${itinerary.leadGuest}</strong></div>
      <div>Dates: <strong>${itinerary.startDate} ➔ ${itinerary.endDate}</strong></div>
      <div>Concierge Hotline: <strong>+41 800 VOYARA VIP</strong></div>
    </div>
  </div>

  <div class="dossier-title">${itinerary.title}</div>
  <div class="dossier-subtitle">Destination: ${itinerary.destination} • Party Size: ${itinerary.partySize} Guests • Verification: GDS Direct & Disruption Shield Active</div>

  ${itinerary.days
    .map(
      (day) => `
    <div class="day-container">
      <div class="day-header">
        <div class="day-title">Day ${day.dayNumber} — ${day.title}</div>
        <div class="day-weather">${day.date} • ${day.weatherSummary.temp} • ${day.weatherSummary.condition}</div>
      </div>
      <div>
        ${day.stops
          .map(
            (stop) => `
          <div class="stop-row">
            <div class="stop-time">${stop.startTime} - ${stop.endTime}</div>
            <div class="stop-info">
              <div class="stop-title">${stop.title}</div>
              <div class="stop-location">${stop.locationName}${stop.address ? " • " + stop.address : ""}</div>
              ${stop.notes ? `<div class="stop-notes">${stop.notes}</div>` : ""}
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `
    )
    .join("")}

  <div class="footer">
    <div>Generated by Voyara Autonomous Multi-Tool Intelligence</div>
    <div>Strictly Confidential • AES-256 Vault Verified</div>
  </div>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
