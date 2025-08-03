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
import { Badge } from "@/components/ui/badge";
import { BoxIcon, ChromeIcon } from "lucide-react";

const formSchema = z.object({
  email: z
    .string()
    .min(2, { message: "O usuário deve ter pelo menos 2 caracteres" })
    .email(),

  password: z
    .string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
});

type FormProps = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormProps) {
    const res = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      alert("Usuário inválido");
      throw new Error("Não foi possivel fazer login, usuário não autenticado");
    }

    const { access_token } = await res.json();

    await fetch("/api/set-cookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token }),
    });

    router.push("/core");
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
          className="p-5 h-[600px] gap-5 dark:bg-[#0f0f0f] w-[400px] rounded-xl shadow-2xl flex flex-col justify-center">
          <div>
            <h1 className="text-2xl font-semibold text-center">
              Bem-Vindo de volta!
            </h1>
            <p className="text-sm text-center text-gray-400">
              Login with your Apple or Google account
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Button variant="outline">
              <ChromeIcon />
              login com Google
            </Button>
          </div>

          <hr />

          <div className="flex flex-col gap-5 mt-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail:</FormLabel>
                  <FormControl>
                    <Input
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
                  <FormLabel className="flex justify-between">
                    Senha:
                    <Link
                      href="/pages/forgotPassword"
                      className="text-gray-400 hover:text-gray-500 hover:underline text-sm">
                      Esqueceu a senha?
                    </Link>
                  </FormLabel>
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
            Entrar
          </Button>
          <div className="w-full ">
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
              Ainda Não possui uma conta?{" "}
              <Link href="/pages/register" className="underline">
                Cadastre-se
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </main>
  );
}
