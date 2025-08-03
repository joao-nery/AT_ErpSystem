"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { MenuIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [icon, setIcon] = useState(false);
  const { setTheme } = useTheme();

  function handleToggleTheme() {
    setTheme((prevState) => (prevState === "dark" ? "light" : "dark"));
    setIcon((prevState) => !prevState);
  }

  return (
    <nav className="sticky top-0 z-50">
      <nav className="hidden px-10 py-3 border-b-2 dark:text-white md:block top-0 z-50 dark:bg-neutral-800 bg-white">
        <ul className="flex justify-between items-center">
          <div className="font-bold flex items-center gap-2">
            <div className="size-5 rounded-full bg-slate-800 dark:bg-white"></div>
            <Link href="/">ERP System</Link>
          </div>
          <div className="flex gap-5 items-center">
            <li>
              <Button variant="outline">
                <Link href="/pages/register">Acesse Grátis Agora!</Link>
              </Button>
            </li>
            <div className="flex items-center gap-2 border px-3 py-2 rounded-2xl">
              {icon ? <SunIcon /> : <MoonIcon />}
              <Switch onClick={handleToggleTheme} />
            </div>
          </div>
        </ul>
      </nav>

      <nav className="p-3 dark:bg-neutral-800 bg-white border-1 md:hidden sticky z-50">
        <Sheet>
          <div className="flex items-center justify-between">
            <SheetTrigger asChild>
              <MenuIcon />
            </SheetTrigger>
            <div>
              <Switch onClick={handleToggleTheme} type="button" />
            </div>
          </div>
          <SheetContent side="left" className="w-[350px] sm:w-[540px]">
            <SheetHeader className="font-semibold text-2xl">
              Erp System
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </nav>
    </nav>
  );
}
