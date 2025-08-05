import { Navbar } from "@/app/layout/Navbar";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
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
    <html lang="pt-BR" suppressHydrationWarning>
      <title>ERP System - Seu Sistema de Gestão</title>
      <body className={`${dmSans.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
