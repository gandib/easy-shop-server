import { z } from "zod";

const createProductSchema = z.object({
  body: z.object({
    shopId: z.string({ required_error: "Shop id is required!" }),
    name: z.string({ required_error: "Name is required!" }),
    price: z.number({ required_error: "Price is required!" }),
    categoryId: z.string({ required_error: "Category id is required!" }),
    description: z.string({ required_error: "Description is required!" }),
    quantity: z.number({ required_error: "Quantity is required!" }),
    discount: z.number().optional(),
  }),
});

const updateProductSchema = z.object({
  body: z
    .object({
      name: z.string().optional(),
      price: z.number().optional(),
      categoryId: z.string().optional(),
      description: z.string().optional(),
      quantity: z.number().optional(),
      discount: z.number().optional(),
      isDeleted: z.boolean().optional(),
    })
    .strict(),
});

export const productValidations = {
  createProductSchema,
  updateProductSchema,
};
