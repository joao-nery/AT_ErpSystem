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
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  email: z
    .string()
    .min(2, { message: "O usuário deve ter pelo menos 2 caracteres" })
    .email(),

  confirmPassword: z
    .string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial",
      }
    ),

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

export default function ForgotPassword() {
  const router = useRouter();

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      confirmPassword: "",
      password: "",
    },
  });

  async function onSubmit(values: FormProps) {
    if (values.confirmPassword !== values.password) {
      toast.error("As senhas não são iguais!", {
        position: "top-center",
        richColors: true,
        duration: 3000,
        style: {
          display: "flex",
          justifyContent: "center",
          fontSize: "15px",
          alignItems: "center",
          gap: "5px",
        },
      });

      throw new Error("As senhas não são iguais");
    }

    const newObject = {
      email: values.email,
      password: values.password,
    };

    const res = await fetch("http://localhost:3001/users/updatePassword", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newObject),
    });

    const data = await res.json();

    console.log(data);

    if (data.statusCode === 409) {
      toast.error("A senha já utilizada, favor faça login!", {
        position: "top-center",
        richColors: true,
        duration: 3000,
        style: {
          display: "flex",
          justifyContent: "center",
          fontSize: "15px",
          alignItems: "center",
          gap: "5px",
        },
      });

      setTimeout(() => {
        router.push("/pages/login");
      }, 2000);
    }

    if (data.statusCode === 404) {
      toast.error(data.message, {
        position: "top-center",
        richColors: true,
        duration: 3000,
        style: {
          display: "flex",
          justifyContent: "center",
          fontSize: "15px",
          alignItems: "center",
          gap: "5px",
        },
      });
    }

    if (data.statusCode === 200) {
      toast.success("Senha redefinida com sucesso!", {
        position: "top-center",
        richColors: true,
        duration: 3000,
        style: {
          display: "flex",
          justifyContent: "center",
          fontSize: "15px",
          alignItems: "center",
          gap: "5px",
        },
      });

      setTimeout(() => {
        router.push("/pages/login");
      }, 2000);
    }
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
                  <FormLabel className="text-md">Nova Senha</FormLabel>
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">
                    Confirme sua nova Senha
                  </FormLabel>
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
        <Toaster />
      </Form>
    </main>
  );
}
