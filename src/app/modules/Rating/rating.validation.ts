import { z } from "zod";

const createRatingSchema = z.object({
  body: z.object({
    rating: z.number({ required_error: "Rating is required!" }),
    productId: z.string({ required_error: "Product id is required!" }),
  }),
});

const updateRatingSchema = z.object({
  body: z
    .object({
      rating: z.number().optional(),
    })
    .strict(),
});

export const ratingValidations = {
  createRatingSchema,
  updateRatingSchema,
};
