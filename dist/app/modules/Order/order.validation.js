"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidations = void 0;
const zod_1 = require("zod");
const orderItemSchema = zod_1.z.object({
    productId: zod_1.z.string({ required_error: "Product id is required!" }),
    quantity: zod_1.z.number({ required_error: "Quantity is required!" }),
});
const createOrderSchema = zod_1.z.object({
    body: zod_1.z.object({
        orderItems: zod_1.z.array(orderItemSchema),
        totalPrice: zod_1.z.number({ required_error: "Total price is required!" }),
    }),
});
exports.orderValidations = {
    createOrderSchema,
};
