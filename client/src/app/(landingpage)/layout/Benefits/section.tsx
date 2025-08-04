import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { BadgeDollarSign, BoxIcon, DollarSign } from "lucide-react";

export function Section() {
  return (
    <section className="flex flex-col items-center px-10">
      <div className="grid md:grid-cols-3 px-10 my-10 gap-5 *:hover:scale-105 *:transition-all *:drop-shadow-xl *:dark:bg-neutral-900 *:dark:border-neutral-700 *:dark:text-white">
        {/* --Cards-- */}
        <Card className="p-5 text-center">
          <CardTitle className="flex flex-col items-center">
            <BadgeDollarSign size={40} />
            <p className="mt-5 text-[#652323]">
              Saiba para onde vai o seu dinheiro!
            </p>
          </CardTitle>
          <CardDescription>
            Controle suas despesas e receitas de forma simples. Veja seu fluxo
            de caixa e entenda de verdade se o seu negócio está dando lucro.
          </CardDescription>
        </Card>

        <Card className="p-5">
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2" />
            <p>Controle Total de Finanças</p>
          </CardTitle>
          <CardDescription>
            Gerencie suas contas a pagar/receber, fluxo de caixa e fluxo de
            caixa com facilidade.
          </CardDescription>
        </Card>

        <Card className="p-5">
          <CardTitle className="flex items-center">
            <BoxIcon className="mr-2" />
            <p>Organização Simplificada</p>
          </CardTitle>
          <CardDescription>
            Centralize dados de clientes, fornecedores e produtos, eliminando a
            bagunça e otimizando a busca por informações.
          </CardDescription>
        </Card>
        {/* --Cards-- */}
      </div>
    </section>
  );
}
