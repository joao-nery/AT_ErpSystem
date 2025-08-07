import Image from "next/image";

export default function Confidence() {
  return (
    <main className="h-[1300px] flex flex-col justify-center items-center  ">
      <section className="p-10 md:flex lg:px-20 gap-10 items-center justify-center">
        <div className="lg:w-[500px]">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold">
            Cansamos do Jogo Injusto. Por isso, Criamos a Solução.
          </h1>
          <p className="mt-10 lg:text-xl text-foreground">
            Sabemos como é. Você trabalha duro, faz tudo acontecer, mas sente
            que as ferramentas de gestão são feitas para os grandes. Sistemas
            caros, complexos, cheios de funções que você nunca vai usar.
            Enquanto isso, as planilhas se tornam um monstro e o caderno não te
            dá visão de futuro.
            <br /> <br />
            Nós acreditamos que todo negócio, não importa o tamanho, merece uma
            gestão profissional. Por isso, criamos uma plataforma que fala a sua
            língua: poderosa no que importa, simples de usar e com um preço que
            faz sentido para a sua realidade.
          </p>
        </div>
        <Image
          src="/Wavy_Bus-29_Single-03.jpg"
          width="1000"
          height="1000"
          alt="Image"
          className="
            mt-15 
            w-[400px]
            md:w-[300px]
            lg:w-[400px]
            xl:w-[500px]
            xl:mt-0 "
        />
      </section>
    </main>
  );
}
