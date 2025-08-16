"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebarAdmin } from "../components/app-sidebarAdmin";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SwitchComponent } from "@/app/(erp)/core/components/switch";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SidebarProvider>
          <AppSidebarAdmin />
          <SidebarTrigger />

          <div className="w-full px-5 py-5">
            <SwitchComponent />
            {children}
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}
