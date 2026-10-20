"use client";

import React from "react";

export default function DashboardPage() {
  return (
    <div className="w-full h-full relative">
      <iframe
        src="/dashboard.html"
        className="w-full h-full border-none block"
        title="Voyara Executive Operations Dashboard"
      />
    </div>
  );
}
