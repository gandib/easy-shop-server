"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followValidations = void 0;
const zod_1 = require("zod");
const createFollowSchema = zod_1.z.object({
    body: zod_1.z.object({
        shopId: zod_1.z.string({ required_error: "Shop id is required!" }),
    }),
});
exports.followValidations = {
    createFollowSchema,
};
