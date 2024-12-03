import { UserRole } from "@prisma/client";
import { z } from "zod";

const createUserSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required!" }),
    email: z.string({ required_error: "Email is required!" }),
    role: z.enum([UserRole.ADMIN, UserRole.VENDOR, UserRole.USER]),
    password: z.string({ required_error: "Password is required!" }),
  }),
});

const updateUserSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    password: z.string().optional(),
  }),
});

export const userValidations = {
  createUserSchema,
  updateUserSchema,
};
