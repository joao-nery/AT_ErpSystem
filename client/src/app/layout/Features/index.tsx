import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { HandCoins, Handshake, PiggyBank } from "lucide-react";

export function Features() {
  return (
    <main className="h-[1500px] flex flex-col justify-center items-center">
      <h1
        className="
        text-3xl text-center font-bold 
        md:text-4xl md:w-[700px]  
        xl:text-5xl">
        Deixe de Apenas Anotar, Comece a Analisar.
      </h1>

      <div
        className="
        *:p-10 *:md:w-[500px]
        p-10 grid gap-5">
        <Card className="bg-[#F9DC5C]">
          <CardHeader>
            <div className="flex items-center gap-5">
              <PiggyBank size={60} />
              <p className="text-xl leading-5 font-semibold">
                Saiba para onde vai seu dinheiro
              </p>
            </div>
          </CardHeader>
          <CardContent className="-mt-5">
            <p className="text-[#707070]">
              Controle suas despesas e receitas de forma simples. Veja seu fluxo
              de caixa e entenda de verdade se o seu negócio está dando lucro.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#27292B] text-white">
          <CardHeader>
            <div className="flex items-center gap-5">
              <Handshake size={60} />
              <p className="text-xl  leading-5 font-semibold">
                Conheça seus clientes e venda mais.
              </p>
            </div>
          </CardHeader>
          <CardContent className="-mt-3 p-4">
            <p className="text-[#cfcfcf] leading-4.5">
              Tenha um cadastro simples de todos os seus clientes. Anote
              informações importantes e crie um relacionamento mais próximo para
              fidelizá-los.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#ED254E] text-white">
          <CardHeader>
            <div className="flex items-center gap-5">
              <HandCoins size={60} />
              <p className="text-xl leading-5 font-semibold">
                Nunca mais perca uma venda de vista
              </p>
            </div>
          </CardHeader>
          <CardContent className="-mt-3 p-3">
            <p className="text-[#eaeaea] leading-4.5">
              Registre todas as suas vendas rapidamente. Saiba quem comprou, o
              que comprou e quando. Tenha um histórico completo para consultar
              sempre que precisar.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
