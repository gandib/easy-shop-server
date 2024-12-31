import { z } from "zod";

const createCategorySchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required!" }),
    img: z.string({ required_error: "Image is required!" }),
  }),
});

const updateCategorySchema = z.object({
  body: z
    .object({
      name: z.string().optional(),
      img: z.string().optional(),
      isDeleted: z.boolean().optional(),
    })
    .strict(),
});

export const categoryValidations = {
  createCategorySchema,
  updateCategorySchema,
};
