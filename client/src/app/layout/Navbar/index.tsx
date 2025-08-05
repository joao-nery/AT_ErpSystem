import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky bg-white shadow top-0 z-50 xl:px-20">
      <div className="p-5 md:flex justify-between items-center">
        <p className="font-bold text-center ">
          AT-ERP<span className="text-[#ED254E]">System</span>
        </p>

        <ul className="lg:flex gap-10 hidden text-gray-400 *:hover:text-gray-600 *:hover:underline *:cursor-pointer">
          <li>Features</li>
          <li>Confidence</li>
          <li>About</li>
        </ul>

        <div className="md:flex items-center gap-2 hidden">
          <Button className="underline" variant="ghost">
            <Link href="pages/login" className="font-normal ">
              Login
            </Link>
          </Button>
          <Button className="border-2 border-black bg-amber-300 text-black hover:bg-amber-400 rounded-4xl">
            <Link href="pages/register" className="font-bold">
              Cadastre-se
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
