import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function ContentCTA() {
  return (
    <main className="h-[900px] mb-50 md:px-10 lg:px-20 xl:px-20 flex flex-col text-center justify-center items-center ">
      <section
        className="
        border-1 md:px-10 lg:px-15 xl:flex-row xl:px-30 border-gray-300 shadow xl:h-[700px] h-[900px] flex flex-col justify-center items-center  m-5 rounded-2xl shadow-card-foreground">
        <div>
          <h1
            className="
            text-2xl font-bold
            md:text-3xl
            lg:text-4xl
            xl:text-5xl xl:w-[600px] xl:text-left ">
            O Futuro do seu Negócio Começa com a Decisão que Você Toma Hoje.
          </h1>
          <p className="text-xl font-light mt-5 xl:w-[600px] xl:text-left">
            Experimente a plataforma que vai te dar a clareza e o
            profissionalismo que você sempre buscou. Sem compromisso, sem cartão
            de crédito
          </p>
          <Button
            className=" mt-10 w-[200px] h-[50px] rounded-[60px] cursor-pointer shadow-card-foreground xl:float-left
              md:w-[200px] md:h-[60px] md:text-lg
              xl:w-[300px] xl:h-[80px] xl:text-xl
            bg-rose-600 hover:bg-rose-700">
            <Link href="/pages/register">Quero agora!</Link>
          </Button>
        </div>

        <Image
          width="400"
          height="400"
          src="/Wavy_Bus-32_Single-10.jpg"
          alt="Image"
          className="xl:w-[500px]"
        />
      </section>
    </main>
  );
}
