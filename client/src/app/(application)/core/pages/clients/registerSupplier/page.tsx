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

import { Container } from "lucide-react";

const formSchema = z.object({
  companyName: z.string().min(2, {
    message: "A razão social do fornecedor deve ter pelo menos 2 caracteres",
  }),

  cnpj: z
    .string()
    .min(15, { message: "O CNPJ deve ter pelo menos 15 caracteres" }),

  address: z.string().min(2, {
    message: "O endereço do fornecedor deve ter pelo menos 2 caracteres",
  }),

  phone: z.string().min(8, {
    message: "O telefone do fornecedor deve ter pelo menos 2 caracteres",
  }),

  cep: z.string().min(8, {
    message: "O cep do fornecedor deve ter pelo menos 8 caracteres",
  }),

  city: z.string().min(2, {
    message: "A cidade do fornecedor deve ter pelo menos 2 caracteres",
  }),

  state: z.string().min(2, {
    message: "O estado do fornecedor deve ter pelo menos 2 caracteres",
  }),

  streetNumber: z.string().min(2, {
    message: "O número da rua do fornecedor deve ter pelo menos 2 caracteres",
  }),
});

type FormProps = z.infer<typeof formSchema>;

export default function RegisterClient() {
  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      cnpj: "",
      address: "",
      phone: "",
      cep: "",
      city: "",
      state: "",
      streetNumber: "",
    },
  });

  async function onSubmit(values: FormProps) {
    // validar login
  }
  return (
    <main className="w-full p-10">
      <Form {...form}>
        <div className="flex flex-col items-center">
          <Container size={40} />
          <h1 className="text-2xl font-semibold mb-5">
            Cadastro de Fornecedores
          </h1>
        </div>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col border gap-5 p-10 w-full h-max shadow">
          <div className="flex  w-full gap-5">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Razão Social</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome do fornecedor"
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
              name="cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="000.000.000/0000-00"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-full flex-col gap-5">
            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Endereço do fornecedor"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(00) 00000-0000"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-4 gap-5">
              <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <Input placeholder="00000-000" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Cidade" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Informe o Estado"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="streetNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input placeholder="S/N" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" className="py-5 w-40">
            Cadastrar
          </Button>
        </form>
      </Form>
    </main>
  );
}
