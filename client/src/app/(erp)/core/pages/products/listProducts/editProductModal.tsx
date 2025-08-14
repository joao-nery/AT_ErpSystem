"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import z, { set } from "zod";

import { CircleXIcon } from "lucide-react";
import { MouseEventHandler, useEffect } from "react";
import { useForm } from "react-hook-form";

import { GetProductForUUID } from "@/app/(erp)/core/actions/getProduct";
import { GetCookie } from "@/app/(erp)/core/actions/getCookie";
import { toast, Toaster } from "sonner";

const schema = z.object({
  name: z
    .string()
    .min(2, { message: "Nome do produto deve ter pelo menos 2 caracteres." })
    .max(100),
  quantity: z.string().min(1, { message: "Quantidade é obrigatória." }),
  salePrice: z.string().min(1, { message: "Preço de venda é obrigatório." }),
});

type FormProps = z.infer<typeof schema>;

// Começo do Componente ----------------------------------------------------------

export function EditProductModal({
  onClose,
  id,
}: {
  onClose: MouseEventHandler<SVGSVGElement>;
  id: string;
}) {
  const form = useForm<FormProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      quantity: "",
      salePrice: "",
    },
  });

  // Busca os dados do produto pelo id
  useEffect(() => {
    async function updateForm() {
      const product = await GetProductForUUID(id);
      form.setValue("name", product.name);
      form.setValue("quantity", product.quantity.toString());
      form.setValue("salePrice", product.salePrice.toString());
    }
    updateForm();
  }, [form, id]);

  async function onSubmit(values: FormProps) {
    // atualizar o produto
    const res = await fetch(`http://localhost:3001/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await GetCookie()}`,
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (data.statusCode === 200) {
      toast.success("Produto atualizado com sucesso!", {
        duration: 2000,
        position: "top-center",
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
        window.location.reload();
      }, 1000);
    }
  }

  return (
    <main className="border w-[600px] p-10 absolute top-1/20 left-3/7 -translate-x-1/4 bg-white dark:bg-neutral-800 rounded-2xl z-50 ">
      <div>
        <h1 className="text-2xl mb-3 font-semibold">Editar Produto</h1>
        <CircleXIcon
          className="absolute top-5 right-5 text-destructive cursor-pointer"
          onClick={onClose}
        />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col border gap-10 p-5 w-full  shadow rounded-2xl">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Produto</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do produto" type="text" {...field} />
                </FormControl>
                <FormMessage className="text-[12px]" />
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
                <FormMessage className="text-[12px]" />
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
                  <Input placeholder="Preço de Venda" type="text" {...field} />
                </FormControl>
                <FormMessage className="text-[12px]" />
              </FormItem>
            )}
          />

          <Button type="submit" className="py-3 w-40">
            Atualizar
          </Button>
        </form>
        <Toaster />
      </Form>
    </main>
  );
}
