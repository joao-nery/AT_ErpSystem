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
import Link from "next/link";

const formSchema = z.object({
  email: z
    .string()
    .min(2, { message: "O usuário deve ter pelo menos 2 caracteres" })
    .email(),

  confirmPassword: z
    .string()
    .min(8, { message: "O usuário deve ter pelo menos 8 caracteres" })
    .email(),

  password: z
    .string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
});

type FormProps = z.infer<typeof formSchema>;

export default function ForgotPassword() {
  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      confirmPassword: "",
      password: "",
    },
  });

  function onSubmit(values: FormProps) {
    console.log(values);
    window.location.replace("/Dashboard");
  }

  function jaPossuiCadastro() {
    window.location.replace("/");
  }

  return (
    <main className="h-screen w-full flex justify-center items-center bg-neutral-100 dark:bg-neutral-900">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" py-15 px-5 h-max gap-5 bg-white w-[400px] rounded-xl shadow-2xl flex flex-col justify-center dark:bg-neutral-800 dark:border-1 dark:border-neutral-700">
          <h1 className="text-2xl font-semibold text-center pb-5">
            ERP System - Tela de Atualizar Senha
          </h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail:</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Digite o e-mail de sua loja..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Digite sua senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme sua senha:</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirme sua senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="py-6 cursor-pointer" type="submit">
            Submit
          </Button>
          <div className="flex justify-between">
            <Link
              onClick={jaPossuiCadastro}
              href="#"
              className="text-gray-400 hover:text-gray-500 text-sm">
              Já possui acesso?
            </Link>
          </div>
        </form>
      </Form>
    </main>
  );
}
