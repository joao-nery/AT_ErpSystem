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
            <Link href="/" className="font-bold">
              ERP <span className="text-red-500">System</span>
            </Link>
          </div>

          <ul className="hidden xl:flex gap-5">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">Benefits</li>
            <li className="hover:underline cursor-pointer">About</li>
            <li className="hover:underline cursor-pointer">Testemonials</li>
          </ul>

          <div className="flex gap-5 items-center">
            <li className="flex gap-5 ">
              <Button variant="default" className="rounded-xl">
                <Link href="/pages/login" className="font-semibold">
                  Login
                </Link>
              </Button>

              <Button className="bg-red-500 hover:bg-red-700 dark:text-white rounded-xl">
                <Link href="/pages/register" className="font-semibold">
                  Cadastre-se
                </Link>
              </Button>
            </li>
            <div className="flex ">
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
