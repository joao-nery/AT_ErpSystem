"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { GetCookie } from "@/app/(erp)/actions/getCookie";

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

const formSchema = z.object({
  description: z.string().min(2, {
    message: "O usuário deve ter pelo menos 2 caracteres",
  }),

  supplier: z.string().min(2, {
    message: "O fornecedor deve ter pelo menos 2 caracteres",
  }),

  barCode: z.string().min(10, {
    message: "O código deve ter pelo menos 10 caracteres",
  }),

  reference: z.string().min(4, {
    message: "A referência deve ter pelo menos 4 caracteres",
  }),

  size: z
    .string()
    .min(1, { message: "O tamanho deve ter pelo menos 1 caracteres" })
    .max(4, {
      message: "O tamanho deve ter pelo menos 4 caracteres",
    }),

  categories: z.string().min(2, {
    message: "As categorias devem ter pelo menos 2 caracteres",
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

  purchasePrice: z
    .string()
    .min(1, {
      message: "O preço de compra deve ser maior que 0",
    })
    .regex(/^[0-9,]+(\.[0-9]{1,2})?$/, {
      message: "O preço de compra deve ser um número",
    }),
});

type FormProps = z.infer<typeof formSchema>;

export default function RegisterProduct() {
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
      salePrice: "",
      purchasePrice: "",
    },
  });

  function generateRandomBarCode() {
    const randomBarCode = Math.floor(Math.random() * 10000000000000);
    const stringRandomBarCode = randomBarCode.toString();

    form.setValue("barCode", stringRandomBarCode);
  }

  async function onSubmit(values: FormProps) {
    const newFixedObject = {
      ...values,
      salePrice: values.salePrice.replace(",", "."),
      purchasePrice: values.purchasePrice.replace(",", "."),
    };

    const token = await GetCookie();

    try {
      const res = await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newFixedObject),
      });

      if (res.status === 400) {
        alert("erro ");
        throw new Error("Bad Request");
      }

      if (res.status === 409) {
        alert("Produto ja cadastrado");
        throw new Error("Produto ja cadastrado");
      }

      if (res.status === 201) {
        alert("Produto cadastrado com sucesso");
      }

      form.reset();
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
  return (
    <main className="w-full p-10">
      <Form {...form}>
        <h1 className="text-2xl font-semibold mb-5">Cadastro de Produtos</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col border gap-10 p-10 w-full h-max shadow">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Descrição do produto"
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
            name="supplier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fornecedor</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Fornecedor do produto"
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
            name="barCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código de produto</FormLabel>
                <FormControl>
                  <div className="flex gap-5 w-full">
                    <Input
                      placeholder="Código do produto"
                      type="text"
                      {...field}
                    />
                    <Button
                      onClick={generateRandomBarCode}
                      type="button"
                      className="w-max">
                      Gerar Código
                    </Button>
                  </div>
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
                <FormLabel>Referência</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Referência do produto"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 gap-5">
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tamanho</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tamanho do produto"
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
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categorias</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Categorias do produto"
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
                    <Input
                      placeholder="Quantidade do produto"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
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
              name="purchasePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço de Compra</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Preço de Compra"
                      type="text"
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
