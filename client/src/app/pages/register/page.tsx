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

import { Badge } from "@/components/ui/badge";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BoxIcon, ChromeIcon } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O usuário deve ter pelo menos 2 caracteres" }),

  email: z
    .string()
    .min(2, { message: "O usuário deve ter pelo menos 2 caracteres" })
    .email(),

  password: z
    .string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial",
      }
    ),
});

type FormProps = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const router = useRouter();

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormProps) {
    const res = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (res.status === 409) {
      toast("Usuário já existente", {
        position: "top-center",
        description: "Este cadastro existente",
        duration: 3000,
      });
    }

    if (!res.ok) {
      toast("Ocorreu um erro ao realizar o cadastro!", {
        position: "top-center",
        description: "Internal Server Erro",
        duration: 3000,
      });
      throw new Error("Erro ao cadastrar");
    }

    toast("Cadastro realizado com sucesso!", {
      position: "top-center",
      description: "O cadastro foi realizado com sucesso!",
      duration: 3000,
    });

    setInterval(() => {
      router.push("/pages/login");
    }, 2000);
  }

  return (
    <main className="h-[calc(100vh-69px)] pb-20 w-full flex flex-col justify-center items-center bg-neutral-100 dark:bg-neutral-900">
      <div className="flex mb-6 gap-2">
        <Badge>
          <BoxIcon />
        </Badge>
        <p>ERP-System.</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" py-15 px-5 h-max gap-5 dark:bg-[#0f0f0f]  w-[400px] rounded-xl shadow-2xl  flex flex-col justify-center">
          <div>
            <h1 className="text-2xl font-semibold text-center">Cadastro</h1>
            <p className="text-sm text-center text-gray-400">Crie sua conta</p>
          </div>

          <div className="flex flex-col gap-2">
            <Button variant="outline">
              <ChromeIcon />
              Cadastrar-se com Google
            </Button>
          </div>

          <hr />

          <div className="flex flex-col gap-5 mt-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome:</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="bg-white"
                      placeholder="Digite seu nome"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail:</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="bg-white"
                      placeholder="Digite seu e-mail"
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
                  <FormLabel>Senha:</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="bg-white"
                      placeholder="Digite sua senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="py-6 cursor-pointer" type="submit">
            Registrar-se
          </Button>
          <div className="w-full ">
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
              Ja possui uma conta?{" "}
              <Link href="/pages/login" className="underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </Form>

      <Toaster />
    </main>
  );
}
