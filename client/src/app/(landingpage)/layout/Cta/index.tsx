import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CTA() {
  return (
    <main className="w-full bg-neutral-100 dark:bg-[#0f0f0f] h-[600px] lg:h-[800px] text-center flex flex-col justify-center items-center ">
      <section className="w-[400px] xl:w-[800px]">
        <h2 className="text-xl xl:text-3xl font-semibold">
          Comece a Otimizar Sua Gestão Hoje Mesmo!
        </h2>
        <p className="text-muted-foreground text-sm lg:text-lg mt-5">
          Dê o primeiro passo rumo a uma gestão financeira sem complicações.
          Cadastre-se agora e tenha acesso imediato ao seu novo aliado de
          negócios.
        </p>
        <div className="flex flex-col gap-5 items-center mt-10">
          <div className="flex gap-5 items-center justify-center">
            <Input
              type="email"
              placeholder="Insira seu e-mail"
              className="bg-white text-black py-6 w-[250px] lg:w-[400px]"
            />
            <Button className="px-5 py-6 lg:px-10 cursor-pointer">
              Submit
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
