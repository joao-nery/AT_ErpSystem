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
import z from "zod";

import { CircleXIcon } from "lucide-react";
import { MouseEventHandler, useEffect } from "react";
import { useForm } from "react-hook-form";

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

export function EditCategoriesModal({
  onClose,
  idCategory,
}: {
  onClose: MouseEventHandler<SVGSVGElement>;
  idCategory: string;
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
      // const category = await GetCategoryForUUID(idCategory);
      // form.setValue("name", category.name);
      // form.setValue("quantity", category.quantity.toString());
      // form.setValue("salePrice", category.salePrice.toString());
    }
    updateForm();
  }, [form, idCategory]);

  async function onSubmit(values: FormProps) {
    // atualizar a categoria
    const res = await fetch(`http://localhost:3001/categories/${idCategory}`, {
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
    <main>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col border gap-5 p-10 w-[700px] h-max shadow absolute top-[200px] left-[650px] z-50 bg-white dark:bg-neutral-800 rounded-lg">
          <div>
            <h1 className="text-2xl mb-3 font-semibold">Editar Produto</h1>
            <CircleXIcon
              className="absolute top-5 right-5 text-destructive cursor-pointer"
              onClick={onClose}
            />
          </div>
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
