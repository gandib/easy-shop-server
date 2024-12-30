import { z } from "zod";

const createNewsletterSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required!" }),
  }),
});

export const newsletterValidations = {
  createNewsletterSchema,
};
