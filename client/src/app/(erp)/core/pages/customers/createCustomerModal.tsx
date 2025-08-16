"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";

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
import { CircleX, UserCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { GetCookie } from "../../actions/getCookie";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "O usuário deve ter pelo menos 2 caracteres",
  }),

  phone: z.string().min(10, {
    message: "O telefone deve ter pelo menos 11 caracteres",
  }),
  email: z
    .string()
    .min(5, {
      message: "O e-mail deve ter pelo menos 5 caracteres",
    })
    .email("Formato de e-mail inválido"),

  notes: z.string().min(10, {
    message: "As notas devem ter pelo menos 10 caracteres",
  }),
});

type FormProps = z.infer<typeof formSchema>;

export function CreateCustomerModal({ onClose }: { onClose: () => void }) {
  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phone: "",
      name: "",
      notes: "",
    },
  });

  async function onSubmit(values: FormProps) {
    try {
      const token = await GetCookie();

      const res = await fetch("http://localhost:3001/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      console.log(data.statusCode);

      if (data.statusCode === 201) {
        toast.success("Cliente cadastrado com sucesso!", {
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

        setTimeout(() => window.location.reload(), 1000);
      }

      if (data.statusCode === 409) {
        toast.warning("Cliente já existe!", {
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
      }
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
    }
  }

  function formatPhoneNumber(value: string) {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  }

  return (
    <main className="w-full p-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col border gap-5 p-10 w-[700px] h-max shadow absolute top-[200px] left-[650px] z-50 bg-white dark:bg-neutral-800 rounded-lg">
          <div className="flex items-center justify-between mb-5">
            <h1 className="font-bold text-2xl">Adicionar Cliente</h1>
            <button onClick={onClose}>
              <CircleX
                size={30}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              />
            </button>
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nome do cliente"
                    type="text"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@exemplo.com"
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
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Telefone/WhatsApp</FormLabel>
                <FormControl>
                  <Input
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                    type="tel"
                    className="w-full"
                    {...field}
                    onChange={(e) => {
                      field.onChange(formatPhoneNumber(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <textarea
                    placeholder="Observações sobre o cliente"
                    className="w-full border-1 dark:bg-neutral-900 rounded-md p-4"
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="py-5 w-40">
            Cadastrar
          </Button>
        </form>
        <Toaster />
      </Form>
    </main>
  );
}
