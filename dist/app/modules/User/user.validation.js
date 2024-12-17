"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required!" }),
        email: zod_1.z.string({ required_error: "Email is required!" }),
        role: zod_1.z.enum([client_1.UserRole.ADMIN, client_1.UserRole.VENDOR, client_1.UserRole.USER]),
        password: zod_1.z.string({ required_error: "Password is required!" }),
    }),
});
const updateUserSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
    })
        .strict(),
});
const statusChangeSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([
            client_1.UserStatus.ACTIVE,
            client_1.UserStatus.SUSPENDED,
            client_1.UserStatus.DELETED,
        ]),
    }),
});
exports.userValidations = {
    createUserSchema,
    updateUserSchema,
    statusChangeSchema,
};
