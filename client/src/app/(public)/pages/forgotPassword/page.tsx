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

  return (
    <main className="h-[calc(100dvh-65px)] bg-gradient-to-b to-red-400 from-rose-500  w-full flex flex-col justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="  h-[650px] gap-5 border-2 bg-white border-gray-200   rounded-[30px] shadow-xl  flex flex-col justify-center
            w-[350px] px-10
            md:w-[450px]
            lg:w-[550px] lg:py-15 lg:px-20
            xl:w-[550px] xl:h-[790px]">
          <div className="text-center flex flex-col justify-center items-center">
            <h1
              className="
            text-2xl font-semibold 
            xl:text-3xl
            ">
              Refefina sua senha!
            </h1>
            <p
              className="text-sm text-gray-500
            w-[300px] xl:w-[400px] xl:text-xl
            ">
              Preencha as informações abaixo, para resgatar sua conta!
            </p>
          </div>
          <div className="flex flex-col justify-center gap-5 mt-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
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
                      type="email"
                      className="bg-gray-100 border-none py-6"
                      placeholder="**********"
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
              Redefinir senha
            </Button>

            <hr className=" border-gray-300" />

            <div className="w-full flex flex-col justify-center items-center gap-5">
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
    </main>
  );
}
