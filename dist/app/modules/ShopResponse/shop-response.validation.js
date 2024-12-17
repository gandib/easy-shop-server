"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopResponseValidations = void 0;
const zod_1 = require("zod");
const createShopResponseSchema = zod_1.z.object({
    body: zod_1.z.object({
        response: zod_1.z.string({ required_error: "Response is required!" }),
        reviewId: zod_1.z.string({ required_error: "Review id is required!" }),
    }),
});
const updateShopResponseSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        response: zod_1.z.string().optional(),
    })
        .strict(),
});
exports.shopResponseValidations = {
    createShopResponseSchema,
    updateShopResponseSchema,
};
