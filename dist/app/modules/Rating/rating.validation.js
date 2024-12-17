"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingValidations = void 0;
const zod_1 = require("zod");
const createRatingSchema = zod_1.z.object({
    body: zod_1.z.object({
        rating: zod_1.z.number({ required_error: "Rating is required!" }),
        productId: zod_1.z.string({ required_error: "Product id is required!" }),
    }),
});
const updateRatingSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        rating: zod_1.z.number().optional(),
    })
        .strict(),
});
exports.ratingValidations = {
    createRatingSchema,
    updateRatingSchema,
};
