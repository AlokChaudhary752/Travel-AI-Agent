import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voyara | Operations & Revenue Dashboard",
  description: "Enterprise SaaS Admin Dashboard for Voyara Luxury Travel",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen overflow-hidden bg-[#F8F9FA] dark:bg-[#0B0E11]">
      {children}
    </div>
  );
}
