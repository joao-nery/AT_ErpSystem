import { Button } from "@/components/ui/button";
import { ChevronDownCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function TitleHero() {
  return (
    <main className="h-[750px] mb-40 w-full flex flex-col dark:bg-[0f0f0f] justify-center items-center">
      <section className="flex flex-col lg:flex-row justify-center items-center lg:gap-10">
        <header className="flex flex-col w-[350px] md:w-[600px] lg:w-[600px] xl:w-[800px] md:px-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
            Otimize Sua Gestão Empresarial com o AT-ERP
          </h1>
          <h2 className="text-md mt-5 text-muted-foreground mx-auto">
            Controle financeiro, fluxo de caixa, contas a pagar/receber e muito
            mais, tudo em um só lugar. Acesso fácil, onde você estiver
          </h2>

          <div className="flex gap-5 items-center mb-10 mt-10">
            <Button
              variant="outline"
              className="cursor-pointer dark:bg-black bg-white text-black dark:text-white">
              <Link href="/pages/register">Acesse Grátis Agora!</Link>
            </Button>
            <Button className="cursor-pointer">
              <Link href="/pages/login">Já sou cliente!</Link>
            </Button>
          </div>
        </header>

        <div className="flex items-center gap-5 justify-center">
          <Image
            src="/devicecomputer.png"
            alt="Devices"
            width={250}
            height={0}
            className="md:w-[330px] lg:w-[400px]"
          />
          <Image
            src="/Devices.png"
            alt="Devices"
            width={100}
            height={0}
            className="relative top-10 -ml-20 lg:-ml-30 md:-ml-30 md:top-15 md:w-[160px] lg:w-[170px]"
          />
        </div>
      </section>

      <div className="flex flex-col relative top-30 gap-1 hover:text-gray-600 items-center">
        <ChevronDownCircle
          className="animate-bounce cursor-pointer"
          size={30}
        />
        <p>Saiba Mais</p>
      </div>
    </main>
  );
}
