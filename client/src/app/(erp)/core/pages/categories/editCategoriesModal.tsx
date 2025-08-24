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
import { GetCategoryForID } from "./getCategoryForID";

const schema = z.object({
  name: z
    .string()
    .min(2, { message: "Nome da categoria deve ter pelo menos 2 caracteres." })
    .max(100),
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
    },
  });

  // Busca os dados do produto pelo id
  useEffect(() => {
    async function updateForm() {
      const token = await GetCookie();
      const category = await GetCategoryForID(idCategory, token);
      form.setValue("name", category.name);
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
      toast.success("Categoria atualizada com sucesso!", {
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
                <FormLabel>Nome da Categoria</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nome da categoria"
                    type="text"
                    {...field}
                  />
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
