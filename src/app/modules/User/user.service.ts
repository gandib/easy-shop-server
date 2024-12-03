import { User } from "@prisma/client";
import prisma from "../../../utils/prisma";
import bcrypt from "bcrypt";

const createUser = async (payload: User) => {
  const hashedPassword = await bcrypt.hash(payload.password, 12);
  payload.password = hashedPassword;

  const result = await prisma.user.create({
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

export const userServices = {
  createUser,
  getAllUsers,
};
