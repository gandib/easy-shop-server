import { z } from "zod";

const createCouponSchema = z.object({
  body: z.object({
    code: z.string({ required_error: "Code is required!" }),
    percentage: z.number({ required_error: "Percentage is required!" }),
    expiryDate: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      })
      .transform((val) => new Date(val)),
  }),
});

const updateCouponSchema = z.object({
  body: z
    .object({
      code: z.string().optional(),
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

export const couponValidations = {
  createCouponSchema,
  updateCouponSchema,
};
