import { z } from "zod";

const createFlashSaleSchema = z.object({
  body: z.object({
    productId: z.string({ required_error: "Product id is required!" }),
    percentage: z.number({ required_error: "Percentage is required!" }),
    expiryDate: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      })
      .transform((val) => new Date(val)),
  }),
});

const updateFlashSaleSchema = z.object({
  body: z
    .object({
      productId: z.string().optional(),
      percentage: z.number().optional(),
      expiryDate: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
          message: "Invalid date format",
        })
        .transform((val) => new Date(val))
        .optional(),
    })
    .strict(),
});

export const flashSaleValidations = {
  createFlashSaleSchema,
  updateFlashSaleSchema,
};
