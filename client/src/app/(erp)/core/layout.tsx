"use client";

import "@/app/globals.css";
import { AppSidebar } from "@/app/(erp)/core/components/app-sidebar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SwitchComponent } from "./components/switch";

export default function coreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <SidebarTrigger />
            <SwitchComponent />
            {children}
          </main>
        </SidebarProvider>
      </ThemeProvider>
    </main>
  );
}
