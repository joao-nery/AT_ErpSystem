import { Navbar } from "@/app/(landingpage)/layout/Navbar";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ERP System - Seu Sistema de Gestão",
  description: "ERP System - Seu Sistema de Gestão",
};

export default function landingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <title>ERP System - Seu Sistema de Gestão</title>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
