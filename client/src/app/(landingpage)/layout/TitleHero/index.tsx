import { Button } from "@/components/ui/button";
import { ChevronDownCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function TitleHero() {
  return (
    <main className="h-[calc(100dvh-60px)] mb-40 w-full flex flex-col dark:bg-[0f0f0f] justify-center items-center">
      <section className="flex flex-col lg:flex-row justify-center items-center lg:gap-10">
        {/* ---Header---- */}
        <header className="flex flex-col justify-center items-center w-[450px] md:w-[600px] lg:w-[900px] xl:w-[1200px]">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center">
            O Controle Total do seu Negócio na Palma da Mão.
          </h1>

          <div className="flex  items-center gap-5 justify-center">
            <Image
              src="/devicecomputer.png"
              alt="Devices"
              width={250}
              height={0}
              className="md:w-[330px] lg:w-[350px]"
            />
            <Image
              src="/Devices.png"
              alt="Devices"
              width={100}
              height={0}
              className="relative top-10 -ml-20 lg:-ml-30 md:-ml-30 md:top-15 md:w-[140px] lg:w-[150px]"
            />
          </div>
          <p className="text-md md:text-xl mt-20 md:w-[600px] xl:w-[900px] xl:text-2xl xl:leading-9 text-[#958B8B] leading-6 mx-auto text-center">
            Organize suas vendas, clientes, estoque e finanças em um só lugar.
            De forma fácil, rápida e que cabe no seu bolso.
          </p>

          <Button
            variant="default"
            className="cursor-pointer py-6 px-8 xl:py-8 xl:px-10 rounded-2xl mt-10">
            <Link href="/pages/register" className="xl:text-xl">
              Começe a organizar agora
            </Link>
          </Button>
        </header>
        {/* ---Header---- */}
      </section>

      {/* <div className="flex flex-col relative top-30 gap-1 hover:text-gray-600 items-center">
        <ChevronDownCircle className="animate-bounce cursor-pointer size-10 xl:size-12" />
        <p className="xl:text-xl">Saiba Mais</p>
      </div> */}
    </main>
  );
}
