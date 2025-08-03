import z from "zod";

export const formSchema = z.object({
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
