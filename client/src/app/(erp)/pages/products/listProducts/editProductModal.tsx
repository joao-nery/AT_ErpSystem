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

import { formSchema } from "@/schemas/formSchema";
import { GetProductForUUID } from "@/app/(erp)/actions/getProduct";
import { GetCookie } from "@/app/(erp)/actions/getCookie";

type FormProps = z.infer<typeof formSchema>;

// Começo do Componente ----------------------------------------------------------

export function EditProductModal({
  onClose,
  id,
}: {
  onClose: MouseEventHandler<SVGSVGElement>;
  id: string;
}) {
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

  // Busca os dados do produto pelo id
  useEffect(() => {
    async function updateForm() {
      const product = await GetProductForUUID(id);

      form.setValue("description", product.description);
      form.setValue("barCode", product.barCode);
      form.setValue("reference", product.reference);
      form.setValue("supplier", product.supplier);
      form.setValue("size", product.size.toString());
      form.setValue("categories", product.categories);
      form.setValue("quantity", product.quantity.toString());
      form.setValue("salePrice", product.salePrice.toString());
      form.setValue("purchasePrice", product.purchasePrice.toString());
    }

    updateForm();
  }, [form, id]);

  function generateRandomBarCode() {
    const randomBarCode = Math.floor(Math.random() * 10000000000000);
    const stringRandomBarCode = randomBarCode.toString();

    form.setValue("barCode", stringRandomBarCode);
  }

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

    if (!res.ok) {
      throw new Error("Failed to update user");
    }

    console.log(`User with ID ${id} updated successfully`);
    window.location.reload();
    alert("Produto atualizado com sucesso!");
  }

  return (
    <main className="border absolute top-1/20 left-3/7 -translate-x-1/4 p-5   bg-white dark:bg-neutral-800 rounded-2xl z-50 ">
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
                <FormMessage className="text-[12px]" />
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
                <FormMessage className="text-[12px]" />
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
                <FormMessage className="text-[12px]" />
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
                <FormMessage className="text-[12px]" />
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
                  <FormMessage className="text-[12px]" />
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
                  <FormMessage className="text-[12px]" />
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
                  <FormMessage className="text-[12px]" />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="py-3 w-40">
            Atualizar
          </Button>
        </form>
      </Form>
    </main>
  );
}
