"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidations = void 0;
const zod_1 = require("zod");
const createReviewSchema = zod_1.z.object({
    body: zod_1.z.object({
        comment: zod_1.z.string({ required_error: "Comment is required!" }),
        productId: zod_1.z.string({ required_error: "Product id is required!" }),
    }),
});
const updateReviewSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        comment: zod_1.z.string().optional(),
    })
        .strict(),
});
exports.reviewValidations = {
    createReviewSchema,
    updateReviewSchema,
};
