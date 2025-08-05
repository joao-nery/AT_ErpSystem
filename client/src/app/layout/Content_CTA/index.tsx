import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ContentCTA() {
  return (
    <main className="h-[1100px] flex flex-col text-center justify-center items-center ">
      <section className="border-1 border-gray-300 shadow h-[500px] flex flex-col justify-center items-center p-5 m-5 rounded-2xl ">
        <h1 className="text-2xl xl:text-5xl xl:w-2/3 font-bold">
          O Futuro do seu Negócio Começa com a Decisão que Você Toma Hoje.
        </h1>
        <p className="text-xl font-light mt-5 xl:w-1/2">
          Experimente a plataforma que vai te dar a clareza e o profissionalismo
          que você sempre buscou. Sem compromisso, sem cartão de crédito
        </p>
        <Button className="py-7 rounded-4xl mt-10 px-10 font-medium bg-[#ED254E]">
          <Link href="/pages/register">Quero agora!</Link>
        </Button>
      </section>
    </main>
  );
}
