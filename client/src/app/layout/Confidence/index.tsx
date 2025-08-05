import Image from "next/image";

export default function Confidence() {
  return (
    <main className="h-[calc(1000px)] flex flex-col justify-center items-center  ">
      <section className="flex xl:justify-center gap-20">
        <div className="w-1/3">
          <h1 className="text-3xl xl:text-5xl xl:text-left font-bold ">
            Cansamos do Jogo Injusto. Por isso, Criamos a Solução.
          </h1>
          <p className="mt-10 text-xl text-[#414141]">
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
          width="450"
          height="400"
          alt="Image"
          className="mt-15 xl:mt-0"
        />
      </section>
    </main>
  );
}
