import React from "react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="min-h-screen flex flex-col bg-bg text-ivory">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
