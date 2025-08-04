"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { UserCircle2, UserIcon } from "lucide-react";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  description: z.string().min(2, {
    message: "O usuário deve ter pelo menos 2 caracteres",
  }),

  supplier: z.string(),

  barCode: z.string(),

  reference: z.string().min(4, {
    message: "A referência deve ter pelo menos 4 caracteres",
  }),

  size: z.string(),
  categories: z.string(),
  quantity: z.string().min(1, {
    message: "A quantidade deve ser maior que 0",
  }),
  weight: z.string(),
});

type FormProps = z.infer<typeof formSchema>;

export default function RegisterClient() {
  const [barCode, setBarCode] = useState("");

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      barCode: "",
      reference: "",
      supplier: "",
      size: "",
      categories: "",
      quantity: "",
      weight: "",
    },
  });

  async function onSubmit(values: FormProps) {
    // validar login
  }
  return (
    <main className="w-full p-10">
      <Form {...form}>
        <div className="flex flex-col items-center">
          <UserCircle2 size={40} />
          <h1 className="text-2xl font-semibold mb-5">Cadastro de Clientes</h1>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col border gap-5 p-10 w-full h-max shadow">
          <div className="flex  w-full gap-5">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome do cliente"
                      type="text"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="barCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="000.000.000-00"
                      type="text"
                      {...field}
                      value={barCode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genêro</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Label>
                        <Input type="radio" {...field} />
                        Masculino
                      </Label>
                      <Label>
                        <Input type="radio" {...field} />
                        Feminino
                      </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-full gap-5">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome do cliente"
                      type="text"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(00) 00000-0000"
                      type="text"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="00000-000"
                      type="text"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome da cidade"
                      type="text"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome do estado"
                      type="text"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="py-5 w-40">
            Cadastrar
          </Button>
        </form>
      </Form>
    </main>
  );
}
