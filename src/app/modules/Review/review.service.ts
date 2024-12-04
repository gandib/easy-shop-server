import { Review } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { TUser } from "../../interfaces/pagination";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createReview = async (payload: Review, user: TUser) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: user?.email,
    },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  payload.userId = userData?.id!;

  const result = await prisma.review.create({
    data: payload,
    include: {
      product: true,
      user: true,
      shopResponse: true,
    },
  });

  return result;
};

const getAllReviews = async () => {
  const result = await prisma.review.findMany({
    include: {
      product: true,
      user: true,
      shopResponse: true,
    },
  });
  return result;
};

const getReviewById = async (id: string) => {
  const result = await prisma.review.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      product: true,
      user: true,
      shopResponse: true,
    },
  });
  return result;
};

const updateReviewById = async (id: string, payload: Partial<Review>) => {
  const Review = await prisma.review.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.review.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const reviewServices = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReviewById,
};
