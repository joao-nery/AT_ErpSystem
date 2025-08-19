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
import { CircleX } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Category } from "@/types/category.entity.types";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O nome do produto deve ter pelo menos 2 caracteres",
  }),

  quantity: z.string().min(1, {
    message: "A quantidade deve ser maior que 0",
  }),

  categoryId: z.string(),

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

export default function CreateProductModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [categories, setCategories] = useState<Category[]>([]);

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      quantity: "",
      salePrice: "",
      categoryId: "",
    },
  });

  useEffect(() => {
    async function getCategories() {
      const res = await fetch("http://localhost:3001/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await GetCookie()}`,
        },
      });

      const data = await res.json();
      setCategories(data.categories);
    }

    getCategories();
  }, []);

  async function onSubmit(values: FormProps) {
    const newFixedObject = {
      ...values,
      salePrice: values.salePrice.replace(",", "."),
    };

    console.log(newFixedObject);

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
        window.location.reload();
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
          className="flex flex-col border gap-5 p-10 w-[700px] h-max shadow absolute top-[200px] left-[650px] z-50 bg-white dark:bg-neutral-800 rounded-lg">
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold">Cadastro de Produtos</h1>
            <button onClick={onClose}>
              <CircleX
                size={30}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              />
            </button>
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
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category, index) => (
                        <SelectGroup key={index}>
                          <SelectItem value={category.id}>
                            {category.name}
                          </SelectItem>
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
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
