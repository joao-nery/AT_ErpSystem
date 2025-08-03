import Link from "next/link";
import "./globals.css";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b to-slate-200 from-slate-100">
      <h2 className="text-4xl font-semibold">Not Found - 404</h2>
      <p>Could not find requested resource</p>
      <p>
        Clique aqui para
        <Link className="text-blue-300" href="/">
          voltar
        </Link>
      </p>
    </div>
  );
}
