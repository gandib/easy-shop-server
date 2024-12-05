import { OrderStatus, PaymentStatus } from "@prisma/client";
import { z } from "zod";

const orderItemSchema = z.object({
  productId: z.string({ required_error: "Product id is required!" }),
  quantity: z.number({ required_error: "Quantity is required!" }),
});

const createOrderSchema = z.object({
  body: z.object({
    orderItems: z.array(orderItemSchema),
    totalPrice: z.number({ required_error: "Total price is required!" }),
  }),
});

export const orderValidations = {
  createOrderSchema,
};
