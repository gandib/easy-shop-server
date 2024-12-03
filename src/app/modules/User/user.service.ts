import { User } from "@prisma/client";
import prisma from "../../../utils/prisma";
import bcrypt from "bcrypt";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

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
    where: {
      status: "ACTIVE",
    },
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

const getUserByEmail = async (email: string) => {
  const result = await prisma.user.findUnique({
    where: {
      email,
      status: "ACTIVE",
    },
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

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  return result;
};

export const userServices = {
  createUser,
  getAllUsers,
  getUserByEmail,
};
