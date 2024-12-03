import { UserRole, UserStatus } from "@prisma/client";
import { z } from "zod";

const createUserSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required!" }),
    email: z.string({ required_error: "Email is required!" }),
    role: z.enum([UserRole.ADMIN, UserRole.VENDOR, UserRole.USER]),
    password: z.string({ required_error: "Password is required!" }),
  }),
});

const updateUserSchema = z
  .object({
    body: z.object({
      name: z.string().optional(),
      password: z.string().optional(),
    }),
  })
  .strict();

const statusChangeSchema = z.object({
  body: z.object({
    status: z.enum([
      UserStatus.ACTIVE,
      UserStatus.SUSPENDED,
      UserStatus.DELETED,
    ]),
  }),
});

export const userValidations = {
  createUserSchema,
  updateUserSchema,
  statusChangeSchema,
};
