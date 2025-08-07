import { Navbar } from "@/app/(public)/layout/Navbar";
import "@/app/globals.css";
import { Metadata } from "next";
import { DM_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: "ERP System - Seu Sistema de Gestão",
  description: "ERP System - Seu Sistema de Gestão",
};

const dmSans = DM_Sans({
  adjustFontFallback: true,
  axes: ["opsz"],
  subsets: ["latin", "latin-ext"],
});

export default function landingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={`${dmSans.className}`}>
      <Navbar />
      {children}
    </main>
  );
}
