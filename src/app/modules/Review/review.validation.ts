import { z } from "zod";

const createReviewSchema = z.object({
  body: z.object({
    comment: z.string({ required_error: "Comment is required!" }),
    productId: z.string({ required_error: "Product id is required!" }),
  }),
});

const updateReviewSchema = z.object({
  body: z
    .object({
      comment: z.string().optional(),
    })
    .strict(),
});

export const reviewValidations = {
  createReviewSchema,
  updateReviewSchema,
};
