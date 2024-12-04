import { z } from "zod";

const createShopSchema = z.object({
  body: z.object({
    vendorId: z.string({ required_error: "Vendor id is required!" }),
    name: z.string({ required_error: "Name is required!" }),
    description: z.string({ required_error: "Description is required!" }),
  }),
});

const updateShopSchema = z.object({
  body: z
    .object({
      name: z.string().optional(),
      description: z.string().optional(),
    })
    .strict(),
});

const updateBlackListShop = z.object({
  body: z
    .object({
      isBlackListed: z.boolean({
        required_error: "isBlackListed is required!",
      }),
    })
    .strict(),
});

export const shopValidations = {
  createShopSchema,
  updateShopSchema,
  updateBlackListShop,
};
