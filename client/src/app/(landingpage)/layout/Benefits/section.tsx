import { Card, CardTitle, CardDescription } from "@/components/ui/card";

import {
  BoxIcon,
  Cloud,
  DollarSign,
  Lock,
  Paperclip,
  Star,
} from "lucide-react";

export function Section() {
  return (
    <section className="flex flex-col items-center px-10">
      <h2 className="text-xl lg:text-2xl text-center px-5 font-semibold mb-5 mt-25">
        Transforme Sua Gestão com os Benefícios do AT-ERP
      </h2>
      <div className="grid px-10 my-10 xl:w-[900px] grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-5 mt-5 *:transition-all *:dark:bg-neutral-900 *:dark:border-neutral-700 *:dark:text-white">
        <Card className="p-5 hover:scale-105">
          <CardTitle className="flex items-center">
            <Star className="mr-2" />
            <p>Visão Completa em Tempo Real</p>
          </CardTitle>
          <CardDescription>
            Tenha dashboards intuitivos com todas as informações financeiras ao
            seu alcance, atualizadas instantaneamente.
          </CardDescription>
        </Card>

        <Card className="p-5 hover:scale-105">
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2" />
            <p>Controle Total de Finanças</p>
          </CardTitle>
          <CardDescription>
            Gerencie suas contas a pagar/receber, fluxo de caixa e fluxo de
            caixa com facilidade.
          </CardDescription>
        </Card>

        <Card className="p-5 hover:scale-105">
          <CardTitle className="flex items-center">
            <BoxIcon className="mr-2" />
            <p>Organização Simplificada</p>
          </CardTitle>
          <CardDescription>
            Centralize dados de clientes, fornecedores e produtos, eliminando a
            bagunça e otimizando a busca por informações.
          </CardDescription>
        </Card>

        <Card className="p-5 hover:scale-105">
          <CardTitle className="flex items-center">
            <Paperclip className="mr-2" />
            <p>Relatórios Inteligentes</p>
          </CardTitle>
          <CardDescription>
            Gere relatórios financeiros detalhados para análises precisas e
            tomadas de decisão mais assertivas.
          </CardDescription>
        </Card>

        <Card className="p-5 hover:scale-105">
          <CardTitle className="flex items-center">
            <Cloud className="mr-2" />
            <p>Acesso de Qualquer Lugar</p>
          </CardTitle>
          <CardDescription>
            Por ser um sistema web, acesse seus dados de qualquer dispositivo
            com internet, a qualquer hora.
          </CardDescription>
        </Card>

        <Card className="p-5 hover:scale-105">
          <CardTitle className="flex items-center ">
            <Lock className="mr-2" />
            <p>Segurança dos Seus Dados</p>
          </CardTitle>
          <CardDescription>
            Seus dados são protegidos com as mais avançadas tecnologias de
            segurança, garantindo a privacidade e integridade das suas
            informações.
          </CardDescription>
        </Card>
      </div>
    </section>
  );
}
