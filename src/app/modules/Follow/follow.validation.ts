import { z } from "zod";

const createFollowSchema = z.object({
  body: z.object({
    shopId: z.string({ required_error: "Shop id is required!" }),
  }),
});

export const followValidations = {
  createFollowSchema,
};
