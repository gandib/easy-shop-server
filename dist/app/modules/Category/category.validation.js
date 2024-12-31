"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidations = void 0;
const zod_1 = require("zod");
const createCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required!" }),
        img: zod_1.z.string({ required_error: "Image is required!" }),
    }),
});
const updateCategorySchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string().optional(),
        img: zod_1.z.string().optional(),
        isDeleted: zod_1.z.boolean().optional(),
    })
        .strict(),
});
exports.categoryValidations = {
    createCategorySchema,
    updateCategorySchema,
};
