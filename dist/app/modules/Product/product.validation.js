"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidations = void 0;
const zod_1 = require("zod");
const createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        shopId: zod_1.z.string({ required_error: "Shop id is required!" }),
        name: zod_1.z.string({ required_error: "Name is required!" }),
        price: zod_1.z.number({ required_error: "Price is required!" }),
        categoryId: zod_1.z.string({ required_error: "Category id is required!" }),
        description: zod_1.z.string({ required_error: "Description is required!" }),
        quantity: zod_1.z.number({ required_error: "Quantity is required!" }),
        discount: zod_1.z.number().optional(),
    }),
});
const updateProductSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        categoryId: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        quantity: zod_1.z.number().optional(),
        discount: zod_1.z.number().optional(),
        img: zod_1.z.array(zod_1.z.string().url()).optional(),
        isDeleted: zod_1.z.boolean().optional(),
    })
        .strict(),
});
exports.productValidations = {
    createProductSchema,
    updateProductSchema,
};
