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
import { getCustomerForUUID } from "../../actions/getCustomer";

const schema = z.object({
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

type FormProps = z.infer<typeof schema>;

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  createdAt: string;
};

// Começo do Componente ----------------------------------------------------------

export function EditCustomerModal({
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
      email: "",
      notes: "",
      phone: "",
    },
  });

  // Busca os dados do produto pelo id
  useEffect(() => {
    async function updateForm() {
      const customer: Customer = await getCustomerForUUID(id);
      form.setValue("name", customer.name);
      form.setValue("email", customer.email);
      form.setValue("phone", customer.phone);
      form.setValue("notes", customer.notes);
    }
    updateForm();
  }, [form, id]);

  async function onSubmit(values: FormProps) {
    // atualizar o produto
    const res = await fetch(`http://localhost:3001/customers/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await GetCookie()}`,
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (data.statusCode === 200) {
      toast.success("Cliente atualizado com sucesso!", {
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

  function formatPhoneNumber(value: string) {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  }

  return (
    <main>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col border gap-5 p-10 w-[700px] h-max shadow absolute top-[200px] left-[650px] z-50 bg-white dark:bg-neutral-800 rounded-lg">
          <div>
            <h1 className="text-2xl mb-3 font-semibold">Editar Cliente</h1>
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
                <FormLabel>Nome do cliente</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do produto" type="text" {...field} />
                </FormControl>
                <FormMessage className="text-[12px]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@example.com"
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone/WhatsApp</FormLabel>
                <FormControl>
                  <Input
                    placeholder="(00) 00000-0000"
                    type="text"
                    maxLength={15}
                    {...field}
                    onChange={(e) => {
                      field.onChange(formatPhoneNumber(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage className="text-[12px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <textarea
                    className="border-2 p-2 dark:bg-neutral-900"
                    placeholder="Observações do cliente"
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
