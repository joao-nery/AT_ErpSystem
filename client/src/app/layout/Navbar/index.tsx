"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky bg-white shadow top-0 z-50 xl:px-20 *:transition-all">
      <div className="p-5 md:flex justify-between items-center">
        <Link href="/">
          <p
            className="font-black text-[20px] text-center cursor-pointer"
            onClick={() => window.scroll({ top: 0 })}>
            AT-ERP{" "}
            <span className="text-[#ED254E] hover:text-red-700">System</span>
          </p>
        </Link>

        <ul className="lg:flex gap-10 hidden text-gray-400 *:hover:text-gray-600 *:hover:underline *:cursor-pointer">
          <li onClick={() => window.scroll({ top: 1000 })}>Features</li>
          <li onClick={() => window.scroll({ top: 2600 })}>Confidence</li>
          <li onClick={() => window.scroll({ top: 3700 })}>CTA</li>
        </ul>

        <div className="md:flex items-center gap-2 hidden">
          <Button variant="link">
            <Link href="/pages/login">Login</Link>
          </Button>

          <Button className="border-2 border-black bg-amber-300 text-black hover:bg-amber-400 rounded-4xl">
            <Link href="/pages/register" className="font-bold">
              Cadastre-se
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
