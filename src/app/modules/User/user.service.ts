import { User, UserStatus } from "@prisma/client";
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
      shop: true,
      follow: true,
      review: true,
      rating: true,
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
      shop: true,
      follow: true,
      review: true,
      rating: true,
    },
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  return result;
};

const updateUser = async (email: string, payload: Partial<User>) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
      status: "ACTIVE",
    },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  const result = await prisma.user.update({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      shop: true,
      follow: true,
      review: true,
      rating: true,
    },
    data: payload,
  });

  return result;
};

const statusChange = async (payload: { id: string; status: UserStatus }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
    },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  const result = await prisma.user.update({
    where: {
      id: payload.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      shop: true,
      follow: true,
      review: true,
      rating: true,
    },
    data: {
      status: payload.status,
    },
  });

  return result;
};

export const userServices = {
  createUser,
  getAllUsers,
  getUserByEmail,
  updateUser,
  statusChange,
};
