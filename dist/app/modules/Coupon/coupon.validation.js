"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponValidations = void 0;
const zod_1 = require("zod");
const createCouponSchema = zod_1.z.object({
    body: zod_1.z.object({
        code: zod_1.z.string({ required_error: "Code is required!" }),
        percentage: zod_1.z.number({ required_error: "Percentage is required!" }),
        expiryDate: zod_1.z
            .string()
            .refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format",
        })
            .transform((val) => new Date(val)),
    }),
});
const updateCouponSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        code: zod_1.z.string().optional(),
        percentage: zod_1.z.number().optional(),
        expiryDate: zod_1.z
            .string()
            .refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format",
        })
            .transform((val) => new Date(val))
            .optional(),
    })
        .strict(),
});
exports.couponValidations = {
    createCouponSchema,
    updateCouponSchema,
};
