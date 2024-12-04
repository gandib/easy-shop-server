import { z } from "zod";

const createShopResponseSchema = z.object({
  body: z.object({
    response: z.string({ required_error: "Response is required!" }),
    reviewId: z.string({ required_error: "Review id is required!" }),
  }),
});

const updateShopResponseSchema = z.object({
  body: z
    .object({
      response: z.string().optional(),
    })
    .strict(),
});

export const shopResponseValidations = {
  createShopResponseSchema,
  updateShopResponseSchema,
};
