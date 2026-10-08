import type { Metadata } from "next";
import "./globals.css";
import AppLayoutClient from "@/components/AppLayoutClient";

export const metadata: Metadata = {
  title: "PRISM Engine | Multi-Dimensional STEAM Career Guidance",
  description: "AI-powered career guidance platform combining Student DNA, Family Affordability, and Future Market Demand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen">
        <AppLayoutClient>{children}</AppLayoutClient>
      </body>
    </html>
  );
}
