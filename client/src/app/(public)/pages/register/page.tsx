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
import { useRouter } from "next/navigation";
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
    <main className="h-[calc(100dvh-65px)] bg-gradient-to-b to-red-400 from-rose-500  w-full flex flex-col justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="py-15 px-20 h-[550px] gap-5 border-2 bg-white border-gray-200  w-[350px] rounded-[30px] shadow-xl  flex flex-col justify-center
            md:w-[450px]
            lg:w-[550px]
            xl:w-[550px] xl:h-[790px]
          ">
          <div className="text-center flex flex-col justify-center items-center">
            <h1
              className="
            text-2xl font-semibold 
            xl:text-3xl
            ">
              Bem vindo ao AT-ERP!
            </h1>
            <p
              className="text-sm text-gray-500
            w-[200px] xl:w-[300px] xl:text-xl
            ">
              Crie sua conta!
            </p>
          </div>

          <div className="flex flex-col justify-center gap-5 mt-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Nome</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="bg-gray-100 border-none py-6"
                      placeholder="Informe seu nome"
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
                  <FormLabel className="text-md">E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="bg-gray-100 border-none py-6"
                      placeholder="email@example.com"
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
                  <FormLabel className="text-md">Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="bg-gray-100 border-none py-6"
                      placeholder="**********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="py-8 bg-[#ED254E] mt-7 rounded-[60px] shadow-card-foreground hover:bg-rose-700 text-lg cursor-pointer"
              type="submit">
              Registrar-se
            </Button>

            <hr className=" border-gray-300" />

            <div className="w-full flex flex-col justify-center items-center gap-5">
              <Button
                variant="ghost"
                className="border-2 xl:w-[300px] border-gray-300 py-7 rounded-full">
                <svg
                  className="size-5"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <title>Google</title>
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
                <p>Registrar-se com o Google</p>
              </Button>
              <p className="text-gray-500 text-sm text-center">
                Ja possui uma conta?{" "}
                <Link
                  href="/pages/login"
                  className="underline text-black font-bold hover:text-gray-700">
                  Faça Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </Form>

      <Toaster />
    </main>
  );
}
