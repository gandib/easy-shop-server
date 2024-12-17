"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopValidations = void 0;
const zod_1 = require("zod");
const createShopSchema = zod_1.z.object({
    body: zod_1.z.object({
        vendorId: zod_1.z.string({ required_error: "Vendor id is required!" }),
        name: zod_1.z.string({ required_error: "Name is required!" }),
        description: zod_1.z.string({ required_error: "Description is required!" }),
    }),
});
const updateShopSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        logo: zod_1.z.string().optional(),
    })
        .strict(),
});
const updateBlackListShop = zod_1.z.object({
    body: zod_1.z
        .object({
        isBlackListed: zod_1.z.boolean({
            required_error: "isBlackListed is required!",
        }),
    })
        .strict(),
});
exports.shopValidations = {
    createShopSchema,
    updateShopSchema,
    updateBlackListShop,
};
