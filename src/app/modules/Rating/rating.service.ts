import { Rating } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { TUser } from "../../interfaces/pagination";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createRating = async (payload: Rating, user: TUser) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: user?.email,
    },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  payload.userId = userData?.id!;

  const result = await prisma.rating.create({
    data: payload,
    include: {
      user: true,
      product: true,
    },
  });

  return result;
};

const getAllRatings = async () => {
  const result = await prisma.rating.findMany({
    include: {
      user: true,
      product: true,
    },
  });
  return result;
};

const getRatingById = async (id: string) => {
  const result = await prisma.rating.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      user: true,
      product: true,
    },
  });
  return result;
};

const updateRatingById = async (id: string, payload: Partial<Rating>) => {
  const Rating = await prisma.rating.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.rating.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const ratingServices = {
  createRating,
  getAllRatings,
  getRatingById,
  updateRatingById,
};
