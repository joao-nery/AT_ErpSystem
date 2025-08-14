"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { GetCookie } from "@/app/(erp)/core/actions/getCookie";

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
import { BoxIcon } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome do produto deve ter pelo menos 2 caracteres",
  }),

  quantity: z.string().min(1, {
    message: "A quantidade deve ser maior que 0",
  }),

  salePrice: z
    .string()
    .min(1, {
      message: "O preço de venda deve ser maior que 0",
    })
    .regex(/^[0-9,]+(\.[0-9]{1,2})?$/, {
      message: "O preço de venda deve ser um número",
    }),
});

type FormProps = z.infer<typeof formSchema>;

export default function Create() {
  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      quantity: "",
      salePrice: "",
    },
  });

  async function onSubmit(values: FormProps) {
    const newFixedObject = {
      ...values,
      salePrice: values.salePrice.replace(",", "."),
    };

    const token = await GetCookie();

    const res = await fetch("http://localhost:3001/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newFixedObject),
    });

    const data = await res.json();

    if (data.statusCode === 201) {
      toast.success("Produto cadastrado com sucesso!", {
        position: "top-center",
        duration: 2000,
        richColors: true,
        style: {
          display: "flex",
          justifyContent: "center",
          fontSize: "15px",
          alignItems: "center",
          gap: "5px",
        },
      });
      setTimeout(() => {
        form.reset();
      }, 1000);
    }

    if (data.statusCode === 400) {
      toast.error("Erro ao cadastrar produto!", {
        position: "top-center",
        duration: 2000,
        richColors: true,
        style: {
          display: "flex",
          justifyContent: "center",
          fontSize: "15px",
          alignItems: "center",
          gap: "5px",
        },
      });
      throw new Error(data.message);
    }

    if (data.statusCode === 409) {
      toast.error("Produto já cadastrado!", {
        position: "top-center",
        duration: 2000,
        richColors: true,
        style: {
          display: "flex",
          justifyContent: "center",
          fontSize: "15px",
          alignItems: "center",
          gap: "5px",
        },
      });
      throw new Error(data.message);
    }
  }
  return (
    <main className="w-full p-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col border gap-10 p-10  h-max shadow">
          <div className="flex flex-col gap-2 items-center">
            <BoxIcon size={30} />
            <h1 className="text-xl font-semibold mb-5  text-center">
              Cadastro de Produtos
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Produto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome do produto"
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
              name="salePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço de Venda</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Preço de Venda"
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
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Quantidade" type="number" {...field} />
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
      <Toaster />
    </main>
  );
}
